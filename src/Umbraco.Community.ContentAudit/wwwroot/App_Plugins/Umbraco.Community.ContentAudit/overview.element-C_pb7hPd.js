import { UmbElementMixin as b } from "@umbraco-cms/backoffice/element-api";
import { LitElement as A, html as u, css as O, state as h, customElement as y, nothing as E } from "@umbraco-cms/backoffice/external/lit";
import { C } from "./index-CcxDD8J7.js";
var $ = Object.defineProperty, x = Object.getOwnPropertyDescriptor, w = (t) => {
  throw TypeError(t);
}, l = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? x(e, s) : e, o = t.length - 1, d; o >= 0; o--)
    (d = t[o]) && (i = (r ? d(e, s, i) : d(i)) || i);
  return r && i && $(e, s, i), i;
}, _ = (t, e, s) => e.has(t) || w("Cannot " + s), v = (t, e, s) => (_(t, e, "read from private field"), e.get(t)), g = (t, e, s) => e.has(t) ? w("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), T = (t, e, s, r) => (_(t, e, "write to private field"), e.set(t, s), s), p = (t, e, s) => (_(t, e, "access private method"), s), n, c, f, m, S;
let a = class extends b(A) {
  constructor() {
    super(), g(this, c), this.auditData = [], g(this, n), this.scanRunning = !1, this._topIssues = [], this.consumeContext(C, (t) => {
      var e, s, r;
      T(this, n, t), this.observe(t.latestAuditOverview, (i) => {
        this._latestAuditOverview = i;
      }), this.observe(t.topIssues, (i) => {
        this._topIssues = i;
      }), this.observe(t.healthScore, (i) => {
        this._healthScore = i, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), (e = v(this, n)) == null || e.getLatestAuditOverview(), (s = v(this, n)) == null || s.getTopIssues(), (r = v(this, n)) == null || r.getHealthScore();
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
    return u`
            <div id="main">
                ${p(this, c, f).call(this)}
                ${p(this, c, m).call(this)}
                ${p(this, c, S).call(this)}
            </div>
        `;
  }
};
n = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
f = function() {
  var t, e, s, r, i, o;
  if (this._latestAuditOverview !== void 0)
    return u`
                <uui-box headline="Latest audit">
                    <div slot="header">
                        ${((t = this._latestAuditOverview) == null ? void 0 : t.runDate) != null ? this.localize.date((e = this._latestAuditOverview) == null ? void 0 : e.runDate, { dateStyle: "long", timeStyle: "short" }) : E}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this.startAudit}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${((s = this._latestAuditOverview) == null ? void 0 : s.runDate) == null ? u`
                        <p>No scan has been run yet</p>` : u`
                        <p><strong>URLs found: </strong> ${(r = this._latestAuditOverview) == null ? void 0 : r.totalPages}</p>
                        <p><strong>Pages crawled: </strong> ${(i = this._latestAuditOverview) == null ? void 0 : i.totalPagesCrawled}</p>
                        <p><strong>Blocked URLs: </strong> ${(o = this._latestAuditOverview) == null ? void 0 : o.totalPagesBlocked}</p>
                    `}
                </uui-box>
            `;
};
m = function() {
  var t;
  if (this._healthScore !== void 0)
    return u`
                <uui-box headline="Site health">
                    <p class="uui-h2">${(t = this._healthScore) == null ? void 0 : t.healthScore} / 100</p>
                </uui-box>
            `;
};
S = function() {
  if (this._topIssues.length !== 0)
    return u`
                <uui-box headline="Top issues" class="grow" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view data="ABC" .data=${this._topIssues}></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
a.styles = [
  O`
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
  y("content-audit-scan-view")
], a);
const k = a;
export {
  a as ContentAuditScanViewElement,
  k as default
};
//# sourceMappingURL=overview.element-C_pb7hPd.js.map
