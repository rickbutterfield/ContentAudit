var pa = (t) => {
  throw TypeError(t);
};
var ha = (t, e, a) => e.has(t) || pa("Cannot " + a);
var u = (t, e, a) => (ha(t, e, "read from private field"), a ? a.call(t) : e.get(t)), y = (t, e, a) => e.has(t) ? pa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), A = (t, e, a, n) => (ha(t, e, "write to private field"), n ? n.call(t, a) : e.set(t, a), a);
import { UMB_AUTH_CONTEXT as gi } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as ce } from "@umbraco-cms/backoffice/element-api";
import { LitElement as J, html as m, css as T, property as H, customElement as C, nothing as za, state as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as qa } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as wi } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as Ii, UMB_WORKSPACE_CONDITION_ALIAS as N, UMB_WORKSPACE_MODAL as Le } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as ee, tryExecuteAndNotify as Oi } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as ht, UmbArrayState as _t } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as Ei } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as D, UMB_COLLECTION_ALIAS_CONDITION as w } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Si } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as ke } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Ne } from "@umbraco-cms/backoffice/router";
const $i = [
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
], Pi = [
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
var Ui = Object.defineProperty, Li = Object.getOwnPropertyDescriptor, Ya = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Li(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Ui(e, a, i), i;
};
let je = class extends ce(J) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = $i[this.type - 1];
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
Ya([
  H({ attribute: !1 })
], je.prototype, "type", 2);
je = Ya([
  C("content-audit-issue-type-label")
], je);
var ki = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, Ha = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Ni(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && ki(e, a, i), i;
};
let Be = class extends ce(J) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Pi[this.type - 1];
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
Ha([
  H({ attribute: !1 })
], Be.prototype, "type", 2);
Be = Ha([
  C("content-audit-priority-type-label")
], Be);
var Di = Object.defineProperty, Ri = Object.getOwnPropertyDescriptor, Ka = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Ri(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Di(e, a, i), i;
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
var Vi = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, Ga = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Wi(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Vi(e, a, i), i;
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
const xi = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, a) => typeof a == "bigint" ? a.toString() : a
  )
}, Mi = ({
  onRequest: t,
  onSseError: e,
  onSseEvent: a,
  responseTransformer: n,
  responseValidator: i,
  sseDefaultRetryDelay: o,
  sseMaxRetryAttempts: s,
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
        let pt = "";
        const ra = () => {
          try {
            S.cancel();
          } catch {
          }
        };
        G.addEventListener("abort", ra);
        try {
          for (; ; ) {
            const { done: yi, value: Ai } = await S.read();
            if (yi) break;
            pt += Ai;
            const ca = pt.split(`

`);
            pt = ca.pop() ?? "";
            for (const Ti of ca) {
              const vi = Ti.split(`
`), Re = [];
              let ua;
              for (const I of vi)
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
              ma && (i && await i(X), n && (X = await n(X))), a == null || a({
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
        if (e == null || e(F), s !== void 0 && v >= s)
          break;
        const E = Math.min(
          p * 2 ** (v - 1),
          l ?? 3e4
        );
        await ue(E);
      }
    }
  }() };
}, ji = (t) => {
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
}, Bi = (t) => {
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
}, zi = (t) => {
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
  value: i
}) => {
  if (!e) {
    const l = (t ? i : i.map((c) => encodeURIComponent(c))).join(Bi(n));
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
  const o = ji(n), s = i.map((l) => n === "label" || n === "simple" ? t ? l : encodeURIComponent(l) : Xe({
    allowReserved: t,
    name: a,
    value: l
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
}, Ja = ({
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
    Object.entries(i).forEach(([r, b]) => {
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
  const s = zi(n), l = Object.entries(i).map(
    ([c, h]) => Xe({
      allowReserved: t,
      name: n === "deepObject" ? `${a}[${c}]` : c,
      value: h
    })
  ).join(s);
  return n === "label" || n === "matrix" ? s + l : l;
}, qi = /\{[^{}]+\}/g, Yi = ({ path: t, url: e }) => {
  let a = e;
  const n = e.match(qi);
  if (n)
    for (const i of n) {
      let o = !1, s = i.substring(1, i.length - 1), l = "simple";
      s.endsWith("*") && (o = !0, s = s.substring(0, s.length - 1)), s.startsWith(".") ? (s = s.substring(1), l = "label") : s.startsWith(";") && (s = s.substring(1), l = "matrix");
      const c = t[s];
      if (c == null)
        continue;
      if (Array.isArray(c)) {
        a = a.replace(
          i,
          Xa({ explode: o, name: s, style: l, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        a = a.replace(
          i,
          Ja({
            explode: o,
            name: s,
            style: l,
            value: c,
            valueOnly: !0
          })
        );
        continue;
      }
      if (l === "matrix") {
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
        l === "label" ? `.${c}` : c
      );
      a = a.replace(i, h);
    }
  return a;
}, Hi = ({
  baseUrl: t,
  path: e,
  query: a,
  querySerializer: n,
  url: i
}) => {
  const o = i.startsWith("/") ? i : `/${i}`;
  let s = (t ?? "") + o;
  e && (s = Yi({ path: e, url: s }));
  let l = a ? n(a) : "";
  return l.startsWith("?") && (l = l.substring(1)), l && (s += `?${l}`), s;
};
function Ki(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const Gi = async (t, e) => {
  const a = typeof e == "function" ? await e(t) : e;
  if (a)
    return t.scheme === "bearer" ? `Bearer ${a}` : t.scheme === "basic" ? `Basic ${btoa(a)}` : a;
}, Qa = ({
  allowReserved: t,
  array: e,
  object: a
} = {}) => (i) => {
  const o = [];
  if (i && typeof i == "object")
    for (const s in i) {
      const l = i[s];
      if (l != null)
        if (Array.isArray(l)) {
          const c = Xa({
            allowReserved: t,
            explode: !0,
            name: s,
            style: "form",
            value: l,
            ...e
          });
          c && o.push(c);
        } else if (typeof l == "object") {
          const c = Ja({
            allowReserved: t,
            explode: !0,
            name: s,
            style: "deepObject",
            value: l,
            ...a
          });
          c && o.push(c);
        } else {
          const c = Xe({
            allowReserved: t,
            name: s,
            value: l
          });
          c && o.push(c);
        }
    }
  return o.join("&");
}, Fi = (t) => {
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
}, Xi = (t, e) => {
  var a, n;
  return e ? !!(t.headers.has(e) || (a = t.query) != null && a[e] || (n = t.headers.get("Cookie")) != null && n.includes(`${e}=`)) : !1;
}, Ji = async ({
  security: t,
  ...e
}) => {
  for (const a of t) {
    if (Xi(e, a.name))
      continue;
    const n = await Gi(a, e.auth);
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
}, _a = (t) => Hi({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : Qa(t.querySerializer),
  url: t.url
}), ba = (t, e) => {
  var n;
  const a = { ...t, ...e };
  return (n = a.baseUrl) != null && n.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = Za(t.headers, e.headers), a;
}, Qi = (t) => {
  const e = [];
  return t.forEach((a, n) => {
    e.push([n, a]);
  }), e;
}, Za = (...t) => {
  const e = new Headers();
  for (const a of t) {
    if (!a)
      continue;
    const n = a instanceof Headers ? Qi(a) : Object.entries(a);
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
class bt {
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
const Zi = () => ({
  error: new bt(),
  request: new bt(),
  response: new bt()
}), es = Qa({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), ts = {
  "Content-Type": "application/json"
}, en = (t = {}) => ({
  ...xi,
  headers: ts,
  parseAs: "auto",
  querySerializer: es,
  ...t
}), as = (t = {}) => {
  let e = ba(en(), t);
  const a = () => ({ ...e }), n = (h) => (e = ba(e, h), a()), i = Zi(), o = async (h) => {
    const r = {
      ...e,
      ...h,
      fetch: h.fetch ?? e.fetch ?? globalThis.fetch,
      headers: Za(e.headers, h.headers),
      serializedBody: void 0
    };
    r.security && await Ji({
      ...r,
      security: r.security
    }), r.requestValidator && await r.requestValidator(r), r.body !== void 0 && r.bodySerializer && (r.serializedBody = r.bodySerializer(r.body)), (r.body === void 0 || r.serializedBody === "") && r.headers.delete("Content-Type");
    const b = _a(r);
    return { opts: r, url: b };
  }, s = async (h) => {
    const { opts: r, url: b } = await o(h), ue = {
      redirect: "follow",
      ...r,
      body: Ki(r)
    };
    let U = new Request(b, ue);
    for (const f of i.request.fns)
      f && (U = await f(U, r));
    const De = r.fetch;
    let p = await De(U);
    for (const f of i.response.fns)
      f && (p = await f(p, U, r));
    const v = {
      request: U,
      response: p
    };
    if (p.ok) {
      const f = (r.parseAs === "auto" ? Fi(p.headers.get("Content-Type")) : r.parseAs) ?? "json";
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
    for (const f of i.error.fns)
      f && (E = await f(F, p, U, r));
    if (E = E || {}, r.throwOnError)
      throw E;
    return r.responseStyle === "data" ? void 0 : {
      error: E,
      ...v
    };
  }, l = (h) => (r) => s({ ...r, method: h }), c = (h) => async (r) => {
    const { opts: b, url: ue } = await o(r);
    return Mi({
      ...b,
      body: b.body,
      headers: b.headers,
      method: h,
      onRequest: async (U, De) => {
        let p = new Request(U, De);
        for (const v of i.request.fns)
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
    interceptors: i,
    options: l("OPTIONS"),
    patch: l("PATCH"),
    post: l("POST"),
    put: l("PUT"),
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
    trace: l("TRACE")
  };
}, _ = as(en({
  baseUrl: "http://localhost:26291",
  throwOnError: !0
}));
class Ve {
  static getCollection(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/audit",
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
  static getByKey(e) {
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
class ic {
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
class ns {
  static getSettings(e) {
    return ((e == null ? void 0 : e.client) ?? _).get({
      url: "/umbraco/content-audit/management/api/v1/settings",
      ...e
    });
  }
}
var is = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, an = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? ss(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && is(e, a, i), i;
};
let ze = class extends ce(J) {
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
ze.styles = [
  T`
            uui-tag {
                font-size: 14px;
            }
        `
];
an([
  H({ attribute: !1 })
], ze.prototype, "value", 2);
ze = an([
  C("content-audit-metric-label")
], ze);
class sc extends Event {
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
const qe = "Umb.Workspace.ContentAudit", os = "Umb.Context.ContentAudit", nn = "content-audit";
var L;
class ls {
  constructor(e) {
    y(this, L);
    A(this, L, e);
  }
  async getLatestAuditOverview() {
    return await ee(u(this, L), Ve.getLatestAuditOverview());
  }
  async getPagesWithMissingMetadata() {
    return await ee(u(this, L), Ve.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await ee(u(this, L), tn.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await ee(u(this, L), Ve.getHealthScore());
  }
  async getAuditOverviews() {
    return await ee(u(this, L), Ve.getCollection({
      query: { skip: 0, take: 5 }
    }));
  }
}
L = new WeakMap();
var Se;
class rs {
  constructor(e) {
    y(this, Se);
    A(this, Se, e);
  }
  async getSettings() {
    return await Oi(u(this, Se), ns.getSettings());
  }
}
Se = new WeakMap();
var k, $e;
class cs extends qa {
  constructor(a) {
    super(a);
    y(this, k);
    y(this, $e);
    A(this, k, new ls(this)), A(this, $e, new rs(this));
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
var $, ne, ie, se, oe, le, re;
class Ot extends qa {
  constructor(a) {
    super(a);
    y(this, $);
    y(this, ne);
    y(this, ie);
    y(this, se);
    y(this, oe);
    y(this, le);
    y(this, re);
    this.workspaceAlias = qe, A(this, ne, new ht(void 0)), this.latestAuditOverview = u(this, ne).asObservable(), A(this, ie, new _t([], (n) => n.key)), this.auditOverviews = u(this, ie).asObservable(), A(this, se, new _t([], (n) => n.unique)), this.pagesWithMissingMetadata = u(this, se).asObservable(), A(this, oe, new _t([], (n) => n.name)), this.topIssues = u(this, oe).asObservable(), A(this, le, new ht(void 0)), this.healthScore = u(this, le).asObservable(), A(this, re, new ht(void 0)), this.settings = u(this, re).asObservable(), this.provideContext(Ii, this), this.provideContext(sn, this), A(this, $, new cs(this));
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
      const n = a.items.sort((i, o) => {
        const s = i.runDate ? new Date(i.runDate).getTime() : 0;
        return (o.runDate ? new Date(o.runDate).getTime() : 0) - s;
      });
      u(this, ie).setValue(n);
    }
  }
  async getPagesWithMissingMetadata() {
    const { data: a } = await u(this, $).getPagesWithMissingMetadata();
    a && u(this, se).setValue(a.items);
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
$ = new WeakMap(), ne = new WeakMap(), ie = new WeakMap(), se = new WeakMap(), oe = new WeakMap(), le = new WeakMap(), re = new WeakMap();
const sn = new wi(
  "ContentAuditContext"
), us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const ms = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = globalThis, kt = xe.ShadowRoot && (xe.ShadyCSS === void 0 || xe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, on = Symbol(), Ca = /* @__PURE__ */ new WeakMap();
let ds = class {
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
const ps = (t) => new ds(typeof t == "string" ? t : t + "", void 0, on), hs = (t, e) => {
  if (kt) t.adoptedStyleSheets = e.map((a) => a instanceof CSSStyleSheet ? a : a.styleSheet);
  else for (const a of e) {
    const n = document.createElement("style"), i = xe.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = a.cssText, t.appendChild(n);
  }
}, fa = kt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const n of e.cssRules) a += n.cssText;
  return ps(a);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _s, defineProperty: bs, getOwnPropertyDescriptor: Cs, getOwnPropertyNames: fs, getOwnPropertySymbols: ys, getPrototypeOf: As } = Object, R = globalThis, ya = R.trustedTypes, Ts = ya ? ya.emptyScript : "", Ct = R.reactiveElementPolyfillSupport, pe = (t, e) => t, Et = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ts : null;
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
} }, ln = (t, e) => !_s(t, e), Aa = { attribute: !0, type: String, converter: Et, reflect: !1, useDefault: !1, hasChanged: ln };
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
      const n = Symbol(), i = this.getPropertyDescriptor(e, n, a);
      i !== void 0 && bs(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, a, n) {
    const { get: i, set: o } = Cs(this.prototype, e) ?? { get() {
      return this[a];
    }, set(s) {
      this[a] = s;
    } };
    return { get: i, set(s) {
      const l = i == null ? void 0 : i.call(this);
      o == null || o.call(this, s), this.requestUpdate(e, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Aa;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pe("elementProperties"))) return;
    const e = As(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pe("properties"))) {
      const a = this.properties, n = [...fs(a), ...ys(a)];
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
      for (const i of n) a.unshift(fa(i));
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
    return hs(e, this.constructor.elementStyles), e;
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
      const s = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : Et).toAttribute(a, n.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, a) {
    var o, s;
    const n = this.constructor, i = n._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = n.getPropertyOptions(i), c = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : Et;
      this._$Em = i, this[i] = c.fromAttribute(a, l.type) ?? ((s = this._$Ej) == null ? void 0 : s.get(i)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, a, n) {
    var i;
    if (e !== void 0) {
      const o = this.constructor, s = this[e];
      if (n ?? (n = o.getPropertyOptions(e)), !((n.hasChanged ?? ln)(s, a) || n.useDefault && n.reflect && s === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(o._$Eu(e, n)))) return;
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
        const { wrapped: l } = s, c = this[o];
        l !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, s, c);
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
de.elementStyles = [], de.shadowRootOptions = { mode: "open" }, de[pe("elementProperties")] = /* @__PURE__ */ new Map(), de[pe("finalized")] = /* @__PURE__ */ new Map(), Ct == null || Ct({ ReactiveElement: de }), (R.reactiveElementVersions ?? (R.reactiveElementVersions = [])).push("2.1.0");
var vs = Object.getOwnPropertyDescriptor, gs = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? vs(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = s(i) || i);
  return i;
};
let Ye = class extends ce(J) {
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
Ye = gs([
  ms("content-audit-workspace-root")
], Ye);
const ws = Ye, Is = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Ye;
  },
  default: ws
}, Symbol.toStringTag, { value: "Module" })), K = "Umb.Menu.ContentAudit", Je = "Umb.Menu.ContentMetadata", Qe = "Umb.Menu.ContentPerformance", Nt = "Umb.Menu.ContentTools", Dt = "Umb.Collection.ContentAudit.Issues", Os = "Umb.CollectionView.ContentAudit.Issues.Table", rn = "Umb.Repository.ContentAuditIssuesCollection";
var Pe;
class Es {
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
    const { items: i, total: o } = a;
    return { data: { items: i, total: o } };
  }
}
Pe = new WeakMap();
var Ue;
class Ta extends Ei {
  constructor(a) {
    super(a);
    y(this, Ue);
    A(this, Ue, new Es(a));
  }
  async requestCollection(a) {
    return u(this, Ue).getCollection(a);
  }
}
Ue = new WeakMap();
const Ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: Ta,
  default: Ta
}, Symbol.toStringTag, { value: "Module" }));
var $s = Object.defineProperty, Ps = Object.getOwnPropertyDescriptor, cn = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Ps(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && $s(e, a, i), i;
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
		` : za;
  }
};
He.styles = [
  Si,
  T`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
cn([
  H({ attribute: !1 })
], He.prototype, "value", 2);
He = cn([
  C("content-audit-issues-table-name-column-layout")
], He);
var Us = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, un = (t) => {
  throw TypeError(t);
}, Q = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Ls(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Us(e, a, i), i;
}, Rt = (t, e, a) => e.has(t) || un("Cannot " + a), va = (t, e, a) => (Rt(t, e, "read from private field"), e.get(t)), ga = (t, e, a) => e.has(t) ? un("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), ks = (t, e, a, n) => (Rt(t, e, "write to private field"), e.set(t, a), a), Me = (t, e, a) => (Rt(t, e, "access private method"), a), he, te, mn, Vt, dn;
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
    ], this._tableItems = [], ga(this, he), this.consumeContext(D, (t) => {
      ks(this, he, t), Me(this, te, mn).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && (this._issues = this.data, Me(this, te, Vt).call(this, this.data));
  }
  render() {
    if (this._tableItems.length !== 0)
      return m`
                ${Me(this, te, dn).call(this)}
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
    this._issues = t, Me(this, te, Vt).call(this, t);
  }, "umbCollectionItemsObserver");
};
Vt = function(t) {
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
const Ns = O, Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return O;
  },
  default: Ns
}, Symbol.toStringTag, { value: "Module" })), Wt = "Umb.Collection.ContentAudit.Audits", Rs = "Umb.CollectionView.ContentAudit.Audits.Table", pn = "Umb.Repository.ContentAuditAuditsCollection", Vs = [
  {
    type: "repository",
    alias: pn,
    name: "Audits Collection Repository",
    api: () => import("./audits-collection.repository.js")
  }
], Ws = [
  {
    type: "collectionView",
    alias: Rs,
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
        match: Wt
      }
    ]
  }
], xs = [
  {
    type: "collection",
    kind: "default",
    alias: Wt,
    name: "Audits Collection",
    element: () => import("./audits.element.js"),
    meta: {
      repositoryAlias: pn
    }
  },
  ...Vs,
  ...Ws
], Ms = {
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
}, js = [Ms], Bs = "audits", hn = "audits-root", zs = [
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
    forEntityTypes: [Bs, hn]
  }
], We = "Umb.Workspace.ContentAudit.Audits", qs = [
  {
    type: "workspace",
    kind: "routable",
    alias: We,
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
        alias: N,
        match: We
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Audits.Details",
    name: "Audits Workspace Details View",
    js: () => import("./audits-details-workspace-view.element.js"),
    weight: 90,
    meta: {
      label: "Details",
      pathname: "details",
      icon: "icon-info"
    },
    conditions: [
      {
        alias: N,
        match: We
      }
    ]
  },
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
        alias: N,
        match: We
      }
    ]
  }
], wa = "Umb.Workspace.ContentAudit.AuditsRoot", Ys = [
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
      collectionAlias: Wt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: wa
      }
    ]
  }
], Hs = [
  ...qs,
  ...Ys
], Ks = [
  ...xs,
  ...js,
  ...zs,
  ...Hs
], _n = "all-pages-root", Gs = {
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
}, Fs = [Gs], Ia = "Umb.Workspace.ContentAudit.AllPagesRoot", Z = "Umb.Workspace.ContentAudit.AllPages", Xs = [
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
        alias: N,
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
        alias: N,
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
        alias: N,
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
        alias: N,
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
        alias: N,
        match: Z
      }
    ]
  }
], xt = "Umb.Collection.ContentAudit.AllPages", Js = "Umb.CollectionView.ContentAudit.AllPages.Table", bn = "Umb.Repository.ContentAuditAllPagesCollection";
var Qs = Object.defineProperty, Zs = Object.getOwnPropertyDescriptor, Cn = (t) => {
  throw TypeError(t);
}, Ze = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Zs(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Qs(e, a, i), i;
}, Mt = (t, e, a) => e.has(t) || Cn("Cannot " + a), Oa = (t, e, a) => (Mt(t, e, "read from private field"), e.get(t)), Ea = (t, e, a) => e.has(t) ? Cn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), eo = (t, e, a, n) => (Mt(t, e, "write to private field"), e.set(t, a), a), fn = (t, e, a) => (Mt(t, e, "access private method"), a), _e, Ke, yn, An;
let V = class extends P {
  constructor() {
    super(), Ea(this, Ke), this._tableConfig = {
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
    ], this._tableItems = [], Ea(this, _e), this.consumeContext(D, (t) => {
      eo(this, _e, t), fn(this, Ke, yn).call(this);
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
Ke = /* @__PURE__ */ new WeakSet();
yn = function() {
  Oa(this, _e) && this.observe(Oa(this, _e).items, (t) => fn(this, Ke, An).call(this, t), "umbCollectionItemsObserver");
};
An = function(t) {
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
  C("content-audit-all-pages-table-collection-view")
], V);
const to = V, ao = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return V;
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
], io = [...Xs, ...no], so = [
  {
    type: "repository",
    alias: bn,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository.js")
  }
], oo = [
  {
    type: "collectionView",
    alias: Js,
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
  ...so,
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
  ...io,
  ...Fs,
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
        alias: N,
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
    api: () => Promise.resolve().then(() => Ss)
  }
], Ao = [
  {
    type: "collectionView",
    alias: Os,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => Ds),
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
}, et = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Uo(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Po(e, a, i), i;
}, Bt = (t, e, a) => e.has(t) || wn("Cannot " + a), St = (t, e, a) => (Bt(t, e, "read from private field"), e.get(t)), ft = (t, e, a) => e.has(t) ? wn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), In = (t, e, a, n) => (Bt(t, e, "write to private field"), e.set(t, a), a), zt = (t, e, a) => (Bt(t, e, "access private method"), a), be, tt, Ce, On, En, Sn;
let W = class extends P {
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
    ], this._tableItems = [], ft(this, be), ft(this, tt), this.consumeContext(D, (t) => {
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
tt = /* @__PURE__ */ new WeakMap();
Ce = /* @__PURE__ */ new WeakSet();
On = function() {
  new Ne(this, Le).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    In(this, tt, t), zt(this, Ce, En).call(this);
  });
};
En = function() {
  St(this, be) && this.observe(St(this, be).items, (t) => zt(this, Ce, Sn).call(this, t), "umbCollectionItemsObserver");
};
Sn = function(t) {
  const e = St(this, tt);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    var i, o, s;
    const n = e({ entityType: a.entityType }) + ke.generateLocal({ unique: a.unique });
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
W.styles = [
  T`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
et([
  d()
], W.prototype, "_tableConfig", 2);
et([
  d()
], W.prototype, "_tableColumns", 2);
et([
  d()
], W.prototype, "_tableItems", 2);
W = et([
  C("content-audit-status-codes-table-collection-view")
], W);
const Lo = W, ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return W;
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
], Vo = [
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
], Wo = [
  ...No,
  ...So,
  ...Vo
], $n = "orphaned-pages-root", xo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: $n,
    menus: [Je]
  }
}, Mo = [xo], qt = "Umb.Collection.ContentAudit.OrphanedPages", jo = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", Pn = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var Bo = Object.defineProperty, zo = Object.getOwnPropertyDescriptor, Un = (t) => {
  throw TypeError(t);
}, at = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? zo(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Bo(e, a, i), i;
}, Yt = (t, e, a) => e.has(t) || Un("Cannot " + a), $t = (t, e, a) => (Yt(t, e, "read from private field"), e.get(t)), yt = (t, e, a) => e.has(t) ? Un("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Ln = (t, e, a, n) => (Yt(t, e, "write to private field"), e.set(t, a), a), Ht = (t, e, a) => (Yt(t, e, "access private method"), a), fe, nt, ye, kn, Nn, Dn;
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
    ], this._tableItems = [], yt(this, fe), yt(this, nt), this.consumeContext(D, (t) => {
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
nt = /* @__PURE__ */ new WeakMap();
ye = /* @__PURE__ */ new WeakSet();
kn = function() {
  new Ne(this, Le).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Ln(this, nt, t), Ht(this, ye, Nn).call(this);
  });
};
Nn = function() {
  $t(this, fe) && this.observe($t(this, fe).items, (t) => Ht(this, ye, Dn).call(this, t), "umbCollectionItemsObserver");
};
Dn = function(t) {
  const e = $t(this, nt);
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
    menus: [Je]
  }
}, Qo = [Jo], Kt = "Umb.Collection.ContentAudit.ImagesAltText", Zo = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", Vn = "Umb.Repository.ContentAuditImagesAltTextCollection";
var el = Object.defineProperty, tl = Object.getOwnPropertyDescriptor, Wn = (t) => {
  throw TypeError(t);
}, it = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? tl(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && el(e, a, i), i;
}, Gt = (t, e, a) => e.has(t) || Wn("Cannot " + a), Pt = (t, e, a) => (Gt(t, e, "read from private field"), e.get(t)), At = (t, e, a) => e.has(t) ? Wn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), xn = (t, e, a, n) => (Gt(t, e, "write to private field"), e.set(t, a), a), Ft = (t, e, a) => (Gt(t, e, "access private method"), a), Ae, st, Te, Mn, jn, Bn;
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
    ], this._tableItems = [], At(this, Ae), At(this, st), this.consumeContext(D, (t) => {
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
  C("content-audit-images-alt-text-table-collection-view")
], M);
const al = M, nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return M;
  },
  default: al
}, Symbol.toStringTag, { value: "Module" })), La = "Umb.Workspace.ContentAudit.ImagesAltText", il = [
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
], sl = [
  {
    type: "repository",
    alias: Vn,
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
      repositoryAlias: Vn
    }
  },
  ...sl,
  ...ol
], rl = [
  ...il,
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
}, ot = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? pl(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && dl(e, a, i), i;
}, Jt = (t, e, a) => e.has(t) || Yn("Cannot " + a), ka = (t, e, a) => (Jt(t, e, "read from private field"), e.get(t)), Na = (t, e, a) => e.has(t) ? Yn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), hl = (t, e, a, n) => (Jt(t, e, "write to private field"), e.set(t, a), a), Hn = (t, e, a) => (Jt(t, e, "access private method"), a), ve, Ge, Kn, Gn;
let j = class extends P {
  constructor() {
    super(), Na(this, Ge), this._tableConfig = {
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
    ], this._tableItems = [], Na(this, ve), this.consumeContext(D, (t) => {
      hl(this, ve, t), Hn(this, Ge, Kn).call(this);
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
Ge = /* @__PURE__ */ new WeakSet();
Kn = function() {
  ka(this, ve) && this.observe(ka(this, ve).items, (t) => Hn(this, Ge, Gn).call(this, t), "umbCollectionItemsObserver");
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
}, lt = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Ol(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Il(e, a, i), i;
}, Zt = (t, e, a) => e.has(t) || Jn("Cannot " + a), Ra = (t, e, a) => (Zt(t, e, "read from private field"), e.get(t)), Va = (t, e, a) => e.has(t) ? Jn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), El = (t, e, a, n) => (Zt(t, e, "write to private field"), e.set(t, a), a), Qn = (t, e, a) => (Zt(t, e, "access private method"), a), ge, Fe, Zn, ei;
let B = class extends P {
  constructor() {
    super(), Va(this, Fe), this._tableConfig = {
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
    ], this._tableItems = [], Va(this, ge), this.consumeContext(D, (t) => {
      El(this, ge, t), Qn(this, Fe, Zn).call(this);
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
Zn = function() {
  Ra(this, ge) && this.observe(Ra(this, ge).items, (t) => Qn(this, Fe, ei).call(this, t), "umbCollectionItemsObserver");
};
ei = function(t) {
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
lt([
  d()
], B.prototype, "_tableConfig", 2);
lt([
  d()
], B.prototype, "_tableColumns", 2);
lt([
  d()
], B.prototype, "_tableItems", 2);
B = lt([
  C("content-audit-inbound-links-table-collection-view")
], B);
const Sl = B, $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return B;
  },
  default: Sl
}, Symbol.toStringTag, { value: "Module" })), Wa = "Umb.Workspace.ContentAudit.InboundLinks", Pl = [
  {
    type: "workspace",
    kind: "default",
    alias: Wa,
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
        match: Wa
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
], ti = "metadata-root", Dl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: ti,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, Rl = [Dl], ea = "Umb.Collection.ContentAudit.Metadata", Vl = "Umb.CollectionView.ContentAudit.Metadata.Table", xa = "Umb.Workspace.ContentAudit.Metadata", Wl = [
  {
    type: "workspace",
    kind: "default",
    alias: xa,
    name: "Metadata Root Workspace",
    meta: {
      entityType: ti,
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
], ai = "Umb.Repository.ContentAuditMetadataCollection", xl = [
  {
    type: "repository",
    alias: ai,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository.js")
  }
], Ml = [
  {
    type: "collectionView",
    alias: Vl,
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
      repositoryAlias: ai
    }
  },
  ...xl,
  ...Ml
], Bl = [
  ...Wl,
  ...Rl,
  ...jl
], zl = [], ta = "Umb.Collection.ContentAudit.DuplicateContent", ql = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", ni = "Umb.Repository.ContentAuditDuplicateContentCollection";
var Yl = Object.defineProperty, Hl = Object.getOwnPropertyDescriptor, rt = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Hl(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && Yl(e, a, i), i;
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
rt([
  d()
], z.prototype, "_tableConfig", 2);
rt([
  d()
], z.prototype, "_tableColumns", 2);
rt([
  d()
], z.prototype, "_tableItems", 2);
z = rt([
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
    alias: ni,
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
      repositoryAlias: ni
    }
  },
  ...Jl,
  ...Ql
], er = [
  ...Xl,
  ...zl,
  ...Zl
], ii = "carbon-rating-root", tr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: ii,
    menus: [Qe]
  }
}, ar = [tr], aa = "Umb.Collection.ContentAudit.CarbonRating", nr = "Umb.CollectionView.ContentAudit.CarbonRating.Table", si = "Umb.Repository.ContentAuditCarbonRatingCollection";
var ir = Object.defineProperty, sr = Object.getOwnPropertyDescriptor, oi = (t) => {
  throw TypeError(t);
}, ct = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? sr(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && ir(e, a, i), i;
}, na = (t, e, a) => e.has(t) || oi("Cannot " + a), Ut = (t, e, a) => (na(t, e, "read from private field"), e.get(t)), Tt = (t, e, a) => e.has(t) ? oi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), li = (t, e, a, n) => (na(t, e, "write to private field"), e.set(t, a), a), ia = (t, e, a) => (na(t, e, "access private method"), a), we, ut, Ie, ri, ci, ui;
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
    ], this._tableItems = [], Tt(this, we), Tt(this, ut), this.consumeContext(D, (t) => {
      li(this, we, t);
    }), ia(this, Ie, ri).call(this);
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
ut = /* @__PURE__ */ new WeakMap();
Ie = /* @__PURE__ */ new WeakSet();
ri = function() {
  new Ne(this, Le).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    li(this, ut, t), ia(this, Ie, ci).call(this);
  });
};
ci = function() {
  Ut(this, we) && this.observe(Ut(this, we).items, (t) => ia(this, Ie, ui).call(this, t), "umbCollectionItemsObserver");
};
ui = function(t) {
  const e = Ut(this, ut);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    var i, o, s;
    const n = e({ entityType: a.entityType }) + ke.generateLocal({ unique: a.unique });
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
      entityType: ii,
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
    alias: si,
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
      repositoryAlias: si
    }
  },
  ...cr,
  ...ur
], dr = [
  ...rr,
  ...ar,
  ...mr
], mi = "core-web-vitals-root", pr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: mi,
    menus: [Qe]
  }
}, hr = [pr], sa = "Umb.Collection.ContentAudit.CoreWebVitals", _r = "Umb.CollectionView.ContentAudit.CoreWebVitals.Table", di = "Umb.Repository.ContentAuditCoreWebVitalsCollection";
var br = Object.defineProperty, Cr = Object.getOwnPropertyDescriptor, pi = (t) => {
  throw TypeError(t);
}, mt = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Cr(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && br(e, a, i), i;
}, oa = (t, e, a) => e.has(t) || pi("Cannot " + a), Lt = (t, e, a) => (oa(t, e, "read from private field"), e.get(t)), vt = (t, e, a) => e.has(t) ? pi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), hi = (t, e, a, n) => (oa(t, e, "write to private field"), e.set(t, a), a), la = (t, e, a) => (oa(t, e, "access private method"), a), Oe, dt, Ee, _i, bi, Ci;
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
    ], this._tableItems = [], vt(this, Oe), vt(this, dt), this.consumeContext(D, (t) => {
      hi(this, Oe, t);
    }), la(this, Ee, _i).call(this);
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
dt = /* @__PURE__ */ new WeakMap();
Ee = /* @__PURE__ */ new WeakSet();
_i = function() {
  new Ne(this, Le).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    hi(this, dt, t), la(this, Ee, bi).call(this);
  });
};
bi = function() {
  Lt(this, Oe) && this.observe(Lt(this, Oe).items, (t) => la(this, Ee, Ci).call(this, t), "umbCollectionItemsObserver");
};
Ci = function(t) {
  const e = Lt(this, dt);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.filter((a) => a.pageData.statusCode === 200).map((a) => {
    var i;
    const n = e({ entityType: a.entityType }) + ke.generateLocal({ unique: a.unique });
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
      entityType: mi,
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
      collectionAlias: sa
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
    alias: di,
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
        match: sa
      }
    ]
  }
], gr = [
  {
    type: "collection",
    kind: "default",
    alias: sa,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element.js"),
    meta: {
      repositoryAlias: di
    }
  },
  ...Tr,
  ...vr
], wr = [
  ...Ar,
  ...hr,
  ...gr
], fi = "export-root", Ir = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: fi,
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
      entityType: fi,
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
  ...Ks,
  ...po,
  ...Oo,
  ...Wo,
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
  alias: qe,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Is),
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
], Vr = [
  Dr,
  ...Rr
], Wr = [
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
  alias: os,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => us)
}, cc = async (t, e) => {
  e.registerMany([
    Br,
    ...Nr,
    ...Vr,
    ...Wr,
    ...xr,
    ...jr
  ]), t.consumeContext(gi, async (a) => {
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
  sn as C,
  Nt as D,
  Dt as E,
  Os as F,
  rn as G,
  Ta as H,
  tn as I,
  Es as J,
  O as K,
  sc as U,
  ic as a,
  Bs as b,
  hn as c,
  We as d,
  Z as e,
  ln as f,
  $a as g,
  je as h,
  Be as i,
  gt as j,
  wt as k,
  ze as l,
  oc as m,
  lc as n,
  cc as o,
  $i as p,
  Pi as q,
  Ot as r,
  Ye as s,
  ms as t,
  Et as u,
  qe as v,
  os as w,
  nn as x,
  K as y,
  Je as z
};
//# sourceMappingURL=index.js.map
