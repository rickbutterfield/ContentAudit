var Ct = (s) => {
  throw TypeError(s);
};
var gt = (s, t, e) => t.has(s) || Ct("Cannot " + e);
var c = (s, t, e) => (gt(s, t, "read from private field"), e ? e.call(s) : t.get(s)), l = (s, t, e) => t.has(s) ? Ct("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), u = (s, t, e, n) => (gt(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e);
import { UMB_AUTH_CONTEXT as ce } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as it } from "@umbraco-cms/backoffice/element-api";
import { LitElement as ot, html as m, css as X, property as le, state as I, customElement as Dt } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as kt } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as ue } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as de } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as T } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Z, UmbArrayState as St } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as pe } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as Lt, UMB_COLLECTION_ALIAS_CONDITION as xt } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as jt } from "@umbraco-cms/backoffice/lit-element";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, rt = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Wt = Symbol(), Tt = /* @__PURE__ */ new WeakMap();
let he = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (rt && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = Tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const me = (s) => new he(typeof s == "string" ? s : s + "", void 0, Wt), fe = (s, t) => {
  if (rt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), i = H.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = e.cssText, s.appendChild(n);
  }
}, At = rt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return me(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ye, defineProperty: _e, getOwnPropertyDescriptor: be, getOwnPropertyNames: Ce, getOwnPropertySymbols: ge, getPrototypeOf: Se } = Object, C = globalThis, Et = C.trustedTypes, Te = Et ? Et.emptyScript : "", tt = C.reactiveElementPolyfillSupport, R = (s, t) => s, B = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Te : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, ct = (s, t) => !ye(s, t), wt = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: ct };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), C.litPropertyMetadata ?? (C.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class U extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = wt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, e);
      i !== void 0 && _e(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: i, set: o } = be(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(a) {
      const r = i == null ? void 0 : i.call(this);
      o.call(this, a), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const t = Se(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const e = this.properties, n = [...Ce(e), ...ge(e)];
      for (const i of n) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, i] of e) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const i = this._$Eu(e, n);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) e.unshift(At(i));
    } else t !== void 0 && e.push(At(t));
    return e;
  }
  static _$Eu(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const n of e.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return fe(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var n;
      return (n = e.hostConnected) == null ? void 0 : n.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var n;
      return (n = e.hostDisconnected) == null ? void 0 : n.call(e);
    });
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$EC(t, e) {
    var o;
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const a = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : B).toAttribute(e, n.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), r = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : B;
      this._$Em = i, this[i] = r.fromAttribute(e, a.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, n) {
    if (t !== void 0) {
      if (n ?? (n = this.constructor.getPropertyOptions(t)), !(n.hasChanged ?? ct)(this[t], e)) return;
      this.P(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, n) {
    this._$AL.has(t) || this._$AL.set(t, e), n.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, a] of i) a.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], a);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (n = this._$EO) == null || n.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(e)) : this._$EU();
    } catch (i) {
      throw t = !1, this._$EU(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var i;
      return (i = n.hostUpdated) == null ? void 0 : i.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[R("elementProperties")] = /* @__PURE__ */ new Map(), U[R("finalized")] = /* @__PURE__ */ new Map(), tt == null || tt({ ReactiveElement: U }), (C.reactiveElementVersions ?? (C.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: ct }, Ee = (s = Ae, t, e) => {
  const { kind: n, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), o.set(e.name, s), n === "accessor") {
    const { name: a } = e;
    return { set(r) {
      const d = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, d, s);
    }, init(r) {
      return r !== void 0 && this.P(a, void 0, s), r;
    } };
  }
  if (n === "setter") {
    const { name: a } = e;
    return function(r) {
      const d = this[a];
      t.call(this, r), this.requestUpdate(a, d, s);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Vt(s) {
  return (t, e) => typeof e == "object" ? Ee(s, t, e) : ((n, i, o) => {
    const a = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, a ? { ...n, wrapped: !0 } : n), a ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(s, t, e);
}
const we = [
  {
    label: "Opportunity",
    icon: "icon-info",
    class: "opportunity",
    color: "default"
  },
  {
    label: "Warning",
    icon: "icon-stop-alt",
    class: "warning",
    color: "warning"
  },
  {
    label: "Issue",
    icon: "icon-alert",
    class: "issue",
    color: "danger"
  }
], ve = [
  {
    label: "Low",
    icon: "icon-navigation-bottom",
    class: "low",
    color: "default"
  },
  {
    label: "Medium",
    icon: "icon-navigation-road",
    class: "medium",
    color: "warning"
  },
  {
    label: "High",
    icon: "icon-navigation-top",
    class: "high",
    color: "danger"
  }
];
var Oe = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, qt = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Ie(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = (n ? a(t, e, i) : a(i)) || i);
  return n && i && Oe(t, e, i), i;
};
let z = class extends it(ot) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const s = we[this.type - 1];
      return m`
                <uui-tag color=${s.color}>
                    <uui-icon name="${s.icon}"></uui-icon>
                    ${s.label}
                </uui-tag>
            `;
    }
  }
};
z.styles = [
  X`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
qt([
  Vt({ attribute: !1 })
], z.prototype, "type", 2);
z = qt([
  at("content-audit-issue-type-label")
], z);
var $e = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, Ht = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Ue(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = (n ? a(t, e, i) : a(i)) || i);
  return n && i && $e(t, e, i), i;
};
let Y = class extends it(ot) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const s = ve[this.type - 1];
      return m`
                <uui-tag color=${s.color}>
                    <uui-icon name="${s.icon}"></uui-icon>
                    ${s.label}
                </uui-tag>
            `;
    }
  }
};
Y.styles = [
  X`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Ht([
  Vt({ attribute: !1 })
], Y.prototype, "type", 2);
Y = Ht([
  at("content-audit-priority-type-label")
], Y);
class gn extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class Sn extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class Tn extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const G = "Umb.Workspace.ContentAudit", Pe = "Umb.Context.ContentAudit", Bt = "content-audit";
class vt extends Error {
  constructor(t, e, n) {
    super(n), this.name = "ApiError", this.url = e.url, this.status = e.status, this.statusText = e.statusText, this.body = e.body, this.request = t;
  }
}
class Re extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class Ne {
  constructor(t) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((e, n) => {
      this._resolve = e, this._reject = n;
      const i = (r) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(r));
      }, o = (r) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(r));
      }, a = (r) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(r);
      };
      return Object.defineProperty(a, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(a, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(a, "isCancelled", {
        get: () => this._isCancelled
      }), t(i, o, a);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(t, e) {
    return this.promise.then(t, e);
  }
  catch(t) {
    return this.promise.catch(t);
  }
  finally(t) {
    return this.promise.finally(t);
  }
  cancel() {
    if (!(this._isResolved || this._isRejected || this._isCancelled)) {
      if (this._isCancelled = !0, this.cancelHandlers.length)
        try {
          for (const t of this.cancelHandlers)
            t();
        } catch (t) {
          console.warn("Cancellation threw an error", t);
          return;
        }
      this.cancelHandlers.length = 0, this._reject && this._reject(new Re("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class Ot {
  constructor() {
    this._fns = [];
  }
  eject(t) {
    const e = this._fns.indexOf(t);
    e !== -1 && (this._fns = [...this._fns.slice(0, e), ...this._fns.slice(e + 1)]);
  }
  use(t) {
    this._fns = [...this._fns, t];
  }
}
const h = {
  BASE: "",
  CREDENTIALS: "include",
  ENCODE_PATH: void 0,
  HEADERS: void 0,
  PASSWORD: void 0,
  TOKEN: void 0,
  USERNAME: void 0,
  VERSION: "Latest",
  WITH_CREDENTIALS: !1,
  interceptors: {
    request: new Ot(),
    response: new Ot()
  }
}, W = (s) => typeof s == "string", et = (s) => W(s) && s !== "", lt = (s) => s instanceof Blob, zt = (s) => s instanceof FormData, Me = (s) => {
  try {
    return btoa(s);
  } catch {
    return Buffer.from(s).toString("base64");
  }
}, De = (s) => {
  const t = [], e = (i, o) => {
    t.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(o))}`);
  }, n = (i, o) => {
    o != null && (o instanceof Date ? e(i, o.toISOString()) : Array.isArray(o) ? o.forEach((a) => n(i, a)) : typeof o == "object" ? Object.entries(o).forEach(([a, r]) => n(`${i}[${a}]`, r)) : e(i, o));
  };
  return Object.entries(s).forEach(([i, o]) => n(i, o)), t.length ? `?${t.join("&")}` : "";
}, ke = (s, t) => {
  const e = encodeURI, n = t.url.replace("{api-version}", s.VERSION).replace(/{(.*?)}/g, (o, a) => {
    var r;
    return (r = t.path) != null && r.hasOwnProperty(a) ? e(String(t.path[a])) : o;
  }), i = s.BASE + n;
  return t.query ? i + De(t.query) : i;
}, Le = (s) => {
  if (s.formData) {
    const t = new FormData(), e = (n, i) => {
      W(i) || lt(i) ? t.append(n, i) : t.append(n, JSON.stringify(i));
    };
    return Object.entries(s.formData).filter(([, n]) => n != null).forEach(([n, i]) => {
      Array.isArray(i) ? i.forEach((o) => e(n, o)) : e(n, i);
    }), t;
  }
}, q = async (s, t) => typeof t == "function" ? t(s) : t, xe = async (s, t) => {
  const [e, n, i, o] = await Promise.all([
    // @ts-ignore
    q(t, s.TOKEN),
    // @ts-ignore
    q(t, s.USERNAME),
    // @ts-ignore
    q(t, s.PASSWORD),
    // @ts-ignore
    q(t, s.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([, r]) => r != null).reduce((r, [d, p]) => ({
    ...r,
    [d]: String(p)
  }), {});
  if (et(e) && (a.Authorization = `Bearer ${e}`), et(n) && et(i)) {
    const r = Me(`${n}:${i}`);
    a.Authorization = `Basic ${r}`;
  }
  return t.body !== void 0 && (t.mediaType ? a["Content-Type"] = t.mediaType : lt(t.body) ? a["Content-Type"] = t.body.type || "application/octet-stream" : W(t.body) ? a["Content-Type"] = "text/plain" : zt(t.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, je = (s) => {
  var t, e;
  if (s.body !== void 0)
    return (t = s.mediaType) != null && t.includes("application/json") || (e = s.mediaType) != null && e.includes("+json") ? JSON.stringify(s.body) : W(s.body) || lt(s.body) || zt(s.body) ? s.body : JSON.stringify(s.body);
}, We = async (s, t, e, n, i, o, a) => {
  const r = new AbortController();
  let d = {
    headers: o,
    body: n ?? i,
    method: t.method,
    signal: r.signal
  };
  s.WITH_CREDENTIALS && (d.credentials = s.CREDENTIALS);
  for (const p of s.interceptors.request._fns)
    d = await p(d);
  return a(() => r.abort()), await fetch(e, d);
}, Ve = (s, t) => {
  if (t) {
    const e = s.headers.get(t);
    if (W(e))
      return e;
  }
}, qe = async (s) => {
  if (s.status !== 204)
    try {
      const t = s.headers.get("Content-Type");
      if (t) {
        const e = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (t.includes("application/json") || t.includes("+json"))
          return await s.json();
        if (e.some((n) => t.includes(n)))
          return await s.blob();
        if (t.includes("multipart/form-data"))
          return await s.formData();
        if (t.includes("text/"))
          return await s.text();
      }
    } catch (t) {
      console.error(t);
    }
}, He = (s, t) => {
  const n = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "Im a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    ...s.errors
  }[t.status];
  if (n)
    throw new vt(s, t, n);
  if (!t.ok) {
    const i = t.status ?? "unknown", o = t.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new vt(
      s,
      t,
      `Generic Error: status: ${i}; status text: ${o}; body: ${a}`
    );
  }
}, S = (s, t) => new Ne(async (e, n, i) => {
  try {
    const o = ke(s, t), a = Le(t), r = je(t), d = await xe(s, t);
    if (!i.isCancelled) {
      let p = await We(s, t, o, r, a, d, i);
      for (const re of s.interceptors.response._fns)
        p = await re(p);
      const yt = await qe(p), ae = Ve(p, t.responseHeader);
      let _t = yt;
      t.responseTransformer && p.ok && (_t = await t.responseTransformer(yt));
      const bt = {
        url: o,
        ok: p.ok,
        status: p.status,
        statusText: p.statusText,
        body: ae ?? _t
      };
      He(t, bt), e(bt.body);
    }
  } catch (o) {
    n(o);
  }
});
class P {
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllIssues(t = {}) {
    return S(h, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/all-issues",
      query: {
        skip: t.skip,
        take: t.take
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getDuplicateContentUrls() {
    return S(h, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/duplicate-content"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getHealthScore() {
    return S(h, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/health-score"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getLatestAuditOverview() {
    return S(h, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/latest-audit"
    });
  }
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @returns unknown OK
   * @throws ApiError
   */
  static getLatestAuditData(t = {}) {
    return S(h, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/latest-data",
      query: {
        skip: t.skip,
        take: t.take
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getPagesWithMissingMetadata() {
    return S(h, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/missing-metadata"
    });
  }
}
class Be {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getSettings() {
    return S(h, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/get-settings"
    });
  }
}
var _;
class ze {
  constructor(t) {
    l(this, _);
    u(this, _, t);
  }
  async getLatestAuditOverview() {
    return await T(c(this, _), P.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await T(c(this, _), P.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await T(c(this, _), P.getAllIssues({ skip: 0, take: 5 }));
  }
  async getHealthScore() {
    return await T(c(this, _), P.getHealthScore());
  }
}
_ = new WeakMap();
var k;
class Ye {
  constructor(t) {
    l(this, k);
    u(this, k, t);
  }
  async getSettings() {
    return await T(c(this, k), Be.getSettings());
  }
}
k = new WeakMap();
var b, L;
class Ge extends kt {
  constructor(e) {
    super(e);
    l(this, b);
    l(this, L);
    u(this, b, new ze(this)), u(this, L, new Ye(this));
  }
  async getLatestAuditOverview() {
    return c(this, b).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return c(this, b).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return c(this, b).getTopIssues();
  }
  async getHealthScore() {
    return c(this, b).getHealthScore();
  }
  async getSettings() {
    return c(this, L).getSettings();
  }
}
b = new WeakMap(), L = new WeakMap();
var f, A, E, w, v, O;
class st extends kt {
  constructor(e) {
    super(e);
    l(this, f);
    l(this, A);
    l(this, E);
    l(this, w);
    l(this, v);
    l(this, O);
    this.workspaceAlias = G, u(this, A, new Z(void 0)), this.latestAuditOverview = c(this, A).asObservable(), u(this, E, new St([], (n) => n.id)), this.pagesWithMissingMetadata = c(this, E).asObservable(), u(this, w, new St([], (n) => n.name)), this.topIssues = c(this, w).asObservable(), u(this, v, new Z(void 0)), this.healthScore = c(this, v).asObservable(), u(this, O, new Z(void 0)), this.settings = c(this, O).asObservable(), this.provideContext(de, this), this.provideContext(Yt, this), u(this, f, new Ge(this));
  }
  getEntityType() {
    return Bt;
  }
  async getLatestAuditOverview() {
    const { data: e } = await c(this, f).getLatestAuditOverview();
    e && c(this, A).setValue(e);
  }
  async getPagesWithMissingMetadata() {
    const { data: e } = await c(this, f).getPagesWithMissingMetadata();
    e && c(this, E).setValue(e);
  }
  async getTopIssues() {
    const { data: e } = await c(this, f).getTopIssues();
    e && c(this, w).setValue(e.items);
  }
  async getHealthScore() {
    const { data: e } = await c(this, f).getHealthScore();
    e && c(this, v).setValue(e);
  }
  async getSettings() {
    const { data: e } = await c(this, f).getSettings();
    e && c(this, O).setValue(e);
  }
}
f = new WeakMap(), A = new WeakMap(), E = new WeakMap(), w = new WeakMap(), v = new WeakMap(), O = new WeakMap();
const Yt = new ue(
  "ContentAuditContext"
), Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: Yt,
  ContentAuditContext: st,
  default: st
}, Symbol.toStringTag, { value: "Module" }));
var Ke = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, Xe = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Je(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = (n ? a(t, e, i) : a(i)) || i);
  return n && i && Ke(t, e, i), i;
};
let F = class extends it(ot) {
  constructor() {
    super(), this._workspaceContext = new st(this);
  }
  render() {
    return m`
			<umb-workspace-editor headline="Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
F = Xe([
  at("content-audit-workspace-root")
], F);
const Qe = F, Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return F;
  },
  default: Qe
}, Symbol.toStringTag, { value: "Module" })), $ = "Umb.Menu.ContentAudit", ut = "Umb.Menu.ContentMetadata", dt = "Umb.Collection.ContentAudit.Issues", ts = "Umb.CollectionView.ContentAudit.Issues.Table", Gt = "Umb.Repository.ContentAuditIssuesCollection";
var x;
class es {
  constructor(t) {
    l(this, x);
    u(this, x, t);
  }
  async getCollection(t) {
    const { data: e, error: n } = await T(c(this, x), P.getAllIssues(t));
    if (n)
      return { error: n };
    if (!e)
      return { data: { items: [], total: 0 } };
    const { items: i, total: o } = e;
    return { data: { items: i, total: o } };
  }
}
x = new WeakMap();
var j;
class It extends pe {
  constructor(e) {
    super(e);
    l(this, j);
    u(this, j, new es(e));
  }
  async requestCollection(e) {
    return c(this, j).getCollection(e);
  }
}
j = new WeakMap();
const ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: It,
  default: It
}, Symbol.toStringTag, { value: "Module" }));
var ns = Object.defineProperty, is = Object.getOwnPropertyDescriptor, Ft = (s) => {
  throw TypeError(s);
}, V = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? is(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = (n ? a(t, e, i) : a(i)) || i);
  return n && i && ns(t, e, i), i;
}, pt = (s, t, e) => t.has(s) || Ft("Cannot " + e), $t = (s, t, e) => (pt(s, t, "read from private field"), t.get(s)), Ut = (s, t, e) => t.has(s) ? Ft("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), os = (s, t, e, n) => (pt(s, t, "write to private field"), t.set(s, e), e), nt = (s, t, e) => (pt(s, t, "access private method"), e), M, N, Kt, ht;
let y = class extends jt {
  constructor() {
    super(), Ut(this, N), this.data = [], this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Issue",
        alias: "name"
      },
      {
        name: "Type",
        alias: "type"
      },
      {
        name: "Priority",
        alias: "priority"
      },
      {
        name: "Number of URLs affected",
        alias: "numberOfUrls"
      },
      {
        name: "Percentage of all pages",
        alias: "percentOfTotal"
      }
    ], this._tableItems = [], Ut(this, M), this.consumeContext(Lt, (s) => {
      os(this, M, s), nt(this, N, Kt).call(this);
    });
  }
  updated(s) {
    s.has("data") && this.data.length !== 0 && nt(this, N, ht).call(this, this.data);
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
M = /* @__PURE__ */ new WeakMap();
N = /* @__PURE__ */ new WeakSet();
Kt = function() {
  $t(this, M) && this.observe($t(this, M).items, (s) => nt(this, N, ht).call(this, s), "umbCollectionItemsObserver");
};
ht = function(s) {
  this._tableItems = s.map((t, e) => ({
    id: t.unique,
    entityType: "issue-type",
    icon: "icon-alert",
    data: [
      {
        columnAlias: "name",
        value: m`<strong>${t.category}: ${t.name}</strong><br/>${t.description}`
      },
      {
        columnAlias: "type",
        value: m`<content-audit-issue-type-label .type=${t.type}></content-audit-issue-type-label`
      },
      {
        columnAlias: "priority",
        value: m`<content-audit-priority-type-label .type=${t.priority}></content-audit-priority-type-label>`
      },
      {
        columnAlias: "numberOfUrls",
        value: t.numberOfUrls
      },
      {
        columnAlias: "percentOfTotal",
        value: `${t.percentOfTotal.toFixed(2)}%`
      }
    ]
  }));
};
y.styles = [
  X`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
V([
  le({ type: Array, attribute: !1 })
], y.prototype, "data", 2);
V([
  I()
], y.prototype, "_tableConfig", 2);
V([
  I()
], y.prototype, "_tableColumns", 2);
V([
  I()
], y.prototype, "_tableItems", 2);
y = V([
  Dt("content-audit-issues-table-collection-view")
], y);
const as = y, rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return y;
  },
  default: as
}, Symbol.toStringTag, { value: "Module" })), Jt = "issues-root", cs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: Jt,
    menus: [$]
  }
}, ls = [cs], Pt = "Umb.Workspace.ContentAudit.Issues", us = [
  {
    type: "workspace",
    kind: "default",
    alias: Pt,
    name: "Issues Root Workspace",
    meta: {
      entityType: Jt,
      headline: "Issues"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.Issues.Collection",
    name: "Content Audit Issues Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: dt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Pt
      }
    ]
  }
], ds = [
  {
    type: "repository",
    alias: Gt,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => ss)
  }
], ps = [
  {
    type: "collectionView",
    alias: ts,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => rs),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: xt,
        match: dt
      }
    ]
  }
], hs = [
  {
    type: "collection",
    kind: "default",
    alias: dt,
    name: "Issues Collection",
    element: () => import("./issues.element-VH8WvbHX.js"),
    meta: {
      repositoryAlias: Gt
    }
  },
  ...ds,
  ...ps
], ms = [
  ...us,
  ...ls,
  ...hs
], Xt = "status-codes-root", fs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: Xt,
    menus: [$]
  }
}, ys = [fs], mt = "Umb.Collection.ContentAudit.StatusCodes", _s = "Umb.CollectionView.ContentAudit.StatusCodes.Table", Qt = "Umb.Repository.ContentAuditStatusCodesCollection";
var bs = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, Zt = (s) => {
  throw TypeError(s);
}, Q = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Cs(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = (n ? a(t, e, i) : a(i)) || i);
  return n && i && bs(t, e, i), i;
}, ft = (s, t, e) => t.has(s) || Zt("Cannot " + e), Rt = (s, t, e) => (ft(s, t, "read from private field"), t.get(s)), Nt = (s, t, e) => t.has(s) ? Zt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), gs = (s, t, e, n) => (ft(s, t, "write to private field"), t.set(s, e), e), te = (s, t, e) => (ft(s, t, "access private method"), e), D, K, ee, se;
let g = class extends jt {
  constructor() {
    super(), Nt(this, K), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      },
      {
        name: "Status Code",
        alias: "statusCode"
      }
    ], this._tableItems = [], Nt(this, D), this.consumeContext(Lt, (s) => {
      gs(this, D, s), te(this, K, ee).call(this);
    });
  }
  _getColor(s) {
    return console.log(s >= 200), s >= 200 && s < 300 ? "positive" : s >= 300 && s < 400 ? "warning" : s >= 400 && s < 600 ? "danger" : "default";
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
D = /* @__PURE__ */ new WeakMap();
K = /* @__PURE__ */ new WeakSet();
ee = function() {
  Rt(this, D) && this.observe(Rt(this, D).items, (s) => te(this, K, se).call(this, s), "umbCollectionItemsObserver");
};
se = function(s) {
  this._tableItems = s.map((t) => ({
    id: t.unique,
    entityType: t.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: m`<a href=${t.url} target="_blank">${t.url}</a>`
      },
      {
        columnAlias: "statusCode",
        value: m`<uui-tag color=${this._getColor(t.statusCode)}>${t.statusCode}</uui-tag>`
      }
    ]
  }));
};
g.styles = [
  X`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Q([
  I()
], g.prototype, "_tableConfig", 2);
Q([
  I()
], g.prototype, "_tableColumns", 2);
Q([
  I()
], g.prototype, "_tableItems", 2);
g = Q([
  Dt("content-audit-status-codes-table-collection-view")
], g);
const Ss = g, Ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return g;
  },
  default: Ss
}, Symbol.toStringTag, { value: "Module" })), Mt = "Umb.Workspace.ContentAudit.StatusCodes", As = [
  {
    type: "workspace",
    kind: "default",
    alias: Mt,
    name: "StatusCodes Root Workspace",
    meta: {
      entityType: Xt,
      headline: "Status Codes"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.StatusCodes.Collection",
    name: "Content Audit Status Codes Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: mt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Mt
      }
    ]
  }
], Es = [
  {
    type: "repository",
    alias: Qt,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-Dj3-LHIa.js")
  }
], ws = [
  {
    type: "collectionView",
    alias: _s,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => Ts),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: xt,
        match: mt
      }
    ]
  }
], vs = [
  {
    type: "collection",
    kind: "default",
    alias: mt,
    name: "Status Codes Collection",
    meta: {
      repositoryAlias: Qt
    }
  },
  ...Es,
  ...ws
], Os = [
  ...As,
  ...ys,
  ...vs
], ne = "orphaned-pages-root", Is = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 2e3,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: ne,
    menus: [ut]
  }
}, $s = [Is], Us = "Umb.Workspace.ContentAudit.OrphanedPages", Ps = [
  {
    type: "workspace",
    alias: Us,
    name: "Orphaned Pages Root Workspace",
    js: () => import("./orphaned-pages-workspace-view.element-CZJGbSyQ.js"),
    meta: {
      entityType: ne
    }
  }
], Rs = [
  ...Ps,
  ...$s
], ie = "metadata-root", Ns = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: ie,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, Ms = [Ns], Ds = "Umb.Workspace.ContentAudit.Metadata", ks = [
  {
    type: "workspace",
    alias: Ds,
    name: "Metadata Root Workspace",
    js: () => import("./metadata-workspace-view.element-NBuuLXBV.js"),
    meta: {
      entityType: ie
    }
  }
], Ls = [
  ...ks,
  ...Ms
], oe = "duplicate-content-root", xs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.DuplicateContent",
  name: "Duplicate Content Menu Item",
  weight: 2e3,
  meta: {
    label: "Duplicate Content",
    icon: "icon-documents",
    entityType: oe,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, js = [xs], Ws = "Umb.Workspace.ContentAudit.DuplicateContent", Vs = [
  {
    type: "workspace",
    alias: Ws,
    name: "Duplicate Content Root Workspace",
    js: () => import("./duplicate-content-workspace-view.element-BjeIXo9I.js"),
    meta: {
      entityType: oe
    }
  }
], qs = [
  ...Vs,
  ...js
], Hs = "inbound-links-root", Bs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Hs,
    menus: [$]
  }
}, zs = [Bs], Ys = [
  //...workspaceManifests,
  ...zs
], Gs = "outbound-links-root", Fs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: Gs,
    menus: [$]
  }
}, Ks = [Fs], Js = [
  //...workspaceManifests,
  ...Ks
], J = "Umb.Section.ContentAudit", Xs = {
  type: "section",
  alias: J,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Qs = {
  type: "sectionView",
  alias: "Umb.SectionView.ContentAudit.Scan",
  name: "Content Audit Scan Section View",
  element: () => import("./section.element-4EHKqOry.js"),
  meta: {
    label: "Scan",
    icon: "icon-scan",
    pathname: "audit-root"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: J
    }
  ]
}, Zs = [
  {
    type: "menu",
    alias: $,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: ut,
    name: "Content Menu"
  }
], tn = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: $
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: J
      }
    ]
  },
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentMetadata",
    name: "Content Sidebar Menu",
    meta: {
      label: "Content",
      menu: ut
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: J
      }
    ]
  }
], en = [
  Xs,
  Qs,
  ...Zs,
  ...tn,
  ...ms,
  ...Os,
  ...Rs,
  ...Ls,
  ...qs,
  ...Ys,
  ...Js
], sn = {
  type: "workspace",
  alias: G,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Ze),
  meta: {
    entityType: Bt
  }
}, nn = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-C_pb7hPd.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: G
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-BVtVMSdX.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: G
      }
    ]
  }
], on = [
  sn,
  ...nn
], an = {
  type: "globalContext",
  alias: Pe,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Fe)
}, An = async (s, t) => {
  t.registerMany([
    an,
    ...en,
    ...on
  ]), s.consumeContext(ce, async (e) => {
    if (!e) return;
    const n = e.getOpenApiConfiguration();
    h.BASE = n.base, h.TOKEN = n.token, h.WITH_CREDENTIALS = n.withCredentials, h.CREDENTIALS = n.credentials;
  });
};
export {
  P as A,
  Yt as C,
  we as I,
  gn as U,
  z as a,
  Y as b,
  Sn as c,
  Tn as d,
  ve as e,
  st as f,
  F as g,
  G as h,
  Pe as i,
  Bt as j,
  $ as k,
  ut as l,
  dt as m,
  ts as n,
  An as o,
  Gt as p,
  It as q,
  es as r,
  y as s
};
//# sourceMappingURL=index-CcxDD8J7.js.map
