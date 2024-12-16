import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { customElement, html, LitElement, nothing, property } from "@umbraco-cms/backoffice/external/lit";

@customElement('content-audit-status-code-label')
export class ContentAuditStatusCodeLabel extends UmbElementMixin(LitElement) {

    @property({ attribute: false })
    statusCode?: number;

    _getColor(statusCode: number): string {
        if (statusCode >= 200 && statusCode < 300) {
            return "positive";
        }

        if (statusCode >= 300 && statusCode < 400) {
            return "warning";
        }

        if (statusCode >= 400 && statusCode < 600) {
            return "danger";
        }

        return "default";
    }

    override render() {
        if (this.statusCode !== undefined) {
            if (this.statusCode != 0) {
                return html`<uui-tag color=${this._getColor(this.statusCode)}>${this.statusCode}</uui-tag>`
            }
        }

        return nothing;
    }
}

export default ContentAuditStatusCodeLabel;

declare global {
    interface HTMLElementTagNameMap {
        ["content-audit-status-code-label"]: ContentAuditStatusCodeLabel;
    }
}