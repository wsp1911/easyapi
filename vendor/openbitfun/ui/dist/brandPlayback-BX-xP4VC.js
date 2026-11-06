function f(...i) {
  return i.filter(Boolean).join(" ");
}
function l(i, d) {
  const r = i.ownerDocument, s = r.defaultView;
  if (!s?.matchMedia || typeof i.animate != "function") return () => {
  };
  const c = s.matchMedia("(prefers-reduced-motion: reduce)");
  let n = [], o = !0;
  const t = () => {
    c.matches ? (n.forEach((e) => e.cancel()), n = []) : r.hidden || !o ? n.forEach((e) => e.pause()) : n.length === 0 ? n = d() : n.forEach((e) => e.play());
  }, a = typeof IntersectionObserver > "u" ? void 0 : new IntersectionObserver(([e]) => {
    o = e?.isIntersecting ?? !1, t();
  });
  return a?.observe(i), t(), c.addEventListener("change", t), r.addEventListener("visibilitychange", t), () => {
    n.forEach((e) => e.cancel()), a?.disconnect(), c.removeEventListener("change", t), r.removeEventListener("visibilitychange", t);
  };
}
export {
  f as c,
  l as s
};
//# sourceMappingURL=brandPlayback-BX-xP4VC.js.map
