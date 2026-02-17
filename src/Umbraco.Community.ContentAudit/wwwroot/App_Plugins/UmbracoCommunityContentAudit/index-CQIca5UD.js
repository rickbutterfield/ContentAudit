import { UMB_AUTH_CONTEXT as si } from "@umbraco-cms/backoffice/auth";
import { css as y, property as x, customElement as b, html as u, nothing as wa, state as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as _ } from "@umbraco-cms/backoffice/lit-element";
import { UmbControllerBase as Ia } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as oi } from "@umbraco-cms/backoffice/context-api";
import { tryExecute as q } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Xe, UmbArrayState as Je } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as ri } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as $, UMB_COLLECTION_ALIAS_CONDITION as v } from "@umbraco-cms/backoffice/collection";
import { UmbTextStyles as li } from "@umbraco-cms/backoffice/style";
import { UMB_WORKSPACE_CONDITION_ALIAS as g, UMB_WORKSPACE_MODAL as he } from "@umbraco-cms/backoffice/workspace";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as _e } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as Ce } from "@umbraco-cms/backoffice/router";
const ci = [
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
], ui = [
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
var mi = Object.defineProperty, di = Object.getOwnPropertyDescriptor, Oa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? di(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && mi(e, a, n), n;
};
let ge = class extends _ {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = ci[this.type - 1];
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
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Oa([
  x({ attribute: !1 })
], ge.prototype, "type", 2);
ge = Oa([
  b("content-audit-issue-type-label")
], ge);
var pi = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, Ea = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? hi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && pi(e, a, n), n;
};
let ve = class extends _ {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = ui[this.type - 1];
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
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Ea([
  x({ attribute: !1 })
], ve.prototype, "type", 2);
ve = Ea([
  b("content-audit-priority-type-label")
], ve);
var _i = Object.defineProperty, Ci = Object.getOwnPropertyDescriptor, Sa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ci(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && _i(e, a, n), n;
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
  x({ attribute: !1 })
], st.prototype, "statusCode", 2);
st = Sa([
  b("content-audit-status-code-label")
], st);
var bi = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, $a = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? fi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && bi(e, a, n), n;
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
  x({ attribute: !0 })
], ot.prototype, "value", 2);
ot = $a([
  b("content-audit-carbon-intensity-label")
], ot);
var Pa = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(Pa || {}), rt = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(rt || {});
const yi = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, a) => typeof a == "bigint" ? a.toString() : a
  )
}, Ai = ({
  onRequest: t,
  onSseError: e,
  onSseEvent: a,
  responseTransformer: i,
  responseValidator: n,
  sseDefaultRetryDelay: s,
  sseMaxRetryAttempts: o,
  sseMaxRetryDelay: r,
  sseSleepFn: c,
  url: p,
  ...l
}) => {
  let C;
  const G = c ?? ((d) => new Promise((A) => setTimeout(A, d)));
  return { stream: async function* () {
    let d = s ?? 3e3, A = 0;
    const j = l.signal ?? new AbortController().signal;
    for (; !j.aborted; ) {
      A++;
      const X = l.headers instanceof Headers ? l.headers : new Headers(l.headers);
      C !== void 0 && X.set("Last-Event-ID", C);
      try {
        const B = {
          redirect: "follow",
          ...l,
          body: l.serializedBody,
          headers: X,
          signal: j
        };
        let O = new Request(p, B);
        t && (O = await t(p, B));
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
        j.addEventListener("abort", qt);
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
`), fe = [];
              let Ht;
              for (const w of ii)
                if (w.startsWith("data:"))
                  fe.push(w.replace(/^data:\s*/, ""));
                else if (w.startsWith("event:"))
                  Ht = w.replace(/^event:\s*/, "");
                else if (w.startsWith("id:"))
                  C = w.replace(/^id:\s*/, "");
                else if (w.startsWith("retry:")) {
                  const Kt = Number.parseInt(
                    w.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(Kt) || (d = Kt);
                }
              let z, Ft = !1;
              if (fe.length) {
                const w = fe.join(`
`);
                try {
                  z = JSON.parse(w), Ft = !0;
                } catch {
                  z = w;
                }
              }
              Ft && (n && await n(z), i && (z = await i(z))), a?.({
                data: z,
                event: Ht,
                id: C,
                retry: d
              }), fe.length && (yield z);
            }
          }
        } finally {
          j.removeEventListener("abort", qt), E.releaseLock();
        }
        break;
      } catch (B) {
        if (e?.(B), o !== void 0 && A >= o)
          break;
        const O = Math.min(
          d * 2 ** (A - 1),
          r ?? 3e4
        );
        await G(O);
      }
    }
  }() };
}, Ti = (t) => {
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
}, gi = (t) => {
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
}, Ua = ({
  allowReserved: t,
  explode: e,
  name: a,
  style: i,
  value: n
}) => {
  if (!e) {
    const r = (t ? n : n.map((c) => encodeURIComponent(c))).join(gi(i));
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
  const s = Ti(i), o = n.map((r) => i === "label" || i === "simple" ? t ? r : encodeURIComponent(r) : Ue({
    allowReserved: t,
    name: a,
    value: r
  })).join(s);
  return i === "label" || i === "matrix" ? s + o : o;
}, Ue = ({
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
}, La = ({
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
    const p = c.join(",");
    switch (i) {
      case "form":
        return `${a}=${p}`;
      case "label":
        return `.${p}`;
      case "matrix":
        return `;${a}=${p}`;
      default:
        return p;
    }
  }
  const o = vi(i), r = Object.entries(n).map(
    ([c, p]) => Ue({
      allowReserved: t,
      name: i === "deepObject" ? `${a}[${c}]` : c,
      value: p
    })
  ).join(o);
  return i === "label" || i === "matrix" ? o + r : r;
}, wi = /\{[^{}]+\}/g, Ii = ({ path: t, url: e }) => {
  let a = e;
  const i = e.match(wi);
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
          Ua({ explode: s, name: o, style: r, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        a = a.replace(
          n,
          La({
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
          `;${Ue({
            name: o,
            value: c
          })}`
        );
        continue;
      }
      const p = encodeURIComponent(
        r === "label" ? `.${c}` : c
      );
      a = a.replace(n, p);
    }
  return a;
}, Oi = ({
  baseUrl: t,
  path: e,
  query: a,
  querySerializer: i,
  url: n
}) => {
  const s = n.startsWith("/") ? n : `/${n}`;
  let o = (t ?? "") + s;
  e && (o = Ii({ path: e, url: o }));
  let r = a ? i(a) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (o += `?${r}`), o;
};
function Ei(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const Si = async (t, e) => {
  const a = typeof e == "function" ? await e(t) : e;
  if (a)
    return t.scheme === "bearer" ? `Bearer ${a}` : t.scheme === "basic" ? `Basic ${btoa(a)}` : a;
}, ka = ({
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
          const c = Ua({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "form",
            value: r,
            ...e
          });
          c && s.push(c);
        } else if (typeof r == "object") {
          const c = La({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "deepObject",
            value: r,
            ...a
          });
          c && s.push(c);
        } else {
          const c = Ue({
            allowReserved: t,
            name: o,
            value: r
          });
          c && s.push(c);
        }
    }
  return s.join("&");
}, $i = (t) => {
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
}, Pi = (t, e) => e ? !!(t.headers.has(e) || t.query?.[e] || t.headers.get("Cookie")?.includes(`${e}=`)) : !1, Ui = async ({
  security: t,
  ...e
}) => {
  for (const a of t) {
    if (Pi(e, a.name))
      continue;
    const i = await Si(a, e.auth);
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
}, Gt = (t) => Oi({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : ka(t.querySerializer),
  url: t.url
}), Xt = (t, e) => {
  const a = { ...t, ...e };
  return a.baseUrl?.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = Na(t.headers, e.headers), a;
}, Li = (t) => {
  const e = [];
  return t.forEach((a, i) => {
    e.push([i, a]);
  }), e;
}, Na = (...t) => {
  const e = new Headers();
  for (const a of t) {
    if (!a)
      continue;
    const i = a instanceof Headers ? Li(a) : Object.entries(a);
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
const ki = () => ({
  error: new Qe(),
  request: new Qe(),
  response: new Qe()
}), Ni = ka({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), Di = {
  "Content-Type": "application/json"
}, Da = (t = {}) => ({
  ...yi,
  headers: Di,
  parseAs: "auto",
  querySerializer: Ni,
  ...t
}), Ri = (t = {}) => {
  let e = Xt(Da(), t);
  const a = () => ({ ...e }), i = (p) => (e = Xt(e, p), a()), n = ki(), s = async (p) => {
    const l = {
      ...e,
      ...p,
      fetch: p.fetch ?? e.fetch ?? globalThis.fetch,
      headers: Na(e.headers, p.headers),
      serializedBody: void 0
    };
    l.security && await Ui({
      ...l,
      security: l.security
    }), l.requestValidator && await l.requestValidator(l), l.body !== void 0 && l.bodySerializer && (l.serializedBody = l.bodySerializer(l.body)), (l.body === void 0 || l.serializedBody === "") && l.headers.delete("Content-Type");
    const C = Gt(l);
    return { opts: l, url: C };
  }, o = async (p) => {
    const { opts: l, url: C } = await s(p), G = {
      redirect: "follow",
      ...l,
      body: Ei(l)
    };
    let S = new Request(C, G);
    for (const f of n.request.fns)
      f && (S = await f(S, l));
    const be = l.fetch;
    let d = await be(S);
    for (const f of n.response.fns)
      f && (d = await f(d, S, l));
    const A = {
      request: S,
      response: d
    };
    if (d.ok) {
      const f = (l.parseAs === "auto" ? $i(d.headers.get("Content-Type")) : l.parseAs) ?? "json";
      if (d.status === 204 || d.headers.get("Content-Length") === "0") {
        let E;
        switch (f) {
          case "arrayBuffer":
          case "blob":
          case "text":
            E = await d[f]();
            break;
          case "formData":
            E = new FormData();
            break;
          case "stream":
            E = d.body;
            break;
          default:
            E = {};
            break;
        }
        return l.responseStyle === "data" ? E : {
          data: E,
          ...A
        };
      }
      let T;
      switch (f) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          T = await d[f]();
          break;
        case "stream":
          return l.responseStyle === "data" ? d.body : {
            data: d.body,
            ...A
          };
      }
      return f === "json" && (l.responseValidator && await l.responseValidator(T), l.responseTransformer && (T = await l.responseTransformer(T))), l.responseStyle === "data" ? T : {
        data: T,
        ...A
      };
    }
    const j = await d.text();
    let X;
    try {
      X = JSON.parse(j);
    } catch {
    }
    const B = X ?? j;
    let O = B;
    for (const f of n.error.fns)
      f && (O = await f(B, d, S, l));
    if (O = O || {}, l.throwOnError)
      throw O;
    return l.responseStyle === "data" ? void 0 : {
      error: O,
      ...A
    };
  }, r = (p) => (l) => o({ ...l, method: p }), c = (p) => async (l) => {
    const { opts: C, url: G } = await s(l);
    return Ai({
      ...C,
      body: C.body,
      headers: C.headers,
      method: p,
      onRequest: async (S, be) => {
        let d = new Request(S, be);
        for (const A of n.request.fns)
          A && (d = await A(d, C));
        return d;
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
}, h = Ri(Da({
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
class Wi {
  static startCrawl(e) {
    return (e?.client ?? h).sse.get({
      url: "/umbraco/content-audit/management/api/v1/crawl",
      ...e
    });
  }
}
class Ra {
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
class Vi {
  static getSettings(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/settings",
      ...e
    });
  }
}
var xi = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, Wa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Mi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && xi(e, a, n), n;
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
                font-size: 14px;
            }
        `
];
Wa([
  x({ attribute: !1 })
], we.prototype, "value", 2);
we = Wa([
  b("content-audit-metric-label")
], we);
const Ie = "Umb.Workspace.ContentAudit", ji = "Umb.Context.ContentAudit", Va = "content-audit";
class Bi {
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
    return await q(this.#e, Ra.getAllIssues({
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
class zi {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getSettings() {
    return await q(this.#e, Vi.getSettings());
  }
}
class qi extends Ia {
  #e;
  #t;
  constructor(e) {
    super(e), this.#e = new Bi(this), this.#t = new zi(this);
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
    super(e), this.workspaceAlias = Ie, this.#t = new Xe(void 0), this.latestAuditOverview = this.#t.asObservable(), this.#a = new Je([], (a) => a.key), this.auditOverviews = this.#a.asObservable(), this.#n = new Je([], (a) => a.unique), this.pagesWithMissingMetadata = this.#n.asObservable(), this.#i = new Je([], (a) => a.name), this.topIssues = this.#i.asObservable(), this.#s = new Xe(void 0), this.healthScore = this.#s.asObservable(), this.#o = new Xe(void 0), this.settings = this.#o.asObservable(), this.provideContext(xa, this), this.#e = new qi(this);
  }
  getEntityType() {
    return Va;
  }
  #e;
  #t;
  #a;
  #n;
  #i;
  #s;
  #o;
  async getLatestAuditOverview() {
    const { data: e } = await this.#e.getLatestAuditOverview();
    e && this.#t.setValue(e);
  }
  async getAuditOverviews() {
    const { data: e } = await this.#e.getAuditOverviews();
    if (e && e.items) {
      const a = e.items.sort((i, n) => {
        const s = i.runDate ? new Date(i.runDate).getTime() : 0;
        return (n.runDate ? new Date(n.runDate).getTime() : 0) - s;
      });
      this.#a.setValue(a);
    }
  }
  async getPagesWithMissingMetadata() {
    const { data: e } = await this.#e.getPagesWithMissingMetadata();
    e && this.#n.setValue(e.items);
  }
  async getTopIssues() {
    const { data: e } = await this.#e.getTopIssues();
    e && this.#i.setValue(e.items);
  }
  async getHealthScore() {
    const { data: e } = await this.#e.getHealthScore();
    e && this.#s.setValue(e);
  }
  async startCrawl() {
    return Wi.startCrawl();
  }
  async getSettings() {
    const { data: e } = await this.#e.getSettings();
    e && this.#o.setValue(e);
  }
}
const xa = new oi(
  "ContentAuditContext"
), Yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: xa,
  ContentAuditContext: lt,
  default: lt
}, Symbol.toStringTag, { value: "Module" }));
const Hi = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
const Ae = globalThis, _t = Ae.ShadowRoot && (Ae.ShadyCSS === void 0 || Ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ma = /* @__PURE__ */ Symbol(), Jt = /* @__PURE__ */ new WeakMap();
let Fi = class {
  constructor(e, a, i) {
    if (this._$cssResult$ = !0, i !== Ma) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
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
const Ki = (t) => new Fi(typeof t == "string" ? t : t + "", void 0, Ma), Gi = (t, e) => {
  if (_t) t.adoptedStyleSheets = e.map(((a) => a instanceof CSSStyleSheet ? a : a.styleSheet));
  else for (const a of e) {
    const i = document.createElement("style"), n = Ae.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = a.cssText, t.appendChild(i);
  }
}, Qt = _t ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const i of e.cssRules) a += i.cssText;
  return Ki(a);
})(t) : t;
const { is: Xi, defineProperty: Ji, getOwnPropertyDescriptor: Qi, getOwnPropertyNames: Zi, getOwnPropertySymbols: es, getPrototypeOf: ts } = Object, Le = globalThis, Zt = Le.trustedTypes, as = Zt ? Zt.emptyScript : "", ns = Le.reactiveElementPolyfillSupport, Q = (t, e) => t, ct = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? as : null;
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
} }, ja = (t, e) => !Xi(t, e), ea = { attribute: !0, type: String, converter: ct, reflect: !1, useDefault: !1, hasChanged: ja };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Le.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
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
      n !== void 0 && Ji(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, a, i) {
    const { get: n, set: s } = Qi(this.prototype, e) ?? { get() {
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
    const e = ts(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Q("properties"))) {
      const a = this.properties, i = [...Zi(a), ...es(a)];
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
    return Gi(e, this.constructor.elementStyles), e;
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
      if (i ??= n.getPropertyOptions(e), !((i.hasChanged ?? ja)(s, a) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
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
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[Q("elementProperties")] = /* @__PURE__ */ new Map(), J[Q("finalized")] = /* @__PURE__ */ new Map(), ns?.({ ReactiveElement: J }), (Le.reactiveElementVersions ??= []).push("2.1.0");
var is = Object.getOwnPropertyDescriptor, ss = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? is(e, a) : e, s = t.length - 1, o; s >= 0; s--)
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
Oe = ss([
  Hi("content-audit-workspace-root")
], Oe);
const os = Oe, rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Oe;
  },
  default: os
}, Symbol.toStringTag, { value: "Module" })), M = "Umb.Menu.ContentAudit", ke = "Umb.Menu.ContentMetadata", Ne = "Umb.Menu.ContentPerformance", Ct = "Umb.Menu.ContentTools", bt = "Umb.Collection.ContentAudit.Issues", ls = "Umb.CollectionView.ContentAudit.Issues.Table", Ba = "Umb.Repository.ContentAuditIssuesCollection";
class cs {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getCollection(e) {
    const { data: a, error: i } = await q(this.#e, Ra.getAllIssues({ query: e }));
    if (i)
      return { error: i };
    if (!a)
      return { data: { items: [], total: 0 } };
    const { items: n, total: s } = a;
    return { data: { items: n, total: s } };
  }
}
class ta extends ri {
  #e;
  constructor(e) {
    super(e), this.#e = new cs(e);
  }
  async requestCollection(e) {
    return this.#e.getCollection(e);
  }
}
const us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: ta,
  default: ta
}, Symbol.toStringTag, { value: "Module" }));
var ms = Object.defineProperty, ds = Object.getOwnPropertyDescriptor, za = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? ds(e, a) : e, s = t.length - 1, o; s >= 0; s--)
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
  li,
  y`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
za([
  x({ attribute: !1 })
], Ee.prototype, "value", 2);
Ee = za([
  b("content-audit-issues-table-name-column-layout")
], Ee);
var ps = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, qa = (t) => {
  throw TypeError(t);
}, Y = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? hs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && ps(e, a, n), n;
}, ft = (t, e, a) => e.has(t) || qa("Cannot " + a), aa = (t, e, a) => (ft(t, e, "read from private field"), e.get(t)), na = (t, e, a) => e.has(t) ? qa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), _s = (t, e, a, i) => (ft(t, e, "write to private field"), e.set(t, a), a), Te = (t, e, a) => (ft(t, e, "access private method"), a), ee, F, Ya, yt, Ha;
let I = class extends _ {
  constructor() {
    super(), na(this, F), this.data = [], this.hideSummary = !1, this._issues = [], this._tableConfig = {
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
      _s(this, ee, t), Te(this, F, Ya).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && (this._issues = this.data, Te(this, F, yt).call(this, this.data));
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
                ${Te(this, F, Ha).call(this)}
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ee = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakSet();
Ya = function() {
  aa(this, ee) && this.observe(aa(this, ee).items, (t) => {
    this._issues = t, Te(this, F, yt).call(this, t);
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
Ha = function() {
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
  b("content-audit-issues-table-collection-view")
], I);
const Cs = I, bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return I;
  },
  default: Cs
}, Symbol.toStringTag, { value: "Module" })), At = "Umb.Collection.ContentAudit.Audits", fs = "Umb.CollectionView.ContentAudit.Audits.Table", Fa = "Umb.Repository.ContentAuditAuditsCollection", ys = [
  {
    type: "repository",
    alias: Fa,
    name: "Audits Collection Repository",
    api: () => import("./audits-collection.repository-BWwoiLK6.js")
  }
], As = [
  {
    type: "collectionView",
    alias: fs,
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
        match: At
      }
    ]
  }
], Ts = [
  {
    type: "collection",
    kind: "default",
    alias: At,
    name: "Audits Collection",
    element: () => import("./audits.element-CQMJCtGh.js"),
    meta: {
      repositoryAlias: Fa
    }
  },
  ...ys,
  ...As
], Ka = "audits", Ga = "audits-root", gs = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umb.EntityAction.ContentAudit.Audit.Delete",
    name: "Delete Audit Entity Action",
    weight: 100,
    api: () => import("./delete-audit.action-CAKFrztI.js"),
    forEntityTypes: [Ka],
    meta: {
      icon: "icon-trash",
      label: "Delete"
    }
  }
], Z = "Umb.Workspace.ContentAudit.Audits", Ze = "Umb.MenuItem.ContentAudit.Audits", ia = "Umb.Workspace.ContentAudit.AuditsRoot", vs = [
  {
    type: "menuItem",
    kind: "tree",
    alias: Ze,
    name: "Audits Menu Item",
    weight: 12e3,
    meta: {
      label: "Audits",
      icon: "icon-browser-window",
      treeAlias: "Umb.Tree.ContentAudit.Audits",
      menus: [M]
    }
  },
  {
    type: "workspaceContext",
    kind: "menuStructure",
    alias: "Umb.Context.ContentAudit.Audits.Menu.Structure",
    name: "Content Audit Audits Menu Structure Workspace Context",
    api: () => import("./audits-menu-structure.context-C8pJYARN.js"),
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
    alias: "Umb.WorkspaceFooterApp.ContentAudit.Audits.Breadcrumb",
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
    alias: "Umb.Context.ContentAudit.AuditsRoot.Menu.Structure",
    name: "Content Audit Audits Root Menu Structure Workspace Context",
    api: () => import("./audits-menu-structure.context-C8pJYARN.js"),
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
    alias: "Umb.WorkspaceFooterApp.ContentAudit.AuditsRoot.Breadcrumb",
    name: "Content Audit Audits Root Breadcrumb Workspace Footer App",
    conditions: [
      {
        alias: g,
        match: ia
      }
    ]
  }
], ws = [
  {
    type: "repository",
    alias: "Umb.Repository.ContentAudit.Audits",
    name: "Content Audit Audits Repository",
    api: () => import("./audits-tree.repository--HXc1_cf.js")
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
    forEntityTypes: [Ka, Ga]
  }
], Is = [
  {
    type: "workspace",
    kind: "routable",
    alias: Z,
    name: "Audits Workspace",
    api: () => import("./audits-workspace.context-DZau13M7.js"),
    meta: {
      entityType: "audits"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Audits.Overview",
    name: "Audits Workspace Overview View",
    js: () => import("./audits-overview-workspace-view.element-XjiZgeY5.js"),
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
    alias: "Umb.WorkspaceView.ContentAudit.Audits.Issues",
    name: "Audits Workspace Issues View",
    js: () => import("./audits-issues-workspace-view.element-DX5dvUFu.js"),
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
], sa = "Umb.Workspace.ContentAudit.AuditsRoot", Os = [
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
    alias: "Umb.Workspace.Audits.Collection",
    name: "Content Audit Audits Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: At
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: sa
      }
    ]
  }
], Es = [
  ...Is,
  ...Os
], Ss = [
  ...Ts,
  ...gs,
  ...vs,
  ...ws,
  ...Es
], Xa = "all-pages-root", $s = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: Xa,
    menus: [M]
  }
}, Ps = [$s], oa = "Umb.Workspace.ContentAudit.AllPagesRoot", H = "Umb.Workspace.ContentAudit.AllPages", Us = [
  {
    type: "workspace",
    kind: "routable",
    alias: H,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-CNI3Iq01.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-CBSftCyK.js"),
    weight: 100,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "info"
    },
    conditions: [
      {
        alias: g,
        match: H
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Links",
    name: "All Pages Workspace Links View",
    js: () => import("./all-pages-links-workspace-view.element-Btt0KfBV.js"),
    weight: 90,
    meta: {
      label: "Links",
      pathname: "links",
      icon: "link"
    },
    conditions: [
      {
        alias: g,
        match: H
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Images",
    name: "All Pages Workspace Images View",
    js: () => import("./all-pages-images-workspace-view.element-rIBU13qn.js"),
    weight: 80,
    meta: {
      label: "Images",
      pathname: "images",
      icon: "picture"
    },
    conditions: [
      {
        alias: g,
        match: H
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Resources",
    name: "All Pages Workspace Resources View",
    js: () => import("./all-pages-resources-workspace-view.element-Dml1rth0.js"),
    weight: 70,
    meta: {
      label: "Resources",
      pathname: "resources",
      icon: "icon-script"
    },
    conditions: [
      {
        alias: g,
        match: H
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.AllPages.Issues",
    name: "All Pages Workspace Issues View",
    js: () => import("./all-pages-issues-workspace-view.element-BSwhivCk.js"),
    weight: 60,
    meta: {
      label: "Issues",
      pathname: "issues",
      icon: "alert"
    },
    conditions: [
      {
        alias: g,
        match: H
      }
    ]
  }
], Tt = "Umb.Collection.ContentAudit.AllPages", Ls = "Umb.CollectionView.ContentAudit.AllPages.Table", Ja = "Umb.Repository.ContentAuditAllPagesCollection";
var ks = Object.defineProperty, Ns = Object.getOwnPropertyDescriptor, Qa = (t) => {
  throw TypeError(t);
}, De = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ns(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && ks(e, a, n), n;
}, gt = (t, e, a) => e.has(t) || Qa("Cannot " + a), ra = (t, e, a) => (gt(t, e, "read from private field"), e.get(t)), la = (t, e, a) => e.has(t) ? Qa("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Ds = (t, e, a, i) => (gt(t, e, "write to private field"), e.set(t, a), a), Za = (t, e, a) => (gt(t, e, "access private method"), a), te, Se, en, tn;
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
      Ds(this, te, t), Za(this, Se, en).call(this);
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
  b("content-audit-all-pages-table-collection-view")
], P);
const Rs = P, Ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return P;
  },
  default: Rs
}, Symbol.toStringTag, { value: "Module" })), Vs = [
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
    alias: "Umb.Workspace.AllPages.Collection",
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
], xs = [...Us, ...Vs], Ms = [
  {
    type: "repository",
    alias: Ja,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-CLwODNem.js")
  }
], js = [
  {
    type: "collectionView",
    alias: Ls,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => Ws),
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
], Bs = [
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
  ...Ms,
  ...js
], zs = "Umb.Repository.ContentAudit.AllPages.Detail", qs = "Umb.Store.ContentAudit.AllPages.Detail", Ys = [
  {
    type: "repository",
    alias: zs,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository-BM18m2EG.js")
  },
  {
    type: "store",
    alias: qs,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], Hs = [...Ys], Fs = [
  ...xs,
  ...Ps,
  ...Bs,
  ...Hs
], an = "issues-root", Ks = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: an,
    menus: [M]
  }
}, Gs = [Ks], ca = "Umb.Workspace.ContentAudit.IssuesRoot", ua = "Umb.Workspace.ContentAudit.Issues", Xs = [
  {
    type: "workspace",
    kind: "routable",
    alias: ua,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context--hoLTwHh.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-BcruSzgy.js"),
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
], Js = [
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
    alias: "Umb.Workspace.Issues.Collection",
    name: "Content Audit Issues Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: bt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ca
      }
    ]
  }
], Qs = [...Xs, ...Js], Zs = [
  {
    type: "repository",
    alias: Ba,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => us)
  }
], eo = [
  {
    type: "collectionView",
    alias: ls,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => bs),
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
], to = [
  {
    type: "collection",
    kind: "default",
    alias: bt,
    name: "Issues Collection",
    element: () => import("./issues.element-DJRmm4jS.js"),
    meta: {
      repositoryAlias: Ba
    }
  },
  ...Zs,
  ...eo
], ao = "Umb.Repository.ContentAudit.Issues.Detail", no = "Umb.Store.ContentAudit.Issues.Detail", io = [
  {
    type: "repository",
    alias: ao,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-BYSFRgFs.js")
  },
  {
    type: "store",
    alias: no,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store-C6E-MPVJ.js")
  }
], so = [...io], oo = [
  ...Qs,
  ...Gs,
  ...to,
  ...so
], nn = "status-codes-root", ro = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: nn,
    menus: [M]
  }
}, lo = [ro], vt = "Umb.Collection.ContentAudit.StatusCodes", co = "Umb.CollectionView.ContentAudit.StatusCodes.Table", sn = "Umb.Repository.ContentAuditStatusCodesCollection";
var uo = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, on = (t) => {
  throw TypeError(t);
}, Re = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? mo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && uo(e, a, n), n;
}, wt = (t, e, a) => e.has(t) || on("Cannot " + a), ut = (t, e, a) => (wt(t, e, "read from private field"), e.get(t)), et = (t, e, a) => e.has(t) ? on("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), rn = (t, e, a, i) => (wt(t, e, "write to private field"), e.set(t, a), a), It = (t, e, a) => (wt(t, e, "access private method"), a), ae, We, ne, ln, cn, un;
let U = class extends _ {
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
U.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Re([
  m()
], U.prototype, "_tableConfig", 2);
Re([
  m()
], U.prototype, "_tableColumns", 2);
Re([
  m()
], U.prototype, "_tableItems", 2);
U = Re([
  b("content-audit-status-codes-table-collection-view")
], U);
const po = U, ho = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return U;
  },
  default: po
}, Symbol.toStringTag, { value: "Module" })), ma = "Umb.Workspace.ContentAudit.StatusCodes", _o = [
  {
    type: "workspace",
    kind: "default",
    alias: ma,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: nn,
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
      collectionAlias: vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ma
      }
    ]
  }
], Co = [
  {
    type: "repository",
    alias: sn,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-DAaLZH4A.js")
  }
], bo = [
  {
    type: "collectionView",
    alias: co,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => ho),
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
], fo = [
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
  ...Co,
  ...bo
], yo = [
  ..._o,
  ...lo,
  ...fo
], mn = "orphaned-pages-root", Ao = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: mn,
    menus: [ke]
  }
}, To = [Ao], Ot = "Umb.Collection.ContentAudit.OrphanedPages", go = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", dn = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var vo = Object.defineProperty, wo = Object.getOwnPropertyDescriptor, pn = (t) => {
  throw TypeError(t);
}, Ve = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? wo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && vo(e, a, n), n;
}, Et = (t, e, a) => e.has(t) || pn("Cannot " + a), mt = (t, e, a) => (Et(t, e, "read from private field"), e.get(t)), tt = (t, e, a) => e.has(t) ? pn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), hn = (t, e, a, i) => (Et(t, e, "write to private field"), e.set(t, a), a), St = (t, e, a) => (Et(t, e, "access private method"), a), ie, xe, se, _n, Cn, bn;
let L = class extends _ {
  constructor() {
    super(), tt(this, se), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], tt(this, ie), tt(this, xe), this.consumeContext($, (t) => {
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
xe = /* @__PURE__ */ new WeakMap();
se = /* @__PURE__ */ new WeakSet();
_n = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    hn(this, xe, t), St(this, se, Cn).call(this);
  });
};
Cn = function() {
  mt(this, ie) && this.observe(mt(this, ie).items, (t) => St(this, se, bn).call(this, t), "umbCollectionItemsObserver");
};
bn = function(t) {
  const e = mt(this, xe);
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
L.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ve([
  m()
], L.prototype, "_tableConfig", 2);
Ve([
  m()
], L.prototype, "_tableColumns", 2);
Ve([
  m()
], L.prototype, "_tableItems", 2);
L = Ve([
  b("content-audit-orphaned-pages-table-collection-view")
], L);
const Io = L, Oo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return L;
  },
  default: Io
}, Symbol.toStringTag, { value: "Module" })), da = "Umb.Workspace.ContentAudit.OrphanedPages", Eo = [
  {
    type: "workspace",
    kind: "default",
    alias: da,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: mn,
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
      collectionAlias: Ot
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: da
      }
    ]
  }
], So = [
  {
    type: "repository",
    alias: dn,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-BEX-XZL1.js")
  }
], $o = [
  {
    type: "collectionView",
    alias: go,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Oo),
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
], Po = [
  {
    type: "collection",
    kind: "default",
    alias: Ot,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-Do5cxEeH.js"),
    meta: {
      repositoryAlias: dn
    }
  },
  ...So,
  ...$o
], Uo = [
  ...Eo,
  ...To,
  ...Po
], fn = "images-alt-text-root", Lo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: fn,
    menus: [ke]
  }
}, ko = [Lo], $t = "Umb.Collection.ContentAudit.ImagesAltText", No = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", yn = "Umb.Repository.ContentAuditImagesAltTextCollection";
var Do = Object.defineProperty, Ro = Object.getOwnPropertyDescriptor, An = (t) => {
  throw TypeError(t);
}, Me = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ro(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Do(e, a, n), n;
}, Pt = (t, e, a) => e.has(t) || An("Cannot " + a), dt = (t, e, a) => (Pt(t, e, "read from private field"), e.get(t)), at = (t, e, a) => e.has(t) ? An("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Tn = (t, e, a, i) => (Pt(t, e, "write to private field"), e.set(t, a), a), Ut = (t, e, a) => (Pt(t, e, "access private method"), a), oe, je, re, gn, vn, wn;
let k = class extends _ {
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
    ], this._tableItems = [], at(this, oe), at(this, je), this.consumeContext($, (t) => {
      Tn(this, oe, t);
    }), Ut(this, re, gn).call(this);
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
je = /* @__PURE__ */ new WeakMap();
re = /* @__PURE__ */ new WeakSet();
gn = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Tn(this, je, t), Ut(this, re, vn).call(this);
  });
};
vn = function() {
  dt(this, oe) && this.observe(dt(this, oe).items, (t) => Ut(this, re, wn).call(this, t), "umbCollectionItemsObserver");
};
wn = function(t) {
  const e = dt(this, je);
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
k.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Me([
  m()
], k.prototype, "_tableConfig", 2);
Me([
  m()
], k.prototype, "_tableColumns", 2);
Me([
  m()
], k.prototype, "_tableItems", 2);
k = Me([
  b("content-audit-images-alt-text-table-collection-view")
], k);
const Wo = k, Vo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return k;
  },
  default: Wo
}, Symbol.toStringTag, { value: "Module" })), pa = "Umb.Workspace.ContentAudit.ImagesAltText", xo = [
  {
    type: "workspace",
    kind: "default",
    alias: pa,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: fn,
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
      collectionAlias: $t
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: pa
      }
    ]
  }
], Mo = [
  {
    type: "repository",
    alias: yn,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-VDgdrXmR.js")
  }
], jo = [
  {
    type: "collectionView",
    alias: No,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Vo),
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
], Bo = [
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
  ...Mo,
  ...jo
], zo = [
  ...xo,
  ...ko,
  ...Bo
], In = "outbound-links-root", qo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: In,
    menus: [M]
  }
}, Yo = [qo], Lt = "Umb.Collection.ContentAudit.OutboundLinks", Ho = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", On = "Umb.Repository.ContentAuditOutboundLinksCollection";
var Fo = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, En = (t) => {
  throw TypeError(t);
}, Be = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ko(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Fo(e, a, n), n;
}, kt = (t, e, a) => e.has(t) || En("Cannot " + a), ha = (t, e, a) => (kt(t, e, "read from private field"), e.get(t)), _a = (t, e, a) => e.has(t) ? En("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Go = (t, e, a, i) => (kt(t, e, "write to private field"), e.set(t, a), a), Sn = (t, e, a) => (kt(t, e, "access private method"), a), le, $e, $n, Pn;
let N = class extends _ {
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
      Go(this, le, t), Sn(this, $e, $n).call(this);
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
N.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Be([
  m()
], N.prototype, "_tableConfig", 2);
Be([
  m()
], N.prototype, "_tableColumns", 2);
Be([
  m()
], N.prototype, "_tableItems", 2);
N = Be([
  b("content-audit-outbound-links-table-collection-view")
], N);
const Xo = N, Jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return N;
  },
  default: Xo
}, Symbol.toStringTag, { value: "Module" })), Ca = "Umb.Workspace.ContentAudit.OutboundLinks", Qo = [
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
    alias: "Umb.Workspace.OutboundLinks.Collection",
    name: "Content Audit Outbound Links Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: Lt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ca
      }
    ]
  }
], Zo = [
  {
    type: "repository",
    alias: On,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-Cr__dvQZ.js")
  }
], er = [
  {
    type: "collectionView",
    alias: Ho,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => Jo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Lt
      }
    ]
  }
], tr = [
  {
    type: "collection",
    kind: "default",
    alias: Lt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-Chz_6Fpj.js"),
    meta: {
      repositoryAlias: On
    }
  },
  ...Zo,
  ...er
], ar = [
  ...Qo,
  ...Yo,
  ...tr
], Un = "inbound-links-root", nr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Un,
    menus: [M]
  }
}, ir = [nr], Nt = "Umb.Collection.ContentAudit.InboundLinks", sr = "Umb.CollectionView.ContentAudit.InboundLinks.Table", Ln = "Umb.Repository.ContentAuditInboundLinksCollection";
var or = Object.defineProperty, rr = Object.getOwnPropertyDescriptor, kn = (t) => {
  throw TypeError(t);
}, ze = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? rr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && or(e, a, n), n;
}, Dt = (t, e, a) => e.has(t) || kn("Cannot " + a), ba = (t, e, a) => (Dt(t, e, "read from private field"), e.get(t)), fa = (t, e, a) => e.has(t) ? kn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), lr = (t, e, a, i) => (Dt(t, e, "write to private field"), e.set(t, a), a), Nn = (t, e, a) => (Dt(t, e, "access private method"), a), ce, Pe, Dn, Rn;
let D = class extends _ {
  constructor() {
    super(), fa(this, Pe), this._tableConfig = {
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
    ], this._tableItems = [], fa(this, ce), this.consumeContext($, (t) => {
      lr(this, ce, t), Nn(this, Pe, Dn).call(this);
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
Dn = function() {
  ba(this, ce) && this.observe(ba(this, ce).items, (t) => Nn(this, Pe, Rn).call(this, t), "umbCollectionItemsObserver");
};
Rn = function(t) {
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
D.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ze([
  m()
], D.prototype, "_tableConfig", 2);
ze([
  m()
], D.prototype, "_tableColumns", 2);
ze([
  m()
], D.prototype, "_tableItems", 2);
D = ze([
  b("content-audit-inbound-links-table-collection-view")
], D);
const cr = D, ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return D;
  },
  default: cr
}, Symbol.toStringTag, { value: "Module" })), ya = "Umb.Workspace.ContentAudit.InboundLinks", mr = [
  {
    type: "workspace",
    kind: "default",
    alias: ya,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: Un,
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
      collectionAlias: Nt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ya
      }
    ]
  }
], dr = [
  {
    type: "repository",
    alias: Ln,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-DL6xXo6n.js")
  }
], pr = [
  {
    type: "collectionView",
    alias: sr,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => ur),
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
], hr = [
  {
    type: "collection",
    kind: "default",
    alias: Nt,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-K3WRdCsX.js"),
    meta: {
      repositoryAlias: Ln
    }
  },
  ...dr,
  ...pr
], _r = [
  ...mr,
  ...ir,
  ...hr
], Wn = "metadata-root", Cr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: Wn,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, br = [Cr], Rt = "Umb.Collection.ContentAudit.Metadata", fr = "Umb.CollectionView.ContentAudit.Metadata.Table", Aa = "Umb.Workspace.ContentAudit.Metadata", yr = [
  {
    type: "workspace",
    kind: "default",
    alias: Aa,
    name: "Metadata Root Workspace",
    meta: {
      entityType: Wn,
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
      collectionAlias: Rt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Aa
      }
    ]
  }
], Vn = "Umb.Repository.ContentAuditMetadataCollection", Ar = [
  {
    type: "repository",
    alias: Vn,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-D_Azk2mN.js")
  }
], Tr = [
  {
    type: "collectionView",
    alias: fr,
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
        match: Rt
      }
    ]
  }
], gr = [
  {
    type: "collection",
    kind: "default",
    alias: Rt,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: Vn
    }
  },
  ...Ar,
  ...Tr
], vr = [
  ...yr,
  ...br,
  ...gr
], wr = [], Wt = "Umb.Collection.ContentAudit.DuplicateContent", Ir = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", xn = "Umb.Repository.ContentAuditDuplicateContentCollection";
var Or = Object.defineProperty, Er = Object.getOwnPropertyDescriptor, qe = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Er(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Or(e, a, n), n;
};
let R = class extends _ {
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
R.styles = [
  y`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
