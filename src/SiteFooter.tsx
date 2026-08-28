import PeriodMark from "./PeriodMark";
import { BOT } from "./site";

export default function SiteFooter() {
  return (
    <footer className="foot8">
      <div className="foot8-inner">
        <div className="foot8-top">
          <div className="foot8-brand-block">
            <a className="brand foot8-brand" href="/">
              <PeriodMark size={26} />
              <span className="brand-name">Period</span>
            </a>
            <a className="foot8-social" href={BOT} aria-label="Открыть Telegram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M21.7 4.3c.3-.9-.5-1.6-1.3-1.3L2.8 9.4c-.9.3-.9 1.6.1 1.8l4.6 1.1 1.8 5.7c.3.8 1.3 1 1.8.4l2.6-2.6 4.4 3.3c.7.5 1.7.1 1.9-.7z" />
              </svg>
            </a>
          </div>
          <div className="foot8-cols">
            <div>
              <b>Продукт</b>
              <a href="/#look">Как это выглядит</a>
              <a href="/#inside">Что внутри</a>
              <a href="/#price">Старт и PRO</a>
            </div>
            <div>
              <b>Бот</b>
              <a href={BOT}>Открыть в Telegram</a>
              <a href="/#faq">Частые вопросы</a>
            </div>
            <div>
              <b>Важно</b>
              <a href="/privacy">Политика конфиденциальности</a>
              <a href="/terms">Условия пользования</a>
              <span>Не банк и не переводы</span>
              <span>Не медицинский сервис</span>
            </div>
          </div>
        </div>
        <p className="foot8-copy">
          © 2026 Period ·{" "}
          <a href="/privacy">Конфиденциальность</a>
          {" · "}
          <a href="/terms">Условия</a>
        </p>
      </div>
    </footer>
  );
}
