import { useEffect, useRef, useState, type CSSProperties } from "react";

function tokens(text: string) {
  const out: { word: string; italic: boolean }[] = [];
  const re = /_([^_]+)_|(\S+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match[1] != null) {
      for (const word of match[1].split(/\s+/).filter(Boolean)) {
        out.push({ word, italic: true });
      }
    } else if (match[2]) {
      out.push({ word: match[2], italic: false });
    }
  }
  return out;
}

export default function BlurText({
  text,
  className = "",
  delay = 40,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setOn(true);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <h1 ref={ref} className={`blur-text ${on ? "is-on" : ""} ${className}`.trim()} style={style}>
      {tokens(text).map((part, i) => (
        <span
          key={`${part.word}-${i}`}
          className={part.italic ? "is-italic" : undefined}
          style={{ transitionDelay: `${i * delay}ms` }}
        >
          {part.word}
        </span>
      ))}
    </h1>
  );
}
