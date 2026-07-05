import { useState } from "react";
import { motion } from "motion/react";
import type { GrowthRow } from "@/types";

export default function BarChartSVG({ data }: { data: GrowthRow[] }) {
  const [hov, setHov] = useState<number | null>(null);
  const VW = 480, VH = 148, PT = 12, PB = 28;
  const chartH = VH - PT - PB;
  const maxVal = Math.max(...data.map(d => d.value)) * 1.15;
  const colW   = VW / data.length;
  const barW   = Math.round(Math.min(colW * 0.45, 40));
  const baseY  = PT + chartH;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full" style={{ overflow: "visible" }}>
      {data.map((d, i) => {
        const barH = Math.max(4, (d.value / maxVal) * chartH);
        const cx   = colW * i + colW / 2;
        const bx   = Math.round(cx - barW / 2);
        const by   = PT + chartH - barH;
        const isH  = hov === i;

        const tipW = 56;
        const tipX = Math.max(2, Math.min(cx - tipW / 2, VW - tipW - 2));

        return (
          <g key={d.id} style={{ cursor: "default" }}
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>

            <rect
              x={colW * i + 3} y={PT} width={colW - 6} height={chartH}
              rx={5} fill={isH ? "rgba(220,226,243,0.28)" : "transparent"}
            />

            <motion.rect
              x={bx} width={barW} rx={5} ry={5}
              fill={isH ? "#243343" : "#151c27"}
              initial={{ y: baseY, height: 0 }}
              animate={{ y: by, height: barH }}
              transition={{ duration: 0.55, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
            />

            <text x={cx} y={VH - 6} textAnchor="middle" fontSize={7.5}
              fill="#6b7588" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5">
              {d.month}
            </text>

            {isH && (
              <g>
                <rect x={tipX} y={by - 32} width={tipW} height={24} rx={6}
                  fill="white"
                  style={{ filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.14))" }}
                />
                <text
                  x={tipX + tipW / 2} y={by - 16}
                  textAnchor="middle" fontSize={10.5} fontWeight="700"
                  fill="#151c27" fontFamily="Geist, sans-serif">
                  {d.value.toLocaleString()}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
