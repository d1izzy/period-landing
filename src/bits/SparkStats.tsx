import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import "./SparkStats.css";

type Card = {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
  series: number[];
};

type Pt = { x: number; y: number };
type Pad = { l: number; r: number; t: number; b: number };

function toPoints(series: number[], w: number, h: number, pad: Pad): Pt[] {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const plotW = w - pad.l - pad.r;
  const plotH = h - pad.t - pad.b;
  return series.map((value, i) => ({
    x: pad.l + (i / Math.max(series.length - 1, 1)) * plotW,
    y: pad.t + (1 - (value - min) / span) * plotH,
  }));
}

function smoothLine(pts: Pt[]) {
  const n = pts.length;
  if (!n) return "";
  if (n === 1) return `M${pts[0].x} ${pts[0].y}`;
  if (n === 2) {
    return `M${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} L${pts[1].x.toFixed(2)} ${pts[1].y.toFixed(2)}`;
  }

  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = pts[i + 1].x - pts[i].x;
    slope[i] = (pts[i + 1].y - pts[i].y) / (dx[i] || 1);
  }

  const t: number[] = [slope[0]];
  for (let i = 1; i < n - 1; i++) {
    t[i] = slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2;
  }
  t[n - 1] = slope[n - 2];

  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(slope[i]) < 1e-6) {
      t[i] = 0;
      t[i + 1] = 0;
      continue;
    }
    const a = t[i] / slope[i];
    const b = t[i + 1] / slope[i];
    const s = a * a + b * b;
    if (s > 9) {
      const q = 3 / Math.sqrt(s);
      t[i] = q * a * slope[i];
      t[i + 1] = q * b * slope[i];
    }
  }

  let d = `M${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < n - 1; i++) {
    const c1x = pts[i].x + dx[i] / 3;
    const c1y = pts[i].y + (t[i] * dx[i]) / 3;
    const c2x = pts[i + 1].x - dx[i] / 3;
    const c2y = pts[i + 1].y - (t[i + 1] * dx[i]) / 3;
    d += ` C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${pts[i + 1].x.toFixed(2)} ${pts[i + 1].y.toFixed(2)}`;
  }
  return d;
}

function Spark({ series, on, reduce }: { series: number[]; on: boolean; reduce: boolean }) {
  const w = 220;
  const h = 86;
  const pad = { l: 24, r: 10, t: 10, b: 18 };
  const min = Math.min(...series);
  const max = Math.max(...series);
  const plotW = w - pad.l - pad.r;
  const plotH = h - pad.t - pad.b;
  const plotBottom = pad.t + plotH;
  const pts = toPoints(series, w, h, pad);
  const line = smoothLine(pts);
  const last = pts[pts.length - 1];
  const yLines = Array.from({ length: 5 }, (_, i) => pad.t + (i / 4) * plotH);
  const yTicks = [max, (min + max) / 2, min].map((value, i) => ({
    y: pad.t + (i / 2) * plotH,
    label: String(Math.round(value)),
  }));
  const xTicks = pts.map((pt, i) => ({ x: pt.x, label: String(i + 1) }));

  return (
    <svg className={`spark${on ? " is-on" : ""}${reduce ? " is-still" : ""}`} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <g className="spark-rules">
        {yLines.map((y) => (
          <line key={`h${y}`} x1={pad.l} y1={y} x2={pad.l + plotW} y2={y} />
        ))}
        {pts.map((pt) => (
          <line key={`v${pt.x}`} x1={pt.x} y1={pad.t} x2={pt.x} y2={plotBottom} />
        ))}
      </g>
      <g className="spark-axis">
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={plotBottom} />
        <line x1={pad.l} y1={plotBottom} x2={pad.l + plotW} y2={plotBottom} />
      </g>
      {yTicks.map((tick) => (
        <text key={`y${tick.y}`} className="spark-label" x={pad.l - 3} y={tick.y + 2} textAnchor="end">
          {tick.label}
        </text>
      ))}
      {xTicks.map((tick) => (
        <text key={`x${tick.x}`} className="spark-label" x={tick.x} y={h - 4} textAnchor="middle">
          {tick.label}
        </text>
      ))}
      <path
        className="spark-glow"
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <path
        className="spark-line"
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <circle className="spark-dot" cx={last.x} cy={last.y} r="2.6" fill="currentColor" />
    </svg>
  );
}

export default function SparkStats({ cards }: { cards: Card[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="spark-grid">
      {cards.map((card, i) => (
        <motion.article
          key={card.label}
          className="spark-card"
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.94 }}
          animate={on ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="spark-top">
            <span>{card.label}</span>
            <b className={card.up === false ? "is-down" : ""}>{card.delta}</b>
          </div>
          <strong>{card.value}</strong>
          <Spark series={card.series} on={on} reduce={Boolean(reduce)} />
        </motion.article>
      ))}
    </div>
  );
}
