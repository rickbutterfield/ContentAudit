var pa = (t) => {
  throw TypeError(t);
};
var ha = (t, e, a) => e.has(t) || pa("Cannot " + a);
var u = (t, e, a) => (ha(t, e, "read from private field"), a ? a.call(t) : e.get(t)), y = (t, e, a) => e.has(t) ? pa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), A = (t, e, a, n) => (ha(t, e, "write to private field"), n ? n.call(t, a) : e.set(t, a), a);
import { UMB_AUTH_CONTEXT as gs } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as ce } from "@umbraco-cms/backoffice/element-api";
import { LitElement as J, html as m, css as T, property as H, customElement as C, nothing as za, state as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as qa } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as ws } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as Is, UMB_WORKSPACE_CONDITION_ALIAS as D, UMB_WORKSPACE_MODAL as Le } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as ee, tryExecuteAndNotify as Os } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as pt, UmbArrayState as ht } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as Es } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as N, UMB_COLLECTION_ALIAS_CONDITION as w } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Ss } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as ke } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Ne } from "@umbraco-cms/backoffice/router";
const $s = [
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
], Ps = [
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
var Us = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, Ya = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Ls(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && Us(e, a, s), s;
};
let Me = class extends ce(J) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = $s[this.type - 1];
      return m`
                <uui-tag color=${t == null ? void 0 : t.color}>
                    <uui-icon name="${t == null ? void 0 : t.icon}"></uui-icon>
                    ${t == null ? void 0 : t.label}
                </uui-tag>
            `;
    }
  }
};
Me.styles = [
  T`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Ya([
  H({ attribute: !1 })
], Me.prototype, "type", 2);
Me = Ya([
  C("content-audit-issue-type-label")
], Me);
var ks = Object.defineProperty, Ns = Object.getOwnPropertyDescriptor, Ha = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Ns(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && ks(e, a, s), s;
};
let je = class extends ce(J) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Ps[this.type - 1];
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
Ha([
  H({ attribute: !1 })
], je.prototype, "type", 2);
je = Ha([
  C("content-audit-priority-type-label")
], je);
var Ds = Object.defineProperty, Rs = Object.getOwnPropertyDescriptor, Ka = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Rs(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && Ds(e, a, s), s;
};
let gt = class extends ce(J) {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? m`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : za;
  }
};
Ka([
  H({ attribute: !1 })
], gt.prototype, "statusCode", 2);
gt = Ka([
  C("content-audit-status-code-label")
], gt);
var Ws = Object.defineProperty, Vs = Object.getOwnPropertyDescriptor, Ga = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Vs(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && Ws(e, a, s), s;
};
let wt = class extends ce(J) {
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
Ga([
  H({ attribute: !0 })
], wt.prototype, "value", 2);
wt = Ga([
  C("content-audit-carbon-intensity-label")
], wt);
var Fa = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(Fa || {}), It = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(It || {});
const xs = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, a) => typeof a == "bigint" ? a.toString() : a
  )
}, Ms = ({
  onRequest: t,
  onSseError: e,
  onSseEvent: a,
  responseTransformer: n,
  responseValidator: s,
  sseDefaultRetryDelay: o,
  sseMaxRetryAttempts: i,
  sseMaxRetryDelay: l,
  sseSleepFn: c,
  url: h,
  ...r
}) => {
  let b;
  const ue = c ?? ((p) => new Promise((v) => setTimeout(v, p)));
  return { stream: async function* () {
    let p = o ?? 3e3, v = 0;
    const G = r.signal ?? new AbortController().signal;
    for (; !G.aborted; ) {
      v++;
      const me = r.headers instanceof Headers ? r.headers : new Headers(r.headers);
      b !== void 0 && me.set("Last-Event-ID", b);
      try {
        const F = {
          redirect: "follow",
          ...r,
          body: r.serializedBody,
          headers: me,
          signal: G
        };
        let E = new Request(h, F);
        t && (E = await t(h, F));
        const g = await (r.fetch ?? globalThis.fetch)(E);
        if (!g.ok)
          throw new Error(
            `SSE failed: ${g.status} ${g.statusText}`
          );
        if (!g.body) throw new Error("No body in SSE response");
        const S = g.body.pipeThrough(new TextDecoderStream()).getReader();
        let dt = "";
        const ra = () => {
          try {
            S.cancel();
          } catch {
          }
        };
        G.addEventListener("abort", ra);
        try {
          for (; ; ) {
            const { done: ys, value: As } = await S.read();
            if (ys) break;
            dt += As;
            const ca = dt.split(`

`);
            dt = ca.pop() ?? "";
            for (const Ts of ca) {
              const vs = Ts.split(`
`), Re = [];
              let ua;
              for (const I of vs)
                if (I.startsWith("data:"))
                  Re.push(I.replace(/^data:\s*/, ""));
                else if (I.startsWith("event:"))
                  ua = I.replace(/^event:\s*/, "");
                else if (I.startsWith("id:"))
                  b = I.replace(/^id:\s*/, "");
                else if (I.startsWith("retry:")) {
                  const da = Number.parseInt(
                    I.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(da) || (p = da);
                }
              let X, ma = !1;
              if (Re.length) {
                const I = Re.join(`
`);
                try {
                  X = JSON.parse(I), ma = !0;
                } catch {
                  X = I;
                }
              }
              ma && (s && await s(X), n && (X = await n(X))), a == null || a({
                data: X,
                event: ua,
                id: b,
                retry: p
              }), Re.length && (yield X);
            }
          }
        } finally {
          G.removeEventListener("abort", ra), S.releaseLock();
        }
        break;
      } catch (F) {
        if (e == null || e(F), i !== void 0 && v >= i)
          break;
        const E = Math.min(
          p * 2 ** (v - 1),
          l ?? 3e4
        );
        await ue(E);
      }
    }
  }() };
}, js = (t) => {
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
}, Bs = (t) => {
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
}, zs = (t) => {
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
}, Xa = ({
  allowReserved: t,
  explode: e,
  name: a,
  style: n,
  value: s
}) => {
  if (!e) {
    const l = (t ? s : s.map((c) => encodeURIComponent(c))).join(Bs(n));
    switch (n) {
      case "label":
        return `.${l}`;
      case "matrix":
        return `;${a}=${l}`;
      case "simple":
        return l;
      default:
        return `${a}=${l}`;
    }
  }
  const o = js(n), i = s.map((l) => n === "label" || n === "simple" ? t ? l : encodeURIComponent(l) : Fe({
    allowReserved: t,
    name: a,
    value: l
  })).join(o);
  return n === "label" || n === "matrix" ? o + i : i;
}, Fe = ({
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
}, Ja = ({
  allowReserved: t,
  explode: e,
  name: a,
  style: n,
  value: s,
  valueOnly: o
}) => {
  if (s instanceof Date)
    return o ? s.toISOString() : `${a}=${s.toISOString()}`;
  if (n !== "deepObject" && !e) {
    let c = [];
    Object.entries(s).forEach(([r, b]) => {
      c = [
        ...c,
        r,
        t ? b : encodeURIComponent(b)
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
  const i = zs(n), l = Object.entries(s).map(
    ([c, h]) => Fe({
      allowReserved: t,
      name: n === "deepObject" ? `${a}[${c}]` : c,
      value: h
    })
  ).join(i);
  return n === "label" || n === "matrix" ? i + l : l;
}, qs = /\{[^{}]+\}/g, Ys = ({ path: t, url: e }) => {
  let a = e;
  const n = e.match(qs);
  if (n)
    for (const s of n) {
      let o = !1, i = s.substring(1, s.length - 1), l = "simple";
      i.endsWith("*") && (o = !0, i = i.substring(0, i.length - 1)), i.startsWith(".") ? (i = i.substring(1), l = "label") : i.startsWith(";") && (i = i.substring(1), l = "matrix");
      const c = t[i];
      if (c == null)
        continue;
      if (Array.isArray(c)) {
        a = a.replace(
          s,
          Xa({ explode: o, name: i, style: l, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        a = a.replace(
          s,
          Ja({
            explode: o,
            name: i,
            style: l,
            value: c,
            valueOnly: !0
          })
        );
        continue;
      }
      if (l === "matrix") {
        a = a.replace(
          s,
          `;${Fe({
            name: i,
            value: c
          })}`
        );
        continue;
      }
      const h = encodeURIComponent(
        l === "label" ? `.${c}` : c
      );
      a = a.replace(s, h);
    }
  return a;
}, Hs = ({
  baseUrl: t,
  path: e,
  query: a,
  querySerializer: n,
  url: s
}) => {
  const o = s.startsWith("/") ? s : `/${s}`;
  let i = (t ?? "") + o;
  e && (i = Ys({ path: e, url: i }));
  let l = a ? n(a) : "";
  return l.startsWith("?") && (l = l.substring(1)), l && (i += `?${l}`), i;
};
function Ks(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const Gs = async (t, e) => {
  const a = typeof e == "function" ? await e(t) : e;
  if (a)
    return t.scheme === "bearer" ? `Bearer ${a}` : t.scheme === "basic" ? `Basic ${btoa(a)}` : a;
}, Qa = ({
  allowReserved: t,
  array: e,
  object: a
} = {}) => (s) => {
  const o = [];
  if (s && typeof s == "object")
    for (const i in s) {
      const l = s[i];
      if (l != null)
        if (Array.isArray(l)) {
          const c = Xa({
            allowReserved: t,
            explode: !0,
            name: i,
            style: "form",
            value: l,
            ...e
          });
          c && o.push(c);
        } else if (typeof l == "object") {
          const c = Ja({
            allowReserved: t,
            explode: !0,
            name: i,
            style: "deepObject",
            value: l,
            ...a
          });
          c && o.push(c);
        } else {
          const c = Fe({
            allowReserved: t,
            name: i,
            value: l
          });
          c && o.push(c);
        }
    }
  return o.join("&");
}, Fs = (t) => {
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
}, Xs = (t, e) => {
  var a, n;
  return e ? !!(t.headers.has(e) || (a = t.query) != null && a[e] || (n = t.headers.get("Cookie")) != null && n.includes(`${e}=`)) : !1;
}, Js = async ({
  security: t,
  ...e
}) => {
  for (const a of t) {
    if (Xs(e, a.name))
      continue;
    const n = await Gs(a, e.auth);
    if (!n)
      continue;
    const s = a.name ?? "Authorization";
    switch (a.in) {
      case "query":
        e.query || (e.query = {}), e.query[s] = n;
        break;
      case "cookie":
        e.headers.append("Cookie", `${s}=${n}`);
        break;
      case "header":
      default:
        e.headers.set(s, n);
        break;
    }
  }
}, _a = (t) => Hs({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : Qa(t.querySerializer),
  url: t.url
}), ba = (t, e) => {
  var n;
  const a = { ...t, ...e };
  return (n = a.baseUrl) != null && n.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = Za(t.headers, e.headers), a;
}, Qs = (t) => {
  const e = [];
  return t.forEach((a, n) => {
    e.push([n, a]);
  }), e;
}, Za = (...t) => {
  const e = new Headers();
  for (const a of t) {
    if (!a)
      continue;
    const n = a instanceof Headers ? Qs(a) : Object.entries(a);
    for (const [s, o] of n)
      if (o === null)
        e.delete(s);
      else if (Array.isArray(o))
        for (const i of o)
          e.append(s, i);
      else o !== void 0 && e.set(
        s,
        typeof o == "object" ? JSON.stringify(o) : o
      );
  }
  return e;
};
class _t {
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
const Zs = () => ({
  error: new _t(),
  request: new _t(),
  response: new _t()
}), ei = Qa({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), ti = {
  "Content-Type": "application/json"
}, en = (t = {}) => ({
  ...xs,
  headers: ti,
  parseAs: "auto",
  querySerializer: ei,
  ...t
}), ai = (t = {}) => {
  let e = ba(en(), t);
  const a = () => ({ ...e }), n = (h) => (e = ba(e, h), a()), s = Zs(), o = async (h) => {
    const r = {
      ...e,
      ...h,
      fetch: h.fetch ?? e.fetch ?? globalThis.fetch,
      headers: Za(e.headers, h.headers),
      serializedBody: void 0
    };
    r.security && await Js({
      ...r,
      security: r.security
    }), r.requestValidator && await r.requestValidator(r), r.body !== void 0 && r.bodySerializer && (r.serializedBody = r.bodySerializer(r.body)), (r.body === void 0 || r.serializedBody === "") && r.headers.delete("Content-Type");
    const b = _a(r);
    return { opts: r, url: b };
  }, i = async (h) => {
    const { opts: r, url: b } = await o(h), ue = {
      redirect: "follow",
      ...r,
      body: Ks(r)
    };
    let U = new Request(b, ue);
    for (const f of s.request.fns)
      f && (U = await f(U, r));
    const De = r.fetch;
    let p = await De(U);
    for (const f of s.response.fns)
      f && (p = await f(p, U, r));
    const v = {
      request: U,
      response: p
    };
    if (p.ok) {
      const f = (r.parseAs === "auto" ? Fs(p.headers.get("Content-Type")) : r.parseAs) ?? "json";
      if (p.status === 204 || p.headers.get("Content-Length") === "0") {
        let S;
        switch (f) {
          case "arrayBuffer":
          case "blob":
          case "text":
            S = await p[f]();
            break;
          case "formData":
            S = new FormData();
            break;
          case "stream":
            S = p.body;
            break;
          case "json":
          default:
            S = {};
            break;
        }
        return r.responseStyle === "data" ? S : {
          data: S,
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
          return r.responseStyle === "data" ? p.body : {
            data: p.body,
            ...v
          };
      }
      return f === "json" && (r.responseValidator && await r.responseValidator(g), r.responseTransformer && (g = await r.responseTransformer(g))), r.responseStyle === "data" ? g : {
        data: g,
        ...v
      };
    }
    const G = await p.text();
    let me;
    try {
      me = JSON.parse(G);
    } catch {
    }
    const F = me ?? G;
    let E = F;
    for (const f of s.error.fns)
      f && (E = await f(F, p, U, r));
    if (E = E || {}, r.throwOnError)
      throw E;
    return r.responseStyle === "data" ? void 0 : {
      error: E,
      ...v
    };
  }, l = (h) => (r) => i({ ...r, method: h }), c = (h) => async (r) => {
    const { opts: b, url: ue } = await o(r);
    return Ms({
      ...b,
      body: b.body,
      headers: b.headers,
      method: h,
      onRequest: async (U, De) => {
        let p = new Request(U, De);
        for (const v of s.request.fns)
          v && (p = await v(p, b));
        return p;
      },
      url: ue
    });
  };
  return {
    buildUrl: _a,
    connect: l("CONNECT"),
    delete: l("DELETE"),
    get: l("GET"),
    getConfig: a,
    head: l("HEAD"),
    interceptors: s,
    options: l("OPTIONS"),
    patch: l("PATCH"),
    post: l("POST"),
    put: l("PUT"),
    request: i,
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
    trace: l("TRACE")
  };
}, _ = ai(en({
  baseUrl: "http://localhost:26291",
  throwOnError: !0
}));
class We {
  static getCollection(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit",
      ...e
    });
  }
  static getByKey(e) {
    return (e.client ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}",
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
  static getLatestAuditOverview(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/latest-audit",
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
class sc {
  static startCrawl(e) {
    return ((e == null ? void 0 : e.client) ?? _).sse.get({
      url: "/umbraco/content-audit/management/api/v1/crawl",
      ...e
    });
  }
}
class tn {
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
class ni {
  static getSettings(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/settings",
      ...e
    });
  }
}
var si = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, an = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? ii(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && si(e, a, s), s;
};
let Be = class extends ce(J) {
  _getColour() {
    return this.value != null ? this.value.rating == It.POOR ? "danger" : this.value.rating == It.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == Fa.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
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
Be.styles = [
  T`
            uui-tag {
                font-size: 14px;
            }
        `
];
an([
  H({ attribute: !1 })
], Be.prototype, "value", 2);
Be = an([
  C("content-audit-metric-label")
], Be);
class ic extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class oc extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class lc extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const ze = "Umb.Workspace.ContentAudit", oi = "Umb.Context.ContentAudit", nn = "content-audit";
var L;
class li {
  constructor(e) {
    y(this, L);
    A(this, L, e);
  }
  async getLatestAuditOverview() {
    return await ee(u(this, L), We.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await ee(u(this, L), We.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await ee(u(this, L), tn.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await ee(u(this, L), We.getHealthScore());
  }
  async getAuditOverviews() {
    return await ee(u(this, L), We.getCollection({
      query: { skip: 0, take: 5 }
    }));
  }
}
L = new WeakMap();
var Se;
class ri {
  constructor(e) {
    y(this, Se);
    A(this, Se, e);
  }
  async getSettings() {
    return await Os(u(this, Se), ni.getSettings());
  }
}
Se = new WeakMap();
var k, $e;
class ci extends qa {
  constructor(a) {
    super(a);
    y(this, k);
    y(this, $e);
    A(this, k, new li(this)), A(this, $e, new ri(this));
  }
  async getLatestAuditOverview() {
    return u(this, k).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return u(this, k).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return u(this, k).getTopIssues();
  }
  async getHealthScore() {
    return u(this, k).getHealthScore();
  }
  async getSettings() {
    return u(this, $e).getSettings();
  }
  async getAuditOverviews() {
    return u(this, k).getAuditOverviews();
  }
}
k = new WeakMap(), $e = new WeakMap();
var $, ne, se, ie, oe, le, re;
class Ot extends qa {
  constructor(a) {
    super(a);
    y(this, $);
    y(this, ne);
    y(this, se);
    y(this, ie);
    y(this, oe);
    y(this, le);
    y(this, re);
    this.workspaceAlias = ze, A(this, ne, new pt(void 0)), this.latestAuditOverview = u(this, ne).asObservable(), A(this, se, new ht([], (n) => n.key)), this.auditOverviews = u(this, se).asObservable(), A(this, ie, new ht([], (n) => n.unique)), this.pagesWithMissingMetadata = u(this, ie).asObservable(), A(this, oe, new ht([], (n) => n.name)), this.topIssues = u(this, oe).asObservable(), A(this, le, new pt(void 0)), this.healthScore = u(this, le).asObservable(), A(this, re, new pt(void 0)), this.settings = u(this, re).asObservable(), this.provideContext(Is, this), this.provideContext(sn, this), A(this, $, new ci(this));
  }
  getEntityType() {
    return nn;
  }
  async getLatestAuditOverview() {
    const { data: a } = await u(this, $).getLatestAuditOverview();
    a && u(this, ne).setValue(a);
  }
  async getAuditOverviews() {
    const { data: a } = await u(this, $).getAuditOverviews();
    if (a && a.items) {
      const n = a.items.sort((s, o) => {
        const i = s.runDate ? new Date(s.runDate).getTime() : 0;
        return (o.runDate ? new Date(o.runDate).getTime() : 0) - i;
      });
      u(this, se).setValue(n);
    }
  }
  async getPagesWithMissingMetadata() {
    const { data: a } = await u(this, $).getPagesWithMissingMetadata();
    a && u(this, ie).setValue(a.items);
  }
  async getTopIssues() {
    const { data: a } = await u(this, $).getTopIssues();
    a && u(this, oe).setValue(a.items);
  }
  async getHealthScore() {
    const { data: a } = await u(this, $).getHealthScore();
    a && u(this, le).setValue(a);
  }
  async getSettings() {
    const { data: a } = await u(this, $).getSettings();
    a && u(this, re).setValue(a);
  }
}
$ = new WeakMap(), ne = new WeakMap(), se = new WeakMap(), ie = new WeakMap(), oe = new WeakMap(), le = new WeakMap(), re = new WeakMap();
const sn = new ws(
  "ContentAuditContext"
), ui = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: sn,
  ContentAuditContext: Ot,
  default: Ot
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mi = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = globalThis, kt = Ve.ShadowRoot && (Ve.ShadyCSS === void 0 || Ve.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, on = Symbol(), Ca = /* @__PURE__ */ new WeakMap();
let di = class {
  constructor(e, a, n) {
    if (this._$cssResult$ = !0, n !== on) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = a;
  }
  get styleSheet() {
    let e = this.o;
    const a = this.t;
    if (kt && e === void 0) {
      const n = a !== void 0 && a.length === 1;
      n && (e = Ca.get(a)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ca.set(a, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const pi = (t) => new di(typeof t == "string" ? t : t + "", void 0, on), hi = (t, e) => {
  if (kt) t.adoptedStyleSheets = e.map((a) => a instanceof CSSStyleSheet ? a : a.styleSheet);
  else for (const a of e) {
    const n = document.createElement("style"), s = Ve.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = a.cssText, t.appendChild(n);
  }
}, fa = kt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const n of e.cssRules) a += n.cssText;
  return pi(a);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _i, defineProperty: bi, getOwnPropertyDescriptor: Ci, getOwnPropertyNames: fi, getOwnPropertySymbols: yi, getPrototypeOf: Ai } = Object, R = globalThis, ya = R.trustedTypes, Ti = ya ? ya.emptyScript : "", bt = R.reactiveElementPolyfillSupport, pe = (t, e) => t, Et = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ti : null;
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
} }, ln = (t, e) => !_i(t, e), Aa = { attribute: !0, type: String, converter: Et, reflect: !1, useDefault: !1, hasChanged: ln };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), R.litPropertyMetadata ?? (R.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class de extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, a = Aa) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(e, a), !a.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(e, n, a);
      s !== void 0 && bi(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, a, n) {
    const { get: s, set: o } = Ci(this.prototype, e) ?? { get() {
      return this[a];
    }, set(i) {
      this[a] = i;
    } };
    return { get: s, set(i) {
      const l = s == null ? void 0 : s.call(this);
      o == null || o.call(this, i), this.requestUpdate(e, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Aa;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pe("elementProperties"))) return;
    const e = Ai(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pe("properties"))) {
      const a = this.properties, n = [...fi(a), ...yi(a)];
      for (const s of n) this.createProperty(s, a[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const a = litPropertyMetadata.get(e);
      if (a !== void 0) for (const [n, s] of a) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [a, n] of this.elementProperties) {
      const s = this._$Eu(a, n);
      s !== void 0 && this._$Eh.set(s, a);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const a = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const s of n) a.unshift(fa(s));
    } else e !== void 0 && a.push(fa(e));
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
    return hi(e, this.constructor.elementStyles), e;
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
    const n = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, n);
    if (s !== void 0 && n.reflect === !0) {
      const i = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : Et).toAttribute(a, n.type);
      this._$Em = e, i == null ? this.removeAttribute(s) : this.setAttribute(s, i), this._$Em = null;
    }
  }
  _$AK(e, a) {
    var o, i;
    const n = this.constructor, s = n._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = n.getPropertyOptions(s), c = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : Et;
      this._$Em = s, this[s] = c.fromAttribute(a, l.type) ?? ((i = this._$Ej) == null ? void 0 : i.get(s)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, a, n) {
    var s;
    if (e !== void 0) {
      const o = this.constructor, i = this[e];
      if (n ?? (n = o.getPropertyOptions(e)), !((n.hasChanged ?? ln)(i, a) || n.useDefault && n.reflect && i === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(o._$Eu(e, n)))) return;
      this.C(e, a, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, a, { useDefault: n, reflect: s, wrapped: o }, i) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, i ?? a ?? this[e]), o !== !0 || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (a = void 0), this._$AL.set(e, a)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [o, i] of this._$Ep) this[o] = i;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, i] of s) {
        const { wrapped: l } = i, c = this[o];
        l !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, i, c);
      }
    }
    let e = !1;
    const a = this._$AL;
    try {
      e = this.shouldUpdate(a), e ? (this.willUpdate(a), (n = this._$EO) == null || n.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(a)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(a);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var a;
    (a = this._$EO) == null || a.forEach((n) => {
      var s;
      return (s = n.hostUpdated) == null ? void 0 : s.call(n);
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
var vi = Object.getOwnPropertyDescriptor, gi = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? vi(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = i(s) || s);
  return s;
};
let qe = class extends ce(J) {
  constructor() {
    super(), this._workspaceContext = new Ot(this);
  }
  render() {
    return m`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
qe = gi([
  mi("content-audit-workspace-root")
], qe);
const wi = qe, Ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return qe;
  },
  default: wi
}, Symbol.toStringTag, { value: "Module" })), K = "Umb.Menu.ContentAudit", Xe = "Umb.Menu.ContentMetadata", Je = "Umb.Menu.ContentPerformance", Nt = "Umb.Menu.ContentTools", Dt = "Umb.Collection.ContentAudit.Issues", Oi = "Umb.CollectionView.ContentAudit.Issues.Table", rn = "Umb.Repository.ContentAuditIssuesCollection";
var Pe;
class Ei {
  constructor(e) {
    y(this, Pe);
    A(this, Pe, e);
  }
  async getCollection(e) {
    const { data: a, error: n } = await ee(u(this, Pe), tn.getAllIssues({ query: e }));
    if (n)
      return { error: n };
    if (!a)
      return { data: { items: [], total: 0 } };
    const { items: s, total: o } = a;
    return { data: { items: s, total: o } };
  }
}
Pe = new WeakMap();
var Ue;
class Ta extends Es {
  constructor(a) {
    super(a);
    y(this, Ue);
    A(this, Ue, new Ei(a));
  }
  async requestCollection(a) {
    return u(this, Ue).getCollection(a);
  }
}
Ue = new WeakMap();
const Si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: Ta,
  default: Ta
}, Symbol.toStringTag, { value: "Module" }));
var $i = Object.defineProperty, Pi = Object.getOwnPropertyDescriptor, cn = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Pi(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && $i(e, a, s), s;
};
let Ye = class extends J {
  render() {
    return this.value ? m`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : za;
  }
};
Ye.styles = [
  Ss,
  T`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
cn([
  H({ attribute: !1 })
], Ye.prototype, "value", 2);
Ye = cn([
  C("content-audit-issues-table-name-column-layout")
], Ye);
var Ui = Object.defineProperty, Li = Object.getOwnPropertyDescriptor, un = (t) => {
  throw TypeError(t);
}, Q = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Li(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && Ui(e, a, s), s;
}, Rt = (t, e, a) => e.has(t) || un("Cannot " + a), va = (t, e, a) => (Rt(t, e, "read from private field"), e.get(t)), ga = (t, e, a) => e.has(t) ? un("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), ki = (t, e, a, n) => (Rt(t, e, "write to private field"), e.set(t, a), a), xe = (t, e, a) => (Rt(t, e, "access private method"), a), he, te, mn, Wt, dn;
let O = class extends P {
  constructor() {
    super(), ga(this, te), this.data = [], this.hideSummary = !1, this._issues = [], this._tableConfig = {
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
    ], this._tableItems = [], ga(this, he), this.consumeContext(N, (t) => {
      ki(this, he, t), xe(this, te, mn).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && (this._issues = this.data, xe(this, te, Wt).call(this, this.data));
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
                ${xe(this, te, dn).call(this)}
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
he = /* @__PURE__ */ new WeakMap();
te = /* @__PURE__ */ new WeakSet();
mn = function() {
  va(this, he) && this.observe(va(this, he).items, (t) => {
    this._issues = t, xe(this, te, Wt).call(this, t);
  }, "umbCollectionItemsObserver");
};
Wt = function(t) {
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
        value: `${e.percentOfTotal.toFixed(0)}%`
      }
    ]
  }));
};
dn = function() {
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
O.styles = [
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
], O.prototype, "data", 2);
Q([
  H({ type: Boolean, attribute: "hide-summary" })
], O.prototype, "hideSummary", 2);
Q([
  d()
], O.prototype, "_issues", 2);
Q([
  d()
], O.prototype, "_tableConfig", 2);
Q([
  d()
], O.prototype, "_tableColumns", 2);
Q([
  d()
], O.prototype, "_tableItems", 2);
O = Q([
  C("content-audit-issues-table-collection-view")
], O);
const Ni = O, Di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return O;
  },
  default: Ni
}, Symbol.toStringTag, { value: "Module" })), Vt = "Umb.Collection.ContentAudit.Audits", Ri = "Umb.CollectionView.ContentAudit.Audits.Table", pn = "Umb.Repository.ContentAuditAuditsCollection", Wi = [
  {
    type: "repository",
    alias: pn,
    name: "Audits Collection Repository",
    api: () => import("./audits-collection.repository.js")
  }
], Vi = [
  {
    type: "collectionView",
    alias: Ri,
    name: "Audits Table Collection View",
    js: () => import("./audits-table-collection-view.element.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: Vt
      }
    ]
  }
], xi = [
  {
    type: "collection",
    kind: "default",
    alias: Vt,
    name: "Audits Collection",
    element: () => import("./audits.element.js"),
    meta: {
      repositoryAlias: pn
    }
  },
  ...Wi,
  ...Vi
], Mi = {
  type: "menuItem",
  kind: "tree",
  alias: "Umb.MenuItem.ContentAudit.Audits",
  name: "Audits Menu Item",
  weight: 12e3,
  meta: {
    label: "Audits",
    icon: "icon-browser-window",
    treeAlias: "Umb.Tree.ContentAudit.Audits",
    menus: [K]
  }
}, ji = [Mi], Bi = "audits", hn = "audits-root", zi = [
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
    forEntityTypes: [Bi, hn]
  }
], Ct = "Umb.Workspace.ContentAudit.Audits", qi = [
  {
    type: "workspace",
    kind: "routable",
    alias: Ct,
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
        alias: D,
        match: Ct
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
        alias: D,
        match: Ct
      }
    ]
  }
], wa = "Umb.Workspace.ContentAudit.AuditsRoot", Yi = [
  {
    type: "workspace",
    kind: "default",
    alias: wa,
    name: "Audits Root Workspace",
    meta: {
      entityType: hn,
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
      collectionAlias: Vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: wa
      }
    ]
  }
], Hi = [
  ...qi,
  ...Yi
], Ki = [
  ...xi,
  ...ji,
  ...zi,
  ...Hi
], _n = "all-pages-root", Gi = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: _n,
    menus: [K]
  }
}, Fi = [Gi], Ia = "Umb.Workspace.ContentAudit.AllPagesRoot", Z = "Umb.Workspace.ContentAudit.AllPages", Xi = [
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
        alias: D,
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
        alias: D,
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
        alias: D,
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
        alias: D,
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
        alias: D,
        match: Z
      }
    ]
  }
], xt = "Umb.Collection.ContentAudit.AllPages", Ji = "Umb.CollectionView.ContentAudit.AllPages.Table", bn = "Umb.Repository.ContentAuditAllPagesCollection";
var Qi = Object.defineProperty, Zi = Object.getOwnPropertyDescriptor, Cn = (t) => {
  throw TypeError(t);
}, Qe = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Zi(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && Qi(e, a, s), s;
}, Mt = (t, e, a) => e.has(t) || Cn("Cannot " + a), Oa = (t, e, a) => (Mt(t, e, "read from private field"), e.get(t)), Ea = (t, e, a) => e.has(t) ? Cn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), eo = (t, e, a, n) => (Mt(t, e, "write to private field"), e.set(t, a), a), fn = (t, e, a) => (Mt(t, e, "access private method"), a), _e, He, yn, An;
let W = class extends P {
  constructor() {
    super(), Ea(this, He), this._tableConfig = {
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
    ], this._tableItems = [], Ea(this, _e), this.consumeContext(N, (t) => {
      eo(this, _e, t), fn(this, He, yn).call(this);
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
_e = /* @__PURE__ */ new WeakMap();
He = /* @__PURE__ */ new WeakSet();
yn = function() {
  Oa(this, _e) && this.observe(Oa(this, _e).items, (t) => fn(this, He, An).call(this, t), "umbCollectionItemsObserver");
};
An = function(t) {
  this._tableItems = t.map((e) => {
    var a, n, s;
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
          value: m`<content-audit-status-code-label .statusCode=${(s = e.pageData) == null ? void 0 : s.statusCode}></content-audit-status-code-label>`
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
Qe([
  d()
], W.prototype, "_tableConfig", 2);
Qe([
  d()
], W.prototype, "_tableColumns", 2);
Qe([
  d()
], W.prototype, "_tableItems", 2);
W = Qe([
  C("content-audit-all-pages-table-collection-view")
], W);
const to = W, ao = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return W;
  },
  default: to
}, Symbol.toStringTag, { value: "Module" })), no = [
  {
    type: "workspace",
    kind: "default",
    alias: Ia,
    name: "All Pages Root Workspace",
    meta: {
      entityType: _n,
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
      collectionAlias: xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ia
      }
    ]
  }
], so = [...Xi, ...no], io = [
  {
    type: "repository",
    alias: bn,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository.js")
  }
], oo = [
  {
    type: "collectionView",
    alias: Ji,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => ao),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: xt
      }
    ]
  }
], lo = [
  {
    type: "collection",
    kind: "default",
    alias: xt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element.js"),
    meta: {
      repositoryAlias: bn
    }
  },
  ...io,
  ...oo
], ro = "Umb.Repository.ContentAudit.AllPages.Detail", co = "Umb.Store.ContentAudit.AllPages.Detail", uo = [
  {
    type: "repository",
    alias: ro,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository.js")
  },
  {
    type: "store",
    alias: co,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store.js")
  }
], mo = [...uo], po = [
  ...so,
  ...Fi,
  ...lo,
  ...mo
], Tn = "issues-root", ho = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: Tn,
    menus: [K]
  }
}, _o = [ho], Sa = "Umb.Workspace.ContentAudit.IssuesRoot", $a = "Umb.Workspace.ContentAudit.Issues", bo = [
  {
    type: "workspace",
    kind: "routable",
    alias: $a,
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
        alias: D,
        match: $a
      }
    ]
  }
], Co = [
  {
    type: "workspace",
    kind: "default",
    alias: Sa,
    name: "Issues Root Workspace",
    meta: {
      entityType: Tn,
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
      collectionAlias: Dt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Sa
      }
    ]
  }
], fo = [...bo, ...Co], yo = [
  {
    type: "repository",
    alias: rn,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => Si)
  }
], Ao = [
  {
    type: "collectionView",
    alias: Oi,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => Di),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: Dt
      }
    ]
  }
], To = [
  {
    type: "collection",
    kind: "default",
    alias: Dt,
    name: "Issues Collection",
    element: () => import("./issues.element.js"),
    meta: {
      repositoryAlias: rn
    }
  },
  ...yo,
  ...Ao
], vo = "Umb.Repository.ContentAudit.Issues.Detail", go = "Umb.Store.ContentAudit.Issues.Detail", wo = [
  {
    type: "repository",
    alias: vo,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository.js")
  },
  {
    type: "store",
    alias: go,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store.js")
  }
], Io = [...wo], Oo = [
  ...fo,
  ..._o,
  ...To,
  ...Io
], vn = "status-codes-root", Eo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: vn,
    menus: [K]
  }
}, So = [Eo], jt = "Umb.Collection.ContentAudit.StatusCodes", $o = "Umb.CollectionView.ContentAudit.StatusCodes.Table", gn = "Umb.Repository.ContentAuditStatusCodesCollection";
var Po = Object.defineProperty, Uo = Object.getOwnPropertyDescriptor, wn = (t) => {
  throw TypeError(t);
}, Ze = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Uo(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && Po(e, a, s), s;
}, Bt = (t, e, a) => e.has(t) || wn("Cannot " + a), St = (t, e, a) => (Bt(t, e, "read from private field"), e.get(t)), ft = (t, e, a) => e.has(t) ? wn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), In = (t, e, a, n) => (Bt(t, e, "write to private field"), e.set(t, a), a), zt = (t, e, a) => (Bt(t, e, "access private method"), a), be, et, Ce, On, En, Sn;
let V = class extends P {
  constructor() {
    super(), ft(this, Ce), this._tableConfig = {
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
    ], this._tableItems = [], ft(this, be), ft(this, et), this.consumeContext(N, (t) => {
      In(this, be, t);
    }), zt(this, Ce, On).call(this);
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
et = /* @__PURE__ */ new WeakMap();
Ce = /* @__PURE__ */ new WeakSet();
On = function() {
  new Ne(this, Le).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    In(this, et, t), zt(this, Ce, En).call(this);
  });
};
En = function() {
  St(this, be) && this.observe(St(this, be).items, (t) => zt(this, Ce, Sn).call(this, t), "umbCollectionItemsObserver");
};
Sn = function(t) {
  const e = St(this, et);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    var s, o, i;
    const n = e({ entityType: a.entityType }) + ke.generateLocal({ unique: a.unique });
    return {
      id: a == null ? void 0 : a.unique,
      entityType: a == null ? void 0 : a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: m`<a href=${n}>${(s = a.pageData) == null ? void 0 : s.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = a.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "statusCode",
          value: m`<content-audit-status-code-label .statusCode=${(i = a.pageData) == null ? void 0 : i.statusCode}></content-audit-status-code-label>`
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
Ze([
  d()
], V.prototype, "_tableConfig", 2);
Ze([
  d()
], V.prototype, "_tableColumns", 2);
Ze([
  d()
], V.prototype, "_tableItems", 2);
V = Ze([
  C("content-audit-status-codes-table-collection-view")
], V);
const Lo = V, ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return V;
  },
  default: Lo
}, Symbol.toStringTag, { value: "Module" })), Pa = "Umb.Workspace.ContentAudit.StatusCodes", No = [
  {
    type: "workspace",
    kind: "default",
    alias: Pa,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: vn,
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
      collectionAlias: jt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Pa
      }
    ]
  }
], Do = [
  {
    type: "repository",
    alias: gn,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository.js")
  }
], Ro = [
  {
    type: "collectionView",
    alias: $o,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => ko),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: jt
      }
    ]
  }
], Wo = [
  {
    type: "collection",
    kind: "default",
    alias: jt,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element.js"),
    meta: {
      repositoryAlias: gn
    }
  },
  ...Do,
  ...Ro
], Vo = [
  ...No,
  ...So,
  ...Wo
], $n = "orphaned-pages-root", xo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: $n,
    menus: [Xe]
  }
}, Mo = [xo], qt = "Umb.Collection.ContentAudit.OrphanedPages", jo = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", Pn = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var Bo = Object.defineProperty, zo = Object.getOwnPropertyDescriptor, Un = (t) => {
  throw TypeError(t);
}, tt = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? zo(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && Bo(e, a, s), s;
}, Yt = (t, e, a) => e.has(t) || Un("Cannot " + a), $t = (t, e, a) => (Yt(t, e, "read from private field"), e.get(t)), yt = (t, e, a) => e.has(t) ? Un("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Ln = (t, e, a, n) => (Yt(t, e, "write to private field"), e.set(t, a), a), Ht = (t, e, a) => (Yt(t, e, "access private method"), a), fe, at, ye, kn, Nn, Dn;
let x = class extends P {
  constructor() {
    super(), yt(this, ye), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], yt(this, fe), yt(this, at), this.consumeContext(N, (t) => {
      Ln(this, fe, t);
    }), Ht(this, ye, kn).call(this);
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
fe = /* @__PURE__ */ new WeakMap();
at = /* @__PURE__ */ new WeakMap();
ye = /* @__PURE__ */ new WeakSet();
kn = function() {
  new Ne(this, Le).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ln(this, at, t), Ht(this, ye, Nn).call(this);
  });
};
Nn = function() {
  $t(this, fe) && this.observe($t(this, fe).items, (t) => Ht(this, ye, Dn).call(this, t), "umbCollectionItemsObserver");
};
Dn = function(t) {
  const e = $t(this, at);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const n = e({ entityType: "document" }) + ke.generateLocal({ unique: a.unique });
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
tt([
  d()
], x.prototype, "_tableConfig", 2);
tt([
  d()
], x.prototype, "_tableColumns", 2);
tt([
  d()
], x.prototype, "_tableItems", 2);
x = tt([
  C("content-audit-orphaned-pages-table-collection-view")
], x);
const qo = x, Yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return x;
  },
  default: qo
}, Symbol.toStringTag, { value: "Module" })), Ua = "Umb.Workspace.ContentAudit.OrphanedPages", Ho = [
  {
    type: "workspace",
    kind: "default",
    alias: Ua,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: $n,
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
      collectionAlias: qt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ua
      }
    ]
  }
], Ko = [
  {
    type: "repository",
    alias: Pn,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository.js")
  }
], Go = [
  {
    type: "collectionView",
    alias: jo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Yo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: qt
      }
    ]
  }
], Fo = [
  {
    type: "collection",
    kind: "default",
    alias: qt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element.js"),
    meta: {
      repositoryAlias: Pn
    }
  },
  ...Ko,
  ...Go
], Xo = [
  ...Ho,
  ...Mo,
  ...Fo
], Rn = "images-alt-text-root", Jo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: Rn,
    menus: [Xe]
  }
}, Qo = [Jo], Kt = "Umb.Collection.ContentAudit.ImagesAltText", Zo = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", Wn = "Umb.Repository.ContentAuditImagesAltTextCollection";
var el = Object.defineProperty, tl = Object.getOwnPropertyDescriptor, Vn = (t) => {
  throw TypeError(t);
}, nt = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? tl(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && el(e, a, s), s;
}, Gt = (t, e, a) => e.has(t) || Vn("Cannot " + a), Pt = (t, e, a) => (Gt(t, e, "read from private field"), e.get(t)), At = (t, e, a) => e.has(t) ? Vn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), xn = (t, e, a, n) => (Gt(t, e, "write to private field"), e.set(t, a), a), Ft = (t, e, a) => (Gt(t, e, "access private method"), a), Ae, st, Te, Mn, jn, Bn;
let M = class extends P {
  constructor() {
    super(), At(this, Te), this._tableConfig = {
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
    ], this._tableItems = [], At(this, Ae), At(this, st), this.consumeContext(N, (t) => {
      xn(this, Ae, t);
    }), Ft(this, Te, Mn).call(this);
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
Ae = /* @__PURE__ */ new WeakMap();
st = /* @__PURE__ */ new WeakMap();
Te = /* @__PURE__ */ new WeakSet();
Mn = function() {
  new Ne(this, Le).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    xn(this, st, t), Ft(this, Te, jn).call(this);
  });
};
jn = function() {
  Pt(this, Ae) && this.observe(Pt(this, Ae).items, (t) => Ft(this, Te, Bn).call(this, t), "umbCollectionItemsObserver");
};
Bn = function(t) {
  const e = Pt(this, st);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const n = e({ entityType: "document" }) + ke.generateLocal({ unique: a.unique });
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
nt([
  d()
], M.prototype, "_tableConfig", 2);
nt([
  d()
], M.prototype, "_tableColumns", 2);
nt([
  d()
], M.prototype, "_tableItems", 2);
M = nt([
  C("content-audit-images-alt-text-table-collection-view")
], M);
const al = M, nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return M;
  },
  default: al
}, Symbol.toStringTag, { value: "Module" })), La = "Umb.Workspace.ContentAudit.ImagesAltText", sl = [
  {
    type: "workspace",
    kind: "default",
    alias: La,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: Rn,
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
      collectionAlias: Kt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: La
      }
    ]
  }
], il = [
  {
    type: "repository",
    alias: Wn,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository.js")
  }
], ol = [
  {
    type: "collectionView",
    alias: Zo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => nl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: Kt
      }
    ]
  }
], ll = [
  {
    type: "collection",
    kind: "default",
    alias: Kt,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element.js"),
    meta: {
      repositoryAlias: Wn
    }
  },
  ...il,
  ...ol
], rl = [
  ...sl,
  ...Qo,
  ...ll
], zn = "outbound-links-root", cl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: zn,
    menus: [K]
  }
}, ul = [cl], Xt = "Umb.Collection.ContentAudit.OutboundLinks", ml = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", qn = "Umb.Repository.ContentAuditOutboundLinksCollection";
var dl = Object.defineProperty, pl = Object.getOwnPropertyDescriptor, Yn = (t) => {
  throw TypeError(t);
}, it = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? pl(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && dl(e, a, s), s;
}, Jt = (t, e, a) => e.has(t) || Yn("Cannot " + a), ka = (t, e, a) => (Jt(t, e, "read from private field"), e.get(t)), Na = (t, e, a) => e.has(t) ? Yn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), hl = (t, e, a, n) => (Jt(t, e, "write to private field"), e.set(t, a), a), Hn = (t, e, a) => (Jt(t, e, "access private method"), a), ve, Ke, Kn, Gn;
let j = class extends P {
  constructor() {
    super(), Na(this, Ke), this._tableConfig = {
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
    ], this._tableItems = [], Na(this, ve), this.consumeContext(N, (t) => {
      hl(this, ve, t), Hn(this, Ke, Kn).call(this);
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
ve = /* @__PURE__ */ new WeakMap();
Ke = /* @__PURE__ */ new WeakSet();
Kn = function() {
  ka(this, ve) && this.observe(ka(this, ve).items, (t) => Hn(this, Ke, Gn).call(this, t), "umbCollectionItemsObserver");
};
Gn = function(t) {
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
it([
  d()
], j.prototype, "_tableConfig", 2);
it([
  d()
], j.prototype, "_tableColumns", 2);
it([
  d()
], j.prototype, "_tableItems", 2);
j = it([
  C("content-audit-outbound-links-table-collection-view")
], j);
const _l = j, bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return j;
  },
  default: _l
}, Symbol.toStringTag, { value: "Module" })), Da = "Umb.Workspace.ContentAudit.OutboundLinks", Cl = [
  {
    type: "workspace",
    kind: "default",
    alias: Da,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: zn,
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
      collectionAlias: Xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Da
      }
    ]
  }
], fl = [
  {
    type: "repository",
    alias: qn,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository.js")
  }
], yl = [
  {
    type: "collectionView",
    alias: ml,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => bl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: Xt
      }
    ]
  }
], Al = [
  {
    type: "collection",
    kind: "default",
    alias: Xt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element.js"),
    meta: {
      repositoryAlias: qn
    }
  },
  ...fl,
  ...yl
], Tl = [
  ...Cl,
  ...ul,
  ...Al
], Fn = "inbound-links-root", vl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Fn,
    menus: [K]
  }
}, gl = [vl], Qt = "Umb.Collection.ContentAudit.InboundLinks", wl = "Umb.CollectionView.ContentAudit.InboundLinks.Table", Xn = "Umb.Repository.ContentAuditInboundLinksCollection";
var Il = Object.defineProperty, Ol = Object.getOwnPropertyDescriptor, Jn = (t) => {
  throw TypeError(t);
}, ot = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Ol(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && Il(e, a, s), s;
}, Zt = (t, e, a) => e.has(t) || Jn("Cannot " + a), Ra = (t, e, a) => (Zt(t, e, "read from private field"), e.get(t)), Wa = (t, e, a) => e.has(t) ? Jn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), El = (t, e, a, n) => (Zt(t, e, "write to private field"), e.set(t, a), a), Qn = (t, e, a) => (Zt(t, e, "access private method"), a), ge, Ge, Zn, es;
let B = class extends P {
  constructor() {
    super(), Wa(this, Ge), this._tableConfig = {
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
    ], this._tableItems = [], Wa(this, ge), this.consumeContext(N, (t) => {
      El(this, ge, t), Qn(this, Ge, Zn).call(this);
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
Ge = /* @__PURE__ */ new WeakSet();
Zn = function() {
  Ra(this, ge) && this.observe(Ra(this, ge).items, (t) => Qn(this, Ge, es).call(this, t), "umbCollectionItemsObserver");
};
es = function(t) {
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
ot([
  d()
], B.prototype, "_tableConfig", 2);
ot([
  d()
], B.prototype, "_tableColumns", 2);
ot([
  d()
], B.prototype, "_tableItems", 2);
B = ot([
  C("content-audit-inbound-links-table-collection-view")
], B);
const Sl = B, $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return B;
  },
  default: Sl
}, Symbol.toStringTag, { value: "Module" })), Va = "Umb.Workspace.ContentAudit.InboundLinks", Pl = [
  {
    type: "workspace",
    kind: "default",
    alias: Va,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: Fn,
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
      collectionAlias: Qt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Va
      }
    ]
  }
], Ul = [
  {
    type: "repository",
    alias: Xn,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository.js")
  }
], Ll = [
  {
    type: "collectionView",
    alias: wl,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => $l),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: Qt
      }
    ]
  }
], kl = [
  {
    type: "collection",
    kind: "default",
    alias: Qt,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element.js"),
    meta: {
      repositoryAlias: Xn
    }
  },
  ...Ul,
  ...Ll
], Nl = [
  ...Pl,
  ...gl,
  ...kl
], ts = "metadata-root", Dl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: ts,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, Rl = [Dl], ea = "Umb.Collection.ContentAudit.Metadata", Wl = "Umb.CollectionView.ContentAudit.Metadata.Table", xa = "Umb.Workspace.ContentAudit.Metadata", Vl = [
  {
    type: "workspace",
    kind: "default",
    alias: xa,
    name: "Metadata Root Workspace",
    meta: {
      entityType: ts,
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
      collectionAlias: ea
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: xa
      }
    ]
  }
], as = "Umb.Repository.ContentAuditMetadataCollection", xl = [
  {
    type: "repository",
    alias: as,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository.js")
  }
], Ml = [
  {
    type: "collectionView",
    alias: Wl,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: ea
      }
    ]
  }
], jl = [
  {
    type: "collection",
    kind: "default",
    alias: ea,
    name: "Metadata Collection",
    element: () => import("./metadata.element.js"),
    meta: {
      repositoryAlias: as
    }
  },
  ...xl,
  ...Ml
], Bl = [
  ...Vl,
  ...Rl,
  ...jl
], zl = [], ta = "Umb.Collection.ContentAudit.DuplicateContent", ql = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", ns = "Umb.Repository.ContentAuditDuplicateContentCollection";
var Yl = Object.defineProperty, Hl = Object.getOwnPropertyDescriptor, lt = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Hl(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && Yl(e, a, s), s;
};
let z = class extends P {
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
  C("content-audit-duplicate-content-table-collection-view")
], z);
const Kl = z, Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return z;
  },
  default: Kl
}, Symbol.toStringTag, { value: "Module" })), Fl = "duplicate-content-root", Ma = "Umb.Workspace.ContentAudit.DuplicateContent", Xl = [
  {
    type: "workspace",
    kind: "default",
    alias: Ma,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: Fl,
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
      collectionAlias: ta
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ma
      }
    ]
  }
], Jl = [
  {
    type: "repository",
    alias: ns,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository.js")
  }
], Ql = [
  {
    type: "collectionView",
    alias: ql,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => Gl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: ta
      }
    ]
  }
], Zl = [
  {
    type: "collection",
    kind: "default",
    alias: ta,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element.js"),
    meta: {
      repositoryAlias: ns
    }
  },
  ...Jl,
  ...Ql
], er = [
  ...Xl,
  ...zl,
  ...Zl
], ss = "carbon-rating-root", tr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: ss,
    menus: [Je]
  }
}, ar = [tr], aa = "Umb.Collection.ContentAudit.CarbonRating", nr = "Umb.CollectionView.ContentAudit.CarbonRating.Table", is = "Umb.Repository.ContentAuditCarbonRatingCollection";
var sr = Object.defineProperty, ir = Object.getOwnPropertyDescriptor, os = (t) => {
  throw TypeError(t);
}, rt = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? ir(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && sr(e, a, s), s;
}, na = (t, e, a) => e.has(t) || os("Cannot " + a), Ut = (t, e, a) => (na(t, e, "read from private field"), e.get(t)), Tt = (t, e, a) => e.has(t) ? os("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), ls = (t, e, a, n) => (na(t, e, "write to private field"), e.set(t, a), a), sa = (t, e, a) => (na(t, e, "access private method"), a), we, ct, Ie, rs, cs, us;
let q = class extends P {
  constructor() {
    super(), Tt(this, Ie), this._tableConfig = {
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
    ], this._tableItems = [], Tt(this, we), Tt(this, ct), this.consumeContext(N, (t) => {
      ls(this, we, t);
    }), sa(this, Ie, rs).call(this);
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
ct = /* @__PURE__ */ new WeakMap();
Ie = /* @__PURE__ */ new WeakSet();
rs = function() {
  new Ne(this, Le).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    ls(this, ct, t), sa(this, Ie, cs).call(this);
  });
};
cs = function() {
  Ut(this, we) && this.observe(Ut(this, we).items, (t) => sa(this, Ie, us).call(this, t), "umbCollectionItemsObserver");
};
us = function(t) {
  const e = Ut(this, ct);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    var s, o, i;
    const n = e({ entityType: a.entityType }) + ke.generateLocal({ unique: a.unique });
    return {
      id: a == null ? void 0 : a.unique,
      entityType: a == null ? void 0 : a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: m`<a href=${n}>${(s = a.pageData) == null ? void 0 : s.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = a.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "pageSize",
          value: m`${Math.round(((i = a.performanceData) == null ? void 0 : i.totalBytes) / 1024)}KB`
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
rt([
  d()
], q.prototype, "_tableConfig", 2);
rt([
  d()
], q.prototype, "_tableColumns", 2);
rt([
  d()
], q.prototype, "_tableItems", 2);
q = rt([
  C("content-audit-carbon-rating-table-collection-view")
], q);
const or = q, lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return q;
  },
  default: or
}, Symbol.toStringTag, { value: "Module" })), ja = "Umb.Workspace.ContentAudit.CarbonRating", rr = [
  {
    type: "workspace",
    kind: "default",
    alias: ja,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: ss,
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
      collectionAlias: aa
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ja
      }
    ]
  }
], cr = [
  {
    type: "repository",
    alias: is,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository.js")
  }
], ur = [
  {
    type: "collectionView",
    alias: nr,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => lr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: aa
      }
    ]
  }
], mr = [
  {
    type: "collection",
    kind: "default",
    alias: aa,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element.js"),
    meta: {
      repositoryAlias: is
    }
  },
  ...cr,
  ...ur
], dr = [
  ...rr,
  ...ar,
  ...mr
], ms = "core-web-vitals-root", pr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: ms,
    menus: [Je]
  }
}, hr = [pr], ia = "Umb.Collection.ContentAudit.CoreWebVitals", _r = "Umb.CollectionView.ContentAudit.CoreWebVitals.Table", ds = "Umb.Repository.ContentAuditCoreWebVitalsCollection";
var br = Object.defineProperty, Cr = Object.getOwnPropertyDescriptor, ps = (t) => {
  throw TypeError(t);
}, ut = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? Cr(e, a) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (s = (n ? i(e, a, s) : i(s)) || s);
  return n && s && br(e, a, s), s;
}, oa = (t, e, a) => e.has(t) || ps("Cannot " + a), Lt = (t, e, a) => (oa(t, e, "read from private field"), e.get(t)), vt = (t, e, a) => e.has(t) ? ps("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), hs = (t, e, a, n) => (oa(t, e, "write to private field"), e.set(t, a), a), la = (t, e, a) => (oa(t, e, "access private method"), a), Oe, mt, Ee, _s, bs, Cs;
let Y = class extends P {
  constructor() {
    super(), vt(this, Ee), this._tableConfig = {
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
    ], this._tableItems = [], vt(this, Oe), vt(this, mt), this.consumeContext(N, (t) => {
      hs(this, Oe, t);
    }), la(this, Ee, _s).call(this);
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
Oe = /* @__PURE__ */ new WeakMap();
mt = /* @__PURE__ */ new WeakMap();
Ee = /* @__PURE__ */ new WeakSet();
_s = function() {
  new Ne(this, Le).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    hs(this, mt, t), la(this, Ee, bs).call(this);
  });
};
bs = function() {
  Lt(this, Oe) && this.observe(Lt(this, Oe).items, (t) => la(this, Ee, Cs).call(this, t), "umbCollectionItemsObserver");
};
Cs = function(t) {
  const e = Lt(this, mt);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.filter((a) => a.pageData.statusCode === 200).map((a) => {
    var s;
    const n = e({ entityType: a.entityType }) + ke.generateLocal({ unique: a.unique });
    return {
      id: a == null ? void 0 : a.unique,
      entityType: a == null ? void 0 : a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: m`<a href=${n}>${(s = a.pageData) == null ? void 0 : s.url}</a>`
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
ut([
  d()
], Y.prototype, "_tableConfig", 2);
ut([
  d()
], Y.prototype, "_tableColumns", 2);
ut([
  d()
], Y.prototype, "_tableItems", 2);
Y = ut([
  C("content-audit-core-web-vitals-table-collection-view")
], Y);
const fr = Y, yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return Y;
  },
  default: fr
}, Symbol.toStringTag, { value: "Module" })), Ba = "Umb.Workspace.ContentAudit.CoreWebVitals", Ar = [
  {
    type: "workspace",
    kind: "default",
    alias: Ba,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: ms,
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
      collectionAlias: ia
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ba
      }
    ]
  }
], Tr = [
  {
    type: "repository",
    alias: ds,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository.js")
  }
], vr = [
  {
    type: "collectionView",
    alias: _r,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => yr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: ia
      }
    ]
  }
], gr = [
  {
    type: "collection",
    kind: "default",
    alias: ia,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element.js"),
    meta: {
      repositoryAlias: ds
    }
  },
  ...Tr,
  ...vr
], wr = [
  ...Ar,
  ...hr,
  ...gr
], fs = "export-root", Ir = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: fs,
    menus: [Nt]
  }
}, Or = [Ir], Er = "Umb.Workspace.ContentAudit.Export", Sr = [
  {
    type: "workspace",
    kind: "default",
    alias: Er,
    name: "Export Root Workspace",
    element: () => import("./export.element.js"),
    meta: {
      entityType: fs,
      headline: "Export"
    }
  }
], $r = [
  ...Sr,
  ...Or
], ae = "Umb.Section.ContentAudit", Pr = {
  type: "section",
  alias: ae,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Ur = {
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
}, Lr = [
  {
    type: "menu",
    alias: K,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: Xe,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: Je,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: Nt,
    name: "Tools Menu"
  }
], kr = [
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
      menu: Xe
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
    alias: "Umb.SidebarMenu.ContentTools",
    name: "Content Tools Sidebar Menu",
    meta: {
      label: "Tools",
      menu: Nt
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: ae
      }
    ]
  }
], Nr = [
  Pr,
  Ur,
  ...Lr,
  ...kr,
  ...Ki,
  ...po,
  ...Oo,
  ...Vo,
  ...Xo,
  ...rl,
  ...Tl,
  ...Nl,
  ...Bl,
  ...er,
  ...dr,
  ...wr,
  ...$r
], Dr = {
  type: "workspace",
  alias: ze,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Ii),
  meta: {
    entityType: nn
  }
}, Rr = [
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
        match: ze
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
        match: ze
      }
    ]
  }
], Wr = [
  Dr,
  ...Rr
], Vr = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element.js")
  }
], xr = [
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
], Mr = {
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
}, jr = [Mr], Br = {
  type: "globalContext",
  alias: oi,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => ui)
}, cc = async (t, e) => {
  e.registerMany([
    Br,
    ...Nr,
    ...Wr,
    ...Vr,
    ...xr,
    ...jr
  ]), t.consumeContext(gs, async (a) => {
    if (!a) return;
    const n = a.getOpenApiConfiguration();
    _.setConfig({
      baseUrl: (n == null ? void 0 : n.base) ?? "",
      auth: (n == null ? void 0 : n.token) ?? void 0,
      credentials: (n == null ? void 0 : n.credentials) ?? "same-origin"
    }), _.interceptors.request.use(async (s, o) => {
      const i = await n.token();
      return s.headers.set("Authorization", `Bearer ${i}`), s;
    });
  });
};
export {
  We as A,
  Je as B,
  sn as C,
  Nt as D,
  Dt as E,
  Oi as F,
  rn as G,
  Ta as H,
  tn as I,
  Ei as J,
  O as K,
  ic as U,
  sc as a,
  Bi as b,
  hn as c,
  Ct as d,
  Z as e,
  ln as f,
  $a as g,
  Me as h,
  je as i,
  gt as j,
  wt as k,
  Be as l,
  oc as m,
  lc as n,
  cc as o,
  $s as p,
  Ps as q,
  Ot as r,
  qe as s,
  mi as t,
  Et as u,
  ze as v,
  oi as w,
  nn as x,
  K as y,
  Xe as z
};
//# sourceMappingURL=index.js.map
