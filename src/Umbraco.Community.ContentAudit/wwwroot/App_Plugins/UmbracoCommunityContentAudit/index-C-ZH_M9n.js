var Pe = (e) => {
  throw TypeError(e);
};
var Le = (e, t, n) => t.has(e) || Pe("Cannot " + n);
var r = (e, t, n) => (Le(e, t, "read from private field"), n ? n.call(e) : t.get(e)), p = (e, t, n) => t.has(e) ? Pe("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), m = (e, t, n, i) => (Le(e, t, "write to private field"), i ? i.call(e, n) : t.set(e, n), n);
import { UMB_AUTH_CONTEXT as bs } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as ut } from "@umbraco-cms/backoffice/element-api";
import { LitElement as j, html as c, css as b, property as B, customElement as h, nothing as sn, state as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as on } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as fs } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as ys, UMB_WORKSPACE_MODAL as dt, UMB_WORKSPACE_CONDITION_ALIAS as Ts } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as D } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as xt, UmbArrayState as ke } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as As } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as L, UMB_COLLECTION_ALIAS_CONDITION as T } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as k } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as vs } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as pt } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as mt } from "@umbraco-cms/backoffice/router";
const Is = [
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
], Es = [
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
var Os = Object.defineProperty, gs = Object.getOwnPropertyDescriptor, an = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? gs(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && Os(t, n, s), s;
};
let yt = class extends ut(j) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const e = Is[this.type - 1];
      return c`
                <uui-tag color=${e.color}>
                    <uui-icon name="${e.icon}"></uui-icon>
                    ${e.label}
                </uui-tag>
            `;
    }
  }
};
yt.styles = [
  b`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
an([
  B({ attribute: !1 })
], yt.prototype, "type", 2);
yt = an([
  h("content-audit-issue-type-label")
], yt);
var ws = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, ln = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ss(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && ws(t, n, s), s;
};
let Tt = class extends ut(j) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const e = Es[this.type - 1];
      return c`
                <uui-tag color=${e.color}>
                    <uui-icon name="${e.icon}"></uui-icon>
                    ${e.label}
                </uui-tag>
            `;
    }
  }
};
Tt.styles = [
  b`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
ln([
  B({ attribute: !1 })
], Tt.prototype, "type", 2);
Tt = ln([
  h("content-audit-priority-type-label")
], Tt);
var $s = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, rn = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Us(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && $s(t, n, s), s;
};
let Gt = class extends ut(j) {
  _getColor(e) {
    return e >= 200 && e < 300 ? "positive" : e >= 300 && e < 400 ? "warning" : e >= 400 && e < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? c`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : sn;
  }
};
rn([
  B({ attribute: !1 })
], Gt.prototype, "statusCode", 2);
Gt = rn([
  h("content-audit-status-code-label")
], Gt);
var Ps = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, cn = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ls(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && Ps(t, n, s), s;
};
let Kt = class extends ut(j) {
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
cn([
  B({ attribute: !0 })
], Kt.prototype, "value", 2);
Kt = cn([
  h("content-audit-carbon-intensity-label")
], Kt);
class Ka extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class Fa extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class Xa extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const At = "Umb.Workspace.ContentAudit", ks = "Umb.Context.ContentAudit", un = "content-audit";
class Ne extends Error {
  constructor(t, n, i) {
    super(i), this.name = "ApiError", this.url = n.url, this.status = n.status, this.statusText = n.statusText, this.body = n.body, this.request = t;
  }
}
class Ns extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class Ds {
  constructor(t) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((n, i) => {
      this._resolve = n, this._reject = i;
      const s = (l) => {
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
      }), t(s, o, a);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new Ns("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class De {
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
    request: new De(),
    response: new De()
  }
}, ht = (e) => typeof e == "string", Vt = (e) => ht(e) && e !== "", se = (e) => e instanceof Blob, dn = (e) => e instanceof FormData, Rs = (e) => {
  try {
    return btoa(e);
  } catch {
    return Buffer.from(e).toString("base64");
  }
}, Ms = (e) => {
  const t = [], n = (s, o) => {
    t.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(o))}`);
  }, i = (s, o) => {
    o != null && (o instanceof Date ? n(s, o.toISOString()) : Array.isArray(o) ? o.forEach((a) => i(s, a)) : typeof o == "object" ? Object.entries(o).forEach(([a, l]) => i(`${s}[${a}]`, l)) : n(s, o));
  };
  return Object.entries(e).forEach(([s, o]) => i(s, o)), t.length ? `?${t.join("&")}` : "";
}, Ws = (e, t) => {
  const n = encodeURI, i = t.url.replace("{api-version}", e.VERSION).replace(/{(.*?)}/g, (o, a) => {
    var l;
    return (l = t.path) != null && l.hasOwnProperty(a) ? n(String(t.path[a])) : o;
  }), s = e.BASE + i;
  return t.query ? s + Ms(t.query) : s;
}, xs = (e) => {
  if (e.formData) {
    const t = new FormData(), n = (i, s) => {
      ht(s) || se(s) ? t.append(i, s) : t.append(i, JSON.stringify(s));
    };
    return Object.entries(e.formData).filter(([, i]) => i != null).forEach(([i, s]) => {
      Array.isArray(s) ? s.forEach((o) => n(i, o)) : n(i, s);
    }), t;
  }
}, bt = async (e, t) => typeof t == "function" ? t(e) : t, Vs = async (e, t) => {
  const [n, i, s, o] = await Promise.all([
    // @ts-ignore
    bt(t, e.TOKEN),
    // @ts-ignore
    bt(t, e.USERNAME),
    // @ts-ignore
    bt(t, e.PASSWORD),
    // @ts-ignore
    bt(t, e.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([, l]) => l != null).reduce((l, [A, _]) => ({
    ...l,
    [A]: String(_)
  }), {});
  if (Vt(n) && (a.Authorization = `Bearer ${n}`), Vt(i) && Vt(s)) {
    const l = Rs(`${i}:${s}`);
    a.Authorization = `Basic ${l}`;
  }
  return t.body !== void 0 && (t.mediaType ? a["Content-Type"] = t.mediaType : se(t.body) ? a["Content-Type"] = t.body.type || "application/octet-stream" : ht(t.body) ? a["Content-Type"] = "text/plain" : dn(t.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, js = (e) => {
  var t, n;
  if (e.body !== void 0)
    return (t = e.mediaType) != null && t.includes("application/json") || (n = e.mediaType) != null && n.includes("+json") ? JSON.stringify(e.body) : ht(e.body) || se(e.body) || dn(e.body) ? e.body : JSON.stringify(e.body);
}, Bs = async (e, t, n, i, s, o, a) => {
  const l = new AbortController();
  let A = {
    headers: o,
    body: i ?? s,
    method: t.method,
    signal: l.signal
  };
  e.WITH_CREDENTIALS && (A.credentials = e.CREDENTIALS);
  for (const _ of e.interceptors.request._fns)
    A = await _(A);
  return a(() => l.abort()), await fetch(n, A);
}, qs = (e, t) => {
  if (t) {
    const n = e.headers.get(t);
    if (ht(n))
      return n;
  }
}, Hs = async (e) => {
  if (e.status !== 204)
    try {
      const t = e.headers.get("Content-Type");
      if (t) {
        const n = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (t.includes("application/json") || t.includes("+json"))
          return await e.json();
        if (n.some((i) => t.includes(i)))
          return await e.blob();
        if (t.includes("multipart/form-data"))
          return await e.formData();
        if (t.includes("text/"))
          return await e.text();
      }
    } catch (t) {
      console.error(t);
    }
}, zs = (e, t) => {
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
    throw new Ne(e, t, i);
  if (!t.ok) {
    const s = t.status ?? "unknown", o = t.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Ne(
      e,
      t,
      `Generic Error: status: ${s}; status text: ${o}; body: ${a}`
    );
  }
}, C = (e, t) => new Ds(async (n, i, s) => {
  try {
    const o = Ws(e, t), a = xs(t), l = js(t), A = await Vs(e, t);
    if (!s.isCancelled) {
      let _ = await Bs(e, t, o, l, a, A, s);
      for (const Cs of e.interceptors.response._fns)
        _ = await Cs(_);
      const Se = await Hs(_), _s = qs(_, t.responseHeader);
      let $e = Se;
      t.responseTransformer && _.ok && ($e = await t.responseTransformer(Se));
      const Ue = {
        url: o,
        ok: _.ok,
        status: _.status,
        statusText: _.statusText,
        body: _s ?? $e
      };
      zs(t, Ue), n(Ue.body);
    }
  } catch (o) {
    i(o);
  }
});
class H {
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @param data.filter
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllImages(t = {}) {
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
class Ys {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getSettings() {
    return C(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/get-settings"
    });
  }
}
var v;
class Gs {
  constructor(t) {
    p(this, v);
    m(this, v, t);
  }
  async getLatestAuditOverview() {
    return await D(r(this, v), H.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await D(r(this, v), H.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await D(r(this, v), H.getAllIssues({ skip: 0, take: 5 }));
  }
  async getHealthScore() {
    return await D(r(this, v), H.getHealthScore());
  }
}
v = new WeakMap();
var at;
class Ks {
  constructor(t) {
    p(this, at);
    m(this, at, t);
  }
  async getSettings() {
    return await D(r(this, at), Ys.getSettings());
  }
}
at = new WeakMap();
var I, lt;
class Fs extends on {
  constructor(n) {
    super(n);
    p(this, I);
    p(this, lt);
    m(this, I, new Gs(this)), m(this, lt, new Ks(this));
  }
  async getLatestAuditOverview() {
    return r(this, I).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return r(this, I).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return r(this, I).getTopIssues();
  }
  async getHealthScore() {
    return r(this, I).getHealthScore();
  }
  async getSettings() {
    return r(this, lt).getSettings();
  }
}
I = new WeakMap(), lt = new WeakMap();
var f, R, M, W, x, V;
class Ft extends on {
  constructor(n) {
    super(n);
    p(this, f);
    p(this, R);
    p(this, M);
    p(this, W);
    p(this, x);
    p(this, V);
    this.workspaceAlias = At, m(this, R, new xt(void 0)), this.latestAuditOverview = r(this, R).asObservable(), m(this, M, new ke([], (i) => i.id)), this.pagesWithMissingMetadata = r(this, M).asObservable(), m(this, W, new ke([], (i) => i.name)), this.topIssues = r(this, W).asObservable(), m(this, x, new xt(void 0)), this.healthScore = r(this, x).asObservable(), m(this, V, new xt(void 0)), this.settings = r(this, V).asObservable(), this.provideContext(ys, this), this.provideContext(pn, this), m(this, f, new Fs(this));
  }
  getEntityType() {
    return un;
  }
  async getLatestAuditOverview() {
    const { data: n } = await r(this, f).getLatestAuditOverview();
    n && r(this, R).setValue(n);
  }
  async getPagesWithMissingMetadata() {
    const { data: n } = await r(this, f).getPagesWithMissingMetadata();
    n && r(this, M).setValue(n.items);
  }
  async getTopIssues() {
    const { data: n } = await r(this, f).getTopIssues();
    n && r(this, W).setValue(n.items);
  }
  async getHealthScore() {
    const { data: n } = await r(this, f).getHealthScore();
    n && r(this, x).setValue(n);
  }
  async getSettings() {
    const { data: n } = await r(this, f).getSettings();
    n && r(this, V).setValue(n);
  }
}
f = new WeakMap(), R = new WeakMap(), M = new WeakMap(), W = new WeakMap(), x = new WeakMap(), V = new WeakMap();
const pn = new fs(
  "ContentAuditContext"
), Xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: pn,
  ContentAuditContext: Ft,
  default: Ft
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Js = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis, ie = ft.ShadowRoot && (ft.ShadyCSS === void 0 || ft.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, mn = Symbol(), Re = /* @__PURE__ */ new WeakMap();
let Qs = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== mn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (ie && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = Re.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Re.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Zs = (e) => new Qs(typeof e == "string" ? e : e + "", void 0, mn), ti = (e, t) => {
  if (ie) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), s = ft.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, e.appendChild(i);
  }
}, Me = ie ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Zs(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ei, defineProperty: ni, getOwnPropertyDescriptor: si, getOwnPropertyNames: ii, getOwnPropertySymbols: oi, getPrototypeOf: ai } = Object, E = globalThis, We = E.trustedTypes, li = We ? We.emptyScript : "", jt = E.reactiveElementPolyfillSupport, z = (e, t) => e, Xt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? li : null;
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
} }, hn = (e, t) => !ei(e, t), xe = { attribute: !0, type: String, converter: Xt, reflect: !1, hasChanged: hn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class q extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = xe) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, n);
      s !== void 0 && ni(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: s, set: o } = si(this.prototype, t) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get() {
      return s == null ? void 0 : s.call(this);
    }, set(a) {
      const l = s == null ? void 0 : s.call(this);
      o.call(this, a), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? xe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = ai(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const n = this.properties, i = [...ii(n), ...oi(n)];
      for (const s of i) this.createProperty(s, n[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [i, s] of n) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const s = this._$Eu(n, i);
      s !== void 0 && this._$Eh.set(s, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) n.unshift(Me(s));
    } else t !== void 0 && n.push(Me(t));
    return n;
  }
  static _$Eu(t, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of n.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ti(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostConnected) == null ? void 0 : i.call(n);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostDisconnected) == null ? void 0 : i.call(n);
    });
  }
  attributeChangedCallback(t, n, i) {
    this._$AK(t, i);
  }
  _$EC(t, n) {
    var o;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : Xt).toAttribute(n, i.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : Xt;
      this._$Em = s, this[s] = l.fromAttribute(n, a.type), this._$Em = null;
    }
  }
  requestUpdate(t, n, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? hn)(this[t], n)) return;
      this.P(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, n, i) {
    this._$AL.has(t) || this._$AL.set(t, n), i.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, a] of s) a.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], a);
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(n)) : this._$EU();
    } catch (s) {
      throw t = !1, this._$EU(), s;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var n;
    (n = this._$EO) == null || n.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[z("elementProperties")] = /* @__PURE__ */ new Map(), q[z("finalized")] = /* @__PURE__ */ new Map(), jt == null || jt({ ReactiveElement: q }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.0.4");
var ri = Object.getOwnPropertyDescriptor, ci = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ri(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = a(s) || s);
  return s;
};
let vt = class extends ut(j) {
  constructor() {
    super(), this._workspaceContext = new Ft(this);
  }
  render() {
    return c`
			<umb-workspace-editor headline="Content Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
vt = ci([
  Js("content-audit-workspace-root")
], vt);
const ui = vt, di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return vt;
  },
  default: ui
}, Symbol.toStringTag, { value: "Module" })), N = "Umb.Menu.ContentAudit", _t = "Umb.Menu.ContentMetadata", oe = "Umb.Collection.ContentAudit.Issues", pi = "Umb.CollectionView.ContentAudit.Issues.Table", _n = "Umb.Repository.ContentAuditIssuesCollection";
var rt;
class mi {
  constructor(t) {
    p(this, rt);
    m(this, rt, t);
  }
  async getCollection(t) {
    const { data: n, error: i } = await D(r(this, rt), H.getAllIssues(t));
    if (i)
      return { error: i };
    if (!n)
      return { data: { items: [], total: 0 } };
    const { items: s, total: o } = n;
    return { data: { items: s, total: o } };
  }
}
rt = new WeakMap();
var ct;
class Ve extends As {
  constructor(n) {
    super(n);
    p(this, ct);
    m(this, ct, new mi(n));
  }
  async requestCollection(n) {
    return r(this, ct).getCollection(n);
  }
}
ct = new WeakMap();
const hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: Ve,
  default: Ve
}, Symbol.toStringTag, { value: "Module" }));
var _i = Object.defineProperty, Ci = Object.getOwnPropertyDescriptor, Cn = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ci(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && _i(t, n, s), s;
};
let It = class extends j {
  render() {
    return this.value ? c`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : sn;
  }
};
It.styles = [
  vs,
  b`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
Cn([
  B({ attribute: !1 })
], It.prototype, "value", 2);
It = Cn([
  h("content-audit-issues-table-name-column-layout")
], It);
var bi = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, bn = (e) => {
  throw TypeError(e);
}, Ct = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? fi(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && bi(t, n, s), s;
}, ae = (e, t, n) => t.has(e) || bn("Cannot " + n), je = (e, t, n) => (ae(e, t, "read from private field"), t.get(e)), Be = (e, t, n) => t.has(e) ? bn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), yi = (e, t, n, i) => (ae(e, t, "write to private field"), t.set(e, n), n), Jt = (e, t, n) => (ae(e, t, "access private method"), n), G, Y, fn, le;
let y = class extends k {
  constructor() {
    super(), Be(this, Y), this.data = [], this._tableConfig = {
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
    ], this._tableItems = [], Be(this, G), this.consumeContext(L, (e) => {
      yi(this, G, e), Jt(this, Y, fn).call(this);
    });
  }
  updated(e) {
    e.has("data") && this.data.length !== 0 && Jt(this, Y, le).call(this, this.data);
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
G = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakSet();
fn = function() {
  je(this, G) && this.observe(je(this, G).items, (e) => Jt(this, Y, le).call(this, e), "umbCollectionItemsObserver");
};
le = function(e) {
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
Ct([
  B({ type: Array, attribute: !1 })
], y.prototype, "data", 2);
Ct([
  u()
], y.prototype, "_tableConfig", 2);
Ct([
  u()
], y.prototype, "_tableColumns", 2);
Ct([
  u()
], y.prototype, "_tableItems", 2);
y = Ct([
  h("content-audit-issues-table-collection-view")
], y);
const Ti = y, Ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return y;
  },
  default: Ti
}, Symbol.toStringTag, { value: "Module" })), yn = "all-pages-root", vi = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: yn,
    menus: [N]
  }
}, Ii = [vi], re = "Umb.Collection.ContentAudit.AllPages", Ei = "Umb.CollectionView.ContentAudit.AllPages.Table", Tn = "Umb.Repository.ContentAuditAllPagesCollection";
var Oi = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, An = (e) => {
  throw TypeError(e);
}, wt = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? gi(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && Oi(t, n, s), s;
}, ce = (e, t, n) => t.has(e) || An("Cannot " + n), Qt = (e, t, n) => (ce(e, t, "read from private field"), t.get(e)), Bt = (e, t, n) => t.has(e) ? An("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), vn = (e, t, n, i) => (ce(e, t, "write to private field"), t.set(e, n), n), ue = (e, t, n) => (ce(e, t, "access private method"), n), K, St, F, In, En, On;
let O = class extends k {
  constructor() {
    super(), Bt(this, F), this._tableConfig = {
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
    ], this._tableItems = [], Bt(this, K), Bt(this, St), this.consumeContext(L, (e) => {
      vn(this, K, e);
    }), ue(this, F, In).call(this);
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
St = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakSet();
In = function() {
  new mt(this, dt).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    vn(this, St, e), ue(this, F, En).call(this);
  });
};
En = function() {
  Qt(this, K) && this.observe(Qt(this, K).items, (e) => ue(this, F, On).call(this, e), "umbCollectionItemsObserver");
};
On = function(e) {
  const t = Qt(this, St);
  if (!t) throw new Error("Route builder not ready");
  this._tableItems = e.map((n) => {
    var s, o, a, l;
    const i = t({ entityType: n.entityType }) + pt.generateLocal({ unique: (s = n.pageData) == null ? void 0 : s.nodeKey });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${i}>${(o = n.pageData) == null ? void 0 : o.url}</a>`
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
O.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
wt([
  u()
], O.prototype, "_tableConfig", 2);
wt([
  u()
], O.prototype, "_tableColumns", 2);
wt([
  u()
], O.prototype, "_tableItems", 2);
O = wt([
  h("content-audit-all-pages-table-collection-view")
], O);
const wi = O, Si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return O;
  },
  default: wi
}, Symbol.toStringTag, { value: "Module" })), qe = "Umb.Workspace.ContentAudit.AllPages", $i = [
  {
    type: "workspace",
    kind: "default",
    alias: qe,
    name: "All Pages Root Workspace",
    meta: {
      entityType: yn,
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
      collectionAlias: re
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: qe
      }
    ]
  }
], Ui = [
  {
    type: "repository",
    alias: Tn,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-CJHrGxrp.js")
  }
], Pi = [
  {
    type: "collectionView",
    alias: Ei,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => Si),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: re
      }
    ]
  }
], Li = [
  {
    type: "collection",
    kind: "default",
    alias: re,
    name: "All Pages Collection",
    element: () => import("./all-pages.element-DMHaFpCF.js"),
    meta: {
      repositoryAlias: Tn
    }
  },
  ...Ui,
  ...Pi
], ki = [
  ...$i,
  ...Ii,
  ...Li
], gn = "issues-root", Ni = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: gn,
    menus: [N]
  }
}, Di = [Ni], He = "Umb.Workspace.ContentAudit.IssuesRoot", ze = "Umb.Workspace.ContentAudit.Issues", Ri = [
  {
    type: "workspace",
    kind: "routable",
    alias: ze,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-Bd4OdUdb.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-x7CJiXm1.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: Ts,
        match: ze
      }
    ]
  }
], Mi = [
  {
    type: "workspace",
    kind: "default",
    alias: He,
    name: "Issues Root Workspace",
    meta: {
      entityType: gn,
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
      collectionAlias: oe
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: He
      }
    ]
  }
], Wi = [...Ri, ...Mi], xi = [
  {
    type: "repository",
    alias: _n,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => hi)
  }
], Vi = [
  {
    type: "collectionView",
    alias: pi,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => Ai),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: oe
      }
    ]
  }
], ji = [
  {
    type: "collection",
    kind: "default",
    alias: oe,
    name: "Issues Collection",
    element: () => import("./issues.element-Cl7lgtgI.js"),
    meta: {
      repositoryAlias: _n
    }
  },
  ...xi,
  ...Vi
], Bi = "Umb.Repository.ContentAudit.Issues.Detail", qi = "Umb.Store.ContentAudit.Issues.Detail", Hi = [
  {
    type: "repository",
    alias: Bi,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-BwIp993m.js")
  },
  {
    type: "store",
    alias: qi,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], zi = [...Hi], Yi = [
  ...Wi,
  ...Di,
  ...ji,
  ...zi
], wn = "status-codes-root", Gi = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: wn,
    menus: [N]
  }
}, Ki = [Gi], de = "Umb.Collection.ContentAudit.StatusCodes", Fi = "Umb.CollectionView.ContentAudit.StatusCodes.Table", Sn = "Umb.Repository.ContentAuditStatusCodesCollection";
var Xi = Object.defineProperty, Ji = Object.getOwnPropertyDescriptor, $n = (e) => {
  throw TypeError(e);
}, $t = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ji(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && Xi(t, n, s), s;
}, pe = (e, t, n) => t.has(e) || $n("Cannot " + n), Zt = (e, t, n) => (pe(e, t, "read from private field"), t.get(e)), qt = (e, t, n) => t.has(e) ? $n("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Un = (e, t, n, i) => (pe(e, t, "write to private field"), t.set(e, n), n), me = (e, t, n) => (pe(e, t, "access private method"), n), X, Ut, J, Pn, Ln, kn;
let g = class extends k {
  constructor() {
    super(), qt(this, J), this._tableConfig = {
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
    ], this._tableItems = [], qt(this, X), qt(this, Ut), this.consumeContext(L, (e) => {
      Un(this, X, e);
    }), me(this, J, Pn).call(this);
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
Ut = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakSet();
Pn = function() {
  new mt(this, dt).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    Un(this, Ut, e), me(this, J, Ln).call(this);
  });
};
Ln = function() {
  Zt(this, X) && this.observe(Zt(this, X).items, (e) => me(this, J, kn).call(this, e), "umbCollectionItemsObserver");
};
kn = function(e) {
  const t = Zt(this, Ut);
  if (!t) throw new Error("Route builder not ready");
  this._tableItems = e.map((n) => {
    var s, o, a, l;
    const i = t({ entityType: n.entityType }) + pt.generateLocal({ unique: (s = n.pageData) == null ? void 0 : s.nodeKey });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${i}>${(o = n.pageData) == null ? void 0 : o.url}</a>`
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
g.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
$t([
  u()
], g.prototype, "_tableConfig", 2);
$t([
  u()
], g.prototype, "_tableColumns", 2);
$t([
  u()
], g.prototype, "_tableItems", 2);
g = $t([
  h("content-audit-status-codes-table-collection-view")
], g);
const Qi = g, Zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return g;
  },
  default: Qi
}, Symbol.toStringTag, { value: "Module" })), Ye = "Umb.Workspace.ContentAudit.StatusCodes", to = [
  {
    type: "workspace",
    kind: "default",
    alias: Ye,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: wn,
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
      collectionAlias: de
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ye
      }
    ]
  }
], eo = [
  {
    type: "repository",
    alias: Sn,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-B906rrgZ.js")
  }
], no = [
  {
    type: "collectionView",
    alias: Fi,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => Zi),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: de
      }
    ]
  }
], so = [
  {
    type: "collection",
    kind: "default",
    alias: de,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-BN2nUSUs.js"),
    meta: {
      repositoryAlias: Sn
    }
  },
  ...eo,
  ...no
], io = [
  ...to,
  ...Ki,
  ...so
], Nn = "orphaned-pages-root", oo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: Nn,
    menus: [_t]
  }
}, ao = [oo], he = "Umb.Collection.ContentAudit.OrphanedPages", lo = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", Dn = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var ro = Object.defineProperty, co = Object.getOwnPropertyDescriptor, Rn = (e) => {
  throw TypeError(e);
}, Pt = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? co(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && ro(t, n, s), s;
}, _e = (e, t, n) => t.has(e) || Rn("Cannot " + n), te = (e, t, n) => (_e(e, t, "read from private field"), t.get(e)), Ht = (e, t, n) => t.has(e) ? Rn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Mn = (e, t, n, i) => (_e(e, t, "write to private field"), t.set(e, n), n), Ce = (e, t, n) => (_e(e, t, "access private method"), n), Q, Lt, Z, Wn, xn, Vn;
let w = class extends k {
  constructor() {
    super(), Ht(this, Z), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], Ht(this, Q), Ht(this, Lt), this.consumeContext(L, (e) => {
      Mn(this, Q, e);
    }), Ce(this, Z, Wn).call(this);
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
Q = /* @__PURE__ */ new WeakMap();
Lt = /* @__PURE__ */ new WeakMap();
Z = /* @__PURE__ */ new WeakSet();
Wn = function() {
  new mt(this, dt).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    Mn(this, Lt, e), Ce(this, Z, xn).call(this);
  });
};
xn = function() {
  te(this, Q) && this.observe(te(this, Q).items, (e) => Ce(this, Z, Vn).call(this, e), "umbCollectionItemsObserver");
};
Vn = function(e) {
  const t = te(this, Lt);
  if (!t) throw new Error("Route builder not ready");
  this._tableItems = e.map((n) => {
    const i = t({ entityType: "document" }) + pt.generateLocal({ unique: n.nodeKey });
    return {
      id: n.unique,
      entityType: n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${i}>${n.url}</a>`
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
Pt([
  u()
], w.prototype, "_tableConfig", 2);
Pt([
  u()
], w.prototype, "_tableColumns", 2);
Pt([
  u()
], w.prototype, "_tableItems", 2);
w = Pt([
  h("content-audit-orphaned-pages-table-collection-view")
], w);
const uo = w, po = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return w;
  },
  default: uo
}, Symbol.toStringTag, { value: "Module" })), Ge = "Umb.Workspace.ContentAudit.OrphanedPages", mo = [
  {
    type: "workspace",
    kind: "default",
    alias: Ge,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: Nn,
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
      collectionAlias: he
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ge
      }
    ]
  }
], ho = [
  {
    type: "repository",
    alias: Dn,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository--OEgiQXC.js")
  }
], _o = [
  {
    type: "collectionView",
    alias: lo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => po),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: he
      }
    ]
  }
], Co = [
  {
    type: "collection",
    kind: "default",
    alias: he,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-DoefYUIA.js"),
    meta: {
      repositoryAlias: Dn
    }
  },
  ...ho,
  ..._o
], bo = [
  ...mo,
  ...ao,
  ...Co
], jn = "images-alt-text-root", fo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: jn,
    menus: [_t]
  }
}, yo = [fo], be = "Umb.Collection.ContentAudit.ImagesAltText", To = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", Bn = "Umb.Repository.ContentAuditImagesAltTextCollection";
var Ao = Object.defineProperty, vo = Object.getOwnPropertyDescriptor, qn = (e) => {
  throw TypeError(e);
}, kt = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? vo(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && Ao(t, n, s), s;
}, fe = (e, t, n) => t.has(e) || qn("Cannot " + n), ee = (e, t, n) => (fe(e, t, "read from private field"), t.get(e)), zt = (e, t, n) => t.has(e) ? qn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Hn = (e, t, n, i) => (fe(e, t, "write to private field"), t.set(e, n), n), ye = (e, t, n) => (fe(e, t, "access private method"), n), tt, Nt, et, zn, Yn, Gn;
let S = class extends k {
  constructor() {
    super(), zt(this, et), this._tableConfig = {
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
    ], this._tableItems = [], zt(this, tt), zt(this, Nt), this.consumeContext(L, (e) => {
      Hn(this, tt, e);
    }), ye(this, et, zn).call(this);
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
Nt = /* @__PURE__ */ new WeakMap();
et = /* @__PURE__ */ new WeakSet();
zn = function() {
  new mt(this, dt).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    Hn(this, Nt, e), ye(this, et, Yn).call(this);
  });
};
Yn = function() {
  ee(this, tt) && this.observe(ee(this, tt).items, (e) => ye(this, et, Gn).call(this, e), "umbCollectionItemsObserver");
};
Gn = function(e) {
  const t = ee(this, Nt);
  if (!t) throw new Error("Route builder not ready");
  this._tableItems = e.map((n) => {
    const i = t({ entityType: "document" }) + pt.generateLocal({ unique: n.nodeKey });
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
          value: c`<a href=${i}>${n.foundPage}</a>`
        },
        {
          columnAlias: "altText",
          value: n.altText
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
kt([
  u()
], S.prototype, "_tableConfig", 2);
kt([
  u()
], S.prototype, "_tableColumns", 2);
kt([
  u()
], S.prototype, "_tableItems", 2);
S = kt([
  h("content-audit-images-alt-text-table-collection-view")
], S);
const Io = S, Eo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return S;
  },
  default: Io
}, Symbol.toStringTag, { value: "Module" })), Ke = "Umb.Workspace.ContentAudit.ImagesAltText", Oo = [
  {
    type: "workspace",
    kind: "default",
    alias: Ke,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: jn,
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
      collectionAlias: be
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ke
      }
    ]
  }
], go = [
  {
    type: "repository",
    alias: Bn,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-DlCVPejX.js")
  }
], wo = [
  {
    type: "collectionView",
    alias: To,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Eo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: be
      }
    ]
  }
], So = [
  {
    type: "collection",
    kind: "default",
    alias: be,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DzMGILfL.js"),
    meta: {
      repositoryAlias: Bn
    }
  },
  ...go,
  ...wo
], $o = [
  ...Oo,
  ...yo,
  ...So
], Kn = "outbound-links-root", Uo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: Kn,
    menus: [N]
  }
}, Po = [Uo], Te = "Umb.Collection.ContentAudit.OutboundLinks", Lo = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", Fn = "Umb.Repository.ContentAuditOutboundLinksCollection";
var ko = Object.defineProperty, No = Object.getOwnPropertyDescriptor, Xn = (e) => {
  throw TypeError(e);
}, Dt = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? No(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && ko(t, n, s), s;
}, Ae = (e, t, n) => t.has(e) || Xn("Cannot " + n), Fe = (e, t, n) => (Ae(e, t, "read from private field"), t.get(e)), Xe = (e, t, n) => t.has(e) ? Xn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Do = (e, t, n, i) => (Ae(e, t, "write to private field"), t.set(e, n), n), Jn = (e, t, n) => (Ae(e, t, "access private method"), n), nt, Et, Qn, Zn;
let $ = class extends k {
  constructor() {
    super(), Xe(this, Et), this._tableConfig = {
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
    ], this._tableItems = [], Xe(this, nt), this.consumeContext(L, (e) => {
      Do(this, nt, e), Jn(this, Et, Qn).call(this);
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
nt = /* @__PURE__ */ new WeakMap();
Et = /* @__PURE__ */ new WeakSet();
Qn = function() {
  Fe(this, nt) && this.observe(Fe(this, nt).items, (e) => Jn(this, Et, Zn).call(this, e), "umbCollectionItemsObserver");
};
Zn = function(e) {
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
$.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Dt([
  u()
], $.prototype, "_tableConfig", 2);
Dt([
  u()
], $.prototype, "_tableColumns", 2);
Dt([
  u()
], $.prototype, "_tableItems", 2);
$ = Dt([
  h("content-audit-outbound-links-table-collection-view")
], $);
const Ro = $, Mo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return $;
  },
  default: Ro
}, Symbol.toStringTag, { value: "Module" })), Je = "Umb.Workspace.ContentAudit.OutboundLinks", Wo = [
  {
    type: "workspace",
    kind: "default",
    alias: Je,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: Kn,
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
      collectionAlias: Te
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Je
      }
    ]
  }
], xo = [
  {
    type: "repository",
    alias: Fn,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-CnO_EA0r.js")
  }
], Vo = [
  {
    type: "collectionView",
    alias: Lo,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => Mo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: Te
      }
    ]
  }
], jo = [
  {
    type: "collection",
    kind: "default",
    alias: Te,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-DJu1PE06.js"),
    meta: {
      repositoryAlias: Fn
    }
  },
  ...xo,
  ...Vo
], Bo = [
  ...Wo,
  ...Po,
  ...jo
], ts = "inbound-links-root", qo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: ts,
    menus: [N]
  }
}, Ho = [qo], ve = "Umb.Collection.ContentAudit.InboundLinks", zo = "Umb.CollectionView.ContentAudit.InboundLinks.Table", es = "Umb.Repository.ContentAuditInboundLinksCollection";
var Yo = Object.defineProperty, Go = Object.getOwnPropertyDescriptor, ns = (e) => {
  throw TypeError(e);
}, Rt = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Go(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && Yo(t, n, s), s;
}, Ie = (e, t, n) => t.has(e) || ns("Cannot " + n), Qe = (e, t, n) => (Ie(e, t, "read from private field"), t.get(e)), Ze = (e, t, n) => t.has(e) ? ns("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Ko = (e, t, n, i) => (Ie(e, t, "write to private field"), t.set(e, n), n), ss = (e, t, n) => (Ie(e, t, "access private method"), n), st, Ot, is, os;
let U = class extends k {
  constructor() {
    super(), Ze(this, Ot), this._tableConfig = {
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
    ], this._tableItems = [], Ze(this, st), this.consumeContext(L, (e) => {
      Ko(this, st, e), ss(this, Ot, is).call(this);
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
st = /* @__PURE__ */ new WeakMap();
Ot = /* @__PURE__ */ new WeakSet();
is = function() {
  Qe(this, st) && this.observe(Qe(this, st).items, (e) => ss(this, Ot, os).call(this, e), "umbCollectionItemsObserver");
};
os = function(e) {
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
U.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Rt([
  u()
], U.prototype, "_tableConfig", 2);
Rt([
  u()
], U.prototype, "_tableColumns", 2);
Rt([
  u()
], U.prototype, "_tableItems", 2);
U = Rt([
  h("content-audit-inbound-links-table-collection-view")
], U);
const Fo = U, Xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return U;
  },
  default: Fo
}, Symbol.toStringTag, { value: "Module" })), tn = "Umb.Workspace.ContentAudit.InboundLinks", Jo = [
  {
    type: "workspace",
    kind: "default",
    alias: tn,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: ts,
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
      collectionAlias: ve
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: tn
      }
    ]
  }
], Qo = [
  {
    type: "repository",
    alias: es,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-bkBkCc0s.js")
  }
], Zo = [
  {
    type: "collectionView",
    alias: zo,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => Xo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: ve
      }
    ]
  }
], ta = [
  {
    type: "collection",
    kind: "default",
    alias: ve,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-BgFbFelw.js"),
    meta: {
      repositoryAlias: es
    }
  },
  ...Qo,
  ...Zo
], ea = [
  ...Jo,
  ...Ho,
  ...ta
], as = "metadata-root", na = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: as,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, sa = [na], Ee = "Umb.Collection.ContentAudit.Metadata", ia = "Umb.CollectionView.ContentAudit.Metadata.Table", en = "Umb.Workspace.ContentAudit.Metadata", oa = [
  {
    type: "workspace",
    kind: "default",
    alias: en,
    name: "Metadata Root Workspace",
    meta: {
      entityType: as,
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
      collectionAlias: Ee
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: en
      }
    ]
  }
], ls = "Umb.Repository.ContentAuditMetadataCollection", aa = [
  {
    type: "repository",
    alias: ls,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-huFOQwz6.js")
  }
], la = [
  {
    type: "collectionView",
    alias: ia,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element-BKNUE4bD.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: Ee
      }
    ]
  }
], ra = [
  {
    type: "collection",
    kind: "default",
    alias: Ee,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: ls
    }
  },
  ...aa,
  ...la
], ca = [
  ...oa,
  ...sa,
  ...ra
], rs = "duplicate-content-root", ua = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.DuplicateContent",
  name: "Duplicate Content Menu Item",
  weight: 3e3,
  meta: {
    label: "Duplicate Content",
    icon: "icon-documents",
    entityType: rs,
    menus: [_t]
  }
}, da = [ua], Oe = "Umb.Collection.ContentAudit.DuplicateContent", pa = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", cs = "Umb.Repository.ContentAuditDuplicateContentCollection";
var ma = Object.defineProperty, ha = Object.getOwnPropertyDescriptor, us = (e) => {
  throw TypeError(e);
}, Mt = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ha(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (i ? a(t, n, s) : a(s)) || s);
  return i && s && ma(t, n, s), s;
}, ge = (e, t, n) => t.has(e) || us("Cannot " + n), ne = (e, t, n) => (ge(e, t, "read from private field"), t.get(e)), Yt = (e, t, n) => t.has(e) ? us("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), ds = (e, t, n, i) => (ge(e, t, "write to private field"), t.set(e, n), n), we = (e, t, n) => (ge(e, t, "access private method"), n), it, Wt, ot, ps, ms, hs;
let P = class extends k {
  constructor() {
    super(), Yt(this, ot), this._tableConfig = {
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
    ], this._tableItems = [], Yt(this, it), Yt(this, Wt), this.consumeContext(L, (e) => {
      ds(this, it, e);
    }), we(this, ot, ps).call(this);
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
it = /* @__PURE__ */ new WeakMap();
Wt = /* @__PURE__ */ new WeakMap();
ot = /* @__PURE__ */ new WeakSet();
ps = function() {
  new mt(this, dt).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    ds(this, Wt, e), we(this, ot, ms).call(this);
  });
};
ms = function() {
  ne(this, it) && this.observe(ne(this, it).items, (e) => we(this, ot, hs).call(this, e), "umbCollectionItemsObserver");
};
hs = function(e) {
  const t = ne(this, Wt);
  if (!t) throw new Error("Route builder not ready");
  this._tableItems = e.map((n) => {
    var s;
    const i = t({ entityType: "document" }) + pt.generateLocal({ unique: n.unique });
    return {
      id: n.unique,
      entityType: n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: c`<a href=${i}>${n.url}</a>`
        },
        {
          columnAlias: "duplicatePages",
          value: (s = n.internalPages) == null ? void 0 : s.length
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
Mt([
  u()
], P.prototype, "_tableConfig", 2);
Mt([
  u()
], P.prototype, "_tableColumns", 2);
Mt([
  u()
], P.prototype, "_tableItems", 2);
P = Mt([
  h("content-audit-duplicate-content-table-collection-view")
], P);
const _a = P, Ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return P;
  },
  default: _a
}, Symbol.toStringTag, { value: "Module" })), nn = "Umb.Workspace.ContentAudit.DuplicateContent", ba = [
  {
    type: "workspace",
    kind: "default",
    alias: nn,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: rs,
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
      collectionAlias: Oe
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: nn
      }
    ]
  }
], fa = [
  {
    type: "repository",
    alias: cs,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-C9OIiaR_.js")
  }
], ya = [
  {
    type: "collectionView",
    alias: pa,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => Ca),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: Oe
      }
    ]
  }
], Ta = [
  {
    type: "collection",
    kind: "default",
    alias: Oe,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-DTbM7jcX.js"),
    meta: {
      repositoryAlias: cs
    }
  },
  ...fa,
  ...ya
], Aa = [
  ...ba,
  ...da,
  ...Ta
], gt = "Umb.Section.ContentAudit", va = {
  type: "section",
  alias: gt,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Ia = {
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
      match: gt
    }
  ]
}, Ea = [
  {
    type: "menu",
    alias: N,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: _t,
    name: "Content Menu"
  }
], Oa = [
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
        match: gt
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
      menu: _t
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: gt
      }
    ]
  }
], ga = [
  va,
  Ia,
  ...Ea,
  ...Oa,
  ...ki,
  ...Yi,
  ...io,
  ...bo,
  ...$o,
  ...Bo,
  ...ea,
  ...ca,
  ...Aa
], wa = {
  type: "workspace",
  alias: At,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => di),
  meta: {
    entityType: un
  }
}, Sa = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-DGwMQe3U.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: At
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-CJBdgxpB.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: At
      }
    ]
  }
], $a = [
  wa,
  ...Sa
], Ua = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-BRlByK2V.js")
  }
], Pa = [
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
], La = {
  type: "globalContext",
  alias: ks,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Xs)
}, Qa = async (e, t) => {
  t.registerMany([
    La,
    ...ga,
    ...$a,
    ...Ua,
    ...Pa
  ]), e.consumeContext(bs, async (n) => {
    if (!n) return;
    const i = n.getOpenApiConfiguration();
    d.BASE = i.base, d.TOKEN = i.token, d.WITH_CREDENTIALS = i.withCredentials, d.CREDENTIALS = i.credentials;
  });
};
export {
  H as A,
  pn as C,
  Is as I,
  Ka as U,
  ze as a,
  yt as b,
  Tt as c,
  Gt as d,
  Kt as e,
  hn as f,
  Fa as g,
  Xa as h,
  Es as i,
  Ft as j,
  vt as k,
  At as l,
  ks as m,
  un as n,
  Qa as o,
  N as p,
  _t as q,
  oe as r,
  pi as s,
  Js as t,
  Xt as u,
  _n as v,
  Ve as w,
  mi as x,
  y
};
//# sourceMappingURL=index-C-ZH_M9n.js.map
