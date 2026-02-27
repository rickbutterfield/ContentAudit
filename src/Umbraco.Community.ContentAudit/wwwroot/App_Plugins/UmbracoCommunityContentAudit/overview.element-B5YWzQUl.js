import { html as u, nothing as O, css as L, state as f, customElement as U } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as N } from "@umbraco-cms/backoffice/lit-element";
import { C as I } from "./index-DCtP17IU.js";
import { UmbModalToken as M, UMB_MODAL_MANAGER_CONTEXT as z } from "@umbraco-cms/backoffice/modal";
import "./run-warning-modal.element-BZ_QMPKB.js";
import { UMB_NOTIFICATION_CONTEXT as G } from "@umbraco-cms/backoffice/notification";
import { UmbRequestReloadChildrenOfEntityEvent as B } from "@umbraco-cms/backoffice/entity-action";
import { UMB_ACTION_EVENT_CONTEXT as W } from "@umbraco-cms/backoffice/action";
import "./health-score.element-B17YJHkx.js";
const H = new M("ContentAudit.Modal.RunWarning", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var P = Object.defineProperty, V = Object.getOwnPropertyDescriptor, C = (e) => {
  throw TypeError(e);
}, p = (e, t, a, r) => {
  for (var s = r > 1 ? void 0 : r ? V(t, a) : t, i = e.length - 1, l; i >= 0; i--)
    (l = e[i]) && (s = (r ? l(t, a, s) : l(s)) || s);
  return r && s && P(t, a, s), s;
}, x = (e, t, a) => t.has(e) || C("Cannot " + a), h = (e, t, a) => (x(e, t, "read from private field"), t.get(e)), _ = (e, t, a) => t.has(e) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), y = (e, t, a, r) => (x(e, t, "write to private field"), t.set(e, a), a), v = (e, t, a) => (x(e, t, "access private method"), a), d, g, w, c, $, T, S, k, R, E;
let n = class extends N {
  constructor() {
    super(), _(this, c), this._crawlData = [], _(this, d), _(this, g), _(this, w), this.scanRunning = !1, this._auditOverviews = [], this._topIssues = [], this.consumeContext(G, (e) => {
      y(this, w, e);
    }), this.consumeContext(I, (e) => {
      y(this, d, e), this.observe(e?.latestAuditOverview, (t) => {
        this._latestAuditOverview = t;
      }), this.observe(e?.auditOverviews, (t) => {
        this._auditOverviews = t || [];
      }), this.observe(e?.topIssues, (t) => {
        t && (this._topIssues = t.filter((a) => a.numberOfUrls != 0));
      }), this.observe(e?.healthScore, (t) => {
        this._healthScore = t;
      }), v(this, c, $).call(this);
    }), this.consumeContext(z, (e) => {
      y(this, g, e);
    });
  }
  async _openModal() {
    (await h(this, g)?.open(this, H, {
      data: {
        headline: "Ready to run an audit?"
      }
    })?.onSubmit())?.run && this.startAudit();
  }
  async startAudit() {
    const { stream: e } = await h(this, d).startCrawl();
    this.scanRunning = !0, this._crawlData = [], h(this, w)?.peek("positive", {
      data: {
        headline: "Crawl started",
        message: "You will be notified when it is complete."
      }
    });
    try {
      for await (const t of e)
        this._crawlData = [...this._crawlData, t];
      h(this, w)?.peek("default", {
        data: { headline: "Crawl completed", message: "You can now view the results." }
      });
    } catch (t) {
      h(this, w)?.peek("danger", {
        data: { headline: "Crawl failed", message: t.message ?? "Unknown error" }
      });
    } finally {
      this.scanRunning = !1, v(this, c, $).call(this);
      const t = await this.getContext(W);
      if (!t)
        throw new Error("Could not get the action event context");
      const a = new B({
        entityType: "audits-root",
        unique: null
      });
      t.dispatchEvent(a);
    }
  }
  render() {
    return u`
            <div id="main">
                ${v(this, c, S).call(this)}
                ${v(this, c, k).call(this)}
                ${v(this, c, R).call(this)}
                ${v(this, c, E).call(this)}
            </div>
        `;
  }
};
d = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
$ = function() {
  h(this, d)?.getLatestAuditOverview(), h(this, d)?.getAuditOverviews(), h(this, d)?.getTopIssues(), h(this, d)?.getHealthScore();
};
T = function() {
  if (this.scanRunning) {
    const e = this._crawlData.length, t = this._crawlData.filter((i) => i.crawled && !i.external && !i.asset).length, a = this._crawlData.filter((i) => i.crawled && i.external && !i.asset).length, r = this._crawlData.filter((i) => i.crawled && i.asset).length, s = this._crawlData.filter((i) => i.blocked).length;
    return u`
                <uui-loader-bar></uui-loader-bar>

                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>

                    <uui-table-row>
                        <uui-table-cell>URLs crawled:</uui-table-cell>
                        <uui-table-cell>${e}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Internal URLs:</uui-table-cell>
                        <uui-table-cell>${t}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>External URLs:</uui-table-cell>
                        <uui-table-cell>${a}</uui-table-cell>
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
    return this._latestAuditOverview?.runDate == null ? u`<p>No scan has been run yet</p>` : u`
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
S = function() {
  if (this._latestAuditOverview !== void 0)
    return u`
                <uui-box headline="Latest audit" class="span-2" style="${this._latestAuditOverview?.runDate != null || this.scanRunning ? "--uui-box-default-padding: 0;" : ""}">
                    <div slot="header">
                        ${this._latestAuditOverview?.runDate != null ? this.localize.date(this._latestAuditOverview.runDate, { dateStyle: "long", timeStyle: "short" }) : O}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this._openModal}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${v(this, c, T).call(this)}
                </uui-box>
            `;
};
k = function() {
  if (this._latestAuditOverview?.runDate != null && this._healthScore !== void 0)
    return u`
                <content-audit-health-score
                    .score=${this._healthScore.healthScore}
                    headline="Site health"
                ></content-audit-health-score>
            `;
};
R = function() {
  if (this._auditOverviews.length <= 1) return O;
  const e = this._auditOverviews.slice(0, 10).reverse(), t = 150, a = 100, r = e.map((l, o) => {
    const b = o / (e.length - 1) * a, m = t - (l.healthScore || 0) / 100 * t;
    return `${b},${m}`;
  }).join(" "), s = e[e.length - 1]?.healthScore || 0, i = s >= 90 ? "var(--uui-color-positive)" : s >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
  return u`
            <uui-box headline="Health Score Trend" class="span-3">
                <div class="chart-container">
                    <svg class="chart" viewBox="0 0 100 ${t}" preserveAspectRatio="none">
                        <!-- Grid lines with labels -->
                        ${[100, 90, 75, 50, 25, 0].map((l) => {
    const o = t - l / 100 * t;
    return u`
                                <line
                                    x1="0"
                                    y1="${o}"
                                    x2="100"
                                    y2="${o}"
                                    class="chart-grid-line ${l === 90 || l === 50 ? "chart-grid-line--threshold" : ""}"
                                />
                                <text x="1" y="${o - 0.5}" class="chart-grid-label">${l}</text>
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
                            d="M ${r.split(" ")[0]} L ${r} L ${a},${t} L 0,${t} Z"
                            fill="url(#chartGradient)"
                        />

                        <!-- Line chart -->
                        <polyline
                            points="${r}"
                            class="chart-line"
                            fill="none"
                            stroke="${i}"
                            stroke-width="0.5"
                        />

                        <!-- Data points -->
                        ${e.map((l, o) => {
    const b = o / (e.length - 1) * a, m = t - (l.healthScore || 0) / 100 * t, A = l.healthScore || 0, D = A >= 90 ? "var(--uui-color-positive)" : A >= 50 ? "var(--uui-color-warning)" : "var(--uui-color-danger)";
    return u`
                                <circle
                                    cx="${b}"
                                    cy="${m}"
                                    r="1"
                                    class="chart-point"
                                    fill="${D}"
                                />
                            `;
  })}
                    </svg>

                    <!-- Labels -->
                    <div class="chart-labels">
                        ${e.map((l) => {
    const o = l.healthScore || 0, b = o >= 90 ? "chart-label-score--success" : o >= 50 ? "chart-label-score--warning" : "chart-label-score--danger";
    return u`
                                <div class="chart-label">
                                    <div class="chart-label-date">
                                        ${l.runDate ? this.localize.date(l.runDate, { dateStyle: "short" }) : "N/A"}
                                    </div>
                                    <div class="chart-label-score ${b}">${o.toFixed(0)}</div>
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
    return u`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues} hide-summary></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
n.styles = [
  L`
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
p([
  f()
], n.prototype, "_crawlData", 2);
p([
  f()
], n.prototype, "scanRunning", 2);
p([
  f()
], n.prototype, "_latestAuditOverview", 2);
p([
  f()
], n.prototype, "_auditOverviews", 2);
p([
  f()
], n.prototype, "_topIssues", 2);
p([
  f()
], n.prototype, "_healthScore", 2);
n = p([
  U("content-audit-scan-view")
], n);
const tt = n;
export {
  n as ContentAuditScanViewElement,
  tt as default
};
//# sourceMappingURL=overview.element-B5YWzQUl.js.map
