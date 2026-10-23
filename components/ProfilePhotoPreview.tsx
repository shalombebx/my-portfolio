"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProfilePhotoPreview() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Preview Shalom Bebebaraseigha's profile photo"
        onClick={() => setOpen(true)}
        className="block h-12 w-12 shrink-0 overflow-hidden rounded-full border border-zinc-700 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300"
      >
        <Image
          src="/profile.jpg"
          alt=""
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Profile photo preview"
        className="profile-photo-dialog"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <p className="font-mono text-xs text-zinc-400">Shalom Bebebaraseigha</p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="font-mono text-xs text-zinc-400 hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-300"
          >
            Close
          </button>
        </div>
        <Image
          src="/profile.jpg"
          alt="Shalom Bebebaraseigha"
          width={1200}
          height={1600}
          className="mx-auto h-auto max-h-[80vh] w-full object-contain"
        />
      </dialog>
    </>
  );
}
