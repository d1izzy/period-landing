import { lazy, Suspense, useEffect, useState } from "react";
import BlurHighlight from "./bits/BlurHighlight";
import BlurText from "./bits/BlurText";
import CompareTable from "./bits/CompareTable";
import CountUp from "./bits/CountUp";
import Device from "./bits/Device";
import DeviceApp from "./bits/DeviceApp";
import FaqChat from "./bits/FaqChat";
import OrbitMap from "./bits/OrbitMap";
import Reveal from "./bits/Reveal";
import SmoothScroll from "./bits/SmoothScroll";
import SparkStats from "./bits/SparkStats";
import SoftStar from "./bits/SoftStar";
import SpotlightCard from "./bits/SpotlightCard";
import TextPath from "./bits/TextPath";
import PeriodMark from "./PeriodMark";
import SiteFooter from "./SiteFooter";
import { BOT } from "./site";
import "./App.css";

const Silk = lazy(() => import("./bits/Silk"));
const Orb = lazy(() => import("./bits/Orb"));

const navLinks = [
  { href: "#wall", label: "Зачем" },
  { href: "#look", label: "Как это" },
  { href: "#inside", label: "Возможности" },
  { href: "#price", label: "PRO" },
] as const;

const menuLinks = [
  ...navLinks,
  { href: "#tone", label: "Как пишет" },
  { href: "#faq", label: "Вопросы" },
  { href: "#start", label: "Начать" },
] as const;

const sparkCards = [
  {
    label: "Траты",
    value: "12 400 ₽",
    delta: "−8%",
    up: false,
    series: [18, 16, 21, 14, 19, 12, 11],
  },
  {
    label: "Ккал",
    value: "1 840",
    delta: "в цели",
    series: [12, 14, 13, 16, 15, 17, 16],
  },
  {
    label: "Вода",
    value: "1,4 л",
    delta: "+0,2",
    series: [6, 8, 7, 9, 10, 11, 12],
  },
  {
    label: "Дела",
    value: "3",
    delta: "сегодня",
    series: [1, 2, 1, 3, 2, 2, 3],
  },
];

const compareRows = [
  { name: "Текст, голос и фото еды", start: true, pro: true },
  { name: "Mini App в Telegram", start: true, pro: true },
  { name: "5 AI-разборов в день", start: true, pro: true },
  { name: "Безлимит AI", start: false, pro: true },
  { name: "Дашборд расходов", start: false, pro: true },
  { name: "Итоги недели", start: false, pro: true },
];

const plans = [
  { name: "Месяц", price: "190", hint: "Каждый месяц", featured: false },
  { name: "Год", price: "1 596", hint: "−30% к помесячной оплате", featured: true },
  { name: "Навсегда", price: "3 192", hint: "Один платёж, без подписки", featured: false },
];

const never = [
  "Вы превысили лимит!",
  "Три дня без записей. Стрик сгорел.",
  "Осталось всего 200 ₽. Не тратьте.",
];

const instead = [
  "День вышел плотнее плана. Бывает — завтра просто вернёмся к ритму.",
  "Вернуться можно с одной фразы. Прошлое догонять не нужно.",
  "Остаток бюджета виден сразу — без пугающих уведомлений.",
];

