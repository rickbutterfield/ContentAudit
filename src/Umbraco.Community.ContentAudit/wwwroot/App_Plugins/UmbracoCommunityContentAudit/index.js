var un = (t) => {
  throw TypeError(t);
};
var dn = (t, e, n) => e.has(t) || un("Cannot " + n);
var m = (t, e, n) => (dn(t, e, "read from private field"), n ? n.call(t) : e.get(t)), T = (t, e, n) => e.has(t) ? un("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), g = (t, e, n, s) => (dn(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
import { UMB_AUTH_CONTEXT as _s } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as ie } from "@umbraco-cms/backoffice/element-api";
import { LitElement as K, html as u, css as y, property as X, customElement as C, nothing as xn, state as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as jn } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as bs } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as Cs, UMB_WORKSPACE_CONDITION_ALIAS as Q, UMB_WORKSPACE_MODAL as Ue } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as ce, tryExecuteAndNotify as fs } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as dt, UmbArrayState as mn } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as ys } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as L, UMB_COLLECTION_ALIAS_CONDITION as w } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as $ } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as As } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as Le } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Ne } from "@umbraco-cms/backoffice/router";
const Ts = [
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
], gs = [
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
var Is = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, Bn = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? vs(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Is(e, n, a), a;
};
let We = class extends ie(K) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Ts[this.type - 1];
      return u`
                <uui-tag color=${t == null ? void 0 : t.color}>
                    <uui-icon name="${t == null ? void 0 : t.icon}"></uui-icon>
                    ${t == null ? void 0 : t.label}
                </uui-tag>
            `;
    }
  }
};
We.styles = [
  y`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Bn([
  X({ attribute: !1 })
], We.prototype, "type", 2);
We = Bn([
  C("content-audit-issue-type-label")
], We);
var ws = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, zn = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Os(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && ws(e, n, a), a;
};
let Me = class extends ie(K) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = gs[this.type - 1];
      return u`
                <uui-tag color=${t == null ? void 0 : t.color}>
                    <uui-icon name="${t == null ? void 0 : t.icon}"></uui-icon>
                    ${t == null ? void 0 : t.label}
                </uui-tag>
            `;
    }
  }
};
Me.styles = [
  y`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
zn([
  X({ attribute: !1 })
], Me.prototype, "type", 2);
Me = zn([
  C("content-audit-priority-type-label")
], Me);
var Es = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, qn = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? $s(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Es(e, n, a), a;
};
let yt = class extends ie(K) {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? u`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : xn;
  }
};
qn([
  X({ attribute: !1 })
], yt.prototype, "statusCode", 2);
yt = qn([
  C("content-audit-status-code-label")
], yt);
var Ss = Object.defineProperty, Ps = Object.getOwnPropertyDescriptor, Yn = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Ps(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Ss(e, n, a), a;
};
let At = class extends ie(K) {
  constructor() {
    super(...arguments), this.value = "";
  }
  _getColour() {
    return this.value == "E" || this.value == "F" ? "danger" : this.value == "D" ? "warning" : "positive";
  }
  render() {
    if (this.value != null)
      return u`
                <uui-tag .color=${this._getColour()}>
                    ${this.value}
                </uui-tag>
            `;
  }
};
Yn([
  X({ attribute: !0 })
], At.prototype, "value", 2);
At = Yn([
  C("content-audit-carbon-intensity-label")
], At);
var Hn = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(Hn || {}), Tt = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(Tt || {});
const Us = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, n) => typeof n == "bigint" ? n.toString() : n
  )
}, Ls = ({
  onRequest: t,
  onSseError: e,
  onSseEvent: n,
  responseTransformer: s,
  responseValidator: a,
  sseDefaultRetryDelay: o,
  sseMaxRetryAttempts: i,
  sseMaxRetryDelay: l,
  sseSleepFn: c,
  url: h,
  ...r
}) => {
  let b;
  const oe = c ?? ((p) => new Promise((A) => setTimeout(A, p)));
  return { stream: async function* () {
    let p = o ?? 3e3, A = 0;
    const H = r.signal ?? new AbortController().signal;
    for (; !H.aborted; ) {
      A++;
      const le = r.headers instanceof Headers ? r.headers : new Headers(r.headers);
      b !== void 0 && le.set("Last-Event-ID", b);
      try {
        const G = {
          redirect: "follow",
          ...r,
          body: r.serializedBody,
          headers: le,
          signal: H
        };
        let O = new Request(h, G);
        t && (O = await t(h, G));
        const I = await (r.fetch ?? globalThis.fetch)(O);
        if (!I.ok)
          throw new Error(
            `SSE failed: ${I.status} ${I.statusText}`
          );
        if (!I.body) throw new Error("No body in SSE response");
        const E = I.body.pipeThrough(new TextDecoderStream()).getReader();
        let ut = "";
        const sn = () => {
          try {
            E.cancel();
          } catch {
          }
        };
        H.addEventListener("abort", sn);
        try {
          for (; ; ) {
            const { done: ds, value: ms } = await E.read();
            if (ds) break;
            ut += ms;
            const on = ut.split(`

`);
            ut = on.pop() ?? "";
            for (const ps of on) {
              const hs = ps.split(`
`), Re = [];
              let ln;
              for (const v of hs)
                if (v.startsWith("data:"))
                  Re.push(v.replace(/^data:\s*/, ""));
                else if (v.startsWith("event:"))
                  ln = v.replace(/^event:\s*/, "");
                else if (v.startsWith("id:"))
                  b = v.replace(/^id:\s*/, "");
                else if (v.startsWith("retry:")) {
                  const cn = Number.parseInt(
                    v.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(cn) || (p = cn);
                }
              let F, rn = !1;
              if (Re.length) {
                const v = Re.join(`
`);
                try {
                  F = JSON.parse(v), rn = !0;
                } catch {
                  F = v;
                }
              }
              rn && (a && await a(F), s && (F = await s(F))), n == null || n({
                data: F,
                event: ln,
                id: b,
                retry: p
              }), Re.length && (yield F);
            }
          }
        } finally {
          H.removeEventListener("abort", sn), E.releaseLock();
        }
        break;
      } catch (G) {
        if (e == null || e(G), i !== void 0 && A >= i)
          break;
        const O = Math.min(
          p * 2 ** (A - 1),
          l ?? 3e4
        );
        await oe(O);
      }
    }
  }() };
}, Ns = (t) => {
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
}, ks = (t) => {
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
}, Ds = (t) => {
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
}, Gn = ({
  allowReserved: t,
  explode: e,
  name: n,
  style: s,
  value: a
}) => {
  if (!e) {
    const l = (t ? a : a.map((c) => encodeURIComponent(c))).join(ks(s));
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
  const o = Ns(s), i = a.map((l) => s === "label" || s === "simple" ? t ? l : encodeURIComponent(l) : Ge({
    allowReserved: t,
    name: n,
    value: l
  })).join(o);
  return s === "label" || s === "matrix" ? o + i : i;
}, Ge = ({
  allowReserved: t,
  name: e,
  value: n
}) => {
  if (n == null)
    return "";
  if (typeof n == "object")
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these."
    );
  return `${e}=${t ? n : encodeURIComponent(n)}`;
}, Fn = ({
  allowReserved: t,
  explode: e,
  name: n,
  style: s,
  value: a,
  valueOnly: o
}) => {
  if (a instanceof Date)
    return o ? a.toISOString() : `${n}=${a.toISOString()}`;
  if (s !== "deepObject" && !e) {
    let c = [];
    Object.entries(a).forEach(([r, b]) => {
      c = [
        ...c,
        r,
        t ? b : encodeURIComponent(b)
      ];
    });
    const h = c.join(",");
    switch (s) {
      case "form":
        return `${n}=${h}`;
      case "label":
        return `.${h}`;
      case "matrix":
        return `;${n}=${h}`;
      default:
        return h;
    }
  }
  const i = Ds(s), l = Object.entries(a).map(
    ([c, h]) => Ge({
      allowReserved: t,
      name: s === "deepObject" ? `${n}[${c}]` : c,
      value: h
    })
  ).join(i);
  return s === "label" || s === "matrix" ? i + l : l;
}, Rs = /\{[^{}]+\}/g, Vs = ({ path: t, url: e }) => {
  let n = e;
  const s = e.match(Rs);
  if (s)
    for (const a of s) {
      let o = !1, i = a.substring(1, a.length - 1), l = "simple";
      i.endsWith("*") && (o = !0, i = i.substring(0, i.length - 1)), i.startsWith(".") ? (i = i.substring(1), l = "label") : i.startsWith(";") && (i = i.substring(1), l = "matrix");
      const c = t[i];
      if (c == null)
        continue;
      if (Array.isArray(c)) {
        n = n.replace(
          a,
          Gn({ explode: o, name: i, style: l, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        n = n.replace(
          a,
          Fn({
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
        n = n.replace(
          a,
          `;${Ge({
            name: i,
            value: c
          })}`
        );
        continue;
      }
      const h = encodeURIComponent(
        l === "label" ? `.${c}` : c
      );
      n = n.replace(a, h);
    }
  return n;
}, Ws = ({
  baseUrl: t,
  path: e,
  query: n,
  querySerializer: s,
  url: a
}) => {
  const o = a.startsWith("/") ? a : `/${a}`;
  let i = (t ?? "") + o;
  e && (i = Vs({ path: e, url: i }));
  let l = n ? s(n) : "";
  return l.startsWith("?") && (l = l.substring(1)), l && (i += `?${l}`), i;
};
function Ms(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const xs = async (t, e) => {
  const n = typeof e == "function" ? await e(t) : e;
  if (n)
    return t.scheme === "bearer" ? `Bearer ${n}` : t.scheme === "basic" ? `Basic ${btoa(n)}` : n;
}, Kn = ({
  allowReserved: t,
  array: e,
  object: n
} = {}) => (a) => {
  const o = [];
  if (a && typeof a == "object")
    for (const i in a) {
      const l = a[i];
      if (l != null)
        if (Array.isArray(l)) {
          const c = Gn({
            allowReserved: t,
            explode: !0,
            name: i,
            style: "form",
            value: l,
            ...e
          });
          c && o.push(c);
        } else if (typeof l == "object") {
          const c = Fn({
            allowReserved: t,
            explode: !0,
            name: i,
            style: "deepObject",
            value: l,
            ...n
          });
          c && o.push(c);
        } else {
          const c = Ge({
            allowReserved: t,
            name: i,
            value: l
          });
          c && o.push(c);
        }
    }
  return o.join("&");
}, js = (t) => {
  var n;
  if (!t)
    return "stream";
  const e = (n = t.split(";")[0]) == null ? void 0 : n.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json"))
      return "json";
    if (e === "multipart/form-data")
      return "formData";
    if (["application/", "audio/", "image/", "video/"].some(
      (s) => e.startsWith(s)
    ))
      return "blob";
    if (e.startsWith("text/"))
      return "text";
  }
}, Bs = (t, e) => {
  var n, s;
  return e ? !!(t.headers.has(e) || (n = t.query) != null && n[e] || (s = t.headers.get("Cookie")) != null && s.includes(`${e}=`)) : !1;
}, zs = async ({
  security: t,
  ...e
}) => {
  for (const n of t) {
    if (Bs(e, n.name))
      continue;
    const s = await xs(n, e.auth);
    if (!s)
      continue;
    const a = n.name ?? "Authorization";
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
  }
}, pn = (t) => Ws({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : Kn(t.querySerializer),
  url: t.url
}), hn = (t, e) => {
  var s;
  const n = { ...t, ...e };
  return (s = n.baseUrl) != null && s.endsWith("/") && (n.baseUrl = n.baseUrl.substring(0, n.baseUrl.length - 1)), n.headers = Xn(t.headers, e.headers), n;
}, qs = (t) => {
  const e = [];
  return t.forEach((n, s) => {
    e.push([s, n]);
  }), e;
}, Xn = (...t) => {
  const e = new Headers();
  for (const n of t) {
    if (!n)
      continue;
    const s = n instanceof Headers ? qs(n) : Object.entries(n);
    for (const [a, o] of s)
      if (o === null)
        e.delete(a);
      else if (Array.isArray(o))
        for (const i of o)
          e.append(a, i);
      else o !== void 0 && e.set(
        a,
        typeof o == "object" ? JSON.stringify(o) : o
      );
  }
  return e;
};
class mt {
  constructor() {
    this.fns = [];
  }
  clear() {
    this.fns = [];
  }
  eject(e) {
    const n = this.getInterceptorIndex(e);
    this.fns[n] && (this.fns[n] = null);
  }
  exists(e) {
    const n = this.getInterceptorIndex(e);
    return !!this.fns[n];
  }
  getInterceptorIndex(e) {
    return typeof e == "number" ? this.fns[e] ? e : -1 : this.fns.indexOf(e);
  }
  update(e, n) {
    const s = this.getInterceptorIndex(e);
    return this.fns[s] ? (this.fns[s] = n, e) : !1;
  }
  use(e) {
    return this.fns.push(e), this.fns.length - 1;
  }
}
const Ys = () => ({
  error: new mt(),
  request: new mt(),
  response: new mt()
}), Hs = Kn({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), Gs = {
  "Content-Type": "application/json"
}, Jn = (t = {}) => ({
  ...Us,
  headers: Gs,
  parseAs: "auto",
  querySerializer: Hs,
  ...t
}), Fs = (t = {}) => {
  let e = hn(Jn(), t);
  const n = () => ({ ...e }), s = (h) => (e = hn(e, h), n()), a = Ys(), o = async (h) => {
    const r = {
      ...e,
      ...h,
      fetch: h.fetch ?? e.fetch ?? globalThis.fetch,
      headers: Xn(e.headers, h.headers),
      serializedBody: void 0
    };
    r.security && await zs({
      ...r,
      security: r.security
    }), r.requestValidator && await r.requestValidator(r), r.body !== void 0 && r.bodySerializer && (r.serializedBody = r.bodySerializer(r.body)), (r.body === void 0 || r.serializedBody === "") && r.headers.delete("Content-Type");
    const b = pn(r);
    return { opts: r, url: b };
  }, i = async (h) => {
    const { opts: r, url: b } = await o(h), oe = {
      redirect: "follow",
      ...r,
      body: Ms(r)
    };
    let S = new Request(b, oe);
    for (const f of a.request.fns)
      f && (S = await f(S, r));
    const De = r.fetch;
    let p = await De(S);
    for (const f of a.response.fns)
      f && (p = await f(p, S, r));
    const A = {
      request: S,
      response: p
    };
    if (p.ok) {
      const f = (r.parseAs === "auto" ? js(p.headers.get("Content-Type")) : r.parseAs) ?? "json";
      if (p.status === 204 || p.headers.get("Content-Length") === "0") {
        let E;
        switch (f) {
          case "arrayBuffer":
          case "blob":
          case "text":
            E = await p[f]();
            break;
          case "formData":
            E = new FormData();
            break;
          case "stream":
            E = p.body;
            break;
          case "json":
          default:
            E = {};
            break;
        }
        return r.responseStyle === "data" ? E : {
          data: E,
          ...A
        };
      }
      let I;
      switch (f) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          I = await p[f]();
          break;
        case "stream":
          return r.responseStyle === "data" ? p.body : {
            data: p.body,
            ...A
          };
      }
      return f === "json" && (r.responseValidator && await r.responseValidator(I), r.responseTransformer && (I = await r.responseTransformer(I))), r.responseStyle === "data" ? I : {
        data: I,
        ...A
      };
    }
    const H = await p.text();
    let le;
    try {
      le = JSON.parse(H);
    } catch {
    }
    const G = le ?? H;
    let O = G;
    for (const f of a.error.fns)
      f && (O = await f(G, p, S, r));
    if (O = O || {}, r.throwOnError)
      throw O;
    return r.responseStyle === "data" ? void 0 : {
      error: O,
      ...A
    };
  }, l = (h) => (r) => i({ ...r, method: h }), c = (h) => async (r) => {
    const { opts: b, url: oe } = await o(r);
    return Ls({
      ...b,
      body: b.body,
      headers: b.headers,
      method: h,
      onRequest: async (S, De) => {
        let p = new Request(S, De);
        for (const A of a.request.fns)
          A && (p = await A(p, b));
        return p;
      },
      url: oe
    });
  };
  return {
    buildUrl: pn,
    connect: l("CONNECT"),
    delete: l("DELETE"),
    get: l("GET"),
    getConfig: n,
    head: l("HEAD"),
    interceptors: a,
    options: l("OPTIONS"),
    patch: l("PATCH"),
    post: l("POST"),
    put: l("PUT"),
    request: i,
    setConfig: s,
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
}, _ = Fs(Jn({
  baseUrl: "http://localhost:26291",
  throwOnError: !0
}));
class ue {
  static getAllImages(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/all-images",
      ...e
    });
  }
  static getAllIssues(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/all-issues",
      ...e
    });
  }
  static getDuplicateContentUrls(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/duplicate-content",
      ...e
    });
  }
  static getExportData(e) {
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
  static getInteralLinks(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/internal-links",
      ...e
    });
  }
  static getIssue(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/issue",
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
  static getLatestPageAuditData(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit/latest-page-data",
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
class qr {
  static startCrawl(e) {
    return ((e == null ? void 0 : e.client) ?? _).sse.get({
      url: "/umbraco/content-audit/management/api/v1/crawl",
      ...e
    });
  }
}
class Ks {
  static getSettings(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/settings",
      ...e
    });
  }
}
var Xs = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, Qn = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Js(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Xs(e, n, a), a;
};
let xe = class extends ie(K) {
  _getColour() {
    return this.value != null ? this.value.rating == Tt.POOR ? "danger" : this.value.rating == Tt.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == Hn.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
  }
  render() {
    if (this.value != null)
      return u`
                <uui-tag .color=${this._getColour()}>
                    ${this._formatValue()}
                </uui-tag>
            `;
  }
};
xe.styles = [
  y`
            uui-tag {
                font-size: 14px;
            }
        `
];
Qn([
  X({ attribute: !1 })
], xe.prototype, "value", 2);
xe = Qn([
  C("content-audit-metric-label")
], xe);
class Yr extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class Hr extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class Gr extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const je = "Umb.Workspace.ContentAudit", Qs = "Umb.Context.ContentAudit", Zn = "content-audit";
var N;
class Zs {
  constructor(e) {
    T(this, N);
    g(this, N, e);
  }
  async getLatestAuditOverview() {
    return await ce(m(this, N), ue.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await ce(m(this, N), ue.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await ce(m(this, N), ue.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await ce(m(this, N), ue.getHealthScore());
  }
}
N = new WeakMap();
var Ee;
class ei {
  constructor(e) {
    T(this, Ee);
    g(this, Ee, e);
  }
  async getSettings() {
    return await fs(m(this, Ee), Ks.getSettings());
  }
}
Ee = new WeakMap();
var k, $e;
class ti extends jn {
  constructor(n) {
    super(n);
    T(this, k);
    T(this, $e);
    g(this, k, new Zs(this)), g(this, $e, new ei(this));
  }
  async getLatestAuditOverview() {
    return m(this, k).getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return m(this, k).getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return m(this, k).getTopIssues();
  }
  async getHealthScore() {
    return m(this, k).getHealthScore();
  }
  async getSettings() {
    return m(this, $e).getSettings();
  }
}
k = new WeakMap(), $e = new WeakMap();
var P, ee, te, ne, ae, se;
class gt extends jn {
  constructor(n) {
    super(n);
    T(this, P);
    T(this, ee);
    T(this, te);
    T(this, ne);
    T(this, ae);
    T(this, se);
    this.workspaceAlias = je, g(this, ee, new dt(void 0)), this.latestAuditOverview = m(this, ee).asObservable(), g(this, te, new mn([], (s) => s.unique)), this.pagesWithMissingMetadata = m(this, te).asObservable(), g(this, ne, new mn([], (s) => s.name)), this.topIssues = m(this, ne).asObservable(), g(this, ae, new dt(void 0)), this.healthScore = m(this, ae).asObservable(), g(this, se, new dt(void 0)), this.settings = m(this, se).asObservable(), this.provideContext(Cs, this), this.provideContext(ea, this), g(this, P, new ti(this));
  }
  getEntityType() {
    return Zn;
  }
  async getLatestAuditOverview() {
    const { data: n } = await m(this, P).getLatestAuditOverview();
    n && m(this, ee).setValue(n);
  }
  async getPagesWithMissingMetadata() {
    const { data: n } = await m(this, P).getPagesWithMissingMetadata();
    n && m(this, te).setValue(n.items);
  }
  async getTopIssues() {
    const { data: n } = await m(this, P).getTopIssues();
    n && m(this, ne).setValue(n.items);
  }
  async getHealthScore() {
    const { data: n } = await m(this, P).getHealthScore();
    n && m(this, ae).setValue(n);
  }
  async getSettings() {
    const { data: n } = await m(this, P).getSettings();
    n && m(this, se).setValue(n);
  }
}
P = new WeakMap(), ee = new WeakMap(), te = new WeakMap(), ne = new WeakMap(), ae = new WeakMap(), se = new WeakMap();
const ea = new bs(
  "ContentAuditContext"
), ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: ea,
  ContentAuditContext: gt,
  default: gt
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ai = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = globalThis, Pt = Ve.ShadowRoot && (Ve.ShadyCSS === void 0 || Ve.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ta = Symbol(), _n = /* @__PURE__ */ new WeakMap();
let si = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== ta) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (Pt && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = _n.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && _n.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ii = (t) => new si(typeof t == "string" ? t : t + "", void 0, ta), oi = (t, e) => {
  if (Pt) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), a = Ve.litNonce;
    a !== void 0 && s.setAttribute("nonce", a), s.textContent = n.cssText, t.appendChild(s);
  }
}, bn = Pt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return ii(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: li, defineProperty: ri, getOwnPropertyDescriptor: ci, getOwnPropertyNames: ui, getOwnPropertySymbols: di, getPrototypeOf: mi } = Object, D = globalThis, Cn = D.trustedTypes, pi = Cn ? Cn.emptyScript : "", pt = D.reactiveElementPolyfillSupport, de = (t, e) => t, It = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? pi : null;
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
} }, na = (t, e) => !li(t, e), fn = { attribute: !0, type: String, converter: It, reflect: !1, useDefault: !1, hasChanged: na };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), D.litPropertyMetadata ?? (D.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class re extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = fn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), a = this.getPropertyDescriptor(e, s, n);
      a !== void 0 && ri(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: a, set: o } = ci(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? fn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(de("elementProperties"))) return;
    const e = mi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(de("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(de("properties"))) {
      const n = this.properties, s = [...ui(n), ...di(n)];
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
      for (const a of s) n.unshift(bn(a));
    } else e !== void 0 && n.push(bn(e));
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
    return oi(e, this.constructor.elementStyles), e;
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
      const i = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : It).toAttribute(n, s.type);
      this._$Em = e, i == null ? this.removeAttribute(a) : this.setAttribute(a, i), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var o, i;
    const s = this.constructor, a = s._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const l = s.getPropertyOptions(a), c = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : It;
      this._$Em = a, this[a] = c.fromAttribute(n, l.type) ?? ((i = this._$Ej) == null ? void 0 : i.get(a)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, n, s) {
    var a;
    if (e !== void 0) {
      const o = this.constructor, i = this[e];
      if (s ?? (s = o.getPropertyOptions(e)), !((s.hasChanged ?? na)(i, n) || s.useDefault && s.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, s)))) return;
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
        const { wrapped: l } = i, c = this[o];
        l !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, i, c);
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
re.elementStyles = [], re.shadowRootOptions = { mode: "open" }, re[de("elementProperties")] = /* @__PURE__ */ new Map(), re[de("finalized")] = /* @__PURE__ */ new Map(), pt == null || pt({ ReactiveElement: re }), (D.reactiveElementVersions ?? (D.reactiveElementVersions = [])).push("2.1.0");
var hi = Object.getOwnPropertyDescriptor, _i = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? hi(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = i(a) || a);
  return a;
};
let Be = class extends ie(K) {
  constructor() {
    super(), this._workspaceContext = new gt(this);
  }
  render() {
    return u`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Be = _i([
  ai("content-audit-workspace-root")
], Be);
const bi = Be, Ci = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Be;
  },
  default: bi
}, Symbol.toStringTag, { value: "Module" })), Y = "Umb.Menu.ContentAudit", Fe = "Umb.Menu.ContentMetadata", Ke = "Umb.Menu.ContentPerformance", Ut = "Umb.Menu.ContentTools", Lt = "Umb.Collection.ContentAudit.Issues", fi = "Umb.CollectionView.ContentAudit.Issues.Table", aa = "Umb.Repository.ContentAuditIssuesCollection";
var Se;
class yi {
  constructor(e) {
    T(this, Se);
    g(this, Se, e);
  }
  async getCollection(e) {
    const { data: n, error: s } = await ce(m(this, Se), ue.getAllIssues({ query: e }));
    if (s)
      return { error: s };
    if (!n)
      return { data: { items: [], total: 0 } };
    const { items: a, total: o } = n;
    return { data: { items: a, total: o } };
  }
}
Se = new WeakMap();
var Pe;
class yn extends ys {
  constructor(n) {
    super(n);
    T(this, Pe);
    g(this, Pe, new yi(n));
  }
  async requestCollection(n) {
    return m(this, Pe).getCollection(n);
  }
}
Pe = new WeakMap();
const Ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: yn,
  default: yn
}, Symbol.toStringTag, { value: "Module" }));
var Ti = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, sa = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? gi(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Ti(e, n, a), a;
};
let ze = class extends K {
  render() {
    return this.value ? u`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : xn;
  }
};
ze.styles = [
  As,
  y`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
sa([
  X({ attribute: !1 })
], ze.prototype, "value", 2);
ze = sa([
  C("content-audit-issues-table-name-column-layout")
], ze);
var Ii = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, ia = (t) => {
  throw TypeError(t);
}, ke = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? vi(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Ii(e, n, a), a;
}, Nt = (t, e, n) => e.has(t) || ia("Cannot " + n), An = (t, e, n) => (Nt(t, e, "read from private field"), e.get(t)), Tn = (t, e, n) => e.has(t) ? ia("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), wi = (t, e, n, s) => (Nt(t, e, "write to private field"), e.set(t, n), n), vt = (t, e, n) => (Nt(t, e, "access private method"), n), pe, me, oa, kt;
let U = class extends $ {
  constructor() {
    super(), Tn(this, me), this.data = [], this._tableConfig = {
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
    ], this._tableItems = [], Tn(this, pe), this.consumeContext(L, (t) => {
      wi(this, pe, t), vt(this, me, oa).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && vt(this, me, kt).call(this, this.data);
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
pe = /* @__PURE__ */ new WeakMap();
me = /* @__PURE__ */ new WeakSet();
oa = function() {
  An(this, pe) && this.observe(An(this, pe).items, (t) => vt(this, me, kt).call(this, t), "umbCollectionItemsObserver");
};
kt = function(t) {
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
        value: u`<content-audit-issue-type-label .type=${e.type}></content-audit-issue-type-label`
      },
      {
        columnAlias: "priority",
        value: u`<content-audit-priority-type-label .type=${e.priority}></content-audit-priority-type-label>`
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
U.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ke([
  X({ type: Array, attribute: !1 })
], U.prototype, "data", 2);
ke([
  d()
], U.prototype, "_tableConfig", 2);
ke([
  d()
], U.prototype, "_tableColumns", 2);
ke([
  d()
], U.prototype, "_tableItems", 2);
U = ke([
  C("content-audit-issues-table-collection-view")
], U);
const Oi = U, Ei = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return U;
  },
  default: Oi
}, Symbol.toStringTag, { value: "Module" })), $i = {
  type: "menuItem",
  kind: "tree",
  alias: "Umb.MenuItem.ContentAudit.Audits",
  name: "Audits Menu Item",
  weight: 1e4,
  meta: {
    label: "Audits",
    icon: "icon-browser-window",
    treeAlias: "Umb.Tree.ContentAudit.Audits",
    menus: [Y]
  }
}, Si = [$i], Pi = "audits", Ui = "audits-root", Li = [
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
    forEntityTypes: [Pi, Ui]
  }
], Ni = [
  ...Si,
  ...Li
], la = "all-pages-root", ki = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: la,
    menus: [Y]
  }
}, Di = [ki], gn = "Umb.Workspace.ContentAudit.AllPagesRoot", J = "Umb.Workspace.ContentAudit.AllPages", Ri = [
  {
    type: "workspace",
    kind: "routable",
    alias: J,
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
        alias: Q,
        match: J
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
        alias: Q,
        match: J
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
        alias: Q,
        match: J
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
        alias: Q,
        match: J
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
        alias: Q,
        match: J
      }
    ]
  }
], Dt = "Umb.Collection.ContentAudit.AllPages", Vi = "Umb.CollectionView.ContentAudit.AllPages.Table", ra = "Umb.Repository.ContentAuditAllPagesCollection";
var Wi = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, ca = (t) => {
  throw TypeError(t);
}, Xe = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Mi(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Wi(e, n, a), a;
}, Rt = (t, e, n) => e.has(t) || ca("Cannot " + n), In = (t, e, n) => (Rt(t, e, "read from private field"), e.get(t)), vn = (t, e, n) => e.has(t) ? ca("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), xi = (t, e, n, s) => (Rt(t, e, "write to private field"), e.set(t, n), n), ua = (t, e, n) => (Rt(t, e, "access private method"), n), he, qe, da, ma;
let R = class extends $ {
  constructor() {
    super(), vn(this, qe), this._tableConfig = {
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
    ], this._tableItems = [], vn(this, he), this.consumeContext(L, (t) => {
      xi(this, he, t), ua(this, qe, da).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
he = /* @__PURE__ */ new WeakMap();
qe = /* @__PURE__ */ new WeakSet();
da = function() {
  In(this, he) && this.observe(In(this, he).items, (t) => ua(this, qe, ma).call(this, t), "umbCollectionItemsObserver");
};
ma = function(t) {
  this._tableItems = t.map((e) => {
    var n, s, a;
    return {
      id: e == null ? void 0 : e.unique,
      entityType: e == null ? void 0 : e.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: u`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${(n = e.pageData) == null ? void 0 : n.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (s = e.technicalSeoData) == null ? void 0 : s.contentType
        },
        {
          columnAlias: "statusCode",
          value: u`<content-audit-status-code-label .statusCode=${(a = e.pageData) == null ? void 0 : a.statusCode}></content-audit-status-code-label>`
        },
        {
          columnAlias: "redirect",
          value: e.pageData.redirect ? "Yes" : "No"
        }
      ]
    };
  });
};
R.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Xe([
  d()
], R.prototype, "_tableConfig", 2);
Xe([
  d()
], R.prototype, "_tableColumns", 2);
Xe([
  d()
], R.prototype, "_tableItems", 2);
R = Xe([
  C("content-audit-all-pages-table-collection-view")
], R);
const ji = R, Bi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return R;
  },
  default: ji
}, Symbol.toStringTag, { value: "Module" })), zi = [
  {
    type: "workspace",
    kind: "default",
    alias: gn,
    name: "All Pages Root Workspace",
    meta: {
      entityType: la,
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
      collectionAlias: Dt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: gn
      }
    ]
  }
], qi = [...Ri, ...zi], Yi = [
  {
    type: "repository",
    alias: ra,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository.js")
  }
], Hi = [
  {
    type: "collectionView",
    alias: Vi,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => Bi),
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
], Gi = [
  {
    type: "collection",
    kind: "default",
    alias: Dt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element.js"),
    meta: {
      repositoryAlias: ra
    }
  },
  ...Yi,
  ...Hi
], Fi = "Umb.Repository.ContentAudit.AllPages.Detail", Ki = "Umb.Store.ContentAudit.AllPages.Detail", Xi = [
  {
    type: "repository",
    alias: Fi,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository.js")
  },
  {
    type: "store",
    alias: Ki,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store.js")
  }
], Ji = [...Xi], Qi = [
  ...qi,
  ...Di,
  ...Gi,
  ...Ji
], pa = "issues-root", Zi = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: pa,
    menus: [Y]
  }
}, eo = [Zi], wn = "Umb.Workspace.ContentAudit.IssuesRoot", On = "Umb.Workspace.ContentAudit.Issues", to = [
  {
    type: "workspace",
    kind: "routable",
    alias: On,
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
        alias: Q,
        match: On
      }
    ]
  }
], no = [
  {
    type: "workspace",
    kind: "default",
    alias: wn,
    name: "Issues Root Workspace",
    meta: {
      entityType: pa,
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
      collectionAlias: Lt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: wn
      }
    ]
  }
], ao = [...to, ...no], so = [
  {
    type: "repository",
    alias: aa,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => Ai)
  }
], io = [
  {
    type: "collectionView",
    alias: fi,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => Ei),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: Lt
      }
    ]
  }
], oo = [
  {
    type: "collection",
    kind: "default",
    alias: Lt,
    name: "Issues Collection",
    element: () => import("./issues.element.js"),
    meta: {
      repositoryAlias: aa
    }
  },
  ...so,
  ...io
], lo = "Umb.Repository.ContentAudit.Issues.Detail", ro = "Umb.Store.ContentAudit.Issues.Detail", co = [
  {
    type: "repository",
    alias: lo,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository.js")
  },
  {
    type: "store",
    alias: ro,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store.js")
  }
], uo = [...co], mo = [
  ...ao,
  ...eo,
  ...oo,
  ...uo
], ha = "status-codes-root", po = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: ha,
    menus: [Y]
  }
}, ho = [po], Vt = "Umb.Collection.ContentAudit.StatusCodes", _o = "Umb.CollectionView.ContentAudit.StatusCodes.Table", _a = "Umb.Repository.ContentAuditStatusCodesCollection";
var bo = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, ba = (t) => {
  throw TypeError(t);
}, Je = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Co(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && bo(e, n, a), a;
}, Wt = (t, e, n) => e.has(t) || ba("Cannot " + n), wt = (t, e, n) => (Wt(t, e, "read from private field"), e.get(t)), ht = (t, e, n) => e.has(t) ? ba("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ca = (t, e, n, s) => (Wt(t, e, "write to private field"), e.set(t, n), n), Mt = (t, e, n) => (Wt(t, e, "access private method"), n), _e, Qe, be, fa, ya, Aa;
let V = class extends $ {
  constructor() {
    super(), ht(this, be), this._tableConfig = {
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
    ], this._tableItems = [], ht(this, _e), ht(this, Qe), this.consumeContext(L, (t) => {
      Ca(this, _e, t);
    }), Mt(this, be, fa).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
_e = /* @__PURE__ */ new WeakMap();
Qe = /* @__PURE__ */ new WeakMap();
be = /* @__PURE__ */ new WeakSet();
fa = function() {
  new Ne(this, Ue).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ca(this, Qe, t), Mt(this, be, ya).call(this);
  });
};
ya = function() {
  wt(this, _e) && this.observe(wt(this, _e).items, (t) => Mt(this, be, Aa).call(this, t), "umbCollectionItemsObserver");
};
Aa = function(t) {
  const e = wt(this, Qe);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    var a, o, i;
    const s = e({ entityType: n.entityType }) + Le.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: u`<a href=${s}>${(a = n.pageData) == null ? void 0 : a.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = n.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "statusCode",
          value: u`<content-audit-status-code-label .statusCode=${(i = n.pageData) == null ? void 0 : i.statusCode}></content-audit-status-code-label>`
        }
      ]
    };
  });
};
V.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Je([
  d()
], V.prototype, "_tableConfig", 2);
Je([
  d()
], V.prototype, "_tableColumns", 2);
Je([
  d()
], V.prototype, "_tableItems", 2);
V = Je([
  C("content-audit-status-codes-table-collection-view")
], V);
const fo = V, yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return V;
  },
  default: fo
}, Symbol.toStringTag, { value: "Module" })), En = "Umb.Workspace.ContentAudit.StatusCodes", Ao = [
  {
    type: "workspace",
    kind: "default",
    alias: En,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: ha,
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
      collectionAlias: Vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: En
      }
    ]
  }
], To = [
  {
    type: "repository",
    alias: _a,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository.js")
  }
], go = [
  {
    type: "collectionView",
    alias: _o,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => yo),
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
], Io = [
  {
    type: "collection",
    kind: "default",
    alias: Vt,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element.js"),
    meta: {
      repositoryAlias: _a
    }
  },
  ...To,
  ...go
], vo = [
  ...Ao,
  ...ho,
  ...Io
], Ta = "orphaned-pages-root", wo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: Ta,
    menus: [Fe]
  }
}, Oo = [wo], xt = "Umb.Collection.ContentAudit.OrphanedPages", Eo = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", ga = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var $o = Object.defineProperty, So = Object.getOwnPropertyDescriptor, Ia = (t) => {
  throw TypeError(t);
}, Ze = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? So(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && $o(e, n, a), a;
}, jt = (t, e, n) => e.has(t) || Ia("Cannot " + n), Ot = (t, e, n) => (jt(t, e, "read from private field"), e.get(t)), _t = (t, e, n) => e.has(t) ? Ia("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), va = (t, e, n, s) => (jt(t, e, "write to private field"), e.set(t, n), n), Bt = (t, e, n) => (jt(t, e, "access private method"), n), Ce, et, fe, wa, Oa, Ea;
let W = class extends $ {
  constructor() {
    super(), _t(this, fe), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], _t(this, Ce), _t(this, et), this.consumeContext(L, (t) => {
      va(this, Ce, t);
    }), Bt(this, fe, wa).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
Ce = /* @__PURE__ */ new WeakMap();
et = /* @__PURE__ */ new WeakMap();
fe = /* @__PURE__ */ new WeakSet();
wa = function() {
  new Ne(this, Ue).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    va(this, et, t), Bt(this, fe, Oa).call(this);
  });
};
Oa = function() {
  Ot(this, Ce) && this.observe(Ot(this, Ce).items, (t) => Bt(this, fe, Ea).call(this, t), "umbCollectionItemsObserver");
};
Ea = function(t) {
  const e = Ot(this, et);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    const s = e({ entityType: "document" }) + Le.generateLocal({ unique: n.unique });
    return {
      id: n.unique,
      entityType: n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: u`<a href=${s}>${n.url}</a>`
        }
      ]
    };
  });
};
W.styles = [
  y`
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
  C("content-audit-orphaned-pages-table-collection-view")
], W);
const Po = W, Uo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return W;
  },
  default: Po
}, Symbol.toStringTag, { value: "Module" })), $n = "Umb.Workspace.ContentAudit.OrphanedPages", Lo = [
  {
    type: "workspace",
    kind: "default",
    alias: $n,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: Ta,
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
      collectionAlias: xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: $n
      }
    ]
  }
], No = [
  {
    type: "repository",
    alias: ga,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository.js")
  }
], ko = [
  {
    type: "collectionView",
    alias: Eo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Uo),
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
], Do = [
  {
    type: "collection",
    kind: "default",
    alias: xt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element.js"),
    meta: {
      repositoryAlias: ga
    }
  },
  ...No,
  ...ko
], Ro = [
  ...Lo,
  ...Oo,
  ...Do
], $a = "images-alt-text-root", Vo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: $a,
    menus: [Fe]
  }
}, Wo = [Vo], zt = "Umb.Collection.ContentAudit.ImagesAltText", Mo = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", Sa = "Umb.Repository.ContentAuditImagesAltTextCollection";
var xo = Object.defineProperty, jo = Object.getOwnPropertyDescriptor, Pa = (t) => {
  throw TypeError(t);
}, tt = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? jo(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && xo(e, n, a), a;
}, qt = (t, e, n) => e.has(t) || Pa("Cannot " + n), Et = (t, e, n) => (qt(t, e, "read from private field"), e.get(t)), bt = (t, e, n) => e.has(t) ? Pa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Ua = (t, e, n, s) => (qt(t, e, "write to private field"), e.set(t, n), n), Yt = (t, e, n) => (qt(t, e, "access private method"), n), ye, nt, Ae, La, Na, ka;
let M = class extends $ {
  constructor() {
    super(), bt(this, Ae), this._tableConfig = {
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
    ], this._tableItems = [], bt(this, ye), bt(this, nt), this.consumeContext(L, (t) => {
      Ua(this, ye, t);
    }), Yt(this, Ae, La).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
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
La = function() {
  new Ne(this, Ue).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ua(this, nt, t), Yt(this, Ae, Na).call(this);
  });
};
Na = function() {
  Et(this, ye) && this.observe(Et(this, ye).items, (t) => Yt(this, Ae, ka).call(this, t), "umbCollectionItemsObserver");
};
ka = function(t) {
  const e = Et(this, nt);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    const s = e({ entityType: "document" }) + Le.generateLocal({ unique: n.unique });
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
          value: u`<a href=${s}>${n.foundPage}</a>`
        },
        {
          columnAlias: "altText",
          value: n.altText
        }
      ]
    };
  });
};
M.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
tt([
  d()
], M.prototype, "_tableConfig", 2);
tt([
  d()
], M.prototype, "_tableColumns", 2);
tt([
  d()
], M.prototype, "_tableItems", 2);
M = tt([
  C("content-audit-images-alt-text-table-collection-view")
], M);
const Bo = M, zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return M;
  },
  default: Bo
}, Symbol.toStringTag, { value: "Module" })), Sn = "Umb.Workspace.ContentAudit.ImagesAltText", qo = [
  {
    type: "workspace",
    kind: "default",
    alias: Sn,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: $a,
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
      collectionAlias: zt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Sn
      }
    ]
  }
], Yo = [
  {
    type: "repository",
    alias: Sa,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository.js")
  }
], Ho = [
  {
    type: "collectionView",
    alias: Mo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => zo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: zt
      }
    ]
  }
], Go = [
  {
    type: "collection",
    kind: "default",
    alias: zt,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element.js"),
    meta: {
      repositoryAlias: Sa
    }
  },
  ...Yo,
  ...Ho
], Fo = [
  ...qo,
  ...Wo,
  ...Go
], Da = "outbound-links-root", Ko = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: Da,
    menus: [Y]
  }
}, Xo = [Ko], Ht = "Umb.Collection.ContentAudit.OutboundLinks", Jo = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", Ra = "Umb.Repository.ContentAuditOutboundLinksCollection";
var Qo = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, Va = (t) => {
  throw TypeError(t);
}, at = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Zo(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Qo(e, n, a), a;
}, Gt = (t, e, n) => e.has(t) || Va("Cannot " + n), Pn = (t, e, n) => (Gt(t, e, "read from private field"), e.get(t)), Un = (t, e, n) => e.has(t) ? Va("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), el = (t, e, n, s) => (Gt(t, e, "write to private field"), e.set(t, n), n), Wa = (t, e, n) => (Gt(t, e, "access private method"), n), Te, Ye, Ma, xa;
let x = class extends $ {
  constructor() {
    super(), Un(this, Ye), this._tableConfig = {
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
    ], this._tableItems = [], Un(this, Te), this.consumeContext(L, (t) => {
      el(this, Te, t), Wa(this, Ye, Ma).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
Te = /* @__PURE__ */ new WeakMap();
Ye = /* @__PURE__ */ new WeakSet();
Ma = function() {
  Pn(this, Te) && this.observe(Pn(this, Te).items, (t) => Wa(this, Ye, xa).call(this, t), "umbCollectionItemsObserver");
};
xa = function(t) {
  this._tableItems = t.map((e) => {
    var n;
    return {
      id: e.unique,
      data: [
        {
          columnAlias: "url",
          value: u`<a href="${e.url}" target="_blank">${e.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: u`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
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
x.styles = [
  y`
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
  C("content-audit-outbound-links-table-collection-view")
], x);
const tl = x, nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return x;
  },
  default: tl
}, Symbol.toStringTag, { value: "Module" })), Ln = "Umb.Workspace.ContentAudit.OutboundLinks", al = [
  {
    type: "workspace",
    kind: "default",
    alias: Ln,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: Da,
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
      collectionAlias: Ht
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ln
      }
    ]
  }
], sl = [
  {
    type: "repository",
    alias: Ra,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository.js")
  }
], il = [
  {
    type: "collectionView",
    alias: Jo,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => nl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: Ht
      }
    ]
  }
], ol = [
  {
    type: "collection",
    kind: "default",
    alias: Ht,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element.js"),
    meta: {
      repositoryAlias: Ra
    }
  },
  ...sl,
  ...il
], ll = [
  ...al,
  ...Xo,
  ...ol
], ja = "inbound-links-root", rl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: ja,
    menus: [Y]
  }
}, cl = [rl], Ft = "Umb.Collection.ContentAudit.InboundLinks", ul = "Umb.CollectionView.ContentAudit.InboundLinks.Table", Ba = "Umb.Repository.ContentAuditInboundLinksCollection";
var dl = Object.defineProperty, ml = Object.getOwnPropertyDescriptor, za = (t) => {
  throw TypeError(t);
}, st = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? ml(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && dl(e, n, a), a;
}, Kt = (t, e, n) => e.has(t) || za("Cannot " + n), Nn = (t, e, n) => (Kt(t, e, "read from private field"), e.get(t)), kn = (t, e, n) => e.has(t) ? za("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), pl = (t, e, n, s) => (Kt(t, e, "write to private field"), e.set(t, n), n), qa = (t, e, n) => (Kt(t, e, "access private method"), n), ge, He, Ya, Ha;
let j = class extends $ {
  constructor() {
    super(), kn(this, He), this._tableConfig = {
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
    ], this._tableItems = [], kn(this, ge), this.consumeContext(L, (t) => {
      pl(this, ge, t), qa(this, He, Ya).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ge = /* @__PURE__ */ new WeakMap();
He = /* @__PURE__ */ new WeakSet();
Ya = function() {
  Nn(this, ge) && this.observe(Nn(this, ge).items, (t) => qa(this, He, Ha).call(this, t), "umbCollectionItemsObserver");
};
Ha = function(t) {
  this._tableItems = t.map((e) => {
    var n;
    return {
      id: e.unique,
      data: [
        {
          columnAlias: "url",
          value: u`<a href="${e.url}" target="_blank">${e.url}</a>`
        },
        {
          columnAlias: "statusCode",
          value: u`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
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
j.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
st([
  d()
], j.prototype, "_tableConfig", 2);
st([
  d()
], j.prototype, "_tableColumns", 2);
st([
  d()
], j.prototype, "_tableItems", 2);
j = st([
  C("content-audit-inbound-links-table-collection-view")
], j);
const hl = j, _l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return j;
  },
  default: hl
}, Symbol.toStringTag, { value: "Module" })), Dn = "Umb.Workspace.ContentAudit.InboundLinks", bl = [
  {
    type: "workspace",
    kind: "default",
    alias: Dn,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: ja,
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
      collectionAlias: Ft
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Dn
      }
    ]
  }
], Cl = [
  {
    type: "repository",
    alias: Ba,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository.js")
  }
], fl = [
  {
    type: "collectionView",
    alias: ul,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => _l),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: Ft
      }
    ]
  }
], yl = [
  {
    type: "collection",
    kind: "default",
    alias: Ft,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element.js"),
    meta: {
      repositoryAlias: Ba
    }
  },
  ...Cl,
  ...fl
], Al = [
  ...bl,
  ...cl,
  ...yl
], Ga = "metadata-root", Tl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: Ga,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, gl = [Tl], Xt = "Umb.Collection.ContentAudit.Metadata", Il = "Umb.CollectionView.ContentAudit.Metadata.Table", Rn = "Umb.Workspace.ContentAudit.Metadata", vl = [
  {
    type: "workspace",
    kind: "default",
    alias: Rn,
    name: "Metadata Root Workspace",
    meta: {
      entityType: Ga,
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
      collectionAlias: Xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Rn
      }
    ]
  }
], Fa = "Umb.Repository.ContentAuditMetadataCollection", wl = [
  {
    type: "repository",
    alias: Fa,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository.js")
  }
], Ol = [
  {
    type: "collectionView",
    alias: Il,
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
        match: Xt
      }
    ]
  }
], El = [
  {
    type: "collection",
    kind: "default",
    alias: Xt,
    name: "Metadata Collection",
    element: () => import("./metadata.element.js"),
    meta: {
      repositoryAlias: Fa
    }
  },
  ...wl,
  ...Ol
], $l = [
  ...vl,
  ...gl,
  ...El
], Sl = [], Jt = "Umb.Collection.ContentAudit.DuplicateContent", Pl = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", Ka = "Umb.Repository.ContentAuditDuplicateContentCollection";
var Ul = Object.defineProperty, Ll = Object.getOwnPropertyDescriptor, it = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Ll(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && Ul(e, n, a), a;
};
let B = class extends $ {
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
      return u`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
B.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
it([
  d()
], B.prototype, "_tableConfig", 2);
it([
  d()
], B.prototype, "_tableColumns", 2);
it([
  d()
], B.prototype, "_tableItems", 2);
B = it([
  C("content-audit-duplicate-content-table-collection-view")
], B);
const Nl = B, kl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return B;
  },
  default: Nl
}, Symbol.toStringTag, { value: "Module" })), Dl = "duplicate-content-root", Vn = "Umb.Workspace.ContentAudit.DuplicateContent", Rl = [
  {
    type: "workspace",
    kind: "default",
    alias: Vn,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: Dl,
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
      collectionAlias: Jt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Vn
      }
    ]
  }
], Vl = [
  {
    type: "repository",
    alias: Ka,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository.js")
  }
], Wl = [
  {
    type: "collectionView",
    alias: Pl,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => kl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: Jt
      }
    ]
  }
], Ml = [
  {
    type: "collection",
    kind: "default",
    alias: Jt,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element.js"),
    meta: {
      repositoryAlias: Ka
    }
  },
  ...Vl,
  ...Wl
], xl = [
  ...Rl,
  ...Sl,
  ...Ml
], Xa = "carbon-rating-root", jl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: Xa,
    menus: [Ke]
  }
}, Bl = [jl], Qt = "Umb.Collection.ContentAudit.CarbonRating", zl = "Umb.CollectionView.ContentAudit.CarbonRating.Table", Ja = "Umb.Repository.ContentAuditCarbonRatingCollection";
var ql = Object.defineProperty, Yl = Object.getOwnPropertyDescriptor, Qa = (t) => {
  throw TypeError(t);
}, ot = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? Yl(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && ql(e, n, a), a;
}, Zt = (t, e, n) => e.has(t) || Qa("Cannot " + n), $t = (t, e, n) => (Zt(t, e, "read from private field"), e.get(t)), Ct = (t, e, n) => e.has(t) ? Qa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Za = (t, e, n, s) => (Zt(t, e, "write to private field"), e.set(t, n), n), en = (t, e, n) => (Zt(t, e, "access private method"), n), Ie, lt, ve, es, ts, ns;
let z = class extends $ {
  constructor() {
    super(), Ct(this, ve), this._tableConfig = {
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
    ], this._tableItems = [], Ct(this, Ie), Ct(this, lt), this.consumeContext(L, (t) => {
      Za(this, Ie, t);
    }), en(this, ve, es).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
Ie = /* @__PURE__ */ new WeakMap();
lt = /* @__PURE__ */ new WeakMap();
ve = /* @__PURE__ */ new WeakSet();
es = function() {
  new Ne(this, Ue).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Za(this, lt, t), en(this, ve, ts).call(this);
  });
};
ts = function() {
  $t(this, Ie) && this.observe($t(this, Ie).items, (t) => en(this, ve, ns).call(this, t), "umbCollectionItemsObserver");
};
ns = function(t) {
  const e = $t(this, lt);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((n) => {
    var a, o, i;
    const s = e({ entityType: n.entityType }) + Le.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: u`<a href=${s}>${(a = n.pageData) == null ? void 0 : a.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: (o = n.technicalSeoData) == null ? void 0 : o.contentType
        },
        {
          columnAlias: "pageSize",
          value: u`${Math.round(((i = n.performanceData) == null ? void 0 : i.totalBytes) / 1024)}KB`
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
z.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ot([
  d()
], z.prototype, "_tableConfig", 2);
ot([
  d()
], z.prototype, "_tableColumns", 2);
ot([
  d()
], z.prototype, "_tableItems", 2);
z = ot([
  C("content-audit-carbon-rating-table-collection-view")
], z);
const Hl = z, Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return z;
  },
  default: Hl
}, Symbol.toStringTag, { value: "Module" })), Wn = "Umb.Workspace.ContentAudit.CarbonRating", Fl = [
  {
    type: "workspace",
    kind: "default",
    alias: Wn,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: Xa,
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
      collectionAlias: Qt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Wn
      }
    ]
  }
], Kl = [
  {
    type: "repository",
    alias: Ja,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository.js")
  }
], Xl = [
  {
    type: "collectionView",
    alias: zl,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => Gl),
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
], Jl = [
  {
    type: "collection",
    kind: "default",
    alias: Qt,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element.js"),
    meta: {
      repositoryAlias: Ja
    }
  },
  ...Kl,
  ...Xl
], Ql = [
  ...Fl,
  ...Bl,
  ...Jl
], as = "core-web-vitals-root", Zl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: as,
    menus: [Ke]
  }
}, er = [Zl], tn = "Umb.Collection.ContentAudit.CoreWebVitals", tr = "Umb.CollectionView.ContentAudit.CoreWebVitals.Table", ss = "Umb.Repository.ContentAuditCoreWebVitalsCollection";
var nr = Object.defineProperty, ar = Object.getOwnPropertyDescriptor, is = (t) => {
  throw TypeError(t);
}, rt = (t, e, n, s) => {
  for (var a = s > 1 ? void 0 : s ? ar(e, n) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (a = (s ? i(e, n, a) : i(a)) || a);
  return s && a && nr(e, n, a), a;
}, nn = (t, e, n) => e.has(t) || is("Cannot " + n), St = (t, e, n) => (nn(t, e, "read from private field"), e.get(t)), ft = (t, e, n) => e.has(t) ? is("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), os = (t, e, n, s) => (nn(t, e, "write to private field"), e.set(t, n), n), an = (t, e, n) => (nn(t, e, "access private method"), n), we, ct, Oe, ls, rs, cs;
let q = class extends $ {
  constructor() {
    super(), ft(this, Oe), this._tableConfig = {
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
    ], this._tableItems = [], ft(this, we), ft(this, ct), this.consumeContext(L, (t) => {
      os(this, we, t);
    }), an(this, Oe, ls).call(this);
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
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
Oe = /* @__PURE__ */ new WeakSet();
ls = function() {
  new Ne(this, Ue).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    os(this, ct, t), an(this, Oe, rs).call(this);
  });
};
rs = function() {
  St(this, we) && this.observe(St(this, we).items, (t) => an(this, Oe, cs).call(this, t), "umbCollectionItemsObserver");
};
cs = function(t) {
  const e = St(this, ct);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.filter((n) => n.pageData.statusCode === 200).map((n) => {
    var a;
    const s = e({ entityType: n.entityType }) + Le.generateLocal({ unique: n.unique });
    return {
      id: n == null ? void 0 : n.unique,
      entityType: n == null ? void 0 : n.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: u`<a href=${s}>${(a = n.pageData) == null ? void 0 : a.url}</a>`
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
q.styles = [
  y`
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
  C("content-audit-core-web-vitals-table-collection-view")
], q);
const sr = q, ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return q;
  },
  default: sr
}, Symbol.toStringTag, { value: "Module" })), Mn = "Umb.Workspace.ContentAudit.CoreWebVitals", or = [
  {
    type: "workspace",
    kind: "default",
    alias: Mn,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: as,
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
      collectionAlias: tn
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Mn
      }
    ]
  }
], lr = [
  {
    type: "repository",
    alias: ss,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository.js")
  }
], rr = [
  {
    type: "collectionView",
    alias: tr,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => ir),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: w,
        match: tn
      }
    ]
  }
], cr = [
  {
    type: "collection",
    kind: "default",
    alias: tn,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element.js"),
    meta: {
      repositoryAlias: ss
    }
  },
  ...lr,
  ...rr
], ur = [
  ...or,
  ...er,
  ...cr
], us = "export-root", dr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: us,
    menus: [Ut]
  }
}, mr = [dr], pr = "Umb.Workspace.ContentAudit.Export", hr = [
  {
    type: "workspace",
    kind: "default",
    alias: pr,
    name: "Export Root Workspace",
    element: () => import("./export.element.js"),
    meta: {
      entityType: us,
      headline: "Export"
    }
  }
], _r = [
  ...hr,
  ...mr
], Z = "Umb.Section.ContentAudit", br = {
  type: "section",
  alias: Z,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, Cr = {
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
      match: Z
    }
  ]
}, fr = [
  {
    type: "menu",
    alias: Y,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: Fe,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: Ke,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: Ut,
    name: "Tools Menu"
  }
], yr = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umb.SidebarMenu.ContentAudit",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: Y
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: Z
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
      menu: Fe
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: Z
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
      menu: Ke
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: Z
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
      menu: Ut
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: Z
      }
    ]
  }
], Ar = [
  br,
  Cr,
  ...fr,
  ...yr,
  ...Ni,
  ...Qi,
  ...mo,
  ...vo,
  ...Ro,
  ...Fo,
  ...ll,
  ...Al,
  ...$l,
  ...xl,
  ...Ql,
  ...ur,
  ..._r
], Tr = {
  type: "workspace",
  alias: je,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Ci),
  meta: {
    entityType: Zn
  }
}, gr = [
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
        match: je
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
        match: je
      }
    ]
  }
], Ir = [
  Tr,
  ...gr
], vr = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element.js")
  }
], wr = [
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
], Or = {
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
}, Er = [Or], $r = {
  type: "globalContext",
  alias: Qs,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => ni)
}, Kr = async (t, e) => {
  e.registerMany([
    $r,
    ...Ar,
    ...Ir,
    ...vr,
    ...wr,
    ...Er
  ]), t.consumeContext(_s, async (n) => {
    if (!n) return;
    const s = n.getOpenApiConfiguration();
    _.setConfig({
      auth: s.token,
      baseUrl: s.base,
      credentials: s.credentials
    }), _.interceptors.request.use(async (a, o) => {
      const i = await n.getLatestToken();
      return a.headers.set("Authorization", `Bearer ${i}`), a;
    });
  });
};
export {
  ue as A,
  Lt as B,
  ea as C,
  fi as D,
  aa as E,
  yn as F,
  yi as G,
  U as H,
  Ts as I,
  Yr as U,
  qr as a,
  Pi as b,
  Ui as c,
  J as d,
  On as e,
  na as f,
  We as g,
  Me as h,
  yt as i,
  At as j,
  xe as k,
  Hr as l,
  Gr as m,
  gs as n,
  Kr as o,
  gt as p,
  Be as q,
  je as r,
  Qs as s,
  ai as t,
  It as u,
  Zn as v,
  Y as w,
  Fe as x,
  Ke as y,
  Ut as z
};
//# sourceMappingURL=index.js.map
