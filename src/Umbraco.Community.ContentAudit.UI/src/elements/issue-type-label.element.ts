import { IssueTypeConfigMap } from "../helpers";
import { css, customElement, html, property } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('content-audit-issue-type-label')
export class ContentAuditIssueTypeLabel extends UmbLitElement {

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
                font-size: var(--uui-type-default-size);

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