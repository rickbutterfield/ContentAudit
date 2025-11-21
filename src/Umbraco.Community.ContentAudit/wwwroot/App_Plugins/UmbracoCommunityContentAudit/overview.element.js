import { UmbElementMixin as U } from "@umbraco-cms/backoffice/element-api";
import { LitElement as L, repeat as M, html as r, nothing as k, css as N, state as w, customElement as I } from "@umbraco-cms/backoffice/external/lit";
import { C as z, a as W } from "./index.js";
import { UmbModalToken as B, UMB_MODAL_MANAGER_CONTEXT as H } from "@umbraco-cms/backoffice/modal";
import "./run-warning-modal.element.js";
import { UMB_NOTIFICATION_CONTEXT as P } from "@umbraco-cms/backoffice/notification";
const G = new B("Umb.ContentAudit.Modal.RunWarning", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var V = Object.defineProperty, X = Object.getOwnPropertyDescriptor, O = (e) => {
  throw TypeError(e);
}, b = (e, t, a, l) => {
  for (var s = l > 1 ? void 0 : l ? X(t, a) : t, i = e.length - 1, n; i >= 0; i--)
    (n = e[i]) && (s = (l ? n(t, a, s) : n(s)) || s);
  return l && s && V(t, a, s), s;
}, A = (e, t, a) => t.has(e) || O("Cannot " + a), h = (e, t, a) => (A(e, t, "read from private field"), t.get(e)), f = (e, t, a) => t.has(e) ? O("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), y = (e, t, a, l) => (A(e, t, "write to private field"), t.set(e, a), a), d = (e, t, a) => (A(e, t, "access private method"), a), p, m, v, c, $, S, x, D, C, R;
let o = class extends U(L) {
  constructor() {
    super(), f(this, c), this.crawlData = [], f(this, p), f(this, m), f(this, v), this.scanRunning = !1, this._auditOverviews = [], this._topIssues = [], this.consumeContext(P, (e) => {
      y(this, v, e);
    }), this.consumeContext(z, (e) => {
      y(this, p, e), this.observe(e == null ? void 0 : e.latestAuditOverview, (t) => {
        this._latestAuditOverview = t;
      }), this.observe(e == null ? void 0 : e.auditOverviews, (t) => {
        this._auditOverviews = t || [];
      }), this.observe(e == null ? void 0 : e.topIssues, (t) => {
        t && (this._topIssues = t.filter((a) => a.numberOfUrls != 0));
      }), this.observe(e == null ? void 0 : e.healthScore, (t) => {
        this._healthScore = t, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), d(this, c, $).call(this);
    }), this.consumeContext(H, (e) => {
      y(this, m, e);
    });
  }
  async _openModal() {
    var a;
    const e = (a = h(this, m)) == null ? void 0 : a.open(this, G, {
      data: {
        headline: "Ready to run an audit?"
      }
    }), t = await (e == null ? void 0 : e.onSubmit());
    t != null && t.run && this.startAudit();
  }
  async startAudit() {
    var t, a, l;
    const { stream: e } = await W.startCrawl();
    this.scanRunning = !0, this.crawlData = [], (t = h(this, v)) == null || t.peek("positive", {
      data: {
        headline: "Crawl started",
        message: "You will be notified when it is complete."
      }
    });
    try {
      for await (const s of e)
        this.crawlData.push(s), this.requestUpdate();
      debugger;
      (a = h(this, v)) == null || a.peek("default", {
        data: { headline: "Crawl completed", message: "You can now view the results." }
      });
    } catch (s) {
      debugger;
      (l = h(this, v)) == null || l.peek("danger", {
        data: { headline: "Crawl failed", message: s.message ?? "Unknown error" }
      });
    } finally {
      debugger;
      this.scanRunning = !1, d(this, c, $).call(this);
    }
  }
  _renderScanData() {
    if (this.crawlData.length !== 0) {
      const e = this.crawlData.length, t = this.crawlData.filter((i) => i.crawled && !i.external && !i.asset).length, a = this.crawlData.filter((i) => i.crawled && i.external && !i.asset).length, l = this.crawlData.filter((i) => i.crawled && i.asset).length, s = this.crawlData.filter((i) => i.blocked).length;
      return r`
                <uui-box headline="Debug scan data" class="span-3">
                    <p>Total: ${e}</p>
                    <p>Internal: ${t}</p>
                    <p>External: ${a}</p>
                    <p>Assets: ${l}</p>
                    <p>Blocked: ${s}</p>

                    ${M(
        this.crawlData,
        (i) => i.url,
        (i) => r`${JSON.stringify(i)}<br/>`
      )}
                </uui-box>
            `;
    }
  }
  render() {
    return r`
            <div id="main">
                ${d(this, c, x).call(this)}
                ${d(this, c, D).call(this)}
                ${d(this, c, C).call(this)}
                ${d(this, c, R).call(this)}
            </div>
        `;
  }
};
p = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
$ = function() {
  var e, t, a, l;
  (e = h(this, p)) == null || e.getLatestAuditOverview(), (t = h(this, p)) == null || t.getAuditOverviews(), (a = h(this, p)) == null || a.getTopIssues(), (l = h(this, p)) == null || l.getHealthScore();
};
S = function() {
  var e, t, a, l, s, i;
  if (this.scanRunning) {
    const n = this.crawlData.length, _ = this.crawlData.filter((u) => u.crawled && !u.external && !u.asset).length, g = this.crawlData.filter((u) => u.crawled && u.external && !u.asset).length, T = this.crawlData.filter((u) => u.crawled && u.asset).length, E = this.crawlData.filter((u) => u.blocked).length;
    return r`
                <uui-loader-bar></uui-loader-bar>

                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>

                    <uui-table-row>
                        <uui-table-cell>URLs crawled:</uui-table-cell>
                        <uui-table-cell>${n}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Internal URLs:</uui-table-cell>
                        <uui-table-cell>${_}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>External URLs:</uui-table-cell>
                        <uui-table-cell>${g}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Asset URLs:</uui-table-cell>
                        <uui-table-cell>${T}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Blocked URLs:</uui-table-cell>
                        <uui-table-cell>${E}</uui-table-cell>
                    </uui-table-row>
                </uui-table>
            `;
  } else
    return ((e = this._latestAuditOverview) == null ? void 0 : e.runDate) == null ? r`<p>No scan has been run yet</p>` : r`
                    <uui-table>
                        <uui-table-column></uui-table-column>
                        <uui-table-column></uui-table-column>

                        <uui-table-row>
                            <uui-table-cell>Total URLs:</uui-table-cell>
                            <uui-table-cell>${(t = this._latestAuditOverview) == null ? void 0 : t.total}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Internal URLs:</uui-table-cell>
                            <uui-table-cell>${(a = this._latestAuditOverview) == null ? void 0 : a.totalInternal}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>External URLs:</uui-table-cell>
                            <uui-table-cell>${(l = this._latestAuditOverview) == null ? void 0 : l.totalExternal}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Asset URLs:</uui-table-cell>
                            <uui-table-cell>${(s = this._latestAuditOverview) == null ? void 0 : s.totalAssets}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Blocked URLs:</uui-table-cell>
                            <uui-table-cell>${(i = this._latestAuditOverview) == null ? void 0 : i.totalBlocked}</uui-table-cell>
                        </uui-table-row>
                    </uui-table>
                `;
};
x = function() {
  var e, t, a;
  if (this._latestAuditOverview !== void 0)
    return r`
                <uui-box headline="Latest audit" class="span-2" style="${((e = this._latestAuditOverview) == null ? void 0 : e.runDate) != null || this.scanRunning ? "--uui-box-default-padding: 0;" : ""}">
                    <div slot="header">
                        ${((t = this._latestAuditOverview) == null ? void 0 : t.runDate) != null ? this.localize.date((a = this._latestAuditOverview) == null ? void 0 : a.runDate, { dateStyle: "long", timeStyle: "short" }) : k}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this._openModal}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${d(this, c, S).call(this)}
                </uui-box>
            `;
};
D = function() {
  if (this._healthScore !== void 0) {
    let e = "score--danger";
    return this._healthScore.healthScore >= 90 ? e = "score--success" : this._healthScore.healthScore >= 50 && (e = "score--warning"), r`
                <uui-box headline="Site health">
                    <div class="score">
                        <svg viewBox="0 0 36 36" class="score__inner ${e}">
                            <path class="score__bg"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path class="score__fill"
                                stroke-dasharray="${this._healthScore.healthScore}, 100"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <p class="score__text">${this._healthScore.healthScore.toFixed(0)} / 100</p>
                    </div>
                </uui-box>
            `;
  }
};
C = function() {
  if (this._auditOverviews.length === 0) return k;
  const e = this._auditOverviews.slice(0, 5).reverse(), t = Math.max(...e.map((i) => i.total || 0)), a = 150, l = 100, s = e.map((i, n) => {
    const _ = n / (e.length - 1) * l, g = a - (i.total || 0) / t * a;
    return `${_},${g}`;
  }).join(" ");
  return r`
            <uui-box headline="Audit History" class="span-3">
                <div class="chart-container">
                    <svg class="chart" viewBox="0 0 100 ${a}" preserveAspectRatio="none">
                        <!-- Grid lines -->
                        ${[0, 25, 50, 75, 100].map((i) => r`
                            <line 
                                x1="0" 
                                y1="${i / 100 * a}" 
                                x2="100" 
                                y2="${i / 100 * a}" 
                                class="chart-grid-line"
                            />
                        `)}
                        
                        <!-- Line chart -->
                        <polyline
                            points="${s}"
                            class="chart-line"
                            fill="none"
                            stroke="var(--uui-color-interactive)"
                            stroke-width="0.5"
                        />
                        
                        <!-- Data points -->
                        ${e.map((i, n) => {
    const _ = n / (e.length - 1) * l, g = a - (i.total || 0) / t * a;
    return r`
                                <circle
                                    cx="${_}"
                                    cy="${g}"
                                    r="1"
                                    class="chart-point"
                                    fill="var(--uui-color-interactive)"
                                />
                            `;
  })}
                    </svg>
                    
                    <!-- Labels -->
                    <div class="chart-labels">
                        ${e.map((i) => r`
                            <div class="chart-label">
                                <div class="chart-label-date">
                                    ${i.runDate ? this.localize.date(i.runDate, { dateStyle: "short" }) : "N/A"}
                                </div>
                                <div class="chart-label-value">${i.total || 0} pages</div>
                            </div>
                        `)}
                    </div>
                </div>
            </uui-box>
        `;
};
R = function() {
  if (this._topIssues.length !== 0)
    return r`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues} hide-summary></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
o.styles = [
  N`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }

            #main {
                display: grid;
                gap: var(--uui-size-space-5); 
                grid-template-columns: 1fr 1fr 350px;
            }

            .span-2 {
                grid-column: span 2;
            }

            .span-3 {
                grid-column: span 3;
            }

            .score {
                text-align: center;
                position: relative;
            }

            .score__inner {
                width: 200px;
                height: 200px;
            }

            .score__bg {
                fill: none;
                stroke: #eee;
                stroke-width: 1.75;
            }

            .score__fill {
                fill: none;
                stroke: none;
                stroke-width: 1.75;
                stroke-linecap: round;
                animation: progress 1000ms ease-out forwards;
                stroke: #000;
            }

            .score--danger .score__fill {
                stroke: var(--uui-color-danger, #d42054);
            }

            .score--warning .score__fill {
                stroke: var(--uui-color-warning, #fbd142);
            }

            .score--success .score__fill {
                stroke: var(--uui-color-positive);
            }

            .score__text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                z-index: 1;
                font-size: 24px;
                font-weight: 700;
            }

            @keyframes progress {
                0% {
                    stroke-dasharray: 0 100;
                }
            }

            /* Chart styles */
            .chart-container {
                display: flex;
                flex-direction: column;
                gap: var(--uui-size-space-4);
            }

            .chart {
                width: 100%;
                height: 150px;
                border: 1px solid var(--uui-color-border);
                border-radius: var(--uui-border-radius);
                padding: var(--uui-size-space-3);
                background: var(--uui-color-surface);
            }

            .chart-grid-line {
                stroke: var(--uui-color-border);
                stroke-width: 0.1;
                stroke-dasharray: 1, 1;
            }

            .chart-line {
                stroke-width: 0.5;
            }

            .chart-point {
                cursor: pointer;
            }

            .chart-point:hover {
                r: 1.5;
            }

            .chart-labels {
                display: flex;
                justify-content: space-between;
                gap: var(--uui-size-space-2);
            }

            .chart-label {
                flex: 1;
                text-align: center;
                font-size: 0.75rem;
            }

            .chart-label-date {
                font-weight: 600;
                color: var(--uui-color-text);
                margin-bottom: var(--uui-size-space-1);
            }

            .chart-label-value {
                color: var(--uui-color-text-alt);
            }
        `
];
b([
  w()
], o.prototype, "scanRunning", 2);
b([
  w()
], o.prototype, "_latestAuditOverview", 2);
b([
  w()
], o.prototype, "_auditOverviews", 2);
b([
  w()
], o.prototype, "_topIssues", 2);
b([
  w()
], o.prototype, "_healthScore", 2);
b([
  w()
], o.prototype, "_pagesWithoutErrors", 2);
o = b([
  I("content-audit-scan-view")
], o);
const Q = o;
export {
  o as ContentAuditScanViewElement,
  Q as default
};
//# sourceMappingURL=overview.element.js.map
