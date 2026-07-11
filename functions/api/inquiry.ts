// Cloudflare Pages Function: POST /api/inquiry
// Emails new leads via Resend. Env vars (set in the Cloudflare Pages dashboard):
//   RESEND_API_KEY - from resend.com (free tier)
//   LEAD_TO_EMAIL  - where leads go; defaults to junuhridenour0@gmail.com
//   LEAD_FROM      - sender; use onboarding@resend.dev until the domain is
//                    verified in Resend, then e.g. leads@ridenourmediafirm.com

interface Env {
  RESEND_API_KEY: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM?: string;
  // Optional SMS ping on new leads; activates when all four are set
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_FROM?: string;
  TWILIO_TO?: string;
}

interface InquiryPayload {
  name?: string;
  planning?: string;
  needs?: string[];
  timeline?: string;
  reachMethod?: string;
  reachDetail?: string;
  details?: string;
  company?: string; // honeypot
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const clean = (value: unknown, max = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: InquiryPayload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  // Honeypot filled = bot. Pretend success so bots learn nothing.
  if (clean(payload.company)) return json({ ok: true });

  const name = clean(payload.name, 200);
  const planning = clean(payload.planning, 500);
  const reachDetail = clean(payload.reachDetail, 200);
  if (!name || !planning || !reachDetail) {
    return json({ error: 'Missing required fields' }, 400);
  }

  const needs = Array.isArray(payload.needs)
    ? payload.needs.map((n) => clean(n, 60)).filter(Boolean).join(', ')
    : '';
  const timeline = clean(payload.timeline, 300);
  const reachMethod = clean(payload.reachMethod, 40);
  const details = clean(payload.details, 4000);

  const lines = [
    `Name: ${name}`,
    `Planning: ${planning}`,
    `Needs: ${needs || '(none selected)'}`,
    `Timeline: ${timeline || '(not given)'}`,
    `Reach via: ${reachMethod} — ${reachDetail}`,
    '',
    'Details:',
    details || '(none)',
  ];

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.LEAD_FROM ?? 'RMF Website <onboarding@resend.dev>',
      to: [env.LEAD_TO_EMAIL ?? 'junuhridenour0@gmail.com'],
      subject: `New inquiry: ${name}${needs ? ` (${needs})` : ''}`,
      text: lines.join('\n'),
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return json({ error: 'Email failed' }, 502);
  }

  // Text notification: best-effort, never fails the lead itself
  if (env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_FROM && env.TWILIO_TO) {
    try {
      const sms = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            From: env.TWILIO_FROM,
            To: env.TWILIO_TO,
            Body: `New RMF lead: ${name} — ${planning}${needs ? ` (${needs})` : ''}`,
          }),
        }
      );
      if (!sms.ok) console.error('Twilio error', sms.status, await sms.text());
    } catch (err) {
      console.error('Twilio error', err);
    }
  }

  return json({ ok: true });
};
