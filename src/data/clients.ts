// "Proud to have worked with" logo strip. Each logo is a single-tone mask
// (white shape on transparent) generated from the client's logo, so the site
// paints them all in one ink tone and shifts to terracotta on hover, giving a
// unified logo wall regardless of the originals' colors. `wide` flags long
// wordmarks that need more horizontal room than square badges.
export type Client = {
  name: string;
  logo: string; // path under /public
  wide?: boolean;
};

export const clients: Client[] = [
  { name: 'Tulsa Maker Faire', logo: '/clients/makerfaire.png' },
  { name: 'EnCör', logo: '/clients/encor.png', wide: true },
  { name: 'Basecamp at the YMCA', logo: '/clients/basecamp.png', wide: true },
  { name: 'Fab Lab Tulsa', logo: '/clients/fablab.png' },
  { name: 'Riverfield Country Day School', logo: '/clients/riverfield.png' },
  { name: 'Zeeco Oktoberfest Tulsa', logo: '/clients/oktoberfest.png' },
];
