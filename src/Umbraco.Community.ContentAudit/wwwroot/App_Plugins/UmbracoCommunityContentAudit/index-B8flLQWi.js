import { UMB_AUTH_CONTEXT as pa } from "@umbraco-cms/backoffice/auth";
import { css as b, property as x, customElement as f, html as d, nothing as ha, state as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { UmbControllerBase as Ca } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as qn } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as Yn, UMB_WORKSPACE_CONDITION_ALIAS as g } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as q } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as qe, UmbArrayState as de, UmbBooleanState as Fn, UmbStringState as Et } from "@umbraco-cms/backoffice/observable-api";
import { UMB_NOTIFICATION_CONTEXT as Hn } from "@umbraco-cms/backoffice/notification";
import { UMB_SERVER_CONTEXT as Kn } from "@umbraco-cms/backoffice/server";
import { HubConnectionBuilder as Gn } from "@umbraco-cms/backoffice/external/signalr";
import { UmbRepositoryBase as Xn } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as $, UMB_COLLECTION_ALIAS_CONDITION as v } from "@umbraco-cms/backoffice/collection";
import { UmbTextStyles as Jn } from "@umbraco-cms/backoffice/style";
const Qn = [
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
], Zn = [
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
var ei = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, _a = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? ti(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && ei(e, a, n), n;
};
let _e = class extends C {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Qn[this.type - 1];
      return d`
                <uui-tag color=${t?.color}>
                    <uui-icon name="${t?.icon}"></uui-icon>
                    ${t?.label}
                </uui-tag>
            `;
    }
  }
};
_e.styles = [
  b`
            uui-tag {
                font-size: var(--uui-type-default-size);

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
_a([
  x({ attribute: !1 })
], _e.prototype, "type", 2);
_e = _a([
  f("content-audit-issue-type-label")
], _e);
var ai = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, fa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? ni(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && ai(e, a, n), n;
};
let fe = class extends C {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Zn[this.type - 1];
      return d`
                <uui-tag color=${t?.color}>
                    <uui-icon name="${t?.icon}"></uui-icon>
                    ${t?.label}
                </uui-tag>
            `;
    }
  }
};
fe.styles = [
  b`
            uui-tag {
                font-size: var(--uui-type-default-size);

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
fa([
  x({ attribute: !1 })
], fe.prototype, "type", 2);
fe = fa([
  f("content-audit-priority-type-label")
], fe);
var ii = Object.defineProperty, si = Object.getOwnPropertyDescriptor, Aa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? si(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && ii(e, a, n), n;
};
let He = class extends C {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? d`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : ha;
  }
};
Aa([
  x({ attribute: !1 })
], He.prototype, "statusCode", 2);
He = Aa([
  f("content-audit-status-code-label")
], He);
var oi = Object.defineProperty, ri = Object.getOwnPropertyDescriptor, ba = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? ri(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && oi(e, a, n), n;
};
let Ke = class extends C {
  constructor() {
    super(...arguments), this.value = "";
  }
  _getColour() {
    return this.value == "E" || this.value == "F" ? "danger" : this.value == "D" ? "warning" : "positive";
  }
  render() {
    return this.value != null ? d`
                <uui-tag .color=${this._getColour()}>
                    ${this.value}
                </uui-tag>
            ` : d`
            <uui-tag color="default" look="placeholder">N/A</uui-tag>
        `;
  }
};
ba([
  x({ attribute: !0 })
], Ke.prototype, "value", 2);
Ke = ba([
  f("content-audit-carbon-intensity-label")
], Ke);
var ya = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(ya || {}), Ge = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(Ge || {});
const li = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, a) => typeof a == "bigint" ? a.toString() : a
  )
}, ci = ({
  onRequest: t,
  onSseError: e,
  onSseEvent: a,
  responseTransformer: i,
  responseValidator: n,
  sseDefaultRetryDelay: s,
  sseMaxRetryAttempts: o,
  sseMaxRetryDelay: r,
  sseSleepFn: c,
  url: h,
  ...l
}) => {
  let _;
  const G = c ?? ((p) => new Promise((y) => setTimeout(y, p)));
  return { stream: async function* () {
    let p = s ?? 3e3, y = 0;
    const j = l.signal ?? new AbortController().signal;
    for (; !j.aborted; ) {
      y++;
      const X = l.headers instanceof Headers ? l.headers : new Headers(l.headers);
      _ !== void 0 && X.set("Last-Event-ID", _);
      try {
        const B = {
          redirect: "follow",
          ...l,
          body: l.serializedBody,
          headers: X,
          signal: j
        };
        let O = new Request(h, B);
        t && (O = await t(h, B));
        const T = await (l.fetch ?? globalThis.fetch)(O);
        if (!T.ok)
          throw new Error(
            `SSE failed: ${T.status} ${T.statusText}`
          );
        if (!T.body) throw new Error("No body in SSE response");
        const E = T.body.pipeThrough(new TextDecoderStream()).getReader();
        let ze = "";
        const gt = () => {
          try {
            E.cancel();
          } catch {
          }
        };
        j.addEventListener("abort", gt);
        try {
          for (; ; ) {
            const { done: Mn, value: jn } = await E.read();
            if (Mn) break;
            ze += jn;
            const vt = ze.split(`

`);
            ze = vt.pop() ?? "";
            for (const Bn of vt) {
              const zn = Bn.split(`
`), ue = [];
              let wt;
              for (const w of zn)
                if (w.startsWith("data:"))
                  ue.push(w.replace(/^data:\s*/, ""));
                else if (w.startsWith("event:"))
                  wt = w.replace(/^event:\s*/, "");
                else if (w.startsWith("id:"))
                  _ = w.replace(/^id:\s*/, "");
                else if (w.startsWith("retry:")) {
                  const Ot = Number.parseInt(
                    w.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(Ot) || (p = Ot);
                }
              let z, It = !1;
              if (ue.length) {
                const w = ue.join(`
`);
                try {
                  z = JSON.parse(w), It = !0;
                } catch {
                  z = w;
                }
              }
              It && (n && await n(z), i && (z = await i(z))), a?.({
                data: z,
                event: wt,
                id: _,
                retry: p
              }), ue.length && (yield z);
            }
          }
        } finally {
          j.removeEventListener("abort", gt), E.releaseLock();
        }
        break;
      } catch (B) {
        if (e?.(B), o !== void 0 && y >= o)
          break;
        const O = Math.min(
          p * 2 ** (y - 1),
          r ?? 3e4
        );
        await G(O);
      }
    }
  }() };
}, ui = (t) => {
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
}, di = (t) => {
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
}, mi = (t) => {
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
}, Ta = ({
  allowReserved: t,
  explode: e,
  name: a,
  style: i,
  value: n
}) => {
  if (!e) {
    const r = (t ? n : n.map((c) => encodeURIComponent(c))).join(di(i));
    switch (i) {
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
  const s = ui(i), o = n.map((r) => i === "label" || i === "simple" ? t ? r : encodeURIComponent(r) : Pe({
    allowReserved: t,
    name: a,
    value: r
  })).join(s);
  return i === "label" || i === "matrix" ? s + o : o;
}, Pe = ({
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
}, ga = ({
  allowReserved: t,
  explode: e,
  name: a,
  style: i,
  value: n,
  valueOnly: s
}) => {
  if (n instanceof Date)
    return s ? n.toISOString() : `${a}=${n.toISOString()}`;
  if (i !== "deepObject" && !e) {
    let c = [];
    Object.entries(n).forEach(([l, _]) => {
      c = [
        ...c,
        l,
        t ? _ : encodeURIComponent(_)
      ];
    });
    const h = c.join(",");
    switch (i) {
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
  const o = mi(i), r = Object.entries(n).map(
    ([c, h]) => Pe({
      allowReserved: t,
      name: i === "deepObject" ? `${a}[${c}]` : c,
      value: h
    })
  ).join(o);
  return i === "label" || i === "matrix" ? o + r : r;
}, pi = /\{[^{}]+\}/g, hi = ({ path: t, url: e }) => {
  let a = e;
  const i = e.match(pi);
  if (i)
    for (const n of i) {
      let s = !1, o = n.substring(1, n.length - 1), r = "simple";
      o.endsWith("*") && (s = !0, o = o.substring(0, o.length - 1)), o.startsWith(".") ? (o = o.substring(1), r = "label") : o.startsWith(";") && (o = o.substring(1), r = "matrix");
      const c = t[o];
      if (c == null)
        continue;
      if (Array.isArray(c)) {
        a = a.replace(
          n,
          Ta({ explode: s, name: o, style: r, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        a = a.replace(
          n,
          ga({
            explode: s,
            name: o,
            style: r,
            value: c,
            valueOnly: !0
          })
        );
        continue;
      }
      if (r === "matrix") {
        a = a.replace(
          n,
          `;${Pe({
            name: o,
            value: c
          })}`
        );
        continue;
      }
      const h = encodeURIComponent(
        r === "label" ? `.${c}` : c
      );
      a = a.replace(n, h);
    }
  return a;
}, Ci = ({
  baseUrl: t,
  path: e,
  query: a,
  querySerializer: i,
  url: n
}) => {
  const s = n.startsWith("/") ? n : `/${n}`;
  let o = (t ?? "") + s;
  e && (o = hi({ path: e, url: o }));
  let r = a ? i(a) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (o += `?${r}`), o;
};
function _i(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const fi = async (t, e) => {
  const a = typeof e == "function" ? await e(t) : e;
  if (a)
    return t.scheme === "bearer" ? `Bearer ${a}` : t.scheme === "basic" ? `Basic ${btoa(a)}` : a;
}, va = ({
  allowReserved: t,
  array: e,
  object: a
} = {}) => (n) => {
  const s = [];
  if (n && typeof n == "object")
    for (const o in n) {
      const r = n[o];
      if (r != null)
        if (Array.isArray(r)) {
          const c = Ta({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "form",
            value: r,
            ...e
          });
          c && s.push(c);
        } else if (typeof r == "object") {
          const c = ga({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "deepObject",
            value: r,
            ...a
          });
          c && s.push(c);
        } else {
          const c = Pe({
            allowReserved: t,
            name: o,
            value: r
          });
          c && s.push(c);
        }
    }
  return s.join("&");
}, Ai = (t) => {
  if (!t)
    return "stream";
  const e = t.split(";")[0]?.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json"))
      return "json";
    if (e === "multipart/form-data")
      return "formData";
    if (["application/", "audio/", "image/", "video/"].some(
      (a) => e.startsWith(a)
    ))
      return "blob";
    if (e.startsWith("text/"))
      return "text";
  }
}, bi = (t, e) => e ? !!(t.headers.has(e) || t.query?.[e] || t.headers.get("Cookie")?.includes(`${e}=`)) : !1, yi = async ({
  security: t,
  ...e
}) => {
  for (const a of t) {
    if (bi(e, a.name))
      continue;
    const i = await fi(a, e.auth);
    if (!i)
      continue;
    const n = a.name ?? "Authorization";
    switch (a.in) {
      case "query":
        e.query || (e.query = {}), e.query[n] = i;
        break;
      case "cookie":
        e.headers.append("Cookie", `${n}=${i}`);
        break;
      default:
        e.headers.set(n, i);
        break;
    }
  }
}, St = (t) => Ci({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : va(t.querySerializer),
  url: t.url
}), $t = (t, e) => {
  const a = { ...t, ...e };
  return a.baseUrl?.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = wa(t.headers, e.headers), a;
}, Ti = (t) => {
  const e = [];
  return t.forEach((a, i) => {
    e.push([i, a]);
  }), e;
}, wa = (...t) => {
  const e = new Headers();
  for (const a of t) {
    if (!a)
      continue;
    const i = a instanceof Headers ? Ti(a) : Object.entries(a);
    for (const [n, s] of i)
      if (s === null)
        e.delete(n);
      else if (Array.isArray(s))
        for (const o of s)
          e.append(n, o);
      else s !== void 0 && e.set(
        n,
        typeof s == "object" ? JSON.stringify(s) : s
      );
  }
  return e;
};
class Ye {
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
    const i = this.getInterceptorIndex(e);
    return this.fns[i] ? (this.fns[i] = a, e) : !1;
  }
  use(e) {
    return this.fns.push(e), this.fns.length - 1;
  }
}
const gi = () => ({
  error: new Ye(),
  request: new Ye(),
  response: new Ye()
}), vi = va({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), wi = {
  "Content-Type": "application/json"
}, Ia = (t = {}) => ({
  ...li,
  headers: wi,
  parseAs: "auto",
  querySerializer: vi,
  ...t
}), Ii = (t = {}) => {
  let e = $t(Ia(), t);
  const a = () => ({ ...e }), i = (h) => (e = $t(e, h), a()), n = gi(), s = async (h) => {
    const l = {
      ...e,
      ...h,
      fetch: h.fetch ?? e.fetch ?? globalThis.fetch,
      headers: wa(e.headers, h.headers),
      serializedBody: void 0
    };
    l.security && await yi({
      ...l,
      security: l.security
    }), l.requestValidator && await l.requestValidator(l), l.body !== void 0 && l.bodySerializer && (l.serializedBody = l.bodySerializer(l.body)), (l.body === void 0 || l.serializedBody === "") && l.headers.delete("Content-Type");
    const _ = St(l);
    return { opts: l, url: _ };
  }, o = async (h) => {
    const { opts: l, url: _ } = await s(h), G = {
      redirect: "follow",
      ...l,
      body: _i(l)
    };
    let S = new Request(_, G);
    for (const A of n.request.fns)
      A && (S = await A(S, l));
    const ce = l.fetch;
    let p = await ce(S);
    for (const A of n.response.fns)
      A && (p = await A(p, S, l));
    const y = {
      request: S,
      response: p
    };
    if (p.ok) {
      const A = (l.parseAs === "auto" ? Ai(p.headers.get("Content-Type")) : l.parseAs) ?? "json";
      if (p.status === 204 || p.headers.get("Content-Length") === "0") {
        let E;
        switch (A) {
          case "arrayBuffer":
          case "blob":
          case "text":
            E = await p[A]();
            break;
          case "formData":
            E = new FormData();
            break;
          case "stream":
            E = p.body;
            break;
          default:
            E = {};
            break;
        }
        return l.responseStyle === "data" ? E : {
          data: E,
          ...y
        };
      }
      let T;
      switch (A) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          T = await p[A]();
          break;
        case "stream":
          return l.responseStyle === "data" ? p.body : {
            data: p.body,
            ...y
          };
      }
      return A === "json" && (l.responseValidator && await l.responseValidator(T), l.responseTransformer && (T = await l.responseTransformer(T))), l.responseStyle === "data" ? T : {
        data: T,
        ...y
      };
    }
    const j = await p.text();
    let X;
    try {
      X = JSON.parse(j);
    } catch {
    }
    const B = X ?? j;
    let O = B;
    for (const A of n.error.fns)
      A && (O = await A(B, p, S, l));
    if (O = O || {}, l.throwOnError)
      throw O;
    return l.responseStyle === "data" ? void 0 : {
      error: O,
      ...y
    };
  }, r = (h) => (l) => o({ ...l, method: h }), c = (h) => async (l) => {
    const { opts: _, url: G } = await s(l);
    return ci({
      ..._,
      body: _.body,
      headers: _.headers,
      method: h,
      onRequest: async (S, ce) => {
        let p = new Request(S, ce);
        for (const y of n.request.fns)
          y && (p = await y(p, _));
        return p;
      },
      url: G
    });
  };
  return {
    buildUrl: St,
    connect: r("CONNECT"),
    delete: r("DELETE"),
    get: r("GET"),
    getConfig: a,
    head: r("HEAD"),
    interceptors: n,
    options: r("OPTIONS"),
    patch: r("PATCH"),
    post: r("POST"),
    put: r("PUT"),
    request: o,
    setConfig: i,
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
}, u = Ii(Ia({
  baseUrl: "http://localhost:26297",
  throwOnError: !0
}));
class me {
  static getCollection(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit",
      ...e
    });
  }
  static delete(e) {
    return (e.client ?? u).delete({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}",
      ...e
    });
  }
  static getByKey(e) {
    return (e.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}",
      ...e
    });
  }
  static exportByKey(e) {
    return (e.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/export",
      ...e
    });
  }
  static getPageImages(e) {
    return (e.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/images",
      ...e
    });
  }
  static getPageIssues(e) {
    return (e.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/issues",
      ...e
    });
  }
  static getPageLinks(e) {
    return (e.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/links",
      ...e
    });
  }
  static overviewByKey(e) {
    return (e.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/overview",
      ...e
    });
  }
  static getPageResources(e) {
    return (e.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/resources",
      ...e
    });
  }
  static getAllImages(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/all-images",
      ...e
    });
  }
  static getCarbonRatings(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/carbon-ratings",
      ...e
    });
  }
  static getCoreWebVitals(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/core-web-vitals",
      ...e
    });
  }
  static getDuplicateContentUrls(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/duplicate-content",
      ...e
    });
  }
  static export(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/export",
      ...e
    });
  }
  static getExternalLinks(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/external-links",
      ...e
    });
  }
  static getHealthScore(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/health-score",
      ...e
    });
  }
  static getInternalLinks(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/internal-links",
      ...e
    });
  }
  static getLatestAuditData(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/latest-data",
      ...e
    });
  }
  static getPagesWithMissingMetadata(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/missing-metadata",
      ...e
    });
  }
  static getOrphanedPages(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/orphaned-pages",
      ...e
    });
  }
  static overview(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/audit/overview",
      ...e
    });
  }
  static children(e) {
    return (e.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/tree/audit/children/{parentId}",
      ...e
    });
  }
  static root(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/tree/audit/root",
      ...e
    });
  }
}
class pe {
  static cancelCrawl(e) {
    return (e?.client ?? u).post({
      url: "/umbraco/content-audit/management/api/v1/crawl/cancel",
      ...e
    });
  }
  static startCrawl(e) {
    return (e?.client ?? u).post({
      url: "/umbraco/content-audit/management/api/v1/crawl/start",
      ...e
    });
  }
  static getCrawlStatus(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/crawl/status",
      ...e
    });
  }
}
class kl {
  static cancelEnrich(e) {
    return (e?.client ?? u).post({
      url: "/umbraco/content-audit/management/api/v1/enrich/cancel",
      ...e
    });
  }
  static enrichPage(e) {
    return (e?.client ?? u).post({
      url: "/umbraco/content-audit/management/api/v1/enrich/page",
      ...e
    });
  }
  static startEnrich(e) {
    return (e?.client ?? u).post({
      url: "/umbraco/content-audit/management/api/v1/enrich/start",
      ...e
    });
  }
  static getEnrichStatus(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/enrich/status",
      ...e
    });
  }
}
class Oa {
  static getAllIssues(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/issue",
      ...e
    });
  }
  static getIssue(e) {
    return (e.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/issue/{id}",
      ...e
    });
  }
}
class Oi {
  static getSettings(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/settings",
      ...e
    });
  }
}
var Ei = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, Ea = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Si(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Ei(e, a, n), n;
};
let Ae = class extends C {
  _getColour() {
    return this.value != null ? this.value.rating == Ge.POOR ? "danger" : this.value.rating == Ge.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == ya.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
  }
  render() {
    return this.value != null ? d`
                <uui-tag .color=${this._getColour()}>
                    ${this._formatValue()}
                </uui-tag>
            ` : d`
            <uui-tag color="default" look="placeholder">N/A</uui-tag>
        `;
  }
};
Ae.styles = [
  b`
            uui-tag {
                font-size: var(--uui-type-default-size);
            }
        `
];
Ea([
  x({ attribute: !1 })
], Ae.prototype, "value", 2);
Ae = Ea([
  f("content-audit-metric-label")
], Ae);
const be = "ContentAudit.Workspace", $i = "ContentAudit.Context", Sa = "content-audit";
class Pi {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getLatestAuditOverview() {
    return await q(this.#e, me.overview());
  }
  async getPagesWithMissingMetadata() {
    return await q(this.#e, me.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await q(this.#e, Oa.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await q(this.#e, me.getHealthScore());
  }
  async getAuditOverviews() {
    return await q(this.#e, me.getCollection({
      query: { skip: 0, take: 5 }
    }));
  }
}
class ki {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getSettings() {
    return await q(this.#e, Oi.getSettings());
  }
}
class Li extends Ca {
  #e;
  #i;
  constructor(e) {
    super(e), this.#e = new Pi(this), this.#i = new ki(this);
  }
  async getLatestAuditOverview() {
    return this.#e.getLatestAuditOverview();
  }
  async getPagesWithMissingMetadata() {
    return this.#e.getPagesWithMissingMetadata();
  }
  async getTopIssues() {
    return this.#e.getTopIssues();
  }
  async getHealthScore() {
    return this.#e.getHealthScore();
  }
  async getSettings() {
    return this.#i.getSettings();
  }
  async getAuditOverviews() {
    return this.#e.getAuditOverviews();
  }
}
class Xe extends Ca {
  constructor(e) {
    super(e), this.workspaceAlias = be, this.#i = new qe(void 0), this.latestAuditOverview = this.#i.asObservable(), this.#l = new de([], (a) => a.key), this.auditOverviews = this.#l.asObservable(), this.#c = new de([], (a) => a.unique), this.pagesWithMissingMetadata = this.#c.asObservable(), this.#u = new de([], (a) => a.name), this.topIssues = this.#u.asObservable(), this.#d = new qe(void 0), this.healthScore = this.#d.asObservable(), this.#m = new qe(void 0), this.settings = this.#m.asObservable(), this.#s = new de([], (a) => a.unique), this.crawlData = this.#s.asObservable(), this.#n = new Fn(!1), this.isRunning = this.#n.asObservable(), this.#a = new Et(""), this.crawlPhase = this.#a.asObservable(), this.#r = new Et(""), this.pageEnrichingUrl = this.#r.asObservable(), this.provideContext($a, this), this.provideContext(Yn, this), this.#e = new Li(this), this.consumeContext(pa, (a) => {
      this.#p = a, this.#C();
    }), this.consumeContext(Kn, (a) => {
      this.#h = a;
    });
  }
  getEntityType() {
    return Sa;
  }
  #e;
  #i;
  #l;
  #c;
  #u;
  #d;
  #m;
  #s;
  #n;
  #a;
  #r;
  #t;
  #p;
  #h;
  #C() {
    this.observe(this.#p?.isAuthorized, async (e) => {
      if (e !== void 0)
        if (e) {
          const a = await this.#p?.getLatestToken();
          a && this.#_(a);
        } else
          this.#t?.stop(), this.#t = void 0;
    });
  }
  #_(e) {
    const i = `${this.#h?.getServerUrl() ?? ""}/umbraco/content-audit/hub`;
    this.#t = new Gn().withUrl(i, {
      accessTokenFactory: () => e
    }).withAutomaticReconnect().build(), this.#t.on("crawlStarted", () => {
      this.#n.setValue(!0), this.#s.setValue([]), this.#a.setValue("");
    }), this.#t.on("crawlProgress", (n) => {
      this.#s.appendOne(n);
    }), this.#t.on("crawlPhaseChanged", (n) => {
      this.#a.setValue(n);
    }), this.#t.on("crawlCompleted", () => {
      this.#n.setValue(!1), this.#a.setValue("");
    }), this.#t.on("crawlFailed", (n) => {
      this.#n.setValue(!1), this.#a.setValue("");
    }), this.#t.on("crawlCancelled", () => {
      this.#n.setValue(!1), this.#a.setValue("");
    }), this.#t.on("pageEnrichStarted", (n) => {
      this.#r.setValue(n);
    }), this.#t.on("pageEnrichCompleted", (n) => {
      this.#r.setValue("");
    }), this.#t.on("pageEnrichFailed", (n) => {
      this.#r.setValue("");
    }), this.#t.start().then(async () => {
      try {
        const { data: n } = await pe.getCrawlStatus();
        n && (this.#n.setValue(n.isRunning), this.#a.setValue(n.phase ?? ""), n.results?.length && this.#s.setValue(n.results));
      } catch {
      }
    }).catch((n) => console.error("Content Audit SignalR connection failed", n)), this.#t.onreconnected(async () => {
      try {
        const { data: n } = await pe.getCrawlStatus();
        n && (this.#n.setValue(n.isRunning), this.#a.setValue(n.phase ?? ""), n.results?.length && this.#s.setValue(n.results));
      } catch {
      }
    });
  }
  hostDisconnected() {
    super.hostDisconnected(), this.#t?.stop(), this.#t = void 0;
  }
  async #o(e) {
    (await this.getContext(Hn))?.peek("danger", {
      data: { headline: "Content Audit", message: e }
    });
  }
  async getLatestAuditOverview() {
    const { data: e, error: a } = await this.#e.getLatestAuditOverview();
    e ? this.#i.setValue(e) : a && this.#o("Failed to load latest audit overview.");
  }
  async getAuditOverviews() {
    const { data: e, error: a } = await this.#e.getAuditOverviews();
    if (e && e.items) {
      const i = e.items.sort((n, s) => {
        const o = n.runDate ? new Date(n.runDate).getTime() : 0;
        return (s.runDate ? new Date(s.runDate).getTime() : 0) - o;
      });
      this.#l.setValue(i);
    } else a && this.#o("Failed to load audit history.");
  }
  async getPagesWithMissingMetadata() {
    const { data: e, error: a } = await this.#e.getPagesWithMissingMetadata();
    e ? this.#c.setValue(e.items) : a && this.#o("Failed to load pages with missing metadata.");
  }
  async getTopIssues() {
    const { data: e, error: a } = await this.#e.getTopIssues();
    e ? this.#u.setValue(e.items) : a && this.#o("Failed to load top issues.");
  }
  async getHealthScore() {
    const { data: e, error: a } = await this.#e.getHealthScore();
    e ? this.#d.setValue(e) : a && this.#o("Failed to load health score.");
  }
  async startCrawl() {
    return pe.startCrawl();
  }
  async cancelCrawl() {
    return pe.cancelCrawl();
  }
  async getSettings() {
    const { data: e, error: a } = await this.#e.getSettings();
    e ? this.#m.setValue(e) : a && this.#o("Failed to load settings.");
  }
}
const $a = new qn(
  "ContentAuditContext"
), Ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: $a,
  ContentAuditContext: Xe,
  default: Xe
}, Symbol.toStringTag, { value: "Module" }));
const Di = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
const he = globalThis, Qe = he.ShadowRoot && (he.ShadyCSS === void 0 || he.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pa = /* @__PURE__ */ Symbol(), Pt = /* @__PURE__ */ new WeakMap();
let Vi = class {
  constructor(e, a, i) {
    if (this._$cssResult$ = !0, i !== Pa) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = a;
  }
  get styleSheet() {
    let e = this.o;
    const a = this.t;
    if (Qe && e === void 0) {
      const i = a !== void 0 && a.length === 1;
      i && (e = Pt.get(a)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Pt.set(a, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ui = (t) => new Vi(typeof t == "string" ? t : t + "", void 0, Pa), Ri = (t, e) => {
  if (Qe) t.adoptedStyleSheets = e.map(((a) => a instanceof CSSStyleSheet ? a : a.styleSheet));
  else for (const a of e) {
    const i = document.createElement("style"), n = he.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = a.cssText, t.appendChild(i);
  }
}, kt = Qe ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const i of e.cssRules) a += i.cssText;
  return Ui(a);
})(t) : t;
const { is: Wi, defineProperty: xi, getOwnPropertyDescriptor: Mi, getOwnPropertyNames: ji, getOwnPropertySymbols: Bi, getPrototypeOf: zi } = Object, ke = globalThis, Lt = ke.trustedTypes, qi = Lt ? Lt.emptyScript : "", Yi = ke.reactiveElementPolyfillSupport, Q = (t, e) => t, Je = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? qi : null;
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
} }, ka = (t, e) => !Wi(t, e), Nt = { attribute: !0, type: String, converter: Je, reflect: !1, useDefault: !1, hasChanged: ka };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ke.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class J extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, a = Nt) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(e, a), !a.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, a);
      n !== void 0 && xi(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, a, i) {
    const { get: n, set: s } = Mi(this.prototype, e) ?? { get() {
      return this[a];
    }, set(o) {
      this[a] = o;
    } };
    return { get: n, set(o) {
      const r = n?.call(this);
      s?.call(this, o), this.requestUpdate(e, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Q("elementProperties"))) return;
    const e = zi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Q("properties"))) {
      const a = this.properties, i = [...ji(a), ...Bi(a)];
      for (const n of i) this.createProperty(n, a[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const a = litPropertyMetadata.get(e);
      if (a !== void 0) for (const [i, n] of a) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [a, i] of this.elementProperties) {
      const n = this._$Eu(a, i);
      n !== void 0 && this._$Eh.set(n, a);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const a = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) a.unshift(kt(n));
    } else e !== void 0 && a.push(kt(e));
    return a;
  }
  static _$Eu(e, a) {
    const i = a.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((e) => this.enableUpdating = e)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((e) => e(this)));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), a = this.constructor.elementProperties;
    for (const i of a.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ri(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((e) => e.hostConnected?.()));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((e) => e.hostDisconnected?.()));
  }
  attributeChangedCallback(e, a, i) {
    this._$AK(e, i);
  }
  _$ET(e, a) {
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Je).toAttribute(a, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, a) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Je;
      this._$Em = n, this[n] = o.fromAttribute(a, s.type) ?? this._$Ej?.get(n) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, a, i) {
    if (e !== void 0) {
      const n = this.constructor, s = this[e];
      if (i ??= n.getPropertyOptions(e), !((i.hasChanged ?? ka)(s, a) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, a, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, a, { useDefault: i, reflect: n, wrapped: s }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? a ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (a = void 0), this._$AL.set(e, a)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, s] of this._$Ep) this[n] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, s] of i) {
        const { wrapped: o } = s, r = this[n];
        o !== !0 || this._$AL.has(n) || r === void 0 || this.C(n, void 0, s, r);
      }
    }
    let e = !1;
    const a = this._$AL;
    try {
      e = this.shouldUpdate(a), e ? (this.willUpdate(a), this._$EO?.forEach(((i) => i.hostUpdate?.())), this.update(a)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(a);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach(((a) => a.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach(((a) => this._$ET(a, this[a]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[Q("elementProperties")] = /* @__PURE__ */ new Map(), J[Q("finalized")] = /* @__PURE__ */ new Map(), Yi?.({ ReactiveElement: J }), (ke.reactiveElementVersions ??= []).push("2.1.0");
var Fi = Object.getOwnPropertyDescriptor, Hi = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Fi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = o(n) || n);
  return n;
};
let ye = class extends C {
  constructor() {
    super(), this._workspaceContext = new Xe(this);
  }
  render() {
    return d`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
ye = Hi([
  Di("content-audit-workspace-root")
], ye);
const Ki = ye, Gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return ye;
  },
  default: Ki
}, Symbol.toStringTag, { value: "Module" })), M = "ContentAudit.Menu", Le = "ContentAudit.Menu.Metadata", Ne = "ContentAudit.Menu.Performance", Ze = "ContentAudit.Menu.Tools", et = "ContentAudit.Collection.Issues", Xi = "ContentAudit.CollectionView.Issues.Table", La = "ContentAudit.Repository.IssuesCollection";
class Ji {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getCollection(e) {
    const { data: a, error: i } = await q(this.#e, Oa.getAllIssues({ query: e }));
    if (i)
      return { error: i };
    if (!a)
      return { data: { items: [], total: 0 } };
    const { items: n, total: s } = a;
    return { data: { items: n, total: s } };
  }
}
class Dt extends Xn {
  #e;
  constructor(e) {
    super(e), this.#e = new Ji(e);
  }
  async requestCollection(e) {
    return this.#e.getCollection(e);
  }
}
const Qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: Dt,
  default: Dt
}, Symbol.toStringTag, { value: "Module" }));
var Zi = Object.defineProperty, es = Object.getOwnPropertyDescriptor, Na = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? es(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Zi(e, a, n), n;
};
let Te = class extends C {
  render() {
    return this.value ? d`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : ha;
  }
};
Te.styles = [
  Jn,
  b`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
Na([
  x({ attribute: !1 })
], Te.prototype, "value", 2);
Te = Na([
  f("content-audit-issues-table-name-column-layout")
], Te);
var ts = Object.defineProperty, as = Object.getOwnPropertyDescriptor, Da = (t) => {
  throw TypeError(t);
}, Y = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? as(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && ts(e, a, n), n;
}, tt = (t, e, a) => e.has(t) || Da("Cannot " + a), Vt = (t, e, a) => (tt(t, e, "read from private field"), e.get(t)), Ut = (t, e, a) => e.has(t) ? Da("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), ns = (t, e, a, i) => (tt(t, e, "write to private field"), e.set(t, a), a), Ce = (t, e, a) => (tt(t, e, "access private method"), a), ee, H, Va, at, Ua;
let I = class extends C {
  constructor() {
    super(), Ut(this, H), this.data = [], this.hideSummary = !1, this._issues = [], this._tableConfig = {
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
    ], this._tableItems = [], Ut(this, ee), this.consumeContext($, (t) => {
      ns(this, ee, t), Ce(this, H, Va).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && (this._issues = this.data, Ce(this, H, at).call(this, this.data));
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
                ${Ce(this, H, Ua).call(this)}
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ee = /* @__PURE__ */ new WeakMap();
H = /* @__PURE__ */ new WeakSet();
Va = function() {
  Vt(this, ee) && this.observe(Vt(this, ee).items, (t) => {
    this._issues = t, Ce(this, H, at).call(this, t);
  }, "umbCollectionItemsObserver");
};
at = function(t) {
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
        value: d`<content-audit-issue-type-label .type=${e.type}></content-audit-issue-type-label>`
      },
      {
        columnAlias: "priority",
        value: d`<content-audit-priority-type-label .type=${e.priority}></content-audit-priority-type-label>`
      },
      {
        columnAlias: "numberOfUrls",
        value: e.numberOfUrls
      },
      {
        columnAlias: "percentOfTotal",
        value: `${e.percentOfTotal?.toFixed(0)}%`
      }
    ]
  }));
};
Ua = function() {
  if (!this._issues.length || this.hideSummary) return;
  const t = this._issues.filter((i) => i.priority === "High").length, e = this._issues.filter((i) => i.priority === "Medium").length, a = this._issues.filter((i) => i.priority === "Low").length;
  return d`
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
I.styles = [
  b`
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
                font-size: var(--uui-type-default-size);
                color: var(--uui-color-text-alt);
            }

            .summary-value {
                font-size: var(--uui-type-h4-size);
                font-weight: 700;
                color: var(--uui-color-text);
            }
		`
];
Y([
  x({ type: Array, attribute: !1 })
], I.prototype, "data", 2);
Y([
  x({ type: Boolean, attribute: "hide-summary" })
], I.prototype, "hideSummary", 2);
Y([
  m()
], I.prototype, "_issues", 2);
Y([
  m()
], I.prototype, "_tableConfig", 2);
Y([
  m()
], I.prototype, "_tableColumns", 2);
Y([
  m()
], I.prototype, "_tableItems", 2);
I = Y([
  f("content-audit-issues-table-collection-view")
], I);
const is = I, ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return I;
  },
  default: is
}, Symbol.toStringTag, { value: "Module" })), nt = "ContentAudit.Collection.Audits", os = "ContentAudit.CollectionView.Audits.Table", Ra = "ContentAudit.Repository.AuditsCollection", rs = [
  {
    type: "repository",
    alias: Ra,
    name: "Audits Collection Repository",
    api: () => import("./audits-collection.repository-2R9F_ga9.js")
  }
], ls = [
  {
    type: "collectionView",
    alias: os,
    name: "Audits Table Collection View",
    js: () => import("./audits-table-collection-view.element-Co0NIkH9.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: nt
      }
    ]
  }
], cs = [
  {
    type: "collection",
    kind: "default",
    alias: nt,
    name: "Audits Collection",
    element: () => import("./audits.element-CQMJCtGh.js"),
    meta: {
      repositoryAlias: Ra
    }
  },
  ...rs,
  ...ls
], Wa = "audits", xa = "audits-root", us = [
  {
    type: "entityAction",
    kind: "default",
    alias: "ContentAudit.EntityAction.Audit.Delete",
    name: "Delete Audit Entity Action",
    weight: 100,
    api: () => import("./delete-audit.action-dfQVfTxE.js"),
    forEntityTypes: [Wa],
    meta: {
      icon: "icon-trash",
      label: "Delete"
    }
  }
], Z = "ContentAudit.Workspace.Audits", Fe = "ContentAudit.MenuItem.Audits", Rt = "ContentAudit.Workspace.AuditsRoot", ds = [
  {
    type: "menuItem",
    kind: "tree",
    alias: Fe,
    name: "Audits Menu Item",
    weight: 12e3,
    meta: {
      label: "Audits",
      icon: "icon-browser-window",
      treeAlias: "ContentAudit.Tree.Audits",
      menus: [M]
    }
  },
  {
    type: "workspaceContext",
    kind: "menuStructure",
    alias: "ContentAudit.Context.Audits.Menu.Structure",
    name: "Content Audit Audits Menu Structure Workspace Context",
    api: () => import("./audits-menu-structure.context-BSWiqkie.js"),
    meta: {
      menuItemAlias: Fe
    },
    conditions: [
      {
        alias: g,
        match: Z
      }
    ]
  },
  {
    type: "workspaceFooterApp",
    kind: "menuBreadcrumb",
    alias: "ContentAudit.WorkspaceFooterApp.Audits.Breadcrumb",
    name: "Content Audit Audits Breadcrumb Workspace Footer App",
    conditions: [
      {
        alias: g,
        match: Z
      }
    ]
  },
  {
    type: "workspaceContext",
    kind: "menuStructure",
    alias: "ContentAudit.Context.AuditsRoot.Menu.Structure",
    name: "Content Audit Audits Root Menu Structure Workspace Context",
    api: () => import("./audits-menu-structure.context-BSWiqkie.js"),
    meta: {
      menuItemAlias: Fe
    },
    conditions: [
      {
        alias: g,
        match: Rt
      }
    ]
  },
  {
    type: "workspaceFooterApp",
    kind: "menuBreadcrumb",
    alias: "ContentAudit.WorkspaceFooterApp.AuditsRoot.Breadcrumb",
    name: "Content Audit Audits Root Breadcrumb Workspace Footer App",
    conditions: [
      {
        alias: g,
        match: Rt
      }
    ]
  }
], ms = [
  {
    type: "repository",
    alias: "ContentAudit.Repository.Audits",
    name: "Content Audit Audits Repository",
    api: () => import("./audits-tree.repository-DdwOEDA5.js")
  },
  {
    type: "tree",
    kind: "default",
    alias: "ContentAudit.Tree.Audits",
    name: "Content Audit Audits Tree",
    meta: {
      repositoryAlias: "ContentAudit.Repository.Audits"
    }
  },
  {
    type: "treeItem",
    kind: "default",
    alias: "ContentAudit.TreeItem.Audits",
    name: "Content Audit Audits Tree Item",
    forEntityTypes: [Wa, xa]
  }
], ps = [
  {
    type: "workspace",
    kind: "routable",
    alias: Z,
    name: "Audits Workspace",
    api: () => import("./audits-workspace.context-D-uzq7_r.js"),
    meta: {
      entityType: "audits"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Audits.Overview",
    name: "Audits Workspace Overview View",
    js: () => import("./audits-overview-workspace-view.element-CJJjnOL5.js"),
    weight: 100,
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-dashboard"
    },
    conditions: [
      {
        alias: g,
        match: Z
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Audits.Issues",
    name: "Audits Workspace Issues View",
    js: () => import("./audits-issues-workspace-view.element-4tXUJWOP.js"),
    weight: 80,
    meta: {
      label: "Issues",
      pathname: "issues",
      icon: "icon-alert"
    },
    conditions: [
      {
        alias: g,
        match: Z
      }
    ]
  }
], Wt = "ContentAudit.Workspace.AuditsRoot", hs = [
  {
    type: "workspace",
    kind: "default",
    alias: Wt,
    name: "Audits Root Workspace",
    meta: {
      entityType: xa,
      headline: "Audits"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.Audits.Collection",
    name: "Content Audit Audits Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: nt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Wt
      }
    ]
  }
], Cs = [
  ...ps,
  ...hs
], _s = [
  ...cs,
  ...us,
  ...ds,
  ...ms,
  ...Cs
], Ma = "all-pages-root", fs = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: Ma,
    menus: [M]
  }
}, As = [fs], xt = "ContentAudit.Workspace.AllPagesRoot", F = "ContentAudit.Workspace.AllPages", bs = [
  {
    type: "workspace",
    kind: "routable",
    alias: F,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-BrAZe60s.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-Dbs1KRw_.js"),
    weight: 100,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "info"
    },
    conditions: [
      {
        alias: g,
        match: F
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Links",
    name: "All Pages Workspace Links View",
    js: () => import("./all-pages-links-workspace-view.element-RUbTGGdN.js"),
    weight: 90,
    meta: {
      label: "Links",
      pathname: "links",
      icon: "link"
    },
    conditions: [
      {
        alias: g,
        match: F
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Images",
    name: "All Pages Workspace Images View",
    js: () => import("./all-pages-images-workspace-view.element-DgbKUZww.js"),
    weight: 80,
    meta: {
      label: "Images",
      pathname: "images",
      icon: "picture"
    },
    conditions: [
      {
        alias: g,
        match: F
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Resources",
    name: "All Pages Workspace Resources View",
    js: () => import("./all-pages-resources-workspace-view.element-16Fr7o6v.js"),
    weight: 70,
    meta: {
      label: "Resources",
      pathname: "resources",
      icon: "icon-script"
    },
    conditions: [
      {
        alias: g,
        match: F
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Issues",
    name: "All Pages Workspace Issues View",
    js: () => import("./all-pages-issues-workspace-view.element-CE6vxFPD.js"),
    weight: 60,
    meta: {
      label: "Issues",
      pathname: "issues",
      icon: "alert"
    },
    conditions: [
      {
        alias: g,
        match: F
      }
    ]
  }
], it = "ContentAudit.Collection.AllPages", ys = "ContentAudit.CollectionView.AllPages.Table", ja = "ContentAudit.Repository.AllPagesCollection";
var Ts = Object.defineProperty, gs = Object.getOwnPropertyDescriptor, Ba = (t) => {
  throw TypeError(t);
}, De = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? gs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Ts(e, a, n), n;
}, st = (t, e, a) => e.has(t) || Ba("Cannot " + a), Mt = (t, e, a) => (st(t, e, "read from private field"), e.get(t)), jt = (t, e, a) => e.has(t) ? Ba("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), vs = (t, e, a, i) => (st(t, e, "write to private field"), e.set(t, a), a), za = (t, e, a) => (st(t, e, "access private method"), a), te, ge, qa, Ya;
let P = class extends C {
  constructor() {
    super(), jt(this, ge), this._tableConfig = {
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
    ], this._tableItems = [], jt(this, te), this.consumeContext($, (t) => {
      vs(this, te, t), za(this, ge, qa).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
te = /* @__PURE__ */ new WeakMap();
ge = /* @__PURE__ */ new WeakSet();
qa = function() {
  Mt(this, te) && this.observe(Mt(this, te).items, (t) => za(this, ge, Ya).call(this, t), "umbCollectionItemsObserver");
};
Ya = function(t) {
  this._tableItems = t.map((e) => ({
    id: e?.unique,
    entityType: e?.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${e.pageData?.url}</a>`
      },
      {
        columnAlias: "contentType",
        value: e.contentType
      },
      {
        columnAlias: "statusCode",
        value: d`<content-audit-status-code-label .statusCode=${e.pageData?.statusCode}></content-audit-status-code-label>`
      },
      {
        columnAlias: "redirect",
        value: e.pageData.redirect ? "Yes" : "No"
      }
    ]
  }));
};
P.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
De([
  m()
], P.prototype, "_tableConfig", 2);
De([
  m()
], P.prototype, "_tableColumns", 2);
De([
  m()
], P.prototype, "_tableItems", 2);
P = De([
  f("content-audit-all-pages-table-collection-view")
], P);
const ws = P, Is = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return P;
  },
  default: ws
}, Symbol.toStringTag, { value: "Module" })), Os = [
  {
    type: "workspace",
    kind: "default",
    alias: xt,
    name: "All Pages Root Workspace",
    meta: {
      entityType: Ma,
      headline: "All Pages"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.AllPages.Collection",
    name: "Content Audit All Pages Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: it
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: xt
      }
    ]
  }
], Es = [...bs, ...Os], Ss = [
  {
    type: "repository",
    alias: ja,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-DRxTOpOG.js")
  }
], $s = [
  {
    type: "collectionView",
    alias: ys,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => Is),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: it
      }
    ]
  }
], Ps = [
  {
    type: "collection",
    kind: "default",
    alias: it,
    name: "All Pages Collection",
    element: () => import("./all-pages.element-DMHaFpCF.js"),
    meta: {
      repositoryAlias: ja
    }
  },
  ...Ss,
  ...$s
], ks = "ContentAudit.Repository.AllPages.Detail", Ls = "ContentAudit.Store.AllPages.Detail", Ns = [
  {
    type: "repository",
    alias: ks,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository-BYTCg9Qr.js")
  },
  {
    type: "store",
    alias: Ls,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], Ds = [...Ns], Vs = [
  ...Es,
  ...As,
  ...Ps,
  ...Ds
], Fa = "issues-root", Us = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: Fa,
    menus: [M]
  }
}, Rs = [Us], Bt = "ContentAudit.Workspace.IssuesRoot", zt = "ContentAudit.Workspace.Issues", Ws = [
  {
    type: "workspace",
    kind: "routable",
    alias: zt,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-CJ9aJjVA.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-BmIVMqYZ.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: g,
        match: zt
      }
    ]
  }
], xs = [
  {
    type: "workspace",
    kind: "default",
    alias: Bt,
    name: "Issues Root Workspace",
    meta: {
      entityType: Fa,
      headline: "Issues"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.Issues.Collection",
    name: "Content Audit Issues Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: et
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Bt
      }
    ]
  }
], Ms = [...Ws, ...xs], js = [
  {
    type: "repository",
    alias: La,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => Qi)
  }
], Bs = [
  {
    type: "collectionView",
    alias: Xi,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => ss),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: et
      }
    ]
  }
], zs = [
  {
    type: "collection",
    kind: "default",
    alias: et,
    name: "Issues Collection",
    element: () => import("./issues.element-DJRmm4jS.js"),
    meta: {
      repositoryAlias: La
    }
  },
  ...js,
  ...Bs
], qs = "ContentAudit.Repository.Issues.Detail", Ys = "ContentAudit.Store.Issues.Detail", Fs = [
  {
    type: "repository",
    alias: qs,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-BZ3sgLaI.js")
  },
  {
    type: "store",
    alias: Ys,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], Hs = [...Fs], Ks = [
  ...Ms,
  ...Rs,
  ...zs,
  ...Hs
], Ha = "status-codes-root", Gs = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: Ha,
    menus: [M]
  }
}, Xs = [Gs], ot = "ContentAudit.Collection.StatusCodes", Js = "ContentAudit.CollectionView.StatusCodes.Table", Ka = "ContentAudit.Repository.StatusCodesCollection";
var Qs = Object.defineProperty, Zs = Object.getOwnPropertyDescriptor, Ga = (t) => {
  throw TypeError(t);
}, Ve = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Zs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Qs(e, a, n), n;
}, rt = (t, e, a) => e.has(t) || Ga("Cannot " + a), qt = (t, e, a) => (rt(t, e, "read from private field"), e.get(t)), Yt = (t, e, a) => e.has(t) ? Ga("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), eo = (t, e, a, i) => (rt(t, e, "write to private field"), e.set(t, a), a), Xa = (t, e, a) => (rt(t, e, "access private method"), a), ae, ve, Ja, Qa;
let k = class extends C {
  constructor() {
    super(), Yt(this, ve), this._tableConfig = {
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
    ], this._tableItems = [], Yt(this, ae), this.consumeContext($, (t) => {
      eo(this, ae, t), Xa(this, ve, Ja).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ae = /* @__PURE__ */ new WeakMap();
ve = /* @__PURE__ */ new WeakSet();
Ja = function() {
  qt(this, ae) && this.observe(qt(this, ae).items, (t) => Xa(this, ve, Qa).call(this, t), "umbCollectionItemsObserver");
};
Qa = function(t) {
  this._tableItems = t.map((e) => ({
    id: e?.unique,
    entityType: e?.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${e.pageData?.url}</a>`
      },
      {
        columnAlias: "contentType",
        value: e.contentType
      },
      {
        columnAlias: "statusCode",
        value: d`<content-audit-status-code-label .statusCode=${e.pageData?.statusCode}></content-audit-status-code-label>`
      }
    ]
  }));
};
k.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ve([
  m()
], k.prototype, "_tableConfig", 2);
Ve([
  m()
], k.prototype, "_tableColumns", 2);
Ve([
  m()
], k.prototype, "_tableItems", 2);
k = Ve([
  f("content-audit-status-codes-table-collection-view")
], k);
const to = k, ao = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return k;
  },
  default: to
}, Symbol.toStringTag, { value: "Module" })), Ft = "ContentAudit.Workspace.StatusCodes", no = [
  {
    type: "workspace",
    kind: "default",
    alias: Ft,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: Ha,
      headline: "Status Codes"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.StatusCodes.Collection",
    name: "Content Audit Status Codes Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: ot
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ft
      }
    ]
  }
], io = [
  {
    type: "repository",
    alias: Ka,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-BRbmbKD1.js")
  }
], so = [
  {
    type: "collectionView",
    alias: Js,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => ao),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: ot
      }
    ]
  }
], oo = [
  {
    type: "collection",
    kind: "default",
    alias: ot,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-BlFn5RV3.js"),
    meta: {
      repositoryAlias: Ka
    }
  },
  ...io,
  ...so
], ro = [
  ...no,
  ...Xs,
  ...oo
], Za = "orphaned-pages-root", lo = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: Za,
    menus: [Le]
  }
}, co = [lo], lt = "ContentAudit.Collection.OrphanedPages", uo = "ContentAudit.CollectionView.OrphanedPages.Table", en = "ContentAudit.Repository.OrphanedPagesCollection";
var mo = Object.defineProperty, po = Object.getOwnPropertyDescriptor, tn = (t) => {
  throw TypeError(t);
}, Ue = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? po(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && mo(e, a, n), n;
}, ct = (t, e, a) => e.has(t) || tn("Cannot " + a), Ht = (t, e, a) => (ct(t, e, "read from private field"), e.get(t)), Kt = (t, e, a) => e.has(t) ? tn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), ho = (t, e, a, i) => (ct(t, e, "write to private field"), e.set(t, a), a), an = (t, e, a) => (ct(t, e, "access private method"), a), ne, we, nn, sn;
let L = class extends C {
  constructor() {
    super(), Kt(this, we), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], Kt(this, ne), this.consumeContext($, (t) => {
      ho(this, ne, t), an(this, we, nn).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ne = /* @__PURE__ */ new WeakMap();
we = /* @__PURE__ */ new WeakSet();
nn = function() {
  Ht(this, ne) && this.observe(Ht(this, ne).items, (t) => an(this, we, sn).call(this, t), "umbCollectionItemsObserver");
};
sn = function(t) {
  this._tableItems = t.map((e) => ({
    id: e.unique,
    entityType: e.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${e.url}</a>`
      }
    ]
  }));
};
L.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ue([
  m()
], L.prototype, "_tableConfig", 2);
Ue([
  m()
], L.prototype, "_tableColumns", 2);
Ue([
  m()
], L.prototype, "_tableItems", 2);
L = Ue([
  f("content-audit-orphaned-pages-table-collection-view")
], L);
const Co = L, _o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return L;
  },
  default: Co
}, Symbol.toStringTag, { value: "Module" })), Gt = "ContentAudit.Workspace.OrphanedPages", fo = [
  {
    type: "workspace",
    kind: "default",
    alias: Gt,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: Za,
      headline: "Orphaned Pages"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.OrphanedPages.Collection",
    name: "Content Audit Orphaned Pages Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: lt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Gt
      }
    ]
  }
], Ao = [
  {
    type: "repository",
    alias: en,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-Bja4agID.js")
  }
], bo = [
  {
    type: "collectionView",
    alias: uo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => _o),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: lt
      }
    ]
  }
], yo = [
  {
    type: "collection",
    kind: "default",
    alias: lt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-Do5cxEeH.js"),
    meta: {
      repositoryAlias: en
    }
  },
  ...Ao,
  ...bo
], To = [
  ...fo,
  ...co,
  ...yo
], on = "images-alt-text-root", go = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: on,
    menus: [Le]
  }
}, vo = [go], ut = "ContentAudit.Collection.ImagesAltText", wo = "ContentAudit.CollectionView.ImagesAltText.Table", rn = "ContentAudit.Repository.ImagesAltTextCollection";
var Io = Object.defineProperty, Oo = Object.getOwnPropertyDescriptor, ln = (t) => {
  throw TypeError(t);
}, Re = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Oo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Io(e, a, n), n;
}, dt = (t, e, a) => e.has(t) || ln("Cannot " + a), Xt = (t, e, a) => (dt(t, e, "read from private field"), e.get(t)), Jt = (t, e, a) => e.has(t) ? ln("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Eo = (t, e, a, i) => (dt(t, e, "write to private field"), e.set(t, a), a), cn = (t, e, a) => (dt(t, e, "access private method"), a), ie, Ie, un, dn;
let N = class extends C {
  constructor() {
    super(), Jt(this, Ie), this._tableConfig = {
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
    ], this._tableItems = [], Jt(this, ie), this.consumeContext($, (t) => {
      Eo(this, ie, t), cn(this, Ie, un).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ie = /* @__PURE__ */ new WeakMap();
Ie = /* @__PURE__ */ new WeakSet();
un = function() {
  Xt(this, ie) && this.observe(Xt(this, ie).items, (t) => cn(this, Ie, dn).call(this, t), "umbCollectionItemsObserver");
};
dn = function(t) {
  this._tableItems = t.map((e) => ({
    id: e.unique,
    entityType: e.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: e.url
      },
      {
        columnAlias: "foundPage",
        value: d`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${e.foundPage}</a>`
      },
      {
        columnAlias: "altText",
        value: e.altText
      }
    ]
  }));
};
N.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Re([
  m()
], N.prototype, "_tableConfig", 2);
Re([
  m()
], N.prototype, "_tableColumns", 2);
Re([
  m()
], N.prototype, "_tableItems", 2);
N = Re([
  f("content-audit-images-alt-text-table-collection-view")
], N);
const So = N, $o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return N;
  },
  default: So
}, Symbol.toStringTag, { value: "Module" })), Qt = "ContentAudit.Workspace.ImagesAltText", Po = [
  {
    type: "workspace",
    kind: "default",
    alias: Qt,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: on,
      headline: "Image Alt Text"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.ImagesAltText.Collection",
    name: "Content Audit Images Alt Text Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: ut
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Qt
      }
    ]
  }
], ko = [
  {
    type: "repository",
    alias: rn,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-DNVGmqm7.js")
  }
], Lo = [
  {
    type: "collectionView",
    alias: wo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => $o),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: ut
      }
    ]
  }
], No = [
  {
    type: "collection",
    kind: "default",
    alias: ut,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DzMGILfL.js"),
    meta: {
      repositoryAlias: rn
    }
  },
  ...ko,
  ...Lo
], Do = [
  ...Po,
  ...vo,
  ...No
], mn = "outbound-links-root", Vo = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: mn,
    menus: [M]
  }
}, Uo = [Vo], mt = "ContentAudit.Collection.OutboundLinks", Ro = "ContentAudit.CollectionView.OutboundLinks.Table", pn = "ContentAudit.Repository.OutboundLinksCollection";
var Wo = Object.defineProperty, xo = Object.getOwnPropertyDescriptor, hn = (t) => {
  throw TypeError(t);
}, We = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? xo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Wo(e, a, n), n;
}, pt = (t, e, a) => e.has(t) || hn("Cannot " + a), Zt = (t, e, a) => (pt(t, e, "read from private field"), e.get(t)), ea = (t, e, a) => e.has(t) ? hn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Mo = (t, e, a, i) => (pt(t, e, "write to private field"), e.set(t, a), a), Cn = (t, e, a) => (pt(t, e, "access private method"), a), se, Oe, _n, fn;
let D = class extends C {
  constructor() {
    super(), ea(this, Oe), this._tableConfig = {
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
    ], this._tableItems = [], ea(this, se), this.consumeContext($, (t) => {
      Mo(this, se, t), Cn(this, Oe, _n).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
se = /* @__PURE__ */ new WeakMap();
Oe = /* @__PURE__ */ new WeakSet();
_n = function() {
  Zt(this, se) && this.observe(Zt(this, se).items, (t) => Cn(this, Oe, fn).call(this, t), "umbCollectionItemsObserver");
};
fn = function(t) {
  this._tableItems = t.map((e) => ({
    id: e.unique,
    data: [
      {
        columnAlias: "url",
        value: d`<a href="${e.url}" target="_blank">${e.url}</a>`
      },
      {
        columnAlias: "statusCode",
        value: d`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
      },
      {
        columnAlias: "contentType",
        value: e.contentType
      },
      {
        columnAlias: "outlinks",
        value: e.linkCount
      }
    ]
  }));
};
D.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
We([
  m()
], D.prototype, "_tableConfig", 2);
We([
  m()
], D.prototype, "_tableColumns", 2);
We([
  m()
], D.prototype, "_tableItems", 2);
D = We([
  f("content-audit-outbound-links-table-collection-view")
], D);
const jo = D, Bo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return D;
  },
  default: jo
}, Symbol.toStringTag, { value: "Module" })), ta = "ContentAudit.Workspace.OutboundLinks", zo = [
  {
    type: "workspace",
    kind: "default",
    alias: ta,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: mn,
      headline: "Outbound Links"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.OutboundLinks.Collection",
    name: "Content Audit Outbound Links Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: mt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ta
      }
    ]
  }
], qo = [
  {
    type: "repository",
    alias: pn,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-DURCQ679.js")
  }
], Yo = [
  {
    type: "collectionView",
    alias: Ro,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => Bo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: mt
      }
    ]
  }
], Fo = [
  {
    type: "collection",
    kind: "default",
    alias: mt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-Chz_6Fpj.js"),
    meta: {
      repositoryAlias: pn
    }
  },
  ...qo,
  ...Yo
], Ho = [
  ...zo,
  ...Uo,
  ...Fo
], An = "inbound-links-root", Ko = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: An,
    menus: [M]
  }
}, Go = [Ko], ht = "ContentAudit.Collection.InboundLinks", Xo = "ContentAudit.CollectionView.InboundLinks.Table", bn = "ContentAudit.Repository.InboundLinksCollection";
var Jo = Object.defineProperty, Qo = Object.getOwnPropertyDescriptor, yn = (t) => {
  throw TypeError(t);
}, xe = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Qo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Jo(e, a, n), n;
}, Ct = (t, e, a) => e.has(t) || yn("Cannot " + a), aa = (t, e, a) => (Ct(t, e, "read from private field"), e.get(t)), na = (t, e, a) => e.has(t) ? yn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Zo = (t, e, a, i) => (Ct(t, e, "write to private field"), e.set(t, a), a), Tn = (t, e, a) => (Ct(t, e, "access private method"), a), oe, Ee, gn, vn;
let V = class extends C {
  constructor() {
    super(), na(this, Ee), this._tableConfig = {
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
    ], this._tableItems = [], na(this, oe), this.consumeContext($, (t) => {
      Zo(this, oe, t), Tn(this, Ee, gn).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
oe = /* @__PURE__ */ new WeakMap();
Ee = /* @__PURE__ */ new WeakSet();
gn = function() {
  aa(this, oe) && this.observe(aa(this, oe).items, (t) => Tn(this, Ee, vn).call(this, t), "umbCollectionItemsObserver");
};
vn = function(t) {
  this._tableItems = t.map((e) => ({
    id: e.unique,
    data: [
      {
        columnAlias: "url",
        value: d`<a href="${e.url}" target="_blank">${e.url}</a>`
      },
      {
        columnAlias: "statusCode",
        value: d`<content-audit-status-code-label .statusCode=${e.statusCode}></content-audit-status-code-label>`
      },
      {
        columnAlias: "contentType",
        value: e.contentType
      },
      {
        columnAlias: "inlinks",
        value: e.linkCount
      }
    ]
  }));
};
V.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
xe([
  m()
], V.prototype, "_tableConfig", 2);
xe([
  m()
], V.prototype, "_tableColumns", 2);
xe([
  m()
], V.prototype, "_tableItems", 2);
V = xe([
  f("content-audit-inbound-links-table-collection-view")
], V);
const er = V, tr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return V;
  },
  default: er
}, Symbol.toStringTag, { value: "Module" })), ia = "ContentAudit.Workspace.InboundLinks", ar = [
  {
    type: "workspace",
    kind: "default",
    alias: ia,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: An,
      headline: "Inbound Links"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.InboundLinks.Collection",
    name: "Content Audit Inbound Links Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: ht
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ia
      }
    ]
  }
], nr = [
  {
    type: "repository",
    alias: bn,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-CXyHqYab.js")
  }
], ir = [
  {
    type: "collectionView",
    alias: Xo,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => tr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: ht
      }
    ]
  }
], sr = [
  {
    type: "collection",
    kind: "default",
    alias: ht,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-K3WRdCsX.js"),
    meta: {
      repositoryAlias: bn
    }
  },
  ...nr,
  ...ir
], or = [
  ...ar,
  ...Go,
  ...sr
], wn = "metadata-root", rr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: wn,
    menus: ["ContentAudit.Menu.Metadata"]
  }
}, lr = [rr], _t = "ContentAudit.Collection.Metadata", cr = "ContentAudit.CollectionView.Metadata.Table", sa = "ContentAudit.Workspace.Metadata", ur = [
  {
    type: "workspace",
    kind: "default",
    alias: sa,
    name: "Metadata Root Workspace",
    meta: {
      entityType: wn,
      headline: "Metadata"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.Metadata.Collection",
    name: "Content Audit Metadata Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: _t
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: sa
      }
    ]
  }
], In = "ContentAudit.Repository.MetadataCollection", dr = [
  {
    type: "repository",
    alias: In,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-CHYHzQXZ.js")
  }
], mr = [
  {
    type: "collectionView",
    alias: cr,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element-KWo_jKqg.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: _t
      }
    ]
  }
], pr = [
  {
    type: "collection",
    kind: "default",
    alias: _t,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: In
    }
  },
  ...dr,
  ...mr
], hr = [
  ...ur,
  ...lr,
  ...pr
], Cr = [], ft = "ContentAudit.Collection.DuplicateContent", _r = "ContentAudit.CollectionView.DuplicateContent.Table", On = "ContentAudit.Repository.DuplicateContentCollection";
var fr = Object.defineProperty, Ar = Object.getOwnPropertyDescriptor, Me = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ar(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && fr(e, a, n), n;
};
let U = class extends C {
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
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
U.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Me([
  m()
], U.prototype, "_tableConfig", 2);
Me([
  m()
], U.prototype, "_tableColumns", 2);
Me([
  m()
], U.prototype, "_tableItems", 2);
U = Me([
  f("content-audit-duplicate-content-table-collection-view")
], U);
const br = U, yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return U;
  },
  default: br
}, Symbol.toStringTag, { value: "Module" })), Tr = "duplicate-content-root", oa = "ContentAudit.Workspace.DuplicateContent", gr = [
  {
    type: "workspace",
    kind: "default",
    alias: oa,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: Tr,
      headline: "Duplicate Content"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.DuplicateContent.Collection",
    name: "Content Audit Duplicate Content Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: ft
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: oa
      }
    ]
  }
], vr = [
  {
    type: "repository",
    alias: On,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-ykGXpcxP.js")
  }
], wr = [
  {
    type: "collectionView",
    alias: _r,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => yr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: ft
      }
    ]
  }
], Ir = [
  {
    type: "collection",
    kind: "default",
    alias: ft,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-C4rGWCXk.js"),
    meta: {
      repositoryAlias: On
    }
  },
  ...vr,
  ...wr
], Or = [
  ...gr,
  ...Cr,
  ...Ir
], En = "carbon-rating-root", Er = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: En,
    menus: [Ne]
  }
}, Sr = [Er], At = "ContentAudit.Collection.CarbonRating", $r = "ContentAudit.CollectionView.CarbonRating.Table", Sn = "ContentAudit.Repository.CarbonRatingCollection";
var Pr = Object.defineProperty, kr = Object.getOwnPropertyDescriptor, $n = (t) => {
  throw TypeError(t);
}, je = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? kr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Pr(e, a, n), n;
}, bt = (t, e, a) => e.has(t) || $n("Cannot " + a), ra = (t, e, a) => (bt(t, e, "read from private field"), e.get(t)), la = (t, e, a) => e.has(t) ? $n("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Lr = (t, e, a, i) => (bt(t, e, "write to private field"), e.set(t, a), a), Pn = (t, e, a) => (bt(t, e, "access private method"), a), re, Se, kn, Ln;
let R = class extends C {
  constructor() {
    super(), la(this, Se), this._tableConfig = {
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
    ], this._tableItems = [], la(this, re), this.consumeContext($, (t) => {
      Lr(this, re, t), Pn(this, Se, kn).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
re = /* @__PURE__ */ new WeakMap();
Se = /* @__PURE__ */ new WeakSet();
kn = function() {
  ra(this, re) && this.observe(ra(this, re).items, (t) => Pn(this, Se, Ln).call(this, t), "umbCollectionItemsObserver");
};
Ln = function(t) {
  this._tableItems = t.map((e) => ({
    id: e?.unique,
    entityType: e?.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${e.pageData?.url}</a>`
      },
      {
        columnAlias: "contentType",
        value: e.contentType
      },
      {
        columnAlias: "pageSize",
        value: d`${Math.round(e.totalBytes / 1024)}KB`
      },
      {
        columnAlias: "carbonRating",
        value: e.emissionsData.carbonRating
      },
      {
        columnAlias: "emissionsPerPageView",
        value: `${e.emissionsData.emissionsPerPageView}g`
      }
    ]
  }));
};
R.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
je([
  m()
], R.prototype, "_tableConfig", 2);
je([
  m()
], R.prototype, "_tableColumns", 2);
je([
  m()
], R.prototype, "_tableItems", 2);
R = je([
  f("content-audit-carbon-rating-table-collection-view")
], R);
const Nr = R, Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return R;
  },
  default: Nr
}, Symbol.toStringTag, { value: "Module" })), ca = "ContentAudit.Workspace.CarbonRating", Vr = [
  {
    type: "workspace",
    kind: "default",
    alias: ca,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: En,
      headline: "Carbon Rating"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.CarbonRating.Collection",
    name: "Content Audit Carbon Rating Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: At
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ca
      }
    ]
  }
], Ur = [
  {
    type: "repository",
    alias: Sn,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository-C-sSj6C-.js")
  }
], Rr = [
  {
    type: "collectionView",
    alias: $r,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => Dr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: At
      }
    ]
  }
], Wr = [
  {
    type: "collection",
    kind: "default",
    alias: At,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element-Br8vAvSE.js"),
    meta: {
      repositoryAlias: Sn
    }
  },
  ...Ur,
  ...Rr
], xr = [
  ...Vr,
  ...Sr,
  ...Wr
], Nn = "core-web-vitals-root", Mr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: Nn,
    menus: [Ne]
  }
}, jr = [Mr], yt = "ContentAudit.Collection.CoreWebVitals", Br = "ContentAudit.CollectionView.CoreWebVitals.Table", Dn = "ContentAudit.Repository.CoreWebVitalsCollection";
var zr = Object.defineProperty, qr = Object.getOwnPropertyDescriptor, Vn = (t) => {
  throw TypeError(t);
}, Be = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? qr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && zr(e, a, n), n;
}, Tt = (t, e, a) => e.has(t) || Vn("Cannot " + a), ua = (t, e, a) => (Tt(t, e, "read from private field"), e.get(t)), da = (t, e, a) => e.has(t) ? Vn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Yr = (t, e, a, i) => (Tt(t, e, "write to private field"), e.set(t, a), a), Un = (t, e, a) => (Tt(t, e, "access private method"), a), le, $e, Rn, Wn;
let W = class extends C {
  constructor() {
    super(), da(this, $e), this._tableConfig = {
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
    ], this._tableItems = [], da(this, le), this.consumeContext($, (t) => {
      Yr(this, le, t), Un(this, $e, Rn).call(this);
    });
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
le = /* @__PURE__ */ new WeakMap();
$e = /* @__PURE__ */ new WeakSet();
Rn = function() {
  ua(this, le) && this.observe(ua(this, le).items, (t) => Un(this, $e, Wn).call(this, t), "umbCollectionItemsObserver");
};
Wn = function(t) {
  this._tableItems = t.filter((e) => e.pageData.statusCode === 200).map((e) => ({
    id: e?.unique,
    entityType: e?.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${e.pageData?.url}</a>`
      },
      {
        columnAlias: "cumulativeLayoutShift",
        value: e.performanceData.cumulativeLayoutShift
      },
      {
        columnAlias: "firstContentfulPaint",
        value: e.performanceData.firstContentfulPaint
      },
      {
        columnAlias: "largestContentfulPaint",
        value: e.performanceData.largestContentfulPaint
      },
      //{
      //    columnAlias: 'timeToInteractive',
      //    value: page.performanceData.timeToInteractive
      //},
      {
        columnAlias: "timeToFirstByte",
        value: e.performanceData.timeToFirstByte
      }
    ]
  }));
};
W.styles = [
  b`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Be([
  m()
], W.prototype, "_tableConfig", 2);
Be([
  m()
], W.prototype, "_tableColumns", 2);
Be([
  m()
], W.prototype, "_tableItems", 2);
W = Be([
  f("content-audit-core-web-vitals-table-collection-view")
], W);
const Fr = W, Hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return W;
  },
  default: Fr
}, Symbol.toStringTag, { value: "Module" })), ma = "ContentAudit.Workspace.CoreWebVitals", Kr = [
  {
    type: "workspace",
    kind: "default",
    alias: ma,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: Nn,
      headline: "Core Web Vitals"
    }
  },
  {
    type: "workspaceView",
    kind: "collection",
    alias: "ContentAudit.Workspace.CoreWebVitals.Collection",
    name: "Content Audit Core Web Vitals Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: yt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ma
      }
    ]
  }
], Gr = [
  {
    type: "repository",
    alias: Dn,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository-DBN1vQxR.js")
  }
], Xr = [
  {
    type: "collectionView",
    alias: Br,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => Hr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: yt
      }
    ]
  }
], Jr = [
  {
    type: "collection",
    kind: "default",
    alias: yt,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element-CpQ6vtvE.js"),
    meta: {
      repositoryAlias: Dn
    }
  },
  ...Gr,
  ...Xr
], Qr = [
  ...Kr,
  ...jr,
  ...Jr
], xn = "export-root", Zr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: xn,
    menus: [Ze]
  }
}, el = [Zr], tl = "ContentAudit.Workspace.Export", al = [
  {
    type: "workspace",
    kind: "default",
    alias: tl,
    name: "Export Root Workspace",
    element: () => import("./export.element-ClDD-cUw.js"),
    meta: {
      entityType: xn,
      headline: "Export"
    }
  }
], nl = [
  ...al,
  ...el
], K = "ContentAudit.Section", il = {
  type: "section",
  alias: K,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, sl = {
  type: "sectionView",
  alias: "ContentAudit.SectionView.Scan",
  name: "Content Audit Scan Section View",
  element: () => import("./section.element-CM_BDMwr.js"),
  meta: {
    label: "Scan",
    icon: "icon-scan",
    pathname: "audit-root"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: K
    }
  ]
}, ol = [
  {
    type: "menu",
    alias: M,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: Le,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: Ne,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: Ze,
    name: "Tools Menu"
  }
], rl = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "ContentAudit.SidebarMenu",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: M
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: K
      }
    ]
  },
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "ContentAudit.SidebarMenu.Metadata",
    name: "Content Sidebar Menu",
    meta: {
      label: "Content",
      menu: Le
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: K
      }
    ]
  },
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "ContentAudit.SidebarMenu.Performance",
    name: "Content Performance Sidebar Menu",
    meta: {
      label: "Performance",
      menu: Ne
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: K
      }
    ]
  },
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "ContentAudit.SidebarMenu.Tools",
    name: "Content Tools Sidebar Menu",
    meta: {
      label: "Tools",
      menu: Ze
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: K
      }
    ]
  }
], ll = [
  il,
  sl,
  ...ol,
  ...rl,
  ..._s,
  ...Vs,
  ...Ks,
  ...ro,
  ...To,
  ...Do,
  ...Ho,
  ...or,
  ...hr,
  ...Or,
  ...xr,
  ...Qr,
  ...nl
], cl = {
  type: "workspace",
  alias: be,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => Gi),
  meta: {
    entityType: Sa
  }
}, ul = [
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-AXaHTqh8.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: be
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-y7bGGPMt.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: be
      }
    ]
  }
], dl = [
  cl,
  ...ul
], ml = [
  {
    type: "modal",
    alias: "ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-k-XN4CQ0.js")
  }
], pl = [
  {
    type: "localization",
    alias: "ContentAudit.Localization.En-GB",
    weight: -100,
    name: "English (UK)",
    meta: {
      culture: "en"
    },
    js: () => import("./en-5vqxyhOY.js")
  }
], hl = {
  type: "workspaceView",
  alias: "Umbraco.Community.ContentAudit.Workspace",
  name: "ContentAudit Workspace",
  js: () => import("./contentaudit-workspace-view-XYz5BIrR.js"),
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
}, Cl = [hl], _l = {
  type: "globalContext",
  alias: $i,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Ni)
}, Nl = async (t, e) => {
  e.registerMany([
    _l,
    ...ll,
    ...dl,
    ...ml,
    ...pl,
    ...Cl
  ]), t.consumeContext(pa, async (a) => {
    if (!a) return;
    const i = a.getOpenApiConfiguration();
    u.setConfig({
      baseUrl: i?.base ?? "",
      auth: i?.token ?? void 0,
      credentials: i?.credentials ?? "same-origin"
    }), u.interceptors.request.use(async (n, s) => {
      const o = await i.token();
      return n.headers.set("Authorization", `Bearer ${o}`), n;
    });
  });
};
export {
  me as A,
  He as B,
  $a as C,
  ye as D,
  kl as E,
  Zn as F,
  Qn as G,
  Nl as H,
  Oa as I,
  Wa as a,
  xa as b,
  Z as c,
  F as d,
  zt as e,
  ka as f,
  $i as g,
  Sa as h,
  et as i,
  La as j,
  Xi as k,
  M as l,
  Le as m,
  Ne as n,
  Ze as o,
  be as p,
  Ke as q,
  Xe as r,
  _e as s,
  Di as t,
  Je as u,
  Ji as v,
  Dt as w,
  I as x,
  Ae as y,
  fe as z
};
//# sourceMappingURL=index-B8flLQWi.js.map
