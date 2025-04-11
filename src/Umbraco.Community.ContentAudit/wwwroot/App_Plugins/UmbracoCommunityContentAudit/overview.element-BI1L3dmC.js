import { UmbElementMixin as R } from "@umbraco-cms/backoffice/element-api";
import { LitElement as T, repeat as C, html as u, nothing as U, css as L, state as p, customElement as I } from "@umbraco-cms/backoffice/external/lit";
import { C as M } from "./index-CKBR_9pg.js";
import { UmbModalToken as N, UMB_MODAL_MANAGER_CONTEXT as W } from "@umbraco-cms/backoffice/modal";
import "./run-warning-modal.element-ChWzi2bA.js";
const B = new N("Umb.ContentAudit.Modal.RunWarning", {
  modal: {
    type: "dialog",
    size: "small"
  }
});
var z = Object.defineProperty, P = Object.getOwnPropertyDescriptor, S = (e) => {
  throw TypeError(e);
}, d = (e, t, a, r) => {
  for (var i = r > 1 ? void 0 : r ? P(t, a) : t, l = e.length - 1, b; l >= 0; l--)
    (b = e[l]) && (i = (r ? b(t, a, i) : b(i)) || i);
  return r && i && z(t, a, i), i;
}, g = (e, t, a) => t.has(e) || S("Cannot " + a), _ = (e, t, a) => (g(e, t, "read from private field"), t.get(e)), v = (e, t, a) => t.has(e) ? S("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), m = (e, t, a, r) => (g(e, t, "write to private field"), t.set(e, a), a), c = (e, t, a) => (g(e, t, "access private method"), a), h, w, n, f, A, $, O, y;
let o = class extends R(T) {
  constructor() {
    super(), v(this, n), this.crawlData = [], v(this, h), v(this, w), this.scanRunning = !1, this._topIssues = [], this.consumeContext(M, (e) => {
      m(this, h, e), this.observe(e.latestAuditOverview, (t) => {
        this._latestAuditOverview = t;
      }), this.observe(e.topIssues, (t) => {
        this._topIssues = t;
      }), this.observe(e.healthScore, (t) => {
        this._healthScore = t, this._healthScore != null && (this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors);
      }), c(this, n, f).call(this);
    }), this.consumeContext(W, (e) => {
      m(this, w, e);
    });
  }
  async _openModal() {
    var a;
    const e = (a = _(this, w)) == null ? void 0 : a.open(this, B, {
      data: {
        headline: "Ready to run an audit?"
      }
    }), t = await (e == null ? void 0 : e.onSubmit());
    t != null && t.run && this.startAudit();
  }
  startAudit() {
    const e = new EventSource("/umbraco/content-audit/api/v1/start-crawl");
    this.scanRunning = !0, this.crawlData = [], e.onmessage = (t) => {
      const a = JSON.parse(t.data);
      this.crawlData.push(a), this.requestUpdate();
    }, e.onerror = (t) => {
      e.readyState === EventSource.CLOSED ? console.log("EventSource connection closed by the server.") : console.error("EventSource encountered an error:", t), this.scanRunning = !1, c(this, n, f).call(this), e.close();
    };
  }
  _renderScanData() {
    if (this.crawlData.length !== 0) {
      const e = this.crawlData.length, t = this.crawlData.filter((l) => l.crawled && !l.external && !l.asset).length, a = this.crawlData.filter((l) => l.crawled && l.external && !l.asset).length, r = this.crawlData.filter((l) => l.crawled && l.asset).length, i = this.crawlData.filter((l) => l.blocked).length;
      return u`
                <uui-box headline="Debug scan data" class="span-3">
                    <p>Total: ${e}</p>
                    <p>Internal: ${t}</p>
                    <p>External: ${a}</p>
                    <p>Assets: ${r}</p>
                    <p>Blocked: ${i}</p>

                    ${C(
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
                ${c(this, n, O).call(this)}
                ${c(this, n, y).call(this)}
            </div>
        `;
  }
};
h = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
f = function() {
  var e, t, a;
  (e = _(this, h)) == null || e.getLatestAuditOverview(), (t = _(this, h)) == null || t.getTopIssues(), (a = _(this, h)) == null || a.getHealthScore();
};
A = function() {
  var e, t, a, r, i, l;
  if (this.scanRunning) {
    const b = this.crawlData.length, D = this.crawlData.filter((s) => s.crawled && !s.external && !s.asset).length, E = this.crawlData.filter((s) => s.crawled && s.external && !s.asset).length, k = this.crawlData.filter((s) => s.crawled && s.asset).length, x = this.crawlData.filter((s) => s.blocked).length;
    return u`
                <uui-loader-bar></uui-loader-bar>

                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>

                    <uui-table-row>
                        <uui-table-cell>URLs crawled:</uui-table-cell>
                        <uui-table-cell>${b}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Internal URLs:</uui-table-cell>
                        <uui-table-cell>${D}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>External URLs:</uui-table-cell>
                        <uui-table-cell>${E}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Asset URLs:</uui-table-cell>
                        <uui-table-cell>${k}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Blocked URLs:</uui-table-cell>
                        <uui-table-cell>${x}</uui-table-cell>
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
                            <uui-table-cell>${(r = this._latestAuditOverview) == null ? void 0 : r.totalExternal}</uui-table-cell>
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
$ = function() {
  var e, t, a;
  if (this._latestAuditOverview !== void 0)
    return u`
                <uui-box headline="Latest audit" class="span-2" style="${((e = this._latestAuditOverview) == null ? void 0 : e.runDate) != null || this.scanRunning ? "--uui-box-default-padding: 0;" : ""}">
                    <div slot="header">
                        ${((t = this._latestAuditOverview) == null ? void 0 : t.runDate) != null ? this.localize.date((a = this._latestAuditOverview) == null ? void 0 : a.runDate, { dateStyle: "long", timeStyle: "short" }) : U}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this._openModal}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${c(this, n, A).call(this)}
                </uui-box>
            `;
};
O = function() {
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
o.styles = [
  L`
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
d([
  p()
], o.prototype, "scanRunning", 2);
d([
  p()
], o.prototype, "_latestAuditOverview", 2);
d([
  p()
], o.prototype, "_topIssues", 2);
d([
  p()
], o.prototype, "_healthScore", 2);
d([
  p()
], o.prototype, "_pagesWithoutErrors", 2);
o = d([
  I("content-audit-scan-view")
], o);
const X = o;
export {
  o as ContentAuditScanViewElement,
  X as default
};
//# sourceMappingURL=overview.element-BI1L3dmC.js.map
