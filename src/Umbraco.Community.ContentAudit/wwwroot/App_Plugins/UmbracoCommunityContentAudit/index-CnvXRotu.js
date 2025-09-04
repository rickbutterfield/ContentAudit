var Ja = Object.defineProperty;
var Kt = (t) => {
  throw TypeError(t);
};
var Qa = (t, e, n) => e in t ? Ja(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Ht = (t, e, n) => Qa(t, typeof e != "symbol" ? e + "" : e, n), Ft = (t, e, n) => e.has(t) || Kt("Cannot " + n);
var u = (t, e, n) => (Ft(t, e, "read from private field"), n ? n.call(t) : e.get(t)), _ = (t, e, n) => e.has(t) ? Kt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), C = (t, e, n, i) => (Ft(t, e, "write to private field"), i ? i.call(t, n) : e.set(t, n), n);
import { UMB_AUTH_CONTEXT as Za } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as H } from "@umbraco-cms/backoffice/element-api";
import { LitElement as W, html as r, css as h, property as V, customElement as d, nothing as wn, state as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as On } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as ei } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as ti, UMB_WORKSPACE_CONDITION_ALIAS as j, UMB_WORKSPACE_MODAL as Te } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as Z, tryExecuteAndNotify as ni } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as et, UmbArrayState as Xt } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as ai } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as g, UMB_COLLECTION_ALIAS_CONDITION as y } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as A } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as ii } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as ve } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Ie } from "@umbraco-cms/backoffice/router";
const si = [
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
], oi = [
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
var li = Object.defineProperty, ri = Object.getOwnPropertyDescriptor, En = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? ri(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && li(e, n, a), a;
};
let $e = class extends H(W) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = si[this.type - 1];
      return r`
                <uui-tag color=${t == null ? void 0 : t.color}>
                    <uui-icon name="${t == null ? void 0 : t.icon}"></uui-icon>
                    ${t == null ? void 0 : t.label}
                </uui-tag>
            `;
    }
  }
};
$e.styles = [
  h`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
En([
  V({ attribute: !1 })
], $e.prototype, "type", 2);
$e = En([
  d("content-audit-issue-type-label")
], $e);
var ci = Object.defineProperty, ui = Object.getOwnPropertyDescriptor, $n = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? ui(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && ci(e, n, a), a;
};
let Se = class extends H(W) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = oi[this.type - 1];
      return r`
                <uui-tag color=${t == null ? void 0 : t.color}>
                    <uui-icon name="${t == null ? void 0 : t.icon}"></uui-icon>
                    ${t == null ? void 0 : t.label}
                </uui-tag>
            `;
    }
  }
};
Se.styles = [
  h`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
$n([
  V({ attribute: !1 })
], Se.prototype, "type", 2);
Se = $n([
  d("content-audit-priority-type-label")
], Se);
var mi = Object.defineProperty, di = Object.getOwnPropertyDescriptor, Sn = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? di(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && mi(e, n, a), a;
};
let rt = class extends H(W) {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? r`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : wn;
  }
};
Sn([
  V({ attribute: !1 })
], rt.prototype, "statusCode", 2);
rt = Sn([
  d("content-audit-status-code-label")
], rt);
var pi = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, Pn = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? hi(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && pi(e, n, a), a;
};
let ct = class extends H(W) {
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
Pn([
  V({ attribute: !0 })
], ct.prototype, "value", 2);
ct = Pn([
  d("content-audit-carbon-intensity-label")
], ct);
var Un = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(Un || {}), ut = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(ut || {}), _i = async (t, e) => {
  let n = typeof e == "function" ? await e(t) : e;
  if (n) return t.scheme === "bearer" ? `Bearer ${n}` : t.scheme === "basic" ? `Basic ${btoa(n)}` : n;
}, Ci = { bodySerializer: (t) => JSON.stringify(t, (e, n) => typeof n == "bigint" ? n.toString() : n) }, bi = (t) => {
  switch (t) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, fi = (t) => {
  switch (t) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, yi = (t) => {
  switch (t) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, Ln = ({ allowReserved: t, explode: e, name: n, style: i, value: a }) => {
  if (!e) {
    let l = (t ? a : a.map((m) => encodeURIComponent(m))).join(fi(i));
    switch (i) {
      case "label":
        return `.${l}`;
      case "matrix":
        return `;${n}=${l}`;
      case "simple":
        return l;
      default:
        return `${n}=${l}`;
    }
  }
  let o = bi(i), s = a.map((l) => i === "label" || i === "simple" ? t ? l : encodeURIComponent(l) : We({ allowReserved: t, name: n, value: l })).join(o);
  return i === "label" || i === "matrix" ? o + s : s;
}, We = ({ allowReserved: t, name: e, value: n }) => {
  if (n == null) return "";
  if (typeof n == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${e}=${t ? n : encodeURIComponent(n)}`;
}, Nn = ({ allowReserved: t, explode: e, name: n, style: i, value: a }) => {
  if (a instanceof Date) return `${n}=${a.toISOString()}`;
  if (i !== "deepObject" && !e) {
    let l = [];
    Object.entries(a).forEach(([F, T]) => {
      l = [...l, F, t ? T : encodeURIComponent(T)];
    });
    let m = l.join(",");
    switch (i) {
      case "form":
        return `${n}=${m}`;
      case "label":
        return `.${m}`;
      case "matrix":
        return `;${n}=${m}`;
      default:
        return m;
    }
  }
  let o = yi(i), s = Object.entries(a).map(([l, m]) => We({ allowReserved: t, name: i === "deepObject" ? `${n}[${l}]` : l, value: m })).join(o);
  return i === "label" || i === "matrix" ? o + s : s;
}, Ai = /\{[^{}]+\}/g, Ti = ({ path: t, url: e }) => {
  let n = e, i = e.match(Ai);
  if (i) for (let a of i) {
    let o = !1, s = a.substring(1, a.length - 1), l = "simple";
    s.endsWith("*") && (o = !0, s = s.substring(0, s.length - 1)), s.startsWith(".") ? (s = s.substring(1), l = "label") : s.startsWith(";") && (s = s.substring(1), l = "matrix");
    let m = t[s];
    if (m == null) continue;
    if (Array.isArray(m)) {
      n = n.replace(a, Ln({ explode: o, name: s, style: l, value: m }));
      continue;
    }
    if (typeof m == "object") {
      n = n.replace(a, Nn({ explode: o, name: s, style: l, value: m }));
      continue;
    }
    if (l === "matrix") {
      n = n.replace(a, `;${We({ name: s, value: m })}`);
      continue;
    }
    let F = encodeURIComponent(l === "label" ? `.${m}` : m);
    n = n.replace(a, F);
  }
  return n;
}, kn = ({ allowReserved: t, array: e, object: n } = {}) => (i) => {
  let a = [];
  if (i && typeof i == "object") for (let o in i) {
    let s = i[o];
    if (s != null) if (Array.isArray(s)) {
      let l = Ln({ allowReserved: t, explode: !0, name: o, style: "form", value: s, ...e });
      l && a.push(l);
    } else if (typeof s == "object") {
      let l = Nn({ allowReserved: t, explode: !0, name: o, style: "deepObject", value: s, ...n });
      l && a.push(l);
    } else {
      let l = We({ allowReserved: t, name: o, value: s });
      l && a.push(l);
    }
  }
  return a.join("&");
}, vi = (t) => {
  var n;
  if (!t) return "stream";
  let e = (n = t.split(";")[0]) == null ? void 0 : n.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((i) => e.startsWith(i))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, Ii = async ({ security: t, ...e }) => {
  for (let n of t) {
    let i = await _i(n, e.auth);
    if (!i) continue;
    let a = n.name ?? "Authorization";
    switch (n.in) {
      case "query":
        e.query || (e.query = {}), e.query[a] = i;
        break;
      case "cookie":
        e.headers.append("Cookie", `${a}=${i}`);
        break;
      case "header":
      default:
        e.headers.set(a, i);
        break;
    }
    return;
  }
}, Jt = (t) => gi({ baseUrl: t.baseUrl, path: t.path, query: t.query, querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : kn(t.querySerializer), url: t.url }), gi = ({ baseUrl: t, path: e, query: n, querySerializer: i, url: a }) => {
  let o = a.startsWith("/") ? a : `/${a}`, s = (t ?? "") + o;
  e && (s = Ti({ path: e, url: s }));
  let l = n ? i(n) : "";
  return l.startsWith("?") && (l = l.substring(1)), l && (s += `?${l}`), s;
}, Qt = (t, e) => {
  var i;
  let n = { ...t, ...e };
  return (i = n.baseUrl) != null && i.endsWith("/") && (n.baseUrl = n.baseUrl.substring(0, n.baseUrl.length - 1)), n.headers = Dn(t.headers, e.headers), n;
}, Dn = (...t) => {
  let e = new Headers();
  for (let n of t) {
    if (!n || typeof n != "object") continue;
    let i = n instanceof Headers ? n.entries() : Object.entries(n);
    for (let [a, o] of i) if (o === null) e.delete(a);
    else if (Array.isArray(o)) for (let s of o) e.append(a, s);
    else o !== void 0 && e.set(a, typeof o == "object" ? JSON.stringify(o) : o);
  }
  return e;
}, tt = class {
  constructor() {
    Ht(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  getInterceptorIndex(t) {
    return typeof t == "number" ? this._fns[t] ? t : -1 : this._fns.indexOf(t);
  }
  exists(t) {
    let e = this.getInterceptorIndex(t);
    return !!this._fns[e];
  }
  eject(t) {
    let e = this.getInterceptorIndex(t);
    this._fns[e] && (this._fns[e] = null);
  }
  update(t, e) {
    let n = this.getInterceptorIndex(t);
    return this._fns[n] ? (this._fns[n] = e, t) : !1;
  }
  use(t) {
    return this._fns = [...this._fns, t], this._fns.length - 1;
  }
}, wi = () => ({ error: new tt(), request: new tt(), response: new tt() }), Oi = kn({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), Ei = { "Content-Type": "application/json" }, Rn = (t = {}) => ({ ...Ci, headers: Ei, parseAs: "auto", querySerializer: Oi, ...t }), $i = (t = {}) => {
  let e = Qt(Rn(), t), n = () => ({ ...e }), i = (s) => (e = Qt(e, s), n()), a = wi(), o = async (s) => {
    let l = { ...e, ...s, fetch: s.fetch ?? e.fetch ?? globalThis.fetch, headers: Dn(e.headers, s.headers) };
    l.security && await Ii({ ...l, security: l.security }), l.body && l.bodySerializer && (l.body = l.bodySerializer(l.body)), (l.body === void 0 || l.body === "") && l.headers.delete("Content-Type");
    let m = Jt(l), F = { redirect: "follow", ...l }, T = new Request(m, F);
    for (let f of a.request._fns) f && (T = await f(T, l));
    let Xa = l.fetch, b = await Xa(T);
    for (let f of a.response._fns) f && (b = await f(b, T, l));
    let we = { request: T, response: b };
    if (b.ok) {
      if (b.status === 204 || b.headers.get("Content-Length") === "0") return l.responseStyle === "data" ? {} : { data: {}, ...we };
      let f = (l.parseAs === "auto" ? vi(b.headers.get("Content-Type")) : l.parseAs) ?? "json";
      if (f === "stream") return l.responseStyle === "data" ? b.body : { data: b.body, ...we };
      let J = await b[f]();
      return f === "json" && (l.responseValidator && await l.responseValidator(J), l.responseTransformer && (J = await l.responseTransformer(J))), l.responseStyle === "data" ? J : { data: J, ...we };
    }
    let Oe = await b.text();
    try {
      Oe = JSON.parse(Oe);
    } catch {
    }
    let X = Oe;
    for (let f of a.error._fns) f && (X = await f(Oe, b, T, l));
    if (X = X || {}, l.throwOnError) throw X;
    return l.responseStyle === "data" ? void 0 : { error: X, ...we };
  };
  return { buildUrl: Jt, connect: (s) => o({ ...s, method: "CONNECT" }), delete: (s) => o({ ...s, method: "DELETE" }), get: (s) => o({ ...s, method: "GET" }), getConfig: n, head: (s) => o({ ...s, method: "HEAD" }), interceptors: a, options: (s) => o({ ...s, method: "OPTIONS" }), patch: (s) => o({ ...s, method: "PATCH" }), post: (s) => o({ ...s, method: "POST" }), put: (s) => o({ ...s, method: "PUT" }), request: o, setConfig: i, trace: (s) => o({ ...s, method: "TRACE" }) };
};
const p = $i(Rn({
  baseUrl: "http://localhost:26293",
  throwOnError: !0
}));
class ee {
  static getAllImages(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/all-images",
      ...e
    });
  }
  static getAllIssues(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/all-issues",
      ...e
    });
  }
  static getDuplicateContentUrls(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/duplicate-content",
      ...e
    });
  }
  static getExportData(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/export",
      ...e
    });
  }
  static getExternalLinks(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/external-links",
      ...e
    });
  }
  static getHealthScore(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/health-score",
      ...e
    });
  }
  static getInteralLinks(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/internal-links",
      ...e
    });
  }
  static getIssue(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/issue",
      ...e
    });
  }
  static getLatestAuditOverview(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/latest-audit",
      ...e
    });
  }
  static getLatestAuditData(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/latest-data",
      ...e
    });
  }
  static getLatestPageAuditData(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/latest-page-data",
      ...e
    });
  }
  static getPagesWithMissingMetadata(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/missing-metadata",
      ...e
    });
  }
  static getOrphanedPages(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/orphaned-pages",
      ...e
    });
  }
}
class Si {
  static getSettings(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/get-settings",
      ...e
    });
  }
}
var Pi = Object.defineProperty, Ui = Object.getOwnPropertyDescriptor, Wn = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? Ui(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && Pi(e, n, a), a;
};
let Pe = class extends H(W) {
  _getColour() {
    return this.value != null ? this.value.rating == ut.POOR ? "danger" : this.value.rating == ut.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == Un.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
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
Pe.styles = [
  h`
            uui-tag {
                font-size: 14px;
            }
        `
];
Wn([
  V({ attribute: !1 })
], Pe.prototype, "value", 2);
Pe = Wn([
  d("content-audit-metric-label")
], Pe);
class fr extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class yr extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class Ar extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const Ue = "Umb.Workspace.ContentAudit", Li = "Umb.Context.ContentAudit", Vn = "content-audit";
var w;
class Ni {
  constructor(e) {
    _(this, w);
    C(this, w, e);
  }
  async getLatestAuditOverview() {
    return await Z(u(this, w), ee.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await Z(u(this, w), ee.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await Z(u(this, w), ee.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await Z(u(this, w), ee.getHealthScore());
  }
}
w = new WeakMap();
var be;
class ki {
  constructor(e) {
    _(this, be);
    C(this, be, e);
  }
  async getSettings() {
    return await ni(u(this, be), Si.getSettings());
  }
}
be = new WeakMap();
var O, fe;
class Di extends On {
  constructor(n) {
    super(n);
    _(this, O);
    _(this, fe);
    C(this, O, new Ni(this)), C(this, fe, new ki(this));
  }
  async getLatestAuditOverview() {
    return u(this, O).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return u(this, O).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return u(this, O).getTopIssues();
  }
  async getHealthScore() {
    return u(this, O).getHealthScore();
  }
  async getSettings() {
    return u(this, fe).getSettings();
  }
}
O = new WeakMap(), fe = new WeakMap();
var v, q, z, Y, G, K;
class mt extends On {
  constructor(n) {
    super(n);
    _(this, v);
    _(this, q);
    _(this, z);
    _(this, Y);
    _(this, G);
    _(this, K);
    this.workspaceAlias = Ue, C(this, q, new et(void 0)), this.latestAuditOverview = u(this, q).asObservable(), C(this, z, new Xt([], (i) => i.unique)), this.pagesWithMissingMetadata = u(this, z).asObservable(), C(this, Y, new Xt([], (i) => i.name)), this.topIssues = u(this, Y).asObservable(), C(this, G, new et(void 0)), this.healthScore = u(this, G).asObservable(), C(this, K, new et(void 0)), this.settings = u(this, K).asObservable(), this.provideContext(ti, this), this.provideContext(Mn, this), C(this, v, new Di(this));
  }
  getEntityType() {
    return Vn;
  }
  async getLatestAuditOverview() {
    const { data: n } = await u(this, v).getLatestAuditOverview();
    n && u(this, q).setValue(n);
  }
  async getPagesWithMissingMetadata() {
    const { data: n } = await u(this, v).getPagesWithMissingMetadata();
    n && u(this, z).setValue(n.items);
  }
  async getTopIssues() {
    const { data: n } = await u(this, v).getTopIssues();
    n && u(this, Y).setValue(n.items);
  }
  async getHealthScore() {
    const { data: n } = await u(this, v).getHealthScore();
    n && u(this, G).setValue(n);
  }
  async getSettings() {
    const { data: n } = await u(this, v).getSettings();
    n && u(this, K).setValue(n);
  }
}
v = new WeakMap(), q = new WeakMap(), z = new WeakMap(), Y = new WeakMap(), G = new WeakMap(), K = new WeakMap();
const Mn = new ei(
  "ContentAuditContext"
), Ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: Mn,
  ContentAuditContext: mt,
  default: mt
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wi = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis, yt = Ee.ShadowRoot && (Ee.ShadyCSS === void 0 || Ee.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xn = Symbol(), Zt = /* @__PURE__ */ new WeakMap();
let Vi = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== xn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (yt && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Zt.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Zt.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Mi = (t) => new Vi(typeof t == "string" ? t : t + "", void 0, xn), xi = (t, e) => {
  if (yt) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), a = Ee.litNonce;
    a !== void 0 && i.setAttribute("nonce", a), i.textContent = n.cssText, t.appendChild(i);
  }
}, en = yt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return Mi(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ji, defineProperty: Bi, getOwnPropertyDescriptor: qi, getOwnPropertyNames: zi, getOwnPropertySymbols: Yi, getPrototypeOf: Gi } = Object, E = globalThis, tn = E.trustedTypes, Ki = tn ? tn.emptyScript : "", nt = E.reactiveElementPolyfillSupport, te = (t, e) => t, dt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ki : null;
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
} }, jn = (t, e) => !ji(t, e), nn = { attribute: !0, type: String, converter: dt, reflect: !1, useDefault: !1, hasChanged: jn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class Q extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = nn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), a = this.getPropertyDescriptor(e, i, n);
      a !== void 0 && Bi(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: a, set: o } = qi(this.prototype, e) ?? { get() {
      return this[n];
    }, set(s) {
      this[n] = s;
    } };
    return { get: a, set(s) {
      const l = a == null ? void 0 : a.call(this);
      o == null || o.call(this, s), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? nn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(te("elementProperties"))) return;
    const e = Gi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(te("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(te("properties"))) {
      const n = this.properties, i = [...zi(n), ...Yi(n)];
      for (const a of i) this.createProperty(a, n[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [i, a] of n) this.elementProperties.set(i, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const a = this._$Eu(n, i);
      a !== void 0 && this._$Eh.set(a, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const a of i) n.unshift(en(a));
    } else e !== void 0 && n.push(en(e));
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
    return xi(e, this.constructor.elementStyles), e;
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
    var o;
    const i = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, i);
    if (a !== void 0 && i.reflect === !0) {
      const s = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : dt).toAttribute(n, i.type);
      this._$Em = e, s == null ? this.removeAttribute(a) : this.setAttribute(a, s), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var o, s;
    const i = this.constructor, a = i._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const l = i.getPropertyOptions(a), m = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : dt;
      this._$Em = a, this[a] = m.fromAttribute(n, l.type) ?? ((s = this._$Ej) == null ? void 0 : s.get(a)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, n, i) {
    var a;
    if (e !== void 0) {
      const o = this.constructor, s = this[e];
      if (i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? jn)(s, n) || i.useDefault && i.reflect && s === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: a, wrapped: o }, s) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? n ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), a === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [o, s] of a) {
        const { wrapped: l } = s, m = this[o];
        l !== !0 || this._$AL.has(o) || m === void 0 || this.C(o, void 0, s, m);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((a) => {
        var o;
        return (o = a.hostUpdate) == null ? void 0 : o.call(a);
      }), this.update(n)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var n;
    (n = this._$EO) == null || n.forEach((i) => {
      var a;
      return (a = i.hostUpdated) == null ? void 0 : a.call(i);
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
Q.elementStyles = [], Q.shadowRootOptions = { mode: "open" }, Q[te("elementProperties")] = /* @__PURE__ */ new Map(), Q[te("finalized")] = /* @__PURE__ */ new Map(), nt == null || nt({ ReactiveElement: Q }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.1.0");
var Hi = Object.getOwnPropertyDescriptor, Fi = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? Hi(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = s(a) || a);
  return a;
};
let Le = class extends H(W) {
  constructor() {
    super(), this._workspaceContext = new mt(this);
  }
  render() {
    return r`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Le = Fi([
  Wi("content-audit-workspace-root")
], Le);
const Xi = Le, Ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Le;
  },
  default: Xi
}, Symbol.toStringTag, { value: "Module" })), M = "Umb.Menu.ContentAudit", Ve = "Umb.Menu.ContentMetadata", Me = "Umb.Menu.ContentPerformance", At = "Umb.Menu.ContentTools", Tt = "Umb.Collection.ContentAudit.Issues", Qi = "Umb.CollectionView.ContentAudit.Issues.Table", Bn = "Umb.Repository.ContentAuditIssuesCollection";
var ye;
class Zi {
  constructor(e) {
    _(this, ye);
    C(this, ye, e);
  }
  async getCollection(e) {
    const { data: n, error: i } = await Z(u(this, ye), ee.getAllIssues({ query: e }));
    if (i)
      return { error: i };
    if (!n)
      return { data: { items: [], total: 0 } };
    const { items: a, total: o } = n;
    return { data: { items: a, total: o } };
  }
}
ye = new WeakMap();
var Ae;
class an extends ai {
  constructor(n) {
    super(n);
    _(this, Ae);
    C(this, Ae, new Zi(n));
  }
  async requestCollection(n) {
    return u(this, Ae).getCollection(n);
  }
}
Ae = new WeakMap();
const es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: an,
  default: an
}, Symbol.toStringTag, { value: "Module" }));
var ts = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, qn = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? ns(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && ts(e, n, a), a;
};
let Ne = class extends W {
  render() {
    return this.value ? r`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : wn;
  }
};
Ne.styles = [
  ii,
  h`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
qn([
  V({ attribute: !1 })
], Ne.prototype, "value", 2);
Ne = qn([
  d("content-audit-issues-table-name-column-layout")
], Ne);
var as = Object.defineProperty, is = Object.getOwnPropertyDescriptor, zn = (t) => {
  throw TypeError(t);
}, ge = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? is(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && as(e, n, a), a;
}, vt = (t, e, n) => e.has(t) || zn("Cannot " + n), sn = (t, e, n) => (vt(t, e, "read from private field"), e.get(t)), on = (t, e, n) => e.has(t) ? zn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ss = (t, e, n, i) => (vt(t, e, "write to private field"), e.set(t, n), n), pt = (t, e, n) => (vt(t, e, "access private method"), n), ae, ne, Yn, It;
let I = class extends A {
  constructor() {
    super(), on(this, ne), this.data = [], this._tableConfig = {
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
    ], this._tableItems = [], on(this, ae), this.consumeContext(g, (t) => {
      ss(this, ae, t), pt(this, ne, Yn).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && pt(this, ne, It).call(this, this.data);
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
ne = /* @__PURE__ */ new WeakSet();
Yn = function() {
  sn(this, ae) && this.observe(sn(this, ae).items, (t) => pt(this, ne, It).call(this, t), "umbCollectionItemsObserver");
};
It = function(t) {
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
I.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ge([
  V({ type: Array, attribute: !1 })
], I.prototype, "data", 2);
ge([
  c()
], I.prototype, "_tableConfig", 2);
ge([
  c()
], I.prototype, "_tableColumns", 2);
ge([
  c()
], I.prototype, "_tableItems", 2);
I = ge([
  d("content-audit-issues-table-collection-view")
], I);
const os = I, ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return I;
  },
  default: os
}, Symbol.toStringTag, { value: "Module" })), Gn = "all-pages-root", rs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: Gn,
    menus: [M]
  }
}, cs = [rs], ln = "Umb.Workspace.ContentAudit.AllPagesRoot", x = "Umb.Workspace.ContentAudit.AllPages", us = [
  {
    type: "workspace",
    kind: "routable",
    alias: x,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-DSdT86o1.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-Bc5eLCh4.js"),
    weight: 100,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "info"
    },
    conditions: [
      {
        alias: j,
        match: x
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Links",
    name: "All Pages Workspace Links View",
    js: () => import("./all-pages-links-workspace-view.element-B91Mftv7.js"),
    weight: 90,
    meta: {
      label: "Links",
      pathname: "links",
      icon: "link"
    },
    conditions: [
      {
        alias: j,
        match: x
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Images",
    name: "All Pages Workspace Images View",
    js: () => import("./all-pages-images-workspace-view.element-D9WwZqnO.js"),
    weight: 80,
    meta: {
      label: "Images",
      pathname: "images",
      icon: "picture"
    },
    conditions: [
      {
        alias: j,
        match: x
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Resources",
    name: "All Pages Workspace Resources View",
    js: () => import("./all-pages-resources-workspace-view.element-CGUsA0V7.js"),
    weight: 70,
    meta: {
      label: "Resources",
      pathname: "resources",
      icon: "icon-script"
    },
    conditions: [
      {
        alias: j,
        match: x
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Issues",
    name: "All Pages Workspace Issues View",
    js: () => import("./all-pages-issues-workspace-view.element-CBjXxA7t.js"),
    weight: 60,
    meta: {
      label: "Issues",
      pathname: "issues",
      icon: "alert"
    },
    conditions: [
      {
        alias: j,
        match: x
      }
    ]
  }
], gt = "Umb.Collection.ContentAudit.AllPages", ms = "Umb.CollectionView.ContentAudit.AllPages.Table", Kn = "Umb.Repository.ContentAuditAllPagesCollection";
var ds = Object.defineProperty, ps = Object.getOwnPropertyDescriptor, Hn = (t) => {
  throw TypeError(t);
}, xe = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? ps(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && ds(e, n, a), a;
}, wt = (t, e, n) => e.has(t) || Hn("Cannot " + n), rn = (t, e, n) => (wt(t, e, "read from private field"), e.get(t)), cn = (t, e, n) => e.has(t) ? Hn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), hs = (t, e, n, i) => (wt(t, e, "write to private field"), e.set(t, n), n), Fn = (t, e, n) => (wt(t, e, "access private method"), n), ie, ke, Xn, Jn;
let $ = class extends A {
  constructor() {
    super(), cn(this, ke), this._tableConfig = {
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
    ], this._tableItems = [], cn(this, ie), this.consumeContext(g, (t) => {
      hs(this, ie, t), Fn(this, ke, Xn).call(this);
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
ie = /* @__PURE__ */ new WeakMap();
ke = /* @__PURE__ */ new WeakSet();
Xn = function() {
  rn(this, ie) && this.observe(rn(this, ie).items, (t) => Fn(this, ke, Jn).call(this, t), "umbCollectionItemsObserver");
};
Jn = function(t) {
  this._tableItems = t.map((e) => {
    var n, i, a;
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
          value: r`<content-audit-status-code-label .statusCode=${(a = e.pageData) == null ? void 0 : a.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "redirect",
          value: e.pageData.redirect ? "Yes" : "No"
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
xe([
  c()
], $.prototype, "_tableConfig", 2);
xe([
  c()
], $.prototype, "_tableColumns", 2);
xe([
  c()
], $.prototype, "_tableItems", 2);
$ = xe([
  d("content-audit-all-pages-table-collection-view")
], $);
const _s = $, Cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return $;
  },
  default: _s
}, Symbol.toStringTag, { value: "Module" })), bs = [
  {
    type: "workspace",
    kind: "default",
    alias: ln,
    name: "All Pages Root Workspace",
    meta: {
      entityType: Gn,
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
      collectionAlias: gt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ln
      }
    ]
  }
], fs = [...us, ...bs], ys = [
  {
    type: "repository",
    alias: Kn,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-Bi6PF4G6.js")
  }
], As = [
  {
    type: "collectionView",
    alias: ms,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => Cs),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: gt
      }
    ]
  }
], Ts = [
  {
    type: "collection",
    kind: "default",
    alias: gt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element-DMHaFpCF.js"),
    meta: {
      repositoryAlias: Kn
    }
  },
  ...ys,
  ...As
], vs = "Umb.Repository.ContentAudit.AllPages.Detail", Is = "Umb.Store.ContentAudit.AllPages.Detail", gs = [
  {
    type: "repository",
    alias: vs,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository-C5lVglho.js")
  },
  {
    type: "store",
    alias: Is,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], ws = [...gs], Os = [
  ...fs,
  ...cs,
  ...Ts,
  ...ws
], Qn = "issues-root", Es = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: Qn,
    menus: [M]
  }
}, $s = [Es], un = "Umb.Workspace.ContentAudit.IssuesRoot", mn = "Umb.Workspace.ContentAudit.Issues", Ss = [
  {
    type: "workspace",
    kind: "routable",
    alias: mn,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-x9ngE7ih.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-BsRUImpL.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: j,
        match: mn
      }
    ]
  }
], Ps = [
  {
    type: "workspace",
    kind: "default",
    alias: un,
    name: "Issues Root Workspace",
    meta: {
      entityType: Qn,
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
      collectionAlias: Tt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: un
      }
    ]
  }
], Us = [...Ss, ...Ps], Ls = [
  {
    type: "repository",
    alias: Bn,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => es)
  }
], Ns = [
  {
    type: "collectionView",
    alias: Qi,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => ls),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: Tt
      }
    ]
  }
], ks = [
  {
    type: "collection",
    kind: "default",
    alias: Tt,
    name: "Issues Collection",
    element: () => import("./issues.element-Cl7lgtgI.js"),
    meta: {
      repositoryAlias: Bn
    }
  },
  ...Ls,
  ...Ns
], Ds = "Umb.Repository.ContentAudit.Issues.Detail", Rs = "Umb.Store.ContentAudit.Issues.Detail", Ws = [
  {
    type: "repository",
    alias: Ds,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-DWQbiG-E.js")
  },
  {
    type: "store",
    alias: Rs,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], Vs = [...Ws], Ms = [
  ...Us,
  ...$s,
  ...ks,
  ...Vs
], Zn = "status-codes-root", xs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: Zn,
    menus: [M]
  }
}, js = [xs], Ot = "Umb.Collection.ContentAudit.StatusCodes", Bs = "Umb.CollectionView.ContentAudit.StatusCodes.Table", ea = "Umb.Repository.ContentAuditStatusCodesCollection";
var qs = Object.defineProperty, zs = Object.getOwnPropertyDescriptor, ta = (t) => {
  throw TypeError(t);
}, je = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? zs(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && qs(e, n, a), a;
}, Et = (t, e, n) => e.has(t) || ta("Cannot " + n), ht = (t, e, n) => (Et(t, e, "read from private field"), e.get(t)), at = (t, e, n) => e.has(t) ? ta("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), na = (t, e, n, i) => (Et(t, e, "write to private field"), e.set(t, n), n), $t = (t, e, n) => (Et(t, e, "access private method"), n), se, Be, oe, aa, ia, sa;
let S = class extends A {
  constructor() {
    super(), at(this, oe), this._tableConfig = {
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
    ], this._tableItems = [], at(this, se), at(this, Be), this.consumeContext(g, (t) => {
      na(this, se, t);
    }), $t(this, oe, aa).call(this);
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
Be = /* @__PURE__ */ new WeakMap();
oe = /* @__PURE__ */ new WeakSet();
aa = function() {
  new Ie(this, Te).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    na(this, Be, t), $t(this, oe, ia).call(this);
  });
};
ia = function() {
  ht(this, se) && this.observe(ht(this, se).items, (t) => $t(this, oe, sa).call(this, t), "umbCollectionItemsObserver");
};
sa = function(t) {
  const e = ht(this, Be);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    var a, o, s;
    const i = e({ entityType: n.entityType }) + ve.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${i}>${(a = n.pageData) == null ? void 0 : a.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = n.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "statusCode",
          value: r`<content-audit-status-code-label .statusCode=${(s = n.pageData) == null ? void 0 : s.statusCode}></content-audit-status-code-label>`
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
je([
  c()
], S.prototype, "_tableConfig", 2);
je([
  c()
], S.prototype, "_tableColumns", 2);
je([
  c()
], S.prototype, "_tableItems", 2);
S = je([
  d("content-audit-status-codes-table-collection-view")
], S);
const Ys = S, Gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return S;
  },
  default: Ys
}, Symbol.toStringTag, { value: "Module" })), dn = "Umb.Workspace.ContentAudit.StatusCodes", Ks = [
  {
    type: "workspace",
    kind: "default",
    alias: dn,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: Zn,
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
      collectionAlias: Ot
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: dn
      }
    ]
  }
], Hs = [
  {
    type: "repository",
    alias: ea,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-D3LPonBE.js")
  }
], Fs = [
  {
    type: "collectionView",
    alias: Bs,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => Gs),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: Ot
      }
    ]
  }
], Xs = [
  {
    type: "collection",
    kind: "default",
    alias: Ot,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-Dr77BYA-.js"),
    meta: {
      repositoryAlias: ea
    }
  },
  ...Hs,
  ...Fs
], Js = [
  ...Ks,
  ...js,
  ...Xs
], oa = "orphaned-pages-root", Qs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: oa,
    menus: [Ve]
  }
}, Zs = [Qs], St = "Umb.Collection.ContentAudit.OrphanedPages", eo = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", la = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var to = Object.defineProperty, no = Object.getOwnPropertyDescriptor, ra = (t) => {
  throw TypeError(t);
}, qe = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? no(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && to(e, n, a), a;
}, Pt = (t, e, n) => e.has(t) || ra("Cannot " + n), _t = (t, e, n) => (Pt(t, e, "read from private field"), e.get(t)), it = (t, e, n) => e.has(t) ? ra("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ca = (t, e, n, i) => (Pt(t, e, "write to private field"), e.set(t, n), n), Ut = (t, e, n) => (Pt(t, e, "access private method"), n), le, ze, re, ua, ma, da;
let P = class extends A {
  constructor() {
    super(), it(this, re), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], it(this, le), it(this, ze), this.consumeContext(g, (t) => {
      ca(this, le, t);
    }), Ut(this, re, ua).call(this);
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
ze = /* @__PURE__ */ new WeakMap();
re = /* @__PURE__ */ new WeakSet();
ua = function() {
  new Ie(this, Te).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    ca(this, ze, t), Ut(this, re, ma).call(this);
  });
};
ma = function() {
  _t(this, le) && this.observe(_t(this, le).items, (t) => Ut(this, re, da).call(this, t), "umbCollectionItemsObserver");
};
da = function(t) {
  const e = _t(this, ze);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    const i = e({ entityType: "document" }) + ve.generateLocal({ unique: n.unique });
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
P.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
qe([
  c()
], P.prototype, "_tableConfig", 2);
qe([
  c()
], P.prototype, "_tableColumns", 2);
qe([
  c()
], P.prototype, "_tableItems", 2);
P = qe([
  d("content-audit-orphaned-pages-table-collection-view")
], P);
const ao = P, io = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return P;
  },
  default: ao
}, Symbol.toStringTag, { value: "Module" })), pn = "Umb.Workspace.ContentAudit.OrphanedPages", so = [
  {
    type: "workspace",
    kind: "default",
    alias: pn,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: oa,
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
      collectionAlias: St
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: pn
      }
    ]
  }
], oo = [
  {
    type: "repository",
    alias: la,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-DnBC6Q6h.js")
  }
], lo = [
  {
    type: "collectionView",
    alias: eo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => io),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: St
      }
    ]
  }
], ro = [
  {
    type: "collection",
    kind: "default",
    alias: St,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-DoefYUIA.js"),
    meta: {
      repositoryAlias: la
    }
  },
  ...oo,
  ...lo
], co = [
  ...so,
  ...Zs,
  ...ro
], pa = "images-alt-text-root", uo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: pa,
    menus: [Ve]
  }
}, mo = [uo], Lt = "Umb.Collection.ContentAudit.ImagesAltText", po = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", ha = "Umb.Repository.ContentAuditImagesAltTextCollection";
var ho = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, _a = (t) => {
  throw TypeError(t);
}, Ye = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? _o(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && ho(e, n, a), a;
}, Nt = (t, e, n) => e.has(t) || _a("Cannot " + n), Ct = (t, e, n) => (Nt(t, e, "read from private field"), e.get(t)), st = (t, e, n) => e.has(t) ? _a("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ca = (t, e, n, i) => (Nt(t, e, "write to private field"), e.set(t, n), n), kt = (t, e, n) => (Nt(t, e, "access private method"), n), ce, Ge, ue, ba, fa, ya;
let U = class extends A {
  constructor() {
    super(), st(this, ue), this._tableConfig = {
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
    ], this._tableItems = [], st(this, ce), st(this, Ge), this.consumeContext(g, (t) => {
      Ca(this, ce, t);
    }), kt(this, ue, ba).call(this);
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
Ge = /* @__PURE__ */ new WeakMap();
ue = /* @__PURE__ */ new WeakSet();
ba = function() {
  new Ie(this, Te).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ca(this, Ge, t), kt(this, ue, fa).call(this);
  });
};
fa = function() {
  Ct(this, ce) && this.observe(Ct(this, ce).items, (t) => kt(this, ue, ya).call(this, t), "umbCollectionItemsObserver");
};
ya = function(t) {
  const e = Ct(this, Ge);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    const i = e({ entityType: "document" }) + ve.generateLocal({ unique: n.unique });
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
U.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ye([
  c()
], U.prototype, "_tableConfig", 2);
Ye([
  c()
], U.prototype, "_tableColumns", 2);
Ye([
  c()
], U.prototype, "_tableItems", 2);
U = Ye([
  d("content-audit-images-alt-text-table-collection-view")
], U);
const Co = U, bo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return U;
  },
  default: Co
}, Symbol.toStringTag, { value: "Module" })), hn = "Umb.Workspace.ContentAudit.ImagesAltText", fo = [
  {
    type: "workspace",
    kind: "default",
    alias: hn,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: pa,
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
      collectionAlias: Lt
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
    alias: ha,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-CbJ-PCUu.js")
  }
], Ao = [
  {
    type: "collectionView",
    alias: po,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => bo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: Lt
      }
    ]
  }
], To = [
  {
    type: "collection",
    kind: "default",
    alias: Lt,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DzMGILfL.js"),
    meta: {
      repositoryAlias: ha
    }
  },
  ...yo,
  ...Ao
], vo = [
  ...fo,
  ...mo,
  ...To
], Aa = "outbound-links-root", Io = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: Aa,
    menus: [M]
  }
}, go = [Io], Dt = "Umb.Collection.ContentAudit.OutboundLinks", wo = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", Ta = "Umb.Repository.ContentAuditOutboundLinksCollection";
var Oo = Object.defineProperty, Eo = Object.getOwnPropertyDescriptor, va = (t) => {
  throw TypeError(t);
}, Ke = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? Eo(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && Oo(e, n, a), a;
}, Rt = (t, e, n) => e.has(t) || va("Cannot " + n), _n = (t, e, n) => (Rt(t, e, "read from private field"), e.get(t)), Cn = (t, e, n) => e.has(t) ? va("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), $o = (t, e, n, i) => (Rt(t, e, "write to private field"), e.set(t, n), n), Ia = (t, e, n) => (Rt(t, e, "access private method"), n), me, De, ga, wa;
let L = class extends A {
  constructor() {
    super(), Cn(this, De), this._tableConfig = {
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
    ], this._tableItems = [], Cn(this, me), this.consumeContext(g, (t) => {
      $o(this, me, t), Ia(this, De, ga).call(this);
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
me = /* @__PURE__ */ new WeakMap();
De = /* @__PURE__ */ new WeakSet();
ga = function() {
  _n(this, me) && this.observe(_n(this, me).items, (t) => Ia(this, De, wa).call(this, t), "umbCollectionItemsObserver");
};
wa = function(t) {
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
L.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ke([
  c()
], L.prototype, "_tableConfig", 2);
Ke([
  c()
], L.prototype, "_tableColumns", 2);
Ke([
  c()
], L.prototype, "_tableItems", 2);
L = Ke([
  d("content-audit-outbound-links-table-collection-view")
], L);
const So = L, Po = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return L;
  },
  default: So
}, Symbol.toStringTag, { value: "Module" })), bn = "Umb.Workspace.ContentAudit.OutboundLinks", Uo = [
  {
    type: "workspace",
    kind: "default",
    alias: bn,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: Aa,
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
      collectionAlias: Dt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: bn
      }
    ]
  }
], Lo = [
  {
    type: "repository",
    alias: Ta,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-B9IbC2Gn.js")
  }
], No = [
  {
    type: "collectionView",
    alias: wo,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => Po),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: Dt
      }
    ]
  }
], ko = [
  {
    type: "collection",
    kind: "default",
    alias: Dt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-DJu1PE06.js"),
    meta: {
      repositoryAlias: Ta
    }
  },
  ...Lo,
  ...No
], Do = [
  ...Uo,
  ...go,
  ...ko
], Oa = "inbound-links-root", Ro = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Oa,
    menus: [M]
  }
}, Wo = [Ro], Wt = "Umb.Collection.ContentAudit.InboundLinks", Vo = "Umb.CollectionView.ContentAudit.InboundLinks.Table", Ea = "Umb.Repository.ContentAuditInboundLinksCollection";
var Mo = Object.defineProperty, xo = Object.getOwnPropertyDescriptor, $a = (t) => {
  throw TypeError(t);
}, He = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? xo(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && Mo(e, n, a), a;
}, Vt = (t, e, n) => e.has(t) || $a("Cannot " + n), fn = (t, e, n) => (Vt(t, e, "read from private field"), e.get(t)), yn = (t, e, n) => e.has(t) ? $a("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), jo = (t, e, n, i) => (Vt(t, e, "write to private field"), e.set(t, n), n), Sa = (t, e, n) => (Vt(t, e, "access private method"), n), de, Re, Pa, Ua;
let N = class extends A {
  constructor() {
    super(), yn(this, Re), this._tableConfig = {
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
    ], this._tableItems = [], yn(this, de), this.consumeContext(g, (t) => {
      jo(this, de, t), Sa(this, Re, Pa).call(this);
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
de = /* @__PURE__ */ new WeakMap();
Re = /* @__PURE__ */ new WeakSet();
Pa = function() {
  fn(this, de) && this.observe(fn(this, de).items, (t) => Sa(this, Re, Ua).call(this, t), "umbCollectionItemsObserver");
};
Ua = function(t) {
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
N.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
He([
  c()
], N.prototype, "_tableConfig", 2);
He([
  c()
], N.prototype, "_tableColumns", 2);
He([
  c()
], N.prototype, "_tableItems", 2);
N = He([
  d("content-audit-inbound-links-table-collection-view")
], N);
const Bo = N, qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return N;
  },
  default: Bo
}, Symbol.toStringTag, { value: "Module" })), An = "Umb.Workspace.ContentAudit.InboundLinks", zo = [
  {
    type: "workspace",
    kind: "default",
    alias: An,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: Oa,
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
      collectionAlias: Wt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: An
      }
    ]
  }
], Yo = [
  {
    type: "repository",
    alias: Ea,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-DZ_8YlIw.js")
  }
], Go = [
  {
    type: "collectionView",
    alias: Vo,
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
        match: Wt
      }
    ]
  }
], Ko = [
  {
    type: "collection",
    kind: "default",
    alias: Wt,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-BgFbFelw.js"),
    meta: {
      repositoryAlias: Ea
    }
  },
  ...Yo,
  ...Go
], Ho = [
  ...zo,
  ...Wo,
  ...Ko
], La = "metadata-root", Fo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: La,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, Xo = [Fo], Mt = "Umb.Collection.ContentAudit.Metadata", Jo = "Umb.CollectionView.ContentAudit.Metadata.Table", Tn = "Umb.Workspace.ContentAudit.Metadata", Qo = [
  {
    type: "workspace",
    kind: "default",
    alias: Tn,
    name: "Metadata Root Workspace",
    meta: {
      entityType: La,
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
      collectionAlias: Mt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Tn
      }
    ]
  }
], Na = "Umb.Repository.ContentAuditMetadataCollection", Zo = [
  {
    type: "repository",
    alias: Na,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-BPhWH16M.js")
  }
], el = [
  {
    type: "collectionView",
    alias: Jo,
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
        match: Mt
      }
    ]
  }
], tl = [
  {
    type: "collection",
    kind: "default",
    alias: Mt,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: Na
    }
  },
  ...Zo,
  ...el
], nl = [
  ...Qo,
  ...Xo,
  ...tl
], al = [], xt = "Umb.Collection.ContentAudit.DuplicateContent", il = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", ka = "Umb.Repository.ContentAuditDuplicateContentCollection";
var sl = Object.defineProperty, ol = Object.getOwnPropertyDescriptor, Fe = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? ol(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && sl(e, n, a), a;
};
let k = class extends A {
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
k.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Fe([
  c()
], k.prototype, "_tableConfig", 2);
Fe([
  c()
], k.prototype, "_tableColumns", 2);
Fe([
  c()
], k.prototype, "_tableItems", 2);
k = Fe([
  d("content-audit-duplicate-content-table-collection-view")
], k);
const ll = k, rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return k;
  },
  default: ll
}, Symbol.toStringTag, { value: "Module" })), cl = "duplicate-content-root", vn = "Umb.Workspace.ContentAudit.DuplicateContent", ul = [
  {
    type: "workspace",
    kind: "default",
    alias: vn,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: cl,
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
      collectionAlias: xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: vn
      }
    ]
  }
], ml = [
  {
    type: "repository",
    alias: ka,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-CnxoXl0z.js")
  }
], dl = [
  {
    type: "collectionView",
    alias: il,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => rl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: xt
      }
    ]
  }
], pl = [
  {
    type: "collection",
    kind: "default",
    alias: xt,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-DTbM7jcX.js"),
    meta: {
      repositoryAlias: ka
    }
  },
  ...ml,
  ...dl
], hl = [
  ...ul,
  ...al,
  ...pl
], Da = "carbon-rating-root", _l = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: Da,
    menus: [Me]
  }
}, Cl = [_l], jt = "Umb.Collection.ContentAudit.CarbonRating", bl = "Umb.CollectionView.ContentAudit.CarbonRating.Table", Ra = "Umb.Repository.ContentAuditCarbonRatingCollection";
var fl = Object.defineProperty, yl = Object.getOwnPropertyDescriptor, Wa = (t) => {
  throw TypeError(t);
}, Xe = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? yl(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && fl(e, n, a), a;
}, Bt = (t, e, n) => e.has(t) || Wa("Cannot " + n), bt = (t, e, n) => (Bt(t, e, "read from private field"), e.get(t)), ot = (t, e, n) => e.has(t) ? Wa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Va = (t, e, n, i) => (Bt(t, e, "write to private field"), e.set(t, n), n), qt = (t, e, n) => (Bt(t, e, "access private method"), n), pe, Je, he, Ma, xa, ja;
let D = class extends A {
  constructor() {
    super(), ot(this, he), this._tableConfig = {
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
    ], this._tableItems = [], ot(this, pe), ot(this, Je), this.consumeContext(g, (t) => {
      Va(this, pe, t);
    }), qt(this, he, Ma).call(this);
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
pe = /* @__PURE__ */ new WeakMap();
Je = /* @__PURE__ */ new WeakMap();
he = /* @__PURE__ */ new WeakSet();
Ma = function() {
  new Ie(this, Te).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Va(this, Je, t), qt(this, he, xa).call(this);
  });
};
xa = function() {
  bt(this, pe) && this.observe(bt(this, pe).items, (t) => qt(this, he, ja).call(this, t), "umbCollectionItemsObserver");
};
ja = function(t) {
  const e = bt(this, Je);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    var a, o, s;
    const i = e({ entityType: n.entityType }) + ve.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${i}>${(a = n.pageData) == null ? void 0 : a.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = n.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "pageSize",
          value: r`${Math.round(((s = n.performanceData) == null ? void 0 : s.totalBytes) / 1024)}KB`
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
D.styles = [
  h`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Xe([
  c()
], D.prototype, "_tableConfig", 2);
Xe([
  c()
], D.prototype, "_tableColumns", 2);
Xe([
  c()
], D.prototype, "_tableItems", 2);
D = Xe([
  d("content-audit-carbon-rating-table-collection-view")
], D);
const Al = D, Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return D;
  },
  default: Al
}, Symbol.toStringTag, { value: "Module" })), In = "Umb.Workspace.ContentAudit.CarbonRating", vl = [
  {
    type: "workspace",
    kind: "default",
    alias: In,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: Da,
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
      collectionAlias: jt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: In
      }
    ]
  }
], Il = [
  {
    type: "repository",
    alias: Ra,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository-BlMg396j.js")
  }
], gl = [
  {
    type: "collectionView",
    alias: bl,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => Tl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: jt
      }
    ]
  }
], wl = [
  {
    type: "collection",
    kind: "default",
    alias: jt,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element-CTFE9xYN.js"),
    meta: {
      repositoryAlias: Ra
    }
  },
  ...Il,
  ...gl
], Ol = [
  ...vl,
  ...Cl,
  ...wl
], Ba = "core-web-vitals-root", El = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: Ba,
    menus: [Me]
  }
}, $l = [El], zt = "Umb.Collection.ContentAudit.CoreWebVitals", Sl = "Umb.CollectionView.ContentAudit.CoreWebVitals.Table", qa = "Umb.Repository.ContentAuditCoreWebVitalsCollection";
var Pl = Object.defineProperty, Ul = Object.getOwnPropertyDescriptor, za = (t) => {
  throw TypeError(t);
}, Qe = (t, e, n, i) => {
  for (var a = i > 1 ? void 0 : i ? Ul(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, n, a) : s(a)) || a);
  return i && a && Pl(e, n, a), a;
}, Yt = (t, e, n) => e.has(t) || za("Cannot " + n), ft = (t, e, n) => (Yt(t, e, "read from private field"), e.get(t)), lt = (t, e, n) => e.has(t) ? za("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ya = (t, e, n, i) => (Yt(t, e, "write to private field"), e.set(t, n), n), Gt = (t, e, n) => (Yt(t, e, "access private method"), n), _e, Ze, Ce, Ga, Ka, Ha;
let R = class extends A {
  constructor() {
    super(), lt(this, Ce), this._tableConfig = {
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
    ], this._tableItems = [], lt(this, _e), lt(this, Ze), this.consumeContext(g, (t) => {
      Ya(this, _e, t);
    }), Gt(this, Ce, Ga).call(this);
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
_e = /* @__PURE__ */ new WeakMap();
Ze = /* @__PURE__ */ new WeakMap();
Ce = /* @__PURE__ */ new WeakSet();
Ga = function() {
  new Ie(this, Te).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ya(this, Ze, t), Gt(this, Ce, Ka).call(this);
  });
};
Ka = function() {
  ft(this, _e) && this.observe(ft(this, _e).items, (t) => Gt(this, Ce, Ha).call(this, t), "umbCollectionItemsObserver");
};
Ha = function(t) {
  const e = ft(this, Ze);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.filter((n) => n.pageData.statusCode === 200).map((n) => {
    var a;
    const i = e({ entityType: n.entityType }) + ve.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${i}>${(a = n.pageData) == null ? void 0 : a.url}</a>`
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
Qe([
  c()
], R.prototype, "_tableConfig", 2);
Qe([
  c()
], R.prototype, "_tableColumns", 2);
Qe([
  c()
], R.prototype, "_tableItems", 2);
R = Qe([
  d("content-audit-core-web-vitals-table-collection-view")
], R);
const Ll = R, Nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return R;
  },
  default: Ll
}, Symbol.toStringTag, { value: "Module" })), gn = "Umb.Workspace.ContentAudit.CoreWebVitals", kl = [
  {
    type: "workspace",
    kind: "default",
    alias: gn,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: Ba,
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
      collectionAlias: zt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: gn
      }
    ]
  }
], Dl = [
  {
    type: "repository",
    alias: qa,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository-1Gcij36M.js")
  }
], Rl = [
  {
    type: "collectionView",
    alias: Sl,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => Nl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: y,
        match: zt
      }
    ]
  }
], Wl = [
  {
    type: "collection",
    kind: "default",
    alias: zt,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element-Dk38PXrp.js"),
    meta: {
      repositoryAlias: qa
    }
  },
  ...Dl,
  ...Rl
], Vl = [
  ...kl,
  ...$l,
  ...Wl
], Fa = "export-root", Ml = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: Fa,
    menus: [At]
  }
}, xl = [Ml], jl = "Umb.Workspace.ContentAudit.Export", Bl = [
  {
    type: "workspace",
    kind: "default",
    alias: jl,
    name: "Export Root Workspace",
    element: () => import("./export.element-DdhqOINb.js"),
    meta: {
      entityType: Fa,
      headline: "Export"
    }
  }
], ql = [
  ...Bl,
  ...xl
], B = "Umb.Section.ContentAudit", zl = {
  type: "section",
  alias: B,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Yl = {
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
}, Gl = [
  {
    type: "menu",
    alias: M,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: Ve,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: Me,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: At,
    name: "Tools Menu"
  }
], Kl = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: M
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
      menu: Ve
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
      menu: Me
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
      menu: At
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: B
      }
    ]
  }
], Hl = [
  zl,
  Yl,
  ...Gl,
  ...Kl,
  ...Os,
  ...Ms,
  ...Js,
  ...co,
  ...vo,
  ...Do,
  ...Ho,
  ...nl,
  ...hl,
  ...Ol,
  ...Vl,
  ...ql
], Fl = {
  type: "workspace",
  alias: Ue,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Ji),
  meta: {
    entityType: Vn
  }
}, Xl = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-HmlVPxMw.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ue
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-9rQRXHOY.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ue
      }
    ]
  }
], Jl = [
  Fl,
  ...Xl
], Ql = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-CPQG_UWc.js")
  }
], Zl = [
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
], er = {
  type: "workspaceView",
  alias: "Umbraco.Community.ContentAudit.Workspace",
  name: "ContentAudit Workspace",
  js: () => import("./contentaudit-workspace-view-Cy_owFiM.js"),
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
}, tr = [er], nr = {
  type: "globalContext",
  alias: Li,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Ri)
}, vr = async (t, e) => {
  t.consumeContext(Za, async (n) => {
    if (!n) return;
    const i = n.getOpenApiConfiguration();
    p.setConfig({
      auth: () => n.getLatestToken(),
      baseUrl: i.base,
      credentials: i.credentials
    }), e.registerMany([
      nr,
      ...Hl,
      ...Jl,
      ...Ql,
      ...Zl,
      ...tr
    ]);
  });
};
export {
  ee as A,
  an as B,
  Mn as C,
  Zi as D,
  I as E,
  si as I,
  fr as U,
  x as a,
  mn as b,
  $e as c,
  Se as d,
  rt as e,
  jn as f,
  ct as g,
  Pe as h,
  yr as i,
  Ar as j,
  oi as k,
  mt as l,
  Le as m,
  Ue as n,
  vr as o,
  Li as p,
  Vn as q,
  M as r,
  Ve as s,
  Wi as t,
  dt as u,
  Me as v,
  At as w,
  Tt as x,
  Qi as y,
  Bn as z
};
//# sourceMappingURL=index-CnvXRotu.js.map
