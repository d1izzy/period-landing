import { useReducedMotion } from "motion/react";
import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import "./Device.css";

export default function Device({
  scale = 0.92,
  enableParallax = true,
  parallaxStrength = 12,
  enableRotate = true,
  rotateStrength = 3,
  className = "",
  children,
}: {
  scale?: number;
  enableParallax?: boolean;
  parallaxStrength?: number;
  enableRotate?: boolean;
  rotateStrength?: number;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const live = !reduce && (enableParallax || enableRotate);

  const apply = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", enableRotate ? `${(-y * rotateStrength).toFixed(2)}deg` : "0deg");
    el.style.setProperty("--ry", enableRotate ? `${(x * rotateStrength).toFixed(2)}deg` : "0deg");
    el.style.setProperty("--px", enableParallax ? `${(x * parallaxStrength).toFixed(2)}px` : "0px");
    el.style.setProperty("--py", enableParallax ? `${(y * parallaxStrength).toFixed(2)}px` : "0px");
  };

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!live) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    apply(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
  };

  const onLeave = () => apply(0, 0);

  return (
    <div
      ref={ref}
      className={`device ${className}`.trim()}
      style={{ "--device-scale": scale } as CSSProperties}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="device-body">
        <span className="device-btn device-action" />
        <span className="device-btn device-vol-up" />
        <span className="device-btn device-vol-down" />
        <span className="device-btn device-power" />
        <div className="device-glass">
          <div className="device-screen">
            <div className="device-island" aria-hidden="true">
              <span className="device-lens" />
              <span className="device-sensor" />
            </div>
            <div className="device-status">
              <span>9:41</span>
              <span className="device-status-right">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="device-shift">{children}</div>
            <span className="device-home" />
          </div>
        </div>
      </div>
    </div>
  );
}
