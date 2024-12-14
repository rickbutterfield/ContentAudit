import { UmbElementMixin as $ } from "@umbraco-cms/backoffice/element-api";
import { LitElement as C, html as l, css as D, state as v, customElement as k, nothing as x } from "@umbraco-cms/backoffice/external/lit";
import { C as R } from "./index-xpyZp-Sa.js";
var T = Object.defineProperty, I = Object.getOwnPropertyDescriptor, S = (t) => {
  throw TypeError(t);
}, h = (t, e, s, a) => {
  for (var r = a > 1 ? void 0 : a ? I(e, s) : e, d = t.length - 1, p; d >= 0; d--)
    (p = t[d]) && (r = (a ? p(e, s, r) : p(r)) || r);
  return a && r && T(e, s, r), r;
}, _ = (t, e, s) => e.has(t) || S("Cannot " + s), g = (t, e, s) => (_(t, e, "read from private field"), e.get(t)), f = (t, e, s) => e.has(t) ? S("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), L = (t, e, s, a) => (_(t, e, "write to private field"), e.set(t, s), s), u = (t, e, s) => (_(t, e, "access private method"), s), c, o, w, b, m, A, O;
let i = class extends $(C) {
  constructor() {
    super(), f(this, o), this.crawlData = [], f(this, c), this.scanRunning = !1, this._topIssues = [], this.consumeContext(R, (t) => {
      L(this, c, t), this.observe(t.latestAuditOverview, (e) => {
        this._latestAuditOverview = e;
      }), this.observe(t.topIssues, (e) => {
        this._topIssues = e;
      }), this.observe(t.healthScore, (e) => {
        this._healthScore = e, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), u(this, o, w).call(this);
    });
  }
  startAudit() {
    const t = new EventSource("/umbraco/content-audit/api/v1/start-crawl");
    this.scanRunning = !0, this.crawlData = [], t.onmessage = (e) => {
      const s = JSON.parse(e.data);
      this.crawlData.push(s), this.requestUpdate();
    }, t.onerror = (e) => {
      t.readyState === EventSource.CLOSED ? console.log("EventSource connection closed by the server.") : console.error("EventSource encountered an error:", e), this.scanRunning = !1, u(this, o, w).call(this), t.close();
    };
  }
  render() {
    return l`
            <div id="main">
                ${u(this, o, m).call(this)}
                ${u(this, o, A).call(this)}
                ${u(this, o, O).call(this)}
            </div>
        `;
  }
};
c = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
w = function() {
  var t, e, s;
  (t = g(this, c)) == null || t.getLatestAuditOverview(), (e = g(this, c)) == null || e.getTopIssues(), (s = g(this, c)) == null || s.getHealthScore();
};
b = function() {
  var t, e, s, a, r;
  if (this.scanRunning) {
    const d = this.crawlData.length, p = this.crawlData.filter((n) => n.crawled && !n.asset).length, y = this.crawlData.filter((n) => n.crawled && n.asset).length, E = this.crawlData.filter((n) => n.blocked).length;
    return l`
                <uui-loader-bar></uui-loader-bar>
                <p><strong>URLs found: </strong> ${d}</p>
                <p><strong>Pages crawled: </strong> ${p}</p>
                <p><strong>Assets crawled: </strong> ${y}</p>
                <p><strong>Blocked URLs: </strong> ${E}</p>
            `;
  } else
    return ((t = this._latestAuditOverview) == null ? void 0 : t.runDate) == null ? l`<p>No scan has been run yet</p>` : l`
                    <p><strong>URLs found: </strong> ${(e = this._latestAuditOverview) == null ? void 0 : e.totalUrls}</p>
                    <p><strong>Pages crawled: </strong> ${(s = this._latestAuditOverview) == null ? void 0 : s.totalPagesCrawled}</p>
                    <p><strong>Assets crawled: </strong> ${(a = this._latestAuditOverview) == null ? void 0 : a.totalAssetsCrawled}</p>
                    <p><strong>Blocked URLs: </strong> ${(r = this._latestAuditOverview) == null ? void 0 : r.totalPagesBlocked}</p>
                `;
};
m = function() {
  var t, e;
  if (this._latestAuditOverview !== void 0)
    return l`
                <uui-box headline="Latest audit">
                    <div slot="header">
                        ${((t = this._latestAuditOverview) == null ? void 0 : t.runDate) != null ? this.localize.date((e = this._latestAuditOverview) == null ? void 0 : e.runDate, { dateStyle: "long", timeStyle: "short" }) : x}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this.startAudit}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${u(this, o, b).call(this)}
                </uui-box>
            `;
};
A = function() {
  var t;
  if (this._healthScore !== void 0)
    return l`
                <uui-box headline="Site health">
                    <p class="uui-h2">${(t = this._healthScore) == null ? void 0 : t.healthScore.toFixed(0)} / 100</p>
                </uui-box>
            `;
};
O = function() {
  if (this._topIssues.length !== 0)
    return l`
                <uui-box headline="Top issues" class="grow" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view data="ABC" .data=${this._topIssues}></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
i.styles = [
  D`
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
h([
  v()
], i.prototype, "scanRunning", 2);
h([
  v()
], i.prototype, "_latestAuditOverview", 2);
h([
  v()
], i.prototype, "_topIssues", 2);
h([
  v()
], i.prototype, "_healthScore", 2);
h([
  v()
], i.prototype, "_pagesWithoutErrors", 2);
i = h([
  k("content-audit-scan-view")
], i);
const W = i;
export {
  i as ContentAuditScanViewElement,
  W as default
};
//# sourceMappingURL=overview.element-BWLKjr4_.js.map
