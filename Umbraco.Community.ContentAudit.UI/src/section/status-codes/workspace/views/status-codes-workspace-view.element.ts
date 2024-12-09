import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('status-codes-audit-workspace')
export class AuditStatusCodesWorkspaceElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout headline="Status Codes">
            </umb-body-layout>
        `
    }

    static styles = [
        css`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}
        `,
    ];
}

export default AuditStatusCodesWorkspaceElement;

declare global {
    interface HTMLElementTagNameMap {
        'status-codes-audit-workspace': AuditStatusCodesWorkspaceElement;
    }
}