export default function StatusDot({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span className="inline-flex items-center gap-[6px] text-[13px] font-geist text-[#4c4546]">
      <span className={`inline-block w-[6px] h-[6px] rounded-full ${isActive ? "bg-[#22c55e]" : "bg-[#ef4444]"}`} />
      {status}
    </span>
  );
}
