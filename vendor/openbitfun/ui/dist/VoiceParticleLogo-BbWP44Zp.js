import { jsx as Et } from "react/jsx-runtime";
import { useRef as tt, useEffect as wt } from "react";
import { c as Bt } from "./brandPlayback-BX-xP4VC.js";
const dt = { user: null, assistant: null, assistantSpeaking: !1 }, O = {
  human: { strength: 1.4, motion: 1.2, density: 1.4, brightness: 1 },
  ai: { strength: 2.1, motion: 1.6, density: 1.5, brightness: 1.2 }
}, I = (d, r, u) => Math.max(r, Math.min(u, d)), _ = (d, r, u) => d + (r - d) * u;
function bt(d) {
  let r = 0, u = 0;
  for (const h of d) {
    const c = h / 255;
    r += c, c > u && (u = c);
  }
  return { average: d.length ? r / d.length : 0, peak: u };
}
class zt {
  mode = "idle";
  micLevel = 0;
  aiActivity = 0;
  aiAudioLevel = 0;
  previousAiAudioLevel = 0;
  aiBreathPulse = 0;
  aiPulse = 0;
  update(r, u) {
    if (this.mode = r.assistantSpeaking ? "ai" : r.user ? "speech" : "idle", r.user) {
      const { average: h, peak: c } = bt(r.user);
      this.micLevel = _(this.micLevel, Math.max(h * 1.8, c * 0.85), 0.18), this.aiActivity = Math.max(this.aiActivity, c * 0.45);
    } else
      this.micLevel *= 0.92;
    if (r.assistant) {
      const { average: h, peak: c } = bt(r.assistant);
      this.aiAudioLevel = _(this.aiAudioLevel, Math.max(h * 1.7, c * 1.15), 0.24), this.aiActivity = Math.max(this.aiActivity, h * 1.7, c * 1.15);
    } else
      this.aiAudioLevel *= 0.9;
    if (this.mode === "ai") {
      const h = this.previousAiAudioLevel > 0.12 && this.aiAudioLevel < 0.07 ? 0.76 : 0;
      this.aiBreathPulse = Math.max(this.aiBreathPulse * 0.955, h), this.previousAiAudioLevel = this.aiAudioLevel, this.aiActivity *= 0.965;
      const c = 0.18 + Math.sin(u * 0.01) * 0.07;
      this.aiPulse = _(this.aiPulse, Math.max(0.18, this.aiActivity + c), 0.16);
    } else
      this.aiActivity *= 0.9, this.aiPulse *= 0.88, this.aiAudioLevel *= 0.88, this.aiBreathPulse *= 0.88, this.previousAiAudioLevel = this.aiAudioLevel;
    return {
      base: I(this.micLevel * O.human.strength, 0, 1.4),
      ai: I(this.aiPulse * O.ai.strength, 0, 2.2),
      aiBreath: I(this.aiBreathPulse * O.ai.strength, 0, 1.5),
      demo: 0
    };
  }
}
function Ft(d, r, u, h) {
  const c = r.x - d.x, X = r.y - d.y, R = Math.max(1, Math.hypot(c, X)), M = c / R, y = X / R, A = -y, f = M, P = u * d.motionSpeed + d.motionPhase, S = Math.sin(P) * 0.7 + Math.cos(P * 0.63 + 1.4) * 0.35, b = Math.sin(P * 0.8 + R * 0.08) * 0.18;
  let g = c * 8e-4 + A * (0.045 + S * 0.03) + M * b * 0.025, v = X * 8e-4 + f * (0.045 + S * 0.03) + y * b * 0.025;
  const L = u * (7e-3 + h.base * 1e-3) + r.y * 0.014, D = h.base * O.human.motion, z = h.ai * O.ai.motion, k = h.aiBreath * O.ai.motion, E = Math.sin(L) * (0.08 + D * 0.16 + z * 0.24 + h.demo * 0.28), F = Math.cos(L * 0.73 + r.x * 4e-3) * (0.025 + D * 0.06 + z * 0.1);
  g += E * 0.32, v += F;
  const W = u * 0.015 + d.seed * 0.11 + r.x * 0.012, H = Math.sin(W) * k, q = Math.cos(W * 0.71 + r.y * 8e-3) * k;
  g += A * H * 0.14 + M * q * 0.035, v += f * H * 0.14 + y * q * 0.035;
  const C = r.x * 0.024 - r.y * 0.017 - u * 6e-3, G = Math.cos(C) * (h.aiBreath * 0.85 + h.ai * 0.18) * O.ai.motion;
  g += 0.82 * G * 0.12, v -= 0.57 * G * 0.12;
  const s = P * 1.7 + r.x * 0.011, o = Math.sin(s) * (D * 0.08 + z * 0.18 + h.demo * 0.2);
  return g += A * o, v += f * o, { ax: g, ay: v };
}
const Pt = "M309.959 16.0769C347.087 -5.35899 392.831 -5.35896 429.959 16.0769L679.919 160.39C717.047 181.826 739.919 221.442 739.919 264.314V552.942C739.919 595.814 717.047 635.429 679.919 656.865L429.959 801.179C392.831 822.615 347.087 822.615 309.959 801.179L60 656.865C22.8719 635.429 8.5819e-05 595.814 0 552.942V264.313C0.000173083 221.442 22.872 181.826 60 160.39L309.959 16.0769ZM249.035 119.18C220.454 119.18 194.044 134.428 179.753 159.18L58.8281 368.628C44.5375 393.38 44.5375 423.876 58.8281 448.628L179.753 658.075C194.043 682.827 220.453 698.075 249.034 698.075H490.884C519.465 698.075 545.875 682.827 560.166 658.075L681.091 448.628C695.381 423.876 695.381 393.38 681.091 368.628L560.166 159.18C545.875 134.428 519.465 119.18 490.884 119.18H249.035Z", Y = { width: 740, height: 818 }, ut = 560, ct = 620, At = 1.7, U = 720, V = 800;
function Tt(d, r, u) {
  const h = d.getContext("2d");
  if (!h) return null;
  const c = h, X = new Path2D(Pt);
  let R = [], M = [], y = null, A = null, f = null, P = 1, S = 0, b = 0;
  const g = new zt(), v = () => ({ x: 0, width: U, cx: U * 0.5 }), L = document.createElement("canvas");
  L.width = 256, L.height = 1;
  const D = L.getContext("2d", { willReadFrequently: !0 });
  if (!D) return null;
  const z = [];
  function k(s, o) {
    r = s, u = o;
    const i = D;
    i.globalAlpha = 1, i.fillStyle = u, i.fillRect(0, 0, 256, 1), i.fillStyle = r;
    for (let e = 0; e < 256; e++)
      i.globalAlpha = e / 255, i.fillRect(e, 0, 1, 1);
    const a = i.getImageData(0, 0, 256, 1).data;
    for (let e = 0; e < 256; e++) {
      const n = e * 4;
      z[e] = `rgb(${a[n]},${a[n + 1]},${a[n + 2]})`;
    }
  }
  k(r, u);
  function E(s, o) {
    const i = Math.floor((o - b) / P);
    if (!f || i < 0 || i >= f.length / 2) return !1;
    const a = (s - S) / P;
    return a >= f[i * 2] && a < f[i * 2 + 1];
  }
  function F(s, o = 0, i = 0) {
    const a = new Path2D();
    f = new Float64Array(s.height * 2), f.fill(1 / 0), P = 1, S = o, b = i;
    for (let e = 0; e < s.height; e++) {
      let n = -1, w = -1;
      for (let t = 0; t < s.width; t++)
        s.data[(e * s.width + t) * 4 + 3] > 18 && (n < 0 && (n = t), w = t);
      n >= 0 && (a.rect(n + o, e + i, w - n + 1, 1), f[e * 2] = n, f[e * 2 + 1] = w + 1);
    }
    A = a;
  }
  function W() {
    const s = new Path2D(Pt), o = [], i = v(), a = i.cx, e = V * 0.5, n = Math.min(i.width * 0.88, ut), w = Math.min(V * 0.78, ct), t = Math.min(
      n / Y.width,
      w / Y.height
    ), m = Y.width * t, T = Y.height * t, p = a - m * 0.5, B = e - T * 0.5, x = document.createElement("canvas");
    x.width = Math.max(1, Math.floor(m)), x.height = Math.max(1, Math.floor(T));
    const l = x.getContext("2d", { willReadFrequently: !0 });
    if (!l) return o;
    l.clearRect(0, 0, x.width, x.height), l.save(), l.setTransform(t, 0, 0, t, -740 * 0.5 * t + x.width * 0.5, -818 * 0.5 * t + x.height * 0.5), l.fillStyle = r, l.fill(s), l.restore();
    const j = l.getImageData(0, 0, x.width, x.height);
    F(j, p, B);
    const ht = Math.floor(2200 * At), J = Math.max(1, Math.floor(Math.sqrt(x.width * x.height / Math.max(ht * 2, 1)))), K = x.width * 0.5, et = x.height * 0.5, lt = Math.hypot(K, et) || 1;
    for (let N = 0; N < x.height; N += J)
      for (let $ = 0; $ < x.width; $ += J) {
        const Q = (N * x.width + $) * 4;
        if (j.data[Q + 3] < 8) continue;
        const nt = $ - K, it = N - et, st = Math.hypot(nt, it) / lt, Z = I(st, 0, 1), ot = 0.06 + 0.94 * Math.pow(Z, 1.8);
        Math.random() > ot || o.push({
          x: p + $,
          y: B + N,
          a: Math.atan2(it, nt),
          baseR: 1,
          bias: ot,
          centerDist: Z
        });
      }
    return o;
  }
  function H(s) {
    if (!s.length) return s;
    let o = 1 / 0, i = 1 / 0, a = -1 / 0, e = -1 / 0;
    for (const l of s)
      l.x < o && (o = l.x), l.y < i && (i = l.y), l.x > a && (a = l.x), l.y > e && (e = l.y);
    const n = a - o, w = e - i, t = v(), m = Math.min(t.width * 0.88, ut), T = Math.min(V * 0.78, ct), p = Math.min(
      m / Math.max(1, n),
      T / Math.max(1, w)
    ), B = t.x + (t.width - n * p) * 0.5, x = (V - w * p) * 0.5;
    if (A) {
      const l = new Path2D();
      l.addPath(A, new DOMMatrix([p, 0, 0, p, B - o * p, x - i * p])), A = l, S = S * p + B - o * p, b = b * p + x - i * p, P *= p;
    }
    return s.map((l) => ({
      x: (l.x - o) * p + B,
      y: (l.y - i) * p + x,
      a: l.a,
      baseR: l.baseR || 1,
      bias: l.bias,
      centerDist: l.centerDist
    }));
  }
  function q() {
    if (!M.length) {
      y = null;
      return;
    }
    let s = 1 / 0, o = 1 / 0, i = -1 / 0, a = -1 / 0;
    for (const e of M)
      e.x < s && (s = e.x), e.y < o && (o = e.y), e.x > i && (i = e.x), e.y > a && (a = e.y);
    y = { minX: s, minY: o, maxX: i, maxY: a, cx: (s + i) * 0.5, cy: (o + a) * 0.5 };
  }
  function C(s) {
    if (M = H(s), !M.length) return;
    const o = Math.max(800, Math.floor(M.length * At)), i = [];
    for (let a = 0; a < o; a++) {
      const e = Math.floor(Math.random() * M.length), n = M[e];
      i.push({
        x: n.x,
        y: n.y,
        vx: 0,
        vy: 0,
        anchorIndex: e,
        seed: Math.random() * 1e3,
        motionPhase: Math.random() * Math.PI * 2,
        motionSpeed: 11e-4 + Math.random() * 18e-4,
        size: 0.45 + Math.pow(Math.random(), 2) * 2.35,
        sizePhase: Math.random() * Math.PI * 2,
        sizeSpeed: 5e-4 + Math.random() * 1e-3,
        centerDist: n.centerDist ?? 0.5,
        bias: n.bias ?? 0.5
      });
    }
    R = i, q();
  }
  function G(s, o, i, a) {
    if (!R.length || !M.length) return;
    const e = Math.min(v().width, V, ct), n = g.mode === "ai" ? O.ai : O.human, w = Math.sin(s * 11e-4) * 0.6 + 0.9;
    c.save(), c.globalCompositeOperation = "lighter";
    for (const t of R) {
      const m = M[t.anchorIndex % M.length];
      if (i) {
        const Mt = Ft(t, m, s, o);
        t.vx += Mt.ax, t.vy += Mt.ay;
        const gt = g.mode === "ai" ? 0.034 : 0.05;
        if (t.vx += (m.x - t.x) * gt * 12e-4, t.vy += (m.y - t.y) * gt * 12e-4, t.vx *= 0.92, t.vy *= 0.92, t.x += t.vx, t.y += t.vy, A && !E(t.x, t.y)) {
          let at = 0, pt = 1;
          for (let vt = 0; vt < 12; vt++) {
            const rt = (at + pt) * 0.5;
            E(_(m.x, t.x, rt), _(m.y, t.y, rt)) ? at = rt : pt = rt;
          }
          t.x = _(m.x, t.x, at * 0.98), t.y = _(m.y, t.y, at * 0.98), t.vx *= 0.35, t.vy *= 0.35;
        }
      }
      const T = t.x - m.x, p = t.y - m.y, B = Math.hypot(T, p), x = I(1 - B / (e * 0.22), 0, 1), l = 0.55 + 0.45 * Math.sin(s * 14e-4 + t.seed * 0.7), j = I(o.ai * 0.6 + o.base * 0.2, 0, 1), ht = 0.42, J = y ? y.cx : U * 0.5, K = y ? y.cy : V * 0.5, et = y ? Math.min(y.maxX - y.minX, y.maxY - y.minY) * 0.5 : e * 0.42, lt = Math.max(1, et * ht), N = Math.hypot(t.x - J, t.y - K), $ = I(N / lt, 0, 1), Q = I(($ - 0.35) / 0.65, 0, 1), nt = 0.04 + 0.96 * Q * Q * (3 - 2 * Q), it = m.x * 0.024 - m.y * 0.017 - s * 6e-3, st = Math.pow((Math.sin(it) + 1) * 0.5, 6), Z = g.mode === "ai" ? I(o.aiBreath * 0.9 + o.ai * 0.22, 0, 1) : 0, ot = 1 - Z * 0.38 + st * Z * 0.92;
      if (t.seed * 0.61803398875 % 1 > I(nt * n.density * ot, 0, 1)) continue;
      const Lt = 1 + 0.22 * Math.sin(s * t.sizeSpeed + t.sizePhase) + 0.1 * Math.sin(s * t.sizeSpeed * 1.73 + t.sizePhase * 2), Ct = t.size * Lt * (0.92 + j * 0.18 + x * 0.22 + w * 0.08), mt = st * Z, It = Math.round(I(190 - B * 0.08 + j * 35 + l * 16 + mt * 28 + (n.brightness - 1) * 35, 120, 255)), Rt = I((0.18 + (1 - B / (e * 0.18)) * 0.45 + j * 0.22 + mt * 0.16) * n.brightness, 0.08, 0.9);
      c.fillStyle = z[It], c.globalAlpha = Rt * a;
      const ft = Math.sin(Math.PI * a) * (0.045 + t.centerDist * 0.075), xt = m.x - J, yt = m.y - K, St = _(m.x, t.x, a) + (xt - yt * 0.35) * ft, Dt = _(m.y, t.y, a) + (yt + xt * 0.35) * ft;
      c.beginPath(), c.arc(St, Dt, Ct, 0, Math.PI * 2), c.fill();
    }
    c.restore();
  }
  return C(W()), {
    setColors: k,
    resize(s, o, i) {
      const a = I(i, 1, 2);
      d.width = Math.max(1, Math.floor(s * a)), d.height = Math.max(1, Math.floor(o * a));
      const e = Math.min(s / U, o / V) * a;
      c.setTransform(e, 0, 0, e, (d.width - U * e) * 0.5, (d.height - V * e) * 0.5);
    },
    draw(s, o, i = !0, a = 1) {
      if (c.save(), c.resetTransform(), c.clearRect(0, 0, d.width, d.height), c.restore(), a < 1) {
        const e = Math.min(ut / Y.width, ct / Y.height);
        c.save(), c.translate((U - Y.width * e) * 0.5, (V - Y.height * e) * 0.5), c.scale(e, e), c.fillStyle = r, c.globalAlpha = Math.pow(1 - a, 2), c.fill(X), c.restore();
      }
      a > 0 && G(s, g.update(o, s), i, a);
    }
  };
}
const Vt = "_root_1n9iv_2", _t = {
  root: Vt
};
class Ot {
  from;
  target;
  startedAt = 0;
  duration = 0;
  moving = !1;
  constructor(r) {
    this.from = this.target = Math.max(0, Math.min(1, r));
  }
  sample(r, u = !1) {
    if (u)
      return this.from = this.target, this.duration = 0, this.moving = !1, this.target;
    const h = this.duration ? Math.max(0, Math.min(1, (r - this.startedAt) / this.duration)) : 1;
    return h === 1 && (this.moving = !1), this.from + (this.target - this.from) * (1 - Math.pow(1 - h, 3));
  }
  setTarget(r, u) {
    const h = Math.max(0, Math.min(1, r));
    h !== this.target && (this.from = this.sample(u), this.target = h, this.startedAt = u, this.duration = Math.max(h, this.from) <= 0.16 ? 180 : h > this.from ? 700 : 480, this.moving = this.from !== h);
  }
}
function Wt({ readAudio: d, active: r = !0, formation: u = 1, className: h, ...c }) {
  const X = tt(null), R = tt(d);
  R.current = d;
  const M = tt(r);
  M.current = r;
  const y = tt(new Ot(u)), A = tt(() => {
  });
  return wt(() => {
    const f = X.current;
    if (!f) return;
    const P = window.matchMedia("(prefers-reduced-motion: reduce)"), S = getComputedStyle(f);
    let b = S.color, g = S.getPropertyValue("--openbitfun-color-content-on-light").trim();
    const v = Tt(
      f,
      b,
      g
    );
    if (!v) return;
    let L = 0, D = 0, z = 0, k = !0, E = 0, F = 0;
    const W = 1e3 / 60, H = () => (M.current || y.current.moving) && k && !document.hidden && !P.matches && E > 0 && F > 0, q = (n) => {
      if (L = 0, !H()) return;
      const w = n - D;
      if (w >= W - 0.5) {
        if (D = n - w % W, y.current.moving) {
          const t = getComputedStyle(f), m = t.color, T = t.getPropertyValue("--openbitfun-color-content-on-light").trim();
          (b !== m || g !== T) && (b = m, g = T, v.setColors(b, g));
        }
        v.draw(
          n,
          M.current ? R.current?.() ?? dt : dt,
          M.current,
          y.current.sample(n)
        ), z = n;
      }
      H() && (L = requestAnimationFrame(q));
    }, C = () => {
      cancelAnimationFrame(L), L = 0, D = 0, !(!E || !F) && (H() ? L = requestAnimationFrame(q) : v.draw(z, dt, !1, y.current.sample(performance.now(), P.matches)));
    };
    A.current = C;
    const G = new ResizeObserver(([n]) => {
      n && (E = n.contentRect.width, F = n.contentRect.height, v.resize(E, F, window.devicePixelRatio || 1), C());
    }), s = new IntersectionObserver(([n]) => {
      n && (k = n.isIntersecting, C());
    }), o = () => {
      const n = getComputedStyle(f), w = n.color, t = n.getPropertyValue("--openbitfun-color-content-on-light").trim();
      b === w && g === t || (b = w, g = t, v.setColors(b, g), C());
    }, i = new MutationObserver(o), a = (n) => {
      n.propertyName === "color" && n.target instanceof Element && n.target.contains(f) && o();
    };
    for (let n = f; n; n = n.parentElement)
      i.observe(n, { attributes: !0, attributeFilter: ["style", "class", "data-color-scheme", "data-contrast", "data-openbitfun-state", "data-openbitfun-communication-mode"] });
    const e = () => {
      v.resize(E, F, window.devicePixelRatio || 1), C();
    };
    return G.observe(f), s.observe(f), P.addEventListener("change", C), document.addEventListener("visibilitychange", C), document.addEventListener("transitionend", a), window.addEventListener("resize", e), () => {
      A.current = () => {
      }, cancelAnimationFrame(L), G.disconnect(), s.disconnect(), i.disconnect(), P.removeEventListener("change", C), document.removeEventListener("visibilitychange", C), document.removeEventListener("transitionend", a), window.removeEventListener("resize", e);
    };
  }, []), wt(() => {
    y.current.setTarget(u, performance.now()), A.current();
  }, [r, u]), /* @__PURE__ */ Et(
    "canvas",
    {
      ...c,
      ref: X,
      className: Bt(_t.root, h),
      "data-openbitfun-component": "voice-particle-logo",
      "data-openbitfun-part": "root",
      "aria-hidden": "true"
    }
  );
}
export {
  Wt as V
};
//# sourceMappingURL=VoiceParticleLogo-BbWP44Zp.js.map
