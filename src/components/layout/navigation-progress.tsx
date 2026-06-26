"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (anchor.target === "_blank") return;
      if (href === window.location.pathname) return;

      visibleRef.current = true;
      setVisible(true);
      setProgress(20);
      timersRef.current.push(setTimeout(() => setProgress(70), 150));
      timersRef.current.push(
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => setVisible(false), 250);
        }, 3000)
      );
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!visibleRef.current) return;
    visibleRef.current = false;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setProgress(100);
    const hide = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 250);
    return () => clearTimeout(hide);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
    >
      <div
        className="h-full bg-primary"
        style={{
          width: `${progress}%`,
          transition: "width 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: "0 0 8px var(--color-primary)",
        }}
      />
    </div>
  );
}
