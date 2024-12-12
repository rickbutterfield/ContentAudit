var It = (e) => {
  throw TypeError(e);
};
var Pt = (e, t, s) => t.has(e) || It("Cannot " + s);
var r = (e, t, s) => (Pt(e, t, "read from private field"), s ? s.call(e) : t.get(e)), c = (e, t, s) => t.has(e) ? It("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), u = (e, t, s, i) => (Pt(e, t, "write to private field"), i ? i.call(e, s) : t.set(e, s), s);
import { UMB_AUTH_CONTEXT as Se } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as tt } from "@umbraco-cms/backoffice/element-api";
import { LitElement as et, html as d, css as q, property as st, customElement as P, nothing as Ae, state as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as Yt } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as Te } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as ve } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as v } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as at, UmbArrayState as Ut } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as Ee } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as pt, UMB_COLLECTION_ALIAS_CONDITION as mt } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as ft } from "@umbraco-cms/backoffice/lit-element";
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
], Oe = [
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
var $e = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, Kt = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Ie(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (i ? a(t, s, n) : a(n)) || n);
  return i && n && $e(t, s, n), n;
};
let F = class extends tt(et) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const e = we[this.type - 1];
      return d`
                <uui-tag color=${e.color}>
                    <uui-icon name="${e.icon}"></uui-icon>
                    ${e.label}
                </uui-tag>
            `;
    }
  }
};
F.styles = [
  q`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Kt([
  st({ attribute: !1 })
], F.prototype, "type", 2);
F = Kt([
  P("content-audit-issue-type-label")
], F);
var Pe = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, Jt = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Ue(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (i ? a(t, s, n) : a(n)) || n);
  return i && n && Pe(t, s, n), n;
};
let Y = class extends tt(et) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const e = Oe[this.type - 1];
      return d`
                <uui-tag color=${e.color}>
                    <uui-icon name="${e.icon}"></uui-icon>
                    ${e.label}
                </uui-tag>
            `;
    }
  }
};
Y.styles = [
  q`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Jt([
  st({ attribute: !1 })
], Y.prototype, "type", 2);
Y = Jt([
  P("content-audit-priority-type-label")
], Y);
var Re = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, Xt = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Ne(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (i ? a(t, s, n) : a(n)) || n);
  return i && n && Re(t, s, n), n;
};
let ct = class extends tt(et) {
  _getColor(e) {
    return e >= 200 && e < 300 ? "positive" : e >= 300 && e < 400 ? "warning" : e >= 400 && e < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? d`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : Ae;
  }
};
Xt([
  st({ attribute: !1 })
], ct.prototype, "statusCode", 2);
ct = Xt([
  P("content-audit-status-code-label")
], ct);
class Ai extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class Ti extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class vi extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const K = "Umb.Workspace.ContentAudit", Le = "Umb.Context.ContentAudit", Qt = "content-audit";
class Rt extends Error {
  constructor(t, s, i) {
    super(i), this.name = "ApiError", this.url = s.url, this.status = s.status, this.statusText = s.statusText, this.body = s.body, this.request = t;
  }
}
class De extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class Me {
  constructor(t) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((s, i) => {
      this._resolve = s, this._reject = i;
      const n = (l) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(l));
      }, o = (l) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(l));
      }, a = (l) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(l);
      };
      return Object.defineProperty(a, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(a, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(a, "isCancelled", {
        get: () => this._isCancelled
      }), t(n, o, a);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(t, s) {
    return this.promise.then(t, s);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new De("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class Nt {
  constructor() {
    this._fns = [];
  }
  eject(t) {
    const s = this._fns.indexOf(t);
    s !== -1 && (this._fns = [...this._fns.slice(0, s), ...this._fns.slice(s + 1)]);
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
    request: new Nt(),
    response: new Nt()
  }
}, H = (e) => typeof e == "string", rt = (e) => H(e) && e !== "", _t = (e) => e instanceof Blob, Zt = (e) => e instanceof FormData, xe = (e) => {
  try {
    return btoa(e);
  } catch {
    return Buffer.from(e).toString("base64");
  }
}, ke = (e) => {
  const t = [], s = (n, o) => {
    t.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(o))}`);
  }, i = (n, o) => {
    o != null && (o instanceof Date ? s(n, o.toISOString()) : Array.isArray(o) ? o.forEach((a) => i(n, a)) : typeof o == "object" ? Object.entries(o).forEach(([a, l]) => i(`${n}[${a}]`, l)) : s(n, o));
  };
  return Object.entries(e).forEach(([n, o]) => i(n, o)), t.length ? `?${t.join("&")}` : "";
}, je = (e, t) => {
  const s = encodeURI, i = t.url.replace("{api-version}", e.VERSION).replace(/{(.*?)}/g, (o, a) => {
    var l;
    return (l = t.path) != null && l.hasOwnProperty(a) ? s(String(t.path[a])) : o;
  }), n = e.BASE + i;
  return t.query ? n + ke(t.query) : n;
}, We = (e) => {
  if (e.formData) {
    const t = new FormData(), s = (i, n) => {
      H(n) || _t(n) ? t.append(i, n) : t.append(i, JSON.stringify(n));
    };
    return Object.entries(e.formData).filter(([, i]) => i != null).forEach(([i, n]) => {
      Array.isArray(n) ? n.forEach((o) => s(i, o)) : s(i, n);
    }), t;
  }
}, z = async (e, t) => typeof t == "function" ? t(e) : t, Ve = async (e, t) => {
  const [s, i, n, o] = await Promise.all([
    // @ts-ignore
    z(t, e.TOKEN),
    // @ts-ignore
    z(t, e.USERNAME),
    // @ts-ignore
    z(t, e.PASSWORD),
    // @ts-ignore
    z(t, e.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([, l]) => l != null).reduce((l, [b, h]) => ({
    ...l,
    [b]: String(h)
  }), {});
  if (rt(s) && (a.Authorization = `Bearer ${s}`), rt(i) && rt(n)) {
    const l = xe(`${i}:${n}`);
    a.Authorization = `Basic ${l}`;
  }
  return t.body !== void 0 && (t.mediaType ? a["Content-Type"] = t.mediaType : _t(t.body) ? a["Content-Type"] = t.body.type || "application/octet-stream" : H(t.body) ? a["Content-Type"] = "text/plain" : Zt(t.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, qe = (e) => {
  var t, s;
  if (e.body !== void 0)
    return (t = e.mediaType) != null && t.includes("application/json") || (s = e.mediaType) != null && s.includes("+json") ? JSON.stringify(e.body) : H(e.body) || _t(e.body) || Zt(e.body) ? e.body : JSON.stringify(e.body);
}, He = async (e, t, s, i, n, o, a) => {
  const l = new AbortController();
  let b = {
    headers: o,
    body: i ?? n,
    method: t.method,
    signal: l.signal
  };
  e.WITH_CREDENTIALS && (b.credentials = e.CREDENTIALS);
  for (const h of e.interceptors.request._fns)
    b = await h(b);
  return a(() => l.abort()), await fetch(s, b);
}, Be = (e, t) => {
  if (t) {
    const s = e.headers.get(t);
    if (H(s))
      return s;
  }
}, ze = async (e) => {
  if (e.status !== 204)
    try {
      const t = e.headers.get("Content-Type");
      if (t) {
        const s = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (t.includes("application/json") || t.includes("+json"))
          return await e.json();
        if (s.some((i) => t.includes(i)))
          return await e.blob();
        if (t.includes("multipart/form-data"))
          return await e.formData();
        if (t.includes("text/"))
          return await e.text();
      }
    } catch (t) {
      console.error(t);
    }
}, Ge = (e, t) => {
  const i = {
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
    ...e.errors
  }[t.status];
  if (i)
    throw new Rt(e, t, i);
  if (!t.ok) {
    const n = t.status ?? "unknown", o = t.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Rt(
      e,
      t,
      `Generic Error: status: ${n}; status text: ${o}; body: ${a}`
    );
  }
}, y = (e, t) => new Me(async (s, i, n) => {
  try {
    const o = je(e, t), a = We(t), l = qe(t), b = await Ve(e, t);
    if (!n.isCancelled) {
      let h = await He(e, t, o, l, a, b, n);
      for (const ge of e.interceptors.response._fns)
        h = await ge(h);
      const wt = await ze(h), Ce = Be(h, t.responseHeader);
      let Ot = wt;
      t.responseTransformer && h.ok && (Ot = await t.responseTransformer(wt));
      const $t = {
        url: o,
        ok: h.ok,
        status: h.status,
        statusText: h.statusText,
        body: Ce ?? Ot
      };
      Ge(t, $t), s($t.body);
    }
  } catch (o) {
    i(o);
  }
});
class R {
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllIssues(t = {}) {
    return y(p, {
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
    return y(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/duplicate-content"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getHealthScore() {
    return y(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/health-score"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getLatestAuditOverview() {
    return y(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/latest-audit"
    });
  }
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @param data.filter
   * @param data.statusCode
   * @returns unknown OK
   * @throws ApiError
   */
  static getLatestAuditData(t = {}) {
    return y(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/latest-data",
      query: {
        skip: t.skip,
        take: t.take,
        filter: t.filter,
        statusCode: t.statusCode
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getPagesWithMissingMetadata() {
    return y(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/missing-metadata"
    });
  }
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @param data.filter
   * @returns unknown OK
   * @throws ApiError
   */
  static getOrphanedPages(t = {}) {
    return y(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/orphaned-pages",
      query: {
        skip: t.skip,
        take: t.take,
        filter: t.filter
      }
    });
  }
}
class Fe {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getSettings() {
    return y(p, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/get-settings"
    });
  }
}
var C;
class Ye {
  constructor(t) {
    c(this, C);
    u(this, C, t);
  }
  async getLatestAuditOverview() {
    return await v(r(this, C), R.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await v(r(this, C), R.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await v(r(this, C), R.getAllIssues({ skip: 0, take: 5 }));
  }
  async getHealthScore() {
    return await v(r(this, C), R.getHealthScore());
  }
}
C = new WeakMap();
var k;
class Ke {
  constructor(t) {
    c(this, k);
    u(this, k, t);
  }
  async getSettings() {
    return await v(r(this, k), Fe.getSettings());
  }
}
k = new WeakMap();
var g, j;
class Je extends Yt {
  constructor(s) {
    super(s);
    c(this, g);
    c(this, j);
    u(this, g, new Ye(this)), u(this, j, new Ke(this));
  }
  async getLatestAuditOverview() {
    return r(this, g).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return r(this, g).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return r(this, g).getTopIssues();
  }
  async getHealthScore() {
    return r(this, g).getHealthScore();
  }
  async getSettings() {
    return r(this, j).getSettings();
  }
}
g = new WeakMap(), j = new WeakMap();
var m, E, w, O, $, I;
class ut extends Yt {
  constructor(s) {
    super(s);
    c(this, m);
    c(this, E);
    c(this, w);
    c(this, O);
    c(this, $);
    c(this, I);
    this.workspaceAlias = K, u(this, E, new at(void 0)), this.latestAuditOverview = r(this, E).asObservable(), u(this, w, new Ut([], (i) => i.id)), this.pagesWithMissingMetadata = r(this, w).asObservable(), u(this, O, new Ut([], (i) => i.name)), this.topIssues = r(this, O).asObservable(), u(this, $, new at(void 0)), this.healthScore = r(this, $).asObservable(), u(this, I, new at(void 0)), this.settings = r(this, I).asObservable(), this.provideContext(ve, this), this.provideContext(te, this), u(this, m, new Je(this));
  }
  getEntityType() {
    return Qt;
  }
  async getLatestAuditOverview() {
    const { data: s } = await r(this, m).getLatestAuditOverview();
    s && r(this, E).setValue(s);
  }
  async getPagesWithMissingMetadata() {
    const { data: s } = await r(this, m).getPagesWithMissingMetadata();
    s && r(this, w).setValue(s);
  }
  async getTopIssues() {
    const { data: s } = await r(this, m).getTopIssues();
    s && r(this, O).setValue(s.items);
  }
  async getHealthScore() {
    const { data: s } = await r(this, m).getHealthScore();
    s && r(this, $).setValue(s);
  }
  async getSettings() {
    const { data: s } = await r(this, m).getSettings();
    s && r(this, I).setValue(s);
  }
}
m = new WeakMap(), E = new WeakMap(), w = new WeakMap(), O = new WeakMap(), $ = new WeakMap(), I = new WeakMap();
const te = new Te(
  "ContentAuditContext"
), Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: te,
  ContentAuditContext: ut,
  default: ut
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, bt = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), Lt = /* @__PURE__ */ new WeakMap();
let Ze = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (bt && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = Lt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Lt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ts = (e) => new Ze(typeof e == "string" ? e : e + "", void 0, ee), es = (e, t) => {
  if (bt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), n = G.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = s.cssText, e.appendChild(i);
  }
}, Dt = bt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return ts(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ss, defineProperty: is, getOwnPropertyDescriptor: ns, getOwnPropertyNames: os, getOwnPropertySymbols: as, getPrototypeOf: rs } = Object, S = globalThis, Mt = S.trustedTypes, ls = Mt ? Mt.emptyScript : "", lt = S.reactiveElementPolyfillSupport, N = (e, t) => e, dt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ls : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, se = (e, t) => !ss(e, t), xt = { attribute: !0, type: String, converter: dt, reflect: !1, hasChanged: se };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class U extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = xt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, s);
      n !== void 0 && is(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: n, set: o } = ns(this.prototype, t) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get() {
      return n == null ? void 0 : n.call(this);
    }, set(a) {
      const l = n == null ? void 0 : n.call(this);
      o.call(this, a), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? xt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const t = rs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const s = this.properties, i = [...os(s), ...as(s)];
      for (const n of i) this.createProperty(n, s[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, n] of s) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const n = this._$Eu(s, i);
      n !== void 0 && this._$Eh.set(n, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) s.unshift(Dt(n));
    } else t !== void 0 && s.push(Dt(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((s) => s(this));
  }
  addController(t) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var s;
    (s = this._$EO) == null || s.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return es(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostDisconnected) == null ? void 0 : i.call(s);
    });
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$EC(t, s) {
    var o;
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const a = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : dt).toAttribute(s, i.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var o;
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : dt;
      this._$Em = n, this[n] = l.fromAttribute(s, a.type), this._$Em = null;
    }
  }
  requestUpdate(t, s, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? se)(this[t], s)) return;
      this.P(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, s, i) {
    this._$AL.has(t) || this._$AL.set(t, s), i.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, a] of n) a.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], a);
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(s)) : this._$EU();
    } catch (n) {
      throw t = !1, this._$EU(), n;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
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
    this._$Ej && (this._$Ej = this._$Ej.forEach((s) => this._$EC(s, this[s]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[N("elementProperties")] = /* @__PURE__ */ new Map(), U[N("finalized")] = /* @__PURE__ */ new Map(), lt == null || lt({ ReactiveElement: U }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.0.4");
var cs = Object.defineProperty, us = Object.getOwnPropertyDescriptor, ds = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? us(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (i ? a(t, s, n) : a(n)) || n);
  return i && n && cs(t, s, n), n;
};
let J = class extends tt(et) {
  constructor() {
    super(), this._workspaceContext = new ut(this);
  }
  render() {
    return d`
			<umb-workspace-editor headline="Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
J = ds([
  Qe("content-audit-workspace-root")
], J);
const hs = J, ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return J;
  },
  default: hs
}, Symbol.toStringTag, { value: "Module" })), it = "Umb.Menu.ContentAudit", yt = "Umb.Menu.ContentMetadata", Ct = "Umb.Collection.ContentAudit.Issues", ms = "Umb.CollectionView.ContentAudit.Issues.Table", ie = "Umb.Repository.ContentAuditIssuesCollection";
var W;
class fs {
  constructor(t) {
    c(this, W);
    u(this, W, t);
  }
  async getCollection(t) {
    const { data: s, error: i } = await v(r(this, W), R.getAllIssues(t));
    if (i)
      return { error: i };
    if (!s)
      return { data: { items: [], total: 0 } };
    const { items: n, total: o } = s;
    return { data: { items: n, total: o } };
  }
}
W = new WeakMap();
var V;
class kt extends Ee {
  constructor(s) {
    super(s);
    c(this, V);
    u(this, V, new fs(s));
  }
  async requestCollection(s) {
    return r(this, V).getCollection(s);
  }
}
V = new WeakMap();
const _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: kt,
  default: kt
}, Symbol.toStringTag, { value: "Module" }));
var bs = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, ne = (e) => {
  throw TypeError(e);
}, B = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? ys(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (i ? a(t, s, n) : a(n)) || n);
  return i && n && bs(t, s, n), n;
}, gt = (e, t, s) => t.has(e) || ne("Cannot " + s), jt = (e, t, s) => (gt(e, t, "read from private field"), t.get(e)), Wt = (e, t, s) => t.has(e) ? ne("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), Cs = (e, t, s, i) => (gt(e, t, "write to private field"), t.set(e, s), s), ht = (e, t, s) => (gt(e, t, "access private method"), s), D, L, oe, St;
let f = class extends ft {
  constructor() {
    super(), Wt(this, L), this.data = [], this._tableConfig = {
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
    ], this._tableItems = [], Wt(this, D), this.consumeContext(pt, (e) => {
      Cs(this, D, e), ht(this, L, oe).call(this);
    });
  }
  updated(e) {
    e.has("data") && this.data.length !== 0 && ht(this, L, St).call(this, this.data);
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
D = /* @__PURE__ */ new WeakMap();
L = /* @__PURE__ */ new WeakSet();
oe = function() {
  jt(this, D) && this.observe(jt(this, D).items, (e) => ht(this, L, St).call(this, e), "umbCollectionItemsObserver");
};
St = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.unique,
    entityType: "issue-type",
    icon: "icon-alert",
    data: [
      {
        columnAlias: "name",
        value: d`<strong>${t.category}: ${t.name}</strong><br/>${t.description}`
      },
      {
        columnAlias: "type",
        value: d`<content-audit-issue-type-label .type=${t.type}></content-audit-issue-type-label`
      },
      {
        columnAlias: "priority",
        value: d`<content-audit-priority-type-label .type=${t.priority}></content-audit-priority-type-label>`
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
f.styles = [
  q`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
B([
  st({ type: Array, attribute: !1 })
], f.prototype, "data", 2);
B([
  _()
], f.prototype, "_tableConfig", 2);
B([
  _()
], f.prototype, "_tableColumns", 2);
B([
  _()
], f.prototype, "_tableItems", 2);
f = B([
  P("content-audit-issues-table-collection-view")
], f);
const gs = f, Ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return f;
  },
  default: gs
}, Symbol.toStringTag, { value: "Module" })), ae = "issues-root", As = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: ae,
    menus: [it]
  }
}, Ts = [As], Vt = "Umb.Workspace.ContentAudit.Issues", vs = [
  {
    type: "workspace",
    kind: "default",
    alias: Vt,
    name: "Issues Root Workspace",
    meta: {
      entityType: ae,
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
      collectionAlias: Ct
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Vt
      }
    ]
  }
], Es = [
  {
    type: "repository",
    alias: ie,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => _s)
  }
], ws = [
  {
    type: "collectionView",
    alias: ms,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => Ss),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: mt,
        match: Ct
      }
    ]
  }
], Os = [
  {
    type: "collection",
    kind: "default",
    alias: Ct,
    name: "Issues Collection",
    element: () => import("./issues.element-VH8WvbHX.js"),
    meta: {
      repositoryAlias: ie
    }
  },
  ...Es,
  ...ws
], $s = [
  ...vs,
  ...Ts,
  ...Os
], re = "status-codes-root", Is = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: re,
    menus: [it]
  }
}, Ps = [Is], At = "Umb.Collection.ContentAudit.StatusCodes", Us = "Umb.CollectionView.ContentAudit.StatusCodes.Table", le = "Umb.Repository.ContentAuditStatusCodesCollection";
var Rs = Object.defineProperty, Ns = Object.getOwnPropertyDescriptor, ce = (e) => {
  throw TypeError(e);
}, nt = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Ns(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (i ? a(t, s, n) : a(n)) || n);
  return i && n && Rs(t, s, n), n;
}, Tt = (e, t, s) => t.has(e) || ce("Cannot " + s), qt = (e, t, s) => (Tt(e, t, "read from private field"), t.get(e)), Ht = (e, t, s) => t.has(e) ? ce("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), Ls = (e, t, s, i) => (Tt(e, t, "write to private field"), t.set(e, s), s), ue = (e, t, s) => (Tt(e, t, "access private method"), s), M, X, de, he;
let A = class extends ft {
  constructor() {
    super(), Ht(this, X), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      },
      {
        name: "Content Type",
        alias: "contentType"
      },
      {
        name: "Status Code",
        alias: "statusCode"
      }
    ], this._tableItems = [], Ht(this, M), this.consumeContext(pt, (e) => {
      Ls(this, M, e), ue(this, X, de).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
M = /* @__PURE__ */ new WeakMap();
X = /* @__PURE__ */ new WeakSet();
de = function() {
  qt(this, M) && this.observe(qt(this, M).items, (e) => ue(this, X, he).call(this, e), "umbCollectionItemsObserver");
};
he = function(e) {
  this._tableItems = e.map((t) => {
    var s;
    return {
      id: t.unique,
      entityType: t.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: d`<a href=${t.url} target="_blank">${t.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (s = t.contentType) == null ? void 0 : s.mediaType
        },
        {
          columnAlias: "statusCode",
          value: d`<content-audit-status-code-label .statusCode=${t.statusCode}></content-audit-status-code-label>`
        }
      ]
    };
  });
};
A.styles = [
  q`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
nt([
  _()
], A.prototype, "_tableConfig", 2);
nt([
  _()
], A.prototype, "_tableColumns", 2);
nt([
  _()
], A.prototype, "_tableItems", 2);
A = nt([
  P("content-audit-status-codes-table-collection-view")
], A);
const Ds = A, Ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return A;
  },
  default: Ds
}, Symbol.toStringTag, { value: "Module" })), Bt = "Umb.Workspace.ContentAudit.StatusCodes", xs = [
  {
    type: "workspace",
    kind: "default",
    alias: Bt,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: re,
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
      collectionAlias: At
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Bt
      }
    ]
  }
], ks = [
  {
    type: "repository",
    alias: le,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-CZcsfGzy.js")
  }
], js = [
  {
    type: "collectionView",
    alias: Us,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => Ms),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: mt,
        match: At
      }
    ]
  }
], Ws = [
  {
    type: "collection",
    kind: "default",
    alias: At,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-FiDT7inv.js"),
    meta: {
      repositoryAlias: le
    }
  },
  ...ks,
  ...js
], Vs = [
  ...xs,
  ...Ps,
  ...Ws
], pe = "orphaned-pages-root", qs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 2e3,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: pe,
    menus: [yt]
  }
}, Hs = [qs], vt = "Umb.Collection.ContentAudit.OrphanedPages", Bs = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", me = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var zs = Object.defineProperty, Gs = Object.getOwnPropertyDescriptor, fe = (e) => {
  throw TypeError(e);
}, ot = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Gs(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (i ? a(t, s, n) : a(n)) || n);
  return i && n && zs(t, s, n), n;
}, Et = (e, t, s) => t.has(e) || fe("Cannot " + s), zt = (e, t, s) => (Et(e, t, "read from private field"), t.get(e)), Gt = (e, t, s) => t.has(e) ? fe("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), Fs = (e, t, s, i) => (Et(e, t, "write to private field"), t.set(e, s), s), _e = (e, t, s) => (Et(e, t, "access private method"), s), x, Q, be, ye;
let T = class extends ft {
  constructor() {
    super(), Gt(this, Q), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], Gt(this, x), this.consumeContext(pt, (e) => {
      Fs(this, x, e), _e(this, Q, be).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
x = /* @__PURE__ */ new WeakMap();
Q = /* @__PURE__ */ new WeakSet();
be = function() {
  zt(this, x) && this.observe(zt(this, x).items, (e) => _e(this, Q, ye).call(this, e), "umbCollectionItemsObserver");
};
ye = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.unique,
    entityType: t.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href="/umbraco/section/content/workspace/document/edit/${t.unique}">${t.url}</a>`
      }
    ]
  }));
};
T.styles = [
  q`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ot([
  _()
], T.prototype, "_tableConfig", 2);
ot([
  _()
], T.prototype, "_tableColumns", 2);
ot([
  _()
], T.prototype, "_tableItems", 2);
T = ot([
  P("content-audit-orphaned-pages-table-collection-view")
], T);
const Ys = T, Ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return T;
  },
  default: Ys
}, Symbol.toStringTag, { value: "Module" })), Ft = "Umb.Workspace.ContentAudit.OrphanedPages", Js = [
  {
    type: "workspace",
    kind: "default",
    alias: Ft,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: pe,
      headline: "Orphaned Pages"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.OrphanedPages.Collection",
    name: "Content Audit Orphaned Pages Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ft
      }
    ]
  }
], Xs = [
  {
    type: "repository",
    alias: me,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-Mkk-ibH0.js")
  }
], Qs = [
  {
    type: "collectionView",
    alias: Bs,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Ks),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: mt,
        match: vt
      }
    ]
  }
], Zs = [
  {
    type: "collection",
    kind: "default",
    alias: vt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-CR408Pgy.js"),
    meta: {
      repositoryAlias: me
    }
  },
  ...Xs,
  ...Qs
], ti = [
  ...Js,
  ...Hs,
  ...Zs
], Z = "Umb.Section.ContentAudit", ei = {
  type: "section",
  alias: Z,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, si = {
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
      match: Z
    }
  ]
}, ii = [
  {
    type: "menu",
    alias: it,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: yt,
    name: "Content Menu"
  }
], ni = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: it
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: Z
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
      menu: yt
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: Z
      }
    ]
  }
], oi = [
  ei,
  si,
  ...ii,
  ...ni,
  ...$s,
  ...Vs,
  ...ti
  //...metadataManifests,
  //...duplicateContentManifests,
  //...inboundLinksManifests,
  //...outboundLinksManifests
], ai = {
  type: "workspace",
  alias: K,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => ps),
  meta: {
    entityType: Qt
  }
}, ri = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-BIwdCYLv.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: K
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-DQ0xlkAL.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: K
      }
    ]
  }
], li = [
  ai,
  ...ri
], ci = {
  type: "globalContext",
  alias: Le,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Xe)
}, wi = async (e, t) => {
  t.registerMany([
    ci,
    ...oi,
    ...li
  ]), e.consumeContext(Se, async (s) => {
    if (!s) return;
    const i = s.getOpenApiConfiguration();
    p.BASE = i.base, p.TOKEN = i.token, p.WITH_CREDENTIALS = i.withCredentials, p.CREDENTIALS = i.credentials;
  });
};
export {
  R as A,
  te as C,
  we as I,
  Ai as U,
  F as a,
  Y as b,
  ct as c,
  Ti as d,
  vi as e,
  Oe as f,
  ut as g,
  J as h,
  K as i,
  Le as j,
  Qt as k,
  it as l,
  yt as m,
  Ct as n,
  wi as o,
  ms as p,
  ie as q,
  kt as r,
  fs as s,
  f as t
};
//# sourceMappingURL=index-DUm4UDoO.js.map
