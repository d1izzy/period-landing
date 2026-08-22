import { useId } from "react";
import "./SoftStar.css";

function spark(cx: number, cy: number, s: number) {
  const b = s * 0.22;
  return `M${cx} ${cy - s} L${cx + b} ${cy - b} L${cx + s} ${cy} L${cx + b} ${cy + b} L${cx} ${cy + s} L${cx - b} ${cy + b} L${cx - s} ${cy} L${cx - b} ${cy - b} Z`;
}

export default function SoftStar({ size = 34 }: { size?: number }) {
  const uid = `ss${useId().replace(/:/g, "")}`;

  return (
    <svg
      className="soft-star"
      viewBox="0 0 72 72"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-fill`} x1="18" y1="12" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFEF8" />
          <stop offset="42%" stopColor="#F3F6EE" />
          <stop offset="100%" stopColor="#D5E3D6" />
        </linearGradient>
        <linearGradient id={`${uid}-edge`} x1="20" y1="14" x2="48" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#C5D2C4" />
        </linearGradient>
      </defs>
      <path fill="#C8D5BB" opacity="0.55" d={spark(14, 16, 3.2)} />
      <path fill="#FFFFFF" d={spark(22, 10, 2.4)} />
      <path fill="#E8EEE4" d={spark(40, 8, 2.1)} />
      <path fill="#D2C4B5" opacity="0.9" d={spark(56, 18, 3.4)} />
      <path fill="#FFFFFF" d={spark(62, 30, 2)} />
      <path fill="#C8D5BB" d={spark(58, 48, 2.6)} />
      <path fill="#FFFFFF" d={spark(48, 62, 2.2)} />
      <path fill="#D2C4B5" d={spark(28, 64, 1.8)} />
      <path fill="#E8EEE4" d={spark(10, 52, 2.5)} />
      <path fill="#FFFFFF" d={spark(8, 34, 1.7)} />
      <path fill="#C8D5BB" opacity="0.7" d={spark(18, 62, 1.5)} />
      <path
        fill={`url(#${uid}-fill)`}
        stroke={`url(#${uid}-edge)`}
        strokeWidth="5.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M36 16 L40.4 29.2 L54.4 29.8 L43.6 38.2 L47.4 51.6 L36 43.8 L24.2 53.2 L28.4 38.2 L17.6 29.8 L31.6 29.2 Z"
      />
      <circle cx="30" cy="30" r="1.05" fill="#fff" />
      <circle cx="37" cy="26" r="0.7" fill="#fff" opacity="0.9" />
      <circle cx="42" cy="34" r="0.85" fill="#fff" />
      <circle cx="33" cy="38" r="0.55" fill="#fff" opacity="0.85" />
      <circle cx="28" cy="35" r="0.45" fill="#fff" opacity="0.7" />
      <circle cx="39" cy="41" r="0.5" fill="#fff" opacity="0.8" />
    </svg>
  );
}
