import { customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT } from "./audits-workspace.context";
import { UMB_WORKSPACE_PATH_PATTERN } from "@umbraco-cms/backoffice/workspace";

@customElement('content-audit-audits-workspace-editor')
export class ContentAuditAuditsWorkspaceEditorElement extends UmbLitElement {
	#workspaceContext?: typeof CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT.TYPE;

	@state()
	_data?: any;

	constructor() {
		super();

		this.consumeContext(CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance;

			this.observe(this.#workspaceContext?.data, (data) => {
				this._data = data;
			});
		});
	}

	override render() {
		if (this._data) {
			return html`
				<umb-workspace-editor back-path="${CONTENT_AUDIT_AUDITS_ROOT_WORKSPACE_PATH}/edit/null" .enforceNoFooter="${true}">
					<div slot="header">
						<h3 id="headline">Audit Details</h3>
					</div>
					<slot></slot>
				</umb-workspace-editor>
			`;
		}
	}
}

export default ContentAuditAuditsWorkspaceEditorElement;

export const CONTENT_AUDIT_AUDITS_ROOT_WORKSPACE_PATH = UMB_WORKSPACE_PATH_PATTERN.generateAbsolute({
	sectionName: 'audit',
	entityType: 'audits-root',
});

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-audits-workspace-editor': ContentAuditAuditsWorkspaceEditorElement;
	}
}
