import { css, customElement, html, property } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { MetricDto, MetricName, MetricRating } from "../api";
import { UUIInterfaceColor } from "@umbraco-cms/backoffice/external/uui";

@customElement('content-audit-metric-label')
export class ContentAuditMetricLabel extends UmbLitElement {

    @property({ attribute: false })
    value?: MetricDto;

    _getColour(): UUIInterfaceColor {
        if (this.value != null) {
            if (this.value.rating == MetricRating.POOR) {
                return "danger";
            }
            else if (this.value.rating == MetricRating.NEEDS_IMPROVEMENT) {
                return "warning";
            }
            else return "positive";
        }
        else return "positive";
    }

    _formatValue(): string {
        if (this.value != null) {
            if (this.value.name == MetricName.CLS) {
                return this.value.value.toFixed(3);
            }
            else {
                let seconds = (this.value.value / 1000) % 60;
                return `${seconds.toFixed(2)}s`;
            }
        }
        else return "";
    }

    override render() {
        if (this.value != null) {
            return html`
                <uui-tag .color=${this._getColour()}>
                    ${this._formatValue()}
                </uui-tag>
            `;
        }
    }

    static styles = [
        css`
            uui-tag {
                font-size: var(--uui-type-default-size);
            }
        `
    ]
}

export default ContentAuditMetricLabel;

declare global {
    interface HTMLElementTagNameMap {
        ["content-audit-metric-label"]: ContentAuditMetricLabel;
    }
}