export default function App() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const foot = document.querySelector<HTMLElement>(".foot8");
    if (!foot) return;

    const sync = () => {
      document.documentElement.style.setProperty("--foot8-h", `${foot.offsetHeight}px`);
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(foot);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    document.documentElement.classList.toggle("is-menu", menuOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
      document.documentElement.classList.remove("is-menu");
    };
  }, [menuOpen]);

  return (
    <div className="page">
      <SmoothScroll />
      <header className={`site-nav${navSolid || menuOpen ? " is-solid" : ""}`}>
        <div className="wrap nav">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <PeriodMark />
            <span className="brand-name">Period</span>
          </a>
          <nav className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <span className="nav-end">
            <button
              type="button"
              className={`nav-toggle${menuOpen ? " is-open" : ""}`}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </span>
        </div>
      </header>
      <div className={`site-menu${menuOpen ? " is-open" : ""}`} id="site-menu" hidden={!menuOpen}>
        <nav className="site-menu-links" aria-label="Разделы">
          {menuLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="site-sheet">
      <div className="silk" aria-hidden="true">
        <Suspense fallback={null}>
          <Silk color="#5c6066" speed={1.6} noiseIntensity={1.05} />
        </Suspense>
      </div>

      <main id="top">
        <section className="wrap hero">
          <Reveal variant="down" duration={0.7}>
            <p className="kicker">Telegram Mini App</p>
          </Reveal>
          <BlurText text="Жизнь и расходы. Пишете _как думаете._" />
          <Reveal variant="blur" delay={0.15}>
            <p className="lead">
              Period — Telegram-бот и Mini App для учёта расходов, еды, задач и встреч. Пишете
              текстом или голосом — AI раскладывает по категориям.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.28}>
            <div className="hero-actions">
              <a className="btn" href={BOT}>
                Начать в Telegram
              </a>
              <a className="btn btn-ghost" href="#look">
                Как это выглядит
              </a>
            </div>
          </Reveal>
          <div className="hero-stats">
            <Reveal variant="scale" delay={0.12}>
              <div className="hero-stat">
                <strong>
                  <CountUp to={5} />
                </strong>
                <span>AI-разборов в день на старте</span>
              </div>
            </Reveal>
            <Reveal variant="scale" delay={0.22}>
              <div className="hero-stat">
                <strong>
                  <CountUp to={3} />
                </strong>
                <span>способа захвата: текст, голос, фото</span>
              </div>
            </Reveal>
            <Reveal variant="scale" delay={0.32}>
              <div className="hero-stat">
                <strong>
                  <CountUp to={4} />
                </strong>
                <span>области: деньги, еда, дела, встречи</span>
              </div>
            </Reveal>
          </div>
        </section>

        <TextPath text="текст · голос · фото · деньги · еда · дела · период" />

        <section className="wrap chapter" id="wall">
          <div className="wall-split">
            <div>
              <Reveal variant="blur">
                <p className="chap">01 · Зачем</p>
                <h2>
                  Формы стоят между вами и тем, <em>что уже произошло</em>
                </h2>
              </Reveal>
              <div className="prose">
                <BlurHighlight highlightedBits={["поля, категории, граммы"]}>
                  Обычные трекеры требуют поля, категории, граммы. Закрыл приложение — и запись
                  потерялась.
                </BlurHighlight>
                <BlurHighlight
                  highlightedBits={[
                    "текст, голос и фото",
                    "трата, встреча и запись о еде",
                    "бюджет, ккал, вода и дела",
                  ]}
                >
                  Period принимает текст, голос и фото. «500 на такси, встреча завтра в 15:00, борщ на
                  обед» → трата, встреча и запись о еде. Фото тарелки — блюдо и калории. В Mini App:
                  бюджет, ккал, вода и дела.
                </BlurHighlight>
                <BlurHighlight highlightedBits={["Не банк", "не медицина", "Дневник периода"]}>
                  Не банк, не переводы, не медицина. Дневник периода — деньги, питание и задачи в
                  одном Telegram-боте.
                </BlurHighlight>
              </div>
            </div>
            <div className="wall-orb" aria-hidden="true">
              <Suspense fallback={null}>
                <Orb hoverIntensity={0} rotateOnHover={false} backgroundColor="#0a0a0a" />
              </Suspense>
              <div className="wall-orb-mark">
                <PeriodMark size={44} />
                <span>Period</span>
              </div>
            </div>
          </div>
        </section>

        <section className="wrap chapter" id="look">
          <Reveal variant="left">
            <p className="chap">02 · Как это выглядит</p>
            <h2>
              Не даёт таблицу. <em>Раскладывает фразу.</em>
            </h2>
          </Reveal>
          <div className="look">
            <div className="chat" aria-label="Пример диалога">
              <Reveal variant="left">
                <article className="msg you">
                  <b>Вы</b>
                  <p>завтра в три встреча, потратил 500 на такси, борщ на обед</p>
                </article>
              </Reveal>
              <Reveal variant="right" delay={0.18}>
                <article className="msg bot">
                  <b>Period</b>
                  <p>Встреча · завтра 15:00</p>
                  <p>Такси · 500 ₽</p>
                  <p>Обед · борщ, записано</p>
                </article>
              </Reveal>
              <Reveal variant="fade" delay={0.32}>
                <p className="chat-note">Дальше день видно по цифрам: деньги, ккал, вода, дела.</p>
              </Reveal>
            </div>
            <SparkStats cards={sparkCards} />
          </div>
        </section>

        <section className="wrap chapter" id="inside">
          <div className="orbit-split">
            <Reveal variant="left">
              <div className="orbit-copy">
                <p className="chap">03 · Что внутри</p>
                <h2>
                  Бот собирает день вокруг <em>одной точки</em>
                </h2>
                <p>
                  Текст, голос и фото сходятся в Mini App. В центре — период: сколько осталось денег,
                  что с едой и какие дела на сегодня.
                </p>
                <ul>
                  <li>
                    <b>01</b>
                    <span>Фраза раскладывается на встречу, трату и задачу</span>
                  </li>
                  <li>
                    <b>02</b>
                    <span>Фото тарелки даёт блюдо и ккал</span>
                  </li>
                  <li>
                    <b>03</b>
                    <span>Остаток бюджета на экране — без давления и уведомлений</span>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal variant="scale">
              <OrbitMap />
            </Reveal>
          </div>
        </section>

        <section className="wrap chapter" id="tone">
          <Reveal variant="tilt">
            <p className="chap">04 · Как пишет бот</p>
            <h2>
              Поддержка <em>вместо</em> вины
            </h2>
          </Reveal>
          <div className="tone">
            <Reveal variant="left">
              <div>
                <p className="tone-label">Так Period не говорит</p>
                <ul>
                  {never.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.12}>
              <div>
                <p className="tone-label">Вместо этого</p>
                <ul className="is-ok">
                  {instead.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="wrap chapter" id="price">
          <Reveal variant="up">
            <p className="chap">05 · Старт и PRO</p>
            <h2>
              Что входит в базу, а что в <em>PRO</em>
            </h2>
          </Reveal>
          <CompareTable rows={compareRows} />
          <div className="prices">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} variant="scale" delay={i * 0.1}>
                <SpotlightCard>
                  <div className={`price-card${plan.featured ? " featured" : ""}`}>
                    <span>{plan.name}</span>
                    <b>
                      {plan.price}
                      <SoftStar size={34} />
                    </b>
                    <p>{plan.hint}</p>
                    <a className="btn" href={BOT}>
                      Подключить в боте
                    </a>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="wrap chapter" id="faq">
          <div className="faq-split">
            <div>
              <Reveal variant="right">
                <p className="chap">06 · Вопросы</p>
                <h2>Коротко, как в чате</h2>
              </Reveal>
              <FaqChat />
            </div>
            <Reveal variant="scale">
              <Device scale={0.9} enableParallax={false}>
                <DeviceApp />
              </Device>
            </Reveal>
          </div>
        </section>

        <section className="cta-band" id="start">
          <Reveal className="cta-inner" variant="scale" duration={1.05}>
            <p className="chap">07 · Начать</p>
            <h2>
              Одна фраза.
              <em> Дальше Period.</em>
            </h2>
            <BlurHighlight highlightedBits={["как думаете"]}>
              Про встречу, трату, обед — напишите как думаете. Бот разложит сам.
            </BlurHighlight>
            <a className="btn" href={BOT}>
              Открыть в Telegram
            </a>
            <p className="cta-meta">Бесплатно на старте · Telegram · без карты</p>
          </Reveal>
        </section>
      </main>
      </div>

      <SiteFooter />
    </div>
  );
}
