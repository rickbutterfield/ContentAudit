import { html } from "@umbraco-cms/backoffice/external/lit";
import { customElement } from "lit/decorators.js";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import ContentAuditContext from "../context/audit.context";

@customElement('content-audit-workspace-root')
export class ContentAuditWorkspaceRootElement extends UmbLitElement {

	_workspaceContext: ContentAuditContext;

	constructor() {
		super();

		this._workspaceContext = new ContentAuditContext(this);
    }

	override render() {
		return html`
			<umb-workspace-editor headline="ContentAudit" .enforceNoFooter=${true}>
			</umb-workspace-editor>
		`;
	}
}

export default ContentAuditWorkspaceRootElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-workspace-root': ContentAuditWorkspaceRootElement;
    }
}