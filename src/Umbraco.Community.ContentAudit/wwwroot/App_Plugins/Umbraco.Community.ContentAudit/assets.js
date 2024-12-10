var K = (s) => {
  throw TypeError(s);
};
var G = (s, t, e) => t.has(s) || K("Cannot " + e);
var c = (s, t, e) => (G(s, t, "read from private field"), e ? e.call(s) : t.get(s)), u = (s, t, e) => t.has(s) ? K("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), d = (s, t, e, n) => (G(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e);
import { UMB_AUTH_CONTEXT as St } from "@umbraco-cms/backoffice/auth";
import { LitElement as it, html as S, repeat as Tt, css as wt, property as $t, customElement as vt } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as at } from "@umbraco-cms/backoffice/element-api";
import { UmbControllerBase as ot } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as Ot } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as Ut } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as D } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as It, UmbArrayState as J } from "@umbraco-cms/backoffice/observable-api";
const Pt = [
  {
    label: "Opportunity",
    icon: "icon-info",
    class: "opportunity"
  },
  {
    label: "Warning",
    icon: "icon-stop-alt",
    class: "warning"
  },
  {
    label: "Issue",
    icon: "icon-alert",
    class: "issue"
  }
], Rt = [
  {
    label: "Low",
    icon: "icon-navigation-bottom",
    class: "low"
  },
  {
    label: "Medium",
    icon: "icon-navigation-road",
    class: "medium"
  },
  {
    label: "High",
    icon: "icon-navigation-top",
    class: "high"
  }
];
var Mt = Object.defineProperty, Nt = Object.getOwnPropertyDescriptor, rt = (s) => {
  throw TypeError(s);
}, ct = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Nt(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (n ? o(t, e, i) : o(i)) || i);
  return n && i && Mt(t, e, i), i;
}, kt = (s, t, e) => t.has(s) || rt("Cannot " + e), Dt = (s, t, e) => t.has(s) ? rt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), X = (s, t, e) => (kt(s, t, "access private method"), e), v, lt, ut;
let U = class extends at(it) {
  constructor() {
    super(...arguments), Dt(this, v), this.data = [];
  }
  render() {
    if (this.data.length > 0)
      return S`
            <uui-table>
                <uui-table-column></uui-table-column>
                <uui-table-column></uui-table-column>
                <uui-table-column></uui-table-column>
                <uui-table-column></uui-table-column>
                <uui-table-column></uui-table-column>

                <uui-table-head>
                    <uui-table-head-cell>Name</uui-table-head-cell>
                    <uui-table-head-cell>Type</uui-table-head-cell>
                    <uui-table-head-cell>Priority</uui-table-head-cell>
                    <uui-table-head-cell>URLs</uui-table-head-cell>
                    <uui-table-head-cell>%</uui-table-head-cell>
                </uui-table-head>
                ${Tt(
        this.data,
        (s) => s.name,
        (s) => {
          var t;
          return S`
                        <uui-table-row>
                            <uui-table-cell>
                                <strong>${s.category}: ${s.name}</strong><br/>
                                ${s.description}
                            </uui-table-cell>
                            <uui-table-cell>${X(this, v, lt).call(this, s.type)}</uui-table-cell>
                            <uui-table-cell>${X(this, v, ut).call(this, s.priority)}</uui-table-cell>
                            <uui-table-cell>${s.numberOfUrls}</uui-table-cell>
                            <uui-table-cell>${(t = s.percentOfTotal) == null ? void 0 : t.toFixed(2)}%</uui-table-cell>
                        </uui-table-row>
                    `;
        }
      )}
            </uui-table>
            `;
  }
};
v = /* @__PURE__ */ new WeakSet();
lt = function(s) {
  const t = Pt[parseInt(s) - 1];
  return S`
            <div class="issue-label ${t.class}">
                <uui-icon name="${t.icon}"></uui-icon>
                <span class="label">${t.label}</span>
            </div>
        `;
};
ut = function(s) {
  const t = Rt[parseInt(s) - 1];
  return S`
            <div class="issue-label ${t.class}">
                <uui-icon name="${t.icon}"></uui-icon>
                <span class="label">${t.label}</span>
            </div>
        `;
};
U.styles = [
  wt`
            .issue-label {
                display: flex;
                align-items: center;

                uui-icon {
                    margin-right: 6px;
                }
            }
        `
];
ct([
  $t({ type: Array })
], U.prototype, "data", 2);
U = ct([
  vt("audit-issue-table")
], U);
const I = "Umb.Workspace.ContentAudit", jt = "Umb.Context.ContentAudit", dt = "content-audit";
class Q extends Error {
  constructor(t, e, n) {
    super(n), this.name = "ApiError", this.url = e.url, this.status = e.status, this.statusText = e.statusText, this.body = e.body, this.request = t;
  }
}
class xt extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class Lt {
  constructor(t) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((e, n) => {
      this._resolve = e, this._reject = n;
      const i = (r) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(r));
      }, a = (r) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(r));
      }, o = (r) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(r);
      };
      return Object.defineProperty(o, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(o, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(o, "isCancelled", {
        get: () => this._isCancelled
      }), t(i, a, o);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new xt("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class Z {
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
const p = {
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
    request: new Z(),
    response: new Z()
  }
}, T = (s) => typeof s == "string", j = (s) => T(s) && s !== "", H = (s) => s instanceof Blob, ht = (s) => s instanceof FormData, Wt = (s) => {
  try {
    return btoa(s);
  } catch {
    return Buffer.from(s).toString("base64");
  }
}, qt = (s) => {
  const t = [], e = (i, a) => {
    t.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(a))}`);
  }, n = (i, a) => {
    a != null && (a instanceof Date ? e(i, a.toISOString()) : Array.isArray(a) ? a.forEach((o) => n(i, o)) : typeof a == "object" ? Object.entries(a).forEach(([o, r]) => n(`${i}[${o}]`, r)) : e(i, a));
  };
  return Object.entries(s).forEach(([i, a]) => n(i, a)), t.length ? `?${t.join("&")}` : "";
}, Ht = (s, t) => {
  const e = encodeURI, n = t.url.replace("{api-version}", s.VERSION).replace(/{(.*?)}/g, (a, o) => {
    var r;
    return (r = t.path) != null && r.hasOwnProperty(o) ? e(String(t.path[o])) : a;
  }), i = s.BASE + n;
  return t.query ? i + qt(t.query) : i;
}, Bt = (s) => {
  if (s.formData) {
    const t = new FormData(), e = (n, i) => {
      T(i) || H(i) ? t.append(n, i) : t.append(n, JSON.stringify(i));
    };
    return Object.entries(s.formData).filter(([, n]) => n != null).forEach(([n, i]) => {
      Array.isArray(i) ? i.forEach((a) => e(n, a)) : e(n, i);
    }), t;
  }
}, w = async (s, t) => typeof t == "function" ? t(s) : t, Vt = async (s, t) => {
  const [e, n, i, a] = await Promise.all([
    // @ts-ignore
    w(t, s.TOKEN),
    // @ts-ignore
    w(t, s.USERNAME),
    // @ts-ignore
    w(t, s.PASSWORD),
    // @ts-ignore
    w(t, s.HEADERS)
  ]), o = Object.entries({
    Accept: "application/json",
    ...a,
    ...t.headers
  }).filter(([, r]) => r != null).reduce((r, [h, l]) => ({
    ...r,
    [h]: String(l)
  }), {});
  if (j(e) && (o.Authorization = `Bearer ${e}`), j(n) && j(i)) {
    const r = Wt(`${n}:${i}`);
    o.Authorization = `Basic ${r}`;
  }
  return t.body !== void 0 && (t.mediaType ? o["Content-Type"] = t.mediaType : H(t.body) ? o["Content-Type"] = t.body.type || "application/octet-stream" : T(t.body) ? o["Content-Type"] = "text/plain" : ht(t.body) || (o["Content-Type"] = "application/json")), new Headers(o);
}, zt = (s) => {
  var t, e;
  if (s.body !== void 0)
    return (t = s.mediaType) != null && t.includes("application/json") || (e = s.mediaType) != null && e.includes("+json") ? JSON.stringify(s.body) : T(s.body) || H(s.body) || ht(s.body) ? s.body : JSON.stringify(s.body);
}, Yt = async (s, t, e, n, i, a, o) => {
  const r = new AbortController();
  let h = {
    headers: a,
    body: n ?? i,
    method: t.method,
    signal: r.signal
  };
  s.WITH_CREDENTIALS && (h.credentials = s.CREDENTIALS);
  for (const l of s.interceptors.request._fns)
    h = await l(h);
  return o(() => r.abort()), await fetch(e, h);
}, Ft = (s, t) => {
  if (t) {
    const e = s.headers.get(t);
    if (T(e))
      return e;
  }
}, Kt = async (s) => {
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
}, Gt = (s, t) => {
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
    throw new Q(s, t, n);
  if (!t.ok) {
    const i = t.status ?? "unknown", a = t.statusText ?? "unknown", o = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Q(
      s,
      t,
      `Generic Error: status: ${i}; status text: ${a}; body: ${o}`
    );
  }
}, $ = (s, t) => new Lt(async (e, n, i) => {
  try {
    const a = Ht(s, t), o = Bt(t), r = zt(t), h = await Vt(s, t);
    if (!i.isCancelled) {
      let l = await Yt(s, t, a, r, o, h, i);
      for (const Ct of s.interceptors.response._fns)
        l = await Ct(l);
      const z = await Kt(l), Et = Ft(l, t.responseHeader);
      let Y = z;
      t.responseTransformer && l.ok && (Y = await t.responseTransformer(z));
      const F = {
        url: a,
        ok: l.ok,
        status: l.status,
        statusText: l.statusText,
        body: Et ?? Y
      };
      Gt(t, F), e(F.body);
    }
  } catch (a) {
    n(a);
  }
});
class x {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllIssues() {
    return $(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/all-issues"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getDuplicateContentUrls() {
    return $(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/duplicate-content"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getLatestAuditOverview() {
    return $(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/latest-audit"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getPagesWithMissingMetadata() {
    return $(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/missing-metadata"
    });
  }
}
var f;
class Jt {
  constructor(t) {
    u(this, f);
    d(this, f, t);
  }
  async getLatestAuditOverview() {
    return await D(c(this, f), x.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await D(c(this, f), x.getPagesWithMissingMetadata());
  }
  async getAllIssues() {
    return await D(c(this, f), x.getAllIssues());
  }
}
f = new WeakMap();
var M;
class Xt {
  constructor(t) {
    u(this, M);
    d(this, M, t);
  }
}
M = new WeakMap();
var b, N;
class Qt extends ot {
  constructor(e) {
    super(e);
    u(this, b);
    u(this, N);
    d(this, b, new Jt(this)), d(this, N, new Xt(this));
  }
  async getLatestAuditOverview() {
    return c(this, b).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return c(this, b).getPagesWithMissingMetadata();
  }
  async getAllIssues() {
    return c(this, b).getAllIssues();
  }
}
b = new WeakMap(), N = new WeakMap();
var y, _, g, A;
class W extends ot {
  constructor(e) {
    super(e);
    u(this, y);
    u(this, _);
    u(this, g);
    u(this, A);
    this.workspaceAlias = I, d(this, _, new It(void 0)), this.latestAuditOverview = c(this, _).asObservable(), d(this, g, new J([], (n) => n.id)), this.pagesWithMissingMetadata = c(this, g).asObservable(), d(this, A, new J([], (n) => n.name)), this.allIssues = c(this, A).asObservable(), this.provideContext(Ut, this), this.provideContext(pt, this), d(this, y, new Qt(this));
  }
  getEntityType() {
    return dt;
  }
  async getLatestAuditOverview() {
    const { data: e } = await c(this, y).getLatestAuditOverview();
    e && c(this, _).setValue(e);
  }
  async getPagesWithMissingMetadata() {
    const { data: e } = await c(this, y).getPagesWithMissingMetadata();
    e && c(this, g).setValue(e);
  }
  async getAllIssues() {
    const { data: e } = await c(this, y).getAllIssues();
    e && c(this, A).setValue(e);
  }
}
y = new WeakMap(), _ = new WeakMap(), g = new WeakMap(), A = new WeakMap();
const pt = new Ot(
  "ContentAuditContext"
), Zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: pt,
  ContentAuditContext: W,
  default: W
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, B = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, mt = Symbol(), tt = /* @__PURE__ */ new WeakMap();
let ee = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== mt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (B && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const se = (s) => new ee(typeof s == "string" ? s : s + "", void 0, mt), ne = (s, t) => {
  if (B) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), i = O.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = e.cssText, s.appendChild(n);
  }
}, et = B ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return se(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ie, defineProperty: ae, getOwnPropertyDescriptor: oe, getOwnPropertyNames: re, getOwnPropertySymbols: ce, getPrototypeOf: le } = Object, m = globalThis, st = m.trustedTypes, ue = st ? st.emptyScript : "", L = m.reactiveElementPolyfillSupport, C = (s, t) => s, q = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ue : null;
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
} }, ft = (s, t) => !ie(s, t), nt = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: ft };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class E extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = nt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, e);
      i !== void 0 && ae(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: i, set: a } = oe(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(o) {
      const r = i == null ? void 0 : i.call(this);
      a.call(this, o), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = le(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, n = [...re(e), ...ce(e)];
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
      for (const i of n) e.unshift(et(i));
    } else t !== void 0 && e.push(et(t));
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
    return ne(t, this.constructor.elementStyles), t;
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
    var a;
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const o = (((a = n.converter) == null ? void 0 : a.toAttribute) !== void 0 ? n.converter : q).toAttribute(e, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var a;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = n.getPropertyOptions(i), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : q;
      this._$Em = i, this[i] = r.fromAttribute(e, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, n) {
    if (t !== void 0) {
      if (n ?? (n = this.constructor.getPropertyOptions(t)), !(n.hasChanged ?? ft)(this[t], e)) return;
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
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [a, o] of i) o.wrapped !== !0 || this._$AL.has(a) || this[a] === void 0 || this.P(a, this[a], o);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (n = this._$EO) == null || n.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[C("elementProperties")] = /* @__PURE__ */ new Map(), E[C("finalized")] = /* @__PURE__ */ new Map(), L == null || L({ ReactiveElement: E }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.0.4");
var de = Object.defineProperty, he = Object.getOwnPropertyDescriptor, pe = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? he(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (n ? o(t, e, i) : o(i)) || i);
  return n && i && de(t, e, i), i;
};
let P = class extends at(it) {
  constructor() {
    super(), this._workspaceContext = new W(this);
  }
  render() {
    return S`
			<umb-workspace-editor headline="Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
P = pe([
  te("content-audit-workspace-root")
], P);
const me = P, fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return P;
  },
  default: me
}, Symbol.toStringTag, { value: "Module" })), bt = "issues-root", be = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: bt,
    menus: ["Umb.Menu.ContentAudit"]
  }
}, ye = [be], _e = "Umb.Workspace.ContentAudit.Issues", ge = [
  {
    type: "workspace",
    alias: _e,
    name: "Issues Root Workspace",
    js: () => import("./issues-workspace-view.element-CZgPgKMS.js"),
    meta: {
      entityType: bt
    }
  }
], Ae = [
  ...ge,
  ...ye
], yt = "status-codes-root", Ee = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: yt,
    menus: ["Umb.Menu.ContentAudit"]
  }
}, Ce = [Ee], Se = "Umb.Workspace.ContentAudit.StatusCodes", Te = [
  {
    type: "workspace",
    alias: Se,
    name: "Status Codes Root Workspace",
    js: () => import("./status-codes-workspace-view.element-C0CemEtO.js"),
    meta: {
      entityType: yt
    }
  }
], we = [
  ...Te,
  ...Ce
], _t = "orphaned-pages-root", k = "Umb.Menu.ContentAudit", V = "Umb.Menu.ContentMetadata", $e = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 2e3,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: _t,
    menus: [V]
  }
}, ve = [$e], Oe = "Umb.Workspace.ContentAudit.OrphanedPages", Ue = [
  {
    type: "workspace",
    alias: Oe,
    name: "Orphaned Pages Root Workspace",
    js: () => import("./orphaned-pages-workspace-view.element-CZJGbSyQ.js"),
    meta: {
      entityType: _t
    }
  }
], Ie = [
  ...Ue,
  ...ve
], gt = "metadata-root", Pe = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: gt,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, Re = [Pe], Me = "Umb.Workspace.ContentAudit.Metadata", Ne = [
  {
    type: "workspace",
    alias: Me,
    name: "Metadata Root Workspace",
    js: () => import("./metadata-workspace-view.element-CEt9ukrj.js"),
    meta: {
      entityType: gt
    }
  }
], ke = [
  ...Ne,
  ...Re
], At = "duplicate-content-root", De = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.DuplicateContent",
  name: "Duplicate Content Menu Item",
  weight: 2e3,
  meta: {
    label: "Duplicate Content",
    icon: "icon-documents",
    entityType: At,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, je = [De], xe = "Umb.Workspace.ContentAudit.DuplicateContent", Le = [
  {
    type: "workspace",
    alias: xe,
    name: "Duplicate Content Root Workspace",
    js: () => import("./duplicate-content-workspace-view.element-BjeIXo9I.js"),
    meta: {
      entityType: At
    }
  }
], We = [
  ...Le,
  ...je
], qe = "inbound-links-root", He = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: qe,
    menus: [k]
  }
}, Be = [He], Ve = [
  //...workspaceManifests,
  ...Be
], ze = "outbound-links-root", Ye = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: ze,
    menus: [k]
  }
}, Fe = [Ye], Ke = [
  //...workspaceManifests,
  ...Fe
], R = "Umb.Section.ContentAudit", Ge = {
  type: "section",
  alias: R,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Je = {
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
      match: R
    }
  ]
}, Xe = [
  {
    type: "menu",
    alias: k,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: V,
    name: "Content Menu"
  }
], Qe = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: k
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: R
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
      menu: V
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: R
      }
    ]
  }
], Ze = [
  Ge,
  Je,
  ...Xe,
  ...Qe,
  ...Ae,
  ...we,
  ...Ie,
  ...ke,
  ...We,
  ...Ve,
  ...Ke
], ts = {
  type: "workspace",
  alias: I,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => fe),
  meta: {
    entityType: dt
  }
}, es = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-SFXX1iAU.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: I
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
        match: I
      }
    ]
  }
], ss = [
  ts,
  ...es
], ns = {
  type: "globalContext",
  alias: jt,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Zt)
}, ms = async (s, t) => {
  t.registerMany([
    ns,
    ...Ze,
    ...ss
  ]), s.consumeContext(St, async (e) => {
    if (!e) return;
    const n = e.getOpenApiConfiguration();
    p.BASE = n.base, p.TOKEN = n.token, p.WITH_CREDENTIALS = n.withCredentials, p.CREDENTIALS = n.credentials;
  });
};
export {
  jt as CONTENT_AUDIT_CONTEXT_ALIAS,
  pt as CONTENT_AUDIT_CONTEXT_TOKEN,
  dt as CONTENT_AUDIT_ENTITY_TYPE,
  I as CONTENT_AUDIT_WORKSPACE_ALIAS,
  W as ContentAuditContext,
  P as ContentAuditWorkspaceRootElement,
  Rt as IssuePriorityConfigMap,
  Pt as IssueTypeConfigMap,
  U as IssuesTable,
  ms as onInit
};
//# sourceMappingURL=assets.js.map
