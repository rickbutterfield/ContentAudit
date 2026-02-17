import { UmbElementMixin as U } from "@umbraco-cms/backoffice/element-api";
import { LitElement as L, repeat as N, html as o, nothing as A, css as M, state as f, customElement as I } from "@umbraco-cms/backoffice/external/lit";
import { C as z, a as W } from "./index-Bkks3_By.js";
import { UmbModalToken as B, UMB_MODAL_MANAGER_CONTEXT as G } from "@umbraco-cms/backoffice/modal";
import "./run-warning-modal.element-BAFIqPbK.js";
import { UMB_NOTIFICATION_CONTEXT as H } from "@umbraco-cms/backoffice/notification";
import { UmbRequestReloadChildrenOfEntityEvent as P } from "@umbraco-cms/backoffice/entity-action";
import { UMB_ACTION_EVENT_CONTEXT as V } from "@umbraco-cms/backoffice/action";
const X = new B("Umb.ContentAudit.Modal.RunWarning", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var q = Object.defineProperty, F = Object.getOwnPropertyDescriptor, O = (t) => {
  throw TypeError(t);
}, b = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? F(e, i) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (s = (r ? l(e, i, s) : l(s)) || s);
  return r && s && q(e, i, s), s;
}, $ = (t, e, i) => e.has(t) || O("Cannot " + i), h = (t, e, i) => ($(t, e, "read from private field"), e.get(t)), _ = (t, e, i) => e.has(t) ? O("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), x = (t, e, i, r) => ($(t, e, "write to private field"), e.set(t, i), i), d = (t, e, i) => ($(t, e, "access private method"), i), p, g, w, c, y, S, C, T, D, E;
let u = class extends U(L) {
  constructor() {
    super(), _(this, c), this.crawlData = [], _(this, p), _(this, g), _(this, w), this.scanRunning = !1, this._auditOverviews = [], this._topIssues = [], this.consumeContext(H, (t) => {
      x(this, w, t);
    }), this.consumeContext(z, (t) => {
      x(this, p, t), this.observe(t?.latestAuditOverview, (e) => {
        this._latestAuditOverview = e;
      }), this.observe(t?.auditOverviews, (e) => {
        this._auditOverviews = e || [];
      }), this.observe(t?.topIssues, (e) => {
        e && (this._topIssues = e.filter((i) => i.numberOfUrls != 0));
      }), this.observe(t?.healthScore, (e) => {
        this._healthScore = e, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), d(this, c, y).call(this);
    }), this.consumeContext(G, (t) => {
      x(this, g, t);
    });
  }
  async _openModal() {
    (await h(this, g)?.open(this, X, {
      data: {
        headline: "Ready to run an audit?"
      }
    })?.onSubmit())?.run && this.startAudit();
  }
  async startAudit() {
    const { stream: t } = await W.startCrawl();
    this.scanRunning = !0, this.crawlData = [], h(this, w)?.peek("positive", {
      data: {
        headline: "Crawl started",
        message: "You will be notified when it is complete."
      }
    });
    try {
      for await (const e of t)
        this.crawlData.push(e), this.requestUpdate();
      h(this, w)?.peek("default", {
        data: { headline: "Crawl completed", message: "You can now view the results." }
      });
    } catch (e) {
      h(this, w)?.peek("danger", {
        data: { headline: "Crawl failed", message: e.message ?? "Unknown error" }
      });
    } finally {
      this.scanRunning = !1, d(this, c, y).call(this);
      const e = await this.getContext(V);
      if (!e)
        throw new Error("Could not get the action event context");
      const i = new P({
        entityType: "audits-root",
        unique: null
      });
      e.dispatchEvent(i);
    }
  }
  _renderScanData() {
    if (this.crawlData.length !== 0) {
      const t = this.crawlData.length, e = this.crawlData.filter((a) => a.crawled && !a.external && !a.asset).length, i = this.crawlData.filter((a) => a.crawled && a.external && !a.asset).length, r = this.crawlData.filter((a) => a.crawled && a.asset).length, s = this.crawlData.filter((a) => a.blocked).length;
      return o`
                <uui-box headline="Debug scan data" class="span-3">
                    <p>Total: ${t}</p>
                    <p>Internal: ${e}</p>
                    <p>External: ${i}</p>
                    <p>Assets: ${r}</p>
                    <p>Blocked: ${s}</p>

                    ${N(
        this.crawlData,
        (a) => a.url,
        (a) => o`${JSON.stringify(a)}<br/>`
      )}
                </uui-box>
            `;
    }
  }
  render() {
    return o`
            <div id="main">
                ${d(this, c, C).call(this)}
                ${d(this, c, T).call(this)}
                ${d(this, c, D).call(this)}
                ${d(this, c, E).call(this)}
            </div>
        `;
  }
};
p = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
y = function() {
  h(this, p)?.getLatestAuditOverview(), h(this, p)?.getAuditOverviews(), h(this, p)?.getTopIssues(), h(this, p)?.getHealthScore();
};
S = function() {
  if (this.scanRunning) {
    const t = this.crawlData.length, e = this.crawlData.filter((a) => a.crawled && !a.external && !a.asset).length, i = this.crawlData.filter((a) => a.crawled && a.external && !a.asset).length, r = this.crawlData.filter((a) => a.crawled && a.asset).length, s = this.crawlData.filter((a) => a.blocked).length;
    return o`
                <uui-loader-bar></uui-loader-bar>

                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>

                    <uui-table-row>
                        <uui-table-cell>URLs crawled:</uui-table-cell>
                        <uui-table-cell>${t}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Internal URLs:</uui-table-cell>
                        <uui-table-cell>${e}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>External URLs:</uui-table-cell>
                        <uui-table-cell>${i}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Asset URLs:</uui-table-cell>
                        <uui-table-cell>${r}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Blocked URLs:</uui-table-cell>
                        <uui-table-cell>${s}</uui-table-cell>
                    </uui-table-row>
                </uui-table>
            `;
  } else
    return this._latestAuditOverview?.runDate == null ? o`<p>No scan has been run yet</p>` : o`
                    <uui-table>
                        <uui-table-column></uui-table-column>
                        <uui-table-column></uui-table-column>

                        <uui-table-row>
                            <uui-table-cell>Total URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.total}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Internal URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalInternal}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>External URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalExternal}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Asset URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalAssets}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Blocked URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalBlocked}</uui-table-cell>
                        </uui-table-row>
                    </uui-table>
                `;
};
C = function() {
  if (this._latestAuditOverview !== void 0)
    return o`
                <uui-box headline="Latest audit" class="span-2" style="${this._latestAuditOverview?.runDate != null || this.scanRunning ? "--uui-box-default-padding: 0;" : ""}">
                    <div slot="header">
                        ${this._latestAuditOverview?.runDate != null ? this.localize.date(this._latestAuditOverview?.runDate, { dateStyle: "long", timeStyle: "short" }) : A}
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
T = function() {
  if (this._healthScore !== void 0) {
    let t = "score--danger";
    return this._healthScore.healthScore >= 90 ? t = "score--success" : this._healthScore.healthScore >= 50 && (t = "score--warning"), o`
                <uui-box headline="Site health">
                    <div class="score">
                        <svg viewBox="0 0 36 36" class="score__inner ${t}">
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
D = function() {
  if (this._auditOverviews.length <= 1) return A;
  const t = this._auditOverviews.slice(0, 10).reverse(), e = 150, i = 100, r = t.map((l, n) => {
    const v = n / (t.length - 1) * i, m = e - (l.healthScore || 0) / 100 * e;
    return `${v},${m}`;
  }).join(" "), s = t[t.length - 1]?.healthScore || 0, a = s >= 90 ? "var(--uui-color-positive)" : s >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
  return o`
            <uui-box headline="Health Score Trend" class="span-3">
                <div class="chart-container">
                    <svg class="chart" viewBox="0 0 100 ${e}" preserveAspectRatio="none">
                        <!-- Grid lines with labels -->
                        ${[100, 90, 75, 50, 25, 0].map((l) => {
    const n = e - l / 100 * e;
    return o`
                                <line
                                    x1="0"
                                    y1="${n}"
                                    x2="100"
                                    y2="${n}"
                                    class="chart-grid-line ${l === 90 || l === 50 ? "chart-grid-line--threshold" : ""}"
                                />
                                <text x="1" y="${n - 0.5}" class="chart-grid-label">${l}</text>
                            `;
  })}

                        <!-- Gradient fill under the line -->
                        <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:${a};stop-opacity:0.2" />
                                <stop offset="100%" style="stop-color:${a};stop-opacity:0" />
                            </linearGradient>
                        </defs>

                        <!-- Area fill -->
                        <path
                            d="M ${r.split(" ")[0]} L ${r} L ${i},${e} L 0,${e} Z"
                            fill="url(#chartGradient)"
                        />

                        <!-- Line chart -->
                        <polyline
                            points="${r}"
                            class="chart-line"
                            fill="none"
                            stroke="${a}"
                            stroke-width="0.5"
                        />

                        <!-- Data points -->
                        ${t.map((l, n) => {
    const v = n / (t.length - 1) * i, m = e - (l.healthScore || 0) / 100 * e, k = l.healthScore || 0, R = k >= 90 ? "var(--uui-color-positive)" : k >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
    return o`
                                <circle
                                    cx="${v}"
                                    cy="${m}"
                                    r="1"
                                    class="chart-point"
                                    fill="${R}"
                                />
                            `;
  })}
                    </svg>

                    <!-- Labels -->
                    <div class="chart-labels">
                        ${t.map((l) => {
    const n = l.healthScore || 0, v = n >= 90 ? "chart-label-score--success" : n >= 50 ? "chart-label-score--warning" : "chart-label-score--danger";
    return o`
                                <div class="chart-label">
                                    <div class="chart-label-date">
                                        ${l.runDate ? this.localize.date(l.runDate, { dateStyle: "short" }) : "N/A"}
                                    </div>
                                    <div class="chart-label-score ${v}">${n.toFixed(0)}</div>
                                </div>
                            `;
  })}
                    </div>
                </div>
            </uui-box>
        `;
};
E = function() {
  if (this._topIssues.length !== 0)
    return o`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues} hide-summary></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
u.styles = [
  M`
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

            .chart-grid-line--threshold {
                stroke: var(--uui-color-border-emphasis);
                stroke-width: 0.15;
                stroke-dasharray: 2, 2;
            }

            .chart-grid-label {
                font-size: 3px;
                fill: var(--uui-color-text-alt);
                dominant-baseline: text-after-edge;
            }

            .chart-line {
                stroke-width: 0.5;
            }

            .chart-point {
                cursor: pointer;
                transition: r 0.2s ease;
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

            .chart-label-score {
                font-weight: 700;
                font-size: 0.875rem;
            }

            .chart-label-score--success {
                color: var(--uui-color-positive);
            }

            .chart-label-score--warning {
                color: var(--uui-color-warning);
            }

            .chart-label-score--danger {
                color: var(--uui-color-danger);
            }
        `
];
b([
  f()
], u.prototype, "scanRunning", 2);
b([
  f()
], u.prototype, "_latestAuditOverview", 2);
b([
  f()
], u.prototype, "_auditOverviews", 2);
b([
  f()
], u.prototype, "_topIssues", 2);
b([
  f()
], u.prototype, "_healthScore", 2);
b([
  f()
], u.prototype, "_pagesWithoutErrors", 2);
u = b([
  I("content-audit-scan-view")
], u);
const ae = u;
export {
  u as ContentAuditScanViewElement,
  ae as default
};
//# sourceMappingURL=overview.element-B3l8fmYp.js.map
