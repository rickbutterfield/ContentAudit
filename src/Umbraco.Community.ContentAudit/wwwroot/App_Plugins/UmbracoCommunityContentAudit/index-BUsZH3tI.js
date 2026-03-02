import { UMB_AUTH_CONTEXT as Ba } from "@umbraco-cms/backoffice/auth";
import { css as A, property as x, customElement as f, html as d, nothing as za, state as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { UmbControllerBase as qa } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as on } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT as rn, UMB_WORKSPACE_MODAL as F, UMB_WORKSPACE_CONDITION_ALIAS as g } from "@umbraco-cms/backoffice/workspace";
import { tryExecute as q } from "@umbraco-cms/backoffice/resources";
import { UmbObjectState as ee, UmbArrayState as Ze, UmbBooleanState as ln, UmbStringState as ca } from "@umbraco-cms/backoffice/observable-api";
import { UMB_NOTIFICATION_CONTEXT as cn } from "@umbraco-cms/backoffice/notification";
import { UMB_SERVER_CONTEXT as un } from "@umbraco-cms/backoffice/server";
import { HubConnectionBuilder as dn } from "@umbraco-cms/backoffice/external/signalr";
import { UmbRepositoryBase as mn } from "@umbraco-cms/backoffice/repository";
import { UMB_COLLECTION_CONTEXT as $, UMB_COLLECTION_ALIAS_CONDITION as v } from "@umbraco-cms/backoffice/collection";
import { UmbModalRouteRegistrationController as H } from "@umbraco-cms/backoffice/router";
import { UmbTextStyles as pn } from "@umbraco-cms/backoffice/style";
const hn = [
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
], Cn = [
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
var _n = Object.defineProperty, fn = Object.getOwnPropertyDescriptor, Ya = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? fn(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && _n(e, a, i), i;
};
let we = class extends C {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = hn[this.type - 1];
      return d`
                <uui-tag color=${t?.color}>
                    <uui-icon name="${t?.icon}"></uui-icon>
                    ${t?.label}
                </uui-tag>
            `;
    }
  }
};
we.styles = [
  A`
            uui-tag {
                font-size: var(--uui-type-default-size);

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Ya([
  x({ attribute: !1 })
], we.prototype, "type", 2);
we = Ya([
  f("content-audit-issue-type-label")
], we);
var bn = Object.defineProperty, An = Object.getOwnPropertyDescriptor, Fa = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? An(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && bn(e, a, i), i;
};
let Ie = class extends C {
  constructor() {
    super(...arguments), this.type = 0;
  }
  render() {
    if (this.type != 0) {
      const t = Cn[this.type - 1];
      return d`
                <uui-tag color=${t?.color}>
                    <uui-icon name="${t?.icon}"></uui-icon>
                    ${t?.label}
                </uui-tag>
            `;
    }
  }
};
Ie.styles = [
  A`
            uui-tag {
                font-size: var(--uui-type-default-size);

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
];
Fa([
  x({ attribute: !1 })
], Ie.prototype, "type", 2);
Ie = Fa([
  f("content-audit-priority-type-label")
], Ie);
var yn = Object.defineProperty, Tn = Object.getOwnPropertyDescriptor, Ha = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Tn(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && yn(e, a, i), i;
};
let ct = class extends C {
  _getColor(t) {
    return t >= 200 && t < 300 ? "positive" : t >= 300 && t < 400 ? "warning" : t >= 400 && t < 600 ? "danger" : "default";
  }
  render() {
    return this.statusCode !== void 0 && this.statusCode != 0 ? d`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>` : za;
  }
};
Ha([
  x({ attribute: !1 })
], ct.prototype, "statusCode", 2);
ct = Ha([
  f("content-audit-status-code-label")
], ct);
var gn = Object.defineProperty, vn = Object.getOwnPropertyDescriptor, Ga = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? vn(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && gn(e, a, i), i;
};
let ut = class extends C {
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
Ga([
  x({ attribute: !0 })
], ut.prototype, "value", 2);
ut = Ga([
  f("content-audit-carbon-intensity-label")
], ut);
var Ka = /* @__PURE__ */ ((t) => (t.CLS = "CLS", t.FCP = "FCP", t.FID = "FID", t.INP = "INP", t.LCP = "LCP", t.TTFB = "TTFB", t))(Ka || {}), dt = /* @__PURE__ */ ((t) => (t.GOOD = "Good", t.NEEDS_IMPROVEMENT = "NeedsImprovement", t.POOR = "Poor", t))(dt || {});
const wn = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, a) => typeof a == "bigint" ? a.toString() : a
  )
}, In = ({
  onRequest: t,
  onSseError: e,
  onSseEvent: a,
  responseTransformer: n,
  responseValidator: i,
  sseDefaultRetryDelay: s,
  sseMaxRetryAttempts: o,
  sseMaxRetryDelay: r,
  sseSleepFn: c,
  url: h,
  ...l
}) => {
  let _;
  const Q = c ?? ((p) => new Promise((y) => setTimeout(y, p)));
  return { stream: async function* () {
    let p = s ?? 3e3, y = 0;
    const j = l.signal ?? new AbortController().signal;
    for (; !j.aborted; ) {
      y++;
      const Z = l.headers instanceof Headers ? l.headers : new Headers(l.headers);
      _ !== void 0 && Z.set("Last-Event-ID", _);
      try {
        const B = {
          redirect: "follow",
          ...l,
          body: l.serializedBody,
          headers: Z,
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
        const S = T.body.pipeThrough(new TextDecoderStream()).getReader();
        let Qe = "";
        const na = () => {
          try {
            S.cancel();
          } catch {
          }
        };
        j.addEventListener("abort", na);
        try {
          for (; ; ) {
            const { done: tn, value: an } = await S.read();
            if (tn) break;
            Qe += an;
            const sa = Qe.split(`

`);
            Qe = sa.pop() ?? "";
            for (const nn of sa) {
              const sn = nn.split(`
`), Te = [];
              let oa;
              for (const w of sn)
                if (w.startsWith("data:"))
                  Te.push(w.replace(/^data:\s*/, ""));
                else if (w.startsWith("event:"))
                  oa = w.replace(/^event:\s*/, "");
                else if (w.startsWith("id:"))
                  _ = w.replace(/^id:\s*/, "");
                else if (w.startsWith("retry:")) {
                  const la = Number.parseInt(
                    w.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(la) || (p = la);
                }
              let z, ra = !1;
              if (Te.length) {
                const w = Te.join(`
`);
                try {
                  z = JSON.parse(w), ra = !0;
                } catch {
                  z = w;
                }
              }
              ra && (i && await i(z), n && (z = await n(z))), a?.({
                data: z,
                event: oa,
                id: _,
                retry: p
              }), Te.length && (yield z);
            }
          }
        } finally {
          j.removeEventListener("abort", na), S.releaseLock();
        }
        break;
      } catch (B) {
        if (e?.(B), o !== void 0 && y >= o)
          break;
        const O = Math.min(
          p * 2 ** (y - 1),
          r ?? 3e4
        );
        await Q(O);
      }
    }
  }() };
}, On = (t) => {
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
}, Sn = (t) => {
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
}, En = (t) => {
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
    const r = (t ? i : i.map((c) => encodeURIComponent(c))).join(Sn(n));
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
  const s = On(n), o = i.map((r) => n === "label" || n === "simple" ? t ? r : encodeURIComponent(r) : xe({
    allowReserved: t,
    name: a,
    value: r
  })).join(s);
  return n === "label" || n === "matrix" ? s + o : o;
}, xe = ({
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
  valueOnly: s
}) => {
  if (i instanceof Date)
    return s ? i.toISOString() : `${a}=${i.toISOString()}`;
  if (n !== "deepObject" && !e) {
    let c = [];
    Object.entries(i).forEach(([l, _]) => {
      c = [
        ...c,
        l,
        t ? _ : encodeURIComponent(_)
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
  const o = En(n), r = Object.entries(i).map(
    ([c, h]) => xe({
      allowReserved: t,
      name: n === "deepObject" ? `${a}[${c}]` : c,
      value: h
    })
  ).join(o);
  return n === "label" || n === "matrix" ? o + r : r;
}, $n = /\{[^{}]+\}/g, Pn = ({ path: t, url: e }) => {
  let a = e;
  const n = e.match($n);
  if (n)
    for (const i of n) {
      let s = !1, o = i.substring(1, i.length - 1), r = "simple";
      o.endsWith("*") && (s = !0, o = o.substring(0, o.length - 1)), o.startsWith(".") ? (o = o.substring(1), r = "label") : o.startsWith(";") && (o = o.substring(1), r = "matrix");
      const c = t[o];
      if (c == null)
        continue;
      if (Array.isArray(c)) {
        a = a.replace(
          i,
          Xa({ explode: s, name: o, style: r, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        a = a.replace(
          i,
          Ja({
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
          i,
          `;${xe({
            name: o,
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
}, kn = ({
  baseUrl: t,
  path: e,
  query: a,
  querySerializer: n,
  url: i
}) => {
  const s = i.startsWith("/") ? i : `/${i}`;
  let o = (t ?? "") + s;
  e && (o = Pn({ path: e, url: o }));
  let r = a ? n(a) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (o += `?${r}`), o;
};
function Ln(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const Nn = async (t, e) => {
  const a = typeof e == "function" ? await e(t) : e;
  if (a)
    return t.scheme === "bearer" ? `Bearer ${a}` : t.scheme === "basic" ? `Basic ${btoa(a)}` : a;
}, Qa = ({
  allowReserved: t,
  array: e,
  object: a
} = {}) => (i) => {
  const s = [];
  if (i && typeof i == "object")
    for (const o in i) {
      const r = i[o];
      if (r != null)
        if (Array.isArray(r)) {
          const c = Xa({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "form",
            value: r,
            ...e
          });
          c && s.push(c);
        } else if (typeof r == "object") {
          const c = Ja({
            allowReserved: t,
            explode: !0,
            name: o,
            style: "deepObject",
            value: r,
            ...a
          });
          c && s.push(c);
        } else {
          const c = xe({
            allowReserved: t,
            name: o,
            value: r
          });
          c && s.push(c);
        }
    }
  return s.join("&");
}, Dn = (t) => {
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
}, Vn = (t, e) => e ? !!(t.headers.has(e) || t.query?.[e] || t.headers.get("Cookie")?.includes(`${e}=`)) : !1, Rn = async ({
  security: t,
  ...e
}) => {
  for (const a of t) {
    if (Vn(e, a.name))
      continue;
    const n = await Nn(a, e.auth);
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
      default:
        e.headers.set(i, n);
        break;
    }
  }
}, ua = (t) => kn({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : Qa(t.querySerializer),
  url: t.url
}), da = (t, e) => {
  const a = { ...t, ...e };
  return a.baseUrl?.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = Za(t.headers, e.headers), a;
}, Un = (t) => {
  const e = [];
  return t.forEach((a, n) => {
    e.push([n, a]);
  }), e;
}, Za = (...t) => {
  const e = new Headers();
  for (const a of t) {
    if (!a)
      continue;
    const n = a instanceof Headers ? Un(a) : Object.entries(a);
    for (const [i, s] of n)
      if (s === null)
        e.delete(i);
      else if (Array.isArray(s))
        for (const o of s)
          e.append(i, o);
      else s !== void 0 && e.set(
        i,
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
    const n = this.getInterceptorIndex(e);
    return this.fns[n] ? (this.fns[n] = a, e) : !1;
  }
  use(e) {
    return this.fns.push(e), this.fns.length - 1;
  }
}
const Wn = () => ({
  error: new et(),
  request: new et(),
  response: new et()
}), xn = Qa({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), Mn = {
  "Content-Type": "application/json"
}, ei = (t = {}) => ({
  ...wn,
  headers: Mn,
  parseAs: "auto",
  querySerializer: xn,
  ...t
}), jn = (t = {}) => {
  let e = da(ei(), t);
  const a = () => ({ ...e }), n = (h) => (e = da(e, h), a()), i = Wn(), s = async (h) => {
    const l = {
      ...e,
      ...h,
      fetch: h.fetch ?? e.fetch ?? globalThis.fetch,
      headers: Za(e.headers, h.headers),
      serializedBody: void 0
    };
    l.security && await Rn({
      ...l,
      security: l.security
    }), l.requestValidator && await l.requestValidator(l), l.body !== void 0 && l.bodySerializer && (l.serializedBody = l.bodySerializer(l.body)), (l.body === void 0 || l.serializedBody === "") && l.headers.delete("Content-Type");
    const _ = ua(l);
    return { opts: l, url: _ };
  }, o = async (h) => {
    const { opts: l, url: _ } = await s(h), Q = {
      redirect: "follow",
      ...l,
      body: Ln(l)
    };
    let E = new Request(_, Q);
    for (const b of i.request.fns)
      b && (E = await b(E, l));
    const ye = l.fetch;
    let p = await ye(E);
    for (const b of i.response.fns)
      b && (p = await b(p, E, l));
    const y = {
      request: E,
      response: p
    };
    if (p.ok) {
      const b = (l.parseAs === "auto" ? Dn(p.headers.get("Content-Type")) : l.parseAs) ?? "json";
      if (p.status === 204 || p.headers.get("Content-Length") === "0") {
        let S;
        switch (b) {
          case "arrayBuffer":
          case "blob":
          case "text":
            S = await p[b]();
            break;
          case "formData":
            S = new FormData();
            break;
          case "stream":
            S = p.body;
            break;
          default:
            S = {};
            break;
        }
        return l.responseStyle === "data" ? S : {
          data: S,
          ...y
        };
      }
      let T;
      switch (b) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          T = await p[b]();
          break;
        case "stream":
          return l.responseStyle === "data" ? p.body : {
            data: p.body,
            ...y
          };
      }
      return b === "json" && (l.responseValidator && await l.responseValidator(T), l.responseTransformer && (T = await l.responseTransformer(T))), l.responseStyle === "data" ? T : {
        data: T,
        ...y
      };
    }
    const j = await p.text();
    let Z;
    try {
      Z = JSON.parse(j);
    } catch {
    }
    const B = Z ?? j;
    let O = B;
    for (const b of i.error.fns)
      b && (O = await b(B, p, E, l));
    if (O = O || {}, l.throwOnError)
      throw O;
    return l.responseStyle === "data" ? void 0 : {
      error: O,
      ...y
    };
  }, r = (h) => (l) => o({ ...l, method: h }), c = (h) => async (l) => {
    const { opts: _, url: Q } = await s(l);
    return In({
      ..._,
      body: _.body,
      headers: _.headers,
      method: h,
      onRequest: async (E, ye) => {
        let p = new Request(E, ye);
        for (const y of i.request.fns)
          y && (p = await y(p, _));
        return p;
      },
      url: Q
    });
  };
  return {
    buildUrl: ua,
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
    request: o,
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
}, u = jn(ei({
  baseUrl: "http://localhost:26297",
  throwOnError: !0
}));
class ge {
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
class K {
  static cancelCrawl(e) {
    return (e?.client ?? u).post({
      url: "/umbraco/content-audit/management/api/v1/crawl/cancel",
      ...e
    });
  }
  static getIncompleteCrawl(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/crawl/incomplete",
      ...e
    });
  }
  static discardIncompleteCrawl(e) {
    return (e.client ?? u).delete({
      url: "/umbraco/content-audit/management/api/v1/crawl/incomplete/{id}",
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
class jl {
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
class ti {
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
  static getIssueReferences(e) {
    return (e.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/issue/{id}/references",
      ...e
    });
  }
}
class Bn {
  static getSettings(e) {
    return (e?.client ?? u).get({
      url: "/umbraco/content-audit/management/api/v1/settings",
      ...e
    });
  }
}
var zn = Object.defineProperty, qn = Object.getOwnPropertyDescriptor, ai = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? qn(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && zn(e, a, i), i;
};
let Oe = class extends C {
  _getColour() {
    return this.value != null ? this.value.rating == dt.POOR ? "danger" : this.value.rating == dt.NEEDS_IMPROVEMENT ? "warning" : "positive" : "positive";
  }
  _formatValue() {
    return this.value != null ? this.value.name == Ka.CLS ? this.value.value.toFixed(3) : `${(this.value.value / 1e3 % 60).toFixed(2)}s` : "";
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
Oe.styles = [
  A`
            uui-tag {
                font-size: var(--uui-type-default-size);
            }
        `
];
ai([
  x({ attribute: !1 })
], Oe.prototype, "value", 2);
Oe = ai([
  f("content-audit-metric-label")
], Oe);
const Se = "ContentAudit.Workspace", Yn = "ContentAudit.Context", ii = "content-audit";
class Fn {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getLatestAuditOverview() {
    return await q(this.#e, ge.overview());
  }
  async getPagesWithMissingMetadata() {
    return await q(this.#e, ge.getPagesWithMissingMetadata());
  }
  async getTopIssues() {
    return await q(this.#e, ti.getAllIssues({
      query: { skip: 0, take: 5 }
    }));
  }
  async getHealthScore() {
    return await q(this.#e, ge.getHealthScore());
  }
  async getAuditOverviews() {
    return await q(this.#e, ge.getCollection({
      query: { skip: 0, take: 5 }
    }));
  }
}
class Hn {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getSettings() {
    return await q(this.#e, Bn.getSettings());
  }
}
class Gn extends qa {
  #e;
  #n;
  constructor(e) {
    super(e), this.#e = new Fn(this), this.#n = new Hn(this);
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
class mt extends qa {
  constructor(e) {
    super(e), this.workspaceAlias = Se, this.#n = new ee(void 0), this.latestAuditOverview = this.#n.asObservable(), this.#c = new Ze([], (a) => a.key), this.auditOverviews = this.#c.asObservable(), this.#u = new Ze([], (a) => a.unique), this.pagesWithMissingMetadata = this.#u.asObservable(), this.#d = new Ze([], (a) => a.name), this.topIssues = this.#d.asObservable(), this.#m = new ee(void 0), this.healthScore = this.#m.asObservable(), this.#p = new ee(void 0), this.settings = this.#p.asObservable(), this.#s = new ee(void 0), this.crawlSummary = this.#s.asObservable(), this.#i = new ln(!1), this.isRunning = this.#i.asObservable(), this.#a = new ca(""), this.crawlPhase = this.#a.asObservable(), this.#o = new ee(void 0), this.incompleteCrawl = this.#o.asObservable(), this.#l = new ca(""), this.pageEnrichingUrl = this.#l.asObservable(), this.provideContext(ni, this), this.provideContext(rn, this), this.#e = new Gn(this), this.consumeContext(Ba, (a) => {
      this.#h = a, this.#_();
    }), this.consumeContext(un, (a) => {
      this.#C = a;
    });
  }
  getEntityType() {
    return ii;
  }
  #e;
  #n;
  #c;
  #u;
  #d;
  #m;
  #p;
  #s;
  #i;
  #a;
  #o;
  #l;
  #t;
  #h;
  #C;
  #_() {
    this.observe(this.#h?.isAuthorized, async (e) => {
      if (e !== void 0)
        if (e) {
          const a = await this.#h?.getLatestToken();
          a && this.#f(a);
        } else
          this.#t?.stop(), this.#t = void 0;
    });
  }
  async #f(e) {
    this.#t && (await this.#t.stop(), this.#t = void 0);
    const n = `${this.#C?.getServerUrl() ?? ""}/umbraco/content-audit/hub`;
    this.#t = new dn().withUrl(n, {
      accessTokenFactory: () => e
    }).withAutomaticReconnect().build(), this.#t.on("crawlStarted", () => {
      this.#i.setValue(!0), this.#s.setValue(void 0), this.#a.setValue(""), this.#o.setValue(void 0);
    }), this.#t.on("crawlProgress", (i) => {
      this.#s.setValue(i);
    }), this.#t.on("crawlPhaseChanged", (i) => {
      this.#a.setValue(i);
    }), this.#t.on("crawlCompleted", () => {
      this.#i.setValue(!1), this.#a.setValue("");
    }), this.#t.on("crawlFailed", (i) => {
      this.#i.setValue(!1), this.#a.setValue("");
    }), this.#t.on("crawlCancelled", () => {
      this.#i.setValue(!1), this.#a.setValue("");
    }), this.#t.on("pageEnrichStarted", (i) => {
      this.#l.setValue(i);
    }), this.#t.on("pageEnrichCompleted", (i) => {
      this.#l.setValue("");
    }), this.#t.on("pageEnrichFailed", (i) => {
      this.#l.setValue("");
    }), this.#t.start().then(async () => {
      try {
        const { data: i } = await K.getCrawlStatus();
        i && (this.#i.setValue(i.isRunning), this.#a.setValue(i.phase ?? ""), i.isRunning && this.#s.setValue(i));
      } catch {
      }
    }).catch((i) => console.error("Content Audit SignalR connection failed", i)), this.#t.onreconnected(async () => {
      try {
        const { data: i } = await K.getCrawlStatus();
        i && (this.#i.setValue(i.isRunning), this.#a.setValue(i.phase ?? ""), i.isRunning && this.#s.setValue(i));
      } catch {
      }
    });
  }
  hostDisconnected() {
    super.hostDisconnected(), this.#t?.stop(), this.#t = void 0;
  }
  async #r(e) {
    (await this.getContext(cn))?.peek("danger", {
      data: { headline: "Content Audit", message: e }
    });
  }
  async getLatestAuditOverview() {
    const { data: e, error: a } = await this.#e.getLatestAuditOverview();
    e ? this.#n.setValue(e) : a && this.#r("Failed to load latest audit overview.");
  }
  async getAuditOverviews() {
    const { data: e, error: a } = await this.#e.getAuditOverviews();
    if (e && e.items) {
      const n = e.items.sort((i, s) => {
        const o = i.runDate ? new Date(i.runDate).getTime() : 0;
        return (s.runDate ? new Date(s.runDate).getTime() : 0) - o;
      });
      this.#c.setValue(n);
    } else a && this.#r("Failed to load audit history.");
  }
  async getPagesWithMissingMetadata() {
    const { data: e, error: a } = await this.#e.getPagesWithMissingMetadata();
    e ? this.#u.setValue(e.items) : a && this.#r("Failed to load pages with missing metadata.");
  }
  async getTopIssues() {
    const { data: e, error: a } = await this.#e.getTopIssues();
    e ? this.#d.setValue(e.items) : a && this.#r("Failed to load top issues.");
  }
  async getHealthScore() {
    const { data: e, error: a } = await this.#e.getHealthScore();
    e ? this.#m.setValue(e) : a && this.#r("Failed to load health score.");
  }
  async getIncompleteCrawl() {
    try {
      const { data: e } = await K.getIncompleteCrawl();
      this.#o.setValue(e && "key" in e ? e : void 0);
    } catch {
      this.#o.setValue(void 0);
    }
  }
  async discardIncompleteCrawl(e) {
    await K.discardIncompleteCrawl({ path: { id: e } }), this.#o.setValue(void 0);
  }
  async startCrawl() {
    return K.startCrawl();
  }
  async cancelCrawl() {
    return K.cancelCrawl();
  }
  async getSettings() {
    const { data: e, error: a } = await this.#e.getSettings();
    e ? this.#p.setValue(e) : a && this.#r("Failed to load settings.");
  }
}
const ni = new on(
  "ContentAuditContext"
), Kn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CONTENT_AUDIT_CONTEXT_TOKEN: ni,
  ContentAuditContext: mt,
  default: mt
}, Symbol.toStringTag, { value: "Module" }));
const Xn = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
const ve = globalThis, Dt = ve.ShadowRoot && (ve.ShadyCSS === void 0 || ve.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, si = /* @__PURE__ */ Symbol(), ma = /* @__PURE__ */ new WeakMap();
let Jn = class {
  constructor(e, a, n) {
    if (this._$cssResult$ = !0, n !== si) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = a;
  }
  get styleSheet() {
    let e = this.o;
    const a = this.t;
    if (Dt && e === void 0) {
      const n = a !== void 0 && a.length === 1;
      n && (e = ma.get(a)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && ma.set(a, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Qn = (t) => new Jn(typeof t == "string" ? t : t + "", void 0, si), Zn = (t, e) => {
  if (Dt) t.adoptedStyleSheets = e.map(((a) => a instanceof CSSStyleSheet ? a : a.styleSheet));
  else for (const a of e) {
    const n = document.createElement("style"), i = ve.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = a.cssText, t.appendChild(n);
  }
}, pa = Dt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const n of e.cssRules) a += n.cssText;
  return Qn(a);
})(t) : t;
const { is: es, defineProperty: ts, getOwnPropertyDescriptor: as, getOwnPropertyNames: is, getOwnPropertySymbols: ns, getPrototypeOf: ss } = Object, Me = globalThis, ha = Me.trustedTypes, os = ha ? ha.emptyScript : "", rs = Me.reactiveElementPolyfillSupport, ie = (t, e) => t, pt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? os : null;
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
} }, oi = (t, e) => !es(t, e), Ca = { attribute: !0, type: String, converter: pt, reflect: !1, useDefault: !1, hasChanged: oi };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Me.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class te extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, a = Ca) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(e, a), !a.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, n, a);
      i !== void 0 && ts(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, a, n) {
    const { get: i, set: s } = as(this.prototype, e) ?? { get() {
      return this[a];
    }, set(o) {
      this[a] = o;
    } };
    return { get: i, set(o) {
      const r = i?.call(this);
      s?.call(this, o), this.requestUpdate(e, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ca;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ie("elementProperties"))) return;
    const e = ss(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ie("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ie("properties"))) {
      const a = this.properties, n = [...is(a), ...ns(a)];
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
      for (const i of n) a.unshift(pa(i));
    } else e !== void 0 && a.push(pa(e));
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
    for (const n of a.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Zn(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((e) => e.hostConnected?.()));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((e) => e.hostDisconnected?.()));
  }
  attributeChangedCallback(e, a, n) {
    this._$AK(e, n);
  }
  _$ET(e, a) {
    const n = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, n);
    if (i !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : pt).toAttribute(a, n.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, a) {
    const n = this.constructor, i = n._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = n.getPropertyOptions(i), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : pt;
      this._$Em = i, this[i] = o.fromAttribute(a, s.type) ?? this._$Ej?.get(i) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, a, n) {
    if (e !== void 0) {
      const i = this.constructor, s = this[e];
      if (n ??= i.getPropertyOptions(e), !((n.hasChanged ?? oi)(s, a) || n.useDefault && n.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(i._$Eu(e, n)))) return;
      this.C(e, a, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, a, { useDefault: n, reflect: i, wrapped: s }, o) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? a ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (a = void 0), this._$AL.set(e, a)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [i, s] of this._$Ep) this[i] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, s] of n) {
        const { wrapped: o } = s, r = this[i];
        o !== !0 || this._$AL.has(i) || r === void 0 || this.C(i, void 0, s, r);
      }
    }
    let e = !1;
    const a = this._$AL;
    try {
      e = this.shouldUpdate(a), e ? (this.willUpdate(a), this._$EO?.forEach(((n) => n.hostUpdate?.())), this.update(a)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
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
te.elementStyles = [], te.shadowRootOptions = { mode: "open" }, te[ie("elementProperties")] = /* @__PURE__ */ new Map(), te[ie("finalized")] = /* @__PURE__ */ new Map(), rs?.({ ReactiveElement: te }), (Me.reactiveElementVersions ??= []).push("2.1.0");
var ls = Object.getOwnPropertyDescriptor, cs = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? ls(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = o(i) || i);
  return i;
};
let Ee = class extends C {
  constructor() {
    super(), this._workspaceContext = new mt(this);
  }
  render() {
    return d`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${!0}>
			</umb-workspace-editor>
		`;
  }
};
Ee = cs([
  Xn("content-audit-workspace-root")
], Ee);
const us = Ee, ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditWorkspaceRootElement() {
    return Ee;
  },
  default: us
}, Symbol.toStringTag, { value: "Module" })), M = "ContentAudit.Menu", je = "ContentAudit.Menu.Metadata", Be = "ContentAudit.Menu.Performance", Vt = "ContentAudit.Menu.Tools", Rt = "ContentAudit.Collection.Issues", ms = "ContentAudit.CollectionView.Issues.Table", ri = "ContentAudit.Repository.IssuesCollection";
class ps {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async getCollection(e) {
    const { data: a, error: n } = await q(this.#e, ti.getAllIssues({ query: e }));
    if (n)
      return { error: n };
    if (!a)
      return { data: { items: [], total: 0 } };
    const { items: i, total: s } = a;
    return { data: { items: i, total: s } };
  }
}
class _a extends mn {
  #e;
  constructor(e) {
    super(e), this.#e = new ps(e);
  }
  async requestCollection(e) {
    return this.#e.getCollection(e);
  }
}
const hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentAuditIssuesCollectionRepository: _a,
  default: _a
}, Symbol.toStringTag, { value: "Module" }));
var Cs = Object.defineProperty, _s = Object.getOwnPropertyDescriptor, li = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? _s(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && Cs(e, a, i), i;
};
let $e = class extends C {
  render() {
    return this.value ? d`
			<span>
				<a href=${this.value.editPath + "edit/" + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		` : za;
  }
};
$e.styles = [
  pn,
  A`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
];
li([
  x({ attribute: !1 })
], $e.prototype, "value", 2);
$e = li([
  f("content-audit-issues-table-name-column-layout")
], $e);
var fs = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, ci = (t) => {
  throw TypeError(t);
}, G = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? bs(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && fs(e, a, i), i;
}, Ut = (t, e, a) => e.has(t) || ci("Cannot " + a), ht = (t, e, a) => (Ut(t, e, "read from private field"), e.get(t)), tt = (t, e, a) => e.has(t) ? ci("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), fa = (t, e, a, n) => (Ut(t, e, "write to private field"), e.set(t, a), a), ae = (t, e, a) => (Ut(t, e, "access private method"), a), de, Pe, Y, Ct, Wt, ui;
let I = class extends C {
  constructor() {
    super(), tt(this, Y), this.data = [], this.hideSummary = !1, this._issues = [], this._tableConfig = {
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
    ], this._tableItems = [], tt(this, de), tt(this, Pe, ""), new H(this, F).addAdditionalPath("issues").onSetup(() => ({ data: { entityType: "issues", preset: {} } })).observeRouteBuilder((t) => {
      fa(this, Pe, t({})), ae(this, Y, Ct).call(this);
    }), this.consumeContext($, (t) => {
      fa(this, de, t), ae(this, Y, Ct).call(this);
    });
  }
  updated(t) {
    t.has("data") && this.data.length !== 0 && (this._issues = this.data, ae(this, Y, Wt).call(this, this.data));
  }
  render() {
    if (this._tableItems.length !== 0)
      return d`
                ${ae(this, Y, ui).call(this)}
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
  }
};
de = /* @__PURE__ */ new WeakMap();
Pe = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakSet();
Ct = function() {
  ht(this, de) && this.observe(ht(this, de).items, (t) => {
    this._issues = t, ae(this, Y, Wt).call(this, t);
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
          description: e.description,
          editPath: ht(this, Pe)
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
ui = function() {
  if (!this._issues.length || this.hideSummary) return;
  const t = this._issues.filter((n) => n.priority === "High").length, e = this._issues.filter((n) => n.priority === "Medium").length, a = this._issues.filter((n) => n.priority === "Low").length;
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
  A`
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
G([
  x({ type: Array, attribute: !1 })
], I.prototype, "data", 2);
G([
  x({ type: Boolean, attribute: "hide-summary" })
], I.prototype, "hideSummary", 2);
G([
  m()
], I.prototype, "_issues", 2);
G([
  m()
], I.prototype, "_tableConfig", 2);
G([
  m()
], I.prototype, "_tableColumns", 2);
G([
  m()
], I.prototype, "_tableItems", 2);
I = G([
  f("content-audit-issues-table-collection-view")
], I);
const As = I, ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditIssuesTableCollectionViewElement() {
    return I;
  },
  default: As
}, Symbol.toStringTag, { value: "Module" })), xt = "ContentAudit.Collection.Audits", Ts = "ContentAudit.CollectionView.Audits.Table", di = "ContentAudit.Repository.AuditsCollection", gs = [
  {
    type: "repository",
    alias: di,
    name: "Audits Collection Repository",
    api: () => import("./audits-collection.repository-DMDAPiyG.js")
  }
], vs = [
  {
    type: "collectionView",
    alias: Ts,
    name: "Audits Table Collection View",
    js: () => import("./audits-table-collection-view.element-D-WAsCPJ.js"),
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
], ws = [
  {
    type: "collection",
    kind: "default",
    alias: xt,
    name: "Audits Collection",
    element: () => import("./audits.element-CQMJCtGh.js"),
    meta: {
      repositoryAlias: di
    }
  },
  ...gs,
  ...vs
], mi = "audits", pi = "audits-root", Is = [
  {
    type: "entityAction",
    kind: "default",
    alias: "ContentAudit.EntityAction.Audit.Delete",
    name: "Delete Audit Entity Action",
    weight: 100,
    api: () => import("./delete-audit.action-Bqp7LQGt.js"),
    forEntityTypes: [mi],
    meta: {
      icon: "icon-trash",
      label: "Delete"
    }
  }
], ne = "ContentAudit.Workspace.Audits", at = "ContentAudit.MenuItem.Audits", ba = "ContentAudit.Workspace.AuditsRoot", Os = [
  {
    type: "menuItem",
    kind: "tree",
    alias: at,
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
      menuItemAlias: at
    },
    conditions: [
      {
        alias: g,
        match: ne
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
        match: ne
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
      menuItemAlias: at
    },
    conditions: [
      {
        alias: g,
        match: ba
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
        match: ba
      }
    ]
  }
], Ss = [
  {
    type: "repository",
    alias: "ContentAudit.Repository.Audits",
    name: "Content Audit Audits Repository",
    api: () => import("./audits-tree.repository-BKtyY0Hi.js")
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
    forEntityTypes: [mi, pi]
  }
], Es = [
  {
    type: "workspace",
    kind: "routable",
    alias: ne,
    name: "Audits Workspace",
    api: () => import("./audits-workspace.context-rjPlm-bh.js"),
    meta: {
      entityType: "audits"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Audits.Overview",
    name: "Audits Workspace Overview View",
    js: () => import("./audits-overview-workspace-view.element-BgQE7Dau.js"),
    weight: 100,
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-dashboard"
    },
    conditions: [
      {
        alias: g,
        match: ne
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Audits.Issues",
    name: "Audits Workspace Issues View",
    js: () => import("./audits-issues-workspace-view.element-BBhKKFl7.js"),
    weight: 80,
    meta: {
      label: "Issues",
      pathname: "issues",
      icon: "icon-alert"
    },
    conditions: [
      {
        alias: g,
        match: ne
      }
    ]
  }
], Aa = "ContentAudit.Workspace.AuditsRoot", $s = [
  {
    type: "workspace",
    kind: "default",
    alias: Aa,
    name: "Audits Root Workspace",
    meta: {
      entityType: pi,
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
      collectionAlias: xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Aa
      }
    ]
  }
], Ps = [
  ...Es,
  ...$s
], ks = [
  ...ws,
  ...Is,
  ...Os,
  ...Ss,
  ...Ps
], hi = "all-pages-root", Ls = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.AllPages",
  name: "All Pages Menu Item",
  weight: 1e4,
  meta: {
    label: "All Pages",
    icon: "icon-browser-window",
    entityType: hi,
    menus: [M]
  }
}, Ns = [Ls], ya = "ContentAudit.Workspace.AllPagesRoot", X = "ContentAudit.Workspace.AllPages", Ds = [
  {
    type: "workspace",
    kind: "routable",
    alias: X,
    name: "All Pages Workspace",
    api: () => import("./all-pages-workspace.context-DEWmO3Vr.js"),
    meta: {
      entityType: "all-pages"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Details",
    name: "All Pages Workspace Details View",
    js: () => import("./all-pages-details-workspace-view.element-BEzvFfHa.js"),
    weight: 100,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "info"
    },
    conditions: [
      {
        alias: g,
        match: X
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Links",
    name: "All Pages Workspace Links View",
    js: () => import("./all-pages-links-workspace-view.element-DfuDOVZe.js"),
    weight: 90,
    meta: {
      label: "Links",
      pathname: "links",
      icon: "link"
    },
    conditions: [
      {
        alias: g,
        match: X
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Images",
    name: "All Pages Workspace Images View",
    js: () => import("./all-pages-images-workspace-view.element-BjWTGfYj.js"),
    weight: 80,
    meta: {
      label: "Images",
      pathname: "images",
      icon: "picture"
    },
    conditions: [
      {
        alias: g,
        match: X
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Resources",
    name: "All Pages Workspace Resources View",
    js: () => import("./all-pages-resources-workspace-view.element-CsuIQtJ9.js"),
    weight: 70,
    meta: {
      label: "Resources",
      pathname: "resources",
      icon: "icon-script"
    },
    conditions: [
      {
        alias: g,
        match: X
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.AllPages.Issues",
    name: "All Pages Workspace Issues View",
    js: () => import("./all-pages-issues-workspace-view.element-CXO8FLGx.js"),
    weight: 60,
    meta: {
      label: "Issues",
      pathname: "issues",
      icon: "alert"
    },
    conditions: [
      {
        alias: g,
        match: X
      }
    ]
  }
], Mt = "ContentAudit.Collection.AllPages", Vs = "ContentAudit.CollectionView.AllPages.Table", Ci = "ContentAudit.Repository.AllPagesCollection";
var Rs = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, _i = (t) => {
  throw TypeError(t);
}, ze = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Us(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && Rs(e, a, i), i;
}, jt = (t, e, a) => e.has(t) || _i("Cannot " + a), _t = (t, e, a) => (jt(t, e, "read from private field"), e.get(t)), it = (t, e, a) => e.has(t) ? _i("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Ta = (t, e, a, n) => (jt(t, e, "write to private field"), e.set(t, a), a), ft = (t, e, a) => (jt(t, e, "access private method"), a), me, ke, se, bt, fi;
let P = class extends C {
  constructor() {
    super(), it(this, se), this._tableConfig = {
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
    ], this._tableItems = [], it(this, me), it(this, ke, ""), new H(this, F).addAdditionalPath("all-pages").onSetup(() => ({ data: { entityType: "all-pages", preset: {} } })).observeRouteBuilder((t) => {
      Ta(this, ke, t({})), ft(this, se, bt).call(this);
    }), this.consumeContext($, (t) => {
      Ta(this, me, t), ft(this, se, bt).call(this);
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
me = /* @__PURE__ */ new WeakMap();
ke = /* @__PURE__ */ new WeakMap();
se = /* @__PURE__ */ new WeakSet();
bt = function() {
  _t(this, me) && this.observe(_t(this, me).items, (t) => ft(this, se, fi).call(this, t), "umbCollectionItemsObserver");
};
fi = function(t) {
  this._tableItems = t.map((e) => ({
    id: e?.unique,
    entityType: e?.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href=${_t(this, ke) + "edit/" + e.unique}>${e.pageData?.url}</a>`
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
  A`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
ze([
  m()
], P.prototype, "_tableConfig", 2);
ze([
  m()
], P.prototype, "_tableColumns", 2);
ze([
  m()
], P.prototype, "_tableItems", 2);
P = ze([
  f("content-audit-all-pages-table-collection-view")
], P);
const Ws = P, xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditAllPagesTableCollectionViewElement() {
    return P;
  },
  default: Ws
}, Symbol.toStringTag, { value: "Module" })), Ms = [
  {
    type: "workspace",
    kind: "default",
    alias: ya,
    name: "All Pages Root Workspace",
    meta: {
      entityType: hi,
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
      collectionAlias: Mt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ya
      }
    ]
  }
], js = [...Ds, ...Ms], Bs = [
  {
    type: "repository",
    alias: Ci,
    name: "All Pages Collection Repository",
    api: () => import("./all-pages-collection.repository-CAkrjYwy.js")
  }
], zs = [
  {
    type: "collectionView",
    alias: Vs,
    name: "All Pages Table Collection View",
    js: () => Promise.resolve().then(() => xs),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Mt
      }
    ]
  }
], qs = [
  {
    type: "collection",
    kind: "default",
    alias: Mt,
    name: "All Pages Collection",
    element: () => import("./all-pages.element-DMHaFpCF.js"),
    meta: {
      repositoryAlias: Ci
    }
  },
  ...Bs,
  ...zs
], Ys = "ContentAudit.Repository.AllPages.Detail", Fs = "ContentAudit.Store.AllPages.Detail", Hs = [
  {
    type: "repository",
    alias: Ys,
    name: "All Pages Detail Repository",
    api: () => import("./all-pages-detail.repository-CLP1VWpl.js")
  },
  {
    type: "store",
    alias: Fs,
    name: "All Pages Detail Store",
    api: () => import("./all-pages-detail.store-CNksov1D.js")
  }
], Gs = [...Hs], Ks = [
  ...js,
  ...Ns,
  ...qs,
  ...Gs
], bi = "issues-root", Xs = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Issues",
  name: "Issues Menu Item",
  weight: 2e3,
  meta: {
    label: "Issues",
    icon: "icon-alert",
    entityType: bi,
    menus: [M]
  }
}, Js = [Xs], ga = "ContentAudit.Workspace.IssuesRoot", va = "ContentAudit.Workspace.Issues", Qs = [
  {
    type: "workspace",
    kind: "routable",
    alias: va,
    name: "Issues Workspace",
    api: () => import("./issues-workspace.context-Dv3G-QEZ.js"),
    meta: {
      entityType: "issues"
    }
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Issues.Details",
    name: "Issues Workspace Details View",
    js: () => import("./issues-details-workspace-view.element-CnwbzYpJ.js"),
    weight: 90,
    meta: {
      label: "#general_details",
      pathname: "details",
      icon: "edit"
    },
    conditions: [
      {
        alias: g,
        match: va
      }
    ]
  }
], Zs = [
  {
    type: "workspace",
    kind: "default",
    alias: ga,
    name: "Issues Root Workspace",
    meta: {
      entityType: bi,
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
      collectionAlias: Rt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ga
      }
    ]
  }
], eo = [...Qs, ...Zs], to = [
  {
    type: "repository",
    alias: ri,
    name: "Issue Collection Repository",
    api: () => Promise.resolve().then(() => hs)
  }
], ao = [
  {
    type: "collectionView",
    alias: ms,
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
        match: Rt
      }
    ]
  }
], io = [
  {
    type: "collection",
    kind: "default",
    alias: Rt,
    name: "Issues Collection",
    element: () => import("./issues.element-DJRmm4jS.js"),
    meta: {
      repositoryAlias: ri
    }
  },
  ...to,
  ...ao
], no = "ContentAudit.Repository.Issues.Detail", so = "ContentAudit.Store.Issues.Detail", oo = [
  {
    type: "repository",
    alias: no,
    name: "Issues Detail Repository",
    api: () => import("./issues-detail.repository-D96-CCms.js")
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
  ...io,
  ...ro
], Ai = "status-codes-root", co = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.StatusCodes",
  name: "Status Codes Menu Item",
  weight: 2e3,
  meta: {
    label: "Status Codes",
    icon: "icon-stop-alt",
    entityType: Ai,
    menus: [M]
  }
}, uo = [co], Bt = "ContentAudit.Collection.StatusCodes", mo = "ContentAudit.CollectionView.StatusCodes.Table", yi = "ContentAudit.Repository.StatusCodesCollection";
var po = Object.defineProperty, ho = Object.getOwnPropertyDescriptor, Ti = (t) => {
  throw TypeError(t);
}, qe = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? ho(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && po(e, a, i), i;
}, zt = (t, e, a) => e.has(t) || Ti("Cannot " + a), At = (t, e, a) => (zt(t, e, "read from private field"), e.get(t)), nt = (t, e, a) => e.has(t) ? Ti("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), wa = (t, e, a, n) => (zt(t, e, "write to private field"), e.set(t, a), a), yt = (t, e, a) => (zt(t, e, "access private method"), a), pe, Le, oe, Tt, gi;
let k = class extends C {
  constructor() {
    super(), nt(this, oe), this._tableConfig = {
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
      }
    ], this._tableItems = [], nt(this, pe), nt(this, Le, ""), new H(this, F).addAdditionalPath("all-pages").onSetup(() => ({ data: { entityType: "all-pages", preset: {} } })).observeRouteBuilder((t) => {
      wa(this, Le, t({})), yt(this, oe, Tt).call(this);
    }), this.consumeContext($, (t) => {
      wa(this, pe, t), yt(this, oe, Tt).call(this);
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
pe = /* @__PURE__ */ new WeakMap();
Le = /* @__PURE__ */ new WeakMap();
oe = /* @__PURE__ */ new WeakSet();
Tt = function() {
  At(this, pe) && this.observe(At(this, pe).items, (t) => yt(this, oe, gi).call(this, t), "umbCollectionItemsObserver");
};
gi = function(t) {
  this._tableItems = t.map((e) => ({
    id: e?.unique,
    entityType: e?.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href=${At(this, Le) + "edit/" + e.unique}>${e.pageData?.url}</a>`
      },
      {
        columnAlias: "statusCode",
        value: d`<content-audit-status-code-label .statusCode=${e.pageData?.statusCode}></content-audit-status-code-label>`
      }
    ]
  }));
};
k.styles = [
  A`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
qe([
  m()
], k.prototype, "_tableConfig", 2);
qe([
  m()
], k.prototype, "_tableColumns", 2);
qe([
  m()
], k.prototype, "_tableItems", 2);
k = qe([
  f("content-audit-status-codes-table-collection-view")
], k);
const Co = k, _o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditStatusCodesTableCollectionViewElement() {
    return k;
  },
  default: Co
}, Symbol.toStringTag, { value: "Module" })), Ia = "ContentAudit.Workspace.StatusCodes", fo = [
  {
    type: "workspace",
    kind: "default",
    alias: Ia,
    name: "Status Codes Root Workspace",
    meta: {
      entityType: Ai,
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
      collectionAlias: Bt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ia
      }
    ]
  }
], bo = [
  {
    type: "repository",
    alias: yi,
    name: "Status Codes Collection Repository",
    api: () => import("./status-codes-collection.repository-BLmygw7H.js")
  }
], Ao = [
  {
    type: "collectionView",
    alias: mo,
    name: "Status Codes Table Collection View",
    js: () => Promise.resolve().then(() => _o),
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
], yo = [
  {
    type: "collection",
    kind: "default",
    alias: Bt,
    name: "Status Codes Collection",
    element: () => import("./status-codes.element-ByVlvWD4.js"),
    meta: {
      repositoryAlias: yi
    }
  },
  ...bo,
  ...Ao
], To = [
  ...fo,
  ...uo,
  ...yo
], vi = "orphaned-pages-root", go = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.OrphanedPages",
  name: "Orphaned Pages Menu Item",
  weight: 100,
  meta: {
    label: "Orphaned Pages",
    icon: "icon-tactics",
    entityType: vi,
    menus: [je]
  }
}, vo = [go], qt = "ContentAudit.Collection.OrphanedPages", wo = "ContentAudit.CollectionView.OrphanedPages.Table", wi = "ContentAudit.Repository.OrphanedPagesCollection";
var Io = Object.defineProperty, Oo = Object.getOwnPropertyDescriptor, Ii = (t) => {
  throw TypeError(t);
}, Ye = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Oo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && Io(e, a, i), i;
}, Yt = (t, e, a) => e.has(t) || Ii("Cannot " + a), gt = (t, e, a) => (Yt(t, e, "read from private field"), e.get(t)), st = (t, e, a) => e.has(t) ? Ii("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Oa = (t, e, a, n) => (Yt(t, e, "write to private field"), e.set(t, a), a), vt = (t, e, a) => (Yt(t, e, "access private method"), a), he, Ne, re, wt, Oi;
let L = class extends C {
  constructor() {
    super(), st(this, re), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "URL",
        alias: "url"
      }
    ], this._tableItems = [], st(this, he), st(this, Ne, ""), new H(this, F).addAdditionalPath("all-pages").onSetup(() => ({ data: { entityType: "all-pages", preset: {} } })).observeRouteBuilder((t) => {
      Oa(this, Ne, t({})), vt(this, re, wt).call(this);
    }), this.consumeContext($, (t) => {
      Oa(this, he, t), vt(this, re, wt).call(this);
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
he = /* @__PURE__ */ new WeakMap();
Ne = /* @__PURE__ */ new WeakMap();
re = /* @__PURE__ */ new WeakSet();
wt = function() {
  gt(this, he) && this.observe(gt(this, he).items, (t) => vt(this, re, Oi).call(this, t), "umbCollectionItemsObserver");
};
Oi = function(t) {
  this._tableItems = t.map((e) => ({
    id: e.unique,
    entityType: e.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href=${gt(this, Ne) + "edit/" + e.unique}>${e.url}</a>`
      }
    ]
  }));
};
L.styles = [
  A`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ye([
  m()
], L.prototype, "_tableConfig", 2);
Ye([
  m()
], L.prototype, "_tableColumns", 2);
Ye([
  m()
], L.prototype, "_tableItems", 2);
L = Ye([
  f("content-audit-orphaned-pages-table-collection-view")
], L);
const So = L, Eo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditOrphanedPagesTableCollectionViewElement() {
    return L;
  },
  default: So
}, Symbol.toStringTag, { value: "Module" })), Sa = "ContentAudit.Workspace.OrphanedPages", $o = [
  {
    type: "workspace",
    kind: "default",
    alias: Sa,
    name: "Orphaned Pages Root Workspace",
    meta: {
      entityType: vi,
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
      collectionAlias: qt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Sa
      }
    ]
  }
], Po = [
  {
    type: "repository",
    alias: wi,
    name: "Orphaned Pages Collection Repository",
    api: () => import("./orphaned-pages-collection.repository-DnXYCbLX.js")
  }
], ko = [
  {
    type: "collectionView",
    alias: wo,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Eo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: qt
      }
    ]
  }
], Lo = [
  {
    type: "collection",
    kind: "default",
    alias: qt,
    name: "Orphaned Pages Collection",
    element: () => import("./orphaned-pages.element-Do5cxEeH.js"),
    meta: {
      repositoryAlias: wi
    }
  },
  ...Po,
  ...ko
], No = [
  ...$o,
  ...vo,
  ...Lo
], Si = "images-alt-text-root", Do = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.ImagesAltText",
  name: "Image Alt Text Menu Item",
  weight: 2e3,
  meta: {
    label: "Alt Text",
    icon: "icon-picture",
    entityType: Si,
    menus: [je]
  }
}, Vo = [Do], Ft = "ContentAudit.Collection.ImagesAltText", Ro = "ContentAudit.CollectionView.ImagesAltText.Table", Ei = "ContentAudit.Repository.ImagesAltTextCollection";
var Uo = Object.defineProperty, Wo = Object.getOwnPropertyDescriptor, $i = (t) => {
  throw TypeError(t);
}, Fe = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Wo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && Uo(e, a, i), i;
}, Ht = (t, e, a) => e.has(t) || $i("Cannot " + a), It = (t, e, a) => (Ht(t, e, "read from private field"), e.get(t)), ot = (t, e, a) => e.has(t) ? $i("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Ea = (t, e, a, n) => (Ht(t, e, "write to private field"), e.set(t, a), a), Ot = (t, e, a) => (Ht(t, e, "access private method"), a), Ce, De, le, St, Pi;
let N = class extends C {
  constructor() {
    super(), ot(this, le), this._tableConfig = {
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
    ], this._tableItems = [], ot(this, Ce), ot(this, De, ""), new H(this, F).addAdditionalPath("all-pages").onSetup(() => ({ data: { entityType: "all-pages", preset: {} } })).observeRouteBuilder((t) => {
      Ea(this, De, t({})), Ot(this, le, St).call(this);
    }), this.consumeContext($, (t) => {
      Ea(this, Ce, t), Ot(this, le, St).call(this);
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
Ce = /* @__PURE__ */ new WeakMap();
De = /* @__PURE__ */ new WeakMap();
le = /* @__PURE__ */ new WeakSet();
St = function() {
  It(this, Ce) && this.observe(It(this, Ce).items, (t) => Ot(this, le, Pi).call(this, t), "umbCollectionItemsObserver");
};
Pi = function(t) {
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
        value: d`<a href=${It(this, De) + "edit/" + e.unique}>${e.foundPage}</a>`
      },
      {
        columnAlias: "altText",
        value: e.altText
      }
    ]
  }));
};
N.styles = [
  A`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Fe([
  m()
], N.prototype, "_tableConfig", 2);
Fe([
  m()
], N.prototype, "_tableColumns", 2);
Fe([
  m()
], N.prototype, "_tableItems", 2);
N = Fe([
  f("content-audit-images-alt-text-table-collection-view")
], N);
const xo = N, Mo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditImagesAltTextTableCollectionViewElement() {
    return N;
  },
  default: xo
}, Symbol.toStringTag, { value: "Module" })), $a = "ContentAudit.Workspace.ImagesAltText", jo = [
  {
    type: "workspace",
    kind: "default",
    alias: $a,
    name: "Images Alt Text Root Workspace",
    meta: {
      entityType: Si,
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
      collectionAlias: Ft
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: $a
      }
    ]
  }
], Bo = [
  {
    type: "repository",
    alias: Ei,
    name: "Images Alt Text Collection Repository",
    api: () => import("./images-alt-text-collection.repository-BmXlUyXN.js")
  }
], zo = [
  {
    type: "collectionView",
    alias: Ro,
    name: "Orphaned Pages Table Collection View",
    js: () => Promise.resolve().then(() => Mo),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Ft
      }
    ]
  }
], qo = [
  {
    type: "collection",
    kind: "default",
    alias: Ft,
    name: "Images Alt Text Pages Collection",
    element: () => import("./images-alt-text.element-DzMGILfL.js"),
    meta: {
      repositoryAlias: Ei
    }
  },
  ...Bo,
  ...zo
], Yo = [
  ...jo,
  ...Vo,
  ...qo
], ki = "outbound-links-root", Fo = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.OutboundLinks",
  name: "Outbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Outbound Links",
    icon: "icon-window-popout",
    entityType: ki,
    menus: [M]
  }
}, Ho = [Fo], Gt = "ContentAudit.Collection.OutboundLinks", Go = "ContentAudit.CollectionView.OutboundLinks.Table", Li = "ContentAudit.Repository.OutboundLinksCollection";
var Ko = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, Ni = (t) => {
  throw TypeError(t);
}, He = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Xo(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && Ko(e, a, i), i;
}, Kt = (t, e, a) => e.has(t) || Ni("Cannot " + a), Pa = (t, e, a) => (Kt(t, e, "read from private field"), e.get(t)), ka = (t, e, a) => e.has(t) ? Ni("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Jo = (t, e, a, n) => (Kt(t, e, "write to private field"), e.set(t, a), a), Di = (t, e, a) => (Kt(t, e, "access private method"), a), _e, Ve, Vi, Ri;
let D = class extends C {
  constructor() {
    super(), ka(this, Ve), this._tableConfig = {
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
        name: "Outlinks",
        alias: "outlinks"
      }
    ], this._tableItems = [], ka(this, _e), this.consumeContext($, (t) => {
      Jo(this, _e, t), Di(this, Ve, Vi).call(this);
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
_e = /* @__PURE__ */ new WeakMap();
Ve = /* @__PURE__ */ new WeakSet();
Vi = function() {
  Pa(this, _e) && this.observe(Pa(this, _e).items, (t) => Di(this, Ve, Ri).call(this, t), "umbCollectionItemsObserver");
};
Ri = function(t) {
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
        columnAlias: "outlinks",
        value: e.linkCount
      }
    ]
  }));
};
D.styles = [
  A`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
He([
  m()
], D.prototype, "_tableConfig", 2);
He([
  m()
], D.prototype, "_tableColumns", 2);
He([
  m()
], D.prototype, "_tableItems", 2);
D = He([
  f("content-audit-outbound-links-table-collection-view")
], D);
const Qo = D, Zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditddOutboundLinksTableCollectionViewElement() {
    return D;
  },
  default: Qo
}, Symbol.toStringTag, { value: "Module" })), La = "ContentAudit.Workspace.OutboundLinks", er = [
  {
    type: "workspace",
    kind: "default",
    alias: La,
    name: "Outbound Links Root Workspace",
    meta: {
      entityType: ki,
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
      collectionAlias: Gt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: La
      }
    ]
  }
], tr = [
  {
    type: "repository",
    alias: Li,
    name: "Outbound Links Collection Repository",
    api: () => import("./outbound-links-collection.repository-CtgZc989.js")
  }
], ar = [
  {
    type: "collectionView",
    alias: Go,
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
        match: Gt
      }
    ]
  }
], ir = [
  {
    type: "collection",
    kind: "default",
    alias: Gt,
    name: "Outbound Links Pages Collection",
    element: () => import("./outbound-links.element-Chz_6Fpj.js"),
    meta: {
      repositoryAlias: Li
    }
  },
  ...tr,
  ...ar
], nr = [
  ...er,
  ...Ho,
  ...ir
], Ui = "inbound-links-root", sr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.InboundLinks",
  name: "Inbound Links Menu Item",
  weight: 2e3,
  meta: {
    label: "Inbound Links",
    icon: "icon-window-popin",
    entityType: Ui,
    menus: [M]
  }
}, or = [sr], Xt = "ContentAudit.Collection.InboundLinks", rr = "ContentAudit.CollectionView.InboundLinks.Table", Wi = "ContentAudit.Repository.InboundLinksCollection";
var lr = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, xi = (t) => {
  throw TypeError(t);
}, Ge = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? cr(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && lr(e, a, i), i;
}, Jt = (t, e, a) => e.has(t) || xi("Cannot " + a), Na = (t, e, a) => (Jt(t, e, "read from private field"), e.get(t)), Da = (t, e, a) => e.has(t) ? xi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), ur = (t, e, a, n) => (Jt(t, e, "write to private field"), e.set(t, a), a), Mi = (t, e, a) => (Jt(t, e, "access private method"), a), fe, Re, ji, Bi;
let V = class extends C {
  constructor() {
    super(), Da(this, Re), this._tableConfig = {
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
        name: "Inlinks",
        alias: "inlinks"
      }
    ], this._tableItems = [], Da(this, fe), this.consumeContext($, (t) => {
      ur(this, fe, t), Mi(this, Re, ji).call(this);
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
fe = /* @__PURE__ */ new WeakMap();
Re = /* @__PURE__ */ new WeakSet();
ji = function() {
  Na(this, fe) && this.observe(Na(this, fe).items, (t) => Mi(this, Re, Bi).call(this, t), "umbCollectionItemsObserver");
};
Bi = function(t) {
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
        columnAlias: "inlinks",
        value: e.linkCount
      }
    ]
  }));
};
V.styles = [
  A`
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
  f("content-audit-inbound-links-table-collection-view")
], V);
const dr = V, mr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditInboundLinksTableCollectionViewElement() {
    return V;
  },
  default: dr
}, Symbol.toStringTag, { value: "Module" })), Va = "ContentAudit.Workspace.InboundLinks", pr = [
  {
    type: "workspace",
    kind: "default",
    alias: Va,
    name: "Inbound Links Root Workspace",
    meta: {
      entityType: Ui,
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
      collectionAlias: Xt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Va
      }
    ]
  }
], hr = [
  {
    type: "repository",
    alias: Wi,
    name: "Inbound Links Collection Repository",
    api: () => import("./inbound-links-collection.repository-DAJxCN9G.js")
  }
], Cr = [
  {
    type: "collectionView",
    alias: rr,
    name: "Inbound Links Table Collection View",
    js: () => Promise.resolve().then(() => mr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Xt
      }
    ]
  }
], _r = [
  {
    type: "collection",
    kind: "default",
    alias: Xt,
    name: "Inbound Links Pages Collection",
    element: () => import("./inbound-links.element-K3WRdCsX.js"),
    meta: {
      repositoryAlias: Wi
    }
  },
  ...hr,
  ...Cr
], fr = [
  ...pr,
  ...or,
  ..._r
], zi = "metadata-root", br = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Metadata",
  name: "Metadata Menu Item",
  weight: 2e3,
  meta: {
    label: "Metadata",
    icon: "icon-tags",
    entityType: zi,
    menus: ["ContentAudit.Menu.Metadata"]
  }
}, Ar = [br], Qt = "ContentAudit.Collection.Metadata", yr = "ContentAudit.CollectionView.Metadata.Table", Ra = "ContentAudit.Workspace.Metadata", Tr = [
  {
    type: "workspace",
    kind: "default",
    alias: Ra,
    name: "Metadata Root Workspace",
    meta: {
      entityType: zi,
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
      collectionAlias: Qt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ra
      }
    ]
  }
], qi = "ContentAudit.Repository.MetadataCollection", gr = [
  {
    type: "repository",
    alias: qi,
    name: "Metadata Collection Repository",
    api: () => import("./metadata-collection.repository-hGjS_7kK.js")
  }
], vr = [
  {
    type: "collectionView",
    alias: yr,
    name: "Metadata Table Collection View",
    js: () => import("./metadata-table-collection-view.element-DScTjJeJ.js"),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Qt
      }
    ]
  }
], wr = [
  {
    type: "collection",
    kind: "default",
    alias: Qt,
    name: "Metadata Collection",
    element: () => import("./metadata.element-ZbBPm7dZ.js"),
    meta: {
      repositoryAlias: qi
    }
  },
  ...gr,
  ...vr
], Ir = [
  ...Tr,
  ...Ar,
  ...wr
], Or = [], Zt = "ContentAudit.Collection.DuplicateContent", Sr = "ContentAudit.CollectionView.DuplicateContent.Table", Yi = "ContentAudit.Repository.DuplicateContentCollection";
var Er = Object.defineProperty, $r = Object.getOwnPropertyDescriptor, Ke = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? $r(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && Er(e, a, i), i;
};
let R = class extends C {
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
R.styles = [
  A`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Ke([
  m()
], R.prototype, "_tableConfig", 2);
Ke([
  m()
], R.prototype, "_tableColumns", 2);
Ke([
  m()
], R.prototype, "_tableItems", 2);
R = Ke([
  f("content-audit-duplicate-content-table-collection-view")
], R);
const Pr = R, kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditDuplicateContentTableCollectionViewElement() {
    return R;
  },
  default: Pr
}, Symbol.toStringTag, { value: "Module" })), Lr = "duplicate-content-root", Ua = "ContentAudit.Workspace.DuplicateContent", Nr = [
  {
    type: "workspace",
    kind: "default",
    alias: Ua,
    name: "Duplicate Content Root Workspace",
    meta: {
      entityType: Lr,
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
      collectionAlias: Zt
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Ua
      }
    ]
  }
], Dr = [
  {
    type: "repository",
    alias: Yi,
    name: "Duplicate Content Collection Repository",
    api: () => import("./duplicate-content-collection.repository-BhqIAMoC.js")
  }
], Vr = [
  {
    type: "collectionView",
    alias: Sr,
    name: "Duplicate Content Table Collection View",
    js: () => Promise.resolve().then(() => kr),
    meta: {
      label: "Table",
      icon: "icon-list",
      pathName: "table"
    },
    conditions: [
      {
        alias: v,
        match: Zt
      }
    ]
  }
], Rr = [
  {
    type: "collection",
    kind: "default",
    alias: Zt,
    name: "Duplicate Content Collection",
    element: () => import("./duplicate-content.element-C4rGWCXk.js"),
    meta: {
      repositoryAlias: Yi
    }
  },
  ...Dr,
  ...Vr
], Ur = [
  ...Nr,
  ...Or,
  ...Rr
], Fi = "carbon-rating-root", Wr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.CarbonRating",
  name: "Carbon Rating Menu Item",
  weight: 900,
  meta: {
    label: "Carbon Rating",
    icon: "icon-eco",
    entityType: Fi,
    menus: [Be]
  }
}, xr = [Wr], ea = "ContentAudit.Collection.CarbonRating", Mr = "ContentAudit.CollectionView.CarbonRating.Table", Hi = "ContentAudit.Repository.CarbonRatingCollection";
var jr = Object.defineProperty, Br = Object.getOwnPropertyDescriptor, Gi = (t) => {
  throw TypeError(t);
}, Xe = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? Br(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && jr(e, a, i), i;
}, ta = (t, e, a) => e.has(t) || Gi("Cannot " + a), Et = (t, e, a) => (ta(t, e, "read from private field"), e.get(t)), rt = (t, e, a) => e.has(t) ? Gi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Wa = (t, e, a, n) => (ta(t, e, "write to private field"), e.set(t, a), a), $t = (t, e, a) => (ta(t, e, "access private method"), a), be, Ue, ce, Pt, Ki;
let U = class extends C {
  constructor() {
    super(), rt(this, ce), this._tableConfig = {
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
    ], this._tableItems = [], rt(this, be), rt(this, Ue, ""), new H(this, F).addAdditionalPath("all-pages").onSetup(() => ({ data: { entityType: "all-pages", preset: {} } })).observeRouteBuilder((t) => {
      Wa(this, Ue, t({})), $t(this, ce, Pt).call(this);
    }), this.consumeContext($, (t) => {
      Wa(this, be, t), $t(this, ce, Pt).call(this);
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
be = /* @__PURE__ */ new WeakMap();
Ue = /* @__PURE__ */ new WeakMap();
ce = /* @__PURE__ */ new WeakSet();
Pt = function() {
  Et(this, be) && this.observe(Et(this, be).items, (t) => $t(this, ce, Ki).call(this, t), "umbCollectionItemsObserver");
};
Ki = function(t) {
  this._tableItems = t.map((e) => ({
    id: e?.unique,
    entityType: e?.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href=${Et(this, Ue) + "edit/" + e.unique}>${e.pageData?.url}</a>`
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
U.styles = [
  A`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Xe([
  m()
], U.prototype, "_tableConfig", 2);
Xe([
  m()
], U.prototype, "_tableColumns", 2);
Xe([
  m()
], U.prototype, "_tableItems", 2);
U = Xe([
  f("content-audit-carbon-rating-table-collection-view")
], U);
const zr = U, qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCarbonRatingTableCollectionViewElement() {
    return U;
  },
  default: zr
}, Symbol.toStringTag, { value: "Module" })), xa = "ContentAudit.Workspace.CarbonRating", Yr = [
  {
    type: "workspace",
    kind: "default",
    alias: xa,
    name: "Carbon Rating Root Workspace",
    meta: {
      entityType: Fi,
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
      collectionAlias: ea
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: xa
      }
    ]
  }
], Fr = [
  {
    type: "repository",
    alias: Hi,
    name: "Carbon Rating Collection Repository",
    api: () => import("./carbon-rating-collection.repository-DihVfsF1.js")
  }
], Hr = [
  {
    type: "collectionView",
    alias: Mr,
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
        match: ea
      }
    ]
  }
], Gr = [
  {
    type: "collection",
    kind: "default",
    alias: ea,
    name: "Carbon Rating Collection",
    element: () => import("./carbon-rating.element-Br8vAvSE.js"),
    meta: {
      repositoryAlias: Hi
    }
  },
  ...Fr,
  ...Hr
], Kr = [
  ...Yr,
  ...xr,
  ...Gr
], Xi = "core-web-vitals-root", Xr = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.CoreWebVitals",
  name: "Core Web Vitals Menu Item",
  weight: 1e3,
  meta: {
    label: "Core Web Vitals",
    icon: "icon-speed-gauge",
    entityType: Xi,
    menus: [Be]
  }
}, Jr = [Xr], aa = "ContentAudit.Collection.CoreWebVitals", Qr = "ContentAudit.CollectionView.CoreWebVitals.Table", Ji = "ContentAudit.Repository.CoreWebVitalsCollection";
var Zr = Object.defineProperty, el = Object.getOwnPropertyDescriptor, Qi = (t) => {
  throw TypeError(t);
}, Je = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? el(e, a) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (n ? o(e, a, i) : o(i)) || i);
  return n && i && Zr(e, a, i), i;
}, ia = (t, e, a) => e.has(t) || Qi("Cannot " + a), kt = (t, e, a) => (ia(t, e, "read from private field"), e.get(t)), lt = (t, e, a) => e.has(t) ? Qi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Ma = (t, e, a, n) => (ia(t, e, "write to private field"), e.set(t, a), a), Lt = (t, e, a) => (ia(t, e, "access private method"), a), Ae, We, ue, Nt, Zi;
let W = class extends C {
  constructor() {
    super(), lt(this, ue), this._tableConfig = {
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
    ], this._tableItems = [], lt(this, Ae), lt(this, We, ""), new H(this, F).addAdditionalPath("all-pages").onSetup(() => ({ data: { entityType: "all-pages", preset: {} } })).observeRouteBuilder((t) => {
      Ma(this, We, t({})), Lt(this, ue, Nt).call(this);
    }), this.consumeContext($, (t) => {
      Ma(this, Ae, t), Lt(this, ue, Nt).call(this);
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
Ae = /* @__PURE__ */ new WeakMap();
We = /* @__PURE__ */ new WeakMap();
ue = /* @__PURE__ */ new WeakSet();
Nt = function() {
  kt(this, Ae) && this.observe(kt(this, Ae).items, (t) => Lt(this, ue, Zi).call(this, t), "umbCollectionItemsObserver");
};
Zi = function(t) {
  this._tableItems = t.filter((e) => e.pageData.statusCode === 200).map((e) => ({
    id: e?.unique,
    entityType: e?.entityType,
    icon: "icon-alert",
    data: [
      {
        columnAlias: "url",
        value: d`<a href=${kt(this, We) + "edit/" + e.unique}>${e.pageData?.url}</a>`
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
  A`
			:host {
				display: flex;
				flex-direction: column;
			}
		`
];
Je([
  m()
], W.prototype, "_tableConfig", 2);
Je([
  m()
], W.prototype, "_tableColumns", 2);
Je([
  m()
], W.prototype, "_tableItems", 2);
W = Je([
  f("content-audit-core-web-vitals-table-collection-view")
], W);
const tl = W, al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ContentAuditCoreWebVitalsTableCollectionViewElement() {
    return W;
  },
  default: tl
}, Symbol.toStringTag, { value: "Module" })), ja = "ContentAudit.Workspace.CoreWebVitals", il = [
  {
    type: "workspace",
    kind: "default",
    alias: ja,
    name: "Core Web Vitals Root Workspace",
    meta: {
      entityType: Xi,
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
      collectionAlias: aa
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: ja
      }
    ]
  }
], nl = [
  {
    type: "repository",
    alias: Ji,
    name: "Core Web Vitals Collection Repository",
    api: () => import("./core-web-vitals-collection.repository-3VsDSzQm.js")
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
        match: aa
      }
    ]
  }
], ol = [
  {
    type: "collection",
    kind: "default",
    alias: aa,
    name: "Core Web Vitals Collection",
    element: () => import("./core-web-vitals.element-CpQ6vtvE.js"),
    meta: {
      repositoryAlias: Ji
    }
  },
  ...nl,
  ...sl
], rl = [
  ...il,
  ...Jr,
  ...ol
], en = "export-root", ll = {
  type: "menuItem",
  alias: "ContentAudit.MenuItem.Export",
  name: "Export Menu Item",
  weight: 2e3,
  meta: {
    label: "Export",
    icon: "icon-download",
    entityType: en,
    menus: [Vt]
  }
}, cl = [ll], ul = "ContentAudit.Workspace.Export", dl = [
  {
    type: "workspace",
    kind: "default",
    alias: ul,
    name: "Export Root Workspace",
    element: () => import("./export.element-CBG0nR6J.js"),
    meta: {
      entityType: en,
      headline: "Export"
    }
  }
], ml = [
  ...dl,
  ...cl
], J = "ContentAudit.Section", pl = {
  type: "section",
  alias: J,
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
      match: J
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
    alias: je,
    name: "Content Menu"
  },
  {
    type: "menu",
    alias: Be,
    name: "Performance Menu"
  },
  {
    type: "menu",
    alias: Vt,
    name: "Tools Menu"
  }
], _l = [
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
        match: J
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
      menu: je
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: J
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
      menu: Be
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: J
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
      menu: Vt
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: J
      }
    ]
  }
], fl = [
  pl,
  hl,
  ...Cl,
  ..._l,
  ...ks,
  ...Ks,
  ...lo,
  ...To,
  ...No,
  ...Yo,
  ...nr,
  ...fr,
  ...Ir,
  ...Ur,
  ...Kr,
  ...rl,
  ...ml
], bl = {
  type: "workspace",
  alias: Se,
  name: "Content Audit Workspace",
  element: () => Promise.resolve().then(() => ds),
  meta: {
    entityType: ii
  }
}, Al = [
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Scan",
    name: "Content Audit Scan Workspace View",
    element: () => import("./overview.element-913ikPo0.js"),
    meta: {
      label: "Overview",
      pathname: "overview",
      icon: "icon-scan"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Se
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "ContentAudit.WorkspaceView.Settings",
    name: "Content Audit Settings Workspace View",
    element: () => import("./settings.element-DoW0YTkZ.js"),
    meta: {
      label: "Settings",
      pathname: "settings",
      icon: "icon-settings-alt"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: Se
      }
    ]
  }
], yl = [
  bl,
  ...Al
], Tl = [
  {
    type: "modal",
    alias: "ContentAudit.Modal.RunWarning",
    name: "Run Warning Modal",
    element: () => import("./run-warning-modal.element-guhEJZrV.js")
  },
  {
    type: "modal",
    alias: "ContentAudit.Modal.DiscardAndRun",
    name: "Discard and Run Modal",
    element: () => import("./discard-and-run-modal.element-DI4TqKY6.js")
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
  js: () => import("./contentaudit-workspace-view-Di8_hzfb.js"),
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
  alias: Yn,
  name: "Content Audit Workspace Context",
  js: () => Promise.resolve().then(() => Kn)
}, zl = async (t, e) => {
  e.registerMany([
    Il,
    ...fl,
    ...yl,
    ...Tl,
    ...gl,
    ...wl
  ]), t.consumeContext(Ba, async (a) => {
    if (!a) return;
    const n = a.getOpenApiConfiguration();
    u.setConfig({
      baseUrl: n?.base ?? "",
      auth: n?.token ?? void 0,
      credentials: n?.credentials ?? "same-origin"
    }), u.interceptors.request.use(async (i, s) => {
      const o = await n.token();
      return i.headers.set("Authorization", `Bearer ${o}`), i;
    });
  });
};
export {
  ge as A,
  ct as B,
  ni as C,
  Ee as D,
  jl as E,
  Cn as F,
  hn as G,
  zl as H,
  ti as I,
  mi as a,
  pi as b,
  ne as c,
  X as d,
  va as e,
  oi as f,
  Yn as g,
  ii as h,
  Rt as i,
  ri as j,
  ms as k,
  M as l,
  je as m,
  Be as n,
  Vt as o,
  Se as p,
  ut as q,
  mt as r,
  we as s,
  Xn as t,
  pt as u,
  ps as v,
  _a as w,
  I as x,
  Oe as y,
  Ie as z
};
//# sourceMappingURL=index-BUsZH3tI.js.map
