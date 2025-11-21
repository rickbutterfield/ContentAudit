import { UmbElementMixin as T } from "@umbraco-cms/backoffice/element-api";
import { LitElement as U, repeat as x, html as u, nothing as I, css as M, state as _, customElement as N } from "@umbraco-cms/backoffice/external/lit";
import { C as L, a as W } from "./index.js";
import { UmbModalToken as B, UMB_MODAL_MANAGER_CONTEXT as z } from "@umbraco-cms/backoffice/modal";
import "./run-warning-modal.element.js";
import { UMB_NOTIFICATION_CONTEXT as P } from "@umbraco-cms/backoffice/notification";
const G = new B("Umb.ContentAudit.Modal.RunWarning", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var V = Object.defineProperty, X = Object.getOwnPropertyDescriptor, S = (e) => {
  throw TypeError(e);
}, p = (e, t, a, s) => {
  for (var i = s > 1 ? void 0 : s ? X(t, a) : t, l = e.length - 1, w; l >= 0; l--)
    (w = e[l]) && (i = (s ? w(t, a, i) : w(i)) || i);
  return s && i && V(t, a, i), i;
}, A = (e, t, a) => t.has(e) || S("Cannot " + a), c = (e, t, a) => (A(e, t, "read from private field"), t.get(e)), v = (e, t, a) => t.has(e) ? S("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), g = (e, t, a, s) => (A(e, t, "write to private field"), t.set(e, a), a), h = (e, t, a) => (A(e, t, "access private method"), a), b, f, d, o, m, k, O, $, y;
let n = class extends T(U) {
  constructor() {
    super(), v(this, o), this.crawlData = [], v(this, b), v(this, f), v(this, d), this.scanRunning = !1, this._topIssues = [], this.consumeContext(P, (e) => {
      g(this, d, e);
    }), this.consumeContext(L, (e) => {
      g(this, b, e), this.observe(e == null ? void 0 : e.latestAuditOverview, (t) => {
        this._latestAuditOverview = t;
      }), this.observe(e == null ? void 0 : e.topIssues, (t) => {
        t && (this._topIssues = t.filter((a) => a.numberOfUrls != 0));
      }), this.observe(e == null ? void 0 : e.healthScore, (t) => {
        this._healthScore = t, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), h(this, o, m).call(this);
    }), this.consumeContext(z, (e) => {
      g(this, f, e);
    });
  }
  async _openModal() {
    var a;
    const e = (a = c(this, f)) == null ? void 0 : a.open(this, G, {
      data: {
        headline: "Ready to run an audit?"
      }
    }), t = await (e == null ? void 0 : e.onSubmit());
    t != null && t.run && this.startAudit();
  }
  async startAudit() {
    var t, a, s;
    const { stream: e } = await W.startCrawl();
    this.scanRunning = !0, this.crawlData = [], (t = c(this, d)) == null || t.peek("positive", {
      data: {
        headline: "Crawl started",
        message: "You will be notified when it is complete."
      }
    });
    try {
      for await (const i of e)
        this.crawlData.push(i), this.requestUpdate();
      debugger;
      (a = c(this, d)) == null || a.peek("default", {
        data: { headline: "Crawl completed", message: "You can now view the results." }
      });
    } catch (i) {
      debugger;
      (s = c(this, d)) == null || s.peek("danger", {
        data: { headline: "Crawl failed", message: i.message ?? "Unknown error" }
      });
    } finally {
      debugger;
      this.scanRunning = !1, h(this, o, m).call(this);
    }
  }
  _renderScanData() {
    if (this.crawlData.length !== 0) {
      const e = this.crawlData.length, t = this.crawlData.filter((l) => l.crawled && !l.external && !l.asset).length, a = this.crawlData.filter((l) => l.crawled && l.external && !l.asset).length, s = this.crawlData.filter((l) => l.crawled && l.asset).length, i = this.crawlData.filter((l) => l.blocked).length;
      return u`
                <uui-box headline="Debug scan data" class="span-3">
                    <p>Total: ${e}</p>
                    <p>Internal: ${t}</p>
                    <p>External: ${a}</p>
                    <p>Assets: ${s}</p>
                    <p>Blocked: ${i}</p>

                    ${x(
        this.crawlData,
        (l) => l.url,
        (l) => u`${JSON.stringify(l)}<br/>`
      )}
                </uui-box>
            `;
    }
  }
  render() {
    return u`
            <div id="main">
                ${h(this, o, O).call(this)}
                ${h(this, o, $).call(this)}
                
                ${h(this, o, y).call(this)}
            </div>
        `;
  }
};
b = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
m = function() {
  var e, t, a;
  (e = c(this, b)) == null || e.getLatestAuditOverview(), (t = c(this, b)) == null || t.getTopIssues(), (a = c(this, b)) == null || a.getHealthScore();
};
k = function() {
  var e, t, a, s, i, l;
  if (this.scanRunning) {
    const w = this.crawlData.length, D = this.crawlData.filter((r) => r.crawled && !r.external && !r.asset).length, C = this.crawlData.filter((r) => r.crawled && r.external && !r.asset).length, E = this.crawlData.filter((r) => r.crawled && r.asset).length, R = this.crawlData.filter((r) => r.blocked).length;
    return u`
                <uui-loader-bar></uui-loader-bar>

                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>

                    <uui-table-row>
                        <uui-table-cell>URLs crawled:</uui-table-cell>
                        <uui-table-cell>${w}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Internal URLs:</uui-table-cell>
                        <uui-table-cell>${D}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>External URLs:</uui-table-cell>
                        <uui-table-cell>${C}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Asset URLs:</uui-table-cell>
                        <uui-table-cell>${E}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Blocked URLs:</uui-table-cell>
                        <uui-table-cell>${R}</uui-table-cell>
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
                            <uui-table-cell>${(i = this._latestAuditOverview) == null ? void 0 : i.totalAssets}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Blocked URLs:</uui-table-cell>
                            <uui-table-cell>${(l = this._latestAuditOverview) == null ? void 0 : l.totalBlocked}</uui-table-cell>
                        </uui-table-row>
                    </uui-table>
                `;
};
O = function() {
  var e, t, a;
  if (this._latestAuditOverview !== void 0)
    return u`
                <uui-box headline="Latest audit" class="span-2" style="${((e = this._latestAuditOverview) == null ? void 0 : e.runDate) != null || this.scanRunning ? "--uui-box-default-padding: 0;" : ""}">
                    <div slot="header">
                        ${((t = this._latestAuditOverview) == null ? void 0 : t.runDate) != null ? this.localize.date((a = this._latestAuditOverview) == null ? void 0 : a.runDate, { dateStyle: "long", timeStyle: "short" }) : I}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this._openModal}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${h(this, o, k).call(this)}
                </uui-box>
            `;
};
$ = function() {
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
y = function() {
  if (this._topIssues.length !== 0)
    return u`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues}></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
n.styles = [
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
        `
];
p([
  _()
], n.prototype, "scanRunning", 2);
p([
  _()
], n.prototype, "_latestAuditOverview", 2);
p([
  _()
], n.prototype, "_topIssues", 2);
p([
  _()
], n.prototype, "_healthScore", 2);
p([
  _()
], n.prototype, "_pagesWithoutErrors", 2);
n = p([
  N("content-audit-scan-view")
], n);
const Q = n;
export {
  n as ContentAuditScanViewElement,
  Q as default
};
//# sourceMappingURL=overview.element.js.map
