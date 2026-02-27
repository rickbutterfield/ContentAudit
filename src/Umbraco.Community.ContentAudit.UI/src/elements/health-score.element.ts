import { css, customElement, html, nothing, property } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('content-audit-health-score')
export class ContentAuditHealthScoreElement extends UmbLitElement {

    @property({ type: Number })
    score: number = 0;

    @property({ type: String })
    headline: string = 'Health';

    #getScoreClass(): string {
        if (this.score >= 90) return 'score--success';
        if (this.score >= 50) return 'score--warning';
        return 'score--danger';
    }

    override render() {
        if (this.score === undefined || this.score === null) return nothing;

        return html`
            <uui-box .headline=${this.headline}>
                <div class="score">
                    <svg viewBox="0 0 36 36" class="score__inner ${this.#getScoreClass()}">
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

    static override styles = [
        css`
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
    ]
}

export default ContentAuditHealthScoreElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-health-score': ContentAuditHealthScoreElement;
    }
}
