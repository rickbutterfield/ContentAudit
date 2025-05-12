import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { IssueTypeConfigMap } from "../helpers";
import { css, customElement, html, LitElement, property } from "@umbraco-cms/backoffice/external/lit";

@customElement('content-audit-issue-type-label')
export class ContentAuditIssueTypeLabel extends UmbElementMixin(LitElement) {

    @property({ attribute: false })
    type: number = 0;

    override render() {
        if (this.type != 0) {
            const config = IssueTypeConfigMap[this.type - 1];
            return html`
                <uui-tag color=${config?.color}>
                    <uui-icon name="${config?.icon}"></uui-icon>
                    ${config?.label}
                </uui-tag>
            `;
        }
    }

    static styles = [
        css`
            uui-tag {
                font-size: 14px;

                uui-icon {
                    margin-right: 4px;
                }
            }
        `
    ]
}

export default ContentAuditIssueTypeLabel;

declare global {
    interface HTMLElementTagNameMap {
        ["content-audit-issue-type-label"]: ContentAuditIssueTypeLabel;
    }
}