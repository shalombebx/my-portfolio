export interface Reel {
  id: string;
  title: string;
  /** Drop the file in /public/reels and keep this path in sync */
  src: string;
  aspectRatio?: string;
  poster?: string;
  context: string; // client / project label
  tags: string[];
  breakdown: string[];
  duration?: string;
}

export const reels: Reel[] = [
  {
    id: "oil-spill-risk-demo",
    title: "Oil Spill Risk Classifier",
    src: "/reels/oil_spill_risk.mp4",
    aspectRatio: "1564 / 1080",
    context: "Personal project",
    tags: ["Machine Learning", "App walkthrough"],
    breakdown: [
      "Screen recording walkthrough of the deployed oil-spill-risk-classifier app.",
    ],
  },
];
