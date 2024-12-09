import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('duplicate-content-audit-workspace')
export class AuditDuplicateContentWorkspaceElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout headline="Duplicate Content">
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

export default AuditDuplicateContentWorkspaceElement;

declare global {
    interface HTMLElementTagNameMap {
        'duplicate-content-audit-workspace': AuditDuplicateContentWorkspaceElement;
    }
}