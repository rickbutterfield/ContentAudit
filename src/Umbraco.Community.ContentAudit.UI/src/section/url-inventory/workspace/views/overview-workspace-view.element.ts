import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('overview-audit-workspace')
export class AuditOverviewWorkspaceElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout headline="URL Inventory">
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

export default AuditOverviewWorkspaceElement;

declare global {
    interface HTMLElementTagNameMap {
        'overview-audit-workspace': AuditOverviewWorkspaceElement;
    }
}