"use client";

import { useEffect, useRef, useState } from "react";
import type { Reel } from "@/lib/reels";

export default function ReelCard({ reel }: { reel: Reel }) {
  const [failed, setFailed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateFullscreenState() {
      const fullscreenElement = document.fullscreenElement;
      setIsFullscreen(
        fullscreenElement === playerRef.current ||
          fullscreenElement === playerRef.current?.querySelector("video"),
      );
    }

    document.addEventListener("fullscreenchange", updateFullscreenState);
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState);
  }, []);

  async function toggleFullscreen() {
    const player = playerRef.current;
    if (!player) return;

    setFullscreenError(false);
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await player.requestFullscreen();
      }
    } catch {
      setFullscreenError(true);
    }
  }

  return (
    <article className="flex flex-col border border-zinc-800 bg-panel/40">
      <div
        ref={playerRef}
        className="reel-player relative w-full bg-black"
        style={{ aspectRatio: reel.aspectRatio ?? "9 / 16" }}
      >
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center font-mono text-xs text-zinc-600">
            {reel.src}
            <br />
            not found
          </div>
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-contain"
            controls
            playsInline
            preload="metadata"
            poster={reel.poster}
            onError={() => setFailed(true)}
          >
            <source src={reel.src} type="video/mp4" />
          </video>
        )}
        {!failed && (
          <button
            type="button"
            onClick={toggleFullscreen}
            className="absolute right-3 top-3 z-10 border border-white/40 bg-black/70 px-3 py-1.5 font-mono text-xs text-white hover:bg-black"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          </button>
        )}
      </div>
      {fullscreenError && (
        <p role="status" className="px-4 pt-2 font-mono text-xs text-red-400">
          Fullscreen mode is unavailable in this browser.
        </p>
      )}

      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-semibold text-zinc-100">{reel.title}</h3>
          {reel.duration && (
            <span className="font-mono text-xs text-zinc-500">{reel.duration}</span>
          )}
        </div>
        <p className="mt-1 font-mono text-xs text-zinc-500">{reel.context}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {reel.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <details className="mt-4 border-t border-zinc-800 pt-3">
          <summary className="cursor-pointer font-mono text-xs text-zinc-400 hover:text-zinc-100">
            breakdown
          </summary>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-400">
            {reel.breakdown.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="font-mono text-zinc-600">-</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </article>
  );
}
