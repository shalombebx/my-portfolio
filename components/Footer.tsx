export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800">
      <div className="wrap flex flex-col gap-2 py-6 font-mono text-xs text-zinc-500 sm:flex-row sm:justify-between">
        <span>vantage &middot; static build &middot; hosted on Cloudflare Pages</span>
        <a
          href="https://github.com/shalombebx"
          className="hover:text-zinc-200"
          target="_blank"
          rel="noreferrer"
        >
          github.com/shalombebx
        </a>
      </div>
    </footer>
  );
}
