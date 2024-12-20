var Bt = (e) => {
  throw TypeError(e);
};
var Ht = (e, t, s) => t.has(e) || Bt("Cannot " + s);
var r = (e, t, s) => (Ht(e, t, "read from private field"), s ? s.call(e) : t.get(e)), p = (e, t, s) => t.has(e) ? Bt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), m = (e, t, s, n) => (Ht(e, t, "write to private field"), n ? n.call(e, s) : t.set(e, s), s);
import { UMB_AUTH_CONTEXT as os } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as mt } from "@umbraco-cms/backoffice/element-api";
import { LitElement as F, html as c, css as I, property as K, customElement as b, nothing as Ce, state as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as fe } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as as } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as rs, UMB_WORKSPACE_CONDITION_ALIAS as ls } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as w } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as yt, UmbArrayState as zt } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as cs } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as X, UMB_COLLECTION_ALIAS_CONDITION as k } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as J } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as us } from "@umbraco-cms/backoffice/style";
const ds = [
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
], ps = [
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
var ms = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, be = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? hs(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && ms(t, s, i), i;
};
let nt = class extends mt(F) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const e = ds[this.type - 1];
      return c`
                <uui-tag color=${e.color}>
                    <uui-icon name="${e.icon}"></uui-icon>
                    ${e.label}
                </uui-tag>
            `;
    }
  }
};
nt.styles = [
  I`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
be([
  K({ attribute: !1 })
], nt.prototype, "type", 2);
nt = be([
  b("content-audit-issue-type-label")
], nt);
var _s = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, ye = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? Cs(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && _s(t, s, i), i;
};
let it = class extends mt(F) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const e = ps[this.type - 1];
      return c`
                <uui-tag color=${e.color}>
                    <uui-icon name="${e.icon}"></uui-icon>
                    ${e.label}
                </uui-tag>
            `;
    }
  }
};
it.styles = [
  I`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
ye([
  K({ attribute: !1 })
], it.prototype, "type", 2);
it = ye([
  b("content-audit-priority-type-label")
], it);
var fs = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, Te = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? bs(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && fs(t, s, i), i;
};
let gt = class extends mt(F) {
  _getColor(e) {
    return e >= 200 && e < 300 ? "positive" : e >= 300 && e < 400 ? "warning" : e >= 400 && e < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? c`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : Ce;
  }
};
Te([
  K({ attribute: !1 })
], gt.prototype, "statusCode", 2);
gt = Te([
  b("content-audit-status-code-label")
], gt);
class Ji extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class Qi extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class Zi extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const ot = "Umb.Workspace.ContentAudit", ys = "Umb.Context.ContentAudit", Ae = "content-audit";
class Gt extends Error {
  constructor(t, s, n) {
    super(n), this.name = "ApiError", this.url = s.url, this.status = s.status, this.statusText = s.statusText, this.body = s.body, this.request = t;
  }
}
class Ts extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class As {
  constructor(t) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((s, n) => {
      this._resolve = s, this._reject = n;
      const i = (l) => {
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
      }), t(i, o, a);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new Ts("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class Yt {
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
    request: new Yt(),
    response: new Yt()
  }
}, Q = (e) => typeof e == "string", Tt = (e) => Q(e) && e !== "", Et = (e) => e instanceof Blob, ge = (e) => e instanceof FormData, gs = (e) => {
  try {
    return btoa(e);
  } catch {
    return Buffer.from(e).toString("base64");
  }
}, Ss = (e) => {
  const t = [], s = (i, o) => {
    t.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(o))}`);
  }, n = (i, o) => {
    o != null && (o instanceof Date ? s(i, o.toISOString()) : Array.isArray(o) ? o.forEach((a) => n(i, a)) : typeof o == "object" ? Object.entries(o).forEach(([a, l]) => n(`${i}[${a}]`, l)) : s(i, o));
  };
  return Object.entries(e).forEach(([i, o]) => n(i, o)), t.length ? `?${t.join("&")}` : "";
}, vs = (e, t) => {
  const s = encodeURI, n = t.url.replace("{api-version}", e.VERSION).replace(/{(.*?)}/g, (o, a) => {
    var l;
    return (l = t.path) != null && l.hasOwnProperty(a) ? s(String(t.path[a])) : o;
  }), i = e.BASE + n;
  return t.query ? i + Ss(t.query) : i;
}, Os = (e) => {
  if (e.formData) {
    const t = new FormData(), s = (n, i) => {
      Q(i) || Et(i) ? t.append(n, i) : t.append(n, JSON.stringify(i));
    };
    return Object.entries(e.formData).filter(([, n]) => n != null).forEach(([n, i]) => {
      Array.isArray(i) ? i.forEach((o) => s(n, o)) : s(n, i);
    }), t;
  }
}, et = async (e, t) => typeof t == "function" ? t(e) : t, Es = async (e, t) => {
  const [s, n, i, o] = await Promise.all([
    // @ts-ignore
    et(t, e.TOKEN),
    // @ts-ignore
    et(t, e.USERNAME),
    // @ts-ignore
    et(t, e.PASSWORD),
    // @ts-ignore
    et(t, e.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([, l]) => l != null).reduce((l, [y, h]) => ({
    ...l,
    [y]: String(h)
  }), {});
  if (Tt(s) && (a.Authorization = `Bearer ${s}`), Tt(n) && Tt(i)) {
    const l = gs(`${n}:${i}`);
    a.Authorization = `Basic ${l}`;
  }
  return t.body !== void 0 && (t.mediaType ? a["Content-Type"] = t.mediaType : Et(t.body) ? a["Content-Type"] = t.body.type || "application/octet-stream" : Q(t.body) ? a["Content-Type"] = "text/plain" : ge(t.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, Is = (e) => {
  var t, s;
  if (e.body !== void 0)
    return (t = e.mediaType) != null && t.includes("application/json") || (s = e.mediaType) != null && s.includes("+json") ? JSON.stringify(e.body) : Q(e.body) || Et(e.body) || ge(e.body) ? e.body : JSON.stringify(e.body);
}, ws = async (e, t, s, n, i, o, a) => {
  const l = new AbortController();
  let y = {
    headers: o,
    body: n ?? i,
    method: t.method,
    signal: l.signal
  };
  e.WITH_CREDENTIALS && (y.credentials = e.CREDENTIALS);
  for (const h of e.interceptors.request._fns)
    y = await h(y);
  return a(() => l.abort()), await fetch(s, y);
}, $s = (e, t) => {
  if (t) {
    const s = e.headers.get(t);
    if (Q(s))
      return s;
  }
}, Us = async (e) => {
  if (e.status !== 204)
    try {
      const t = e.headers.get("Content-Type");
      if (t) {
        const s = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (t.includes("application/json") || t.includes("+json"))
          return await e.json();
        if (s.some((n) => t.includes(n)))
          return await e.blob();
        if (t.includes("multipart/form-data"))
          return await e.formData();
        if (t.includes("text/"))
          return await e.text();
      }
    } catch (t) {
      console.error(t);
    }
}, Ps = (e, t) => {
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
    ...e.errors
  }[t.status];
  if (n)
    throw new Gt(e, t, n);
  if (!t.ok) {
    const i = t.status ?? "unknown", o = t.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Gt(
      e,
      t,
      `Generic Error: status: ${i}; status text: ${o}; body: ${a}`
    );
  }
}, _ = (e, t) => new As(async (s, n, i) => {
  try {
    const o = vs(e, t), a = Os(t), l = Is(t), y = await Es(e, t);
    if (!i.isCancelled) {
      let h = await ws(e, t, o, l, a, y, i);
      for (const is of e.interceptors.response._fns)
        h = await is(h);
      const Vt = await Us(h), ns = $s(h, t.responseHeader);
      let jt = Vt;
      t.responseTransformer && h.ok && (jt = await t.responseTransformer(Vt));
      const qt = {
        url: o,
        ok: h.ok,
        status: h.status,
        statusText: h.statusText,
        body: ns ?? jt
      };
      Ps(t, qt), s(qt.body);
    }
  } catch (o) {
    n(o);
  }
});
class D {
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @param data.filter
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllImages(t = {}) {
    return _(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/all-images",
      query: {
        skip: t.skip,
        take: t.take,
        filter: t.filter
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllIssues(t = {}) {
    return _(u, {
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
    return _(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/duplicate-content"
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
  static getExternalLinks(t = {}) {
    return _(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/external-links",
      query: {
        skip: t.skip,
        take: t.take,
        filter: t.filter
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getHealthScore() {
    return _(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/health-score"
    });
  }
  /**
   * @param data The data for the request.
   * @param data.issueGuid
   * @returns unknown OK
   * @throws ApiError
   */
  static getIssue(t = {}) {
    return _(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/issue",
      query: {
        issueGuid: t.issueGuid
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getLatestAuditOverview() {
    return _(u, {
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
    return _(u, {
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
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @param data.filter
   * @returns unknown OK
   * @throws ApiError
   */
  static getPagesWithMissingMetadata(t = {}) {
    return _(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/missing-metadata",
      query: {
        skip: t.skip,
        take: t.take,
        filter: t.filter
      }
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
    return _(u, {
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
class Ns {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getSettings() {
    return _(u, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/get-settings"
    });
  }
}
var T;
class Ls {
  constructor(t) {
    p(this, T);
    m(this, T, t);
  }
  async getLatestAuditOverview() {
    return await w(r(this, T), D.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await w(r(this, T), D.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await w(r(this, T), D.getAllIssues({ skip: 0, take: 5 }));
  }
  async getHealthScore() {
    return await w(r(this, T), D.getHealthScore());
  }
}
T = new WeakMap();
var H;
class ks {
  constructor(t) {
    p(this, H);
    m(this, H, t);
  }
  async getSettings() {
    return await w(r(this, H), Ns.getSettings());
  }
}
H = new WeakMap();
var A, z;
class Rs extends fe {
  constructor(s) {
    super(s);
    p(this, A);
    p(this, z);
    m(this, A, new Ls(this)), m(this, z, new ks(this));
  }
  async getLatestAuditOverview() {
    return r(this, A).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return r(this, A).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return r(this, A).getTopIssues();
  }
  async getHealthScore() {
    return r(this, A).getHealthScore();
  }
  async getSettings() {
    return r(this, z).getSettings();
  }
}
A = new WeakMap(), z = new WeakMap();
var C, $, U, P, N, L;
class St extends fe {
  constructor(s) {
    super(s);
    p(this, C);
    p(this, $);
    p(this, U);
    p(this, P);
    p(this, N);
    p(this, L);
    this.workspaceAlias = ot, m(this, $, new yt(void 0)), this.latestAuditOverview = r(this, $).asObservable(), m(this, U, new zt([], (n) => n.id)), this.pagesWithMissingMetadata = r(this, U).asObservable(), m(this, P, new zt([], (n) => n.name)), this.topIssues = r(this, P).asObservable(), m(this, N, new yt(void 0)), this.healthScore = r(this, N).asObservable(), m(this, L, new yt(void 0)), this.settings = r(this, L).asObservable(), this.provideContext(rs, this), this.provideContext(Se, this), m(this, C, new Rs(this));
  }
  getEntityType() {
    return Ae;
  }
  async getLatestAuditOverview() {
    const { data: s } = await r(this, C).getLatestAuditOverview();
    s && r(this, $).setValue(s);
  }
  async getPagesWithMissingMetadata() {
    const { data: s } = await r(this, C).getPagesWithMissingMetadata();
    s && r(this, U).setValue(s);
  }
  async getTopIssues() {
    const { data: s } = await r(this, C).getTopIssues();
    s && r(this, P).setValue(s.items);
  }
  async getHealthScore() {
    const { data: s } = await r(this, C).getHealthScore();
    s && r(this, N).setValue(s);
  }
  async getSettings() {
    const { data: s } = await r(this, C).getSettings();
    s && r(this, L).setValue(s);
  }
}
C = new WeakMap(), $ = new WeakMap(), U = new WeakMap(), P = new WeakMap(), N = new WeakMap(), L = new WeakMap();
const Se = new as(
  "ContentAuditContext"
), Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: Se,
  ContentAuditContext: St,
  default: St
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ms = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, It = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ve = Symbol(), Ft = /* @__PURE__ */ new WeakMap();
let xs = class {
  constructor(t, s, n) {
    if (this._$cssResult$ = !0, n !== ve) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (It && t === void 0) {
      const n = s !== void 0 && s.length === 1;
      n && (t = Ft.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ft.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ws = (e) => new xs(typeof e == "string" ? e : e + "", void 0, ve), Vs = (e, t) => {
  if (It) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const n = document.createElement("style"), i = st.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = s.cssText, e.appendChild(n);
  }
}, Kt = It ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const n of t.cssRules) s += n.cssText;
  return Ws(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: js, defineProperty: qs, getOwnPropertyDescriptor: Bs, getOwnPropertyNames: Hs, getOwnPropertySymbols: zs, getPrototypeOf: Gs } = Object, g = globalThis, Xt = g.trustedTypes, Ys = Xt ? Xt.emptyScript : "", At = g.reactiveElementPolyfillSupport, M = (e, t) => e, vt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ys : null;
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
} }, Oe = (e, t) => !js(e, t), Jt = { attribute: !0, type: String, converter: vt, reflect: !1, hasChanged: Oe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class R extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Jt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, s);
      i !== void 0 && qs(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, n) {
    const { get: i, set: o } = Bs(this.prototype, t) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(a) {
      const l = i == null ? void 0 : i.call(this);
      o.call(this, a), this.requestUpdate(t, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Jt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = Gs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const s = this.properties, n = [...Hs(s), ...zs(s)];
      for (const i of n) this.createProperty(i, s[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [n, i] of s) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, n] of this.elementProperties) {
      const i = this._$Eu(s, n);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) s.unshift(Kt(i));
    } else t !== void 0 && s.push(Kt(t));
    return s;
  }
  static _$Eu(t, s) {
    const n = s.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const n of s.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Vs(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var n;
      return (n = s.hostConnected) == null ? void 0 : n.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var n;
      return (n = s.hostDisconnected) == null ? void 0 : n.call(s);
    });
  }
  attributeChangedCallback(t, s, n) {
    this._$AK(t, n);
  }
  _$EC(t, s) {
    var o;
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const a = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : vt).toAttribute(s, n.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var o;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : vt;
      this._$Em = i, this[i] = l.fromAttribute(s, a.type), this._$Em = null;
    }
  }
  requestUpdate(t, s, n) {
    if (t !== void 0) {
      if (n ?? (n = this.constructor.getPropertyOptions(t)), !(n.hasChanged ?? Oe)(this[t], s)) return;
      this.P(t, s, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, s, n) {
    this._$AL.has(t) || this._$AL.set(t, s), n.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
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
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (n = this._$EO) == null || n.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(s)) : this._$EU();
    } catch (i) {
      throw t = !1, this._$EU(), i;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((n) => {
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
    this._$Ej && (this._$Ej = this._$Ej.forEach((s) => this._$EC(s, this[s]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[M("elementProperties")] = /* @__PURE__ */ new Map(), R[M("finalized")] = /* @__PURE__ */ new Map(), At == null || At({ ReactiveElement: R }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.0.4");
var Fs = Object.defineProperty, Ks = Object.getOwnPropertyDescriptor, Xs = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? Ks(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && Fs(t, s, i), i;
};
let at = class extends mt(F) {
  constructor() {
    super(), this._workspaceContext = new St(this);
  }
  render() {
    return c`
			<umb-workspace-editor headline="Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
at = Xs([
  Ms("content-audit-workspace-root")
], at);
const Js = at, Qs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return at;
  },
  default: Js
}, Symbol.toStringTag, { value: "Module" })), Z = "Umb.Menu.ContentAudit", ht = "Umb.Menu.ContentMetadata", wt = "Umb.Collection.ContentAudit.Issues", Zs = "Umb.CollectionView.ContentAudit.Issues.Table", Ee = "Umb.Repository.ContentAuditIssuesCollection";
var G;
class tn {
  constructor(t) {
    p(this, G);
    m(this, G, t);
  }
  async getCollection(t) {
    const { data: s, error: n } = await w(r(this, G), D.getAllIssues(t));
    if (n)
      return { error: n };
    if (!s)
      return { data: { items: [], total: 0 } };
    const { items: i, total: o } = s;
    return { data: { items: i, total: o } };
  }
}
G = new WeakMap();
var Y;
class Qt extends cs {
  constructor(s) {
    super(s);
    p(this, Y);
    m(this, Y, new tn(s));
  }
  async requestCollection(s) {
    return r(this, Y).getCollection(s);
  }
}
Y = new WeakMap();
const en = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: Qt,
  default: Qt
}, Symbol.toStringTag, { value: "Module" }));
var sn = Object.defineProperty, nn = Object.getOwnPropertyDescriptor, Ie = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? nn(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && sn(t, s, i), i;
};
let rt = class extends F {
  render() {
    return this.value ? c`
			<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
				<strong>${this.value.category}: ${this.value.name}</strong>
			</a>
			<br/>${this.value.description}
		` : Ce;
  }
};
rt.styles = [us];
Ie([
  K({ attribute: !1 })
], rt.prototype, "value", 2);
rt = Ie([
  b("content-audit-issues-table-name-column-layout")
], rt);
var on = Object.defineProperty, an = Object.getOwnPropertyDescriptor, we = (e) => {
  throw TypeError(e);
}, tt = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? an(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && on(t, s, i), i;
}, $t = (e, t, s) => t.has(e) || we("Cannot " + s), Zt = (e, t, s) => ($t(e, t, "read from private field"), t.get(e)), te = (e, t, s) => t.has(e) ? we("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), rn = (e, t, s, n) => ($t(e, t, "write to private field"), t.set(e, s), s), Ot = (e, t, s) => ($t(e, t, "access private method"), s), W, x, $e, Ut;
let f = class extends J {
  constructor() {
    super(), te(this, x), this.data = [], this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Issue",
        alias: "name",
        elementName: "content-audit-issues-table-name-column-layout"
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
    ], this._tableItems = [], te(this, W), this.consumeContext(X, (e) => {
      rn(this, W, e), Ot(this, x, $e).call(this);
    });
  }
  updated(e) {
    e.has("data") && this.data.length !== 0 && Ot(this, x, Ut).call(this, this.data);
  }
  render() {
    if (this._tableItems.length !== 0)
      return c`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
W = /* @__PURE__ */ new WeakMap();
x = /* @__PURE__ */ new WeakSet();
$e = function() {
  Zt(this, W) && this.observe(Zt(this, W).items, (e) => Ot(this, x, Ut).call(this, e), "umbCollectionItemsObserver");
};
Ut = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.unique,
    entityType: "issue-type",
    icon: "icon-alert",
    data: [
      {
        columnAlias: "name",
        value: {
          unique: t.unique,
          name: t.name,
          category: t.category,
          description: t.description
        }
      },
      {
        columnAlias: "type",
        value: c`<content-audit-issue-type-label .type=${t.type}></content-audit-issue-type-label`
      },
      {
        columnAlias: "priority",
        value: c`<content-audit-priority-type-label .type=${t.priority}></content-audit-priority-type-label>`
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
  I`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
tt([
  K({ type: Array, attribute: !1 })
], f.prototype, "data", 2);
tt([
  d()
], f.prototype, "_tableConfig", 2);
tt([
  d()
], f.prototype, "_tableColumns", 2);
tt([
  d()
], f.prototype, "_tableItems", 2);
f = tt([
  b("content-audit-issues-table-collection-view")
], f);
const ln = f, cn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return f;
  },
  default: ln
}, Symbol.toStringTag, { value: "Module" })), Ue = "issues-root", un = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: Ue,
    menus: [Z]
  }
}, dn = [un], ee = "Umb.Workspace.ContentAudit.IssuesRoot", se = "Umb.Workspace.ContentAudit.Issues", pn = [
  {
    type: "workspace",
    kind: "routable",
    alias: se,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-Cf-MVnc9.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-Dd8KD8vx.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: ls,
        match: se
      }
    ]
  }
], mn = [
  {
    type: "workspace",
    kind: "default",
    alias: ee,
    name: "Issues Root Workspace",
    meta: {
      entityType: Ue,
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
      collectionAlias: wt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ee
      }
    ]
  }
], hn = [...pn, ...mn], _n = [
  {
    type: "repository",
    alias: Ee,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => en)
  }
], Cn = [
  {
    type: "collectionView",
    alias: Zs,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => cn),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: k,
        match: wt
      }
    ]
  }
], fn = [
  {
    type: "collection",
    kind: "default",
    alias: wt,
    name: "Issues Collection",
    element: () => import("./issues.element-VH8WvbHX.js"),
    meta: {
      repositoryAlias: Ee
    }
  },
  ..._n,
  ...Cn
], bn = "Umb.Repository.ContentAudit.Issues.Detail", yn = "Umb.Store.ContentAudit.Issues.Detail", Tn = [
  {
    type: "repository",
    alias: bn,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-D-QGNaUs.js")
  },
  {
    type: "store",
    alias: yn,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], An = [...Tn], gn = [
  ...hn,
  ...dn,
  ...fn,
  ...An
], Pe = "status-codes-root", Sn = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: Pe,
    menus: [Z]
  }
}, vn = [Sn], Pt = "Umb.Collection.ContentAudit.StatusCodes", On = "Umb.CollectionView.ContentAudit.StatusCodes.Table", Ne = "Umb.Repository.ContentAuditStatusCodesCollection";
var En = Object.defineProperty, In = Object.getOwnPropertyDescriptor, Le = (e) => {
  throw TypeError(e);
}, _t = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? In(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && En(t, s, i), i;
}, Nt = (e, t, s) => t.has(e) || Le("Cannot " + s), ne = (e, t, s) => (Nt(e, t, "read from private field"), t.get(e)), ie = (e, t, s) => t.has(e) ? Le("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), wn = (e, t, s, n) => (Nt(e, t, "write to private field"), t.set(e, s), s), ke = (e, t, s) => (Nt(e, t, "access private method"), s), V, lt, Re, De;
let S = class extends J {
  constructor() {
    super(), ie(this, lt), this._tableConfig = {
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
    ], this._tableItems = [], ie(this, V), this.consumeContext(X, (e) => {
      wn(this, V, e), ke(this, lt, Re).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return c`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
V = /* @__PURE__ */ new WeakMap();
lt = /* @__PURE__ */ new WeakSet();
Re = function() {
  ne(this, V) && this.observe(ne(this, V).items, (e) => ke(this, lt, De).call(this, e), "umbCollectionItemsObserver");
};
De = function(e) {
  this._tableItems = e.map((t) => {
    var s;
    return {
      id: t.unique,
      entityType: t.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${t.url} target="_blank">${t.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (s = t.contentType) == null ? void 0 : s.mediaType
        },
        {
          columnAlias: "statusCode",
          value: c`<content-audit-status-code-label .statusCode=${t.statusCode}></content-audit-status-code-label>`
        }
      ]
    };
  });
};
S.styles = [
  I`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
_t([
  d()
], S.prototype, "_tableConfig", 2);
_t([
  d()
], S.prototype, "_tableColumns", 2);
_t([
  d()
], S.prototype, "_tableItems", 2);
S = _t([
  b("content-audit-status-codes-table-collection-view")
], S);
const $n = S, Un = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return S;
  },
  default: $n
}, Symbol.toStringTag, { value: "Module" })), oe = "Umb.Workspace.ContentAudit.StatusCodes", Pn = [
  {
    type: "workspace",
    kind: "default",
    alias: oe,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: Pe,
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
      collectionAlias: Pt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: oe
      }
    ]
  }
], Nn = [
  {
    type: "repository",
    alias: Ne,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-Bv1mHnDO.js")
  }
], Ln = [
  {
    type: "collectionView",
    alias: On,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => Un),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: k,
        match: Pt
      }
    ]
  }
], kn = [
  {
    type: "collection",
    kind: "default",
    alias: Pt,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-BcFO_vK8.js"),
    meta: {
      repositoryAlias: Ne
    }
  },
  ...Nn,
  ...Ln
], Rn = [
  ...Pn,
  ...vn,
  ...kn
], Me = "orphaned-pages-root", Dn = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: Me,
    menus: [ht]
  }
}, Mn = [Dn], Lt = "Umb.Collection.ContentAudit.OrphanedPages", xn = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", xe = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var Wn = Object.defineProperty, Vn = Object.getOwnPropertyDescriptor, We = (e) => {
  throw TypeError(e);
}, Ct = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? Vn(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && Wn(t, s, i), i;
}, kt = (e, t, s) => t.has(e) || We("Cannot " + s), ae = (e, t, s) => (kt(e, t, "read from private field"), t.get(e)), re = (e, t, s) => t.has(e) ? We("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), jn = (e, t, s, n) => (kt(e, t, "write to private field"), t.set(e, s), s), Ve = (e, t, s) => (kt(e, t, "access private method"), s), j, ct, je, qe;
let v = class extends J {
  constructor() {
    super(), re(this, ct), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], re(this, j), this.consumeContext(X, (e) => {
      jn(this, j, e), Ve(this, ct, je).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return c`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
j = /* @__PURE__ */ new WeakMap();
ct = /* @__PURE__ */ new WeakSet();
je = function() {
  ae(this, j) && this.observe(ae(this, j).items, (e) => Ve(this, ct, qe).call(this, e), "umbCollectionItemsObserver");
};
qe = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.unique,
    entityType: t.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: c`<a href="/umbraco/section/content/workspace/document/edit/${t.unique}">${t.url}</a>`
      }
    ]
  }));
};
v.styles = [
  I`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ct([
  d()
], v.prototype, "_tableConfig", 2);
Ct([
  d()
], v.prototype, "_tableColumns", 2);
Ct([
  d()
], v.prototype, "_tableItems", 2);
v = Ct([
  b("content-audit-orphaned-pages-table-collection-view")
], v);
const qn = v, Bn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return v;
  },
  default: qn
}, Symbol.toStringTag, { value: "Module" })), le = "Umb.Workspace.ContentAudit.OrphanedPages", Hn = [
  {
    type: "workspace",
    kind: "default",
    alias: le,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: Me,
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
      collectionAlias: Lt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: le
      }
    ]
  }
], zn = [
  {
    type: "repository",
    alias: xe,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-C6eyrEwV.js")
  }
], Gn = [
  {
    type: "collectionView",
    alias: xn,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Bn),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: k,
        match: Lt
      }
    ]
  }
], Yn = [
  {
    type: "collection",
    kind: "default",
    alias: Lt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-CR408Pgy.js"),
    meta: {
      repositoryAlias: xe
    }
  },
  ...zn,
  ...Gn
], Fn = [
  ...Hn,
  ...Mn,
  ...Yn
], Be = "images-alt-text-root", Kn = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: Be,
    menus: [ht]
  }
}, Xn = [Kn], Rt = "Umb.Collection.ContentAudit.ImagesAltText", Jn = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", He = "Umb.Repository.ContentAuditImagesAltTextCollection";
var Qn = Object.defineProperty, Zn = Object.getOwnPropertyDescriptor, ze = (e) => {
  throw TypeError(e);
}, ft = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? Zn(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && Qn(t, s, i), i;
}, Dt = (e, t, s) => t.has(e) || ze("Cannot " + s), ce = (e, t, s) => (Dt(e, t, "read from private field"), t.get(e)), ue = (e, t, s) => t.has(e) ? ze("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), ti = (e, t, s, n) => (Dt(e, t, "write to private field"), t.set(e, s), s), Ge = (e, t, s) => (Dt(e, t, "access private method"), s), q, ut, Ye, Fe;
let O = class extends J {
  constructor() {
    super(), ue(this, ut), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      },
      {
        name: "Found on page",
        alias: "foundPage"
      },
      {
        name: "Alt text",
        alias: "altText"
      }
    ], this._tableItems = [], ue(this, q), this.consumeContext(X, (e) => {
      ti(this, q, e), Ge(this, ut, Ye).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return c`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
q = /* @__PURE__ */ new WeakMap();
ut = /* @__PURE__ */ new WeakSet();
Ye = function() {
  ce(this, q) && this.observe(ce(this, q).items, (e) => Ge(this, ut, Fe).call(this, e), "umbCollectionItemsObserver");
};
Fe = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.unique,
    entityType: t.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: t.url
      },
      {
        columnAlias: "foundPage",
        value: c`<a href="/umbraco/section/content/workspace/document/edit/${t.unique}">${t.foundPage}</a>`
      },
      {
        columnAlias: "altText",
        value: t.altText
      }
    ]
  }));
};
O.styles = [
  I`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ft([
  d()
], O.prototype, "_tableConfig", 2);
ft([
  d()
], O.prototype, "_tableColumns", 2);
ft([
  d()
], O.prototype, "_tableItems", 2);
O = ft([
  b("content-audit-images-alt-text-table-collection-view")
], O);
const ei = O, si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return O;
  },
  default: ei
}, Symbol.toStringTag, { value: "Module" })), de = "Umb.Workspace.ContentAudit.ImagesAltText", ni = [
  {
    type: "workspace",
    kind: "default",
    alias: de,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: Be,
      headline: "Images Alt Text"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.ImagesAltText.Collection",
    name: "Content Audit Images Alt Text Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: Rt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: de
      }
    ]
  }
], ii = [
  {
    type: "repository",
    alias: He,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-DtobCEyv.js")
  }
], oi = [
  {
    type: "collectionView",
    alias: Jn,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => si),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: k,
        match: Rt
      }
    ]
  }
], ai = [
  {
    type: "collection",
    kind: "default",
    alias: Rt,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DXPv56cV.js"),
    meta: {
      repositoryAlias: He
    }
  },
  ...ii,
  ...oi
], ri = [
  ...ni,
  ...Xn,
  ...ai
], Ke = "outbound-links-root", li = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-fullscreen",
    entityType: Ke,
    menus: [Z]
  }
}, ci = [li], Mt = "Umb.Collection.ContentAudit.OutboundLinks", ui = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", Xe = "Umb.Repository.ContentAuditOutboundLinksCollection";
var di = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, Je = (e) => {
  throw TypeError(e);
}, bt = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? pi(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && di(t, s, i), i;
}, xt = (e, t, s) => t.has(e) || Je("Cannot " + s), pe = (e, t, s) => (xt(e, t, "read from private field"), t.get(e)), me = (e, t, s) => t.has(e) ? Je("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), mi = (e, t, s, n) => (xt(e, t, "write to private field"), t.set(e, s), s), Qe = (e, t, s) => (xt(e, t, "access private method"), s), B, dt, Ze, ts;
let E = class extends J {
  constructor() {
    super(), me(this, dt), this._tableConfig = {
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
      },
      {
        name: "Content Type",
        alias: "contentType"
      },
      {
        name: "Outlinks",
        alias: "outlinks"
      }
    ], this._tableItems = [], me(this, B), this.consumeContext(X, (e) => {
      mi(this, B, e), Qe(this, dt, Ze).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return c`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
B = /* @__PURE__ */ new WeakMap();
dt = /* @__PURE__ */ new WeakSet();
Ze = function() {
  pe(this, B) && this.observe(pe(this, B).items, (e) => Qe(this, dt, ts).call(this, e), "umbCollectionItemsObserver");
};
ts = function(e) {
  this._tableItems = e.map((t) => {
    var s, n;
    return {
      id: t.unique,
      data: [
        {
          columnAlias: "url",
          value: t.url
        },
        {
          columnAlias: "statusCode",
          value: c`<content-audit-status-code-label .statusCode=${t.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "contentType",
          value: (s = t.contentType) == null ? void 0 : s.mediaType
        },
        {
          columnAlias: "outlinks",
          value: (n = t.externalPages) == null ? void 0 : n.length
        }
      ]
    };
  });
};
E.styles = [
  I`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
bt([
  d()
], E.prototype, "_tableConfig", 2);
bt([
  d()
], E.prototype, "_tableColumns", 2);
bt([
  d()
], E.prototype, "_tableItems", 2);
E = bt([
  b("content-audit-outbound-links-table-collection-view")
], E);
const hi = E, _i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return E;
  },
  default: hi
}, Symbol.toStringTag, { value: "Module" })), he = "Umb.Workspace.ContentAudit.OutboundLinks", Ci = [
  {
    type: "workspace",
    kind: "default",
    alias: he,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: Ke,
      headline: "Outbound Links"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.OutboundLinks.Collection",
    name: "Content Audit Outbound Links Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: Mt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: he
      }
    ]
  }
], fi = [
  {
    type: "repository",
    alias: Xe,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-CwKgJ2fK.js")
  }
], bi = [
  {
    type: "collectionView",
    alias: ui,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => _i),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: k,
        match: Mt
      }
    ]
  }
], yi = [
  {
    type: "collection",
    kind: "default",
    alias: Mt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-5JNyTazK.js"),
    meta: {
      repositoryAlias: Xe
    }
  },
  ...fi,
  ...bi
], Ti = [
  ...Ci,
  ...ci,
  ...yi
], es = "metadata-root", Ai = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: es,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, gi = [Ai], Wt = "Umb.Collection.ContentAudit.Metadata", Si = "Umb.CollectionView.ContentAudit.Metadata.Table", _e = "Umb.Workspace.ContentAudit.Metadata", vi = [
  {
    type: "workspace",
    kind: "default",
    alias: _e,
    name: "Metadata Root Workspace",
    meta: {
      entityType: es,
      headline: "Metadata"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.Metadata.Collection",
    name: "Content Audit Metadata Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: Wt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: _e
      }
    ]
  }
], ss = "Umb.Repository.ContentAuditMetadataCollection", Oi = [
  {
    type: "repository",
    alias: ss,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-BpQXbueI.js")
  }
], Ei = [
  {
    type: "collectionView",
    alias: Si,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element-B1OpfGY7.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: k,
        match: Wt
      }
    ]
  }
], Ii = [
  {
    type: "collection",
    kind: "default",
    alias: Wt,
    name: "Metadata Collection",
    element: () => import("./metadata.element-NLHFYxe2.js"),
    meta: {
      repositoryAlias: ss
    }
  },
  ...Oi,
  ...Ei
], wi = [
  ...vi,
  ...gi,
  ...Ii
], pt = "Umb.Section.ContentAudit", $i = {
  type: "section",
  alias: pt,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Ui = {
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
      match: pt
    }
  ]
}, Pi = [
  {
    type: "menu",
    alias: Z,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: ht,
    name: "Content Menu"
  }
], Ni = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: Z
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: pt
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
      menu: ht
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: pt
      }
    ]
  }
], Li = [
  $i,
  Ui,
  ...Pi,
  ...Ni,
  ...gn,
  ...Rn,
  ...Fn,
  ...ri,
  ...Ti,
  ...wi
], ki = {
  type: "workspace",
  alias: ot,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Qs),
  meta: {
    entityType: Ae
  }
}, Ri = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-9zN33shN.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ot
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-VCX2lGSm.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ot
      }
    ]
  }
], Di = [
  ki,
  ...Ri
], Mi = {
  type: "globalContext",
  alias: ys,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Ds)
}, eo = async (e, t) => {
  t.registerMany([
    Mi,
    ...Li,
    ...Di
  ]), e.consumeContext(os, async (s) => {
    if (!s) return;
    const n = s.getOpenApiConfiguration();
    u.BASE = n.base, u.TOKEN = n.token, u.WITH_CREDENTIALS = n.withCredentials, u.CREDENTIALS = n.credentials;
  });
};
export {
  D as A,
  Se as C,
  ds as I,
  Ji as U,
  se as a,
  nt as b,
  it as c,
  gt as d,
  Qi as e,
  Oe as f,
  Zi as g,
  ps as h,
  St as i,
  at as j,
  ot as k,
  ys as l,
  Ae as m,
  Z as n,
  eo as o,
  ht as p,
  wt as q,
  Zs as r,
  Ee as s,
  Ms as t,
  vt as u,
  Qt as v,
  tn as w,
  f as x
};
//# sourceMappingURL=index-BpAvlXJv.js.map
