import { UMB_AUTH_CONTEXT as Ia } from "@umbraco-cms/backoffice/auth";
import { css as y, property as x, customElement as f, html as u, nothing as Oa, state as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as _ } from "@umbraco-cms/backoffice/lit-element";
import { UmbControllerBase as Ea } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as ri } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as li, UMB_WORKSPACE_CONDITION_ALIAS as g, UMB_WORKSPACE_MODAL as he } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as q } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Qe, UmbArrayState as ye, UmbBooleanState as ci } from "@umbraco-cms/backoffice/observable-api";
import { UMB_NOTIFICATION_CONTEXT as ui } from "@umbraco-cms/backoffice/notification";
import { UMB_SERVER_CONTEXT as di } from "@umbraco-cms/backoffice/server";
import { HubConnectionBuilder as pi } from "@umbraco-cms/backoffice/external/signalr";
import { UmbRepositoryBase as mi } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as $, UMB_COLLECTION_ALIAS_CONDITION as v } from "@umbraco-cms/backoffice/collection";
import { UmbTextStyles as hi } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as _e } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Ce } from "@umbraco-cms/backoffice/router";
const _i = [
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
], Ci = [
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
var fi = Object.defineProperty, Ai = Object.getOwnPropertyDescriptor, Sa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ai(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && fi(e, a, n), n;
};
let we = class extends _ {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = _i[this.type - 1];
      return u`
                <uui-tag color=${t?.color}>
                    <uui-icon name="${t?.icon}"></uui-icon>
                    ${t?.label}
                </uui-tag>
            `;
    }
  }
};
we.styles = [
  y`
            uui-tag {
                font-size: var(--uui-type-default-size);

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Sa([
  x({ attribute: !1 })
], we.prototype, "type", 2);
we = Sa([
  f("content-audit-issue-type-label")
], we);
var yi = Object.defineProperty, bi = Object.getOwnPropertyDescriptor, $a = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? bi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && yi(e, a, n), n;
};
let Ie = class extends _ {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Ci[this.type - 1];
      return u`
                <uui-tag color=${t?.color}>
                    <uui-icon name="${t?.icon}"></uui-icon>
                    ${t?.label}
                </uui-tag>
            `;
    }
  }
};
Ie.styles = [
  y`
            uui-tag {
                font-size: var(--uui-type-default-size);

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
$a([
  x({ attribute: !1 })
], Ie.prototype, "type", 2);
Ie = $a([
  f("content-audit-priority-type-label")
], Ie);
var Ti = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, Pa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? gi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Ti(e, a, n), n;
};
let ot = class extends _ {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? u`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : Oa;
  }
};
Pa([
  x({ attribute: !1 })
], ot.prototype, "statusCode", 2);
ot = Pa([
  f("content-audit-status-code-label")
], ot);
var vi = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, La = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? wi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && vi(e, a, n), n;
};
let rt = class extends _ {
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
La([
  x({ attribute: !0 })
], rt.prototype, "value", 2);
rt = La([
  f("content-audit-carbon-intensity-label")
], rt);
var ka = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(ka || {}), lt = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(lt || {});
const Ii = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, a) => typeof a == "bigint" ? a.toString() : a
  )
}, Oi = ({
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
  let C;
  const G = c ?? ((m) => new Promise((b) => setTimeout(b, m)));
  return { stream: async function* () {
    let m = s ?? 3e3, b = 0;
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
        let O = new Request(h, j);
        t && (O = await t(h, j));
        const T = await (l.fetch ?? globalThis.fetch)(O);
        if (!T.ok)
          throw new Error(
            `SSE failed: ${T.status} ${T.statusText}`
          );
        if (!T.body) throw new Error("No body in SSE response");
        const E = T.body.pipeThrough(new TextDecoderStream()).getReader();
        let Je = "";
        const Yt = () => {
          try {
            E.cancel();
          } catch {
          }
        };
        B.addEventListener("abort", Yt);
        try {
          for (; ; ) {
            const { done: ni, value: ii } = await E.read();
            if (ni) break;
            Je += ii;
            const Ft = Je.split(`

`);
            Je = Ft.pop() ?? "";
            for (const si of Ft) {
              const oi = si.split(`
`), Ae = [];
              let Ht;
              for (const w of oi)
                if (w.startsWith("data:"))
                  Ae.push(w.replace(/^data:\s*/, ""));
                else if (w.startsWith("event:"))
                  Ht = w.replace(/^event:\s*/, "");
                else if (w.startsWith("id:"))
                  C = w.replace(/^id:\s*/, "");
                else if (w.startsWith("retry:")) {
                  const Gt = Number.parseInt(
                    w.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(Gt) || (m = Gt);
                }
              let z, Kt = !1;
              if (Ae.length) {
                const w = Ae.join(`
`);
                try {
                  z = JSON.parse(w), Kt = !0;
                } catch {
                  z = w;
                }
              }
              Kt && (n && await n(z), i && (z = await i(z))), a?.({
                data: z,
                event: Ht,
                id: C,
                retry: m
              }), Ae.length && (yield z);
            }
          }
        } finally {
          B.removeEventListener("abort", Yt), E.releaseLock();
        }
        break;
      } catch (j) {
        if (e?.(j), o !== void 0 && b >= o)
          break;
        const O = Math.min(
          m * 2 ** (b - 1),
          r ?? 3e4
        );
        await G(O);
      }
    }
  }() };
}, Ei = (t) => {
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
}, Si = (t) => {
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
}, $i = (t) => {
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
}, Na = ({
  allowReserved: t,
  explode: e,
  name: a,
  style: i,
  value: n
}) => {
  if (!e) {
    const r = (t ? n : n.map((c) => encodeURIComponent(c))).join(Si(i));
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
  const s = Ei(i), o = n.map((r) => i === "label" || i === "simple" ? t ? r : encodeURIComponent(r) : Ne({
    allowReserved: t,
    name: a,
    value: r
  })).join(s);
  return i === "label" || i === "matrix" ? s + o : o;
}, Ne = ({
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
}, Da = ({
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
  const o = $i(i), r = Object.entries(n).map(
    ([c, h]) => Ne({
      allowReserved: t,
      name: i === "deepObject" ? `${a}[${c}]` : c,
      value: h
    })
  ).join(o);
  return i === "label" || i === "matrix" ? o + r : r;
}, Pi = /\{[^{}]+\}/g, Li = ({ path: t, url: e }) => {
  let a = e;
  const i = e.match(Pi);
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
          Na({ explode: s, name: o, style: r, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        a = a.replace(
          n,
          Da({
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
          `;${Ne({
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
}, ki = ({
  baseUrl: t,
  path: e,
  query: a,
  querySerializer: i,
  url: n
}) => {
  const s = n.startsWith("/") ? n : `/${n}`;
  let o = (t ?? "") + s;
  e && (o = Li({ path: e, url: o }));
  let r = a ? i(a) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (o += `?${r}`), o;
};
function Ni(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const Di = async (t, e) => {
  const a = typeof e == "function" ? await e(t) : e;
  if (a)
    return t.scheme === "bearer" ? `Bearer ${a}` : t.scheme === "basic" ? `Basic ${btoa(a)}` : a;
}, Ra = ({
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
          const c = Na({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "form",
            value: r,
            ...e
          });
          c && s.push(c);
        } else if (typeof r == "object") {
          const c = Da({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "deepObject",
            value: r,
            ...a
          });
          c && s.push(c);
        } else {
          const c = Ne({
            allowReserved: t,
            name: o,
            value: r
          });
          c && s.push(c);
        }
    }
  return s.join("&");
}, Ri = (t) => {
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
}, Ui = (t, e) => e ? !!(t.headers.has(e) || t.query?.[e] || t.headers.get("Cookie")?.includes(`${e}=`)) : !1, Vi = async ({
  security: t,
  ...e
}) => {
  for (const a of t) {
    if (Ui(e, a.name))
      continue;
    const i = await Di(a, e.auth);
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
}, Xt = (t) => ki({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : Ra(t.querySerializer),
  url: t.url
}), Jt = (t, e) => {
  const a = { ...t, ...e };
  return a.baseUrl?.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = Ua(t.headers, e.headers), a;
}, Wi = (t) => {
  const e = [];
  return t.forEach((a, i) => {
    e.push([i, a]);
  }), e;
}, Ua = (...t) => {
  const e = new Headers();
  for (const a of t) {
    if (!a)
      continue;
    const i = a instanceof Headers ? Wi(a) : Object.entries(a);
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
class Ze {
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
const xi = () => ({
  error: new Ze(),
  request: new Ze(),
  response: new Ze()
}), Mi = Ra({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), Bi = {
  "Content-Type": "application/json"
}, Va = (t = {}) => ({
  ...Ii,
  headers: Bi,
  parseAs: "auto",
  querySerializer: Mi,
  ...t
}), ji = (t = {}) => {
  let e = Jt(Va(), t);
  const a = () => ({ ...e }), i = (h) => (e = Jt(e, h), a()), n = xi(), s = async (h) => {
    const l = {
      ...e,
      ...h,
      fetch: h.fetch ?? e.fetch ?? globalThis.fetch,
      headers: Ua(e.headers, h.headers),
      serializedBody: void 0
    };
    l.security && await Vi({
      ...l,
      security: l.security
    }), l.requestValidator && await l.requestValidator(l), l.body !== void 0 && l.bodySerializer && (l.serializedBody = l.bodySerializer(l.body)), (l.body === void 0 || l.serializedBody === "") && l.headers.delete("Content-Type");
    const C = Xt(l);
    return { opts: l, url: C };
  }, o = async (h) => {
    const { opts: l, url: C } = await s(h), G = {
      redirect: "follow",
      ...l,
      body: Ni(l)
    };
    let S = new Request(C, G);
    for (const A of n.request.fns)
      A && (S = await A(S, l));
    const fe = l.fetch;
    let m = await fe(S);
    for (const A of n.response.fns)
      A && (m = await A(m, S, l));
    const b = {
      request: S,
      response: m
    };
    if (m.ok) {
      const A = (l.parseAs === "auto" ? Ri(m.headers.get("Content-Type")) : l.parseAs) ?? "json";
      if (m.status === 204 || m.headers.get("Content-Length") === "0") {
        let E;
        switch (A) {
          case "arrayBuffer":
          case "blob":
          case "text":
            E = await m[A]();
            break;
          case "formData":
            E = new FormData();
            break;
          case "stream":
            E = m.body;
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
          T = await m[A]();
          break;
        case "stream":
          return l.responseStyle === "data" ? m.body : {
            data: m.body,
            ...b
          };
      }
      return A === "json" && (l.responseValidator && await l.responseValidator(T), l.responseTransformer && (T = await l.responseTransformer(T))), l.responseStyle === "data" ? T : {
        data: T,
        ...b
      };
    }
    const B = await m.text();
    let X;
    try {
      X = JSON.parse(B);
    } catch {
    }
    const j = X ?? B;
    let O = j;
    for (const A of n.error.fns)
      A && (O = await A(j, m, S, l));
    if (O = O || {}, l.throwOnError)
      throw O;
    return l.responseStyle === "data" ? void 0 : {
      error: O,
      ...b
    };
  }, r = (h) => (l) => o({ ...l, method: h }), c = (h) => async (l) => {
    const { opts: C, url: G } = await s(l);
    return Oi({
      ...C,
      body: C.body,
      headers: C.headers,
      method: h,
      onRequest: async (S, fe) => {
        let m = new Request(S, fe);
        for (const b of n.request.fns)
          b && (m = await b(m, C));
        return m;
      },
      url: G
    });
  };
  return {
    buildUrl: Xt,
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
}, p = ji(Va({
  baseUrl: "http://localhost:26297",
  throwOnError: !0
}));
class be {
  static getCollection(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit",
      ...e
    });
  }
  static delete(e) {
    return (e.client ?? p).delete({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}",
      ...e
    });
  }
  static getByKey(e) {
    return (e.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}",
      ...e
    });
  }
  static exportByKey(e) {
    return (e.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/export",
      ...e
    });
  }
  static overviewByKey(e) {
    return (e.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/{id}/overview",
      ...e
    });
  }
  static getAllImages(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/all-images",
      ...e
    });
  }
  static getDuplicateContentUrls(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/duplicate-content",
      ...e
    });
  }
  static export(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/export",
      ...e
    });
  }
  static getExternalLinks(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/external-links",
      ...e
    });
  }
  static getHealthScore(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/health-score",
      ...e
    });
  }
  static getInternalLinks(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/internal-links",
      ...e
    });
  }
  static getLatestAuditData(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/latest-data",
      ...e
    });
  }
  static getPagesWithMissingMetadata(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/missing-metadata",
      ...e
    });
  }
  static getOrphanedPages(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/orphaned-pages",
      ...e
    });
  }
  static overview(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/audit/overview",
      ...e
    });
  }
  static children(e) {
    return (e.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/tree/audit/children/{parentId}",
      ...e
    });
  }
  static root(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/tree/audit/root",
      ...e
    });
  }
}
class Te {
  static cancelCrawl(e) {
    return (e?.client ?? p).post({
      url: "/umbraco/content-audit/management/api/v1/crawl/cancel",
      ...e
    });
  }
  static startCrawl(e) {
    return (e?.client ?? p).post({
      url: "/umbraco/content-audit/management/api/v1/crawl/start",
      ...e
    });
  }
  static getCrawlStatus(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/crawl/status",
      ...e
    });
  }
}
class Wa {
  static getAllIssues(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/issue",
      ...e
    });
  }
  static getIssue(e) {
    return (e.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/issue/{id}",
      ...e
    });
  }
}
class zi {
  static getSettings(e) {
    return (e?.client ?? p).get({
      url: "/umbraco/content-audit/management/api/v1/settings",
      ...e
    });
  }
}
var qi = Object.defineProperty, Yi = Object.getOwnPropertyDescriptor, xa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Yi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && qi(e, a, n), n;
};
let Oe = class extends _ {
  _getColour() {
    return this.value != null ? this.value.rating == lt.POOR ? "danger" : this.value.rating == lt.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == ka.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
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
Oe.styles = [
  y`
            uui-tag {
                font-size: var(--uui-type-default-size);
            }
        `
];
xa([
  x({ attribute: !1 })
], Oe.prototype, "value", 2);
Oe = xa([
  f("content-audit-metric-label")
], Oe);
const Ee = "ContentAudit.Workspace", Fi = "ContentAudit.Context", Ma = "content-audit";
class Hi {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getLatestAuditOverview() {
    return await q(this.#e, be.overview());
  }
  async getPagesWithMissingMetadata() {
    return await q(this.#e, be.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await q(this.#e, Wa.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await q(this.#e, be.getHealthScore());
  }
  async getAuditOverviews() {
    return await q(this.#e, be.getCollection({
      query: { skip: 0, take: 5 }
    }));
  }
}
class Ki {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getSettings() {
    return await q(this.#e, zi.getSettings());
  }
}
class Gi extends Ea {
  #e;
  #n;
  constructor(e) {
    super(e), this.#e = new Hi(this), this.#n = new Ki(this);
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
    return this.#n.getSettings();
  }
  async getAuditOverviews() {
    return this.#e.getAuditOverviews();
  }
}
class ct extends Ea {
  constructor(e) {
    super(e), this.workspaceAlias = Ee, this.#n = new Qe(void 0), this.latestAuditOverview = this.#n.asObservable(), this.#o = new ye([], (a) => a.key), this.auditOverviews = this.#o.asObservable(), this.#r = new ye([], (a) => a.unique), this.pagesWithMissingMetadata = this.#r.asObservable(), this.#l = new ye([], (a) => a.name), this.topIssues = this.#l.asObservable(), this.#c = new Qe(void 0), this.healthScore = this.#c.asObservable(), this.#u = new Qe(void 0), this.settings = this.#u.asObservable(), this.#i = new ye([], (a) => a.unique), this.crawlData = this.#i.asObservable(), this.#a = new ci(!1), this.isRunning = this.#a.asObservable(), this.provideContext(Ba, this), this.provideContext(li, this), this.#e = new Gi(this), this.consumeContext(Ia, (a) => {
      this.#d = a, this.#m();
    }), this.consumeContext(di, (a) => {
      this.#p = a;
    });
  }
  getEntityType() {
    return Ma;
  }
  #e;
  #n;
  #o;
  #r;
  #l;
  #c;
  #u;
  #i;
  #a;
  #t;
  #d;
  #p;
  #m() {
    this.observe(this.#d?.isAuthorized, async (e) => {
      if (e !== void 0)
        if (e) {
          const a = await this.#d?.getLatestToken();
          a && this.#h(a);
        } else
          this.#t?.stop(), this.#t = void 0;
    });
  }
  #h(e) {
    const i = `${this.#p?.getServerUrl() ?? ""}/umbraco/content-audit/hub`;
    this.#t = new pi().withUrl(i, {
      accessTokenFactory: () => e
    }).withAutomaticReconnect().build(), this.#t.on("crawlStarted", () => {
      this.#a.setValue(!0), this.#i.setValue([]);
    }), this.#t.on("crawlProgress", (n) => {
      this.#i.appendOne(n);
    }), this.#t.on("crawlCompleted", () => {
      this.#a.setValue(!1);
    }), this.#t.on("crawlFailed", (n) => {
      this.#a.setValue(!1);
    }), this.#t.on("crawlCancelled", () => {
      this.#a.setValue(!1);
    }), this.#t.start().then(async () => {
      try {
        const { data: n } = await Te.getCrawlStatus();
        n && (this.#a.setValue(n.isRunning), n.results?.length && this.#i.setValue(n.results));
      } catch {
      }
    }).catch((n) => console.error("Content Audit SignalR connection failed", n)), this.#t.onreconnected(async () => {
      try {
        const { data: n } = await Te.getCrawlStatus();
        n && (this.#a.setValue(n.isRunning), n.results?.length && this.#i.setValue(n.results));
      } catch {
      }
    });
  }
  hostDisconnected() {
    super.hostDisconnected(), this.#t?.stop(), this.#t = void 0;
  }
  async #s(e) {
    (await this.getContext(ui))?.peek("danger", {
      data: { headline: "Content Audit", message: e }
    });
  }
  async getLatestAuditOverview() {
    const { data: e, error: a } = await this.#e.getLatestAuditOverview();
    e ? this.#n.setValue(e) : a && this.#s("Failed to load latest audit overview.");
  }
  async getAuditOverviews() {
    const { data: e, error: a } = await this.#e.getAuditOverviews();
    if (e && e.items) {
      const i = e.items.sort((n, s) => {
        const o = n.runDate ? new Date(n.runDate).getTime() : 0;
        return (s.runDate ? new Date(s.runDate).getTime() : 0) - o;
      });
      this.#o.setValue(i);
    } else a && this.#s("Failed to load audit history.");
  }
  async getPagesWithMissingMetadata() {
    const { data: e, error: a } = await this.#e.getPagesWithMissingMetadata();
    e ? this.#r.setValue(e.items) : a && this.#s("Failed to load pages with missing metadata.");
  }
  async getTopIssues() {
    const { data: e, error: a } = await this.#e.getTopIssues();
    e ? this.#l.setValue(e.items) : a && this.#s("Failed to load top issues.");
  }
  async getHealthScore() {
    const { data: e, error: a } = await this.#e.getHealthScore();
    e ? this.#c.setValue(e) : a && this.#s("Failed to load health score.");
  }
  async startCrawl() {
    return Te.startCrawl();
  }
  async cancelCrawl() {
    return Te.cancelCrawl();
  }
  async getSettings() {
    const { data: e, error: a } = await this.#e.getSettings();
    e ? this.#u.setValue(e) : a && this.#s("Failed to load settings.");
  }
}
const Ba = new ri(
  "ContentAuditContext"
), Xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: Ba,
  ContentAuditContext: ct,
  default: ct
}, Symbol.toStringTag, { value: "Module" }));
const Ji = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
const ge = globalThis, Ct = ge.ShadowRoot && (ge.ShadyCSS === void 0 || ge.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ja = /* @__PURE__ */ Symbol(), Qt = /* @__PURE__ */ new WeakMap();
let Qi = class {
  constructor(e, a, i) {
    if (this._$cssResult$ = !0, i !== ja) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = a;
  }
  get styleSheet() {
    let e = this.o;
    const a = this.t;
    if (Ct && e === void 0) {
      const i = a !== void 0 && a.length === 1;
      i && (e = Qt.get(a)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Qt.set(a, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Zi = (t) => new Qi(typeof t == "string" ? t : t + "", void 0, ja), es = (t, e) => {
  if (Ct) t.adoptedStyleSheets = e.map(((a) => a instanceof CSSStyleSheet ? a : a.styleSheet));
  else for (const a of e) {
    const i = document.createElement("style"), n = ge.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = a.cssText, t.appendChild(i);
  }
}, Zt = Ct ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const i of e.cssRules) a += i.cssText;
  return Zi(a);
})(t) : t;
const { is: ts, defineProperty: as, getOwnPropertyDescriptor: ns, getOwnPropertyNames: is, getOwnPropertySymbols: ss, getPrototypeOf: os } = Object, De = globalThis, ea = De.trustedTypes, rs = ea ? ea.emptyScript : "", ls = De.reactiveElementPolyfillSupport, Q = (t, e) => t, ut = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? rs : null;
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
} }, za = (t, e) => !ts(t, e), ta = { attribute: !0, type: String, converter: ut, reflect: !1, useDefault: !1, hasChanged: za };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), De.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class J extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, a = ta) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(e, a), !a.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, a);
      n !== void 0 && as(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, a, i) {
    const { get: n, set: s } = ns(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? ta;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Q("elementProperties"))) return;
    const e = os(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Q("properties"))) {
      const a = this.properties, i = [...is(a), ...ss(a)];
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
      for (const n of i) a.unshift(Zt(n));
    } else e !== void 0 && a.push(Zt(e));
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
    return es(e, this.constructor.elementStyles), e;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : ut).toAttribute(a, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, a) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : ut;
      this._$Em = n, this[n] = o.fromAttribute(a, s.type) ?? this._$Ej?.get(n) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, a, i) {
    if (e !== void 0) {
      const n = this.constructor, s = this[e];
      if (i ??= n.getPropertyOptions(e), !((i.hasChanged ?? za)(s, a) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
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
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[Q("elementProperties")] = /* @__PURE__ */ new Map(), J[Q("finalized")] = /* @__PURE__ */ new Map(), ls?.({ ReactiveElement: J }), (De.reactiveElementVersions ??= []).push("2.1.0");
var cs = Object.getOwnPropertyDescriptor, us = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? cs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = o(n) || n);
  return n;
};
let Se = class extends _ {
  constructor() {
    super(), this._workspaceContext = new ct(this);
  }
  render() {
    return u`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Se = us([
  Ji("content-audit-workspace-root")
], Se);
const ds = Se, ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Se;
  },
  default: ds
}, Symbol.toStringTag, { value: "Module" })), M = "ContentAudit.Menu", Re = "ContentAudit.Menu.Metadata", Ue = "ContentAudit.Menu.Performance", ft = "ContentAudit.Menu.Tools", At = "ContentAudit.Collection.Issues", ms = "ContentAudit.CollectionView.Issues.Table", qa = "ContentAudit.Repository.IssuesCollection";
class hs {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getCollection(e) {
    const { data: a, error: i } = await q(this.#e, Wa.getAllIssues({ query: e }));
    if (i)
      return { error: i };
    if (!a)
      return { data: { items: [], total: 0 } };
    const { items: n, total: s } = a;
    return { data: { items: n, total: s } };
  }
}
class aa extends mi {
  #e;
  constructor(e) {
    super(e), this.#e = new hs(e);
  }
  async requestCollection(e) {
    return this.#e.getCollection(e);
  }
}
const _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: aa,
  default: aa
}, Symbol.toStringTag, { value: "Module" }));
var Cs = Object.defineProperty, fs = Object.getOwnPropertyDescriptor, Ya = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? fs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Cs(e, a, n), n;
};
let $e = class extends _ {
  render() {
    return this.value ? u`
			<span>
				<a href=${"section/audit/workspace/issues/edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : Oa;
  }
};
$e.styles = [
  hi,
  y`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
Ya([
  x({ attribute: !1 })
], $e.prototype, "value", 2);
$e = Ya([
  f("content-audit-issues-table-name-column-layout")
], $e);
var As = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, Fa = (t) => {
  throw TypeError(t);
}, Y = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? ys(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && As(e, a, n), n;
}, yt = (t, e, a) => e.has(t) || Fa("Cannot " + a), na = (t, e, a) => (yt(t, e, "read from private field"), e.get(t)), ia = (t, e, a) => e.has(t) ? Fa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), bs = (t, e, a, i) => (yt(t, e, "write to private field"), e.set(t, a), a), ve = (t, e, a) => (yt(t, e, "access private method"), a), ee, H, Ha, bt, Ka;
let I = class extends _ {
  constructor() {
    super(), ia(this, H), this.data = [], this.hideSummary = !1, this._issues = [], this._tableConfig = {
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
    ], this._tableItems = [], ia(this, ee), this.consumeContext($, (t) => {
      bs(this, ee, t), ve(this, H, Ha).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && (this._issues = this.data, ve(this, H, bt).call(this, this.data));
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
                ${ve(this, H, Ka).call(this)}
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
Ha = function() {
  na(this, ee) && this.observe(na(this, ee).items, (t) => {
    this._issues = t, ve(this, H, bt).call(this, t);
  }, "umbCollectionItemsObserver");
};
bt = function(t) {
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
Ka = function() {
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
  x({ type: Array, attribute: !1 })
], I.prototype, "data", 2);
Y([
  x({ type: Boolean, attribute: "hide-summary" })
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
const Ts = I, gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return I;
  },
  default: Ts
}, Symbol.toStringTag, { value: "Module" })), Tt = "ContentAudit.Collection.Audits", vs = "ContentAudit.CollectionView.Audits.Table", Ga = "ContentAudit.Repository.AuditsCollection", ws = [
  {
    type: "repository",
    alias: Ga,
    name: "Audits Collection Repository",
    api: () => import("./audits-collection.repository-CkfUqNv6.js")
  }
], Is = [
  {
    type: "collectionView",
    alias: vs,
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
        match: Tt
      }
    ]
  }
], Os = [
  {
    type: "collection",
    kind: "default",
    alias: Tt,
    name: "Audits Collection",
    element: () => import("./audits.element-CQMJCtGh.js"),
    meta: {
      repositoryAlias: Ga
    }
  },
  ...ws,
  ...Is
], Xa = "audits", Ja = "audits-root", Es = [
  {
    type: "entityAction",
    kind: "default",
    alias: "ContentAudit.EntityAction.Audit.Delete",
    name: "Delete Audit Entity Action",
    weight: 100,
    api: () => import("./delete-audit.action-DJr8I2AA.js"),
    forEntityTypes: [Xa],
    meta: {
      icon: "icon-trash",
      label: "Delete"
    }
  }
], Z = "ContentAudit.Workspace.Audits", et = "ContentAudit.MenuItem.Audits", sa = "ContentAudit.Workspace.AuditsRoot", Ss = [
  {
    type: "menuItem",
    kind: "tree",
    alias: et,
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
      menuItemAlias: et
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
      menuItemAlias: et
    },
    conditions: [
      {
        alias: g,
        match: sa
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
        match: sa
      }
    ]
  }
], $s = [
  {
    type: "repository",
    alias: "ContentAudit.Repository.Audits",
    name: "Content Audit Audits Repository",
    api: () => import("./audits-tree.repository-BKa2Wg6o.js")
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
    forEntityTypes: [Xa, Ja]
  }
], Ps = [
  {
    type: "workspace",
    kind: "routable",
    alias: Z,
    name: "Audits Workspace",
    api: () => import("./audits-workspace.context-ufQL2j4K.js"),
    meta: {
      entityType: "audits"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Audits.Overview",
    name: "Audits Workspace Overview View",
    js: () => import("./audits-overview-workspace-view.element-BfVDneRM.js"),
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
    js: () => import("./audits-issues-workspace-view.element-B3O4oU7j.js"),
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
], oa = "ContentAudit.Workspace.AuditsRoot", Ls = [
  {
    type: "workspace",
    kind: "default",
    alias: oa,
    name: "Audits Root Workspace",
    meta: {
      entityType: Ja,
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
      collectionAlias: Tt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: oa
      }
    ]
  }
], ks = [
  ...Ps,
  ...Ls
], Ns = [
  ...Os,
  ...Es,
  ...Ss,
  ...$s,
  ...ks
], Qa = "all-pages-root", Ds = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: Qa,
    menus: [M]
  }
}, Rs = [Ds], ra = "ContentAudit.Workspace.AllPagesRoot", F = "ContentAudit.Workspace.AllPages", Us = [
  {
    type: "workspace",
    kind: "routable",
    alias: F,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-B73NURAJ.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-Bk0lVwP7.js"),
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
    js: () => import("./all-pages-links-workspace-view.element-9Fom2wMH.js"),
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
    js: () => import("./all-pages-images-workspace-view.element-CM3f8XjP.js"),
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
    js: () => import("./all-pages-resources-workspace-view.element-DwPmTxhe.js"),
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
    js: () => import("./all-pages-issues-workspace-view.element-CZe6Amj2.js"),
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
], gt = "ContentAudit.Collection.AllPages", Vs = "ContentAudit.CollectionView.AllPages.Table", Za = "ContentAudit.Repository.AllPagesCollection";
var Ws = Object.defineProperty, xs = Object.getOwnPropertyDescriptor, en = (t) => {
  throw TypeError(t);
}, Ve = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? xs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Ws(e, a, n), n;
}, vt = (t, e, a) => e.has(t) || en("Cannot " + a), la = (t, e, a) => (vt(t, e, "read from private field"), e.get(t)), ca = (t, e, a) => e.has(t) ? en("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Ms = (t, e, a, i) => (vt(t, e, "write to private field"), e.set(t, a), a), tn = (t, e, a) => (vt(t, e, "access private method"), a), te, Pe, an, nn;
let P = class extends _ {
  constructor() {
    super(), ca(this, Pe), this._tableConfig = {
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
    ], this._tableItems = [], ca(this, te), this.consumeContext($, (t) => {
      Ms(this, te, t), tn(this, Pe, an).call(this);
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
Pe = /* @__PURE__ */ new WeakSet();
an = function() {
  la(this, te) && this.observe(la(this, te).items, (t) => tn(this, Pe, nn).call(this, t), "umbCollectionItemsObserver");
};
nn = function(t) {
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
Ve([
  d()
], P.prototype, "_tableConfig", 2);
Ve([
  d()
], P.prototype, "_tableColumns", 2);
Ve([
  d()
], P.prototype, "_tableItems", 2);
P = Ve([
  f("content-audit-all-pages-table-collection-view")
], P);
const Bs = P, js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return P;
  },
  default: Bs
}, Symbol.toStringTag, { value: "Module" })), zs = [
  {
    type: "workspace",
    kind: "default",
    alias: ra,
    name: "All Pages Root Workspace",
    meta: {
      entityType: Qa,
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
      collectionAlias: gt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ra
      }
    ]
  }
], qs = [...Us, ...zs], Ys = [
  {
    type: "repository",
    alias: Za,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-CAOD_XSS.js")
  }
], Fs = [
  {
    type: "collectionView",
    alias: Vs,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => js),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: gt
      }
    ]
  }
], Hs = [
  {
    type: "collection",
    kind: "default",
    alias: gt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element-DMHaFpCF.js"),
    meta: {
      repositoryAlias: Za
    }
  },
  ...Ys,
  ...Fs
], Ks = "ContentAudit.Repository.AllPages.Detail", Gs = "ContentAudit.Store.AllPages.Detail", Xs = [
  {
    type: "repository",
    alias: Ks,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository-BAwlism7.js")
  },
  {
    type: "store",
    alias: Gs,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], Js = [...Xs], Qs = [
  ...qs,
  ...Rs,
  ...Hs,
  ...Js
], sn = "issues-root", Zs = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: sn,
    menus: [M]
  }
}, eo = [Zs], ua = "ContentAudit.Workspace.IssuesRoot", da = "ContentAudit.Workspace.Issues", to = [
  {
    type: "workspace",
    kind: "routable",
    alias: da,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-BKbJkRHX.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-C7J-5zqX.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: g,
        match: da
      }
    ]
  }
], ao = [
  {
    type: "workspace",
    kind: "default",
    alias: ua,
    name: "Issues Root Workspace",
    meta: {
      entityType: sn,
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
      collectionAlias: At
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ua
      }
    ]
  }
], no = [...to, ...ao], io = [
  {
    type: "repository",
    alias: qa,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => _s)
  }
], so = [
  {
    type: "collectionView",
    alias: ms,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => gs),
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
], oo = [
  {
    type: "collection",
    kind: "default",
    alias: At,
    name: "Issues Collection",
    element: () => import("./issues.element-DJRmm4jS.js"),
    meta: {
      repositoryAlias: qa
    }
  },
  ...io,
  ...so
], ro = "ContentAudit.Repository.Issues.Detail", lo = "ContentAudit.Store.Issues.Detail", co = [
  {
    type: "repository",
    alias: ro,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-iKruX5AI.js")
  },
  {
    type: "store",
    alias: lo,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], uo = [...co], po = [
  ...no,
  ...eo,
  ...oo,
  ...uo
], on = "status-codes-root", mo = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: on,
    menus: [M]
  }
}, ho = [mo], wt = "ContentAudit.Collection.StatusCodes", _o = "ContentAudit.CollectionView.StatusCodes.Table", rn = "ContentAudit.Repository.StatusCodesCollection";
var Co = Object.defineProperty, fo = Object.getOwnPropertyDescriptor, ln = (t) => {
  throw TypeError(t);
}, We = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? fo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Co(e, a, n), n;
}, It = (t, e, a) => e.has(t) || ln("Cannot " + a), dt = (t, e, a) => (It(t, e, "read from private field"), e.get(t)), tt = (t, e, a) => e.has(t) ? ln("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), cn = (t, e, a, i) => (It(t, e, "write to private field"), e.set(t, a), a), Ot = (t, e, a) => (It(t, e, "access private method"), a), ae, xe, ne, un, dn, pn;
let L = class extends _ {
  constructor() {
    super(), tt(this, ne), this._tableConfig = {
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
    ], this._tableItems = [], tt(this, ae), tt(this, xe), this.consumeContext($, (t) => {
      cn(this, ae, t);
    }), Ot(this, ne, un).call(this);
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
xe = /* @__PURE__ */ new WeakMap();
ne = /* @__PURE__ */ new WeakSet();
un = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    cn(this, xe, t), Ot(this, ne, dn).call(this);
  });
};
dn = function() {
  dt(this, ae) && this.observe(dt(this, ae).items, (t) => Ot(this, ne, pn).call(this, t), "umbCollectionItemsObserver");
};
pn = function(t) {
  const e = dt(this, xe);
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
We([
  d()
], L.prototype, "_tableConfig", 2);
We([
  d()
], L.prototype, "_tableColumns", 2);
We([
  d()
], L.prototype, "_tableItems", 2);
L = We([
  f("content-audit-status-codes-table-collection-view")
], L);
const Ao = L, yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return L;
  },
  default: Ao
}, Symbol.toStringTag, { value: "Module" })), pa = "ContentAudit.Workspace.StatusCodes", bo = [
  {
    type: "workspace",
    kind: "default",
    alias: pa,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: on,
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
      collectionAlias: wt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: pa
      }
    ]
  }
], To = [
  {
    type: "repository",
    alias: rn,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-Bm2oexGK.js")
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
        alias: v,
        match: wt
      }
    ]
  }
], vo = [
  {
    type: "collection",
    kind: "default",
    alias: wt,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-BlFn5RV3.js"),
    meta: {
      repositoryAlias: rn
    }
  },
  ...To,
  ...go
], wo = [
  ...bo,
  ...ho,
  ...vo
], mn = "orphaned-pages-root", Io = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: mn,
    menus: [Re]
  }
}, Oo = [Io], Et = "ContentAudit.Collection.OrphanedPages", Eo = "ContentAudit.CollectionView.OrphanedPages.Table", hn = "ContentAudit.Repository.OrphanedPagesCollection";
var So = Object.defineProperty, $o = Object.getOwnPropertyDescriptor, _n = (t) => {
  throw TypeError(t);
}, Me = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? $o(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && So(e, a, n), n;
}, St = (t, e, a) => e.has(t) || _n("Cannot " + a), pt = (t, e, a) => (St(t, e, "read from private field"), e.get(t)), at = (t, e, a) => e.has(t) ? _n("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Cn = (t, e, a, i) => (St(t, e, "write to private field"), e.set(t, a), a), $t = (t, e, a) => (St(t, e, "access private method"), a), ie, Be, se, fn, An, yn;
let k = class extends _ {
  constructor() {
    super(), at(this, se), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], at(this, ie), at(this, Be), this.consumeContext($, (t) => {
      Cn(this, ie, t);
    }), $t(this, se, fn).call(this);
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
Be = /* @__PURE__ */ new WeakMap();
se = /* @__PURE__ */ new WeakSet();
fn = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Cn(this, Be, t), $t(this, se, An).call(this);
  });
};
An = function() {
  pt(this, ie) && this.observe(pt(this, ie).items, (t) => $t(this, se, yn).call(this, t), "umbCollectionItemsObserver");
};
yn = function(t) {
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
Me([
  d()
], k.prototype, "_tableConfig", 2);
Me([
  d()
], k.prototype, "_tableColumns", 2);
Me([
  d()
], k.prototype, "_tableItems", 2);
k = Me([
  f("content-audit-orphaned-pages-table-collection-view")
], k);
const Po = k, Lo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return k;
  },
  default: Po
}, Symbol.toStringTag, { value: "Module" })), ma = "ContentAudit.Workspace.OrphanedPages", ko = [
  {
    type: "workspace",
    kind: "default",
    alias: ma,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: mn,
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
      collectionAlias: Et
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ma
      }
    ]
  }
], No = [
  {
    type: "repository",
    alias: hn,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-D3C9pit0.js")
  }
], Do = [
  {
    type: "collectionView",
    alias: Eo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Lo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Et
      }
    ]
  }
], Ro = [
  {
    type: "collection",
    kind: "default",
    alias: Et,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-Do5cxEeH.js"),
    meta: {
      repositoryAlias: hn
    }
  },
  ...No,
  ...Do
], Uo = [
  ...ko,
  ...Oo,
  ...Ro
], bn = "images-alt-text-root", Vo = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: bn,
    menus: [Re]
  }
}, Wo = [Vo], Pt = "ContentAudit.Collection.ImagesAltText", xo = "ContentAudit.CollectionView.ImagesAltText.Table", Tn = "ContentAudit.Repository.ImagesAltTextCollection";
var Mo = Object.defineProperty, Bo = Object.getOwnPropertyDescriptor, gn = (t) => {
  throw TypeError(t);
}, je = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Bo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Mo(e, a, n), n;
}, Lt = (t, e, a) => e.has(t) || gn("Cannot " + a), mt = (t, e, a) => (Lt(t, e, "read from private field"), e.get(t)), nt = (t, e, a) => e.has(t) ? gn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), vn = (t, e, a, i) => (Lt(t, e, "write to private field"), e.set(t, a), a), kt = (t, e, a) => (Lt(t, e, "access private method"), a), oe, ze, re, wn, In, On;
let N = class extends _ {
  constructor() {
    super(), nt(this, re), this._tableConfig = {
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
    ], this._tableItems = [], nt(this, oe), nt(this, ze), this.consumeContext($, (t) => {
      vn(this, oe, t);
    }), kt(this, re, wn).call(this);
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
ze = /* @__PURE__ */ new WeakMap();
re = /* @__PURE__ */ new WeakSet();
wn = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    vn(this, ze, t), kt(this, re, In).call(this);
  });
};
In = function() {
  mt(this, oe) && this.observe(mt(this, oe).items, (t) => kt(this, re, On).call(this, t), "umbCollectionItemsObserver");
};
On = function(t) {
  const e = mt(this, ze);
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
je([
  d()
], N.prototype, "_tableConfig", 2);
je([
  d()
], N.prototype, "_tableColumns", 2);
je([
  d()
], N.prototype, "_tableItems", 2);
N = je([
  f("content-audit-images-alt-text-table-collection-view")
], N);
const jo = N, zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return N;
  },
  default: jo
}, Symbol.toStringTag, { value: "Module" })), ha = "ContentAudit.Workspace.ImagesAltText", qo = [
  {
    type: "workspace",
    kind: "default",
    alias: ha,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: bn,
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
      collectionAlias: Pt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ha
      }
    ]
  }
], Yo = [
  {
    type: "repository",
    alias: Tn,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-CMIDit-b.js")
  }
], Fo = [
  {
    type: "collectionView",
    alias: xo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => zo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Pt
      }
    ]
  }
], Ho = [
  {
    type: "collection",
    kind: "default",
    alias: Pt,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DzMGILfL.js"),
    meta: {
      repositoryAlias: Tn
    }
  },
  ...Yo,
  ...Fo
], Ko = [
  ...qo,
  ...Wo,
  ...Ho
], En = "outbound-links-root", Go = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: En,
    menus: [M]
  }
}, Xo = [Go], Nt = "ContentAudit.Collection.OutboundLinks", Jo = "ContentAudit.CollectionView.OutboundLinks.Table", Sn = "ContentAudit.Repository.OutboundLinksCollection";
var Qo = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, $n = (t) => {
  throw TypeError(t);
}, qe = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Zo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Qo(e, a, n), n;
}, Dt = (t, e, a) => e.has(t) || $n("Cannot " + a), _a = (t, e, a) => (Dt(t, e, "read from private field"), e.get(t)), Ca = (t, e, a) => e.has(t) ? $n("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), er = (t, e, a, i) => (Dt(t, e, "write to private field"), e.set(t, a), a), Pn = (t, e, a) => (Dt(t, e, "access private method"), a), le, Le, Ln, kn;
let D = class extends _ {
  constructor() {
    super(), Ca(this, Le), this._tableConfig = {
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
    ], this._tableItems = [], Ca(this, le), this.consumeContext($, (t) => {
      er(this, le, t), Pn(this, Le, Ln).call(this);
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
Le = /* @__PURE__ */ new WeakSet();
Ln = function() {
  _a(this, le) && this.observe(_a(this, le).items, (t) => Pn(this, Le, kn).call(this, t), "umbCollectionItemsObserver");
};
kn = function(t) {
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
qe([
  d()
], D.prototype, "_tableConfig", 2);
qe([
  d()
], D.prototype, "_tableColumns", 2);
qe([
  d()
], D.prototype, "_tableItems", 2);
D = qe([
  f("content-audit-outbound-links-table-collection-view")
], D);
const tr = D, ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return D;
  },
  default: tr
}, Symbol.toStringTag, { value: "Module" })), fa = "ContentAudit.Workspace.OutboundLinks", nr = [
  {
    type: "workspace",
    kind: "default",
    alias: fa,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: En,
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
      collectionAlias: Nt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: fa
      }
    ]
  }
], ir = [
  {
    type: "repository",
    alias: Sn,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-CxZs66bL.js")
  }
], sr = [
  {
    type: "collectionView",
    alias: Jo,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => ar),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Nt
      }
    ]
  }
], or = [
  {
    type: "collection",
    kind: "default",
    alias: Nt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-Chz_6Fpj.js"),
    meta: {
      repositoryAlias: Sn
    }
  },
  ...ir,
  ...sr
], rr = [
  ...nr,
  ...Xo,
  ...or
], Nn = "inbound-links-root", lr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Nn,
    menus: [M]
  }
}, cr = [lr], Rt = "ContentAudit.Collection.InboundLinks", ur = "ContentAudit.CollectionView.InboundLinks.Table", Dn = "ContentAudit.Repository.InboundLinksCollection";
var dr = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, Rn = (t) => {
  throw TypeError(t);
}, Ye = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? pr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && dr(e, a, n), n;
}, Ut = (t, e, a) => e.has(t) || Rn("Cannot " + a), Aa = (t, e, a) => (Ut(t, e, "read from private field"), e.get(t)), ya = (t, e, a) => e.has(t) ? Rn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), mr = (t, e, a, i) => (Ut(t, e, "write to private field"), e.set(t, a), a), Un = (t, e, a) => (Ut(t, e, "access private method"), a), ce, ke, Vn, Wn;
let R = class extends _ {
  constructor() {
    super(), ya(this, ke), this._tableConfig = {
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
    ], this._tableItems = [], ya(this, ce), this.consumeContext($, (t) => {
      mr(this, ce, t), Un(this, ke, Vn).call(this);
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
ke = /* @__PURE__ */ new WeakSet();
Vn = function() {
  Aa(this, ce) && this.observe(Aa(this, ce).items, (t) => Un(this, ke, Wn).call(this, t), "umbCollectionItemsObserver");
};
Wn = function(t) {
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
Ye([
  d()
], R.prototype, "_tableConfig", 2);
Ye([
  d()
], R.prototype, "_tableColumns", 2);
Ye([
  d()
], R.prototype, "_tableItems", 2);
R = Ye([
  f("content-audit-inbound-links-table-collection-view")
], R);
const hr = R, _r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return R;
  },
  default: hr
}, Symbol.toStringTag, { value: "Module" })), ba = "ContentAudit.Workspace.InboundLinks", Cr = [
  {
    type: "workspace",
    kind: "default",
    alias: ba,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: Nn,
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
      collectionAlias: Rt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ba
      }
    ]
  }
], fr = [
  {
    type: "repository",
    alias: Dn,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-D1JY7NrB.js")
  }
], Ar = [
  {
    type: "collectionView",
    alias: ur,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => _r),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Rt
      }
    ]
  }
], yr = [
  {
    type: "collection",
    kind: "default",
    alias: Rt,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-K3WRdCsX.js"),
    meta: {
      repositoryAlias: Dn
    }
  },
  ...fr,
  ...Ar
], br = [
  ...Cr,
  ...cr,
  ...yr
], xn = "metadata-root", Tr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: xn,
    menus: ["ContentAudit.Menu.Metadata"]
  }
}, gr = [Tr], Vt = "ContentAudit.Collection.Metadata", vr = "ContentAudit.CollectionView.Metadata.Table", Ta = "ContentAudit.Workspace.Metadata", wr = [
  {
    type: "workspace",
    kind: "default",
    alias: Ta,
    name: "Metadata Root Workspace",
    meta: {
      entityType: xn,
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
      collectionAlias: Vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ta
      }
    ]
  }
], Mn = "ContentAudit.Repository.MetadataCollection", Ir = [
  {
    type: "repository",
    alias: Mn,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-YYL5Xxi4.js")
  }
], Or = [
  {
    type: "collectionView",
    alias: vr,
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
        match: Vt
      }
    ]
  }
], Er = [
  {
    type: "collection",
    kind: "default",
    alias: Vt,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: Mn
    }
  },
  ...Ir,
  ...Or
], Sr = [
  ...wr,
  ...gr,
  ...Er
], $r = [], Wt = "ContentAudit.Collection.DuplicateContent", Pr = "ContentAudit.CollectionView.DuplicateContent.Table", Bn = "ContentAudit.Repository.DuplicateContentCollection";
var Lr = Object.defineProperty, kr = Object.getOwnPropertyDescriptor, Fe = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? kr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Lr(e, a, n), n;
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
Fe([
  d()
], U.prototype, "_tableConfig", 2);
Fe([
  d()
], U.prototype, "_tableColumns", 2);
Fe([
  d()
], U.prototype, "_tableItems", 2);
U = Fe([
  f("content-audit-duplicate-content-table-collection-view")
], U);
const Nr = U, Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return U;
  },
  default: Nr
}, Symbol.toStringTag, { value: "Module" })), Rr = "duplicate-content-root", ga = "ContentAudit.Workspace.DuplicateContent", Ur = [
  {
    type: "workspace",
    kind: "default",
    alias: ga,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: Rr,
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
        match: ga
      }
    ]
  }
], Vr = [
  {
    type: "repository",
    alias: Bn,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-Bs1Jp354.js")
  }
], Wr = [
  {
    type: "collectionView",
    alias: Pr,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => Dr),
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
], xr = [
  {
    type: "collection",
    kind: "default",
    alias: Wt,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-C4rGWCXk.js"),
    meta: {
      repositoryAlias: Bn
    }
  },
  ...Vr,
  ...Wr
], Mr = [
  ...Ur,
  ...$r,
  ...xr
], jn = "carbon-rating-root", Br = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: jn,
    menus: [Ue]
  }
}, jr = [Br], xt = "ContentAudit.Collection.CarbonRating", zr = "ContentAudit.CollectionView.CarbonRating.Table", zn = "ContentAudit.Repository.CarbonRatingCollection";
var qr = Object.defineProperty, Yr = Object.getOwnPropertyDescriptor, qn = (t) => {
  throw TypeError(t);
}, He = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Yr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && qr(e, a, n), n;
}, Mt = (t, e, a) => e.has(t) || qn("Cannot " + a), ht = (t, e, a) => (Mt(t, e, "read from private field"), e.get(t)), it = (t, e, a) => e.has(t) ? qn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Yn = (t, e, a, i) => (Mt(t, e, "write to private field"), e.set(t, a), a), Bt = (t, e, a) => (Mt(t, e, "access private method"), a), ue, Ke, de, Fn, Hn, Kn;
let V = class extends _ {
  constructor() {
    super(), it(this, de), this._tableConfig = {
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
    ], this._tableItems = [], it(this, ue), it(this, Ke), this.consumeContext($, (t) => {
      Yn(this, ue, t);
    }), Bt(this, de, Fn).call(this);
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
Ke = /* @__PURE__ */ new WeakMap();
de = /* @__PURE__ */ new WeakSet();
Fn = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Yn(this, Ke, t), Bt(this, de, Hn).call(this);
  });
};
Hn = function() {
  ht(this, ue) && this.observe(ht(this, ue).items, (t) => Bt(this, de, Kn).call(this, t), "umbCollectionItemsObserver");
};
Kn = function(t) {
  const e = ht(this, Ke);
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
  f("content-audit-carbon-rating-table-collection-view")
], V);
const Fr = V, Hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return V;
  },
  default: Fr
}, Symbol.toStringTag, { value: "Module" })), va = "ContentAudit.Workspace.CarbonRating", Kr = [
  {
    type: "workspace",
    kind: "default",
    alias: va,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: jn,
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
      collectionAlias: xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: va
      }
    ]
  }
], Gr = [
  {
    type: "repository",
    alias: zn,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository-DUQRTjOR.js")
  }
], Xr = [
  {
    type: "collectionView",
    alias: zr,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => Hr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: xt
      }
    ]
  }
], Jr = [
  {
    type: "collection",
    kind: "default",
    alias: xt,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element-Br8vAvSE.js"),
    meta: {
      repositoryAlias: zn
    }
  },
  ...Gr,
  ...Xr
], Qr = [
  ...Kr,
  ...jr,
  ...Jr
], Gn = "core-web-vitals-root", Zr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: Gn,
    menus: [Ue]
  }
}, el = [Zr], jt = "ContentAudit.Collection.CoreWebVitals", tl = "ContentAudit.CollectionView.CoreWebVitals.Table", Xn = "ContentAudit.Repository.CoreWebVitalsCollection";
var al = Object.defineProperty, nl = Object.getOwnPropertyDescriptor, Jn = (t) => {
  throw TypeError(t);
}, Ge = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? nl(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && al(e, a, n), n;
}, zt = (t, e, a) => e.has(t) || Jn("Cannot " + a), _t = (t, e, a) => (zt(t, e, "read from private field"), e.get(t)), st = (t, e, a) => e.has(t) ? Jn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Qn = (t, e, a, i) => (zt(t, e, "write to private field"), e.set(t, a), a), qt = (t, e, a) => (zt(t, e, "access private method"), a), pe, Xe, me, Zn, ei, ti;
let W = class extends _ {
  constructor() {
    super(), st(this, me), this._tableConfig = {
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
    ], this._tableItems = [], st(this, pe), st(this, Xe), this.consumeContext($, (t) => {
      Qn(this, pe, t);
    }), qt(this, me, Zn).call(this);
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
Xe = /* @__PURE__ */ new WeakMap();
me = /* @__PURE__ */ new WeakSet();
Zn = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Qn(this, Xe, t), qt(this, me, ei).call(this);
  });
};
ei = function() {
  _t(this, pe) && this.observe(_t(this, pe).items, (t) => qt(this, me, ti).call(this, t), "umbCollectionItemsObserver");
};
ti = function(t) {
  const e = _t(this, Xe);
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
W.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ge([
  d()
], W.prototype, "_tableConfig", 2);
Ge([
  d()
], W.prototype, "_tableColumns", 2);
Ge([
  d()
], W.prototype, "_tableItems", 2);
W = Ge([
  f("content-audit-core-web-vitals-table-collection-view")
], W);
const il = W, sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return W;
  },
  default: il
}, Symbol.toStringTag, { value: "Module" })), wa = "ContentAudit.Workspace.CoreWebVitals", ol = [
  {
    type: "workspace",
    kind: "default",
    alias: wa,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: Gn,
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
      collectionAlias: jt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: wa
      }
    ]
  }
], rl = [
  {
    type: "repository",
    alias: Xn,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository-CpgoG0zd.js")
  }
], ll = [
  {
    type: "collectionView",
    alias: tl,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => sl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: jt
      }
    ]
  }
], cl = [
  {
    type: "collection",
    kind: "default",
    alias: jt,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element-CpQ6vtvE.js"),
    meta: {
      repositoryAlias: Xn
    }
  },
  ...rl,
  ...ll
], ul = [
  ...ol,
  ...el,
  ...cl
], ai = "export-root", dl = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: ai,
    menus: [ft]
  }
}, pl = [dl], ml = "ContentAudit.Workspace.Export", hl = [
  {
    type: "workspace",
    kind: "default",
    alias: ml,
    name: "Export Root Workspace",
    element: () => import("./export.element-DyxcztLr.js"),
    meta: {
      entityType: ai,
      headline: "Export"
    }
  }
], _l = [
  ...hl,
  ...pl
], K = "ContentAudit.Section", Cl = {
  type: "section",
  alias: K,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, fl = {
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
}, Al = [
  {
    type: "menu",
    alias: M,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: Re,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: Ue,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: ft,
    name: "Tools Menu"
  }
], yl = [
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
      menu: Re
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
      menu: Ue
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
      menu: ft
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: K
      }
    ]
  }
], bl = [
  Cl,
  fl,
  ...Al,
  ...yl,
  ...Ns,
  ...Qs,
  ...po,
  ...wo,
  ...Uo,
  ...Ko,
  ...rr,
  ...br,
  ...Sr,
  ...Mr,
  ...Qr,
  ...ul,
  ..._l
], Tl = {
  type: "workspace",
  alias: Ee,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => ps),
  meta: {
    entityType: Ma
  }
}, gl = [
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-DSnzOMb8.js"),
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
    alias: "ContentAudit.WorkspaceView.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-Cq6of7ep.js"),
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
], vl = [
  Tl,
  ...gl
], wl = [
  {
    type: "modal",
    alias: "ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-Dc21GeXV.js")
  }
], Il = [
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
], Ol = {
  type: "workspaceView",
  alias: "Umbraco.Community.ContentAudit.Workspace",
  name: "ContentAudit Workspace",
  js: () => import("./contentaudit-workspace-view-BRvvCMyU.js"),
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
}, El = [Ol], Sl = {
  type: "globalContext",
  alias: Fi,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Xi)
}, Fl = async (t, e) => {
  e.registerMany([
    Sl,
    ...bl,
    ...vl,
    ...wl,
    ...Il,
    ...El
  ]), t.consumeContext(Ia, async (a) => {
    if (!a) return;
    const i = a.getOpenApiConfiguration();
    p.setConfig({
      baseUrl: i?.base ?? "",
      auth: i?.token ?? void 0,
      credentials: i?.credentials ?? "same-origin"
    }), p.interceptors.request.use(async (n, s) => {
      const o = await i.token();
      return n.headers.set("Authorization", `Bearer ${o}`), n;
    });
  });
};
export {
  be as A,
  ot as B,
  Ba as C,
  Se as D,
  Ci as E,
  _i as F,
  Fl as G,
  Wa as I,
  Xa as a,
  Ja as b,
  Z as c,
  F as d,
  da as e,
  za as f,
  Fi as g,
  Ma as h,
  At as i,
  qa as j,
  ms as k,
  M as l,
  Re as m,
  Ue as n,
  ft as o,
  Ee as p,
  rt as q,
  ct as r,
  we as s,
  Ji as t,
  ut as u,
  hs as v,
  aa as w,
  I as x,
  Oe as y,
  Ie as z
};
//# sourceMappingURL=index-QfE00jYe.js.map
