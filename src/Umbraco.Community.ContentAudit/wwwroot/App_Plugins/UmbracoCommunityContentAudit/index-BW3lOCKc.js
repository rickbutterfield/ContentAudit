var zt = (t) => {
  throw TypeError(t);
};
var Yt = (t, e, n) => e.has(t) || zt("Cannot " + n);
var c = (t, e, n) => (Yt(t, e, "read from private field"), n ? n.call(t) : e.get(t)), h = (t, e, n) => e.has(t) ? zt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), _ = (t, e, n, s) => (Yt(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
import { UMB_AUTH_CONTEXT as Gi } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as H } from "@umbraco-cms/backoffice/element-api";
import { LitElement as D, html as l, css as p, property as V, customElement as m, nothing as vn, state as r } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as In } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as zi } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as Yi, UMB_WORKSPACE_CONDITION_ALIAS as x, UMB_WORKSPACE_MODAL as be } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as j } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Ke, UmbArrayState as Ht } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as Hi } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as v, UMB_COLLECTION_ALIAS_CONDITION as f } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as T } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Fi } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as fe } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Te } from "@umbraco-cms/backoffice/router";
const Ki = [
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
], Xi = [
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
var Ji = Object.defineProperty, Qi = Object.getOwnPropertyDescriptor, gn = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Qi(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Ji(e, n, i), i;
};
let ge = class extends H(D) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Ki[this.type - 1];
      return l`
                <uui-tag color=${t.color}>
                    <uui-icon name="${t.icon}"></uui-icon>
                    ${t.label}
                </uui-tag>
            `;
    }
  }
};
ge.styles = [
  p`
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
], ge.prototype, "type", 2);
ge = gn([
  m("content-audit-issue-type-label")
], ge);
var Zi = Object.defineProperty, es = Object.getOwnPropertyDescriptor, On = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? es(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Zi(e, n, i), i;
};
let Oe = class extends H(D) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Xi[this.type - 1];
      return l`
                <uui-tag color=${t.color}>
                    <uui-icon name="${t.icon}"></uui-icon>
                    ${t.label}
                </uui-tag>
            `;
    }
  }
};
Oe.styles = [
  p`
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
], Oe.prototype, "type", 2);
Oe = On([
  m("content-audit-priority-type-label")
], Oe);
var ts = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, wn = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ns(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && ts(e, n, i), i;
};
let it = class extends H(D) {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? l`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : vn;
  }
};
wn([
  V({ attribute: !1 })
], it.prototype, "statusCode", 2);
it = wn([
  m("content-audit-status-code-label")
], it);
var is = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, En = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ss(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && is(e, n, i), i;
};
let st = class extends H(D) {
  constructor() {
    super(...arguments), this.value = "";
  }
  _getColour() {
    return this.value == "E" || this.value == "F" ? "danger" : this.value == "D" ? "warning" : "positive";
  }
  render() {
    if (this.value != null)
      return l`
                <uui-tag .color=${this._getColour()}>
                    ${this.value}
                </uui-tag>
            `;
  }
};
En([
  V({ attribute: !0 })
], st.prototype, "value", 2);
st = En([
  m("content-audit-carbon-intensity-label")
], st);
class Ft extends Error {
  constructor(e, n, s) {
    super(s), this.name = "ApiError", this.url = n.url, this.status = n.status, this.statusText = n.statusText, this.body = n.body, this.request = e;
  }
}
class as extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class os {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((n, s) => {
      this._resolve = n, this._reject = s;
      const i = (u) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(u));
      }, a = (u) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(u));
      }, o = (u) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(u);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new as("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class Kt {
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
    request: new Kt(),
    response: new Kt()
  }
}, ye = (t) => typeof t == "string", Xe = (t) => ye(t) && t !== "", ht = (t) => t instanceof Blob, Sn = (t) => t instanceof FormData, ls = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, rs = (t) => {
  const e = [], n = (i, a) => {
    e.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(a))}`);
  }, s = (i, a) => {
    a != null && (a instanceof Date ? n(i, a.toISOString()) : Array.isArray(a) ? a.forEach((o) => s(i, o)) : typeof a == "object" ? Object.entries(a).forEach(([o, u]) => s(`${i}[${o}]`, u)) : n(i, a));
  };
  return Object.entries(t).forEach(([i, a]) => s(i, a)), e.length ? `?${e.join("&")}` : "";
}, cs = (t, e) => {
  const n = encodeURI, s = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (a, o) => {
    var u;
    return (u = e.path) != null && u.hasOwnProperty(o) ? n(String(e.path[o])) : a;
  }), i = t.BASE + s;
  return e.query ? i + rs(e.query) : i;
}, us = (t) => {
  if (t.formData) {
    const e = new FormData(), n = (s, i) => {
      ye(i) || ht(i) ? e.append(s, i) : e.append(s, JSON.stringify(i));
    };
    return Object.entries(t.formData).filter(([, s]) => s != null).forEach(([s, i]) => {
      Array.isArray(i) ? i.forEach((a) => n(s, a)) : n(s, i);
    }), e;
  }
}, ve = async (t, e) => typeof e == "function" ? e(t) : e, ds = async (t, e) => {
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
  }).filter(([, u]) => u != null).reduce((u, [I, b]) => ({
    ...u,
    [I]: String(b)
  }), {});
  if (Xe(n) && (o.Authorization = `Bearer ${n}`), Xe(s) && Xe(i)) {
    const u = ls(`${s}:${i}`);
    o.Authorization = `Basic ${u}`;
  }
  return e.body !== void 0 && (e.mediaType ? o["Content-Type"] = e.mediaType : ht(e.body) ? o["Content-Type"] = e.body.type || "application/octet-stream" : ye(e.body) ? o["Content-Type"] = "text/plain" : Sn(e.body) || (o["Content-Type"] = "application/json")), new Headers(o);
}, ms = (t) => {
  var e, n;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (n = t.mediaType) != null && n.includes("+json") ? JSON.stringify(t.body) : ye(t.body) || ht(t.body) || Sn(t.body) ? t.body : JSON.stringify(t.body);
}, ps = async (t, e, n, s, i, a, o) => {
  const u = new AbortController();
  let I = {
    headers: a,
    body: s ?? i,
    method: e.method,
    signal: u.signal
  };
  t.WITH_CREDENTIALS && (I.credentials = t.CREDENTIALS);
  for (const b of t.interceptors.request._fns)
    I = await b(I);
  return o(() => u.abort()), await fetch(n, I);
}, hs = (t, e) => {
  if (e) {
    const n = t.headers.get(e);
    if (ye(n))
      return n;
  }
}, _s = async (t) => {
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
}, Cs = (t, e) => {
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
    throw new Ft(t, e, s);
  if (!e.ok) {
    const i = e.status ?? "unknown", a = e.statusText ?? "unknown", o = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Ft(
      t,
      e,
      `Generic Error: status: ${i}; status text: ${a}; body: ${o}`
    );
  }
}, C = (t, e) => new os(async (n, s, i) => {
  try {
    const a = cs(t, e), o = us(e), u = ms(e), I = await ds(t, e);
    if (!i.isCancelled) {
      let b = await ps(t, e, a, u, o, I, i);
      for (const qi of t.interceptors.response._fns)
        b = await qi(b);
      const Bt = await _s(b), Bi = hs(b, e.responseHeader);
      let qt = Bt;
      e.responseTransformer && b.ok && (qt = await e.responseTransformer(Bt));
      const Gt = {
        url: a,
        ok: b.ok,
        status: b.status,
        statusText: b.statusText,
        body: Bi ?? qt
      };
      Cs(e, Gt), n(Gt.body);
    }
  } catch (a) {
    s(a);
  }
});
class K {
  /**
   * @param data The data for the request.
   * @param data.skip
   * @param data.take
   * @param data.filter
   * @returns unknown OK
   * @throws ApiError
   */
  static getAllImages(e = {}) {
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
  static getInteralLinks(e = {}) {
    return C(d, {
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
    return C(d, {
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
  static getLatestAuditData(e = {}) {
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
    return C(d, {
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
class bs {
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
var $n = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))($n || {}), at = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(at || {}), fs = Object.defineProperty, Ts = Object.getOwnPropertyDescriptor, Pn = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Ts(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && fs(e, n, i), i;
};
let we = class extends H(D) {
  _getColour() {
    return this.value != null ? this.value.rating == at.POOR ? "danger" : this.value.rating == at.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == $n.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
  }
  render() {
    if (this.value != null)
      return l`
                <uui-tag .color=${this._getColour()}>
                    ${this._formatValue()}
                </uui-tag>
            `;
  }
};
we.styles = [
  p`
            uui-tag {
                font-size: 14px;
            }
        `
];
Pn([
  V({ attribute: !1 })
], we.prototype, "value", 2);
we = Pn([
  m("content-audit-metric-label")
], we);
class tr extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class nr extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class ir extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const Ee = "Umb.Workspace.ContentAudit", ys = "Umb.Context.ContentAudit", Un = "content-audit";
var g;
class As {
  constructor(e) {
    h(this, g);
    _(this, g, e);
  }
  async getLatestAuditOverview() {
    return await j(c(this, g), K.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await j(c(this, g), K.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await j(c(this, g), K.getAllIssues({ skip: 0, take: 5 }));
  }
  async getHealthScore() {
    return await j(c(this, g), K.getHealthScore());
  }
}
g = new WeakMap();
var pe;
class vs {
  constructor(e) {
    h(this, pe);
    _(this, pe, e);
  }
  async getSettings() {
    return await j(c(this, pe), bs.getSettings());
  }
}
pe = new WeakMap();
var O, he;
class Is extends In {
  constructor(n) {
    super(n);
    h(this, O);
    h(this, he);
    _(this, O, new As(this)), _(this, he, new vs(this));
  }
  async getLatestAuditOverview() {
    return c(this, O).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return c(this, O).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return c(this, O).getTopIssues();
  }
  async getHealthScore() {
    return c(this, O).getHealthScore();
  }
  async getSettings() {
    return c(this, he).getSettings();
  }
}
O = new WeakMap(), he = new WeakMap();
var y, B, q, G, z, Y;
class ot extends In {
  constructor(n) {
    super(n);
    h(this, y);
    h(this, B);
    h(this, q);
    h(this, G);
    h(this, z);
    h(this, Y);
    this.workspaceAlias = Ee, _(this, B, new Ke(void 0)), this.latestAuditOverview = c(this, B).asObservable(), _(this, q, new Ht([], (s) => s.unique)), this.pagesWithMissingMetadata = c(this, q).asObservable(), _(this, G, new Ht([], (s) => s.name)), this.topIssues = c(this, G).asObservable(), _(this, z, new Ke(void 0)), this.healthScore = c(this, z).asObservable(), _(this, Y, new Ke(void 0)), this.settings = c(this, Y).asObservable(), this.provideContext(Yi, this), this.provideContext(Ln, this), _(this, y, new Is(this));
  }
  getEntityType() {
    return Un;
  }
  async getLatestAuditOverview() {
    const { data: n } = await c(this, y).getLatestAuditOverview();
    n && c(this, B).setValue(n);
  }
  async getPagesWithMissingMetadata() {
    const { data: n } = await c(this, y).getPagesWithMissingMetadata();
    n && c(this, q).setValue(n.items);
  }
  async getTopIssues() {
    const { data: n } = await c(this, y).getTopIssues();
    n && c(this, G).setValue(n.items);
  }
  async getHealthScore() {
    const { data: n } = await c(this, y).getHealthScore();
    n && c(this, z).setValue(n);
  }
  async getSettings() {
    const { data: n } = await c(this, y).getSettings();
    n && c(this, Y).setValue(n);
  }
}
y = new WeakMap(), B = new WeakMap(), q = new WeakMap(), G = new WeakMap(), z = new WeakMap(), Y = new WeakMap();
const Ln = new zi(
  "ContentAuditContext"
), gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: Ln,
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
const Ie = globalThis, _t = Ie.ShadowRoot && (Ie.ShadyCSS === void 0 || Ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Nn = Symbol(), Xt = /* @__PURE__ */ new WeakMap();
let ws = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== Nn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (_t && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = Xt.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Xt.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Es = (t) => new ws(typeof t == "string" ? t : t + "", void 0, Nn), Ss = (t, e) => {
  if (_t) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), i = Ie.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = n.cssText, t.appendChild(s);
  }
}, Jt = _t ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return Es(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $s, defineProperty: Ps, getOwnPropertyDescriptor: Us, getOwnPropertyNames: Ls, getOwnPropertySymbols: Ns, getPrototypeOf: ks } = Object, w = globalThis, Qt = w.trustedTypes, Rs = Qt ? Qt.emptyScript : "", Je = w.reactiveElementPolyfillSupport, X = (t, e) => t, lt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Rs : null;
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
} }, kn = (t, e) => !$s(t, e), Zt = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: kn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class F extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Zt) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, n);
      i !== void 0 && Ps(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: i, set: a } = Us(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(o) {
      const u = i == null ? void 0 : i.call(this);
      a.call(this, o), this.requestUpdate(e, u, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties"))) return;
    const e = ks(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const n = this.properties, s = [...Ls(n), ...Ns(n)];
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
      for (const i of s) n.unshift(Jt(i));
    } else e !== void 0 && n.push(Jt(e));
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
    return Ss(e, this.constructor.elementStyles), e;
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
  _$EC(e, n) {
    var a;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : lt).toAttribute(n, s.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var a;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), u = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : lt;
      this._$Em = i, this[i] = u.fromAttribute(n, o.type), this._$Em = null;
    }
  }
  requestUpdate(e, n, s) {
    if (e !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(e)), !(s.hasChanged ?? kn)(this[e], n)) return;
      this.P(e, n, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, n, s) {
    this._$AL.has(e) || this._$AL.set(e, n), s.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e);
  }
  async _$ET() {
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
      if (i.size > 0) for (const [a, o] of i) o.wrapped !== !0 || this._$AL.has(a) || this[a] === void 0 || this.P(a, this[a], o);
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (s = this._$EO) == null || s.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
      }), this.update(n)) : this._$EU();
    } catch (i) {
      throw e = !1, this._$EU(), i;
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
    this._$Ej && (this._$Ej = this._$Ej.forEach((n) => this._$EC(n, this[n]))), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[X("elementProperties")] = /* @__PURE__ */ new Map(), F[X("finalized")] = /* @__PURE__ */ new Map(), Je == null || Je({ ReactiveElement: F }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.0.4");
var Ds = Object.getOwnPropertyDescriptor, Vs = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Ds(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = o(i) || i);
  return i;
};
let Se = class extends H(D) {
  constructor() {
    super(), this._workspaceContext = new ot(this);
  }
  render() {
    return l`
			<umb-workspace-editor headline="Content Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Se = Vs([
  Os("content-audit-workspace-root")
], Se);
const Ws = Se, Ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Se;
  },
  default: Ws
}, Symbol.toStringTag, { value: "Module" })), W = "Umb.Menu.ContentAudit", Ne = "Umb.Menu.ContentMetadata", ke = "Umb.Menu.ContentPerformance", Ct = "Umb.Collection.ContentAudit.Issues", xs = "Umb.CollectionView.ContentAudit.Issues.Table", Rn = "Umb.Repository.ContentAuditIssuesCollection";
var _e;
class js {
  constructor(e) {
    h(this, _e);
    _(this, _e, e);
  }
  async getCollection(e) {
    const { data: n, error: s } = await j(c(this, _e), K.getAllIssues(e));
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
class en extends Hi {
  constructor(n) {
    super(n);
    h(this, Ce);
    _(this, Ce, new js(n));
  }
  async requestCollection(n) {
    return c(this, Ce).getCollection(n);
  }
}
Ce = new WeakMap();
const Bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: en,
  default: en
}, Symbol.toStringTag, { value: "Module" }));
var qs = Object.defineProperty, Gs = Object.getOwnPropertyDescriptor, Dn = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Gs(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && qs(e, n, i), i;
};
let $e = class extends D {
  render() {
    return this.value ? l`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : vn;
  }
};
$e.styles = [
  Fi,
  p`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
Dn([
  V({ attribute: !1 })
], $e.prototype, "value", 2);
$e = Dn([
  m("content-audit-issues-table-name-column-layout")
], $e);
var zs = Object.defineProperty, Ys = Object.getOwnPropertyDescriptor, Vn = (t) => {
  throw TypeError(t);
}, Ae = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Ys(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && zs(e, n, i), i;
}, bt = (t, e, n) => e.has(t) || Vn("Cannot " + n), tn = (t, e, n) => (bt(t, e, "read from private field"), e.get(t)), nn = (t, e, n) => e.has(t) ? Vn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Hs = (t, e, n, s) => (bt(t, e, "write to private field"), e.set(t, n), n), rt = (t, e, n) => (bt(t, e, "access private method"), n), Z, J, Wn, ft;
let A = class extends T {
  constructor() {
    super(), nn(this, J), this.data = [], this._tableConfig = {
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
    ], this._tableItems = [], nn(this, Z), this.consumeContext(v, (t) => {
      Hs(this, Z, t), rt(this, J, Wn).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && rt(this, J, ft).call(this, this.data);
  }
  render() {
    if (this._tableItems.length !== 0)
      return l`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
Z = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakSet();
Wn = function() {
  tn(this, Z) && this.observe(tn(this, Z).items, (t) => rt(this, J, ft).call(this, t), "umbCollectionItemsObserver");
};
ft = function(t) {
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
        value: l`<content-audit-issue-type-label .type=${e.type}></content-audit-issue-type-label`
      },
      {
        columnAlias: "priority",
        value: l`<content-audit-priority-type-label .type=${e.priority}></content-audit-priority-type-label>`
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
  p`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ae([
  V({ type: Array, attribute: !1 })
], A.prototype, "data", 2);
Ae([
  r()
], A.prototype, "_tableConfig", 2);
Ae([
  r()
], A.prototype, "_tableColumns", 2);
Ae([
  r()
], A.prototype, "_tableItems", 2);
A = Ae([
  m("content-audit-issues-table-collection-view")
], A);
const Fs = A, Ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return A;
  },
  default: Fs
}, Symbol.toStringTag, { value: "Module" })), Mn = "all-pages-root", Xs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: Mn,
    menus: [W]
  }
}, Js = [Xs], sn = "Umb.Workspace.ContentAudit.AllPagesRoot", M = "Umb.Workspace.ContentAudit.AllPages", Qs = [
  {
    type: "workspace",
    kind: "routable",
    alias: M,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-Cpus4991.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-DtoSaEMa.js"),
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
    js: () => import("./all-pages-links-workspace-view.element-KK2CG-Yx.js"),
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
    js: () => import("./all-pages-images-workspace-view.element-De0EQuK1.js"),
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
    js: () => import("./all-pages-resources-workspace-view.element-DGeYfpUx.js"),
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
    js: () => import("./all-pages-issues-workspace-view.element-CgaSqHsc.js"),
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
], Tt = "Umb.Collection.ContentAudit.AllPages", Zs = "Umb.CollectionView.ContentAudit.AllPages.Table", xn = "Umb.Repository.ContentAuditAllPagesCollection";
var ea = Object.defineProperty, ta = Object.getOwnPropertyDescriptor, jn = (t) => {
  throw TypeError(t);
}, Re = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ta(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && ea(e, n, i), i;
}, yt = (t, e, n) => e.has(t) || jn("Cannot " + n), an = (t, e, n) => (yt(t, e, "read from private field"), e.get(t)), on = (t, e, n) => e.has(t) ? jn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), na = (t, e, n, s) => (yt(t, e, "write to private field"), e.set(t, n), n), Bn = (t, e, n) => (yt(t, e, "access private method"), n), ee, Pe, qn, Gn;
let E = class extends T {
  constructor() {
    super(), on(this, Pe), this._tableConfig = {
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
    ], this._tableItems = [], on(this, ee), this.consumeContext(v, (t) => {
      na(this, ee, t), Bn(this, Pe, qn).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return l`
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
qn = function() {
  an(this, ee) && this.observe(an(this, ee).items, (t) => Bn(this, Pe, Gn).call(this, t), "umbCollectionItemsObserver");
};
Gn = function(t) {
  this._tableItems = t.map((e) => {
    var n, s, i;
    return {
      id: e == null ? void 0 : e.unique,
      entityType: e == null ? void 0 : e.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: l`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${(n = e.pageData) == null ? void 0 : n.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (s = e.technicalSeoData) == null ? void 0 : s.contentType
        },
        {
          columnAlias: "statusCode",
          value: l`<content-audit-status-code-label .statusCode=${(i = e.pageData) == null ? void 0 : i.statusCode}></content-audit-status-code-label>`
        }
      ]
    };
  });
};
E.styles = [
  p`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Re([
  r()
], E.prototype, "_tableConfig", 2);
Re([
  r()
], E.prototype, "_tableColumns", 2);
Re([
  r()
], E.prototype, "_tableItems", 2);
E = Re([
  m("content-audit-all-pages-table-collection-view")
], E);
const ia = E, sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return E;
  },
  default: ia
}, Symbol.toStringTag, { value: "Module" })), aa = [
  {
    type: "workspace",
    kind: "default",
    alias: sn,
    name: "All Pages Root Workspace",
    meta: {
      entityType: Mn,
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
      collectionAlias: Tt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: sn
      }
    ]
  }
], oa = [...Qs, ...aa], la = [
  {
    type: "repository",
    alias: xn,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-kEF-WB6m.js")
  }
], ra = [
  {
    type: "collectionView",
    alias: Zs,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => sa),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: Tt
      }
    ]
  }
], ca = [
  {
    type: "collection",
    kind: "default",
    alias: Tt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element-DMHaFpCF.js"),
    meta: {
      repositoryAlias: xn
    }
  },
  ...la,
  ...ra
], ua = "Umb.Repository.ContentAudit.AllPages.Detail", da = "Umb.Store.ContentAudit.AllPages.Detail", ma = [
  {
    type: "repository",
    alias: ua,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository-giCRWHVG.js")
  },
  {
    type: "store",
    alias: da,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], pa = [...ma], ha = [
  ...oa,
  ...Js,
  ...ca,
  ...pa
], zn = "issues-root", _a = {
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
}, Ca = [_a], ln = "Umb.Workspace.ContentAudit.IssuesRoot", rn = "Umb.Workspace.ContentAudit.Issues", ba = [
  {
    type: "workspace",
    kind: "routable",
    alias: rn,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-DbjuweVP.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-OEFr_6Uo.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: x,
        match: rn
      }
    ]
  }
], fa = [
  {
    type: "workspace",
    kind: "default",
    alias: ln,
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
      collectionAlias: Ct
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ln
      }
    ]
  }
], Ta = [...ba, ...fa], ya = [
  {
    type: "repository",
    alias: Rn,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => Bs)
  }
], Aa = [
  {
    type: "collectionView",
    alias: xs,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => Ks),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: Ct
      }
    ]
  }
], va = [
  {
    type: "collection",
    kind: "default",
    alias: Ct,
    name: "Issues Collection",
    element: () => import("./issues.element-Cl7lgtgI.js"),
    meta: {
      repositoryAlias: Rn
    }
  },
  ...ya,
  ...Aa
], Ia = "Umb.Repository.ContentAudit.Issues.Detail", ga = "Umb.Store.ContentAudit.Issues.Detail", Oa = [
  {
    type: "repository",
    alias: Ia,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-CyfuNoeV.js")
  },
  {
    type: "store",
    alias: ga,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], wa = [...Oa], Ea = [
  ...Ta,
  ...Ca,
  ...va,
  ...wa
], Yn = "status-codes-root", Sa = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: Yn,
    menus: [W]
  }
}, $a = [Sa], At = "Umb.Collection.ContentAudit.StatusCodes", Pa = "Umb.CollectionView.ContentAudit.StatusCodes.Table", Hn = "Umb.Repository.ContentAuditStatusCodesCollection";
var Ua = Object.defineProperty, La = Object.getOwnPropertyDescriptor, Fn = (t) => {
  throw TypeError(t);
}, De = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? La(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Ua(e, n, i), i;
}, vt = (t, e, n) => e.has(t) || Fn("Cannot " + n), ct = (t, e, n) => (vt(t, e, "read from private field"), e.get(t)), Qe = (t, e, n) => e.has(t) ? Fn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Kn = (t, e, n, s) => (vt(t, e, "write to private field"), e.set(t, n), n), It = (t, e, n) => (vt(t, e, "access private method"), n), te, Ve, ne, Xn, Jn, Qn;
let S = class extends T {
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
    ], this._tableItems = [], Qe(this, te), Qe(this, Ve), this.consumeContext(v, (t) => {
      Kn(this, te, t);
    }), It(this, ne, Xn).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return l`
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
Xn = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Kn(this, Ve, t), It(this, ne, Jn).call(this);
  });
};
Jn = function() {
  ct(this, te) && this.observe(ct(this, te).items, (t) => It(this, ne, Qn).call(this, t), "umbCollectionItemsObserver");
};
Qn = function(t) {
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
          value: l`<a href=${s}>${(i = n.pageData) == null ? void 0 : i.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (a = n.technicalSeoData) == null ? void 0 : a.contentType
        },
        {
          columnAlias: "statusCode",
          value: l`<content-audit-status-code-label .statusCode=${(o = n.pageData) == null ? void 0 : o.statusCode}></content-audit-status-code-label>`
        }
      ]
    };
  });
};
S.styles = [
  p`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
De([
  r()
], S.prototype, "_tableConfig", 2);
De([
  r()
], S.prototype, "_tableColumns", 2);
De([
  r()
], S.prototype, "_tableItems", 2);
S = De([
  m("content-audit-status-codes-table-collection-view")
], S);
const Na = S, ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return S;
  },
  default: Na
}, Symbol.toStringTag, { value: "Module" })), cn = "Umb.Workspace.ContentAudit.StatusCodes", Ra = [
  {
    type: "workspace",
    kind: "default",
    alias: cn,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: Yn,
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
        match: cn
      }
    ]
  }
], Da = [
  {
    type: "repository",
    alias: Hn,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-C_Rn5dJ8.js")
  }
], Va = [
  {
    type: "collectionView",
    alias: Pa,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => ka),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: At
      }
    ]
  }
], Wa = [
  {
    type: "collection",
    kind: "default",
    alias: At,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-DMTv6l4O.js"),
    meta: {
      repositoryAlias: Hn
    }
  },
  ...Da,
  ...Va
], Ma = [
  ...Ra,
  ...$a,
  ...Wa
], Zn = "orphaned-pages-root", xa = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: Zn,
    menus: [Ne]
  }
}, ja = [xa], gt = "Umb.Collection.ContentAudit.OrphanedPages", Ba = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", ei = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var qa = Object.defineProperty, Ga = Object.getOwnPropertyDescriptor, ti = (t) => {
  throw TypeError(t);
}, We = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Ga(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && qa(e, n, i), i;
}, Ot = (t, e, n) => e.has(t) || ti("Cannot " + n), ut = (t, e, n) => (Ot(t, e, "read from private field"), e.get(t)), Ze = (t, e, n) => e.has(t) ? ti("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ni = (t, e, n, s) => (Ot(t, e, "write to private field"), e.set(t, n), n), wt = (t, e, n) => (Ot(t, e, "access private method"), n), ie, Me, se, ii, si, ai;
let $ = class extends T {
  constructor() {
    super(), Ze(this, se), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], Ze(this, ie), Ze(this, Me), this.consumeContext(v, (t) => {
      ni(this, ie, t);
    }), wt(this, se, ii).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return l`
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
ii = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    ni(this, Me, t), wt(this, se, si).call(this);
  });
};
si = function() {
  ut(this, ie) && this.observe(ut(this, ie).items, (t) => wt(this, se, ai).call(this, t), "umbCollectionItemsObserver");
};
ai = function(t) {
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
          value: l`<a href=${s}>${n.url}</a>`
        }
      ]
    };
  });
};
$.styles = [
  p`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
We([
  r()
], $.prototype, "_tableConfig", 2);
We([
  r()
], $.prototype, "_tableColumns", 2);
We([
  r()
], $.prototype, "_tableItems", 2);
$ = We([
  m("content-audit-orphaned-pages-table-collection-view")
], $);
const za = $, Ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return $;
  },
  default: za
}, Symbol.toStringTag, { value: "Module" })), un = "Umb.Workspace.ContentAudit.OrphanedPages", Ha = [
  {
    type: "workspace",
    kind: "default",
    alias: un,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: Zn,
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
        match: un
      }
    ]
  }
], Fa = [
  {
    type: "repository",
    alias: ei,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-BgB9DoLo.js")
  }
], Ka = [
  {
    type: "collectionView",
    alias: Ba,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Ya),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: gt
      }
    ]
  }
], Xa = [
  {
    type: "collection",
    kind: "default",
    alias: gt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-DoefYUIA.js"),
    meta: {
      repositoryAlias: ei
    }
  },
  ...Fa,
  ...Ka
], Ja = [
  ...Ha,
  ...ja,
  ...Xa
], oi = "images-alt-text-root", Qa = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: oi,
    menus: [Ne]
  }
}, Za = [Qa], Et = "Umb.Collection.ContentAudit.ImagesAltText", eo = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", li = "Umb.Repository.ContentAuditImagesAltTextCollection";
var to = Object.defineProperty, no = Object.getOwnPropertyDescriptor, ri = (t) => {
  throw TypeError(t);
}, xe = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? no(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && to(e, n, i), i;
}, St = (t, e, n) => e.has(t) || ri("Cannot " + n), dt = (t, e, n) => (St(t, e, "read from private field"), e.get(t)), et = (t, e, n) => e.has(t) ? ri("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ci = (t, e, n, s) => (St(t, e, "write to private field"), e.set(t, n), n), $t = (t, e, n) => (St(t, e, "access private method"), n), ae, je, oe, ui, di, mi;
let P = class extends T {
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
    ], this._tableItems = [], et(this, ae), et(this, je), this.consumeContext(v, (t) => {
      ci(this, ae, t);
    }), $t(this, oe, ui).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return l`
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
ui = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    ci(this, je, t), $t(this, oe, di).call(this);
  });
};
di = function() {
  dt(this, ae) && this.observe(dt(this, ae).items, (t) => $t(this, oe, mi).call(this, t), "umbCollectionItemsObserver");
};
mi = function(t) {
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
          value: l`<a href=${s}>${n.foundPage}</a>`
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
  p`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
xe([
  r()
], P.prototype, "_tableConfig", 2);
xe([
  r()
], P.prototype, "_tableColumns", 2);
xe([
  r()
], P.prototype, "_tableItems", 2);
P = xe([
  m("content-audit-images-alt-text-table-collection-view")
], P);
const io = P, so = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return P;
  },
  default: io
}, Symbol.toStringTag, { value: "Module" })), dn = "Umb.Workspace.ContentAudit.ImagesAltText", ao = [
  {
    type: "workspace",
    kind: "default",
    alias: dn,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: oi,
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
      collectionAlias: Et
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: dn
      }
    ]
  }
], oo = [
  {
    type: "repository",
    alias: li,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-rdpYtxfM.js")
  }
], lo = [
  {
    type: "collectionView",
    alias: eo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => so),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: Et
      }
    ]
  }
], ro = [
  {
    type: "collection",
    kind: "default",
    alias: Et,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DzMGILfL.js"),
    meta: {
      repositoryAlias: li
    }
  },
  ...oo,
  ...lo
], co = [
  ...ao,
  ...Za,
  ...ro
], pi = "outbound-links-root", uo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: pi,
    menus: [W]
  }
}, mo = [uo], Pt = "Umb.Collection.ContentAudit.OutboundLinks", po = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", hi = "Umb.Repository.ContentAuditOutboundLinksCollection";
var ho = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, _i = (t) => {
  throw TypeError(t);
}, Be = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? _o(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && ho(e, n, i), i;
}, Ut = (t, e, n) => e.has(t) || _i("Cannot " + n), mn = (t, e, n) => (Ut(t, e, "read from private field"), e.get(t)), pn = (t, e, n) => e.has(t) ? _i("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Co = (t, e, n, s) => (Ut(t, e, "write to private field"), e.set(t, n), n), Ci = (t, e, n) => (Ut(t, e, "access private method"), n), le, Ue, bi, fi;
let U = class extends T {
  constructor() {
    super(), pn(this, Ue), this._tableConfig = {
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
    ], this._tableItems = [], pn(this, le), this.consumeContext(v, (t) => {
      Co(this, le, t), Ci(this, Ue, bi).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return l`
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
bi = function() {
  mn(this, le) && this.observe(mn(this, le).items, (t) => Ci(this, Ue, fi).call(this, t), "umbCollectionItemsObserver");
};
fi = function(t) {
  this._tableItems = t.map((e) => {
    var n;
    return {
      id: e.unique,
      data: [
        {
          columnAlias: "url",
          value: l`<a href="${e.url}" target="_blank">${e.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: l`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
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
  p`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Be([
  r()
], U.prototype, "_tableConfig", 2);
Be([
  r()
], U.prototype, "_tableColumns", 2);
Be([
  r()
], U.prototype, "_tableItems", 2);
U = Be([
  m("content-audit-outbound-links-table-collection-view")
], U);
const bo = U, fo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return U;
  },
  default: bo
}, Symbol.toStringTag, { value: "Module" })), hn = "Umb.Workspace.ContentAudit.OutboundLinks", To = [
  {
    type: "workspace",
    kind: "default",
    alias: hn,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: pi,
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
      collectionAlias: Pt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: hn
      }
    ]
  }
], yo = [
  {
    type: "repository",
    alias: hi,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-D1DtEHL2.js")
  }
], Ao = [
  {
    type: "collectionView",
    alias: po,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => fo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: Pt
      }
    ]
  }
], vo = [
  {
    type: "collection",
    kind: "default",
    alias: Pt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-DJu1PE06.js"),
    meta: {
      repositoryAlias: hi
    }
  },
  ...yo,
  ...Ao
], Io = [
  ...To,
  ...mo,
  ...vo
], Ti = "inbound-links-root", go = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Ti,
    menus: [W]
  }
}, Oo = [go], Lt = "Umb.Collection.ContentAudit.InboundLinks", wo = "Umb.CollectionView.ContentAudit.InboundLinks.Table", yi = "Umb.Repository.ContentAuditInboundLinksCollection";
var Eo = Object.defineProperty, So = Object.getOwnPropertyDescriptor, Ai = (t) => {
  throw TypeError(t);
}, qe = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? So(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Eo(e, n, i), i;
}, Nt = (t, e, n) => e.has(t) || Ai("Cannot " + n), _n = (t, e, n) => (Nt(t, e, "read from private field"), e.get(t)), Cn = (t, e, n) => e.has(t) ? Ai("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), $o = (t, e, n, s) => (Nt(t, e, "write to private field"), e.set(t, n), n), vi = (t, e, n) => (Nt(t, e, "access private method"), n), re, Le, Ii, gi;
let L = class extends T {
  constructor() {
    super(), Cn(this, Le), this._tableConfig = {
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
    ], this._tableItems = [], Cn(this, re), this.consumeContext(v, (t) => {
      $o(this, re, t), vi(this, Le, Ii).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return l`
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
Ii = function() {
  _n(this, re) && this.observe(_n(this, re).items, (t) => vi(this, Le, gi).call(this, t), "umbCollectionItemsObserver");
};
gi = function(t) {
  this._tableItems = t.map((e) => {
    var n;
    return {
      id: e.unique,
      data: [
        {
          columnAlias: "url",
          value: l`<a href="${e.url}" target="_blank">${e.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: l`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
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
  p`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
qe([
  r()
], L.prototype, "_tableConfig", 2);
qe([
  r()
], L.prototype, "_tableColumns", 2);
qe([
  r()
], L.prototype, "_tableItems", 2);
L = qe([
  m("content-audit-inbound-links-table-collection-view")
], L);
const Po = L, Uo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return L;
  },
  default: Po
}, Symbol.toStringTag, { value: "Module" })), bn = "Umb.Workspace.ContentAudit.InboundLinks", Lo = [
  {
    type: "workspace",
    kind: "default",
    alias: bn,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: Ti,
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
      collectionAlias: Lt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: bn
      }
    ]
  }
], No = [
  {
    type: "repository",
    alias: yi,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-BcKlco7j.js")
  }
], ko = [
  {
    type: "collectionView",
    alias: wo,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => Uo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: Lt
      }
    ]
  }
], Ro = [
  {
    type: "collection",
    kind: "default",
    alias: Lt,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-BgFbFelw.js"),
    meta: {
      repositoryAlias: yi
    }
  },
  ...No,
  ...ko
], Do = [
  ...Lo,
  ...Oo,
  ...Ro
], Oi = "metadata-root", Vo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: Oi,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, Wo = [Vo], kt = "Umb.Collection.ContentAudit.Metadata", Mo = "Umb.CollectionView.ContentAudit.Metadata.Table", fn = "Umb.Workspace.ContentAudit.Metadata", xo = [
  {
    type: "workspace",
    kind: "default",
    alias: fn,
    name: "Metadata Root Workspace",
    meta: {
      entityType: Oi,
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
      collectionAlias: kt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: fn
      }
    ]
  }
], wi = "Umb.Repository.ContentAuditMetadataCollection", jo = [
  {
    type: "repository",
    alias: wi,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-BB35XLmW.js")
  }
], Bo = [
  {
    type: "collectionView",
    alias: Mo,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element-Chej_Gw1.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: kt
      }
    ]
  }
], qo = [
  {
    type: "collection",
    kind: "default",
    alias: kt,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: wi
    }
  },
  ...jo,
  ...Bo
], Go = [
  ...xo,
  ...Wo,
  ...qo
], zo = [], Rt = "Umb.Collection.ContentAudit.DuplicateContent", Yo = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", Ei = "Umb.Repository.ContentAuditDuplicateContentCollection";
var Ho = Object.defineProperty, Fo = Object.getOwnPropertyDescriptor, Ge = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Fo(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && Ho(e, n, i), i;
};
let N = class extends T {
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
      return l`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
N.styles = [
  p`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ge([
  r()
], N.prototype, "_tableConfig", 2);
Ge([
  r()
], N.prototype, "_tableColumns", 2);
Ge([
  r()
], N.prototype, "_tableItems", 2);
N = Ge([
  m("content-audit-duplicate-content-table-collection-view")
], N);
const Ko = N, Xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return N;
  },
  default: Ko
}, Symbol.toStringTag, { value: "Module" })), Jo = "duplicate-content-root", Tn = "Umb.Workspace.ContentAudit.DuplicateContent", Qo = [
  {
    type: "workspace",
    kind: "default",
    alias: Tn,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: Jo,
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
      collectionAlias: Rt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Tn
      }
    ]
  }
], Zo = [
  {
    type: "repository",
    alias: Ei,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-DkgoUeMz.js")
  }
], el = [
  {
    type: "collectionView",
    alias: Yo,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => Xo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: Rt
      }
    ]
  }
], tl = [
  {
    type: "collection",
    kind: "default",
    alias: Rt,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-DTbM7jcX.js"),
    meta: {
      repositoryAlias: Ei
    }
  },
  ...Zo,
  ...el
], nl = [
  ...Qo,
  ...zo,
  ...tl
], Si = "carbon-rating-root", il = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: Si,
    menus: [ke]
  }
}, sl = [il], Dt = "Umb.Collection.ContentAudit.CarbonRating", al = "Umb.CollectionView.ContentAudit.CarbonRating.Table", $i = "Umb.Repository.ContentAuditCarbonRatingCollection";
var ol = Object.defineProperty, ll = Object.getOwnPropertyDescriptor, Pi = (t) => {
  throw TypeError(t);
}, ze = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? ll(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && ol(e, n, i), i;
}, Vt = (t, e, n) => e.has(t) || Pi("Cannot " + n), mt = (t, e, n) => (Vt(t, e, "read from private field"), e.get(t)), tt = (t, e, n) => e.has(t) ? Pi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ui = (t, e, n, s) => (Vt(t, e, "write to private field"), e.set(t, n), n), Wt = (t, e, n) => (Vt(t, e, "access private method"), n), ce, Ye, ue, Li, Ni, ki;
let k = class extends T {
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
    ], this._tableItems = [], tt(this, ce), tt(this, Ye), this.consumeContext(v, (t) => {
      Ui(this, ce, t);
    }), Wt(this, ue, Li).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return l`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ce = /* @__PURE__ */ new WeakMap();
Ye = /* @__PURE__ */ new WeakMap();
ue = /* @__PURE__ */ new WeakSet();
Li = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ui(this, Ye, t), Wt(this, ue, Ni).call(this);
  });
};
Ni = function() {
  mt(this, ce) && this.observe(mt(this, ce).items, (t) => Wt(this, ue, ki).call(this, t), "umbCollectionItemsObserver");
};
ki = function(t) {
  const e = mt(this, Ye);
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
          value: l`<a href=${s}>${(i = n.pageData) == null ? void 0 : i.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (a = n.technicalSeoData) == null ? void 0 : a.contentType
        },
        {
          columnAlias: "pageSize",
          value: l`${Math.round(((o = n.performanceData) == null ? void 0 : o.totalBytes) / 1024)}KB`
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
  p`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ze([
  r()
], k.prototype, "_tableConfig", 2);
ze([
  r()
], k.prototype, "_tableColumns", 2);
ze([
  r()
], k.prototype, "_tableItems", 2);
k = ze([
  m("content-audit-carbon-rating-table-collection-view")
], k);
const rl = k, cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return k;
  },
  default: rl
}, Symbol.toStringTag, { value: "Module" })), yn = "Umb.Workspace.ContentAudit.CarbonRating", ul = [
  {
    type: "workspace",
    kind: "default",
    alias: yn,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: Si,
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
      collectionAlias: Dt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: yn
      }
    ]
  }
], dl = [
  {
    type: "repository",
    alias: $i,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository-CT_8jPWj.js")
  }
], ml = [
  {
    type: "collectionView",
    alias: al,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => cl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: Dt
      }
    ]
  }
], pl = [
  {
    type: "collection",
    kind: "default",
    alias: Dt,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element-CTFE9xYN.js"),
    meta: {
      repositoryAlias: $i
    }
  },
  ...dl,
  ...ml
], hl = [
  ...ul,
  ...sl,
  ...pl
], Ri = "core-web-vitals-root", _l = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: Ri,
    menus: [ke]
  }
}, Cl = [_l], Mt = "Umb.Collection.ContentAudit.CoreWebVitals", bl = "Umb.CollectionView.ContentAudit.CoreWebVitals.Table", Di = "Umb.Repository.ContentAuditCoreWebVitalsCollection";
var fl = Object.defineProperty, Tl = Object.getOwnPropertyDescriptor, Vi = (t) => {
  throw TypeError(t);
}, He = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Tl(e, n) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (s ? o(e, n, i) : o(i)) || i);
  return s && i && fl(e, n, i), i;
}, xt = (t, e, n) => e.has(t) || Vi("Cannot " + n), pt = (t, e, n) => (xt(t, e, "read from private field"), e.get(t)), nt = (t, e, n) => e.has(t) ? Vi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Wi = (t, e, n, s) => (xt(t, e, "write to private field"), e.set(t, n), n), jt = (t, e, n) => (xt(t, e, "access private method"), n), de, Fe, me, Mi, xi, ji;
let R = class extends T {
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
    ], this._tableItems = [], nt(this, de), nt(this, Fe), this.consumeContext(v, (t) => {
      Wi(this, de, t);
    }), jt(this, me, Mi).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return l`
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
Mi = function() {
  new Te(this, be).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Wi(this, Fe, t), jt(this, me, xi).call(this);
  });
};
xi = function() {
  pt(this, de) && this.observe(pt(this, de).items, (t) => jt(this, me, ji).call(this, t), "umbCollectionItemsObserver");
};
ji = function(t) {
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
          value: l`<a href=${s}>${(i = n.pageData) == null ? void 0 : i.url}</a>`
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
  p`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
