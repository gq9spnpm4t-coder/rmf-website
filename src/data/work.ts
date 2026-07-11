// Portfolio pieces. The layout handles 1 to N items; the first item is the
// full-width anchor. Video files will live on Cloudflare R2/Pages (self-hosted
// MP4, decided at kickoff). Until the highlight reel exists, `src` stays empty
// and the site renders a styled placeholder frame.
export type WorkPiece = {
  title: string;
  category: string;
  kind: 'video' | 'photo';
  src: string; // video URL or image path; empty = placeholder
  poster?: string;
};

export const work: WorkPiece[] = [
  {
    title: 'Highlight reel',
    category: 'Sports · Events · Brand',
    kind: 'video',
    src: '/work/reel.mp4',
    poster: '/work/reel-poster.jpg',
  },
];
