var zt = (t) => {
  throw TypeError(t);
};
var Ht = (t, e, n) => e.has(t) || zt("Cannot " + n);
var u = (t, e, n) => (Ht(t, e, "read from private field"), n ? n.call(t) : e.get(t)), C = (t, e, n) => e.has(t) ? zt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), b = (t, e, n, s) => (Ht(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
import { UMB_AUTH_CONTEXT as zi } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as F } from "@umbraco-cms/backoffice/element-api";
import { LitElement as D, html as r, css as h, property as V, customElement as m, nothing as In, state as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as En } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as Hi } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as Fi, UMB_WORKSPACE_CONDITION_ALIAS as x, UMB_WORKSPACE_MODAL as be } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as j } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Ke, UmbArrayState as Ft } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as Ki } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as I, UMB_COLLECTION_ALIAS_CONDITION as T } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as y } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Xi } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as fe } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Te } from "@umbraco-cms/backoffice/router";
const Ji = [
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
], Qi = [
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
var Zi = Object.defineProperty, es = Object.getOwnPropertyDescriptor, gn = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? es(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Zi(e, n, i), i;
};
let Ee = class extends F(D) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Ji[this.type - 1];
      return r`
                <uui-tag color=${t.color}>
                    <uui-icon name="${t.icon}"></uui-icon>
                    ${t.label}
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
gn([
  V({ attribute: !1 })
], Ee.prototype, "type", 2);
Ee = gn([
  m("content-audit-issue-type-label")
], Ee);
var ts = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, wn = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ns(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && ts(e, n, i), i;
};
let ge = class extends F(D) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Qi[this.type - 1];
      return r`
                <uui-tag color=${t.color}>
                    <uui-icon name="${t.icon}"></uui-icon>
                    ${t.label}
                </uui-tag>
            `;
    }
  }
};
ge.styles = [
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
], ge.prototype, "type", 2);
ge = wn([
  m("content-audit-priority-type-label")
], ge);
var is = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, On = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ss(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && is(e, n, i), i;
};
let it = class extends F(D) {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? r`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : In;
  }
};
On([
  V({ attribute: !1 })
], it.prototype, "statusCode", 2);
it = On([
  m("content-audit-status-code-label")
], it);
var as = Object.defineProperty, os = Object.getOwnPropertyDescriptor, Sn = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? os(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && as(e, n, i), i;
};
let st = class extends F(D) {
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
], st.prototype, "value", 2);
st = Sn([
  m("content-audit-carbon-intensity-label")
], st);
class Kt extends Error {
  constructor(e, n, s) {
    super(s), this.name = "ApiError", this.url = n.url, this.status = n.status, this.statusText = n.statusText, this.body = n.body, this.request = e;
  }
}
class ls extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class rs {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((n, s) => {
      this._resolve = n, this._reject = s;
      const i = (l) => {
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
      }), e(i, a, o);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new ls("Request aborted"));
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
}, ye = (t) => typeof t == "string", Xe = (t) => ye(t) && t !== "", ht = (t) => t instanceof Blob, $n = (t) => t instanceof FormData, cs = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, us = (t) => {
  const e = [], n = (i, a) => {
    e.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(a))}`);
  }, s = (i, a) => {
    a != null && (a instanceof Date ? n(i, a.toISOString()) : Array.isArray(a) ? a.forEach((o) => s(i, o)) : typeof a == "object" ? Object.entries(a).forEach(([o, l]) => s(`${i}[${o}]`, l)) : n(i, a));
  };
  return Object.entries(t).forEach(([i, a]) => s(i, a)), e.length ? `?${e.join("&")}` : "";
}, ds = (t, e) => {
  const n = encodeURI, s = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (a, o) => {
    var l;
    return (l = e.path) != null && l.hasOwnProperty(o) ? n(String(e.path[o])) : a;
  }), i = t.BASE + s;
  return e.query ? i + us(e.query) : i;
}, ms = (t) => {
  if (t.formData) {
    const e = new FormData(), n = (s, i) => {
      ye(i) || ht(i) ? e.append(s, i) : e.append(s, JSON.stringify(i));
    };
    return Object.entries(t.formData).filter(([, s]) => s != null).forEach(([s, i]) => {
      Array.isArray(i) ? i.forEach((a) => n(s, a)) : n(s, i);
    }), e;
  }
}, ve = async (t, e) => typeof e == "function" ? e(t) : e, ps = async (t, e) => {
  const [n, s, i, a] = await Promise.all([
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
  if (Xe(n) && (o.Authorization = `Bearer ${n}`), Xe(s) && Xe(i)) {
    const l = cs(`${s}:${i}`);
    o.Authorization = `Basic ${l}`;
  }
  return e.body !== void 0 && (e.mediaType ? o["Content-Type"] = e.mediaType : ht(e.body) ? o["Content-Type"] = e.body.type || "application/octet-stream" : ye(e.body) ? o["Content-Type"] = "text/plain" : $n(e.body) || (o["Content-Type"] = "application/json")), new Headers(o);
}, hs = (t) => {
  var e, n;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (n = t.mediaType) != null && n.includes("+json") ? JSON.stringify(t.body) : ye(t.body) || ht(t.body) || $n(t.body) ? t.body : JSON.stringify(t.body);
}, _s = async (t, e, n, s, i, a, o) => {
  const l = new AbortController();
  let _ = {
    headers: a,
    body: s ?? i,
    method: e.method,
    signal: l.signal
  };
  t.WITH_CREDENTIALS && (_.credentials = t.CREDENTIALS);
  for (const f of t.interceptors.request._fns)
    _ = await f(_);
  return o(() => l.abort()), await fetch(n, _);
}, Cs = (t, e) => {
  if (e) {
    const n = t.headers.get(e);
    if (ye(n))
      return n;
  }
}, bs = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const n = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (n.some((s) => e.includes(s)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, fs = (t, e) => {
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
    ...t.errors
  }[e.status];
  if (s)
    throw new Kt(t, e, s);
  if (!e.ok) {
    const i = e.status ?? "unknown", a = e.statusText ?? "unknown", o = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Kt(
      t,
      e,
      `Generic Error: status: ${i}; status text: ${a}; body: ${o}`
    );
  }
}, p = (t, e) => new rs(async (n, s, i) => {
  try {
    const a = ds(t, e), o = ms(e), l = hs(e), _ = await ps(t, e);
    if (!i.isCancelled) {
      let f = await _s(t, e, a, l, o, _, i);
      for (const Yi of t.interceptors.response._fns)
        f = await Yi(f);
      const qt = await bs(f), Gi = Cs(f, e.responseHeader);
      let Gt = qt;
      e.responseTransformer && f.ok && (Gt = await e.responseTransformer(qt));
      const Yt = {
        url: a,
        ok: f.ok,
        status: f.status,
        statusText: f.statusText,
        body: Gi ?? Gt
      };
      fs(e, Yt), n(Yt.body);
    }
  } catch (a) {
    s(a);
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
class Ts {
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
var Pn = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(Pn || {}), at = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(at || {}), ys = Object.defineProperty, As = Object.getOwnPropertyDescriptor, Un = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? As(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && ys(e, n, i), i;
};
let we = class extends F(D) {
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
we.styles = [
  h`
            uui-tag {
                font-size: 14px;
            }
        `
];
Un([
  V({ attribute: !1 })
], we.prototype, "value", 2);
we = Un([
  m("content-audit-metric-label")
], we);
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
const Oe = "Umb.Workspace.ContentAudit", vs = "Umb.Context.ContentAudit", Ln = "content-audit";
var E;
class Is {
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
class Es {
  constructor(e) {
    C(this, pe);
    b(this, pe, e);
  }
  async getSettings() {
    return await j(u(this, pe), Ts.getSettings());
  }
}
pe = new WeakMap();
var g, he;
class gs extends En {
  constructor(n) {
    super(n);
    C(this, g);
    C(this, he);
    b(this, g, new Is(this)), b(this, he, new Es(this));
  }
  async getLatestAuditOverview() {
    return u(this, g).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return u(this, g).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return u(this, g).getTopIssues();
  }
  async getHealthScore() {
    return u(this, g).getHealthScore();
  }
  async getSettings() {
    return u(this, he).getSettings();
  }
}
g = new WeakMap(), he = new WeakMap();
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
    this.workspaceAlias = Oe, b(this, q, new Ke(void 0)), this.latestAuditOverview = u(this, q).asObservable(), b(this, G, new Ft([], (s) => s.unique)), this.pagesWithMissingMetadata = u(this, G).asObservable(), b(this, Y, new Ft([], (s) => s.name)), this.topIssues = u(this, Y).asObservable(), b(this, z, new Ke(void 0)), this.healthScore = u(this, z).asObservable(), b(this, H, new Ke(void 0)), this.settings = u(this, H).asObservable(), this.provideContext(Fi, this), this.provideContext(Nn, this), b(this, A, new gs(this));
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
const Nn = new Hi(
  "ContentAuditContext"
), ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const Os = (t) => (e, n) => {
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
let Ss = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== kn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (_t && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = Jt.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Jt.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const $s = (t) => new Ss(typeof t == "string" ? t : t + "", void 0, kn), Ps = (t, e) => {
  if (_t) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), i = Ie.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = n.cssText, t.appendChild(s);
  }
}, Qt = _t ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return $s(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Us, defineProperty: Ls, getOwnPropertyDescriptor: Ns, getOwnPropertyNames: ks, getOwnPropertySymbols: Rs, getPrototypeOf: Ds } = Object, w = globalThis, Zt = w.trustedTypes, Vs = Zt ? Zt.emptyScript : "", Je = w.reactiveElementPolyfillSupport, J = (t, e) => t, lt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Vs : null;
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
} }, Rn = (t, e) => !Us(t, e), en = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: Rn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class K extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = en) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, n);
      i !== void 0 && Ls(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: i, set: a } = Ns(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get: i, set(o) {
      const l = i == null ? void 0 : i.call(this);
      a == null || a.call(this, o), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? en;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties"))) return;
    const e = Ds(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      const n = this.properties, s = [...ks(n), ...Rs(n)];
      for (const i of s) this.createProperty(i, n[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [s, i] of n) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, s] of this.elementProperties) {
      const i = this._$Eu(n, s);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) n.unshift(Qt(i));
    } else e !== void 0 && n.push(Qt(e));
    return n;
  }
  static _$Eu(e, n) {
    const s = n.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const s of n.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ps(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((n) => {
      var s;
      return (s = n.hostConnected) == null ? void 0 : s.call(n);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var s;
      return (s = n.hostDisconnected) == null ? void 0 : s.call(n);
    });
  }
  attributeChangedCallback(e, n, s) {
    this._$AK(e, s);
  }
  _$ET(e, n) {
    var a;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : lt).toAttribute(n, s.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var a, o;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), _ = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((a = l.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? l.converter : lt;
      this._$Em = i, this[i] = _.fromAttribute(n, l.type) ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, n, s) {
    var i;
    if (e !== void 0) {
      const a = this.constructor, o = this[e];
      if (s ?? (s = a.getPropertyOptions(e)), !((s.hasChanged ?? Rn)(o, n) || s.useDefault && s.reflect && o === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, n, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: s, reflect: i, wrapped: a }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? n ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (n = void 0), this._$AL.set(e, n)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [a, o] of i) {
        const { wrapped: l } = o, _ = this[a];
        l !== !0 || this._$AL.has(a) || _ === void 0 || this.C(a, void 0, o, _);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (s = this._$EO) == null || s.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
      }), this.update(n)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var n;
    (n = this._$EO) == null || n.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
K.elementStyles = [], K.shadowRootOptions = { mode: "open" }, K[J("elementProperties")] = /* @__PURE__ */ new Map(), K[J("finalized")] = /* @__PURE__ */ new Map(), Je == null || Je({ ReactiveElement: K }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.1.0");
var Ws = Object.getOwnPropertyDescriptor, Ms = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Ws(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = o(i) || i);
  return i;
};
let Se = class extends F(D) {
  constructor() {
    super(), this._workspaceContext = new ot(this);
  }
  render() {
    return r`
			<umb-workspace-editor headline="Content Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Se = Ms([
  Os("content-audit-workspace-root")
], Se);
const xs = Se, js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Se;
  },
  default: xs
}, Symbol.toStringTag, { value: "Module" })), W = "Umb.Menu.ContentAudit", Ne = "Umb.Menu.ContentMetadata", ke = "Umb.Menu.ContentPerformance", Ct = "Umb.Menu.ContentTools", bt = "Umb.Collection.ContentAudit.Issues", Bs = "Umb.CollectionView.ContentAudit.Issues.Table", Dn = "Umb.Repository.ContentAuditIssuesCollection";
var _e;
class qs {
  constructor(e) {
    C(this, _e);
    b(this, _e, e);
  }
  async getCollection(e) {
    const { data: n, error: s } = await j(u(this, _e), X.getAllIssues(e));
    if (s)
      return { error: s };
    if (!n)
      return { data: { items: [], total: 0 } };
    const { items: i, total: a } = n;
    return { data: { items: i, total: a } };
  }
}
_e = new WeakMap();
var Ce;
class tn extends Ki {
  constructor(n) {
    super(n);
    C(this, Ce);
    b(this, Ce, new qs(n));
  }
  async requestCollection(n) {
    return u(this, Ce).getCollection(n);
  }
}
Ce = new WeakMap();
const Gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: tn,
  default: tn
}, Symbol.toStringTag, { value: "Module" }));
var Ys = Object.defineProperty, zs = Object.getOwnPropertyDescriptor, Vn = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? zs(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Ys(e, n, i), i;
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
  Xi,
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
var Hs = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, Wn = (t) => {
  throw TypeError(t);
}, Ae = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Fs(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Hs(e, n, i), i;
}, ft = (t, e, n) => e.has(t) || Wn("Cannot " + n), nn = (t, e, n) => (ft(t, e, "read from private field"), e.get(t)), sn = (t, e, n) => e.has(t) ? Wn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ks = (t, e, n, s) => (ft(t, e, "write to private field"), e.set(t, n), n), rt = (t, e, n) => (ft(t, e, "access private method"), n), Z, Q, Mn, Tt;
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
      Ks(this, Z, t), rt(this, Q, Mn).call(this);
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
const Xs = v, Js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return v;
  },
  default: Xs
}, Symbol.toStringTag, { value: "Module" })), xn = "all-pages-root", Qs = {
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
}, Zs = [Qs], an = "Umb.Workspace.ContentAudit.AllPagesRoot", M = "Umb.Workspace.ContentAudit.AllPages", ea = [
  {
    type: "workspace",
    kind: "routable",
    alias: M,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-BM0GWlXa.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-DAOSuHIc.js"),
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
    js: () => import("./all-pages-links-workspace-view.element-Cd1P2gI0.js"),
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
    js: () => import("./all-pages-images-workspace-view.element-G41imlnC.js"),
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
    js: () => import("./all-pages-resources-workspace-view.element-B-dCO6Ui.js"),
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
    js: () => import("./all-pages-issues-workspace-view.element-BI7T02vU.js"),
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
var na = Object.defineProperty, ia = Object.getOwnPropertyDescriptor, Bn = (t) => {
  throw TypeError(t);
}, Re = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ia(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && na(e, n, i), i;
}, At = (t, e, n) => e.has(t) || Bn("Cannot " + n), on = (t, e, n) => (At(t, e, "read from private field"), e.get(t)), ln = (t, e, n) => e.has(t) ? Bn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), sa = (t, e, n, s) => (At(t, e, "write to private field"), e.set(t, n), n), qn = (t, e, n) => (At(t, e, "access private method"), n), ee, Pe, Gn, Yn;
let O = class extends y {
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
      sa(this, ee, t), qn(this, Pe, Gn).call(this);
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
    var n, s, i;
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
          value: (s = e.technicalSeoData) == null ? void 0 : s.contentType
        },
        {
          columnAlias: "statusCode",
          value: r`<content-audit-status-code-label .statusCode=${(i = e.pageData) == null ? void 0 : i.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "redirect",
          value: e.pageData.redirect ? "Yes" : "No"
        }
      ]
    };
  });
};
O.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Re([
  c()
], O.prototype, "_tableConfig", 2);
Re([
  c()
], O.prototype, "_tableColumns", 2);
Re([
  c()
], O.prototype, "_tableItems", 2);
O = Re([
  m("content-audit-all-pages-table-collection-view")
], O);
const aa = O, oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return O;
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
    api: () => import("./all-pages-collection.repository-BAt1HkMw.js")
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
    api: () => import("./all-pages-detail.repository-U-LBXqwn.js")
  },
  {
    type: "store",
    alias: pa,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], _a = [...ha], Ca = [
  ...ra,
  ...Zs,
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
    api: () => import("./issues-workspace.context-C5jBAnaT.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-Bm6rGwKg.js"),
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
    api: () => Promise.resolve().then(() => Gs)
  }
], Ia = [
  {
    type: "collectionView",
    alias: Bs,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => Js),
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
], ga = "Umb.Repository.ContentAudit.Issues.Detail", wa = "Umb.Store.ContentAudit.Issues.Detail", Oa = [
  {
    type: "repository",
    alias: ga,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-Dt0EFgyv.js")
  },
  {
    type: "store",
    alias: wa,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], Sa = [...Oa], $a = [
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
}, De = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ka(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Na(e, n, i), i;
}, It = (t, e, n) => e.has(t) || Kn("Cannot " + n), ct = (t, e, n) => (It(t, e, "read from private field"), e.get(t)), Qe = (t, e, n) => e.has(t) ? Kn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Xn = (t, e, n, s) => (It(t, e, "write to private field"), e.set(t, n), n), Et = (t, e, n) => (It(t, e, "access private method"), n), te, Ve, ne, Jn, Qn, Zn;
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
    var i, a, o;
    const s = e({ entityType: n.entityType }) + fe.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${s}>${(i = n.pageData) == null ? void 0 : i.url}</a>`
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
    api: () => import("./status-codes-collection.repository-sn6Js5Sm.js")
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
], ei = "orphaned-pages-root", Ba = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: ei,
    menus: [Ne]
  }
}, qa = [Ba], gt = "Umb.Collection.ContentAudit.OrphanedPages", Ga = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", ti = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var Ya = Object.defineProperty, za = Object.getOwnPropertyDescriptor, ni = (t) => {
  throw TypeError(t);
}, We = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? za(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Ya(e, n, i), i;
}, wt = (t, e, n) => e.has(t) || ni("Cannot " + n), ut = (t, e, n) => (wt(t, e, "read from private field"), e.get(t)), Ze = (t, e, n) => e.has(t) ? ni("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ii = (t, e, n, s) => (wt(t, e, "write to private field"), e.set(t, n), n), Ot = (t, e, n) => (wt(t, e, "access private method"), n), ie, Me, se, si, ai, oi;
let $ = class extends y {
  constructor() {
    super(), Ze(this, se), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], Ze(this, ie), Ze(this, Me), this.consumeContext(I, (t) => {
      ii(this, ie, t);
    }), Ot(this, se, si).call(this);
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
ie = /* @__PURE__ */ new WeakMap();
Me = /* @__PURE__ */ new WeakMap();
se = /* @__PURE__ */ new WeakSet();
si = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    ii(this, Me, t), Ot(this, se, ai).call(this);
  });
};
ai = function() {
  ut(this, ie) && this.observe(ut(this, ie).items, (t) => Ot(this, se, oi).call(this, t), "umbCollectionItemsObserver");
};
oi = function(t) {
  const e = ut(this, Me);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    const s = e({ entityType: "document" }) + fe.generateLocal({ unique: n.unique });
    return {
      id: n.unique,
      entityType: n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${s}>${n.url}</a>`
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
      entityType: ei,
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
      collectionAlias: gt
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
    alias: ti,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-CiIgQKwN.js")
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
        match: gt
      }
    ]
  }
], Qa = [
  {
    type: "collection",
    kind: "default",
    alias: gt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-DoefYUIA.js"),
    meta: {
      repositoryAlias: ti
    }
  },
  ...Xa,
  ...Ja
], Za = [
  ...Ka,
  ...qa,
  ...Qa
], li = "images-alt-text-root", eo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: li,
    menus: [Ne]
  }
}, to = [eo], St = "Umb.Collection.ContentAudit.ImagesAltText", no = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", ri = "Umb.Repository.ContentAuditImagesAltTextCollection";
var io = Object.defineProperty, so = Object.getOwnPropertyDescriptor, ci = (t) => {
  throw TypeError(t);
}, xe = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? so(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && io(e, n, i), i;
}, $t = (t, e, n) => e.has(t) || ci("Cannot " + n), dt = (t, e, n) => ($t(t, e, "read from private field"), e.get(t)), et = (t, e, n) => e.has(t) ? ci("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ui = (t, e, n, s) => ($t(t, e, "write to private field"), e.set(t, n), n), Pt = (t, e, n) => ($t(t, e, "access private method"), n), ae, je, oe, di, mi, pi;
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
      ui(this, ae, t);
    }), Pt(this, oe, di).call(this);
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
di = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    ui(this, je, t), Pt(this, oe, mi).call(this);
  });
};
mi = function() {
  dt(this, ae) && this.observe(dt(this, ae).items, (t) => Pt(this, oe, pi).call(this, t), "umbCollectionItemsObserver");
};
pi = function(t) {
  const e = dt(this, je);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    const s = e({ entityType: "document" }) + fe.generateLocal({ unique: n.unique });
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
          value: r`<a href=${s}>${n.foundPage}</a>`
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
      entityType: li,
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
    alias: ri,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-rjtMpUxG.js")
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
      repositoryAlias: ri
    }
  },
  ...ro,
  ...co
], mo = [
  ...lo,
  ...to,
  ...uo
], hi = "outbound-links-root", po = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: hi,
    menus: [W]
  }
}, ho = [po], Ut = "Umb.Collection.ContentAudit.OutboundLinks", _o = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", _i = "Umb.Repository.ContentAuditOutboundLinksCollection";
var Co = Object.defineProperty, bo = Object.getOwnPropertyDescriptor, Ci = (t) => {
  throw TypeError(t);
}, Be = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? bo(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Co(e, n, i), i;
}, Lt = (t, e, n) => e.has(t) || Ci("Cannot " + n), pn = (t, e, n) => (Lt(t, e, "read from private field"), e.get(t)), hn = (t, e, n) => e.has(t) ? Ci("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), fo = (t, e, n, s) => (Lt(t, e, "write to private field"), e.set(t, n), n), bi = (t, e, n) => (Lt(t, e, "access private method"), n), le, Ue, fi, Ti;
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
      fo(this, le, t), bi(this, Ue, fi).call(this);
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
fi = function() {
  pn(this, le) && this.observe(pn(this, le).items, (t) => bi(this, Ue, Ti).call(this, t), "umbCollectionItemsObserver");
};
Ti = function(t) {
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
      entityType: hi,
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
    alias: _i,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-gclQFeon.js")
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
      repositoryAlias: _i
    }
  },
  ...vo,
  ...Io
], go = [
  ...Ao,
  ...ho,
  ...Eo
], yi = "inbound-links-root", wo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: yi,
    menus: [W]
  }
}, Oo = [wo], Nt = "Umb.Collection.ContentAudit.InboundLinks", So = "Umb.CollectionView.ContentAudit.InboundLinks.Table", Ai = "Umb.Repository.ContentAuditInboundLinksCollection";
var $o = Object.defineProperty, Po = Object.getOwnPropertyDescriptor, vi = (t) => {
  throw TypeError(t);
}, qe = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Po(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && $o(e, n, i), i;
}, kt = (t, e, n) => e.has(t) || vi("Cannot " + n), Cn = (t, e, n) => (kt(t, e, "read from private field"), e.get(t)), bn = (t, e, n) => e.has(t) ? vi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Uo = (t, e, n, s) => (kt(t, e, "write to private field"), e.set(t, n), n), Ii = (t, e, n) => (kt(t, e, "access private method"), n), re, Le, Ei, gi;
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
      Uo(this, re, t), Ii(this, Le, Ei).call(this);
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
Ei = function() {
  Cn(this, re) && this.observe(Cn(this, re).items, (t) => Ii(this, Le, gi).call(this, t), "umbCollectionItemsObserver");
};
gi = function(t) {
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
      entityType: yi,
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
    alias: Ai,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-DWJYnR8F.js")
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
      repositoryAlias: Ai
    }
  },
  ...Ro,
  ...Do
], Wo = [
  ...ko,
  ...Oo,
  ...Vo
], wi = "metadata-root", Mo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: wi,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, xo = [Mo], Rt = "Umb.Collection.ContentAudit.Metadata", jo = "Umb.CollectionView.ContentAudit.Metadata.Table", Tn = "Umb.Workspace.ContentAudit.Metadata", Bo = [
  {
    type: "workspace",
    kind: "default",
    alias: Tn,
    name: "Metadata Root Workspace",
    meta: {
      entityType: wi,
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
], Oi = "Umb.Repository.ContentAuditMetadataCollection", qo = [
  {
    type: "repository",
    alias: Oi,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-C8pKUt1E.js")
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
      repositoryAlias: Oi
    }
  },
  ...qo,
  ...Go
], zo = [
  ...Bo,
  ...xo,
  ...Yo
], Ho = [], Dt = "Umb.Collection.ContentAudit.DuplicateContent", Fo = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", Si = "Umb.Repository.ContentAuditDuplicateContentCollection";
var Ko = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, Ge = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Xo(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Ko(e, n, i), i;
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
    alias: Si,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-CrrHo1fy.js")
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
], il = [
  {
    type: "collection",
    kind: "default",
    alias: Dt,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-DTbM7jcX.js"),
    meta: {
      repositoryAlias: Si
    }
  },
  ...tl,
  ...nl
], sl = [
  ...el,
  ...Ho,
  ...il
], $i = "carbon-rating-root", al = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: $i,
    menus: [ke]
  }
}, ol = [al], Vt = "Umb.Collection.ContentAudit.CarbonRating", ll = "Umb.CollectionView.ContentAudit.CarbonRating.Table", Pi = "Umb.Repository.ContentAuditCarbonRatingCollection";
var rl = Object.defineProperty, cl = Object.getOwnPropertyDescriptor, Ui = (t) => {
  throw TypeError(t);
}, Ye = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? cl(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && rl(e, n, i), i;
}, Wt = (t, e, n) => e.has(t) || Ui("Cannot " + n), mt = (t, e, n) => (Wt(t, e, "read from private field"), e.get(t)), tt = (t, e, n) => e.has(t) ? Ui("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Li = (t, e, n, s) => (Wt(t, e, "write to private field"), e.set(t, n), n), Mt = (t, e, n) => (Wt(t, e, "access private method"), n), ce, ze, ue, Ni, ki, Ri;
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
      Li(this, ce, t);
    }), Mt(this, ue, Ni).call(this);
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
Ni = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Li(this, ze, t), Mt(this, ue, ki).call(this);
  });
};
ki = function() {
  mt(this, ce) && this.observe(mt(this, ce).items, (t) => Mt(this, ue, Ri).call(this, t), "umbCollectionItemsObserver");
};
Ri = function(t) {
  const e = mt(this, ze);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    var i, a, o;
    const s = e({ entityType: n.entityType }) + fe.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${s}>${(i = n.pageData) == null ? void 0 : i.url}</a>`
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
      entityType: $i,
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
    alias: Pi,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository-BZNbgvc4.js")
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
      repositoryAlias: Pi
    }
  },
  ...pl,
  ...hl
], Cl = [
  ...ml,
  ...ol,
  ..._l
], Di = "core-web-vitals-root", bl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: Di,
    menus: [ke]
  }
}, fl = [bl], xt = "Umb.Collection.ContentAudit.CoreWebVitals", Tl = "Umb.CollectionView.ContentAudit.CoreWebVitals.Table", Vi = "Umb.Repository.ContentAuditCoreWebVitalsCollection";
var yl = Object.defineProperty, Al = Object.getOwnPropertyDescriptor, Wi = (t) => {
  throw TypeError(t);
}, He = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Al(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && yl(e, n, i), i;
}, jt = (t, e, n) => e.has(t) || Wi("Cannot " + n), pt = (t, e, n) => (jt(t, e, "read from private field"), e.get(t)), nt = (t, e, n) => e.has(t) ? Wi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Mi = (t, e, n, s) => (jt(t, e, "write to private field"), e.set(t, n), n), Bt = (t, e, n) => (jt(t, e, "access private method"), n), de, Fe, me, xi, ji, Bi;
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
      Mi(this, de, t);
    }), Bt(this, me, xi).call(this);
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
xi = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Mi(this, Fe, t), Bt(this, me, ji).call(this);
  });
};
ji = function() {
  pt(this, de) && this.observe(pt(this, de).items, (t) => Bt(this, me, Bi).call(this, t), "umbCollectionItemsObserver");
};
Bi = function(t) {
  const e = pt(this, Fe);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    var i;
    const s = e({ entityType: n.entityType }) + fe.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${s}>${(i = n.pageData) == null ? void 0 : i.url}</a>`
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
      entityType: Di,
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
], gl = [
  {
    type: "repository",
    alias: Vi,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository-DObFomv4.js")
  }
], wl = [
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
], Ol = [
  {
    type: "collection",
    kind: "default",
    alias: xt,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element-Dk38PXrp.js"),
    meta: {
      repositoryAlias: Vi
    }
  },
  ...gl,
  ...wl
], Sl = [
  ...El,
  ...fl,
  ...Ol
], qi = "export-root", $l = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: qi,
    menus: [Ct]
  }
}, Pl = [$l], Ul = "Umb.Workspace.ContentAudit.Export", Ll = [
  {
    type: "workspace",
    kind: "default",
    alias: Ul,
    name: "Export Root Workspace",
    element: () => import("./export.element-6n014GXX.js"),
    meta: {
      entityType: qi,
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
  ...go,
  ...Wo,
  ...zo,
  ...sl,
  ...Cl,
  ...Sl,
  ...Nl
], Ml = {
  type: "workspace",
  alias: Oe,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => js),
  meta: {
    entityType: Ln
  }
}, xl = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-CRqb8WJd.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Oe
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-ClMXoPoR.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Oe
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
    element: () => import("./run-warning-modal.element-DDNM2O2b.js")
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
  js: () => import("./contentaudit-workspace-view-Dt5B9ErN.js"),
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
  alias: vs,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => ws)
}, mr = async (t, e) => {
  e.registerMany([
    zl,
    ...Wl,
    ...jl,
    ...Bl,
    ...ql,
    ...Yl
  ]), t.consumeContext(zi, async (n) => {
    if (!n) return;
    const s = n.getOpenApiConfiguration();
    d.BASE = s.base, d.TOKEN = s.token, d.WITH_CREDENTIALS = s.withCredentials, d.CREDENTIALS = s.credentials;
  });
};
export {
  X as A,
  tn as B,
  Nn as C,
  qs as D,
  v as E,
  Ji as I,
  rr as U,
  M as a,
  cn as b,
  Ee as c,
  ge as d,
  it as e,
  Rn as f,
  st as g,
  we as h,
  cr as i,
  ur as j,
  Qi as k,
  ot as l,
  Se as m,
  Oe as n,
  mr as o,
  vs as p,
  Ln as q,
  W as r,
  Ne as s,
  Os as t,
  lt as u,
  ke as v,
  Ct as w,
  bt as x,
  Bs as y,
  Dn as z
};
//# sourceMappingURL=index-BwZayLry.js.map
