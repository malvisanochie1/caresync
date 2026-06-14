"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, X } from "lucide-react";

import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus to the close button when the drawer opens.
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  return (
    <div className="md:hidden" aria-hidden={!open}>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal={open}
        aria-label="Primary navigation"
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-[75vw] max-w-[320px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-2">
            <Heart
              className="size-6 text-sidebar-primary"
              aria-hidden="true"
            />
            <span className="text-lg font-semibold tracking-tight">
              CareSync
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex size-9 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    tabIndex={open ? 0 : -1}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                      isActive &&
                        "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
