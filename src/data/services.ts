// Copy source: RMF Website Copy — Draft 2.md, section 3. Use verbatim.
// `need` maps each card to its matching pill in the inquiry form's
// "What do you need?" multi-select (see inquiryNeeds below).
export const services = [
  {
    name: 'Sports videography',
    icon: 'zap',
    short: 'Sports',
    blurb: 'Fast, high-frame-rate coverage that makes the moment look as big as it felt.',
    need: 'Sports',
  },
  {
    name: 'Promo video',
    icon: 'megaphone',
    short: 'Promo',
    blurb: 'Short, sharp video that tells people why your thing is worth caring about.',
    need: 'Promo video',
  },
  {
    name: 'Product photography & documentation',
    icon: 'package',
    short: 'Product',
    blurb: 'Clean, intentional product shots, from hero images to clear step-by-step documentation.',
    need: 'Product photography & documentation',
  },
  {
    name: 'Real estate photo & video',
    icon: 'home',
    short: 'Real estate',
    blurb: 'Bright, honest coverage that helps a space sell itself.',
    need: 'Real estate',
  },
  {
    name: 'Event coverage',
    icon: 'calendar',
    short: 'Events',
    blurb: 'Full coverage that captures what the day actually felt like.',
    need: 'Event coverage',
  },
  {
    name: 'Highlight reels',
    icon: 'film',
    short: 'Highlights',
    blurb: 'The best of an event or a season, cut to actually land.',
    need: 'Highlight reel',
  },
  {
    name: 'Senior photos',
    icon: 'graduation',
    short: 'Seniors',
    blurb: 'Relaxed, natural portraits that look like you on your best day.',
    need: 'Senior photos',
  },
  {
    name: 'Professional headshots',
    icon: 'user',
    short: 'Headshots',
    blurb: 'Approachable, well-lit portraits for you or your team.',
    need: 'Headshots',
  },
  {
    name: 'Website photo & video',
    icon: 'monitor',
    short: 'Web media',
    blurb: 'Visuals built to make your site look sharp and load clean.',
    need: 'Website photo & video',
  },
  {
    name: 'Website design & build',
    icon: 'layout',
    short: 'Web design',
    blurb: 'A clean, fast, custom site built around your brand and handled from the first idea to launch.',
    need: 'Website design',
  },
  {
    name: 'Google Business photos',
    icon: 'mappin',
    short: 'Google Biz',
    blurb: 'Fresh, well-lit photos for your Google listing that help you show up and earn the click.',
    need: 'Google Business photos',
  },
  {
    name: 'Video editing',
    icon: 'scissors',
    short: 'Editing',
    blurb: "Have the footage but not the time? I'll turn it into something finished.",
    need: 'Video editing',
  },
];

// Options for the "What do you need?" multi-select on the inquiry form.
export const inquiryNeeds = [
  'Promo video',
  'Sports',
  'Product photography & documentation',
  'Real estate',
  'Event coverage',
  'Highlight reel',
  'Senior photos',
  'Headshots',
  'Website photo & video',
  'Website design',
  'Google Business photos',
  'Video editing',
  'Other',
];
