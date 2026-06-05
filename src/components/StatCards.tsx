import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import type { StatCardsProps } from "../types";
import "./css/StatCards.css";

function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  run,
  delay = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  run: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) =>
    prefix +
    v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix
  );

  useEffect(() => {
    if (!inView || !run) return;
    const controls = animate(mv, to, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, run, to, mv, delay]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

function Spark({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 32;
  const step = w / (data.length - 1);
  const pts = data.map((d, i) => {
    const x = i * step;
    const y = h - ((d - min) / range) * (h - 6) - 3;
    return [x, y] as const;
  });
  const line = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polygon className="spark-area" points={area} />
      <polyline className="spark-line" points={line} pathLength={1} />
      <circle
        className="spark-head"
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="2.4"
      />
    </svg>
  );
}

const StatCards = ({ stats, active = true }: StatCardsProps) => {
  return (
    <div className="stat-grid">
      {stats.map((s, i) => (
        <motion.div
          key={s.key}
          className="stat-card"
          initial={{ opacity: 0, y: 18 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{
            duration: 0.6,
            delay: 0.15 + i * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            y: -3,
            transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className="stat-top">
            <span className="stat-label">{s.label}</span>
            <span className="stat-index">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div className="stat-value">
            <Counter
              to={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              decimals={s.decimals}
              run={active}
              delay={0.3 + i * 0.09}
            />
          </div>
          <div className="stat-foot">
            <span className="stat-hint">{s.hint}</span>
            <Spark data={s.spark} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;
