import { UmbElementMixin as D } from "@umbraco-cms/backoffice/element-api";
import { LitElement as L, html as l, css as x, state as v, customElement as U, nothing as C } from "@umbraco-cms/backoffice/external/lit";
import { C as I } from "./index-DaGunpdO.js";
var k = Object.defineProperty, T = Object.getOwnPropertyDescriptor, S = (t) => {
  throw TypeError(t);
}, d = (t, e, s, n) => {
  for (var i = n > 1 ? void 0 : n ? T(e, s) : e, u = t.length - 1, p; u >= 0; u--)
    (p = t[u]) && (i = (n ? p(e, s, i) : p(i)) || i);
  return n && i && k(e, s, i), i;
}, w = (t, e, s) => e.has(t) || S("Cannot " + s), g = (t, e, s) => (w(t, e, "read from private field"), e.get(t)), f = (t, e, s) => e.has(t) ? S("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), N = (t, e, s, n) => (w(t, e, "write to private field"), e.set(t, s), s), c = (t, e, s) => (w(t, e, "access private method"), s), h, o, _, b, m, A, E;
let a = class extends D(L) {
  constructor() {
    super(), f(this, o), this.crawlData = [], f(this, h), this.scanRunning = !1, this._topIssues = [], this.consumeContext(I, (t) => {
      N(this, h, t), this.observe(t.latestAuditOverview, (e) => {
        this._latestAuditOverview = e;
      }), this.observe(t.topIssues, (e) => {
        this._topIssues = e;
      }), this.observe(t.healthScore, (e) => {
        this._healthScore = e, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), c(this, o, _).call(this);
    });
  }
  startAudit() {
    const t = new EventSource("/umbraco/content-audit/api/v1/start-crawl");
    this.scanRunning = !0, this.crawlData = [], t.onmessage = (e) => {
      const s = JSON.parse(e.data);
      this.crawlData.push(s), this.requestUpdate();
    }, t.onerror = (e) => {
      t.readyState === EventSource.CLOSED ? console.log("EventSource connection closed by the server.") : console.error("EventSource encountered an error:", e), this.scanRunning = !1, c(this, o, _).call(this), t.close();
    };
  }
  render() {
    return l`
            <div id="main">
                ${c(this, o, m).call(this)}
                ${c(this, o, A).call(this)}
                ${c(this, o, E).call(this)}
            </div>
        `;
  }
};
h = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
_ = function() {
  var t, e, s;
  (t = g(this, h)) == null || t.getLatestAuditOverview(), (e = g(this, h)) == null || e.getTopIssues(), (s = g(this, h)) == null || s.getHealthScore();
};
b = function() {
  var t, e, s, n, i, u;
  if (this.scanRunning) {
    const p = this.crawlData.length, O = this.crawlData.filter((r) => r.crawled && !r.external && !r.asset).length, $ = this.crawlData.filter((r) => r.crawled && r.external && !r.asset).length, y = this.crawlData.filter((r) => r.crawled && r.asset).length, R = this.crawlData.filter((r) => r.blocked).length;
    return l`
                <uui-loader-bar></uui-loader-bar>
                <p><strong>URLs found: </strong> ${p}</p>
                <p><strong>Internal URLs: </strong> ${O}</p>
                <p><strong>External URLs: </strong> ${$}</p>
                <p><strong>Asset URLs: </strong> ${y}</p>
                <p><strong>Blocked URLs: </strong> ${R}</p>
            `;
  } else
    return ((t = this._latestAuditOverview) == null ? void 0 : t.runDate) == null ? l`<p>No scan has been run yet</p>` : l`
                    <p><strong>URLs found: </strong> ${(e = this._latestAuditOverview) == null ? void 0 : e.total}</p>
                    <p><strong>Internal URLs: </strong> ${(s = this._latestAuditOverview) == null ? void 0 : s.totalInternal}</p>
                    <p><strong>External URLs: </strong> ${(n = this._latestAuditOverview) == null ? void 0 : n.totalExternal}</p>
                    <p><strong>Asset URLs: </strong> ${(i = this._latestAuditOverview) == null ? void 0 : i.totalAssets}</p>
                    <p><strong>Blocked URLs: </strong> ${(u = this._latestAuditOverview) == null ? void 0 : u.totalBlocked}</p>
                `;
};
m = function() {
  var t, e;
  if (this._latestAuditOverview !== void 0)
    return l`
                <uui-box headline="Latest audit">
                    <div slot="header">
                        ${((t = this._latestAuditOverview) == null ? void 0 : t.runDate) != null ? this.localize.date((e = this._latestAuditOverview) == null ? void 0 : e.runDate, { dateStyle: "long", timeStyle: "short" }) : C}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this.startAudit}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${c(this, o, b).call(this)}
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
E = function() {
  if (this._topIssues.length !== 0)
    return l`
                <uui-box headline="Top issues" class="grow" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues}></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
a.styles = [
  x`
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
d([
  v()
], a.prototype, "scanRunning", 2);
d([
  v()
], a.prototype, "_latestAuditOverview", 2);
d([
  v()
], a.prototype, "_topIssues", 2);
d([
  v()
], a.prototype, "_healthScore", 2);
d([
  v()
], a.prototype, "_pagesWithoutErrors", 2);
a = d([
  U("content-audit-scan-view")
], a);
const z = a;
export {
  a as ContentAuditScanViewElement,
  z as default
};
//# sourceMappingURL=overview.element-CrY09SJi.js.map
