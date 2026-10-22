import type { Metadata } from "next";
import ReelCard from "@/components/ReelCard";
import { reels } from "@/lib/reels";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <div className="wrap pt-14">
      <p className="label">~/gallery</p>
      <h1 className="mt-2 font-mono text-3xl font-semibold text-zinc-50">Motion reels</h1>
      <p className="mt-3 max-w-xl text-zinc-400">
        Screen recordings and motion reels, served as plain MP4 from this site. Open a breakdown
        for more details about each video.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reels.map((r) => (
          <ReelCard key={r.id} reel={r} />
        ))}
      </div>
    </div>
  );
}
