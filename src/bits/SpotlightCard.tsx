import { useRef, type MouseEventHandler, type ReactNode } from "react";
import "./SpotlightCard.css";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(232, 234, 237, 0.14)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    el.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div ref={ref} className={`card-spotlight ${className}`.trim()} onMouseMove={onMove}>
      {children}
    </div>
  );
}
