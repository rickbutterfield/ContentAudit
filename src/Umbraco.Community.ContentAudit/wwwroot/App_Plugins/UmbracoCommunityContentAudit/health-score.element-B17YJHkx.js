import { css as p, property as h, customElement as d, nothing as f, html as v } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
var m = Object.defineProperty, x = Object.getOwnPropertyDescriptor, u = (r) => {
  throw TypeError(r);
}, l = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? x(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && m(e, t, s), s;
}, w = (r, e, t) => e.has(r) || u("Cannot " + t), y = (r, e, t) => e.has(r) ? u("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), $ = (r, e, t) => (w(r, e, "access private method"), t), c, _;
let o = class extends g {
  constructor() {
    super(...arguments), y(this, c), this.score = 0, this.headline = "Health";
  }
  render() {
    return this.score === void 0 || this.score === null ? f : v`
            <uui-box .headline=${this.headline}>
                <div class="score">
                    <svg viewBox="0 0 36 36" class="score__inner ${$(this, c, _).call(this)}">
                        <path class="score__bg"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path class="score__fill"
                            stroke-dasharray="${this.score}, 100"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <p class="score__text">${this.score.toFixed(0)} / 100</p>
                </div>
            </uui-box>
        `;
  }
};
c = /* @__PURE__ */ new WeakSet();
_ = function() {
  return this.score >= 90 ? "score--success" : this.score >= 50 ? "score--warning" : "score--danger";
};
o.styles = [
  p`
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
                stroke: var(--uui-color-border);
                stroke-width: 1.75;
            }

            .score__fill {
                fill: none;
                stroke: var(--uui-color-text);
                stroke-width: 1.75;
                stroke-linecap: round;
                animation: progress 1000ms ease-out forwards;
            }

            .score--danger .score__fill {
                stroke: var(--uui-color-danger);
            }

            .score--warning .score__fill {
                stroke: var(--uui-color-warning);
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
l([
  h({ type: Number })
], o.prototype, "score", 2);
l([
  h({ type: String })
], o.prototype, "headline", 2);
o = l([
  d("content-audit-health-score")
], o);
//# sourceMappingURL=health-score.element-B17YJHkx.js.map
