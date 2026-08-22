import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import "./FaqChat.css";

const ITEMS = [
  {
    q: "Это банк?",
    a: "Нет. Period не переводит деньги. Это дневник трат, еды и дел внутри Telegram.",
  },
  {
    q: "Нужно ли приложение?",
    a: "Нет. Бот и Mini App открываются в Telegram. Отдельно ничего ставить не нужно.",
  },
  {
    q: "Что даёт PRO?",
    a: "Безлимит AI, дашборд расходов и итоги недели. Оплата — Telegram Stars.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function FaqChat() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="faq-chat">
      {ITEMS.map((item, i) => {
        const on = open === i;
        return (
          <motion.div
            key={item.q}
            className="faq-turn"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: i * 0.1, duration: 0.55, ease }}
          >
            <button
              type="button"
              className={`faq-q${on ? " is-on" : ""}`}
              aria-expanded={on}
              onClick={() => setOpen(on ? null : i)}
            >
              <b>Вы</b>
              <span>{item.q}</span>
            </button>
            <div className={`faq-a-wrap${on ? " is-open" : ""}`}>
              <div className="faq-a-inner">
                <div className="faq-a" aria-hidden={!on}>
                  <b>Period</b>
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
