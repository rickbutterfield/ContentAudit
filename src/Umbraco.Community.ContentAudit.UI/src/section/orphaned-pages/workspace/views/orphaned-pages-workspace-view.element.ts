import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('orphaned-pages-audit-workspace')
export class AuditOrphanedPagesWorkspaceElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout headline="Orphaned Pages">
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

export default AuditOrphanedPagesWorkspaceElement;

declare global {
    interface HTMLElementTagNameMap {
        'orphaned-pages-audit-workspace': AuditOrphanedPagesWorkspaceElement;
    }
}