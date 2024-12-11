var F = (s) => {
  throw TypeError(s);
};
var G = (s, t, e) => t.has(s) || F("Cannot " + e);
var c = (s, t, e) => (G(s, t, "read from private field"), e ? e.call(s) : t.get(s)), h = (s, t, e) => t.has(s) ? F("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), p = (s, t, e, n) => (G(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e);
import { UMB_AUTH_CONTEXT as Ct } from "@umbraco-cms/backoffice/auth";
import { LitElement as it, html as T, repeat as wt, css as Tt, property as $t, customElement as vt } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as at } from "@umbraco-cms/backoffice/element-api";
import { UmbControllerBase as ot } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as Ot } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as Ut } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as v } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as K, UmbArrayState as J } from "@umbraco-cms/backoffice/observable-api";
const It = [
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
], Pt = [
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
var Rt = Object.defineProperty, Mt = Object.getOwnPropertyDescriptor, rt = (s) => {
  throw TypeError(s);
}, ct = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Mt(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (n ? o(t, e, i) : o(i)) || i);
  return n && i && Rt(t, e, i), i;
}, Nt = (s, t, e) => t.has(s) || rt("Cannot " + e), kt = (s, t, e) => t.has(s) ? rt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), X = (s, t, e) => (Nt(s, t, "access private method"), e), I, lt, ut;
let R = class extends at(it) {
  constructor() {
    super(...arguments), kt(this, I), this.data = [];
  }
  render() {
    if (this.data.length > 0)
      return T`
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
                ${wt(
        this.data,
        (s) => s.name,
        (s) => {
          var t;
          return T`
                        <uui-table-row>
                            <uui-table-cell>
                                <strong>${s.category}: ${s.name}</strong><br/>
                                ${s.description}
                            </uui-table-cell>
                            <uui-table-cell>${X(this, I, lt).call(this, s.type)}</uui-table-cell>
                            <uui-table-cell>${X(this, I, ut).call(this, s.priority)}</uui-table-cell>
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
I = /* @__PURE__ */ new WeakSet();
lt = function(s) {
  const t = It[parseInt(s) - 1];
  return T`
            <div class="issue-label ${t.class}">
                <uui-icon name="${t.icon}"></uui-icon>
                <span class="label">${t.label}</span>
            </div>
        `;
};
ut = function(s) {
  const t = Pt[parseInt(s) - 1];
  return T`
            <div class="issue-label ${t.class}">
                <uui-icon name="${t.icon}"></uui-icon>
                <span class="label">${t.label}</span>
            </div>
        `;
};
R.styles = [
  Tt`
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
], R.prototype, "data", 2);
R = ct([
  vt("audit-issue-table")
], R);
const M = "Umb.Workspace.ContentAudit", Dt = "Umb.Context.ContentAudit", dt = "content-audit";
class Q extends Error {
  constructor(t, e, n) {
    super(n), this.name = "ApiError", this.url = e.url, this.status = e.status, this.statusText = e.statusText, this.body = e.body, this.request = t;
  }
}
class jt extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class xt {
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new jt("Request aborted"));
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
const u = {
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
}, $ = (s) => typeof s == "string", j = (s) => $(s) && s !== "", H = (s) => s instanceof Blob, ht = (s) => s instanceof FormData, Lt = (s) => {
  try {
    return btoa(s);
  } catch {
    return Buffer.from(s).toString("base64");
  }
}, Wt = (s) => {
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
  return t.query ? i + Wt(t.query) : i;
}, qt = (s) => {
  if (s.formData) {
    const t = new FormData(), e = (n, i) => {
      $(i) || H(i) ? t.append(n, i) : t.append(n, JSON.stringify(i));
    };
    return Object.entries(s.formData).filter(([, n]) => n != null).forEach(([n, i]) => {
      Array.isArray(i) ? i.forEach((a) => e(n, a)) : e(n, i);
    }), t;
  }
}, O = async (s, t) => typeof t == "function" ? t(s) : t, Bt = async (s, t) => {
  const [e, n, i, a] = await Promise.all([
    // @ts-ignore
    O(t, s.TOKEN),
    // @ts-ignore
    O(t, s.USERNAME),
    // @ts-ignore
    O(t, s.PASSWORD),
    // @ts-ignore
    O(t, s.HEADERS)
  ]), o = Object.entries({
    Accept: "application/json",
    ...a,
    ...t.headers
  }).filter(([, r]) => r != null).reduce((r, [d, l]) => ({
    ...r,
    [d]: String(l)
  }), {});
  if (j(e) && (o.Authorization = `Bearer ${e}`), j(n) && j(i)) {
    const r = Lt(`${n}:${i}`);
    o.Authorization = `Basic ${r}`;
  }
  return t.body !== void 0 && (t.mediaType ? o["Content-Type"] = t.mediaType : H(t.body) ? o["Content-Type"] = t.body.type || "application/octet-stream" : $(t.body) ? o["Content-Type"] = "text/plain" : ht(t.body) || (o["Content-Type"] = "application/json")), new Headers(o);
}, Vt = (s) => {
  var t, e;
  if (s.body !== void 0)
    return (t = s.mediaType) != null && t.includes("application/json") || (e = s.mediaType) != null && e.includes("+json") ? JSON.stringify(s.body) : $(s.body) || H(s.body) || ht(s.body) ? s.body : JSON.stringify(s.body);
}, zt = async (s, t, e, n, i, a, o) => {
  const r = new AbortController();
  let d = {
    headers: a,
    body: n ?? i,
    method: t.method,
    signal: r.signal
  };
  s.WITH_CREDENTIALS && (d.credentials = s.CREDENTIALS);
  for (const l of s.interceptors.request._fns)
    d = await l(d);
  return o(() => r.abort()), await fetch(e, d);
}, Yt = (s, t) => {
  if (t) {
    const e = s.headers.get(t);
    if ($(e))
      return e;
  }
}, Ft = async (s) => {
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
}, E = (s, t) => new xt(async (e, n, i) => {
  try {
    const a = Ht(s, t), o = qt(t), r = Vt(t), d = await Bt(s, t);
    if (!i.isCancelled) {
      let l = await zt(s, t, a, r, o, d, i);
      for (const Et of s.interceptors.response._fns)
        l = await Et(l);
      const V = await Ft(l), St = Yt(l, t.responseHeader);
      let z = V;
      t.responseTransformer && l.ok && (z = await t.responseTransformer(V));
      const Y = {
        url: a,
        ok: l.ok,
        status: l.status,
        statusText: l.statusText,
        body: St ?? z
      };
      Gt(t, Y), e(Y.body);
    }
  } catch (a) {
    n(a);
  }
});
class U {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllIssues() {
    return E(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/all-issues"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getDuplicateContentUrls() {
    return E(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/duplicate-content"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getHealthScore() {
    return E(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/health-score"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getLatestAuditOverview() {
    return E(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/latest-audit"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getPagesWithMissingMetadata() {
    return E(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/missing-metadata"
    });
  }
}
var m;
class Kt {
  constructor(t) {
    h(this, m);
    p(this, m, t);
  }
  async getLatestAuditOverview() {
    return await v(c(this, m), U.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await v(c(this, m), U.getPagesWithMissingMetadata());
  }
  async getAllIssues() {
    return await v(c(this, m), U.getAllIssues());
  }
  async getHealthScore() {
    return await v(c(this, m), U.getHealthScore());
  }
}
m = new WeakMap();
class Jt {
  constructor(t) {
    this._host = t;
  }
}
var f;
class Xt extends ot {
  constructor(e) {
    super(e);
    h(this, f);
    p(this, f, new Kt(this)), this._crawlDataSource = new Jt(this);
  }
  async getLatestAuditOverview() {
    return c(this, f).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return c(this, f).getPagesWithMissingMetadata();
  }
  async getAllIssues() {
    return c(this, f).getAllIssues();
  }
  async getHealthScore() {
    return c(this, f).getHealthScore();
  }
}
f = new WeakMap();
var b, _, g, A, S;
class L extends ot {
  constructor(e) {
    super(e);
    h(this, b);
    h(this, _);
    h(this, g);
    h(this, A);
    h(this, S);
    this.workspaceAlias = M, p(this, _, new K(void 0)), this.latestAuditOverview = c(this, _).asObservable(), p(this, g, new J([], (n) => n.id)), this.pagesWithMissingMetadata = c(this, g).asObservable(), p(this, A, new J([], (n) => n.name)), this.allIssues = c(this, A).asObservable(), p(this, S, new K(void 0)), this.healthScore = c(this, S).asObservable(), this.provideContext(Ut, this), this.provideContext(pt, this), p(this, b, new Xt(this));
  }
  getEntityType() {
    return dt;
  }
  async getLatestAuditOverview() {
    const { data: e } = await c(this, b).getLatestAuditOverview();
    e && c(this, _).setValue(e);
  }
  async getPagesWithMissingMetadata() {
    const { data: e } = await c(this, b).getPagesWithMissingMetadata();
    e && c(this, g).setValue(e);
  }
  async getAllIssues() {
    const { data: e } = await c(this, b).getAllIssues();
    e && c(this, A).setValue(e);
  }
  async getHealthScore() {
    const { data: e } = await c(this, b).getHealthScore();
    e && c(this, S).setValue(e);
  }
}
b = new WeakMap(), _ = new WeakMap(), g = new WeakMap(), A = new WeakMap(), S = new WeakMap();
const pt = new Ot(
  "ContentAuditContext"
), Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: pt,
  ContentAuditContext: L,
  default: L
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, q = P.ShadowRoot && (P.ShadyCSS === void 0 || P.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, mt = Symbol(), tt = /* @__PURE__ */ new WeakMap();
let te = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== mt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (q && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ee = (s) => new te(typeof s == "string" ? s : s + "", void 0, mt), se = (s, t) => {
  if (q) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), i = P.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = e.cssText, s.appendChild(n);
  }
}, et = q ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return ee(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ne, defineProperty: ie, getOwnPropertyDescriptor: ae, getOwnPropertyNames: oe, getOwnPropertySymbols: re, getPrototypeOf: ce } = Object, y = globalThis, st = y.trustedTypes, le = st ? st.emptyScript : "", x = y.reactiveElementPolyfillSupport, w = (s, t) => s, W = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? le : null;
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
} }, ft = (s, t) => !ne(s, t), nt = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: ft };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class C extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = nt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, e);
      i !== void 0 && ie(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: i, set: a } = ae(this.prototype, t) ?? { get() {
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
    if (this.hasOwnProperty(w("elementProperties"))) return;
    const t = ce(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const e = this.properties, n = [...oe(e), ...re(e)];
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
    return se(t, this.constructor.elementStyles), t;
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
      const o = (((a = n.converter) == null ? void 0 : a.toAttribute) !== void 0 ? n.converter : W).toAttribute(e, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var a;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = n.getPropertyOptions(i), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : W;
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
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[w("elementProperties")] = /* @__PURE__ */ new Map(), C[w("finalized")] = /* @__PURE__ */ new Map(), x == null || x({ ReactiveElement: C }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.0.4");
var ue = Object.defineProperty, de = Object.getOwnPropertyDescriptor, he = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? de(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (n ? o(t, e, i) : o(i)) || i);
  return n && i && ue(t, e, i), i;
};
let N = class extends at(it) {
  constructor() {
    super(), this._workspaceContext = new L(this);
  }
  render() {
    return T`
			<umb-workspace-editor headline="Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
N = he([
  Zt("content-audit-workspace-root")
], N);
const pe = N, me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return N;
  },
  default: pe
}, Symbol.toStringTag, { value: "Module" })), bt = "issues-root", fe = {
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
}, be = [fe], ye = "Umb.Workspace.ContentAudit.Issues", _e = [
  {
    type: "workspace",
    alias: ye,
    name: "Issues Root Workspace",
    js: () => import("./issues-workspace-view.element-CZgPgKMS.js"),
    meta: {
      entityType: bt
    }
  }
], ge = [
  ..._e,
  ...be
], yt = "status-codes-root", Ae = {
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
}, Se = [Ae], Ee = "Umb.Workspace.ContentAudit.StatusCodes", Ce = [
  {
    type: "workspace",
    alias: Ee,
    name: "Status Codes Root Workspace",
    js: () => import("./status-codes-workspace-view.element-C0CemEtO.js"),
    meta: {
      entityType: yt
    }
  }
], we = [
  ...Ce,
  ...Se
], _t = "orphaned-pages-root", D = "Umb.Menu.ContentAudit", B = "Umb.Menu.ContentMetadata", Te = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 2e3,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: _t,
    menus: [B]
  }
}, $e = [Te], ve = "Umb.Workspace.ContentAudit.OrphanedPages", Oe = [
  {
    type: "workspace",
    alias: ve,
    name: "Orphaned Pages Root Workspace",
    js: () => import("./orphaned-pages-workspace-view.element-CZJGbSyQ.js"),
    meta: {
      entityType: _t
    }
  }
], Ue = [
  ...Oe,
  ...$e
], gt = "metadata-root", Ie = {
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
}, Pe = [Ie], Re = "Umb.Workspace.ContentAudit.Metadata", Me = [
  {
    type: "workspace",
    alias: Re,
    name: "Metadata Root Workspace",
    js: () => import("./metadata-workspace-view.element-CEt9ukrj.js"),
    meta: {
      entityType: gt
    }
  }
], Ne = [
  ...Me,
  ...Pe
], At = "duplicate-content-root", ke = {
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
}, De = [ke], je = "Umb.Workspace.ContentAudit.DuplicateContent", xe = [
  {
    type: "workspace",
    alias: je,
    name: "Duplicate Content Root Workspace",
    js: () => import("./duplicate-content-workspace-view.element-BjeIXo9I.js"),
    meta: {
      entityType: At
    }
  }
], Le = [
  ...xe,
  ...De
], We = "inbound-links-root", He = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: We,
    menus: [D]
  }
}, qe = [He], Be = [
  //...workspaceManifests,
  ...qe
], Ve = "outbound-links-root", ze = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: Ve,
    menus: [D]
  }
}, Ye = [ze], Fe = [
  //...workspaceManifests,
  ...Ye
], k = "Umb.Section.ContentAudit", Ge = {
  type: "section",
  alias: k,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Ke = {
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
      match: k
    }
  ]
}, Je = [
  {
    type: "menu",
    alias: D,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: B,
    name: "Content Menu"
  }
], Xe = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: D
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: k
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
      menu: B
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: k
      }
    ]
  }
], Qe = [
  Ge,
  Ke,
  ...Je,
  ...Xe,
  ...ge,
  ...we,
  ...Ue,
  ...Ne,
  ...Le,
  ...Be,
  ...Fe
], Ze = {
  type: "workspace",
  alias: M,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => me),
  meta: {
    entityType: dt
  }
}, ts = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-C29Gnx7t.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: M
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
        match: M
      }
    ]
  }
], es = [
  Ze,
  ...ts
], ss = {
  type: "globalContext",
  alias: Dt,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Qt)
}, ps = async (s, t) => {
  t.registerMany([
    ss,
    ...Qe,
    ...es
  ]), s.consumeContext(Ct, async (e) => {
    if (!e) return;
    const n = e.getOpenApiConfiguration();
    u.BASE = n.base, u.TOKEN = n.token, u.WITH_CREDENTIALS = n.withCredentials, u.CREDENTIALS = n.credentials;
  });
};
export {
  Dt as CONTENT_AUDIT_CONTEXT_ALIAS,
  pt as CONTENT_AUDIT_CONTEXT_TOKEN,
  dt as CONTENT_AUDIT_ENTITY_TYPE,
  M as CONTENT_AUDIT_WORKSPACE_ALIAS,
  L as ContentAuditContext,
  N as ContentAuditWorkspaceRootElement,
  Pt as IssuePriorityConfigMap,
  It as IssueTypeConfigMap,
  R as IssuesTable,
  ps as onInit
};
//# sourceMappingURL=assets.js.map
