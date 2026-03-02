import { html as n, nothing as _, css as X, state as f, customElement as j } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as K } from "@umbraco-cms/backoffice/lit-element";
import { C as q } from "./index-BUsZH3tI.js";
import { UmbModalToken as T, UMB_MODAL_MANAGER_CONTEXT as Y } from "@umbraco-cms/backoffice/modal";
import "./run-warning-modal.element-guhEJZrV.js";
import "./discard-and-run-modal.element-DI4TqKY6.js";
import { UMB_NOTIFICATION_CONTEXT as Z } from "@umbraco-cms/backoffice/notification";
import { UmbRequestReloadChildrenOfEntityEvent as J } from "@umbraco-cms/backoffice/entity-action";
import { UMB_ACTION_EVENT_CONTEXT as Q } from "@umbraco-cms/backoffice/action";
import "./health-score.element-BNJ0JPcB.js";
const R = new T("ContentAudit.Modal.RunWarning", {
  modal: {
    type: "dialog",
    size: "small"
  }
}), ee = new T("ContentAudit.Modal.DiscardAndRun", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var te = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, E = (e) => {
  throw TypeError(e);
}, p = (e, t, a, o) => {
  for (var c = o > 1 ? void 0 : o ? ae(t, a) : t, v = e.length - 1, r; v >= 0; v--)
    (r = e[v]) && (c = (o ? r(t, a, c) : r(c)) || c);
  return o && c && te(t, a, c), c;
}, A = (e, t, a) => t.has(e) || E("Cannot " + a), l = (e, t, a) => (A(e, t, "read from private field"), t.get(e)), b = (e, t, a) => t.has(e) ? E("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), y = (e, t, a, o) => (A(e, t, "write to private field"), t.set(e, a), a), s = (e, t, a) => (A(e, t, "access private method"), a), h, g, w, C, x, i, S, I, $, D, N, U, O, M, L, B, P, W, G, H, F;
let u = class extends K {
  constructor() {
    super(), b(this, i), this._crawlPhase = "", b(this, h), b(this, g), b(this, w), this.scanRunning = !1, this._auditOverviews = [], this._topIssues = [], b(this, C, !1), b(this, x, !1), this.consumeContext(Z, (e) => {
      y(this, w, e);
    }), this.consumeContext(q, (e) => {
      y(this, h, e), this.observe(e?.latestAuditOverview, (t) => {
        this._latestAuditOverview = t;
      }), this.observe(e?.auditOverviews, (t) => {
        this._auditOverviews = t || [];
      }), this.observe(e?.topIssues, (t) => {
        t && (this._topIssues = t.filter((a) => a.numberOfUrls != 0));
      }), this.observe(e?.healthScore, (t) => {
        this._healthScore = t;
      }), this.observe(e?.incompleteCrawl, (t) => {
        this._incompleteCrawl = t;
      }), this.observe(e?.crawlSummary, (t) => {
        this._crawlSummary = t;
      }), this.observe(e?.crawlPhase, (t) => {
        this._crawlPhase = t ?? "";
      }), this.observe(e?.isRunning, (t) => {
        const a = l(this, C);
        this.scanRunning = t, y(this, C, t ?? !1), a && !t && this.isConnected && s(this, i, I).call(this);
      }), s(this, i, S).call(this);
    }), this.consumeContext(Y, (e) => {
      y(this, g, e);
    });
  }
  async _openModal() {
    (await l(this, g)?.open(this, R, {
      data: {
        headline: "Ready to run an audit?"
      }
    })?.onSubmit())?.run && s(this, i, $).call(this);
  }
  render() {
    return this.scanRunning ? s(this, i, P).call(this) : this._incompleteCrawl && (!this._latestAuditOverview || this._latestAuditOverview.runDate == null) ? n`
                <div class="overlay">
                    <div class="overlay-content">
                        <h1>ContentAudit</h1>
                        <p class="overlay-description">
                            Crawl your site to audit for SEO issues, accessibility problems,
                            performance metrics, and carbon emissions. Results are analysed
                            and presented with actionable insights.
                        </p>
                        ${s(this, i, O).call(this)}
                    </div>
                </div>
            ` : !this._latestAuditOverview || this._latestAuditOverview.runDate == null ? s(this, i, L).call(this) : n`
            <div id="main">
                ${s(this, i, O).call(this)}
                ${s(this, i, W).call(this)}
                ${s(this, i, G).call(this)}
                ${s(this, i, H).call(this)}
                ${s(this, i, F).call(this)}
            </div>
        `;
  }
};
h = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakMap();
x = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
S = function() {
  l(this, h)?.getLatestAuditOverview(), l(this, h)?.getAuditOverviews(), l(this, h)?.getTopIssues(), l(this, h)?.getHealthScore(), l(this, h)?.getIncompleteCrawl();
};
I = async function() {
  l(this, x) ? y(this, x, !1) : l(this, w)?.peek("default", {
    data: { headline: "Crawl completed", message: "You can now view the results." }
  }), s(this, i, S).call(this);
  const e = await this.getContext(Q);
  if (e) {
    const t = new J({
      entityType: "audits-root",
      unique: null
    });
    e.dispatchEvent(t);
  }
};
$ = async function() {
  try {
    await l(this, h).startCrawl(), l(this, w)?.peek("positive", {
      data: {
        headline: "Crawl started",
        message: "You will be notified when it is complete."
      }
    });
  } catch (e) {
    l(this, w)?.peek("danger", {
      data: { headline: "Crawl failed to start", message: e.message ?? "Unknown error" }
    });
  }
};
D = async function() {
  try {
    y(this, x, !0), await l(this, h).cancelCrawl(), l(this, w)?.peek("warning", {
      data: { headline: "Crawl cancelled", message: "The crawl has been cancelled." }
    });
  } catch (e) {
    l(this, w)?.peek("danger", {
      data: { headline: "Cancel failed", message: e.message ?? "Unknown error" }
    });
  }
};
N = async function() {
  const e = l(this, g)?.open(this, R, {
    data: {
      headline: "Continue previous crawl?"
    }
  });
  try {
    (await e?.onSubmit())?.run && s(this, i, $).call(this);
  } catch {
  }
};
U = async function() {
  const e = l(this, g)?.open(this, ee, {
    data: {
      headline: "Discard incomplete crawl?",
      pagesCrawled: this._incompleteCrawl.total
    }
  });
  try {
    (await e?.onSubmit())?.confirmed && (await l(this, h).discardIncompleteCrawl(this._incompleteCrawl.key), s(this, i, $).call(this));
  } catch {
  }
};
O = function() {
  if (!this._incompleteCrawl) return _;
  const e = this._incompleteCrawl.runDate ? new Date(this._incompleteCrawl.runDate) : void 0;
  return n`
            <div class="incomplete-crawl-banner">
                <uui-icon name="icon-alert"></uui-icon>
                <div class="incomplete-crawl-info">
                    <strong>Incomplete crawl found</strong>
                    <span>
                        A previous crawl${e && !isNaN(e.getTime()) ? n` from ${this.localize.date(e, { dateStyle: "long", timeStyle: "short" })}` : _}
                        was interrupted with ${this._incompleteCrawl.total} URLs processed.
                    </span>
                </div>
                <div class="incomplete-crawl-actions">
                    <uui-button look="primary" color="positive" @click=${s(this, i, N)}>Continue crawl</uui-button>
                    <uui-button look="secondary" color="danger" @click=${s(this, i, U)}>Start new crawl</uui-button>
                </div>
            </div>
        `;
};
M = function(e) {
  return e.blocked ? { label: "Blocked", color: "danger" } : e.skipped ? { label: "Skipped", color: "warning" } : e.external ? { label: "External", color: "default" } : e.image ? { label: "Image", color: "default" } : e.resource ? { label: "Resource", color: "default" } : { label: "Crawled", color: "positive" };
};
L = function() {
  return n`
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
B = function() {
  const e = this._crawlSummary?.recentUrls?.slice().reverse() ?? [];
  return e.length === 0 ? _ : n`
            <div class="activity-feed">
                ${e.map((t) => {
    const a = s(this, i, M).call(this, t), o = t.url ? t.url.length > 70 ? t.url.substring(0, 70) + "…" : t.url : "Unknown URL";
    return n`
                        <div class="activity-feed-item">
                            <uui-tag color=${a.color} look="secondary">${a.label}</uui-tag>
                            <span class="activity-feed-url">${o}</span>
                        </div>
                    `;
  })}
            </div>
        `;
};
P = function() {
  const e = this._crawlSummary?.total ?? 0, t = this._crawlSummary?.internal ?? 0, a = this._crawlSummary?.external ?? 0, o = this._crawlSummary?.resources ?? 0, c = this._crawlSummary?.images ?? 0, v = this._crawlSummary?.blocked ?? 0;
  return n`
            <div class="overlay">
                <div class="overlay-content">
                    ${this._crawlPhase ? n`<div class="crawl-phase"><uui-loader-circle></uui-loader-circle> ${this._crawlPhase}</div>` : _}

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
                            <div class="crawl-stat-label">Resources</div>
                        </div>
                        <div class="crawl-stat">
                            <div class="crawl-stat-value">${c}</div>
                            <div class="crawl-stat-label">Images</div>
                        </div>
                        <div class="crawl-stat">
                            <div class="crawl-stat-value">${v}</div>
                            <div class="crawl-stat-label">Blocked</div>
                        </div>
                    </div>

                    ${s(this, i, B).call(this)}

                    <div class="overlay-actions">
                        <uui-button look="secondary" color="danger" @click=${s(this, i, D)}>Cancel</uui-button>
                    </div>
                </div>
            </div>
        `;
};
W = function() {
  if (this._latestAuditOverview !== void 0)
    return n`
                <uui-box headline="Latest audit" class="span-2" style="--uui-box-default-padding: 0;">
                    <div slot="header">
                        ${this._latestAuditOverview?.runDate != null ? this.localize.date(new Date(this._latestAuditOverview.runDate), { dateStyle: "long", timeStyle: "short" }) : _}
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
                            <uui-table-cell>Resources:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalResources}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Images:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalImages}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Blocked URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalBlocked}</uui-table-cell>
                        </uui-table-row>
                    </uui-table>
                </uui-box>
            `;
};
G = function() {
  if (this._latestAuditOverview?.runDate != null && this._healthScore !== void 0)
    return n`
                <content-audit-health-score
                    .score=${this._healthScore.healthScore}
                    headline="Site health"
                ></content-audit-health-score>
            `;
};
H = function() {
  if (this._auditOverviews.length <= 1) return _;
  const e = this._auditOverviews.slice(0, 10).reverse(), t = 150, a = 100, o = e.map((r, d) => {
    const m = d / (e.length - 1) * a, k = t - (r.healthScore || 0) / 100 * t;
    return `${m},${k}`;
  }).join(" "), c = e[e.length - 1]?.healthScore || 0, v = c >= 90 ? "var(--uui-color-positive)" : c >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
  return n`
            <uui-box headline="Health Score Trend" class="span-3">
                <div class="chart-container">
                    <svg class="chart" viewBox="0 0 100 ${t}" preserveAspectRatio="none">
                        <!-- Grid lines with labels -->
                        ${[100, 90, 75, 50, 25, 0].map((r) => {
    const d = t - r / 100 * t;
    return n`
                                <line
                                    x1="0"
                                    y1="${d}"
                                    x2="100"
                                    y2="${d}"
                                    class="chart-grid-line ${r === 90 || r === 50 ? "chart-grid-line--threshold" : ""}"
                                />
                                <text x="1" y="${d - 0.5}" class="chart-grid-label">${r}</text>
                            `;
  })}

                        <!-- Gradient fill under the line -->
                        <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:${v};stop-opacity:0.2" />
                                <stop offset="100%" style="stop-color:${v};stop-opacity:0" />
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
                            stroke="${v}"
                            stroke-width="0.5"
                        />

                        <!-- Data points -->
                        ${e.map((r, d) => {
    const m = d / (e.length - 1) * a, k = t - (r.healthScore || 0) / 100 * t, z = r.healthScore || 0, V = z >= 90 ? "var(--uui-color-positive)" : z >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
    return n`
                                <circle
                                    cx="${m}"
                                    cy="${k}"
                                    r="1"
                                    class="chart-point"
                                    fill="${V}"
                                />
                            `;
  })}
                    </svg>

                    <!-- Labels -->
                    <div class="chart-labels">
                        ${e.map((r) => {
    const d = r.healthScore || 0, m = d >= 90 ? "chart-label-score--success" : d >= 50 ? "chart-label-score--warning" : "chart-label-score--danger";
    return n`
                                <div class="chart-label">
                                    <div class="chart-label-date">
                                        ${r.runDate ? this.localize.date(new Date(r.runDate), { dateStyle: "short" }) : "N/A"}
                                    </div>
                                    <div class="chart-label-score ${m}">${d.toFixed(0)}</div>
                                </div>
                            `;
  })}
                    </div>
                </div>
            </uui-box>
        `;
};
F = function() {
  if (this._topIssues.length !== 0)
    return n`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues} hide-summary></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
