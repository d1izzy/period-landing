import { motion, useReducedMotion } from "motion/react";
import "./CompareTable.css";

type Row = { name: string; start: boolean; pro: boolean };

function Cell({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="cmp-yes" aria-label="есть">
      ✓
    </span>
  ) : (
    <span className="cmp-no" aria-label="нет">
      ✕
    </span>
  );
}

export default function CompareTable({ rows }: { rows: Row[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="cmp">
      <div className="cmp-row is-head">
        <span>Возможность</span>
        <span>Старт</span>
        <span>PRO</span>
      </div>
      {rows.map((row, i) => (
        <motion.div
          className="cmp-row"
          key={row.name}
          initial={reduce ? false : { opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <b>{row.name}</b>
          <Cell ok={row.start} />
          <Cell ok={row.pro} />
        </motion.div>
      ))}
    </div>
  );
}
