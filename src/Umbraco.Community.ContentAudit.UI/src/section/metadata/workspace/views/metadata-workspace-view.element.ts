import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('metadata-audit-workspace')
export class AuditMetadataWorkspaceElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout headline="Metadata">
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

export default AuditMetadataWorkspaceElement;

declare global {
    interface HTMLElementTagNameMap {
        'metadata-audit-workspace': AuditMetadataWorkspaceElement;
    }
}