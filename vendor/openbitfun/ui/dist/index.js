import { w as pt, L as on, c as rn, T as Ue, d as Se, x as zn, y as In, A as Sn, O as se, X as Ln, B as yt, z as Tn, E as Dn, G as st, H as Rn, J as En, K as Pn, N as Mn, I as be, f as Mt, P as wt, e as Ot, Q as sn, U as cn, V as ft, s as On, W as Fn, Y as ln, h as Bn, j as Vn, k as jn, l as qn, n as Hn, o as Kn, Z as Gn, q as Un, b as Wn, _ as Yn, $ as Xn, a0 as dn, a1 as Qn, u as Jn, a2 as Zn, i as ea } from "./Spinner-Dds2WLKD.js";
import { C as Ol, m as Fl, a3 as Bl, D as Vl, a as jl, a4 as ql, a5 as Hl, a6 as Kl, a7 as Gl, a8 as Ul, M as Wl, a9 as Yl, aa as Xl, ab as Ql, ac as Jl, R as Zl, ad as ed, S as td, t as nd, g as ad, r as od, ae as rd, af as id, ag as sd, ah as cd, ai as ld, aj as dd, ak as ud, al as pd, am as fd } from "./Spinner-Dds2WLKD.js";
import { jsx as e, jsxs as b, Fragment as ot } from "react/jsx-runtime";
import { useSyncExternalStore as un, useCallback as Y, useContext as Ft, useRef as M, useState as oe, useEffect as _e, useLayoutEffect as Fe, createContext as pn, useMemo as De, Children as fn, isValidElement as ta, cloneElement as bn, forwardRef as I, useId as Be, createElement as mn, useImperativeHandle as _n, Fragment as na } from "react";
import { c as $ } from "./brandPlayback-BX-xP4VC.js";
import { flushSync as aa } from "react-dom";
import { V as gn } from "./VoiceParticleLogo-BbWP44Zp.js";
function Dc(a) {
  return pt(a ?? (typeof document > "u" ? null : document)).hasLayers();
}
function Bt(a) {
  const t = Ft(on);
  return a ? pt(a) : t ?? pt(typeof document > "u" ? null : document);
}
function Rc(a) {
  const t = Bt();
  return un(t.subscribe, t.getSnapshot, t.getSnapshot), t.hasLayers(a);
}
function Ec() {
  const a = Bt();
  return un(a.subscribe, a.getSnapshot, a.getSnapshot), a.hasModal();
}
function Pc() {
  const a = Bt(), t = Y((o) => a.dismissTop(o), [a]);
  return { dismissAll: Y(() => a.dismissAll(), [a]), dismissTop: t };
}
const oa = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M16.95 16.95A7 7 0 0 1 5 12v-2", key: "cqa7eg" }],
  ["path", { d: "M18.89 13.23A7 7 0 0 0 19 12v-2", key: "16hl24" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }]
], ra = rn("mic-off", oa);
const ia = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
], sa = rn("phone", ia), ca = "_root_fo6y4_2", la = "_header_fo6y4_32", da = "_title_fo6y4_40", ua = "_back_fo6y4_52", pa = "_close_fo6y4_53", fa = "_visualizer_fo6y4_70", ba = "_conversation_fo6y4_78", ma = "_entries_fo6y4_93", _a = "_entry_fo6y4_100", ga = "_activity_fo6y4_106", ha = "_user_fo6y4_118", va = "_assistant_fo6y4_129", ya = "_status_fo6y4_131", Na = "_controls_fo6y4_135", wa = "_control_fo6y4_135", xa = "_embedded_fo6y4_197", $a = "_compactTranscript_fo6y4_206", Ca = "_compactControls_fo6y4_237", ue = {
  root: ca,
  header: la,
  title: da,
  back: ua,
  close: pa,
  visualizer: fa,
  conversation: ba,
  entries: ma,
  entry: _a,
  activity: ga,
  user: ha,
  assistant: va,
  status: ya,
  controls: Na,
  control: wa,
  embedded: xa,
  compactTranscript: $a,
  compactControls: Ca
}, Qt = typeof window > "u" ? _e : Fe;
function ka({ entries: a, status: t, header: n, className: o, compact: r, presentation: i = "voice", onLoadEarlier: l }) {
  const u = M(null), f = M(null), p = M(!0), h = M(null), y = M(0), [w, v] = oe(!1), k = () => {
    const s = u.current;
    if (!s) return;
    const x = s.getBoundingClientRect().top, d = Array.from(s.querySelectorAll("[data-transcript-id]")).find((N) => N.getBoundingClientRect().bottom > x);
    h.current = d ? { id: d.dataset.transcriptId, offset: d.getBoundingClientRect().top - x } : null;
  }, T = () => {
    const s = u.current;
    if (!(!s || !s.clientHeight)) {
      if (p.current)
        s.scrollTop = Math.max(0, s.scrollHeight - s.clientHeight);
      else if (h.current) {
        const x = h.current, d = Array.from(s.querySelectorAll("[data-transcript-id]")).find((N) => N.dataset.transcriptId === x.id);
        d && (s.scrollTop += d.getBoundingClientRect().top - s.getBoundingClientRect().top - x.offset);
      }
      y.current = s.scrollTop, v(s.scrollTop > 1), k();
    }
  }, _ = () => {
    const s = u.current;
    !l || !s?.clientHeight || s.scrollTop > 80 || (p.current = !1, k(), l());
  };
  return Qt(T, [a, t, n]), Qt(() => {
    if (typeof ResizeObserver > "u") return;
    const s = new ResizeObserver(T);
    return u.current && s.observe(u.current), f.current && s.observe(f.current), () => s.disconnect();
  }, []), /* @__PURE__ */ e(
    "div",
    {
      ref: u,
      className: $(ue.conversation, r && ue.compactTranscript, o),
      "data-openbitfun-component": "voice-call-panel",
      "data-openbitfun-part": "conversation",
      "data-openbitfun-presentation": i,
      "data-scrolled": w || void 0,
      tabIndex: 0,
      onWheel: (s) => {
        s.deltaY < 0 && _();
      },
      onKeyDown: (s) => {
        s.target === s.currentTarget && ["ArrowUp", "PageUp", "Home"].includes(s.key) && _();
      },
      onScroll: () => {
        const s = u.current;
        if (!s || !s.clientHeight) return;
        const x = s.scrollTop < y.current;
        y.current = s.scrollTop, v(s.scrollTop > 1), p.current = s.scrollHeight - s.clientHeight - s.scrollTop < 24, k(), x && _();
      },
      children: /* @__PURE__ */ b("div", { ref: f, className: ue.entries, "data-openbitfun-part": "entries", children: [
        n,
        a.map((s) => /* @__PURE__ */ b("div", { "data-transcript-id": s.id, className: ue.entry, children: [
          /* @__PURE__ */ e("div", { className: ue[s.role], "data-openbitfun-part": s.role === "status" ? "status" : `${s.role}Transcript`, children: s.content }),
          s.activity && /* @__PURE__ */ e("div", { className: ue.activity, "data-openbitfun-part": "entryActivity", "data-role": s.role, children: s.activity })
        ] }, s.id)),
        t && /* @__PURE__ */ e("div", { className: ue.status, role: "status", "data-openbitfun-part": "status", children: t })
      ] })
    }
  );
}
function Aa({ labels: a, phase: t, muted: n, compact: o, onToggleMute: r, onOpenSettings: i, onEnd: l }) {
  return /* @__PURE__ */ b("footer", { className: $(ue.controls, o && ue.compactControls), "data-openbitfun-component": "voice-call-panel", "data-openbitfun-part": "controls", children: [
    /* @__PURE__ */ e(Ue, { content: n ? a.unmute : a.mute, children: /* @__PURE__ */ e(
      Se,
      {
        className: ue.control,
        shape: "circle",
        "aria-label": n ? a.unmute : a.mute,
        "aria-pressed": n,
        disabled: t === "connecting" || t === "ending",
        onClick: r,
        icon: n ? /* @__PURE__ */ e(ra, { size: 28 }) : /* @__PURE__ */ e(zn, { size: 28 })
      }
    ) }),
    /* @__PURE__ */ e(Ue, { content: a.settings, children: /* @__PURE__ */ e(
      Se,
      {
        className: ue.control,
        shape: "circle",
        "aria-label": a.settings,
        onClick: i,
        icon: /* @__PURE__ */ e(In, { size: 28 })
      }
    ) }),
    /* @__PURE__ */ e(Ue, { content: a.end, children: /* @__PURE__ */ e(
      Se,
      {
        className: ue.control,
        shape: "circle",
        "aria-label": a.end,
        disabled: t === "ending",
        onClick: l,
        icon: /* @__PURE__ */ e(sa, { size: 28 })
      }
    ) })
  ] });
}
function za({ title: a, labels: t, phase: n = "live", onBack: o, onClose: r }) {
  return /* @__PURE__ */ b("header", { className: ue.header, "data-openbitfun-component": "voice-call-panel", "data-openbitfun-part": "header", children: [
    /* @__PURE__ */ e(Ue, { content: t.back, children: /* @__PURE__ */ e(
      Se,
      {
        className: ue.back,
        shape: "circle",
        "aria-label": t.back,
        onClick: o,
        disabled: n === "ending",
        icon: /* @__PURE__ */ e(Sn, { size: 20 })
      }
    ) }),
    /* @__PURE__ */ e("h2", { className: ue.title, "data-openbitfun-part": "title", children: /* @__PURE__ */ e(se, { children: a }) }),
    /* @__PURE__ */ e(Ue, { content: t.close, children: /* @__PURE__ */ e(
      Se,
      {
        className: ue.close,
        shape: "circle",
        "aria-label": t.close,
        onClick: r,
        icon: /* @__PURE__ */ e(Ln, { size: 20 })
      }
    ) })
  ] });
}
function Mc({
  title: a,
  labels: t,
  phase: n = "live",
  muted: o = !1,
  userTranscript: r,
  assistantTranscript: i,
  status: l,
  readAudio: u,
  presentation: f = "card",
  onBack: p,
  onClose: h,
  onToggleMute: y,
  onOpenSettings: w,
  onEnd: v,
  className: k,
  ...T
}) {
  const _ = [];
  return r && _.push({ id: "user", role: "user", content: r }), i && _.push({ id: "assistant", role: "assistant", content: i }), /* @__PURE__ */ b(
    "section",
    {
      ...T,
      className: $(ue.root, f === "embedded" && ue.embedded, k),
      "aria-label": a,
      "data-openbitfun-component": "voice-call-panel",
      "data-openbitfun-part": "root",
      "data-openbitfun-phase": n,
      children: [
        /* @__PURE__ */ e(za, { title: a, labels: t, phase: n, onBack: p, onClose: h }),
        /* @__PURE__ */ e("div", { className: ue.visualizer, "data-openbitfun-part": "visualizer", children: /* @__PURE__ */ e(gn, { readAudio: u, active: n === "live" || n === "connecting" }) }),
        /* @__PURE__ */ e(ka, { entries: _, status: l }),
        /* @__PURE__ */ e(
          Aa,
          {
            labels: t,
            phase: n,
            muted: o,
            onToggleMute: y,
            onOpenSettings: w,
            onEnd: v
          }
        )
      ]
    }
  );
}
const Ia = "_root_1lhci_2", Sa = "_leading_1lhci_12", La = "_content_1lhci_20", Ta = "_action_1lhci_33", Da = "_artwork_1lhci_48", Ra = "_logo_1lhci_59", Ea = "_label_1lhci_62", Xe = {
  root: Ia,
  leading: Sa,
  content: La,
  action: Ta,
  artwork: Da,
  logo: Ra,
  label: Ea
};
function Oc({ expanded: a, active: t, label: n, leading: o, disabled: r, readAudio: i, onClick: l }) {
  const [u, f] = oe(!1), p = u && !a && !r;
  return _e(() => {
    (a || r) && f(!1);
  }, [a, r]), /* @__PURE__ */ b(
    "div",
    {
      className: Xe.root,
      "data-expanded": a,
      "data-disabled": !a && r || void 0,
      "data-openbitfun-component": "voice-call-panel",
      "data-openbitfun-part": "identity",
      children: [
        o && /* @__PURE__ */ e("div", { className: Xe.leading, hidden: a, children: o }),
        /* @__PURE__ */ b("div", { className: Xe.content, "data-overflow-trigger": !0, children: [
          /* @__PURE__ */ e("span", { className: Xe.artwork, children: /* @__PURE__ */ e(
            gn,
            {
              className: Xe.logo,
              active: a ? t : p,
              readAudio: a ? i : void 0
            }
          ) }),
          /* @__PURE__ */ e("span", { className: Xe.label, hidden: a, "aria-hidden": "true", children: /* @__PURE__ */ e(se, { children: n }) }),
          /* @__PURE__ */ e(
            yt,
            {
              className: Xe.action,
              size: "sm",
              variant: "fill",
              labelBehavior: "static",
              "data-hovered": p || void 0,
              onPointerEnter: (h) => {
                h.pointerType === "mouse" && !r && f(!0);
              },
              onPointerLeave: () => f(!1),
              onPointerCancel: () => f(!1),
              hidden: a,
              disabled: r,
              onClick: l,
              "aria-label": n,
              "aria-expanded": a,
              children: null
            }
          )
        ] })
      ]
    }
  );
}
const Pa = '[data-openbitfun-tooltip-trigger], [role="tooltip"]';
function Ma(a, t) {
  const n = a.defaultView;
  if (!n) return () => {
  };
  const o = /* @__PURE__ */ new Map();
  let r = null, i = a.activeElement, l = !0;
  const u = (d) => d instanceof n.Element ? d : null, f = (d) => {
    const N = [];
    for (let m = d?.isConnected ? d : null; m; m = m.parentElement)
      m instanceof n.HTMLElement && N.push(m);
    return N;
  }, p = (d, N) => {
    N.accessibleAttribute && d.getAttribute(N.accessibleAttribute) === N.text && d.removeAttribute(N.accessibleAttribute), N.accessibleAttribute = void 0;
  }, h = (d, N) => {
    d.getAttribute("title") === "" && d.setAttribute("title", N.text), p(d, N), o.delete(d);
  }, y = (d) => {
    if (d.localName === "iframe" || !d.hasAttribute("title")) return;
    let N = o.get(d);
    N || (N = { text: d.getAttribute("title") }, o.set(d, N)), N.text && (!N.accessibleAttribute && !d.hasAttribute("aria-label") && !d.hasAttribute("aria-labelledby") && !d.textContent?.trim() && d.matches('button, a, input, [role="button"]') && !d.labels?.length ? N.accessibleAttribute = "aria-label" : !N.accessibleAttribute && !d.hasAttribute("aria-description") && !d.hasAttribute("aria-describedby") && (N.accessibleAttribute = "aria-description"), N.accessibleAttribute && !d.hasAttribute(N.accessibleAttribute) && d.setAttribute(N.accessibleAttribute, N.text), d.setAttribute("title", ""));
  }, w = (d) => {
    if (d.some((N) => N.matches(Pa))) return null;
    for (const N of d) {
      const m = o.get(N);
      if (m) return m.text ? { element: N, text: m.text } : null;
    }
  }, v = (d = []) => {
    const N = new Set([...d, ...k.takeRecords()].filter((P) => P.type === "attributes" && P.attributeName === "title").map((P) => P.target));
    k.disconnect();
    for (const [P, B] of o) {
      if (!N.has(P) && P.getAttribute("title") === "") continue;
      const F = P.getAttribute("title");
      p(P, B), F === null ? o.delete(P) : B.text = F;
    }
    const m = f(r), S = f(i), A = /* @__PURE__ */ new Set([...m, ...S]);
    for (const [P, B] of o)
      A.has(P) || h(P, B);
    for (const P of A)
      y(P), k.observe(P, {
        attributes: !0,
        attributeFilter: ["title", "data-openbitfun-tooltip-trigger"],
        childList: !0
      });
    const O = w(l ? S : m), X = w(l ? m : S);
    t(O === void 0 ? X ?? null : O);
  }, k = new n.MutationObserver(v), T = (d) => {
    r = u(d.target), l = !1, v();
  }, _ = (d) => {
    r = u(d.relatedTarget), l = !1, v();
  }, s = (d) => {
    i = u(d.target), l = !0, v();
  }, x = (d) => {
    i = u(d.relatedTarget), l = !0, v();
  };
  return a.addEventListener("mouseover", T, !0), a.addEventListener("mouseout", _, !0), a.addEventListener("focusin", s, !0), a.addEventListener("focusout", x, !0), v(), () => {
    r = i = null, v(), k.disconnect(), a.removeEventListener("mouseover", T, !0), a.removeEventListener("mouseout", _, !0), a.removeEventListener("focusin", s, !0), a.removeEventListener("focusout", x, !0);
  };
}
const Jt = pn(!1);
function Oa({ ownerDocument: a }) {
  const [t, n] = oe(null);
  _e(() => {
    let r = 0;
    return Ma(a, (i) => n((l) => i ? l?.element === i.element ? l.text === i.text ? l : { ...l, text: i.text } : { ...i, key: ++r } : null));
  }, [a]);
  const o = De(() => ({ current: t?.element ?? null }), [t?.element]);
  return t && /* @__PURE__ */ e(Tn.Provider, { value: !0, children: /* @__PURE__ */ e(Ue, { active: !0, content: t.text, trigger: "hover-focus", triggerRef: o }, t.key) });
}
function Fc({
  children: a,
  colorScheme: t = st.colorScheme,
  contrast: n = st.contrast,
  density: o = st.density,
  locale: r = st.locale,
  messages: i,
  portalHost: l,
  tooltipDelay: u = st.tooltipDelay,
  nativeTooltipPolicy: f = "native"
}) {
  const p = Dn(l)?.ownerDocument, h = pt(p), y = Ft(Jt), w = y || f === "application", v = De(() => ({
    colorScheme: t,
    contrast: n,
    density: o,
    locale: r,
    messages: { ...Rn, ...i },
    portalHost: l,
    tooltipDelay: u
  }), [t, n, o, r, i, l, u]);
  return /* @__PURE__ */ e(En.Provider, { value: v, children: /* @__PURE__ */ e(on.Provider, { value: h, children: /* @__PURE__ */ b(Jt.Provider, { value: w, children: [
    a,
    w && !y && p && /* @__PURE__ */ e(Oa, { ownerDocument: p })
  ] }) }) });
}
function Bc(a, t, n) {
  const o = a.current?.ownerDocument ?? (typeof document > "u" ? null : document);
  return pt(o).registerInteraction({
    id: /* @__PURE__ */ Symbol("openbitfun-overlay-interaction"),
    type: t,
    element: () => a.current,
    listener: (r) => n(r)
  });
}
const Fa = "_host_ajwz9_2", Ba = "_action_ajwz9_7", xt = {
  host: Fa,
  action: Ba
};
function Vt({ children: a, className: t, group: n = !1, size: o = "xs", ...r }) {
  return /* @__PURE__ */ e(Pn.Provider, { value: o, children: /* @__PURE__ */ e("span", { ...r, className: $(xt.action, t), "data-floating-action-group": n || void 0, children: fn.map(a, (i) => ta(i) && i.type === "button" ? bn(i, { className: $(i.props.className, Mn.surface) }) : i) }) });
}
const Va = "_root_i7m1r_2", ja = "_trigger_i7m1r_3", qa = "_leading_i7m1r_4", Ha = "_content_i7m1r_5", Ka = "_title_i7m1r_6", Ga = "_description_i7m1r_7", Ua = "_actions_i7m1r_8", Wa = "_floatingActions_i7m1r_145", qe = {
  root: Va,
  trigger: ja,
  leading: qa,
  content: Ha,
  title: Ka,
  description: Ga,
  actions: Ua,
  floatingActions: Wa
}, Vc = I(
  function({
    actions: t = [],
    actionPlacement: n = "inline",
    children: o,
    body: r,
    triggerClassName: i,
    className: l,
    description: u,
    disabled: f = !1,
    leading: p,
    selected: h = !1,
    size: y = "sm",
    type: w = "button",
    ...v
  }, k) {
    const T = t.map((_) => {
      const s = /* @__PURE__ */ e(
        Se,
        {
          "aria-controls": _["aria-controls"],
          "aria-expanded": _["aria-expanded"],
          "aria-haspopup": _["aria-haspopup"],
          "aria-label": _.label,
          disabled: f || _.disabled,
          icon: _.icon,
          loading: _.loading,
          onClick: _.onClick,
          size: "xs",
          tone: _.tone,
          variant: "quiet"
        },
        _.id
      );
      return _.tooltip != null ? /* @__PURE__ */ e(Ue, { content: _.tooltip, children: s }, _.id) : s;
    });
    return /* @__PURE__ */ b(
      "span",
      {
        className: $(qe.root, n === "floating" && xt.host, l),
        "data-openbitfun-component": "action-card",
        "data-action-placement": n,
        "data-disabled": f ? "true" : "false",
        "data-has-actions": t.length > 0 ? "true" : "false",
        "data-selected": h ? "true" : "false",
        "data-size": y,
        children: [
          /* @__PURE__ */ b(
            "button",
            {
              "data-overflow-trigger": !0,
              ...v,
              className: $(qe.trigger, i),
              "data-openbitfun-part": "trigger",
              disabled: f,
              ref: k,
              type: w,
              children: [
                p != null && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: qe.leading, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "leading", children: p }),
                r !== void 0 ? r : /* @__PURE__ */ b("span", { className: qe.content, "data-openbitfun-part": "content", children: [
                  /* @__PURE__ */ e(se, { className: qe.title, "data-openbitfun-part": "title", children: o }),
                  u != null && /* @__PURE__ */ e(se, { className: qe.description, "data-openbitfun-part": "description", children: u })
                ] })
              ]
            }
          ),
          t.length > 0 && (n === "floating" ? /* @__PURE__ */ e(Vt, { group: !0, size: "standard", className: qe.floatingActions, "data-openbitfun-part": "actions", children: T }) : /* @__PURE__ */ e("span", { className: qe.actions, "data-openbitfun-part": "actions", children: T }))
        ]
      }
    );
  }
), Ya = "_root_1wpg0_2", Xa = "_trigger_1wpg0_3", Qa = "_body_1wpg0_4", Ja = "_leading_1wpg0_5", Za = "_content_1wpg0_6", eo = "_label_1wpg0_7", to = "_description_1wpg0_8", no = "_metadata_1wpg0_9", ao = "_actions_1wpg0_10", oo = "_divider_1wpg0_11", ro = "_detail_1wpg0_12", io = "_changeCount_1wpg0_13", so = "_additions_1wpg0_14", co = "_deletions_1wpg0_15", we = {
  root: Ya,
  trigger: Xa,
  body: Qa,
  leading: Ja,
  content: Za,
  label: eo,
  description: to,
  metadata: no,
  actions: ao,
  divider: oo,
  detail: ro,
  changeCount: io,
  additions: so,
  deletions: co
};
function lo({
  children: a,
  label: t,
  leading: n
}) {
  return /* @__PURE__ */ b(ot, { children: [
    n != null && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: we.leading, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "leading", children: n }),
    /* @__PURE__ */ b("span", { className: we.content, "data-openbitfun-part": "content", children: [
      t != null && /* @__PURE__ */ e(se, { className: we.label, "data-openbitfun-part": "label", children: t }),
      /* @__PURE__ */ e(se, { className: we.description, "data-openbitfun-part": "description", children: a })
    ] })
  ] });
}
const jc = I(
  function({
    actions: t = [],
    appearance: n = "inline",
    children: o,
    className: r,
    detail: i,
    disabled: l = !1,
    label: u,
    leading: f,
    metadata: p,
    onActivate: h,
    ...y
  }, w) {
    const v = /* @__PURE__ */ e(lo, { label: u, leading: f, children: o }), k = i != null;
    return /* @__PURE__ */ b(
      "span",
      {
        ...y,
        "aria-disabled": l || void 0,
        className: $(we.root, r),
        "data-appearance": n,
        "data-openbitfun-component": "activity-item",
        "data-disabled": l ? "true" : "false",
        "data-has-detail": k ? "true" : "false",
        ref: w,
        children: [
          h ? /* @__PURE__ */ e(
            "button",
            {
              "data-overflow-trigger": !0,
              className: we.trigger,
              "data-openbitfun-part": "trigger",
              disabled: l,
              onClick: h,
              type: "button",
              children: v
            }
          ) : /* @__PURE__ */ e("span", { className: we.body, "data-openbitfun-part": "body", children: v }),
          p != null && /* @__PURE__ */ e("span", { className: we.metadata, "data-openbitfun-part": "metadata", children: p }),
          t.length > 0 && /* @__PURE__ */ b(ot, { children: [
            /* @__PURE__ */ e("span", { "aria-hidden": "true", className: we.divider, "data-openbitfun-part": "divider" }),
            /* @__PURE__ */ e("span", { className: we.actions, "data-openbitfun-part": "actions", children: t.map((T) => /* @__PURE__ */ e(
              Se,
              {
                "aria-label": T.label,
                disabled: l || T.disabled,
                icon: T.icon,
                onClick: T.onClick,
                size: "xs",
                tone: T.tone,
                variant: "quiet"
              },
              T.id
            )) })
          ] }),
          k && /* @__PURE__ */ e("span", { className: we.detail, "data-openbitfun-part": "detail", children: i })
        ]
      }
    );
  }
), qc = I(
  function({ additions: t = 0, className: n, deletions: o = 0, ...r }, i) {
    return /* @__PURE__ */ b(
      "span",
      {
        ...r,
        className: $(we.changeCount, n),
        "data-openbitfun-component": "change-count",
        ref: i,
        children: [
          /* @__PURE__ */ b("span", { className: we.additions, "data-openbitfun-part": "additions", children: [
            "+",
            Math.abs(t)
          ] }),
          /* @__PURE__ */ b("span", { className: we.deletions, "data-openbitfun-part": "deletions", children: [
            "-",
            Math.abs(o)
          ] })
        ]
      }
    );
  }
), uo = "_root_71hn3_2", po = "_icon_71hn3_6", fo = "_content_71hn3_7", bo = "_title_71hn3_8", mo = "_message_71hn3_9", _o = "_description_71hn3_10", go = "_close_71hn3_11", Qe = {
  root: uo,
  icon: po,
  content: fo,
  title: bo,
  message: mo,
  description: _o,
  close: go
}, ho = {
  error: "info",
  info: "info",
  success: "check-circle",
  warning: "info"
}, Hc = I(function({
  "aria-live": t,
  className: n,
  closable: o = !1,
  closeLabel: r = "Close",
  description: i,
  message: l,
  onClose: u,
  role: f,
  showIcon: p = !0,
  title: h,
  tone: y = "info",
  ...w
}, v) {
  const [k, T] = oe(!0);
  return k ? /* @__PURE__ */ b(
    "div",
    {
      ...w,
      "aria-live": t ?? (f === "status" ? "polite" : f === "alert" || y === "error" ? "assertive" : "polite"),
      className: $(Qe.root, n),
      "data-openbitfun-component": "alert",
      "data-openbitfun-tone": y,
      ref: v,
      role: f ?? "alert",
      children: [
        p && /* @__PURE__ */ e("span", { className: Qe.icon, "data-openbitfun-part": "icon", children: /* @__PURE__ */ e(be, { name: ho[y], size: "sm" }) }),
        /* @__PURE__ */ b("span", { className: Qe.content, "data-openbitfun-part": "content", children: [
          h !== void 0 && /* @__PURE__ */ e("span", { className: Qe.title, "data-openbitfun-part": "title", children: h }),
          /* @__PURE__ */ e("span", { className: Qe.message, "data-openbitfun-part": "message", children: l }),
          i !== void 0 && /* @__PURE__ */ e("span", { className: Qe.description, "data-openbitfun-part": "description", children: i })
        ] }),
        o && /* @__PURE__ */ e(
          Se,
          {
            "aria-label": r,
            className: Qe.close,
            icon: /* @__PURE__ */ e(be, { name: "xmark" }),
            onClick: () => {
              T(!1), u?.();
            },
            size: "xs",
            variant: "quiet"
          }
        )
      ]
    }
  ) : null;
}), vo = "_root_701to_2", yo = "_image_701to_6", No = "_content_701to_7", wo = "_group_701to_9", ut = {
  root: vo,
  image: yo,
  content: No,
  group: wo
};
function xo({ alt: a = "", children: t, className: n, icon: o, onError: r, shape: i = "circle", size: l = "md", src: u, ...f }) {
  const [p, h] = oe(!1);
  return /* @__PURE__ */ e("span", { ...f, className: $(ut.root, n), "data-openbitfun-component": "avatar", "data-openbitfun-shape": i, "data-size": l, children: u && !p ? /* @__PURE__ */ e("img", { alt: a, className: ut.image, "data-openbitfun-part": "image", onError: () => {
    h(!0), r?.();
  }, src: u }) : o !== void 0 ? /* @__PURE__ */ e("span", { className: ut.content, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "icon", children: o }) : /* @__PURE__ */ e("span", { className: ut.content, "data-openbitfun-part": "text", children: t }) });
}
function Kc({ children: a, className: t, maxCount: n = 5, ...o }) {
  const r = fn.toArray(a), i = n > 0 ? r.slice(0, n) : r, l = Math.max(0, r.length - i.length);
  return /* @__PURE__ */ b("div", { ...o, className: $(ut.group, t), "data-openbitfun-component": "avatar-group", children: [
    i,
    l > 0 && /* @__PURE__ */ b(xo, { "aria-label": `${l} more`, children: [
      "+",
      l
    ] })
  ] });
}
const $o = "_root_1y6q8_2", Co = "_reservedAction_1y6q8_59", Zt = {
  root: $o,
  reservedAction: Co
}, ko = I(function({
  action: t,
  actionPlacement: n = "overlay",
  children: o,
  className: r,
  size: i = "sm",
  ...l
}, u) {
  return /* @__PURE__ */ b(
    "span",
    {
      ...l,
      className: $(xt.host, Zt.root, r),
      "data-openbitfun-component": "capsule",
      "data-size": i,
      "data-action-placement": t != null ? n : void 0,
      "data-overflow-trigger": !0,
      ref: u,
      children: [
        o,
        t != null && /* @__PURE__ */ e(
          Vt,
          {
            "data-openbitfun-part": "action",
            className: n === "reserved" ? Zt.reservedAction : void 0,
            children: t
          }
        )
      ]
    }
  );
}), Ao = "_root_m2z2b_2", zo = "_header_m2z2b_3", Io = "_leading_m2z2b_4", So = "_headerContent_m2z2b_5", Lo = "_title_m2z2b_6", To = "_description_m2z2b_7", Do = "_actions_m2z2b_8", Ro = "_body_m2z2b_9", Eo = "_media_m2z2b_10", Po = "_footer_m2z2b_11", Pe = {
  root: Ao,
  header: zo,
  leading: Io,
  headerContent: So,
  title: Lo,
  description: To,
  actions: Do,
  body: Ro,
  media: Eo,
  footer: Po
}, Gc = I(function({
  appearance: t = "subtle",
  children: n,
  className: o,
  clip: r = !1,
  gap: i = "none",
  padding: l = "none",
  radius: u = "md",
  ...f
}, p) {
  return /* @__PURE__ */ e(
    "div",
    {
      ...f,
      className: $(Pe.root, o),
      "data-appearance": t,
      "data-openbitfun-component": "card",
      "data-clip": r ? "true" : "false",
      "data-gap": i,
      "data-padding": l,
      "data-radius": u,
      ref: p,
      children: n
    }
  );
}), Uc = I(
  function({
    actions: t,
    align: n = "start",
    children: o,
    className: r,
    contentAlign: i = "start",
    description: l,
    leading: u,
    padding: f = "none",
    title: p,
    ...h
  }, y) {
    return /* @__PURE__ */ b(
      "div",
      {
        ...h,
        className: $(Pe.header, r),
        "data-align": n,
        "data-openbitfun-part": "header",
        "data-content-align": i,
        "data-padding": f,
        ref: y,
        children: [
          u != null && /* @__PURE__ */ e("div", { className: Pe.leading, "data-openbitfun-part": "leading", children: u }),
          /* @__PURE__ */ b(
            "div",
            {
              className: Pe.headerContent,
              "data-align": i,
              "data-openbitfun-part": "header-content",
              children: [
                p != null && /* @__PURE__ */ e("div", { className: Pe.title, "data-openbitfun-part": "title", children: p }),
                l != null && /* @__PURE__ */ e("div", { className: Pe.description, "data-openbitfun-part": "description", children: l }),
                o
              ]
            }
          ),
          t != null && /* @__PURE__ */ e("div", { className: Pe.actions, "data-openbitfun-part": "actions", children: t })
        ]
      }
    );
  }
), Wc = I(
  function({ align: t = "stretch", children: n, className: o, padding: r = "none", ...i }, l) {
    return /* @__PURE__ */ e(
      "div",
      {
        ...i,
        className: $(Pe.body, o),
        "data-align": t,
        "data-openbitfun-part": "body",
        "data-padding": r,
        ref: l,
        children: n
      }
    );
  }
), Yc = I(
  function({ children: t, className: n, ...o }, r) {
    return /* @__PURE__ */ e(
      "div",
      {
        ...o,
        className: $(Pe.media, n),
        "data-openbitfun-part": "media",
        ref: r,
        children: t
      }
    );
  }
), Xc = I(
  function({
    align: t = "end",
    children: n,
    className: o,
    padding: r = "none",
    ...i
  }, l) {
    return /* @__PURE__ */ e(
      "div",
      {
        ...i,
        className: $(Pe.footer, o),
        "data-align": t,
        "data-openbitfun-part": "footer",
        "data-padding": r,
        ref: l,
        children: n
      }
    );
  }
), Mo = "_root_11xcm_2", Oo = "_context_11xcm_3", Fo = "_surface_11xcm_4", Bo = "_editor_11xcm_5", Vo = "_toolbar_11xcm_6", jo = "_bar_11xcm_7", qo = "_barLeading_11xcm_8", Ho = "_barContent_11xcm_9", Ko = "_barTrailing_11xcm_10", Go = "_divider_11xcm_11", Me = {
  root: Mo,
  context: Oo,
  surface: Fo,
  editor: Bo,
  toolbar: Vo,
  bar: jo,
  barLeading: qo,
  barContent: Ho,
  barTrailing: Ko,
  divider: Go
}, Qc = I(
  function({
    "aria-disabled": t,
    "aria-invalid": n,
    children: o,
    className: r,
    contextBar: i,
    disabled: l = !1,
    invalid: u = !1,
    toolbar: f,
    ...p
  }, h) {
    const y = l || t === !0 || t === "true", w = u || n === !0 || n === "true";
    return /* @__PURE__ */ b(
      "fieldset",
      {
        ...p,
        "aria-disabled": y || void 0,
        "aria-invalid": w || void 0,
        className: $(Me.root, r),
        "data-openbitfun-component": "composer",
        "data-disabled": y ? "true" : "false",
        "data-has-context": i != null ? "true" : "false",
        "data-invalid": w ? "true" : "false",
        disabled: y,
        ref: h,
        children: [
          i != null && /* @__PURE__ */ e("div", { className: Me.context, "data-openbitfun-part": "context", children: i }),
          /* @__PURE__ */ b("div", { className: Me.surface, "data-openbitfun-part": "surface", children: [
            /* @__PURE__ */ e("div", { className: Me.editor, "data-openbitfun-part": "editor", children: o }),
            f != null && /* @__PURE__ */ e("div", { className: Me.toolbar, "data-openbitfun-part": "toolbar", children: f })
          ] })
        ]
      }
    );
  }
);
function hn({
  children: a,
  className: t,
  leading: n,
  trailing: o,
  ...r
}, i, l) {
  return /* @__PURE__ */ b(
    "div",
    {
      ...r,
      className: $(Me.bar, t),
      "data-openbitfun-part": l,
      ref: i,
      children: [
        n != null && /* @__PURE__ */ e("div", { className: Me.barLeading, "data-openbitfun-part": "bar-leading", children: n }),
        a != null && /* @__PURE__ */ e("div", { className: Me.barContent, "data-openbitfun-part": "bar-content", children: a }),
        o != null && /* @__PURE__ */ e("div", { className: Me.barTrailing, "data-openbitfun-part": "bar-trailing", children: o })
      ]
    }
  );
}
const Jc = I(
  function(t, n) {
    return hn(t, n, "context-bar");
  }
), Zc = I(
  function(t, n) {
    return hn(t, n, "toolbar-bar");
  }
), el = I(
  function({ className: t, ...n }, o) {
    return /* @__PURE__ */ e(
      "span",
      {
        ...n,
        "aria-hidden": "true",
        className: $(Me.divider, t),
        "data-openbitfun-part": "divider",
        ref: o
      }
    );
  }
), Uo = "_root_ewtjp_2", Wo = "_viewport_ewtjp_3", Yo = "_list_ewtjp_4", Xo = "_group_ewtjp_5", Qo = "_groupOptions_ewtjp_6", Jo = "_option_ewtjp_7", Zo = "_leading_ewtjp_8", er = "_content_ewtjp_9", tr = "_label_ewtjp_10", nr = "_description_ewtjp_11", ar = "_metadata_ewtjp_12", or = "_indicator_ewtjp_13", rr = "_empty_ewtjp_14", ir = "_groupLabel_ewtjp_54", xe = {
  root: Uo,
  viewport: Wo,
  list: Yo,
  group: Xo,
  groupOptions: Qo,
  option: Jo,
  leading: Zo,
  content: er,
  label: tr,
  description: nr,
  metadata: ar,
  indicator: or,
  empty: rr,
  groupLabel: ir
};
function sr(a, t) {
  typeof a == "function" ? a(t) : a && (a.current = t);
}
function Lt(a) {
  return Array.from(
    a.querySelectorAll("[data-openbitfun-listbox-option]")
  ).filter((t) => t.closest('[role="listbox"]') === a && !t.disabled && t.getAttribute("aria-disabled") !== "true");
}
function en(a) {
  return a && typeof a.closest == "function" ? a.closest("[data-openbitfun-listbox-option]") : null;
}
function ht(a, t, n = !0) {
  const o = a[t];
  o && (a.forEach((r, i) => {
    r.tabIndex = i === t ? 0 : -1;
  }), n && (o.focus(), o.scrollIntoView?.({ block: "nearest", inline: "nearest" })));
}
const vn = I(function({
  autoFocusOption: t = !1,
  children: n,
  className: o,
  focusMode: r = "roving",
  multiple: i = !1,
  onFocusCapture: l,
  onKeyDown: u,
  scrollbarVisibility: f = "auto",
  ...p
}, h) {
  const y = M(null), w = M(!1), v = Y((_) => {
    y.current = _, sr(h, _);
  }, [h]);
  _e(() => {
    const _ = y.current;
    if (!_) return;
    const s = Lt(_);
    if (r === "virtual") {
      s.forEach((m) => {
        m.tabIndex = -1;
      });
      return;
    }
    if (s.length === 0) return;
    const x = s.findIndex((m) => m.getAttribute("aria-selected") === "true"), d = s.findIndex((m) => m.tabIndex === 0), N = x >= 0 ? x : Math.max(d, 0);
    ht(s, N, !1), t && !w.current && (w.current = !0, ht(s, N));
  }, [t, n, r]);
  const k = (_) => {
    if (l?.(_), _.defaultPrevented || r === "virtual") return;
    const s = en(_.target);
    if (!s || !_.currentTarget.contains(s)) return;
    const x = Lt(_.currentTarget), d = x.indexOf(s);
    d >= 0 && ht(x, d, !1);
  }, T = (_) => {
    if (u?.(_), _.defaultPrevented || r === "virtual") return;
    const s = en(_.target);
    if (!s || !_.currentTarget.contains(s)) return;
    const x = Lt(_.currentTarget), d = x.indexOf(s);
    if (d < 0 || x.length === 0) return;
    let N;
    switch (_.key) {
      case "ArrowDown":
        N = (d + 1) % x.length;
        break;
      case "ArrowUp":
        N = (d - 1 + x.length) % x.length;
        break;
      case "Home":
        N = 0;
        break;
      case "End":
        N = x.length - 1;
        break;
      default:
        if (_.key.length === 1 && !_.altKey && !_.ctrlKey && !_.metaKey) {
          const m = _.key.toLocaleLowerCase();
          for (let S = 1; S <= x.length; S += 1) {
            const A = (d + S) % x.length;
            if ((x[A]?.textContent?.trim().toLocaleLowerCase() ?? "").startsWith(m)) {
              N = A;
              break;
            }
          }
        }
    }
    N !== void 0 && (_.preventDefault(), ht(x, N));
  };
  return /* @__PURE__ */ e(
    "div",
    {
      ...p,
      "aria-multiselectable": i || void 0,
      className: $(xe.root, o),
      "data-openbitfun-component": "listbox",
      "data-openbitfun-focus-mode": r,
      "data-openbitfun-multiple": i ? "true" : "false",
      onFocusCapture: k,
      onKeyDown: T,
      ref: v,
      role: "listbox",
      children: /* @__PURE__ */ e(
        Mt,
        {
          className: xe.viewport,
          orientation: "vertical",
          scrollbarVisibility: f,
          children: /* @__PURE__ */ e("div", { className: xe.list, "data-openbitfun-part": "list", children: n })
        }
      )
    }
  );
}), Nt = I(
  function({
    active: t = !1,
    children: n,
    className: o,
    description: r,
    disabled: i = !1,
    indicator: l,
    leading: u,
    metadata: f,
    selected: p = !1,
    tabIndex: h = -1,
    title: y,
    value: w,
    ...v
  }, k) {
    return /* @__PURE__ */ b(
      "button",
      {
        "data-overflow-trigger": !0,
        ...v,
        "aria-disabled": i || void 0,
        "aria-selected": p,
        className: $(xe.option, o),
        "data-active": t ? "true" : "false",
        "data-overflow-active": t ? "true" : void 0,
        "data-openbitfun-listbox-option": "",
        "data-openbitfun-part": "option",
        "data-selected": p ? "true" : "false",
        "data-value": w,
        disabled: i,
        ref: k,
        role: "option",
        tabIndex: h,
        title: y,
        type: "button",
        children: [
          u != null && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: xe.leading, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "leading", children: u }),
          /* @__PURE__ */ b("span", { className: xe.content, "data-openbitfun-part": "content", children: [
            /* @__PURE__ */ e(se, { title: y === "" ? "" : void 0, className: xe.label, "data-openbitfun-part": "label", marqueeActive: t, children: n }),
            r != null && /* @__PURE__ */ e("span", { className: xe.description, "data-openbitfun-part": "description", children: r })
          ] }),
          f != null && /* @__PURE__ */ e(se, { title: y === "" ? "" : void 0, className: xe.metadata, "data-openbitfun-part": "metadata", marqueeActive: t, children: f }),
          /* @__PURE__ */ e("span", { "aria-hidden": "true", className: xe.indicator, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "indicator", children: l ?? (p ? /* @__PURE__ */ e(be, { name: "check-line" }) : null) })
        ]
      }
    );
  }
), yn = I(
  function({ children: t, className: n, label: o, ...r }, i) {
    const l = Be(), u = o == null ? void 0 : l;
    return /* @__PURE__ */ b(
      "div",
      {
        ...r,
        "aria-labelledby": u,
        className: $(xe.group, n),
        "data-openbitfun-part": "group",
        ref: i,
        role: "group",
        children: [
          u && /* @__PURE__ */ e("div", { className: xe.groupLabel, "data-openbitfun-part": "group-label", id: u, children: o }),
          /* @__PURE__ */ e("div", { className: xe.groupOptions, "data-openbitfun-part": "group-options", children: t })
        ]
      }
    );
  }
), Pt = I(
  function({ className: t, ...n }, o) {
    return /* @__PURE__ */ e(
      "div",
      {
        ...n,
        className: $(xe.empty, t),
        "data-openbitfun-part": "empty",
        ref: o,
        role: "status"
      }
    );
  }
), cr = "_root_ocibj_2", lr = "_visibleLabel_ocibj_3", dr = "_control_ocibj_4", ur = "_trigger_ocibj_5", pr = "_value_ocibj_6", fr = "_singleValue_ocibj_7", br = "_valueLeading_ocibj_8", mr = "_valueLabel_ocibj_9", _r = "_placeholder_ocibj_10", gr = "_tags_ocibj_11", hr = "_tag_ocibj_11", vr = "_indicator_ocibj_13", yr = "_popover_ocibj_14", Nr = "_search_ocibj_15", wr = "_divider_ocibj_16", xr = "_options_ocibj_17", $r = "_message_ocibj_18", Cr = "_error_ocibj_19", kr = "_clear_ocibj_109", Ar = "_searchField_ocibj_333", zr = "_collapse_ocibj_340", Ir = "_listbox_ocibj_359", Sr = "_spinner_ocibj_380", ee = {
  root: cr,
  visibleLabel: lr,
  control: dr,
  trigger: ur,
  value: pr,
  singleValue: fr,
  valueLeading: br,
  valueLabel: mr,
  placeholder: _r,
  tags: gr,
  tag: hr,
  indicator: vr,
  popover: yr,
  search: Nr,
  divider: wr,
  options: xr,
  message: $r,
  error: Cr,
  clear: kr,
  searchField: Ar,
  collapse: zr,
  listbox: Ir,
  spinner: Sr
}, Lr = typeof window > "u" ? _e : Fe;
function Tr(a) {
  const t = a.nativeEvent;
  return t.isComposing || t.keyCode === 229;
}
function Dr(a, t) {
  const n = t.trim().toLocaleLowerCase();
  return n ? a.label.toLocaleLowerCase().includes(n) || String(a.value).toLocaleLowerCase().includes(n) || typeof a.description == "string" && a.description.toLocaleLowerCase().includes(n) : !0;
}
function ct(a, t) {
  if (a.length === 0) return -1;
  let n = t === 1 ? 0 : a.length - 1;
  for (; n >= 0 && n < a.length; ) {
    const o = a[n];
    if (o?.kind !== "option" || !o.option.disabled) return n;
    n += t;
  }
  return -1;
}
const Nn = I(function(t, n) {
  const { mode: o } = t, r = wt(), i = t, {
    "aria-describedby": l,
    "aria-invalid": u,
    "aria-label": f,
    "aria-labelledby": p,
    className: h,
    clearable: y = !1,
    defaultOpen: w = !1,
    disabled: v = !1,
    errorMessage: k,
    filterOption: T = Dr,
    id: _,
    invalid: s = !1,
    label: x,
    loading: d = !1,
    onCreateValue: N,
    onOpenChange: m,
    open: S,
    options: A = [],
    placement: O = "bottom",
    placeholder: X,
    required: P = !1,
    size: B = "md",
    ...F
  } = i;
  delete F.defaultValue, delete F.onValueChange, delete F.value, delete F.maxVisibleTags, delete F.selectionSummary, delete F.showSelectAll;
  const J = F, K = Ot(), V = o === "multiple", ge = i.defaultValue, re = i.value, U = i.onValueChange, ie = V ? i.maxVisibleTags ?? 3 : 0, Q = V ? i.selectionSummary : void 0, ae = V && (i.showSelectAll ?? !1), Z = X ?? K.messages.selectPlaceholder, E = A, z = Be(), G = _ ?? `openbitfun-${V ? "multi-select" : "combobox"}-${z}`, me = `${G}-label`, te = `${G}-listbox`, $e = `${G}-error`, [L, j] = oe(w && !v), [pe, fe] = oe(() => {
    if (V) {
      const C = ge;
      return C ? [...C] : [];
    }
    const c = ge;
    return c === void 0 || c === "" ? [] : [c];
  }), [R, ce] = oe(""), [de, he] = oe(-1), [bt, mt] = oe(!1), Ve = M(null), We = M(null), Re = M(null), Ee = M(null), Oe = M(!1), $t = De(() => [Ve], []), W = !v && (S ?? L), ne = De(() => {
    if (V) {
      const C = re;
      return C ? [...C] : pe;
    }
    const c = re;
    return c !== void 0 ? c === "" ? [] : [c] : pe;
  }, [re, V, pe]), tt = s || u === !0 || u === "true", rt = Y((c) => {
    Ve.current = c, typeof n == "function" ? n(c) : n && (n.current = c);
  }, [n]), Ye = Y((c) => {
    c !== W && (S === void 0 && j(c), m?.(c));
  }, [m, S, W]), ze = Y((c) => {
    Oe.current = c, Ye(!1), ce(""), he(-1);
  }, [Ye]), Ce = Y((c) => {
    re === void 0 && fe(c), U?.(V ? c : c[0] ?? "");
  }, [re, V, U]), g = De(
    () => R.trim() ? E.filter((c) => T(c, R)) : [...E],
    [T, E, R]
  ), D = De(() => {
    const c = R.trim();
    if (!N || !c) return null;
    const C = c.toLocaleLowerCase();
    return E.some((le) => String(le.value).toLocaleLowerCase() === C || le.label.toLocaleLowerCase() === C) ? null : c;
  }, [N, E, R]), q = De(() => {
    const c = [];
    return ae && g.some((C) => !C.disabled) && c.push({ kind: "all" }), g.forEach((C) => c.push({ kind: "option", option: C })), D && c.push({ kind: "create", value: D }), c;
  }, [D, g, ae]), Ie = Y((c) => `${te}-option-${c}`, [te]), ve = Y((c, C) => {
    if (q.length === 0) return -1;
    let H = c;
    for (let le = 0; le < q.length; le += 1) {
      H += C, H < 0 && (H = q.length - 1), H >= q.length && (H = 0);
      const Xt = q[H];
      if (Xt?.kind !== "option" || !Xt.option.disabled) return H;
    }
    return -1;
  }, [q]), je = Y((c) => {
    if (!(v || d || c.disabled)) {
      if (V) {
        Ce(ne.includes(c.value) ? ne.filter((C) => C !== c.value) : [...ne, c.value]);
        return;
      }
      Ce([c.value]), ze(!0);
    }
  }, [ze, Ce, v, d, V, ne]), nt = Y((c) => {
    if (!N || v || d) return;
    const C = N(c);
    C !== void 0 && (V ? ne.includes(C) || Ce([...ne, C]) : (Ce([C]), ze(!0)), ce(""));
  }, [ze, Ce, v, d, V, N, ne]), Ct = Y(() => {
    if (!V || v || d) return;
    const c = g.filter((H) => !H.disabled).map((H) => H.value), C = c.length > 0 && c.every((H) => ne.includes(H));
    Ce(C ? ne.filter((H) => !c.includes(H)) : [.../* @__PURE__ */ new Set([...ne, ...c])]);
  }, [Ce, v, g, d, V, ne]), _t = Y((c) => {
    const C = q[c];
    C && (C.kind === "all" ? Ct() : C.kind === "create" ? nt(C.value) : je(C.option));
  }, [q, je, nt, Ct]), gt = Y((c = 1, C = !1) => {
    if (v) return;
    if (Oe.current = !1, mt(C), Ye(!0), !C) {
      he(-1);
      return;
    }
    const H = q.findIndex((le) => le.kind === "option" && ne.includes(le.option.value) && !le.option.disabled);
    he(H >= 0 ? H : ct(q, c));
  }, [v, q, ne, Ye]), Cn = Y((c) => {
    if (!v) {
      if (c.key === "ArrowDown" || c.key === "ArrowUp") {
        c.preventDefault(), W ? he((C) => ve(C, c.key === "ArrowDown" ? 1 : -1)) : gt(c.key === "ArrowDown" ? 1 : -1, !0);
        return;
      }
      if (c.key === "Home" && W) {
        c.preventDefault(), he(ct(q, 1));
        return;
      }
      if (c.key === "End" && W) {
        c.preventDefault(), he(ct(q, -1));
        return;
      }
      (c.key === "Enter" || c.key === " ") && (c.preventDefault(), W ? de >= 0 && _t(de) : gt(1, !0));
    }
  }, [_t, de, v, ve, q, gt, W]), kn = Y((c) => {
    if (c.key === "Enter" && Tr(c)) {
      c.stopPropagation();
      return;
    }
    if (c.key === "ArrowDown" || c.key === "ArrowUp") {
      c.preventDefault(), c.stopPropagation(), he((C) => ve(C, c.key === "ArrowDown" ? 1 : -1));
      return;
    }
    if (c.key === "Home" || c.key === "End") {
      c.preventDefault(), c.stopPropagation(), he(ct(q, c.key === "Home" ? 1 : -1));
      return;
    }
    if (c.key === "Enter") {
      c.preventDefault(), c.stopPropagation(), de >= 0 ? _t(de) : D && nt(D);
      return;
    }
    if (c.key === "Tab") {
      const C = R.trim(), H = C ? E.find((le) => String(le.value).toLocaleLowerCase() === C.toLocaleLowerCase() || le.label.toLocaleLowerCase() === C.toLocaleLowerCase()) : void 0;
      aa(() => {
        H && !H.disabled ? je(H) : D && nt(D), ze(!0);
      });
    }
  }, [_t, de, ze, D, ve, q, E, R, je, nt]);
  sn({
    branchRefs: $t,
    enabled: W,
    layerRef: Ee,
    onDismiss: (c) => ze(c === "escape-key"),
    ownerDocument: Ve.current?.ownerDocument
  });
  const kt = cn({
    open: W,
    anchorRef: We,
    layerRef: Ee,
    placement: O,
    matchWidth: !0,
    overlapAnchor: !0,
    revision: `${R}:${g.length}:${d}`
  }), jt = kt !== null;
  Lr(() => {
    W ? jt && Re.current?.focus({ preventScroll: !0 }) : Oe.current && (Oe.current = !1, We.current?.focus({ preventScroll: !0 }));
  }, [jt, W]), _e(() => {
    !W || de < 0 || document.getElementById(Ie(de))?.scrollIntoView?.({ block: "nearest" });
  }, [de, Ie, W]);
  const it = De(() => ne.map((c) => E.find((C) => C.value === c) ?? { label: String(c), value: c }), [E, ne]), At = ne.length > 0, qt = g.some((c) => !c.disabled) && g.filter((c) => !c.disabled).every((c) => ne.includes(c.value)), Ht = De(() => {
    const c = [], C = /* @__PURE__ */ new Map();
    return g.forEach((H) => {
      if (!H.group) {
        c.push(H);
        return;
      }
      const le = C.get(H.group) ?? [];
      le.push(H), C.set(H.group, le);
    }), { groups: C, ungrouped: c };
  }, [g]), Kt = (c) => {
    const C = q.findIndex((le) => le.kind === "option" && le.option === c), H = ne.includes(c.value);
    return /* @__PURE__ */ e(
      Nt,
      {
        active: de === C,
        "aria-label": typeof c.description == "string" ? `${c.label}: ${c.description}` : c.label,
        description: c.description,
        disabled: c.disabled || d,
        id: Ie(C),
        indicator: H ? /* @__PURE__ */ e(be, { name: "check-line" }) : null,
        leading: c.leading,
        metadata: c.metadata,
        onClick: () => je(c),
        onMouseDown: (le) => le.preventDefault(),
        selected: H,
        value: c.value,
        "data-testid": c.testId,
        children: c.label
      },
      `${typeof c.value}:${c.value}`
    );
  }, An = W && de >= 0 ? Ie(de) : void 0, zt = ft({ ...i, "aria-describedby": l }, !!x), Gt = f ?? (x || zt["aria-labelledby"] || _ || typeof Z != "string" ? void 0 : Z), It = f ? p : p ?? (x ? me : zt["aria-labelledby"]), Ut = [
    zt["aria-describedby"],
    k ? $e : void 0
  ].filter(Boolean).join(" ") || void 0, Wt = W ? /* @__PURE__ */ b(
    "div",
    {
      className: ee.popover,
      "data-openbitfun-component": V ? "multi-select-popup" : "combobox-popup",
      "data-openbitfun-part": "popover",
      "data-openbitfun-native-webview-occlusion": !0,
      "data-keyboard-open": bt ? "true" : "false",
      "data-invalid": tt ? "true" : "false",
      "data-placement": kt?.placement ?? O,
      "data-size": B,
      ref: Ee,
      style: kt?.style ?? { position: "fixed", visibility: "hidden" },
      children: [
        /* @__PURE__ */ b("div", { className: ee.search, "data-openbitfun-part": "search", children: [
          /* @__PURE__ */ e(
            On,
            {
              "aria-activedescendant": An,
              "aria-autocomplete": "list",
              "aria-controls": te,
              "aria-describedby": Ut,
              "aria-expanded": W,
              "aria-label": Gt ?? (_ || It ? void 0 : K.messages.searchOptions),
              "aria-labelledby": It,
              "aria-required": P || void 0,
              "aria-busy": d || void 0,
              autoComplete: "off",
              className: ee.searchField,
              clearLabel: R ? K.messages.clearSelection : void 0,
              id: G,
              invalid: tt,
              leadingIcon: /* @__PURE__ */ e(be, { name: "search", size: "sm" }),
              onClear: R ? () => {
                ce(""), he(ct(q, 1));
              } : void 0,
              onKeyDown: kn,
              onValueChange: (c) => {
                ce(c), he(-1);
              },
              placeholder: K.messages.searchOptions,
              ref: Re,
              role: "combobox",
              size: B,
              value: R,
              variant: "embedded"
            }
          ),
          /* @__PURE__ */ e(
            Se,
            {
              "aria-label": K.messages.dialogClose,
              className: ee.collapse,
              "data-openbitfun-part": "collapse",
              icon: /* @__PURE__ */ e(be, { name: "chevron-up" }),
              onClick: () => ze(!0),
              size: "xs",
              variant: "quiet"
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { "aria-hidden": "true", className: ee.divider, "data-openbitfun-part": "divider" }),
        /* @__PURE__ */ e("div", { className: ee.options, "data-openbitfun-part": "options", children: /* @__PURE__ */ e(
          vn,
          {
            "aria-label": f ?? (typeof x == "string" ? x : "Options"),
            className: ee.listbox,
            focusMode: "virtual",
            id: te,
            multiple: V,
            children: d && g.length === 0 ? /* @__PURE__ */ b(Pt, { className: ee.message, children: [
              /* @__PURE__ */ e(Fn, { "aria-hidden": "true", className: ee.spinner }),
              /* @__PURE__ */ e("span", { children: K.messages.loading })
            ] }) : q.length === 0 ? /* @__PURE__ */ e(Pt, { children: K.messages.noOptions }) : /* @__PURE__ */ b(ot, { children: [
              q[0]?.kind === "all" && /* @__PURE__ */ e(
                Nt,
                {
                  active: de === 0,
                  id: Ie(0),
                  indicator: qt ? /* @__PURE__ */ e(be, { name: "check-line" }) : null,
                  onClick: Ct,
                  onMouseDown: (c) => c.preventDefault(),
                  selected: qt,
                  children: K.messages.selectAll
                }
              ),
              Ht.ungrouped.map(Kt),
              [...Ht.groups].map(([c, C]) => /* @__PURE__ */ e(yn, { label: c, children: C.map(Kt) }, c)),
              D && (() => {
                const c = q.findIndex((C) => C.kind === "create");
                return /* @__PURE__ */ b(
                  Nt,
                  {
                    active: de === c,
                    id: Ie(c),
                    leading: /* @__PURE__ */ e(be, { name: "plus" }),
                    onClick: () => nt(D),
                    onMouseDown: (C) => C.preventDefault(),
                    selected: ne.includes(D),
                    value: D,
                    children: [
                      K.messages.createValue,
                      ": ",
                      D
                    ]
                  }
                );
              })()
            ] })
          }
        ) })
      ]
    }
  ) : null, St = it[0], Yt = V && At && Q == null;
  return /* @__PURE__ */ b(
    "div",
    {
      ...J,
      className: $(ee.root, h),
      "data-openbitfun-component": V ? "multi-select" : "combobox",
      "data-disabled": v ? "true" : "false",
      "data-field-surface": r,
      "data-invalid": tt ? "true" : "false",
      "data-open": W ? "true" : "false",
      "data-size": B,
      ref: rt,
      children: [
        x != null && /* @__PURE__ */ e("label", { className: ee.visibleLabel, "data-openbitfun-part": "label", htmlFor: G, id: me, children: x }),
        /* @__PURE__ */ b(
          "div",
          {
            "aria-hidden": W || void 0,
            className: ee.control,
            "data-openbitfun-part": "control",
            "data-tags": Yt ? "true" : "false",
            children: [
              Yt && /* @__PURE__ */ b("span", { className: ee.tags, "data-openbitfun-part": "tags", children: [
                it.slice(0, Math.max(1, ie)).map((c) => /* @__PURE__ */ e(ko, { size: "xs", "data-openbitfun-part": "tag", action: /* @__PURE__ */ e(
                  Se,
                  {
                    "aria-label": `${K.messages.clearSelection}: ${c.label}`,
                    disabled: v,
                    icon: /* @__PURE__ */ e(be, { name: "xmark" }),
                    onClick: (C) => {
                      C.stopPropagation(), Ce(ne.filter((H) => H !== c.value));
                    },
                    onMouseDown: (C) => C.preventDefault(),
                    shape: "circle",
                    size: "xs",
                    tabIndex: W ? -1 : void 0,
                    variant: "quiet"
                  }
                ), children: /* @__PURE__ */ e("span", { className: ee.tag, children: /* @__PURE__ */ e(se, { children: c.label }) }) }, `${typeof c.value}:${c.value}`)),
                it.length > Math.max(1, ie) && /* @__PURE__ */ b("span", { className: ee.tag, children: [
                  "+",
                  it.length - Math.max(1, ie)
                ] })
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  "data-overflow-trigger": !0,
                  "aria-controls": W ? void 0 : te,
                  "aria-describedby": Ut,
                  "aria-expanded": W ? void 0 : !1,
                  "aria-haspopup": "listbox",
                  "aria-invalid": tt || void 0,
                  "aria-label": Gt,
                  "aria-labelledby": It,
                  "aria-required": P || void 0,
                  "aria-busy": d || void 0,
                  className: ee.trigger,
                  "data-openbitfun-part": "trigger",
                  disabled: v,
                  id: W ? void 0 : G,
                  onClick: () => {
                    W ? ze(!1) : gt(1, !1);
                  },
                  onKeyDown: Cn,
                  ref: We,
                  role: W ? void 0 : "combobox",
                  tabIndex: W ? -1 : void 0,
                  type: "button",
                  children: /* @__PURE__ */ e("span", { className: ee.value, "data-openbitfun-part": "value", children: At ? V ? /* @__PURE__ */ e(se, { className: ee.valueLabel, children: Q ?? it.map((c) => c.label).join(", ") }) : /* @__PURE__ */ b("span", { className: ee.singleValue, children: [
                    St?.leading && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: ee.valueLeading, "data-openbitfun-icon-slot": "true", children: St.leading }),
                    /* @__PURE__ */ e(se, { className: ee.valueLabel, children: St?.label })
                  ] }) : /* @__PURE__ */ e(se, { className: ee.placeholder, children: Z }) })
                }
              ),
              y && At && !v && /* @__PURE__ */ e(
                Se,
                {
                  "aria-label": K.messages.clearSelection,
                  className: ee.clear,
                  icon: /* @__PURE__ */ e(be, { name: "xmark" }),
                  onClick: (c) => {
                    c.stopPropagation(), Ce([]), ce("");
                  },
                  size: "sm",
                  tabIndex: W ? -1 : void 0,
                  variant: "quiet"
                }
              ),
              /* @__PURE__ */ e("span", { "aria-hidden": "true", className: ee.indicator, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "indicator", children: /* @__PURE__ */ e(be, { name: "chevron-down" }) })
            ]
          }
        ),
        k ? /* @__PURE__ */ e("span", { className: ee.error, "data-openbitfun-part": "message", id: $e, children: k }) : null,
        Wt && /* @__PURE__ */ e(ln, { ownerDocument: We.current?.ownerDocument, ownerRef: We, open: W, children: Wt })
      ]
    }
  );
}), tl = I(function(t, n) {
  return /* @__PURE__ */ e(Nn, { ...t, mode: "single", ref: n });
}), nl = I(function(t, n) {
  return /* @__PURE__ */ e(Nn, { ...t, mode: "multiple", ref: n });
}), Rr = "_content_16hhf_2", Er = "_messageRow_16hhf_3", Pr = "_icon_16hhf_4", Mr = "_message_16hhf_3", Or = "_preview_16hhf_6", Fr = "_splitActions_16hhf_7", Br = "_actionGroup_16hhf_8", Je = {
  content: Rr,
  messageRow: Er,
  icon: Pr,
  message: Mr,
  preview: Or,
  splitActions: Fr,
  actionGroup: Br
}, Vr = {
  error: /* @__PURE__ */ e(be, { glyph: Wn }),
  info: /* @__PURE__ */ e(be, { name: "info" }),
  success: /* @__PURE__ */ e(be, { name: "check-circle" }),
  warning: /* @__PURE__ */ e(be, { glyph: Un })
}, al = I(
  function({
    cancelText: t,
    closeOnEscape: n = !0,
    closeOnPointerOutside: o = !0,
    confirmDanger: r = !1,
    confirmText: i,
    icon: l,
    message: u,
    onActionError: f,
    onConfirm: p,
    onOpenChange: h,
    onSecondary: y,
    open: w,
    pendingAction: v,
    preview: k,
    secondaryActionPlacement: T = "inline",
    secondaryText: _,
    showCancel: s = !0,
    showCloseButton: x = !1,
    testId: d,
    title: N,
    type: m = "warning"
  }, S) {
    const A = Ot(), O = M(null), X = M(!0), [P, B] = oe(null), F = v ?? P, J = F !== null, K = l === !1 ? null : l ?? Vr[m], V = u != null && u !== "", ge = k != null && k !== "", re = _ != null, U = re && T === "start", ie = t ?? A.messages.confirmCancel, Q = i ?? A.messages.confirmAction;
    _e(() => () => {
      X.current = !1;
    }, []), _e(() => {
      w || B(null);
    }, [w]);
    const ae = Y(async (me, te) => {
      if (!(!te || J))
        try {
          const $e = te();
          $e && typeof $e.then == "function" && (B(me), await $e);
        } catch ($e) {
          f?.($e, me);
        } finally {
          X.current && B(null);
        }
    }, [J, f]), Z = Y((me) => {
      J || h(!1, me);
    }, [J, h]), E = s ? /* @__PURE__ */ e(yt, { disabled: J, onClick: () => Z("cancel-button"), variant: "fill", children: ie }) : null, z = re ? /* @__PURE__ */ e(
      yt,
      {
        disabled: J,
        labelBehavior: U ? "static" : void 0,
        loading: F === "secondary",
        onClick: () => {
          ae("secondary", y);
        },
        variant: U ? "text" : "outline",
        children: _
      }
    ) : null, G = /* @__PURE__ */ e(
      yt,
      {
        disabled: J,
        loading: F === "confirm",
        onClick: () => {
          ae("confirm", p);
        },
        ref: O,
        tone: r || m === "error" ? "danger" : "neutral",
        variant: "primary",
        children: Q
      }
    );
    return /* @__PURE__ */ b(
      Bn,
      {
        closeOnEscape: !J && n,
        closeOnPointerOutside: !J && o,
        "data-testid": d,
        initialFocusRef: O,
        onOpenChange: (me, te) => Z(te),
        open: w,
        ref: S,
        role: "alertdialog",
        size: "sm",
        children: [
          /* @__PURE__ */ b(Vn, { children: [
            /* @__PURE__ */ e(jn, { children: /* @__PURE__ */ e(qn, { children: N }) }),
            x ? /* @__PURE__ */ e(Hn, { disabled: J }) : null
          ] }),
          V || ge ? /* @__PURE__ */ e(Kn, { children: /* @__PURE__ */ b("div", { className: Je.content, "data-openbitfun-component": "confirm-dialog", "data-openbitfun-part": "content", children: [
            V ? /* @__PURE__ */ b(
              "div",
              {
                className: Je.messageRow,
                "data-openbitfun-component": "confirm-dialog",
                "data-openbitfun-part": "messageRow",
                children: [
                  K !== null ? /* @__PURE__ */ e(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: Je.icon,
                      "data-openbitfun-component": "confirm-dialog",
                      "data-openbitfun-icon-slot": "true",
                      "data-openbitfun-part": "icon",
                      "data-openbitfun-status": m === "error" ? "danger" : m,
                      children: K
                    }
                  ) : null,
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: Je.message,
                      "data-openbitfun-component": "confirm-dialog",
                      "data-openbitfun-part": "message",
                      children: u
                    }
                  )
                ]
              }
            ) : null,
            ge ? /* @__PURE__ */ e(
              "div",
              {
                className: Je.preview,
                "data-openbitfun-component": "confirm-dialog",
                "data-openbitfun-part": "preview",
                children: typeof k == "string" ? /* @__PURE__ */ e("pre", { children: k }) : k
              }
            ) : null
          ] }) }) : null,
          /* @__PURE__ */ e(Gn, { children: U ? /* @__PURE__ */ b(
            "div",
            {
              className: Je.splitActions,
              "data-openbitfun-component": "confirm-dialog",
              "data-openbitfun-part": "actions",
              children: [
                z,
                /* @__PURE__ */ b(
                  "div",
                  {
                    className: Je.actionGroup,
                    "data-openbitfun-component": "confirm-dialog",
                    "data-openbitfun-part": "actionGroup",
                    children: [
                      E,
                      G
                    ]
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ b(ot, { children: [
            E,
            z,
            G
          ] }) })
        ]
      }
    );
  }
), jr = "_root_16vrx_2", qr = "_content_16vrx_47", Hr = "_labelRow_16vrx_55", Kr = "_label_16vrx_55", Gr = "_required_16vrx_84", Ur = "_labelAction_16vrx_88", Wr = "_description_16vrx_95", Yr = "_error_16vrx_104", Xr = "_control_16vrx_114", Qr = "_controlAdornment_16vrx_125", Le = {
  root: jr,
  content: qr,
  labelRow: Hr,
  label: Kr,
  required: Gr,
  labelAction: Ur,
  description: Wr,
  error: Yr,
  control: Xr,
  controlAdornment: Qr
}, ol = I(function({
  children: t,
  className: n,
  controlLeading: o,
  controlTrailing: r,
  controlWidth: i = "auto",
  description: l,
  error: u,
  horizontalGap: f = "md",
  label: p,
  labelAction: h,
  labelWidth: y = "auto",
  orientation: w = "vertical",
  required: v = !1,
  ...k
}, T) {
  const _ = Be(), s = t.props.id ?? `openbitfun-field-${_}`, x = l == null ? void 0 : `${s}-description`, d = u != null && u !== !1, N = d ? `${s}-error` : void 0, m = [t.props["aria-describedby"], x, N].filter((O) => !!O).join(" ") || void 0, S = v || t.props.required === !0, A = bn(t, {
    "aria-describedby": m,
    "aria-invalid": d ? !0 : t.props["aria-invalid"],
    id: s,
    required: S || void 0
  });
  return /* @__PURE__ */ b(
    "div",
    {
      ...k,
      className: $(Le.root, n),
      "data-openbitfun-component": "field",
      "data-control-width": i,
      "data-horizontal-gap": f,
      "data-label-width": y,
      "data-invalid": d ? "true" : void 0,
      "data-orientation": w,
      "data-required": S ? "true" : "false",
      ref: T,
      children: [
        /* @__PURE__ */ b("span", { className: Le.content, "data-openbitfun-part": "content", children: [
          /* @__PURE__ */ b("span", { className: Le.labelRow, "data-openbitfun-part": "label-row", children: [
            /* @__PURE__ */ b("label", { className: Le.label, htmlFor: s, children: [
              /* @__PURE__ */ e("span", { children: p }),
              S && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: Le.required, "data-openbitfun-part": "required", children: "*" })
            ] }),
            h != null && /* @__PURE__ */ e("span", { className: Le.labelAction, "data-openbitfun-part": "label-action", children: h })
          ] }),
          x !== void 0 && /* @__PURE__ */ e("span", { className: Le.description, "data-openbitfun-part": "description", id: x, children: l })
        ] }),
        /* @__PURE__ */ b("span", { className: Le.control, "data-openbitfun-part": "control", children: [
          o != null && /* @__PURE__ */ e("span", { className: Le.controlAdornment, "data-openbitfun-part": "control-leading", children: o }),
          /* @__PURE__ */ e(Yn, { children: A }),
          r != null && /* @__PURE__ */ e("span", { className: Le.controlAdornment, "data-openbitfun-part": "control-trailing", children: r })
        ] }),
        d && /* @__PURE__ */ e("span", { className: Le.error, "data-openbitfun-part": "error", id: N, children: u })
      ]
    }
  );
}), Jr = "_section_1ioz0_2", Zr = "_header_1ioz0_3", ei = "_headingRegion_1ioz0_4", ti = "_leading_1ioz0_5", ni = "_headingContent_1ioz0_6", ai = "_title_1ioz0_7", oi = "_description_1ioz0_8", ri = "_actions_1ioz0_9", ii = "_group_1ioz0_10", si = "_row_1ioz0_11", Te = {
  section: Jr,
  header: Zr,
  headingRegion: ei,
  leading: ti,
  headingContent: ni,
  title: ai,
  description: oi,
  actions: ri,
  group: ii,
  row: si
}, rl = I(
  function({
    actions: t,
    children: n,
    className: o,
    description: r,
    descriptionLayout: i = "stacked",
    headingAs: l = "h2",
    leading: u,
    title: f,
    ...p
  }, h) {
    return /* @__PURE__ */ b(
      "section",
      {
        ...p,
        className: $(Te.section, o),
        "data-openbitfun-component": "form-section",
        "data-description-layout": i,
        ref: h,
        children: [
          f != null || r != null || u != null || t != null ? /* @__PURE__ */ b("div", { className: Te.header, "data-openbitfun-part": "header", children: [
            f != null || r != null || u != null ? /* @__PURE__ */ b("div", { className: Te.headingRegion, "data-openbitfun-part": "heading-region", children: [
              u != null && /* @__PURE__ */ e("div", { className: Te.leading, "data-openbitfun-part": "leading", children: u }),
              f != null || r != null ? /* @__PURE__ */ b("div", { className: Te.headingContent, "data-openbitfun-part": "heading-content", children: [
                f != null && mn(
                  l,
                  { className: Te.title, "data-openbitfun-part": "title" },
                  f
                ),
                r != null && (i === "inline" ? /* @__PURE__ */ e(se, { as: "div", className: Te.description, "data-openbitfun-part": "description", children: r }) : /* @__PURE__ */ e("div", { className: Te.description, "data-openbitfun-part": "description", children: r }))
              ] }) : null
            ] }) : null,
            t != null && /* @__PURE__ */ e("div", { className: Te.actions, "data-openbitfun-part": "actions", children: t })
          ] }) : null,
          n
        ]
      }
    );
  }
), il = I(
  function({
    appearance: t = "subtle",
    children: n,
    className: o,
    dividers: r = !0,
    fieldSurface: i = "default",
    ...l
  }, u) {
    return /* @__PURE__ */ e(Xn.Provider, { value: i, children: /* @__PURE__ */ e(
      "div",
      {
        ...l,
        className: $(Te.group, o),
        "data-appearance": t,
        "data-openbitfun-component": "field-group",
        "data-dividers": r ? "true" : "false",
        "data-field-surface": i,
        ref: u,
        children: n
      }
    ) });
  }
), sl = I(
  function({
    align: t = "center",
    children: n,
    className: o,
    padding: r = "md",
    ...i
  }, l) {
    return /* @__PURE__ */ e(
      "div",
      {
        ...i,
        className: $(Te.row, o),
        "data-align": t,
        "data-openbitfun-part": "row",
        "data-padding": r,
        ref: l,
        children: n
      }
    );
  }
), ci = "_root_2jhek_2", li = "_icon_2jhek_26", di = "_label_2jhek_31", Tt = {
  root: ci,
  icon: li,
  label: di
}, cl = I(function({
  children: t,
  className: n,
  icon: o,
  ...r
}, i) {
  return /* @__PURE__ */ b(
    "kbd",
    {
      ...r,
      className: $(Tt.root, n),
      "data-openbitfun-component": "key-hint",
      ref: i,
      children: [
        o != null && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: Tt.icon, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "icon", children: o }),
        /* @__PURE__ */ e("span", { className: Tt.label, "data-openbitfun-part": "label", children: t })
      ]
    }
  );
}), ui = "_root_2x5iy_2", pi = "_icon_2x5iy_3", fi = "_label_2x5iy_4", Dt = {
  root: ui,
  icon: pi,
  label: fi
}, ll = I(function({
  children: t,
  className: n,
  leadingIcon: o,
  type: r = "button",
  ...i
}, l) {
  return /* @__PURE__ */ b(
    "button",
    {
      "data-overflow-trigger": !0,
      ...i,
      className: $(Dt.root, n),
      "data-openbitfun-component": "launcher-button",
      "data-openbitfun-part": "root",
      ref: l,
      type: r,
      children: [
        o != null && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: Dt.icon, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "icon", children: o }),
        /* @__PURE__ */ e(se, { className: Dt.label, "data-openbitfun-part": "label", children: t })
      ]
    }
  );
}), bi = "_root_1nz19_2", mi = "_label_1nz19_5", _i = "_control_1nz19_6", gi = "_input_1nz19_10", hi = "_unit_1nz19_11", vi = "_buttons_1nz19_13", yi = "_stepButton_1nz19_24", He = {
  root: bi,
  label: mi,
  control: _i,
  input: gi,
  unit: hi,
  buttons: vi,
  stepButton: yi
}, dl = I(function({
  className: t,
  decrementLabel: n = "Decrease value",
  disabled: o = !1,
  disableWheel: r = !1,
  formatValue: i,
  incrementLabel: l = "Increase value",
  label: u,
  max: f = Number.POSITIVE_INFINITY,
  min: p = Number.NEGATIVE_INFINITY,
  onBlur: h,
  onValueChange: y,
  onFocus: w,
  onKeyDown: v,
  precision: k = 0,
  showButtons: T = !0,
  size: _ = "md",
  step: s = 1,
  unit: x,
  value: d,
  variant: N = "default",
  id: m,
  required: S,
  "aria-label": A,
  "aria-labelledby": O,
  "aria-describedby": X,
  "aria-invalid": P
}, B) {
  const F = wt(), J = ft({
    "aria-label": A,
    "aria-labelledby": O,
    "aria-describedby": X
  }, !!u), K = Y((z) => k > 0 ? z.toFixed(k) : String(Math.round(z)), [k]), V = Y((z) => Math.min(f, Math.max(p, z)), [f, p]), [ge, re] = oe(() => K(d)), [U, ie] = oe(!1), Q = M(!1), ae = M(!1);
  _e(() => {
    U || re(K(d));
  }, [U, K, d]);
  const Z = Y(() => {
    const z = Number.parseFloat(ge);
    if (Number.isFinite(z)) {
      const G = V(z);
      G !== d && y(G), re(K(G));
    } else
      re(K(d));
    ie(!1);
  }, [V, ge, K, y, d]), E = (z) => {
    const G = V(d + z);
    G !== d && y(G);
  };
  return /* @__PURE__ */ b("span", { className: $(He.root, t), "data-openbitfun-component": "number-input", "data-disabled": o ? "true" : "false", "data-field-surface": F, "data-size": _, "data-variant": N, children: [
    u && /* @__PURE__ */ e("span", { className: He.label, "data-openbitfun-part": "label", children: u }),
    /* @__PURE__ */ b(
      "span",
      {
        className: He.control,
        "data-openbitfun-part": "control",
        onWheel: (z) => {
          o || r || document.activeElement !== z.currentTarget.querySelector("input") || (z.preventDefault(), E(z.deltaY < 0 ? s : -s));
        },
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              id: m,
              required: S,
              "aria-labelledby": J["aria-labelledby"],
              "aria-describedby": J["aria-describedby"],
              "aria-invalid": P,
              "aria-label": A ?? u,
              className: He.input,
              "data-openbitfun-part": "input",
              disabled: o,
              inputMode: "decimal",
              onBlur: (z) => {
                h?.(z), !z.defaultPrevented && !ae.current && Z(), ae.current = !1;
              },
              onChange: (z) => re(z.currentTarget.value),
              onCompositionEnd: (z) => {
                Q.current = !1;
              },
              onCompositionStart: (z) => {
                Q.current = !0;
              },
              onFocus: (z) => {
                i && re(K(d)), ie(!0), w?.(z);
              },
              onKeyDown: (z) => {
                if (v?.(z), !z.defaultPrevented) {
                  if ((z.key === "Enter" || z.key === "Escape") && dn(z, Q.current)) {
                    z.stopPropagation();
                    return;
                  }
                  z.key === "ArrowUp" && (z.preventDefault(), E(s)), z.key === "ArrowDown" && (z.preventDefault(), E(-s)), z.key === "Enter" && z.currentTarget.blur(), z.key === "Escape" && (ae.current = !0, re(K(d)), ie(!1), z.currentTarget.blur());
                }
              },
              ref: B,
              type: "text",
              value: !U && i ? i(d) : ge
            }
          ),
          x && /* @__PURE__ */ e("span", { className: He.unit, "data-openbitfun-part": "unit", children: x }),
          T && N !== "compact" && /* @__PURE__ */ b("span", { className: He.buttons, "data-openbitfun-part": "buttons", children: [
            /* @__PURE__ */ e("button", { className: He.stepButton, "aria-label": n, disabled: o || d <= p, onClick: () => E(-s), tabIndex: -1, type: "button", children: "−" }),
            /* @__PURE__ */ e("button", { className: He.stepButton, "aria-label": l, disabled: o || d >= f, onClick: () => E(s), tabIndex: -1, type: "button", children: "+" })
          ] })
        ]
      }
    )
  ] });
}), Ni = "_root_1t0qc_2", wi = "_value_1t0qc_22", tn = {
  root: Ni,
  value: wi
}, xi = I(function({
  className: t,
  value: n,
  ...o
}, r) {
  return /* @__PURE__ */ e(
    "span",
    {
      ...o,
      className: $(tn.root, t),
      "data-openbitfun-component": "number-badge",
      ref: r,
      children: /* @__PURE__ */ e("span", { className: tn.value, "data-openbitfun-part": "value", children: n })
    }
  );
}), $i = "_root_2u5mw_2", Ci = "_header_2u5mw_3", ki = "_body_2u5mw_4", Ai = "_content_2u5mw_5", zi = "_section_2u5mw_6", Ii = "_heading_2u5mw_7", Si = "_items_2u5mw_8", Li = "_separator_2u5mw_9", Ti = "_footer_2u5mw_10", Di = "_headingLabel_2u5mw_84", Ri = "_headingActions_2u5mw_97", Ei = "_headingAction_2u5mw_97", Pi = "_item_2u5mw_8", Ae = {
  root: $i,
  header: Ci,
  body: ki,
  content: Ai,
  section: zi,
  heading: Ii,
  items: Si,
  separator: Li,
  footer: Ti,
  headingLabel: Di,
  headingActions: Ri,
  headingAction: Ei,
  item: Pi
}, ul = I(
  function({
    children: t,
    className: n,
    ...o
  }, r) {
    return /* @__PURE__ */ e(
      "nav",
      {
        ...o,
        className: $(Ae.root, n),
        "data-openbitfun-component": "navigation-panel",
        ref: r,
        children: t
      }
    );
  }
), pl = I(
  function({ className: t, ...n }, o) {
    return /* @__PURE__ */ e(
      "div",
      {
        ...n,
        className: $(Ae.header, t),
        "data-openbitfun-part": "header",
        ref: o
      }
    );
  }
), fl = I(
  function({ className: t, scrollbarVisibility: n = "auto", ...o }, r) {
    return /* @__PURE__ */ e(
      Mt,
      {
        ...o,
        className: $(Ae.body, t),
        "data-openbitfun-part": "body",
        orientation: "vertical",
        ref: r,
        scrollbarVisibility: n
      }
    );
  }
), bl = I(
  function({ className: t, ...n }, o) {
    return /* @__PURE__ */ e(
      "div",
      {
        ...n,
        className: $(Ae.content, t),
        "data-openbitfun-part": "content",
        ref: o
      }
    );
  }
), ml = I(
  function({ className: t, ...n }, o) {
    return /* @__PURE__ */ e(
      "div",
      {
        ...n,
        className: $(Ae.footer, t),
        "data-openbitfun-part": "footer",
        ref: o
      }
    );
  }
), _l = I(
  function({
    "aria-current": t,
    className: n,
    selected: o = !1,
    ...r
  }, i) {
    return /* @__PURE__ */ e(
      Qn,
      {
        ...r,
        "aria-current": t ?? (o ? "page" : void 0),
        className: $(Ae.item, n),
        ref: i
      }
    );
  }
), gl = I(
  function({
    "aria-label": t,
    "aria-labelledby": n,
    actions: o = [],
    children: r,
    className: i,
    title: l,
    ...u
  }, f) {
    const p = Be(), h = l != null ? p : void 0;
    return /* @__PURE__ */ b(
      "section",
      {
        ...u,
        "aria-label": t,
        "aria-labelledby": t || n ? n : h,
        className: $(Ae.section, i),
        "data-openbitfun-part": "section",
        ref: f,
        children: [
          h && /* @__PURE__ */ b("div", { className: Ae.heading, "data-openbitfun-part": "heading", id: h, children: [
            /* @__PURE__ */ e(se, { className: Ae.headingLabel, "data-openbitfun-part": "heading-label", children: l }),
            o.length > 0 && /* @__PURE__ */ e("span", { className: Ae.headingActions, "data-openbitfun-part": "heading-actions", children: o.map((w) => /* @__PURE__ */ e(
              Se,
              {
                "aria-label": w.label,
                className: Ae.headingAction,
                disabled: w.disabled,
                icon: w.icon,
                onClick: w.onClick,
                size: "sm",
                tone: w.tone,
                variant: "quiet"
              },
              w.id
            )) })
          ] }),
          /* @__PURE__ */ e("div", { className: Ae.items, "data-openbitfun-part": "section-items", children: r })
        ]
      }
    );
  }
), hl = I(
  function({ className: t, ...n }, o) {
    return /* @__PURE__ */ e(
      "div",
      {
        ...n,
        className: $(Ae.separator, t),
        "data-openbitfun-part": "separator",
        ref: o,
        role: "separator"
      }
    );
  }
), Mi = "_root_1gme2_2", Oi = "_leading_1gme2_15", Fi = "_content_1gme2_22", Bi = "_heading_1gme2_36", Vi = "_required_1gme2_70", ji = "_description_1gme2_75", qi = "_action_1gme2_105", Ze = {
  root: Mi,
  leading: Oi,
  content: Fi,
  heading: Bi,
  required: Vi,
  description: ji,
  action: qi
}, Hi = I(function({
  action: t,
  align: n = "start",
  className: o,
  description: r,
  leading: i,
  level: l = 1,
  required: u = !1,
  size: f = "md",
  title: p,
  ...h
}, y) {
  const w = `h${l}`;
  return /* @__PURE__ */ b(
    "div",
    {
      ...h,
      className: $(Ze.root, o),
      "data-align": n,
      "data-openbitfun-component": "page-header",
      "data-level": l,
      "data-required": u ? "true" : "false",
      "data-size": f,
      ref: y,
      children: [
        i != null && /* @__PURE__ */ e("span", { className: Ze.leading, "data-openbitfun-part": "leading", children: i }),
        /* @__PURE__ */ b("span", { className: Ze.content, "data-openbitfun-part": "content", children: [
          /* @__PURE__ */ b(w, { className: Ze.heading, "data-openbitfun-part": "heading", children: [
            p,
            u && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: Ze.required, "data-openbitfun-part": "required", children: "*" })
          ] }),
          r != null && /* @__PURE__ */ e("span", { className: Ze.description, "data-openbitfun-part": "description", children: r })
        ] }),
        t != null && /* @__PURE__ */ e("span", { className: Ze.action, "data-openbitfun-part": "action", children: t })
      ]
    }
  );
}), Ki = "_root_7x22g_2", Gi = "_layout_7x22g_3", Ui = "_header_7x22g_4", Wi = "_heading_7x22g_5", Yi = "_headerActions_7x22g_6", Xi = "_guide_7x22g_7", Qi = "_contentInner_7x22g_8", Ji = "_footer_7x22g_9", Zi = "_title_7x22g_51", es = "_guideContent_7x22g_76", ts = "_guideCopy_7x22g_85", ns = "_progress_7x22g_87", as = "_step_7x22g_100", os = "_content_7x22g_8", ye = {
  root: Ki,
  layout: Gi,
  header: Ui,
  heading: Wi,
  headerActions: Yi,
  guide: Xi,
  contentInner: Qi,
  footer: Ji,
  title: Zi,
  guideContent: es,
  guideCopy: ts,
  progress: ns,
  step: as,
  content: os
}, vl = I(function({
  children: t,
  className: n,
  contentMode: o = "scroll",
  footer: r,
  guideLabel: i,
  headerActions: l,
  step: u,
  title: f,
  titleId: p,
  ...h
}, y) {
  const w = Be(), v = M(null);
  return _e(() => {
    v.current && (v.current.scrollTop = 0);
  }, [u.id]), /* @__PURE__ */ e("div", { ...h, className: $(ye.root, n), "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "root", "data-content-mode": o, ref: y, children: /* @__PURE__ */ b("div", { className: ye.layout, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "layout", children: [
    /* @__PURE__ */ b("header", { className: ye.header, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "header", children: [
      /* @__PURE__ */ e("div", { className: ye.heading, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "heading", children: /* @__PURE__ */ e("h2", { className: ye.title, id: p ?? w, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "title", children: /* @__PURE__ */ e(se, { children: f }) }) }),
      /* @__PURE__ */ e("div", { className: ye.headerActions, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "headerActions", children: l })
    ] }),
    /* @__PURE__ */ e("aside", { className: ye.guide, "aria-label": i, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "guide", children: /* @__PURE__ */ b("div", { className: ye.guideContent, "aria-live": "polite", "aria-atomic": "true", children: [
      /* @__PURE__ */ e("div", { className: ye.guideCopy, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "guideCopy", children: /* @__PURE__ */ e(Hi, { title: u.title, description: u.description, level: 3 }) }),
      /* @__PURE__ */ b("div", { className: ye.progress, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "progress", children: [
        /* @__PURE__ */ e("span", { children: u.progress }),
        /* @__PURE__ */ e("span", { className: ye.step, "aria-current": "step", "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "step", children: u.label })
      ] })
    ] }) }),
    /* @__PURE__ */ e(Mt, { className: ye.content, ref: v, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "content", children: /* @__PURE__ */ e("div", { className: ye.contentInner, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "contentInner", children: t }) }),
    /* @__PURE__ */ e("footer", { className: ye.footer, "data-openbitfun-component": "setup-wizard", "data-openbitfun-part": "footer", children: r })
  ] }) });
}), rs = "_root_11mhf_2", is = "_current_11mhf_14", ss = "_outgoing_11mhf_18", Rt = {
  root: rs,
  current: is,
  outgoing: ss
}, nn = typeof window > "u" ? _e : Fe;
function cs(a) {
  const t = Number.parseFloat(a);
  return Number.isFinite(t) ? t * (a.trim().endsWith("ms") ? 1 : 1e3) : 0;
}
function ls({ active: a, returning: t, revision: n, text: o, onComplete: r }) {
  const i = M(null), l = M(null), u = M(null), f = M(null), p = M([]), h = M(null);
  return nn(() => {
    const y = i.current, w = l.current, v = u.current, k = y?.ownerDocument.defaultView;
    if (!y || !w || !k) return;
    const T = p.current.length > 0, _ = T && h.current === n, s = T ? y.getBoundingClientRect().width : f.current, x = _ ? k.getComputedStyle(w).transform : "translateY(100%)", d = _ && v ? k.getComputedStyle(v).transform : "translateY(0)", N = p.current;
    p.current = [], N.forEach((B) => B.cancel());
    const m = y.getBoundingClientRect().width;
    if (f.current = m, !a || !v) return;
    const S = k.getComputedStyle(y), A = cs(S.getPropertyValue("--_rolling-text-duration")), O = S.getPropertyValue("--_rolling-text-easing").trim();
    if (!y.animate || A <= 0 || m <= 0) {
      r();
      return;
    }
    const X = { duration: A, easing: O, fill: "both" }, P = [
      w.animate([
        { transform: x },
        { transform: t ? "translateY(100%)" : "translateY(0)" }
      ], X),
      v.animate([
        { transform: d },
        { transform: t ? "translateY(0)" : "translateY(-100%)" }
      ], X),
      y.animate([
        { inlineSize: `${s ?? m}px` },
        { inlineSize: `${m}px` }
      ], X)
    ];
    p.current = P, h.current = n, Promise.all(P.map((B) => B.finished)).then(() => {
      p.current === P && r();
    }, () => {
    });
  }, [a, t, n, o, r]), nn(() => {
    const y = i.current, w = y && typeof ResizeObserver < "u" ? new ResizeObserver(() => {
      p.current.length === 0 && (f.current = y.getBoundingClientRect().width);
    }) : null;
    return y && w?.observe(y), () => {
      w?.disconnect();
      const v = p.current;
      p.current = [], v.forEach((k) => k.cancel());
    };
  }, []), { rootRef: i, currentRef: l, outgoingRef: u };
}
const ds = I(
  function({
    behavior: t = "marquee",
    children: n,
    className: o,
    marqueeActive: r,
    transitionKey: i = n,
    ...l
  }, u) {
    const f = Jn(), [p, h] = oe(() => ({
      identity: i,
      text: n,
      outgoing: null,
      revision: 0
    }));
    if (p.identity !== i || p.text !== n || f && p.outgoing !== null) {
      const _ = !f && p.identity !== i && p.text !== n && p.outgoing === null;
      h({
        identity: i,
        text: n,
        outgoing: f ? null : _ ? p.text : p.outgoing,
        revision: p.revision + (_ ? 1 : 0)
      });
    }
    const y = p.outgoing !== null, w = Y(() => {
      h((_) => _.revision === p.revision && _.outgoing !== null ? { ..._, outgoing: null } : _);
    }, [p.revision]), { rootRef: v, currentRef: k, outgoingRef: T } = ls({
      active: y,
      returning: p.text === p.outgoing,
      revision: p.revision,
      text: p.text,
      onComplete: w
    });
    return _n(u, () => v.current, [v]), /* @__PURE__ */ b(
      "span",
      {
        ...l,
        className: $(Rt.root, o),
        "data-openbitfun-component": "rolling-text",
        "data-transitioning": y ? "true" : "false",
        ref: v,
        children: [
          y && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: Rt.outgoing, "data-rolling-text-part": "outgoing", ref: T, children: /* @__PURE__ */ e(se, { behavior: "fade", children: p.outgoing }) }),
          /* @__PURE__ */ e(
            "span",
            {
              className: Rt.current,
              "data-rolling-text-part": "current",
              ref: k,
              children: /* @__PURE__ */ e(
                se,
                {
                  behavior: y ? "fade" : t,
                  marqueeActive: r,
                  children: p.text
                }
              )
            },
            p.revision
          )
        ]
      }
    );
  }
), us = "_root_zxm88_2", ps = "_segment_zxm88_3", fs = "_icon_zxm88_4", bs = "_label_zxm88_5", lt = {
  root: us,
  segment: ps,
  icon: fs,
  label: bs
};
function wn(a) {
  return a.find((t) => !t.disabled)?.value ?? "";
}
function ms(a, t) {
  const n = a.find((o) => o.value === t);
  return n && !n.disabled ? n.value : wn(a);
}
const yl = I(
  function({
    className: t,
    defaultValue: n,
    interaction: o = "radio",
    labelBehavior: r = "overflow",
    disabled: i = !1,
    distribution: l = "content",
    onValueChange: u,
    options: f,
    size: p = "sm",
    tone: h = "accent",
    value: y,
    variant: w = "bar",
    ...v
  }, k) {
    const T = M([]), [_, s] = oe(
      () => n ?? wn(f)
    ), x = ms(f, y ?? _);
    function d(m) {
      i || m.disabled || o === "radio" && m.value === x || (y === void 0 && s(m.value), u?.(m.value));
    }
    function N(m, S) {
      const A = f.map((B, F) => ({ index: F, option: B })).filter(({ option: B }) => !B.disabled);
      if (A.length === 0)
        return;
      const O = A.findIndex(
        ({ index: B }) => B === S
      ), X = m.currentTarget.ownerDocument.defaultView?.getComputedStyle(m.currentTarget).direction === "rtl";
      let P;
      if (m.key === "ArrowRight" || m.key === "ArrowLeft" || m.key === "ArrowDown" || m.key === "ArrowUp") {
        const F = m.key === "ArrowDown" || (m.key === "ArrowRight" ? !X : m.key === "ArrowLeft" && X) ? 1 : -1, J = (O + F + A.length) % A.length;
        P = A[J];
      } else if (m.key === "Home")
        P = A[0];
      else if (m.key === "End")
        P = A[A.length - 1];
      else
        return;
      P && (m.preventDefault(), d(P.option), T.current[P.index]?.focus());
    }
    return /* @__PURE__ */ e(
      "div",
      {
        ...v,
        "aria-disabled": i || void 0,
        className: $(lt.root, t),
        "data-openbitfun-component": "segmented-control",
        "data-openbitfun-part": "root",
        "data-disabled": i ? "true" : "false",
        "data-distribution": l,
        "data-size": p,
        "data-tone": h,
        "data-variant": w,
        ref: k,
        role: o === "radio" ? "radiogroup" : "group",
        "data-interaction": o,
        children: f.map((m, S) => {
          const A = m.value === x;
          return /* @__PURE__ */ b(
            "button",
            {
              "data-overflow-trigger": !0,
              "aria-checked": o === "radio" ? A : void 0,
              "aria-pressed": o === "buttons" ? A : void 0,
              className: lt.segment,
              "data-openbitfun-part": "segment",
              "data-openbitfun-value": m.value,
              disabled: i || m.disabled,
              onClick: () => d(m),
              onKeyDown: o === "radio" ? (O) => N(O, S) : void 0,
              ref: (O) => {
                T.current[S] = O;
              },
              role: o === "radio" ? "radio" : void 0,
              tabIndex: o === "buttons" || A ? 0 : -1,
              type: "button",
              children: [
                m.icon && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: lt.icon, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "icon", children: m.icon }),
                r === "static" ? /* @__PURE__ */ e("span", { className: lt.label, "data-openbitfun-part": "label", children: m.label }) : /* @__PURE__ */ e(se, { className: lt.label, "data-openbitfun-part": "label", children: m.label })
              ]
            },
            m.value
          );
        })
      }
    );
  }
), _s = "_root_1i61z_2", gs = "_native_1i61z_3", hs = "_trigger_1i61z_4", vs = "_leading_1i61z_5", ys = "_value_1i61z_6", Ns = "_placeholder_1i61z_7", ws = "_indicator_1i61z_8", xs = "_popover_1i61z_9", $s = "_popoverHeader_1i61z_10", Cs = "_divider_1i61z_11", ks = "_options_1i61z_12", As = "_listbox_1i61z_242", ke = {
  root: _s,
  native: gs,
  trigger: hs,
  leading: vs,
  value: ys,
  placeholder: Ns,
  indicator: ws,
  popover: xs,
  popoverHeader: $s,
  divider: Cs,
  options: ks,
  listbox: As
}, zs = typeof window > "u" ? _e : Fe;
function Is(a, t) {
  typeof a == "function" ? a(t) : a && (a.current = t);
}
function Ss(a) {
  return a === void 0 ? "" : String(a);
}
function at(a, t) {
  return a === void 0 || t === void 0 ? a === t : String(a) === String(t);
}
function Et(a, t, n) {
  return t !== void 0 ? t : n === void 0 ? a[0]?.value : void 0;
}
function Ls(a) {
  const t = /* @__PURE__ */ new Map(), n = [];
  for (const o of a) {
    if (!o.group) {
      n.push(o);
      continue;
    }
    const r = t.get(o.group) ?? [];
    r.push(o), t.set(o.group, r);
  }
  return { groups: t, ungrouped: n };
}
function an(a) {
  return /* @__PURE__ */ e(
    "option",
    {
      "data-testid": a.testId,
      disabled: a.disabled,
      value: String(a.value),
      ...a.testAttributes,
      children: a.label
    },
    `${typeof a.value}:${a.value}`
  );
}
const Nl = I(function({
  "aria-describedby": t,
  "aria-invalid": n,
  "aria-label": o,
  "aria-labelledby": r,
  "aria-required": i,
  autoFocus: l = !1,
  className: u,
  defaultOpen: f = !1,
  defaultValue: p,
  disabled: h = !1,
  id: y,
  invalid: w = !1,
  leading: v,
  onBlur: k,
  onFocus: T,
  onOpenChange: _,
  onValueChange: s,
  open: x,
  options: d,
  placement: N = "bottom",
  placeholder: m,
  popupWidth: S = "trigger",
  required: A = !1,
  size: O = "md",
  style: X,
  tabIndex: P,
  title: B,
  value: F,
  width: J = "full",
  ...K
}, V) {
  const ge = Ot(), re = wt(), U = ft({
    "aria-label": o,
    "aria-labelledby": r,
    "aria-describedby": t
  }), ie = Be(), Q = y ?? `openbitfun-select-${ie}`, ae = `${Q}-listbox`, Z = `${Q}-native`, E = M(null), z = M(null), G = M(null), me = M(null), te = M(!1), $e = De(() => [E], []), [L, j] = oe(f && !h), [pe, fe] = oe(() => Et(d, p, m)), R = !h && (x ?? L), ce = F !== void 0 ? F : pe, de = w || n === !0 || n === "true", he = d.find((g) => at(g.value, ce)), { groups: bt, ungrouped: mt } = De(() => Ls(d), [d]), Ve = K["data-openbitfun-preview-state"], We = Y((g) => {
    G.current = g, Is(V, g);
  }, [V]), Re = Y((g) => {
    g !== R && (x === void 0 && j(g), _?.(g));
  }, [_, x, R]), Ee = Y((g) => {
    g && (te.current = !0), Re(!1);
  }, [Re]);
  zs(() => {
    R || !te.current || (te.current = !1, z.current?.isConnected && z.current.focus());
  }, [R]);
  const Oe = Y((g, D) => {
    h || g.disabled || (at(g.value, ce) || (F === void 0 && fe(g.value), s?.(g.value)), Ee(D));
  }, [Ee, h, s, ce, F]), $t = (g) => {
    const D = d.find((q) => String(q.value) === g.currentTarget.value);
    D && Oe(D, !1);
  }, W = (g) => {
    T?.(g), g.defaultPrevented || z.current?.focus();
  }, ne = (g) => {
    if (!h) {
      if (g.key === "ArrowDown" || g.key === "ArrowUp") {
        if (g.preventDefault(), R) {
          const D = Array.from(
            me.current?.querySelectorAll(
              "[data-openbitfun-listbox-option]:not(:disabled)"
            ) ?? []
          ), q = D.findIndex((ve) => ve.getAttribute("aria-selected") === "true"), Ie = g.key === "ArrowUp" ? D.length - 1 : 0;
          D[q >= 0 ? q : Ie]?.focus();
          return;
        }
        Re(!0);
        return;
      }
      if (g.key === "Enter" || g.key === " ") {
        g.preventDefault(), R ? Ee(!0) : Re(!0);
        return;
      }
      if (!R && (g.key === "Home" || g.key === "End")) {
        const D = d.filter((Ie) => !Ie.disabled), q = g.key === "Home" ? D[0] : D[D.length - 1];
        q && (g.preventDefault(), Oe(q, !1));
        return;
      }
      if (!R && g.key.length === 1 && !g.altKey && !g.ctrlKey && !g.metaKey) {
        const D = d.filter((ve) => !ve.disabled), q = D.findIndex((ve) => at(ve.value, ce)), Ie = g.key.toLocaleLowerCase();
        for (let ve = 1; ve <= D.length; ve += 1) {
          const je = D[(q + ve) % D.length];
          if (je?.label.trim().toLocaleLowerCase().startsWith(Ie)) {
            g.preventDefault(), Oe(je, !1);
            break;
          }
        }
      }
    }
  }, tt = (g) => {
    if (g.key === "Tab") {
      Ee(!0);
      return;
    }
    if (g.key !== "Enter" && g.key !== " ") return;
    const D = g.target instanceof Element ? g.target.closest("[data-openbitfun-listbox-option]") : null;
    !D || D.disabled || (g.preventDefault(), D.click());
  };
  sn({
    branchRefs: $e,
    enabled: R,
    layerRef: me,
    onDismiss: (g) => Ee(g === "escape-key"),
    ownerDocument: z.current?.ownerDocument
  });
  const rt = cn({
    anchorRef: z,
    layerRef: me,
    matchWidth: S === "trigger",
    open: R,
    overlapAnchor: !0,
    placement: N,
    revision: d.length
  });
  _e(() => {
    if (F !== void 0 || d.some((D) => at(D.value, pe))) return;
    const g = Et(d, p, m);
    at(g, pe) || fe(g);
  }, [p, d, m, pe, F]), _e(() => {
    const D = G.current?.form;
    if (!D || F !== void 0) return;
    const q = () => {
      fe(Et(d, p, m)), Re(!1);
    };
    return D.addEventListener("reset", q), () => D.removeEventListener("reset", q);
  }, [p, d, m, Re, F]);
  const Ye = (g) => {
    const D = /* @__PURE__ */ mn(
      Nt,
      {
        ...g.testAttributes,
        "aria-label": g.label,
        "data-testid": g.testId,
        disabled: g.disabled,
        key: `${typeof g.value}:${g.value}`,
        onClick: () => Oe(g, !0),
        selected: at(g.value, ce),
        value: g.value
      },
      g.label
    );
    return g.tooltip ? /* @__PURE__ */ e(Ue, { content: g.tooltip, placement: "right", children: D }, `${typeof g.value}:${g.value}`) : D;
  }, ze = () => /* @__PURE__ */ b(ot, { children: [
    v != null && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: ke.leading, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "leading", children: v }),
    /* @__PURE__ */ e(
      se,
      {
        className: he ? ke.value : ke.placeholder,
        "data-openbitfun-part": "value",
        title: he?.tooltip,
        children: he?.label ?? m
      }
    ),
    /* @__PURE__ */ e("span", { "aria-hidden": "true", className: ke.indicator, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "indicator", children: /* @__PURE__ */ e(be, { name: "chevron-down", size: "sm" }) })
  ] }), Ce = R ? /* @__PURE__ */ b(
    "div",
    {
      className: ke.popover,
      "data-openbitfun-component": "select-popup",
      "data-openbitfun-part": "popover",
      "data-openbitfun-native-webview-occlusion": !0,
      "data-invalid": de ? "true" : "false",
      "data-placement": rt?.placement ?? N,
      "data-size": O,
      "data-width": S,
      ref: me,
      style: rt?.style ?? { position: "fixed", visibility: "hidden" },
      children: [
        /* @__PURE__ */ e(
          "button",
          {
            "data-overflow-trigger": !0,
            "aria-controls": ae,
            "aria-describedby": U["aria-describedby"],
            "aria-expanded": "true",
            "aria-haspopup": "listbox",
            "aria-invalid": w ? !0 : n,
            "aria-label": o,
            "aria-labelledby": U["aria-labelledby"],
            "aria-required": A || i || void 0,
            className: $(ke.trigger, ke.popoverHeader),
            "data-openbitfun-part": "header",
            "data-openbitfun-preview-state": typeof Ve == "string" ? Ve : void 0,
            id: Q,
            onClick: () => Ee(!0),
            onKeyDown: ne,
            role: "combobox",
            title: B,
            type: "button",
            children: ze()
          }
        ),
        /* @__PURE__ */ e("div", { "aria-hidden": "true", className: ke.divider, "data-openbitfun-part": "divider" }),
        /* @__PURE__ */ e("div", { className: ke.options, "data-openbitfun-part": "options", children: /* @__PURE__ */ e(
          vn,
          {
            "aria-label": o,
            "aria-labelledby": o ? void 0 : U["aria-labelledby"] ?? Q,
            autoFocusOption: !0,
            className: ke.listbox,
            id: ae,
            onKeyDown: tt,
            children: d.length === 0 ? /* @__PURE__ */ e(Pt, { children: ge.messages.noOptions }) : /* @__PURE__ */ b(ot, { children: [
              mt.map(Ye),
              [...bt].map(([g, D]) => /* @__PURE__ */ e(yn, { label: g, children: D.map(Ye) }, g))
            ] })
          }
        ) })
      ]
    }
  ) : null;
  return /* @__PURE__ */ b(
    "span",
    {
      className: $(ke.root, u),
      "data-openbitfun-component": "select",
      "data-disabled": h ? "true" : "false",
      "data-field-surface": re,
      "data-has-leading": v != null ? "true" : "false",
      "data-invalid": de ? "true" : "false",
      "data-open": R ? "true" : "false",
      "data-placement": rt?.placement ?? N,
      "data-size": O,
      "data-width": J,
      ref: E,
      children: [
        /* @__PURE__ */ b(
          "select",
          {
            ...K,
            "aria-describedby": U["aria-describedby"],
            "aria-hidden": "true",
            "aria-invalid": w ? !0 : n,
            "aria-label": o,
            "aria-labelledby": U["aria-labelledby"],
            "aria-required": A || i || void 0,
            className: ke.native,
            disabled: h,
            id: Z,
            onBlur: k,
            onChange: $t,
            onFocus: W,
            ref: We,
            required: A,
            tabIndex: -1,
            value: Ss(ce),
            children: [
              m !== void 0 && /* @__PURE__ */ e("option", { disabled: !0, value: "", children: m }),
              mt.map(an),
              [...bt].map(([g, D]) => /* @__PURE__ */ e("optgroup", { label: g, children: D.map(an) }, g))
            ]
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            "data-overflow-trigger": !0,
            "aria-controls": R ? void 0 : ae,
            "aria-describedby": U["aria-describedby"],
            "aria-expanded": R ? void 0 : !1,
            "aria-hidden": R || void 0,
            "aria-haspopup": "listbox",
            "aria-invalid": w ? !0 : n,
            "aria-label": o,
            "aria-labelledby": U["aria-labelledby"],
            "aria-required": A || i || void 0,
            autoFocus: !R && l,
            className: ke.trigger,
            "data-openbitfun-part": "trigger",
            "data-openbitfun-preview-state": typeof Ve == "string" ? Ve : void 0,
            disabled: h,
            id: R ? void 0 : Q,
            onClick: () => Re(!0),
            onKeyDown: ne,
            ref: z,
            role: R ? void 0 : "combobox",
            style: X,
            tabIndex: R ? -1 : P,
            title: B,
            type: "button",
            children: ze()
          }
        ),
        Ce && /* @__PURE__ */ e(ln, { ownerDocument: z.current?.ownerDocument, ownerRef: z, open: R, children: Ce })
      ]
    }
  );
}), Ts = "_input_1akar_11", Ds = "_track_1akar_22", Rs = "_thumb_1akar_34", vt = {
  switch: "_switch_1akar_2",
  input: Ts,
  track: Ds,
  thumb: Rs
}, wl = I(function({
  className: t,
  onChange: n,
  onCheckedChange: o,
  ...r
}, i) {
  const l = ft(r), u = (f) => {
    n?.(f), o?.(f.currentTarget.checked);
  };
  return /* @__PURE__ */ b(
    "span",
    {
      className: $(vt.switch, t),
      "data-openbitfun-component": "switch",
      children: [
        /* @__PURE__ */ e(
          "input",
          {
            ...r,
            ...l,
            className: vt.input,
            onChange: u,
            ref: i,
            role: "switch",
            type: "checkbox"
          }
        ),
        /* @__PURE__ */ e("span", { "aria-hidden": "true", className: vt.track, children: /* @__PURE__ */ e("span", { className: vt.thumb }) })
      ]
    }
  );
}), Es = "_root_z7sr2_2", Ps = "_label_z7sr2_4", Ms = "_required_z7sr2_5", Os = "_error_z7sr2_6", Fs = "_textarea_z7sr2_7", Bs = "_hint_z7sr2_37", Vs = "_count_z7sr2_37", js = "_support_z7sr2_38", Ke = {
  root: Es,
  label: Ps,
  required: Ms,
  error: Os,
  textarea: Fs,
  hint: Bs,
  count: Vs,
  support: js
}, qs = typeof window > "u" ? _e : Fe, xl = I(function({
  "aria-describedby": t,
  "aria-invalid": n,
  autoResize: o = !1,
  className: r,
  errorMessage: i,
  font: l = "sans",
  hint: u,
  id: f,
  invalid: p = !1,
  label: h,
  layout: y = "auto",
  maxLength: w,
  onChange: v,
  onCompositionEnd: k,
  onCompositionStart: T,
  onKeyDown: _,
  onValueChange: s,
  required: x,
  resize: d = "vertical",
  showCount: N = !1,
  value: m,
  variant: S = "default",
  ...A
}, O) {
  const X = Be(), P = wt(), B = f ?? `${X}-textarea`, F = `${X}-support`, J = M(!1), K = M(null), [V, ge] = oe(() => String(A.defaultValue ?? "").length), re = m === void 0 ? V : String(m).length, U = p || n !== void 0 && n !== !1 && n !== "false", ie = !!(U && i || !U && u || N), Q = ft({
    ...A,
    "aria-describedby": [t, ie ? F : void 0].filter(Boolean).join(" ")
  }, !!h), ae = Y((E) => {
    o && (E.style.height = "auto", E.style.height = `${E.scrollHeight}px`);
  }, [o]);
  _n(O, () => K.current), qs(() => {
    K.current && ae(K.current);
  }, [ae, m]);
  const Z = (E) => {
    ge(E.currentTarget.value.length), ae(E.currentTarget), v?.(E), s?.(E.currentTarget.value);
  };
  return /* @__PURE__ */ b(
    "span",
    {
      className: $(Ke.root, r),
      "data-auto-resize": o ? "true" : "false",
      "data-openbitfun-component": "textarea",
      "data-field-surface": P,
      "data-font": l,
      "data-invalid": U ? "true" : "false",
      "data-layout": y,
      "data-resize": d,
      "data-variant": S,
      children: [
        h && /* @__PURE__ */ b("label", { className: Ke.label, "data-openbitfun-part": "label", htmlFor: B, children: [
          h,
          x && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: Ke.required, "data-openbitfun-part": "required", children: "*" })
        ] }),
        /* @__PURE__ */ e(
          "textarea",
          {
            ...A,
            ...Q,
            "aria-invalid": U || void 0,
            className: Ke.textarea,
            "data-openbitfun-part": "input",
            id: B,
            maxLength: w,
            onChange: Z,
            onCompositionEnd: (E) => {
              J.current = !1, k?.(E);
            },
            onCompositionStart: (E) => {
              J.current = !0, T?.(E);
            },
            onKeyDown: (E) => {
              if ((E.key === "Enter" || E.key === "Escape") && dn(E, J.current)) {
                E.stopPropagation();
                return;
              }
              _?.(E);
            },
            ref: K,
            required: x,
            value: m
          }
        ),
        ie && /* @__PURE__ */ b("span", { className: Ke.support, "data-openbitfun-part": "support", id: F, children: [
          /* @__PURE__ */ e("span", { className: U ? Ke.error : Ke.hint, "data-openbitfun-part": "message", children: U ? i : u }),
          N && /* @__PURE__ */ b("span", { className: Ke.count, "data-openbitfun-part": "count", children: [
            re,
            w ? ` / ${w}` : ""
          ] })
        ] })
      ]
    }
  );
}), Hs = "_root_1rc1x_2", Ks = "_media_1rc1x_14", Gs = "_title_1rc1x_49", Us = "_description_1rc1x_58", Ws = "_actions_1rc1x_68", dt = {
  root: Hs,
  media: Ks,
  title: Gs,
  description: Us,
  actions: Ws
}, $l = I(function({
  actions: t,
  children: n,
  className: o,
  description: r,
  icon: i,
  image: l,
  imageSize: u = "md",
  style: f,
  title: p,
  ...h
}, y) {
  const w = i ?? l ?? /* @__PURE__ */ e(be, { name: "folder" }), v = t ?? n;
  return /* @__PURE__ */ b(
    "div",
    {
      ...h,
      className: $(dt.root, o),
      "data-openbitfun-component": "empty",
      ref: y,
      style: f,
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: dt.media,
            "data-openbitfun-icon-slot": "true",
            "data-openbitfun-part": "media",
            "data-size": u,
            children: w
          }
        ),
        p != null && /* @__PURE__ */ e("div", { className: dt.title, "data-openbitfun-part": "title", children: p }),
        r != null && /* @__PURE__ */ e("div", { className: dt.description, "data-openbitfun-part": "description", children: r }),
        v != null && /* @__PURE__ */ e("div", { className: dt.actions, "data-openbitfun-part": "actions", children: v })
      ]
    }
  );
}), Ys = "_tabGroup_1frp7_2", Xs = "_item_1frp7_29", Qs = "_tab_1frp7_2", Js = "_icon_1frp7_109", Zs = "_label_1frp7_109", ec = "_labelSuffix_1frp7_109", tc = "_endAction_1frp7_123", Ge = {
  tabGroup: Ys,
  item: Xs,
  tab: Qs,
  icon: Js,
  label: Zs,
  labelSuffix: ec,
  endAction: tc
};
function xn(a) {
  return a.find((t) => !t.disabled)?.value ?? "";
}
function nc(a, t) {
  const n = a.find((o) => o.value === t);
  return n && !n.disabled ? n.value : xn(a);
}
const Cl = I(function({
  className: t,
  defaultValue: n,
  items: o,
  onValueChange: r,
  renderItem: i,
  size: l = "md",
  value: u,
  ...f
}, p) {
  const h = Be(), y = M([]), [w, v] = oe(
    () => n ?? xn(o)
  ), k = nc(o, u ?? w);
  function T(s) {
    s.disabled || s.value === k || (u === void 0 && v(s.value), r?.(s.value));
  }
  function _(s, x) {
    const d = o.map((A, O) => ({ index: O, item: A })).filter(({ item: A }) => !A.disabled);
    if (d.length === 0)
      return;
    const N = d.findIndex(({ index: A }) => A === x), m = s.currentTarget.ownerDocument.defaultView?.getComputedStyle(s.currentTarget).direction === "rtl";
    let S;
    if (s.key === "ArrowRight" || s.key === "ArrowLeft") {
      const O = (s.key === "ArrowRight" ? !m : m) ? 1 : -1, X = (N + O + d.length) % d.length;
      S = d[X];
    } else if (s.key === "Home")
      S = d[0];
    else if (s.key === "End")
      S = d[d.length - 1];
    else
      return;
    S && (s.preventDefault(), T(S.item), y.current[S.index]?.focus());
  }
  return /* @__PURE__ */ e(
    "div",
    {
      ...f,
      "aria-orientation": "horizontal",
      className: $(Ge.tabGroup, t),
      "data-openbitfun-component": "tab-group",
      "data-openbitfun-part": "root",
      "data-size": l,
      ref: p,
      role: "tablist",
      children: o.map((s, x) => {
        const d = s.value === k, N = s.endAction !== void 0 && s.endAction !== null, m = !!s.icon, S = /* @__PURE__ */ b(
          "div",
          {
            className: $(xt.host, Ge.item),
            "data-openbitfun-part": "item",
            "data-overflow-trigger": !0,
            "data-has-end-action": N ? "true" : "false",
            "data-has-icon": m ? "true" : "false",
            children: [
              /* @__PURE__ */ b(
                "button",
                {
                  ...s.tabProps,
                  "aria-controls": s.panelId,
                  "aria-disabled": s.disabled || void 0,
                  "aria-selected": d,
                  className: $(Ge.tab, s.tabProps?.className),
                  "data-openbitfun-part": "tab",
                  "data-openbitfun-value": s.value,
                  disabled: s.disabled,
                  id: s.id ?? `${h}-tab-${x}`,
                  onClick: () => T(s),
                  onKeyDown: (A) => _(A, x),
                  ref: (A) => {
                    y.current[x] = A;
                  },
                  role: "tab",
                  tabIndex: d ? 0 : -1,
                  type: "button",
                  children: [
                    m && /* @__PURE__ */ e("span", { "aria-hidden": "true", className: Ge.icon, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "icon", children: s.icon }),
                    s.labelTransitionKey !== void 0 && (typeof s.label == "string" || typeof s.label == "number") ? /* @__PURE__ */ e(
                      ds,
                      {
                        className: Ge.label,
                        "data-openbitfun-part": "label",
                        transitionKey: s.labelTransitionKey,
                        children: s.label
                      }
                    ) : /* @__PURE__ */ e(se, { behavior: "marquee", className: Ge.label, "data-openbitfun-part": "label", children: s.label }),
                    s.labelSuffix != null && /* @__PURE__ */ e("span", { className: Ge.labelSuffix, "data-openbitfun-part": "labelSuffix", children: s.labelSuffix })
                  ]
                }
              ),
              N && /* @__PURE__ */ e(Vt, { className: Ge.endAction, "data-openbitfun-part": "endAction", children: s.endAction })
            ]
          },
          s.value
        );
        return /* @__PURE__ */ e(na, { children: i ? i(s, S, x) : S }, s.value);
      })
    }
  );
}), ac = "_root_ueinv_2", oc = "_leading_ueinv_3", rc = "_center_ueinv_4", ic = "_trailing_ueinv_5", sc = "_group_ueinv_6", cc = "_separator_ueinv_7", lc = "_badge_ueinv_121", et = {
  root: ac,
  leading: oc,
  center: rc,
  trailing: ic,
  group: sc,
  separator: cc,
  badge: lc
}, kl = I(function({
  bordered: t = !0,
  center: n,
  className: o,
  leading: r,
  leadingOverflow: i = "visible",
  size: l = "sm",
  trailing: u,
  ...f
}, p) {
  const h = n != null;
  return /* @__PURE__ */ b(
    "div",
    {
      ...f,
      className: $(et.root, o),
      "data-openbitfun-component": "toolbar",
      "data-bordered": t ? "true" : "false",
      "data-has-center": h ? "true" : "false",
      "data-size": l,
      ref: p,
      children: [
        r != null && /* @__PURE__ */ e(
          "div",
          {
            className: et.leading,
            "data-openbitfun-part": "leading",
            "data-overflow": i,
            children: r
          }
        ),
        h && /* @__PURE__ */ e("div", { className: et.center, "data-openbitfun-part": "center", children: n }),
        u != null && /* @__PURE__ */ e("div", { className: et.trailing, "data-openbitfun-part": "trailing", children: u })
      ]
    }
  );
}), Al = I(
  function({ children: t, className: n, gap: o = "sm", ...r }, i) {
    return /* @__PURE__ */ e(
      "div",
      {
        ...r,
        className: $(et.group, n),
        "data-openbitfun-part": "group",
        "data-gap": o,
        ref: i,
        children: t
      }
    );
  }
), zl = I(
  function({ children: t, className: n, ...o }, r) {
    return /* @__PURE__ */ e(xi, { ...o, className: $(et.badge, n), "data-openbitfun-part": "badge", ref: r, value: t });
  }
), Il = I(
  function({ className: t, ...n }, o) {
    return /* @__PURE__ */ e(
      "span",
      {
        ...n,
        "aria-hidden": "true",
        className: $(et.separator, t),
        "data-openbitfun-part": "separator",
        ref: o
      }
    );
  }
), Sl = I(function({
  height: t,
  size: n = 24,
  width: o,
  style: r,
  ...i
}, l) {
  return /* @__PURE__ */ e(
    Zn,
    {
      ...i,
      ref: l,
      width: o ?? n,
      height: t ?? n,
      strokeWidth: "var(--openbitfun-control-icon-stroke-width)",
      style: { opacity: "var(--openbitfun-opacity-icon-artwork)", ...r }
    }
  );
}), dc = "_stack_1rzex_2", uc = {
  stack: dc
}, pc = {
  0: "var(--openbitfun-space-0)",
  1: "var(--openbitfun-space-1)",
  2: "var(--openbitfun-space-2)",
  3: "var(--openbitfun-space-3)",
  4: "var(--openbitfun-space-4)",
  5: "var(--openbitfun-space-5)",
  6: "var(--openbitfun-space-6)",
  8: "var(--openbitfun-space-8)",
  10: "var(--openbitfun-space-10)",
  12: "var(--openbitfun-space-12)"
};
function Ll({
  align: a = "stretch",
  className: t,
  direction: n = "vertical",
  gap: o = "3",
  justify: r = "start",
  style: i,
  wrap: l = !1,
  ...u
}) {
  const f = {
    ...i,
    "--_stack-gap": pc[o]
  };
  return /* @__PURE__ */ e(
    "div",
    {
      ...u,
      className: $(uc.stack, t),
      "data-align": a,
      "data-direction": n,
      "data-justify": r,
      "data-wrap": l ? "true" : "false",
      style: f
    }
  );
}
const fc = "_root_16c43_2", bc = {
  root: fc
};
function Tl({
  children: a,
  className: t,
  colorScheme: n = "light",
  contrast: o = "standard",
  density: r = "comfortable",
  style: i,
  tokenOverrides: l,
  ...u
}) {
  const f = {
    ...i,
    ...l
  };
  return /* @__PURE__ */ e(
    "div",
    {
      ...u,
      className: $(bc.root, t),
      "data-openbitfun-design-system-root": "",
      "data-color-scheme": n,
      "data-contrast": o,
      "data-density": r,
      style: f,
      children: a
    }
  );
}
const mc = "_root_67czt_2", _c = "_primary_67czt_27", gc = "_primaryDock_67czt_29", hc = "_surface_67czt_39", vc = "_secondary_67czt_48", yc = "_divider_67czt_59", Nc = "_header_67czt_77", wc = "_headerColumns_67czt_77", xc = "_pane_67czt_97", $c = "_resizeHandle_67czt_119", Cc = "_actions_67czt_146", Ne = {
  root: mc,
  primary: _c,
  primaryDock: gc,
  surface: hc,
  secondary: vc,
  divider: yc,
  header: Nc,
  headerColumns: wc,
  pane: xc,
  resizeHandle: $c,
  actions: Cc
}, $n = pn("split");
function Dl({ pane: a, active: t = !0, className: n, children: o, ...r }) {
  const i = Ft($n), l = i !== "split" && i !== a;
  return /* @__PURE__ */ e(
    "div",
    {
      ...r,
      tabIndex: -1,
      className: $(Ne.pane, Ne[a], Ne.surface, n),
      hidden: l,
      "aria-hidden": l || !t,
      ...ea(!!(l || !t)),
      "data-split-surface": a,
      "data-split-active": !l && t,
      children: o
    }
  );
}
function Rl({ className: a, children: t, ...n }) {
  return /* @__PURE__ */ e(
    "div",
    {
      ...n,
      className: $(Ne.primaryDock, a),
      "data-openbitfun-component": "split-view",
      "data-openbitfun-part": "primaryDock",
      children: t
    }
  );
}
function kc(a, t, n, o, r) {
  const i = Math.max(0, a - t), l = Math.max(0, Math.min(r, i - Math.min(n, i / 2)));
  return { min: Math.min(o, l), max: l };
}
function El({
  primary: a,
  secondary: t,
  surfaces: n,
  header: o,
  mode: r = "split",
  layout: i = "split",
  secondarySide: l = "right",
  rightSize: u,
  minLeftSize: f = 0,
  minRightSize: p = 0,
  maxRightSize: h = Number.MAX_SAFE_INTEGER,
  defaultRightSize: y = u,
  onRightSizeChange: w,
  onResizeStateChange: v,
  dividerLabel: k,
  dividerActions: T,
  primaryPaneProps: _,
  secondaryPaneProps: s,
  className: x,
  style: d,
  onKeyDown: N,
  ...m
}) {
  const S = M(null), A = M(null), O = M(null), X = M(null), P = Be(), B = _?.id ?? `${P}-primary`, F = s?.id ?? `${P}-secondary`, [J, K] = oe(null), [V, ge] = oe(0), [re, U] = oe(!1), ie = M(null), Q = M(null), ae = M({ onRightSizeChange: w, onResizeStateChange: v });
  ae.current = { onRightSizeChange: w, onResizeStateChange: v };
  const Z = J === null ? { min: p, max: h } : kc(J, V, f, p, h), E = M(Z);
  E.current = Z;
  const z = i === "overlay" && l === "left" ? -1 : 1, G = Math.min(Z.max, Math.max(Z.min, u)), me = M(G);
  me.current = G, Fe(() => {
    const L = S.current;
    if (!L) return;
    const j = () => {
      const fe = L.getBoundingClientRect().width;
      fe > 0 && K((ce) => ce === fe ? ce : fe);
      const R = A.current?.getBoundingClientRect().width ?? 0;
      R > 0 && ge(R);
    };
    j();
    const pe = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(j);
    return pe?.observe(L), window.addEventListener("resize", j), () => {
      pe?.disconnect(), window.removeEventListener("resize", j);
    };
  }, [r, i]), Fe(() => {
    Q.current && (Q.current.painted = G);
  }, [G]);
  const te = Y((L) => {
    const j = Q.current;
    j && (Q.current = null, ie.current !== null && cancelAnimationFrame(ie.current), ie.current = null, document.body.style.cursor = j.cursor, document.body.style.userSelect = j.userSelect, j.target.hasPointerCapture?.(j.pointerId) && j.target.releasePointerCapture(j.pointerId), S.current?.style.setProperty("--_split-view-right-size", `${me.current}px`), L && ae.current.onRightSizeChange(j.latest), U(!1), ae.current.onResizeStateChange?.(!1));
  }, []);
  Fe(() => {
    te(!1);
  }, [r, i, l, te]), _e(() => () => {
    te(!1);
  }, [te]), Fe(() => {
    const L = document.activeElement?.closest("[data-split-surface]"), j = r === "primary" ? X.current : r === "secondary" ? O.current : null;
    (L && S.current?.contains(L) && r !== "split" && L.getAttribute("data-split-surface") !== r || j?.contains(document.activeElement) || r !== "split" && A.current?.contains(document.activeElement)) && (S.current?.querySelector(`[data-split-surface="${r}"][data-split-active="true"]`) ?? (r === "primary" ? O : X).current)?.focus({ preventScroll: !0 });
  }, [r]);
  const $e = (L) => {
    const j = Q.current;
    if (!j || j.pointerId !== L.pointerId) return;
    const pe = E.current, fe = (j.x - L.clientX) * z;
    j.latest = Math.min(pe.max, Math.max(pe.min, j.size + fe)), ie.current === null && (ie.current = requestAnimationFrame(() => {
      ie.current = null;
      const R = Q.current;
      if (!R) return;
      const ce = E.current;
      R.latest = Math.min(ce.max, Math.max(ce.min, R.latest)), Math.round(R.latest) !== Math.round(R.painted) && (R.painted = R.latest, S.current?.style.setProperty("--_split-view-right-size", `${R.latest}px`));
    }));
  };
  return /* @__PURE__ */ e($n.Provider, { value: r, children: /* @__PURE__ */ b(
    "div",
    {
      ...m,
      ref: S,
      className: $(Ne.root, x),
      style: { ...d, "--_split-view-right-size": `${G}px` },
      "data-openbitfun-component": "split-view",
      "data-openbitfun-part": "root",
      "data-has-header": o ? !0 : void 0,
      "data-mode": r,
      "data-layout": i,
      "data-secondary-side": l,
      "data-resizing": re || void 0,
      onKeyDown: (L) => {
        if (N?.(L), L.defaultPrevented || L.key !== "F6" || L.altKey || L.ctrlKey || L.metaKey) return;
        const j = S.current?.querySelector('[data-split-surface="primary"][data-split-active="true"]') ?? O.current, pe = S.current?.querySelector('[data-split-surface="secondary"][data-split-active="true"]') ?? X.current, fe = r === "primary" ? [j] : r === "secondary" ? [pe] : l === "left" ? [pe, j] : [j, pe], R = fe.findIndex((de) => de?.contains(document.activeElement)), ce = R < 0 ? L.shiftKey ? fe.length - 1 : 0 : (R + (L.shiftKey ? -1 : 1) + fe.length) % fe.length;
        L.preventDefault(), L.stopPropagation(), fe[ce]?.focus({ preventScroll: !0 });
      },
      children: [
        o && /* @__PURE__ */ e("div", { className: Ne.header, children: typeof o == "function" ? o({ columnClassName: Ne.headerColumns }) : o }),
        /* @__PURE__ */ e(
          "div",
          {
            ..._,
            ref: O,
            id: B,
            tabIndex: -1,
            className: $(Ne.pane, Ne.primary, _?.className),
            "data-openbitfun-component": "split-view",
            "data-openbitfun-part": "primary",
            hidden: r === "secondary",
            children: a
          }
        ),
        /* @__PURE__ */ b("div", { ref: A, className: Ne.divider, "data-openbitfun-component": "split-view", "data-openbitfun-part": "divider", hidden: r !== "split", children: [
          /* @__PURE__ */ e(
            "div",
            {
              className: Ne.resizeHandle,
              role: "separator",
              tabIndex: r === "split" ? 0 : -1,
              "data-openbitfun-component": "split-view",
              "data-openbitfun-part": "resizeHandle",
              "aria-label": k,
              "aria-orientation": "vertical",
              "aria-controls": i === "overlay" || l === "right" ? F : B,
              "aria-valuemin": Math.round(Z.min),
              "aria-valuemax": Math.round(Z.max),
              "aria-valuenow": Math.round(G),
              onPointerDown: (L) => {
                L.button !== 0 || Q.current || (L.preventDefault(), L.currentTarget.focus({ preventScroll: !0 }), Q.current = {
                  pointerId: L.pointerId,
                  target: L.currentTarget,
                  x: L.clientX,
                  size: G,
                  latest: G,
                  painted: G,
                  cursor: document.body.style.cursor,
                  userSelect: document.body.style.userSelect
                }, L.currentTarget.setPointerCapture?.(L.pointerId), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", U(!0), ae.current.onResizeStateChange?.(!0));
              },
              onPointerMove: $e,
              onPointerUp: (L) => {
                Q.current?.pointerId === L.pointerId && ($e(L), te(!0));
              },
              onPointerCancel: () => te(!1),
              onLostPointerCapture: () => te(!1),
              onDoubleClick: () => w(Math.min(Z.max, Math.max(Z.min, y))),
              onKeyDown: (L) => {
                let j;
                if (L.key === "ArrowLeft" || L.key === "ArrowRight")
                  j = G + (L.key === "ArrowRight" ? -1 : 1) * z * (L.shiftKey ? 50 : 10);
                else if (L.key === "Escape" && Q.current) {
                  L.preventDefault(), L.stopPropagation(), te(!1);
                  return;
                } else if (L.key === "Home") j = Z.min;
                else if (L.key === "End") j = Z.max;
                else return;
                L.preventDefault(), L.stopPropagation(), w(Math.min(Z.max, Math.max(Z.min, j)));
              }
            }
          ),
          T && /* @__PURE__ */ e("div", { className: Ne.actions, "data-openbitfun-component": "split-view", "data-openbitfun-part": "actions", children: T })
        ] }),
        /* @__PURE__ */ e(
          "div",
          {
            ...s,
            ref: X,
            id: F,
            tabIndex: -1,
            className: $(Ne.pane, Ne.secondary, s?.className),
            "data-openbitfun-component": "split-view",
            "data-openbitfun-part": "secondary",
            hidden: r === "primary",
            children: t
          }
        ),
        n
      ]
    }
  ) });
}
export {
  Vc as ActionCard,
  Qn as ActionItem,
  jc as ActivityItem,
  Hc as Alert,
  xo as Avatar,
  Kc as AvatarGroup,
  yt as Button,
  ko as Capsule,
  Gc as Card,
  Wc as CardBody,
  Xc as CardFooter,
  Uc as CardHeader,
  Yc as CardMedia,
  qc as ChangeCount,
  Ol as Checkbox,
  tl as Combobox,
  Qc as Composer,
  Jc as ComposerContextBar,
  el as ComposerDivider,
  Zc as ComposerToolbar,
  al as ConfirmDialog,
  Fc as DesignSystemProvider,
  Bn as Dialog,
  Kn as DialogBody,
  Hn as DialogClose,
  Fl as DialogDescription,
  Gn as DialogFooter,
  Vn as DialogHeader,
  Bl as DialogHeaderActions,
  jn as DialogHeading,
  qn as DialogTitle,
  Vl as Disclosure,
  $l as Empty,
  ol as Field,
  Yn as FieldAccessibilityProvider,
  il as FieldGroup,
  sl as FieldRow,
  rl as FormSection,
  be as Icon,
  Se as IconButton,
  jl as Input,
  cl as KeyHint,
  ll as LauncherButton,
  ql as LayersPlusIcon,
  vn as Listbox,
  Pt as ListboxEmpty,
  yn as ListboxGroup,
  Nt as ListboxOption,
  Hl as LoadingState,
  Kl as Menu,
  Gl as MenuItem,
  Ul as MenuList,
  Wl as MenuPopover,
  Yl as MenuSection,
  Xl as MenuSeparator,
  nl as MultiSelect,
  ul as NavigationPanel,
  fl as NavigationPanelBody,
  bl as NavigationPanelContent,
  ml as NavigationPanelFooter,
  pl as NavigationPanelHeader,
  _l as NavigationPanelItem,
  gl as NavigationPanelSection,
  hl as NavigationPanelSeparator,
  xi as NumberBadge,
  dl as NumberInput,
  se as OverflowText,
  Ql as OverlayLayer,
  Jl as OverlayRegion,
  Hi as PageHeader,
  ln as Portal,
  Zl as Radio,
  ds as RollingText,
  Mt as ScrollArea,
  On as SearchField,
  yl as SegmentedControl,
  Nl as Select,
  Sl as SessionIcon,
  vl as SetupWizard,
  ed as Sheet,
  td as ShimmerText,
  nd as Spinner,
  El as SplitView,
  Rl as SplitViewPrimaryDock,
  Dl as SplitViewSurface,
  Ll as Stack,
  ad as StatusPill,
  wl as Switch,
  Cl as TabGroup,
  xl as Textarea,
  Tl as ThemeRoot,
  od as ThinkingIndicator,
  kl as Toolbar,
  zl as ToolbarBadge,
  Al as ToolbarGroup,
  Il as ToolbarSeparator,
  Ue as Tooltip,
  Aa as VoiceCallControls,
  za as VoiceCallHeader,
  Oc as VoiceCallIdentity,
  Mc as VoiceCallPanel,
  ka as VoiceCallTranscript,
  gn as VoiceParticleLogo,
  rd as canonicalIconNames,
  id as createOverlayPortal,
  sd as getOverlayHost,
  Dc as hasOverlayLayers,
  cd as iconAliases,
  ld as iconNames,
  dd as isPointInSubmenuBridge,
  ud as isPointerMovingTowardSubmenu,
  Bc as subscribeOverlayInteraction,
  sn as useDismissibleLayer,
  Ec as useHasModalOverlay,
  Rc as useHasOverlayLayers,
  Pc as useOverlayLayerActions,
  pd as usePresence,
  fd as useSubmenuIntent
};
//# sourceMappingURL=index.js.map
