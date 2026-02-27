import { UMB_AUTH_CONTEXT as si } from "@umbraco-cms/backoffice/auth";
import { css as y, property as M, customElement as f, html as u, nothing as wa, state as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as _ } from "@umbraco-cms/backoffice/lit-element";
import { UmbControllerBase as Ia } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as oi } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as ri, UMB_WORKSPACE_CONDITION_ALIAS as g, UMB_WORKSPACE_MODAL as he } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as q } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Xe, UmbArrayState as Je } from "@umbraco-cms/backoffice/observable-api";
import { UMB_NOTIFICATION_CONTEXT as li } from "@umbraco-cms/backoffice/notification";
import { UmbRepositoryBase as ci } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as $, UMB_COLLECTION_ALIAS_CONDITION as v } from "@umbraco-cms/backoffice/collection";
import { UmbTextStyles as ui } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as _e } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Ce } from "@umbraco-cms/backoffice/router";
const di = [
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
], pi = [
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
var mi = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, Oa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? hi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && mi(e, a, n), n;
};
let ge = class extends _ {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = di[this.type - 1];
      return u`
                <uui-tag color=${t?.color}>
                    <uui-icon name="${t?.icon}"></uui-icon>
                    ${t?.label}
                </uui-tag>
            `;
    }
  }
};
ge.styles = [
  y`
            uui-tag {
                font-size: var(--uui-type-default-size);

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Oa([
  M({ attribute: !1 })
], ge.prototype, "type", 2);
ge = Oa([
  f("content-audit-issue-type-label")
], ge);
var _i = Object.defineProperty, Ci = Object.getOwnPropertyDescriptor, Ea = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ci(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && _i(e, a, n), n;
};
let ve = class extends _ {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = pi[this.type - 1];
      return u`
                <uui-tag color=${t?.color}>
                    <uui-icon name="${t?.icon}"></uui-icon>
                    ${t?.label}
                </uui-tag>
            `;
    }
  }
};
ve.styles = [
  y`
            uui-tag {
                font-size: var(--uui-type-default-size);

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Ea([
  M({ attribute: !1 })
], ve.prototype, "type", 2);
ve = Ea([
  f("content-audit-priority-type-label")
], ve);
var fi = Object.defineProperty, Ai = Object.getOwnPropertyDescriptor, Sa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ai(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && fi(e, a, n), n;
};
let st = class extends _ {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? u`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : wa;
  }
};
Sa([
  M({ attribute: !1 })
], st.prototype, "statusCode", 2);
st = Sa([
  f("content-audit-status-code-label")
], st);
var yi = Object.defineProperty, bi = Object.getOwnPropertyDescriptor, $a = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? bi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && yi(e, a, n), n;
};
let ot = class extends _ {
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
$a([
  M({ attribute: !0 })
], ot.prototype, "value", 2);
ot = $a([
  f("content-audit-carbon-intensity-label")
], ot);
var Pa = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(Pa || {}), rt = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(rt || {});
const Ti = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, a) => typeof a == "bigint" ? a.toString() : a
  )
}, gi = ({
  onRequest: t,
  onSseError: e,
  onSseEvent: a,
  responseTransformer: i,
  responseValidator: n,
  sseDefaultRetryDelay: s,
  sseMaxRetryAttempts: o,
  sseMaxRetryDelay: r,
  sseSleepFn: c,
  url: m,
  ...l
}) => {
  let C;
  const G = c ?? ((p) => new Promise((b) => setTimeout(b, p)));
  return { stream: async function* () {
    let p = s ?? 3e3, b = 0;
    const B = l.signal ?? new AbortController().signal;
    for (; !B.aborted; ) {
      b++;
      const X = l.headers instanceof Headers ? l.headers : new Headers(l.headers);
      C !== void 0 && X.set("Last-Event-ID", C);
      try {
        const j = {
          redirect: "follow",
          ...l,
          body: l.serializedBody,
          headers: X,
          signal: B
        };
        let O = new Request(m, j);
        t && (O = await t(m, j));
        const T = await (l.fetch ?? globalThis.fetch)(O);
        if (!T.ok)
          throw new Error(
            `SSE failed: ${T.status} ${T.statusText}`
          );
        if (!T.body) throw new Error("No body in SSE response");
        const E = T.body.pipeThrough(new TextDecoderStream()).getReader();
        let Ge = "";
        const qt = () => {
          try {
            E.cancel();
          } catch {
          }
        };
        B.addEventListener("abort", qt);
        try {
          for (; ; ) {
            const { done: ti, value: ai } = await E.read();
            if (ti) break;
            Ge += ai;
            const Yt = Ge.split(`

`);
            Ge = Yt.pop() ?? "";
            for (const ni of Yt) {
              const ii = ni.split(`
`), Ae = [];
              let Ft;
              for (const w of ii)
                if (w.startsWith("data:"))
                  Ae.push(w.replace(/^data:\s*/, ""));
                else if (w.startsWith("event:"))
                  Ft = w.replace(/^event:\s*/, "");
                else if (w.startsWith("id:"))
                  C = w.replace(/^id:\s*/, "");
                else if (w.startsWith("retry:")) {
                  const Kt = Number.parseInt(
                    w.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(Kt) || (p = Kt);
                }
              let z, Ht = !1;
              if (Ae.length) {
                const w = Ae.join(`
`);
                try {
                  z = JSON.parse(w), Ht = !0;
                } catch {
                  z = w;
                }
              }
              Ht && (n && await n(z), i && (z = await i(z))), a?.({
                data: z,
                event: Ft,
                id: C,
                retry: p
              }), Ae.length && (yield z);
            }
          }
        } finally {
          B.removeEventListener("abort", qt), E.releaseLock();
        }
        break;
      } catch (j) {
        if (e?.(j), o !== void 0 && b >= o)
          break;
        const O = Math.min(
          p * 2 ** (b - 1),
          r ?? 3e4
        );
        await G(O);
      }
    }
  }() };
}, vi = (t) => {
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
}, wi = (t) => {
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
}, Ii = (t) => {
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
}, La = ({
  allowReserved: t,
  explode: e,
  name: a,
  style: i,
  value: n
}) => {
  if (!e) {
    const r = (t ? n : n.map((c) => encodeURIComponent(c))).join(wi(i));
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
  const s = vi(i), o = n.map((r) => i === "label" || i === "simple" ? t ? r : encodeURIComponent(r) : Le({
    allowReserved: t,
    name: a,
    value: r
  })).join(s);
  return i === "label" || i === "matrix" ? s + o : o;
}, Le = ({
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
}, ka = ({
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
    Object.entries(n).forEach(([l, C]) => {
      c = [
        ...c,
        l,
        t ? C : encodeURIComponent(C)
      ];
    });
    const m = c.join(",");
    switch (i) {
      case "form":
        return `${a}=${m}`;
      case "label":
        return `.${m}`;
      case "matrix":
        return `;${a}=${m}`;
      default:
        return m;
    }
  }
  const o = Ii(i), r = Object.entries(n).map(
    ([c, m]) => Le({
      allowReserved: t,
      name: i === "deepObject" ? `${a}[${c}]` : c,
      value: m
    })
  ).join(o);
  return i === "label" || i === "matrix" ? o + r : r;
}, Oi = /\{[^{}]+\}/g, Ei = ({ path: t, url: e }) => {
  let a = e;
  const i = e.match(Oi);
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
          La({ explode: s, name: o, style: r, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        a = a.replace(
          n,
          ka({
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
          `;${Le({
            name: o,
            value: c
          })}`
        );
        continue;
      }
      const m = encodeURIComponent(
        r === "label" ? `.${c}` : c
      );
      a = a.replace(n, m);
    }
  return a;
}, Si = ({
  baseUrl: t,
  path: e,
  query: a,
  querySerializer: i,
  url: n
}) => {
  const s = n.startsWith("/") ? n : `/${n}`;
  let o = (t ?? "") + s;
  e && (o = Ei({ path: e, url: o }));
  let r = a ? i(a) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (o += `?${r}`), o;
};
function $i(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const Pi = async (t, e) => {
  const a = typeof e == "function" ? await e(t) : e;
  if (a)
    return t.scheme === "bearer" ? `Bearer ${a}` : t.scheme === "basic" ? `Basic ${btoa(a)}` : a;
}, Na = ({
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
          const c = La({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "form",
            value: r,
            ...e
          });
          c && s.push(c);
        } else if (typeof r == "object") {
          const c = ka({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "deepObject",
            value: r,
            ...a
          });
          c && s.push(c);
        } else {
          const c = Le({
            allowReserved: t,
            name: o,
            value: r
          });
          c && s.push(c);
        }
    }
  return s.join("&");
}, Li = (t) => {
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
}, ki = (t, e) => e ? !!(t.headers.has(e) || t.query?.[e] || t.headers.get("Cookie")?.includes(`${e}=`)) : !1, Ni = async ({
  security: t,
  ...e
}) => {
  for (const a of t) {
    if (ki(e, a.name))
      continue;
    const i = await Pi(a, e.auth);
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
}, Gt = (t) => Si({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : Na(t.querySerializer),
  url: t.url
}), Xt = (t, e) => {
  const a = { ...t, ...e };
  return a.baseUrl?.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = Da(t.headers, e.headers), a;
}, Di = (t) => {
  const e = [];
  return t.forEach((a, i) => {
    e.push([i, a]);
  }), e;
}, Da = (...t) => {
  const e = new Headers();
  for (const a of t) {
    if (!a)
      continue;
    const i = a instanceof Headers ? Di(a) : Object.entries(a);
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
class Qe {
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
const Ri = () => ({
  error: new Qe(),
  request: new Qe(),
  response: new Qe()
}), Ui = Na({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), Wi = {
  "Content-Type": "application/json"
}, Ra = (t = {}) => ({
  ...Ti,
  headers: Wi,
  parseAs: "auto",
  querySerializer: Ui,
  ...t
}), Vi = (t = {}) => {
  let e = Xt(Ra(), t);
  const a = () => ({ ...e }), i = (m) => (e = Xt(e, m), a()), n = Ri(), s = async (m) => {
    const l = {
      ...e,
      ...m,
      fetch: m.fetch ?? e.fetch ?? globalThis.fetch,
      headers: Da(e.headers, m.headers),
      serializedBody: void 0
    };
    l.security && await Ni({
      ...l,
      security: l.security
    }), l.requestValidator && await l.requestValidator(l), l.body !== void 0 && l.bodySerializer && (l.serializedBody = l.bodySerializer(l.body)), (l.body === void 0 || l.serializedBody === "") && l.headers.delete("Content-Type");
    const C = Gt(l);
    return { opts: l, url: C };
  }, o = async (m) => {
    const { opts: l, url: C } = await s(m), G = {
      redirect: "follow",
      ...l,
      body: $i(l)
    };
    let S = new Request(C, G);
    for (const A of n.request.fns)
      A && (S = await A(S, l));
    const fe = l.fetch;
    let p = await fe(S);
    for (const A of n.response.fns)
      A && (p = await A(p, S, l));
    const b = {
      request: S,
      response: p
    };
    if (p.ok) {
      const A = (l.parseAs === "auto" ? Li(p.headers.get("Content-Type")) : l.parseAs) ?? "json";
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
          ...b
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
            ...b
          };
      }
      return A === "json" && (l.responseValidator && await l.responseValidator(T), l.responseTransformer && (T = await l.responseTransformer(T))), l.responseStyle === "data" ? T : {
        data: T,
        ...b
      };
    }
    const B = await p.text();
    let X;
    try {
      X = JSON.parse(B);
    } catch {
    }
    const j = X ?? B;
    let O = j;
    for (const A of n.error.fns)
      A && (O = await A(j, p, S, l));
    if (O = O || {}, l.throwOnError)
      throw O;
    return l.responseStyle === "data" ? void 0 : {
      error: O,
      ...b
    };
  }, r = (m) => (l) => o({ ...l, method: m }), c = (m) => async (l) => {
    const { opts: C, url: G } = await s(l);
    return gi({
      ...C,
      body: C.body,
      headers: C.headers,
      method: m,
      onRequest: async (S, fe) => {
        let p = new Request(S, fe);
        for (const b of n.request.fns)
          b && (p = await b(p, C));
        return p;
      },
      url: G
    });
  };
  return {
    buildUrl: Gt,
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
}, h = Vi(Ra({
  baseUrl: "http://localhost:26297",
  throwOnError: !0
}));
class ye {
  static getCollection(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit",
      ...e
    });
  }
  static delete(e) {
    return (e.client ?? h).delete({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}",
      ...e
    });
  }
  static getByKey(e) {
    return (e.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}",
      ...e
    });
  }
  static exportByKey(e) {
    return (e.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/export",
      ...e
    });
  }
  static overviewByKey(e) {
    return (e.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/overview",
      ...e
    });
  }
  static getAllImages(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/all-images",
      ...e
    });
  }
  static getDuplicateContentUrls(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/duplicate-content",
      ...e
    });
  }
  static export(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/export",
      ...e
    });
  }
  static getExternalLinks(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/external-links",
      ...e
    });
  }
  static getHealthScore(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/health-score",
      ...e
    });
  }
  static getInternalLinks(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/internal-links",
      ...e
    });
  }
  static getLatestAuditData(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/latest-data",
      ...e
    });
  }
  static getPagesWithMissingMetadata(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/missing-metadata",
      ...e
    });
  }
  static getOrphanedPages(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/orphaned-pages",
      ...e
    });
  }
  static overview(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/audit/overview",
      ...e
    });
  }
  static children(e) {
    return (e.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/tree/audit/children/{parentId}",
      ...e
    });
  }
  static root(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/tree/audit/root",
      ...e
    });
  }
}
class Mi {
  static startCrawl(e) {
    return (e?.client ?? h).sse.get({
      url: "/umbraco/content-audit/management/api/v1/crawl",
      ...e
    });
  }
}
class Ua {
  static getAllIssues(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/issue",
      ...e
    });
  }
  static getIssue(e) {
    return (e.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/issue/{id}",
      ...e
    });
  }
}
class xi {
  static getSettings(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/settings",
      ...e
    });
  }
}
var Bi = Object.defineProperty, ji = Object.getOwnPropertyDescriptor, Wa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? ji(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Bi(e, a, n), n;
};
let we = class extends _ {
  _getColour() {
    return this.value != null ? this.value.rating == rt.POOR ? "danger" : this.value.rating == rt.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == Pa.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
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
we.styles = [
  y`
            uui-tag {
                font-size: var(--uui-type-default-size);
            }
        `
];
Wa([
  M({ attribute: !1 })
], we.prototype, "value", 2);
we = Wa([
  f("content-audit-metric-label")
], we);
const Ie = "ContentAudit.Workspace", zi = "ContentAudit.Context", Va = "content-audit";
class qi {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getLatestAuditOverview() {
    return await q(this.#e, ye.overview());
  }
  async getPagesWithMissingMetadata() {
    return await q(this.#e, ye.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await q(this.#e, Ua.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await q(this.#e, ye.getHealthScore());
  }
  async getAuditOverviews() {
    return await q(this.#e, ye.getCollection({
      query: { skip: 0, take: 5 }
    }));
  }
}
class Yi {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getSettings() {
    return await q(this.#e, xi.getSettings());
  }
}
class Fi extends Ia {
  #e;
  #t;
  constructor(e) {
    super(e), this.#e = new qi(this), this.#t = new Yi(this);
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
    return this.#t.getSettings();
  }
  async getAuditOverviews() {
    return this.#e.getAuditOverviews();
  }
}
class lt extends Ia {
  constructor(e) {
    super(e), this.workspaceAlias = Ie, this.#t = new Xe(void 0), this.latestAuditOverview = this.#t.asObservable(), this.#n = new Je([], (a) => a.key), this.auditOverviews = this.#n.asObservable(), this.#i = new Je([], (a) => a.unique), this.pagesWithMissingMetadata = this.#i.asObservable(), this.#s = new Je([], (a) => a.name), this.topIssues = this.#s.asObservable(), this.#o = new Xe(void 0), this.healthScore = this.#o.asObservable(), this.#r = new Xe(void 0), this.settings = this.#r.asObservable(), this.provideContext(Ma, this), this.provideContext(ri, this), this.#e = new Fi(this);
  }
  getEntityType() {
    return Va;
  }
  #e;
  #t;
  #n;
  #i;
  #s;
  #o;
  #r;
  async #a(e) {
    (await this.getContext(li))?.peek("danger", {
      data: { headline: "Content Audit", message: e }
    });
  }
  async getLatestAuditOverview() {
    const { data: e, error: a } = await this.#e.getLatestAuditOverview();
    e ? this.#t.setValue(e) : a && this.#a("Failed to load latest audit overview.");
  }
  async getAuditOverviews() {
    const { data: e, error: a } = await this.#e.getAuditOverviews();
    if (e && e.items) {
      const i = e.items.sort((n, s) => {
        const o = n.runDate ? new Date(n.runDate).getTime() : 0;
        return (s.runDate ? new Date(s.runDate).getTime() : 0) - o;
      });
      this.#n.setValue(i);
    } else a && this.#a("Failed to load audit history.");
  }
  async getPagesWithMissingMetadata() {
    const { data: e, error: a } = await this.#e.getPagesWithMissingMetadata();
    e ? this.#i.setValue(e.items) : a && this.#a("Failed to load pages with missing metadata.");
  }
  async getTopIssues() {
    const { data: e, error: a } = await this.#e.getTopIssues();
    e ? this.#s.setValue(e.items) : a && this.#a("Failed to load top issues.");
  }
  async getHealthScore() {
    const { data: e, error: a } = await this.#e.getHealthScore();
    e ? this.#o.setValue(e) : a && this.#a("Failed to load health score.");
  }
  async startCrawl() {
    return Mi.startCrawl();
  }
  async getSettings() {
    const { data: e, error: a } = await this.#e.getSettings();
    e ? this.#r.setValue(e) : a && this.#a("Failed to load settings.");
  }
}
const Ma = new oi(
  "ContentAuditContext"
), Hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: Ma,
  ContentAuditContext: lt,
  default: lt
}, Symbol.toStringTag, { value: "Module" }));
const Ki = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
const be = globalThis, _t = be.ShadowRoot && (be.ShadyCSS === void 0 || be.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xa = /* @__PURE__ */ Symbol(), Jt = /* @__PURE__ */ new WeakMap();
let Gi = class {
  constructor(e, a, i) {
    if (this._$cssResult$ = !0, i !== xa) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = a;
  }
  get styleSheet() {
    let e = this.o;
    const a = this.t;
    if (_t && e === void 0) {
      const i = a !== void 0 && a.length === 1;
      i && (e = Jt.get(a)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Jt.set(a, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Xi = (t) => new Gi(typeof t == "string" ? t : t + "", void 0, xa), Ji = (t, e) => {
  if (_t) t.adoptedStyleSheets = e.map(((a) => a instanceof CSSStyleSheet ? a : a.styleSheet));
  else for (const a of e) {
    const i = document.createElement("style"), n = be.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = a.cssText, t.appendChild(i);
  }
}, Qt = _t ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const i of e.cssRules) a += i.cssText;
  return Xi(a);
})(t) : t;
const { is: Qi, defineProperty: Zi, getOwnPropertyDescriptor: es, getOwnPropertyNames: ts, getOwnPropertySymbols: as, getPrototypeOf: ns } = Object, ke = globalThis, Zt = ke.trustedTypes, is = Zt ? Zt.emptyScript : "", ss = ke.reactiveElementPolyfillSupport, Q = (t, e) => t, ct = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? is : null;
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
} }, Ba = (t, e) => !Qi(t, e), ea = { attribute: !0, type: String, converter: ct, reflect: !1, useDefault: !1, hasChanged: Ba };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ke.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class J extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, a = ea) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(e, a), !a.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, a);
      n !== void 0 && Zi(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, a, i) {
    const { get: n, set: s } = es(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? ea;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Q("elementProperties"))) return;
    const e = ns(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Q("properties"))) {
      const a = this.properties, i = [...ts(a), ...as(a)];
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
      for (const n of i) a.unshift(Qt(n));
    } else e !== void 0 && a.push(Qt(e));
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
    return Ji(e, this.constructor.elementStyles), e;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : ct).toAttribute(a, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, a) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : ct;
      this._$Em = n, this[n] = o.fromAttribute(a, s.type) ?? this._$Ej?.get(n) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, a, i) {
    if (e !== void 0) {
      const n = this.constructor, s = this[e];
      if (i ??= n.getPropertyOptions(e), !((i.hasChanged ?? Ba)(s, a) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
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
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[Q("elementProperties")] = /* @__PURE__ */ new Map(), J[Q("finalized")] = /* @__PURE__ */ new Map(), ss?.({ ReactiveElement: J }), (ke.reactiveElementVersions ??= []).push("2.1.0");
var os = Object.getOwnPropertyDescriptor, rs = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? os(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = o(n) || n);
  return n;
};
let Oe = class extends _ {
  constructor() {
    super(), this._workspaceContext = new lt(this);
  }
  render() {
    return u`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Oe = rs([
  Ki("content-audit-workspace-root")
], Oe);
const ls = Oe, cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Oe;
  },
  default: ls
}, Symbol.toStringTag, { value: "Module" })), x = "ContentAudit.Menu", Ne = "ContentAudit.Menu.Metadata", De = "ContentAudit.Menu.Performance", Ct = "ContentAudit.Menu.Tools", ft = "ContentAudit.Collection.Issues", us = "ContentAudit.CollectionView.Issues.Table", ja = "ContentAudit.Repository.IssuesCollection";
class ds {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getCollection(e) {
    const { data: a, error: i } = await q(this.#e, Ua.getAllIssues({ query: e }));
    if (i)
      return { error: i };
    if (!a)
      return { data: { items: [], total: 0 } };
    const { items: n, total: s } = a;
    return { data: { items: n, total: s } };
  }
}
class ta extends ci {
  #e;
  constructor(e) {
    super(e), this.#e = new ds(e);
  }
  async requestCollection(e) {
    return this.#e.getCollection(e);
  }
}
const ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: ta,
  default: ta
}, Symbol.toStringTag, { value: "Module" }));
var ms = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, za = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? hs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && ms(e, a, n), n;
};
let Ee = class extends _ {
  render() {
    return this.value ? u`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : wa;
  }
};
Ee.styles = [
  ui,
  y`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
za([
  M({ attribute: !1 })
], Ee.prototype, "value", 2);
Ee = za([
  f("content-audit-issues-table-name-column-layout")
], Ee);
var _s = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, qa = (t) => {
  throw TypeError(t);
}, Y = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Cs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && _s(e, a, n), n;
}, At = (t, e, a) => e.has(t) || qa("Cannot " + a), aa = (t, e, a) => (At(t, e, "read from private field"), e.get(t)), na = (t, e, a) => e.has(t) ? qa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), fs = (t, e, a, i) => (At(t, e, "write to private field"), e.set(t, a), a), Te = (t, e, a) => (At(t, e, "access private method"), a), ee, H, Ya, yt, Fa;
let I = class extends _ {
  constructor() {
    super(), na(this, H), this.data = [], this.hideSummary = !1, this._issues = [], this._tableConfig = {
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
    ], this._tableItems = [], na(this, ee), this.consumeContext($, (t) => {
      fs(this, ee, t), Te(this, H, Ya).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && (this._issues = this.data, Te(this, H, yt).call(this, this.data));
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
                ${Te(this, H, Fa).call(this)}
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
Ya = function() {
  aa(this, ee) && this.observe(aa(this, ee).items, (t) => {
    this._issues = t, Te(this, H, yt).call(this, t);
  }, "umbCollectionItemsObserver");
};
yt = function(t) {
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
        value: u`<content-audit-issue-type-label .type=${e.type}></content-audit-issue-type-label>`
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
        value: `${e.percentOfTotal?.toFixed(0)}%`
      }
    ]
  }));
};
Fa = function() {
  if (!this._issues.length || this.hideSummary) return;
  const t = this._issues.filter((i) => i.priority === "High").length, e = this._issues.filter((i) => i.priority === "Medium").length, a = this._issues.filter((i) => i.priority === "Low").length;
  return u`
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
  y`
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
  M({ type: Array, attribute: !1 })
], I.prototype, "data", 2);
Y([
  M({ type: Boolean, attribute: "hide-summary" })
], I.prototype, "hideSummary", 2);
Y([
  d()
], I.prototype, "_issues", 2);
Y([
  d()
], I.prototype, "_tableConfig", 2);
Y([
  d()
], I.prototype, "_tableColumns", 2);
Y([
  d()
], I.prototype, "_tableItems", 2);
I = Y([
  f("content-audit-issues-table-collection-view")
], I);
const As = I, ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return I;
  },
  default: As
}, Symbol.toStringTag, { value: "Module" })), bt = "ContentAudit.Collection.Audits", bs = "ContentAudit.CollectionView.Audits.Table", Ha = "ContentAudit.Repository.AuditsCollection", Ts = [
  {
    type: "repository",
    alias: Ha,
    name: "Audits Collection Repository",
    api: () => import("./audits-collection.repository-ZcEMznAB.js")
  }
], gs = [
  {
    type: "collectionView",
    alias: bs,
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
        match: bt
      }
    ]
  }
], vs = [
  {
    type: "collection",
    kind: "default",
    alias: bt,
    name: "Audits Collection",
    element: () => import("./audits.element-CQMJCtGh.js"),
    meta: {
      repositoryAlias: Ha
    }
  },
  ...Ts,
  ...gs
], Ka = "audits", Ga = "audits-root", ws = [
  {
    type: "entityAction",
    kind: "default",
    alias: "ContentAudit.EntityAction.Audit.Delete",
    name: "Delete Audit Entity Action",
    weight: 100,
    api: () => import("./delete-audit.action-DP1ZaghW.js"),
    forEntityTypes: [Ka],
    meta: {
      icon: "icon-trash",
      label: "Delete"
    }
  }
], Z = "ContentAudit.Workspace.Audits", Ze = "ContentAudit.MenuItem.Audits", ia = "ContentAudit.Workspace.AuditsRoot", Is = [
  {
    type: "menuItem",
    kind: "tree",
    alias: Ze,
    name: "Audits Menu Item",
    weight: 12e3,
    meta: {
      label: "Audits",
      icon: "icon-browser-window",
      treeAlias: "ContentAudit.Tree.Audits",
      menus: [x]
    }
  },
  {
    type: "workspaceContext",
    kind: "menuStructure",
    alias: "ContentAudit.Context.Audits.Menu.Structure",
    name: "Content Audit Audits Menu Structure Workspace Context",
    api: () => import("./audits-menu-structure.context-BSWiqkie.js"),
    meta: {
      menuItemAlias: Ze
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
      menuItemAlias: Ze
    },
    conditions: [
      {
        alias: g,
        match: ia
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
        match: ia
      }
    ]
  }
], Os = [
  {
    type: "repository",
    alias: "ContentAudit.Repository.Audits",
    name: "Content Audit Audits Repository",
    api: () => import("./audits-tree.repository-2Oqb-8eu.js")
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
    forEntityTypes: [Ka, Ga]
  }
], Es = [
  {
    type: "workspace",
    kind: "routable",
    alias: Z,
    name: "Audits Workspace",
    api: () => import("./audits-workspace.context-B4ZsKpgH.js"),
    meta: {
      entityType: "audits"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Audits.Overview",
    name: "Audits Workspace Overview View",
    js: () => import("./audits-overview-workspace-view.element-BOgaBOBj.js"),
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
    js: () => import("./audits-issues-workspace-view.element-BpWasynt.js"),
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
], sa = "ContentAudit.Workspace.AuditsRoot", Ss = [
  {
    type: "workspace",
    kind: "default",
    alias: sa,
    name: "Audits Root Workspace",
    meta: {
      entityType: Ga,
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
      collectionAlias: bt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: sa
      }
    ]
  }
], $s = [
  ...Es,
  ...Ss
], Ps = [
  ...vs,
  ...ws,
  ...Is,
  ...Os,
  ...$s
], Xa = "all-pages-root", Ls = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: Xa,
    menus: [x]
  }
}, ks = [Ls], oa = "ContentAudit.Workspace.AllPagesRoot", F = "ContentAudit.Workspace.AllPages", Ns = [
  {
    type: "workspace",
    kind: "routable",
    alias: F,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-C6yedWIy.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-CvOBUx1v.js"),
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
    js: () => import("./all-pages-links-workspace-view.element-6zyaD8II.js"),
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
    js: () => import("./all-pages-images-workspace-view.element-D3VwEfMq.js"),
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
    js: () => import("./all-pages-resources-workspace-view.element-D7d4FqOO.js"),
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
    js: () => import("./all-pages-issues-workspace-view.element-DQ1VhXOK.js"),
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
], Tt = "ContentAudit.Collection.AllPages", Ds = "ContentAudit.CollectionView.AllPages.Table", Ja = "ContentAudit.Repository.AllPagesCollection";
var Rs = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, Qa = (t) => {
  throw TypeError(t);
}, Re = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Us(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Rs(e, a, n), n;
}, gt = (t, e, a) => e.has(t) || Qa("Cannot " + a), ra = (t, e, a) => (gt(t, e, "read from private field"), e.get(t)), la = (t, e, a) => e.has(t) ? Qa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Ws = (t, e, a, i) => (gt(t, e, "write to private field"), e.set(t, a), a), Za = (t, e, a) => (gt(t, e, "access private method"), a), te, Se, en, tn;
let P = class extends _ {
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
        name: "Status Code",
        alias: "statusCode"
      },
      {
        name: "Redirected",
        alias: "redirect"
      }
    ], this._tableItems = [], la(this, te), this.consumeContext($, (t) => {
      Ws(this, te, t), Za(this, Se, en).call(this);
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
te = /* @__PURE__ */ new WeakMap();
Se = /* @__PURE__ */ new WeakSet();
en = function() {
  ra(this, te) && this.observe(ra(this, te).items, (t) => Za(this, Se, tn).call(this, t), "umbCollectionItemsObserver");
};
tn = function(t) {
  this._tableItems = t.map((e) => ({
    id: e?.unique,
    entityType: e?.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: u`<a href=${"section/audit/workspace/all-pages/edit/" + e.unique}>${e.pageData?.url}</a>`
      },
      {
        columnAlias: "contentType",
        value: e.technicalSeoData?.contentType
      },
      {
        columnAlias: "statusCode",
        value: u`<content-audit-status-code-label .statusCode=${e.pageData?.statusCode}></content-audit-status-code-label>`
      },
      {
        columnAlias: "redirect",
        value: e.pageData.redirect ? "Yes" : "No"
      }
    ]
  }));
};
P.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Re([
  d()
], P.prototype, "_tableConfig", 2);
Re([
  d()
], P.prototype, "_tableColumns", 2);
Re([
  d()
], P.prototype, "_tableItems", 2);
P = Re([
  f("content-audit-all-pages-table-collection-view")
], P);
const Vs = P, Ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return P;
  },
  default: Vs
}, Symbol.toStringTag, { value: "Module" })), xs = [
  {
    type: "workspace",
    kind: "default",
    alias: oa,
    name: "All Pages Root Workspace",
    meta: {
      entityType: Xa,
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
      collectionAlias: Tt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: oa
      }
    ]
  }
], Bs = [...Ns, ...xs], js = [
  {
    type: "repository",
    alias: Ja,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-BPW1XvXB.js")
  }
], zs = [
  {
    type: "collectionView",
    alias: Ds,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => Ms),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Tt
      }
    ]
  }
], qs = [
  {
    type: "collection",
    kind: "default",
    alias: Tt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element-DMHaFpCF.js"),
    meta: {
      repositoryAlias: Ja
    }
  },
  ...js,
  ...zs
], Ys = "ContentAudit.Repository.AllPages.Detail", Fs = "ContentAudit.Store.AllPages.Detail", Hs = [
  {
    type: "repository",
    alias: Ys,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository-Dwtm_R9C.js")
  },
  {
    type: "store",
    alias: Fs,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], Ks = [...Hs], Gs = [
  ...Bs,
  ...ks,
  ...qs,
  ...Ks
], an = "issues-root", Xs = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: an,
    menus: [x]
  }
}, Js = [Xs], ca = "ContentAudit.Workspace.IssuesRoot", ua = "ContentAudit.Workspace.Issues", Qs = [
  {
    type: "workspace",
    kind: "routable",
    alias: ua,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-CWLZQVcI.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-C15UrrE_.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: g,
        match: ua
      }
    ]
  }
], Zs = [
  {
    type: "workspace",
    kind: "default",
    alias: ca,
    name: "Issues Root Workspace",
    meta: {
      entityType: an,
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
      collectionAlias: ft
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ca
      }
    ]
  }
], eo = [...Qs, ...Zs], to = [
  {
    type: "repository",
    alias: ja,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => ps)
  }
], ao = [
  {
    type: "collectionView",
    alias: us,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => ys),
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
], no = [
  {
    type: "collection",
    kind: "default",
    alias: ft,
    name: "Issues Collection",
    element: () => import("./issues.element-DJRmm4jS.js"),
    meta: {
      repositoryAlias: ja
    }
  },
  ...to,
  ...ao
], io = "ContentAudit.Repository.Issues.Detail", so = "ContentAudit.Store.Issues.Detail", oo = [
  {
    type: "repository",
    alias: io,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-AJBUMSMs.js")
  },
  {
    type: "store",
    alias: so,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], ro = [...oo], lo = [
  ...eo,
  ...Js,
  ...no,
  ...ro
], nn = "status-codes-root", co = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: nn,
    menus: [x]
  }
}, uo = [co], vt = "ContentAudit.Collection.StatusCodes", po = "ContentAudit.CollectionView.StatusCodes.Table", sn = "ContentAudit.Repository.StatusCodesCollection";
var mo = Object.defineProperty, ho = Object.getOwnPropertyDescriptor, on = (t) => {
  throw TypeError(t);
}, Ue = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? ho(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && mo(e, a, n), n;
}, wt = (t, e, a) => e.has(t) || on("Cannot " + a), ut = (t, e, a) => (wt(t, e, "read from private field"), e.get(t)), et = (t, e, a) => e.has(t) ? on("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), rn = (t, e, a, i) => (wt(t, e, "write to private field"), e.set(t, a), a), It = (t, e, a) => (wt(t, e, "access private method"), a), ae, We, ne, ln, cn, un;
let L = class extends _ {
  constructor() {
    super(), et(this, ne), this._tableConfig = {
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
    ], this._tableItems = [], et(this, ae), et(this, We), this.consumeContext($, (t) => {
      rn(this, ae, t);
    }), It(this, ne, ln).call(this);
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
ae = /* @__PURE__ */ new WeakMap();
We = /* @__PURE__ */ new WeakMap();
ne = /* @__PURE__ */ new WeakSet();
ln = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    rn(this, We, t), It(this, ne, cn).call(this);
  });
};
cn = function() {
  ut(this, ae) && this.observe(ut(this, ae).items, (t) => It(this, ne, un).call(this, t), "umbCollectionItemsObserver");
};
un = function(t) {
  const e = ut(this, We);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const i = e({ entityType: a.entityType }) + _e.generateLocal({ unique: a.unique });
    return {
      id: a?.unique,
      entityType: a?.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: u`<a href=${i}>${a.pageData?.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: a.technicalSeoData?.contentType
        },
        {
          columnAlias: "statusCode",
          value: u`<content-audit-status-code-label .statusCode=${a.pageData?.statusCode}></content-audit-status-code-label>`
        }
      ]
    };
  });
};
L.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ue([
  d()
], L.prototype, "_tableConfig", 2);
Ue([
  d()
], L.prototype, "_tableColumns", 2);
Ue([
  d()
], L.prototype, "_tableItems", 2);
L = Ue([
  f("content-audit-status-codes-table-collection-view")
], L);
const _o = L, Co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return L;
  },
  default: _o
}, Symbol.toStringTag, { value: "Module" })), da = "ContentAudit.Workspace.StatusCodes", fo = [
  {
    type: "workspace",
    kind: "default",
    alias: da,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: nn,
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
      collectionAlias: vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: da
      }
    ]
  }
], Ao = [
  {
    type: "repository",
    alias: sn,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-D5TXs1uG.js")
  }
], yo = [
  {
    type: "collectionView",
    alias: po,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => Co),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: vt
      }
    ]
  }
], bo = [
  {
    type: "collection",
    kind: "default",
    alias: vt,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-BlFn5RV3.js"),
    meta: {
      repositoryAlias: sn
    }
  },
  ...Ao,
  ...yo
], To = [
  ...fo,
  ...uo,
  ...bo
], dn = "orphaned-pages-root", go = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: dn,
    menus: [Ne]
  }
}, vo = [go], Ot = "ContentAudit.Collection.OrphanedPages", wo = "ContentAudit.CollectionView.OrphanedPages.Table", pn = "ContentAudit.Repository.OrphanedPagesCollection";
var Io = Object.defineProperty, Oo = Object.getOwnPropertyDescriptor, mn = (t) => {
  throw TypeError(t);
}, Ve = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Oo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Io(e, a, n), n;
}, Et = (t, e, a) => e.has(t) || mn("Cannot " + a), dt = (t, e, a) => (Et(t, e, "read from private field"), e.get(t)), tt = (t, e, a) => e.has(t) ? mn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), hn = (t, e, a, i) => (Et(t, e, "write to private field"), e.set(t, a), a), St = (t, e, a) => (Et(t, e, "access private method"), a), ie, Me, se, _n, Cn, fn;
let k = class extends _ {
  constructor() {
    super(), tt(this, se), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], tt(this, ie), tt(this, Me), this.consumeContext($, (t) => {
      hn(this, ie, t);
    }), St(this, se, _n).call(this);
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
ie = /* @__PURE__ */ new WeakMap();
Me = /* @__PURE__ */ new WeakMap();
se = /* @__PURE__ */ new WeakSet();
_n = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    hn(this, Me, t), St(this, se, Cn).call(this);
  });
};
Cn = function() {
  dt(this, ie) && this.observe(dt(this, ie).items, (t) => St(this, se, fn).call(this, t), "umbCollectionItemsObserver");
};
fn = function(t) {
  const e = dt(this, Me);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const i = e({ entityType: "document" }) + _e.generateLocal({ unique: a.unique });
    return {
      id: a.unique,
      entityType: a.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: u`<a href=${i}>${a.url}</a>`
        }
      ]
    };
  });
};
k.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ve([
  d()
], k.prototype, "_tableConfig", 2);
Ve([
  d()
], k.prototype, "_tableColumns", 2);
Ve([
  d()
], k.prototype, "_tableItems", 2);
k = Ve([
  f("content-audit-orphaned-pages-table-collection-view")
], k);
const Eo = k, So = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return k;
  },
  default: Eo
}, Symbol.toStringTag, { value: "Module" })), pa = "ContentAudit.Workspace.OrphanedPages", $o = [
  {
    type: "workspace",
    kind: "default",
    alias: pa,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: dn,
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
      collectionAlias: Ot
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: pa
      }
    ]
  }
], Po = [
  {
    type: "repository",
    alias: pn,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-ibKikHgB.js")
  }
], Lo = [
  {
    type: "collectionView",
    alias: wo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => So),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Ot
      }
    ]
  }
], ko = [
  {
    type: "collection",
    kind: "default",
    alias: Ot,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-Do5cxEeH.js"),
    meta: {
      repositoryAlias: pn
    }
  },
  ...Po,
  ...Lo
], No = [
  ...$o,
  ...vo,
  ...ko
], An = "images-alt-text-root", Do = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: An,
    menus: [Ne]
  }
}, Ro = [Do], $t = "ContentAudit.Collection.ImagesAltText", Uo = "ContentAudit.CollectionView.ImagesAltText.Table", yn = "ContentAudit.Repository.ImagesAltTextCollection";
var Wo = Object.defineProperty, Vo = Object.getOwnPropertyDescriptor, bn = (t) => {
  throw TypeError(t);
}, xe = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Vo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Wo(e, a, n), n;
}, Pt = (t, e, a) => e.has(t) || bn("Cannot " + a), pt = (t, e, a) => (Pt(t, e, "read from private field"), e.get(t)), at = (t, e, a) => e.has(t) ? bn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Tn = (t, e, a, i) => (Pt(t, e, "write to private field"), e.set(t, a), a), Lt = (t, e, a) => (Pt(t, e, "access private method"), a), oe, Be, re, gn, vn, wn;
let N = class extends _ {
  constructor() {
    super(), at(this, re), this._tableConfig = {
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
    ], this._tableItems = [], at(this, oe), at(this, Be), this.consumeContext($, (t) => {
      Tn(this, oe, t);
    }), Lt(this, re, gn).call(this);
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
oe = /* @__PURE__ */ new WeakMap();
Be = /* @__PURE__ */ new WeakMap();
re = /* @__PURE__ */ new WeakSet();
gn = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Tn(this, Be, t), Lt(this, re, vn).call(this);
  });
};
vn = function() {
  pt(this, oe) && this.observe(pt(this, oe).items, (t) => Lt(this, re, wn).call(this, t), "umbCollectionItemsObserver");
};
wn = function(t) {
  const e = pt(this, Be);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const i = e({ entityType: "document" }) + _e.generateLocal({ unique: a.unique });
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
          value: u`<a href=${i}>${a.foundPage}</a>`
        },
        {
          columnAlias: "altText",
          value: a.altText
        }
      ]
    };
  });
};
N.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
xe([
  d()
], N.prototype, "_tableConfig", 2);
xe([
  d()
], N.prototype, "_tableColumns", 2);
xe([
  d()
], N.prototype, "_tableItems", 2);
N = xe([
  f("content-audit-images-alt-text-table-collection-view")
], N);
const Mo = N, xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return N;
  },
  default: Mo
}, Symbol.toStringTag, { value: "Module" })), ma = "ContentAudit.Workspace.ImagesAltText", Bo = [
  {
    type: "workspace",
    kind: "default",
    alias: ma,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: An,
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
      collectionAlias: $t
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ma
      }
    ]
  }
], jo = [
  {
    type: "repository",
    alias: yn,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-DpvHU_HZ.js")
  }
], zo = [
  {
    type: "collectionView",
    alias: Uo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => xo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: $t
      }
    ]
  }
], qo = [
  {
    type: "collection",
    kind: "default",
    alias: $t,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DzMGILfL.js"),
    meta: {
      repositoryAlias: yn
    }
  },
  ...jo,
  ...zo
], Yo = [
  ...Bo,
  ...Ro,
  ...qo
], In = "outbound-links-root", Fo = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: In,
    menus: [x]
  }
}, Ho = [Fo], kt = "ContentAudit.Collection.OutboundLinks", Ko = "ContentAudit.CollectionView.OutboundLinks.Table", On = "ContentAudit.Repository.OutboundLinksCollection";
var Go = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, En = (t) => {
  throw TypeError(t);
}, je = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Xo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Go(e, a, n), n;
}, Nt = (t, e, a) => e.has(t) || En("Cannot " + a), ha = (t, e, a) => (Nt(t, e, "read from private field"), e.get(t)), _a = (t, e, a) => e.has(t) ? En("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Jo = (t, e, a, i) => (Nt(t, e, "write to private field"), e.set(t, a), a), Sn = (t, e, a) => (Nt(t, e, "access private method"), a), le, $e, $n, Pn;
let D = class extends _ {
  constructor() {
    super(), _a(this, $e), this._tableConfig = {
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
    ], this._tableItems = [], _a(this, le), this.consumeContext($, (t) => {
      Jo(this, le, t), Sn(this, $e, $n).call(this);
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
le = /* @__PURE__ */ new WeakMap();
$e = /* @__PURE__ */ new WeakSet();
$n = function() {
  ha(this, le) && this.observe(ha(this, le).items, (t) => Sn(this, $e, Pn).call(this, t), "umbCollectionItemsObserver");
};
Pn = function(t) {
  this._tableItems = t.map((e) => ({
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
        value: e.links?.length
      }
    ]
  }));
};
D.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
je([
  d()
], D.prototype, "_tableConfig", 2);
je([
  d()
], D.prototype, "_tableColumns", 2);
je([
  d()
], D.prototype, "_tableItems", 2);
D = je([
  f("content-audit-outbound-links-table-collection-view")
], D);
const Qo = D, Zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return D;
  },
  default: Qo
}, Symbol.toStringTag, { value: "Module" })), Ca = "ContentAudit.Workspace.OutboundLinks", er = [
  {
    type: "workspace",
    kind: "default",
    alias: Ca,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: In,
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
      collectionAlias: kt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ca
      }
    ]
  }
], tr = [
  {
    type: "repository",
    alias: On,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-BxfQOdIs.js")
  }
], ar = [
  {
    type: "collectionView",
    alias: Ko,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => Zo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: kt
      }
    ]
  }
], nr = [
  {
    type: "collection",
    kind: "default",
    alias: kt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-Chz_6Fpj.js"),
    meta: {
      repositoryAlias: On
    }
  },
  ...tr,
  ...ar
], ir = [
  ...er,
  ...Ho,
  ...nr
], Ln = "inbound-links-root", sr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Ln,
    menus: [x]
  }
}, or = [sr], Dt = "ContentAudit.Collection.InboundLinks", rr = "ContentAudit.CollectionView.InboundLinks.Table", kn = "ContentAudit.Repository.InboundLinksCollection";
var lr = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, Nn = (t) => {
  throw TypeError(t);
}, ze = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? cr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && lr(e, a, n), n;
}, Rt = (t, e, a) => e.has(t) || Nn("Cannot " + a), fa = (t, e, a) => (Rt(t, e, "read from private field"), e.get(t)), Aa = (t, e, a) => e.has(t) ? Nn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), ur = (t, e, a, i) => (Rt(t, e, "write to private field"), e.set(t, a), a), Dn = (t, e, a) => (Rt(t, e, "access private method"), a), ce, Pe, Rn, Un;
let R = class extends _ {
  constructor() {
    super(), Aa(this, Pe), this._tableConfig = {
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
    ], this._tableItems = [], Aa(this, ce), this.consumeContext($, (t) => {
      ur(this, ce, t), Dn(this, Pe, Rn).call(this);
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
ce = /* @__PURE__ */ new WeakMap();
Pe = /* @__PURE__ */ new WeakSet();
Rn = function() {
  fa(this, ce) && this.observe(fa(this, ce).items, (t) => Dn(this, Pe, Un).call(this, t), "umbCollectionItemsObserver");
};
Un = function(t) {
  this._tableItems = t.map((e) => ({
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
        value: e.links?.length
      }
    ]
  }));
};
R.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ze([
  d()
], R.prototype, "_tableConfig", 2);
ze([
  d()
], R.prototype, "_tableColumns", 2);
ze([
  d()
], R.prototype, "_tableItems", 2);
R = ze([
  f("content-audit-inbound-links-table-collection-view")
], R);
const dr = R, pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return R;
  },
  default: dr
}, Symbol.toStringTag, { value: "Module" })), ya = "ContentAudit.Workspace.InboundLinks", mr = [
  {
    type: "workspace",
    kind: "default",
    alias: ya,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: Ln,
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
      collectionAlias: Dt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ya
      }
    ]
  }
], hr = [
  {
    type: "repository",
    alias: kn,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-DVL22RH_.js")
  }
], _r = [
  {
    type: "collectionView",
    alias: rr,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => pr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Dt
      }
    ]
  }
], Cr = [
  {
    type: "collection",
    kind: "default",
    alias: Dt,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-K3WRdCsX.js"),
    meta: {
      repositoryAlias: kn
    }
  },
  ...hr,
  ..._r
], fr = [
  ...mr,
  ...or,
  ...Cr
], Wn = "metadata-root", Ar = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: Wn,
    menus: ["ContentAudit.Menu.Metadata"]
  }
}, yr = [Ar], Ut = "ContentAudit.Collection.Metadata", br = "ContentAudit.CollectionView.Metadata.Table", ba = "ContentAudit.Workspace.Metadata", Tr = [
  {
    type: "workspace",
    kind: "default",
    alias: ba,
    name: "Metadata Root Workspace",
    meta: {
      entityType: Wn,
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
      collectionAlias: Ut
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ba
      }
    ]
  }
], Vn = "ContentAudit.Repository.MetadataCollection", gr = [
  {
    type: "repository",
    alias: Vn,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-DpksVWBq.js")
  }
], vr = [
  {
    type: "collectionView",
    alias: br,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element-CUfY9RQL.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Ut
      }
    ]
  }
], wr = [
  {
    type: "collection",
    kind: "default",
    alias: Ut,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: Vn
    }
  },
  ...gr,
  ...vr
], Ir = [
  ...Tr,
  ...yr,
  ...wr
], Or = [], Wt = "ContentAudit.Collection.DuplicateContent", Er = "ContentAudit.CollectionView.DuplicateContent.Table", Mn = "ContentAudit.Repository.DuplicateContentCollection";
var Sr = Object.defineProperty, $r = Object.getOwnPropertyDescriptor, qe = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? $r(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Sr(e, a, n), n;
};
let U = class extends _ {
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
U.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
qe([
  d()
], U.prototype, "_tableConfig", 2);
qe([
  d()
], U.prototype, "_tableColumns", 2);
qe([
  d()
], U.prototype, "_tableItems", 2);
U = qe([
  f("content-audit-duplicate-content-table-collection-view")
], U);
const Pr = U, Lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return U;
  },
  default: Pr
}, Symbol.toStringTag, { value: "Module" })), kr = "duplicate-content-root", Ta = "ContentAudit.Workspace.DuplicateContent", Nr = [
  {
    type: "workspace",
    kind: "default",
    alias: Ta,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: kr,
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
      collectionAlias: Wt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ta
      }
    ]
  }
], Dr = [
  {
    type: "repository",
    alias: Mn,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-DeVHH_xr.js")
  }
], Rr = [
  {
    type: "collectionView",
    alias: Er,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => Lr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Wt
      }
    ]
  }
], Ur = [
  {
    type: "collection",
    kind: "default",
    alias: Wt,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-C4rGWCXk.js"),
    meta: {
      repositoryAlias: Mn
    }
  },
  ...Dr,
  ...Rr
], Wr = [
  ...Nr,
  ...Or,
  ...Ur
], xn = "carbon-rating-root", Vr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: xn,
    menus: [De]
  }
}, Mr = [Vr], Vt = "ContentAudit.Collection.CarbonRating", xr = "ContentAudit.CollectionView.CarbonRating.Table", Bn = "ContentAudit.Repository.CarbonRatingCollection";
var Br = Object.defineProperty, jr = Object.getOwnPropertyDescriptor, jn = (t) => {
  throw TypeError(t);
}, Ye = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? jr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Br(e, a, n), n;
}, Mt = (t, e, a) => e.has(t) || jn("Cannot " + a), mt = (t, e, a) => (Mt(t, e, "read from private field"), e.get(t)), nt = (t, e, a) => e.has(t) ? jn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), zn = (t, e, a, i) => (Mt(t, e, "write to private field"), e.set(t, a), a), xt = (t, e, a) => (Mt(t, e, "access private method"), a), ue, Fe, de, qn, Yn, Fn;
let W = class extends _ {
  constructor() {
    super(), nt(this, de), this._tableConfig = {
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
    ], this._tableItems = [], nt(this, ue), nt(this, Fe), this.consumeContext($, (t) => {
      zn(this, ue, t);
    }), xt(this, de, qn).call(this);
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
ue = /* @__PURE__ */ new WeakMap();
Fe = /* @__PURE__ */ new WeakMap();
de = /* @__PURE__ */ new WeakSet();
qn = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    zn(this, Fe, t), xt(this, de, Yn).call(this);
  });
};
Yn = function() {
  mt(this, ue) && this.observe(mt(this, ue).items, (t) => xt(this, de, Fn).call(this, t), "umbCollectionItemsObserver");
};
Fn = function(t) {
  const e = mt(this, Fe);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const i = e({ entityType: a.entityType }) + _e.generateLocal({ unique: a.unique });
    return {
      id: a?.unique,
      entityType: a?.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: u`<a href=${i}>${a.pageData?.url}</a>`
        },
        {
          columnAlias: "contentType",
          value: a.technicalSeoData?.contentType
        },
        {
          columnAlias: "pageSize",
          value: u`${Math.round(a.performanceData?.totalBytes / 1024)}KB`
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
W.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ye([
  d()
], W.prototype, "_tableConfig", 2);
Ye([
  d()
], W.prototype, "_tableColumns", 2);
Ye([
  d()
], W.prototype, "_tableItems", 2);
W = Ye([
  f("content-audit-carbon-rating-table-collection-view")
], W);
const zr = W, qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return W;
  },
  default: zr
}, Symbol.toStringTag, { value: "Module" })), ga = "ContentAudit.Workspace.CarbonRating", Yr = [
  {
    type: "workspace",
    kind: "default",
    alias: ga,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: xn,
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
      collectionAlias: Vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ga
      }
    ]
  }
], Fr = [
  {
    type: "repository",
    alias: Bn,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository-CHItfm3o.js")
  }
], Hr = [
  {
    type: "collectionView",
    alias: xr,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => qr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Vt
      }
    ]
  }
], Kr = [
  {
    type: "collection",
    kind: "default",
    alias: Vt,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element-Br8vAvSE.js"),
    meta: {
      repositoryAlias: Bn
    }
  },
  ...Fr,
  ...Hr
], Gr = [
  ...Yr,
  ...Mr,
  ...Kr
], Hn = "core-web-vitals-root", Xr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: Hn,
    menus: [De]
  }
}, Jr = [Xr], Bt = "ContentAudit.Collection.CoreWebVitals", Qr = "ContentAudit.CollectionView.CoreWebVitals.Table", Kn = "ContentAudit.Repository.CoreWebVitalsCollection";
var Zr = Object.defineProperty, el = Object.getOwnPropertyDescriptor, Gn = (t) => {
  throw TypeError(t);
}, He = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? el(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Zr(e, a, n), n;
}, jt = (t, e, a) => e.has(t) || Gn("Cannot " + a), ht = (t, e, a) => (jt(t, e, "read from private field"), e.get(t)), it = (t, e, a) => e.has(t) ? Gn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Xn = (t, e, a, i) => (jt(t, e, "write to private field"), e.set(t, a), a), zt = (t, e, a) => (jt(t, e, "access private method"), a), pe, Ke, me, Jn, Qn, Zn;
let V = class extends _ {
  constructor() {
    super(), it(this, me), this._tableConfig = {
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
    ], this._tableItems = [], it(this, pe), it(this, Ke), this.consumeContext($, (t) => {
      Xn(this, pe, t);
    }), zt(this, me, Jn).call(this);
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
Ke = /* @__PURE__ */ new WeakMap();
me = /* @__PURE__ */ new WeakSet();
Jn = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Xn(this, Ke, t), zt(this, me, Qn).call(this);
  });
};
Qn = function() {
  ht(this, pe) && this.observe(ht(this, pe).items, (t) => zt(this, me, Zn).call(this, t), "umbCollectionItemsObserver");
};
Zn = function(t) {
  const e = ht(this, Ke);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.filter((a) => a.pageData.statusCode === 200).map((a) => {
    const i = e({ entityType: a.entityType }) + _e.generateLocal({ unique: a.unique });
    return {
      id: a?.unique,
      entityType: a?.entityType,
      icon: "icon-alert",
      data: [
        {
          columnAlias: "url",
          value: u`<a href=${i}>${a.pageData?.url}</a>`
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
V.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
He([
  d()
], V.prototype, "_tableConfig", 2);
He([
  d()
], V.prototype, "_tableColumns", 2);
He([
  d()
], V.prototype, "_tableItems", 2);
V = He([
  f("content-audit-core-web-vitals-table-collection-view")
], V);
const tl = V, al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return V;
  },
  default: tl
}, Symbol.toStringTag, { value: "Module" })), va = "ContentAudit.Workspace.CoreWebVitals", nl = [
  {
    type: "workspace",
    kind: "default",
    alias: va,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: Hn,
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
      collectionAlias: Bt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: va
      }
    ]
  }
], il = [
  {
    type: "repository",
    alias: Kn,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository-C5Uyop59.js")
  }
], sl = [
  {
    type: "collectionView",
    alias: Qr,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => al),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Bt
      }
    ]
  }
], ol = [
  {
    type: "collection",
    kind: "default",
    alias: Bt,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element-CpQ6vtvE.js"),
    meta: {
      repositoryAlias: Kn
    }
  },
  ...il,
  ...sl
], rl = [
  ...nl,
  ...Jr,
  ...ol
], ei = "export-root", ll = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: ei,
    menus: [Ct]
  }
}, cl = [ll], ul = "ContentAudit.Workspace.Export", dl = [
  {
    type: "workspace",
    kind: "default",
    alias: ul,
    name: "Export Root Workspace",
    element: () => import("./export.element-87KF_K7Y.js"),
    meta: {
      entityType: ei,
      headline: "Export"
    }
  }
], pl = [
  ...dl,
  ...cl
], K = "ContentAudit.Section", ml = {
  type: "section",
  alias: K,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, hl = {
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
}, _l = [
  {
    type: "menu",
    alias: x,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: Ne,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: De,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: Ct,
    name: "Tools Menu"
  }
], Cl = [
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "ContentAudit.SidebarMenu",
    name: "Content Audit Sidebar Menu",
    meta: {
      label: "Site Audit",
      menu: x
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
    alias: "ContentAudit.SidebarMenu.Performance",
    name: "Content Performance Sidebar Menu",
    meta: {
      label: "Performance",
      menu: De
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
      menu: Ct
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: K
      }
    ]
  }
], fl = [
  ml,
  hl,
  ..._l,
  ...Cl,
  ...Ps,
  ...Gs,
  ...lo,
  ...To,
  ...No,
  ...Yo,
  ...ir,
  ...fr,
  ...Ir,
  ...Wr,
  ...Gr,
  ...rl,
  ...pl
], Al = {
  type: "workspace",
  alias: Ie,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => cs),
  meta: {
    entityType: Va
  }
}, yl = [
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-B5YWzQUl.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ie
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-DxdQD27W.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ie
      }
    ]
  }
], bl = [
  Al,
  ...yl
], Tl = [
  {
    type: "modal",
    alias: "ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-BZ_QMPKB.js")
  }
], gl = [
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
], vl = {
  type: "workspaceView",
  alias: "Umbraco.Community.ContentAudit.Workspace",
  name: "ContentAudit Workspace",
  js: () => import("./contentaudit-workspace-view-ziCuHbq0.js"),
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
}, wl = [vl], Il = {
  type: "globalContext",
  alias: zi,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Hi)
}, Bl = async (t, e) => {
  e.registerMany([
    Il,
    ...fl,
    ...bl,
    ...Tl,
    ...gl,
    ...wl
  ]), t.consumeContext(si, async (a) => {
    if (!a) return;
    const i = a.getOpenApiConfiguration();
    h.setConfig({
      baseUrl: i?.base ?? "",
      auth: i?.token ?? void 0,
      credentials: i?.credentials ?? "same-origin"
    }), h.interceptors.request.use(async (n, s) => {
      const o = await i.token();
      return n.headers.set("Authorization", `Bearer ${o}`), n;
    });
  });
};
export {
  ye as A,
  st as B,
  Ma as C,
  Oe as D,
  pi as E,
  di as F,
  Bl as G,
  Ua as I,
  Ka as a,
  Ga as b,
  Z as c,
  F as d,
  ua as e,
  Ba as f,
  zi as g,
  Va as h,
  ft as i,
  ja as j,
  us as k,
  x as l,
  Ne as m,
  De as n,
  Ct as o,
  Ie as p,
  ot as q,
  lt as r,
  ge as s,
  Ki as t,
  ct as u,
  ds as v,
  ta as w,
  I as x,
  we as y,
  ve as z
};
//# sourceMappingURL=index-DCtP17IU.js.map
