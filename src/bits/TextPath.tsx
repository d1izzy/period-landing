import { useId } from "react";
import "./TextPath.css";

const WAVE =
  "M-40 48 C 120 8, 200 88, 360 48 S 600 8, 780 48 S 1020 88, 1180 48 S 1400 8, 1560 48";

export default function TextPath({
  text = "текст · голос · фото · деньги · еда · дела · период",
  duration = 26,
}: {
  text?: string;
  duration?: number;
}) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = `tp${raw}`;
  const loop = Array.from({ length: 6 }, () => text).join("     ·     ");

  return (
    <div className="text-path" aria-hidden="true">
      <svg viewBox="0 0 1520 96" preserveAspectRatio="none">
        <path id={id} d={WAVE} fill="none" />
        <text fill="currentColor">
          <textPath href={`#${id}`}>
            {loop}
            <animate
              attributeName="startOffset"
              from="0%"
              to="-50%"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      </svg>
    </div>
  );
}
