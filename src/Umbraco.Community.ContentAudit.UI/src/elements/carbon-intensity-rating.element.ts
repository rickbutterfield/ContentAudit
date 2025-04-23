import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { customElement, html, LitElement, property } from "@umbraco-cms/backoffice/external/lit";
import { UUIInterfaceColor } from "@umbraco-cms/backoffice/external/uui";

@customElement('content-audit-carbon-intensity-label')
export class ContentAuditCarbonIntensityLabel extends UmbElementMixin(LitElement) {

    @property({ attribute: true })
    value: string = '';

    _getColour(): UUIInterfaceColor {
        if (this.value == "E" || this.value == "F") {
            return "danger";
        }
        else if (this.value == "D") {
            return "warning";
        }
        else return "positive";
    }

    render() {
        if (this.value != null) {
            return html`
                <uui-tag .color=${this._getColour()}>
                    ${this.value}
                </uui-tag>
            `
        }
    }
}

export default ContentAuditCarbonIntensityLabel;

declare global {
    interface HTMLElementTagNameMap {
        ["content-audit-carbon-intensity-label"]: ContentAuditCarbonIntensityLabel;
    }
}