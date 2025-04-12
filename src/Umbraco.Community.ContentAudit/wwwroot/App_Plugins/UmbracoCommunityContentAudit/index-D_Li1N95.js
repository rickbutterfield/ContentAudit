var Ae = (e) => {
  throw TypeError(e);
};
var ve = (e, t, n) => t.has(e) || Ae("Cannot " + n);
var r = (e, t, n) => (ve(e, t, "read from private field"), n ? n.call(e) : t.get(e)), p = (e, t, n) => t.has(e) ? Ae("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), m = (e, t, n, s) => (ve(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n);
import { UMB_AUTH_CONTEXT as Zn } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as lt } from "@umbraco-cms/backoffice/element-api";
import { LitElement as W, html as c, css as b, property as V, customElement as C, nothing as Ye, state as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as Ke } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as ts } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as es, UMB_WORKSPACE_CONDITION_ALIAS as ns, UMB_WORKSPACE_MODAL as At } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as k } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Nt, UmbArrayState as Ie } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as ss } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as P, UMB_COLLECTION_ALIAS_CONDITION as U } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as L } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as is } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as vt } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as It } from "@umbraco-cms/backoffice/router";
const os = [
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
], as = [
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
var ls = Object.defineProperty, rs = Object.getOwnPropertyDescriptor, Ge = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? rs(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && ls(t, n, i), i;
};
let mt = class extends lt(W) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const e = os[this.type - 1];
      return c`
                <uui-tag color=${e.color}>
                    <uui-icon name="${e.icon}"></uui-icon>
                    ${e.label}
                </uui-tag>
            `;
    }
  }
};
mt.styles = [
  b`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Ge([
  V({ attribute: !1 })
], mt.prototype, "type", 2);
mt = Ge([
  C("content-audit-issue-type-label")
], mt);
var cs = Object.defineProperty, us = Object.getOwnPropertyDescriptor, Fe = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? us(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && cs(t, n, i), i;
};
let ht = class extends lt(W) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const e = as[this.type - 1];
      return c`
                <uui-tag color=${e.color}>
                    <uui-icon name="${e.icon}"></uui-icon>
                    ${e.label}
                </uui-tag>
            `;
    }
  }
};
ht.styles = [
  b`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Fe([
  V({ attribute: !1 })
], ht.prototype, "type", 2);
ht = Fe([
  C("content-audit-priority-type-label")
], ht);
var ds = Object.defineProperty, ps = Object.getOwnPropertyDescriptor, Xe = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ps(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && ds(t, n, i), i;
};
let jt = class extends lt(W) {
  _getColor(e) {
    return e >= 200 && e < 300 ? "positive" : e >= 300 && e < 400 ? "warning" : e >= 400 && e < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? c`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : Ye;
  }
};
Xe([
  V({ attribute: !1 })
], jt.prototype, "statusCode", 2);
jt = Xe([
  C("content-audit-status-code-label")
], jt);
var ms = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, Je = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? hs(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && ms(t, n, i), i;
};
let Bt = class extends lt(W) {
  constructor() {
    super(...arguments), this.value = "";
  }
  _getColour(e) {
    return e == "E" || e == "F" ? "danger" : e == "D" ? "warning" : "positive";
  }
  render() {
    return c`
            <uui-tag .color=${this._getColour(this.value)}>
                ${this.value}
            </uui-tag>
        `;
  }
};
Je([
  V({ attribute: !0 })
], Bt.prototype, "value", 2);
Bt = Je([
  C("content-audit-carbon-intensity-label")
], Bt);
class fa extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class ya extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class Ta extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const _t = "Umb.Workspace.ContentAudit", _s = "Umb.Context.ContentAudit", Qe = "content-audit";
class Ee extends Error {
  constructor(t, n, s) {
    super(s), this.name = "ApiError", this.url = n.url, this.status = n.status, this.statusText = n.statusText, this.body = n.body, this.request = t;
  }
}
class Cs extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class bs {
  constructor(t) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((n, s) => {
      this._resolve = n, this._reject = s;
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
  then(t, n) {
    return this.promise.then(t, n);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new Cs("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class Oe {
  constructor() {
    this._fns = [];
  }
  eject(t) {
    const n = this._fns.indexOf(t);
    n !== -1 && (this._fns = [...this._fns.slice(0, n), ...this._fns.slice(n + 1)]);
  }
  use(t) {
    this._fns = [...this._fns, t];
  }
}
const d = {
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
    request: new Oe(),
    response: new Oe()
  }
}, rt = (e) => typeof e == "string", Dt = (e) => rt(e) && e !== "", Xt = (e) => e instanceof Blob, Ze = (e) => e instanceof FormData, fs = (e) => {
  try {
    return btoa(e);
  } catch {
    return Buffer.from(e).toString("base64");
  }
}, ys = (e) => {
  const t = [], n = (i, o) => {
    t.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(o))}`);
  }, s = (i, o) => {
    o != null && (o instanceof Date ? n(i, o.toISOString()) : Array.isArray(o) ? o.forEach((a) => s(i, a)) : typeof o == "object" ? Object.entries(o).forEach(([a, l]) => s(`${i}[${a}]`, l)) : n(i, o));
  };
  return Object.entries(e).forEach(([i, o]) => s(i, o)), t.length ? `?${t.join("&")}` : "";
}, Ts = (e, t) => {
  const n = encodeURI, s = t.url.replace("{api-version}", e.VERSION).replace(/{(.*?)}/g, (o, a) => {
    var l;
    return (l = t.path) != null && l.hasOwnProperty(a) ? n(String(t.path[a])) : o;
  }), i = e.BASE + s;
  return t.query ? i + ys(t.query) : i;
}, As = (e) => {
  if (e.formData) {
    const t = new FormData(), n = (s, i) => {
      rt(i) || Xt(i) ? t.append(s, i) : t.append(s, JSON.stringify(i));
    };
    return Object.entries(e.formData).filter(([, s]) => s != null).forEach(([s, i]) => {
      Array.isArray(i) ? i.forEach((o) => n(s, o)) : n(s, i);
    }), t;
  }
}, dt = async (e, t) => typeof t == "function" ? t(e) : t, vs = async (e, t) => {
  const [n, s, i, o] = await Promise.all([
    // @ts-ignore
    dt(t, e.TOKEN),
    // @ts-ignore
    dt(t, e.USERNAME),
    // @ts-ignore
    dt(t, e.PASSWORD),
    // @ts-ignore
    dt(t, e.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([, l]) => l != null).reduce((l, [T, h]) => ({
    ...l,
    [T]: String(h)
  }), {});
  if (Dt(n) && (a.Authorization = `Bearer ${n}`), Dt(s) && Dt(i)) {
    const l = fs(`${s}:${i}`);
    a.Authorization = `Basic ${l}`;
  }
  return t.body !== void 0 && (t.mediaType ? a["Content-Type"] = t.mediaType : Xt(t.body) ? a["Content-Type"] = t.body.type || "application/octet-stream" : rt(t.body) ? a["Content-Type"] = "text/plain" : Ze(t.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, Is = (e) => {
  var t, n;
  if (e.body !== void 0)
    return (t = e.mediaType) != null && t.includes("application/json") || (n = e.mediaType) != null && n.includes("+json") ? JSON.stringify(e.body) : rt(e.body) || Xt(e.body) || Ze(e.body) ? e.body : JSON.stringify(e.body);
}, Es = async (e, t, n, s, i, o, a) => {
  const l = new AbortController();
  let T = {
    headers: o,
    body: s ?? i,
    method: t.method,
    signal: l.signal
  };
  e.WITH_CREDENTIALS && (T.credentials = e.CREDENTIALS);
  for (const h of e.interceptors.request._fns)
    T = await h(T);
  return a(() => l.abort()), await fetch(n, T);
}, Os = (e, t) => {
  if (t) {
    const n = e.headers.get(t);
    if (rt(n))
      return n;
  }
}, gs = async (e) => {
  if (e.status !== 204)
    try {
      const t = e.headers.get("Content-Type");
      if (t) {
        const n = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (t.includes("application/json") || t.includes("+json"))
          return await e.json();
        if (n.some((s) => t.includes(s)))
          return await e.blob();
        if (t.includes("multipart/form-data"))
          return await e.formData();
        if (t.includes("text/"))
          return await e.text();
      }
    } catch (t) {
      console.error(t);
    }
}, ws = (e, t) => {
  const s = {
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
  if (s)
    throw new Ee(e, t, s);
  if (!t.ok) {
    const i = t.status ?? "unknown", o = t.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Ee(
      e,
      t,
      `Generic Error: status: ${i}; status text: ${o}; body: ${a}`
    );
  }
}, _ = (e, t) => new bs(async (n, s, i) => {
  try {
    const o = Ts(e, t), a = As(t), l = Is(t), T = await vs(e, t);
    if (!i.isCancelled) {
      let h = await Es(e, t, o, l, a, T, i);
      for (const Qn of e.interceptors.response._fns)
        h = await Qn(h);
      const fe = await gs(h), Jn = Os(h, t.responseHeader);
      let ye = fe;
      t.responseTransformer && h.ok && (ye = await t.responseTransformer(fe));
      const Te = {
        url: o,
        ok: h.ok,
        status: h.status,
        statusText: h.statusText,
        body: Jn ?? ye
      };
      ws(t, Te), n(Te.body);
    }
  } catch (o) {
    s(o);
  }
});
class q {
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @param data.filter
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllImages(t = {}) {
    return _(d, {
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
    return _(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/all-issues",
      query: {
        skip: t.skip,
        take: t.take
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
  static getDuplicateContentUrls(t = {}) {
    return _(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/duplicate-content",
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
  static getExternalLinks(t = {}) {
    return _(d, {
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
    return _(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/health-score"
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
  static getInteralLinks(t = {}) {
    return _(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/internal-links",
      query: {
        skip: t.skip,
        take: t.take,
        filter: t.filter
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.issueGuid
   * @returns unknown OK
   * @throws ApiError
   */
  static getIssue(t = {}) {
    return _(d, {
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
    return _(d, {
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
    return _(d, {
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
    return _(d, {
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
    return _(d, {
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
class Ss {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getSettings() {
    return _(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/get-settings"
    });
  }
}
var A;
class $s {
  constructor(t) {
    p(this, A);
    m(this, A, t);
  }
  async getLatestAuditOverview() {
    return await k(r(this, A), q.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await k(r(this, A), q.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await k(r(this, A), q.getAllIssues({ skip: 0, take: 5 }));
  }
  async getHealthScore() {
    return await k(r(this, A), q.getHealthScore());
  }
}
A = new WeakMap();
var st;
class Us {
  constructor(t) {
    p(this, st);
    m(this, st, t);
  }
  async getSettings() {
    return await k(r(this, st), Ss.getSettings());
  }
}
st = new WeakMap();
var v, it;
class Ps extends Ke {
  constructor(n) {
    super(n);
    p(this, v);
    p(this, it);
    m(this, v, new $s(this)), m(this, it, new Us(this));
  }
  async getLatestAuditOverview() {
    return r(this, v).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return r(this, v).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return r(this, v).getTopIssues();
  }
  async getHealthScore() {
    return r(this, v).getHealthScore();
  }
  async getSettings() {
    return r(this, it).getSettings();
  }
}
v = new WeakMap(), it = new WeakMap();
var f, N, D, R, M, x;
class qt extends Ke {
  constructor(n) {
    super(n);
    p(this, f);
    p(this, N);
    p(this, D);
    p(this, R);
    p(this, M);
    p(this, x);
    this.workspaceAlias = _t, m(this, N, new Nt(void 0)), this.latestAuditOverview = r(this, N).asObservable(), m(this, D, new Ie([], (s) => s.id)), this.pagesWithMissingMetadata = r(this, D).asObservable(), m(this, R, new Ie([], (s) => s.name)), this.topIssues = r(this, R).asObservable(), m(this, M, new Nt(void 0)), this.healthScore = r(this, M).asObservable(), m(this, x, new Nt(void 0)), this.settings = r(this, x).asObservable(), this.provideContext(es, this), this.provideContext(tn, this), m(this, f, new Ps(this));
  }
  getEntityType() {
    return Qe;
  }
  async getLatestAuditOverview() {
    const { data: n } = await r(this, f).getLatestAuditOverview();
    n && r(this, N).setValue(n);
  }
  async getPagesWithMissingMetadata() {
    const { data: n } = await r(this, f).getPagesWithMissingMetadata();
    n && r(this, D).setValue(n.items);
  }
  async getTopIssues() {
    const { data: n } = await r(this, f).getTopIssues();
    n && r(this, R).setValue(n.items);
  }
  async getHealthScore() {
    const { data: n } = await r(this, f).getHealthScore();
    n && r(this, M).setValue(n);
  }
  async getSettings() {
    const { data: n } = await r(this, f).getSettings();
    n && r(this, x).setValue(n);
  }
}
f = new WeakMap(), N = new WeakMap(), D = new WeakMap(), R = new WeakMap(), M = new WeakMap(), x = new WeakMap();
const tn = new ts(
  "ContentAuditContext"
), Ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: tn,
  ContentAuditContext: qt,
  default: qt
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ks = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis, Jt = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, en = Symbol(), ge = /* @__PURE__ */ new WeakMap();
let Ns = class {
  constructor(t, n, s) {
    if (this._$cssResult$ = !0, s !== en) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Jt && t === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (t = ge.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ge.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ds = (e) => new Ns(typeof e == "string" ? e : e + "", void 0, en), Rs = (e, t) => {
  if (Jt) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const s = document.createElement("style"), i = pt.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = n.cssText, e.appendChild(s);
  }
}, we = Jt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const s of t.cssRules) n += s.cssText;
  return Ds(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ms, defineProperty: xs, getOwnPropertyDescriptor: Ws, getOwnPropertyNames: Vs, getOwnPropertySymbols: js, getPrototypeOf: Bs } = Object, I = globalThis, Se = I.trustedTypes, qs = Se ? Se.emptyScript : "", Rt = I.reactiveElementPolyfillSupport, H = (e, t) => e, Ht = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? qs : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, nn = (e, t) => !Ms(e, t), $e = { attribute: !0, type: String, converter: Ht, reflect: !1, hasChanged: nn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), I.litPropertyMetadata ?? (I.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class B extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = $e) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.elementProperties.set(t, n), !n.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, n);
      i !== void 0 && xs(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, n, s) {
    const { get: i, set: o } = Ws(this.prototype, t) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(a) {
      const l = i == null ? void 0 : i.call(this);
      o.call(this, a), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? $e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const t = Bs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const n = this.properties, s = [...Vs(n), ...js(n)];
      for (const i of s) this.createProperty(i, n[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [s, i] of n) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, s] of this.elementProperties) {
      const i = this._$Eu(n, s);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) n.unshift(we(i));
    } else t !== void 0 && n.push(we(t));
    return n;
  }
  static _$Eu(t, n) {
    const s = n.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((n) => n(this));
  }
  addController(t) {
    var n;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((n = t.hostConnected) == null || n.call(t));
  }
  removeController(t) {
    var n;
    (n = this._$EO) == null || n.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const s of n.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Rs(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((n) => {
      var s;
      return (s = n.hostConnected) == null ? void 0 : s.call(n);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((n) => {
      var s;
      return (s = n.hostDisconnected) == null ? void 0 : s.call(n);
    });
  }
  attributeChangedCallback(t, n, s) {
    this._$AK(t, s);
  }
  _$EC(t, n) {
    var o;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const a = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : Ht).toAttribute(n, s.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : Ht;
      this._$Em = i, this[i] = l.fromAttribute(n, a.type), this._$Em = null;
    }
  }
  requestUpdate(t, n, s) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? nn)(this[t], n)) return;
      this.P(t, n, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, n, s) {
    this._$AL.has(t) || this._$AL.set(t, n), s.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
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
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), (s = this._$EO) == null || s.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(n)) : this._$EU();
    } catch (i) {
      throw t = !1, this._$EU(), i;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var n;
    (n = this._$EO) == null || n.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
    this._$Ej && (this._$Ej = this._$Ej.forEach((n) => this._$EC(n, this[n]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
B.elementStyles = [], B.shadowRootOptions = { mode: "open" }, B[H("elementProperties")] = /* @__PURE__ */ new Map(), B[H("finalized")] = /* @__PURE__ */ new Map(), Rt == null || Rt({ ReactiveElement: B }), (I.reactiveElementVersions ?? (I.reactiveElementVersions = [])).push("2.0.4");
var Hs = Object.getOwnPropertyDescriptor, zs = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Hs(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = a(i) || i);
  return i;
};
let Ct = class extends lt(W) {
  constructor() {
    super(), this._workspaceContext = new qt(this);
  }
  render() {
    return c`
			<umb-workspace-editor headline="Content Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Ct = zs([
  ks("content-audit-workspace-root")
], Ct);
const Ys = Ct, Ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Ct;
  },
  default: Ys
}, Symbol.toStringTag, { value: "Module" })), j = "Umb.Menu.ContentAudit", ct = "Umb.Menu.ContentMetadata", Qt = "Umb.Collection.ContentAudit.Issues", Gs = "Umb.CollectionView.ContentAudit.Issues.Table", sn = "Umb.Repository.ContentAuditIssuesCollection";
var ot;
class Fs {
  constructor(t) {
    p(this, ot);
    m(this, ot, t);
  }
  async getCollection(t) {
    const { data: n, error: s } = await k(r(this, ot), q.getAllIssues(t));
    if (s)
      return { error: s };
    if (!n)
      return { data: { items: [], total: 0 } };
    const { items: i, total: o } = n;
    return { data: { items: i, total: o } };
  }
}
ot = new WeakMap();
var at;
class Ue extends ss {
  constructor(n) {
    super(n);
    p(this, at);
    m(this, at, new Fs(n));
  }
  async requestCollection(n) {
    return r(this, at).getCollection(n);
  }
}
at = new WeakMap();
const Xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: Ue,
  default: Ue
}, Symbol.toStringTag, { value: "Module" }));
var Js = Object.defineProperty, Qs = Object.getOwnPropertyDescriptor, on = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Qs(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && Js(t, n, i), i;
};
let bt = class extends W {
  render() {
    return this.value ? c`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : Ye;
  }
};
bt.styles = [
  is,
  b`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
on([
  V({ attribute: !1 })
], bt.prototype, "value", 2);
bt = on([
  C("content-audit-issues-table-name-column-layout")
], bt);
var Zs = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, an = (e) => {
  throw TypeError(e);
}, ut = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ti(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && Zs(t, n, i), i;
}, Zt = (e, t, n) => t.has(e) || an("Cannot " + n), Pe = (e, t, n) => (Zt(e, t, "read from private field"), t.get(e)), Le = (e, t, n) => t.has(e) ? an("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), ei = (e, t, n, s) => (Zt(e, t, "write to private field"), t.set(e, n), n), zt = (e, t, n) => (Zt(e, t, "access private method"), n), Y, z, ln, te;
let y = class extends L {
  constructor() {
    super(), Le(this, z), this.data = [], this._tableConfig = {
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
    ], this._tableItems = [], Le(this, Y), this.consumeContext(P, (e) => {
      ei(this, Y, e), zt(this, z, ln).call(this);
    });
  }
  updated(e) {
    e.has("data") && this.data.length !== 0 && zt(this, z, te).call(this, this.data);
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
Y = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakSet();
ln = function() {
  Pe(this, Y) && this.observe(Pe(this, Y).items, (e) => zt(this, z, te).call(this, e), "umbCollectionItemsObserver");
};
te = function(e) {
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
        value: `${t.percentOfTotal.toFixed(0)}%`
      }
    ]
  }));
};
y.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ut([
  V({ type: Array, attribute: !1 })
], y.prototype, "data", 2);
ut([
  u()
], y.prototype, "_tableConfig", 2);
ut([
  u()
], y.prototype, "_tableColumns", 2);
ut([
  u()
], y.prototype, "_tableItems", 2);
y = ut([
  C("content-audit-issues-table-collection-view")
], y);
const ni = y, si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return y;
  },
  default: ni
}, Symbol.toStringTag, { value: "Module" })), rn = "issues-root", ii = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: rn,
    menus: [j]
  }
}, oi = [ii], ke = "Umb.Workspace.ContentAudit.IssuesRoot", Ne = "Umb.Workspace.ContentAudit.Issues", ai = [
  {
    type: "workspace",
    kind: "routable",
    alias: Ne,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-Du1ckcBQ.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-2vMLEGQk.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: ns,
        match: Ne
      }
    ]
  }
], li = [
  {
    type: "workspace",
    kind: "default",
    alias: ke,
    name: "Issues Root Workspace",
    meta: {
      entityType: rn,
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
      collectionAlias: Qt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ke
      }
    ]
  }
], ri = [...ai, ...li], ci = [
  {
    type: "repository",
    alias: sn,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => Xs)
  }
], ui = [
  {
    type: "collectionView",
    alias: Gs,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => si),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: U,
        match: Qt
      }
    ]
  }
], di = [
  {
    type: "collection",
    kind: "default",
    alias: Qt,
    name: "Issues Collection",
    element: () => import("./issues.element-Cl7lgtgI.js"),
    meta: {
      repositoryAlias: sn
    }
  },
  ...ci,
  ...ui
], pi = "Umb.Repository.ContentAudit.Issues.Detail", mi = "Umb.Store.ContentAudit.Issues.Detail", hi = [
  {
    type: "repository",
    alias: pi,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-C5TnbHDA.js")
  },
  {
    type: "store",
    alias: mi,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], _i = [...hi], Ci = [
  ...ri,
  ...oi,
  ...di,
  ..._i
], cn = "status-codes-root", bi = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: cn,
    menus: [j]
  }
}, fi = [bi], ee = "Umb.Collection.ContentAudit.StatusCodes", yi = "Umb.CollectionView.ContentAudit.StatusCodes.Table", un = "Umb.Repository.ContentAuditStatusCodesCollection";
var Ti = Object.defineProperty, Ai = Object.getOwnPropertyDescriptor, dn = (e) => {
  throw TypeError(e);
}, Et = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Ai(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && Ti(t, n, i), i;
}, ne = (e, t, n) => t.has(e) || dn("Cannot " + n), Yt = (e, t, n) => (ne(e, t, "read from private field"), t.get(e)), Mt = (e, t, n) => t.has(e) ? dn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), pn = (e, t, n, s) => (ne(e, t, "write to private field"), t.set(e, n), n), se = (e, t, n) => (ne(e, t, "access private method"), n), K, Ot, G, mn, hn, _n;
let E = class extends L {
  constructor() {
    super(), Mt(this, G), this._tableConfig = {
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
    ], this._tableItems = [], Mt(this, K), Mt(this, Ot), this.consumeContext(P, (e) => {
      pn(this, K, e);
    }), se(this, G, mn).call(this);
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
K = /* @__PURE__ */ new WeakMap();
Ot = /* @__PURE__ */ new WeakMap();
G = /* @__PURE__ */ new WeakSet();
mn = function() {
  new It(this, At).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    pn(this, Ot, e), se(this, G, hn).call(this);
  });
};
hn = function() {
  Yt(this, K) && this.observe(Yt(this, K).items, (e) => se(this, G, _n).call(this, e), "umbCollectionItemsObserver");
};
_n = function(e) {
  const t = Yt(this, Ot);
  if (!t) throw new Error("Route builder not ready");
  this._tableItems = e.map((n) => {
    var i, o, a, l;
    const s = t({ entityType: n.entityType }) + vt.generateLocal({ unique: (i = n.pageData) == null ? void 0 : i.nodeKey });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${s}>${(o = n.pageData) == null ? void 0 : o.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (a = n.technicalSeoData) == null ? void 0 : a.contentType
        },
        {
          columnAlias: "statusCode",
          value: c`<content-audit-status-code-label .statusCode=${(l = n.pageData) == null ? void 0 : l.statusCode}></content-audit-status-code-label>`
        }
      ]
    };
  });
};
E.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Et([
  u()
], E.prototype, "_tableConfig", 2);
Et([
  u()
], E.prototype, "_tableColumns", 2);
Et([
  u()
], E.prototype, "_tableItems", 2);
E = Et([
  C("content-audit-status-codes-table-collection-view")
], E);
const vi = E, Ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return E;
  },
  default: vi
}, Symbol.toStringTag, { value: "Module" })), De = "Umb.Workspace.ContentAudit.StatusCodes", Ei = [
  {
    type: "workspace",
    kind: "default",
    alias: De,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: cn,
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
      collectionAlias: ee
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: De
      }
    ]
  }
], Oi = [
  {
    type: "repository",
    alias: un,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-CpZ30mW5.js")
  }
], gi = [
  {
    type: "collectionView",
    alias: yi,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => Ii),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: U,
        match: ee
      }
    ]
  }
], wi = [
  {
    type: "collection",
    kind: "default",
    alias: ee,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-BN2nUSUs.js"),
    meta: {
      repositoryAlias: un
    }
  },
  ...Oi,
  ...gi
], Si = [
  ...Ei,
  ...fi,
  ...wi
], Cn = "orphaned-pages-root", $i = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: Cn,
    menus: [ct]
  }
}, Ui = [$i], ie = "Umb.Collection.ContentAudit.OrphanedPages", Pi = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", bn = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var Li = Object.defineProperty, ki = Object.getOwnPropertyDescriptor, fn = (e) => {
  throw TypeError(e);
}, gt = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ki(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && Li(t, n, i), i;
}, oe = (e, t, n) => t.has(e) || fn("Cannot " + n), Kt = (e, t, n) => (oe(e, t, "read from private field"), t.get(e)), xt = (e, t, n) => t.has(e) ? fn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), yn = (e, t, n, s) => (oe(e, t, "write to private field"), t.set(e, n), n), ae = (e, t, n) => (oe(e, t, "access private method"), n), F, wt, X, Tn, An, vn;
let O = class extends L {
  constructor() {
    super(), xt(this, X), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], xt(this, F), xt(this, wt), this.consumeContext(P, (e) => {
      yn(this, F, e);
    }), ae(this, X, Tn).call(this);
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
F = /* @__PURE__ */ new WeakMap();
wt = /* @__PURE__ */ new WeakMap();
X = /* @__PURE__ */ new WeakSet();
Tn = function() {
  new It(this, At).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    yn(this, wt, e), ae(this, X, An).call(this);
  });
};
An = function() {
  Kt(this, F) && this.observe(Kt(this, F).items, (e) => ae(this, X, vn).call(this, e), "umbCollectionItemsObserver");
};
vn = function(e) {
  const t = Kt(this, wt);
  if (!t) throw new Error("Route builder not ready");
  this._tableItems = e.map((n) => {
    const s = t({ entityType: "document" }) + vt.generateLocal({ unique: n.nodeKey });
    return {
      id: n.unique,
      entityType: n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${s}>${n.url}</a>`
        }
      ]
    };
  });
};
O.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
gt([
  u()
], O.prototype, "_tableConfig", 2);
gt([
  u()
], O.prototype, "_tableColumns", 2);
gt([
  u()
], O.prototype, "_tableItems", 2);
O = gt([
  C("content-audit-orphaned-pages-table-collection-view")
], O);
const Ni = O, Di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return O;
  },
  default: Ni
}, Symbol.toStringTag, { value: "Module" })), Re = "Umb.Workspace.ContentAudit.OrphanedPages", Ri = [
  {
    type: "workspace",
    kind: "default",
    alias: Re,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: Cn,
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
      collectionAlias: ie
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Re
      }
    ]
  }
], Mi = [
  {
    type: "repository",
    alias: bn,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-DdStEeXj.js")
  }
], xi = [
  {
    type: "collectionView",
    alias: Pi,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Di),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: U,
        match: ie
      }
    ]
  }
], Wi = [
  {
    type: "collection",
    kind: "default",
    alias: ie,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-DoefYUIA.js"),
    meta: {
      repositoryAlias: bn
    }
  },
  ...Mi,
  ...xi
], Vi = [
  ...Ri,
  ...Ui,
  ...Wi
], In = "images-alt-text-root", ji = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: In,
    menus: [ct]
  }
}, Bi = [ji], le = "Umb.Collection.ContentAudit.ImagesAltText", qi = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", En = "Umb.Repository.ContentAuditImagesAltTextCollection";
var Hi = Object.defineProperty, zi = Object.getOwnPropertyDescriptor, On = (e) => {
  throw TypeError(e);
}, St = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? zi(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && Hi(t, n, i), i;
}, re = (e, t, n) => t.has(e) || On("Cannot " + n), Gt = (e, t, n) => (re(e, t, "read from private field"), t.get(e)), Wt = (e, t, n) => t.has(e) ? On("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), gn = (e, t, n, s) => (re(e, t, "write to private field"), t.set(e, n), n), ce = (e, t, n) => (re(e, t, "access private method"), n), J, $t, Q, wn, Sn, $n;
let g = class extends L {
  constructor() {
    super(), Wt(this, Q), this._tableConfig = {
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
    ], this._tableItems = [], Wt(this, J), Wt(this, $t), this.consumeContext(P, (e) => {
      gn(this, J, e);
    }), ce(this, Q, wn).call(this);
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
J = /* @__PURE__ */ new WeakMap();
$t = /* @__PURE__ */ new WeakMap();
Q = /* @__PURE__ */ new WeakSet();
wn = function() {
  new It(this, At).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    gn(this, $t, e), ce(this, Q, Sn).call(this);
  });
};
Sn = function() {
  Gt(this, J) && this.observe(Gt(this, J).items, (e) => ce(this, Q, $n).call(this, e), "umbCollectionItemsObserver");
};
$n = function(e) {
  const t = Gt(this, $t);
  if (!t) throw new Error("Route builder not ready");
  this._tableItems = e.map((n) => {
    const s = t({ entityType: "document" }) + vt.generateLocal({ unique: n.nodeKey });
    return {
      id: n.unique,
      entityType: n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: n.url
        },
        {
          columnAlias: "foundPage",
          value: c`<a href=${s}>${n.foundPage}</a>`
        },
        {
          columnAlias: "altText",
          value: n.altText
        }
      ]
    };
  });
};
g.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
St([
  u()
], g.prototype, "_tableConfig", 2);
St([
  u()
], g.prototype, "_tableColumns", 2);
St([
  u()
], g.prototype, "_tableItems", 2);
g = St([
  C("content-audit-images-alt-text-table-collection-view")
], g);
const Yi = g, Ki = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return g;
  },
  default: Yi
}, Symbol.toStringTag, { value: "Module" })), Me = "Umb.Workspace.ContentAudit.ImagesAltText", Gi = [
  {
    type: "workspace",
    kind: "default",
    alias: Me,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: In,
      headline: "Image Alt Text"
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
      collectionAlias: le
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Me
      }
    ]
  }
], Fi = [
  {
    type: "repository",
    alias: En,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-Bgik8mMC.js")
  }
], Xi = [
  {
    type: "collectionView",
    alias: qi,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Ki),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: U,
        match: le
      }
    ]
  }
], Ji = [
  {
    type: "collection",
    kind: "default",
    alias: le,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DzMGILfL.js"),
    meta: {
      repositoryAlias: En
    }
  },
  ...Fi,
  ...Xi
], Qi = [
  ...Gi,
  ...Bi,
  ...Ji
], Un = "outbound-links-root", Zi = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: Un,
    menus: [j]
  }
}, to = [Zi], ue = "Umb.Collection.ContentAudit.OutboundLinks", eo = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", Pn = "Umb.Repository.ContentAuditOutboundLinksCollection";
var no = Object.defineProperty, so = Object.getOwnPropertyDescriptor, Ln = (e) => {
  throw TypeError(e);
}, Ut = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? so(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && no(t, n, i), i;
}, de = (e, t, n) => t.has(e) || Ln("Cannot " + n), xe = (e, t, n) => (de(e, t, "read from private field"), t.get(e)), We = (e, t, n) => t.has(e) ? Ln("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), io = (e, t, n, s) => (de(e, t, "write to private field"), t.set(e, n), n), kn = (e, t, n) => (de(e, t, "access private method"), n), Z, ft, Nn, Dn;
let w = class extends L {
  constructor() {
    super(), We(this, ft), this._tableConfig = {
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
    ], this._tableItems = [], We(this, Z), this.consumeContext(P, (e) => {
      io(this, Z, e), kn(this, ft, Nn).call(this);
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
Z = /* @__PURE__ */ new WeakMap();
ft = /* @__PURE__ */ new WeakSet();
Nn = function() {
  xe(this, Z) && this.observe(xe(this, Z).items, (e) => kn(this, ft, Dn).call(this, e), "umbCollectionItemsObserver");
};
Dn = function(e) {
  this._tableItems = e.map((t) => {
    var n;
    return {
      id: t.unique,
      data: [
        {
          columnAlias: "url",
          value: c`<a href="${t.url}" target="_blank">${t.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: c`<content-audit-status-code-label .statusCode=${t.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "contentType",
          value: t.contentType
        },
        {
          columnAlias: "outlinks",
          value: (n = t.externalPages) == null ? void 0 : n.length
        }
      ]
    };
  });
};
w.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ut([
  u()
], w.prototype, "_tableConfig", 2);
Ut([
  u()
], w.prototype, "_tableColumns", 2);
Ut([
  u()
], w.prototype, "_tableItems", 2);
w = Ut([
  C("content-audit-outbound-links-table-collection-view")
], w);
const oo = w, ao = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return w;
  },
  default: oo
}, Symbol.toStringTag, { value: "Module" })), Ve = "Umb.Workspace.ContentAudit.OutboundLinks", lo = [
  {
    type: "workspace",
    kind: "default",
    alias: Ve,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: Un,
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
      collectionAlias: ue
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ve
      }
    ]
  }
], ro = [
  {
    type: "repository",
    alias: Pn,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-V95DYpHG.js")
  }
], co = [
  {
    type: "collectionView",
    alias: eo,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => ao),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: U,
        match: ue
      }
    ]
  }
], uo = [
  {
    type: "collection",
    kind: "default",
    alias: ue,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-DJu1PE06.js"),
    meta: {
      repositoryAlias: Pn
    }
  },
  ...ro,
  ...co
], po = [
  ...lo,
  ...to,
  ...uo
], Rn = "inbound-links-root", mo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Rn,
    menus: [j]
  }
}, ho = [mo], pe = "Umb.Collection.ContentAudit.InboundLinks", _o = "Umb.CollectionView.ContentAudit.InboundLinks.Table", Mn = "Umb.Repository.ContentAuditInboundLinksCollection";
var Co = Object.defineProperty, bo = Object.getOwnPropertyDescriptor, xn = (e) => {
  throw TypeError(e);
}, Pt = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? bo(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && Co(t, n, i), i;
}, me = (e, t, n) => t.has(e) || xn("Cannot " + n), je = (e, t, n) => (me(e, t, "read from private field"), t.get(e)), Be = (e, t, n) => t.has(e) ? xn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), fo = (e, t, n, s) => (me(e, t, "write to private field"), t.set(e, n), n), Wn = (e, t, n) => (me(e, t, "access private method"), n), tt, yt, Vn, jn;
let S = class extends L {
  constructor() {
    super(), Be(this, yt), this._tableConfig = {
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
        name: "Inlinks",
        alias: "inlinks"
      }
    ], this._tableItems = [], Be(this, tt), this.consumeContext(P, (e) => {
      fo(this, tt, e), Wn(this, yt, Vn).call(this);
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
tt = /* @__PURE__ */ new WeakMap();
yt = /* @__PURE__ */ new WeakSet();
Vn = function() {
  je(this, tt) && this.observe(je(this, tt).items, (e) => Wn(this, yt, jn).call(this, e), "umbCollectionItemsObserver");
};
jn = function(e) {
  this._tableItems = e.map((t) => {
    var n;
    return {
      id: t.unique,
      data: [
        {
          columnAlias: "url",
          value: c`<a href="${t.url}" target="_blank">${t.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: c`<content-audit-status-code-label .statusCode=${t.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "contentType",
          value: t.contentType
        },
        {
          columnAlias: "inlinks",
          value: (n = t.internalPages) == null ? void 0 : n.length
        }
      ]
    };
  });
};
S.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Pt([
  u()
], S.prototype, "_tableConfig", 2);
Pt([
  u()
], S.prototype, "_tableColumns", 2);
Pt([
  u()
], S.prototype, "_tableItems", 2);
S = Pt([
  C("content-audit-inbound-links-table-collection-view")
], S);
const yo = S, To = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return S;
  },
  default: yo
}, Symbol.toStringTag, { value: "Module" })), qe = "Umb.Workspace.ContentAudit.InboundLinks", Ao = [
  {
    type: "workspace",
    kind: "default",
    alias: qe,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: Rn,
      headline: "Inbound Links"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.InboundLinks.Collection",
    name: "Content Audit Inbound Links Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: pe
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: qe
      }
    ]
  }
], vo = [
  {
    type: "repository",
    alias: Mn,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-GXZClsUo.js")
  }
], Io = [
  {
    type: "collectionView",
    alias: _o,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => To),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: U,
        match: pe
      }
    ]
  }
], Eo = [
  {
    type: "collection",
    kind: "default",
    alias: pe,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-BgFbFelw.js"),
    meta: {
      repositoryAlias: Mn
    }
  },
  ...vo,
  ...Io
], Oo = [
  ...Ao,
  ...ho,
  ...Eo
], Bn = "metadata-root", go = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: Bn,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, wo = [go], he = "Umb.Collection.ContentAudit.Metadata", So = "Umb.CollectionView.ContentAudit.Metadata.Table", He = "Umb.Workspace.ContentAudit.Metadata", $o = [
  {
    type: "workspace",
    kind: "default",
    alias: He,
    name: "Metadata Root Workspace",
    meta: {
      entityType: Bn,
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
      collectionAlias: he
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: He
      }
    ]
  }
], qn = "Umb.Repository.ContentAuditMetadataCollection", Uo = [
  {
    type: "repository",
    alias: qn,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-CZ_MMP6k.js")
  }
], Po = [
  {
    type: "collectionView",
    alias: So,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element-BKNUE4bD.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: U,
        match: he
      }
    ]
  }
], Lo = [
  {
    type: "collection",
    kind: "default",
    alias: he,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: qn
    }
  },
  ...Uo,
  ...Po
], ko = [
  ...$o,
  ...wo,
  ...Lo
], Hn = "duplicate-content-root", No = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.DuplicateContent",
  name: "Duplicate Content Menu Item",
  weight: 3e3,
  meta: {
    label: "Duplicate Content",
    icon: "icon-documents",
    entityType: Hn,
    menus: [ct]
  }
}, Do = [No], _e = "Umb.Collection.ContentAudit.DuplicateContent", Ro = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", zn = "Umb.Repository.ContentAuditDuplicateContentCollection";
var Mo = Object.defineProperty, xo = Object.getOwnPropertyDescriptor, Yn = (e) => {
  throw TypeError(e);
}, Lt = (e, t, n, s) => {
  for (var i = s > 1 ? void 0 : s ? xo(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, n, i) : a(i)) || i);
  return s && i && Mo(t, n, i), i;
}, Ce = (e, t, n) => t.has(e) || Yn("Cannot " + n), Ft = (e, t, n) => (Ce(e, t, "read from private field"), t.get(e)), Vt = (e, t, n) => t.has(e) ? Yn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Kn = (e, t, n, s) => (Ce(e, t, "write to private field"), t.set(e, n), n), be = (e, t, n) => (Ce(e, t, "access private method"), n), et, kt, nt, Gn, Fn, Xn;
let $ = class extends L {
  constructor() {
    super(), Vt(this, nt), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      },
      {
        name: "Duplicate pages",
        alias: "duplicatePages"
      }
    ], this._tableItems = [], Vt(this, et), Vt(this, kt), this.consumeContext(P, (e) => {
      Kn(this, et, e);
    }), be(this, nt, Gn).call(this);
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
et = /* @__PURE__ */ new WeakMap();
kt = /* @__PURE__ */ new WeakMap();
nt = /* @__PURE__ */ new WeakSet();
Gn = function() {
  new It(this, At).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    Kn(this, kt, e), be(this, nt, Fn).call(this);
  });
};
Fn = function() {
  Ft(this, et) && this.observe(Ft(this, et).items, (e) => be(this, nt, Xn).call(this, e), "umbCollectionItemsObserver");
};
Xn = function(e) {
  const t = Ft(this, kt);
  if (!t) throw new Error("Route builder not ready");
  this._tableItems = e.map((n) => {
    var i;
    const s = t({ entityType: "document" }) + vt.generateLocal({ unique: n.unique });
    return {
      id: n.unique,
      entityType: n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${s}>${n.url}</a>`
        },
        {
          columnAlias: "duplicatePages",
          value: (i = n.internalPages) == null ? void 0 : i.length
        }
      ]
    };
  });
};
$.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Lt([
  u()
], $.prototype, "_tableConfig", 2);
Lt([
  u()
], $.prototype, "_tableColumns", 2);
Lt([
  u()
], $.prototype, "_tableItems", 2);
$ = Lt([
  C("content-audit-duplicate-content-table-collection-view")
], $);
const Wo = $, Vo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return $;
  },
  default: Wo
}, Symbol.toStringTag, { value: "Module" })), ze = "Umb.Workspace.ContentAudit.DuplicateContent", jo = [
  {
    type: "workspace",
    kind: "default",
    alias: ze,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: Hn,
      headline: "Duplicate Content"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.DuplicateContent.Collection",
    name: "Content Audit Duplicate Content Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: _e
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ze
      }
    ]
  }
], Bo = [
  {
    type: "repository",
    alias: zn,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-CtXkuheN.js")
  }
], qo = [
  {
    type: "collectionView",
    alias: Ro,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => Vo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: U,
        match: _e
      }
    ]
  }
], Ho = [
  {
    type: "collection",
    kind: "default",
    alias: _e,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-DTbM7jcX.js"),
    meta: {
      repositoryAlias: zn
    }
  },
  ...Bo,
  ...qo
], zo = [
  ...jo,
  ...Do,
  ...Ho
], Tt = "Umb.Section.ContentAudit", Yo = {
  type: "section",
  alias: Tt,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Ko = {
  type: "sectionView",
  alias: "Umb.SectionView.ContentAudit.Scan",
  name: "Content Audit Scan Section View",
  element: () => import("./section.element-CxVaSoKM.js"),
  meta: {
    label: "Scan",
    icon: "icon-scan",
    pathname: "audit-root"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: Tt
    }
  ]
}, Go = [
  {
    type: "menu",
    alias: j,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: ct,
    name: "Content Menu"
  }
], Fo = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: j
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: Tt
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
      menu: ct
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: Tt
      }
    ]
  }
], Xo = [
  Yo,
  Ko,
  ...Go,
  ...Fo,
  ...Ci,
  ...Si,
  ...Vi,
  ...Qi,
  ...po,
  ...Oo,
  ...ko,
  ...zo
], Jo = {
  type: "workspace",
  alias: _t,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Ks),
  meta: {
    entityType: Qe
  }
}, Qo = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-BribGnmJ.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: _t
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-B_p02WmK.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: _t
      }
    ]
  }
], Zo = [
  Jo,
  ...Qo
], ta = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-C0jDKRck.js")
  }
], ea = [
  {
    type: "localization",
    alias: "Umb.ContentAudit.Localization.En-GB",
    weight: -100,
    name: "English (UK)",
    meta: {
      culture: "en"
    },
    js: () => import("./en-5vqxyhOY.js")
  }
], na = {
  type: "globalContext",
  alias: _s,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Ls)
}, va = async (e, t) => {
  t.registerMany([
    na,
    ...Xo,
    ...Zo,
    ...ta,
    ...ea
  ]), e.consumeContext(Zn, async (n) => {
    if (!n) return;
    const s = n.getOpenApiConfiguration();
    d.BASE = s.base, d.TOKEN = s.token, d.WITH_CREDENTIALS = s.withCredentials, d.CREDENTIALS = s.credentials;
  });
};
export {
  q as A,
  tn as C,
  os as I,
  fa as U,
  Ne as a,
  mt as b,
  ht as c,
  jt as d,
  Bt as e,
  nn as f,
  ya as g,
  Ta as h,
  as as i,
  qt as j,
  Ct as k,
  _t as l,
  _s as m,
  Qe as n,
  va as o,
  j as p,
  ct as q,
  Qt as r,
  Gs as s,
  ks as t,
  Ht as u,
  sn as v,
  Ue as w,
  Fs as x,
  y
};
//# sourceMappingURL=index-D_Li1N95.js.map
