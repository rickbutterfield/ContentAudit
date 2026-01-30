import { UMB_AUTH_CONTEXT as ri } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as X } from "@umbraco-cms/backoffice/element-api";
import { LitElement as q, html as u, css as f, property as x, customElement as C, nothing as Oa, state as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbControllerBase as Ea } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as li } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as ci, UMB_WORKSPACE_CONDITION_ALIAS as T, UMB_WORKSPACE_MODAL as Ce } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as K, tryExecuteAndNotify as ui } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as Qe, UmbArrayState as Ze } from "@umbraco-cms/backoffice/observable-api";
import { UmbRepositoryBase as mi } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as $, UMB_COLLECTION_ALIAS_CONDITION as g } from "@umbraco-cms/backoffice/collection";
import { UmbLitElement as E } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as di } from "@umbraco-cms/backoffice/style";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as be } from "@umbraco-cms/backoffice/document";
import { UmbModalRouteRegistrationController as fe } from "@umbraco-cms/backoffice/router";
const pi = [
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
], hi = [
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
var _i = Object.defineProperty, Ci = Object.getOwnPropertyDescriptor, Sa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ci(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && _i(e, a, n), n;
};
let we = class extends X(q) {
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
we.styles = [
  f`
            uui-tag {
                font-size: 14px;

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
  C("content-audit-issue-type-label")
], we);
var bi = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, $a = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? fi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && bi(e, a, n), n;
};
let Ie = class extends X(q) {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = hi[this.type - 1];
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
  f`
            uui-tag {
                font-size: 14px;

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
  C("content-audit-priority-type-label")
], Ie);
var yi = Object.defineProperty, Ai = Object.getOwnPropertyDescriptor, Pa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ai(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && yi(e, a, n), n;
};
let rt = class extends X(q) {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? u`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : Oa;
  }
};
Pa([
  x({ attribute: !1 })
], rt.prototype, "statusCode", 2);
rt = Pa([
  C("content-audit-status-code-label")
], rt);
var Ti = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, Ua = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? gi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Ti(e, a, n), n;
};
let lt = class extends X(q) {
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
Ua([
  x({ attribute: !0 })
], lt.prototype, "value", 2);
lt = Ua([
  C("content-audit-carbon-intensity-label")
], lt);
var La = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(La || {}), ct = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(ct || {});
const vi = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, a) => typeof a == "bigint" ? a.toString() : a
  )
}, wi = ({
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
  let _;
  const J = c ?? ((d) => new Promise((y) => setTimeout(y, d)));
  return { stream: async function* () {
    let d = s ?? 3e3, y = 0;
    const j = l.signal ?? new AbortController().signal;
    for (; !j.aborted; ) {
      y++;
      const Q = l.headers instanceof Headers ? l.headers : new Headers(l.headers);
      _ !== void 0 && Q.set("Last-Event-ID", _);
      try {
        const B = {
          redirect: "follow",
          ...l,
          body: l.serializedBody,
          headers: Q,
          signal: j
        };
        let I = new Request(p, B);
        t && (I = await t(p, B));
        const A = await (l.fetch ?? globalThis.fetch)(I);
        if (!A.ok)
          throw new Error(
            `SSE failed: ${A.status} ${A.statusText}`
          );
        if (!A.body) throw new Error("No body in SSE response");
        const O = A.body.pipeThrough(new TextDecoderStream()).getReader();
        let Je = "";
        const Ht = () => {
          try {
            O.cancel();
          } catch {
          }
        };
        j.addEventListener("abort", Ht);
        try {
          for (; ; ) {
            const { done: ni, value: ii } = await O.read();
            if (ni) break;
            Je += ii;
            const Kt = Je.split(`

`);
            Je = Kt.pop() ?? "";
            for (const si of Kt) {
              const oi = si.split(`
`), Ae = [];
              let Ft;
              for (const v of oi)
                if (v.startsWith("data:"))
                  Ae.push(v.replace(/^data:\s*/, ""));
                else if (v.startsWith("event:"))
                  Ft = v.replace(/^event:\s*/, "");
                else if (v.startsWith("id:"))
                  _ = v.replace(/^id:\s*/, "");
                else if (v.startsWith("retry:")) {
                  const Xt = Number.parseInt(
                    v.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(Xt) || (d = Xt);
                }
              let z, Gt = !1;
              if (Ae.length) {
                const v = Ae.join(`
`);
                try {
                  z = JSON.parse(v), Gt = !0;
                } catch {
                  z = v;
                }
              }
              Gt && (n && await n(z), i && (z = await i(z))), a?.({
                data: z,
                event: Ft,
                id: _,
                retry: d
              }), Ae.length && (yield z);
            }
          }
        } finally {
          j.removeEventListener("abort", Ht), O.releaseLock();
        }
        break;
      } catch (B) {
        if (e?.(B), o !== void 0 && y >= o)
          break;
        const I = Math.min(
          d * 2 ** (y - 1),
          r ?? 3e4
        );
        await J(I);
      }
    }
  }() };
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
}, Oi = (t) => {
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
}, ka = ({
  allowReserved: t,
  explode: e,
  name: a,
  style: i,
  value: n
}) => {
  if (!e) {
    const r = (t ? n : n.map((c) => encodeURIComponent(c))).join(Oi(i));
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
  const s = Ii(i), o = n.map((r) => i === "label" || i === "simple" ? t ? r : encodeURIComponent(r) : ke({
    allowReserved: t,
    name: a,
    value: r
  })).join(s);
  return i === "label" || i === "matrix" ? s + o : o;
}, ke = ({
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
}, Na = ({
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
  const o = Ei(i), r = Object.entries(n).map(
    ([c, p]) => ke({
      allowReserved: t,
      name: i === "deepObject" ? `${a}[${c}]` : c,
      value: p
    })
  ).join(o);
  return i === "label" || i === "matrix" ? o + r : r;
}, Si = /\{[^{}]+\}/g, $i = ({ path: t, url: e }) => {
  let a = e;
  const i = e.match(Si);
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
          ka({ explode: s, name: o, style: r, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        a = a.replace(
          n,
          Na({
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
          `;${ke({
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
}, Pi = ({
  baseUrl: t,
  path: e,
  query: a,
  querySerializer: i,
  url: n
}) => {
  const s = n.startsWith("/") ? n : `/${n}`;
  let o = (t ?? "") + s;
  e && (o = $i({ path: e, url: o }));
  let r = a ? i(a) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (o += `?${r}`), o;
};
function Ui(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const Li = async (t, e) => {
  const a = typeof e == "function" ? await e(t) : e;
  if (a)
    return t.scheme === "bearer" ? `Bearer ${a}` : t.scheme === "basic" ? `Basic ${btoa(a)}` : a;
}, Da = ({
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
          const c = ka({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "form",
            value: r,
            ...e
          });
          c && s.push(c);
        } else if (typeof r == "object") {
          const c = Na({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "deepObject",
            value: r,
            ...a
          });
          c && s.push(c);
        } else {
          const c = ke({
            allowReserved: t,
            name: o,
            value: r
          });
          c && s.push(c);
        }
    }
  return s.join("&");
}, ki = (t) => {
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
}, Ni = (t, e) => e ? !!(t.headers.has(e) || t.query?.[e] || t.headers.get("Cookie")?.includes(`${e}=`)) : !1, Di = async ({
  security: t,
  ...e
}) => {
  for (const a of t) {
    if (Ni(e, a.name))
      continue;
    const i = await Li(a, e.auth);
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
}, Jt = (t) => Pi({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : Da(t.querySerializer),
  url: t.url
}), Qt = (t, e) => {
  const a = { ...t, ...e };
  return a.baseUrl?.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = Ra(t.headers, e.headers), a;
}, Ri = (t) => {
  const e = [];
  return t.forEach((a, i) => {
    e.push([i, a]);
  }), e;
}, Ra = (...t) => {
  const e = new Headers();
  for (const a of t) {
    if (!a)
      continue;
    const i = a instanceof Headers ? Ri(a) : Object.entries(a);
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
class et {
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
const Wi = () => ({
  error: new et(),
  request: new et(),
  response: new et()
}), Vi = Da({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), xi = {
  "Content-Type": "application/json"
}, Wa = (t = {}) => ({
  ...vi,
  headers: xi,
  parseAs: "auto",
  querySerializer: Vi,
  ...t
}), Mi = (t = {}) => {
  let e = Qt(Wa(), t);
  const a = () => ({ ...e }), i = (p) => (e = Qt(e, p), a()), n = Wi(), s = async (p) => {
    const l = {
      ...e,
      ...p,
      fetch: p.fetch ?? e.fetch ?? globalThis.fetch,
      headers: Ra(e.headers, p.headers),
      serializedBody: void 0
    };
    l.security && await Di({
      ...l,
      security: l.security
    }), l.requestValidator && await l.requestValidator(l), l.body !== void 0 && l.bodySerializer && (l.serializedBody = l.bodySerializer(l.body)), (l.body === void 0 || l.serializedBody === "") && l.headers.delete("Content-Type");
    const _ = Jt(l);
    return { opts: l, url: _ };
  }, o = async (p) => {
    const { opts: l, url: _ } = await s(p), J = {
      redirect: "follow",
      ...l,
      body: Ui(l)
    };
    let S = new Request(_, J);
    for (const b of n.request.fns)
      b && (S = await b(S, l));
    const ye = l.fetch;
    let d = await ye(S);
    for (const b of n.response.fns)
      b && (d = await b(d, S, l));
    const y = {
      request: S,
      response: d
    };
    if (d.ok) {
      const b = (l.parseAs === "auto" ? ki(d.headers.get("Content-Type")) : l.parseAs) ?? "json";
      if (d.status === 204 || d.headers.get("Content-Length") === "0") {
        let O;
        switch (b) {
          case "arrayBuffer":
          case "blob":
          case "text":
            O = await d[b]();
            break;
          case "formData":
            O = new FormData();
            break;
          case "stream":
            O = d.body;
            break;
          default:
            O = {};
            break;
        }
        return l.responseStyle === "data" ? O : {
          data: O,
          ...y
        };
      }
      let A;
      switch (b) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          A = await d[b]();
          break;
        case "stream":
          return l.responseStyle === "data" ? d.body : {
            data: d.body,
            ...y
          };
      }
      return b === "json" && (l.responseValidator && await l.responseValidator(A), l.responseTransformer && (A = await l.responseTransformer(A))), l.responseStyle === "data" ? A : {
        data: A,
        ...y
      };
    }
    const j = await d.text();
    let Q;
    try {
      Q = JSON.parse(j);
    } catch {
    }
    const B = Q ?? j;
    let I = B;
    for (const b of n.error.fns)
      b && (I = await b(B, d, S, l));
    if (I = I || {}, l.throwOnError)
      throw I;
    return l.responseStyle === "data" ? void 0 : {
      error: I,
      ...y
    };
  }, r = (p) => (l) => o({ ...l, method: p }), c = (p) => async (l) => {
    const { opts: _, url: J } = await s(l);
    return wi({
      ..._,
      body: _.body,
      headers: _.headers,
      method: p,
      onRequest: async (S, ye) => {
        let d = new Request(S, ye);
        for (const y of n.request.fns)
          y && (d = await y(d, _));
        return d;
      },
      url: J
    });
  };
  return {
    buildUrl: Jt,
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
}, h = Mi(Wa({
  baseUrl: "http://localhost:26297",
  throwOnError: !0
}));
class Te {
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
class jl {
  static startCrawl(e) {
    return (e?.client ?? h).sse.get({
      url: "/umbraco/content-audit/management/api/v1/crawl",
      ...e
    });
  }
}
class Va {
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
class ji {
  static getSettings(e) {
    return (e?.client ?? h).get({
      url: "/umbraco/content-audit/management/api/v1/settings",
      ...e
    });
  }
}
var Bi = Object.defineProperty, zi = Object.getOwnPropertyDescriptor, xa = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? zi(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Bi(e, a, n), n;
};
let Oe = class extends X(q) {
  _getColour() {
    return this.value != null ? this.value.rating == ct.POOR ? "danger" : this.value.rating == ct.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == La.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
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
  f`
            uui-tag {
                font-size: 14px;
            }
        `
];
xa([
  x({ attribute: !1 })
], Oe.prototype, "value", 2);
Oe = xa([
  C("content-audit-metric-label")
], Oe);
class Bl extends Event {
  constructor() {
    super("selected", { bubbles: !0, composed: !0 });
  }
}
class zl extends Event {
  constructor() {
    super("deselected", { bubbles: !0, composed: !0 });
  }
}
class ql extends Event {
  constructor() {
    super("ordered", { bubbles: !0, composed: !0 });
  }
}
const Ee = "Umb.Workspace.ContentAudit", qi = "Umb.Context.ContentAudit", Ma = "content-audit";
class Yi {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getLatestAuditOverview() {
    return await K(this.#e, Te.overview());
  }
  async getPagesWithMissingMetadata() {
    return await K(this.#e, Te.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await K(this.#e, Va.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await K(this.#e, Te.getHealthScore());
  }
  async getAuditOverviews() {
    return await K(this.#e, Te.getCollection({
      query: { skip: 0, take: 5 }
    }));
  }
}
class Hi {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getSettings() {
    return await ui(this.#e, ji.getSettings());
  }
}
class Ki extends Ea {
  #e;
  #t;
  constructor(e) {
    super(e), this.#e = new Yi(this), this.#t = new Hi(this);
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
class ut extends Ea {
  constructor(e) {
    super(e), this.workspaceAlias = Ee, this.#t = new Qe(void 0), this.latestAuditOverview = this.#t.asObservable(), this.#a = new Ze([], (a) => a.key), this.auditOverviews = this.#a.asObservable(), this.#n = new Ze([], (a) => a.unique), this.pagesWithMissingMetadata = this.#n.asObservable(), this.#i = new Ze([], (a) => a.name), this.topIssues = this.#i.asObservable(), this.#s = new Qe(void 0), this.healthScore = this.#s.asObservable(), this.#o = new Qe(void 0), this.settings = this.#o.asObservable(), this.provideContext(ci, this), this.provideContext(ja, this), this.#e = new Ki(this);
  }
  getEntityType() {
    return Ma;
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
  async getSettings() {
    const { data: e } = await this.#e.getSettings();
    e && this.#o.setValue(e);
  }
}
const ja = new li(
  "ContentAuditContext"
), Fi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: ja,
  ContentAuditContext: ut,
  default: ut
}, Symbol.toStringTag, { value: "Module" }));
const Gi = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
const ge = globalThis, bt = ge.ShadowRoot && (ge.ShadyCSS === void 0 || ge.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ba = /* @__PURE__ */ Symbol(), Zt = /* @__PURE__ */ new WeakMap();
let Xi = class {
  constructor(e, a, i) {
    if (this._$cssResult$ = !0, i !== Ba) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = a;
  }
  get styleSheet() {
    let e = this.o;
    const a = this.t;
    if (bt && e === void 0) {
      const i = a !== void 0 && a.length === 1;
      i && (e = Zt.get(a)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Zt.set(a, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ji = (t) => new Xi(typeof t == "string" ? t : t + "", void 0, Ba), Qi = (t, e) => {
  if (bt) t.adoptedStyleSheets = e.map(((a) => a instanceof CSSStyleSheet ? a : a.styleSheet));
  else for (const a of e) {
    const i = document.createElement("style"), n = ge.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = a.cssText, t.appendChild(i);
  }
}, ea = bt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const i of e.cssRules) a += i.cssText;
  return Ji(a);
})(t) : t;
const { is: Zi, defineProperty: es, getOwnPropertyDescriptor: ts, getOwnPropertyNames: as, getOwnPropertySymbols: ns, getPrototypeOf: is } = Object, Ne = globalThis, ta = Ne.trustedTypes, ss = ta ? ta.emptyScript : "", os = Ne.reactiveElementPolyfillSupport, ee = (t, e) => t, mt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ss : null;
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
} }, za = (t, e) => !Zi(t, e), aa = { attribute: !0, type: String, converter: mt, reflect: !1, useDefault: !1, hasChanged: za };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ne.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class Z extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, a = aa) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(e, a), !a.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, a);
      n !== void 0 && es(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, a, i) {
    const { get: n, set: s } = ts(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? aa;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ee("elementProperties"))) return;
    const e = is(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ee("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ee("properties"))) {
      const a = this.properties, i = [...as(a), ...ns(a)];
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
      for (const n of i) a.unshift(ea(n));
    } else e !== void 0 && a.push(ea(e));
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
    return Qi(e, this.constructor.elementStyles), e;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : mt).toAttribute(a, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, a) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : mt;
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
Z.elementStyles = [], Z.shadowRootOptions = { mode: "open" }, Z[ee("elementProperties")] = /* @__PURE__ */ new Map(), Z[ee("finalized")] = /* @__PURE__ */ new Map(), os?.({ ReactiveElement: Z }), (Ne.reactiveElementVersions ??= []).push("2.1.0");
var rs = Object.getOwnPropertyDescriptor, ls = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? rs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = o(n) || n);
  return n;
};
let Se = class extends X(q) {
  constructor() {
    super(), this._workspaceContext = new ut(this);
  }
  render() {
    return u`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Se = ls([
  Gi("content-audit-workspace-root")
], Se);
const cs = Se, us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Se;
  },
  default: cs
}, Symbol.toStringTag, { value: "Module" })), M = "Umb.Menu.ContentAudit", De = "Umb.Menu.ContentMetadata", Re = "Umb.Menu.ContentPerformance", ft = "Umb.Menu.ContentTools", yt = "Umb.Collection.ContentAudit.Issues", ms = "Umb.CollectionView.ContentAudit.Issues.Table", qa = "Umb.Repository.ContentAuditIssuesCollection";
class ds {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getCollection(e) {
    const { data: a, error: i } = await K(this.#e, Va.getAllIssues({ query: e }));
    if (i)
      return { error: i };
    if (!a)
      return { data: { items: [], total: 0 } };
    const { items: n, total: s } = a;
    return { data: { items: n, total: s } };
  }
}
class na extends mi {
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
  ContentAuditIssuesCollectionRepository: na,
  default: na
}, Symbol.toStringTag, { value: "Module" }));
var hs = Object.defineProperty, _s = Object.getOwnPropertyDescriptor, Ya = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? _s(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && hs(e, a, n), n;
};
let $e = class extends q {
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
  di,
  f`
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
  C("content-audit-issues-table-name-column-layout")
], $e);
var Cs = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, Ha = (t) => {
  throw TypeError(t);
}, Y = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? bs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Cs(e, a, n), n;
}, At = (t, e, a) => e.has(t) || Ha("Cannot " + a), ia = (t, e, a) => (At(t, e, "read from private field"), e.get(t)), sa = (t, e, a) => e.has(t) ? Ha("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), fs = (t, e, a, i) => (At(t, e, "write to private field"), e.set(t, a), a), ve = (t, e, a) => (At(t, e, "access private method"), a), ae, F, Ka, Tt, Fa;
let w = class extends E {
  constructor() {
    super(), sa(this, F), this.data = [], this.hideSummary = !1, this._issues = [], this._tableConfig = {
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
    ], this._tableItems = [], sa(this, ae), this.consumeContext($, (t) => {
      fs(this, ae, t), ve(this, F, Ka).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && (this._issues = this.data, ve(this, F, Tt).call(this, this.data));
  }
  render() {
    if (this._tableItems.length !== 0)
      return u`
                ${ve(this, F, Fa).call(this)}
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
ae = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakSet();
Ka = function() {
  ia(this, ae) && this.observe(ia(this, ae).items, (t) => {
    this._issues = t, ve(this, F, Tt).call(this, t);
  }, "umbCollectionItemsObserver");
};
Tt = function(t) {
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
w.styles = [
  f`
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
], w.prototype, "data", 2);
Y([
  x({ type: Boolean, attribute: "hide-summary" })
], w.prototype, "hideSummary", 2);
Y([
  m()
], w.prototype, "_issues", 2);
Y([
  m()
], w.prototype, "_tableConfig", 2);
Y([
  m()
], w.prototype, "_tableColumns", 2);
Y([
  m()
], w.prototype, "_tableItems", 2);
w = Y([
  C("content-audit-issues-table-collection-view")
], w);
const ys = w, As = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return w;
  },
  default: ys
}, Symbol.toStringTag, { value: "Module" })), gt = "Umb.Collection.ContentAudit.Audits", Ts = "Umb.CollectionView.ContentAudit.Audits.Table", Ga = "Umb.Repository.ContentAuditAuditsCollection", gs = [
  {
    type: "repository",
    alias: Ga,
    name: "Audits Collection Repository",
    api: () => import("./audits-collection.repository.js")
  }
], vs = [
  {
    type: "collectionView",
    alias: Ts,
    name: "Audits Table Collection View",
    js: () => import("./audits-table-collection-view.element.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: gt
      }
    ]
  }
], ws = [
  {
    type: "collection",
    kind: "default",
    alias: gt,
    name: "Audits Collection",
    element: () => import("./audits.element.js"),
    meta: {
      repositoryAlias: Ga
    }
  },
  ...gs,
  ...vs
], Xa = "audits", Ja = "audits-root", Is = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umb.EntityAction.ContentAudit.Audit.Delete",
    name: "Delete Audit Entity Action",
    weight: 100,
    api: () => import("./delete-audit.action.js"),
    forEntityTypes: [Xa],
    meta: {
      icon: "icon-trash",
      label: "Delete"
    }
  }
], te = "Umb.Workspace.ContentAudit.Audits", tt = "Umb.MenuItem.ContentAudit.Audits", oa = "Umb.Workspace.ContentAudit.AuditsRoot", Os = [
  {
    type: "menuItem",
    kind: "tree",
    alias: tt,
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
    api: () => import("./audits-menu-structure.context.js"),
    meta: {
      menuItemAlias: tt
    },
    conditions: [
      {
        alias: T,
        match: te
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
        alias: T,
        match: te
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
      menuItemAlias: tt
    },
    conditions: [
      {
        alias: T,
        match: oa
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
        alias: T,
        match: oa
      }
    ]
  }
], Es = [
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
    forEntityTypes: [Xa, Ja]
  }
], Ss = [
  {
    type: "workspace",
    kind: "routable",
    alias: te,
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
        alias: T,
        match: te
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
        alias: T,
        match: te
      }
    ]
  }
], ra = "Umb.Workspace.ContentAudit.AuditsRoot", $s = [
  {
    type: "workspace",
    kind: "default",
    alias: ra,
    name: "Audits Root Workspace",
    meta: {
      entityType: Ja,
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
      collectionAlias: gt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ra
      }
    ]
  }
], Ps = [
  ...Ss,
  ...$s
], Us = [
  ...ws,
  ...Is,
  ...Os,
  ...Es,
  ...Ps
], Qa = "all-pages-root", Ls = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: Qa,
    menus: [M]
  }
}, ks = [Ls], la = "Umb.Workspace.ContentAudit.AllPagesRoot", H = "Umb.Workspace.ContentAudit.AllPages", Ns = [
  {
    type: "workspace",
    kind: "routable",
    alias: H,
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
        alias: T,
        match: H
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
        alias: T,
        match: H
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
        alias: T,
        match: H
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
        alias: T,
        match: H
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
        alias: T,
        match: H
      }
    ]
  }
], vt = "Umb.Collection.ContentAudit.AllPages", Ds = "Umb.CollectionView.ContentAudit.AllPages.Table", Za = "Umb.Repository.ContentAuditAllPagesCollection";
var Rs = Object.defineProperty, Ws = Object.getOwnPropertyDescriptor, en = (t) => {
  throw TypeError(t);
}, We = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Ws(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Rs(e, a, n), n;
}, wt = (t, e, a) => e.has(t) || en("Cannot " + a), ca = (t, e, a) => (wt(t, e, "read from private field"), e.get(t)), ua = (t, e, a) => e.has(t) ? en("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Vs = (t, e, a, i) => (wt(t, e, "write to private field"), e.set(t, a), a), tn = (t, e, a) => (wt(t, e, "access private method"), a), ne, Pe, an, nn;
let P = class extends E {
  constructor() {
    super(), ua(this, Pe), this._tableConfig = {
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
    ], this._tableItems = [], ua(this, ne), this.consumeContext($, (t) => {
      Vs(this, ne, t), tn(this, Pe, an).call(this);
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
ne = /* @__PURE__ */ new WeakMap();
Pe = /* @__PURE__ */ new WeakSet();
an = function() {
  ca(this, ne) && this.observe(ca(this, ne).items, (t) => tn(this, Pe, nn).call(this, t), "umbCollectionItemsObserver");
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
  f`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
We([
  m()
], P.prototype, "_tableConfig", 2);
We([
  m()
], P.prototype, "_tableColumns", 2);
We([
  m()
], P.prototype, "_tableItems", 2);
P = We([
  C("content-audit-all-pages-table-collection-view")
], P);
const xs = P, Ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return P;
  },
  default: xs
}, Symbol.toStringTag, { value: "Module" })), js = [
  {
    type: "workspace",
    kind: "default",
    alias: la,
    name: "All Pages Root Workspace",
    meta: {
      entityType: Qa,
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
      collectionAlias: vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: la
      }
    ]
  }
], Bs = [...Ns, ...js], zs = [
  {
    type: "repository",
    alias: Za,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository.js")
  }
], qs = [
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
        alias: g,
        match: vt
      }
    ]
  }
], Ys = [
  {
    type: "collection",
    kind: "default",
    alias: vt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element.js"),
    meta: {
      repositoryAlias: Za
    }
  },
  ...zs,
  ...qs
], Hs = "Umb.Repository.ContentAudit.AllPages.Detail", Ks = "Umb.Store.ContentAudit.AllPages.Detail", Fs = [
  {
    type: "repository",
    alias: Hs,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository.js")
  },
  {
    type: "store",
    alias: Ks,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store.js")
  }
], Gs = [...Fs], Xs = [
  ...Bs,
  ...ks,
  ...Ys,
  ...Gs
], sn = "issues-root", Js = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: sn,
    menus: [M]
  }
}, Qs = [Js], ma = "Umb.Workspace.ContentAudit.IssuesRoot", da = "Umb.Workspace.ContentAudit.Issues", Zs = [
  {
    type: "workspace",
    kind: "routable",
    alias: da,
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
        alias: T,
        match: da
      }
    ]
  }
], eo = [
  {
    type: "workspace",
    kind: "default",
    alias: ma,
    name: "Issues Root Workspace",
    meta: {
      entityType: sn,
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
      collectionAlias: yt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ma
      }
    ]
  }
], to = [...Zs, ...eo], ao = [
  {
    type: "repository",
    alias: qa,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => ps)
  }
], no = [
  {
    type: "collectionView",
    alias: ms,
    name: "Issues Table Collection View",
    js: () => Promise.resolve().then(() => As),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: yt
      }
    ]
  }
], io = [
  {
    type: "collection",
    kind: "default",
    alias: yt,
    name: "Issues Collection",
    element: () => import("./issues.element.js"),
    meta: {
      repositoryAlias: qa
    }
  },
  ...ao,
  ...no
], so = "Umb.Repository.ContentAudit.Issues.Detail", oo = "Umb.Store.ContentAudit.Issues.Detail", ro = [
  {
    type: "repository",
    alias: so,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository.js")
  },
  {
    type: "store",
    alias: oo,
    name: "Issues Detail Store",
    api: () => import("./issues-detail.store.js")
  }
], lo = [...ro], co = [
  ...to,
  ...Qs,
  ...io,
  ...lo
], on = "status-codes-root", uo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: on,
    menus: [M]
  }
}, mo = [uo], It = "Umb.Collection.ContentAudit.StatusCodes", po = "Umb.CollectionView.ContentAudit.StatusCodes.Table", rn = "Umb.Repository.ContentAuditStatusCodesCollection";
var ho = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, ln = (t) => {
  throw TypeError(t);
}, Ve = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? _o(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && ho(e, a, n), n;
}, Ot = (t, e, a) => e.has(t) || ln("Cannot " + a), dt = (t, e, a) => (Ot(t, e, "read from private field"), e.get(t)), at = (t, e, a) => e.has(t) ? ln("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), cn = (t, e, a, i) => (Ot(t, e, "write to private field"), e.set(t, a), a), Et = (t, e, a) => (Ot(t, e, "access private method"), a), ie, xe, se, un, mn, dn;
let U = class extends E {
  constructor() {
    super(), at(this, se), this._tableConfig = {
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
    ], this._tableItems = [], at(this, ie), at(this, xe), this.consumeContext($, (t) => {
      cn(this, ie, t);
    }), Et(this, se, un).call(this);
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
un = function() {
  new fe(this, Ce).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    cn(this, xe, t), Et(this, se, mn).call(this);
  });
};
mn = function() {
  dt(this, ie) && this.observe(dt(this, ie).items, (t) => Et(this, se, dn).call(this, t), "umbCollectionItemsObserver");
};
dn = function(t) {
  const e = dt(this, xe);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const i = e({ entityType: a.entityType }) + be.generateLocal({ unique: a.unique });
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
  f`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ve([
  m()
], U.prototype, "_tableConfig", 2);
Ve([
  m()
], U.prototype, "_tableColumns", 2);
Ve([
  m()
], U.prototype, "_tableItems", 2);
U = Ve([
  C("content-audit-status-codes-table-collection-view")
], U);
const Co = U, bo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return U;
  },
  default: Co
}, Symbol.toStringTag, { value: "Module" })), pa = "Umb.Workspace.ContentAudit.StatusCodes", fo = [
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
    alias: "Umb.Workspace.StatusCodes.Collection",
    name: "Content Audit Status Codes Collection Workspace View",
    meta: {
      label: "Collection",
      icon: "icon-layers",
      pathname: "collection",
      collectionAlias: It
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: pa
      }
    ]
  }
], yo = [
  {
    type: "repository",
    alias: rn,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository.js")
  }
], Ao = [
  {
    type: "collectionView",
    alias: po,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => bo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: It
      }
    ]
  }
], To = [
  {
    type: "collection",
    kind: "default",
    alias: It,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element.js"),
    meta: {
      repositoryAlias: rn
    }
  },
  ...yo,
  ...Ao
], go = [
  ...fo,
  ...mo,
  ...To
], pn = "orphaned-pages-root", vo = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: pn,
    menus: [De]
  }
}, wo = [vo], St = "Umb.Collection.ContentAudit.OrphanedPages", Io = "Umb.CollectionView.ContentAudit.OrphanedPages.Table", hn = "Umb.Repository.ContentAuditOrphanedPagesCollection";
var Oo = Object.defineProperty, Eo = Object.getOwnPropertyDescriptor, _n = (t) => {
  throw TypeError(t);
}, Me = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Eo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Oo(e, a, n), n;
}, $t = (t, e, a) => e.has(t) || _n("Cannot " + a), pt = (t, e, a) => ($t(t, e, "read from private field"), e.get(t)), nt = (t, e, a) => e.has(t) ? _n("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Cn = (t, e, a, i) => ($t(t, e, "write to private field"), e.set(t, a), a), Pt = (t, e, a) => ($t(t, e, "access private method"), a), oe, je, re, bn, fn, yn;
let L = class extends E {
  constructor() {
    super(), nt(this, re), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], nt(this, oe), nt(this, je), this.consumeContext($, (t) => {
      Cn(this, oe, t);
    }), Pt(this, re, bn).call(this);
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
bn = function() {
  new fe(this, Ce).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Cn(this, je, t), Pt(this, re, fn).call(this);
  });
};
fn = function() {
  pt(this, oe) && this.observe(pt(this, oe).items, (t) => Pt(this, re, yn).call(this, t), "umbCollectionItemsObserver");
};
yn = function(t) {
  const e = pt(this, je);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const i = e({ entityType: "document" }) + be.generateLocal({ unique: a.unique });
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
  f`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Me([
  m()
], L.prototype, "_tableConfig", 2);
Me([
  m()
], L.prototype, "_tableColumns", 2);
Me([
  m()
], L.prototype, "_tableItems", 2);
L = Me([
  C("content-audit-orphaned-pages-table-collection-view")
], L);
const So = L, $o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return L;
  },
  default: So
}, Symbol.toStringTag, { value: "Module" })), ha = "Umb.Workspace.ContentAudit.OrphanedPages", Po = [
  {
    type: "workspace",
    kind: "default",
    alias: ha,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: pn,
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
        match: ha
      }
    ]
  }
], Uo = [
  {
    type: "repository",
    alias: hn,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository.js")
  }
], Lo = [
  {
    type: "collectionView",
    alias: Io,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => $o),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: St
      }
    ]
  }
], ko = [
  {
    type: "collection",
    kind: "default",
    alias: St,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element.js"),
    meta: {
      repositoryAlias: hn
    }
  },
  ...Uo,
  ...Lo
], No = [
  ...Po,
  ...wo,
  ...ko
], An = "images-alt-text-root", Do = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: An,
    menus: [De]
  }
}, Ro = [Do], Ut = "Umb.Collection.ContentAudit.ImagesAltText", Wo = "Umb.CollectionView.ContentAudit.ImagesAltText.Table", Tn = "Umb.Repository.ContentAuditImagesAltTextCollection";
var Vo = Object.defineProperty, xo = Object.getOwnPropertyDescriptor, gn = (t) => {
  throw TypeError(t);
}, Be = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? xo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Vo(e, a, n), n;
}, Lt = (t, e, a) => e.has(t) || gn("Cannot " + a), ht = (t, e, a) => (Lt(t, e, "read from private field"), e.get(t)), it = (t, e, a) => e.has(t) ? gn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), vn = (t, e, a, i) => (Lt(t, e, "write to private field"), e.set(t, a), a), kt = (t, e, a) => (Lt(t, e, "access private method"), a), le, ze, ce, wn, In, On;
let k = class extends E {
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
    ], this._tableItems = [], it(this, le), it(this, ze), this.consumeContext($, (t) => {
      vn(this, le, t);
    }), kt(this, ce, wn).call(this);
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
ze = /* @__PURE__ */ new WeakMap();
ce = /* @__PURE__ */ new WeakSet();
wn = function() {
  new fe(this, Ce).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    vn(this, ze, t), kt(this, ce, In).call(this);
  });
};
In = function() {
  ht(this, le) && this.observe(ht(this, le).items, (t) => kt(this, ce, On).call(this, t), "umbCollectionItemsObserver");
};
On = function(t) {
  const e = ht(this, ze);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const i = e({ entityType: "document" }) + be.generateLocal({ unique: a.unique });
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
  f`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Be([
  m()
], k.prototype, "_tableConfig", 2);
Be([
  m()
], k.prototype, "_tableColumns", 2);
Be([
  m()
], k.prototype, "_tableItems", 2);
k = Be([
  C("content-audit-images-alt-text-table-collection-view")
], k);
const Mo = k, jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return k;
  },
  default: Mo
}, Symbol.toStringTag, { value: "Module" })), _a = "Umb.Workspace.ContentAudit.ImagesAltText", Bo = [
  {
    type: "workspace",
    kind: "default",
    alias: _a,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: An,
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
      collectionAlias: Ut
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: _a
      }
    ]
  }
], zo = [
  {
    type: "repository",
    alias: Tn,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository.js")
  }
], qo = [
  {
    type: "collectionView",
    alias: Wo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => jo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: Ut
      }
    ]
  }
], Yo = [
  {
    type: "collection",
    kind: "default",
    alias: Ut,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element.js"),
    meta: {
      repositoryAlias: Tn
    }
  },
  ...zo,
  ...qo
], Ho = [
  ...Bo,
  ...Ro,
  ...Yo
], En = "outbound-links-root", Ko = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: En,
    menus: [M]
  }
}, Fo = [Ko], Nt = "Umb.Collection.ContentAudit.OutboundLinks", Go = "Umb.CollectionView.ContentAudit.OutboundLinks.Table", Sn = "Umb.Repository.ContentAuditOutboundLinksCollection";
var Xo = Object.defineProperty, Jo = Object.getOwnPropertyDescriptor, $n = (t) => {
  throw TypeError(t);
}, qe = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Jo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Xo(e, a, n), n;
}, Dt = (t, e, a) => e.has(t) || $n("Cannot " + a), Ca = (t, e, a) => (Dt(t, e, "read from private field"), e.get(t)), ba = (t, e, a) => e.has(t) ? $n("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Qo = (t, e, a, i) => (Dt(t, e, "write to private field"), e.set(t, a), a), Pn = (t, e, a) => (Dt(t, e, "access private method"), a), ue, Ue, Un, Ln;
let N = class extends E {
  constructor() {
    super(), ba(this, Ue), this._tableConfig = {
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
    ], this._tableItems = [], ba(this, ue), this.consumeContext($, (t) => {
      Qo(this, ue, t), Pn(this, Ue, Un).call(this);
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
ue = /* @__PURE__ */ new WeakMap();
Ue = /* @__PURE__ */ new WeakSet();
Un = function() {
  Ca(this, ue) && this.observe(Ca(this, ue).items, (t) => Pn(this, Ue, Ln).call(this, t), "umbCollectionItemsObserver");
};
Ln = function(t) {
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
  f`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
qe([
  m()
], N.prototype, "_tableConfig", 2);
qe([
  m()
], N.prototype, "_tableColumns", 2);
qe([
  m()
], N.prototype, "_tableItems", 2);
N = qe([
  C("content-audit-outbound-links-table-collection-view")
], N);
const Zo = N, er = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return N;
  },
  default: Zo
}, Symbol.toStringTag, { value: "Module" })), fa = "Umb.Workspace.ContentAudit.OutboundLinks", tr = [
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
    alias: "Umb.Workspace.OutboundLinks.Collection",
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
], ar = [
  {
    type: "repository",
    alias: Sn,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository.js")
  }
], nr = [
  {
    type: "collectionView",
    alias: Go,
    name: "Outbound Links Table Collection View",
    js: () => Promise.resolve().then(() => er),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: Nt
      }
    ]
  }
], ir = [
  {
    type: "collection",
    kind: "default",
    alias: Nt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element.js"),
    meta: {
      repositoryAlias: Sn
    }
  },
  ...ar,
  ...nr
], sr = [
  ...tr,
  ...Fo,
  ...ir
], kn = "inbound-links-root", or = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: kn,
    menus: [M]
  }
}, rr = [or], Rt = "Umb.Collection.ContentAudit.InboundLinks", lr = "Umb.CollectionView.ContentAudit.InboundLinks.Table", Nn = "Umb.Repository.ContentAuditInboundLinksCollection";
var cr = Object.defineProperty, ur = Object.getOwnPropertyDescriptor, Dn = (t) => {
  throw TypeError(t);
}, Ye = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? ur(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && cr(e, a, n), n;
}, Wt = (t, e, a) => e.has(t) || Dn("Cannot " + a), ya = (t, e, a) => (Wt(t, e, "read from private field"), e.get(t)), Aa = (t, e, a) => e.has(t) ? Dn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), mr = (t, e, a, i) => (Wt(t, e, "write to private field"), e.set(t, a), a), Rn = (t, e, a) => (Wt(t, e, "access private method"), a), me, Le, Wn, Vn;
let D = class extends E {
  constructor() {
    super(), Aa(this, Le), this._tableConfig = {
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
    ], this._tableItems = [], Aa(this, me), this.consumeContext($, (t) => {
      mr(this, me, t), Rn(this, Le, Wn).call(this);
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
me = /* @__PURE__ */ new WeakMap();
Le = /* @__PURE__ */ new WeakSet();
Wn = function() {
  ya(this, me) && this.observe(ya(this, me).items, (t) => Rn(this, Le, Vn).call(this, t), "umbCollectionItemsObserver");
};
Vn = function(t) {
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
  f`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ye([
  m()
], D.prototype, "_tableConfig", 2);
Ye([
  m()
], D.prototype, "_tableColumns", 2);
Ye([
  m()
], D.prototype, "_tableItems", 2);
D = Ye([
  C("content-audit-inbound-links-table-collection-view")
], D);
const dr = D, pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return D;
  },
  default: dr
}, Symbol.toStringTag, { value: "Module" })), Ta = "Umb.Workspace.ContentAudit.InboundLinks", hr = [
  {
    type: "workspace",
    kind: "default",
    alias: Ta,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: kn,
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
      collectionAlias: Rt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ta
      }
    ]
  }
], _r = [
  {
    type: "repository",
    alias: Nn,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository.js")
  }
], Cr = [
  {
    type: "collectionView",
    alias: lr,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => pr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: Rt
      }
    ]
  }
], br = [
  {
    type: "collection",
    kind: "default",
    alias: Rt,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element.js"),
    meta: {
      repositoryAlias: Nn
    }
  },
  ..._r,
  ...Cr
], fr = [
  ...hr,
  ...rr,
  ...br
], xn = "metadata-root", yr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: xn,
    menus: ["Umb.Menu.ContentMetadata"]
  }
}, Ar = [yr], Vt = "Umb.Collection.ContentAudit.Metadata", Tr = "Umb.CollectionView.ContentAudit.Metadata.Table", ga = "Umb.Workspace.ContentAudit.Metadata", gr = [
  {
    type: "workspace",
    kind: "default",
    alias: ga,
    name: "Metadata Root Workspace",
    meta: {
      entityType: xn,
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
      collectionAlias: Vt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ga
      }
    ]
  }
], Mn = "Umb.Repository.ContentAuditMetadataCollection", vr = [
  {
    type: "repository",
    alias: Mn,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository.js")
  }
], wr = [
  {
    type: "collectionView",
    alias: Tr,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: Vt
      }
    ]
  }
], Ir = [
  {
    type: "collection",
    kind: "default",
    alias: Vt,
    name: "Metadata Collection",
    element: () => import("./metadata.element.js"),
    meta: {
      repositoryAlias: Mn
    }
  },
  ...vr,
  ...wr
], Or = [
  ...gr,
  ...Ar,
  ...Ir
], Er = [], xt = "Umb.Collection.ContentAudit.DuplicateContent", Sr = "Umb.CollectionView.ContentAudit.DuplicateContent.Table", jn = "Umb.Repository.ContentAuditDuplicateContentCollection";
var $r = Object.defineProperty, Pr = Object.getOwnPropertyDescriptor, He = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Pr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && $r(e, a, n), n;
};
let R = class extends E {
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
  f`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
He([
  m()
], R.prototype, "_tableConfig", 2);
He([
  m()
], R.prototype, "_tableColumns", 2);
He([
  m()
], R.prototype, "_tableItems", 2);
R = He([
  C("content-audit-duplicate-content-table-collection-view")
], R);
const Ur = R, Lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return R;
  },
  default: Ur
}, Symbol.toStringTag, { value: "Module" })), kr = "duplicate-content-root", va = "Umb.Workspace.ContentAudit.DuplicateContent", Nr = [
  {
    type: "workspace",
    kind: "default",
    alias: va,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: kr,
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
        match: va
      }
    ]
  }
], Dr = [
  {
    type: "repository",
    alias: jn,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository.js")
  }
], Rr = [
  {
    type: "collectionView",
    alias: Sr,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => Lr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: xt
      }
    ]
  }
], Wr = [
  {
    type: "collection",
    kind: "default",
    alias: xt,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element.js"),
    meta: {
      repositoryAlias: jn
    }
  },
  ...Dr,
  ...Rr
], Vr = [
  ...Nr,
  ...Er,
  ...Wr
], Bn = "carbon-rating-root", xr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: Bn,
    menus: [Re]
  }
}, Mr = [xr], Mt = "Umb.Collection.ContentAudit.CarbonRating", jr = "Umb.CollectionView.ContentAudit.CarbonRating.Table", zn = "Umb.Repository.ContentAuditCarbonRatingCollection";
var Br = Object.defineProperty, zr = Object.getOwnPropertyDescriptor, qn = (t) => {
  throw TypeError(t);
}, Ke = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? zr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && Br(e, a, n), n;
}, jt = (t, e, a) => e.has(t) || qn("Cannot " + a), _t = (t, e, a) => (jt(t, e, "read from private field"), e.get(t)), st = (t, e, a) => e.has(t) ? qn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Yn = (t, e, a, i) => (jt(t, e, "write to private field"), e.set(t, a), a), Bt = (t, e, a) => (jt(t, e, "access private method"), a), de, Fe, pe, Hn, Kn, Fn;
let W = class extends E {
  constructor() {
    super(), st(this, pe), this._tableConfig = {
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
    ], this._tableItems = [], st(this, de), st(this, Fe), this.consumeContext($, (t) => {
      Yn(this, de, t);
    }), Bt(this, pe, Hn).call(this);
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
Fe = /* @__PURE__ */ new WeakMap();
pe = /* @__PURE__ */ new WeakSet();
Hn = function() {
  new fe(this, Ce).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Yn(this, Fe, t), Bt(this, pe, Kn).call(this);
  });
};
Kn = function() {
  _t(this, de) && this.observe(_t(this, de).items, (t) => Bt(this, pe, Fn).call(this, t), "umbCollectionItemsObserver");
};
Fn = function(t) {
  const e = _t(this, Fe);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.map((a) => {
    const i = e({ entityType: a.entityType }) + be.generateLocal({ unique: a.unique });
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
  f`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ke([
  m()
], W.prototype, "_tableConfig", 2);
Ke([
  m()
], W.prototype, "_tableColumns", 2);
Ke([
  m()
], W.prototype, "_tableItems", 2);
W = Ke([
  C("content-audit-carbon-rating-table-collection-view")
], W);
const qr = W, Yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return W;
  },
  default: qr
}, Symbol.toStringTag, { value: "Module" })), wa = "Umb.Workspace.ContentAudit.CarbonRating", Hr = [
  {
    type: "workspace",
    kind: "default",
    alias: wa,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: Bn,
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
      collectionAlias: Mt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: wa
      }
    ]
  }
], Kr = [
  {
    type: "repository",
    alias: zn,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository.js")
  }
], Fr = [
  {
    type: "collectionView",
    alias: jr,
    name: "Carbon Rating Table Collection View",
    js: () => Promise.resolve().then(() => Yr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: Mt
      }
    ]
  }
], Gr = [
  {
    type: "collection",
    kind: "default",
    alias: Mt,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element.js"),
    meta: {
      repositoryAlias: zn
    }
  },
  ...Kr,
  ...Fr
], Xr = [
  ...Hr,
  ...Mr,
  ...Gr
], Gn = "core-web-vitals-root", Jr = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: Gn,
    menus: [Re]
  }
}, Qr = [Jr], zt = "Umb.Collection.ContentAudit.CoreWebVitals", Zr = "Umb.CollectionView.ContentAudit.CoreWebVitals.Table", Xn = "Umb.Repository.ContentAuditCoreWebVitalsCollection";
var el = Object.defineProperty, tl = Object.getOwnPropertyDescriptor, Jn = (t) => {
  throw TypeError(t);
}, Ge = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? tl(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, a, n) : o(n)) || n);
  return i && n && el(e, a, n), n;
}, qt = (t, e, a) => e.has(t) || Jn("Cannot " + a), Ct = (t, e, a) => (qt(t, e, "read from private field"), e.get(t)), ot = (t, e, a) => e.has(t) ? Jn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Qn = (t, e, a, i) => (qt(t, e, "write to private field"), e.set(t, a), a), Yt = (t, e, a) => (qt(t, e, "access private method"), a), he, Xe, _e, Zn, ei, ti;
let V = class extends E {
  constructor() {
    super(), ot(this, _e), this._tableConfig = {
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
    ], this._tableItems = [], ot(this, he), ot(this, Xe), this.consumeContext($, (t) => {
      Qn(this, he, t);
    }), Yt(this, _e, Zn).call(this);
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
Xe = /* @__PURE__ */ new WeakMap();
_e = /* @__PURE__ */ new WeakSet();
Zn = function() {
  new fe(this, Ce).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    Qn(this, Xe, t), Yt(this, _e, ei).call(this);
  });
};
ei = function() {
  Ct(this, he) && this.observe(Ct(this, he).items, (t) => Yt(this, _e, ti).call(this, t), "umbCollectionItemsObserver");
};
ti = function(t) {
  const e = Ct(this, Xe);
  if (!e) throw new Error("Route builder not ready");
  this._tableItems = t.filter((a) => a.pageData.statusCode === 200).map((a) => {
    const i = e({ entityType: a.entityType }) + be.generateLocal({ unique: a.unique });
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
  f`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ge([
  m()
], V.prototype, "_tableConfig", 2);
Ge([
  m()
], V.prototype, "_tableColumns", 2);
Ge([
  m()
], V.prototype, "_tableItems", 2);
V = Ge([
  C("content-audit-core-web-vitals-table-collection-view")
], V);
const al = V, nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return V;
  },
  default: al
}, Symbol.toStringTag, { value: "Module" })), Ia = "Umb.Workspace.ContentAudit.CoreWebVitals", il = [
  {
    type: "workspace",
    kind: "default",
    alias: Ia,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: Gn,
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
        match: Ia
      }
    ]
  }
], sl = [
  {
    type: "repository",
    alias: Xn,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository.js")
  }
], ol = [
  {
    type: "collectionView",
    alias: Zr,
    name: "Core Web Vitals Table Collection View",
    js: () => Promise.resolve().then(() => nl),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: g,
        match: zt
      }
    ]
  }
], rl = [
  {
    type: "collection",
    kind: "default",
    alias: zt,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element.js"),
    meta: {
      repositoryAlias: Xn
    }
  },
  ...sl,
  ...ol
], ll = [
  ...il,
  ...Qr,
  ...rl
], ai = "export-root", cl = {
  type: "menuItem",
  alias: "Umb.MenuItem.ContentAudit.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: ai,
    menus: [ft]
  }
}, ul = [cl], ml = "Umb.Workspace.ContentAudit.Export", dl = [
  {
    type: "workspace",
    kind: "default",
    alias: ml,
    name: "Export Root Workspace",
    element: () => import("./export.element.js"),
    meta: {
      entityType: ai,
      headline: "Export"
    }
  }
], pl = [
  ...dl,
  ...ul
], G = "Umb.Section.ContentAudit", hl = {
  type: "section",
  alias: G,
  name: "Content Audit",
  meta: {
    label: "Audit",
    pathname: "audit"
  }
}, _l = {
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
      match: G
    }
  ]
}, Cl = [
  {
    type: "menu",
    alias: M,
    name: "Audit Menu"
  },
  {
    type: "menu",
    alias: De,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: Re,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: ft,
    name: "Tools Menu"
  }
], bl = [
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
        match: G
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
      menu: De
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: G
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
      menu: Re
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: G
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
      menu: ft
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: G
      }
    ]
  }
], fl = [
  hl,
  _l,
  ...Cl,
  ...bl,
  ...Us,
  ...Xs,
  ...co,
  ...go,
  ...No,
  ...Ho,
  ...sr,
  ...fr,
  ...Or,
  ...Vr,
  ...Xr,
  ...ll,
  ...pl
], yl = {
  type: "workspace",
  alias: Ee,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => us),
  meta: {
    entityType: Ma
  }
}, Al = [
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
        match: Ee
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
        match: Ee
      }
    ]
  }
], Tl = [
  yl,
  ...Al
], gl = [
  {
    type: "modal",
    alias: "Umb.ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element.js")
  }
], vl = [
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
], wl = {
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
}, Il = [wl], Ol = {
  type: "globalContext",
  alias: qi,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Fi)
}, Hl = async (t, e) => {
  e.registerMany([
    Ol,
    ...fl,
    ...Tl,
    ...gl,
    ...vl,
    ...Il
  ]), t.consumeContext(ri, async (a) => {
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
  Te as A,
  Ie as B,
  ja as C,
  rt as D,
  Se as E,
  hi as F,
  pi as G,
  ql as H,
  Va as I,
  Bl as J,
  Hl as K,
  zl as U,
  jl as a,
  Xa as b,
  Ja as c,
  te as d,
  H as e,
  za as f,
  da as g,
  qi as h,
  Ma as i,
  yt as j,
  qa as k,
  ms as l,
  M as m,
  De as n,
  Re as o,
  ft as p,
  Ee as q,
  lt as r,
  ut as s,
  Gi as t,
  mt as u,
  we as v,
  ds as w,
  na as x,
  w as y,
  Oe as z
};
//# sourceMappingURL=index.js.map
