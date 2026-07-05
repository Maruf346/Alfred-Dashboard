import { useState } from "react";
import { motion } from "motion/react";
import { smoothPath } from "@/lib/utils";
import type { RetentionRow } from "@/types";

export default function LineChartSVG({ data }: { data: RetentionRow[] }) {
  const [hov, setHov] = useState<number | null>(null);
  const VW = 480, VH = 148, PT = 14, PB = 28;
  const chartH = VH - PT - PB;
  const minV = 42, maxV = 100, range = maxV - minV;
  const colW  = VW / data.length;
  const toY   = (v: number) => PT + chartH - ((v - minV) / range) * chartH;
  const bottomY = PT + chartH;

  const premPts:  [number, number][] = data.map((d, i) => [colW * i + colW / 2, toY(d.premium)]);
  const basicPts: [number, number][] = data.map((d, i) => [colW * i + colW / 2, toY(d.basic)]);
  const premPath  = smoothPath(premPts);
  const basicPath = smoothPath(basicPts);

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full" style={{ overflow: "visible" }}>
      <motion.path
        key={`basic-${data.length}`}
        d={basicPath} fill="none"
        stroke="#6e8ec9" strokeWidth={2.2}
        strokeDasharray="7 4" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.7, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
      />
      <motion.path
        key={`prem-${data.length}`}
        d={premPath} fill="none"
        stroke="#151c27" strokeWidth={2.2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.7, ease: [0.4, 0, 0.2, 1] }}
      />

      {data.map((d, i) => {
        const cx  = colW * i + colW / 2;
        const py  = toY(d.premium);
        const by2 = toY(d.basic);
        const isH = hov === i;
        const tipW = 92, tipH = 48;
        const tipX = Math.max(2, Math.min(cx - tipW / 2, VW - tipW - 2));
        const tipY = Math.max(2, Math.min(py, by2) - tipH - 12);

        return (
          <g key={d.id} style={{ cursor: "default" }}
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
            <rect x={colW * i} y={0} width={colW} height={VH} fill="transparent" />

            {isH && (
              <g>
                <line x1={cx} y1={PT} x2={cx} y2={bottomY}
                  stroke="rgba(140,155,190,0.35)" strokeWidth={1}
                  strokeDasharray="4 3" strokeLinecap="round" />

                <circle cx={cx} cy={py}  r={4.5} fill="white" stroke="#151c27" strokeWidth={2} />
                <circle cx={cx} cy={by2} r={4.5} fill="white" stroke="#6e8ec9" strokeWidth={2} />

                <rect x={tipX} y={tipY} width={tipW} height={tipH} rx={7}
                  fill="white"
                  style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.12))" }} />

                <circle cx={tipX + 12} cy={tipY + 16} r={3.5} fill="#151c27" />
                <text x={tipX + 20} y={tipY + 20} fontSize={10}
                  fontFamily="Geist, sans-serif" fill="#151c27">Premium</text>
                <text x={tipX + tipW - 8} y={tipY + 20} textAnchor="end"
                  fontSize={10} fontWeight="700" fontFamily="Geist, sans-serif" fill="#151c27">
                  {d.premium}%
                </text>

                <circle cx={tipX + 12} cy={tipY + 34} r={3.5} fill="#6e8ec9" />
                <text x={tipX + 20} y={tipY + 38} fontSize={10}
                  fontFamily="Geist, sans-serif" fill="#6b7a94">Basic</text>
                <text x={tipX + tipW - 8} y={tipY + 38} textAnchor="end"
                  fontSize={10} fontWeight="700" fontFamily="Geist, sans-serif" fill="#6b7a94">
                  {d.basic}%
                </text>
              </g>
            )}

            <text x={cx} y={VH - 6} textAnchor="middle" fontSize={7.5}
              fill="#6b7588" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5">
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
