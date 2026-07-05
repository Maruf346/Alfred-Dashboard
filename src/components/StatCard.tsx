export default function StatCard({ label, value, progress }: { label: string; value: string; progress: number }) {
  return (
    <div
      className="flex-1 rounded-[25.6px] relative"
      style={{
        backdropFilter: "blur(16px)",
        background: "rgba(255,255,255,0.7)",
        border: "0.8px solid rgba(255,255,255,0.6)",
        boxShadow: "0px 3.2px 4.8px -0.8px rgba(0,0,0,0.05), 0px 16px 20px -4px rgba(0,0,0,0.03)",
      }}
    >
      <div className="flex flex-col gap-[12.8px] p-[20px]">
        <span className="font-jetbrains text-[#4c4546] text-[12.8px] uppercase leading-[19.2px]">{label}</span>
        <span className="font-geist text-[#151c27] text-[28.8px] leading-[32px]">{value}</span>
        <div className="h-[4.8px] rounded-full bg-[#dce2f3] overflow-hidden">
          <div className="h-full rounded-full bg-black" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
