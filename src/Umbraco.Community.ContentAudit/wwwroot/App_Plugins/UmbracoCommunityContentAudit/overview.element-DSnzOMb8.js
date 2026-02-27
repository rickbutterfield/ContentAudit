import { html as s, nothing as x, css as M, state as f, customElement as z } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as G } from "@umbraco-cms/backoffice/lit-element";
import { C as W } from "./index-QfE00jYe.js";
import { UmbModalToken as B, UMB_MODAL_MANAGER_CONTEXT as H } from "@umbraco-cms/backoffice/modal";
import "./run-warning-modal.element-Dc21GeXV.js";
import { UMB_NOTIFICATION_CONTEXT as P } from "@umbraco-cms/backoffice/notification";
import { UmbRequestReloadChildrenOfEntityEvent as V } from "@umbraco-cms/backoffice/entity-action";
import { UMB_ACTION_EVENT_CONTEXT as X } from "@umbraco-cms/backoffice/action";
import "./health-score.element-BNJ0JPcB.js";
const F = new B("ContentAudit.Modal.RunWarning", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var q = Object.defineProperty, K = Object.getOwnPropertyDescriptor, k = (t) => {
  throw TypeError(t);
}, v = (t, e, a, u) => {
  for (var o = u > 1 ? void 0 : u ? K(e, a) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (o = (u ? l(e, a, o) : l(o)) || o);
  return u && o && q(e, a, o), o;
}, O = (t, e, a) => e.has(t) || k("Cannot " + a), r = (t, e, a) => (O(t, e, "read from private field"), e.get(t)), _ = (t, e, a) => e.has(t) ? k("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), g = (t, e, a, u) => (O(t, e, "write to private field"), e.set(t, a), a), h = (t, e, a) => (O(t, e, "access private method"), a), b, m, p, y, n, A, T, S, R, E, D, U, L, N;
let d = class extends G {
  constructor() {
    super(), _(this, n), this._crawlData = [], _(this, b), _(this, m), _(this, p), this.scanRunning = !1, this._auditOverviews = [], this._topIssues = [], _(this, y, !1), this.consumeContext(P, (t) => {
      g(this, p, t);
    }), this.consumeContext(W, (t) => {
      g(this, b, t), this.observe(t?.latestAuditOverview, (e) => {
        this._latestAuditOverview = e;
      }), this.observe(t?.auditOverviews, (e) => {
        this._auditOverviews = e || [];
      }), this.observe(t?.topIssues, (e) => {
        e && (this._topIssues = e.filter((a) => a.numberOfUrls != 0));
      }), this.observe(t?.healthScore, (e) => {
        this._healthScore = e;
      }), this.observe(t?.crawlData, (e) => {
        this._crawlData = e || [];
      }), this.observe(t?.isRunning, (e) => {
        const a = r(this, y);
        this.scanRunning = e, g(this, y, e ?? !1), a && !e && this.isConnected && h(this, n, T).call(this);
      }), h(this, n, A).call(this);
    }), this.consumeContext(H, (t) => {
      g(this, m, t);
    });
  }
  async _openModal() {
    (await r(this, m)?.open(this, F, {
      data: {
        headline: "Ready to run an audit?"
      }
    })?.onSubmit())?.run && h(this, n, S).call(this);
  }
  render() {
    return s`
            <div id="main">
                ${h(this, n, D).call(this)}
                ${h(this, n, U).call(this)}
                ${h(this, n, L).call(this)}
                ${h(this, n, N).call(this)}
            </div>
        `;
  }
};
b = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
A = function() {
  r(this, b)?.getLatestAuditOverview(), r(this, b)?.getAuditOverviews(), r(this, b)?.getTopIssues(), r(this, b)?.getHealthScore();
};
T = async function() {
  r(this, p)?.peek("default", {
    data: { headline: "Crawl completed", message: "You can now view the results." }
  }), h(this, n, A).call(this);
  const t = await this.getContext(X);
  if (t) {
    const e = new V({
      entityType: "audits-root",
      unique: null
    });
    t.dispatchEvent(e);
  }
};
S = async function() {
  try {
    await r(this, b).startCrawl(), r(this, p)?.peek("positive", {
      data: {
        headline: "Crawl started",
        message: "You will be notified when it is complete."
      }
    });
  } catch (t) {
    r(this, p)?.peek("danger", {
      data: { headline: "Crawl failed to start", message: t.message ?? "Unknown error" }
    });
  }
};
R = async function() {
  try {
    await r(this, b).cancelCrawl(), r(this, p)?.peek("warning", {
      data: { headline: "Crawl cancelled", message: "The crawl has been cancelled." }
    });
  } catch (t) {
    r(this, p)?.peek("danger", {
      data: { headline: "Cancel failed", message: t.message ?? "Unknown error" }
    });
  }
};
E = function() {
  if (this.scanRunning) {
    const t = this._crawlData.length, e = this._crawlData.filter((i) => i.crawled && !i.external && !i.asset).length, a = this._crawlData.filter((i) => i.crawled && i.external && !i.asset).length, u = this._crawlData.filter((i) => i.crawled && i.asset).length, o = this._crawlData.filter((i) => i.blocked).length;
    return s`
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
                        <uui-table-cell>${a}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Asset URLs:</uui-table-cell>
                        <uui-table-cell>${u}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Blocked URLs:</uui-table-cell>
                        <uui-table-cell>${o}</uui-table-cell>
                    </uui-table-row>
                </uui-table>
            `;
  } else
    return this._latestAuditOverview?.runDate == null ? s`<p>No scan has been run yet</p>` : s`
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
D = function() {
  if (this._latestAuditOverview !== void 0)
    return s`
                <uui-box headline="Latest audit" class="span-2" style="${this._latestAuditOverview?.runDate != null || this.scanRunning ? "--uui-box-default-padding: 0;" : ""}">
                    <div slot="header">
                        ${this._latestAuditOverview?.runDate != null ? this.localize.date(this._latestAuditOverview.runDate, { dateStyle: "long", timeStyle: "short" }) : x}
                    </div>
                    <div slot="header-actions">
                        ${this.scanRunning ? s`<uui-button look="secondary" color="danger" @click=${h(this, n, R)}>Cancel</uui-button>` : s`<uui-button look="primary" @click=${this._openModal}>Run new scan</uui-button>`}
                    </div>

                    ${h(this, n, E).call(this)}
                </uui-box>
            `;
};
U = function() {
  if (this._latestAuditOverview?.runDate != null && this._healthScore !== void 0)
    return s`
                <content-audit-health-score
                    .score=${this._healthScore.healthScore}
                    headline="Site health"
                ></content-audit-health-score>
            `;
};
L = function() {
  if (this._auditOverviews.length <= 1) return x;
  const t = this._auditOverviews.slice(0, 10).reverse(), e = 150, a = 100, u = t.map((l, c) => {
    const w = c / (t.length - 1) * a, $ = e - (l.healthScore || 0) / 100 * e;
    return `${w},${$}`;
  }).join(" "), o = t[t.length - 1]?.healthScore || 0, i = o >= 90 ? "var(--uui-color-positive)" : o >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
  return s`
            <uui-box headline="Health Score Trend" class="span-3">
                <div class="chart-container">
                    <svg class="chart" viewBox="0 0 100 ${e}" preserveAspectRatio="none">
                        <!-- Grid lines with labels -->
                        ${[100, 90, 75, 50, 25, 0].map((l) => {
    const c = e - l / 100 * e;
    return s`
                                <line
                                    x1="0"
                                    y1="${c}"
                                    x2="100"
                                    y2="${c}"
                                    class="chart-grid-line ${l === 90 || l === 50 ? "chart-grid-line--threshold" : ""}"
                                />
                                <text x="1" y="${c - 0.5}" class="chart-grid-label">${l}</text>
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
                            d="M ${u.split(" ")[0]} L ${u} L ${a},${e} L 0,${e} Z"
                            fill="url(#chartGradient)"
                        />

                        <!-- Line chart -->
                        <polyline
                            points="${u}"
                            class="chart-line"
                            fill="none"
                            stroke="${i}"
                            stroke-width="0.5"
                        />

                        <!-- Data points -->
                        ${t.map((l, c) => {
    const w = c / (t.length - 1) * a, $ = e - (l.healthScore || 0) / 100 * e, C = l.healthScore || 0, I = C >= 90 ? "var(--uui-color-positive)" : C >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
    return s`
                                <circle
                                    cx="${w}"
                                    cy="${$}"
                                    r="1"
                                    class="chart-point"
                                    fill="${I}"
                                />
                            `;
  })}
                    </svg>

                    <!-- Labels -->
                    <div class="chart-labels">
                        ${t.map((l) => {
    const c = l.healthScore || 0, w = c >= 90 ? "chart-label-score--success" : c >= 50 ? "chart-label-score--warning" : "chart-label-score--danger";
    return s`
                                <div class="chart-label">
                                    <div class="chart-label-date">
                                        ${l.runDate ? this.localize.date(l.runDate, { dateStyle: "short" }) : "N/A"}
                                    </div>
                                    <div class="chart-label-score ${w}">${c.toFixed(0)}</div>
                                </div>
                            `;
  })}
                    </div>
                </div>
            </uui-box>
        `;
};
N = function() {
  if (this._topIssues.length !== 0)
    return s`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues} hide-summary></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
d.styles = [
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
v([
  f()
], d.prototype, "_crawlData", 2);
v([
  f()
], d.prototype, "scanRunning", 2);
v([
  f()
], d.prototype, "_latestAuditOverview", 2);
v([
  f()
], d.prototype, "_auditOverviews", 2);
v([
  f()
], d.prototype, "_topIssues", 2);
v([
  f()
], d.prototype, "_healthScore", 2);
d = v([
  z("content-audit-scan-view")
], d);
const le = d;
export {
  d as ContentAuditScanViewElement,
  le as default
};
//# sourceMappingURL=overview.element-DSnzOMb8.js.map
