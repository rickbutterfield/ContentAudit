import { UmbElementMixin as p } from "@umbraco-cms/backoffice/element-api";
import { LitElement as _, html as l, css as w, state as c, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { CONTENT_AUDIT_CONTEXT_TOKEN as f } from "./assets.js";
var m = Object.defineProperty, O = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, d = (t, e, a, i) => {
  for (var s = i > 1 ? void 0 : i ? O(e, a) : e, o = t.length - 1, u; o >= 0; o--)
    (u = t[o]) && (s = (i ? u(e, a, s) : u(s)) || s);
  return i && s && m(e, a, s), s;
}, h = (t, e, a) => e.has(t) || v("Cannot " + a), A = (t, e, a) => (h(t, e, "read from private field"), a ? a.call(t) : e.get(t)), E = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), S = (t, e, a, i) => (h(t, e, "write to private field"), e.set(t, a), a), n;
let r = class extends p(_) {
  constructor() {
    super(), this.auditData = [], E(this, n), this.scanRunning = !1, this.consumeContext(f, (t) => {
      S(this, n, t), this.observe(t.latestAuditOverview, (e) => {
        this._latestAuditOverview = e;
      }), A(this, n).getLatestAuditOverview();
    });
  }
  startAudit() {
    const t = new EventSource("/umbraco/content-audit/api/v1/start-crawl");
    this.scanRunning = !0, t.onmessage = (e) => {
      const a = JSON.parse(e.data);
      this.auditData.push(a), this.requestUpdate();
    }, t.onerror = (e) => {
      t.readyState === EventSource.CLOSED ? console.log("EventSource connection closed by the server.") : console.error("EventSource encountered an error:", e), this.scanRunning = !1, t.close();
    };
  }
  render() {
    var t, e, a, i, s;
    return l`
            <div id="main">
                <uui-box headline="Latest audit">
                    <div slot="header">${this.localize.date((t = this._latestAuditOverview) == null ? void 0 : t.runDate, { dateStyle: "long", timeStyle: "short" })}</div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this.startAudit}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${((e = this._latestAuditOverview) == null ? void 0 : e.runDate) == null ? l`
                        <p>No scan has been run yet</p>` : l`
                <p><strong>URLs found: </strong> ${(a = this._latestAuditOverview) == null ? void 0 : a.totalPages}</p>
                <p><strong>Pages crawled: </strong> ${(i = this._latestAuditOverview) == null ? void 0 : i.totalPagesCrawled}</p>
                <p><strong>Blocked URLs: </strong> ${(s = this._latestAuditOverview) == null ? void 0 : s.totalPagesBlocked}</p>
            `}
                </uui-box>

                <uui-box headline="Site health">
                    <em>Chart showing overall health of site. Based on ahrefs health score? (internal URLs crawled without errors)</em>
                </uui-box>
            </div>
        `;
  }
};
n = /* @__PURE__ */ new WeakMap();
r.styles = [
  w`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }

            #main {
                display: grid;
                gap: var(--uui-size-space-5); 
                grid-template-columns: repeat(2, 1fr);
            }
        `
];
d([
  c()
], r.prototype, "scanRunning", 2);
d([
  c()
], r.prototype, "_latestAuditOverview", 2);
r = d([
  g("content-audit-scan-view")
], r);
const x = r;
export {
  r as ContentAuditScanViewElement,
  x as default
};
//# sourceMappingURL=overview.element-Dkpz4JhL.js.map
