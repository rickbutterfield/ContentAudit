import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { html, LitElement } from "@umbraco-cms/backoffice/external/lit";
import { customElement } from "lit/decorators.js";
import { ContentAuditWorkspaceContext } from "./workspace.context";

@customElement('content-audit-workspace-root')
export class ContentAuditWorkspaceRootElement extends UmbElementMixin(LitElement) {

	_workspaceContext: ContentAuditWorkspaceContext;

	constructor() {
		super();

		this._workspaceContext = new ContentAuditWorkspaceContext(this);
    }

	override render() {
		return html`
			<umb-workspace-editor headline="Audit" .enforceNoFooter=${true}>
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