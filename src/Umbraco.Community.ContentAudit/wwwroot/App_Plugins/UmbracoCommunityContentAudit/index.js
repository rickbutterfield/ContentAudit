var ha = (t) => {
  throw TypeError(t);
};
var _a = (t, e, a) => e.has(t) || ha("Cannot " + a);
var u = (t, e, a) => (_a(t, e, "read from private field"), a ? a.call(t) : e.get(t)), y = (t, e, a) => e.has(t) ? ha("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), A = (t, e, a, n) => (_a(t, e, "write to private field"), n ? n.call(t, a) : e.set(t, a), a);
import { UMB_AUTH_CONTEXT as Oi } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as ce } from "@umbraco-cms/backoffice/element-api";
import { LitElement as J, html as m, css as T, property as H, customElement as b, nothing as Ya, state as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as Ha } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as Ei } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as Si, UMB_WORKSPACE_CONDITION_ALIAS as w, UMB_WORKSPACE_MODAL as ke } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as ee, tryExecuteAndNotify as $i } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as ht, UmbArrayState as _t } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as Pi } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as D, UMB_COLLECTION_ALIAS_CONDITION as I } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as U } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Ui } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as Ne } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as De } from "@umbraco-cms/backoffice/router";
const Li = [
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
], ki = [
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
var Ni = Object.defineProperty, Di = Object.getOwnPropertyDescriptor, Ka = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Di(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Ni(e, a, i), i;
};
let je = class extends ce(J) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Li[this.type - 1];
      return m`
                <uui-tag color=${t == null ? void 0 : t.color}>
                    <uui-icon name="${t == null ? void 0 : t.icon}"></uui-icon>
                    ${t == null ? void 0 : t.label}
                </uui-tag>
            `;
    }
  }
};
je.styles = [
  T`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Ka([
  H({ attribute: !1 })
], je.prototype, "type", 2);
je = Ka([
  b("content-audit-issue-type-label")
], je);
var Ri = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, Fa = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Wi(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Ri(e, a, i), i;
};
let Be = class extends ce(J) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = ki[this.type - 1];
      return m`
                <uui-tag color=${t == null ? void 0 : t.color}>
                    <uui-icon name="${t == null ? void 0 : t.icon}"></uui-icon>
                    ${t == null ? void 0 : t.label}
                </uui-tag>
            `;
    }
  }
};
Be.styles = [
  T`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Fa([
  H({ attribute: !1 })
], Be.prototype, "type", 2);
Be = Fa([
  b("content-audit-priority-type-label")
], Be);
var Vi = Object.defineProperty, xi = Object.getOwnPropertyDescriptor, Ga = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? xi(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Vi(e, a, i), i;
};
let wt = class extends ce(J) {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? m`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : Ya;
  }
};
Ga([
  H({ attribute: !1 })
], wt.prototype, "statusCode", 2);
wt = Ga([
  b("content-audit-status-code-label")
], wt);
var Mi = Object.defineProperty, ji = Object.getOwnPropertyDescriptor, Xa = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? ji(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Mi(e, a, i), i;
};
let It = class extends ce(J) {
  constructor() {
    super(...arguments), this.value = "";
  }
  _getColour() {
    return this.value == "E" || this.value == "F" ? "danger" : this.value == "D" ? "warning" : "positive";
  }
  render() {
    if (this.value != null)
      return m`
                <uui-tag .color=${this._getColour()}>
                    ${this.value}
                </uui-tag>
            `;
  }
};
Xa([
  H({ attribute: !0 })
], It.prototype, "value", 2);
It = Xa([
  b("content-audit-carbon-intensity-label")
], It);
var Ja = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(Ja || {}), Ot = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(Ot || {});
const Bi = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, a) => typeof a == "bigint" ? a.toString() : a
  )
}, zi = ({
  onRequest: t,
  onSseError: e,
  onSseEvent: a,
  responseTransformer: n,
  responseValidator: i,
  sseDefaultRetryDelay: o,
  sseMaxRetryAttempts: s,
  sseMaxRetryDelay: r,
  sseSleepFn: c,
  url: h,
  ...l
}) => {
  let C;
  const ue = c ?? ((p) => new Promise((v) => setTimeout(v, p)));
  return { stream: async function* () {
    let p = o ?? 3e3, v = 0;
    const F = l.signal ?? new AbortController().signal;
    for (; !F.aborted; ) {
      v++;
      const me = l.headers instanceof Headers ? l.headers : new Headers(l.headers);
      C !== void 0 && me.set("Last-Event-ID", C);
      try {
        const G = {
          redirect: "follow",
          ...l,
          body: l.serializedBody,
          headers: me,
          signal: F
        };
        let S = new Request(h, G);
        t && (S = await t(h, G));
        const g = await (l.fetch ?? globalThis.fetch)(S);
        if (!g.ok)
          throw new Error(
            `SSE failed: ${g.status} ${g.statusText}`
          );
        if (!g.body) throw new Error("No body in SSE response");
        const $ = g.body.pipeThrough(new TextDecoderStream()).getReader();
        let pt = "";
        const ca = () => {
          try {
            $.cancel();
          } catch {
          }
        };
        F.addEventListener("abort", ca);
        try {
          for (; ; ) {
            const { done: vi, value: gi } = await $.read();
            if (vi) break;
            pt += gi;
            const ua = pt.split(`

`);
            pt = ua.pop() ?? "";
            for (const wi of ua) {
              const Ii = wi.split(`
`), We = [];
              let ma;
              for (const O of Ii)
                if (O.startsWith("data:"))
                  We.push(O.replace(/^data:\s*/, ""));
                else if (O.startsWith("event:"))
                  ma = O.replace(/^event:\s*/, "");
                else if (O.startsWith("id:"))
                  C = O.replace(/^id:\s*/, "");
                else if (O.startsWith("retry:")) {
                  const pa = Number.parseInt(
                    O.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(pa) || (p = pa);
                }
              let X, da = !1;
              if (We.length) {
                const O = We.join(`
`);
                try {
                  X = JSON.parse(O), da = !0;
                } catch {
                  X = O;
                }
              }
              da && (i && await i(X), n && (X = await n(X))), a == null || a({
                data: X,
                event: ma,
                id: C,
                retry: p
              }), We.length && (yield X);
            }
          }
        } finally {
          F.removeEventListener("abort", ca), $.releaseLock();
        }
        break;
      } catch (G) {
        if (e == null || e(G), s !== void 0 && v >= s)
          break;
        const S = Math.min(
          p * 2 ** (v - 1),
          r ?? 3e4
        );
        await ue(S);
      }
    }
  }() };
}, qi = (t) => {
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
}, Yi = (t) => {
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
}, Hi = (t) => {
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
}, Qa = ({
  allowReserved: t,
  explode: e,
  name: a,
  style: n,
  value: i
}) => {
  if (!e) {
    const r = (t ? i : i.map((c) => encodeURIComponent(c))).join(Yi(n));
    switch (n) {
      case "label":
        return `.${r}`;
      case "matrix":
        return `;${a}=${r}`;
      case "simple":
        return r;
      default:
        return `${a}=${r}`;
    }
  }
  const o = qi(n), s = i.map((r) => n === "label" || n === "simple" ? t ? r : encodeURIComponent(r) : Xe({
    allowReserved: t,
    name: a,
    value: r
  })).join(o);
  return n === "label" || n === "matrix" ? o + s : s;
}, Xe = ({
  allowReserved: t,
  name: e,
  value: a
}) => {
  if (a == null)
    return "";
  if (typeof a == "object")
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these."
    );
  return `${e}=${t ? a : encodeURIComponent(a)}`;
}, Za = ({
  allowReserved: t,
  explode: e,
  name: a,
  style: n,
  value: i,
  valueOnly: o
}) => {
  if (i instanceof Date)
    return o ? i.toISOString() : `${a}=${i.toISOString()}`;
  if (n !== "deepObject" && !e) {
    let c = [];
    Object.entries(i).forEach(([l, C]) => {
      c = [
        ...c,
        l,
        t ? C : encodeURIComponent(C)
      ];
    });
    const h = c.join(",");
    switch (n) {
      case "form":
        return `${a}=${h}`;
      case "label":
        return `.${h}`;
      case "matrix":
        return `;${a}=${h}`;
      default:
        return h;
    }
  }
  const s = Hi(n), r = Object.entries(i).map(
    ([c, h]) => Xe({
      allowReserved: t,
      name: n === "deepObject" ? `${a}[${c}]` : c,
      value: h
    })
  ).join(s);
  return n === "label" || n === "matrix" ? s + r : r;
}, Ki = /\{[^{}]+\}/g, Fi = ({ path: t, url: e }) => {
  let a = e;
  const n = e.match(Ki);
  if (n)
    for (const i of n) {
      let o = !1, s = i.substring(1, i.length - 1), r = "simple";
      s.endsWith("*") && (o = !0, s = s.substring(0, s.length - 1)), s.startsWith(".") ? (s = s.substring(1), r = "label") : s.startsWith(";") && (s = s.substring(1), r = "matrix");
      const c = t[s];
      if (c == null)
        continue;
      if (Array.isArray(c)) {
        a = a.replace(
          i,
          Qa({ explode: o, name: s, style: r, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        a = a.replace(
          i,
          Za({
            explode: o,
            name: s,
            style: r,
            value: c,
            valueOnly: !0
          })
        );
        continue;
      }
      if (r === "matrix") {
        a = a.replace(
          i,
          `;${Xe({
            name: s,
            value: c
          })}`
        );
        continue;
      }
      const h = encodeURIComponent(
        r === "label" ? `.${c}` : c
      );
      a = a.replace(i, h);
    }
  return a;
}, Gi = ({
  baseUrl: t,
  path: e,
  query: a,
  querySerializer: n,
  url: i
}) => {
  const o = i.startsWith("/") ? i : `/${i}`;
  let s = (t ?? "") + o;
  e && (s = Fi({ path: e, url: s }));
  let r = a ? n(a) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (s += `?${r}`), s;
};
function Xi(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const Ji = async (t, e) => {
  const a = typeof e == "function" ? await e(t) : e;
  if (a)
    return t.scheme === "bearer" ? `Bearer ${a}` : t.scheme === "basic" ? `Basic ${btoa(a)}` : a;
}, en = ({
  allowReserved: t,
  array: e,
  object: a
} = {}) => (i) => {
  const o = [];
  if (i && typeof i == "object")
    for (const s in i) {
      const r = i[s];
      if (r != null)
        if (Array.isArray(r)) {
          const c = Qa({
            allowReserved: t,
            explode: !0,
            name: s,
            style: "form",
            value: r,
            ...e
          });
          c && o.push(c);
        } else if (typeof r == "object") {
          const c = Za({
            allowReserved: t,
            explode: !0,
            name: s,
            style: "deepObject",
            value: r,
            ...a
          });
          c && o.push(c);
        } else {
          const c = Xe({
            allowReserved: t,
            name: s,
            value: r
          });
          c && o.push(c);
        }
    }
  return o.join("&");
}, Qi = (t) => {
  var a;
  if (!t)
    return "stream";
  const e = (a = t.split(";")[0]) == null ? void 0 : a.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json"))
      return "json";
    if (e === "multipart/form-data")
      return "formData";
    if (["application/", "audio/", "image/", "video/"].some(
      (n) => e.startsWith(n)
    ))
      return "blob";
    if (e.startsWith("text/"))
      return "text";
  }
}, Zi = (t, e) => {
  var a, n;
  return e ? !!(t.headers.has(e) || (a = t.query) != null && a[e] || (n = t.headers.get("Cookie")) != null && n.includes(`${e}=`)) : !1;
}, es = async ({
  security: t,
  ...e
}) => {
  for (const a of t) {
    if (Zi(e, a.name))
      continue;
    const n = await Ji(a, e.auth);
    if (!n)
      continue;
    const i = a.name ?? "Authorization";
    switch (a.in) {
      case "query":
        e.query || (e.query = {}), e.query[i] = n;
        break;
      case "cookie":
        e.headers.append("Cookie", `${i}=${n}`);
        break;
      case "header":
      default:
        e.headers.set(i, n);
        break;
    }
  }
}, Ca = (t) => Gi({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : en(t.querySerializer),
  url: t.url
}), ba = (t, e) => {
  var n;
  const a = { ...t, ...e };
  return (n = a.baseUrl) != null && n.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = tn(t.headers, e.headers), a;
}, ts = (t) => {
  const e = [];
  return t.forEach((a, n) => {
    e.push([n, a]);
  }), e;
}, tn = (...t) => {
  const e = new Headers();
  for (const a of t) {
    if (!a)
      continue;
    const n = a instanceof Headers ? ts(a) : Object.entries(a);
    for (const [i, o] of n)
      if (o === null)
        e.delete(i);
      else if (Array.isArray(o))
        for (const s of o)
          e.append(i, s);
      else o !== void 0 && e.set(
        i,
        typeof o == "object" ? JSON.stringify(o) : o
      );
  }
  return e;
};
class Ct {
  constructor() {
    this.fns = [];
  }
  clear() {
    this.fns = [];
  }
  eject(e) {
    const a = this.getInterceptorIndex(e);
    this.fns[a] && (this.fns[a] = null);
  }
  exists(e) {
    const a = this.getInterceptorIndex(e);
    return !!this.fns[a];
  }
  getInterceptorIndex(e) {
    return typeof e == "number" ? this.fns[e] ? e : -1 : this.fns.indexOf(e);
  }
  update(e, a) {
    const n = this.getInterceptorIndex(e);
    return this.fns[n] ? (this.fns[n] = a, e) : !1;
  }
  use(e) {
    return this.fns.push(e), this.fns.length - 1;
  }
}
const as = () => ({
  error: new Ct(),
  request: new Ct(),
  response: new Ct()
}), ns = en({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), is = {
  "Content-Type": "application/json"
}, an = (t = {}) => ({
  ...Bi,
  headers: is,
  parseAs: "auto",
  querySerializer: ns,
  ...t
}), ss = (t = {}) => {
  let e = ba(an(), t);
  const a = () => ({ ...e }), n = (h) => (e = ba(e, h), a()), i = as(), o = async (h) => {
    const l = {
      ...e,
      ...h,
      fetch: h.fetch ?? e.fetch ?? globalThis.fetch,
      headers: tn(e.headers, h.headers),
      serializedBody: void 0
    };
    l.security && await es({
      ...l,
      security: l.security
    }), l.requestValidator && await l.requestValidator(l), l.body !== void 0 && l.bodySerializer && (l.serializedBody = l.bodySerializer(l.body)), (l.body === void 0 || l.serializedBody === "") && l.headers.delete("Content-Type");
    const C = Ca(l);
    return { opts: l, url: C };
  }, s = async (h) => {
    const { opts: l, url: C } = await o(h), ue = {
      redirect: "follow",
      ...l,
      body: Xi(l)
    };
    let L = new Request(C, ue);
    for (const f of i.request.fns)
      f && (L = await f(L, l));
    const Re = l.fetch;
    let p = await Re(L);
    for (const f of i.response.fns)
      f && (p = await f(p, L, l));
    const v = {
      request: L,
      response: p
    };
    if (p.ok) {
      const f = (l.parseAs === "auto" ? Qi(p.headers.get("Content-Type")) : l.parseAs) ?? "json";
      if (p.status === 204 || p.headers.get("Content-Length") === "0") {
        let $;
        switch (f) {
          case "arrayBuffer":
          case "blob":
          case "text":
            $ = await p[f]();
            break;
          case "formData":
            $ = new FormData();
            break;
          case "stream":
            $ = p.body;
            break;
          case "json":
          default:
            $ = {};
            break;
        }
        return l.responseStyle === "data" ? $ : {
          data: $,
          ...v
        };
      }
      let g;
      switch (f) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          g = await p[f]();
          break;
        case "stream":
          return l.responseStyle === "data" ? p.body : {
            data: p.body,
            ...v
          };
      }
      return f === "json" && (l.responseValidator && await l.responseValidator(g), l.responseTransformer && (g = await l.responseTransformer(g))), l.responseStyle === "data" ? g : {
        data: g,
        ...v
      };
    }
    const F = await p.text();
    let me;
    try {
      me = JSON.parse(F);
    } catch {
    }
    const G = me ?? F;
    let S = G;
    for (const f of i.error.fns)
      f && (S = await f(G, p, L, l));
    if (S = S || {}, l.throwOnError)
      throw S;
    return l.responseStyle === "data" ? void 0 : {
      error: S,
      ...v
    };
  }, r = (h) => (l) => s({ ...l, method: h }), c = (h) => async (l) => {
    const { opts: C, url: ue } = await o(l);
    return zi({
      ...C,
      body: C.body,
      headers: C.headers,
      method: h,
      onRequest: async (L, Re) => {
        let p = new Request(L, Re);
        for (const v of i.request.fns)
          v && (p = await v(p, C));
        return p;
      },
      url: ue
    });
  };
  return {
    buildUrl: Ca,
    connect: r("CONNECT"),
    delete: r("DELETE"),
    get: r("GET"),
    getConfig: a,
    head: r("HEAD"),
    interceptors: i,
    options: r("OPTIONS"),
    patch: r("PATCH"),
    post: r("POST"),
    put: r("PUT"),
    request: s,
    setConfig: n,
    sse: {
      connect: c("CONNECT"),
      delete: c("DELETE"),
      get: c("GET"),
      head: c("HEAD"),
      options: c("OPTIONS"),
      patch: c("PATCH"),
      post: c("POST"),
      put: c("PUT"),
      trace: c("TRACE")
    },
    trace: r("TRACE")
  };
}, _ = ss(an({
  baseUrl: "http://localhost:26297",
  throwOnError: !0
}));
class Ve {
  static getCollection(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit",
      ...e
    });
  }
  static delete(e) {
    return (e.client ?? _).delete({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}",
      ...e
    });
  }
  static getByKey(e) {
    return (e.client ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}",
      ...e
    });
  }
  static exportByKey(e) {
    return (e.client ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/export",
      ...e
    });
  }
  static overviewByKey(e) {
    return (e.client ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/overview",
      ...e
    });
  }
  static getAllImages(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/all-images",
      ...e
    });
  }
  static getDuplicateContentUrls(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/duplicate-content",
      ...e
    });
  }
  static export(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/export",
      ...e
    });
  }
  static getExternalLinks(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/external-links",
      ...e
    });
  }
  static getHealthScore(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/health-score",
      ...e
    });
  }
  static getInternalLinks(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/internal-links",
      ...e
    });
  }
  static getLatestAuditData(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/latest-data",
      ...e
    });
  }
  static getPagesWithMissingMetadata(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/missing-metadata",
      ...e
    });
  }
  static getOrphanedPages(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/orphaned-pages",
      ...e
    });
  }
  static overview(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/overview",
      ...e
    });
  }
  static children(e) {
    return (e.client ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/tree/audit/children/{parentId}",
      ...e
    });
  }
  static root(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/tree/audit/root",
      ...e
    });
  }
}
class oc {
  static startCrawl(e) {
    return ((e == null ? void 0 : e.client) ?? _).sse.get({
      url: "/umbraco/content-audit/management/api/v1/crawl",
      ...e
    });
  }
}
class nn {
  static getAllIssues(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/issue",
      ...e
    });
  }
  static getIssue(e) {
    return (e.client ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/issue/{id}",
      ...e
    });
  }
}
class os {
  static getSettings(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/settings",
      ...e
    });
  }
}
var rs = Object.defineProperty, ls = Object.getOwnPropertyDescriptor, sn = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? ls(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && rs(e, a, i), i;
};
let ze = class extends ce(J) {
  _getColour() {
    return this.value != null ? this.value.rating == Ot.POOR ? "danger" : this.value.rating == Ot.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == Ja.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
  }
  render() {
    if (this.value != null)
      return m`
                <uui-tag .color=${this._getColour()}>
                    ${this._formatValue()}
                </uui-tag>
            `;
  }
};
ze.styles = [
  T`
            uui-tag {
                font-size: 14px;
            }
        `
];
sn([
  H({ attribute: !1 })
], ze.prototype, "value", 2);
ze = sn([
  b("content-audit-metric-label")
], ze);
class rc extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class lc extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class cc extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const qe = "Umb.Workspace.ContentAudit", cs = "Umb.Context.ContentAudit", on = "content-audit";
var k;
class us {
  constructor(e) {
    y(this, k);
    A(this, k, e);
  }
  async getLatestAuditOverview() {
    return await ee(u(this, k), Ve.overview());
  }
  async getPagesWithMissingMetadata() {
    return await ee(u(this, k), Ve.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await ee(u(this, k), nn.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await ee(u(this, k), Ve.getHealthScore());
  }
  async getAuditOverviews() {
    return await ee(u(this, k), Ve.getCollection({
      query: { skip: 0, take: 5 }
    }));
  }
}
k = new WeakMap();
var $e;
class ms {
  constructor(e) {
    y(this, $e);
    A(this, $e, e);
  }
  async getSettings() {
    return await $i(u(this, $e), os.getSettings());
  }
}
$e = new WeakMap();
var N, Pe;
class ds extends Ha {
  constructor(a) {
    super(a);
    y(this, N);
    y(this, Pe);
    A(this, N, new us(this)), A(this, Pe, new ms(this));
  }
  async getLatestAuditOverview() {
    return u(this, N).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return u(this, N).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return u(this, N).getTopIssues();
  }
  async getHealthScore() {
    return u(this, N).getHealthScore();
  }
  async getSettings() {
    return u(this, Pe).getSettings();
  }
  async getAuditOverviews() {
    return u(this, N).getAuditOverviews();
  }
}
N = new WeakMap(), Pe = new WeakMap();
var P, ne, ie, se, oe, re, le;
class Et extends Ha {
  constructor(a) {
    super(a);
    y(this, P);
    y(this, ne);
    y(this, ie);
    y(this, se);
    y(this, oe);
    y(this, re);
    y(this, le);
    this.workspaceAlias = qe, A(this, ne, new ht(void 0)), this.latestAuditOverview = u(this, ne).asObservable(), A(this, ie, new _t([], (n) => n.key)), this.auditOverviews = u(this, ie).asObservable(), A(this, se, new _t([], (n) => n.unique)), this.pagesWithMissingMetadata = u(this, se).asObservable(), A(this, oe, new _t([], (n) => n.name)), this.topIssues = u(this, oe).asObservable(), A(this, re, new ht(void 0)), this.healthScore = u(this, re).asObservable(), A(this, le, new ht(void 0)), this.settings = u(this, le).asObservable(), this.provideContext(Si, this), this.provideContext(rn, this), A(this, P, new ds(this));
  }
  getEntityType() {
    return on;
  }
  async getLatestAuditOverview() {
    const { data: a } = await u(this, P).getLatestAuditOverview();
    a && u(this, ne).setValue(a);
  }
  async getAuditOverviews() {
    const { data: a } = await u(this, P).getAuditOverviews();
    if (a && a.items) {
      const n = a.items.sort((i, o) => {
        const s = i.runDate ? new Date(i.runDate).getTime() : 0;
        return (o.runDate ? new Date(o.runDate).getTime() : 0) - s;
      });
      u(this, ie).setValue(n);
    }
  }
  async getPagesWithMissingMetadata() {
    const { data: a } = await u(this, P).getPagesWithMissingMetadata();
    a && u(this, se).setValue(a.items);
  }
  async getTopIssues() {
    const { data: a } = await u(this, P).getTopIssues();
    a && u(this, oe).setValue(a.items);
  }
  async getHealthScore() {
    const { data: a } = await u(this, P).getHealthScore();
    a && u(this, re).setValue(a);
  }
  async getSettings() {
    const { data: a } = await u(this, P).getSettings();
    a && u(this, le).setValue(a);
  }
}
P = new WeakMap(), ne = new WeakMap(), ie = new WeakMap(), se = new WeakMap(), oe = new WeakMap(), re = new WeakMap(), le = new WeakMap();
const rn = new Ei(
  "ContentAuditContext"
), ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: rn,
  ContentAuditContext: Et,
  default: Et
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hs = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = globalThis, Nt = xe.ShadowRoot && (xe.ShadyCSS === void 0 || xe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ln = Symbol(), fa = /* @__PURE__ */ new WeakMap();
let _s = class {
  constructor(e, a, n) {
    if (this._$cssResult$ = !0, n !== ln) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = a;
  }
  get styleSheet() {
    let e = this.o;
    const a = this.t;
    if (Nt && e === void 0) {
      const n = a !== void 0 && a.length === 1;
      n && (e = fa.get(a)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && fa.set(a, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Cs = (t) => new _s(typeof t == "string" ? t : t + "", void 0, ln), bs = (t, e) => {
  if (Nt) t.adoptedStyleSheets = e.map((a) => a instanceof CSSStyleSheet ? a : a.styleSheet);
  else for (const a of e) {
    const n = document.createElement("style"), i = xe.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = a.cssText, t.appendChild(n);
  }
}, ya = Nt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const n of e.cssRules) a += n.cssText;
  return Cs(a);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: fs, defineProperty: ys, getOwnPropertyDescriptor: As, getOwnPropertyNames: Ts, getOwnPropertySymbols: vs, getPrototypeOf: gs } = Object, R = globalThis, Aa = R.trustedTypes, ws = Aa ? Aa.emptyScript : "", bt = R.reactiveElementPolyfillSupport, pe = (t, e) => t, St = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ws : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let a = t;
  switch (e) {
    case Boolean:
      a = t !== null;
      break;
    case Number:
      a = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        a = JSON.parse(t);
      } catch {
        a = null;
      }
  }
  return a;
} }, cn = (t, e) => !fs(t, e), Ta = { attribute: !0, type: String, converter: St, reflect: !1, useDefault: !1, hasChanged: cn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), R.litPropertyMetadata ?? (R.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class de extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, a = Ta) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(e, a), !a.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(e, n, a);
      i !== void 0 && ys(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, a, n) {
    const { get: i, set: o } = As(this.prototype, e) ?? { get() {
      return this[a];
    }, set(s) {
      this[a] = s;
    } };
    return { get: i, set(s) {
      const r = i == null ? void 0 : i.call(this);
      o == null || o.call(this, s), this.requestUpdate(e, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ta;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pe("elementProperties"))) return;
    const e = gs(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pe("properties"))) {
      const a = this.properties, n = [...Ts(a), ...vs(a)];
      for (const i of n) this.createProperty(i, a[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const a = litPropertyMetadata.get(e);
      if (a !== void 0) for (const [n, i] of a) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [a, n] of this.elementProperties) {
      const i = this._$Eu(a, n);
      i !== void 0 && this._$Eh.set(i, a);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const a = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const i of n) a.unshift(ya(i));
    } else e !== void 0 && a.push(ya(e));
    return a;
  }
  static _$Eu(e, a) {
    const n = a.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((a) => this.enableUpdating = a), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((a) => a(this));
  }
  addController(e) {
    var a;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((a = e.hostConnected) == null || a.call(e));
  }
  removeController(e) {
    var a;
    (a = this._$EO) == null || a.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), a = this.constructor.elementProperties;
    for (const n of a.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return bs(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((a) => {
      var n;
      return (n = a.hostConnected) == null ? void 0 : n.call(a);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((a) => {
      var n;
      return (n = a.hostDisconnected) == null ? void 0 : n.call(a);
    });
  }
  attributeChangedCallback(e, a, n) {
    this._$AK(e, n);
  }
  _$ET(e, a) {
    var o;
    const n = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, n);
    if (i !== void 0 && n.reflect === !0) {
      const s = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : St).toAttribute(a, n.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, a) {
    var o, s;
    const n = this.constructor, i = n._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const r = n.getPropertyOptions(i), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : St;
      this._$Em = i, this[i] = c.fromAttribute(a, r.type) ?? ((s = this._$Ej) == null ? void 0 : s.get(i)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, a, n) {
    var i;
    if (e !== void 0) {
      const o = this.constructor, s = this[e];
      if (n ?? (n = o.getPropertyOptions(e)), !((n.hasChanged ?? cn)(s, a) || n.useDefault && n.reflect && s === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(o._$Eu(e, n)))) return;
      this.C(e, a, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, a, { useDefault: n, reflect: i, wrapped: o }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? a ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (a = void 0), this._$AL.set(e, a)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (a) {
      Promise.reject(a);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, s] of i) {
        const { wrapped: r } = s, c = this[o];
        r !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, s, c);
      }
    }
    let e = !1;
    const a = this._$AL;
    try {
      e = this.shouldUpdate(a), e ? (this.willUpdate(a), (n = this._$EO) == null || n.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(a)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(a);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var a;
    (a = this._$EO) == null || a.forEach((n) => {
      var i;
      return (i = n.hostUpdated) == null ? void 0 : i.call(n);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((a) => this._$ET(a, this[a]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
de.elementStyles = [], de.shadowRootOptions = { mode: "open" }, de[pe("elementProperties")] = /* @__PURE__ */ new Map(), de[pe("finalized")] = /* @__PURE__ */ new Map(), bt == null || bt({ ReactiveElement: de }), (R.reactiveElementVersions ?? (R.reactiveElementVersions = [])).push("2.1.0");
var Is = Object.getOwnPropertyDescriptor, Os = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Is(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = s(i) || i);
  return i;
};
let Ye = class extends ce(J) {
  constructor() {
    super(), this._workspaceContext = new Et(this);
  }
  render() {
    return m`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Ye = Os([
  hs("content-audit-workspace-root")
], Ye);
const Es = Ye, Ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Ye;
  },
  default: Es
}, Symbol.toStringTag, { value: "Module" })), K = "Umb.Menu.ContentAudit", Je = "Umb.Menu.ContentMetadata", Qe = "Umb.Menu.ContentPerformance", Dt = "Umb.Menu.ContentTools", Rt = "Umb.Collection.ContentAudit.Issues", $s = "Umb.CollectionView.ContentAudit.Issues.Table", un = "Umb.Repository.ContentAuditIssuesCollection";
var Ue;
class Ps {
  constructor(e) {
    y(this, Ue);
    A(this, Ue, e);
  }
  async getCollection(e) {
    const { data: a, error: n } = await ee(u(this, Ue), nn.getAllIssues({ query: e }));
    if (n)
      return { error: n };
    if (!a)
      return { data: { items: [], total: 0 } };
    const { items: i, total: o } = a;
    return { data: { items: i, total: o } };
  }
}
Ue = new WeakMap();
var Le;
class va extends Pi {
  constructor(a) {
    super(a);
    y(this, Le);
    A(this, Le, new Ps(a));
  }
  async requestCollection(a) {
    return u(this, Le).getCollection(a);
  }
}
Le = new WeakMap();
const Us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: va,
  default: va
}, Symbol.toStringTag, { value: "Module" }));
var Ls = Object.defineProperty, ks = Object.getOwnPropertyDescriptor, mn = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? ks(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Ls(e, a, i), i;
};
let He = class extends J {
  render() {
    return this.value ? m`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : Ya;
  }
};
He.styles = [
  Ui,
  T`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
mn([
  H({ attribute: !1 })
], He.prototype, "value", 2);
He = mn([
  b("content-audit-issues-table-name-column-layout")
], He);
var Ns = Object.defineProperty, Ds = Object.getOwnPropertyDescriptor, dn = (t) => {
  throw TypeError(t);
}, Q = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Ds(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Ns(e, a, i), i;
}, Wt = (t, e, a) => e.has(t) || dn("Cannot " + a), ga = (t, e, a) => (Wt(t, e, "read from private field"), e.get(t)), wa = (t, e, a) => e.has(t) ? dn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Rs = (t, e, a, n) => (Wt(t, e, "write to private field"), e.set(t, a), a), Me = (t, e, a) => (Wt(t, e, "access private method"), a), _e, te, pn, Vt, hn;
let E = class extends U {
  constructor() {
    super(), wa(this, te), this.data = [], this.hideSummary = !1, this._issues = [], this._tableConfig = {
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
    ], this._tableItems = [], wa(this, _e), this.consumeContext(D, (t) => {
      Rs(this, _e, t), Me(this, te, pn).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && (this._issues = this.data, Me(this, te, Vt).call(this, this.data));
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
                ${Me(this, te, hn).call(this)}
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
_e = /* @__PURE__ */ new WeakMap();
te = /* @__PURE__ */ new WeakSet();
pn = function() {
  ga(this, _e) && this.observe(ga(this, _e).items, (t) => {
    this._issues = t, Me(this, te, Vt).call(this, t);
  }, "umbCollectionItemsObserver");
};
Vt = function(t) {
  this._tableItems = t.map((e) => {
    var a;
    return {
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
          value: m`<content-audit-issue-type-label .type=${e.type}></content-audit-issue-type-label`
        },
        {
          columnAlias: "priority",
          value: m`<content-audit-priority-type-label .type=${e.priority}></content-audit-priority-type-label>`
        },
        {
          columnAlias: "numberOfUrls",
          value: e.numberOfUrls
        },
        {
          columnAlias: "percentOfTotal",
          value: `${(a = e.percentOfTotal) == null ? void 0 : a.toFixed(0)}%`
        }
      ]
    };
  });
};
hn = function() {
  if (!this._issues.length || this.hideSummary) return;
  const t = this._issues.filter((n) => n.priority === "High").length, e = this._issues.filter((n) => n.priority === "Medium").length, a = this._issues.filter((n) => n.priority === "Low").length;
  return m`
            <div class="summary-container">
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="summary-label">Total Issues:</span>
                        <span class="summary-value">${this._issues.length}</span>
                    </div>
                    <div class="summary-item high">
                        <span class="summary-label">High Priority:</span>
                        <span class="summary-value">${t}</span>
                    </div>
                    <div class="summary-item medium">
                        <span class="summary-label">Medium Priority:</span>
                        <span class="summary-value">${e}</span>
                    </div>
                    <div class="summary-item low">
                        <span class="summary-label">Low Priority:</span>
                        <span class="summary-value">${a}</span>
                    </div>
                </div>
            </div>
        `;
};
E.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}

            .summary-container {
                margin-bottom: var(--uui-size-space-5);
            }

            .summary-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: var(--uui-size-space-4);
            }

            .summary-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--uui-size-space-4);
                background: var(--uui-color-surface);
                border-radius: var(--uui-border-radius);
                border: 1px solid var(--uui-color-border);
            }

            .summary-item.high {
                border-left: 4px solid var(--uui-color-danger);
            }

            .summary-item.medium {
                border-left: 4px solid var(--uui-color-warning);
            }

            .summary-item.low {
                border-left: 4px solid var(--uui-color-default);
            }

            .summary-label {
                font-size: 0.875rem;
                color: var(--uui-color-text-alt);
            }

            .summary-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--uui-color-text);
            }
		`
];
Q([
  H({ type: Array, attribute: !1 })
], E.prototype, "data", 2);
Q([
  H({ type: Boolean, attribute: "hide-summary" })
], E.prototype, "hideSummary", 2);
Q([
  d()
], E.prototype, "_issues", 2);
Q([
  d()
], E.prototype, "_tableConfig", 2);
Q([
  d()
], E.prototype, "_tableColumns", 2);
Q([
  d()
], E.prototype, "_tableItems", 2);
E = Q([
  b("content-audit-issues-table-collection-view")
], E);
const Ws = E, Vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return E;
  },
  default: Ws
}, Symbol.toStringTag, { value: "Module" })), xt = "Umb.Collection.ContentAudit.Audits", xs = "Umb.CollectionView.ContentAudit.Audits.Table", _n = "Umb.Repository.ContentAuditAuditsCollection", Ms = [
  {
    type: "repository",
    alias: _n,
    name: "Audits Collection Repository",
    api: () => import("./audits-collection.repository.js")
  }
], js = [
  {
    type: "collectionView",
    alias: xs,
    name: "Audits Table Collection View",
    js: () => import("./audits-table-collection-view.element.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: xt
      }
    ]
  }
], Bs = [
  {
    type: "collection",
    kind: "default",
    alias: xt,
    name: "Audits Collection",
    element: () => import("./audits.element.js"),
    meta: {
      repositoryAlias: _n
    }
  },
  ...Ms,
  ...js
], Cn = "audits", bn = "audits-root", zs = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umb.EntityAction.ContentAudit.Audit.Delete",
    name: "Delete Audit Entity Action",
    weight: 100,
    api: () => import("./delete-audit.action.js"),
    forEntityTypes: [Cn],
    meta: {
      icon: "icon-trash",
      label: "Delete"
    }
  }
], he = "Umb.Workspace.ContentAudit.Audits", ft = "Umb.MenuItem.ContentAudit.Audits", Ia = "Umb.Workspace.ContentAudit.AuditsRoot", qs = [
  {
    type: "menuItem",
    kind: "tree",
    alias: ft,
    name: "Audits Menu Item",
    weight: 12e3,
    meta: {
      label: "Audits",
      icon: "icon-browser-window",
      treeAlias: "Umb.Tree.ContentAudit.Audits",
      menus: [K]
    }
  },
  {
    type: "workspaceContext",
    kind: "menuStructure",
    alias: "Umb.Context.ContentAudit.Audits.Menu.Structure",
    name: "Content Audit Audits Menu Structure Workspace Context",
    api: () => import("./audits-menu-structure.context.js"),
    meta: {
      menuItemAlias: ft
    },
    conditions: [
      {
        alias: w,
        match: he
      }
    ]
  },
  {
    type: "workspaceFooterApp",
    kind: "menuBreadcrumb",
    alias: "Umb.WorkspaceFooterApp.ContentAudit.Audits.Breadcrumb",
    name: "Content Audit Audits Breadcrumb Workspace Footer App",
    conditions: [
      {
        alias: w,
        match: he
      }
    ]
  },
  {
    type: "workspaceContext",
    kind: "menuStructure",
    alias: "Umb.Context.ContentAudit.AuditsRoot.Menu.Structure",
    name: "Content Audit Audits Root Menu Structure Workspace Context",
    api: () => import("./audits-menu-structure.context.js"),
    meta: {
      menuItemAlias: ft
    },
    conditions: [
      {
        alias: w,
        match: Ia
      }
    ]
  },
  {
    type: "workspaceFooterApp",
    kind: "menuBreadcrumb",
    alias: "Umb.WorkspaceFooterApp.ContentAudit.AuditsRoot.Breadcrumb",
    name: "Content Audit Audits Root Breadcrumb Workspace Footer App",
    conditions: [
      {
        alias: w,
        match: Ia
      }
    ]
  }
], Ys = [
  {
    type: "repository",
    alias: "Umb.Repository.ContentAudit.Audits",
    name: "Content Audit Audits Repository",
    api: () => import("./audits-tree.repository.js")
  },
  {
    type: "tree",
    kind: "default",
    alias: "Umb.Tree.ContentAudit.Audits",
    name: "Content Audit Audits Tree",
    meta: {
      repositoryAlias: "Umb.Repository.ContentAudit.Audits"
    }
  },
  {
    type: "treeItem",
    kind: "default",
    alias: "Umb.TreeItem.ContentAudit.Audits",
    name: "Content Audit Audits Tree Item",
    forEntityTypes: [Cn, bn]
  }
], Hs = [
  {
    type: "workspace",
    kind: "routable",
    alias: he,
    name: "Audits Workspace",
    api: () => import("./audits-workspace.context.js"),
    meta: {
      entityType: "audits"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Audits.Overview",
    name: "Audits Workspace Overview View",
    js: () => import("./audits-overview-workspace-view.element.js"),
    weight: 100,
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-dashboard"
    },
    conditions: [
      {
        alias: w,
        match: he
      }
    ]
  },
  //{
  //	type: 'workspaceView',
  //	alias: 'Umb.WorkspaceView.ContentAudit.Audits.Details',
  //	name: 'Audits Workspace Details View',
  //	js: () => import('./views/audits-details-workspace-view.element'),
  //	weight: 90,
  //	meta: {
  //		label: 'Details',
  //		pathname: 'details',
  //		icon: 'icon-info',
  //	},
  //	conditions: [
  //		{
  //			alias: UMB_WORKSPACE_CONDITION_ALIAS,
  //			match: CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS,
  //		},
  //	],
  //},
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Audits.Issues",
    name: "Audits Workspace Issues View",
    js: () => import("./audits-issues-workspace-view.element.js"),
    weight: 80,
    meta: {
      label: "Issues",
      pathname: "issues",
      icon: "icon-alert"
    },
    conditions: [
      {
        alias: w,
        match: he
      }
    ]
  }
], Oa = "Umb.Workspace.ContentAudit.AuditsRoot", Ks = [
  {
    type: "workspace",
    kind: "default",
    alias: Oa,
    name: "Audits Root Workspace",
    meta: {
      entityType: bn,
      headline: "Audits"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "Umb.Workspace.Audits.Collection",
    name: "Content Audit Audits Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Oa
      }
    ]
  }
], Fs = [
  ...Hs,
  ...Ks
], Gs = [
  ...Bs,
  ...zs,
  ...qs,
  ...Ys,
  ...Fs
], fn = "all-pages-root", Xs = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: fn,
    menus: [K]
  }
}, Js = [Xs], Ea = "Umb.Workspace.ContentAudit.AllPagesRoot", Z = "Umb.Workspace.ContentAudit.AllPages", Qs = [
  {
    type: "workspace",
    kind: "routable",
    alias: Z,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element.js"),
    weight: 100,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "info"
    },
    conditions: [
      {
        alias: w,
        match: Z
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Links",
    name: "All Pages Workspace Links View",
    js: () => import("./all-pages-links-workspace-view.element.js"),
    weight: 90,
    meta: {
      label: "Links",
      pathname: "links",
      icon: "link"
    },
    conditions: [
      {
        alias: w,
        match: Z
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Images",
    name: "All Pages Workspace Images View",
    js: () => import("./all-pages-images-workspace-view.element.js"),
    weight: 80,
    meta: {
      label: "Images",
      pathname: "images",
      icon: "picture"
    },
    conditions: [
      {
        alias: w,
        match: Z
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Resources",
    name: "All Pages Workspace Resources View",
    js: () => import("./all-pages-resources-workspace-view.element.js"),
    weight: 70,
    meta: {
      label: "Resources",
      pathname: "resources",
      icon: "icon-script"
    },
    conditions: [
      {
        alias: w,
        match: Z
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Issues",
    name: "All Pages Workspace Issues View",
    js: () => import("./all-pages-issues-workspace-view.element.js"),
    weight: 60,
    meta: {
      label: "Issues",
      pathname: "issues",
      icon: "alert"
    },
    conditions: [
      {
        alias: w,
        match: Z
      }
    ]
  }
], Mt = "Umb.Collection.ContentAudit.AllPages", Zs = "Umb.CollectionView.ContentAudit.AllPages.Table", yn = "Umb.Repository.ContentAuditAllPagesCollection";
var eo = Object.defineProperty, to = Object.getOwnPropertyDescriptor, An = (t) => {
  throw TypeError(t);
}, Ze = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? to(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && eo(e, a, i), i;
}, jt = (t, e, a) => e.has(t) || An("Cannot " + a), Sa = (t, e, a) => (jt(t, e, "read from private field"), e.get(t)), $a = (t, e, a) => e.has(t) ? An("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), ao = (t, e, a, n) => (jt(t, e, "write to private field"), e.set(t, a), a), Tn = (t, e, a) => (jt(t, e, "access private method"), a), Ce, Ke, vn, gn;
let W = class extends U {
  constructor() {
    super(), $a(this, Ke), this._tableConfig = {
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
    ], this._tableItems = [], $a(this, Ce), this.consumeContext(D, (t) => {
      ao(this, Ce, t), Tn(this, Ke, vn).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
Ce = /* @__PURE__ */ new WeakMap();
Ke = /* @__PURE__ */ new WeakSet();
vn = function() {
  Sa(this, Ce) && this.observe(Sa(this, Ce).items, (t) => Tn(this, Ke, gn).call(this, t), "umbCollectionItemsObserver");
};
gn = function(t) {
  this._tableItems = t.map((e) => {
    var a, n, i;
    return {
      id: e == null ? void 0 : e.unique,
      entityType: e == null ? void 0 : e.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: m`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${(a = e.pageData) == null ? void 0 : a.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (n = e.technicalSeoData) == null ? void 0 : n.contentType
        },
        {
          columnAlias: "statusCode",
          value: m`<content-audit-status-code-label .statusCode=${(i = e.pageData) == null ? void 0 : i.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "redirect",
          value: e.pageData.redirect ? "Yes" : "No"
        }
      ]
    };
  });
};
W.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ze([
  d()
], W.prototype, "_tableConfig", 2);
Ze([
  d()
], W.prototype, "_tableColumns", 2);
Ze([
  d()
], W.prototype, "_tableItems", 2);
W = Ze([
  b("content-audit-all-pages-table-collection-view")
], W);
const no = W, io = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return W;
  },
  default: no
}, Symbol.toStringTag, { value: "Module" })), so = [
  {
    type: "workspace",
    kind: "default",
    alias: Ea,
    name: "All Pages Root Workspace",
    meta: {
      entityType: fn,
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
      collectionAlias: Mt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ea
      }
    ]
  }
], oo = [...Qs, ...so], ro = [
  {
    type: "repository",
    alias: yn,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository.js")
  }
], lo = [
  {
    type: "collectionView",
    alias: Zs,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => io),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: Mt
      }
    ]
  }
], co = [
  {
    type: "collection",
    kind: "default",
    alias: Mt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element.js"),
    meta: {
      repositoryAlias: yn
    }
  },
  ...ro,
  ...lo
], uo = "Umb.Repository.ContentAudit.AllPages.Detail", mo = "Umb.Store.ContentAudit.AllPages.Detail", po = [
  {
    type: "repository",
    alias: uo,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository.js")
  },
  {
    type: "store",
    alias: mo,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store.js")
  }
], ho = [...po], _o = [
  ...oo,
  ...Js,
  ...co,
  ...ho
], wn = "issues-root", Co = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: wn,
    menus: [K]
  }
}, bo = [Co], Pa = "Umb.Workspace.ContentAudit.IssuesRoot", Ua = "Umb.Workspace.ContentAudit.Issues", fo = [
  {
    type: "workspace",
    kind: "routable",
    alias: Ua,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: w,
        match: Ua
      }
    ]
  }
], yo = [
  {
    type: "workspace",
    kind: "default",
    alias: Pa,
    name: "Issues Root Workspace",
    meta: {
      entityType: wn,
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
      collectionAlias: Rt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Pa
      }
    ]
  }
], Ao = [...fo, ...yo], To = [
  {
    type: "repository",
    alias: un,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => Us)
  }
], vo = [
  {
    type: "collectionView",
    alias: $s,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => Vs),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: Rt
      }
    ]
  }
], go = [
  {
    type: "collection",
    kind: "default",
    alias: Rt,
    name: "Issues Collection",
    element: () => import("./issues.element.js"),
    meta: {
      repositoryAlias: un
    }
  },
  ...To,
  ...vo
], wo = "Umb.Repository.ContentAudit.Issues.Detail", Io = "Umb.Store.ContentAudit.Issues.Detail", Oo = [
  {
    type: "repository",
    alias: wo,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository.js")
  },
  {
    type: "store",
    alias: Io,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store.js")
  }
], Eo = [...Oo], So = [
  ...Ao,
  ...bo,
  ...go,
  ...Eo
], In = "status-codes-root", $o = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: In,
    menus: [K]
  }
}, Po = [$o], Bt = "Umb.Collection.ContentAudit.StatusCodes", Uo = "Umb.CollectionView.ContentAudit.StatusCodes.Table", On = "Umb.Repository.ContentAuditStatusCodesCollection";
var Lo = Object.defineProperty, ko = Object.getOwnPropertyDescriptor, En = (t) => {
  throw TypeError(t);
}, et = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? ko(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Lo(e, a, i), i;
}, zt = (t, e, a) => e.has(t) || En("Cannot " + a), $t = (t, e, a) => (zt(t, e, "read from private field"), e.get(t)), yt = (t, e, a) => e.has(t) ? En("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Sn = (t, e, a, n) => (zt(t, e, "write to private field"), e.set(t, a), a), qt = (t, e, a) => (zt(t, e, "access private method"), a), be, tt, fe, $n, Pn, Un;
let V = class extends U {
  constructor() {
    super(), yt(this, fe), this._tableConfig = {
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
    ], this._tableItems = [], yt(this, be), yt(this, tt), this.consumeContext(D, (t) => {
      Sn(this, be, t);
    }), qt(this, fe, $n).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
be = /* @__PURE__ */ new WeakMap();
tt = /* @__PURE__ */ new WeakMap();
fe = /* @__PURE__ */ new WeakSet();
$n = function() {
  new De(this, ke).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Sn(this, tt, t), qt(this, fe, Pn).call(this);
  });
};
Pn = function() {
  $t(this, be) && this.observe($t(this, be).items, (t) => qt(this, fe, Un).call(this, t), "umbCollectionItemsObserver");
};
Un = function(t) {
  const e = $t(this, tt);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    var i, o, s;
    const n = e({ entityType: a.entityType }) + Ne.generateLocal({ unique: a.unique });
    return {
      id: a == null ? void 0 : a.unique,
      entityType: a == null ? void 0 : a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: m`<a href=${n}>${(i = a.pageData) == null ? void 0 : i.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = a.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "statusCode",
          value: m`<content-audit-status-code-label .statusCode=${(s = a.pageData) == null ? void 0 : s.statusCode}></content-audit-status-code-label>`
        }
      ]
    };
  });
};
V.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
et([
  d()
], V.prototype, "_tableConfig", 2);
et([
  d()
], V.prototype, "_tableColumns", 2);
et([
  d()
], V.prototype, "_tableItems", 2);
V = et([
  b("content-audit-status-codes-table-collection-view")
], V);
const No = V, Do = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return V;
  },
  default: No
}, Symbol.toStringTag, { value: "Module" })), La = "Umb.Workspace.ContentAudit.StatusCodes", Ro = [
  {
    type: "workspace",
    kind: "default",
    alias: La,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: In,
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
      collectionAlias: Bt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: La
      }
    ]
  }
], Wo = [
  {
    type: "repository",
    alias: On,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository.js")
  }
], Vo = [
  {
    type: "collectionView",
    alias: Uo,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => Do),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: Bt
      }
    ]
  }
], xo = [
  {
    type: "collection",
    kind: "default",
    alias: Bt,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element.js"),
    meta: {
      repositoryAlias: On
    }
  },
  ...Wo,
  ...Vo
], Mo = [
  ...Ro,
  ...Po,
  ...xo
], Ln = "orphaned-pages-root", jo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: Ln,
    menus: [Je]
  }
}, Bo = [jo], Yt = "Umb.Collection.ContentAudit.OrphanedPages", zo = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", kn = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var qo = Object.defineProperty, Yo = Object.getOwnPropertyDescriptor, Nn = (t) => {
  throw TypeError(t);
}, at = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Yo(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && qo(e, a, i), i;
}, Ht = (t, e, a) => e.has(t) || Nn("Cannot " + a), Pt = (t, e, a) => (Ht(t, e, "read from private field"), e.get(t)), At = (t, e, a) => e.has(t) ? Nn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Dn = (t, e, a, n) => (Ht(t, e, "write to private field"), e.set(t, a), a), Kt = (t, e, a) => (Ht(t, e, "access private method"), a), ye, nt, Ae, Rn, Wn, Vn;
let x = class extends U {
  constructor() {
    super(), At(this, Ae), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], At(this, ye), At(this, nt), this.consumeContext(D, (t) => {
      Dn(this, ye, t);
    }), Kt(this, Ae, Rn).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ye = /* @__PURE__ */ new WeakMap();
nt = /* @__PURE__ */ new WeakMap();
Ae = /* @__PURE__ */ new WeakSet();
Rn = function() {
  new De(this, ke).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Dn(this, nt, t), Kt(this, Ae, Wn).call(this);
  });
};
Wn = function() {
  Pt(this, ye) && this.observe(Pt(this, ye).items, (t) => Kt(this, Ae, Vn).call(this, t), "umbCollectionItemsObserver");
};
Vn = function(t) {
  const e = Pt(this, nt);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const n = e({ entityType: "document" }) + Ne.generateLocal({ unique: a.unique });
    return {
      id: a.unique,
      entityType: a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: m`<a href=${n}>${a.url}</a>`
        }
      ]
    };
  });
};
x.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
at([
  d()
], x.prototype, "_tableConfig", 2);
at([
  d()
], x.prototype, "_tableColumns", 2);
at([
  d()
], x.prototype, "_tableItems", 2);
x = at([
  b("content-audit-orphaned-pages-table-collection-view")
], x);
const Ho = x, Ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return x;
  },
  default: Ho
}, Symbol.toStringTag, { value: "Module" })), ka = "Umb.Workspace.ContentAudit.OrphanedPages", Fo = [
  {
    type: "workspace",
    kind: "default",
    alias: ka,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: Ln,
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
      collectionAlias: Yt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ka
      }
    ]
  }
], Go = [
  {
    type: "repository",
    alias: kn,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository.js")
  }
], Xo = [
  {
    type: "collectionView",
    alias: zo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Ko),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: Yt
      }
    ]
  }
], Jo = [
  {
    type: "collection",
    kind: "default",
    alias: Yt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element.js"),
    meta: {
      repositoryAlias: kn
    }
  },
  ...Go,
  ...Xo
], Qo = [
  ...Fo,
  ...Bo,
  ...Jo
], xn = "images-alt-text-root", Zo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: xn,
    menus: [Je]
  }
}, er = [Zo], Ft = "Umb.Collection.ContentAudit.ImagesAltText", tr = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", Mn = "Umb.Repository.ContentAuditImagesAltTextCollection";
var ar = Object.defineProperty, nr = Object.getOwnPropertyDescriptor, jn = (t) => {
  throw TypeError(t);
}, it = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? nr(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && ar(e, a, i), i;
}, Gt = (t, e, a) => e.has(t) || jn("Cannot " + a), Ut = (t, e, a) => (Gt(t, e, "read from private field"), e.get(t)), Tt = (t, e, a) => e.has(t) ? jn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Bn = (t, e, a, n) => (Gt(t, e, "write to private field"), e.set(t, a), a), Xt = (t, e, a) => (Gt(t, e, "access private method"), a), Te, st, ve, zn, qn, Yn;
let M = class extends U {
  constructor() {
    super(), Tt(this, ve), this._tableConfig = {
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
    ], this._tableItems = [], Tt(this, Te), Tt(this, st), this.consumeContext(D, (t) => {
      Bn(this, Te, t);
    }), Xt(this, ve, zn).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
Te = /* @__PURE__ */ new WeakMap();
st = /* @__PURE__ */ new WeakMap();
ve = /* @__PURE__ */ new WeakSet();
zn = function() {
  new De(this, ke).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Bn(this, st, t), Xt(this, ve, qn).call(this);
  });
};
qn = function() {
  Ut(this, Te) && this.observe(Ut(this, Te).items, (t) => Xt(this, ve, Yn).call(this, t), "umbCollectionItemsObserver");
};
Yn = function(t) {
  const e = Ut(this, st);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const n = e({ entityType: "document" }) + Ne.generateLocal({ unique: a.unique });
    return {
      id: a.unique,
      entityType: a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: a.url
        },
        {
          columnAlias: "foundPage",
          value: m`<a href=${n}>${a.foundPage}</a>`
        },
        {
          columnAlias: "altText",
          value: a.altText
        }
      ]
    };
  });
};
M.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
it([
  d()
], M.prototype, "_tableConfig", 2);
it([
  d()
], M.prototype, "_tableColumns", 2);
it([
  d()
], M.prototype, "_tableItems", 2);
M = it([
  b("content-audit-images-alt-text-table-collection-view")
], M);
const ir = M, sr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return M;
  },
  default: ir
}, Symbol.toStringTag, { value: "Module" })), Na = "Umb.Workspace.ContentAudit.ImagesAltText", or = [
  {
    type: "workspace",
    kind: "default",
    alias: Na,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: xn,
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
      collectionAlias: Ft
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Na
      }
    ]
  }
], rr = [
  {
    type: "repository",
    alias: Mn,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository.js")
  }
], lr = [
  {
    type: "collectionView",
    alias: tr,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => sr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: Ft
      }
    ]
  }
], cr = [
  {
    type: "collection",
    kind: "default",
    alias: Ft,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element.js"),
    meta: {
      repositoryAlias: Mn
    }
  },
  ...rr,
  ...lr
], ur = [
  ...or,
  ...er,
  ...cr
], Hn = "outbound-links-root", mr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: Hn,
    menus: [K]
  }
}, dr = [mr], Jt = "Umb.Collection.ContentAudit.OutboundLinks", pr = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", Kn = "Umb.Repository.ContentAuditOutboundLinksCollection";
var hr = Object.defineProperty, _r = Object.getOwnPropertyDescriptor, Fn = (t) => {
  throw TypeError(t);
}, ot = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? _r(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && hr(e, a, i), i;
}, Qt = (t, e, a) => e.has(t) || Fn("Cannot " + a), Da = (t, e, a) => (Qt(t, e, "read from private field"), e.get(t)), Ra = (t, e, a) => e.has(t) ? Fn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Cr = (t, e, a, n) => (Qt(t, e, "write to private field"), e.set(t, a), a), Gn = (t, e, a) => (Qt(t, e, "access private method"), a), ge, Fe, Xn, Jn;
let j = class extends U {
  constructor() {
    super(), Ra(this, Fe), this._tableConfig = {
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
    ], this._tableItems = [], Ra(this, ge), this.consumeContext(D, (t) => {
      Cr(this, ge, t), Gn(this, Fe, Xn).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ge = /* @__PURE__ */ new WeakMap();
Fe = /* @__PURE__ */ new WeakSet();
Xn = function() {
  Da(this, ge) && this.observe(Da(this, ge).items, (t) => Gn(this, Fe, Jn).call(this, t), "umbCollectionItemsObserver");
};
Jn = function(t) {
  this._tableItems = t.map((e) => {
    var a;
    return {
      id: e.unique,
      data: [
        {
          columnAlias: "url",
          value: m`<a href="${e.url}" target="_blank">${e.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: m`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "contentType",
          value: e.contentType
        },
        {
          columnAlias: "outlinks",
          value: (a = e.links) == null ? void 0 : a.length
        }
      ]
    };
  });
};
j.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ot([
  d()
], j.prototype, "_tableConfig", 2);
ot([
  d()
], j.prototype, "_tableColumns", 2);
ot([
  d()
], j.prototype, "_tableItems", 2);
j = ot([
  b("content-audit-outbound-links-table-collection-view")
], j);
const br = j, fr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return j;
  },
  default: br
}, Symbol.toStringTag, { value: "Module" })), Wa = "Umb.Workspace.ContentAudit.OutboundLinks", yr = [
  {
    type: "workspace",
    kind: "default",
    alias: Wa,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: Hn,
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
      collectionAlias: Jt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Wa
      }
    ]
  }
], Ar = [
  {
    type: "repository",
    alias: Kn,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository.js")
  }
], Tr = [
  {
    type: "collectionView",
    alias: pr,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => fr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: Jt
      }
    ]
  }
], vr = [
  {
    type: "collection",
    kind: "default",
    alias: Jt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element.js"),
    meta: {
      repositoryAlias: Kn
    }
  },
  ...Ar,
  ...Tr
], gr = [
  ...yr,
  ...dr,
  ...vr
], Qn = "inbound-links-root", wr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Qn,
    menus: [K]
  }
}, Ir = [wr], Zt = "Umb.Collection.ContentAudit.InboundLinks", Or = "Umb.CollectionView.ContentAudit.InboundLinks.Table", Zn = "Umb.Repository.ContentAuditInboundLinksCollection";
var Er = Object.defineProperty, Sr = Object.getOwnPropertyDescriptor, ei = (t) => {
  throw TypeError(t);
}, rt = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Sr(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Er(e, a, i), i;
}, ea = (t, e, a) => e.has(t) || ei("Cannot " + a), Va = (t, e, a) => (ea(t, e, "read from private field"), e.get(t)), xa = (t, e, a) => e.has(t) ? ei("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), $r = (t, e, a, n) => (ea(t, e, "write to private field"), e.set(t, a), a), ti = (t, e, a) => (ea(t, e, "access private method"), a), we, Ge, ai, ni;
let B = class extends U {
  constructor() {
    super(), xa(this, Ge), this._tableConfig = {
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
    ], this._tableItems = [], xa(this, we), this.consumeContext(D, (t) => {
      $r(this, we, t), ti(this, Ge, ai).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
we = /* @__PURE__ */ new WeakMap();
Ge = /* @__PURE__ */ new WeakSet();
ai = function() {
  Va(this, we) && this.observe(Va(this, we).items, (t) => ti(this, Ge, ni).call(this, t), "umbCollectionItemsObserver");
};
ni = function(t) {
  this._tableItems = t.map((e) => {
    var a;
    return {
      id: e.unique,
      data: [
        {
          columnAlias: "url",
          value: m`<a href="${e.url}" target="_blank">${e.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: m`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "contentType",
          value: e.contentType
        },
        {
          columnAlias: "inlinks",
          value: (a = e.links) == null ? void 0 : a.length
        }
      ]
    };
  });
};
B.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
rt([
  d()
], B.prototype, "_tableConfig", 2);
rt([
  d()
], B.prototype, "_tableColumns", 2);
rt([
  d()
], B.prototype, "_tableItems", 2);
B = rt([
  b("content-audit-inbound-links-table-collection-view")
], B);
const Pr = B, Ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return B;
  },
  default: Pr
}, Symbol.toStringTag, { value: "Module" })), Ma = "Umb.Workspace.ContentAudit.InboundLinks", Lr = [
  {
    type: "workspace",
    kind: "default",
    alias: Ma,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: Qn,
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
      collectionAlias: Zt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ma
      }
    ]
  }
], kr = [
  {
    type: "repository",
    alias: Zn,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository.js")
  }
], Nr = [
  {
    type: "collectionView",
    alias: Or,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => Ur),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: Zt
      }
    ]
  }
], Dr = [
  {
    type: "collection",
    kind: "default",
    alias: Zt,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element.js"),
    meta: {
      repositoryAlias: Zn
    }
  },
  ...kr,
  ...Nr
], Rr = [
  ...Lr,
  ...Ir,
  ...Dr
], ii = "metadata-root", Wr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: ii,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, Vr = [Wr], ta = "Umb.Collection.ContentAudit.Metadata", xr = "Umb.CollectionView.ContentAudit.Metadata.Table", ja = "Umb.Workspace.ContentAudit.Metadata", Mr = [
  {
    type: "workspace",
    kind: "default",
    alias: ja,
    name: "Metadata Root Workspace",
    meta: {
      entityType: ii,
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
      collectionAlias: ta
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ja
      }
    ]
  }
], si = "Umb.Repository.ContentAuditMetadataCollection", jr = [
  {
    type: "repository",
    alias: si,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository.js")
  }
], Br = [
  {
    type: "collectionView",
    alias: xr,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: ta
      }
    ]
  }
], zr = [
  {
    type: "collection",
    kind: "default",
    alias: ta,
    name: "Metadata Collection",
    element: () => import("./metadata.element.js"),
    meta: {
      repositoryAlias: si
    }
  },
  ...jr,
  ...Br
], qr = [
  ...Mr,
  ...Vr,
  ...zr
], Yr = [], aa = "Umb.Collection.ContentAudit.DuplicateContent", Hr = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", oi = "Umb.Repository.ContentAuditDuplicateContentCollection";
var Kr = Object.defineProperty, Fr = Object.getOwnPropertyDescriptor, lt = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Fr(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Kr(e, a, i), i;
};
let z = class extends U {
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
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
z.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
lt([
  d()
], z.prototype, "_tableConfig", 2);
lt([
  d()
], z.prototype, "_tableColumns", 2);
lt([
  d()
], z.prototype, "_tableItems", 2);
z = lt([
  b("content-audit-duplicate-content-table-collection-view")
], z);
const Gr = z, Xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return z;
  },
  default: Gr
}, Symbol.toStringTag, { value: "Module" })), Jr = "duplicate-content-root", Ba = "Umb.Workspace.ContentAudit.DuplicateContent", Qr = [
  {
    type: "workspace",
    kind: "default",
    alias: Ba,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: Jr,
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
      collectionAlias: aa
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ba
      }
    ]
  }
], Zr = [
  {
    type: "repository",
    alias: oi,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository.js")
  }
], el = [
  {
    type: "collectionView",
    alias: Hr,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => Xr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: aa
      }
    ]
  }
], tl = [
  {
    type: "collection",
    kind: "default",
    alias: aa,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element.js"),
    meta: {
      repositoryAlias: oi
    }
  },
  ...Zr,
  ...el
], al = [
  ...Qr,
  ...Yr,
  ...tl
], ri = "carbon-rating-root", nl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: ri,
    menus: [Qe]
  }
}, il = [nl], na = "Umb.Collection.ContentAudit.CarbonRating", sl = "Umb.CollectionView.ContentAudit.CarbonRating.Table", li = "Umb.Repository.ContentAuditCarbonRatingCollection";
var ol = Object.defineProperty, rl = Object.getOwnPropertyDescriptor, ci = (t) => {
  throw TypeError(t);
}, ct = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? rl(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && ol(e, a, i), i;
}, ia = (t, e, a) => e.has(t) || ci("Cannot " + a), Lt = (t, e, a) => (ia(t, e, "read from private field"), e.get(t)), vt = (t, e, a) => e.has(t) ? ci("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), ui = (t, e, a, n) => (ia(t, e, "write to private field"), e.set(t, a), a), sa = (t, e, a) => (ia(t, e, "access private method"), a), Ie, ut, Oe, mi, di, pi;
let q = class extends U {
  constructor() {
    super(), vt(this, Oe), this._tableConfig = {
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
    ], this._tableItems = [], vt(this, Ie), vt(this, ut), this.consumeContext(D, (t) => {
      ui(this, Ie, t);
    }), sa(this, Oe, mi).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
Ie = /* @__PURE__ */ new WeakMap();
ut = /* @__PURE__ */ new WeakMap();
Oe = /* @__PURE__ */ new WeakSet();
mi = function() {
  new De(this, ke).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    ui(this, ut, t), sa(this, Oe, di).call(this);
  });
};
di = function() {
  Lt(this, Ie) && this.observe(Lt(this, Ie).items, (t) => sa(this, Oe, pi).call(this, t), "umbCollectionItemsObserver");
};
pi = function(t) {
  const e = Lt(this, ut);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    var i, o, s;
    const n = e({ entityType: a.entityType }) + Ne.generateLocal({ unique: a.unique });
    return {
      id: a == null ? void 0 : a.unique,
      entityType: a == null ? void 0 : a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: m`<a href=${n}>${(i = a.pageData) == null ? void 0 : i.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = a.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "pageSize",
          value: m`${Math.round(((s = a.performanceData) == null ? void 0 : s.totalBytes) / 1024)}KB`
        },
        {
          columnAlias: "carbonRating",
          value: a.emissionsData.carbonRating
        },
        {
          columnAlias: "emissionsPerPageView",
          value: `${a.emissionsData.emissionsPerPageView}g`
        }
      ]
    };
  });
};
q.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ct([
  d()
], q.prototype, "_tableConfig", 2);
ct([
  d()
], q.prototype, "_tableColumns", 2);
ct([
  d()
], q.prototype, "_tableItems", 2);
q = ct([
  b("content-audit-carbon-rating-table-collection-view")
], q);
const ll = q, cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return q;
  },
  default: ll
}, Symbol.toStringTag, { value: "Module" })), za = "Umb.Workspace.ContentAudit.CarbonRating", ul = [
  {
    type: "workspace",
    kind: "default",
    alias: za,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: ri,
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
      collectionAlias: na
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: za
      }
    ]
  }
], ml = [
  {
    type: "repository",
    alias: li,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository.js")
  }
], dl = [
  {
    type: "collectionView",
    alias: sl,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => cl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: na
      }
    ]
  }
], pl = [
  {
    type: "collection",
    kind: "default",
    alias: na,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element.js"),
    meta: {
      repositoryAlias: li
    }
  },
  ...ml,
  ...dl
], hl = [
  ...ul,
  ...il,
  ...pl
], hi = "core-web-vitals-root", _l = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: hi,
    menus: [Qe]
  }
}, Cl = [_l], oa = "Umb.Collection.ContentAudit.CoreWebVitals", bl = "Umb.CollectionView.ContentAudit.CoreWebVitals.Table", _i = "Umb.Repository.ContentAuditCoreWebVitalsCollection";
var fl = Object.defineProperty, yl = Object.getOwnPropertyDescriptor, Ci = (t) => {
  throw TypeError(t);
}, mt = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? yl(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && fl(e, a, i), i;
}, ra = (t, e, a) => e.has(t) || Ci("Cannot " + a), kt = (t, e, a) => (ra(t, e, "read from private field"), e.get(t)), gt = (t, e, a) => e.has(t) ? Ci("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), bi = (t, e, a, n) => (ra(t, e, "write to private field"), e.set(t, a), a), la = (t, e, a) => (ra(t, e, "access private method"), a), Ee, dt, Se, fi, yi, Ai;
let Y = class extends U {
  constructor() {
    super(), gt(this, Se), this._tableConfig = {
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
    ], this._tableItems = [], gt(this, Ee), gt(this, dt), this.consumeContext(D, (t) => {
      bi(this, Ee, t);
    }), la(this, Se, fi).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
Ee = /* @__PURE__ */ new WeakMap();
dt = /* @__PURE__ */ new WeakMap();
Se = /* @__PURE__ */ new WeakSet();
fi = function() {
  new De(this, ke).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    bi(this, dt, t), la(this, Se, yi).call(this);
  });
};
yi = function() {
  kt(this, Ee) && this.observe(kt(this, Ee).items, (t) => la(this, Se, Ai).call(this, t), "umbCollectionItemsObserver");
};
Ai = function(t) {
  const e = kt(this, dt);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.filter((a) => a.pageData.statusCode === 200).map((a) => {
    var i;
    const n = e({ entityType: a.entityType }) + Ne.generateLocal({ unique: a.unique });
    return {
      id: a == null ? void 0 : a.unique,
      entityType: a == null ? void 0 : a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: m`<a href=${n}>${(i = a.pageData) == null ? void 0 : i.url}</a>`
        },
        {
          columnAlias: "cumulativeLayoutShift",
          value: a.performanceData.cumulativeLayoutShift
        },
        {
          columnAlias: "firstContentfulPaint",
          value: a.performanceData.firstContentfulPaint
        },
        {
          columnAlias: "largestContentfulPaint",
          value: a.performanceData.largestContentfulPaint
        },
        //{
        //    columnAlias: 'timeToInteractive',
        //    value: page.performanceData.timeToInteractive
        //},
        {
          columnAlias: "timeToFirstByte",
          value: a.performanceData.timeToFirstByte
        }
      ]
    };
  });
};
Y.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
mt([
  d()
], Y.prototype, "_tableConfig", 2);
mt([
  d()
], Y.prototype, "_tableColumns", 2);
mt([
  d()
], Y.prototype, "_tableItems", 2);
Y = mt([
  b("content-audit-core-web-vitals-table-collection-view")
], Y);
const Al = Y, Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return Y;
  },
  default: Al
}, Symbol.toStringTag, { value: "Module" })), qa = "Umb.Workspace.ContentAudit.CoreWebVitals", vl = [
  {
    type: "workspace",
    kind: "default",
    alias: qa,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: hi,
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
      collectionAlias: oa
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: qa
      }
    ]
  }
], gl = [
  {
    type: "repository",
    alias: _i,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository.js")
  }
], wl = [
  {
    type: "collectionView",
    alias: bl,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => Tl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: I,
        match: oa
      }
    ]
  }
], Il = [
  {
    type: "collection",
    kind: "default",
    alias: oa,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element.js"),
    meta: {
      repositoryAlias: _i
    }
  },
  ...gl,
  ...wl
], Ol = [
  ...vl,
  ...Cl,
  ...Il
], Ti = "export-root", El = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: Ti,
    menus: [Dt]
  }
}, Sl = [El], $l = "Umb.Workspace.ContentAudit.Export", Pl = [
  {
    type: "workspace",
    kind: "default",
    alias: $l,
    name: "Export Root Workspace",
    element: () => import("./export.element.js"),
    meta: {
      entityType: Ti,
      headline: "Export"
    }
  }
], Ul = [
  ...Pl,
  ...Sl
], ae = "Umb.Section.ContentAudit", Ll = {
  type: "section",
  alias: ae,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, kl = {
  type: "sectionView",
  alias: "Umb.SectionView.ContentAudit.Scan",
  name: "Content Audit Scan Section View",
  element: () => import("./section.element.js"),
  meta: {
    label: "Scan",
    icon: "icon-scan",
    pathname: "audit-root"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: ae
    }
  ]
}, Nl = [
  {
    type: "menu",
    alias: K,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: Je,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: Qe,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: Dt,
    name: "Tools Menu"
  }
], Dl = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: K
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: ae
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
      menu: Je
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: ae
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
      menu: Qe
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: ae
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
      menu: Dt
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: ae
      }
    ]
  }
], Rl = [
  Ll,
  kl,
  ...Nl,
  ...Dl,
  ...Gs,
  ..._o,
  ...So,
  ...Mo,
  ...Qo,
  ...ur,
  ...gr,
  ...Rr,
  ...qr,
  ...al,
  ...hl,
  ...Ol,
  ...Ul
], Wl = {
  type: "workspace",
  alias: qe,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Ss),
  meta: {
    entityType: on
  }
}, Vl = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: qe
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: qe
      }
    ]
  }
], xl = [
  Wl,
  ...Vl
], Ml = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element.js")
  }
], jl = [
  {
    type: "localization",
    alias: "Umb.ContentAudit.Localization.En-GB",
    weight: -100,
    name: "English (UK)",
    meta: {
      culture: "en"
    },
    js: () => import("./en.js")
  }
], Bl = {
  type: "workspaceView",
  alias: "Umbraco.Community.ContentAudit.Workspace",
  name: "ContentAudit Workspace",
  js: () => import("./contentaudit-workspace-view.js"),
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
}, zl = [Bl], ql = {
  type: "globalContext",
  alias: cs,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => ps)
}, mc = async (t, e) => {
  e.registerMany([
    ql,
    ...Rl,
    ...xl,
    ...Ml,
    ...jl,
    ...zl
  ]), t.consumeContext(Oi, async (a) => {
    if (!a) return;
    const n = a.getOpenApiConfiguration();
    _.setConfig({
      baseUrl: (n == null ? void 0 : n.base) ?? "",
      auth: (n == null ? void 0 : n.token) ?? void 0,
      credentials: (n == null ? void 0 : n.credentials) ?? "same-origin"
    }), _.interceptors.request.use(async (i, o) => {
      const s = await n.token();
      return i.headers.set("Authorization", `Bearer ${s}`), i;
    });
  });
};
export {
  Ve as A,
  Qe as B,
  rn as C,
  Dt as D,
  Rt as E,
  $s as F,
  un as G,
  va as H,
  nn as I,
  Ps as J,
  E as K,
  rc as U,
  oc as a,
  Cn as b,
  bn as c,
  he as d,
  Z as e,
  cn as f,
  Ua as g,
  je as h,
  Be as i,
  wt as j,
  It as k,
  ze as l,
  lc as m,
  cc as n,
  mc as o,
  Li as p,
  ki as q,
  Et as r,
  Ye as s,
  hs as t,
  St as u,
  qe as v,
  cs as w,
  on as x,
  K as y,
  Je as z
};
//# sourceMappingURL=index.js.map
