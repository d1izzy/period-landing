import { useState, type ReactNode } from "react";
import PeriodMark from "../PeriodMark";

type Tab = "home" | "day" | "capture" | "money" | "profile";

const WEEK = [
  { label: "п", h: 18 },
  { label: "в", h: 28 },
  { label: "с", h: 14 },
  { label: "ч", h: 36 },
  { label: "п", h: 22 },
  { label: "с", h: 10 },
  { label: "в", h: 26, on: true },
];

function IconHome() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 10l6-6 6 6v7H3v-7z" />
    </svg>
  );
}

function IconDay() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="12" height="12" rx="2" />
      <path d="M3 8h12" />
    </svg>
  );
}

function IconMoney() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 13l4-4 3 3 5-6" />
      <path d="M3 16h12" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="7" r="3" />
      <path d="M3 16c1.5-3 10.5-3 12 0" />
    </svg>
  );
}

function Top({ title, aside }: { title: string; aside: string }) {
  return (
    <div className="device-app-top">
      <b>{title}</b>
      <span>{aside}</span>
    </div>
  );
}

function Card({ label, children, hero }: { label: string; children: ReactNode; hero?: boolean }) {
  return (
    <div className={hero ? "device-app-rest" : "device-app-card"}>
      <span>{label}</span>
      {children}
    </div>
  );
}

function HomeScreen() {
  return (
    <>
      <Top title="Period" aside="сегодня" />
      <Card label="Осталось" hero>
        <strong>12 400 ₽</strong>
      </Card>
      <div className="device-app-list">
        <p>
          <b>Встреча</b>
          завтра 15:00
        </p>
        <p>
          <b>Такси</b>
          500 ₽
        </p>
        <p>
          <b>Обед</b>
          борщ, записано
        </p>
      </div>
    </>
  );
}

function DayScreen() {
  return (
    <>
      <Top title="День" aside="22 авг" />
      <Card label="Встречи">
        <em>на сегодня пусто</em>
      </Card>
      <Card label="Задачи">
        <strong className="device-app-line">созвон с Андреем</strong>
        <small>завтра 15:00</small>
      </Card>
      <Card label="Привычки">
        <strong className="device-app-line">вода</strong>
        <small>открыто</small>
      </Card>
    </>
  );
}

function CaptureScreen() {
  return (
    <>
      <Top title="Period" aside="запись" />
      <p className="device-app-lead">Одна фраза — встреча, трата и задача сразу.</p>
      <div className="device-app-field">завтра в три встреча, 500 на такси</div>
      <span className="device-app-btn">Записать текст</span>
      <span className="device-app-btn is-ghost">Начать запись</span>
    </>
  );
}

function MoneyScreen({ mode, onMode }: { mode: "expense" | "income"; onMode: (m: "expense" | "income") => void }) {
  return (
    <>
      <Top title="Деньги" aside="август" />
      <Card label="Осталось" hero>
        <strong>12 400 ₽</strong>
        <small>из 45 000 ₽ за месяц</small>
      </Card>
      <div className="device-app-seg" role="tablist">
        <button type="button" className={mode === "expense" ? "is-on" : ""} onClick={() => onMode("expense")}>
          Расход
        </button>
        <button type="button" className={mode === "income" ? "is-on" : ""} onClick={() => onMode("income")}>
          Доход
        </button>
      </div>
      <Card label="7 дней">
        <strong className="device-app-line">8 640 ₽</strong>
        <div className="device-app-bars">
          {WEEK.map((bar, i) => (
            <i key={i} className={bar.on ? "is-on" : ""} style={{ height: bar.h }}>
              <u>{bar.label}</u>
            </i>
          ))}
        </div>
      </Card>
    </>
  );
}

function ProfileScreen() {
  return (
    <>
      <Top title="Профиль" aside="аккаунт" />
      <div className="device-app-me">
        <span className="device-app-ava">А</span>
        <div>
          <strong>Анна</strong>
          <small>@period</small>
        </div>
      </div>
      <Card label="Месячный лимит">
        <strong className="device-app-line">45 000 ₽</strong>
      </Card>
      <div className="device-app-pro">
        <span>PRO</span>
        <b>Подключить</b>
        <small>безлимит AI · 190 ₽</small>
      </div>
    </>
  );
}

export default function DeviceApp() {
  const [tab, setTab] = useState<Tab>("home");
  const [moneyMode, setMoneyMode] = useState<"expense" | "income">("expense");

  return (
    <div className="device-app">
      <div className="device-app-stage">
        <div key={tab} className="device-app-body">
          {tab === "home" && <HomeScreen />}
          {tab === "day" && <DayScreen />}
          {tab === "capture" && <CaptureScreen />}
          {tab === "money" && <MoneyScreen mode={moneyMode} onMode={setMoneyMode} />}
          {tab === "profile" && <ProfileScreen />}
        </div>
      </div>
      <nav className="device-app-nav" aria-label="Разделы Mini App">
        <button type="button" className={tab === "home" ? "is-on" : ""} onClick={() => setTab("home")}>
          <IconHome />
          Обзор
        </button>
        <button type="button" className={tab === "day" ? "is-on" : ""} onClick={() => setTab("day")}>
          <IconDay />
          День
        </button>
        <button
          type="button"
          className={`device-app-add${tab === "capture" ? " is-on" : ""}`}
          aria-label="Period"
          onClick={() => setTab("capture")}
        >
          <PeriodMark size={22} />
        </button>
        <button type="button" className={tab === "money" ? "is-on" : ""} onClick={() => setTab("money")}>
          <IconMoney />
          Деньги
        </button>
        <button type="button" className={tab === "profile" ? "is-on" : ""} onClick={() => setTab("profile")}>
          <IconProfile />
          Профиль
        </button>
      </nav>
    </div>
  );
}
