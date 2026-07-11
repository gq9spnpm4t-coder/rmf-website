// Cloudflare Pages Function: GET /api/reviews
// Fetches Google reviews server-side (key never reaches the browser) and
// caches the response for 24h to stay well inside the free Places quota.
// Env vars (set in the Cloudflare Pages dashboard):
//   GOOGLE_PLACES_API_KEY - from Google Cloud Console
//   GOOGLE_PLACE_ID       - Place ID of the Ridenour Media Firm profile
// Until both exist, returns sample data flagged sample:true so the section
// still renders during development.

interface Env {
  GOOGLE_PLACES_API_KEY?: string;
  GOOGLE_PLACE_ID?: string;
}

const DAY_SECONDS = 86400;

const SAMPLE = {
  sample: true,
  rating: 5,
  total: 3,
  reviews: [
    {
      author: 'Sample Client',
      rating: 5,
      text: 'Placeholder review. Real Google reviews appear here once the Places API key and Place ID are connected.',
      relativeTime: 'recently',
    },
    {
      author: 'Sample Client',
      rating: 5,
      text: 'Placeholder review card showing how a longer review lays out across a few lines, so the design can be judged with realistic content.',
      relativeTime: 'a month ago',
    },
    {
      author: 'Sample Client',
      rating: 5,
      text: 'A third placeholder card to fill out the grid.',
      relativeTime: 'two months ago',
    },
  ],
};

const json = (body: unknown, maxAge = DAY_SECONDS) =>
  new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=${maxAge}`,
    },
  });

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.GOOGLE_PLACES_API_KEY || !env.GOOGLE_PLACE_ID) {
    return json(SAMPLE, 300);
  }

  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).origin + '/api/reviews');
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const url = `https://places.googleapis.com/v1/places/${env.GOOGLE_PLACE_ID}`;
  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
    },
  });

  if (!res.ok) {
    console.error('Places API error', res.status, await res.text());
    return json(SAMPLE, 300);
  }

  const place = (await res.json()) as {
    rating?: number;
    userRatingCount?: number;
    reviews?: Array<{
      rating?: number;
      relativePublishTimeDescription?: string;
      text?: { text?: string };
      authorAttribution?: { displayName?: string };
    }>;
  };

  const body = {
    sample: false,
    rating: place.rating ?? null,
    total: place.userRatingCount ?? 0,
    reviews: (place.reviews ?? [])
      .filter((r) => r.text?.text)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        rating: r.rating ?? 5,
        text: r.text?.text ?? '',
        relativeTime: r.relativePublishTimeDescription ?? '',
      })),
  };

  const response = json(body);
  await cache.put(cacheKey, response.clone());
  return response;
};
