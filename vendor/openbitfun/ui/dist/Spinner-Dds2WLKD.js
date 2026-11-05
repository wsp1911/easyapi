import { jsx as l, jsxs as V, Fragment as Le } from "react/jsx-runtime";
import { createContext as pe, useContext as Ce, useRef as A, useEffect as B, useLayoutEffect as ve, version as M2, Children as a2, useSyncExternalStore as x2, useState as oe, useId as be, useCallback as R, cloneElement as W2, forwardRef as z, createElement as n2, useImperativeHandle as K2, useMemo as G2, isValidElement as X2 } from "react";
import { c as O, s as Y2 } from "./brandPlayback-BX-xP4VC.js";
import { createPortal as N2 } from "react-dom";
const L2 = pe(!1), Q2 = pe(!1), Ue = /* @__PURE__ */ new WeakMap();
function J2(o) {
  let e = Ue.get(o);
  return e || (e = { count: 0, previous: o.getAttribute("data-openbitfun-tooltip-trigger") }, Ue.set(o, e), o.setAttribute("data-openbitfun-tooltip-trigger", "true")), e.count++, () => {
    --e.count > 0 || (Ue.delete(o), e.previous === null ? o.removeAttribute("data-openbitfun-tooltip-trigger") : o.setAttribute("data-openbitfun-tooltip-trigger", e.previous));
  };
}
function Ne(o, e = !1) {
  return e || o.isComposing === !0 || o.keyCode === 229 || o.nativeEvent?.isComposing === !0 || o.nativeEvent?.keyCode === 229;
}
const E2 = pe("default");
function et() {
  return Ce(E2);
}
const tt = {
  clearSelection: "Clear selection",
  confirmAction: "Confirm",
  confirmCancel: "Cancel",
  createValue: "Use custom value",
  dialogClose: "Close dialog",
  loading: "Loading",
  noOptions: "No options",
  searchOptions: "Search options",
  selectAll: "Select all",
  selectPlaceholder: "Select an option",
  toolCardOpenDetails: "Open details",
  toolCardExpandDetails: "Expand details",
  toolCardCollapseDetails: "Collapse details"
}, nt = {
  colorScheme: "light",
  contrast: "standard",
  density: "comfortable",
  locale: "en",
  messages: tt,
  tooltipDelay: 450
}, ot = pe(
  nt
), rt = pe(null), st = 'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
function Ze(o, e = !1) {
  return Array.from(o.querySelectorAll(st)).filter((t) => !t.closest('[inert],[hidden],[aria-hidden="true"]') && (!e || t.tabIndex >= 0));
}
class A2 {
  constructor(e) {
    this.ownerDocument = e;
  }
  layers = /* @__PURE__ */ new Map();
  dismissibles = /* @__PURE__ */ new Map();
  focusScopes = /* @__PURE__ */ new Map();
  interactions = /* @__PURE__ */ new Map();
  listeners = /* @__PURE__ */ new Set();
  hiddenElements = /* @__PURE__ */ new Map();
  version = 0;
  sequence = 0;
  listening = !1;
  redirectingFocus = !1;
  pointerGesture;
  pendingFocusRestores = [];
  // Tickets do not publish state. A committed opening retains its ticket
  // through strict effect replay, content updates and the exit animation.
  reserveSequence() {
    return ++this.sequence;
  }
  registerLayer(e) {
    return this.layers.set(e.id, e), this.changed(), () => {
      this.layers.get(e.id) === e && (this.layers.delete(e.id), this.changed());
    };
  }
  updateLayer(e, t) {
    const n = this.layers.get(e);
    !n || n.open === t.open && n.modal === t.modal && n.passive === t.passive || (!n.open && t.open && (n.sequence = this.reserveSequence(), n.activationFocus = this.ownerDocument?.activeElement), Object.assign(n, t), this.changed());
  }
  getLayerForElement(e) {
    if (e)
      return [...this.layers.values()].filter((t) => t.element.contains(e)).sort((t, n) => t.element.contains(n.element) ? 1 : n.element.contains(t.element) ? -1 : n.sequence - t.sequence)[0];
  }
  parentOf(e) {
    return e.parentId ??= this.getLayerForElement(e.ownerElement?.() ?? null)?.id, e.parentId;
  }
  isDescendant(e, t) {
    const n = /* @__PURE__ */ new Set();
    for (; e && !n.has(e); ) {
      if (e === t) return !0;
      n.add(e);
      const r = this.layers.get(e);
      e = r && this.parentOf(r);
    }
    return !1;
  }
  hasModal() {
    return !!this.topModal();
  }
  hasOpenAncestors(e) {
    const t = this.layers.get(e);
    return !t || this.ancestorsOpen(t);
  }
  canPresent(e) {
    const t = this.topModal();
    return !t || this.isDescendant(e, t.id);
  }
  register(e) {
    const t = Object.assign(e, { sequence: this.reserveSequence() });
    return this.dismissibles.set(e.id, t), this.changed(), () => {
      this.dismissibles.get(e.id) === t && (this.dismissibles.delete(e.id), this.changed());
    };
  }
  isTopLayer(e) {
    return this.topDismissible()?.id === e;
  }
  dismissTop(e) {
    const t = this.topDismissible(e);
    return t ? (t.onDismiss("programmatic"), !0) : !1;
  }
  dismissAll() {
    const e = this.orderedDismissibles();
    return e.reverse().forEach((t) => t.onDismiss("programmatic")), e.length > 0;
  }
  hasLayers(e) {
    const t = this.orderedDismissibles();
    return e ? t.some((n) => n.scope === e) : [...this.layers.values()].some((n) => (n.open || n.modal) && !n.passive && this.ancestorsOpen(n)) || t.length > 0;
  }
  registerFocusScope(e) {
    const t = this.getLayerForElement(e.element);
    return t?.modal && t.activationFocus !== void 0 && (e.previousFocus = t.activationFocus), this.focusScopes.set(e.id, e), e.autoFocus && this.topFocusScope()?.id === e.id && this.focusFirst(e), () => {
      const n = this.topFocusScope(!0)?.id === e.id, r = this.getLayerForElement(e.element);
      this.focusScopes.delete(e.id), !(!n || !e.restoreFocus) && (this.pendingFocusRestores.push({ scope: e, layer: r }), this.restoreFocus());
    };
  }
  restoreFocus() {
    for (let e = this.pendingFocusRestores.length - 1; e >= 0; e -= 1) {
      const t = this.pendingFocusRestores[e];
      if (!t) continue;
      const { scope: n, layer: r } = t;
      if (r?.modal && this.layers.has(r.id)) continue;
      const s = this.topFocusScope(), a = s && this.getLayerForElement(s.element);
      if (a && r && a.sequence > r.sequence) continue;
      const c = n.previousFocus;
      if (c?.isConnected && !c.closest('[inert],[hidden],[aria-hidden="true"]') && (!s?.trapFocus || this.inFocusDomain(c, s))) {
        this.pendingFocusRestores.splice(e, 1), c.focus({ preventScroll: !0 });
        return;
      }
      this.topModal() || (this.pendingFocusRestores.splice(e, 1), s && this.focusFirst(s));
    }
  }
  registerInteraction(e) {
    return this.interactions.set(e.id, e), this.changed(), () => {
      this.interactions.delete(e.id), this.changed();
    };
  }
  subscribe = (e) => (this.listeners.add(e), () => this.listeners.delete(e));
  getSnapshot = () => this.version;
  orderedLayers() {
    const e = (a, c = /* @__PURE__ */ new Set()) => {
      if (c.has(a.id)) return a.sequence;
      c.add(a.id);
      const u = this.parentOf(a), i = u && this.layers.get(u);
      return i ? Math.max(a.sequence, e(i, c)) : a.sequence;
    }, t = [...this.layers.values()].sort((a, c) => e(a) - e(c) || a.sequence - c.sequence), n = [], r = /* @__PURE__ */ new Set(), s = (a) => {
      if (r.has(a.id)) return;
      r.add(a.id);
      const c = this.parentOf(a), u = c && this.layers.get(c);
      u && s(u), n.push(a);
    };
    return t.forEach(s), n;
  }
  topModal() {
    return this.orderedLayers().reverse().find((e) => e.modal && this.ancestorsOpen(e));
  }
  ancestorsOpen(e) {
    let t = this.parentOf(e);
    const n = /* @__PURE__ */ new Set([e.id]);
    for (; t && !n.has(t); ) {
      n.add(t);
      const r = this.layers.get(t);
      if (!r?.open) return !1;
      t = this.parentOf(r);
    }
    return !t;
  }
  isAvailable(e) {
    if (!e.open || !this.ancestorsOpen(e)) return !1;
    const t = this.topModal();
    return !t || this.isDescendant(e.id, t.id);
  }
  orderedDismissibles() {
    const e = this.orderedLayers();
    return [...this.dismissibles.values()].filter((t) => {
      const n = t.element?.();
      if (t.element && !n?.isConnected) return !1;
      const r = this.getLayerForElement(n ?? null);
      return r ? this.isAvailable(r) : !this.topModal();
    }).sort((t, n) => {
      const r = this.getLayerForElement(t.element?.() ?? null), s = this.getLayerForElement(n.element?.() ?? null);
      return (r ? e.indexOf(r) : -1) - (s ? e.indexOf(s) : -1) || t.sequence - n.sequence;
    });
  }
  interactionTop(e) {
    return this.orderedLayers().reverse().find((t) => this.isAvailable(t) && (!t.passive || t.element.contains(e ?? this.ownerDocument?.activeElement ?? null)));
  }
  topDismissible(e, t = this.interactionTop()) {
    const n = this.orderedDismissibles().filter((a) => e ? a.scope === e : !t || this.getLayerForElement(a.element?.() ?? null) === t), r = n[n.length - 1];
    if (!r || e) return r;
    const s = this.getLayerForElement(r.element?.() ?? null);
    if (!(t && t !== s))
      return r;
  }
  topFocusScope(e = !1) {
    const t = this.orderedLayers(), n = [...this.focusScopes.values()].filter((r) => {
      const s = this.getLayerForElement(r.element);
      return s ? e || this.isAvailable(s) : !this.topModal();
    }).sort((r, s) => t.indexOf(this.getLayerForElement(r.element)) - t.indexOf(this.getLayerForElement(s.element)));
    return n[n.length - 1];
  }
  trappingScope() {
    const e = this.topModal();
    return [...this.focusScopes.values()].reverse().find((t) => {
      const n = this.getLayerForElement(t.element);
      return t.trapFocus && (n ? this.isAvailable(n) : !e) && (!e || n?.id === e.id);
    });
  }
  inFocusDomain(e, t) {
    if (t.element.contains(e)) return !0;
    const n = this.getLayerForElement(t.element), r = this.getLayerForElement(e);
    return !!(n && r && this.isAvailable(r) && this.isDescendant(r.id, n.id));
  }
  focusFirst(e) {
    (e.initialFocus ?? Ze(e.element)[0] ?? e.element).focus({ preventScroll: !0 });
  }
  routeInteraction(e, t, n = this.interactionTop(t.target)) {
    const r = this.orderedLayers(), s = [...this.interactions.values()].filter((c) => {
      if (c.type !== e) return !1;
      const u = this.getLayerForElement(c.element());
      return u ? this.isAvailable(u) && (!n || this.isDescendant(n.id, u.id)) : !n && !!c.element() && !this.hasModal();
    }).sort((c, u) => r.indexOf(this.getLayerForElement(c.element())) - r.indexOf(this.getLayerForElement(u.element()))), a = this.getLayerForElement(s[s.length - 1]?.element() ?? null);
    for (const c of s) {
      if (t.defaultPrevented) break;
      this.getLayerForElement(c.element()) === a && c.listener(t);
    }
  }
  handleKeyDown = (e) => {
    if (e.defaultPrevented || Ne(e)) return;
    const t = this.interactionTop(e.target), n = this.topDismissible(void 0, t);
    if (e.key === "Escape" && n) {
      if (n.dismissOnEscape === !1) return;
      e.preventDefault(), e.stopPropagation(), n.onDismiss("escape-key");
      return;
    }
    if (this.routeInteraction("keydown", e, t), !e.defaultPrevented && e.key === "Tab") {
      const r = this.trappingScope();
      if (!r) return;
      const s = this.getLayerForElement(r.element), a = Ze(r.element, !0);
      s && this.orderedLayers().filter((f) => f.id !== s.id && this.isAvailable(f) && this.isDescendant(f.id, s.id)).forEach((f) => a.push(...Ze(f.element, !0)));
      const c = a[0], u = a[a.length - 1], i = this.ownerDocument?.activeElement;
      !c || !i || !this.inFocusDomain(i, r) ? (e.preventDefault(), (c ?? r.element).focus()) : e.shiftKey && i === c ? (e.preventDefault(), u?.focus()) : !e.shiftKey && i === u && (e.preventDefault(), c.focus());
    }
  };
  handleKeyDownCapture = (e) => {
    if (e.key !== "Escape" || e.defaultPrevented || Ne(e)) return;
    const t = e.target, n = this.interactionTop(t);
    !n || this.getLayerForElement(t) === n || (this.handleKeyDown(e), e.preventDefault(), e.stopPropagation());
  };
  handlePointerDown = (e) => {
    const t = this.interactionTop(e.target);
    this.pointerGesture = { target: e.target, top: t };
    const n = this.topDismissible(void 0, t);
    if (n || this.routeInteraction("pointerdown", e, t), e.defaultPrevented || !n || n.dismissOnPointerOutside === !1) return;
    const r = e.target;
    if (!r?.nodeType || n.element?.()?.contains(r) || n.containsTarget?.(r)) return;
    const s = this.getLayerForElement(n.element?.() ?? null), a = this.getLayerForElement(r);
    s && a && a.id !== s.id && this.isDescendant(a.id, s.id) || n.onDismiss("pointer-outside");
  };
  handleMouseDown = (e) => {
    const t = this.pointerGesture;
    if (this.pointerGesture = void 0, t?.target === e.target && t.top) {
      this.layers.has(t.top.id) && this.isAvailable(t.top) && this.routeInteraction("mousedown", e, t.top);
      return;
    }
    this.routeInteraction("mousedown", e);
  };
  handleFocusIn = (e) => {
    const t = this.trappingScope(), n = e.target;
    this.redirectingFocus || !t || !n?.nodeType || this.inFocusDomain(n, t) || (this.redirectingFocus = !0, this.focusFirst(this.topFocusScope() ?? t), this.redirectingFocus = !1);
  };
  reconcileInert() {
    const e = this.topModal(), t = /* @__PURE__ */ new Set();
    if (e && this.ownerDocument?.defaultView) {
      const n = this.ownerDocument.defaultView.HTMLElement, r = this.orderedLayers().filter((a) => this.isDescendant(a.id, e.id)).map((a) => a.element), s = (a) => Array.from(a.children).forEach((c) => {
        !(c instanceof n) || r.includes(c) || (r.some((u) => c.contains(u)) ? s(c) : t.add(c));
      });
      s(this.ownerDocument.body);
    }
    for (const [n, r] of this.hiddenElements)
      t.has(n) || (n.toggleAttribute("inert", r.inert), r.ariaHidden === null ? n.removeAttribute("aria-hidden") : n.setAttribute("aria-hidden", r.ariaHidden), this.hiddenElements.delete(n));
    t.forEach((n) => {
      this.hiddenElements.has(n) || this.hiddenElements.set(n, {
        inert: n.hasAttribute("inert"),
        ariaHidden: n.getAttribute("aria-hidden")
      }), n.setAttribute("inert", ""), n.setAttribute("aria-hidden", "true");
    });
  }
  changed() {
    this.orderedLayers().forEach((t, n) => {
      t.element.style.zIndex = String(n + 1), t.element.dataset.openbitfunOverlayState = t.open ? "open" : "exiting", t.element.hidden = !this.ancestorsOpen(t), t.element.style.pointerEvents = t.modal && !t.open ? "auto" : "none";
    }), this.reconcileInert(), this.layers.forEach((t) => {
      t.open || t.element.setAttribute("inert", "");
    }), this.restoreFocus();
    const e = this.layers.size + this.dismissibles.size + this.interactions.size > 0;
    if (this.ownerDocument && e !== this.listening) {
      this.listening = e;
      const t = e ? "addEventListener" : "removeEventListener";
      this.ownerDocument[t]("keydown", this.handleKeyDownCapture, !0), this.ownerDocument[t]("keydown", this.handleKeyDown), this.ownerDocument[t]("pointerdown", this.handlePointerDown, !0), this.ownerDocument[t]("mousedown", this.handleMouseDown, !0), this.ownerDocument[t]("focusin", this.handleFocusIn, !0);
    }
    this.version += 1, this.listeners.forEach((t) => t());
  }
}
const We = /* @__PURE__ */ Symbol.for("openbitfun.overlay-coordinator.v1"), at = new A2();
function i2(o) {
  if (!o) return at;
  const e = o;
  return e[We] || Object.defineProperty(e, We, { value: new A2(o) }), e[We];
}
function Ee() {
  return Ce(ot);
}
function c2(o) {
  const e = A(/* @__PURE__ */ Symbol("openbitfun-overlay-dismissal")), t = A(o);
  t.current = o;
  const { enabled: n, layerRef: r, ownerDocument: s, scope: a } = o;
  return B(() => {
    if (!n) return;
    const c = s ?? r.current?.ownerDocument ?? (typeof document > "u" ? null : document);
    return i2(c).register({
      id: e.current,
      scope: a,
      element: () => t.current.layerRef.current,
      onDismiss: (i) => t.current.onDismiss(i),
      get dismissOnEscape() {
        return t.current.dismissOnEscape;
      },
      get dismissOnPointerOutside() {
        return t.current.dismissOnPointerOutside;
      },
      containsTarget: (i) => !!(t.current.branchRefs?.some((f) => f.current?.contains(i)) || t.current.containsTarget?.(i))
    });
  }, [n, r, s, a]), e.current;
}
const it = typeof window > "u" ? B : ve;
function l2({
  active: o,
  autoFocus: e = !0,
  containerRef: t,
  initialFocusRef: n,
  ownerDocument: r,
  restoreFocus: s = !0,
  trapFocus: a = !0
}) {
  const c = A(/* @__PURE__ */ Symbol("openbitfun-focus-scope"));
  it(() => {
    if (!o) return;
    const u = t.current, i = r ?? u?.ownerDocument;
    if (!u || !i) return;
    const f = i.defaultView?.HTMLElement;
    return i2(i).registerFocusScope({
      id: c.current,
      element: u,
      autoFocus: e,
      trapFocus: a,
      restoreFocus: s,
      initialFocus: n?.current,
      previousFocus: f && i.activeElement instanceof f ? i.activeElement : null
    });
  }, [o, e, t, n, r, s, a]);
}
const Ke = /* @__PURE__ */ Symbol.for("openbitfun.overlay-scroll-lock.v1");
function ct(o, e) {
  B(() => {
    if (!o) return;
    const t = e ?? (typeof document > "u" ? null : document);
    if (!t) return;
    const n = t;
    n[Ke] || Object.defineProperty(n, Ke, { value: { count: 0, previousOverflow: "" } });
    const r = n[Ke];
    return r.count === 0 && (r.previousOverflow = t.body.style.overflow, t.body.style.overflow = "hidden"), r.count += 1, () => {
      r.count = Math.max(0, r.count - 1), r.count === 0 && (t.body.style.overflow = r.previousOverflow);
    };
  }, [o, e]);
}
const lt = Number.parseInt(M2, 10) >= 19;
function Re(o) {
  return o ? { inert: lt ? !0 : "" } : {};
}
const dt = "_layer_f85ab_2", ut = "_inlineLayer_f85ab_8", f2 = {
  layer: dt,
  inlineLayer: ut
}, D2 = pe(null);
function ht(o) {
  const e = o.querySelector('[data-openbitfun-overlay-host="true"]');
  if (e) return e;
  const t = o.createElement("div");
  return t.setAttribute("data-openbitfun-overlay-host", "true"), Object.assign(t.style, {
    position: "fixed",
    inset: "0",
    zIndex: "var(--openbitfun-layer-overlay-host)",
    pointerEvents: "none"
  }), o.body.appendChild(t), t;
}
function Ve(o, e) {
  const t = typeof o == "function" ? o() : o;
  if (t && t !== t.ownerDocument?.body) return t;
  const n = t?.ownerDocument ?? e ?? (typeof document > "u" ? null : document);
  return n ? ht(n) : null;
}
function $2({
  children: o,
  container: e,
  open: t = !0,
  modal: n = !1,
  passive: r = !1,
  ownerRef: s,
  surfaceRef: a,
  onDismiss: c,
  dismissOnEscape: u = !0,
  dismissOnPointerOutside: i = !1,
  inline: f,
  preventScroll: _ = !0
}) {
  const h = i2(e.ownerDocument), C = Ce(D2), b = C?.stack === h ? C.id : void 0;
  x2(h.subscribe, h.getSnapshot, h.getSnapshot);
  const [g, m] = oe(!r);
  ve(() => {
    m(!0);
  }, []);
  const d = A(!1), w = g && (!r || h.canPresent(b ?? h.getLayerForElement(s?.current ?? null)?.id));
  return ve(() => {
    w && (d.current = !0);
  }, [w]), !d.current && !w ? null : /* @__PURE__ */ l(ft, { children: o, container: e, open: t, modal: n, passive: r, parentId: b, stack: h, surfaceRef: a, onDismiss: c, dismissOnEscape: u, dismissOnPointerOutside: i, inline: f, preventScroll: _, ownerRef: s });
}
function ft({
  children: o,
  container: e,
  open: t = !0,
  modal: n = !1,
  passive: r = !1,
  parentId: s,
  stack: a,
  surfaceRef: c,
  onDismiss: u,
  dismissOnEscape: i,
  dismissOnPointerOutside: f,
  inline: _,
  preventScroll: h,
  ownerRef: C
}) {
  const [b] = oe(() => ({
    id: /* @__PURE__ */ Symbol("openbitfun-overlay"),
    sequence: a.reserveSequence(),
    // Capture before modal registration makes the background inert. Keep the
    // original return target through StrictMode's effect replay.
    activationFocus: e.ownerDocument.activeElement
  })), g = A(null), m = a.hasOpenAncestors(b.id), d = A({ open: t, modal: n, passive: r });
  ve(() => {
    const N = g.current;
    if (N)
      return a.registerLayer({ ...b, element: N, parentId: s, ownerElement: () => C?.current ?? null, ...d.current });
  }, [C, s, a, b]), ve(() => {
    a.updateLayer(b.id, { open: t, modal: n, passive: r });
  }, [n, t, r, a, b]), c2({
    enabled: t && !!u,
    layerRef: c ?? g,
    branchRefs: C ? [C] : void 0,
    onDismiss: (N) => u?.(N),
    dismissOnEscape: i,
    dismissOnPointerOutside: f,
    ownerDocument: e.ownerDocument
  }), l2({
    active: t && n && m && !!c,
    containerRef: c ?? g,
    ownerDocument: e.ownerDocument
  }), ct(n && m && !!h, e.ownerDocument);
  const w = /* @__PURE__ */ l(rt.Provider, { value: a, children: /* @__PURE__ */ l(D2.Provider, { value: { id: b.id, stack: a }, children: /* @__PURE__ */ l(E2.Provider, { value: "default", children: /* @__PURE__ */ l(
    "div",
    {
      ref: g,
      className: _ ? f2.inlineLayer : f2.layer,
      "data-openbitfun-overlay-layer": "",
      "data-openbitfun-overlay-modal": n || void 0,
      ...Re(!t),
      children: o
    }
  ) }) }) });
  return _ ? w : N2(w, e);
}
function Bs({ children: o, target: e, ownerDocument: t }) {
  const n = Ee(), r = Ve(e === void 0 ? n.portalHost : e, t);
  return r ? N2(o, r) : null;
}
function Us({ children: o, ownerDocument: e, ...t }) {
  const n = Ee(), r = Ve(n.portalHost, e);
  return r ? /* @__PURE__ */ l($2, { ...t, container: r, inline: !0, children: o }) : null;
}
function $e({ children: o, target: e, ownerDocument: t, ...n }) {
  const r = Ee(), s = Ve(e === void 0 ? r.portalHost : e, t);
  return s && a2.toArray(o).length > 0 ? /* @__PURE__ */ l($2, { ...n, container: s, children: o }) : null;
}
function Zs(o, e, t, n) {
  return /* @__PURE__ */ l($e, { target: e, ...n, children: o }, t);
}
const pt = "_root_50nwc_2", mt = "_arrow_50nwc_3", yt = "_content_50nwc_4", gt = "_body_50nwc_5", Te = {
  root: pt,
  arrow: mt,
  content: yt,
  body: gt
}, vt = 450, bt = 400, Ct = 300;
let p2 = 0;
const ke = /* @__PURE__ */ new WeakMap(), _t = 12, wt = 8, xe = 8, se = 8;
function kt(o, e) {
  if (o) {
    if (typeof o == "function") {
      o(e);
      return;
    }
    o.current = e;
  }
}
const Mt = Number.parseInt(M2, 10) >= 19;
function xt(o) {
  if (o)
    return Mt ? o.props.ref : o.ref;
}
const Nt = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
function m2(o, e) {
  switch (e) {
    case "top":
      return o.top - se;
    case "bottom":
      return window.innerHeight - o.bottom - se;
    case "left":
      return o.left - se;
    case "right":
      return window.innerWidth - o.right - se;
  }
}
function Lt(o, e, t) {
  switch (t) {
    case "top":
      return {
        top: o.top - e.height - xe,
        left: o.left + (o.width - e.width) / 2
      };
    case "bottom":
      return {
        top: o.bottom + xe,
        left: o.left + (o.width - e.width) / 2
      };
    case "left":
      return {
        top: o.top + (o.height - e.height) / 2,
        left: o.left - e.width - xe
      };
    case "right":
      return {
        top: o.top + (o.height - e.height) / 2,
        left: o.right + xe
      };
  }
}
function Et(o, e, t) {
  const n = t === "top" || t === "bottom" ? e.height + xe : e.width + xe, r = m2(o, t);
  if (r >= n) return t;
  const s = Nt[t], a = m2(o, s);
  return a >= n || a > r ? s : t;
}
function y2(o, e) {
  let { top: t, left: n } = o;
  return n < se ? n = se : n + e.width > window.innerWidth - se && (n = window.innerWidth - e.width - se), t < se ? t = se : t + e.height > window.innerHeight - se && (t = window.innerHeight - e.height - se), { top: t, left: n };
}
function At({
  children: o,
  className: e,
  content: t,
  delay: n,
  disabled: r = !1,
  followCursor: s = !1,
  interactive: a = !1,
  openOnClick: c = !1,
  placement: u = "top",
  trigger: i = "hover",
  triggerRef: f,
  active: _ = !1,
  onBeforeShow: h
}) {
  const C = Ee(), b = Ce(Q2), g = n ?? C.tooltipDelay ?? vt, m = be(), [d, w] = oe(!1), [N, L] = oe({
    top: 0,
    left: 0,
    placement: u,
    ready: !1
  }), [E, T] = oe(null), W = A(null), x = f ?? W, P = A(null), D = A(null), S = A(null), K = A(null), M = A(null), F = A(!1), y = A(!1), $ = A(!1), j = A(() => {
  }), q = A(null), H = R(() => {
    q.current?.(), q.current = null;
  }, []), G = R(() => {
    if (!P.current) return;
    const v = P.current.getBoundingClientRect();
    if (s && E) {
      const ue = {
        top: E.y + wt,
        left: E.x + _t
      }, ne = y2(ue, v);
      L({ top: ne.top, left: ne.left, placement: "bottom", ready: !0 });
      return;
    }
    if (!x.current) return;
    const U = x.current.getBoundingClientRect(), Y = Et(U, v, u), ee = y2(
      Lt(U, v, Y),
      v
    );
    L({ top: ee.top, left: ee.left, placement: Y, ready: !0 });
  }, [u, s, E]), Q = R(() => {
    M.current === null && (M.current = requestAnimationFrame(() => {
      M.current = null, G();
    }));
  }, [G]), k = R((v, U = !1) => {
    if (r) return;
    const Y = x.current;
    if (!Y || Y.closest('[hidden], [aria-hidden="true"]') || h && !h()) return;
    const ee = Y.ownerDocument.defaultView;
    if (ee && !q.current) {
      const ye = (we) => {
        const h2 = P.current;
        h2 && we.target instanceof Node && h2.contains(we.target) || j.current();
      };
      ee.addEventListener("scroll", ye, { capture: !0, passive: !0 }), ee.visualViewport?.addEventListener("scroll", ye, { passive: !0 }), q.current = () => {
        ee.removeEventListener("scroll", ye, !0), ee.visualViewport?.removeEventListener("scroll", ye);
      };
    }
    if (D.current && clearTimeout(D.current), D.current = null, S.current && (clearTimeout(S.current), S.current = null), U && (y.current = !0), y.current && d) return;
    s && v && (K.current = { x: v.clientX, y: v.clientY });
    const ue = U || (i === "hover" || i === "hover-focus") && Date.now() < p2 ? 0 : g;
    F.current = ue === 0;
    const ne = () => {
      if (D.current = null, !Y.isConnected || Y.closest('[hidden], [aria-hidden="true"]') || h && !h()) {
        H();
        return;
      }
      const ye = ke.get(Y.ownerDocument);
      ye && ye.id !== m && ye.hide(), ke.set(Y.ownerDocument, { id: m, hide: () => j.current() }), s && T(K.current), L((we) => we.ready ? { ...we, ready: !1 } : we), w(!0);
    };
    U ? ne() : D.current = setTimeout(ne, ue);
  }, [r, s, h, g, H, m, i, x, d]), I = R(() => {
    H(), y.current = !1, D.current && (clearTimeout(D.current), D.current = null), S.current && (clearTimeout(S.current), S.current = null), d && (p2 = Date.now() + Ct);
    const v = x.current?.ownerDocument;
    v && ke.get(v)?.id === m && ke.delete(v), w(!1), L((U) => U.ready ? { ...U, ready: !1 } : U), s && (K.current = null, T(null));
  }, [s, H, m, x, d]);
  B(() => {
    j.current = I;
  }, [I]), B(() => {
    const v = x.current, U = v?.ownerDocument.defaultView;
    if (!d || !v || !U?.IntersectionObserver) return;
    let Y = !0;
    const ee = new U.IntersectionObserver((ue) => {
      Y && ue.some((ne) => ne.target === v && !ne.isIntersecting) && j.current();
    });
    return ee.observe(v), () => {
      Y = !1, ee.disconnect();
    };
  }, [x, d]);
  const te = R((v) => {
    c && !y.current ? k(v, !0) : !c && i === "click" && !d ? k(v) : I();
  }, [I, c, k, i, d]), Z = R(() => {
    if (!y.current) {
      if (!a || !d) {
        I();
        return;
      }
      S.current && clearTimeout(S.current), S.current = setTimeout(() => {
        S.current = null, I();
      }, bt);
    }
  }, [I, a, d]);
  B(() => {
    L((v) => v.placement === u ? v : { ...v, placement: u });
  }, [u]), B(() => {
    r && I();
  }, [r, I]), B(() => {
    if (d)
      return Q(), window.addEventListener("resize", Q, { passive: !0 }), () => {
        window.removeEventListener("resize", Q), M.current !== null && (cancelAnimationFrame(M.current), M.current = null);
      };
  }, [d, Q]), B(() => {
    const v = x.current?.ownerDocument;
    return () => {
      H(), D.current && clearTimeout(D.current), S.current && clearTimeout(S.current), D.current = S.current = null, $.current = !1, v && ke.get(v)?.id === m && ke.delete(v);
    };
  }, [H, m, x]), B(() => {
    const v = f?.current;
    if (!v) return;
    const U = (ne) => {
      (i === "hover" || i === "hover-focus") && k(ne);
    }, Y = (ne) => {
      a && ne.relatedTarget instanceof Node && P.current?.contains(ne.relatedTarget) || i === "hover-focus" && v.contains(v.ownerDocument.activeElement) || (i === "hover" || i === "hover-focus") && Z();
    }, ee = () => {
      (i === "focus" || i === "hover-focus") && k();
    }, ue = (ne) => {
      ne.relatedTarget && v.contains(ne.relatedTarget) || !y.current && (i === "focus" || i === "hover-focus") && I();
    };
    return v.addEventListener("mouseenter", U), v.addEventListener("mouseleave", Y), v.addEventListener("focusin", ee), v.addEventListener("focusout", ue), v.addEventListener("click", te), () => {
      v.removeEventListener("mouseenter", U), v.removeEventListener("mouseleave", Y), v.removeEventListener("focusin", ee), v.removeEventListener("focusout", ue), v.removeEventListener("click", te);
    };
  }, [f, I, a, Z, k, te, i]), B(() => {
    const v = x.current, U = !r && (_ || !!(f && v?.contains(v.ownerDocument.activeElement)));
    U !== $.current && ($.current = U, U ? k() : I());
  }, [_, r, f, I, k, x]), B(() => {
    const v = x.current?.ownerDocument, U = (Y) => {
      Y.key !== "Escape" || Ne(Y) || D.current === null || (clearTimeout(D.current), D.current = null, d || H());
    };
    return v?.addEventListener("keydown", U, !0), () => v?.removeEventListener("keydown", U, !0);
  }, [H, x, d]);
  const X = o?.props ?? {}, ae = xt(o), J = R((v) => {
    W.current = v, kt(ae, v);
  }, [ae]), me = (v) => {
    (i === "hover" || i === "hover-focus") && k(v), X.onMouseEnter?.(v);
  }, ce = (v) => {
    (i === "hover" || i === "hover-focus" && !v.currentTarget.contains(v.currentTarget.ownerDocument.activeElement)) && Z(), X.onMouseLeave?.(v);
  }, _e = (v) => {
    s && !d && (K.current = { x: v.clientX, y: v.clientY }), X.onMouseMove?.(v);
  }, Se = (v) => {
    te(v), X.onClick?.(v);
  }, B2 = (v) => {
    (i === "focus" || i === "hover-focus") && k(), X.onFocus?.(v);
  }, U2 = (v) => {
    !y.current && (i === "focus" || i === "hover-focus") && I(), X.onBlur?.(v);
  }, Oe = d && N.ready;
  B(() => {
    const v = f?.current;
    if (!(!v || b))
      return J2(v);
  }, [f, b]), B(() => {
    const v = f?.current;
    if (!v || !Oe) return;
    const U = new Set(v.getAttribute("aria-describedby")?.split(/\s+/).filter(Boolean));
    return U.add(m), v.setAttribute("aria-describedby", [...U].join(" ")), () => {
      const Y = v.getAttribute("aria-describedby")?.split(/\s+/).filter((ee) => ee && ee !== m) ?? [];
      Y.length ? v.setAttribute("aria-describedby", Y.join(" ")) : v.removeAttribute("aria-describedby");
    };
  }, [f, Oe, m]);
  const Z2 = o ? W2(o, {
    "data-openbitfun-tooltip-trigger": "true",
    ref: J,
    onMouseEnter: me,
    onMouseLeave: ce,
    onMouseMove: s ? _e : X.onMouseMove,
    onClick: Se,
    onFocus: B2,
    onBlur: U2,
    "aria-describedby": Oe ? [X["aria-describedby"], m].filter(Boolean).join(" ") : X["aria-describedby"]
  }) : null;
  return /* @__PURE__ */ V(Le, { children: [
    /* @__PURE__ */ l(L2.Provider, { value: !r, children: Z2 }),
    d && /* @__PURE__ */ l(
      $e,
      {
        ownerDocument: x.current?.ownerDocument,
        ownerRef: x,
        passive: !0,
        surfaceRef: P,
        onDismiss: I,
        dismissOnPointerOutside: c,
        children: /* @__PURE__ */ V(
          "div",
          {
            ref: P,
            id: m,
            role: "tooltip",
            "data-motion": "presence",
            "data-openbitfun-native-webview-occlusion": !0,
            className: O(Te.root, e),
            "data-openbitfun-component": "tooltip",
            "data-openbitfun-placement": N.placement,
            "data-openbitfun-interactive": a ? "true" : "false",
            "data-openbitfun-state": Oe ? "visible" : void 0,
            "data-instant": F.current || void 0,
            onClick: (v) => v.stopPropagation(),
            onMouseEnter: a ? () => {
              S.current && (clearTimeout(S.current), S.current = null);
            } : void 0,
            onMouseLeave: a ? Z : void 0,
            style: {
              top: `${N.top}px`,
              left: `${N.left}px`
            },
            children: [
              !s && /* @__PURE__ */ l("div", { className: Te.arrow, "data-openbitfun-part": "arrow", "aria-hidden": "true" }),
              /* @__PURE__ */ l("div", { className: Te.content, "data-openbitfun-part": "content", children: /* @__PURE__ */ l("div", { className: Te.body, "data-openbitfun-part": "body", children: t }) })
            ]
          }
        )
      }
    )
  ] });
}
const Dt = "_root_1rfke_2", $t = "_content_1rfke_15", g2 = {
  root: Dt,
  content: $t
}, o2 = /* @__PURE__ */ new WeakMap();
function St(o, e) {
  let t = o2.get(o);
  t || (t = { pending: /* @__PURE__ */ new Map(), active: /* @__PURE__ */ new Map(), frame: null }, o2.set(o, t));
  const n = t.active.get(e);
  if (n && (n.cancelled = !0), t.pending.set(e, { read: e, cancelled: !1 }), t.frame !== null) return;
  const r = t;
  r.frame = o.requestAnimationFrame(() => {
    r.frame = null;
    const s = r.pending;
    r.pending = /* @__PURE__ */ new Map(), r.active = s;
    const a = [], c = (u) => {
      o.setTimeout(() => {
        throw u;
      }, 0);
    };
    try {
      for (const u of s.values())
        if (!u.cancelled)
          try {
            const i = u.read();
            i && a.push({ job: u, publish: i });
          } catch (i) {
            c(i);
          }
      for (const { job: u, publish: i } of a)
        if (!u.cancelled)
          try {
            i();
          } catch (f) {
            c(f);
          }
    } finally {
      r.active = /* @__PURE__ */ new Map();
    }
  });
}
function Ot(o, e) {
  const t = o2.get(o);
  if (!t) return;
  const n = t.active.get(e);
  n && (n.cancelled = !0), t.pending.delete(e), t.pending.size === 0 && t.frame !== null && (o.cancelAnimationFrame(t.frame), t.frame = null);
}
const Tt = typeof window > "u" ? B : ve;
function Ft(o, e) {
  typeof o == "function" ? o(e) : o && (o.current = e);
}
const Pt = 2400, qt = 36, Ae = z(
  function({
    as: e = "span",
    behavior: t,
    children: n,
    className: r,
    lines: s,
    marqueeActive: a = !1,
    marqueeTrigger: c = "interaction-or-active",
    overflowStyle: u = "fade",
    style: i,
    title: f,
    ..._
  }, h) {
    const C = a2.toArray(n).every(
      (y) => typeof y == "string" || typeof y == "number"
    ), b = s ? "fade" : t ?? (C ? "marquee" : "fade"), g = A(null), m = A(null), d = A(null), w = Ce(L2), [N, L] = oe(""), E = A({
      distance: 0,
      isOverflowing: !1
    }), [T, W] = oe(E.current), x = R((y) => {
      g.current = y, d.current = y?.closest("[data-overflow-trigger]") ?? y, Ft(h, y);
    }, [h]), P = R(() => {
      const y = g.current, $ = m.current ?? y;
      if (!y || !$) return;
      const j = Math.max(0, $.scrollWidth - y.clientWidth), q = s !== void 0 && y.clientHeight > 0 && y.scrollHeight > y.clientHeight, H = y.clientWidth > 0 && (j > 0 || q), G = E.current;
      if (G.distance === j && G.isOverflowing === H) return;
      const Q = { distance: j, isOverflowing: H };
      return () => {
        E.current = Q, W(Q);
      };
    }, [s]), D = R(() => {
      const y = g.current?.ownerDocument.defaultView;
      y && St(y, P);
    }, [P]), S = R(() => {
      const y = g.current, $ = d.current;
      if (!y || !$) return !1;
      const j = $ === y ? [y] : Array.from($.querySelectorAll('[data-overflow-tooltip="true"]')).filter((H) => H.closest("[data-overflow-trigger]") === $ && !H.querySelector('[data-overflow-tooltip="true"]'));
      if (j[0] !== y) return !1;
      const q = j.map((H) => H.getAttribute("data-overflow-text") ?? H.textContent ?? "").filter(Boolean).join(`
`);
      return q ? (L(q), !0) : !1;
    }, []);
    Tt(() => {
      D();
      const y = g.current?.ownerDocument.defaultView;
      return () => {
        y && Ot(y, P);
      };
    }, [b, n, s, u, P, D]), B(() => {
      (E.current.isOverflowing || f) && S();
    }, [n, f, S]), B(() => {
      const y = g.current;
      if (!y) return;
      const $ = typeof ResizeObserver > "u" ? null : new ResizeObserver(D);
      $?.observe(y), m.current && $?.observe(m.current);
      const j = y.ownerDocument.fonts;
      j?.addEventListener("loadingdone", D);
      const q = C || typeof MutationObserver > "u" ? null : new MutationObserver(() => {
        D(), S();
      });
      return q?.observe(y, { childList: !0, characterData: !0, subtree: !0 }), $ || y.ownerDocument.defaultView?.addEventListener("resize", D), () => {
        $?.disconnect(), q?.disconnect(), j?.removeEventListener("loadingdone", D), $ || y.ownerDocument.defaultView?.removeEventListener("resize", D);
      };
    }, [b, u, S, C, D]);
    const K = Math.max(
      Pt,
      Math.round(T.distance / qt * 1e3)
    ), M = {
      ...i,
      ...s ? { "--_overflow-text-lines": s } : {},
      ...b === "marquee" ? {
        "--_overflow-text-marquee-distance": `${T.distance}px`,
        "--_overflow-text-marquee-duration": `${K}ms`
      } : {}
    }, F = (T.isOverflowing || !!f) && !w && f !== "";
    return /* @__PURE__ */ V(Le, { children: [
      /* @__PURE__ */ l(
        e,
        {
          ..._,
          className: O(g2.root, r),
          "data-marquee-active": a && c !== "interaction" ? "true" : void 0,
          "data-marquee-trigger": c,
          "data-overflow": T.isOverflowing ? "true" : "false",
          "data-overflow-behavior": b,
          "data-overflow-lines": s,
          "data-overflow-style": s ? void 0 : u,
          "data-overflow-tooltip": F ? "true" : void 0,
          "data-overflow-text": f,
          ref: x,
          style: M,
          children: b === "marquee" || (C || u === "ellipsis") && s === void 0 ? /* @__PURE__ */ l("span", { className: g2.content, "data-openbitfun-part": "content", "data-overflow-content": "", ref: m, children: n }) : n
        }
      ),
      F && /* @__PURE__ */ l(
        At,
        {
          active: a && c !== "interaction",
          content: N,
          interactive: !0,
          onBeforeShow: S,
          trigger: "hover-focus",
          triggerRef: d
        }
      )
    ] });
  }
);
const It = (o) => o.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), zt = (o) => o.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()
), v2 = (o) => {
  const e = zt(o);
  return e.charAt(0).toUpperCase() + e.slice(1);
}, S2 = (...o) => o.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), Ht = (o) => {
  for (const e in o)
    if (e.startsWith("aria-") || e === "role" || e === "title")
      return !0;
};
var Rt = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Vt = z(
  ({
    color: o = "currentColor",
    size: e = 24,
    strokeWidth: t = 2,
    absoluteStrokeWidth: n,
    className: r = "",
    children: s,
    iconNode: a,
    ...c
  }, u) => n2(
    "svg",
    {
      ref: u,
      ...Rt,
      width: e,
      height: e,
      stroke: o,
      strokeWidth: n ? Number(t) * 24 / Number(e) : t,
      className: S2("lucide", r),
      ...!s && !Ht(c) && { "aria-hidden": "true" },
      ...c
    },
    [
      ...a.map(([i, f]) => n2(i, f)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
const p = (o, e) => {
  const t = z(
    ({ className: n, ...r }, s) => n2(Vt, {
      ref: s,
      iconNode: e,
      className: S2(
        `lucide-${It(v2(o))}`,
        `lucide-${o}`,
        n
      ),
      ...r
    })
  );
  return t.displayName = v2(o), t;
};
const jt = [
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }],
  ["path", { d: "M10 4v4", key: "pp8u80" }],
  ["path", { d: "M2 8h20", key: "d11cs7" }],
  ["path", { d: "M6 4v4", key: "1svtjw" }]
], Bt = p("app-window", jt);
const Ut = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
], b2 = p("arrow-down", Ut);
const Zt = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], Wt = p("arrow-left", Zt);
const Kt = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], Gt = p("arrow-right", Kt);
const Xt = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], Yt = p("arrow-up-right", Xt);
const Qt = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
], Jt = p("arrow-up", Qt);
const e0 = [
  ["path", { d: "M10 10v4", key: "1mb2ec" }],
  ["path", { d: "M14 10v4", key: "1nt88p" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 10v4", key: "1n77qd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], t0 = p("battery-full", e0);
const n0 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], o0 = p("bell", n0);
const r0 = [
  [
    "path",
    {
      d: "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2",
      key: "1ah6g2"
    }
  ],
  ["rect", { x: "14", y: "2", width: "8", height: "8", rx: "1", key: "88lufb" }]
], s0 = p("blocks", r0);
const a0 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], i0 = p("book-open", a0);
const c0 = [
  ["path", { d: "M11 22H5.5a1 1 0 0 1 0-5h4.501", key: "mcbepb" }],
  ["path", { d: "m21 22-1.879-1.878", key: "12q7x1" }],
  ["path", { d: "M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8", key: "olfd5n" }],
  ["circle", { cx: "17", cy: "18", r: "3", key: "82mm0e" }]
], l0 = p("book-search", c0);
const d0 = [
  ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
], u0 = p("calendar-clock", d0);
const h0 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], O2 = p("check", h0);
const f0 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], p0 = p("chevron-down", f0);
const m0 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], y0 = p("chevron-left", m0);
const g0 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], v0 = p("chevron-right", g0);
const b0 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], C0 = p("chevron-up", b0);
const _0 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Ws = p("circle-alert", _0);
const w0 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m12 16 4-4-4-4", key: "1i9zcv" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
], k0 = p("circle-arrow-right", w0);
const M0 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Ge = p("circle-check", M0);
const x0 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], Xe = p("circle", x0);
const N0 = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], L0 = p("clock", N0);
const E0 = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
], A0 = p("code-xml", E0);
const D0 = [
  [
    "path",
    { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3", key: "11bfej" }
  ]
], $0 = p("command", D0);
const S0 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], O0 = p("copy", S0);
const T0 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
], F0 = p("ellipsis", T0);
const P0 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], q0 = p("eye", P0);
const I0 = [
  [
    "path",
    {
      d: "M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25",
      key: "uh4ikj"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m21 22-2.88-2.88", key: "9dd25w" }],
  ["circle", { cx: "16", cy: "17", r: "3", key: "11br10" }]
], z0 = p("file-search-corner", I0);
const H0 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], R0 = p("file-text", H0);
const V0 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "m15 15-3-3-3 3", key: "15xj92" }]
], j0 = p("file-up", V0);
const B0 = [
  [
    "path",
    {
      d: "M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5",
      key: "1jo35a"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m15 17 5 5", key: "36xl1x" }],
  ["path", { d: "m20 17-5 5", key: "vdz27y" }]
], U0 = p("file-x-corner", B0);
const Z0 = [
  ["path", { d: "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8", key: "14sh0y" }],
  [
    "path",
    {
      d: "M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z",
      key: "1970lx"
    }
  ],
  ["path", { d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1", key: "l4dndm" }]
], W0 = p("files", Z0);
const K0 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
], G0 = p("folder-open", K0);
const X0 = [
  [
    "path",
    {
      d: "M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",
      key: "1bw5m7"
    }
  ],
  ["path", { d: "m21 21-1.9-1.9", key: "1g2n9r" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }]
], Y0 = p("folder-search", X0);
const Q0 = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
], J0 = p("folder", Q0);
const e1 = [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["line", { x1: "3", x2: "9", y1: "12", y2: "12", key: "1dyftd" }],
  ["line", { x1: "15", x2: "21", y1: "12", y2: "12", key: "oup4p8" }]
], t1 = p("git-commit-horizontal", e1);
const n1 = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
  ["line", { x1: "6", x2: "6", y1: "9", y2: "21", key: "rroup" }]
], o1 = p("git-pull-request", n1);
const r1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], s1 = p("globe", r1);
const a1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
], i1 = p("history", a1);
const c1 = [
  ["path", { d: "M5 22h14", key: "ehvnwv" }],
  ["path", { d: "M5 2h14", key: "pdyrp9" }],
  [
    "path",
    {
      d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
      key: "1d314k"
    }
  ],
  [
    "path",
    { d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2", key: "1vvvr6" }
  ]
], l1 = p("hourglass", c1);
const d1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], u1 = p("image", d1);
const h1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], f1 = p("info", h1);
const p1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
], m1 = p("layers", p1);
const y1 = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
], g1 = p("link", y1);
const v1 = [
  ["path", { d: "M2 5h20", key: "1fs1ex" }],
  ["path", { d: "M6 12h12", key: "8npq4p" }],
  ["path", { d: "M9 19h6", key: "456am0" }]
], b1 = p("list-filter", v1);
const C1 = [
  ["path", { d: "M13 5h8", key: "a7qcls" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["rect", { x: "3", y: "4", width: "6", height: "6", rx: "1", key: "cif1o7" }]
], _1 = p("list-todo", C1);
const w1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], k1 = p("loader-circle", w1);
const M1 = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], x1 = p("message-circle-question-mark", M1);
const N1 = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
], L1 = p("message-circle", N1);
const E1 = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "M12 8v6", key: "1ib9pf" }],
  ["path", { d: "M9 11h6", key: "1fldmi" }]
], A1 = p("message-square-plus", E1);
const D1 = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "M7 11h10", key: "1twpyw" }],
  ["path", { d: "M7 15h6", key: "d9of3u" }],
  ["path", { d: "M7 7h8", key: "af5zfr" }]
], $1 = p("message-square-text", D1);
const S1 = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
], O1 = p("message-square", S1);
const T1 = [
  [
    "path",
    {
      d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
      key: "1n2ejm"
    }
  ],
  [
    "path",
    {
      d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
      key: "1qfcsi"
    }
  ]
], F1 = p("messages-square", T1);
const P1 = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["rect", { x: "9", y: "2", width: "6", height: "13", rx: "3", key: "s6n7sd" }]
], q1 = p("mic", P1);
const I1 = [["path", { d: "M5 12h14", key: "1ays0h" }]], z1 = p("minus", I1);
const H1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
], R1 = p("monitor", H1);
const V1 = [
  ["path", { d: "M12.586 12.586 19 19", key: "ea5xo7" }],
  [
    "path",
    {
      d: "M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",
      key: "277e5u"
    }
  ]
], j1 = p("mouse-pointer", V1);
const B1 = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
], U1 = p("palette", B1);
const Z1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }]
], W1 = p("panel-left", Z1);
const K1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
], G1 = p("panel-right", K1);
const X1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M9 21V9", key: "1oto5p" }]
], Y1 = p("panels-top-left", X1);
const Q1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], J1 = p("pen", Q1);
const en = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
], tn = p("pin", en);
const nn = [
  ["path", { d: "M12 22v-5", key: "1ega77" }],
  ["path", { d: "M15 8V2", key: "18g5xt" }],
  [
    "path",
    { d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z", key: "1xoxul" }
  ],
  ["path", { d: "M9 8V2", key: "14iosj" }]
], on = p("plug", nn);
const rn = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], sn = p("plus", rn);
const an = [
  [
    "path",
    {
      d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
      key: "w46dr5"
    }
  ]
], cn = p("puzzle", an);
const ln = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], dn = p("refresh-cw", ln);
const un = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15", key: "1d8sl" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
], hn = p("route", un);
const fn = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  [
    "path",
    {
      d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
      key: "11ak4c"
    }
  ]
], pn = p("scan-eye", fn);
const mn = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], yn = p("search", mn);
const gn = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], vn = p("settings", gn);
const bn = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
], Cn = p("sliders-horizontal", bn);
const _n = [
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M12 21v-9", key: "17s77i" }],
  ["path", { d: "M12 8V3", key: "13r4qs" }],
  ["path", { d: "M17 16h4", key: "h1uq16" }],
  ["path", { d: "M19 12V3", key: "o1uvq1" }],
  ["path", { d: "M19 21v-5", key: "qua636" }],
  ["path", { d: "M3 14h4", key: "bcjad9" }],
  ["path", { d: "M5 10V3", key: "cb8scm" }],
  ["path", { d: "M5 21v-7", key: "1w1uti" }]
], wn = p("sliders-vertical", _n);
const kn = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
], Mn = p("sparkles", kn);
const xn = [
  ["path", { d: "M16 3h5v5", key: "1806ms" }],
  ["path", { d: "M8 3H3v5", key: "15dfkv" }],
  ["path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3", key: "1qrqzj" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }]
], Nn = p("split", xn);
const Ln = [
  ["path", { d: "m7 11 2-2-2-2", key: "1lz0vl" }],
  ["path", { d: "M11 13h4", key: "1p7l4v" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }]
], En = p("square-terminal", Ln);
const An = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
], Dn = p("star", An);
const $n = [
  ["path", { d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5", key: "slp6dd" }],
  [
    "path",
    {
      d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
      key: "o0xfot"
    }
  ],
  ["path", { d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05", key: "wn3emo" }]
], Sn = p("store", $n);
const On = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], Tn = p("target", On);
const Fn = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], Pn = p("terminal", Fn);
const qn = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M10 12H3", key: "1ulcyk" }],
  ["path", { d: "M10 19H3", key: "108z41" }],
  ["circle", { cx: "17", cy: "15", r: "3", key: "1upz2a" }],
  ["path", { d: "m21 19-1.9-1.9", key: "dwi7p8" }]
], In = p("text-search", qn);
const zn = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], Hn = p("trash-2", zn);
const Rn = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Ks = p("triangle-alert", Rn);
const Vn = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], jn = p("upload", Vn);
const Bn = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], Un = p("user", Bn);
const Zn = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], Wn = p("users", Zn);
const Kn = [
  ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2", key: "by2w9f" }],
  ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4", key: "xkn7yn" }],
  ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2", key: "1cgmvn" }]
], Gn = p("workflow", Kn);
const Xn = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
      key: "1ngwbx"
    }
  ]
], Yn = p("wrench", Xn);
const Qn = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Jn = p("x", Qn), eo = "_surface_w311o_2", T2 = {
  surface: eo
}, to = "_button_l22en_2", no = "_content_l22en_252", oo = "_label_l22en_261", ro = "_staticLabel_l22en_275", so = "_icon_l22en_282", ao = "_leadingIcon_l22en_298", io = "_trailingIcon_l22en_303", co = "_progress_l22en_313", le = {
  button: to,
  content: no,
  label: oo,
  staticLabel: ro,
  icon: so,
  leadingIcon: ao,
  trailingIcon: io,
  progress: co
}, Gs = z(function({
  children: e,
  className: t,
  disabled: n,
  labelBehavior: r = "overflow",
  leadingIcon: s,
  loading: a = !1,
  size: c = "md",
  tone: u = "neutral",
  trailingIcon: i,
  type: f = "button",
  variant: _ = "outline",
  ...h
}, C) {
  return /* @__PURE__ */ V(
    "button",
    {
      "data-overflow-trigger": !0,
      ...h,
      "aria-busy": a || void 0,
      className: O(le.button, _ === "glass" && T2.surface, t),
      "data-openbitfun-component": "button",
      "data-openbitfun-part": "root",
      "data-openbitfun-tone": u,
      "data-openbitfun-variant": _,
      "data-loading": a ? "true" : "false",
      "data-label-behavior": r,
      "data-size": c,
      disabled: n || a,
      ref: C,
      type: f,
      children: [
        /* @__PURE__ */ l("span", { "aria-hidden": "true", className: le.progress, "data-openbitfun-part": "progress" }),
        /* @__PURE__ */ V("span", { className: le.content, "data-openbitfun-part": "content", children: [
          s && /* @__PURE__ */ l("span", { "aria-hidden": "true", className: O(le.icon, le.leadingIcon), "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "leading-icon", children: s }),
          r === "static" ? /* @__PURE__ */ l("span", { className: O(le.label, le.staticLabel), "data-openbitfun-part": "label", children: e }) : /* @__PURE__ */ l(Ae, { className: le.label, "data-openbitfun-part": "label", children: e }),
          i && /* @__PURE__ */ l("span", { "aria-hidden": "true", className: O(le.icon, le.trailingIcon), "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "trailing-icon", children: i })
        ] })
      ]
    }
  );
}), F2 = pe({});
function Xs({ children: o, ...e }) {
  return /* @__PURE__ */ l(F2.Provider, { value: e, children: o });
}
function P2(o, e = !1) {
  const t = Ce(F2);
  return {
    "aria-labelledby": o["aria-labelledby"] ?? (o["aria-label"] || e ? void 0 : t["aria-labelledby"]),
    "aria-describedby": [...new Set([
      o["aria-describedby"],
      t["aria-describedby"]
    ].filter(Boolean).flatMap((n) => n.split(/\s+/)))].join(" ") || void 0
  };
}
const lo = "_root_1h6ep_2", uo = "_control_1h6ep_23", ho = "_input_1h6ep_32", fo = "_box_1h6ep_54", po = "_icon_1h6ep_83", mo = "_content_1h6ep_95", yo = "_label_1h6ep_96", go = "_description_1h6ep_97", he = {
  root: lo,
  control: uo,
  input: ho,
  box: fo,
  icon: po,
  content: mo,
  label: yo,
  description: go
}, Ys = z(function({
  appearance: e = "custom",
  checked: t,
  children: n,
  className: r,
  defaultChecked: s,
  description: a,
  disabled: c = !1,
  indeterminate: u = !1,
  invalid: i = !1,
  label: f,
  onChange: _,
  onCheckedChange: h,
  readOnly: C = !1,
  size: b = "md",
  ...g
}, m) {
  const d = P2(g, f !== void 0 || n !== void 0), w = A(null);
  K2(m, () => w.current), B(() => {
    w.current && (w.current.indeterminate = u);
  }, [u]);
  const N = f !== void 0 || a !== void 0 || n !== void 0;
  return /* @__PURE__ */ V(
    "label",
    {
      className: O(he.root, r),
      "data-openbitfun-component": "checkbox",
      "data-appearance": e,
      "data-disabled": c ? "true" : "false",
      "data-indeterminate": u ? "true" : "false",
      "data-invalid": i ? "true" : "false",
      "data-readonly": C ? "true" : "false",
      "data-size": b,
      children: [
        /* @__PURE__ */ V("span", { className: he.control, "data-openbitfun-part": "control", children: [
          /* @__PURE__ */ l(
            "input",
            {
              ...g,
              ...d,
              "aria-invalid": i || void 0,
              checked: t,
              className: he.input,
              defaultChecked: s,
              "data-openbitfun-part": "input",
              disabled: c || C,
              onChange: (L) => {
                _?.(L), L.defaultPrevented || h?.(L.currentTarget.checked);
              },
              ref: w,
              type: "checkbox"
            }
          ),
          e === "custom" && /* @__PURE__ */ l("span", { "aria-hidden": "true", className: he.box, "data-openbitfun-part": "box", children: /* @__PURE__ */ l(Le, { children: u ? /* @__PURE__ */ l(z1, { className: he.icon, "aria-hidden": "true" }) : /* @__PURE__ */ l(O2, { className: he.icon, "aria-hidden": "true" }) }) })
        ] }),
        N && /* @__PURE__ */ V("span", { className: he.content, "data-openbitfun-part": "content", children: [
          f !== void 0 && /* @__PURE__ */ l("span", { className: he.label, children: f }),
          a !== void 0 && /* @__PURE__ */ l("span", { className: he.description, children: a }),
          n
        ] })
      ]
    }
  );
}), vo = p("Galaxy", [
  ["path", { d: "M16.005 15.108a5.041 6.52 28.25 00-8.008-6.217 5.041 6.52 28.25 008.008 6.217A11.884 7.288-60.76 014.029 7.001", key: "spiral-outer" }],
  ["path", { d: "M17 21h.01", key: "star-bottom" }],
  ["path", { d: "M7 3h.01", key: "star-top" }],
  ["path", { d: "M7.997 8.891a11.885 7.288-60.756 0111.977 8.107", key: "spiral-inner" }],
  ["circle", { cx: "12", cy: "12", r: "1", fill: "currentColor", key: "core" }]
]), bo = p("LayersPlus", [
  ["path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z", key: "top" }],
  ["path", { d: "M16 17h6", key: "plus-horizontal" }],
  ["path", { d: "M19 14v6", key: "plus-vertical" }],
  ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178", key: "middle" }],
  ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962", key: "bottom" }]
]), Co = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='HarmonyOS%20Icon'%3e%3cpath%20id='Union'%20d='M17.5%202.25C19.2949%202.25%2020.75%203.70507%2020.75%205.5C20.75%207.03664%2019.6831%208.3224%2018.25%208.66113V10C18.25%2011.5188%2017.0188%2012.75%2015.5%2012.75H8.5C7.80964%2012.75%207.25%2013.3096%207.25%2014V15.3379C8.68325%2015.6765%209.75%2016.9633%209.75%2018.5C9.75%2020.2949%208.29493%2021.75%206.5%2021.75C4.70507%2021.75%203.25%2020.2949%203.25%2018.5C3.25%2016.9633%204.31675%2015.6765%205.75%2015.3379V8.66113C4.31686%208.3224%203.25%207.03664%203.25%205.5C3.25%203.70507%204.70507%202.25%206.5%202.25C8.29493%202.25%209.75%203.70507%209.75%205.5C9.75%207.03664%208.68314%208.3224%207.25%208.66113V11.5527C7.62532%2011.3606%208.04942%2011.25%208.5%2011.25H15.5C16.1904%2011.25%2016.75%2010.6904%2016.75%2010V8.66113C15.3169%208.3224%2014.25%207.03664%2014.25%205.5C14.25%203.70507%2015.7051%202.25%2017.5%202.25ZM6.5%2016.75C5.5335%2016.75%204.75%2017.5335%204.75%2018.5C4.75%2019.4665%205.5335%2020.25%206.5%2020.25C7.4665%2020.25%208.25%2019.4665%208.25%2018.5C8.25%2017.5335%207.4665%2016.75%206.5%2016.75ZM6.5%203.75C5.5335%203.75%204.75%204.5335%204.75%205.5C4.75%206.4665%205.5335%207.25%206.5%207.25C7.4665%207.25%208.25%206.4665%208.25%205.5C8.25%204.5335%207.4665%203.75%206.5%203.75ZM17.5%203.75C16.5335%203.75%2015.75%204.5335%2015.75%205.5C15.75%206.4665%2016.5335%207.25%2017.5%207.25C18.4665%207.25%2019.25%206.4665%2019.25%205.5C19.25%204.5335%2018.4665%203.75%2017.5%203.75Z'%20fill='currentColor'/%3e%3c/g%3e%3c/svg%3e", _o = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2040%2040'%20fill='none'%3e%3cg%20stroke='currentColor'%20stroke-linecap='round'%20stroke-width='2'%3e%3cpath%20d='M19.5%203.75%203.5%2010.5'%20/%3e%3cpath%20d='M19.5%203.75%2035.5%2010.5'%20/%3e%3cpath%20d='M3.5%2010.5%2019.5%2019.5'%20/%3e%3cpath%20d='M35.5%2010.5%2019.5%2019.5'%20/%3e%3cpath%20d='M19.5%2019.5%203.5%2028.5'%20/%3e%3cpath%20d='M19.5%2019.5%2035.5%2028.5'%20/%3e%3cpath%20d='M3.5%2028.5%2019.5%2035.25'%20/%3e%3cpath%20d='M35.5%2028.5%2019.5%2035.25'%20/%3e%3c/g%3e%3cg%20fill='currentColor'%3e%3ccircle%20cx='19.5'%20cy='3.75'%20r='4'%20/%3e%3ccircle%20cx='3.5'%20cy='10.5'%20r='4'%20/%3e%3ccircle%20cx='35.5'%20cy='10.5'%20r='4'%20/%3e%3ccircle%20cx='19.5'%20cy='19.5'%20r='4'%20/%3e%3ccircle%20cx='3.5'%20cy='28.5'%20r='4'%20/%3e%3ccircle%20cx='35.5'%20cy='28.5'%20r='4'%20/%3e%3ccircle%20cx='19.5'%20cy='35.25'%20r='4'%20/%3e%3c/g%3e%3c/svg%3e", wo = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='HarmonyOS%20Icon'%3e%3cpath%20id='Vector'%20d='M1.55159%2019.6419C3.368%2022.0931%207.17659%2022.7572%209.53987%2020.9994C11.5613%2019.5052%2011.991%2017.1517%2010.4969%2015.1791C9.10042%2013.3041%207.0301%2012.8451%205.40901%2014.0658C3.88557%2015.2084%204.42268%2016.849%203.57307%2017.4837C2.83089%2018.0404%202.13753%2017.7279%201.60042%2018.138C1.2098%2018.4505%201.08284%2019.0169%201.55159%2019.6419ZM3.54378%2019.4857C3.41682%2019.349%203.42659%2019.2123%203.51448%2019.1244C3.6512%2018.9974%204.19807%2018.9584%204.618%2018.5384C5.56526%2017.6009%205.243%2016.224%206.33675%2015.3744C7.24495%2014.6517%208.50471%2014.9154%209.35432%2016.0091C10.3114%2017.2494%209.97932%2018.763%208.66096%2019.7787C7.18635%2020.9408%204.91096%2020.931%203.54378%2019.4857ZM11.1024%2017.3177C12.157%2017.2005%2013.0457%2016.6732%2014.0418%2015.6771C17.1766%2012.5521%2021.9617%205.55011%2022.3817%204.96417C23.6121%203.25519%2021.5028%201.16534%2019.784%202.36651C19.2078%202.77667%2012.1961%207.55206%209.07112%2010.7064C8.09456%2011.6927%207.55745%2012.5716%207.4305%2013.6068L8.9637%2014.0267C8.98323%2013.3138%209.36409%2012.6205%2010.1746%2011.8197C13.2703%208.763%2020.116%204.06573%2020.536%203.75323C20.868%203.50909%2021.2391%203.86066%2020.9852%204.22198C20.7313%204.59308%2015.9754%2011.5267%2012.9285%2014.5736C12.1278%2015.3744%2011.5125%2015.6966%2010.8387%2015.7748L11.1024%2017.3177ZM12.8309%2014.8666L14.0809%2014.5443C13.9442%2012.6791%2012.118%2010.8235%2010.2821%2010.6673L9.86214%2011.9173C11.1121%2011.888%2012.8309%2013.6068%2012.8309%2014.8666Z'%20fill='currentColor'/%3e%3c/g%3e%3c/svg%3e", ko = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='HarmonyOS%20Icon'%3e%3cpath%20id='Union'%20d='M8.65247%2015.4862C8.74541%2015.4897%208.83214%2015.5262%208.89563%2015.5897C8.95912%2015.6532%208.99566%2015.7399%208.99915%2015.8329C9.00254%2015.9259%208.97198%2016.017%208.922%2016.0936C8.84739%2016.2075%208.77136%2016.3209%208.69544%2016.4335C7.63224%2018.0099%206.44102%2019.4584%205.12122%2020.7782C4.74415%2021.1552%204.27269%2021.4373%203.70715%2021.6259C3.56583%2021.673%203.41884%2021.7155%203.26575%2021.7509C3.18121%2021.7697%203.09401%2021.7824%203.01184%2021.7733C2.92979%2021.7641%202.85864%2021.7324%202.80579%2021.6796C2.75295%2021.6267%202.72121%2021.5556%202.71204%2021.4735C2.70299%2021.3913%202.71563%2021.3041%202.7345%2021.2196C2.76984%2021.0665%202.81239%2020.9195%202.8595%2020.7782C3.04804%2020.2127%203.33015%2019.7412%203.70715%2019.3641C5.02696%2018.0443%206.47548%2016.8531%208.05188%2015.7899C8.16445%2015.714%208.27785%2015.638%208.39172%2015.5634C8.46834%2015.5134%208.55948%2015.4828%208.65247%2015.4862ZM14.8322%2015.4862C14.9253%2015.4827%2015.0172%2015.5133%2015.0939%2015.5634C15.2077%2015.6379%2015.3212%2015.714%2015.4337%2015.7899C17.0101%2016.8531%2018.4587%2018.0444%2019.7784%2019.3641C20.1554%2019.7412%2020.4376%2020.2127%2020.6261%2020.7782C20.6732%2020.9194%2020.7148%2021.0666%2020.7501%2021.2196C20.769%2021.3041%2020.7826%2021.3913%2020.7736%2021.4735C20.7644%2021.5555%2020.7326%2021.6267%2020.6798%2021.6796C20.627%2021.7324%2020.5558%2021.7641%2020.4738%2021.7733C20.3916%2021.7824%2020.3044%2021.7697%2020.2198%2021.7509C20.0668%2021.7155%2019.9198%2021.673%2019.7784%2021.6259C19.2129%2021.4373%2018.7414%2021.1552%2018.3644%2020.7782C17.0446%2019.4584%2015.8534%2018.0099%2014.7902%2016.4335C14.7143%2016.3209%2014.6382%2016.2075%2014.5636%2016.0936C14.5136%2016.017%2014.4831%2015.9259%2014.4865%2015.8329C14.4899%2015.7399%2014.5265%2015.6532%2014.59%2015.5897C14.6533%2015.5264%2014.7394%2015.4898%2014.8322%2015.4862ZM12.0001%2015.6825C12.085%2015.6825%2012.1675%2015.7157%2012.2345%2015.7753C12.3015%2015.8348%2012.3467%2015.9156%2012.3751%2015.9999C12.4029%2016.0832%2012.4293%2016.1666%2012.4552%2016.2499C12.8182%2017.4165%2013.0001%2018.5832%2013.0001%2019.7499C13.0001%2020.0832%2012.8664%2020.4166%2012.5997%2020.7499C12.5331%2020.8331%2012.4584%2020.9166%2012.3751%2020.9999C12.3125%2021.0613%2012.2509%2021.1205%2012.1886%2021.1639C12.1261%2021.2072%2012.0642%2021.2313%2012.0001%2021.2313C11.9361%2021.2313%2011.8742%2021.2072%2011.8116%2021.1639C11.7494%2021.1205%2011.6878%2021.0613%2011.6251%2020.9999C11.5419%2020.9166%2011.4671%2020.8331%2011.4005%2020.7499C11.1339%2020.4165%2011.0001%2020.0832%2011.0001%2019.7499C11.0001%2018.5832%2011.1821%2017.4165%2011.545%2016.2499C11.571%2016.1666%2011.5974%2016.0831%2011.6251%2015.9999C11.6536%2015.9157%2011.6987%2015.8348%2011.7657%2015.7753C11.8327%2015.7157%2011.9152%2015.6825%2012.0001%2015.6825ZM4.25501%2010.995C5.42165%2010.995%206.58836%2011.177%207.75501%2011.5399C7.83827%2011.5658%207.92174%2011.5922%208.00501%2011.62C8.08923%2011.6484%208.17006%2011.6936%208.22962%2011.7606C8.28914%2011.8276%208.32239%2011.9101%208.32239%2011.995C8.32237%2012.0799%208.28916%2012.1624%208.22962%2012.2294C8.17005%2012.2964%208.08924%2012.3416%208.00501%2012.37C7.92173%2012.3978%207.83828%2012.4242%207.75501%2012.4501C6.58836%2012.813%205.42165%2012.995%204.25501%2012.995C3.92169%2012.995%203.58832%2012.8612%203.25501%2012.5946C3.17176%2012.528%203.08826%2012.4532%203.00501%2012.37C2.94356%2012.3074%202.8844%2012.2457%202.84094%2012.1835C2.79764%2012.1209%202.77358%2012.059%202.77356%2011.995C2.77356%2011.9309%202.79763%2011.8691%202.84094%2011.8065C2.88441%2011.7442%202.94354%2011.6826%203.00501%2011.62C3.08828%2011.5367%203.17174%2011.462%203.25501%2011.3954C3.58834%2011.1287%203.92168%2010.995%204.25501%2010.995ZM19.755%2010.995C20.0883%2010.995%2020.4217%2011.1287%2020.755%2011.3954C20.8383%2011.462%2020.9218%2011.5367%2021.005%2011.62C21.0665%2011.6826%2021.1256%2011.7443%2021.1691%2011.8065C21.2124%2011.869%2021.2365%2011.931%2021.2365%2011.995C21.2364%2012.059%2021.2124%2012.1209%2021.1691%2012.1835C21.1256%2012.2457%2021.0665%2012.3074%2021.005%2012.37C20.9217%2012.4533%2020.8383%2012.528%2020.755%2012.5946C20.4217%2012.8613%2020.0883%2012.995%2019.755%2012.995C18.5884%2012.995%2017.4216%2012.813%2016.255%2012.4501C16.1717%2012.4242%2016.0883%2012.3977%2016.005%2012.37C15.9208%2012.3416%2015.84%2012.2964%2015.7804%2012.2294C15.7208%2012.1624%2015.6876%2012.0799%2015.6876%2011.995C15.6876%2011.9101%2015.7208%2011.8276%2015.7804%2011.7606C15.84%2011.6936%2015.9208%2011.6484%2016.005%2011.62C16.0883%2011.5922%2016.1717%2011.5658%2016.255%2011.5399C17.4217%2011.177%2018.5884%2010.995%2019.755%2010.995ZM3.01184%202.71179C3.09401%202.70274%203.18121%202.71636%203.26575%202.73523C3.41876%202.77056%203.5659%202.81217%203.70715%202.85925C4.27268%203.04778%204.74416%203.32991%205.12122%203.70691C6.44101%205.0267%207.63224%206.47524%208.69544%208.05163C8.77135%208.16419%208.84739%208.27761%208.922%208.39148C8.97197%208.46809%209.00252%208.55924%208.99915%208.65222C8.99566%208.74517%208.95911%208.8319%208.89563%208.89538C8.83214%208.95887%208.74542%208.99541%208.65247%208.9989C8.55948%209.00228%208.46834%208.97173%208.39172%208.92175C8.27786%208.84715%208.16444%208.7711%208.05188%208.69519C6.47549%207.63199%205.02695%206.44076%203.70715%205.12097C3.33016%204.74391%203.04803%204.27243%202.8595%203.70691C2.81239%203.56559%202.76984%203.41859%202.7345%203.2655C2.71563%203.18097%202.70298%203.09377%202.71204%203.0116C2.72122%202.92955%202.75295%202.85838%202.80579%202.80554C2.85864%202.7527%202.92979%202.72096%203.01184%202.71179ZM20.4738%202.71179C20.5558%202.72098%2020.627%202.75272%2020.6798%202.80554C20.7326%202.85838%2020.7644%202.92957%2020.7736%203.0116C20.7826%203.09377%2020.769%203.18097%2020.7501%203.2655C20.7148%203.41851%2020.6732%203.56566%2020.6261%203.70691C20.4376%204.2724%2020.1554%204.74392%2019.7784%205.12097C18.4587%206.44074%2017.0101%207.63201%2015.4337%208.69519C15.3212%208.77108%2015.2077%208.84716%2015.0939%208.92175C15.0172%208.9718%2014.9253%209.00238%2014.8322%208.9989C14.7394%208.9953%2014.6533%208.95873%2014.59%208.89538C14.5265%208.8319%2014.4899%208.74517%2014.4865%208.65222C14.4831%208.55924%2014.5136%208.46809%2014.5636%208.39148C14.6382%208.27763%2014.7143%208.16417%2014.7902%208.05163C15.8533%206.47527%2017.0446%205.02668%2018.3644%203.70691C18.7414%203.32994%2019.213%203.04777%2019.7784%202.85925C19.9197%202.81217%2020.0668%202.77055%2020.2198%202.73523C20.3044%202.71636%2020.3916%202.70274%2020.4738%202.71179ZM12.0001%202.76843C12.0642%202.76845%2012.1261%202.79251%2012.1886%202.83581C12.2509%202.87928%2012.3125%202.93841%2012.3751%202.99988C12.4584%203.08314%2012.5331%203.16661%2012.5997%203.24988C12.8664%203.58319%2013.0001%203.91656%2013.0001%204.24988C13.0001%205.41652%2012.8181%206.58323%2012.4552%207.74988C12.4293%207.83314%2012.4029%207.91661%2012.3751%207.99988C12.3467%208.0841%2012.3015%208.16492%2012.2345%208.22449C12.1675%208.28403%2012.085%208.31724%2012.0001%208.31726C11.9152%208.31726%2011.8327%208.28405%2011.7657%208.22449C11.6987%208.16491%2011.6536%208.08413%2011.6251%207.99988C11.5974%207.9166%2011.571%207.83315%2011.545%207.74988C11.1821%206.58322%2011.0001%205.41653%2011.0001%204.24988C11.0001%203.91656%2011.1339%203.58319%2011.4005%203.24988C11.4671%203.16663%2011.5419%203.08312%2011.6251%202.99988C11.6877%202.93843%2011.7494%202.87926%2011.8116%202.83581C11.8742%202.79253%2011.9361%202.76843%2012.0001%202.76843Z'%20fill='currentColor'/%3e%3c/g%3e%3c/svg%3e", Mo = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='HarmonyOS%20Icon'%3e%3cpath%20id='Union'%20d='M12%2015.6738C12.0871%2015.6738%2012.1717%2015.7083%2012.2393%2015.7695C12.3067%2015.8307%2012.3507%2015.9135%2012.375%2016C12.4028%2016.0999%2012.4292%2016.1999%2012.4551%2016.2998C12.818%2017.6998%2013%2019.1%2013%2020.5C13%2020.9%2012.8663%2021.3002%2012.5996%2021.7002C12.533%2021.8001%2012.4582%2021.9001%2012.375%2022C12.3188%2022.0663%2012.2614%2022.1299%2012.1982%2022.1768C12.1349%2022.2236%2012.0686%2022.25%2012%2022.25C11.9314%2022.25%2011.8651%2022.2236%2011.8018%2022.1768C11.7386%2022.1299%2011.6812%2022.0663%2011.625%2022C11.5418%2021.9001%2011.467%2021.8001%2011.4004%2021.7002C11.1337%2021.3002%2011%2020.9%2011%2020.5C11%2019.1%2011.182%2017.6998%2011.5449%2016.2998C11.5708%2016.1999%2011.5972%2016.0999%2011.625%2016C11.6493%2015.9135%2011.6933%2015.8307%2011.7607%2015.7695C11.8283%2015.7083%2011.9129%2015.6738%2012%2015.6738ZM9.16699%2014.4932C9.258%2014.4976%209.34178%2014.5332%209.40332%2014.5947C9.46485%2014.6563%209.50039%2014.7401%209.50488%2014.8311C9.50929%2014.9219%209.48235%2015.0116%209.43848%2015.0898C9.38753%2015.18%209.33545%2015.2696%209.2832%2015.3584C8.54993%2016.605%207.68816%2017.7239%206.69824%2018.7139C6.4154%2018.9967%206.03781%2019.185%205.56641%2019.2793C5.44867%2019.3028%205.3248%2019.3212%205.19531%2019.333C5.10879%2019.3401%205.02298%2019.3445%204.94531%2019.333C4.8676%2019.3213%204.80235%2019.2926%204.75391%2019.2441C4.70547%2019.1957%204.67673%2019.1305%204.66504%2019.0527C4.65357%2018.975%204.65794%2018.8893%204.66504%2018.8027C4.67681%2018.6732%204.69522%2018.5494%204.71875%2018.4316C4.81303%2017.9603%205.00135%2017.5826%205.28418%2017.2998C6.27411%2016.3099%207.39308%2015.4481%208.63965%2014.7148C8.72849%2014.6626%208.81806%2014.6105%208.9082%2014.5596C8.98647%2014.5157%209.07612%2014.4888%209.16699%2014.4932ZM14.8428%2014.4932C14.9336%2014.4888%2015.0233%2014.5157%2015.1016%2014.5596C15.1918%2014.6106%2015.2821%2014.6625%2015.3711%2014.7148C16.6175%2015.4481%2017.7357%2016.31%2018.7256%2017.2998C19.0084%2017.5826%2019.1967%2017.9602%2019.291%2018.4316C19.3145%2018.5494%2019.333%2018.6732%2019.3447%2018.8027C19.3518%2018.8892%2019.3562%2018.9751%2019.3447%2019.0527C19.333%2019.1304%2019.3043%2019.1957%2019.2559%2019.2441C19.2074%2019.2925%2019.1422%2019.3213%2019.0645%2019.333C18.9867%2019.3445%2018.9011%2019.3401%2018.8145%2019.333C18.685%2019.3212%2018.5611%2019.3028%2018.4434%2019.2793C17.972%2019.185%2017.5943%2018.9967%2017.3115%2018.7139C16.3216%2017.724%2015.4608%2016.6049%2014.7275%2015.3584C14.6752%2015.2694%2014.6223%2015.1801%2014.5713%2015.0898C14.5274%2015.0116%2014.5005%2014.9219%2014.5049%2014.8311C14.5093%2014.74%2014.5449%2014.6553%2014.6064%2014.5938C14.6679%2014.5325%2014.752%2014.4977%2014.8428%2014.4932ZM3.5%2011C4.9%2011%206.3002%2011.182%207.7002%2011.5449C7.8001%2011.5708%207.9001%2011.5972%208%2011.625C8.08648%2011.6493%208.16926%2011.6933%208.23047%2011.7607C8.2917%2011.8283%208.32617%2011.9129%208.32617%2012C8.32617%2012.0871%208.2917%2012.1717%208.23047%2012.2393C8.16926%2012.3067%208.08648%2012.3507%208%2012.375C7.9001%2012.4028%207.8001%2012.4292%207.7002%2012.4551C6.3002%2012.818%204.9%2013%203.5%2013C3.1%2013%202.6998%2012.8663%202.2998%2012.5996C2.19991%2012.533%202.09989%2012.4582%202%2012.375C1.9337%2012.3188%201.87013%2012.2614%201.82324%2012.1982C1.77644%2012.1349%201.75%2012.0686%201.75%2012C1.75%2011.9314%201.77644%2011.8651%201.82324%2011.8018C1.87013%2011.7386%201.9337%2011.6812%202%2011.625C2.09989%2011.5418%202.19991%2011.467%202.2998%2011.4004C2.6998%2011.1337%203.1%2011%203.5%2011ZM20.5%2011C20.9%2011%2021.3002%2011.1337%2021.7002%2011.4004C21.8001%2011.467%2021.9001%2011.5418%2022%2011.625C22.0663%2011.6812%2022.1299%2011.7386%2022.1768%2011.8018C22.2236%2011.8651%2022.25%2011.9314%2022.25%2012C22.25%2012.0686%2022.2236%2012.1349%2022.1768%2012.1982C22.1299%2012.2614%2022.0663%2012.3188%2022%2012.375C21.9001%2012.4582%2021.8001%2012.533%2021.7002%2012.5996C21.3002%2012.8663%2020.9%2013%2020.5%2013C19.1%2013%2017.6998%2012.818%2016.2998%2012.4551C16.1999%2012.4292%2016.0999%2012.4028%2016%2012.375C15.9135%2012.3507%2015.8307%2012.3067%2015.7695%2012.2393C15.7083%2012.1717%2015.6738%2012.0871%2015.6738%2012C15.6738%2011.9129%2015.7083%2011.8283%2015.7695%2011.7607C15.8307%2011.6933%2015.9135%2011.6493%2016%2011.625C16.0999%2011.5972%2016.1999%2011.5708%2016.2998%2011.5449C17.6998%2011.182%2019.1%2011%2020.5%2011ZM5.20215%204.66016C5.33165%204.67193%205.4555%204.69033%205.57324%204.71387C6.04458%204.80816%206.42227%204.99648%206.70508%205.2793C7.69489%206.26915%208.55682%207.38735%209.29004%208.63379C9.34236%208.72275%209.39429%208.81306%209.44531%208.90332C9.48913%208.98154%209.51612%209.07132%209.51172%209.16211C9.5072%209.25304%209.47165%209.33695%209.41016%209.39844C9.34865%209.45992%209.26478%209.4955%209.17383%209.5C9.08302%209.50441%208.99326%209.47742%208.91504%209.43359C8.82481%209.3826%208.7354%209.32965%208.64648%209.27734C7.39998%208.54411%206.28091%207.68321%205.29102%206.69336C5.00822%206.41056%204.81988%206.03282%204.72559%205.56152C4.70205%205.44378%204.68365%205.31993%204.67188%205.19043C4.66476%205.10382%204.6604%205.01817%204.67188%204.94043C4.68356%204.86264%204.71228%204.79751%204.76074%204.74902C4.80921%204.70056%204.87438%204.67185%204.95215%204.66016C5.02987%204.64869%205.11557%204.65305%205.20215%204.66016ZM19.0576%204.66016C19.1354%204.67185%2019.2006%204.70056%2019.249%204.74902C19.2975%204.7975%2019.3262%204.86265%2019.3379%204.94043C19.3494%205.01815%2019.345%205.10385%2019.3379%205.19043C19.3261%205.31993%2019.3077%205.44378%2019.2842%205.56152C19.1899%206.03285%2019.0016%206.41055%2018.7188%206.69336C17.7289%207.68322%2016.6098%208.54507%2015.3633%209.27832C15.2745%209.33054%2015.1848%209.38267%2015.0947%209.43359C15.0165%209.47743%2014.9268%209.50441%2014.8359%209.5C14.745%209.4955%2014.6611%209.45994%2014.5996%209.39844C14.5381%209.33693%2014.5026%209.25307%2014.498%209.16211C14.4936%209.0713%2014.5206%208.98155%2014.5645%208.90332C14.6154%208.81323%2014.6675%208.72355%2014.7197%208.63477C15.453%207.38825%2016.3148%206.2692%2017.3047%205.2793C17.5875%204.99648%2017.9652%204.80816%2018.4365%204.71387C18.5543%204.69033%2018.6781%204.67193%2018.8076%204.66016C18.8942%204.65305%2018.9799%204.64869%2019.0576%204.66016ZM12%201.75C12.0686%201.75%2012.1349%201.77644%2012.1982%201.82324C12.2614%201.87013%2012.3188%201.9337%2012.375%202C12.4582%202.09989%2012.533%202.19991%2012.5996%202.2998C12.8663%202.6998%2013%203.1%2013%203.5C13%204.9%2012.818%206.3002%2012.4551%207.7002C12.4292%207.8001%2012.4028%207.9001%2012.375%208C12.3507%208.08648%2012.3067%208.16926%2012.2393%208.23047C12.1717%208.2917%2012.0871%208.32617%2012%208.32617C11.9129%208.32617%2011.8283%208.2917%2011.7607%208.23047C11.6933%208.16926%2011.6493%208.08648%2011.625%208C11.5972%207.9001%2011.5708%207.8001%2011.5449%207.7002C11.182%206.3002%2011%204.9%2011%203.5C11%203.1%2011.1337%202.6998%2011.4004%202.2998C11.467%202.19991%2011.5418%202.09989%2011.625%202C11.6812%201.9337%2011.7386%201.87013%2011.8018%201.82324C11.8651%201.77644%2011.9314%201.75%2012%201.75Z'%20fill='currentColor'/%3e%3c/g%3e%3c/svg%3e", xo = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='HarmonyOS%20Icon'%3e%3cpath%20id='Union'%20d='M12.2031%2017.9033C12.2849%2017.9033%2012.3645%2017.9351%2012.4307%2017.9922C12.4969%2018.0494%2012.544%2018.1271%2012.5781%2018.208C12.6059%2018.2747%2012.6323%2018.3415%2012.6582%2018.4082C13.0212%2019.3415%2013.2031%2020.2747%2013.2031%2021.208C13.2031%2021.4747%2013.0694%2021.7411%2012.8027%2022.0078C12.7361%2022.0744%2012.6614%2022.1414%2012.5781%2022.208C12.5078%2022.2631%2012.4403%2022.3155%2012.3789%2022.3545C12.3169%2022.3934%2012.2612%2022.416%2012.2031%2022.416C12.145%2022.416%2012.0893%2022.3934%2012.0273%2022.3545C11.9659%2022.3155%2011.8984%2022.2631%2011.8281%2022.208C11.7448%2022.1414%2011.6702%2022.0744%2011.6035%2022.0078C11.3368%2021.7411%2011.2031%2021.4747%2011.2031%2021.208C11.2031%2020.2747%2011.3851%2019.3415%2011.748%2018.4082C11.774%2018.3415%2011.8003%2018.2747%2011.8281%2018.208C11.8623%2018.1271%2011.9093%2018.0494%2011.9756%2017.9922C12.0418%2017.9351%2012.1213%2017.9033%2012.2031%2017.9033ZM7.9541%2016.1338C8.04109%2016.1403%208.12001%2016.1737%208.17773%2016.2314C8.23545%2016.2892%208.26887%2016.3681%208.27539%2016.4551C8.2818%2016.5422%208.26044%2016.6307%208.22754%2016.7119C8.20011%2016.7785%208.17131%2016.8449%208.14258%2016.9102C7.73931%2017.8267%207.20772%2018.6155%206.54785%2019.2754C6.35932%2019.4639%206.07625%2019.5576%205.69922%2019.5576C5.60498%2019.5576%205.50445%2019.5528%205.39844%2019.541C5.30991%2019.5303%205.22519%2019.5197%205.1543%2019.5039C5.08294%2019.4876%205.02741%2019.4639%204.98633%2019.4229C4.94525%2019.3818%204.92156%2019.3263%204.90527%2019.2549C4.88945%2019.184%204.87886%2019.0993%204.86816%2019.0107C4.85638%2018.9047%204.85059%2018.8042%204.85059%2018.71C4.85061%2018.3329%204.94525%2018.0499%205.13379%2017.8613C5.79371%2017.2015%206.5825%2016.6699%207.49902%2016.2666C7.56424%2016.2379%207.62977%2016.209%207.69629%2016.1816C7.77762%2016.1486%207.86681%2016.1274%207.9541%2016.1338ZM16.4629%2016.1338C16.5501%2016.1274%2016.6385%2016.1486%2016.7197%2016.1816C16.7865%2016.2091%2016.8525%2016.2378%2016.918%2016.2666C17.8345%2016.6699%2018.6233%2017.2014%2019.2832%2017.8613C19.4716%2018.0499%2019.5654%2018.333%2019.5654%2018.71C19.5654%2018.8042%2019.5596%2018.9047%2019.5479%2019.0107C19.5372%2019.0993%2019.5266%2019.184%2019.5107%2019.2549C19.4945%2019.3262%2019.4708%2019.3818%2019.4297%2019.4229C19.3886%2019.4638%2019.333%2019.4867%2019.2617%2019.5029C19.1908%2019.5188%2019.1062%2019.5303%2019.0176%2019.541C18.9116%2019.5528%2018.811%2019.5576%2018.7168%2019.5576C18.3399%2019.5575%2018.0567%2019.4639%2017.8682%2019.2754C17.2083%2018.6155%2016.6777%2017.8266%2016.2744%2016.9102C16.2456%2016.8447%2016.2169%2016.7786%2016.1895%2016.7119C16.1565%2016.6306%2016.1342%2016.5423%2016.1406%2016.4551C16.1471%2016.368%2016.1815%2016.2892%2016.2393%2016.2314C16.2971%2016.1738%2016.3759%2016.1402%2016.4629%2016.1338ZM3.20801%2011.2031C4.14134%2011.2031%205.07448%2011.3851%206.00781%2011.748C6.07447%2011.774%206.14136%2011.8004%206.20801%2011.8281C6.28886%2011.8623%206.36665%2011.9093%206.42383%2011.9756C6.48088%2012.0418%206.5127%2012.1214%206.5127%2012.2031C6.51266%2012.2849%206.48089%2012.3645%206.42383%2012.4307C6.36665%2012.4969%206.28885%2012.544%206.20801%2012.5781C6.14136%2012.6059%206.07446%2012.6323%206.00781%2012.6582C5.0745%2013.0212%204.14132%2013.2031%203.20801%2013.2031C2.94136%2013.2031%202.67485%2013.0694%202.4082%2012.8027C2.34159%2012.7361%202.27462%2012.6614%202.20801%2012.5781C2.15291%2012.5079%202.1005%2012.4403%202.06152%2012.3789C2.0226%2012.317%202.00003%2012.2612%202%2012.2031C2%2012.1451%202.02261%2012.0893%202.06152%2012.0273C2.10049%2011.966%202.15291%2011.8984%202.20801%2011.8281C2.27462%2011.7449%202.34159%2011.6701%202.4082%2011.6035C2.67487%2011.3368%202.94134%2011.2031%203.20801%2011.2031ZM21.208%2011.2031C21.4747%2011.2031%2021.7411%2011.3368%2022.0078%2011.6035C22.0744%2011.6701%2022.1414%2011.7449%2022.208%2011.8281C22.2631%2011.8984%2022.3155%2011.966%2022.3545%2012.0273C22.3934%2012.0893%2022.416%2012.1451%2022.416%2012.2031C22.416%2012.2612%2022.3934%2012.317%2022.3545%2012.3789C22.3155%2012.4403%2022.2631%2012.5079%2022.208%2012.5781C22.1414%2012.6614%2022.0744%2012.7361%2022.0078%2012.8027C21.7412%2013.0694%2021.4747%2013.2031%2021.208%2013.2031C20.2747%2013.2031%2019.3415%2013.0212%2018.4082%2012.6582C18.3416%2012.6323%2018.2747%2012.6059%2018.208%2012.5781C18.1272%2012.544%2018.0494%2012.4969%2017.9922%2012.4307C17.9351%2012.3645%2017.9034%2012.2849%2017.9033%2012.2031C17.9033%2012.1214%2017.9351%2012.0418%2017.9922%2011.9756C18.0494%2011.9093%2018.1272%2011.8623%2018.208%2011.8281C18.2747%2011.8004%2018.3416%2011.774%2018.4082%2011.748C19.3415%2011.3851%2020.2747%2011.2031%2021.208%2011.2031ZM5.70605%204.85059C6.08313%204.8506%206.36614%204.94524%206.55469%205.13379C7.21449%205.79365%207.74616%206.58164%208.14941%207.49805C8.17819%207.56345%208.2069%207.62958%208.23438%207.69629C8.26736%207.77749%208.28854%207.86597%208.28223%207.95312C8.27579%208.04031%208.2424%208.11991%208.18457%208.17773C8.12683%208.23543%208.04793%208.26888%207.96094%208.27539C7.87372%208.28181%207.78538%208.25955%207.7041%208.22656C7.63736%208.19908%207.57129%208.17039%207.50586%208.1416C6.58934%207.73833%205.80055%207.20772%205.14062%206.54785C4.9521%206.35933%204.85844%206.07622%204.8584%205.69922C4.8584%205.60498%204.86322%205.50445%204.875%205.39844C4.8857%205.30991%204.89629%205.22519%204.91211%205.1543C4.92839%205.08297%204.95213%205.0274%204.99316%204.98633C5.03424%204.94525%205.08977%204.92156%205.16113%204.90527C5.23202%204.88945%205.31673%204.87886%205.40527%204.86816C5.51129%204.85638%205.61181%204.85059%205.70605%204.85059ZM18.71%204.85059C18.8042%204.85059%2018.9047%204.85638%2019.0107%204.86816C19.0993%204.87886%2019.184%204.88945%2019.2549%204.90527C19.3263%204.92156%2019.3818%204.94525%2019.4229%204.98633C19.4639%205.0274%2019.4876%205.08296%2019.5039%205.1543C19.5197%205.22519%2019.5303%205.30991%2019.541%205.39844C19.5528%205.50445%2019.5576%205.60498%2019.5576%205.69922C19.5576%206.07625%2019.4639%206.35932%2019.2754%206.54785C18.6155%207.20773%2017.8267%207.7393%2016.9102%208.14258C16.8448%208.17132%2016.7785%208.20011%2016.7119%208.22754C16.6307%208.26046%2016.5422%208.2818%2016.4551%208.27539C16.3681%208.26888%2016.2892%208.23545%2016.2314%208.17773C16.1737%208.12001%2016.1403%208.04109%2016.1338%207.9541C16.1274%207.86681%2016.1486%207.77762%2016.1816%207.69629C16.209%207.62977%2016.2379%207.56424%2016.2666%207.49902C16.6699%206.58249%2017.2014%205.79372%2017.8613%205.13379C18.0499%204.94524%2018.3329%204.8506%2018.71%204.85059ZM12.2031%202C12.2612%202%2012.3169%202.02258%2012.3789%202.06152C12.4403%202.1005%2012.5078%202.15288%2012.5781%202.20801C12.6614%202.27464%2012.7361%202.34157%2012.8027%202.4082C13.0694%202.67487%2013.2031%202.94134%2013.2031%203.20801C13.2031%204.14134%2013.0212%205.07448%2012.6582%206.00781C12.6323%206.07448%2012.6059%206.14134%2012.5781%206.20801C12.544%206.28888%2012.4969%206.36664%2012.4307%206.42383C12.3645%206.48092%2012.2849%206.5127%2012.2031%206.5127C12.1213%206.5127%2012.0418%206.48092%2011.9756%206.42383C11.9093%206.36664%2011.8623%206.28888%2011.8281%206.20801C11.8003%206.14134%2011.774%206.07448%2011.748%206.00781C11.3851%205.07448%2011.2031%204.14134%2011.2031%203.20801C11.2031%202.94134%2011.3368%202.67487%2011.6035%202.4082C11.6702%202.34157%2011.7448%202.27464%2011.8281%202.20801C11.8984%202.15288%2011.9659%202.1005%2012.0273%202.06152C12.0893%202.02258%2012.145%202%2012.2031%202Z'%20fill='currentColor'/%3e%3c/g%3e%3c/svg%3e", No = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%20fill='none'%20stroke='currentColor'%20stroke-width='1.4'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3cpath%20d='M14.5%203.2a3%203%200%200%201%203%200l9%205.2A3%203%200%200%201%2028%2011v10a3%203%200%200%201-1.5%202.6l-9%205.2a3%203%200%200%201-3%200l-9-5.2A3%203%200%200%201%204%2021V11a3%203%200%200%201%201.5-2.6Z'/%3e%3cpath%20d='m11.5%2021%204.5-10%204.5%2010m-7.4-3.5h5.8'/%3e%3c/svg%3e", Lo = "_icon_wrtjh_2", Eo = {
  icon: Lo
}, Ao = [
  "arrow-down",
  "unselected",
  "chevron-left",
  "selected",
  "delete",
  "waitlist-message",
  "creative",
  "ultimate",
  "standard",
  "minimal",
  "reasoning-auto",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "arrow-up-right",
  "battery-full",
  "bell",
  "book-open",
  "book-search",
  "browser",
  "calendar-clock",
  "check-circle",
  "check-fill",
  "check-line",
  "chevron-down",
  "chevron-right",
  "chevron-up",
  "circle",
  "circle-arrow-right",
  "clock",
  "code",
  "command-mac",
  "commit",
  "device-mac",
  "download",
  "duplicate",
  "edit",
  "extension",
  "eye",
  "file-search-corner",
  "file-text",
  "file-up",
  "file-x-2",
  "files",
  "filter",
  "floating-window",
  "folder",
  "folder-open",
  "folder-search",
  "galaxy",
  "gear",
  "git",
  "git-pull-request",
  "history",
  "hourglass",
  "image",
  "info",
  "layers",
  "layers-plus",
  "level",
  "link",
  "list-todo",
  "message-circle-question",
  "message-square",
  "mic",
  "mini-app",
  "more",
  "mouse-pointer",
  "palette",
  "panels-top-left",
  "pin",
  "plus",
  "plug",
  "progress-25",
  "refresh",
  "route",
  "search",
  "scan-eye",
  "session",
  "settings",
  "show-session",
  "side-chat",
  "sidebar-left",
  "sidebar-right",
  "spark",
  "split",
  "square-terminal",
  "star",
  "store",
  "terminal",
  "target",
  "text-search",
  "thinking",
  "turn",
  "upload",
  "user",
  "users",
  "wrench",
  "workflow",
  "xmark"
], Do = { download: "arrow-down", circle: "unselected" }, Qs = Ao.filter((o) => o !== "turn" && !(o in Do)).sort(), $o = {
  creative: wo,
  ultimate: ko,
  standard: Mo,
  minimal: xo,
  git: Co,
  thinking: _o,
  "reasoning-auto": No
}, C2 = {
  "arrow-down": b2,
  unselected: Xe,
  "chevron-left": y0,
  selected: Ge,
  delete: Hn,
  "waitlist-message": $1,
  "arrow-left": Wt,
  "arrow-right": Gt,
  "arrow-up": Jt,
  "arrow-up-right": Yt,
  "battery-full": t0,
  bell: o0,
  "book-open": i0,
  "book-search": l0,
  browser: s1,
  "calendar-clock": u0,
  "check-circle": Ge,
  "check-fill": Ge,
  "check-line": O2,
  "chevron-down": p0,
  "chevron-right": v0,
  "chevron-up": C0,
  circle: Xe,
  "circle-arrow-right": k0,
  clock: L0,
  "git-pull-request": o1,
  history: i1,
  target: Tn,
  users: Wn,
  code: A0,
  "command-mac": $0,
  commit: t1,
  "device-mac": R1,
  download: b2,
  duplicate: O0,
  edit: J1,
  extension: cn,
  eye: q0,
  "file-search-corner": z0,
  "file-text": R0,
  "file-up": j0,
  "file-x-2": U0,
  files: W0,
  filter: b1,
  "floating-window": Bt,
  folder: J0,
  "folder-open": G0,
  "folder-search": Y0,
  galaxy: vo,
  gear: vn,
  hourglass: l1,
  image: u1,
  info: f1,
  layers: m1,
  "layers-plus": bo,
  level: wn,
  link: g1,
  "list-todo": _1,
  "message-circle-question": x1,
  "message-square": O1,
  mic: q1,
  "mini-app": s0,
  more: F0,
  "mouse-pointer": j1,
  palette: U1,
  "panels-top-left": Y1,
  pin: tn,
  plus: sn,
  plug: on,
  "progress-25": k1,
  refresh: dn,
  route: hn,
  search: yn,
  "scan-eye": pn,
  session: L1,
  settings: Cn,
  "show-session": F1,
  "side-chat": A1,
  "sidebar-left": W1,
  "sidebar-right": G1,
  spark: Mn,
  split: Nn,
  "square-terminal": En,
  star: Dn,
  store: Sn,
  terminal: Pn,
  "text-search": In,
  turn: Xe,
  upload: jn,
  user: Un,
  wrench: Yn,
  workflow: Gn,
  xmark: Jn
}, je = z(function({
  className: e,
  glyph: t,
  label: n,
  name: r,
  size: s = "lg",
  style: a,
  tone: c = "inherit",
  ...u
}, i) {
  const f = r ? $o[r] : void 0, _ = f ? `url("${f}")` : void 0, h = t ?? (r && r in C2 ? C2[r] : void 0), C = _ ? {
    ...a,
    WebkitMaskImage: _,
    maskImage: _
  } : a ?? {};
  return /* @__PURE__ */ l(
    "span",
    {
      ...u,
      "aria-hidden": n ? void 0 : "true",
      "aria-label": n,
      className: O(Eo.icon, e),
      "data-openbitfun-component": "icon",
      "data-openbitfun-name": r,
      "data-openbitfun-source": f ? "catalog" : "line",
      "data-openbitfun-artwork": r && r !== "progress-25" && r !== "turn" ? "monochrome" : void 0,
      "data-openbitfun-tone": c,
      "data-size": s,
      ref: i,
      role: n ? "img" : void 0,
      style: C,
      children: h ? /* @__PURE__ */ l(
        h,
        {
          "aria-hidden": "true",
          focusable: "false",
          strokeWidth: "var(--openbitfun-control-icon-stroke-width)"
        }
      ) : null
    }
  );
}), So = "_field_1tl8i_2", Oo = "_leading_1tl8i_60", To = "_trailing_1tl8i_60", Fo = "_input_1tl8i_69", Fe = {
  field: So,
  leading: Oo,
  trailing: To,
  input: Fo
}, Po = z(function({
  "aria-invalid": e,
  className: t,
  disabled: n,
  hideNativePasswordReveal: r = !1,
  invalid: s = !1,
  leading: a,
  onChange: c,
  onCompositionEnd: u,
  onCompositionStart: i,
  onKeyDown: f,
  onValueChange: _,
  shape: h = "rounded",
  size: C = "sm",
  trailing: b,
  type: g = "text",
  ...m
}, d) {
  const w = P2(m), N = A(!1), L = et(), E = (x) => {
    c?.(x), _?.(x.currentTarget.value);
  }, T = s ? !0 : e, W = T !== void 0 && T !== !1 && T !== "false";
  return /* @__PURE__ */ V(
    "span",
    {
      className: O(Fe.field, t),
      "data-openbitfun-component": "input",
      "data-disabled": n ? "true" : "false",
      "data-field-surface": L,
      "data-invalid": W ? "true" : "false",
      "data-shape": h,
      "data-size": C,
      children: [
        a != null && /* @__PURE__ */ l("span", { className: Fe.leading, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "leading", children: a }),
        /* @__PURE__ */ l(
          "input",
          {
            ...m,
            ...w,
            "aria-invalid": T,
            className: Fe.input,
            "data-hide-native-password-reveal": r ? "true" : void 0,
            disabled: n,
            onChange: E,
            onCompositionEnd: (x) => {
              N.current = !1, u?.(x);
            },
            onCompositionStart: (x) => {
              N.current = !0, i?.(x);
            },
            onKeyDown: (x) => {
              if ((x.key === "Enter" || x.key === "Escape") && Ne(x, N.current)) {
                x.stopPropagation();
                return;
              }
              f?.(x);
            },
            ref: d,
            type: g
          }
        ),
        b != null && /* @__PURE__ */ l("span", { className: Fe.trailing, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "trailing", children: b })
      ]
    }
  );
}), qo = "_root_1tj6w_2", Io = "_control_1tj6w_17", zo = "_input_1tj6w_27", Ho = "_circle_1tj6w_38", Ro = "_dot_1tj6w_52", Vo = "_content_1tj6w_94", jo = "_label_1tj6w_101", Bo = "_description_1tj6w_109", ge = {
  root: qo,
  control: Io,
  input: zo,
  circle: Ho,
  dot: Ro,
  content: Vo,
  label: jo,
  description: Bo
}, Js = z(function({
  checked: e,
  children: t,
  className: n,
  defaultChecked: r,
  description: s,
  disabled: a = !1,
  invalid: c = !1,
  label: u,
  onChange: i,
  onCheckedChange: f,
  readOnly: _ = !1,
  size: h = "md",
  ...C
}, b) {
  const g = u !== void 0 || s !== void 0 || t !== void 0;
  return /* @__PURE__ */ V(
    "label",
    {
      className: O(ge.root, n),
      "data-openbitfun-component": "radio",
      "data-disabled": a ? "true" : "false",
      "data-invalid": c ? "true" : "false",
      "data-readonly": _ ? "true" : "false",
      "data-size": h,
      children: [
        /* @__PURE__ */ V("span", { className: ge.control, "data-openbitfun-part": "control", children: [
          /* @__PURE__ */ l(
            "input",
            {
              ...C,
              "aria-invalid": c || void 0,
              checked: e,
              className: ge.input,
              defaultChecked: r,
              disabled: a || _,
              onChange: (m) => {
                i?.(m), m.defaultPrevented || f?.(m.currentTarget.checked);
              },
              ref: b,
              type: "radio"
            }
          ),
          /* @__PURE__ */ l("span", { "aria-hidden": "true", className: ge.circle, "data-openbitfun-part": "circle", children: /* @__PURE__ */ l("span", { className: ge.dot }) })
        ] }),
        g && /* @__PURE__ */ V("span", { className: ge.content, "data-openbitfun-part": "content", children: [
          u !== void 0 && /* @__PURE__ */ l("span", { className: ge.label, children: u }),
          s !== void 0 && /* @__PURE__ */ l("span", { className: ge.description, children: s }),
          t
        ] })
      ]
    }
  );
}), Uo = pe(null), Zo = "_button_1ftlb_2", Wo = "_icon_1ftlb_150", Ko = "_progress_1ftlb_151", Ye = {
  button: Zo,
  icon: Wo,
  progress: Ko
}, Be = z(function({
  "aria-label": e,
  className: t,
  disabled: n,
  icon: r,
  loading: s = !1,
  shape: a = "square",
  size: c = "sm",
  tone: u = "neutral",
  type: i = "button",
  variant: f = "quiet",
  ..._
}, h) {
  const C = Ce(Uo), b = C ? "glass" : f;
  return /* @__PURE__ */ V(
    "button",
    {
      ..._,
      "aria-busy": s || void 0,
      "aria-label": e,
      className: O(Ye.button, b === "glass" && T2.surface, t),
      "data-openbitfun-component": "icon-button",
      "data-openbitfun-shape": C ? "circle" : a,
      "data-openbitfun-tone": u,
      "data-openbitfun-variant": b,
      "data-loading": s ? "true" : "false",
      "data-size": C ?? c,
      disabled: n || s,
      ref: h,
      type: i,
      children: [
        /* @__PURE__ */ l("span", { "aria-hidden": "true", className: Ye.progress, "data-openbitfun-part": "progress" }),
        /* @__PURE__ */ l("span", { "aria-hidden": "true", className: Ye.icon, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "icon", children: r })
      ]
    }
  );
}), Go = "_root_fgv2f_2", Xo = {
  root: Go
}, Yo = z(
  function({
    className: e,
    "data-openbitfun-component": t = "scroll-area",
    "data-openbitfun-part": n = "viewport",
    edgeFade: r = "none",
    orientation: s = "vertical",
    overscrollBehaviorY: a = "contain",
    scrollbarVisibility: c = "auto",
    ...u
  }, i) {
    const f = A(null), _ = R((h) => {
      f.current = h, typeof i == "function" ? i(h) : i && (i.current = h);
    }, [i]);
    return B(() => {
      const h = f.current;
      if (!h || r !== "vertical" || s === "horizontal") return;
      let C = "";
      const b = () => {
        const { clientHeight: L, clientWidth: E, offsetHeight: T, offsetWidth: W, scrollHeight: x, scrollTop: P } = h, D = L > 0 && x - L > 1, S = D && P > 1, K = D && P < x - L - 1, M = Math.max(0, W - E), F = Math.max(0, T - L), y = `${S}:${K}:${M}:${F}`;
        y !== C && (C = y, h.dataset.openbitfunFadeTop = String(S), h.dataset.openbitfunFadeBottom = String(K), h.style.setProperty("--_scroll-area-inline-gutter", `${M}px`), h.style.setProperty("--_scroll-area-block-gutter", `${F}px`));
      }, g = typeof ResizeObserver > "u" ? void 0 : new ResizeObserver(b), m = /* @__PURE__ */ new Set(), d = () => {
        const L = /* @__PURE__ */ new Set([h, ...h.children]);
        for (const E of m)
          L.has(E) || (g?.unobserve(E), m.delete(E));
        for (const E of L)
          m.has(E) || (g?.observe(E), m.add(E));
        b();
      }, w = typeof MutationObserver > "u" ? void 0 : new MutationObserver(d);
      w?.observe(h, { childList: !0, characterData: !0, subtree: !0 }), h.addEventListener("scroll", b, { passive: !0 });
      const N = h.ownerDocument.defaultView;
      return N?.addEventListener("resize", b), d(), () => {
        g?.disconnect(), w?.disconnect(), h.removeEventListener("scroll", b), N?.removeEventListener("resize", b), delete h.dataset.openbitfunFadeTop, delete h.dataset.openbitfunFadeBottom, h.style.removeProperty("--_scroll-area-inline-gutter"), h.style.removeProperty("--_scroll-area-block-gutter");
      };
    }, [r, s]), /* @__PURE__ */ l(
      "div",
      {
        ...u,
        className: O(Xo.root, e),
        "data-openbitfun-component": t,
        "data-openbitfun-edge-fade": r,
        "data-openbitfun-orientation": s,
        "data-openbitfun-overscroll-behavior-y": a,
        "data-openbitfun-part": n,
        "data-openbitfun-scrollbar-visibility": c,
        ref: _
      }
    );
  }
), Qo = "_root_jg49w_2", Jo = "_leading_jg49w_3", er = "_label_jg49w_4", Qe = {
  root: Qo,
  leading: Jo,
  label: er
}, ea = z(
  function({
    children: e,
    className: t,
    leading: n,
    tone: r = "success",
    shape: s = "pill",
    emphasis: a = !1,
    ...c
  }, u) {
    return /* @__PURE__ */ V(
      "span",
      {
        ...c,
        className: O(Qe.root, t),
        "data-openbitfun-component": "status-pill",
        "data-tone": r,
        "data-shape": s,
        "data-emphasis": a ? "true" : "false",
        ref: u,
        children: [
          n != null && /* @__PURE__ */ l("span", { "aria-hidden": "true", className: Qe.leading, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "leading", children: n }),
          /* @__PURE__ */ l(Ae, { className: Qe.label, "data-openbitfun-part": "label", children: e })
        ]
      }
    );
  }
), tr = "_root_1qhm4_2", nr = {
  root: tr
};
function ta({ active: o = !0, children: e, className: t, ...n }) {
  return /* @__PURE__ */ l(
    "span",
    {
      ...n,
      className: O(nr.root, t),
      "data-openbitfun-component": "shimmer-text",
      "data-openbitfun-part": "root",
      "data-active": o ? "true" : "false",
      children: e
    }
  );
}
const q2 = "(prefers-reduced-motion: reduce)";
function or(o) {
  const e = window.matchMedia?.(q2);
  return e?.addEventListener("change", o), () => e?.removeEventListener("change", o);
}
function rr() {
  return typeof window > "u" || !window.matchMedia ? !0 : window.matchMedia(q2).matches;
}
function sr() {
  return x2(or, rr, () => !0);
}
const ar = "_native_1fp35_2", ir = "_root_1fp35_6", cr = "_header_1fp35_11", lr = "_trigger_1fp35_29", dr = "_indicator_1fp35_58", ur = "_leading_1fp35_59", hr = "_heading_1fp35_78", fr = "_summary_1fp35_85", pr = "_description_1fp35_95", mr = "_actions_1fp35_104", yr = "_content_1fp35_112", gr = "_contentInner_1fp35_130", re = {
  native: ar,
  root: ir,
  header: cr,
  trigger: lr,
  indicator: dr,
  leading: ur,
  heading: hr,
  summary: fr,
  description: pr,
  actions: mr,
  content: yr,
  contentInner: gr
}, vr = z(
  function({
    actions: e,
    renderHeader: t,
    contentClassName: n,
    contentInnerClassName: r,
    unmountOnClose: s = !1,
    exitDurationMs: a = 180,
    children: c,
    className: u,
    defaultOpen: i = !1,
    description: f,
    disabled: _ = !1,
    leading: h,
    onOpenChange: C,
    open: b,
    presentation: g,
    summary: m,
    ...d
  }, w) {
    const N = be(), L = `openbitfun-disclosure-${N}-trigger`, E = `openbitfun-disclosure-${N}-content`, [T, W] = oe(i), x = b ?? T, P = Re(!x), [D, S] = oe(x);
    B(() => {
      if (x) {
        S(!0);
        return;
      }
      if (!D) return;
      const M = setTimeout(() => S(!1), Math.max(0, a));
      return () => clearTimeout(M);
    }, [x, D, a]);
    function K() {
      if (_) return;
      const M = !x;
      b === void 0 && W(M), C?.(M);
    }
    return /* @__PURE__ */ V(
      "section",
      {
        ...d,
        className: O(re.root, u),
        "data-openbitfun-component": "disclosure",
        "data-disabled": _ ? "true" : "false",
        "data-open": x ? "true" : "false",
        ref: w,
        children: [
          t ? t({
            "aria-controls": E,
            "aria-expanded": x,
            disabled: _,
            id: L,
            onClick: K,
            type: "button"
          }) : /* @__PURE__ */ V("div", { className: re.header, "data-openbitfun-part": "header", children: [
            /* @__PURE__ */ V(
              "button",
              {
                "data-overflow-trigger": !0,
                "aria-controls": E,
                "aria-expanded": x,
                className: re.trigger,
                disabled: _,
                id: L,
                onClick: K,
                type: "button",
                children: [
                  /* @__PURE__ */ l("span", { "aria-hidden": "true", className: re.indicator, "data-openbitfun-part": "indicator", children: /* @__PURE__ */ l(je, { name: "chevron-right", size: "sm" }) }),
                  h != null && /* @__PURE__ */ l("span", { "aria-hidden": "true", className: re.leading, "data-openbitfun-part": "leading", children: h }),
                  /* @__PURE__ */ V("span", { className: re.heading, "data-openbitfun-part": "heading", children: [
                    /* @__PURE__ */ l(Ae, { className: re.summary, "data-openbitfun-part": "summary", children: m }),
                    f != null && /* @__PURE__ */ l("span", { className: re.description, "data-openbitfun-part": "description", children: f })
                  ] })
                ]
              }
            ),
            e != null && /* @__PURE__ */ l("span", { className: re.actions, "data-openbitfun-part": "actions", children: e })
          ] }),
          (!s || x || D) && /* @__PURE__ */ l(
            "div",
            {
              ...P,
              "aria-hidden": !x,
              "aria-labelledby": L,
              className: O(re.content, n),
              "data-open": x ? "true" : "false",
              "data-openbitfun-part": "content",
              id: E,
              role: "region",
              children: /* @__PURE__ */ l("div", { className: O(re.contentInner, r), "data-openbitfun-part": "content-inner", children: c })
            }
          )
        ]
      }
    );
  }
), na = z(
  function(e, t) {
    if (e.presentation === "native") {
      const { children: n, className: r, presentation: s, summary: a, ...c } = e;
      return /* @__PURE__ */ V(
        "details",
        {
          ...c,
          className: O(re.native, r),
          "data-openbitfun-component": "disclosure",
          "data-presentation": s,
          ref: (u) => {
            typeof t == "function" ? t(u) : t && (t.current = u);
          },
          children: [
            /* @__PURE__ */ l("summary", { "data-openbitfun-part": "summary", children: a }),
            n
          ]
        }
      );
    }
    return /* @__PURE__ */ l(vr, { ...e, ref: t });
  }
);
function I2(o, e) {
  const [t, n] = oe(o), [r, s] = oe(o ? "entered" : "exiting"), a = A(t), c = A(r);
  c.current = r;
  const u = A(!1), i = A(null), f = sr(), _ = typeof window < "u" && typeof window.matchMedia == "function" && f;
  return B(() => {
    const h = u.current;
    u.current = o;
    const C = (d) => {
      c.current = d, s(d);
    }, b = () => {
      i.current = null, a.current = !1, n(!1);
    };
    if (!o && a.current && c.current === "exiting" && i.current !== null) {
      const d = typeof window > "u" ? null : window;
      if (!d) {
        b();
        return;
      }
      const w = Math.max(0, i.current - Date.now()), N = d.setTimeout(b, w);
      return () => d.clearTimeout(N);
    }
    if (_) {
      i.current = null, a.current = o, n(o), C(o ? "entered" : "exiting");
      return;
    }
    if (o) {
      i.current = null;
      const d = a.current;
      if (d || (a.current = !0, n(!0)), d && c.current === "exiting") {
        C("entered");
        return;
      }
      if (h && c.current !== "entering") return;
      C("entering");
      const w = typeof window > "u" ? null : window;
      if (!w) {
        C("entered");
        return;
      }
      let N = 0, L = 0;
      return N = w.requestAnimationFrame(() => {
        L = w.requestAnimationFrame(() => C("entered"));
      }), () => {
        w.cancelAnimationFrame(N), w.cancelAnimationFrame(L);
      };
    }
    if (!a.current) return;
    C("exiting"), i.current = Date.now() + e;
    const g = typeof window > "u" ? null : window;
    if (!g) {
      b();
      return;
    }
    const m = g.setTimeout(b, e);
    return () => g.clearTimeout(m);
  }, [e, o, _]), { present: t, state: r };
}
const br = "_overlay_o9tzm_2", Cr = "_surface_o9tzm_3", _r = "_header_o9tzm_4", wr = "_heading_o9tzm_5", kr = "_body_o9tzm_6", Mr = "_footer_o9tzm_7", xr = "_title_o9tzm_93", Nr = "_description_o9tzm_106", Lr = "_headerActions_o9tzm_116", Er = "_close_o9tzm_123", de = {
  overlay: br,
  surface: Cr,
  header: _r,
  heading: wr,
  body: kr,
  footer: Mr,
  title: xr,
  description: Nr,
  headerActions: Lr,
  close: Er
}, Ar = 180, z2 = pe(null);
function d2(o) {
  const e = Ce(z2);
  if (!e) throw new Error(`${o} must be rendered inside Dialog or Sheet.`);
  return e;
}
function r2(o, e) {
  return a2.toArray(o).some((t) => {
    if (!X2(t)) return !1;
    if (t.type === e) return !0;
    const n = t.props.children;
    return n !== void 0 && r2(n, e);
  });
}
const H2 = z(function({
  "aria-describedby": e,
  "aria-label": t,
  "aria-labelledby": n,
  autoFocus: r = !0,
  restoreFocus: s = !0,
  portalTarget: a,
  overlayProps: c,
  children: u,
  className: i,
  closeOnEscape: f = !0,
  closeOnPointerOutside: _ = !0,
  initialFocusRef: h,
  kind: C,
  onOpenChange: b,
  onExitComplete: g,
  open: m,
  placement: d,
  preventScroll: w = !0,
  role: N = "dialog",
  size: L,
  style: E,
  trapFocus: T = !0,
  ...W
}, x) {
  const P = Ee(), D = Ve(a ?? P.portalHost), S = D?.ownerDocument ?? (typeof document > "u" ? null : document), K = A(null), M = `openbitfun-dialog-title-${be()}`, F = `openbitfun-dialog-description-${be()}`, { present: y, state: $ } = I2(m, Ar), j = { children: u, className: i, overlayProps: c, placement: d, size: L, style: E }, q = A(null), H = A(y);
  ve(() => {
    m ? q.current = { children: u, className: i, overlayProps: c, placement: d, size: L, style: E } : y || (q.current = null);
  }, [u, i, m, c, d, y, L, E]), B(() => {
    const J = H.current && !y && !m;
    H.current = y, J && g?.();
  }, [g, m, y]);
  const G = m ? j : q.current ?? j, Q = G.children, k = r2(Q, Dr), I = r2(Q, $r), te = R((J) => {
    m && b(!1, J);
  }, [b, m]), Z = G2(() => ({
    close: te,
    descriptionId: F,
    titleId: M
  }), [te, F, M]), X = R((J) => {
    K.current = J, typeof x == "function" ? x(J) : x && (x.current = J);
  }, [x]);
  if (c2({
    dismissOnEscape: f,
    dismissOnPointerOutside: _,
    enabled: m,
    layerRef: K,
    onDismiss: (J) => te(J === "escape-key" ? "escape-key" : "pointer-outside"),
    ownerDocument: S
  }), l2({
    // A closed dialog mounts its surface on the presence commit. Start the
    // focus scope only once that ref exists, including every subsequent open.
    active: m && y,
    autoFocus: r,
    containerRef: K,
    initialFocusRef: h,
    ownerDocument: S,
    trapFocus: T,
    restoreFocus: s
  }), !y || !D) return null;
  const ae = $ === "exiting";
  return /* @__PURE__ */ l($e, { target: D, open: m, modal: !0, preventScroll: w, children: /* @__PURE__ */ l(
    "div",
    {
      ...G.overlayProps,
      className: O(de.overlay, G.overlayProps?.className),
      "data-openbitfun-component": C,
      "data-openbitfun-part": "overlay",
      "data-openbitfun-native-webview-occlusion": !0,
      "data-placement": G.placement,
      "data-state": ae ? "exiting" : "open",
      children: /* @__PURE__ */ l(z2.Provider, { value: Z, children: /* @__PURE__ */ l(
        "div",
        {
          ...W,
          ...Re(!m),
          "aria-describedby": e ?? (I ? F : void 0),
          "aria-hidden": ae || void 0,
          "aria-label": t,
          "aria-labelledby": n ?? (!t && k ? M : void 0),
          "aria-modal": "true",
          className: O(de.surface, G.className),
          "data-openbitfun-component": C,
          "data-openbitfun-part": "surface",
          "data-placement": G.placement,
          "data-size": G.size,
          "data-state": ae ? "exiting" : "open",
          ref: X,
          role: N,
          style: G.style,
          tabIndex: -1,
          children: Q
        }
      ) })
    }
  ) });
}), oa = z(function({
  size: e = "md",
  ...t
}, n) {
  return /* @__PURE__ */ l(H2, { ...t, kind: "dialog", ref: n, size: e });
}), ra = z(function({
  placement: e = "right",
  size: t = "md",
  ...n
}, r) {
  return /* @__PURE__ */ l(
    H2,
    {
      ...n,
      kind: "sheet",
      placement: e,
      ref: r,
      size: t
    }
  );
}), sa = z(
  function({ className: e, separator: t = !1, ...n }, r) {
    return /* @__PURE__ */ l("header", { ...n, className: O(de.header, e), "data-openbitfun-part": "header", "data-separator": t, ref: r });
  }
), aa = z(
  function({ className: e, ...t }, n) {
    return /* @__PURE__ */ l("div", { ...t, className: O(de.heading, e), "data-openbitfun-part": "heading", ref: n });
  }
), Dr = z(
  function({ children: e, className: t, id: n, ...r }, s) {
    const a = d2("DialogTitle");
    return /* @__PURE__ */ l("h2", { ...r, className: O(de.title, t), "data-openbitfun-part": "title", id: n ?? a.titleId, ref: s, children: /* @__PURE__ */ l(Ae, { children: e }) });
  }
), $r = z(
  function({ className: e, id: t, ...n }, r) {
    const s = d2("DialogDescription");
    return /* @__PURE__ */ l("p", { ...n, className: O(de.description, e), "data-openbitfun-part": "description", id: t ?? s.descriptionId, ref: r });
  }
), ia = z(
  function({ className: e, ...t }, n) {
    return /* @__PURE__ */ l("div", { ...t, className: O(de.headerActions, e), "data-openbitfun-part": "header-actions", ref: n });
  }
), ca = z(
  function({ "aria-label": e, className: t, icon: n, ...r }, s) {
    const a = d2("DialogClose"), c = Ee();
    return /* @__PURE__ */ l(
      Be,
      {
        ...r,
        "aria-label": e ?? c.messages.dialogClose,
        className: O(de.close, t),
        "data-openbitfun-part": "close",
        icon: n ?? /* @__PURE__ */ l(je, { name: "xmark" }),
        onClick: () => a.close("close-button"),
        ref: s,
        size: "sm",
        variant: "quiet"
      }
    );
  }
), la = z(
  function({ className: e, inset: t = "standard", ...n }, r) {
    return /* @__PURE__ */ l(
      "div",
      {
        ...n,
        className: O(de.body, e),
        "data-openbitfun-part": "body",
        "data-inset": t,
        ref: r
      }
    );
  }
), da = z(
  function({ appearance: e = "attached", className: t, separator: n = !1, ...r }, s) {
    return /* @__PURE__ */ l(
      "footer",
      {
        ...r,
        className: O(de.footer, t),
        "data-appearance": e,
        "data-separator": n,
        "data-openbitfun-part": "footer",
        ref: s
      }
    );
  }
), Sr = "_root_p332d_2", Or = "_signal_p332d_17", Tr = "_track_p332d_19", Fr = "_nodes_p332d_20", De = {
  root: Sr,
  signal: Or,
  track: Tr,
  nodes: Fr
}, Pr = [
  "M19.5 3.75 3.5 10.5",
  "M19.5 3.75 35.5 10.5",
  "M3.5 10.5 19.5 19.5",
  "M35.5 10.5 19.5 19.5",
  "M19.5 19.5 3.5 28.5",
  "M19.5 19.5 35.5 28.5",
  "M3.5 28.5 19.5 35.25",
  "M35.5 28.5 19.5 35.25"
], qr = [
  "M19.5 3.75 3.5 10.5 19.5 19.5 3.5 28.5 19.5 35.25",
  "M19.5 3.75 35.5 10.5 19.5 19.5 35.5 28.5 19.5 35.25"
], s2 = [
  [19.5, 3.75],
  [3.5, 10.5],
  [35.5, 10.5],
  [19.5, 19.5],
  [3.5, 28.5],
  [35.5, 28.5],
  [19.5, 35.25]
], Ir = "-1.5 -1.5 42 42", zr = [
  "M-1.5 -1.5H40.5V40.5H-1.5Z",
  ...s2.map(([o, e]) => `M${o - 4} ${e}a4 4 0 1 0 8 0a4 4 0 1 0-8 0Z`)
].join(" "), Hr = [0, 1, 1, 2, 3, 3, 4], Rr = [0, 0.08, 0.155, 0.23, 0.32], Vr = [0.84, 0.775, 0.71, 0.645, 0.58], _2 = { duration: 2200, iterations: 1 / 0 }, Pe = "cubic-bezier(0.45, 0, 0.55, 1)";
function jr(o) {
  const e = [];
  o.setAttribute("data-playing", "true"), o.querySelectorAll("[data-signal-edge]").forEach((n) => {
    e.push(n.animate([
      { offset: 0, strokeDashoffset: "1", opacity: 0 },
      { offset: 0.02, strokeDashoffset: "1", opacity: 1, easing: Pe },
      { offset: 0.43, strokeDashoffset: "0", opacity: 1 },
      { offset: 0.62, strokeDashoffset: "0", opacity: 1, easing: Pe },
      { offset: 0.95, strokeDashoffset: "1", opacity: 0 },
      { offset: 1, strokeDashoffset: "1", opacity: 0 }
    ], _2));
  }), o.querySelectorAll("[data-signal-node]").forEach((n, r) => {
    const s = Hr[r], a = Rr[s], c = Vr[s];
    e.push(n.animate([
      { offset: 0, opacity: 0 },
      { offset: a, opacity: 0, easing: Pe },
      { offset: a + (s === 0 ? 0.12 : 0.15), opacity: 1 },
      { offset: c, opacity: 1, easing: Pe },
      { offset: c + 0.16, opacity: 0 },
      { offset: 1, opacity: 0 }
    ], _2));
  });
  const t = o.ownerDocument.timeline.currentTime;
  return t !== null && e.forEach((n) => {
    n.startTime = t;
  }), e;
}
const ua = z(function({
  active: e = !0,
  className: t,
  label: n,
  size: r = "sm",
  ...s
}, a) {
  const c = be(), u = A(null);
  return B(() => {
    const i = u.current;
    if (!e || !i) return;
    const f = Y2(i, () => jr(i));
    return () => {
      f(), i.removeAttribute("data-playing");
    };
  }, [e]), /* @__PURE__ */ l(
    "span",
    {
      ...s,
      ref: a,
      className: O(De.root, t),
      "data-openbitfun-component": "thinking-indicator",
      "data-active": e,
      "data-size": r,
      "aria-hidden": n ? void 0 : "true",
      "aria-label": n,
      role: n ? "img" : void 0,
      children: /* @__PURE__ */ V("svg", { ref: u, viewBox: Ir, fill: "none", "aria-hidden": "true", focusable: "false", children: [
        /* @__PURE__ */ l("defs", { children: /* @__PURE__ */ l("clipPath", { id: c, clipPathUnits: "userSpaceOnUse", children: /* @__PURE__ */ l("path", { d: zr, clipRule: "evenodd" }) }) }),
        /* @__PURE__ */ l("g", { className: De.track, clipPath: `url(#${c})`, stroke: "currentColor", strokeLinecap: "round", strokeWidth: "2", children: Pr.map((i) => /* @__PURE__ */ l("path", { d: i }, i)) }),
        /* @__PURE__ */ l("g", { className: De.nodes, fill: "currentColor", children: s2.map(([i, f]) => /* @__PURE__ */ l("circle", { cx: i, cy: f, r: "4" }, `${i}-${f}`)) }),
        /* @__PURE__ */ l("g", { className: De.signal, clipPath: `url(#${c})`, stroke: "currentColor", strokeLinecap: "round", strokeWidth: "2", children: qr.map((i) => /* @__PURE__ */ l("path", { d: i, pathLength: "1", strokeDasharray: "1 1", strokeDashoffset: "1", "data-signal-edge": "" }, i)) }),
        /* @__PURE__ */ l("g", { className: De.signal, fill: "currentColor", children: s2.map(([i, f]) => /* @__PURE__ */ l("circle", { cx: i, cy: f, r: "4", "data-signal-node": "" }, `${i}-${f}`)) })
      ] })
    }
  );
}), Br = "_root_1uxtl_2", Ur = "_trigger_1uxtl_18", Zr = "_label_1uxtl_27", Wr = "_leading_1uxtl_77", Kr = "_staticLabel_1uxtl_106", Gr = "_metadata_1uxtl_111", Xr = "_shortcut_1uxtl_112", Yr = "_actions_1uxtl_113", fe = {
  root: Br,
  trigger: Ur,
  label: Zr,
  leading: Wr,
  staticLabel: Kr,
  metadata: Gr,
  shortcut: Xr,
  actions: Yr
}, Qr = z(function({
  actions: e = [],
  actionContent: t,
  triggerClassName: n,
  children: r,
  className: s,
  disabled: a,
  leading: c,
  labelBehavior: u = "overflow",
  metadata: i,
  reserveLeadingSpace: f = !1,
  shortcut: _,
  tone: h = "neutral",
  type: C = "button",
  ...b
}, g) {
  const m = f || c != null;
  return /* @__PURE__ */ V(
    "span",
    {
      className: O(fe.root, s),
      "data-openbitfun-component": "action-item",
      "data-openbitfun-tone": h,
      "data-disabled": a ? "true" : "false",
      children: [
        /* @__PURE__ */ V(
          "button",
          {
            "data-overflow-trigger": !0,
            ...b,
            className: O(fe.trigger, n),
            "data-openbitfun-part": "trigger",
            disabled: a,
            ref: g,
            type: C,
            children: [
              m && /* @__PURE__ */ l("span", { "aria-hidden": "true", className: fe.leading, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "leading", children: c }),
              u === "static" ? /* @__PURE__ */ l("span", { className: O(fe.label, fe.staticLabel), "data-openbitfun-part": "label", children: r }) : /* @__PURE__ */ l(Ae, { className: fe.label, "data-openbitfun-part": "label", children: r }),
              i != null && /* @__PURE__ */ l("span", { className: fe.metadata, "data-openbitfun-part": "metadata", children: i }),
              _ != null && /* @__PURE__ */ l("span", { "aria-hidden": "true", className: fe.shortcut, "data-openbitfun-part": "shortcut", children: _ })
            ]
          }
        ),
        (e.length > 0 || t != null) && /* @__PURE__ */ V("span", { className: fe.actions, "data-openbitfun-part": "actions", children: [
          t,
          e.map((d) => /* @__PURE__ */ l(
            Be,
            {
              "aria-label": d.label,
              "aria-checked": d.role === "menuitemcheckbox" || d.role === "menuitemradio" ? d.checked : void 0,
              "data-testid": d.testId,
              disabled: a || d.disabled,
              icon: d.icon,
              onClick: d.onClick,
              role: d.role,
              size: "sm",
              tone: d.tone,
              variant: "quiet",
              ...d.testAttributes
            },
            d.id
          ))
        ] })
      ]
    }
  );
}), Jr = "_root_rdv8g_2", es = "_viewport_rdv8g_3", ts = "_list_rdv8g_4", ns = "_section_rdv8g_5", os = "_heading_rdv8g_6", rs = "_items_rdv8g_7", ss = "_separator_rdv8g_8", as = "_headingLabel_rdv8g_84", is = "_headingActions_rdv8g_97", cs = "_headingAction_rdv8g_97", ls = "_item_rdv8g_7", ie = {
  root: Jr,
  viewport: es,
  list: ts,
  section: ns,
  heading: os,
  items: rs,
  separator: ss,
  headingLabel: as,
  headingActions: is,
  headingAction: cs,
  item: ls
};
function ds(o, e) {
  typeof o == "function" ? o(e) : o && (o.current = e);
}
function Je(o) {
  return Array.from(
    o.querySelectorAll("[data-openbitfun-menu-item]")
  ).filter((e) => e.closest('[role="menu"]') === o && !e.disabled && e.getAttribute("aria-disabled") !== "true");
}
function qe(o, e, t = !0) {
  const n = o[e];
  n && (o.forEach((r, s) => {
    r.tabIndex = s === e ? 0 : -1;
  }), t && (n.focus(), n.scrollIntoView?.({ block: "nearest", inline: "nearest" })));
}
const R2 = z(function({
  className: e,
  "data-openbitfun-part": t = "items",
  ...n
}, r) {
  return /* @__PURE__ */ l(
    "div",
    {
      ...n,
      className: O(ie.items, e),
      "data-openbitfun-menu-list": "",
      "data-openbitfun-part": t,
      ref: r
    }
  );
}), us = z(function({
  autoFocusFirstItem: e = !1,
  children: t,
  className: n,
  inlineSize: r = "fixed",
  onFocusCapture: s,
  onKeyDown: a,
  scrollbarVisibility: c = "auto",
  ...u
}, i) {
  const f = A({ node: null }), _ = A(!1), h = R((g) => {
    f.current.node = g, ds(i, g);
  }, [i]);
  B(() => {
    const g = f.current.node;
    if (!g) return;
    e || (_.current = !1);
    const m = Je(g);
    if (m.length === 0) {
      e && !_.current && (_.current = !0, g.focus());
      return;
    }
    const d = Math.max(m.findIndex((w) => w.tabIndex === 0), 0);
    qe(m, d, !1), e && !_.current && (_.current = !0, qe(m, d));
  }, [e, t]);
  const C = (g) => {
    if (s?.(g), g.defaultPrevented) return;
    const m = g.target.closest ? g.target.closest("[data-openbitfun-menu-item]") : null;
    if (!m || !g.currentTarget.contains(m)) return;
    const d = Je(g.currentTarget), w = d.indexOf(m);
    w >= 0 && qe(d, w, !1);
  }, b = (g) => {
    if (a?.(g), g.defaultPrevented || Ne(g)) return;
    const m = g.target.closest ? g.target.closest("[data-openbitfun-menu-item]") : null;
    if (!m || !g.currentTarget.contains(m)) return;
    const d = Je(g.currentTarget), w = d.indexOf(m);
    if (w < 0 || d.length === 0) return;
    let N;
    switch (g.key) {
      case "ArrowDown":
        N = (w + 1) % d.length;
        break;
      case "ArrowUp":
        N = (w - 1 + d.length) % d.length;
        break;
      case "Home":
        N = 0;
        break;
      case "End":
        N = d.length - 1;
        break;
      default:
        if (g.key.length === 1 && !g.altKey && !g.ctrlKey && !g.metaKey) {
          const L = g.key.toLocaleLowerCase();
          for (let E = 1; E <= d.length; E += 1) {
            const T = (w + E) % d.length;
            if ((d[T]?.textContent?.trim().toLocaleLowerCase() ?? "").startsWith(L)) {
              N = T;
              break;
            }
          }
        }
    }
    N !== void 0 && (g.preventDefault(), qe(d, N));
  };
  return /* @__PURE__ */ l(
    "div",
    {
      ...u,
      className: O(ie.root, n),
      "data-openbitfun-component": "menu",
      "data-openbitfun-inline-size": r,
      onFocusCapture: C,
      onKeyDown: b,
      ref: h,
      role: "menu",
      children: /* @__PURE__ */ l(
        Yo,
        {
          className: ie.viewport,
          orientation: "vertical",
          scrollbarVisibility: c,
          children: /* @__PURE__ */ l(R2, { className: ie.list, "data-openbitfun-part": "list", children: t })
        }
      )
    }
  );
}), hs = z(function({
  checked: e = !1,
  className: t,
  role: n = "menuitem",
  tabIndex: r = -1,
  ...s
}, a) {
  return /* @__PURE__ */ l(
    Qr,
    {
      ...s,
      "aria-checked": n === "menuitem" ? void 0 : e,
      className: O(ie.item, t),
      "data-openbitfun-menu-item": "",
      ref: a,
      role: n,
      tabIndex: r
    }
  );
}), ha = z(function({
  "aria-label": e,
  "aria-labelledby": t,
  actions: n = [],
  children: r,
  className: s,
  title: a,
  ...c
}, u) {
  const i = be(), f = a != null ? i : void 0;
  return /* @__PURE__ */ V(
    "div",
    {
      ...c,
      "aria-label": e,
      "aria-labelledby": e || t ? t : f,
      className: O(ie.section, s),
      "data-openbitfun-part": "section",
      ref: u,
      role: "group",
      children: [
        f && /* @__PURE__ */ V("div", { className: ie.heading, "data-openbitfun-part": "heading", id: f, children: [
          /* @__PURE__ */ l(Ae, { className: ie.headingLabel, "data-openbitfun-part": "heading-label", children: a }),
          n.length > 0 && /* @__PURE__ */ l("span", { className: ie.headingActions, "data-openbitfun-part": "heading-actions", children: n.map((h) => /* @__PURE__ */ l(
            Be,
            {
              "aria-label": h.label,
              className: ie.headingAction,
              "data-openbitfun-menu-item": "",
              disabled: h.disabled,
              icon: h.icon,
              onClick: h.onClick,
              size: "sm",
              role: "menuitem",
              tabIndex: -1,
              tone: h.tone,
              variant: "quiet"
            },
            h.id
          )) })
        ] }),
        /* @__PURE__ */ l(R2, { "data-openbitfun-part": "section-items", children: r })
      ]
    }
  );
}), fs = z(
  function({ className: e, ...t }, n) {
    return /* @__PURE__ */ l(
      "div",
      {
        ...t,
        className: O(ie.separator, e),
        "data-openbitfun-part": "separator",
        ref: n,
        role: "separator"
      }
    );
  }
), ps = typeof window > "u" ? B : ve;
function ms({ open: o, anchorRef: e, layerRef: t, placement: n = "bottom", matchWidth: r = !1, overlapAnchor: s = !1, revision: a, point: c }) {
  const [u, i] = oe(null);
  return ps(() => {
    if (!o) {
      i(null);
      return;
    }
    const f = e.current, _ = t.current, h = _?.ownerDocument.defaultView;
    if (!_ || !h || !f && !c) return;
    const C = () => {
      const m = c ? 0 : 4, d = c ? { left: c.x, right: c.x, top: c.y, bottom: c.y, width: 0, height: 0 } : f.getBoundingClientRect(), w = h.visualViewport, N = w?.offsetLeft ?? 0, L = w?.offsetTop ?? 0, E = w?.width ?? h.innerWidth, T = w?.height ?? h.innerHeight, W = r ? Math.min(d.width, E - 16) : void 0;
      _.style.maxWidth = `${Math.max(0, E - 16)}px`, W !== void 0 && (_.style.width = `${W}px`);
      const x = _.getBoundingClientRect(), P = n === "left" || n === "right", D = P ? d.left - N : d.top - L, S = P ? N + E - d.right : L + T - d.bottom, K = P ? d.width : d.height, M = s ? K : -m, F = D + M, y = S + M, $ = (P ? x.width : x.height) + 8, q = n === "top" || n === "left" ? F >= $ || F > y : y < $ && F > y, H = P ? q ? "left" : "right" : q ? "top" : "bottom", G = P ? T - 16 : Math.max(0, (q ? F : y) - 8), Q = Math.min(x.height, G), k = P ? s ? q ? d.right - x.width : d.left : q ? d.left - x.width - m : d.right + m : d.left, I = P ? d.top : s ? q ? d.bottom - Q : d.top : q ? d.top - Q - m : d.bottom + m, te = {
        position: "fixed",
        width: W,
        maxWidth: E - 16,
        maxHeight: G,
        left: Math.max(N + 8, Math.min(k, N + E - x.width - 8)),
        top: Math.max(L + 8, Math.min(I, L + T - Q - 8))
      };
      i((Z) => JSON.stringify(Z) === JSON.stringify({ style: te, placement: H }) ? Z : { style: te, placement: H });
    };
    C();
    const b = typeof ResizeObserver > "u" ? null : new ResizeObserver(C);
    return f && b?.observe(f), b?.observe(_), h.addEventListener("resize", C), h.addEventListener("scroll", C, !0), h.visualViewport?.addEventListener("resize", C), h.visualViewport?.addEventListener("scroll", C), () => {
      b?.disconnect(), h.removeEventListener("resize", C), h.removeEventListener("scroll", C, !0), h.visualViewport?.removeEventListener("resize", C), h.visualViewport?.removeEventListener("scroll", C);
    };
  }, [o, e, t, n, r, s, a, c?.x, c?.y]), u;
}
const ys = 120, gs = 300, vs = 300, V2 = 48, bs = 300, Cs = 2, Ie = 4, u2 = (o, e) => e.right > e.left && e.bottom > e.top && o.x >= e.left && o.x <= e.right && o.y >= e.top && o.y <= e.bottom, _s = (o, e, t) => {
  if (e.right <= e.left || e.bottom <= e.top || t.right <= t.left || t.bottom <= t.top)
    return !1;
  const n = t.left + t.right > e.left + e.right;
  return u2(o, {
    left: (n ? e.right : t.right) - Ie,
    right: (n ? t.left : e.left) + Ie,
    top: t.top - Ie,
    bottom: t.bottom + Ie
  });
}, w2 = (o, e) => {
  const t = Math.max(e.left - o.x, 0, o.x - e.right), n = Math.max(e.top - o.y, 0, o.y - e.bottom);
  return Math.hypot(t, n);
}, e2 = (o, e, t) => (o.x - t.x) * (e.y - t.y) - (e.x - t.x) * (o.y - t.y), ws = (o, e, t, n) => {
  const r = e2(o, e, t), s = e2(o, t, n), a = e2(o, n, e), c = r < 0 || s < 0 || a < 0, u = r > 0 || s > 0 || a > 0;
  return !(c && u);
}, ks = (o, e, t, n = V2) => {
  if (u2(e, t)) return !0;
  const r = o.x <= t.left, s = o.x >= t.right;
  if (!r && !s) return !1;
  const a = r ? t.left : t.right, c = e.x - o.x;
  return r && c <= 0 || s && c >= 0 || w2(e, t) >= w2(o, t) ? !1 : ws(
    e,
    o,
    { x: a, y: t.top - n },
    { x: a, y: t.bottom + n }
  );
}, t2 = (o) => !o.pointerType || o.pointerType === "mouse", Ms = ({
  activeId: o,
  onActiveIdChange: e,
  parentRef: t,
  submenuRef: n,
  enabled: r = !0,
  openDelayMs: s = ys,
  closeDelayMs: a = gs,
  switchDelayMs: c = vs,
  tolerance: u = V2
}) => {
  const i = A(o), f = A(e), _ = A([]), h = A(null), C = A(null), b = A(!1);
  i.current = o, f.current = e;
  const g = R(() => {
    const M = h.current;
    M && (window.clearTimeout(M.timer), h.current = null);
  }, []), m = R(() => {
    C.current !== null && (window.clearTimeout(C.current), C.current = null);
  }, []), d = R(() => {
    g(), m(), b.current = !1;
  }, [m, g]), w = R((M) => {
    d(), i.current = M, f.current(M);
  }, [d]), N = R((M, F, y) => {
    g();
    const $ = window.setTimeout(() => {
      h.current = null, w(M);
    }, y);
    h.current = { targetId: M, kind: F, timer: $ };
  }, [g, w]), L = R(() => {
    m(), C.current = window.setTimeout(() => {
      C.current = null, w(null);
    }, a);
  }, [m, a, w]), E = R((M) => {
    for (let F = _.current.length - 1; F >= 0; F -= 1) {
      const y = _.current[F];
      if (!y) continue;
      const $ = M.time - y.time, j = Math.hypot(M.x - y.x, M.y - y.y);
      if ($ >= 0 && $ <= bs && j >= Cs)
        return y;
    }
    return null;
  }, []), T = R((M, F) => {
    const y = n.current?.getBoundingClientRect();
    return !!(M && y && ks(M, F, y, u));
  }, [n, u]), W = R((M) => {
    if (i.current === null) return null;
    const F = n.current?.getBoundingClientRect();
    if (!F) return null;
    if (u2(M, F)) return "submenu";
    const y = t.current?.getBoundingClientRect();
    return y && _s(M, y, F) ? "bridge" : null;
  }, [t, n]), x = R((M, F) => {
    if (!r || !t2(F)) return;
    m(), b.current = !1;
    const y = i.current;
    if (Object.is(y, M)) {
      g();
      return;
    }
    const $ = {
      x: F.clientX,
      y: F.clientY,
      time: F.timeStamp
    }, j = E($);
    if (y !== null && T(j, $)) {
      N(M, "switch", c);
      return;
    }
    if (y === null && M !== null && s > 0) {
      N(M, "open", s);
      return;
    }
    w(M);
  }, [
    m,
    g,
    w,
    r,
    E,
    s,
    T,
    N,
    c
  ]), P = R((M) => {
    if (!(!r || M && !t2(M)) && (g(), i.current !== null)) {
      if (b.current = !0, M && W({ x: M.clientX, y: M.clientY })) {
        m();
        return;
      }
      L();
    }
  }, [m, g, r, W, L]), D = R(() => {
    d();
  }, [d]), S = R((M) => {
    w(M);
  }, [w]), K = R(() => {
    w(null);
  }, [w]);
  return B(() => {
    if (!r) {
      d(), _.current = [];
      return;
    }
    const M = (y) => {
      if (!t2(y)) return;
      const $ = {
        x: y.clientX,
        y: y.clientY,
        time: y.timeStamp
      }, j = E($), q = W($), H = !q && i.current !== null && T(j, $), G = h.current;
      q ? (d(), b.current = q === "bridge") : G?.kind === "switch" ? H ? N(G.targetId, "switch", c) : w(G.targetId) : b.current && (C.current === null || H) && L(), _.current.push($), _.current.length > 4 && _.current.shift();
    }, F = () => P();
    return document.addEventListener("pointermove", M, { capture: !0, passive: !0 }), document.addEventListener("pointerleave", F), window.addEventListener("blur", F), () => {
      document.removeEventListener("pointermove", M, !0), document.removeEventListener("pointerleave", F), window.removeEventListener("blur", F);
    };
  }, [
    d,
    w,
    r,
    E,
    W,
    T,
    P,
    L,
    N,
    c
  ]), B(() => d, [d]), {
    requestChange: x,
    requestClose: P,
    keepOpen: D,
    openNow: S,
    closeNow: K,
    cancelPending: d
  };
}, xs = "_icon_xflqh_3", Ns = "_submenuArrow_xflqh_4", Ls = "_submenuBoundary_xflqh_19", Es = "_popup_xflqh_20", ze = {
  icon: xs,
  submenuArrow: Ns,
  submenuBoundary: Ls,
  popup: Es
};
function k2(o) {
  return Array.from(o.querySelectorAll("[data-openbitfun-menu-item]")).filter((e) => e.closest('[role="menu"]') === o && !e.disabled && e.getAttribute("aria-disabled") !== "true");
}
function fa({ items: o, open: e, onClose: t, anchorRef: n, ownerRef: r, position: s, placement: a = "bottom", autoFocusFirstItem: c = !0, ...u }) {
  const i = A(null), f = A(null), _ = be(), { present: h, state: C } = I2(e, 100), b = n ?? i, g = n ? [n] : [], m = () => {
    n?.current?.isConnected && n.current.focus(), t();
  };
  c2({
    branchRefs: g,
    containsTarget: (w) => w instanceof Element && w.closest("[data-openbitfun-menu-tree]")?.getAttribute("data-openbitfun-menu-tree") === _,
    enabled: e,
    layerRef: f,
    onDismiss: m
  }), l2({
    active: e && h,
    autoFocus: c,
    containerRef: f,
    restoreFocus: !n,
    trapFocus: !1
  });
  const d = h ? /* @__PURE__ */ l(
    j2,
    {
      ...u,
      anchorRef: b,
      autoFocusFirstItem: !1,
      items: o,
      menuRef: f,
      onClose: m,
      open: e,
      phase: C,
      placement: a,
      position: s,
      treeId: _
    }
  ) : null;
  return /* @__PURE__ */ V(Le, { children: [
    /* @__PURE__ */ l("span", { ref: i, hidden: !0 }),
    /* @__PURE__ */ l($e, { ownerDocument: i.current?.ownerDocument, ownerRef: r ?? n, open: e, children: d })
  ] });
}
function j2({ items: o, open: e, phase: t, treeId: n, onClose: r, onBack: s, anchorRef: a, position: c, placement: u, menuRef: i, autoFocusFirstItem: f, className: _, inlineSize: h, style: C, parts: b, ...g }) {
  const m = b?.root ?? us, d = b?.item ?? hs, w = b?.separator ?? fs, N = b?.icon ?? "span", L = b?.label ?? "span", E = b?.shortcut ?? "span", T = b?.submenuArrow ?? "span", W = b?.submenu ?? "div", x = A(null), P = i ?? x, D = A(null), S = A(null), K = A(!1), [M, F] = oe(null), y = be(), $ = Ms({ activeId: M, onActiveIdChange: F, parentRef: P, submenuRef: D, enabled: e, openDelayMs: 150, closeDelayMs: 300, switchDelayMs: 300, tolerance: 50 }), j = ms({ open: !0, anchorRef: a, layerRef: P, placement: u, point: c }), q = o.find((k) => k.id === M && !k.disabled && k.submenu?.length), H = (k, I, te) => {
    k.disabled || !k.submenu?.length || (S.current = I, K.current = te, $.openNow(k.id), M === k.id && D.current && k2(D.current)[0]?.focus());
  }, G = (k) => {
    k.disabled || k.separator || (r(), k.onSelect?.());
  };
  B(() => {
    e || $.closeNow();
  }, [e, $.closeNow]), B(() => {
    if (!e) return;
    const k = P.current, I = k?.ownerDocument, te = (Z) => {
      if (!k || I?.activeElement?.closest('[role="menu"]') !== k || Ne(Z)) return;
      const X = k2(k), ae = X.indexOf(I.activeElement), J = X[ae], me = o.find((_e) => _e.id === J?.getAttribute("data-menu-id"));
      let ce;
      switch (Z.key) {
        case "ArrowDown":
          ce = (ae + 1) % X.length;
          break;
        case "ArrowUp":
          ce = (ae - 1 + X.length) % X.length;
          break;
        case "Home":
          ce = 0;
          break;
        case "End":
          ce = X.length - 1;
          break;
        case "Tab":
          r();
          return;
        case "ArrowLeft":
          s && (Z.preventDefault(), Z.stopPropagation(), s());
          return;
        case "ArrowRight":
          me?.submenu?.length && J && (Z.preventDefault(), Z.stopPropagation(), H(me, J, !0));
          return;
        case "Enter":
        case " ":
          Z.preventDefault(), Z.stopPropagation(), me && J && (me.submenu?.length ? H(me, J, !0) : G(me));
          return;
        default:
          if (Z.key.length === 1 && !Z.ctrlKey && !Z.metaKey && !Z.altKey)
            for (let _e = 1; _e <= X.length; _e++) {
              const Se = (ae + _e) % X.length;
              if (X[Se]?.textContent?.trim().toLowerCase().startsWith(Z.key.toLowerCase())) {
                ce = Se;
                break;
              }
            }
      }
      ce !== void 0 && (Z.preventDefault(), Z.stopPropagation(), X[ce]?.focus(), X[ce]?.scrollIntoView?.({ block: "nearest" }));
    };
    return I?.addEventListener("keydown", te, !0), () => I?.removeEventListener("keydown", te, !0);
  });
  const Q = q ? /* @__PURE__ */ l(W, { className: ze.submenuBoundary, children: /* @__PURE__ */ l(
    j2,
    {
      id: y,
      "aria-label": q.label,
      menuRef: D,
      items: q.submenu,
      open: e,
      phase: t,
      treeId: n,
      onClose: r,
      parts: b,
      inlineSize: h,
      onBack: () => {
        $.closeNow(), S.current?.focus();
      },
      anchorRef: S,
      placement: "right",
      autoFocusFirstItem: K.current,
      onPointerEnter: $.keepOpen,
      onPointerLeave: $.requestClose
    },
    q.id
  ) }) : null;
  return /* @__PURE__ */ V(Le, { children: [
    /* @__PURE__ */ l(
      m,
      {
        ...g,
        ref: (k) => {
          P.current = k;
        },
        className: O(ze.popup, _),
        inlineSize: h,
        autoFocusFirstItem: e && f && !!j,
        tabIndex: -1,
        style: { ...j?.style, ...C, visibility: j ? void 0 : "hidden" },
        "data-openbitfun-native-webview-occlusion": !0,
        "data-openbitfun-menu-tree": n,
        "data-placement": j?.placement ?? u,
        "data-state": t,
        "aria-hidden": !e || void 0,
        ...Re(!e),
        onContextMenu: (k) => k.preventDefault(),
        children: o.map((k) => k.separator ? /* @__PURE__ */ l(w, {}, k.id) : /* @__PURE__ */ l(
          d,
          {
            "data-menu-id": k.id,
            leading: k.icon ? /* @__PURE__ */ l(N, { className: ze.icon, "data-openbitfun-icon-slot": "true", children: k.icon }) : void 0,
            shortcut: k.shortcut ? /* @__PURE__ */ l(E, { children: k.shortcut }) : void 0,
            tone: k.tone,
            role: k.role,
            checked: k.checked,
            disabled: k.disabled,
            "aria-disabled": k.disabled || void 0,
            "aria-haspopup": k.submenu?.length ? "menu" : void 0,
            "aria-expanded": k.submenu?.length ? q?.id === k.id : void 0,
            "aria-controls": q?.id === k.id ? y : void 0,
            metadata: k.submenu?.length ? /* @__PURE__ */ l(T, { className: ze.submenuArrow, children: /* @__PURE__ */ l(je, { name: "chevron-right", size: "sm" }) }) : void 0,
            onClick: (I) => {
              I.stopPropagation(), k.submenu?.length ? H(k, I.currentTarget, !0) : G(k);
            },
            onPointerEnter: (I) => {
              (M === null || M === k.id) && (S.current = I.currentTarget), K.current = !1, $.requestChange(!k.disabled && k.submenu?.length ? k.id : null, I);
            },
            onPointerLeave: $.requestClose,
            ref: (I) => {
              q?.id === k.id && I && (S.current = I);
            },
            children: /* @__PURE__ */ l(L, { children: k.label })
          },
          k.id
        ))
      }
    ),
    Q && /* @__PURE__ */ l(
      $e,
      {
        ownerDocument: P.current?.ownerDocument,
        ownerRef: P,
        open: e,
        surfaceRef: D,
        dismissOnPointerOutside: !0,
        onDismiss: (k) => {
          k === "escape-key" ? ($.closeNow(), S.current?.focus()) : r();
        },
        children: Q
      }
    )
  ] });
}
const As = "_root_1ipef_2", Ds = "_field_1ipef_17", $s = "_fieldWithAction_1ipef_51", Ss = "_footer_1ipef_95", Os = "_icon_1ipef_160", Ts = "_shortcut_1ipef_173", Me = {
  root: As,
  field: Ds,
  fieldWithAction: $s,
  footer: Ss,
  icon: Os,
  shortcut: Ts
}, pa = z(function({
  className: e,
  clearLabel: t,
  disabled: n,
  footer: r,
  leadingIcon: s,
  onClear: a,
  onKeyDown: c,
  onSearch: u,
  readOnly: i,
  shortcut: f,
  size: _ = "sm",
  trailing: h,
  trailingAction: C,
  variant: b = "default",
  ...g
}, m) {
  const d = (T) => {
    c?.(T), !T.defaultPrevented && T.key === "Enter" && u?.(T.currentTarget.value);
  }, w = t && a ? /* @__PURE__ */ l(
    Be,
    {
      "aria-label": t,
      disabled: n || i,
      icon: /* @__PURE__ */ l(je, { name: "xmark" }),
      onClick: (T) => {
        !n && !i && a(T);
      },
      onMouseDown: (T) => T.preventDefault(),
      shape: "square",
      size: "xs",
      variant: "quiet"
    }
  ) : void 0, N = f === void 0 ? void 0 : /* @__PURE__ */ l("span", { "aria-hidden": "true", className: Me.shortcut, children: f }), L = C != null && C !== !1 || w !== void 0, E = h === void 0 && N === void 0 && !L ? void 0 : /* @__PURE__ */ V(Le, { children: [
    h,
    N,
    C,
    w
  ] });
  return /* @__PURE__ */ V("span", { className: O(Me.root, e), "data-openbitfun-component": "search-field", "data-variant": b, "data-size": _, children: [
    /* @__PURE__ */ l(
      Po,
      {
        ...g,
        className: O(Me.field, L && Me.fieldWithAction),
        disabled: n,
        leading: s === void 0 ? void 0 : /* @__PURE__ */ l("span", { "aria-hidden": "true", className: Me.icon, "data-openbitfun-icon-slot": "true", "data-openbitfun-part": "icon", children: s }),
        onKeyDown: d,
        ref: m,
        readOnly: i,
        size: _,
        trailing: E,
        type: "search"
      }
    ),
    b === "panel" && r != null && /* @__PURE__ */ l("span", { className: Me.footer, "data-openbitfun-part": "footer", children: r })
  ] });
}), Fs = "_root_11yh4_2", Ps = "_loadingState_11yh4_3", qs = "_cell_11yh4_4", Is = "_label_11yh4_5", He = {
  root: Fs,
  loadingState: Ps,
  cell: qs,
  label: Is
}, zs = z(function({
  "aria-label": e,
  className: t,
  size: n = "md",
  variant: r = "matrix",
  ...s
}, a) {
  const c = r === "matrix" ? 9 : 3;
  return /* @__PURE__ */ l(
    "span",
    {
      ...s,
      "aria-hidden": e ? void 0 : "true",
      "aria-label": e,
      className: O(He.root, t),
      "data-openbitfun-component": "spinner",
      "data-size": n,
      "data-variant": r,
      ref: a,
      role: e ? "status" : void 0,
      children: Array.from({ length: c }, (u, i) => /* @__PURE__ */ l("span", { "aria-hidden": "true", className: He.cell }, i))
    }
  );
}), ma = z(
  function({ children: e, className: t, size: n = "md", ...r }, s) {
    return /* @__PURE__ */ V(
      "div",
      {
        ...r,
        className: O(He.loadingState, t),
        "data-openbitfun-component": "loading-state",
        "data-size": n,
        ref: s,
        children: [
          /* @__PURE__ */ l(zs, { size: n }),
          e ? /* @__PURE__ */ l("span", { className: He.label, "data-openbitfun-part": "label", children: e }) : null
        ]
      }
    );
  }
);
export {
  E2 as $,
  Wt as A,
  Gs as B,
  Ys as C,
  na as D,
  Ve as E,
  U0 as F,
  nt as G,
  tt as H,
  je as I,
  ot as J,
  Uo as K,
  rt as L,
  fa as M,
  T2 as N,
  Ae as O,
  et as P,
  c2 as Q,
  Js as R,
  ta as S,
  At as T,
  ms as U,
  P2 as V,
  k1 as W,
  Jn as X,
  $e as Y,
  da as Z,
  Xs as _,
  Po as a,
  Ne as a0,
  Qr as a1,
  L1 as a2,
  ia as a3,
  bo as a4,
  ma as a5,
  us as a6,
  hs as a7,
  R2 as a8,
  ha as a9,
  fs as aa,
  Us as ab,
  Bs as ac,
  ra as ad,
  Qs as ae,
  Zs as af,
  ht as ag,
  Do as ah,
  Ao as ai,
  _s as aj,
  ks as ak,
  I2 as al,
  Ms as am,
  Ws as b,
  p as c,
  Be as d,
  Ee as e,
  Yo as f,
  ea as g,
  oa as h,
  Re as i,
  sa as j,
  aa as k,
  Dr as l,
  $r as m,
  ca as n,
  la as o,
  O2 as p,
  Ks as q,
  ua as r,
  pa as s,
  zs as t,
  sr as u,
  Xe as v,
  i2 as w,
  q1 as x,
  Cn as y,
  Q2 as z
};
//# sourceMappingURL=Spinner-Dds2WLKD.js.map
