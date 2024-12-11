import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { css, html, LitElement } from "@umbraco-cms/backoffice/external/lit";
import { customElement, property } from "lit/decorators.js";
import { IssuePriorityConfigMap } from "../helpers";

@customElement('content-audit-priority-type-label')
export class ContentAuditPriorityTypeLabel extends UmbElementMixin(LitElement) {

    @property({ attribute: false })
    type: number = 0;

    override render() {
        if (this.type != 0) {
            const config = IssuePriorityConfigMap[this.type - 1];
            return html`
                <uui-tag color=${config.color}>
                    <uui-icon name="${config.icon}"></uui-icon>
                    ${config.label}
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

export default ContentAuditPriorityTypeLabel;

declare global {
    interface HTMLElementTagNameMap {
        ["content-audit-priority-type-label"]: ContentAuditPriorityTypeLabel;
    }
}