u.styles = [
  X`
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

            /* Incomplete crawl banner */
            .incomplete-crawl-banner {
                display: flex;
                align-items: center;
                gap: var(--uui-size-space-4);
                padding: var(--uui-size-layout-1, 24px);
                background-color: var(--uui-color-warning, #fbd142);
                color: var(--uui-color-warning-contrast, #000);
                border-radius: calc(var(--uui-border-radius, 3px) * 2);
                box-shadow: var(--uui-shadow-depth-1, 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24));
            }

            .incomplete-crawl-banner > uui-icon {
                font-size: 1.2em;
                flex-shrink: 0;
            }

            .incomplete-crawl-info {
                display: flex;
                flex-direction: column;
                gap: var(--uui-size-space-1);
                flex: 1;
                text-align: left;
                text-wrap: balance;
            }

            .incomplete-crawl-info span {
                font-size: var(--uui-type-small-size);
            }

            .incomplete-crawl-actions {
                display: flex;
                flex-direction: column;
                gap: var(--uui-size-space-2);
                flex-shrink: 0;
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
p([
  f()
], u.prototype, "_crawlSummary", 2);
p([
  f()
], u.prototype, "_crawlPhase", 2);
p([
  f()
], u.prototype, "scanRunning", 2);
p([
  f()
], u.prototype, "_latestAuditOverview", 2);
p([
  f()
], u.prototype, "_auditOverviews", 2);
p([
  f()
], u.prototype, "_topIssues", 2);
p([
  f()
], u.prototype, "_healthScore", 2);
p([
  f()
], u.prototype, "_incompleteCrawl", 2);
u = p([
  j("content-audit-scan-view")
], u);
const ve = u;
export {
  u as ContentAuditScanViewElement,
  ve as default
};
//# sourceMappingURL=overview.element-913ikPo0.js.map
