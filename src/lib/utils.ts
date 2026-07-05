/** Catmull-Rom spline → cubic Bézier SVG path (smooth, no external deps) */
export function smoothPath(pts: [number, number][], t = 0.38): string {
  if (pts.length < 2) return "";
  const n = pts.length;
  const segs: string[] = [`M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`];
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];
    segs.push(
      `C ${(p1[0] + (p2[0] - p0[0]) * t).toFixed(2)} ${(p1[1] + (p2[1] - p0[1]) * t).toFixed(2)} ` +
      `${(p2[0] - (p3[0] - p1[0]) * t).toFixed(2)} ${(p2[1] - (p3[1] - p1[1]) * t).toFixed(2)} ` +
      `${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
    );
  }
  return segs.join(" ");
}
