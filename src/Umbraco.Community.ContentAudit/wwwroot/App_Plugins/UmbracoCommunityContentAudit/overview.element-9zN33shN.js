import { UmbElementMixin as x } from "@umbraco-cms/backoffice/element-api";
import { LitElement as R, html as l, css as D, state as v, customElement as L, nothing as C } from "@umbraco-cms/backoffice/external/lit";
import { C as U } from "./index-BpAvlXJv.js";
var I = Object.defineProperty, T = Object.getOwnPropertyDescriptor, S = (t) => {
  throw TypeError(t);
}, d = (t, e, s, o) => {
  for (var i = o > 1 ? void 0 : o ? T(e, s) : e, c = t.length - 1, p; c >= 0; c--)
    (p = t[c]) && (i = (o ? p(e, s, i) : p(i)) || i);
  return o && i && I(e, s, i), i;
}, f = (t, e, s) => e.has(t) || S("Cannot " + s), _ = (t, e, s) => (f(t, e, "read from private field"), e.get(t)), w = (t, e, s) => e.has(t) ? S("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), N = (t, e, s, o) => (f(t, e, "write to private field"), e.set(t, s), s), h = (t, e, s) => (f(t, e, "access private method"), s), u, n, g, m, b, A, y;
let a = class extends x(R) {
  constructor() {
    super(), w(this, n), this.crawlData = [], w(this, u), this.scanRunning = !1, this._topIssues = [], this.consumeContext(U, (t) => {
      N(this, u, t), this.observe(t.latestAuditOverview, (e) => {
        this._latestAuditOverview = e;
      }), this.observe(t.topIssues, (e) => {
        this._topIssues = e;
      }), this.observe(t.healthScore, (e) => {
        this._healthScore = e, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), h(this, n, g).call(this);
    });
  }
  startAudit() {
    const t = new EventSource("/umbraco/content-audit/api/v1/start-crawl");
    this.scanRunning = !0, this.crawlData = [], t.onmessage = (e) => {
      const s = JSON.parse(e.data);
      this.crawlData.push(s), this.requestUpdate();
    }, t.onerror = (e) => {
      t.readyState === EventSource.CLOSED ? console.log("EventSource connection closed by the server.") : console.error("EventSource encountered an error:", e), this.scanRunning = !1, h(this, n, g).call(this), t.close();
    };
  }
  render() {
    return l`
            <div id="main">
                ${h(this, n, b).call(this)}
                ${h(this, n, A).call(this)}
                ${h(this, n, y).call(this)}
            </div>
        `;
  }
};
u = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
g = function() {
  var t, e, s;
  (t = _(this, u)) == null || t.getLatestAuditOverview(), (e = _(this, u)) == null || e.getTopIssues(), (s = _(this, u)) == null || s.getHealthScore();
};
m = function() {
  var t, e, s, o, i, c;
  if (this.scanRunning) {
    const p = this.crawlData.length, E = this.crawlData.filter((r) => r.crawled && !r.external && !r.asset).length, O = this.crawlData.filter((r) => r.crawled && r.external && !r.asset).length, $ = this.crawlData.filter((r) => r.crawled && r.asset).length, k = this.crawlData.filter((r) => r.blocked).length;
    return l`
                <uui-loader-bar></uui-loader-bar>
                <p><strong>URLs found: </strong> ${p}</p>
                <p><strong>Internal URLs: </strong> ${E}</p>
                <p><strong>External URLs: </strong> ${O}</p>
                <p><strong>Asset URLs: </strong> ${$}</p>
                <p><strong>Blocked URLs: </strong> ${k}</p>
            `;
  } else
    return ((t = this._latestAuditOverview) == null ? void 0 : t.runDate) == null ? l`<p>No scan has been run yet</p>` : l`
                    <p><strong>URLs found: </strong> ${(e = this._latestAuditOverview) == null ? void 0 : e.total}</p>
                    <p><strong>Internal URLs: </strong> ${(s = this._latestAuditOverview) == null ? void 0 : s.totalInternal}</p>
                    <p><strong>External URLs: </strong> ${(o = this._latestAuditOverview) == null ? void 0 : o.totalExternal}</p>
                    <p><strong>Asset URLs: </strong> ${(i = this._latestAuditOverview) == null ? void 0 : i.totalAssets}</p>
                    <p><strong>Blocked URLs: </strong> ${(c = this._latestAuditOverview) == null ? void 0 : c.totalBlocked}</p>
                `;
};
b = function() {
  var t, e;
  if (this._latestAuditOverview !== void 0)
    return l`
                <uui-box headline="Latest audit" class="span-2">
                    <div slot="header">
                        ${((t = this._latestAuditOverview) == null ? void 0 : t.runDate) != null ? this.localize.date((e = this._latestAuditOverview) == null ? void 0 : e.runDate, { dateStyle: "long", timeStyle: "short" }) : C}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this.startAudit}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${h(this, n, m).call(this)}
                </uui-box>
            `;
};
A = function() {
  if (this._healthScore !== void 0) {
    let t = "score--danger";
    return this._healthScore.healthScore >= 90 && (t = "score--success"), this._healthScore.healthScore >= 50 && (t = "score--warning"), l`
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
y = function() {
  if (this._topIssues.length !== 0)
    return l`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues}></content-audit-issues-table-collection-view>
                </uui-box>
            `;
};
a.styles = [
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
], a.prototype, "scanRunning", 2);
d([
  v()
], a.prototype, "_latestAuditOverview", 2);
d([
  v()
], a.prototype, "_topIssues", 2);
d([
  v()
], a.prototype, "_healthScore", 2);
d([
  v()
], a.prototype, "_pagesWithoutErrors", 2);
a = d([
  L("content-audit-scan-view")
], a);
const P = a;
export {
  a as ContentAuditScanViewElement,
  P as default
};
//# sourceMappingURL=overview.element-9zN33shN.js.map
