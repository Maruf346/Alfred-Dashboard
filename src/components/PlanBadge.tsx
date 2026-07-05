export default function PlanBadge({ plan, style }: { plan: string; style: string }) {
  if (style === "black") {
    return (
      <span className="inline-flex items-center px-[8px] py-[3px] rounded-[4px] bg-[#151c27] text-white text-[10px] font-semibold tracking-[0.6px] uppercase font-geist">
        {plan}
      </span>
    );
  }
  if (style === "cancelled") {
    return (
      <span className="inline-flex items-center px-[8px] py-[3px] rounded-[4px] bg-[#fde8e8] text-[#c0392b] text-[10px] font-semibold tracking-[0.6px] uppercase font-geist">
        {plan}
      </span>
    );
  }
  if (style === "gray") {
    return (
      <span className="inline-flex items-center px-[8px] py-[3px] rounded-[4px] bg-[#f0f0f0] text-[#4c4546] text-[10px] font-semibold tracking-[0.6px] uppercase font-geist border border-[rgba(0,0,0,0.08)]">
        {plan}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-[8px] py-[3px] rounded-[4px] bg-transparent text-[#4c4546] text-[10px] font-semibold tracking-[0.6px] uppercase font-geist border border-[rgba(0,0,0,0.12)]">
      {plan}
    </span>
  );
}
