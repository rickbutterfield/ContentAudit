var zt = (t) => {
  throw TypeError(t);
};
var Ht = (t, e, n) => e.has(t) || zt("Cannot " + n);
var u = (t, e, n) => (Ht(t, e, "read from private field"), n ? n.call(t) : e.get(t)), C = (t, e, n) => e.has(t) ? zt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), b = (t, e, n, i) => (Ht(t, e, "write to private field"), i ? i.call(t, n) : e.set(t, n), n);
import { UMB_AUTH_CONTEXT as zs } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as F } from "@umbraco-cms/backoffice/element-api";
import { LitElement as D, html as r, css as h, property as V, customElement as m, nothing as In, state as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as En } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as Hs } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as Fs, UMB_WORKSPACE_CONDITION_ALIAS as x, UMB_WORKSPACE_MODAL as be } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as j } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Ke, UmbArrayState as Ft } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as Ks } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as I, UMB_COLLECTION_ALIAS_CONDITION as T } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as y } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Xs } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as fe } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Te } from "@umbraco-cms/backoffice/router";
const Js = [
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
], Qs = [
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
var Zs = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, wn = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ei(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Zs(e, n, s), s;
};
let Ee = class extends F(D) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Js[this.type - 1];
      return r`
                <uui-tag color=${t == null ? void 0 : t.color}>
                    <uui-icon name="${t == null ? void 0 : t.icon}"></uui-icon>
                    ${t == null ? void 0 : t.label}
                </uui-tag>
            `;
    }
  }
};
Ee.styles = [
  h`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
wn([
  V({ attribute: !1 })
], Ee.prototype, "type", 2);
Ee = wn([
  m("content-audit-issue-type-label")
], Ee);
var ti = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, On = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ni(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && ti(e, n, s), s;
};
let we = class extends F(D) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Qs[this.type - 1];
      return r`
                <uui-tag color=${t == null ? void 0 : t.color}>
                    <uui-icon name="${t == null ? void 0 : t.icon}"></uui-icon>
                    ${t == null ? void 0 : t.label}
                </uui-tag>
            `;
    }
  }
};
we.styles = [
  h`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
On([
  V({ attribute: !1 })
], we.prototype, "type", 2);
we = On([
  m("content-audit-priority-type-label")
], we);
var si = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, gn = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ii(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && si(e, n, s), s;
};
let st = class extends F(D) {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? r`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : In;
  }
};
gn([
  V({ attribute: !1 })
], st.prototype, "statusCode", 2);
st = gn([
  m("content-audit-status-code-label")
], st);
var ai = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, Sn = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? oi(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && ai(e, n, s), s;
};
let it = class extends F(D) {
  constructor() {
    super(...arguments), this.value = "";
  }
  _getColour() {
    return this.value == "E" || this.value == "F" ? "danger" : this.value == "D" ? "warning" : "positive";
  }
  render() {
    if (this.value != null)
      return r`
                <uui-tag .color=${this._getColour()}>
                    ${this.value}
                </uui-tag>
            `;
  }
};
Sn([
  V({ attribute: !0 })
], it.prototype, "value", 2);
it = Sn([
  m("content-audit-carbon-intensity-label")
], it);
class Kt extends Error {
  constructor(e, n, i) {
    super(i), this.name = "ApiError", this.url = n.url, this.status = n.status, this.statusText = n.statusText, this.body = n.body, this.request = e;
  }
}
class li extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class ri {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((n, i) => {
      this._resolve = n, this._reject = i;
      const s = (l) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(l));
      }, a = (l) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(l));
      }, o = (l) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(l);
      };
      return Object.defineProperty(o, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(o, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(o, "isCancelled", {
        get: () => this._isCancelled
      }), e(s, a, o);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, n) {
    return this.promise.then(e, n);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new li("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class Xt {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const n = this._fns.indexOf(e);
    n !== -1 && (this._fns = [...this._fns.slice(0, n), ...this._fns.slice(n + 1)]);
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
    request: new Xt(),
    response: new Xt()
  }
}, ye = (t) => typeof t == "string", Xe = (t) => ye(t) && t !== "", ht = (t) => t instanceof Blob, $n = (t) => t instanceof FormData, ci = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, ui = (t) => {
  const e = [], n = (s, a) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(a))}`);
  }, i = (s, a) => {
    a != null && (a instanceof Date ? n(s, a.toISOString()) : Array.isArray(a) ? a.forEach((o) => i(s, o)) : typeof a == "object" ? Object.entries(a).forEach(([o, l]) => i(`${s}[${o}]`, l)) : n(s, a));
  };
  return Object.entries(t).forEach(([s, a]) => i(s, a)), e.length ? `?${e.join("&")}` : "";
}, di = (t, e) => {
  const n = encodeURI, i = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (a, o) => {
    var l;
    return (l = e.path) != null && l.hasOwnProperty(o) ? n(String(e.path[o])) : a;
  }), s = t.BASE + i;
  return e.query ? s + ui(e.query) : s;
}, mi = (t) => {
  if (t.formData) {
    const e = new FormData(), n = (i, s) => {
      ye(s) || ht(s) ? e.append(i, s) : e.append(i, JSON.stringify(s));
    };
    return Object.entries(t.formData).filter(([, i]) => i != null).forEach(([i, s]) => {
      Array.isArray(s) ? s.forEach((a) => n(i, a)) : n(i, s);
    }), e;
  }
}, ve = async (t, e) => typeof e == "function" ? e(t) : e, pi = async (t, e) => {
  const [n, i, s, a] = await Promise.all([
    // @ts-ignore
    ve(e, t.TOKEN),
    // @ts-ignore
    ve(e, t.USERNAME),
    // @ts-ignore
    ve(e, t.PASSWORD),
    // @ts-ignore
    ve(e, t.HEADERS)
  ]), o = Object.entries({
    Accept: "application/json",
    ...a,
    ...e.headers
  }).filter(([, l]) => l != null).reduce((l, [_, f]) => ({
    ...l,
    [_]: String(f)
  }), {});
  if (Xe(n) && (o.Authorization = `Bearer ${n}`), Xe(i) && Xe(s)) {
    const l = ci(`${i}:${s}`);
    o.Authorization = `Basic ${l}`;
  }
  return e.body !== void 0 && (e.mediaType ? o["Content-Type"] = e.mediaType : ht(e.body) ? o["Content-Type"] = e.body.type || "application/octet-stream" : ye(e.body) ? o["Content-Type"] = "text/plain" : $n(e.body) || (o["Content-Type"] = "application/json")), new Headers(o);
}, hi = (t) => {
  var e, n;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (n = t.mediaType) != null && n.includes("+json") ? JSON.stringify(t.body) : ye(t.body) || ht(t.body) || $n(t.body) ? t.body : JSON.stringify(t.body);
}, _i = async (t, e, n, i, s, a, o) => {
  const l = new AbortController();
  let _ = {
    headers: a,
    body: i ?? s,
    method: e.method,
    signal: l.signal
  };
  t.WITH_CREDENTIALS && (_.credentials = t.CREDENTIALS);
  for (const f of t.interceptors.request._fns)
    _ = await f(_);
  return o(() => l.abort()), await fetch(n, _);
}, Ci = (t, e) => {
  if (e) {
    const n = t.headers.get(e);
    if (ye(n))
      return n;
  }
}, bi = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const n = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (n.some((i) => e.includes(i)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, fi = (t, e) => {
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
    throw new Kt(t, e, i);
  if (!e.ok) {
    const s = e.status ?? "unknown", a = e.statusText ?? "unknown", o = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Kt(
      t,
      e,
      `Generic Error: status: ${s}; status text: ${a}; body: ${o}`
    );
  }
}, p = (t, e) => new ri(async (n, i, s) => {
  try {
    const a = di(t, e), o = mi(e), l = hi(e), _ = await pi(t, e);
    if (!s.isCancelled) {
      let f = await _i(t, e, a, l, o, _, s);
      for (const Ys of t.interceptors.response._fns)
        f = await Ys(f);
      const qt = await bi(f), Gs = Ci(f, e.responseHeader);
      let Gt = qt;
      e.responseTransformer && f.ok && (Gt = await e.responseTransformer(qt));
      const Yt = {
        url: a,
        ok: f.ok,
        status: f.status,
        statusText: f.statusText,
        body: Gs ?? Gt
      };
      fi(e, Yt), n(Yt.body);
    }
  } catch (a) {
    i(a);
  }
});
class X {
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @param data.filter
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllImages(e = {}) {
    return p(d, {
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
    return p(d, {
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
    return p(d, {
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
   * @returns unknown OK
   * @throws ApiError
   */
  static getExportData() {
    return p(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/export"
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
    return p(d, {
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
    return p(d, {
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
    return p(d, {
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
    return p(d, {
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
    return p(d, {
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
    return p(d, {
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
    return p(d, {
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
    return p(d, {
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
    return p(d, {
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
class Ti {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getSettings() {
    return p(d, {
      method: "GET",
      url: "/umbraco/content-audit/api/v1/get-settings"
    });
  }
}
var Pn = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(Pn || {}), at = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(at || {}), yi = Object.defineProperty, Ai = Object.getOwnPropertyDescriptor, Un = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ai(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && yi(e, n, s), s;
};
let Oe = class extends F(D) {
  _getColour() {
    return this.value != null ? this.value.rating == at.POOR ? "danger" : this.value.rating == at.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == Pn.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
  }
  render() {
    if (this.value != null)
      return r`
                <uui-tag .color=${this._getColour()}>
                    ${this._formatValue()}
                </uui-tag>
            `;
  }
};
Oe.styles = [
  h`
            uui-tag {
                font-size: 14px;
            }
        `
];
Un([
  V({ attribute: !1 })
], Oe.prototype, "value", 2);
Oe = Un([
  m("content-audit-metric-label")
], Oe);
class rr extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class cr extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class ur extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const ge = "Umb.Workspace.ContentAudit", vi = "Umb.Context.ContentAudit", Ln = "content-audit";
var E;
class Ii {
  constructor(e) {
    C(this, E);
    b(this, E, e);
  }
  async getLatestAuditOverview() {
    return await j(u(this, E), X.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await j(u(this, E), X.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await j(u(this, E), X.getAllIssues({ skip: 0, take: 5 }));
  }
  async getHealthScore() {
    return await j(u(this, E), X.getHealthScore());
  }
}
E = new WeakMap();
var pe;
class Ei {
  constructor(e) {
    C(this, pe);
    b(this, pe, e);
  }
  async getSettings() {
    return await j(u(this, pe), Ti.getSettings());
  }
}
pe = new WeakMap();
var w, he;
class wi extends En {
  constructor(n) {
    super(n);
    C(this, w);
    C(this, he);
    b(this, w, new Ii(this)), b(this, he, new Ei(this));
  }
  async getLatestAuditOverview() {
    return u(this, w).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return u(this, w).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return u(this, w).getTopIssues();
  }
  async getHealthScore() {
    return u(this, w).getHealthScore();
  }
  async getSettings() {
    return u(this, he).getSettings();
  }
}
w = new WeakMap(), he = new WeakMap();
var A, q, G, Y, z, H;
class ot extends En {
  constructor(n) {
    super(n);
    C(this, A);
    C(this, q);
    C(this, G);
    C(this, Y);
    C(this, z);
    C(this, H);
    this.workspaceAlias = ge, b(this, q, new Ke(void 0)), this.latestAuditOverview = u(this, q).asObservable(), b(this, G, new Ft([], (i) => i.unique)), this.pagesWithMissingMetadata = u(this, G).asObservable(), b(this, Y, new Ft([], (i) => i.name)), this.topIssues = u(this, Y).asObservable(), b(this, z, new Ke(void 0)), this.healthScore = u(this, z).asObservable(), b(this, H, new Ke(void 0)), this.settings = u(this, H).asObservable(), this.provideContext(Fs, this), this.provideContext(Nn, this), b(this, A, new wi(this));
  }
  getEntityType() {
    return Ln;
  }
  async getLatestAuditOverview() {
    const { data: n } = await u(this, A).getLatestAuditOverview();
    n && u(this, q).setValue(n);
  }
  async getPagesWithMissingMetadata() {
    const { data: n } = await u(this, A).getPagesWithMissingMetadata();
    n && u(this, G).setValue(n.items);
  }
  async getTopIssues() {
    const { data: n } = await u(this, A).getTopIssues();
    n && u(this, Y).setValue(n.items);
  }
  async getHealthScore() {
    const { data: n } = await u(this, A).getHealthScore();
    n && u(this, z).setValue(n);
  }
  async getSettings() {
    const { data: n } = await u(this, A).getSettings();
    n && u(this, H).setValue(n);
  }
}
A = new WeakMap(), q = new WeakMap(), G = new WeakMap(), Y = new WeakMap(), z = new WeakMap(), H = new WeakMap();
const Nn = new Hs(
  "ContentAuditContext"
), Oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: Nn,
  ContentAuditContext: ot,
  default: ot
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gi = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = globalThis, _t = Ie.ShadowRoot && (Ie.ShadyCSS === void 0 || Ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, kn = Symbol(), Jt = /* @__PURE__ */ new WeakMap();
let Si = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== kn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (_t && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Jt.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Jt.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const $i = (t) => new Si(typeof t == "string" ? t : t + "", void 0, kn), Pi = (t, e) => {
  if (_t) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), s = Ie.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, t.appendChild(i);
  }
}, Qt = _t ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return $i(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ui, defineProperty: Li, getOwnPropertyDescriptor: Ni, getOwnPropertyNames: ki, getOwnPropertySymbols: Ri, getPrototypeOf: Di } = Object, O = globalThis, Zt = O.trustedTypes, Vi = Zt ? Zt.emptyScript : "", Je = O.reactiveElementPolyfillSupport, J = (t, e) => t, lt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Vi : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, Rn = (t, e) => !Ui(t, e), en = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: Rn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), O.litPropertyMetadata ?? (O.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class K extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = en) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, n);
      s !== void 0 && Li(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: s, set: a } = Ni(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get: s, set(o) {
      const l = s == null ? void 0 : s.call(this);
      a == null || a.call(this, o), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? en;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties"))) return;
    const e = Di(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      const n = this.properties, i = [...ki(n), ...Ri(n)];
      for (const s of i) this.createProperty(s, n[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [i, s] of n) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const s = this._$Eu(n, i);
      s !== void 0 && this._$Eh.set(s, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) n.unshift(Qt(s));
    } else e !== void 0 && n.push(Qt(e));
    return n;
  }
  static _$Eu(e, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((n) => n(this));
  }
  addController(e) {
    var n;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((n = e.hostConnected) == null || n.call(e));
  }
  removeController(e) {
    var n;
    (n = this._$EO) == null || n.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Pi(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((n) => {
      var i;
      return (i = n.hostConnected) == null ? void 0 : i.call(n);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var i;
      return (i = n.hostDisconnected) == null ? void 0 : i.call(n);
    });
  }
  attributeChangedCallback(e, n, i) {
    this._$AK(e, i);
  }
  _$ET(e, n) {
    var a;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : lt).toAttribute(n, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var a, o;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), _ = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((a = l.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? l.converter : lt;
      this._$Em = s, this[s] = _.fromAttribute(n, l.type) ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, n, i) {
    var s;
    if (e !== void 0) {
      const a = this.constructor, o = this[e];
      if (i ?? (i = a.getPropertyOptions(e)), !((i.hasChanged ?? Rn)(o, n) || i.useDefault && i.reflect && o === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: s, wrapped: a }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? n ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
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
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [a, o] of s) {
        const { wrapped: l } = o, _ = this[a];
        l !== !0 || this._$AL.has(a) || _ === void 0 || this.C(a, void 0, o, _);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((s) => {
        var a;
        return (a = s.hostUpdate) == null ? void 0 : a.call(s);
      }), this.update(n)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var n;
    (n = this._$EO) == null || n.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
K.elementStyles = [], K.shadowRootOptions = { mode: "open" }, K[J("elementProperties")] = /* @__PURE__ */ new Map(), K[J("finalized")] = /* @__PURE__ */ new Map(), Je == null || Je({ ReactiveElement: K }), (O.reactiveElementVersions ?? (O.reactiveElementVersions = [])).push("2.1.0");
var Wi = Object.getOwnPropertyDescriptor, Mi = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Wi(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = o(s) || s);
  return s;
};
let Se = class extends F(D) {
  constructor() {
    super(), this._workspaceContext = new ot(this);
  }
  render() {
    return r`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Se = Mi([
  gi("content-audit-workspace-root")
], Se);
const xi = Se, ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Se;
  },
  default: xi
}, Symbol.toStringTag, { value: "Module" })), W = "Umb.Menu.ContentAudit", Ne = "Umb.Menu.ContentMetadata", ke = "Umb.Menu.ContentPerformance", Ct = "Umb.Menu.ContentTools", bt = "Umb.Collection.ContentAudit.Issues", Bi = "Umb.CollectionView.ContentAudit.Issues.Table", Dn = "Umb.Repository.ContentAuditIssuesCollection";
var _e;
class qi {
  constructor(e) {
    C(this, _e);
    b(this, _e, e);
  }
  async getCollection(e) {
    const { data: n, error: i } = await j(u(this, _e), X.getAllIssues(e));
    if (i)
      return { error: i };
    if (!n)
      return { data: { items: [], total: 0 } };
    const { items: s, total: a } = n;
    return { data: { items: s, total: a } };
  }
}
_e = new WeakMap();
var Ce;
class tn extends Ks {
  constructor(n) {
    super(n);
    C(this, Ce);
    b(this, Ce, new qi(n));
  }
  async requestCollection(n) {
    return u(this, Ce).getCollection(n);
  }
}
Ce = new WeakMap();
const Gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: tn,
  default: tn
}, Symbol.toStringTag, { value: "Module" }));
var Yi = Object.defineProperty, zi = Object.getOwnPropertyDescriptor, Vn = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? zi(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Yi(e, n, s), s;
};
let $e = class extends D {
  render() {
    return this.value ? r`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : In;
  }
};
$e.styles = [
  Xs,
  h`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
Vn([
  V({ attribute: !1 })
], $e.prototype, "value", 2);
$e = Vn([
  m("content-audit-issues-table-name-column-layout")
], $e);
var Hi = Object.defineProperty, Fi = Object.getOwnPropertyDescriptor, Wn = (t) => {
  throw TypeError(t);
}, Ae = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Fi(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Hi(e, n, s), s;
}, ft = (t, e, n) => e.has(t) || Wn("Cannot " + n), nn = (t, e, n) => (ft(t, e, "read from private field"), e.get(t)), sn = (t, e, n) => e.has(t) ? Wn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ki = (t, e, n, i) => (ft(t, e, "write to private field"), e.set(t, n), n), rt = (t, e, n) => (ft(t, e, "access private method"), n), Z, Q, Mn, Tt;
let v = class extends y {
  constructor() {
    super(), sn(this, Q), this.data = [], this._tableConfig = {
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
    ], this._tableItems = [], sn(this, Z), this.consumeContext(I, (t) => {
      Ki(this, Z, t), rt(this, Q, Mn).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && rt(this, Q, Tt).call(this, this.data);
  }
  render() {
    if (this._tableItems.length !== 0)
      return r`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
Z = /* @__PURE__ */ new WeakMap();
Q = /* @__PURE__ */ new WeakSet();
Mn = function() {
  nn(this, Z) && this.observe(nn(this, Z).items, (t) => rt(this, Q, Tt).call(this, t), "umbCollectionItemsObserver");
};
Tt = function(t) {
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
        value: r`<content-audit-issue-type-label .type=${e.type}></content-audit-issue-type-label`
      },
      {
        columnAlias: "priority",
        value: r`<content-audit-priority-type-label .type=${e.priority}></content-audit-priority-type-label>`
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
v.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ae([
  V({ type: Array, attribute: !1 })
], v.prototype, "data", 2);
Ae([
  c()
], v.prototype, "_tableConfig", 2);
Ae([
  c()
], v.prototype, "_tableColumns", 2);
Ae([
  c()
], v.prototype, "_tableItems", 2);
v = Ae([
  m("content-audit-issues-table-collection-view")
], v);
const Xi = v, Ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return v;
  },
  default: Xi
}, Symbol.toStringTag, { value: "Module" })), xn = "all-pages-root", Qi = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: xn,
    menus: [W]
  }
}, Zi = [Qi], an = "Umb.Workspace.ContentAudit.AllPagesRoot", M = "Umb.Workspace.ContentAudit.AllPages", ea = [
  {
    type: "workspace",
    kind: "routable",
    alias: M,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-BljJo633.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-C2XRwGJ0.js"),
    weight: 100,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "info"
    },
    conditions: [
      {
        alias: x,
        match: M
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Links",
    name: "All Pages Workspace Links View",
    js: () => import("./all-pages-links-workspace-view.element-aYeKuVbp.js"),
    weight: 90,
    meta: {
      label: "Links",
      pathname: "links",
      icon: "link"
    },
    conditions: [
      {
        alias: x,
        match: M
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Images",
    name: "All Pages Workspace Images View",
    js: () => import("./all-pages-images-workspace-view.element-mj0Dwdv2.js"),
    weight: 80,
    meta: {
      label: "Images",
      pathname: "images",
      icon: "picture"
    },
    conditions: [
      {
        alias: x,
        match: M
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Resources",
    name: "All Pages Workspace Resources View",
    js: () => import("./all-pages-resources-workspace-view.element-Co_xqqQ3.js"),
    weight: 70,
    meta: {
      label: "Resources",
      pathname: "resources",
      icon: "icon-script"
    },
    conditions: [
      {
        alias: x,
        match: M
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Issues",
    name: "All Pages Workspace Issues View",
    js: () => import("./all-pages-issues-workspace-view.element-y7Xv38uh.js"),
    weight: 60,
    meta: {
      label: "Issues",
      pathname: "issues",
      icon: "alert"
    },
    conditions: [
      {
        alias: x,
        match: M
      }
    ]
  }
], yt = "Umb.Collection.ContentAudit.AllPages", ta = "Umb.CollectionView.ContentAudit.AllPages.Table", jn = "Umb.Repository.ContentAuditAllPagesCollection";
var na = Object.defineProperty, sa = Object.getOwnPropertyDescriptor, Bn = (t) => {
  throw TypeError(t);
}, Re = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? sa(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && na(e, n, s), s;
}, At = (t, e, n) => e.has(t) || Bn("Cannot " + n), on = (t, e, n) => (At(t, e, "read from private field"), e.get(t)), ln = (t, e, n) => e.has(t) ? Bn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ia = (t, e, n, i) => (At(t, e, "write to private field"), e.set(t, n), n), qn = (t, e, n) => (At(t, e, "access private method"), n), ee, Pe, Gn, Yn;
let g = class extends y {
  constructor() {
    super(), ln(this, Pe), this._tableConfig = {
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
      },
      {
        name: "Redirected",
        alias: "redirect"
      }
    ], this._tableItems = [], ln(this, ee), this.consumeContext(I, (t) => {
      ia(this, ee, t), qn(this, Pe, Gn).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return r`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ee = /* @__PURE__ */ new WeakMap();
Pe = /* @__PURE__ */ new WeakSet();
Gn = function() {
  on(this, ee) && this.observe(on(this, ee).items, (t) => qn(this, Pe, Yn).call(this, t), "umbCollectionItemsObserver");
};
Yn = function(t) {
  this._tableItems = t.map((e) => {
    var n, i, s;
    return {
      id: e == null ? void 0 : e.unique,
      entityType: e == null ? void 0 : e.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${(n = e.pageData) == null ? void 0 : n.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (i = e.technicalSeoData) == null ? void 0 : i.contentType
        },
        {
          columnAlias: "statusCode",
          value: r`<content-audit-status-code-label .statusCode=${(s = e.pageData) == null ? void 0 : s.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "redirect",
          value: e.pageData.redirect ? "Yes" : "No"
        }
      ]
    };
  });
};
g.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Re([
  c()
], g.prototype, "_tableConfig", 2);
Re([
  c()
], g.prototype, "_tableColumns", 2);
Re([
  c()
], g.prototype, "_tableItems", 2);
g = Re([
  m("content-audit-all-pages-table-collection-view")
], g);
const aa = g, oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return g;
  },
  default: aa
}, Symbol.toStringTag, { value: "Module" })), la = [
  {
    type: "workspace",
    kind: "default",
    alias: an,
    name: "All Pages Root Workspace",
    meta: {
      entityType: xn,
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
      collectionAlias: yt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: an
      }
    ]
  }
], ra = [...ea, ...la], ca = [
  {
    type: "repository",
    alias: jn,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-B51cDeUc.js")
  }
], ua = [
  {
    type: "collectionView",
    alias: ta,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => oa),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: yt
      }
    ]
  }
], da = [
  {
    type: "collection",
    kind: "default",
    alias: yt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element-DMHaFpCF.js"),
    meta: {
      repositoryAlias: jn
    }
  },
  ...ca,
  ...ua
], ma = "Umb.Repository.ContentAudit.AllPages.Detail", pa = "Umb.Store.ContentAudit.AllPages.Detail", ha = [
  {
    type: "repository",
    alias: ma,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository-Cj5JYFkI.js")
  },
  {
    type: "store",
    alias: pa,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], _a = [...ha], Ca = [
  ...ra,
  ...Zi,
  ...da,
  ..._a
], zn = "issues-root", ba = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: zn,
    menus: [W]
  }
}, fa = [ba], rn = "Umb.Workspace.ContentAudit.IssuesRoot", cn = "Umb.Workspace.ContentAudit.Issues", Ta = [
  {
    type: "workspace",
    kind: "routable",
    alias: cn,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-B0-tkcuy.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-BYk0vmjN.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: x,
        match: cn
      }
    ]
  }
], ya = [
  {
    type: "workspace",
    kind: "default",
    alias: rn,
    name: "Issues Root Workspace",
    meta: {
      entityType: zn,
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
      collectionAlias: bt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: rn
      }
    ]
  }
], Aa = [...Ta, ...ya], va = [
  {
    type: "repository",
    alias: Dn,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => Gi)
  }
], Ia = [
  {
    type: "collectionView",
    alias: Bi,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => Ji),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: bt
      }
    ]
  }
], Ea = [
  {
    type: "collection",
    kind: "default",
    alias: bt,
    name: "Issues Collection",
    element: () => import("./issues.element-Cl7lgtgI.js"),
    meta: {
      repositoryAlias: Dn
    }
  },
  ...va,
  ...Ia
], wa = "Umb.Repository.ContentAudit.Issues.Detail", Oa = "Umb.Store.ContentAudit.Issues.Detail", ga = [
  {
    type: "repository",
    alias: wa,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-ClCE6exB.js")
  },
  {
    type: "store",
    alias: Oa,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], Sa = [...ga], $a = [
  ...Aa,
  ...fa,
  ...Ea,
  ...Sa
], Hn = "status-codes-root", Pa = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: Hn,
    menus: [W]
  }
}, Ua = [Pa], vt = "Umb.Collection.ContentAudit.StatusCodes", La = "Umb.CollectionView.ContentAudit.StatusCodes.Table", Fn = "Umb.Repository.ContentAuditStatusCodesCollection";
var Na = Object.defineProperty, ka = Object.getOwnPropertyDescriptor, Kn = (t) => {
  throw TypeError(t);
}, De = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ka(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Na(e, n, s), s;
}, It = (t, e, n) => e.has(t) || Kn("Cannot " + n), ct = (t, e, n) => (It(t, e, "read from private field"), e.get(t)), Qe = (t, e, n) => e.has(t) ? Kn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Xn = (t, e, n, i) => (It(t, e, "write to private field"), e.set(t, n), n), Et = (t, e, n) => (It(t, e, "access private method"), n), te, Ve, ne, Jn, Qn, Zn;
let S = class extends y {
  constructor() {
    super(), Qe(this, ne), this._tableConfig = {
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
    ], this._tableItems = [], Qe(this, te), Qe(this, Ve), this.consumeContext(I, (t) => {
      Xn(this, te, t);
    }), Et(this, ne, Jn).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return r`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
te = /* @__PURE__ */ new WeakMap();
Ve = /* @__PURE__ */ new WeakMap();
ne = /* @__PURE__ */ new WeakSet();
Jn = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Xn(this, Ve, t), Et(this, ne, Qn).call(this);
  });
};
Qn = function() {
  ct(this, te) && this.observe(ct(this, te).items, (t) => Et(this, ne, Zn).call(this, t), "umbCollectionItemsObserver");
};
Zn = function(t) {
  const e = ct(this, Ve);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    var s, a, o;
    const i = e({ entityType: n.entityType }) + fe.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${i}>${(s = n.pageData) == null ? void 0 : s.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (a = n.technicalSeoData) == null ? void 0 : a.contentType
        },
        {
          columnAlias: "statusCode",
          value: r`<content-audit-status-code-label .statusCode=${(o = n.pageData) == null ? void 0 : o.statusCode}></content-audit-status-code-label>`
        }
      ]
    };
  });
};
S.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
De([
  c()
], S.prototype, "_tableConfig", 2);
De([
  c()
], S.prototype, "_tableColumns", 2);
De([
  c()
], S.prototype, "_tableItems", 2);
S = De([
  m("content-audit-status-codes-table-collection-view")
], S);
const Ra = S, Da = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return S;
  },
  default: Ra
}, Symbol.toStringTag, { value: "Module" })), un = "Umb.Workspace.ContentAudit.StatusCodes", Va = [
  {
    type: "workspace",
    kind: "default",
    alias: un,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: Hn,
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
      collectionAlias: vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: un
      }
    ]
  }
], Wa = [
  {
    type: "repository",
    alias: Fn,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-BwHjub8S.js")
  }
], Ma = [
  {
    type: "collectionView",
    alias: La,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => Da),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: vt
      }
    ]
  }
], xa = [
  {
    type: "collection",
    kind: "default",
    alias: vt,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-DMTv6l4O.js"),
    meta: {
      repositoryAlias: Fn
    }
  },
  ...Wa,
  ...Ma
], ja = [
  ...Va,
  ...Ua,
  ...xa
], es = "orphaned-pages-root", Ba = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: es,
    menus: [Ne]
  }
}, qa = [Ba], wt = "Umb.Collection.ContentAudit.OrphanedPages", Ga = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", ts = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var Ya = Object.defineProperty, za = Object.getOwnPropertyDescriptor, ns = (t) => {
  throw TypeError(t);
}, We = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? za(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Ya(e, n, s), s;
}, Ot = (t, e, n) => e.has(t) || ns("Cannot " + n), ut = (t, e, n) => (Ot(t, e, "read from private field"), e.get(t)), Ze = (t, e, n) => e.has(t) ? ns("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ss = (t, e, n, i) => (Ot(t, e, "write to private field"), e.set(t, n), n), gt = (t, e, n) => (Ot(t, e, "access private method"), n), se, Me, ie, is, as, os;
let $ = class extends y {
  constructor() {
    super(), Ze(this, ie), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], Ze(this, se), Ze(this, Me), this.consumeContext(I, (t) => {
      ss(this, se, t);
    }), gt(this, ie, is).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return r`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
se = /* @__PURE__ */ new WeakMap();
Me = /* @__PURE__ */ new WeakMap();
ie = /* @__PURE__ */ new WeakSet();
is = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    ss(this, Me, t), gt(this, ie, as).call(this);
  });
};
as = function() {
  ut(this, se) && this.observe(ut(this, se).items, (t) => gt(this, ie, os).call(this, t), "umbCollectionItemsObserver");
};
os = function(t) {
  const e = ut(this, Me);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    const i = e({ entityType: "document" }) + fe.generateLocal({ unique: n.unique });
    return {
      id: n.unique,
      entityType: n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${i}>${n.url}</a>`
        }
      ]
    };
  });
};
$.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
We([
  c()
], $.prototype, "_tableConfig", 2);
We([
  c()
], $.prototype, "_tableColumns", 2);
We([
  c()
], $.prototype, "_tableItems", 2);
$ = We([
  m("content-audit-orphaned-pages-table-collection-view")
], $);
const Ha = $, Fa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return $;
  },
  default: Ha
}, Symbol.toStringTag, { value: "Module" })), dn = "Umb.Workspace.ContentAudit.OrphanedPages", Ka = [
  {
    type: "workspace",
    kind: "default",
    alias: dn,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: es,
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
      collectionAlias: wt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: dn
      }
    ]
  }
], Xa = [
  {
    type: "repository",
    alias: ts,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-DETQ_Q0P.js")
  }
], Ja = [
  {
    type: "collectionView",
    alias: Ga,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Fa),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: wt
      }
    ]
  }
], Qa = [
  {
    type: "collection",
    kind: "default",
    alias: wt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-DoefYUIA.js"),
    meta: {
      repositoryAlias: ts
    }
  },
  ...Xa,
  ...Ja
], Za = [
  ...Ka,
  ...qa,
  ...Qa
], ls = "images-alt-text-root", eo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: ls,
    menus: [Ne]
  }
}, to = [eo], St = "Umb.Collection.ContentAudit.ImagesAltText", no = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", rs = "Umb.Repository.ContentAuditImagesAltTextCollection";
var so = Object.defineProperty, io = Object.getOwnPropertyDescriptor, cs = (t) => {
  throw TypeError(t);
}, xe = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? io(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && so(e, n, s), s;
}, $t = (t, e, n) => e.has(t) || cs("Cannot " + n), dt = (t, e, n) => ($t(t, e, "read from private field"), e.get(t)), et = (t, e, n) => e.has(t) ? cs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), us = (t, e, n, i) => ($t(t, e, "write to private field"), e.set(t, n), n), Pt = (t, e, n) => ($t(t, e, "access private method"), n), ae, je, oe, ds, ms, ps;
let P = class extends y {
  constructor() {
    super(), et(this, oe), this._tableConfig = {
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
    ], this._tableItems = [], et(this, ae), et(this, je), this.consumeContext(I, (t) => {
      us(this, ae, t);
    }), Pt(this, oe, ds).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return r`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ae = /* @__PURE__ */ new WeakMap();
je = /* @__PURE__ */ new WeakMap();
oe = /* @__PURE__ */ new WeakSet();
ds = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    us(this, je, t), Pt(this, oe, ms).call(this);
  });
};
ms = function() {
  dt(this, ae) && this.observe(dt(this, ae).items, (t) => Pt(this, oe, ps).call(this, t), "umbCollectionItemsObserver");
};
ps = function(t) {
  const e = dt(this, je);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    const i = e({ entityType: "document" }) + fe.generateLocal({ unique: n.unique });
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
          value: r`<a href=${i}>${n.foundPage}</a>`
        },
        {
          columnAlias: "altText",
          value: n.altText
        }
      ]
    };
  });
};
P.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
xe([
  c()
], P.prototype, "_tableConfig", 2);
xe([
  c()
], P.prototype, "_tableColumns", 2);
xe([
  c()
], P.prototype, "_tableItems", 2);
P = xe([
  m("content-audit-images-alt-text-table-collection-view")
], P);
const ao = P, oo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return P;
  },
  default: ao
}, Symbol.toStringTag, { value: "Module" })), mn = "Umb.Workspace.ContentAudit.ImagesAltText", lo = [
  {
    type: "workspace",
    kind: "default",
    alias: mn,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: ls,
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
      collectionAlias: St
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: mn
      }
    ]
  }
], ro = [
  {
    type: "repository",
    alias: rs,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-Bc8H84nR.js")
  }
], co = [
  {
    type: "collectionView",
    alias: no,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => oo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: St
      }
    ]
  }
], uo = [
  {
    type: "collection",
    kind: "default",
    alias: St,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DzMGILfL.js"),
    meta: {
      repositoryAlias: rs
    }
  },
  ...ro,
  ...co
], mo = [
  ...lo,
  ...to,
  ...uo
], hs = "outbound-links-root", po = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: hs,
    menus: [W]
  }
}, ho = [po], Ut = "Umb.Collection.ContentAudit.OutboundLinks", _o = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", _s = "Umb.Repository.ContentAuditOutboundLinksCollection";
var Co = Object.defineProperty, bo = Object.getOwnPropertyDescriptor, Cs = (t) => {
  throw TypeError(t);
}, Be = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? bo(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Co(e, n, s), s;
}, Lt = (t, e, n) => e.has(t) || Cs("Cannot " + n), pn = (t, e, n) => (Lt(t, e, "read from private field"), e.get(t)), hn = (t, e, n) => e.has(t) ? Cs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), fo = (t, e, n, i) => (Lt(t, e, "write to private field"), e.set(t, n), n), bs = (t, e, n) => (Lt(t, e, "access private method"), n), le, Ue, fs, Ts;
let U = class extends y {
  constructor() {
    super(), hn(this, Ue), this._tableConfig = {
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
    ], this._tableItems = [], hn(this, le), this.consumeContext(I, (t) => {
      fo(this, le, t), bs(this, Ue, fs).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return r`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
le = /* @__PURE__ */ new WeakMap();
Ue = /* @__PURE__ */ new WeakSet();
fs = function() {
  pn(this, le) && this.observe(pn(this, le).items, (t) => bs(this, Ue, Ts).call(this, t), "umbCollectionItemsObserver");
};
Ts = function(t) {
  this._tableItems = t.map((e) => {
    var n;
    return {
      id: e.unique,
      data: [
        {
          columnAlias: "url",
          value: r`<a href="${e.url}" target="_blank">${e.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: r`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "contentType",
          value: e.contentType
        },
        {
          columnAlias: "outlinks",
          value: (n = e.links) == null ? void 0 : n.length
        }
      ]
    };
  });
};
U.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Be([
  c()
], U.prototype, "_tableConfig", 2);
Be([
  c()
], U.prototype, "_tableColumns", 2);
Be([
  c()
], U.prototype, "_tableItems", 2);
U = Be([
  m("content-audit-outbound-links-table-collection-view")
], U);
const To = U, yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return U;
  },
  default: To
}, Symbol.toStringTag, { value: "Module" })), _n = "Umb.Workspace.ContentAudit.OutboundLinks", Ao = [
  {
    type: "workspace",
    kind: "default",
    alias: _n,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: hs,
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
      collectionAlias: Ut
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: _n
      }
    ]
  }
], vo = [
  {
    type: "repository",
    alias: _s,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-cMc8bMVX.js")
  }
], Io = [
  {
    type: "collectionView",
    alias: _o,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => yo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: Ut
      }
    ]
  }
], Eo = [
  {
    type: "collection",
    kind: "default",
    alias: Ut,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-DJu1PE06.js"),
    meta: {
      repositoryAlias: _s
    }
  },
  ...vo,
  ...Io
], wo = [
  ...Ao,
  ...ho,
  ...Eo
], ys = "inbound-links-root", Oo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: ys,
    menus: [W]
  }
}, go = [Oo], Nt = "Umb.Collection.ContentAudit.InboundLinks", So = "Umb.CollectionView.ContentAudit.InboundLinks.Table", As = "Umb.Repository.ContentAuditInboundLinksCollection";
var $o = Object.defineProperty, Po = Object.getOwnPropertyDescriptor, vs = (t) => {
  throw TypeError(t);
}, qe = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Po(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && $o(e, n, s), s;
}, kt = (t, e, n) => e.has(t) || vs("Cannot " + n), Cn = (t, e, n) => (kt(t, e, "read from private field"), e.get(t)), bn = (t, e, n) => e.has(t) ? vs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Uo = (t, e, n, i) => (kt(t, e, "write to private field"), e.set(t, n), n), Is = (t, e, n) => (kt(t, e, "access private method"), n), re, Le, Es, ws;
let L = class extends y {
  constructor() {
    super(), bn(this, Le), this._tableConfig = {
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
    ], this._tableItems = [], bn(this, re), this.consumeContext(I, (t) => {
      Uo(this, re, t), Is(this, Le, Es).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return r`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
re = /* @__PURE__ */ new WeakMap();
Le = /* @__PURE__ */ new WeakSet();
Es = function() {
  Cn(this, re) && this.observe(Cn(this, re).items, (t) => Is(this, Le, ws).call(this, t), "umbCollectionItemsObserver");
};
ws = function(t) {
  this._tableItems = t.map((e) => {
    var n;
    return {
      id: e.unique,
      data: [
        {
          columnAlias: "url",
          value: r`<a href="${e.url}" target="_blank">${e.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: r`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "contentType",
          value: e.contentType
        },
        {
          columnAlias: "inlinks",
          value: (n = e.links) == null ? void 0 : n.length
        }
      ]
    };
  });
};
L.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
qe([
  c()
], L.prototype, "_tableConfig", 2);
qe([
  c()
], L.prototype, "_tableColumns", 2);
qe([
  c()
], L.prototype, "_tableItems", 2);
L = qe([
  m("content-audit-inbound-links-table-collection-view")
], L);
const Lo = L, No = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return L;
  },
  default: Lo
}, Symbol.toStringTag, { value: "Module" })), fn = "Umb.Workspace.ContentAudit.InboundLinks", ko = [
  {
    type: "workspace",
    kind: "default",
    alias: fn,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: ys,
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
      collectionAlias: Nt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: fn
      }
    ]
  }
], Ro = [
  {
    type: "repository",
    alias: As,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-DHuls18Y.js")
  }
], Do = [
  {
    type: "collectionView",
    alias: So,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => No),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: Nt
      }
    ]
  }
], Vo = [
  {
    type: "collection",
    kind: "default",
    alias: Nt,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-BgFbFelw.js"),
    meta: {
      repositoryAlias: As
    }
  },
  ...Ro,
  ...Do
], Wo = [
  ...ko,
  ...go,
  ...Vo
], Os = "metadata-root", Mo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: Os,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, xo = [Mo], Rt = "Umb.Collection.ContentAudit.Metadata", jo = "Umb.CollectionView.ContentAudit.Metadata.Table", Tn = "Umb.Workspace.ContentAudit.Metadata", Bo = [
  {
    type: "workspace",
    kind: "default",
    alias: Tn,
    name: "Metadata Root Workspace",
    meta: {
      entityType: Os,
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
      collectionAlias: Rt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Tn
      }
    ]
  }
], gs = "Umb.Repository.ContentAuditMetadataCollection", qo = [
  {
    type: "repository",
    alias: gs,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-BIVnZ04M.js")
  }
], Go = [
  {
    type: "collectionView",
    alias: jo,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element-Chej_Gw1.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: Rt
      }
    ]
  }
], Yo = [
  {
    type: "collection",
    kind: "default",
    alias: Rt,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: gs
    }
  },
  ...qo,
  ...Go
], zo = [
  ...Bo,
  ...xo,
  ...Yo
], Ho = [], Dt = "Umb.Collection.ContentAudit.DuplicateContent", Fo = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", Ss = "Umb.Repository.ContentAuditDuplicateContentCollection";
var Ko = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, Ge = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Xo(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Ko(e, n, s), s;
};
let N = class extends y {
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
      return r`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
N.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ge([
  c()
], N.prototype, "_tableConfig", 2);
Ge([
  c()
], N.prototype, "_tableColumns", 2);
Ge([
  c()
], N.prototype, "_tableItems", 2);
N = Ge([
  m("content-audit-duplicate-content-table-collection-view")
], N);
const Jo = N, Qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return N;
  },
  default: Jo
}, Symbol.toStringTag, { value: "Module" })), Zo = "duplicate-content-root", yn = "Umb.Workspace.ContentAudit.DuplicateContent", el = [
  {
    type: "workspace",
    kind: "default",
    alias: yn,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: Zo,
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
      collectionAlias: Dt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: yn
      }
    ]
  }
], tl = [
  {
    type: "repository",
    alias: Ss,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-BXLixNjo.js")
  }
], nl = [
  {
    type: "collectionView",
    alias: Fo,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => Qo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: Dt
      }
    ]
  }
], sl = [
  {
    type: "collection",
    kind: "default",
    alias: Dt,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-DTbM7jcX.js"),
    meta: {
      repositoryAlias: Ss
    }
  },
  ...tl,
  ...nl
], il = [
  ...el,
  ...Ho,
  ...sl
], $s = "carbon-rating-root", al = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: $s,
    menus: [ke]
  }
}, ol = [al], Vt = "Umb.Collection.ContentAudit.CarbonRating", ll = "Umb.CollectionView.ContentAudit.CarbonRating.Table", Ps = "Umb.Repository.ContentAuditCarbonRatingCollection";
var rl = Object.defineProperty, cl = Object.getOwnPropertyDescriptor, Us = (t) => {
  throw TypeError(t);
}, Ye = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? cl(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && rl(e, n, s), s;
}, Wt = (t, e, n) => e.has(t) || Us("Cannot " + n), mt = (t, e, n) => (Wt(t, e, "read from private field"), e.get(t)), tt = (t, e, n) => e.has(t) ? Us("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ls = (t, e, n, i) => (Wt(t, e, "write to private field"), e.set(t, n), n), Mt = (t, e, n) => (Wt(t, e, "access private method"), n), ce, ze, ue, Ns, ks, Rs;
let k = class extends y {
  constructor() {
    super(), tt(this, ue), this._tableConfig = {
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
        name: "Page Size",
        alias: "pageSize"
      },
      {
        name: "Carbon Rating",
        alias: "carbonRating",
        elementName: "content-audit-carbon-intensity-label"
      },
      {
        name: "Emissions Per Page View",
        alias: "emissionsPerPageView"
      }
    ], this._tableItems = [], tt(this, ce), tt(this, ze), this.consumeContext(I, (t) => {
      Ls(this, ce, t);
    }), Mt(this, ue, Ns).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return r`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ce = /* @__PURE__ */ new WeakMap();
ze = /* @__PURE__ */ new WeakMap();
ue = /* @__PURE__ */ new WeakSet();
Ns = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ls(this, ze, t), Mt(this, ue, ks).call(this);
  });
};
ks = function() {
  mt(this, ce) && this.observe(mt(this, ce).items, (t) => Mt(this, ue, Rs).call(this, t), "umbCollectionItemsObserver");
};
Rs = function(t) {
  const e = mt(this, ze);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    var s, a, o;
    const i = e({ entityType: n.entityType }) + fe.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${i}>${(s = n.pageData) == null ? void 0 : s.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (a = n.technicalSeoData) == null ? void 0 : a.contentType
        },
        {
          columnAlias: "pageSize",
          value: r`${Math.round(((o = n.performanceData) == null ? void 0 : o.totalBytes) / 1024)}KB`
        },
        {
          columnAlias: "carbonRating",
          value: n.emissionsData.carbonRating
        },
        {
          columnAlias: "emissionsPerPageView",
          value: `${n.emissionsData.emissionsPerPageView}g`
        }
      ]
    };
  });
};
k.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ye([
  c()
], k.prototype, "_tableConfig", 2);
Ye([
  c()
], k.prototype, "_tableColumns", 2);
Ye([
  c()
], k.prototype, "_tableItems", 2);
k = Ye([
  m("content-audit-carbon-rating-table-collection-view")
], k);
const ul = k, dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return k;
  },
  default: ul
}, Symbol.toStringTag, { value: "Module" })), An = "Umb.Workspace.ContentAudit.CarbonRating", ml = [
  {
    type: "workspace",
    kind: "default",
    alias: An,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: $s,
      headline: "Carbon Rating"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.CarbonRating.Collection",
    name: "Content Audit Carbon Rating Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: Vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: An
      }
    ]
  }
], pl = [
  {
    type: "repository",
    alias: Ps,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository-Yx9X2hj9.js")
  }
], hl = [
  {
    type: "collectionView",
    alias: ll,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => dl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: Vt
      }
    ]
  }
], _l = [
  {
    type: "collection",
    kind: "default",
    alias: Vt,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element-CTFE9xYN.js"),
    meta: {
      repositoryAlias: Ps
    }
  },
  ...pl,
  ...hl
], Cl = [
  ...ml,
  ...ol,
  ..._l
], Ds = "core-web-vitals-root", bl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: Ds,
    menus: [ke]
  }
}, fl = [bl], xt = "Umb.Collection.ContentAudit.CoreWebVitals", Tl = "Umb.CollectionView.ContentAudit.CoreWebVitals.Table", Vs = "Umb.Repository.ContentAuditCoreWebVitalsCollection";
var yl = Object.defineProperty, Al = Object.getOwnPropertyDescriptor, Ws = (t) => {
  throw TypeError(t);
}, He = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Al(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && yl(e, n, s), s;
}, jt = (t, e, n) => e.has(t) || Ws("Cannot " + n), pt = (t, e, n) => (jt(t, e, "read from private field"), e.get(t)), nt = (t, e, n) => e.has(t) ? Ws("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ms = (t, e, n, i) => (jt(t, e, "write to private field"), e.set(t, n), n), Bt = (t, e, n) => (jt(t, e, "access private method"), n), de, Fe, me, xs, js, Bs;
let R = class extends y {
  constructor() {
    super(), nt(this, me), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      },
      {
        name: "Cumulative Layout Shift",
        alias: "cumulativeLayoutShift",
        elementName: "content-audit-metric-label"
      },
      {
        name: "First Contentful Paint",
        alias: "firstContentfulPaint",
        elementName: "content-audit-metric-label"
      },
      {
        name: "Largest Contentful Paint",
        alias: "largestContentfulPaint",
        elementName: "content-audit-metric-label"
      },
      //{
      //    name: 'Time to Interactive',
      //    alias: 'timeToInteractive',
      //    elementName: 'content-audit-metric-label'
      //},
      {
        name: "Time to First Byte",
        alias: "timeToFirstByte",
        elementName: "content-audit-metric-label"
      }
    ], this._tableItems = [], nt(this, de), nt(this, Fe), this.consumeContext(I, (t) => {
      Ms(this, de, t);
    }), Bt(this, me, xs).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return r`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
de = /* @__PURE__ */ new WeakMap();
Fe = /* @__PURE__ */ new WeakMap();
me = /* @__PURE__ */ new WeakSet();
xs = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ms(this, Fe, t), Bt(this, me, js).call(this);
  });
};
js = function() {
  pt(this, de) && this.observe(pt(this, de).items, (t) => Bt(this, me, Bs).call(this, t), "umbCollectionItemsObserver");
};
Bs = function(t) {
  const e = pt(this, Fe);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.filter((n) => n.pageData.statusCode === 200).map((n) => {
    var s;
    const i = e({ entityType: n.entityType }) + fe.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${i}>${(s = n.pageData) == null ? void 0 : s.url}</a>`
        },
        {
          columnAlias: "cumulativeLayoutShift",
          value: n.performanceData.cumulativeLayoutShift
        },
        {
          columnAlias: "firstContentfulPaint",
          value: n.performanceData.firstContentfulPaint
        },
        {
          columnAlias: "largestContentfulPaint",
          value: n.performanceData.largestContentfulPaint
        },
        //{
        //    columnAlias: 'timeToInteractive',
        //    value: page.performanceData.timeToInteractive
        //},
        {
          columnAlias: "timeToFirstByte",
          value: n.performanceData.timeToFirstByte
        }
      ]
    };
  });
};
R.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
He([
  c()
], R.prototype, "_tableConfig", 2);
He([
  c()
], R.prototype, "_tableColumns", 2);
He([
  c()
], R.prototype, "_tableItems", 2);
R = He([
  m("content-audit-core-web-vitals-table-collection-view")
], R);
const vl = R, Il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return R;
  },
  default: vl
}, Symbol.toStringTag, { value: "Module" })), vn = "Umb.Workspace.ContentAudit.CoreWebVitals", El = [
  {
    type: "workspace",
    kind: "default",
    alias: vn,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: Ds,
      headline: "Core Web Vitals"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.CoreWebVitals.Collection",
    name: "Content Audit Core Web Vitals Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: vn
      }
    ]
  }
], wl = [
  {
    type: "repository",
    alias: Vs,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository-BO12pyGc.js")
  }
], Ol = [
  {
    type: "collectionView",
    alias: Tl,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => Il),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: T,
        match: xt
      }
    ]
  }
], gl = [
  {
    type: "collection",
    kind: "default",
    alias: xt,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element-Dk38PXrp.js"),
    meta: {
      repositoryAlias: Vs
    }
  },
  ...wl,
  ...Ol
], Sl = [
  ...El,
  ...fl,
  ...gl
], qs = "export-root", $l = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: qs,
    menus: [Ct]
  }
}, Pl = [$l], Ul = "Umb.Workspace.ContentAudit.Export", Ll = [
  {
    type: "workspace",
    kind: "default",
    alias: Ul,
    name: "Export Root Workspace",
    element: () => import("./export.element-wo3UjDJ2.js"),
    meta: {
      entityType: qs,
      headline: "Export"
    }
  }
], Nl = [
  ...Ll,
  ...Pl
], B = "Umb.Section.ContentAudit", kl = {
  type: "section",
  alias: B,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Rl = {
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
      match: B
    }
  ]
}, Dl = [
  {
    type: "menu",
    alias: W,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: Ne,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: ke,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: Ct,
    name: "Tools Menu"
  }
], Vl = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: W
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: B
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
      menu: Ne
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: B
      }
    ]
  },
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentPerformance",
    name: "Content Performance Sidebar Menu",
    meta: {
      label: "Performance",
      menu: ke
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: B
      }
    ]
  },
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentTools",
    name: "Content Tools Sidebar Menu",
    meta: {
      label: "Tools",
      menu: Ct
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: B
      }
    ]
  }
], Wl = [
  kl,
  Rl,
  ...Dl,
  ...Vl,
  ...Ca,
  ...$a,
  ...ja,
  ...Za,
  ...mo,
  ...wo,
  ...Wo,
  ...zo,
  ...il,
  ...Cl,
  ...Sl,
  ...Nl
], Ml = {
  type: "workspace",
  alias: ge,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => ji),
  meta: {
    entityType: Ln
  }
}, xl = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-CRdHHk3c.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ge
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-CIePeSwH.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ge
      }
    ]
  }
], jl = [
  Ml,
  ...xl
], Bl = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-R9UmQg45.js")
  }
], ql = [
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
], Gl = {
  type: "workspaceView",
  alias: "Umbraco.Community.ContentAudit.Workspace",
  name: "ContentAudit Workspace",
  js: () => import("./contentaudit-workspace-view-CpZE3hf9.js"),
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
}, Yl = [Gl], zl = {
  type: "globalContext",
  alias: vi,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Oi)
}, mr = async (t, e) => {
  e.registerMany([
    zl,
    ...Wl,
    ...jl,
    ...Bl,
    ...ql,
    ...Yl
  ]), t.consumeContext(zs, async (n) => {
    if (!n) return;
    const i = n.getOpenApiConfiguration();
    d.BASE = i.base, d.TOKEN = i.token, d.WITH_CREDENTIALS = i.withCredentials, d.CREDENTIALS = i.credentials;
  });
};
export {
  X as A,
  tn as B,
  Nn as C,
  qi as D,
  v as E,
  Js as I,
  rr as U,
  M as a,
  cn as b,
  Ee as c,
  we as d,
  st as e,
  Rn as f,
  it as g,
  Oe as h,
  cr as i,
  ur as j,
  Qs as k,
  ot as l,
  Se as m,
  ge as n,
  mr as o,
  vi as p,
  Ln as q,
  W as r,
  Ne as s,
  gi as t,
  lt as u,
  ke as v,
  Ct as w,
  bt as x,
  Bi as y,
  Dn as z
};
//# sourceMappingURL=index-Ca1vHQCw.js.map
