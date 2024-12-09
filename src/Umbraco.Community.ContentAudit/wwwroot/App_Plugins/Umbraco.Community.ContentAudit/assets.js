var W = (s) => {
  throw TypeError(s);
};
var q = (s, t, e) => t.has(s) || W("Cannot " + e);
var p = (s, t, e) => (q(s, t, "read from private field"), e ? e.call(s) : t.get(s)), u = (s, t, e) => t.has(s) ? W("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), h = (s, t, e, n) => (q(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e);
import { UMB_AUTH_CONTEXT as at } from "@umbraco-cms/backoffice/auth";
import { UmbControllerBase as K } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as ct } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as dt } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as lt } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as ut } from "@umbraco-cms/backoffice/observable-api";
import { UmbElementMixin as ht } from "@umbraco-cms/backoffice/element-api";
import { LitElement as pt, html as mt } from "@umbraco-cms/backoffice/external/lit";
const b = "Umb.Workspace.ContentAudit", ft = "Umb.Context.ContentAudit", G = "content-audit";
class B extends Error {
  constructor(t, e, n) {
    super(n), this.name = "ApiError", this.url = e.url, this.status = e.status, this.statusText = e.statusText, this.body = e.body, this.request = t;
  }
}
class yt extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class _t {
  constructor(t) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((e, n) => {
      this._resolve = e, this._reject = n;
      const i = (a) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(a));
      }, o = (a) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(a));
      }, r = (a) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(a);
      };
      return Object.defineProperty(r, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(r, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(r, "isCancelled", {
        get: () => this._isCancelled
      }), t(i, o, r);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new yt("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class H {
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
const y = {
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
    request: new H(),
    response: new H()
  }
}, S = (s) => typeof s == "string", R = (s) => S(s) && s !== "", k = (s) => s instanceof Blob, J = (s) => s instanceof FormData, bt = (s) => {
  try {
    return btoa(s);
  } catch {
    return Buffer.from(s).toString("base64");
  }
}, At = (s) => {
  const t = [], e = (i, o) => {
    t.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(o))}`);
  }, n = (i, o) => {
    o != null && (o instanceof Date ? e(i, o.toISOString()) : Array.isArray(o) ? o.forEach((r) => n(i, r)) : typeof o == "object" ? Object.entries(o).forEach(([r, a]) => n(`${i}[${r}]`, a)) : e(i, o));
  };
  return Object.entries(s).forEach(([i, o]) => n(i, o)), t.length ? `?${t.join("&")}` : "";
}, Et = (s, t) => {
  const e = encodeURI, n = t.url.replace("{api-version}", s.VERSION).replace(/{(.*?)}/g, (o, r) => {
    var a;
    return (a = t.path) != null && a.hasOwnProperty(r) ? e(String(t.path[r])) : o;
  }), i = s.BASE + n;
  return t.query ? i + At(t.query) : i;
}, Ct = (s) => {
  if (s.formData) {
    const t = new FormData(), e = (n, i) => {
      S(i) || k(i) ? t.append(n, i) : t.append(n, JSON.stringify(i));
    };
    return Object.entries(s.formData).filter(([, n]) => n != null).forEach(([n, i]) => {
      Array.isArray(i) ? i.forEach((o) => e(n, o)) : e(n, i);
    }), t;
  }
}, T = async (s, t) => typeof t == "function" ? t(s) : t, St = async (s, t) => {
  const [e, n, i, o] = await Promise.all([
    // @ts-ignore
    T(t, s.TOKEN),
    // @ts-ignore
    T(t, s.USERNAME),
    // @ts-ignore
    T(t, s.PASSWORD),
    // @ts-ignore
    T(t, s.HEADERS)
  ]), r = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([, a]) => a != null).reduce((a, [d, c]) => ({
    ...a,
    [d]: String(c)
  }), {});
  if (R(e) && (r.Authorization = `Bearer ${e}`), R(n) && R(i)) {
    const a = bt(`${n}:${i}`);
    r.Authorization = `Basic ${a}`;
  }
  return t.body !== void 0 && (t.mediaType ? r["Content-Type"] = t.mediaType : k(t.body) ? r["Content-Type"] = t.body.type || "application/octet-stream" : S(t.body) ? r["Content-Type"] = "text/plain" : J(t.body) || (r["Content-Type"] = "application/json")), new Headers(r);
}, Tt = (s) => {
  var t, e;
  if (s.body !== void 0)
    return (t = s.mediaType) != null && t.includes("application/json") || (e = s.mediaType) != null && e.includes("+json") ? JSON.stringify(s.body) : S(s.body) || k(s.body) || J(s.body) ? s.body : JSON.stringify(s.body);
}, wt = async (s, t, e, n, i, o, r) => {
  const a = new AbortController();
  let d = {
    headers: o,
    body: n ?? i,
    method: t.method,
    signal: a.signal
  };
  s.WITH_CREDENTIALS && (d.credentials = s.CREDENTIALS);
  for (const c of s.interceptors.request._fns)
    d = await c(d);
  return r(() => a.abort()), await fetch(e, d);
}, gt = (s, t) => {
  if (t) {
    const e = s.headers.get(t);
    if (S(e))
      return e;
  }
}, Ut = async (s) => {
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
}, Ot = (s, t) => {
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
    throw new B(s, t, n);
  if (!t.ok) {
    const i = t.status ?? "unknown", o = t.statusText ?? "unknown", r = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new B(
      s,
      t,
      `Generic Error: status: ${i}; status text: ${o}; body: ${r}`
    );
  }
}, $t = (s, t) => new _t(async (e, n, i) => {
  try {
    const o = Et(s, t), r = Ct(t), a = Tt(t), d = await St(s, t);
    if (!i.isCancelled) {
      let c = await wt(s, t, o, a, r, d, i);
      for (const rt of s.interceptors.response._fns)
        c = await rt(c);
      const j = await Ut(c), ot = gt(c, t.responseHeader);
      let L = j;
      t.responseTransformer && c.ok && (L = await t.responseTransformer(j));
      const x = {
        url: o,
        ok: c.ok,
        status: c.status,
        statusText: c.statusText,
        body: ot ?? L
      };
      Ot(t, x), e(x.body);
    }
  } catch (o) {
    n(o);
  }
});
class vt {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getLatestAuditOverview() {
    return $t(y, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/latest-audit"
    });
  }
}
var A;
class Rt {
  constructor(t) {
    u(this, A);
    h(this, A, t);
  }
  async getLatestAuditOverview() {
    return await lt(p(this, A), vt.getLatestAuditOverview());
  }
}
A = new WeakMap();
var O;
class It {
  constructor(t) {
    u(this, O);
    h(this, O, t);
  }
}
O = new WeakMap();
var E, $;
class Pt extends K {
  constructor(e) {
    super(e);
    u(this, E);
    u(this, $);
    h(this, E, new Rt(this)), h(this, $, new It(this));
  }
  async getLatestAuditOverview() {
    return p(this, E).getLatestAuditOverview();
  }
}
E = new WeakMap(), $ = new WeakMap();
var C, m;
class P extends K {
  constructor(e) {
    super(e);
    u(this, C);
    u(this, m);
    this.workspaceAlias = b, h(this, m, new ut(void 0)), this.latestAuditOverview = p(this, m).asObservable(), this.provideContext(dt, this), this.provideContext(X, this), h(this, C, new Pt(this));
  }
  getEntityType() {
    return G;
  }
  async getLatestAuditOverview() {
    const { data: e } = await p(this, C).getLatestAuditOverview();
    e && p(this, m).setValue(e);
  }
}
C = new WeakMap(), m = new WeakMap();
const X = new ct(
  "ContentAuditWorkspaceContext"
), Nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: X,
  ContentAuditWorkspaceContext: P,
  default: P
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis, M = w.ShadowRoot && (w.ShadyCSS === void 0 || w.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), V = /* @__PURE__ */ new WeakMap();
let Mt = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (M && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = V.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && V.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Dt = (s) => new Mt(typeof s == "string" ? s : s + "", void 0, Q), jt = (s, t) => {
  if (M) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), i = w.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = e.cssText, s.appendChild(n);
  }
}, z = M ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return Dt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Lt, defineProperty: xt, getOwnPropertyDescriptor: Wt, getOwnPropertyNames: qt, getOwnPropertySymbols: Bt, getPrototypeOf: Ht } = Object, l = globalThis, Y = l.trustedTypes, Vt = Y ? Y.emptyScript : "", I = l.reactiveElementPolyfillSupport, _ = (s, t) => s, N = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Vt : null;
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
} }, Z = (s, t) => !Lt(s, t), F = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: Z };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), l.litPropertyMetadata ?? (l.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class f extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = F) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, e);
      i !== void 0 && xt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: i, set: o } = Wt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(r) {
      const a = i == null ? void 0 : i.call(this);
      o.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? F;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_("elementProperties"))) return;
    const t = Ht(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_("properties"))) {
      const e = this.properties, n = [...qt(e), ...Bt(e)];
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
      for (const i of n) e.unshift(z(i));
    } else t !== void 0 && e.push(z(t));
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
    return jt(t, this.constructor.elementStyles), t;
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
      const r = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : N).toAttribute(e, n.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = n.getPropertyOptions(i), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : N;
      this._$Em = i, this[i] = a.fromAttribute(e, r.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, n) {
    if (t !== void 0) {
      if (n ?? (n = this.constructor.getPropertyOptions(t)), !(n.hasChanged ?? Z)(this[t], e)) return;
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, r] of i) r.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], r);
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
f.elementStyles = [], f.shadowRootOptions = { mode: "open" }, f[_("elementProperties")] = /* @__PURE__ */ new Map(), f[_("finalized")] = /* @__PURE__ */ new Map(), I == null || I({ ReactiveElement: f }), (l.reactiveElementVersions ?? (l.reactiveElementVersions = [])).push("2.0.4");
var zt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, Ft = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Yt(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (i = (n ? r(t, e, i) : r(i)) || i);
  return n && i && zt(t, e, i), i;
};
let g = class extends ht(pt) {
  constructor() {
    super(), this._workspaceContext = new P(this);
  }
  render() {
    return mt`
			<umb-workspace-editor headline="Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
g = Ft([
  kt("content-audit-workspace-root")
], g);
const Kt = g, Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return g;
  },
  default: Kt
}, Symbol.toStringTag, { value: "Module" })), tt = "url-inventory-root", Jt = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.UrlInventory",
  name: "URL Inventory Menu Item",
  weight: 2e3,
  meta: {
    label: "URL Inventory",
    icon: "icon-scan",
    entityType: tt,
    menus: ["Umb.Menu.ContentAudit"]
  }
}, Xt = [Jt], Qt = "Umb.Workspace.ContentAudit.UrlInventory", Zt = [
  {
    type: "workspace",
    alias: Qt,
    name: "URL Inventory Root Workspace",
    js: () => import("./overview-workspace-view.element-CtOiyywm.js"),
    meta: {
      entityType: tt
    }
  }
], te = [
  ...Zt,
  ...Xt
], et = "status-codes-root", ee = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-alert",
    entityType: et,
    menus: ["Umb.Menu.ContentAudit"]
  }
}, se = [ee], ne = "Umb.Workspace.ContentAudit.StatusCodes", ie = [
  {
    type: "workspace",
    alias: ne,
    name: "Status Codes Root Workspace",
    js: () => import("./status-codes-workspace-view.element-C0CemEtO.js"),
    meta: {
      entityType: et
    }
  }
], oe = [
  ...ie,
  ...se
], st = "orphaned-pages-root", v = "Umb.Menu.ContentAudit", D = "Umb.Menu.ContentMetadata", re = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 2e3,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: st,
    menus: [D]
  }
}, ae = [re], ce = "Umb.Workspace.ContentAudit.OrphanedPages", de = [
  {
    type: "workspace",
    alias: ce,
    name: "Orphaned Pages Root Workspace",
    js: () => import("./orphaned-pages-workspace-view.element-CZJGbSyQ.js"),
    meta: {
      entityType: st
    }
  }
], le = [
  ...de,
  ...ae
], nt = "metadata-root", ue = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: nt,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, he = [ue], pe = "Umb.Workspace.ContentAudit.Metadata", me = [
  {
    type: "workspace",
    alias: pe,
    name: "Metadata Root Workspace",
    js: () => import("./metadata-workspace-view.element-DUFUOnzg.js"),
    meta: {
      entityType: nt
    }
  }
], fe = [
  ...me,
  ...he
], it = "duplicate-content-root", ye = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.DuplicateContent",
  name: "Duplicate Content Menu Item",
  weight: 2e3,
  meta: {
    label: "Duplicate Content",
    icon: "icon-documents",
    entityType: it,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, _e = [ye], be = "Umb.Workspace.ContentAudit.DuplicateContent", Ae = [
  {
    type: "workspace",
    alias: be,
    name: "Duplicate Content Root Workspace",
    js: () => import("./duplicate-content-workspace-view.element-BjeIXo9I.js"),
    meta: {
      entityType: it
    }
  }
], Ee = [
  ...Ae,
  ..._e
], Ce = "inbound-links-root", Se = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Ce,
    menus: [v]
  }
}, Te = [Se], we = [
  //...workspaceManifests,
  ...Te
], ge = "outbound-links-root", Ue = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: ge,
    menus: [v]
  }
}, Oe = [Ue], $e = [
  //...workspaceManifests,
  ...Oe
], U = "Umb.Section.ContentAudit", ve = {
  type: "section",
  alias: U,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Re = {
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
      match: U
    }
  ]
}, Ie = [
  {
    type: "menu",
    alias: v,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: D,
    name: "Content Menu"
  }
], Pe = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: v
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: U
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
      menu: D
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: U
      }
    ]
  }
], Ne = [
  ve,
  Re,
  ...Ie,
  ...Pe,
  ...te,
  ...oe,
  ...le,
  ...fe,
  ...Ee,
  ...we,
  ...$e
], ke = {
  type: "workspace",
  alias: b,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Gt),
  meta: {
    entityType: G
  }
}, Me = {
  type: "workspaceContext",
  alias: ft,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Nt),
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: b
    }
  ]
}, De = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-Dkpz4JhL.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: b
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-hHRUc-gB.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: b
      }
    ]
  }
], je = [
  ke,
  Me,
  ...De
], Ke = async (s, t) => {
  t.registerMany([
    ...Ne,
    ...je
  ]), s.consumeContext(at, async (e) => {
    if (!e) return;
    const n = e.getOpenApiConfiguration();
    y.BASE = n.base, y.TOKEN = n.token, y.WITH_CREDENTIALS = n.withCredentials, y.CREDENTIALS = n.credentials;
  });
};
export {
  ft as CONTENT_AUDIT_CONTEXT_ALIAS,
  X as CONTENT_AUDIT_CONTEXT_TOKEN,
  G as CONTENT_AUDIT_ENTITY_TYPE,
  b as CONTENT_AUDIT_WORKSPACE_ALIAS,
  P as ContentAuditWorkspaceContext,
  g as ContentAuditWorkspaceRootElement,
  Ke as onInit
};
//# sourceMappingURL=assets.js.map