qe([
  m()
], R.prototype, "_tableConfig", 2);
qe([
  m()
], R.prototype, "_tableColumns", 2);
qe([
  m()
], R.prototype, "_tableItems", 2);
R = qe([
  b("content-audit-duplicate-content-table-collection-view")
], R);
const Sr = R, $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return R;
  },
  default: Sr
}, Symbol.toStringTag, { value: "Module" })), Pr = "duplicate-content-root", Ta = "Umb.Workspace.ContentAudit.DuplicateContent", Ur = [
  {
    type: "workspace",
    kind: "default",
    alias: Ta,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: Pr,
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
      collectionAlias: Wt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ta
      }
    ]
  }
], Lr = [
  {
    type: "repository",
    alias: xn,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-42ewONBr.js")
  }
], kr = [
  {
    type: "collectionView",
    alias: Ir,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => $r),
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
], Nr = [
  {
    type: "collection",
    kind: "default",
    alias: Wt,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-C4rGWCXk.js"),
    meta: {
      repositoryAlias: xn
    }
  },
  ...Lr,
  ...kr
], Dr = [
  ...Ur,
  ...wr,
  ...Nr
], Mn = "carbon-rating-root", Rr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: Mn,
    menus: [Ne]
  }
}, Wr = [Rr], Vt = "Umb.Collection.ContentAudit.CarbonRating", Vr = "Umb.CollectionView.ContentAudit.CarbonRating.Table", jn = "Umb.Repository.ContentAuditCarbonRatingCollection";
var xr = Object.defineProperty, Mr = Object.getOwnPropertyDescriptor, Bn = (t) => {
  throw TypeError(t);
}, Ye = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Mr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && xr(e, a, n), n;
}, xt = (t, e, a) => e.has(t) || Bn("Cannot " + a), pt = (t, e, a) => (xt(t, e, "read from private field"), e.get(t)), nt = (t, e, a) => e.has(t) ? Bn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), zn = (t, e, a, i) => (xt(t, e, "write to private field"), e.set(t, a), a), Mt = (t, e, a) => (xt(t, e, "access private method"), a), ue, He, me, qn, Yn, Hn;
let W = class extends _ {
  constructor() {
    super(), nt(this, me), this._tableConfig = {
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
    ], this._tableItems = [], nt(this, ue), nt(this, He), this.consumeContext($, (t) => {
      zn(this, ue, t);
    }), Mt(this, me, qn).call(this);
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
He = /* @__PURE__ */ new WeakMap();
me = /* @__PURE__ */ new WeakSet();
qn = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    zn(this, He, t), Mt(this, me, Yn).call(this);
  });
};
Yn = function() {
  pt(this, ue) && this.observe(pt(this, ue).items, (t) => Mt(this, me, Hn).call(this, t), "umbCollectionItemsObserver");
};
Hn = function(t) {
  const e = pt(this, He);
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
  m()
], W.prototype, "_tableConfig", 2);
Ye([
  m()
], W.prototype, "_tableColumns", 2);
Ye([
  m()
], W.prototype, "_tableItems", 2);
W = Ye([
  b("content-audit-carbon-rating-table-collection-view")
], W);
const jr = W, Br = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return W;
  },
  default: jr
}, Symbol.toStringTag, { value: "Module" })), ga = "Umb.Workspace.ContentAudit.CarbonRating", zr = [
  {
    type: "workspace",
    kind: "default",
    alias: ga,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: Mn,
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
      collectionAlias: Vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ga
      }
    ]
  }
], qr = [
  {
    type: "repository",
    alias: jn,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository-DbSXoSpE.js")
  }
], Yr = [
  {
    type: "collectionView",
    alias: Vr,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => Br),
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
], Hr = [
  {
    type: "collection",
    kind: "default",
    alias: Vt,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element-Br8vAvSE.js"),
    meta: {
      repositoryAlias: jn
    }
  },
  ...qr,
  ...Yr
], Fr = [
  ...zr,
  ...Wr,
  ...Hr
], Fn = "core-web-vitals-root", Kr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: Fn,
    menus: [Ne]
  }
}, Gr = [Kr], jt = "Umb.Collection.ContentAudit.CoreWebVitals", Xr = "Umb.CollectionView.ContentAudit.CoreWebVitals.Table", Kn = "Umb.Repository.ContentAuditCoreWebVitalsCollection";
var Jr = Object.defineProperty, Qr = Object.getOwnPropertyDescriptor, Gn = (t) => {
  throw TypeError(t);
}, Fe = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Qr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Jr(e, a, n), n;
}, Bt = (t, e, a) => e.has(t) || Gn("Cannot " + a), ht = (t, e, a) => (Bt(t, e, "read from private field"), e.get(t)), it = (t, e, a) => e.has(t) ? Gn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Xn = (t, e, a, i) => (Bt(t, e, "write to private field"), e.set(t, a), a), zt = (t, e, a) => (Bt(t, e, "access private method"), a), de, Ke, pe, Jn, Qn, Zn;
let V = class extends _ {
  constructor() {
    super(), it(this, pe), this._tableConfig = {
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
    ], this._tableItems = [], it(this, de), it(this, Ke), this.consumeContext($, (t) => {
      Xn(this, de, t);
    }), zt(this, pe, Jn).call(this);
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
de = /* @__PURE__ */ new WeakMap();
Ke = /* @__PURE__ */ new WeakMap();
pe = /* @__PURE__ */ new WeakSet();
Jn = function() {
  new Ce(this, he).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Xn(this, Ke, t), zt(this, pe, Qn).call(this);
  });
};
Qn = function() {
  ht(this, de) && this.observe(ht(this, de).items, (t) => zt(this, pe, Zn).call(this, t), "umbCollectionItemsObserver");
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
Fe([
  m()
], V.prototype, "_tableConfig", 2);
Fe([
  m()
], V.prototype, "_tableColumns", 2);
Fe([
  m()
], V.prototype, "_tableItems", 2);
V = Fe([
  b("content-audit-core-web-vitals-table-collection-view")
], V);
const Zr = V, el = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return V;
  },
  default: Zr
}, Symbol.toStringTag, { value: "Module" })), va = "Umb.Workspace.ContentAudit.CoreWebVitals", tl = [
  {
    type: "workspace",
    kind: "default",
    alias: va,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: Fn,
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
      collectionAlias: jt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: va
      }
    ]
  }
], al = [
  {
    type: "repository",
    alias: Kn,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository-Dy6YJopN.js")
  }
], nl = [
  {
    type: "collectionView",
    alias: Xr,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => el),
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
], il = [
  {
    type: "collection",
    kind: "default",
    alias: jt,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element-CpQ6vtvE.js"),
    meta: {
      repositoryAlias: Kn
    }
  },
  ...al,
  ...nl
], sl = [
  ...tl,
  ...Gr,
  ...il
], ei = "export-root", ol = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: ei,
    menus: [Ct]
  }
}, rl = [ol], ll = "Umb.Workspace.ContentAudit.Export", cl = [
  {
    type: "workspace",
    kind: "default",
    alias: ll,
    name: "Export Root Workspace",
    element: () => import("./export.element-Cw5TglFL.js"),
    meta: {
      entityType: ei,
      headline: "Export"
    }
  }
], ul = [
  ...cl,
  ...rl
], K = "Umb.Section.ContentAudit", ml = {
  type: "section",
  alias: K,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, dl = {
  type: "sectionView",
  alias: "Umb.SectionView.ContentAudit.Scan",
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
}, pl = [
  {
    type: "menu",
    alias: M,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: ke,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: Ne,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: Ct,
    name: "Tools Menu"
  }
], hl = [
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
        match: K
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
      menu: ke
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
    alias: "Umb.SidebarMenu.ContentPerformance",
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
    alias: "Umb.SidebarMenu.ContentTools",
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
], _l = [
  ml,
  dl,
  ...pl,
  ...hl,
  ...Ss,
  ...Fs,
  ...oo,
  ...yo,
  ...Uo,
  ...zo,
  ...ar,
  ..._r,
  ...vr,
  ...Dr,
  ...Fr,
  ...sl,
  ...ul
], Cl = {
  type: "workspace",
  alias: Ie,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => rs),
  meta: {
    entityType: Va
  }
}, bl = [
  {
    type: "workspaceView",
    alias: "Umb.WorkspaceView.ContentAudit.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-EhGreA1E.js"),
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
    alias: "Umb.WorkspaceView.ContentAudit.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-GmYQrEOq.js"),
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
], fl = [
  Cl,
  ...bl
], yl = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-BpZPYfl0.js")
  }
], Al = [
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
], Tl = {
  type: "workspaceView",
  alias: "Umbraco.Community.ContentAudit.Workspace",
  name: "ContentAudit Workspace",
  js: () => import("./contentaudit-workspace-view-CbBFyPLP.js"),
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
}, gl = [Tl], vl = {
  type: "globalContext",
  alias: ji,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Yi)
}, Vl = async (t, e) => {
  e.registerMany([
    vl,
    ..._l,
    ...fl,
    ...yl,
    ...Al,
    ...gl
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
  xa as C,
  Oe as D,
  ui as E,
  ci as F,
  Vl as G,
  Ra as I,
  Ka as a,
  Ga as b,
  Z as c,
  H as d,
  ua as e,
  ja as f,
  ji as g,
  Va as h,
  bt as i,
  Ba as j,
  ls as k,
  M as l,
  ke as m,
  Ne as n,
  Ct as o,
  Ie as p,
  ot as q,
  lt as r,
  ge as s,
  Hi as t,
  ct as u,
  cs as v,
  ta as w,
  I as x,
  we as y,
  ve as z
};
//# sourceMappingURL=index-CQIca5UD.js.map
