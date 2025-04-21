var gt = (t) => {
  throw TypeError(t);
};
var It = (t, e, s) => e.has(t) || gt("Cannot " + s);
var l = (t, e, s) => (It(t, e, "read from private field"), s ? s.call(t) : e.get(t)), p = (t, e, s) => e.has(t) ? gt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), m = (t, e, s, i) => (It(t, e, "write to private field"), i ? i.call(t, s) : e.set(t, s), s);
import { UMB_AUTH_CONTEXT as sn } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as ce } from "@umbraco-cms/backoffice/element-api";
import { LitElement as B, html as c, css as b, property as H, customElement as _, nothing as Xt, state as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as Jt } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as nn } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as on, UMB_WORKSPACE_CONDITION_ALIAS as R, UMB_WORKSPACE_MODAL as Ke } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as W } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Ne, UmbArrayState as Et } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as an } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as k, UMB_COLLECTION_ALIAS_CONDITION as y } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as L } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as ln } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as Fe } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Xe } from "@umbraco-cms/backoffice/router";
const rn = [
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
], cn = [
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
var un = Object.defineProperty, dn = Object.getOwnPropertyDescriptor, Qt = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? dn(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && un(e, s, n), n;
};
let he = class extends ce(B) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = rn[this.type - 1];
      return c`
                <uui-tag color=${t.color}>
                    <uui-icon name="${t.icon}"></uui-icon>
                    ${t.label}
                </uui-tag>
            `;
    }
  }
};
he.styles = [
  b`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Qt([
  H({ attribute: !1 })
], he.prototype, "type", 2);
he = Qt([
  _("content-audit-issue-type-label")
], he);
var pn = Object.defineProperty, mn = Object.getOwnPropertyDescriptor, Zt = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? mn(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && pn(e, s, n), n;
};
let _e = class extends ce(B) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = cn[this.type - 1];
      return c`
                <uui-tag color=${t.color}>
                    <uui-icon name="${t.icon}"></uui-icon>
                    ${t.label}
                </uui-tag>
            `;
    }
  }
};
_e.styles = [
  b`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Zt([
  H({ attribute: !1 })
], _e.prototype, "type", 2);
_e = Zt([
  _("content-audit-priority-type-label")
], _e);
var hn = Object.defineProperty, _n = Object.getOwnPropertyDescriptor, es = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? _n(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && hn(e, s, n), n;
};
let xe = class extends ce(B) {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? c`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : Xt;
  }
};
es([
  H({ attribute: !1 })
], xe.prototype, "statusCode", 2);
xe = es([
  _("content-audit-status-code-label")
], xe);
var Cn = Object.defineProperty, bn = Object.getOwnPropertyDescriptor, ts = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? bn(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && Cn(e, s, n), n;
};
let je = class extends ce(B) {
  constructor() {
    super(...arguments), this.value = "";
  }
  _getColour(t) {
    return t == "E" || t == "F" ? "danger" : t == "D" ? "warning" : "positive";
  }
  render() {
    return c`
            <uui-tag .color=${this._getColour(this.value)}>
                ${this.value}
            </uui-tag>
        `;
  }
};
ts([
  H({ attribute: !0 })
], je.prototype, "value", 2);
je = ts([
  _("content-audit-carbon-intensity-label")
], je);
class qa extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class Ba extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class Ha extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const Ce = "Umb.Workspace.ContentAudit", fn = "Umb.Context.ContentAudit", ss = "content-audit";
class Ot extends Error {
  constructor(e, s, i) {
    super(i), this.name = "ApiError", this.url = s.url, this.status = s.status, this.statusText = s.statusText, this.body = s.body, this.request = e;
  }
}
class An extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class yn {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((s, i) => {
      this._resolve = s, this._reject = i;
      const n = (r) => {
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
      }), e(n, o, a);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, s) {
    return this.promise.then(e, s);
  }
  catch(e) {
    return this.promise.catch(e);
  }
  finally(e) {
    return this.promise.finally(e);
  }
  cancel() {
    if (!(this._isResolved || this._isRejected || this._isCancelled)) {
      if (this._isCancelled = !0, this.cancelHandlers.length)
        try {
          for (const e of this.cancelHandlers)
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      this.cancelHandlers.length = 0, this._reject && this._reject(new An("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class vt {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const s = this._fns.indexOf(e);
    s !== -1 && (this._fns = [...this._fns.slice(0, s), ...this._fns.slice(s + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
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
    request: new vt(),
    response: new vt()
  }
}, ue = (t) => typeof t == "string", De = (t) => ue(t) && t !== "", Je = (t) => t instanceof Blob, ns = (t) => t instanceof FormData, Tn = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, gn = (t) => {
  const e = [], s = (n, o) => {
    e.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(o))}`);
  }, i = (n, o) => {
    o != null && (o instanceof Date ? s(n, o.toISOString()) : Array.isArray(o) ? o.forEach((a) => i(n, a)) : typeof o == "object" ? Object.entries(o).forEach(([a, r]) => i(`${n}[${a}]`, r)) : s(n, o));
  };
  return Object.entries(t).forEach(([n, o]) => i(n, o)), e.length ? `?${e.join("&")}` : "";
}, In = (t, e) => {
  const s = encodeURI, i = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (o, a) => {
    var r;
    return (r = e.path) != null && r.hasOwnProperty(a) ? s(String(e.path[a])) : o;
  }), n = t.BASE + i;
  return e.query ? n + gn(e.query) : n;
}, En = (t) => {
  if (t.formData) {
    const e = new FormData(), s = (i, n) => {
      ue(n) || Je(n) ? e.append(i, n) : e.append(i, JSON.stringify(n));
    };
    return Object.entries(t.formData).filter(([, i]) => i != null).forEach(([i, n]) => {
      Array.isArray(n) ? n.forEach((o) => s(i, o)) : s(i, n);
    }), e;
  }
}, pe = async (t, e) => typeof e == "function" ? e(t) : e, On = async (t, e) => {
  const [s, i, n, o] = await Promise.all([
    // @ts-ignore
    pe(e, t.TOKEN),
    // @ts-ignore
    pe(e, t.USERNAME),
    // @ts-ignore
    pe(e, t.PASSWORD),
    // @ts-ignore
    pe(e, t.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...o,
    ...e.headers
  }).filter(([, r]) => r != null).reduce((r, [T, C]) => ({
    ...r,
    [T]: String(C)
  }), {});
  if (De(s) && (a.Authorization = `Bearer ${s}`), De(i) && De(n)) {
    const r = Tn(`${i}:${n}`);
    a.Authorization = `Basic ${r}`;
  }
  return e.body !== void 0 && (e.mediaType ? a["Content-Type"] = e.mediaType : Je(e.body) ? a["Content-Type"] = e.body.type || "application/octet-stream" : ue(e.body) ? a["Content-Type"] = "text/plain" : ns(e.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, vn = (t) => {
  var e, s;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (s = t.mediaType) != null && s.includes("+json") ? JSON.stringify(t.body) : ue(t.body) || Je(t.body) || ns(t.body) ? t.body : JSON.stringify(t.body);
}, wn = async (t, e, s, i, n, o, a) => {
  const r = new AbortController();
  let T = {
    headers: o,
    body: i ?? n,
    method: e.method,
    signal: r.signal
  };
  t.WITH_CREDENTIALS && (T.credentials = t.CREDENTIALS);
  for (const C of t.interceptors.request._fns)
    T = await C(T);
  return a(() => r.abort()), await fetch(s, T);
}, Sn = (t, e) => {
  if (e) {
    const s = t.headers.get(e);
    if (ue(s))
      return s;
  }
}, $n = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const s = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (s.some((i) => e.includes(i)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, Pn = (t, e) => {
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
    ...t.errors
  }[e.status];
  if (i)
    throw new Ot(t, e, i);
  if (!e.ok) {
    const n = e.status ?? "unknown", o = e.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Ot(
      t,
      e,
      `Generic Error: status: ${n}; status text: ${o}; body: ${a}`
    );
  }
}, h = (t, e) => new yn(async (s, i, n) => {
  try {
    const o = In(t, e), a = En(e), r = vn(e), T = await On(t, e);
    if (!n.isCancelled) {
      let C = await wn(t, e, o, r, a, T, n);
      for (const tn of t.interceptors.response._fns)
        C = await tn(C);
      const At = await $n(C), en = Sn(C, e.responseHeader);
      let yt = At;
      e.responseTransformer && C.ok && (yt = await e.responseTransformer(At));
      const Tt = {
        url: o,
        ok: C.ok,
        status: C.status,
        statusText: C.statusText,
        body: en ?? yt
      };
      Pn(e, Tt), s(Tt.body);
    }
  } catch (o) {
    i(o);
  }
});
class G {
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @param data.filter
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllImages(e = {}) {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/all-images",
      query: {
        skip: e.skip,
        take: e.take,
        filter: e.filter
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
  static getAllIssues(e = {}) {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/all-issues",
      query: {
        skip: e.skip,
        take: e.take
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
  static getDuplicateContentUrls(e = {}) {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/duplicate-content",
      query: {
        skip: e.skip,
        take: e.take,
        filter: e.filter
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
  static getExternalLinks(e = {}) {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/external-links",
      query: {
        skip: e.skip,
        take: e.take,
        filter: e.filter
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getHealthScore() {
    return h(d, {
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
  static getInteralLinks(e = {}) {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/internal-links",
      query: {
        skip: e.skip,
        take: e.take,
        filter: e.filter
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.issueGuid
   * @returns unknown OK
   * @throws ApiError
   */
  static getIssue(e = {}) {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/issue",
      query: {
        issueGuid: e.issueGuid
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getLatestAuditOverview() {
    return h(d, {
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
  static getLatestAuditData(e = {}) {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/latest-data",
      query: {
        skip: e.skip,
        take: e.take,
        filter: e.filter,
        statusCode: e.statusCode
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.unique
   * @returns unknown OK
   * @throws ApiError
   */
  static getLatestPageAuditData(e = {}) {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/latest-page-data",
      query: {
        unique: e.unique
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
  static getPagesWithMissingMetadata(e = {}) {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/missing-metadata",
      query: {
        skip: e.skip,
        take: e.take,
        filter: e.filter
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
  static getOrphanedPages(e = {}) {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/orphaned-pages",
      query: {
        skip: e.skip,
        take: e.take,
        filter: e.filter
      }
    });
  }
}
class Un {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getSettings() {
    return h(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/get-settings"
    });
  }
}
var g;
class Ln {
  constructor(e) {
    p(this, g);
    m(this, g, e);
  }
  async getLatestAuditOverview() {
    return await W(l(this, g), G.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await W(l(this, g), G.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await W(l(this, g), G.getAllIssues({ skip: 0, take: 5 }));
  }
  async getHealthScore() {
    return await W(l(this, g), G.getHealthScore());
  }
}
g = new WeakMap();
var oe;
class kn {
  constructor(e) {
    p(this, oe);
    m(this, oe, e);
  }
  async getSettings() {
    return await W(l(this, oe), Un.getSettings());
  }
}
oe = new WeakMap();
var I, ae;
class Nn extends Jt {
  constructor(s) {
    super(s);
    p(this, I);
    p(this, ae);
    m(this, I, new Ln(this)), m(this, ae, new kn(this));
  }
  async getLatestAuditOverview() {
    return l(this, I).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return l(this, I).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return l(this, I).getTopIssues();
  }
  async getHealthScore() {
    return l(this, I).getHealthScore();
  }
  async getSettings() {
    return l(this, ae).getSettings();
  }
}
I = new WeakMap(), ae = new WeakMap();
var f, M, V, x, j, q;
class qe extends Jt {
  constructor(s) {
    super(s);
    p(this, f);
    p(this, M);
    p(this, V);
    p(this, x);
    p(this, j);
    p(this, q);
    this.workspaceAlias = Ce, m(this, M, new Ne(void 0)), this.latestAuditOverview = l(this, M).asObservable(), m(this, V, new Et([], (i) => i.unique)), this.pagesWithMissingMetadata = l(this, V).asObservable(), m(this, x, new Et([], (i) => i.name)), this.topIssues = l(this, x).asObservable(), m(this, j, new Ne(void 0)), this.healthScore = l(this, j).asObservable(), m(this, q, new Ne(void 0)), this.settings = l(this, q).asObservable(), this.provideContext(on, this), this.provideContext(is, this), m(this, f, new Nn(this));
  }
  getEntityType() {
    return ss;
  }
  async getLatestAuditOverview() {
    const { data: s } = await l(this, f).getLatestAuditOverview();
    s && l(this, M).setValue(s);
  }
  async getPagesWithMissingMetadata() {
    const { data: s } = await l(this, f).getPagesWithMissingMetadata();
    s && l(this, V).setValue(s.items);
  }
  async getTopIssues() {
    const { data: s } = await l(this, f).getTopIssues();
    s && l(this, x).setValue(s.items);
  }
  async getHealthScore() {
    const { data: s } = await l(this, f).getHealthScore();
    s && l(this, j).setValue(s);
  }
  async getSettings() {
    const { data: s } = await l(this, f).getSettings();
    s && l(this, q).setValue(s);
  }
}
f = new WeakMap(), M = new WeakMap(), V = new WeakMap(), x = new WeakMap(), j = new WeakMap(), q = new WeakMap();
const is = new nn(
  "ContentAuditContext"
), Dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: is,
  ContentAuditContext: qe,
  default: qe
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rn = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const me = globalThis, Qe = me.ShadowRoot && (me.ShadyCSS === void 0 || me.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, os = Symbol(), wt = /* @__PURE__ */ new WeakMap();
let Wn = class {
  constructor(e, s, i) {
    if (this._$cssResult$ = !0, i !== os) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (Qe && e === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (e = wt.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && wt.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Mn = (t) => new Wn(typeof t == "string" ? t : t + "", void 0, os), Vn = (t, e) => {
  if (Qe) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const i = document.createElement("style"), n = me.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = s.cssText, t.appendChild(i);
  }
}, St = Qe ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const i of e.cssRules) s += i.cssText;
  return Mn(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: xn, defineProperty: jn, getOwnPropertyDescriptor: qn, getOwnPropertyNames: Bn, getOwnPropertySymbols: Hn, getPrototypeOf: zn } = Object, E = globalThis, $t = E.trustedTypes, Gn = $t ? $t.emptyScript : "", Re = E.reactiveElementPolyfillSupport, Y = (t, e) => t, Be = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Gn : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, as = (t, e) => !xn(t, e), Pt = { attribute: !0, type: String, converter: Be, reflect: !1, hasChanged: as };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class z extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = Pt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(e, s), !s.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, s);
      n !== void 0 && jn(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, s, i) {
    const { get: n, set: o } = qn(this.prototype, e) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get() {
      return n == null ? void 0 : n.call(this);
    }, set(a) {
      const r = n == null ? void 0 : n.call(this);
      o.call(this, a), this.requestUpdate(e, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Y("elementProperties"))) return;
    const e = zn(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Y("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Y("properties"))) {
      const s = this.properties, i = [...Bn(s), ...Hn(s)];
      for (const n of i) this.createProperty(n, s[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [i, n] of s) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const n = this._$Eu(s, i);
      n !== void 0 && this._$Eh.set(n, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) s.unshift(St(n));
    } else e !== void 0 && s.push(St(e));
    return s;
  }
  static _$Eu(e, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((s) => s(this));
  }
  addController(e) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var s;
    (s = this._$EO) == null || s.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Vn(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostDisconnected) == null ? void 0 : i.call(s);
    });
  }
  attributeChangedCallback(e, s, i) {
    this._$AK(e, i);
  }
  _$EC(e, s) {
    var o;
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const a = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : Be).toAttribute(s, i.type);
      this._$Em = e, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var o;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), r = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : Be;
      this._$Em = n, this[n] = r.fromAttribute(s, a.type), this._$Em = null;
    }
  }
  requestUpdate(e, s, i) {
    if (e !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(e)), !(i.hasChanged ?? as)(this[e], s)) return;
      this.P(e, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, s, i) {
    this._$AL.has(e) || this._$AL.set(e, s), i.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (i = this._$EO) == null || i.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(s)) : this._$EU();
    } catch (n) {
      throw e = !1, this._$EU(), n;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var s;
    (s = this._$EO) == null || s.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((s) => this._$EC(s, this[s]))), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[Y("elementProperties")] = /* @__PURE__ */ new Map(), z[Y("finalized")] = /* @__PURE__ */ new Map(), Re == null || Re({ ReactiveElement: z }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.0.4");
var Yn = Object.getOwnPropertyDescriptor, Kn = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Yn(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = a(n) || n);
  return n;
};
let be = class extends ce(B) {
  constructor() {
    super(), this._workspaceContext = new qe(this);
  }
  render() {
    return c`
			<umb-workspace-editor headline="Content Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
be = Kn([
  Rn("content-audit-workspace-root")
], be);
const Fn = be, Xn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return be;
  },
  default: Fn
}, Symbol.toStringTag, { value: "Module" })), N = "Umb.Menu.ContentAudit", Ie = "Umb.Menu.ContentMetadata", Ze = "Umb.Collection.ContentAudit.Issues", Jn = "Umb.CollectionView.ContentAudit.Issues.Table", ls = "Umb.Repository.ContentAuditIssuesCollection";
var le;
class Qn {
  constructor(e) {
    p(this, le);
    m(this, le, e);
  }
  async getCollection(e) {
    const { data: s, error: i } = await W(l(this, le), G.getAllIssues(e));
    if (i)
      return { error: i };
    if (!s)
      return { data: { items: [], total: 0 } };
    const { items: n, total: o } = s;
    return { data: { items: n, total: o } };
  }
}
le = new WeakMap();
var re;
class Ut extends an {
  constructor(s) {
    super(s);
    p(this, re);
    m(this, re, new Qn(s));
  }
  async requestCollection(s) {
    return l(this, re).getCollection(s);
  }
}
re = new WeakMap();
const Zn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: Ut,
  default: Ut
}, Symbol.toStringTag, { value: "Module" }));
var ei = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, rs = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? ti(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && ei(e, s, n), n;
};
let fe = class extends B {
  render() {
    return this.value ? c`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : Xt;
  }
};
fe.styles = [
  ln,
  b`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
rs([
  H({ attribute: !1 })
], fe.prototype, "value", 2);
fe = rs([
  _("content-audit-issues-table-name-column-layout")
], fe);
var si = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, cs = (t) => {
  throw TypeError(t);
}, de = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? ni(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && si(e, s, n), n;
}, et = (t, e, s) => e.has(t) || cs("Cannot " + s), Lt = (t, e, s) => (et(t, e, "read from private field"), e.get(t)), kt = (t, e, s) => e.has(t) ? cs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), ii = (t, e, s, i) => (et(t, e, "write to private field"), e.set(t, s), s), He = (t, e, s) => (et(t, e, "access private method"), s), F, K, us, tt;
let A = class extends L {
  constructor() {
    super(), kt(this, K), this.data = [], this._tableConfig = {
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
    ], this._tableItems = [], kt(this, F), this.consumeContext(k, (t) => {
      ii(this, F, t), He(this, K, us).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && He(this, K, tt).call(this, this.data);
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
K = /* @__PURE__ */ new WeakSet();
us = function() {
  Lt(this, F) && this.observe(Lt(this, F).items, (t) => He(this, K, tt).call(this, t), "umbCollectionItemsObserver");
};
tt = function(t) {
  this._tableItems = t.map((e) => ({
    id: e.unique,
    entityType: "issue-type",
    icon: "icon-alert",
    data: [
      {
        columnAlias: "name",
        value: {
          unique: e.unique,
          name: e.name,
          category: e.category,
          description: e.description
        }
      },
      {
        columnAlias: "type",
        value: c`<content-audit-issue-type-label .type=${e.type}></content-audit-issue-type-label`
      },
      {
        columnAlias: "priority",
        value: c`<content-audit-priority-type-label .type=${e.priority}></content-audit-priority-type-label>`
      },
      {
        columnAlias: "numberOfUrls",
        value: e.numberOfUrls
      },
      {
        columnAlias: "percentOfTotal",
        value: `${e.percentOfTotal.toFixed(0)}%`
      }
    ]
  }));
};
A.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
de([
  H({ type: Array, attribute: !1 })
], A.prototype, "data", 2);
de([
  u()
], A.prototype, "_tableConfig", 2);
de([
  u()
], A.prototype, "_tableColumns", 2);
de([
  u()
], A.prototype, "_tableItems", 2);
A = de([
  _("content-audit-issues-table-collection-view")
], A);
const oi = A, ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return A;
  },
  default: oi
}, Symbol.toStringTag, { value: "Module" })), ds = "all-pages-root", li = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: ds,
    menus: [N]
  }
}, ri = [li], Nt = "Umb.Workspace.ContentAudit.AllPagesRoot", D = "Umb.Workspace.ContentAudit.AllPages", ci = [
  {
    type: "workspace",
    kind: "routable",
    alias: D,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-D7BNuDHd.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-BEiEgUzL.js"),
    weight: 100,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "info"
    },
    conditions: [
      {
        alias: R,
        match: D
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Links",
    name: "All Pages Workspace Links View",
    js: () => import("./all-pages-links-workspace-view.element-CAmDpPGN.js"),
    weight: 90,
    meta: {
      label: "Links",
      pathname: "links",
      icon: "link"
    },
    conditions: [
      {
        alias: R,
        match: D
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Images",
    name: "All Pages Workspace Images View",
    js: () => import("./all-pages-images-workspace-view.element-X9OdLuA5.js"),
    weight: 80,
    meta: {
      label: "Images",
      pathname: "images",
      icon: "picture"
    },
    conditions: [
      {
        alias: R,
        match: D
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Resources",
    name: "All Pages Workspace Resources View",
    js: () => import("./all-pages-resources-workspace-view.element-DiJ1n8C5.js"),
    weight: 70,
    meta: {
      label: "Resources",
      pathname: "resources",
      icon: "icon-script"
    },
    conditions: [
      {
        alias: R,
        match: D
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Issues",
    name: "All Pages Workspace Issues View",
    js: () => import("./all-pages-issues-workspace-view.element-DcTcuHwq.js"),
    weight: 60,
    meta: {
      label: "Issues",
      pathname: "issues",
      icon: "alert"
    },
    conditions: [
      {
        alias: R,
        match: D
      }
    ]
  }
], st = "Umb.Collection.ContentAudit.AllPages", ui = "Umb.CollectionView.ContentAudit.AllPages.Table", ps = "Umb.Repository.ContentAuditAllPagesCollection";
var di = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, ms = (t) => {
  throw TypeError(t);
}, Ee = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? pi(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && di(e, s, n), n;
}, nt = (t, e, s) => e.has(t) || ms("Cannot " + s), Dt = (t, e, s) => (nt(t, e, "read from private field"), e.get(t)), Rt = (t, e, s) => e.has(t) ? ms("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), mi = (t, e, s, i) => (nt(t, e, "write to private field"), e.set(t, s), s), hs = (t, e, s) => (nt(t, e, "access private method"), s), X, Ae, _s, Cs;
let O = class extends L {
  constructor() {
    super(), Rt(this, Ae), this._tableConfig = {
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
    ], this._tableItems = [], Rt(this, X), this.consumeContext(k, (t) => {
      mi(this, X, t), hs(this, Ae, _s).call(this);
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
X = /* @__PURE__ */ new WeakMap();
Ae = /* @__PURE__ */ new WeakSet();
_s = function() {
  Dt(this, X) && this.observe(Dt(this, X).items, (t) => hs(this, Ae, Cs).call(this, t), "umbCollectionItemsObserver");
};
Cs = function(t) {
  this._tableItems = t.map((e) => {
    var s, i, n;
    return {
      id: e == null ? void 0 : e.unique,
      entityType: e == null ? void 0 : e.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${(s = e.pageData) == null ? void 0 : s.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (i = e.technicalSeoData) == null ? void 0 : i.contentType
        },
        {
          columnAlias: "statusCode",
          value: c`<content-audit-status-code-label .statusCode=${(n = e.pageData) == null ? void 0 : n.statusCode}></content-audit-status-code-label>`
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
Ee([
  u()
], O.prototype, "_tableConfig", 2);
Ee([
  u()
], O.prototype, "_tableColumns", 2);
Ee([
  u()
], O.prototype, "_tableItems", 2);
O = Ee([
  _("content-audit-all-pages-table-collection-view")
], O);
const hi = O, _i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return O;
  },
  default: hi
}, Symbol.toStringTag, { value: "Module" })), Ci = [
  {
    type: "workspace",
    kind: "default",
    alias: Nt,
    name: "All Pages Root Workspace",
    meta: {
      entityType: ds,
      headline: "All Pages"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.AllPages.Collection",
    name: "Content Audit All Pages Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: st
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Nt
      }
    ]
  }
], bi = [...ci, ...Ci], fi = [
  {
    type: "repository",
    alias: ps,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-qAGjNqTE.js")
  }
], Ai = [
  {
    type: "collectionView",
    alias: ui,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => _i),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: st
      }
    ]
  }
], yi = [
  {
    type: "collection",
    kind: "default",
    alias: st,
    name: "All Pages Collection",
    element: () => import("./all-pages.element-DMHaFpCF.js"),
    meta: {
      repositoryAlias: ps
    }
  },
  ...fi,
  ...Ai
], Ti = "Umb.Repository.ContentAudit.AllPages.Detail", gi = "Umb.Store.ContentAudit.AllPages.Detail", Ii = [
  {
    type: "repository",
    alias: Ti,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository-DxWv91Ds.js")
  },
  {
    type: "store",
    alias: gi,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], Ei = [...Ii], Oi = [
  ...bi,
  ...ri,
  ...yi,
  ...Ei
], bs = "issues-root", vi = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: bs,
    menus: [N]
  }
}, wi = [vi], Wt = "Umb.Workspace.ContentAudit.IssuesRoot", Mt = "Umb.Workspace.ContentAudit.Issues", Si = [
  {
    type: "workspace",
    kind: "routable",
    alias: Mt,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-YTsd8z0T.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-BM-tqTKs.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: R,
        match: Mt
      }
    ]
  }
], $i = [
  {
    type: "workspace",
    kind: "default",
    alias: Wt,
    name: "Issues Root Workspace",
    meta: {
      entityType: bs,
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
      collectionAlias: Ze
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Wt
      }
    ]
  }
], Pi = [...Si, ...$i], Ui = [
  {
    type: "repository",
    alias: ls,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => Zn)
  }
], Li = [
  {
    type: "collectionView",
    alias: Jn,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => ai),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: Ze
      }
    ]
  }
], ki = [
  {
    type: "collection",
    kind: "default",
    alias: Ze,
    name: "Issues Collection",
    element: () => import("./issues.element-Cl7lgtgI.js"),
    meta: {
      repositoryAlias: ls
    }
  },
  ...Ui,
  ...Li
], Ni = "Umb.Repository.ContentAudit.Issues.Detail", Di = "Umb.Store.ContentAudit.Issues.Detail", Ri = [
  {
    type: "repository",
    alias: Ni,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-CX9rTMcK.js")
  },
  {
    type: "store",
    alias: Di,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], Wi = [...Ri], Mi = [
  ...Pi,
  ...wi,
  ...ki,
  ...Wi
], fs = "status-codes-root", Vi = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: fs,
    menus: [N]
  }
}, xi = [Vi], it = "Umb.Collection.ContentAudit.StatusCodes", ji = "Umb.CollectionView.ContentAudit.StatusCodes.Table", As = "Umb.Repository.ContentAuditStatusCodesCollection";
var qi = Object.defineProperty, Bi = Object.getOwnPropertyDescriptor, ys = (t) => {
  throw TypeError(t);
}, Oe = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Bi(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && qi(e, s, n), n;
}, ot = (t, e, s) => e.has(t) || ys("Cannot " + s), ze = (t, e, s) => (ot(t, e, "read from private field"), e.get(t)), We = (t, e, s) => e.has(t) ? ys("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), Ts = (t, e, s, i) => (ot(t, e, "write to private field"), e.set(t, s), s), at = (t, e, s) => (ot(t, e, "access private method"), s), J, ve, Q, gs, Is, Es;
let v = class extends L {
  constructor() {
    super(), We(this, Q), this._tableConfig = {
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
    ], this._tableItems = [], We(this, J), We(this, ve), this.consumeContext(k, (t) => {
      Ts(this, J, t);
    }), at(this, Q, gs).call(this);
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
ve = /* @__PURE__ */ new WeakMap();
Q = /* @__PURE__ */ new WeakSet();
gs = function() {
  new Xe(this, Ke).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ts(this, ve, t), at(this, Q, Is).call(this);
  });
};
Is = function() {
  ze(this, J) && this.observe(ze(this, J).items, (t) => at(this, Q, Es).call(this, t), "umbCollectionItemsObserver");
};
Es = function(t) {
  const e = ze(this, ve);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((s) => {
    var n, o, a;
    const i = e({ entityType: s.entityType }) + Fe.generateLocal({ unique: s.unique });
    return {
      id: s == null ? void 0 : s.unique,
      entityType: s == null ? void 0 : s.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${i}>${(n = s.pageData) == null ? void 0 : n.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = s.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "statusCode",
          value: c`<content-audit-status-code-label .statusCode=${(a = s.pageData) == null ? void 0 : a.statusCode}></content-audit-status-code-label>`
        }
      ]
    };
  });
};
v.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Oe([
  u()
], v.prototype, "_tableConfig", 2);
Oe([
  u()
], v.prototype, "_tableColumns", 2);
Oe([
  u()
], v.prototype, "_tableItems", 2);
v = Oe([
  _("content-audit-status-codes-table-collection-view")
], v);
const Hi = v, zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return v;
  },
  default: Hi
}, Symbol.toStringTag, { value: "Module" })), Vt = "Umb.Workspace.ContentAudit.StatusCodes", Gi = [
  {
    type: "workspace",
    kind: "default",
    alias: Vt,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: fs,
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
      collectionAlias: it
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Vt
      }
    ]
  }
], Yi = [
  {
    type: "repository",
    alias: As,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-gTd2hR1d.js")
  }
], Ki = [
  {
    type: "collectionView",
    alias: ji,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => zi),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: it
      }
    ]
  }
], Fi = [
  {
    type: "collection",
    kind: "default",
    alias: it,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-DMTv6l4O.js"),
    meta: {
      repositoryAlias: As
    }
  },
  ...Yi,
  ...Ki
], Xi = [
  ...Gi,
  ...xi,
  ...Fi
], Os = "orphaned-pages-root", Ji = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: Os,
    menus: [Ie]
  }
}, Qi = [Ji], lt = "Umb.Collection.ContentAudit.OrphanedPages", Zi = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", vs = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var eo = Object.defineProperty, to = Object.getOwnPropertyDescriptor, ws = (t) => {
  throw TypeError(t);
}, we = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? to(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && eo(e, s, n), n;
}, rt = (t, e, s) => e.has(t) || ws("Cannot " + s), Ge = (t, e, s) => (rt(t, e, "read from private field"), e.get(t)), Me = (t, e, s) => e.has(t) ? ws("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), Ss = (t, e, s, i) => (rt(t, e, "write to private field"), e.set(t, s), s), ct = (t, e, s) => (rt(t, e, "access private method"), s), Z, Se, ee, $s, Ps, Us;
let w = class extends L {
  constructor() {
    super(), Me(this, ee), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], Me(this, Z), Me(this, Se), this.consumeContext(k, (t) => {
      Ss(this, Z, t);
    }), ct(this, ee, $s).call(this);
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
Se = /* @__PURE__ */ new WeakMap();
ee = /* @__PURE__ */ new WeakSet();
$s = function() {
  new Xe(this, Ke).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ss(this, Se, t), ct(this, ee, Ps).call(this);
  });
};
Ps = function() {
  Ge(this, Z) && this.observe(Ge(this, Z).items, (t) => ct(this, ee, Us).call(this, t), "umbCollectionItemsObserver");
};
Us = function(t) {
  const e = Ge(this, Se);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((s) => {
    const i = e({ entityType: "document" }) + Fe.generateLocal({ unique: s.unique });
    return {
      id: s.unique,
      entityType: s.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${i}>${s.url}</a>`
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
we([
  u()
], w.prototype, "_tableConfig", 2);
we([
  u()
], w.prototype, "_tableColumns", 2);
we([
  u()
], w.prototype, "_tableItems", 2);
w = we([
  _("content-audit-orphaned-pages-table-collection-view")
], w);
const so = w, no = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return w;
  },
  default: so
}, Symbol.toStringTag, { value: "Module" })), xt = "Umb.Workspace.ContentAudit.OrphanedPages", io = [
  {
    type: "workspace",
    kind: "default",
    alias: xt,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: Os,
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
      collectionAlias: lt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: xt
      }
    ]
  }
], oo = [
  {
    type: "repository",
    alias: vs,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-D32E1_J0.js")
  }
], ao = [
  {
    type: "collectionView",
    alias: Zi,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => no),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: lt
      }
    ]
  }
], lo = [
  {
    type: "collection",
    kind: "default",
    alias: lt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-DoefYUIA.js"),
    meta: {
      repositoryAlias: vs
    }
  },
  ...oo,
  ...ao
], ro = [
  ...io,
  ...Qi,
  ...lo
], Ls = "images-alt-text-root", co = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: Ls,
    menus: [Ie]
  }
}, uo = [co], ut = "Umb.Collection.ContentAudit.ImagesAltText", po = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", ks = "Umb.Repository.ContentAuditImagesAltTextCollection";
var mo = Object.defineProperty, ho = Object.getOwnPropertyDescriptor, Ns = (t) => {
  throw TypeError(t);
}, $e = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? ho(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && mo(e, s, n), n;
}, dt = (t, e, s) => e.has(t) || Ns("Cannot " + s), Ye = (t, e, s) => (dt(t, e, "read from private field"), e.get(t)), Ve = (t, e, s) => e.has(t) ? Ns("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), Ds = (t, e, s, i) => (dt(t, e, "write to private field"), e.set(t, s), s), pt = (t, e, s) => (dt(t, e, "access private method"), s), te, Pe, se, Rs, Ws, Ms;
let S = class extends L {
  constructor() {
    super(), Ve(this, se), this._tableConfig = {
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
    ], this._tableItems = [], Ve(this, te), Ve(this, Pe), this.consumeContext(k, (t) => {
      Ds(this, te, t);
    }), pt(this, se, Rs).call(this);
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
te = /* @__PURE__ */ new WeakMap();
Pe = /* @__PURE__ */ new WeakMap();
se = /* @__PURE__ */ new WeakSet();
Rs = function() {
  new Xe(this, Ke).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ds(this, Pe, t), pt(this, se, Ws).call(this);
  });
};
Ws = function() {
  Ye(this, te) && this.observe(Ye(this, te).items, (t) => pt(this, se, Ms).call(this, t), "umbCollectionItemsObserver");
};
Ms = function(t) {
  const e = Ye(this, Pe);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((s) => {
    const i = e({ entityType: "document" }) + Fe.generateLocal({ unique: s.unique });
    return {
      id: s.unique,
      entityType: s.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: s.url
        },
        {
          columnAlias: "foundPage",
          value: c`<a href=${i}>${s.foundPage}</a>`
        },
        {
          columnAlias: "altText",
          value: s.altText
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
$e([
  u()
], S.prototype, "_tableConfig", 2);
$e([
  u()
], S.prototype, "_tableColumns", 2);
$e([
  u()
], S.prototype, "_tableItems", 2);
S = $e([
  _("content-audit-images-alt-text-table-collection-view")
], S);
const _o = S, Co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return S;
  },
  default: _o
}, Symbol.toStringTag, { value: "Module" })), jt = "Umb.Workspace.ContentAudit.ImagesAltText", bo = [
  {
    type: "workspace",
    kind: "default",
    alias: jt,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: Ls,
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
      collectionAlias: ut
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: jt
      }
    ]
  }
], fo = [
  {
    type: "repository",
    alias: ks,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-Dt4j4xzT.js")
  }
], Ao = [
  {
    type: "collectionView",
    alias: po,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Co),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: ut
      }
    ]
  }
], yo = [
  {
    type: "collection",
    kind: "default",
    alias: ut,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DzMGILfL.js"),
    meta: {
      repositoryAlias: ks
    }
  },
  ...fo,
  ...Ao
], To = [
  ...bo,
  ...uo,
  ...yo
], Vs = "outbound-links-root", go = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: Vs,
    menus: [N]
  }
}, Io = [go], mt = "Umb.Collection.ContentAudit.OutboundLinks", Eo = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", xs = "Umb.Repository.ContentAuditOutboundLinksCollection";
var Oo = Object.defineProperty, vo = Object.getOwnPropertyDescriptor, js = (t) => {
  throw TypeError(t);
}, Ue = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? vo(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && Oo(e, s, n), n;
}, ht = (t, e, s) => e.has(t) || js("Cannot " + s), qt = (t, e, s) => (ht(t, e, "read from private field"), e.get(t)), Bt = (t, e, s) => e.has(t) ? js("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), wo = (t, e, s, i) => (ht(t, e, "write to private field"), e.set(t, s), s), qs = (t, e, s) => (ht(t, e, "access private method"), s), ne, ye, Bs, Hs;
let $ = class extends L {
  constructor() {
    super(), Bt(this, ye), this._tableConfig = {
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
    ], this._tableItems = [], Bt(this, ne), this.consumeContext(k, (t) => {
      wo(this, ne, t), qs(this, ye, Bs).call(this);
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
ne = /* @__PURE__ */ new WeakMap();
ye = /* @__PURE__ */ new WeakSet();
Bs = function() {
  qt(this, ne) && this.observe(qt(this, ne).items, (t) => qs(this, ye, Hs).call(this, t), "umbCollectionItemsObserver");
};
Hs = function(t) {
  this._tableItems = t.map((e) => {
    var s;
    return {
      id: e.unique,
      data: [
        {
          columnAlias: "url",
          value: c`<a href="${e.url}" target="_blank">${e.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: c`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "contentType",
          value: e.contentType
        },
        {
          columnAlias: "outlinks",
          value: (s = e.links) == null ? void 0 : s.length
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
Ue([
  u()
], $.prototype, "_tableConfig", 2);
Ue([
  u()
], $.prototype, "_tableColumns", 2);
Ue([
  u()
], $.prototype, "_tableItems", 2);
$ = Ue([
  _("content-audit-outbound-links-table-collection-view")
], $);
const So = $, $o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return $;
  },
  default: So
}, Symbol.toStringTag, { value: "Module" })), Ht = "Umb.Workspace.ContentAudit.OutboundLinks", Po = [
  {
    type: "workspace",
    kind: "default",
    alias: Ht,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: Vs,
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
      collectionAlias: mt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ht
      }
    ]
  }
], Uo = [
  {
    type: "repository",
    alias: xs,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-CQQNsyT9.js")
  }
], Lo = [
  {
    type: "collectionView",
    alias: Eo,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => $o),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: mt
      }
    ]
  }
], ko = [
  {
    type: "collection",
    kind: "default",
    alias: mt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-DJu1PE06.js"),
    meta: {
      repositoryAlias: xs
    }
  },
  ...Uo,
  ...Lo
], No = [
  ...Po,
  ...Io,
  ...ko
], zs = "inbound-links-root", Do = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: zs,
    menus: [N]
  }
}, Ro = [Do], _t = "Umb.Collection.ContentAudit.InboundLinks", Wo = "Umb.CollectionView.ContentAudit.InboundLinks.Table", Gs = "Umb.Repository.ContentAuditInboundLinksCollection";
var Mo = Object.defineProperty, Vo = Object.getOwnPropertyDescriptor, Ys = (t) => {
  throw TypeError(t);
}, Le = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Vo(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && Mo(e, s, n), n;
}, Ct = (t, e, s) => e.has(t) || Ys("Cannot " + s), zt = (t, e, s) => (Ct(t, e, "read from private field"), e.get(t)), Gt = (t, e, s) => e.has(t) ? Ys("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), xo = (t, e, s, i) => (Ct(t, e, "write to private field"), e.set(t, s), s), Ks = (t, e, s) => (Ct(t, e, "access private method"), s), ie, Te, Fs, Xs;
let P = class extends L {
  constructor() {
    super(), Gt(this, Te), this._tableConfig = {
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
    ], this._tableItems = [], Gt(this, ie), this.consumeContext(k, (t) => {
      xo(this, ie, t), Ks(this, Te, Fs).call(this);
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
ie = /* @__PURE__ */ new WeakMap();
Te = /* @__PURE__ */ new WeakSet();
Fs = function() {
  zt(this, ie) && this.observe(zt(this, ie).items, (t) => Ks(this, Te, Xs).call(this, t), "umbCollectionItemsObserver");
};
Xs = function(t) {
  this._tableItems = t.map((e) => {
    var s;
    return {
      id: e.unique,
      data: [
        {
          columnAlias: "url",
          value: c`<a href="${e.url}" target="_blank">${e.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: c`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "contentType",
          value: e.contentType
        },
        {
          columnAlias: "inlinks",
          value: (s = e.links) == null ? void 0 : s.length
        }
      ]
    };
  });
};
P.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Le([
  u()
], P.prototype, "_tableConfig", 2);
Le([
  u()
], P.prototype, "_tableColumns", 2);
Le([
  u()
], P.prototype, "_tableItems", 2);
P = Le([
  _("content-audit-inbound-links-table-collection-view")
], P);
const jo = P, qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return P;
  },
  default: jo
}, Symbol.toStringTag, { value: "Module" })), Yt = "Umb.Workspace.ContentAudit.InboundLinks", Bo = [
  {
    type: "workspace",
    kind: "default",
    alias: Yt,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: zs,
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
      collectionAlias: _t
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Yt
      }
    ]
  }
], Ho = [
  {
    type: "repository",
    alias: Gs,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-Dv9PcDAm.js")
  }
], zo = [
  {
    type: "collectionView",
    alias: Wo,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => qo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: _t
      }
    ]
  }
], Go = [
  {
    type: "collection",
    kind: "default",
    alias: _t,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-BgFbFelw.js"),
    meta: {
      repositoryAlias: Gs
    }
  },
  ...Ho,
  ...zo
], Yo = [
  ...Bo,
  ...Ro,
  ...Go
], Js = "metadata-root", Ko = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: Js,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, Fo = [Ko], bt = "Umb.Collection.ContentAudit.Metadata", Xo = "Umb.CollectionView.ContentAudit.Metadata.Table", Kt = "Umb.Workspace.ContentAudit.Metadata", Jo = [
  {
    type: "workspace",
    kind: "default",
    alias: Kt,
    name: "Metadata Root Workspace",
    meta: {
      entityType: Js,
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
      collectionAlias: bt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Kt
      }
    ]
  }
], Qs = "Umb.Repository.ContentAuditMetadataCollection", Qo = [
  {
    type: "repository",
    alias: Qs,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-BTi7MU1v.js")
  }
], Zo = [
  {
    type: "collectionView",
    alias: Xo,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element-Chej_Gw1.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: bt
      }
    ]
  }
], ea = [
  {
    type: "collection",
    kind: "default",
    alias: bt,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: Qs
    }
  },
  ...Qo,
  ...Zo
], ta = [
  ...Jo,
  ...Fo,
  ...ea
], sa = [], ft = "Umb.Collection.ContentAudit.DuplicateContent", na = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", Zs = "Umb.Repository.ContentAuditDuplicateContentCollection";
var ia = Object.defineProperty, oa = Object.getOwnPropertyDescriptor, ke = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? oa(e, s) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (n = (i ? a(e, s, n) : a(n)) || n);
  return i && n && ia(e, s, n), n;
};
let U = class extends L {
  //#collectionContext?: UmbDefaultCollectionContext<InternalPageGroupDto>;
  //#routeBuilder?: UmbModalRouteBuilder;
  constructor() {
    super(), this._tableConfig = {
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
    ], this._tableItems = [];
  }
  //#registerModalRoute() {
  //    new UmbModalRouteRegistrationController(this, UMB_WORKSPACE_MODAL)
  //        .addAdditionalPath(':entityType')
  //        .onSetup((params) => {
  //            return { data: { entityType: params.entityType, preset: {} } };
  //        })
  //        .observeRouteBuilder((routeBuilder) => {
  //            //this.#routeBuilder = routeBuilder;
  //            //this.#observeCollectionItems();
  //        });
  //}
  //#observeCollectionItems() {
  //    if (!this.#collectionContext) return;
  //    this.observe(this.#collectionContext.items, (items) => this.#createTableItems(items), 'umbCollectionItemsObserver');
  //}
  //#createTableItems(pages: InternalPageGroupDto[]) {
  //    const routeBuilder = this.#routeBuilder;
  //    if (!routeBuilder) throw new Error('Route builder not ready');
  //    this._tableItems = pages.map((page) => {
  //        const modalEditPath =
  //            routeBuilder({ entityType: 'document' }) +
  //            UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN.generateLocal({ unique: page.unique });
  //        return {
  //            id: page.unique,
  //            entityType: page.entityType,
  //            icon: 'icon-alert',
  //            data: [
  //                {
  //                    columnAlias: 'url',
  //                    value: html`<a href=${modalEditPath}>${page.url}</a>`
  //                },
  //                {
  //                    columnAlias: 'duplicatePages',
  //                    value: page.internalPages?.length
  //                }
  //            ]
  //        }
  //    });
  //}
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
U.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ke([
  u()
], U.prototype, "_tableConfig", 2);
ke([
  u()
], U.prototype, "_tableColumns", 2);
ke([
  u()
], U.prototype, "_tableItems", 2);
U = ke([
  _("content-audit-duplicate-content-table-collection-view")
], U);
const aa = U, la = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return U;
  },
  default: aa
}, Symbol.toStringTag, { value: "Module" })), ra = "duplicate-content-root", Ft = "Umb.Workspace.ContentAudit.DuplicateContent", ca = [
  {
    type: "workspace",
    kind: "default",
    alias: Ft,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: ra,
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
      collectionAlias: ft
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ft
      }
    ]
  }
], ua = [
  {
    type: "repository",
    alias: Zs,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-CNkQGurE.js")
  }
], da = [
  {
    type: "collectionView",
    alias: na,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => la),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: ft
      }
    ]
  }
], pa = [
  {
    type: "collection",
    kind: "default",
    alias: ft,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-DTbM7jcX.js"),
    meta: {
      repositoryAlias: Zs
    }
  },
  ...ua,
  ...da
], ma = [
  ...ca,
  ...sa,
  ...pa
], ge = "Umb.Section.ContentAudit", ha = {
  type: "section",
  alias: ge,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, _a = {
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
      match: ge
    }
  ]
}, Ca = [
  {
    type: "menu",
    alias: N,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: Ie,
    name: "Content Menu"
  }
], ba = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: N
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: ge
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
      menu: Ie
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: ge
      }
    ]
  }
], fa = [
  ha,
  _a,
  ...Ca,
  ...ba,
  ...Oi,
  ...Mi,
  ...Xi,
  ...ro,
  ...To,
  ...No,
  ...Yo,
  ...ta,
  ...ma
], Aa = {
  type: "workspace",
  alias: Ce,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Xn),
  meta: {
    entityType: ss
  }
}, ya = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-c8PZlwoe.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ce
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-BPjLMPU-.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ce
      }
    ]
  }
], Ta = [
  Aa,
  ...ya
], ga = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-DYB5g2Vp.js")
  }
], Ia = [
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
], Ea = {
  type: "workspaceView",
  alias: "Umbraco.Community.ContentAudit.Workspace",
  name: "ContentAudit Workspace",
  js: () => import("./contentaudit-workspace-view-Cns8y5JA.js"),
  weight: 150,
  meta: {
    label: "Audit",
    pathname: "audit",
    icon: "icon-scan"
  },
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: "Umb.Workspace.Document"
    }
  ]
}, Oa = [Ea], va = {
  type: "globalContext",
  alias: fn,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Dn)
}, Ga = async (t, e) => {
  e.registerMany([
    va,
    ...fa,
    ...Ta,
    ...ga,
    ...Ia,
    ...Oa
  ]), t.consumeContext(sn, async (s) => {
    if (!s) return;
    const i = s.getOpenApiConfiguration();
    d.BASE = i.base, d.TOKEN = i.token, d.WITH_CREDENTIALS = i.withCredentials, d.CREDENTIALS = i.credentials;
  });
};
export {
  G as A,
  is as C,
  rn as I,
  qa as U,
  D as a,
  Mt as b,
  he as c,
  _e as d,
  xe as e,
  as as f,
  je as g,
  Ba as h,
  Ha as i,
  cn as j,
  qe as k,
  be as l,
  Ce as m,
  fn as n,
  Ga as o,
  ss as p,
  N as q,
  Ie as r,
  Ze as s,
  Rn as t,
  Be as u,
  Jn as v,
  ls as w,
  Ut as x,
  Qn as y,
  A as z
};
//# sourceMappingURL=index-CyVgFIo6.js.map