He([
  r()
], R.prototype, "_tableConfig", 2);
He([
  r()
], R.prototype, "_tableColumns", 2);
He([
  r()
], R.prototype, "_tableItems", 2);
R = He([
  m("content-audit-core-web-vitals-table-collection-view")
], R);
const yl = R, Al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return R;
  },
  default: yl
}, Symbol.toStringTag, { value: "Module" })), An = "Umb.Workspace.ContentAudit.CoreWebVitals", vl = [
  {
    type: "workspace",
    kind: "default",
    alias: An,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: Ri,
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
      collectionAlias: Mt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: An
      }
    ]
  }
], Il = [
  {
    type: "repository",
    alias: Di,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository-CH3uquR2.js")
  }
], gl = [
  {
    type: "collectionView",
    alias: bl,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => Al),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: Mt
      }
    ]
  }
], Ol = [
  {
    type: "collection",
    kind: "default",
    alias: Mt,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element-Dk38PXrp.js"),
    meta: {
      repositoryAlias: Di
    }
  },
  ...Il,
  ...gl
], wl = [
  ...vl,
  ...Cl,
  ...Ol
], Q = "Umb.Section.ContentAudit", El = {
  type: "section",
  alias: Q,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Sl = {
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
      match: Q
    }
  ]
}, $l = [
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
  }
], Pl = [
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
        match: Q
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
        match: Q
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
        match: Q
      }
    ]
  }
], Ul = [
  El,
  Sl,
  ...$l,
  ...Pl,
  ...ha,
  ...Ea,
  ...Ma,
  ...Ja,
  ...co,
  ...Io,
  ...Do,
  ...Go,
  ...nl,
  ...hl,
  ...wl
], Ll = {
  type: "workspace",
  alias: Ee,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Ms),
  meta: {
    entityType: Un
  }
}, Nl = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-0TEsSfGX.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ee
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-Dsz-9toV.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ee
      }
    ]
  }
], kl = [
  Ll,
  ...Nl
], Rl = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-6Knxqvtw.js")
  }
], Dl = [
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
], Vl = {
  type: "workspaceView",
  alias: "Umbraco.Community.ContentAudit.Workspace",
  name: "ContentAudit Workspace",
  js: () => import("./contentaudit-workspace-view-BXzM2n94.js"),
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
}, Wl = [Vl], Ml = {
  type: "globalContext",
  alias: ys,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => gs)
}, ar = async (t, e) => {
  e.registerMany([
    Ml,
    ...Ul,
    ...kl,
    ...Rl,
    ...Dl,
    ...Wl
  ]), t.consumeContext(Gi, async (n) => {
    if (!n) return;
    const s = n.getOpenApiConfiguration();
    d.BASE = s.base, d.TOKEN = s.token, d.WITH_CREDENTIALS = s.withCredentials, d.CREDENTIALS = s.credentials;
  });
};
export {
  K as A,
  js as B,
  Ln as C,
  A as D,
  Ki as I,
  tr as U,
  M as a,
  rn as b,
  ge as c,
  Oe as d,
  it as e,
  kn as f,
  st as g,
  we as h,
  nr as i,
  ir as j,
  Xi as k,
  ot as l,
  Se as m,
  Ee as n,
  ar as o,
  ys as p,
  Un as q,
  W as r,
  Ne as s,
  Os as t,
  lt as u,
  ke as v,
  Ct as w,
  xs as x,
  Rn as y,
  en as z
};
//# sourceMappingURL=index-BW3lOCKc.js.map
