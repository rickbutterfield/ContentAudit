import { UmbElementMixin as m } from "@umbraco-cms/backoffice/element-api";
import { LitElement as w, html as c, nothing as v, css as b, state as h, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { CONTENT_AUDIT_CONTEXT_TOKEN as f } from "./assets.js";
var E = Object.defineProperty, y = Object.getOwnPropertyDescriptor, g = (t) => {
  throw TypeError(t);
}, l = (t, e, s, i) => {
  for (var r = i > 1 ? void 0 : i ? y(e, s) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (r = (i ? n(e, s, r) : n(r)) || r);
  return i && r && E(e, s, r), r;
}, _ = (t, e, s) => e.has(t) || g("Cannot " + s), d = (t, e, s) => (_(t, e, "read from private field"), e.get(t)), O = (t, e, s) => e.has(t) ? g("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), A = (t, e, s, i) => (_(t, e, "write to private field"), e.set(t, s), s), u;
let a = class extends m(w) {
  constructor() {
    super(), this.auditData = [], O(this, u), this.scanRunning = !1, this._topIssues = [], this.consumeContext(f, (t) => {
      var e, s, i;
      A(this, u, t), this.observe(t.latestAuditOverview, (r) => {
        this._latestAuditOverview = r;
      }), this.observe(t.allIssues, (r) => {
        this._topIssues = r, this._topIssues.length > 5 && (this._topIssues = this._topIssues.slice(0, 5));
      }), this.observe(t.healthScore, (r) => {
        this._healthScore = r, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), (e = d(this, u)) == null || e.getLatestAuditOverview(), (s = d(this, u)) == null || s.getAllIssues(), (i = d(this, u)) == null || i.getHealthScore();
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
    var t, e, s, i, r, o, n, p;
    return c`
            <div id="main">
                <uui-box headline="Latest audit">
                    <div slot="header">${((t = this._latestAuditOverview) == null ? void 0 : t.runDate) != null ? this.localize.date((e = this._latestAuditOverview) == null ? void 0 : e.runDate, { dateStyle: "long", timeStyle: "short" }) : v}</div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this.startAudit}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${((s = this._latestAuditOverview) == null ? void 0 : s.runDate) == null ? c`
                        <p>No scan has been run yet</p>` : c`
                        <p><strong>URLs found: </strong> ${(i = this._latestAuditOverview) == null ? void 0 : i.totalPages}</p>
                        <p><strong>Pages crawled: </strong> ${(r = this._latestAuditOverview) == null ? void 0 : r.totalPagesCrawled}</p>
                        <p><strong>Blocked URLs: </strong> ${(o = this._latestAuditOverview) == null ? void 0 : o.totalPagesBlocked}</p>
                    `}
                </uui-box>

                <uui-box headline="Site health">
                    ${this._healthScore !== void 0 ? c`
                            <umb-donut-chart id="chart" description="Colors of fruits">
		                        <umb-donut-slice color="green" name="Pages without errors" amount=${this._pagesWithoutErrors}></umb-donut-slice>
		                        <umb-donut-slice color="red" name="Pages with errors" amount=${(n = this._healthScore) == null ? void 0 : n.pagesWithErrors}></umb-donut-slice>
	                        </umb-donut-chart>
                        ` : v}
                    <p>${(p = this._healthScore) == null ? void 0 : p.healthScore} / 100</p>
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
u = /* @__PURE__ */ new WeakMap();
a.styles = [
  b`
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

            #chart {
				width: 150px;
				aspect-ratio: 1;
				background: radial-gradient(white 40%, transparent 41%),
					conic-gradient(
						var(--umb-log-viewer-debug-color) 0% 20%,
						var(--umb-log-viewer-information-color) 20% 40%,
						var(--umb-log-viewer-warning-color) 40% 60%,
						var(--umb-log-viewer-error-color) 60% 80%,
						var(--umb-log-viewer-fatal-color) 80% 100%
					);
				margin: 10px;
				display: inline-block;
				border-radius: 50%;
			}
        `
];
l([
  h()
], a.prototype, "scanRunning", 2);
l([
  h()
], a.prototype, "_latestAuditOverview", 2);
l([
  h()
], a.prototype, "_topIssues", 2);
l([
  h()
], a.prototype, "_healthScore", 2);
l([
  h()
], a.prototype, "_pagesWithoutErrors", 2);
a = l([
  S("content-audit-scan-view")
], a);
const P = a;
export {
  a as ContentAuditScanViewElement,
  P as default
};
//# sourceMappingURL=overview.element-C29Gnx7t.js.map
