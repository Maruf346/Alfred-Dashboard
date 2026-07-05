import { ChevronLeft, ChevronRight } from "lucide-react";

export function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [];
  const add = (n: number | "…") => { if (pages[pages.length - 1] !== n) pages.push(n); };

  add(1);
  if (current > 3) add("…");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) add(p);
  if (current < total - 2) add("…");
  add(total);
  return pages;
}

export default function Pagination({
  page, totalPages, onPage,
}: { page: number; totalPages: number; onPage: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const list = buildPageList(page, totalPages);

  return (
    <div className="flex items-center gap-[3px]">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className="w-[28px] h-[28px] flex items-center justify-center rounded-[6px] transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(220,226,243,0.5)]"
      >
        <ChevronLeft size={14} color="#4c4546" />
      </button>

      {list.map((item, idx) =>
        item === "…" ? (
          <span key={`ellipsis-${idx}`} className="w-[28px] h-[28px] flex items-center justify-center text-[12px] font-geist text-[#4c4546]">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPage(item)}
            className={`w-[28px] h-[28px] flex items-center justify-center rounded-[6px] text-[12px] font-geist font-semibold transition-colors ${
              item === page
                ? "bg-[#151c27] text-white"
                : "text-[#4c4546] hover:bg-[rgba(220,226,243,0.5)]"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className="w-[28px] h-[28px] flex items-center justify-center rounded-[6px] transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(220,226,243,0.5)]"
      >
        <ChevronRight size={14} color="#4c4546" />
      </button>
    </div>
  );
}
