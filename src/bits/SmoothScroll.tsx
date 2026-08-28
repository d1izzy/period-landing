import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.05,
    });

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      event.preventDefault();
      lenis.scrollTo(el, { offset: -8, duration: 1.4 });
    };

    document.addEventListener("click", onClick);

    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) lenis.scrollTo(el, { offset: -8, duration: 0.8 });
    }

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
