"use client";

import { Menu } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-background px-4 md:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-base font-semibold tracking-tight md:text-lg">
          CareSync
        </h1>
        <span className="text-xs text-muted-foreground">Foundation build</span>
      </div>
    </header>
  );
}
