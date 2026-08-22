import { motion, useReducedMotion } from "motion/react";
import PeriodMark from "../PeriodMark";
import "./OrbitMap.css";

const LABELS = ["Текст", "Голос", "Фото", "Деньги", "Еда", "Дела"] as const;
const RADIUS = 40;

const NODES = LABELS.map((label, i) => {
  const angle = (Math.PI / 3) * i - Math.PI / 2;
  return {
    label,
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
});

export default function OrbitMap() {
  const reduce = useReducedMotion();

  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit-glow" />
      <svg className="orbit-svg" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232,234,237,0.14)" />
            <stop offset="55%" stopColor="rgba(232,234,237,0.03)" />
            <stop offset="100%" stopColor="rgba(232,234,237,0)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#orbit-core)" />
        <circle className="orbit-ring-svg outer" cx="50" cy="50" r="40" />
        <circle className="orbit-ring-svg mid" cx="50" cy="50" r="28" />
        <circle className="orbit-ring-svg inner" cx="50" cy="50" r="16.5" />
        {NODES.map((node) => (
          <g key={node.label}>
            <line className="orbit-ray" x1="50" y1="50" x2={node.x} y2={node.y} />
            <circle className="orbit-dot" cx={node.x} cy={node.y} r="0.85" />
          </g>
        ))}
      </svg>
      <div className={`orbit-spin${reduce ? " is-still" : ""}`} />
      <div className="orbit-hub-wrap">
        {reduce ? null : (
          <div className="orbit-radar">
            <span />
            <span />
            <span />
          </div>
        )}
        <motion.div
          className="orbit-hub"
          initial={reduce ? false : { opacity: 0, scale: 0.72 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <PeriodMark size={32} />
          <span>Period</span>
        </motion.div>
      </div>
      {NODES.map((node, i) => (
        <div
          key={node.label}
          className="orbit-node-wrap"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <motion.span
            className="orbit-node"
            style={{ animationDelay: `${i * 0.55}s` }}
            initial={reduce ? false : { opacity: 0, scale: 0.7, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: 0.16 + i * 0.07,
              duration: 0.55,
              type: "spring",
              stiffness: 280,
              damping: 18,
            }}
          >
            {node.label}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
