export default function PeriodMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      className="period-mark"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="6.15" stroke="currentColor" strokeWidth="1.45" />
      <circle cx="24.15" cy="24.15" r="3.35" fill="currentColor" />
    </svg>
  );
}
