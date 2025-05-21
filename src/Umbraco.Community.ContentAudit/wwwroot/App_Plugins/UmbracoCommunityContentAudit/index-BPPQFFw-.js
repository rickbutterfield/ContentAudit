var Ja = Object.defineProperty;
var Kt = (t) => {
  throw TypeError(t);
};
var Qa = (t, e, n) => e in t ? Ja(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Ht = (t, e, n) => Qa(t, typeof e != "symbol" ? e + "" : e, n), Ft = (t, e, n) => e.has(t) || Kt("Cannot " + n);
var u = (t, e, n) => (Ft(t, e, "read from private field"), n ? n.call(t) : e.get(t)), _ = (t, e, n) => e.has(t) ? Kt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), C = (t, e, n, s) => (Ft(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
import { UMB_AUTH_CONTEXT as Za } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as H } from "@umbraco-cms/backoffice/element-api";
import { LitElement as W, html as r, css as h, property as V, customElement as d, nothing as gn, state as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as On } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as es } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as ts, UMB_WORKSPACE_CONDITION_ALIAS as j, UMB_WORKSPACE_MODAL as Ae } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as Q, tryExecuteAndNotify as ns } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as et, UmbArrayState as Xt } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as as } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as w, UMB_COLLECTION_ALIAS_CONDITION as f } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as y } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as ss } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as Te } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as ve } from "@umbraco-cms/backoffice/router";
const is = [
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
], os = [
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
var ls = Object.defineProperty, rs = Object.getOwnPropertyDescriptor, En = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? rs(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && ls(e, n, a), a;
};
let $e = class extends H(W) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = is[this.type - 1];
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
var cs = Object.defineProperty, us = Object.getOwnPropertyDescriptor, $n = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? us(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && cs(e, n, a), a;
};
let Se = class extends H(W) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = os[this.type - 1];
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
var ms = Object.defineProperty, ds = Object.getOwnPropertyDescriptor, Sn = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? ds(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && ms(e, n, a), a;
};
let rt = class extends H(W) {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? r`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : gn;
  }
};
Sn([
  V({ attribute: !1 })
], rt.prototype, "statusCode", 2);
rt = Sn([
  d("content-audit-status-code-label")
], rt);
var ps = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, Pn = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? hs(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && ps(e, n, a), a;
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
var Un = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(Un || {}), ut = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(ut || {}), _s = async (t, e) => {
  let n = typeof e == "function" ? await e(t) : e;
  if (n) return t.scheme === "bearer" ? `Bearer ${n}` : t.scheme === "basic" ? `Basic ${btoa(n)}` : n;
}, Cs = { bodySerializer: (t) => JSON.stringify(t, (e, n) => typeof n == "bigint" ? n.toString() : n) }, bs = (t) => {
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
}, fs = (t) => {
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
}, ys = (t) => {
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
}, Ln = ({ allowReserved: t, explode: e, name: n, style: s, value: a }) => {
  if (!e) {
    let l = (t ? a : a.map((m) => encodeURIComponent(m))).join(fs(s));
    switch (s) {
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
  let o = bs(s), i = a.map((l) => s === "label" || s === "simple" ? t ? l : encodeURIComponent(l) : We({ allowReserved: t, name: n, value: l })).join(o);
  return s === "label" || s === "matrix" ? o + i : i;
}, We = ({ allowReserved: t, name: e, value: n }) => {
  if (n == null) return "";
  if (typeof n == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${e}=${t ? n : encodeURIComponent(n)}`;
}, Nn = ({ allowReserved: t, explode: e, name: n, style: s, value: a }) => {
  if (a instanceof Date) return `${n}=${a.toISOString()}`;
  if (s !== "deepObject" && !e) {
    let l = [];
    Object.entries(a).forEach(([F, A]) => {
      l = [...l, F, t ? A : encodeURIComponent(A)];
    });
    let m = l.join(",");
    switch (s) {
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
  let o = ys(s), i = Object.entries(a).map(([l, m]) => We({ allowReserved: t, name: s === "deepObject" ? `${n}[${l}]` : l, value: m })).join(o);
  return s === "label" || s === "matrix" ? o + i : i;
}, As = /\{[^{}]+\}/g, Ts = ({ path: t, url: e }) => {
  let n = e, s = e.match(As);
  if (s) for (let a of s) {
    let o = !1, i = a.substring(1, a.length - 1), l = "simple";
    i.endsWith("*") && (o = !0, i = i.substring(0, i.length - 1)), i.startsWith(".") ? (i = i.substring(1), l = "label") : i.startsWith(";") && (i = i.substring(1), l = "matrix");
    let m = t[i];
    if (m == null) continue;
    if (Array.isArray(m)) {
      n = n.replace(a, Ln({ explode: o, name: i, style: l, value: m }));
      continue;
    }
    if (typeof m == "object") {
      n = n.replace(a, Nn({ explode: o, name: i, style: l, value: m }));
      continue;
    }
    if (l === "matrix") {
      n = n.replace(a, `;${We({ name: i, value: m })}`);
      continue;
    }
    let F = encodeURIComponent(l === "label" ? `.${m}` : m);
    n = n.replace(a, F);
  }
  return n;
}, kn = ({ allowReserved: t, array: e, object: n } = {}) => (s) => {
  let a = [];
  if (s && typeof s == "object") for (let o in s) {
    let i = s[o];
    if (i != null) if (Array.isArray(i)) {
      let l = Ln({ allowReserved: t, explode: !0, name: o, style: "form", value: i, ...e });
      l && a.push(l);
    } else if (typeof i == "object") {
      let l = Nn({ allowReserved: t, explode: !0, name: o, style: "deepObject", value: i, ...n });
      l && a.push(l);
    } else {
      let l = We({ allowReserved: t, name: o, value: i });
      l && a.push(l);
    }
  }
  return a.join("&");
}, vs = (t) => {
  var n;
  if (!t) return "stream";
  let e = (n = t.split(";")[0]) == null ? void 0 : n.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((s) => e.startsWith(s))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, Is = async ({ security: t, ...e }) => {
  for (let n of t) {
    let s = await _s(n, e.auth);
    if (!s) continue;
    let a = n.name ?? "Authorization";
    switch (n.in) {
      case "query":
        e.query || (e.query = {}), e.query[a] = s;
        break;
      case "cookie":
        e.headers.append("Cookie", `${a}=${s}`);
        break;
      case "header":
      default:
        e.headers.set(a, s);
        break;
    }
    return;
  }
}, Jt = (t) => ws({ baseUrl: t.baseUrl, path: t.path, query: t.query, querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : kn(t.querySerializer), url: t.url }), ws = ({ baseUrl: t, path: e, query: n, querySerializer: s, url: a }) => {
  let o = a.startsWith("/") ? a : `/${a}`, i = (t ?? "") + o;
  e && (i = Ts({ path: e, url: i }));
  let l = n ? s(n) : "";
  return l.startsWith("?") && (l = l.substring(1)), l && (i += `?${l}`), i;
}, Qt = (t, e) => {
  var s;
  let n = { ...t, ...e };
  return (s = n.baseUrl) != null && s.endsWith("/") && (n.baseUrl = n.baseUrl.substring(0, n.baseUrl.length - 1)), n.headers = Dn(t.headers, e.headers), n;
}, Dn = (...t) => {
  let e = new Headers();
  for (let n of t) {
    if (!n || typeof n != "object") continue;
    let s = n instanceof Headers ? n.entries() : Object.entries(n);
    for (let [a, o] of s) if (o === null) e.delete(a);
    else if (Array.isArray(o)) for (let i of o) e.append(a, i);
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
  exists(e) {
    return this._fns.indexOf(e) !== -1;
  }
  eject(e) {
    let n = this._fns.indexOf(e);
    n !== -1 && (this._fns = [...this._fns.slice(0, n), ...this._fns.slice(n + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}, gs = () => ({ error: new tt(), request: new tt(), response: new tt() }), Os = kn({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), Es = { "Content-Type": "application/json" }, Rn = (t = {}) => ({ ...Cs, headers: Es, parseAs: "auto", querySerializer: Os, ...t }), $s = (t = {}) => {
  let e = Qt(Rn(), t), n = () => ({ ...e }), s = (i) => (e = Qt(e, i), n()), a = gs(), o = async (i) => {
    let l = { ...e, ...i, fetch: i.fetch ?? e.fetch ?? globalThis.fetch, headers: Dn(e.headers, i.headers) };
    l.security && await Is({ ...l, security: l.security }), l.body && l.bodySerializer && (l.body = l.bodySerializer(l.body)), (l.body === void 0 || l.body === "") && l.headers.delete("Content-Type");
    let m = Jt(l), F = { redirect: "follow", ...l }, A = new Request(m, F);
    for (let T of a.request._fns) A = await T(A, l);
    let Xa = l.fetch, b = await Xa(A);
    for (let T of a.response._fns) b = await T(b, A, l);
    let we = { request: A, response: b };
    if (b.ok) {
      if (b.status === 204 || b.headers.get("Content-Length") === "0") return { data: {}, ...we };
      let T = (l.parseAs === "auto" ? vs(b.headers.get("Content-Type")) : l.parseAs) ?? "json";
      if (T === "stream") return { data: b.body, ...we };
      let Oe = await b[T]();
      return T === "json" && (l.responseValidator && await l.responseValidator(Oe), l.responseTransformer && (Oe = await l.responseTransformer(Oe))), { data: Oe, ...we };
    }
    let ge = await b.text();
    try {
      ge = JSON.parse(ge);
    } catch {
    }
    let X = ge;
    for (let T of a.error._fns) X = await T(ge, b, A, l);
    if (X = X || {}, l.throwOnError) throw X;
    return { error: X, ...we };
  };
  return { buildUrl: Jt, connect: (i) => o({ ...i, method: "CONNECT" }), delete: (i) => o({ ...i, method: "DELETE" }), get: (i) => o({ ...i, method: "GET" }), getConfig: n, head: (i) => o({ ...i, method: "HEAD" }), interceptors: a, options: (i) => o({ ...i, method: "OPTIONS" }), patch: (i) => o({ ...i, method: "PATCH" }), post: (i) => o({ ...i, method: "POST" }), put: (i) => o({ ...i, method: "PUT" }), request: o, setConfig: s, trace: (i) => o({ ...i, method: "TRACE" }) };
};
const p = $s(Rn({
  baseUrl: "http://localhost:26293",
  throwOnError: !0
}));
class Z {
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
class Ss {
  static getSettings(e) {
    return ((e == null ? void 0 : e.client) ?? p).get({
      url: "/umbraco/content-audit/api/v1/get-settings",
      ...e
    });
  }
}
var Ps = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, Wn = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Us(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Ps(e, n, a), a;
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
class yr extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class Ar extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class Tr extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const Ue = "Umb.Workspace.ContentAudit", Ls = "Umb.Context.ContentAudit", Vn = "content-audit";
var g;
class Ns {
  constructor(e) {
    _(this, g);
    C(this, g, e);
  }
  async getLatestAuditOverview() {
    return await Q(u(this, g), Z.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await Q(u(this, g), Z.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await Q(u(this, g), Z.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await Q(u(this, g), Z.getHealthScore());
  }
}
g = new WeakMap();
var Ce;
class ks {
  constructor(e) {
    _(this, Ce);
    C(this, Ce, e);
  }
  async getSettings() {
    return await ns(u(this, Ce), Ss.getSettings());
  }
}
Ce = new WeakMap();
var O, be;
class Ds extends On {
  constructor(n) {
    super(n);
    _(this, O);
    _(this, be);
    C(this, O, new Ns(this)), C(this, be, new ks(this));
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
    return u(this, be).getSettings();
  }
}
O = new WeakMap(), be = new WeakMap();
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
    this.workspaceAlias = Ue, C(this, q, new et(void 0)), this.latestAuditOverview = u(this, q).asObservable(), C(this, z, new Xt([], (s) => s.unique)), this.pagesWithMissingMetadata = u(this, z).asObservable(), C(this, Y, new Xt([], (s) => s.name)), this.topIssues = u(this, Y).asObservable(), C(this, G, new et(void 0)), this.healthScore = u(this, G).asObservable(), C(this, K, new et(void 0)), this.settings = u(this, K).asObservable(), this.provideContext(ts, this), this.provideContext(Mn, this), C(this, v, new Ds(this));
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
const Mn = new es(
  "ContentAuditContext"
), Rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const Ws = (t) => (e, n) => {
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
let Vs = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== xn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (yt && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = Zt.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Zt.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ms = (t) => new Vs(typeof t == "string" ? t : t + "", void 0, xn), xs = (t, e) => {
  if (yt) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), a = Ee.litNonce;
    a !== void 0 && s.setAttribute("nonce", a), s.textContent = n.cssText, t.appendChild(s);
  }
}, en = yt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return Ms(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: js, defineProperty: Bs, getOwnPropertyDescriptor: qs, getOwnPropertyNames: zs, getOwnPropertySymbols: Ys, getPrototypeOf: Gs } = Object, E = globalThis, tn = E.trustedTypes, Ks = tn ? tn.emptyScript : "", nt = E.reactiveElementPolyfillSupport, ee = (t, e) => t, dt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ks : null;
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
} }, jn = (t, e) => !js(t, e), nn = { attribute: !0, type: String, converter: dt, reflect: !1, useDefault: !1, hasChanged: jn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class J extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = nn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), a = this.getPropertyDescriptor(e, s, n);
      a !== void 0 && Bs(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: a, set: o } = qs(this.prototype, e) ?? { get() {
      return this[n];
    }, set(i) {
      this[n] = i;
    } };
    return { get: a, set(i) {
      const l = a == null ? void 0 : a.call(this);
      o == null || o.call(this, i), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? nn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ee("elementProperties"))) return;
    const e = Gs(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ee("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ee("properties"))) {
      const n = this.properties, s = [...zs(n), ...Ys(n)];
      for (const a of s) this.createProperty(a, n[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [s, a] of n) this.elementProperties.set(s, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, s] of this.elementProperties) {
      const a = this._$Eu(n, s);
      a !== void 0 && this._$Eh.set(a, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const a of s) n.unshift(en(a));
    } else e !== void 0 && n.push(en(e));
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
    return xs(e, this.constructor.elementStyles), e;
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
    var o;
    const s = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, s);
    if (a !== void 0 && s.reflect === !0) {
      const i = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : dt).toAttribute(n, s.type);
      this._$Em = e, i == null ? this.removeAttribute(a) : this.setAttribute(a, i), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var o, i;
    const s = this.constructor, a = s._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const l = s.getPropertyOptions(a), m = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : dt;
      this._$Em = a, this[a] = m.fromAttribute(n, l.type) ?? ((i = this._$Ej) == null ? void 0 : i.get(a)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, n, s) {
    var a;
    if (e !== void 0) {
      const o = this.constructor, i = this[e];
      if (s ?? (s = o.getPropertyOptions(e)), !((s.hasChanged ?? jn)(i, n) || s.useDefault && s.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, n, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: s, reflect: a, wrapped: o }, i) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, i ?? n ?? this[e]), o !== !0 || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (n = void 0), this._$AL.set(e, n)), a === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [o, i] of this._$Ep) this[o] = i;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [o, i] of a) {
        const { wrapped: l } = i, m = this[o];
        l !== !0 || this._$AL.has(o) || m === void 0 || this.C(o, void 0, i, m);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (s = this._$EO) == null || s.forEach((a) => {
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
    (n = this._$EO) == null || n.forEach((s) => {
      var a;
      return (a = s.hostUpdated) == null ? void 0 : a.call(s);
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
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[ee("elementProperties")] = /* @__PURE__ */ new Map(), J[ee("finalized")] = /* @__PURE__ */ new Map(), nt == null || nt({ ReactiveElement: J }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.1.0");
var Hs = Object.getOwnPropertyDescriptor, Fs = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Hs(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = i(a) || a);
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
Le = Fs([
  Ws("content-audit-workspace-root")
], Le);
const Xs = Le, Js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Le;
  },
  default: Xs
}, Symbol.toStringTag, { value: "Module" })), M = "Umb.Menu.ContentAudit", Ve = "Umb.Menu.ContentMetadata", Me = "Umb.Menu.ContentPerformance", At = "Umb.Menu.ContentTools", Tt = "Umb.Collection.ContentAudit.Issues", Qs = "Umb.CollectionView.ContentAudit.Issues.Table", Bn = "Umb.Repository.ContentAuditIssuesCollection";
var fe;
class Zs {
  constructor(e) {
    _(this, fe);
    C(this, fe, e);
  }
  async getCollection(e) {
    const { data: n, error: s } = await Q(u(this, fe), Z.getAllIssues({ query: e }));
    if (s)
      return { error: s };
    if (!n)
      return { data: { items: [], total: 0 } };
    const { items: a, total: o } = n;
    return { data: { items: a, total: o } };
  }
}
fe = new WeakMap();
var ye;
class an extends as {
  constructor(n) {
    super(n);
    _(this, ye);
    C(this, ye, new Zs(n));
  }
  async requestCollection(n) {
    return u(this, ye).getCollection(n);
  }
}
ye = new WeakMap();
const ei = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: an,
  default: an
}, Symbol.toStringTag, { value: "Module" }));
var ti = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, qn = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? ni(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && ti(e, n, a), a;
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
		` : gn;
  }
};
Ne.styles = [
  ss,
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
var ai = Object.defineProperty, si = Object.getOwnPropertyDescriptor, zn = (t) => {
  throw TypeError(t);
}, Ie = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? si(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && ai(e, n, a), a;
}, vt = (t, e, n) => e.has(t) || zn("Cannot " + n), sn = (t, e, n) => (vt(t, e, "read from private field"), e.get(t)), on = (t, e, n) => e.has(t) ? zn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ii = (t, e, n, s) => (vt(t, e, "write to private field"), e.set(t, n), n), pt = (t, e, n) => (vt(t, e, "access private method"), n), ne, te, Yn, It;
let I = class extends y {
  constructor() {
    super(), on(this, te), this.data = [], this._tableConfig = {
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
    ], this._tableItems = [], on(this, ne), this.consumeContext(w, (t) => {
      ii(this, ne, t), pt(this, te, Yn).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && pt(this, te, It).call(this, this.data);
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
ne = /* @__PURE__ */ new WeakMap();
te = /* @__PURE__ */ new WeakSet();
Yn = function() {
  sn(this, ne) && this.observe(sn(this, ne).items, (t) => pt(this, te, It).call(this, t), "umbCollectionItemsObserver");
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
Ie([
  V({ type: Array, attribute: !1 })
], I.prototype, "data", 2);
Ie([
  c()
], I.prototype, "_tableConfig", 2);
Ie([
  c()
], I.prototype, "_tableColumns", 2);
Ie([
  c()
], I.prototype, "_tableItems", 2);
I = Ie([
  d("content-audit-issues-table-collection-view")
], I);
const oi = I, li = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return I;
  },
  default: oi
}, Symbol.toStringTag, { value: "Module" })), Gn = "all-pages-root", ri = {
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
}, ci = [ri], ln = "Umb.Workspace.ContentAudit.AllPagesRoot", x = "Umb.Workspace.ContentAudit.AllPages", ui = [
  {
    type: "workspace",
    kind: "routable",
    alias: x,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-DxsO9NbV.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-CgHuEaP2.js"),
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
    js: () => import("./all-pages-links-workspace-view.element-DgZKywY4.js"),
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
    js: () => import("./all-pages-images-workspace-view.element-CK1fA6OM.js"),
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
    js: () => import("./all-pages-resources-workspace-view.element-BhDMGOVL.js"),
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
    js: () => import("./all-pages-issues-workspace-view.element-31K8AcTn.js"),
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
], wt = "Umb.Collection.ContentAudit.AllPages", mi = "Umb.CollectionView.ContentAudit.AllPages.Table", Kn = "Umb.Repository.ContentAuditAllPagesCollection";
var di = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, Hn = (t) => {
  throw TypeError(t);
}, xe = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? pi(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && di(e, n, a), a;
}, gt = (t, e, n) => e.has(t) || Hn("Cannot " + n), rn = (t, e, n) => (gt(t, e, "read from private field"), e.get(t)), cn = (t, e, n) => e.has(t) ? Hn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), hi = (t, e, n, s) => (gt(t, e, "write to private field"), e.set(t, n), n), Fn = (t, e, n) => (gt(t, e, "access private method"), n), ae, ke, Xn, Jn;
let $ = class extends y {
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
    ], this._tableItems = [], cn(this, ae), this.consumeContext(w, (t) => {
      hi(this, ae, t), Fn(this, ke, Xn).call(this);
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
ae = /* @__PURE__ */ new WeakMap();
ke = /* @__PURE__ */ new WeakSet();
Xn = function() {
  rn(this, ae) && this.observe(rn(this, ae).items, (t) => Fn(this, ke, Jn).call(this, t), "umbCollectionItemsObserver");
};
Jn = function(t) {
  this._tableItems = t.map((e) => {
    var n, s, a;
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
const _i = $, Ci = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return $;
  },
  default: _i
}, Symbol.toStringTag, { value: "Module" })), bi = [
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
      collectionAlias: wt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ln
      }
    ]
  }
], fi = [...ui, ...bi], yi = [
  {
    type: "repository",
    alias: Kn,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-D9siz0VH.js")
  }
], Ai = [
  {
    type: "collectionView",
    alias: mi,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => Ci),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: wt
      }
    ]
  }
], Ti = [
  {
    type: "collection",
    kind: "default",
    alias: wt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element-DMHaFpCF.js"),
    meta: {
      repositoryAlias: Kn
    }
  },
  ...yi,
  ...Ai
], vi = "Umb.Repository.ContentAudit.AllPages.Detail", Ii = "Umb.Store.ContentAudit.AllPages.Detail", wi = [
  {
    type: "repository",
    alias: vi,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository-Myyc2VCe.js")
  },
  {
    type: "store",
    alias: Ii,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], gi = [...wi], Oi = [
  ...fi,
  ...ci,
  ...Ti,
  ...gi
], Qn = "issues-root", Ei = {
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
}, $i = [Ei], un = "Umb.Workspace.ContentAudit.IssuesRoot", mn = "Umb.Workspace.ContentAudit.Issues", Si = [
  {
    type: "workspace",
    kind: "routable",
    alias: mn,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-zTIl5qDh.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-BtPRO9Mw.js"),
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
], Pi = [
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
], Ui = [...Si, ...Pi], Li = [
  {
    type: "repository",
    alias: Bn,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => ei)
  }
], Ni = [
  {
    type: "collectionView",
    alias: Qs,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => li),
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
], ki = [
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
  ...Li,
  ...Ni
], Di = "Umb.Repository.ContentAudit.Issues.Detail", Ri = "Umb.Store.ContentAudit.Issues.Detail", Wi = [
  {
    type: "repository",
    alias: Di,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-CHRtJw1H.js")
  },
  {
    type: "store",
    alias: Ri,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], Vi = [...Wi], Mi = [
  ...Ui,
  ...$i,
  ...ki,
  ...Vi
], Zn = "status-codes-root", xi = {
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
}, ji = [xi], Ot = "Umb.Collection.ContentAudit.StatusCodes", Bi = "Umb.CollectionView.ContentAudit.StatusCodes.Table", ea = "Umb.Repository.ContentAuditStatusCodesCollection";
var qi = Object.defineProperty, zi = Object.getOwnPropertyDescriptor, ta = (t) => {
  throw TypeError(t);
}, je = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? zi(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && qi(e, n, a), a;
}, Et = (t, e, n) => e.has(t) || ta("Cannot " + n), ht = (t, e, n) => (Et(t, e, "read from private field"), e.get(t)), at = (t, e, n) => e.has(t) ? ta("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), na = (t, e, n, s) => (Et(t, e, "write to private field"), e.set(t, n), n), $t = (t, e, n) => (Et(t, e, "access private method"), n), se, Be, ie, aa, sa, ia;
let S = class extends y {
  constructor() {
    super(), at(this, ie), this._tableConfig = {
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
    ], this._tableItems = [], at(this, se), at(this, Be), this.consumeContext(w, (t) => {
      na(this, se, t);
    }), $t(this, ie, aa).call(this);
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
ie = /* @__PURE__ */ new WeakSet();
aa = function() {
  new ve(this, Ae).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    na(this, Be, t), $t(this, ie, sa).call(this);
  });
};
sa = function() {
  ht(this, se) && this.observe(ht(this, se).items, (t) => $t(this, ie, ia).call(this, t), "umbCollectionItemsObserver");
};
ia = function(t) {
  const e = ht(this, Be);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    var a, o, i;
    const s = e({ entityType: n.entityType }) + Te.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${s}>${(a = n.pageData) == null ? void 0 : a.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = n.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "statusCode",
          value: r`<content-audit-status-code-label .statusCode=${(i = n.pageData) == null ? void 0 : i.statusCode}></content-audit-status-code-label>`
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
const Yi = S, Gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return S;
  },
  default: Yi
}, Symbol.toStringTag, { value: "Module" })), dn = "Umb.Workspace.ContentAudit.StatusCodes", Ki = [
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
], Hi = [
  {
    type: "repository",
    alias: ea,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-DaEWhXzX.js")
  }
], Fi = [
  {
    type: "collectionView",
    alias: Bi,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => Gi),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
        match: Ot
      }
    ]
  }
], Xi = [
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
  ...Hi,
  ...Fi
], Ji = [
  ...Ki,
  ...ji,
  ...Xi
], oa = "orphaned-pages-root", Qi = {
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
}, Zi = [Qi], St = "Umb.Collection.ContentAudit.OrphanedPages", eo = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", la = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var to = Object.defineProperty, no = Object.getOwnPropertyDescriptor, ra = (t) => {
  throw TypeError(t);
}, qe = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? no(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && to(e, n, a), a;
}, Pt = (t, e, n) => e.has(t) || ra("Cannot " + n), _t = (t, e, n) => (Pt(t, e, "read from private field"), e.get(t)), st = (t, e, n) => e.has(t) ? ra("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), ca = (t, e, n, s) => (Pt(t, e, "write to private field"), e.set(t, n), n), Ut = (t, e, n) => (Pt(t, e, "access private method"), n), oe, ze, le, ua, ma, da;
let P = class extends y {
  constructor() {
    super(), st(this, le), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], st(this, oe), st(this, ze), this.consumeContext(w, (t) => {
      ca(this, oe, t);
    }), Ut(this, le, ua).call(this);
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
oe = /* @__PURE__ */ new WeakMap();
ze = /* @__PURE__ */ new WeakMap();
le = /* @__PURE__ */ new WeakSet();
ua = function() {
  new ve(this, Ae).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    ca(this, ze, t), Ut(this, le, ma).call(this);
  });
};
ma = function() {
  _t(this, oe) && this.observe(_t(this, oe).items, (t) => Ut(this, le, da).call(this, t), "umbCollectionItemsObserver");
};
da = function(t) {
  const e = _t(this, ze);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    const s = e({ entityType: "document" }) + Te.generateLocal({ unique: n.unique });
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
const ao = P, so = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return P;
  },
  default: ao
}, Symbol.toStringTag, { value: "Module" })), pn = "Umb.Workspace.ContentAudit.OrphanedPages", io = [
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
    api: () => import("./orphaned-pages-collection.repository-CLfHYqnX.js")
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
  ...io,
  ...Zi,
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
}, Ye = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? _o(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && ho(e, n, a), a;
}, Nt = (t, e, n) => e.has(t) || _a("Cannot " + n), Ct = (t, e, n) => (Nt(t, e, "read from private field"), e.get(t)), it = (t, e, n) => e.has(t) ? _a("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ca = (t, e, n, s) => (Nt(t, e, "write to private field"), e.set(t, n), n), kt = (t, e, n) => (Nt(t, e, "access private method"), n), re, Ge, ce, ba, fa, ya;
let U = class extends y {
  constructor() {
    super(), it(this, ce), this._tableConfig = {
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
    ], this._tableItems = [], it(this, re), it(this, Ge), this.consumeContext(w, (t) => {
      Ca(this, re, t);
    }), kt(this, ce, ba).call(this);
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
Ge = /* @__PURE__ */ new WeakMap();
ce = /* @__PURE__ */ new WeakSet();
ba = function() {
  new ve(this, Ae).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ca(this, Ge, t), kt(this, ce, fa).call(this);
  });
};
fa = function() {
  Ct(this, re) && this.observe(Ct(this, re).items, (t) => kt(this, ce, ya).call(this, t), "umbCollectionItemsObserver");
};
ya = function(t) {
  const e = Ct(this, Ge);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    const s = e({ entityType: "document" }) + Te.generateLocal({ unique: n.unique });
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
    api: () => import("./images-alt-text-collection.repository-Cabc-Rul.js")
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
        alias: f,
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
}, wo = [Io], Dt = "Umb.Collection.ContentAudit.OutboundLinks", go = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", Ta = "Umb.Repository.ContentAuditOutboundLinksCollection";
var Oo = Object.defineProperty, Eo = Object.getOwnPropertyDescriptor, va = (t) => {
  throw TypeError(t);
}, Ke = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Eo(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Oo(e, n, a), a;
}, Rt = (t, e, n) => e.has(t) || va("Cannot " + n), _n = (t, e, n) => (Rt(t, e, "read from private field"), e.get(t)), Cn = (t, e, n) => e.has(t) ? va("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), $o = (t, e, n, s) => (Rt(t, e, "write to private field"), e.set(t, n), n), Ia = (t, e, n) => (Rt(t, e, "access private method"), n), ue, De, wa, ga;
let L = class extends y {
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
    ], this._tableItems = [], Cn(this, ue), this.consumeContext(w, (t) => {
      $o(this, ue, t), Ia(this, De, wa).call(this);
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
ue = /* @__PURE__ */ new WeakMap();
De = /* @__PURE__ */ new WeakSet();
wa = function() {
  _n(this, ue) && this.observe(_n(this, ue).items, (t) => Ia(this, De, ga).call(this, t), "umbCollectionItemsObserver");
};
ga = function(t) {
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
    api: () => import("./outbound-links-collection.repository-ClhpFbYV.js")
  }
], No = [
  {
    type: "collectionView",
    alias: go,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => Po),
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
  ...wo,
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
}, He = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? xo(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Mo(e, n, a), a;
}, Vt = (t, e, n) => e.has(t) || $a("Cannot " + n), fn = (t, e, n) => (Vt(t, e, "read from private field"), e.get(t)), yn = (t, e, n) => e.has(t) ? $a("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), jo = (t, e, n, s) => (Vt(t, e, "write to private field"), e.set(t, n), n), Sa = (t, e, n) => (Vt(t, e, "access private method"), n), me, Re, Pa, Ua;
let N = class extends y {
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
    ], this._tableItems = [], yn(this, me), this.consumeContext(w, (t) => {
      jo(this, me, t), Sa(this, Re, Pa).call(this);
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
Re = /* @__PURE__ */ new WeakSet();
Pa = function() {
  fn(this, me) && this.observe(fn(this, me).items, (t) => Sa(this, Re, Ua).call(this, t), "umbCollectionItemsObserver");
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
    api: () => import("./inbound-links-collection.repository-mSm6pG9o.js")
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
        alias: f,
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
    api: () => import("./metadata-collection.repository-DHU6U4C8.js")
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
        alias: f,
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
], al = [], xt = "Umb.Collection.ContentAudit.DuplicateContent", sl = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", ka = "Umb.Repository.ContentAuditDuplicateContentCollection";
var il = Object.defineProperty, ol = Object.getOwnPropertyDescriptor, Fe = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? ol(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && il(e, n, a), a;
};
let k = class extends y {
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
    api: () => import("./duplicate-content-collection.repository-DP0bn4Cg.js")
  }
], dl = [
  {
    type: "collectionView",
    alias: sl,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => rl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: f,
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
}, Xe = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? yl(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && fl(e, n, a), a;
}, Bt = (t, e, n) => e.has(t) || Wa("Cannot " + n), bt = (t, e, n) => (Bt(t, e, "read from private field"), e.get(t)), ot = (t, e, n) => e.has(t) ? Wa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Va = (t, e, n, s) => (Bt(t, e, "write to private field"), e.set(t, n), n), qt = (t, e, n) => (Bt(t, e, "access private method"), n), de, Je, pe, Ma, xa, ja;
let D = class extends y {
  constructor() {
    super(), ot(this, pe), this._tableConfig = {
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
    ], this._tableItems = [], ot(this, de), ot(this, Je), this.consumeContext(w, (t) => {
      Va(this, de, t);
    }), qt(this, pe, Ma).call(this);
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
Je = /* @__PURE__ */ new WeakMap();
pe = /* @__PURE__ */ new WeakSet();
Ma = function() {
  new ve(this, Ae).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Va(this, Je, t), qt(this, pe, xa).call(this);
  });
};
xa = function() {
  bt(this, de) && this.observe(bt(this, de).items, (t) => qt(this, pe, ja).call(this, t), "umbCollectionItemsObserver");
};
ja = function(t) {
  const e = bt(this, Je);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    var a, o, i;
    const s = e({ entityType: n.entityType }) + Te.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${s}>${(a = n.pageData) == null ? void 0 : a.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = n.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "pageSize",
          value: r`${Math.round(((i = n.performanceData) == null ? void 0 : i.totalBytes) / 1024)}KB`
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
    api: () => import("./carbon-rating-collection.repository-C2lkKiG4.js")
  }
], wl = [
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
        alias: f,
        match: jt
      }
    ]
  }
], gl = [
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
  ...wl
], Ol = [
  ...vl,
  ...Cl,
  ...gl
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
}, Qe = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Ul(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Pl(e, n, a), a;
}, Yt = (t, e, n) => e.has(t) || za("Cannot " + n), ft = (t, e, n) => (Yt(t, e, "read from private field"), e.get(t)), lt = (t, e, n) => e.has(t) ? za("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ya = (t, e, n, s) => (Yt(t, e, "write to private field"), e.set(t, n), n), Gt = (t, e, n) => (Yt(t, e, "access private method"), n), he, Ze, _e, Ga, Ka, Ha;
let R = class extends y {
  constructor() {
    super(), lt(this, _e), this._tableConfig = {
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
    ], this._tableItems = [], lt(this, he), lt(this, Ze), this.consumeContext(w, (t) => {
      Ya(this, he, t);
    }), Gt(this, _e, Ga).call(this);
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
he = /* @__PURE__ */ new WeakMap();
Ze = /* @__PURE__ */ new WeakMap();
_e = /* @__PURE__ */ new WeakSet();
Ga = function() {
  new ve(this, Ae).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ya(this, Ze, t), Gt(this, _e, Ka).call(this);
  });
};
Ka = function() {
  ft(this, he) && this.observe(ft(this, he).items, (t) => Gt(this, _e, Ha).call(this, t), "umbCollectionItemsObserver");
};
Ha = function(t) {
  const e = ft(this, Ze);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.filter((n) => n.pageData.statusCode === 200).map((n) => {
    var a;
    const s = e({ entityType: n.entityType }) + Te.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: r`<a href=${s}>${(a = n.pageData) == null ? void 0 : a.url}</a>`
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
}, Symbol.toStringTag, { value: "Module" })), wn = "Umb.Workspace.ContentAudit.CoreWebVitals", kl = [
  {
    type: "workspace",
    kind: "default",
    alias: wn,
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
        match: wn
      }
    ]
  }
], Dl = [
  {
    type: "repository",
    alias: qa,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository-CaFH86eG.js")
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
        alias: f,
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
    element: () => import("./export.element-DqhniDUX.js"),
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
  ...Oi,
  ...Mi,
  ...Ji,
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
  element: () => Promise.resolve().then(() => Js),
  meta: {
    entityType: Vn
  }
}, Xl = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-CgO0yq95.js"),
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
    element: () => import("./settings.element-D78G_VAZ.js"),
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
    element: () => import("./run-warning-modal.element-DEBDyV-o.js")
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
  js: () => import("./contentaudit-workspace-view--oN-G60C.js"),
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
  alias: Ls,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Rs)
}, Ir = async (t, e) => {
  t.consumeContext(Za, async (n) => {
    if (!n) return;
    const s = n.getOpenApiConfiguration();
    p.setConfig({
      auth: () => n.getLatestToken(),
      baseUrl: s.base,
      credentials: s.credentials
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
  Z as A,
  an as B,
  Mn as C,
  Zs as D,
  I as E,
  is as I,
  yr as U,
  x as a,
  mn as b,
  $e as c,
  Se as d,
  rt as e,
  jn as f,
  ct as g,
  Pe as h,
  Ar as i,
  Tr as j,
  os as k,
  mt as l,
  Le as m,
  Ue as n,
  Ir as o,
  Ls as p,
  Vn as q,
  M as r,
  Ve as s,
  Ws as t,
  dt as u,
  Me as v,
  At as w,
  Tt as x,
  Qs as y,
  Bn as z
};
//# sourceMappingURL=index-BPPQFFw-.js.map
