var jt = (e) => {
  throw TypeError(e);
};
var qt = (e, t, s) => t.has(e) || jt("Cannot " + s);
var r = (e, t, s) => (qt(e, t, "read from private field"), s ? s.call(e) : t.get(e)), p = (e, t, s) => t.has(e) ? jt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), h = (e, t, s, n) => (qt(e, t, "write to private field"), n ? n.call(e, s) : t.set(e, s), s);
import { UMB_AUTH_CONTEXT as Je } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as ut } from "@umbraco-cms/backoffice/element-api";
import { LitElement as dt, html as c, css as w, property as pt, customElement as E, nothing as Qe, state as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as pe } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as Ze } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as ts } from "@umbraco-cms/backoffice/workspace";
import { tryExecuteAndNotify as I } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Ct, UmbArrayState as Ht } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as es } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as Y, UMB_COLLECTION_ALIAS_CONDITION as F } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as K } from "@umbraco-cms/backoffice/lit-element";
const ss = [
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
], ns = [
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
var is = Object.defineProperty, os = Object.getOwnPropertyDescriptor, he = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? os(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && is(t, s, i), i;
};
let et = class extends ut(dt) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const e = ss[this.type - 1];
      return c`
                <uui-tag color=${e.color}>
                    <uui-icon name="${e.icon}"></uui-icon>
                    ${e.label}
                </uui-tag>
            `;
    }
  }
};
et.styles = [
  w`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
he([
  pt({ attribute: !1 })
], et.prototype, "type", 2);
et = he([
  E("content-audit-issue-type-label")
], et);
var as = Object.defineProperty, rs = Object.getOwnPropertyDescriptor, me = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? rs(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && as(t, s, i), i;
};
let st = class extends ut(dt) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const e = ns[this.type - 1];
      return c`
                <uui-tag color=${e.color}>
                    <uui-icon name="${e.icon}"></uui-icon>
                    ${e.label}
                </uui-tag>
            `;
    }
  }
};
st.styles = [
  w`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
me([
  pt({ attribute: !1 })
], st.prototype, "type", 2);
st = me([
  E("content-audit-priority-type-label")
], st);
var ls = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, _e = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? cs(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && ls(t, s, i), i;
};
let At = class extends ut(dt) {
  _getColor(e) {
    return e >= 200 && e < 300 ? "positive" : e >= 300 && e < 400 ? "warning" : e >= 400 && e < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? c`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : Qe;
  }
};
_e([
  pt({ attribute: !1 })
], At.prototype, "statusCode", 2);
At = _e([
  E("content-audit-status-code-label")
], At);
class Oi extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class Ei extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class wi extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const nt = "Umb.Workspace.ContentAudit", us = "Umb.Context.ContentAudit", fe = "content-audit";
class Bt extends Error {
  constructor(t, s, n) {
    super(n), this.name = "ApiError", this.url = s.url, this.status = s.status, this.statusText = s.statusText, this.body = s.body, this.request = t;
  }
}
class ds extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class ps {
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new ds("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class zt {
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
    request: new zt(),
    response: new zt()
  }
}, X = (e) => typeof e == "string", yt = (e) => X(e) && e !== "", Ot = (e) => e instanceof Blob, be = (e) => e instanceof FormData, hs = (e) => {
  try {
    return btoa(e);
  } catch {
    return Buffer.from(e).toString("base64");
  }
}, ms = (e) => {
  const t = [], s = (i, o) => {
    t.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(o))}`);
  }, n = (i, o) => {
    o != null && (o instanceof Date ? s(i, o.toISOString()) : Array.isArray(o) ? o.forEach((a) => n(i, a)) : typeof o == "object" ? Object.entries(o).forEach(([a, l]) => n(`${i}[${a}]`, l)) : s(i, o));
  };
  return Object.entries(e).forEach(([i, o]) => n(i, o)), t.length ? `?${t.join("&")}` : "";
}, _s = (e, t) => {
  const s = encodeURI, n = t.url.replace("{api-version}", e.VERSION).replace(/{(.*?)}/g, (o, a) => {
    var l;
    return (l = t.path) != null && l.hasOwnProperty(a) ? s(String(t.path[a])) : o;
  }), i = e.BASE + n;
  return t.query ? i + ms(t.query) : i;
}, fs = (e) => {
  if (e.formData) {
    const t = new FormData(), s = (n, i) => {
      X(i) || Ot(i) ? t.append(n, i) : t.append(n, JSON.stringify(i));
    };
    return Object.entries(e.formData).filter(([, n]) => n != null).forEach(([n, i]) => {
      Array.isArray(i) ? i.forEach((o) => s(n, o)) : s(n, i);
    }), t;
  }
}, Z = async (e, t) => typeof t == "function" ? t(e) : t, bs = async (e, t) => {
  const [s, n, i, o] = await Promise.all([
    // @ts-ignore
    Z(t, e.TOKEN),
    // @ts-ignore
    Z(t, e.USERNAME),
    // @ts-ignore
    Z(t, e.PASSWORD),
    // @ts-ignore
    Z(t, e.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([, l]) => l != null).reduce((l, [C, m]) => ({
    ...l,
    [C]: String(m)
  }), {});
  if (yt(s) && (a.Authorization = `Bearer ${s}`), yt(n) && yt(i)) {
    const l = hs(`${n}:${i}`);
    a.Authorization = `Basic ${l}`;
  }
  return t.body !== void 0 && (t.mediaType ? a["Content-Type"] = t.mediaType : Ot(t.body) ? a["Content-Type"] = t.body.type || "application/octet-stream" : X(t.body) ? a["Content-Type"] = "text/plain" : be(t.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, Cs = (e) => {
  var t, s;
  if (e.body !== void 0)
    return (t = e.mediaType) != null && t.includes("application/json") || (s = e.mediaType) != null && s.includes("+json") ? JSON.stringify(e.body) : X(e.body) || Ot(e.body) || be(e.body) ? e.body : JSON.stringify(e.body);
}, ys = async (e, t, s, n, i, o, a) => {
  const l = new AbortController();
  let C = {
    headers: o,
    body: n ?? i,
    method: t.method,
    signal: l.signal
  };
  e.WITH_CREDENTIALS && (C.credentials = e.CREDENTIALS);
  for (const m of e.interceptors.request._fns)
    C = await m(C);
  return a(() => l.abort()), await fetch(s, C);
}, Ts = (e, t) => {
  if (t) {
    const s = e.headers.get(t);
    if (X(s))
      return s;
  }
}, As = async (e) => {
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
}, gs = (e, t) => {
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
    throw new Bt(e, t, n);
  if (!t.ok) {
    const i = t.status ?? "unknown", o = t.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Bt(
      e,
      t,
      `Generic Error: status: ${i}; status text: ${o}; body: ${a}`
    );
  }
}, _ = (e, t) => new ps(async (s, n, i) => {
  try {
    const o = _s(e, t), a = fs(t), l = Cs(t), C = await bs(e, t);
    if (!i.isCancelled) {
      let m = await ys(e, t, o, l, a, C, i);
      for (const Xe of e.interceptors.response._fns)
        m = await Xe(m);
      const Mt = await As(m), Ke = Ts(m, t.responseHeader);
      let Vt = Mt;
      t.responseTransformer && m.ok && (Vt = await t.responseTransformer(Mt));
      const Wt = {
        url: o,
        ok: m.ok,
        status: m.status,
        statusText: m.statusText,
        body: Ke ?? Vt
      };
      gs(t, Wt), s(Wt.body);
    }
  } catch (o) {
    n(o);
  }
});
class R {
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
   * @returns unknown OK
   * @throws ApiError
   */
  static getDuplicateContentUrls() {
    return _(d, {
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
   * @returns unknown OK
   * @throws ApiError
   */
  static getPagesWithMissingMetadata() {
    return _(d, {
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
class vs {
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
var y;
class Ss {
  constructor(t) {
    p(this, y);
    h(this, y, t);
  }
  async getLatestAuditOverview() {
    return await I(r(this, y), R.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await I(r(this, y), R.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await I(r(this, y), R.getAllIssues({ skip: 0, take: 5 }));
  }
  async getHealthScore() {
    return await I(r(this, y), R.getHealthScore());
  }
}
y = new WeakMap();
var H;
class Os {
  constructor(t) {
    p(this, H);
    h(this, H, t);
  }
  async getSettings() {
    return await I(r(this, H), vs.getSettings());
  }
}
H = new WeakMap();
var T, B;
class Es extends pe {
  constructor(s) {
    super(s);
    p(this, T);
    p(this, B);
    h(this, T, new Ss(this)), h(this, B, new Os(this));
  }
  async getLatestAuditOverview() {
    return r(this, T).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return r(this, T).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return r(this, T).getTopIssues();
  }
  async getHealthScore() {
    return r(this, T).getHealthScore();
  }
  async getSettings() {
    return r(this, B).getSettings();
  }
}
T = new WeakMap(), B = new WeakMap();
var f, $, P, U, L, N;
class gt extends pe {
  constructor(s) {
    super(s);
    p(this, f);
    p(this, $);
    p(this, P);
    p(this, U);
    p(this, L);
    p(this, N);
    this.workspaceAlias = nt, h(this, $, new Ct(void 0)), this.latestAuditOverview = r(this, $).asObservable(), h(this, P, new Ht([], (n) => n.id)), this.pagesWithMissingMetadata = r(this, P).asObservable(), h(this, U, new Ht([], (n) => n.name)), this.topIssues = r(this, U).asObservable(), h(this, L, new Ct(void 0)), this.healthScore = r(this, L).asObservable(), h(this, N, new Ct(void 0)), this.settings = r(this, N).asObservable(), this.provideContext(ts, this), this.provideContext(Ce, this), h(this, f, new Es(this));
  }
  getEntityType() {
    return fe;
  }
  async getLatestAuditOverview() {
    const { data: s } = await r(this, f).getLatestAuditOverview();
    s && r(this, $).setValue(s);
  }
  async getPagesWithMissingMetadata() {
    const { data: s } = await r(this, f).getPagesWithMissingMetadata();
    s && r(this, P).setValue(s);
  }
  async getTopIssues() {
    const { data: s } = await r(this, f).getTopIssues();
    s && r(this, U).setValue(s.items);
  }
  async getHealthScore() {
    const { data: s } = await r(this, f).getHealthScore();
    s && r(this, L).setValue(s);
  }
  async getSettings() {
    const { data: s } = await r(this, f).getSettings();
    s && r(this, N).setValue(s);
  }
}
f = new WeakMap(), $ = new WeakMap(), P = new WeakMap(), U = new WeakMap(), L = new WeakMap(), N = new WeakMap();
const Ce = new Ze(
  "ContentAuditContext"
), ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: Ce,
  ContentAuditContext: gt,
  default: gt
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Is = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis, Et = tt.ShadowRoot && (tt.ShadyCSS === void 0 || tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ye = Symbol(), Gt = /* @__PURE__ */ new WeakMap();
let $s = class {
  constructor(t, s, n) {
    if (this._$cssResult$ = !0, n !== ye) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Et && t === void 0) {
      const n = s !== void 0 && s.length === 1;
      n && (t = Gt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Gt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ps = (e) => new $s(typeof e == "string" ? e : e + "", void 0, ye), Us = (e, t) => {
  if (Et) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const n = document.createElement("style"), i = tt.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = s.cssText, e.appendChild(n);
  }
}, Yt = Et ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const n of t.cssRules) s += n.cssText;
  return Ps(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ls, defineProperty: Ns, getOwnPropertyDescriptor: ks, getOwnPropertyNames: Rs, getOwnPropertySymbols: xs, getPrototypeOf: Ds } = Object, A = globalThis, Ft = A.trustedTypes, Ms = Ft ? Ft.emptyScript : "", Tt = A.reactiveElementPolyfillSupport, x = (e, t) => e, vt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ms : null;
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
} }, Te = (e, t) => !Ls(e, t), Kt = { attribute: !0, type: String, converter: vt, reflect: !1, hasChanged: Te };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class k extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Kt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, s);
      i !== void 0 && Ns(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, n) {
    const { get: i, set: o } = ks(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Kt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = Ds(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const s = this.properties, n = [...Rs(s), ...xs(s)];
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
      for (const i of n) s.unshift(Yt(i));
    } else t !== void 0 && s.push(Yt(t));
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
    return Us(t, this.constructor.elementStyles), t;
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
      if (n ?? (n = this.constructor.getPropertyOptions(t)), !(n.hasChanged ?? Te)(this[t], s)) return;
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
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[x("elementProperties")] = /* @__PURE__ */ new Map(), k[x("finalized")] = /* @__PURE__ */ new Map(), Tt == null || Tt({ ReactiveElement: k }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.0.4");
var Vs = Object.defineProperty, Ws = Object.getOwnPropertyDescriptor, js = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? Ws(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && Vs(t, s, i), i;
};
let it = class extends ut(dt) {
  constructor() {
    super(), this._workspaceContext = new gt(this);
  }
  render() {
    return c`
			<umb-workspace-editor headline="Audit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
it = js([
  Is("content-audit-workspace-root")
], it);
const qs = it, Hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return it;
  },
  default: qs
}, Symbol.toStringTag, { value: "Module" })), ht = "Umb.Menu.ContentAudit", J = "Umb.Menu.ContentMetadata", wt = "Umb.Collection.ContentAudit.Issues", Bs = "Umb.CollectionView.ContentAudit.Issues.Table", Ae = "Umb.Repository.ContentAuditIssuesCollection";
var z;
class zs {
  constructor(t) {
    p(this, z);
    h(this, z, t);
  }
  async getCollection(t) {
    const { data: s, error: n } = await I(r(this, z), R.getAllIssues(t));
    if (n)
      return { error: n };
    if (!s)
      return { data: { items: [], total: 0 } };
    const { items: i, total: o } = s;
    return { data: { items: i, total: o } };
  }
}
z = new WeakMap();
var G;
class Xt extends es {
  constructor(s) {
    super(s);
    p(this, G);
    h(this, G, new zs(s));
  }
  async requestCollection(s) {
    return r(this, G).getCollection(s);
  }
}
G = new WeakMap();
const Gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: Xt,
  default: Xt
}, Symbol.toStringTag, { value: "Module" }));
var Ys = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, ge = (e) => {
  throw TypeError(e);
}, Q = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? Fs(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && Ys(t, s, i), i;
}, It = (e, t, s) => t.has(e) || ge("Cannot " + s), Jt = (e, t, s) => (It(e, t, "read from private field"), t.get(e)), Qt = (e, t, s) => t.has(e) ? ge("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), Ks = (e, t, s, n) => (It(e, t, "write to private field"), t.set(e, s), s), St = (e, t, s) => (It(e, t, "access private method"), s), M, D, ve, $t;
let b = class extends K {
  constructor() {
    super(), Qt(this, D), this.data = [], this._tableConfig = {
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
    ], this._tableItems = [], Qt(this, M), this.consumeContext(Y, (e) => {
      Ks(this, M, e), St(this, D, ve).call(this);
    });
  }
  updated(e) {
    e.has("data") && this.data.length !== 0 && St(this, D, $t).call(this, this.data);
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
M = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakSet();
ve = function() {
  Jt(this, M) && this.observe(Jt(this, M).items, (e) => St(this, D, $t).call(this, e), "umbCollectionItemsObserver");
};
$t = function(e) {
  this._tableItems = e.map((t) => ({
    id: t.unique,
    entityType: "issue-type",
    icon: "icon-alert",
    data: [
      {
        columnAlias: "name",
        value: c`<strong>${t.category}: ${t.name}</strong><br/>${t.description}`
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
b.styles = [
  w`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Q([
  pt({ type: Array, attribute: !1 })
], b.prototype, "data", 2);
Q([
  u()
], b.prototype, "_tableConfig", 2);
Q([
  u()
], b.prototype, "_tableColumns", 2);
Q([
  u()
], b.prototype, "_tableItems", 2);
b = Q([
  E("content-audit-issues-table-collection-view")
], b);
const Xs = b, Js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return b;
  },
  default: Xs
}, Symbol.toStringTag, { value: "Module" })), Se = "issues-root", Qs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: Se,
    menus: [ht]
  }
}, Zs = [Qs], Zt = "Umb.Workspace.ContentAudit.Issues", tn = [
  {
    type: "workspace",
    kind: "default",
    alias: Zt,
    name: "Issues Root Workspace",
    meta: {
      entityType: Se,
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
        match: Zt
      }
    ]
  }
], en = [
  {
    type: "repository",
    alias: Ae,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => Gs)
  }
], sn = [
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
        alias: F,
        match: wt
      }
    ]
  }
], nn = [
  {
    type: "collection",
    kind: "default",
    alias: wt,
    name: "Issues Collection",
    element: () => import("./issues.element-VH8WvbHX.js"),
    meta: {
      repositoryAlias: Ae
    }
  },
  ...en,
  ...sn
], on = [
  ...tn,
  ...Zs,
  ...nn
], Oe = "status-codes-root", an = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: Oe,
    menus: [ht]
  }
}, rn = [an], Pt = "Umb.Collection.ContentAudit.StatusCodes", ln = "Umb.CollectionView.ContentAudit.StatusCodes.Table", Ee = "Umb.Repository.ContentAuditStatusCodesCollection";
var cn = Object.defineProperty, un = Object.getOwnPropertyDescriptor, we = (e) => {
  throw TypeError(e);
}, mt = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? un(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && cn(t, s, i), i;
}, Ut = (e, t, s) => t.has(e) || we("Cannot " + s), te = (e, t, s) => (Ut(e, t, "read from private field"), t.get(e)), ee = (e, t, s) => t.has(e) ? we("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), dn = (e, t, s, n) => (Ut(e, t, "write to private field"), t.set(e, s), s), Ie = (e, t, s) => (Ut(e, t, "access private method"), s), V, ot, $e, Pe;
let g = class extends K {
  constructor() {
    super(), ee(this, ot), this._tableConfig = {
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
    ], this._tableItems = [], ee(this, V), this.consumeContext(Y, (e) => {
      dn(this, V, e), Ie(this, ot, $e).call(this);
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
ot = /* @__PURE__ */ new WeakSet();
$e = function() {
  te(this, V) && this.observe(te(this, V).items, (e) => Ie(this, ot, Pe).call(this, e), "umbCollectionItemsObserver");
};
Pe = function(e) {
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
g.styles = [
  w`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
mt([
  u()
], g.prototype, "_tableConfig", 2);
mt([
  u()
], g.prototype, "_tableColumns", 2);
mt([
  u()
], g.prototype, "_tableItems", 2);
g = mt([
  E("content-audit-status-codes-table-collection-view")
], g);
const pn = g, hn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return g;
  },
  default: pn
}, Symbol.toStringTag, { value: "Module" })), se = "Umb.Workspace.ContentAudit.StatusCodes", mn = [
  {
    type: "workspace",
    kind: "default",
    alias: se,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: Oe,
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
        match: se
      }
    ]
  }
], _n = [
  {
    type: "repository",
    alias: Ee,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-BPbOF3BW.js")
  }
], fn = [
  {
    type: "collectionView",
    alias: ln,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => hn),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: F,
        match: Pt
      }
    ]
  }
], bn = [
  {
    type: "collection",
    kind: "default",
    alias: Pt,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-BcFO_vK8.js"),
    meta: {
      repositoryAlias: Ee
    }
  },
  ..._n,
  ...fn
], Cn = [
  ...mn,
  ...rn,
  ...bn
], Ue = "orphaned-pages-root", yn = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 2e3,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: Ue,
    menus: [J]
  }
}, Tn = [yn], Lt = "Umb.Collection.ContentAudit.OrphanedPages", An = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", Le = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var gn = Object.defineProperty, vn = Object.getOwnPropertyDescriptor, Ne = (e) => {
  throw TypeError(e);
}, _t = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? vn(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && gn(t, s, i), i;
}, Nt = (e, t, s) => t.has(e) || Ne("Cannot " + s), ne = (e, t, s) => (Nt(e, t, "read from private field"), t.get(e)), ie = (e, t, s) => t.has(e) ? Ne("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), Sn = (e, t, s, n) => (Nt(e, t, "write to private field"), t.set(e, s), s), ke = (e, t, s) => (Nt(e, t, "access private method"), s), W, at, Re, xe;
let v = class extends K {
  constructor() {
    super(), ie(this, at), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], ie(this, W), this.consumeContext(Y, (e) => {
      Sn(this, W, e), ke(this, at, Re).call(this);
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
W = /* @__PURE__ */ new WeakMap();
at = /* @__PURE__ */ new WeakSet();
Re = function() {
  ne(this, W) && this.observe(ne(this, W).items, (e) => ke(this, at, xe).call(this, e), "umbCollectionItemsObserver");
};
xe = function(e) {
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
  w`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
_t([
  u()
], v.prototype, "_tableConfig", 2);
_t([
  u()
], v.prototype, "_tableColumns", 2);
_t([
  u()
], v.prototype, "_tableItems", 2);
v = _t([
  E("content-audit-orphaned-pages-table-collection-view")
], v);
const On = v, En = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return v;
  },
  default: On
}, Symbol.toStringTag, { value: "Module" })), oe = "Umb.Workspace.ContentAudit.OrphanedPages", wn = [
  {
    type: "workspace",
    kind: "default",
    alias: oe,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: Ue,
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
        match: oe
      }
    ]
  }
], In = [
  {
    type: "repository",
    alias: Le,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-DtXWdkSW.js")
  }
], $n = [
  {
    type: "collectionView",
    alias: An,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => En),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: F,
        match: Lt
      }
    ]
  }
], Pn = [
  {
    type: "collection",
    kind: "default",
    alias: Lt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-CR408Pgy.js"),
    meta: {
      repositoryAlias: Le
    }
  },
  ...In,
  ...$n
], Un = [
  ...wn,
  ...Tn,
  ...Pn
], De = "images-alt-text-root", Ln = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: De,
    menus: [J]
  }
}, Nn = [Ln], kt = "Umb.Collection.ContentAudit.ImagesAltText", kn = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", Me = "Umb.Repository.ContentAuditImagesAltTextCollection";
var Rn = Object.defineProperty, xn = Object.getOwnPropertyDescriptor, Ve = (e) => {
  throw TypeError(e);
}, ft = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? xn(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && Rn(t, s, i), i;
}, Rt = (e, t, s) => t.has(e) || Ve("Cannot " + s), ae = (e, t, s) => (Rt(e, t, "read from private field"), t.get(e)), re = (e, t, s) => t.has(e) ? Ve("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), Dn = (e, t, s, n) => (Rt(e, t, "write to private field"), t.set(e, s), s), We = (e, t, s) => (Rt(e, t, "access private method"), s), j, rt, je, qe;
let S = class extends K {
  constructor() {
    super(), re(this, rt), this._tableConfig = {
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
    ], this._tableItems = [], re(this, j), this.consumeContext(Y, (e) => {
      Dn(this, j, e), We(this, rt, je).call(this);
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
rt = /* @__PURE__ */ new WeakSet();
je = function() {
  ae(this, j) && this.observe(ae(this, j).items, (e) => We(this, rt, qe).call(this, e), "umbCollectionItemsObserver");
};
qe = function(e) {
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
S.styles = [
  w`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ft([
  u()
], S.prototype, "_tableConfig", 2);
ft([
  u()
], S.prototype, "_tableColumns", 2);
ft([
  u()
], S.prototype, "_tableItems", 2);
S = ft([
  E("content-audit-images-alt-text-table-collection-view")
], S);
const Mn = S, Vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return S;
  },
  default: Mn
}, Symbol.toStringTag, { value: "Module" })), le = "Umb.Workspace.ContentAudit.ImagesAltText", Wn = [
  {
    type: "workspace",
    kind: "default",
    alias: le,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: De,
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
      collectionAlias: kt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: le
      }
    ]
  }
], jn = [
  {
    type: "repository",
    alias: Me,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-cUsxVbYI.js")
  }
], qn = [
  {
    type: "collectionView",
    alias: kn,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Vn),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: F,
        match: kt
      }
    ]
  }
], Hn = [
  {
    type: "collection",
    kind: "default",
    alias: kt,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DXPv56cV.js"),
    meta: {
      repositoryAlias: Me
    }
  },
  ...jn,
  ...qn
], Bn = [
  ...Wn,
  ...Nn,
  ...Hn
], He = "outbound-links-root", zn = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-fullscreen",
    entityType: He,
    menus: [J]
  }
}, Gn = [zn], xt = "Umb.Collection.ContentAudit.OutboundLinks", Yn = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", Be = "Umb.Repository.ContentAuditOutboundLinksCollection";
var Fn = Object.defineProperty, Kn = Object.getOwnPropertyDescriptor, ze = (e) => {
  throw TypeError(e);
}, bt = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? Kn(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, s, i) : a(i)) || i);
  return n && i && Fn(t, s, i), i;
}, Dt = (e, t, s) => t.has(e) || ze("Cannot " + s), ce = (e, t, s) => (Dt(e, t, "read from private field"), t.get(e)), ue = (e, t, s) => t.has(e) ? ze("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), Xn = (e, t, s, n) => (Dt(e, t, "write to private field"), t.set(e, s), s), Ge = (e, t, s) => (Dt(e, t, "access private method"), s), q, lt, Ye, Fe;
let O = class extends K {
  constructor() {
    super(), ue(this, lt), this._tableConfig = {
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
    ], this._tableItems = [], ue(this, q), this.consumeContext(Y, (e) => {
      Xn(this, q, e), Ge(this, lt, Ye).call(this);
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
lt = /* @__PURE__ */ new WeakSet();
Ye = function() {
  ce(this, q) && this.observe(ce(this, q).items, (e) => Ge(this, lt, Fe).call(this, e), "umbCollectionItemsObserver");
};
Fe = function(e) {
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
O.styles = [
  w`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
bt([
  u()
], O.prototype, "_tableConfig", 2);
bt([
  u()
], O.prototype, "_tableColumns", 2);
bt([
  u()
], O.prototype, "_tableItems", 2);
O = bt([
  E("content-audit-outbound-links-table-collection-view")
], O);
const Jn = O, Qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return O;
  },
  default: Jn
}, Symbol.toStringTag, { value: "Module" })), de = "Umb.Workspace.ContentAudit.OutboundLinks", Zn = [
  {
    type: "workspace",
    kind: "default",
    alias: de,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: He,
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
      collectionAlias: xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: de
      }
    ]
  }
], ti = [
  {
    type: "repository",
    alias: Be,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-Cc1mWK65.js")
  }
], ei = [
  {
    type: "collectionView",
    alias: Yn,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => Qn),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: F,
        match: xt
      }
    ]
  }
], si = [
  {
    type: "collection",
    kind: "default",
    alias: xt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-5JNyTazK.js"),
    meta: {
      repositoryAlias: Be
    }
  },
  ...ti,
  ...ei
], ni = [
  ...Zn,
  ...Gn,
  ...si
], ct = "Umb.Section.ContentAudit", ii = {
  type: "section",
  alias: ct,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, oi = {
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
      match: ct
    }
  ]
}, ai = [
  {
    type: "menu",
    alias: ht,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: J,
    name: "Content Menu"
  }
], ri = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: ht
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: ct
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
      menu: J
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: ct
      }
    ]
  }
], li = [
  ii,
  oi,
  ...ai,
  ...ri,
  ...on,
  ...Cn,
  ...Un,
  ...Bn,
  ...ni
], ci = {
  type: "workspace",
  alias: nt,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Hs),
  meta: {
    entityType: fe
  }
}, ui = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-SF54Ezhu.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: nt
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-nA3rBw4m.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: nt
      }
    ]
  }
], di = [
  ci,
  ...ui
], pi = {
  type: "globalContext",
  alias: us,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => ws)
}, $i = async (e, t) => {
  t.registerMany([
    pi,
    ...li,
    ...di
  ]), e.consumeContext(Je, async (s) => {
    if (!s) return;
    const n = s.getOpenApiConfiguration();
    d.BASE = n.base, d.TOKEN = n.token, d.WITH_CREDENTIALS = n.withCredentials, d.CREDENTIALS = n.credentials;
  });
};
export {
  R as A,
  Ce as C,
  ss as I,
  Oi as U,
  et as a,
  st as b,
  At as c,
  Ei as d,
  wi as e,
  ns as f,
  gt as g,
  it as h,
  nt as i,
  us as j,
  fe as k,
  ht as l,
  J as m,
  wt as n,
  $i as o,
  Bs as p,
  Ae as q,
  Xt as r,
  zs as s,
  b as t
};
//# sourceMappingURL=index-CuyXz4G1.js.map
