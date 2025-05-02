import { UmbElementMixin as R } from "@umbraco-cms/backoffice/element-api";
import { LitElement as T, repeat as U, html as u, nothing as I, css as N, state as w, customElement as L } from "@umbraco-cms/backoffice/external/lit";
import { C as M } from "./index-D3Uy3Ios.js";
import { UmbModalToken as W, UMB_MODAL_MANAGER_CONTEXT as B } from "@umbraco-cms/backoffice/modal";
import "./run-warning-modal.element-BDy4ZiQN.js";
import { UMB_NOTIFICATION_CONTEXT as z } from "@umbraco-cms/backoffice/notification";
const P = new W("Umb.ContentAudit.Modal.RunWarning", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var G = Object.defineProperty, V = Object.getOwnPropertyDescriptor, A = (e) => {
  throw TypeError(e);
}, b = (e, t, a, i) => {
  for (var s = i > 1 ? void 0 : i ? V(t, a) : t, l = e.length - 1, p; l >= 0; l--)
    (p = e[l]) && (s = (i ? p(t, a, s) : p(s)) || s);
  return i && s && G(t, a, s), s;
}, S = (e, t, a) => t.has(e) || A("Cannot " + a), h = (e, t, a) => (S(e, t, "read from private field"), t.get(e)), v = (e, t, a) => t.has(e) ? A("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), g = (e, t, a, i) => (S(e, t, "write to private field"), t.set(e, a), a), c = (e, t, a) => (S(e, t, "access private method"), a), d, f, _, n, m, O, $, k, x;
let o = class extends R(T) {
  constructor() {
    super(), v(this, n), this.crawlData = [], v(this, d), v(this, f), v(this, _), this.scanRunning = !1, this._topIssues = [], this.consumeContext(z, (e) => {
      g(this, _, e);
    }), this.consumeContext(M, (e) => {
      g(this, d, e), this.observe(e.latestAuditOverview, (t) => {
        this._latestAuditOverview = t;
      }), this.observe(e.topIssues, (t) => {
        this._topIssues = t.filter((a) => a.numberOfUrls != 0);
      }), this.observe(e.healthScore, (t) => {
        this._healthScore = t, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), c(this, n, m).call(this);
    }), this.consumeContext(B, (e) => {
      g(this, f, e);
    });
  }
  async _openModal() {
    var a;
    const e = (a = h(this, f)) == null ? void 0 : a.open(this, P, {
      data: {
        headline: "Ready to run an audit?"
      }
    }), t = await (e == null ? void 0 : e.onSubmit());
    t != null && t.run && this.startAudit();
  }
  startAudit() {
    var t;
    const e = new EventSource("/umbraco/content-audit/api/v1/start-crawl");
    this.scanRunning = !0, this.crawlData = [], (t = h(this, _)) == null || t.peek("positive", {
      data: {
        headline: "Crawl started",
        message: "You will be notified when it is complete."
      }
    }), e.onmessage = (a) => {
      const i = JSON.parse(a.data);
      this.crawlData.push(i), this.requestUpdate();
    }, e.onerror = (a) => {
      var i;
      e.readyState === EventSource.CLOSED ? console.log("EventSource connection closed by the server.") : console.error("EventSource encountered an error:", a), this.scanRunning = !1, c(this, n, m).call(this), (i = h(this, _)) == null || i.peek("default", {
        data: {
          headline: "Crawl completed",
          message: "You can now view the results."
        }
      }), e.close();
    };
  }
  _renderScanData() {
    if (this.crawlData.length !== 0) {
      const e = this.crawlData.length, t = this.crawlData.filter((l) => l.crawled && !l.external && !l.asset).length, a = this.crawlData.filter((l) => l.crawled && l.external && !l.asset).length, i = this.crawlData.filter((l) => l.crawled && l.asset).length, s = this.crawlData.filter((l) => l.blocked).length;
      return u`
                <uui-box headline="Debug scan data" class="span-3">
                    <p>Total: ${e}</p>
                    <p>Internal: ${t}</p>
                    <p>External: ${a}</p>
                    <p>Assets: ${i}</p>
                    <p>Blocked: ${s}</p>

                    ${U(
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
                ${c(this, n, $).call(this)}
                ${c(this, n, k).call(this)}
                
                ${c(this, n, x).call(this)}
            </div>
        `;
  }
};
d = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
m = function() {
  var e, t, a;
  (e = h(this, d)) == null || e.getLatestAuditOverview(), (t = h(this, d)) == null || t.getTopIssues(), (a = h(this, d)) == null || a.getHealthScore();
};
O = function() {
  var e, t, a, i, s, l;
  if (this.scanRunning) {
    const p = this.crawlData.length, y = this.crawlData.filter((r) => r.crawled && !r.external && !r.asset).length, D = this.crawlData.filter((r) => r.crawled && r.external && !r.asset).length, E = this.crawlData.filter((r) => r.crawled && r.asset).length, C = this.crawlData.filter((r) => r.blocked).length;
    return u`
                <uui-loader-bar></uui-loader-bar>

                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>

                    <uui-table-row>
                        <uui-table-cell>URLs crawled:</uui-table-cell>
                        <uui-table-cell>${p}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Internal URLs:</uui-table-cell>
                        <uui-table-cell>${y}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>External URLs:</uui-table-cell>
                        <uui-table-cell>${D}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Asset URLs:</uui-table-cell>
                        <uui-table-cell>${E}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Blocked URLs:</uui-table-cell>
                        <uui-table-cell>${C}</uui-table-cell>
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
                            <uui-table-cell>${(i = this._latestAuditOverview) == null ? void 0 : i.totalExternal}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Asset URLs:</uui-table-cell>
                            <uui-table-cell>${(s = this._latestAuditOverview) == null ? void 0 : s.totalAssets}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Blocked URLs:</uui-table-cell>
                            <uui-table-cell>${(l = this._latestAuditOverview) == null ? void 0 : l.totalBlocked}</uui-table-cell>
                        </uui-table-row>
                    </uui-table>
                `;
};
$ = function() {
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

                    ${c(this, n, O).call(this)}
                </uui-box>
            `;
};
k = function() {
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
x = function() {
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
], o.prototype, "_topIssues", 2);
b([
  w()
], o.prototype, "_healthScore", 2);
b([
  w()
], o.prototype, "_pagesWithoutErrors", 2);
o = b([
  L("content-audit-scan-view")
], o);
const q = o;
export {
  o as ContentAuditScanViewElement,
  q as default
};
//# sourceMappingURL=overview.element-DZXAB17b.js.map
