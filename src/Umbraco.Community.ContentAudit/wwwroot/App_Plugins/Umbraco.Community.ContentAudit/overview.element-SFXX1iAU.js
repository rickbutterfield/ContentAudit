import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { LitElement as g, html as d, nothing as w, css as f, state as c, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { CONTENT_AUDIT_CONTEXT_TOKEN as O } from "./assets.js";
var A = Object.defineProperty, y = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, u = (t, e, s, i) => {
  for (var a = i > 1 ? void 0 : i ? y(e, s) : e, o = t.length - 1, l; o >= 0; o--)
    (l = t[o]) && (a = (i ? l(e, s, a) : l(a)) || a);
  return i && a && A(e, s, a), a;
}, p = (t, e, s) => e.has(t) || v("Cannot " + s), h = (t, e, s) => (p(t, e, "read from private field"), e.get(t)), S = (t, e, s) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), E = (t, e, s, i) => (p(t, e, "write to private field"), e.set(t, s), s), n;
let r = class extends _(g) {
  constructor() {
    super(), this.auditData = [], S(this, n), this.scanRunning = !1, this._topIssues = [], this.consumeContext(O, (t) => {
      var e, s;
      E(this, n, t), this.observe(t.latestAuditOverview, (i) => {
        this._latestAuditOverview = i;
      }), this.observe(t.allIssues, (i) => {
        this._topIssues = i, this._topIssues.length > 5 && (this._topIssues = this._topIssues.slice(0, 5));
      }), (e = h(this, n)) == null || e.getLatestAuditOverview(), (s = h(this, n)) == null || s.getAllIssues();
    });
  }
  startAudit() {
    const t = new EventSource("/umbraco/content-audit/api/v1/start-crawl");
    this.scanRunning = !0, t.onmessage = (e) => {
      const s = JSON.parse(e.data);
      this.auditData.push(s), this.requestUpdate();
    }, t.onerror = (e) => {
      t.readyState === EventSource.CLOSED ? console.log("EventSource connection closed by the server.") : console.error("EventSource encountered an error:", e), this.scanRunning = !1, t.close();
    };
  }
  render() {
    var t, e, s, i, a, o;
    return d`
            <div id="main">
                <uui-box headline="Latest audit">
                    <div slot="header">${((t = this._latestAuditOverview) == null ? void 0 : t.runDate) != null ? this.localize.date((e = this._latestAuditOverview) == null ? void 0 : e.runDate, { dateStyle: "long", timeStyle: "short" }) : w}</div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this.startAudit}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${((s = this._latestAuditOverview) == null ? void 0 : s.runDate) == null ? d`
                        <p>No scan has been run yet</p>` : d`
                        <p><strong>URLs found: </strong> ${(i = this._latestAuditOverview) == null ? void 0 : i.totalPages}</p>
                        <p><strong>Pages crawled: </strong> ${(a = this._latestAuditOverview) == null ? void 0 : a.totalPagesCrawled}</p>
                        <p><strong>Blocked URLs: </strong> ${(o = this._latestAuditOverview) == null ? void 0 : o.totalPagesBlocked}</p>
                    `}
                </uui-box>

                <uui-box headline="Site health">
                    <em>Chart showing overall health of site. Based on ahrefs health score? (internal URLs crawled without errors)</em>
                </uui-box>

                <uui-box headline="Top issues" class="grow" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <audit-issue-table .data=${this._topIssues} />
                </uui-box>
            </div>
        `;
  }
};
n = /* @__PURE__ */ new WeakMap();
r.styles = [
  f`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }

            #main {
                display: grid;
                gap: var(--uui-size-space-5); 
                grid-template-columns: repeat(2, 1fr);
            }

            .grow {
                grid-column: span 2;
            }
        `
];
u([
  c()
], r.prototype, "scanRunning", 2);
u([
  c()
], r.prototype, "_latestAuditOverview", 2);
u([
  c()
], r.prototype, "_topIssues", 2);
r = u([
  m("content-audit-scan-view")
], r);
const I = r;
export {
  r as ContentAuditScanViewElement,
  I as default
};
//# sourceMappingURL=overview.element-SFXX1iAU.js.map
