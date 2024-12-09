import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbSectionViewElement } from "@umbraco-cms/backoffice/section";

@customElement('audit-section-view')
export class AuditSectionViewElement extends UmbLitElement implements UmbSectionViewElement {
    constructor() {
        super();
    }
    override render() {
        return html`<content-audit-workspace-root></content-audit-workspace-root>`;
    }
}

export default AuditSectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'audit-section-view': AuditSectionViewElement;
    }
}
