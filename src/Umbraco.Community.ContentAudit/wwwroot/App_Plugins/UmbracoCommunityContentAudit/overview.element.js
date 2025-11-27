import { UmbElementMixin as L } from "@umbraco-cms/backoffice/element-api";
import { LitElement as N, repeat as M, html as u, nothing as x, css as I, state as g, customElement as z } from "@umbraco-cms/backoffice/external/lit";
import { C as W, a as B } from "./index.js";
import { UmbModalToken as G, UMB_MODAL_MANAGER_CONTEXT as H } from "@umbraco-cms/backoffice/modal";
import "./run-warning-modal.element.js";
import { UMB_NOTIFICATION_CONTEXT as P } from "@umbraco-cms/backoffice/notification";
import { UmbRequestReloadChildrenOfEntityEvent as V } from "@umbraco-cms/backoffice/entity-action";
import { UMB_ACTION_EVENT_CONTEXT as X } from "@umbraco-cms/backoffice/action";
const q = new G("Umb.ContentAudit.Modal.RunWarning", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var F = Object.defineProperty, K = Object.getOwnPropertyDescriptor, S = (e) => {
  throw TypeError(e);
}, f = (e, t, a, s) => {
  for (var l = s > 1 ? void 0 : s ? K(t, a) : t, i = e.length - 1, d; i >= 0; i--)
    (d = e[i]) && (l = (s ? d(t, a, l) : d(l)) || l);
  return s && l && F(t, a, l), l;
}, O = (e, t, a) => t.has(e) || S("Cannot " + a), b = (e, t, a) => (O(e, t, "read from private field"), t.get(e)), $ = (e, t, a) => t.has(e) ? S("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), k = (e, t, a, s) => (O(e, t, "write to private field"), t.set(e, a), a), v = (e, t, a) => (O(e, t, "access private method"), a), w, y, _, h, A, C, T, D, E, R;
let c = class extends L(N) {
  constructor() {
    super(), $(this, h), this.crawlData = [], $(this, w), $(this, y), $(this, _), this.scanRunning = !1, this._auditOverviews = [], this._topIssues = [], this.consumeContext(P, (e) => {
      k(this, _, e);
    }), this.consumeContext(W, (e) => {
      k(this, w, e), this.observe(e == null ? void 0 : e.latestAuditOverview, (t) => {
        this._latestAuditOverview = t;
      }), this.observe(e == null ? void 0 : e.auditOverviews, (t) => {
        this._auditOverviews = t || [];
      }), this.observe(e == null ? void 0 : e.topIssues, (t) => {
        t && (this._topIssues = t.filter((a) => a.numberOfUrls != 0));
      }), this.observe(e == null ? void 0 : e.healthScore, (t) => {
        this._healthScore = t, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), v(this, h, A).call(this);
    }), this.consumeContext(H, (e) => {
      k(this, y, e);
    });
  }
  async _openModal() {
    var a;
    const e = (a = b(this, y)) == null ? void 0 : a.open(this, q, {
      data: {
        headline: "Ready to run an audit?"
      }
    }), t = await (e == null ? void 0 : e.onSubmit());
    t != null && t.run && this.startAudit();
  }
  async startAudit() {
    var t, a, s;
    const { stream: e } = await B.startCrawl();
    this.scanRunning = !0, this.crawlData = [], (t = b(this, _)) == null || t.peek("positive", {
      data: {
        headline: "Crawl started",
        message: "You will be notified when it is complete."
      }
    });
    try {
      for await (const l of e)
        this.crawlData.push(l), this.requestUpdate();
      (a = b(this, _)) == null || a.peek("default", {
        data: { headline: "Crawl completed", message: "You can now view the results." }
      });
    } catch (l) {
      (s = b(this, _)) == null || s.peek("danger", {
        data: { headline: "Crawl failed", message: l.message ?? "Unknown error" }
      });
    } finally {
      this.scanRunning = !1, v(this, h, A).call(this);
      const l = await this.getContext(X);
      if (!l)
        throw new Error("Could not get the action event context");
      const i = new V({
        entityType: "audits-root",
        unique: null
      });
      l.dispatchEvent(i);
    }
  }
  _renderScanData() {
    if (this.crawlData.length !== 0) {
      const e = this.crawlData.length, t = this.crawlData.filter((i) => i.crawled && !i.external && !i.asset).length, a = this.crawlData.filter((i) => i.crawled && i.external && !i.asset).length, s = this.crawlData.filter((i) => i.crawled && i.asset).length, l = this.crawlData.filter((i) => i.blocked).length;
      return u`
                <uui-box headline="Debug scan data" class="span-3">
                    <p>Total: ${e}</p>
                    <p>Internal: ${t}</p>
                    <p>External: ${a}</p>
                    <p>Assets: ${s}</p>
                    <p>Blocked: ${l}</p>

                    ${M(
        this.crawlData,
        (i) => i.url,
        (i) => u`${JSON.stringify(i)}<br/>`
      )}
                </uui-box>
            `;
    }
  }
  render() {
    return u`
            <div id="main">
                ${v(this, h, T).call(this)}
                ${v(this, h, D).call(this)}
                ${v(this, h, E).call(this)}
                ${v(this, h, R).call(this)}
            </div>
        `;
  }
};
w = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
A = function() {
  var e, t, a, s;
  (e = b(this, w)) == null || e.getLatestAuditOverview(), (t = b(this, w)) == null || t.getAuditOverviews(), (a = b(this, w)) == null || a.getTopIssues(), (s = b(this, w)) == null || s.getHealthScore();
};
C = function() {
  var e, t, a, s, l, i;
  if (this.scanRunning) {
    const d = this.crawlData.length, r = this.crawlData.filter((o) => o.crawled && !o.external && !o.asset).length, n = this.crawlData.filter((o) => o.crawled && o.external && !o.asset).length, p = this.crawlData.filter((o) => o.crawled && o.asset).length, m = this.crawlData.filter((o) => o.blocked).length;
    return u`
                <uui-loader-bar></uui-loader-bar>

                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>

                    <uui-table-row>
                        <uui-table-cell>URLs crawled:</uui-table-cell>
                        <uui-table-cell>${d}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Internal URLs:</uui-table-cell>
                        <uui-table-cell>${r}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>External URLs:</uui-table-cell>
                        <uui-table-cell>${n}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Asset URLs:</uui-table-cell>
                        <uui-table-cell>${p}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Blocked URLs:</uui-table-cell>
                        <uui-table-cell>${m}</uui-table-cell>
                    </uui-table-row>
                </uui-table>
            `;
  } else
    return ((e = this._latestAuditOverview) == null ? void 0 : e.runDate) == null ? u`<p>No scan has been run yet</p>` : u`
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
                            <uui-table-cell>${(s = this._latestAuditOverview) == null ? void 0 : s.totalExternal}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Asset URLs:</uui-table-cell>
                            <uui-table-cell>${(l = this._latestAuditOverview) == null ? void 0 : l.totalAssets}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Blocked URLs:</uui-table-cell>
                            <uui-table-cell>${(i = this._latestAuditOverview) == null ? void 0 : i.totalBlocked}</uui-table-cell>
                        </uui-table-row>
                    </uui-table>
                `;
};
T = function() {
  var e, t, a;
  if (this._latestAuditOverview !== void 0)
    return u`
                <uui-box headline="Latest audit" class="span-2" style="${((e = this._latestAuditOverview) == null ? void 0 : e.runDate) != null || this.scanRunning ? "--uui-box-default-padding: 0;" : ""}">
                    <div slot="header">
                        ${((t = this._latestAuditOverview) == null ? void 0 : t.runDate) != null ? this.localize.date((a = this._latestAuditOverview) == null ? void 0 : a.runDate, { dateStyle: "long", timeStyle: "short" }) : x}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this._openModal}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${v(this, h, C).call(this)}
                </uui-box>
            `;
};
D = function() {
  if (this._healthScore !== void 0) {
    let e = "score--danger";
    return this._healthScore.healthScore >= 90 ? e = "score--success" : this._healthScore.healthScore >= 50 && (e = "score--warning"), u`
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
E = function() {
  var d;
  if (this._auditOverviews.length <= 1) return x;
  const e = this._auditOverviews.slice(0, 10).reverse(), t = 150, a = 100, s = e.map((r, n) => {
    const p = n / (e.length - 1) * a, m = t - (r.healthScore || 0) / 100 * t;
    return `${p},${m}`;
  }).join(" "), l = ((d = e[e.length - 1]) == null ? void 0 : d.healthScore) || 0, i = l >= 90 ? "var(--uui-color-positive)" : l >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
  return u`
            <uui-box headline="Health Score Trend" class="span-3">
                <div class="chart-container">
                    <svg class="chart" viewBox="0 0 100 ${t}" preserveAspectRatio="none">
                        <!-- Grid lines with labels -->
                        ${[100, 90, 75, 50, 25, 0].map((r) => {
    const n = t - r / 100 * t;
    return u`
                                <line
                                    x1="0"
                                    y1="${n}"
                                    x2="100"
                                    y2="${n}"
                                    class="chart-grid-line ${r === 90 || r === 50 ? "chart-grid-line--threshold" : ""}"
                                />
                                <text x="1" y="${n - 0.5}" class="chart-grid-label">${r}</text>
                            `;
  })}

                        <!-- Gradient fill under the line -->
                        <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:${i};stop-opacity:0.2" />
                                <stop offset="100%" style="stop-color:${i};stop-opacity:0" />
                            </linearGradient>
                        </defs>

                        <!-- Area fill -->
                        <path
                            d="M ${s.split(" ")[0]} L ${s} L ${a},${t} L 0,${t} Z"
                            fill="url(#chartGradient)"
                        />

                        <!-- Line chart -->
                        <polyline
                            points="${s}"
                            class="chart-line"
                            fill="none"
                            stroke="${i}"
                            stroke-width="0.5"
                        />

                        <!-- Data points -->
                        ${e.map((r, n) => {
    const p = n / (e.length - 1) * a, m = t - (r.healthScore || 0) / 100 * t, o = r.healthScore || 0, U = o >= 90 ? "var(--uui-color-positive)" : o >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
    return u`
                                <circle
                                    cx="${p}"
                                    cy="${m}"
                                    r="1"
                                    class="chart-point"
                                    fill="${U}"
                                />
                            `;
  })}
                    </svg>

                    <!-- Labels -->
                    <div class="chart-labels">
                        ${e.map((r) => {
    const n = r.healthScore || 0, p = n >= 90 ? "chart-label-score--success" : n >= 50 ? "chart-label-score--warning" : "chart-label-score--danger";
    return u`
                                <div class="chart-label">
                                    <div class="chart-label-date">
                                        ${r.runDate ? this.localize.date(r.runDate, { dateStyle: "short" }) : "N/A"}
                                    </div>
                                    <div class="chart-label-score ${p}">${n.toFixed(0)}</div>
                                </div>
                            `;
  })}
                    </div>
                </div>
            </uui-box>
        `;
};
R = function() {
  if (this._topIssues.length !== 0)
    return u`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues} hide-summary></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
c.styles = [
  I`
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
f([
  g()
], c.prototype, "scanRunning", 2);
f([
  g()
], c.prototype, "_latestAuditOverview", 2);
f([
  g()
], c.prototype, "_auditOverviews", 2);
f([
  g()
], c.prototype, "_topIssues", 2);
f([
  g()
], c.prototype, "_healthScore", 2);
f([
  g()
], c.prototype, "_pagesWithoutErrors", 2);
c = f([
  z("content-audit-scan-view")
], c);
const ie = c;
export {
  c as ContentAuditScanViewElement,
  ie as default
};
//# sourceMappingURL=overview.element.js.map
