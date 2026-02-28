import { html as c, nothing as $, css as B, state as f, customElement as G } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as H } from "@umbraco-cms/backoffice/lit-element";
import { C as F } from "./index-Di-pAsgE.js";
import { UmbModalToken as V, UMB_MODAL_MANAGER_CONTEXT as X } from "@umbraco-cms/backoffice/modal";
import "./run-warning-modal.element-D047oadI.js";
import { UMB_NOTIFICATION_CONTEXT as j } from "@umbraco-cms/backoffice/notification";
import { UmbRequestReloadChildrenOfEntityEvent as q } from "@umbraco-cms/backoffice/entity-action";
import { UMB_ACTION_EVENT_CONTEXT as K } from "@umbraco-cms/backoffice/action";
import "./health-score.element-BNJ0JPcB.js";
const Y = new V("ContentAudit.Modal.RunWarning", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var Z = Object.defineProperty, J = Object.getOwnPropertyDescriptor, z = (e) => {
  throw TypeError(e);
}, w = (e, t, a, o) => {
  for (var u = o > 1 ? void 0 : o ? J(t, a) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (u = (o ? s(t, a, u) : s(u)) || u);
  return o && u && Z(t, a, u), u;
}, O = (e, t, a) => t.has(e) || z("Cannot " + a), r = (e, t, a) => (O(e, t, "read from private field"), t.get(e)), g = (e, t, a) => t.has(e) ? z("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), y = (e, t, a, o) => (O(e, t, "write to private field"), t.set(e, a), a), n = (e, t, a) => (O(e, t, "access private method"), a), v, m, p, x, _, l, k, T, S, E, D, R, U, I, M, N, L, P;
let h = class extends H {
  constructor() {
    super(), g(this, l), this._crawlData = [], this._crawlPhase = "", g(this, v), g(this, m), g(this, p), this.scanRunning = !1, this._auditOverviews = [], this._topIssues = [], g(this, x, !1), g(this, _, !1), this.consumeContext(j, (e) => {
      y(this, p, e);
    }), this.consumeContext(F, (e) => {
      y(this, v, e), this.observe(e?.latestAuditOverview, (t) => {
        this._latestAuditOverview = t;
      }), this.observe(e?.auditOverviews, (t) => {
        this._auditOverviews = t || [];
      }), this.observe(e?.topIssues, (t) => {
        t && (this._topIssues = t.filter((a) => a.numberOfUrls != 0));
      }), this.observe(e?.healthScore, (t) => {
        this._healthScore = t;
      }), this.observe(e?.crawlData, (t) => {
        this._crawlData = t || [];
      }), this.observe(e?.crawlPhase, (t) => {
        this._crawlPhase = t ?? "";
      }), this.observe(e?.isRunning, (t) => {
        const a = r(this, x);
        this.scanRunning = t, y(this, x, t ?? !1), a && !t && this.isConnected && n(this, l, T).call(this);
      }), n(this, l, k).call(this);
    }), this.consumeContext(X, (e) => {
      y(this, m, e);
    });
  }
  async _openModal() {
    (await r(this, m)?.open(this, Y, {
      data: {
        headline: "Ready to run an audit?"
      }
    })?.onSubmit())?.run && n(this, l, S).call(this);
  }
  render() {
    return this.scanRunning ? n(this, l, I).call(this) : !this._latestAuditOverview || this._latestAuditOverview.runDate == null ? n(this, l, R).call(this) : c`
            <div id="main">
                ${n(this, l, M).call(this)}
                ${n(this, l, N).call(this)}
                ${n(this, l, L).call(this)}
                ${n(this, l, P).call(this)}
            </div>
        `;
  }
};
v = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
x = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
k = function() {
  r(this, v)?.getLatestAuditOverview(), r(this, v)?.getAuditOverviews(), r(this, v)?.getTopIssues(), r(this, v)?.getHealthScore();
};
T = async function() {
  r(this, _) ? y(this, _, !1) : r(this, p)?.peek("default", {
    data: { headline: "Crawl completed", message: "You can now view the results." }
  }), n(this, l, k).call(this);
  const e = await this.getContext(K);
  if (e) {
    const t = new q({
      entityType: "audits-root",
      unique: null
    });
    e.dispatchEvent(t);
  }
};
S = async function() {
  try {
    await r(this, v).startCrawl(), r(this, p)?.peek("positive", {
      data: {
        headline: "Crawl started",
        message: "You will be notified when it is complete."
      }
    });
  } catch (e) {
    r(this, p)?.peek("danger", {
      data: { headline: "Crawl failed to start", message: e.message ?? "Unknown error" }
    });
  }
};
E = async function() {
  try {
    y(this, _, !0), await r(this, v).cancelCrawl(), r(this, p)?.peek("warning", {
      data: { headline: "Crawl cancelled", message: "The crawl has been cancelled." }
    });
  } catch (e) {
    r(this, p)?.peek("danger", {
      data: { headline: "Cancel failed", message: e.message ?? "Unknown error" }
    });
  }
};
D = function(e) {
  return e.blocked ? { label: "Blocked", color: "danger" } : e.skipped ? { label: "Skipped", color: "warning" } : e.external ? { label: "External", color: "default" } : e.asset ? { label: "Asset", color: "default" } : { label: "Crawled", color: "positive" };
};
R = function() {
  return c`
            <div class="overlay">
                <div class="overlay-content">
                    <h1>ContentAudit</h1>
                    <p class="overlay-description">
                        Crawl your site to audit for SEO issues, accessibility problems,
                        performance metrics, and carbon emissions. Results are analysed
                        and presented with actionable insights.
                    </p>
                    <uui-button look="primary" @click=${this._openModal}>Run new scan</uui-button>
                </div>
            </div>
        `;
};
U = function() {
  const e = this._crawlData.slice(-5).reverse();
  return e.length === 0 ? $ : c`
            <div class="activity-feed">
                ${e.map((t) => {
    const a = n(this, l, D).call(this, t), o = t.url ? t.url.length > 70 ? t.url.substring(0, 70) + "…" : t.url : "Unknown URL";
    return c`
                        <div class="activity-feed-item">
                            <uui-tag color=${a.color} look="secondary">${a.label}</uui-tag>
                            <span class="activity-feed-url">${o}</span>
                        </div>
                    `;
  })}
            </div>
        `;
};
I = function() {
  const e = this._crawlData.length, t = this._crawlData.filter((i) => i.crawled && !i.external && !i.asset).length, a = this._crawlData.filter((i) => i.crawled && i.external && !i.asset).length, o = this._crawlData.filter((i) => i.crawled && i.asset).length, u = this._crawlData.filter((i) => i.blocked).length;
  return c`
            <div class="overlay">
                <div class="overlay-content">
                    ${this._crawlPhase ? c`<div class="crawl-phase"><uui-loader-circle></uui-loader-circle> ${this._crawlPhase}</div>` : $}

                    <uui-loader-bar></uui-loader-bar>

                    <div class="crawl-stats">
                        <div class="crawl-stat">
                            <div class="crawl-stat-value">${e}</div>
                            <div class="crawl-stat-label">URLs crawled</div>
                        </div>
                        <div class="crawl-stat">
                            <div class="crawl-stat-value">${t}</div>
                            <div class="crawl-stat-label">Internal</div>
                        </div>
                        <div class="crawl-stat">
                            <div class="crawl-stat-value">${a}</div>
                            <div class="crawl-stat-label">External</div>
                        </div>
                        <div class="crawl-stat">
                            <div class="crawl-stat-value">${o}</div>
                            <div class="crawl-stat-label">Assets</div>
                        </div>
                        <div class="crawl-stat">
                            <div class="crawl-stat-value">${u}</div>
                            <div class="crawl-stat-label">Blocked</div>
                        </div>
                    </div>

                    ${n(this, l, U).call(this)}

                    <div class="overlay-actions">
                        <uui-button look="secondary" color="danger" @click=${n(this, l, E)}>Cancel</uui-button>
                    </div>
                </div>
            </div>
        `;
};
M = function() {
  if (this._latestAuditOverview !== void 0)
    return c`
                <uui-box headline="Latest audit" class="span-2" style="--uui-box-default-padding: 0;">
                    <div slot="header">
                        ${this._latestAuditOverview?.runDate != null ? this.localize.date(this._latestAuditOverview.runDate, { dateStyle: "long", timeStyle: "short" }) : $}
                    </div>
                    <div slot="header-actions">
                        <uui-button look="primary" @click=${this._openModal}>Run new scan</uui-button>
                    </div>

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
                </uui-box>
            `;
};
N = function() {
  if (this._latestAuditOverview?.runDate != null && this._healthScore !== void 0)
    return c`
                <content-audit-health-score
                    .score=${this._healthScore.healthScore}
                    headline="Site health"
                ></content-audit-health-score>
            `;
};
L = function() {
  if (this._auditOverviews.length <= 1) return $;
  const e = this._auditOverviews.slice(0, 10).reverse(), t = 150, a = 100, o = e.map((s, d) => {
    const b = d / (e.length - 1) * a, C = t - (s.healthScore || 0) / 100 * t;
    return `${b},${C}`;
  }).join(" "), u = e[e.length - 1]?.healthScore || 0, i = u >= 90 ? "var(--uui-color-positive)" : u >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
  return c`
            <uui-box headline="Health Score Trend" class="span-3">
                <div class="chart-container">
                    <svg class="chart" viewBox="0 0 100 ${t}" preserveAspectRatio="none">
                        <!-- Grid lines with labels -->
                        ${[100, 90, 75, 50, 25, 0].map((s) => {
    const d = t - s / 100 * t;
    return c`
                                <line
                                    x1="0"
                                    y1="${d}"
                                    x2="100"
                                    y2="${d}"
                                    class="chart-grid-line ${s === 90 || s === 50 ? "chart-grid-line--threshold" : ""}"
                                />
                                <text x="1" y="${d - 0.5}" class="chart-grid-label">${s}</text>
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
                            d="M ${o.split(" ")[0]} L ${o} L ${a},${t} L 0,${t} Z"
                            fill="url(#chartGradient)"
                        />

                        <!-- Line chart -->
                        <polyline
                            points="${o}"
                            class="chart-line"
                            fill="none"
                            stroke="${i}"
                            stroke-width="0.5"
                        />

                        <!-- Data points -->
                        ${e.map((s, d) => {
    const b = d / (e.length - 1) * a, C = t - (s.healthScore || 0) / 100 * t, A = s.healthScore || 0, W = A >= 90 ? "var(--uui-color-positive)" : A >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
    return c`
                                <circle
                                    cx="${b}"
                                    cy="${C}"
                                    r="1"
                                    class="chart-point"
                                    fill="${W}"
                                />
                            `;
  })}
                    </svg>

                    <!-- Labels -->
                    <div class="chart-labels">
                        ${e.map((s) => {
    const d = s.healthScore || 0, b = d >= 90 ? "chart-label-score--success" : d >= 50 ? "chart-label-score--warning" : "chart-label-score--danger";
    return c`
                                <div class="chart-label">
                                    <div class="chart-label-date">
                                        ${s.runDate ? this.localize.date(s.runDate, { dateStyle: "short" }) : "N/A"}
                                    </div>
                                    <div class="chart-label-score ${b}">${d.toFixed(0)}</div>
                                </div>
                            `;
  })}
                    </div>
                </div>
            </uui-box>
        `;
};
P = function() {
  if (this._topIssues.length !== 0)
    return c`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues} hide-summary></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
h.styles = [
  B`
            :host {
                display: block;
                height: 100%;
            }

            /* Overlay styles */
            .overlay {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                background: linear-gradient(var(--uui-color-background), var(--uui-color-border));
            }

            .overlay-content {
                text-align: center;
                max-width: 600px;
                width: 100%;
            }

            .overlay-content h1 {
                font-size: var(--uui-type-h2-size);
                font-weight: 700;
                margin: 0 0 var(--uui-size-space-4);
            }

            .overlay-description {
                font-size: var(--uui-type-default-size);
                color: var(--uui-color-text-alt);
                margin: 0 0 var(--uui-size-space-6);
                line-height: 1.6;
            }

            .overlay-actions {
                margin-top: var(--uui-size-space-6);
            }

            /* Crawl phase */
            .crawl-phase {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--uui-size-space-2);
                font-size: var(--uui-type-default-size);
                font-style: italic;
                color: var(--uui-color-text-alt);
                margin-bottom: var(--uui-size-space-4);
            }

            .crawl-phase uui-loader-circle {
                font-size: 1em;
            }

            /* Crawl stats */
            .crawl-stats {
                display: flex;
                justify-content: center;
                gap: var(--uui-size-space-6);
                margin: var(--uui-size-space-6) 0;
            }

            .crawl-stat {
                text-align: center;
            }

            .crawl-stat-value {
                font-size: var(--uui-type-h3-size);
                font-weight: 700;
            }

            .crawl-stat-label {
                font-size: var(--uui-type-small-size);
                color: var(--uui-color-text-alt);
                margin-top: var(--uui-size-space-1);
            }

            /* Activity feed */
            .activity-feed {
                display: flex;
                flex-direction: column;
                gap: var(--uui-size-space-2);
                text-align: left;
                max-width: 500px;
                margin: 0 auto;
            }

            .activity-feed-item {
                display: flex;
                align-items: center;
                gap: var(--uui-size-space-3);
            }

            .activity-feed-item uui-tag {
                flex-shrink: 0;
                min-width: 70px;
                text-align: center;
            }

            .activity-feed-url {
                font-family: monospace;
                font-size: var(--uui-type-small-size);
                color: var(--uui-color-text-alt);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1;
            }

            /* Dashboard styles */
            #main {
                display: grid;
                gap: var(--uui-size-space-5);
                grid-template-columns: 1fr 1fr 350px;
                padding: var(--uui-size-space-5);
            }

            .span-2 {
                grid-column: span 2;
            }

            .span-3 {
                grid-column: span 3;
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
                font-size: var(--uui-type-small-size);
            }

            .chart-label-date {
                font-weight: 600;
                color: var(--uui-color-text);
                margin-bottom: var(--uui-size-space-1);
            }

            .chart-label-score {
                font-weight: 700;
                font-size: var(--uui-type-default-size);
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
w([
  f()
], h.prototype, "_crawlData", 2);
w([
  f()
], h.prototype, "_crawlPhase", 2);
w([
  f()
], h.prototype, "scanRunning", 2);
w([
  f()
], h.prototype, "_latestAuditOverview", 2);
w([
  f()
], h.prototype, "_auditOverviews", 2);
w([
  f()
], h.prototype, "_topIssues", 2);
w([
  f()
], h.prototype, "_healthScore", 2);
h = w([
  G("content-audit-scan-view")
], h);
const ne = h;
export {
  h as ContentAuditScanViewElement,
  ne as default
};
//# sourceMappingURL=overview.element-DP-ToCi_.js.map
