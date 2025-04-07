import { UmbElementMixin as k } from "@umbraco-cms/backoffice/element-api";
import { LitElement as R, html as o, css as D, state as v, customElement as L, nothing as C } from "@umbraco-cms/backoffice/external/lit";
import { C as U } from "./index-BCc-rpq4.js";
var I = Object.defineProperty, T = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, d = (e, t, l, u) => {
  for (var a = u > 1 ? void 0 : u ? T(t, l) : t, n = e.length - 1, b; n >= 0; n--)
    (b = e[n]) && (a = (u ? b(t, l, a) : b(a)) || a);
  return u && a && I(t, l, a), a;
}, w = (e, t, l) => t.has(e) || g("Cannot " + l), p = (e, t, l) => (w(e, t, "read from private field"), t.get(e)), f = (e, t, l) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, l), N = (e, t, l, u) => (w(e, t, "write to private field"), t.set(e, l), l), c = (e, t, l) => (w(e, t, "access private method"), l), h, r, _, m, S, y, x;
let s = class extends k(R) {
  constructor() {
    super(), f(this, r), this.crawlData = [], f(this, h), this.scanRunning = !1, this._topIssues = [], this.consumeContext(U, (e) => {
      N(this, h, e), this.observe(e.latestAuditOverview, (t) => {
        this._latestAuditOverview = t;
      }), this.observe(e.topIssues, (t) => {
        this._topIssues = t;
      }), this.observe(e.healthScore, (t) => {
        this._healthScore = t, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), c(this, r, _).call(this);
    });
  }
  startAudit() {
    const e = new EventSource("/umbraco/content-audit/api/v1/start-crawl");
    this.scanRunning = !0, this.crawlData = [], e.onmessage = (t) => {
      const l = JSON.parse(t.data);
      this.crawlData.push(l), this.requestUpdate();
    }, e.onerror = (t) => {
      e.readyState === EventSource.CLOSED ? console.log("EventSource connection closed by the server.") : console.error("EventSource encountered an error:", t), this.scanRunning = !1, c(this, r, _).call(this), e.close();
    };
  }
  render() {
    return o`
            <div id="main">
                ${c(this, r, S).call(this)}
                ${c(this, r, y).call(this)}
                ${c(this, r, x).call(this)}
            </div>
        `;
  }
};
h = /* @__PURE__ */ new WeakMap();
r = /* @__PURE__ */ new WeakSet();
_ = function() {
  var e, t, l;
  (e = p(this, h)) == null || e.getLatestAuditOverview(), (t = p(this, h)) == null || t.getTopIssues(), (l = p(this, h)) == null || l.getHealthScore();
};
m = function() {
  var e, t, l, u, a, n;
  if (this.scanRunning) {
    const b = this.crawlData.length, A = this.crawlData.filter((i) => i.crawled && !i.external && !i.asset).length, E = this.crawlData.filter((i) => i.crawled && i.external && !i.asset).length, O = this.crawlData.filter((i) => i.crawled && i.asset).length, $ = this.crawlData.filter((i) => i.blocked).length;
    return o`
                <uui-loader-bar></uui-loader-bar>

                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column style="text-align: right;"></uui-table-column>

                    <uui-table-row>
                        <uui-table-cell>URLs crawled:</uui-table-cell>
                        <uui-table-cell>${b}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Internal URLs:</uui-table-cell>
                        <uui-table-cell>${A}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>External URLs:</uui-table-cell>
                        <uui-table-cell>${E}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Asset URLs:</uui-table-cell>
                        <uui-table-cell>${O}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Blocked URLs:</uui-table-cell>
                        <uui-table-cell>${$}</uui-table-cell>
                    </uui-table-row>
                </uui-table>
            `;
  } else
    return ((e = this._latestAuditOverview) == null ? void 0 : e.runDate) == null ? o`<p>No scan has been run yet</p>` : o`
                    <uui-table>
                        <uui-table-column></uui-table-column>
                        <uui-table-column style="text-align: right;"></uui-table-column>

                        <uui-table-row>
                            <uui-table-cell>Total URLs:</uui-table-cell>
                            <uui-table-cell>${(t = this._latestAuditOverview) == null ? void 0 : t.total}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Internal URLs:</uui-table-cell>
                            <uui-table-cell>${(l = this._latestAuditOverview) == null ? void 0 : l.totalInternal}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>External URLs:</uui-table-cell>
                            <uui-table-cell>${(u = this._latestAuditOverview) == null ? void 0 : u.totalExternal}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Asset URLs:</uui-table-cell>
                            <uui-table-cell>${(a = this._latestAuditOverview) == null ? void 0 : a.totalAssets}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Blocked URLs:</uui-table-cell>
                            <uui-table-cell>${(n = this._latestAuditOverview) == null ? void 0 : n.totalBlocked}</uui-table-cell>
                        </uui-table-row>
                    </uui-table>
                `;
};
S = function() {
  var e, t;
  if (this._latestAuditOverview !== void 0)
    return o`
                <uui-box headline="Latest audit" class="span-2" style="--uui-box-default-padding: 0;">
                    <div slot="header">
                        ${((e = this._latestAuditOverview) == null ? void 0 : e.runDate) != null ? this.localize.date((t = this._latestAuditOverview) == null ? void 0 : t.runDate, { dateStyle: "long", timeStyle: "short" }) : C}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this.startAudit}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${c(this, r, m).call(this)}
                </uui-box>
            `;
};
y = function() {
  if (this._healthScore !== void 0) {
    let e = "score--danger";
    return this._healthScore.healthScore >= 90 && (e = "score--success"), this._healthScore.healthScore >= 50 && (e = "score--warning"), o`
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
    return o`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues}></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
s.styles = [
  D`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }

            #main {
                display: grid;
                gap: var(--uui-size-space-5); 
                grid-template-columns: repeat(3, 1fr);
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
                font-weight: 700;
            }

            @keyframes progress {
                0% {
                    stroke-dasharray: 0 100;
                }
            }
        `
];
d([
  v()
], s.prototype, "scanRunning", 2);
d([
  v()
], s.prototype, "_latestAuditOverview", 2);
d([
  v()
], s.prototype, "_topIssues", 2);
d([
  v()
], s.prototype, "_healthScore", 2);
d([
  v()
], s.prototype, "_pagesWithoutErrors", 2);
s = d([
  L("content-audit-scan-view")
], s);
const P = s;
export {
  s as ContentAuditScanViewElement,
  P as default
};
//# sourceMappingURL=overview.element-C-ONb8wH.js.map
