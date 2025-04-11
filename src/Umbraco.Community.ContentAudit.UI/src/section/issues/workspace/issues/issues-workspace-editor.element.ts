import { customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT } from "./issues-workspace.context";
import { UMB_WORKSPACE_PATH_PATTERN } from "@umbraco-cms/backoffice/workspace";
import { IssueDto } from "../../../../api";

@customElement('content-audit-issues-workspace-editor')
export class ContentAuditIssuesWorkspaceEditorElement extends UmbLitElement {
	#workspaceContext?: typeof CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT.TYPE;

	@state()
	_data?: IssueDto;

	constructor() {
		super();

		this.consumeContext(CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance;

			this.observe(this.#workspaceContext.data, (data) => {
				this._data = data;
			})
		});
	}


	override render() {
		if (this._data) {
			return html`
				<umb-workspace-editor back-path="${CONTENT_AUDIT_ISSUES_ROOT_WORKSPACE_PATH}" .enforceNoFooter="${true}">
					<div slot="header">
						<h3 id="headline">${this._data.name}</h3>
					</div>
				</umb-workspace-editor>
			`;
		}
	}
}

export default ContentAuditIssuesWorkspaceEditorElement;

export const CONTENT_AUDIT_ISSUES_ROOT_WORKSPACE_PATH = UMB_WORKSPACE_PATH_PATTERN.generateAbsolute({
	sectionName: 'audit',
	entityType: 'issues-root',
});


declare global {
	interface HTMLElementTagNameMap {
		'content-audit-issues-workspace-editor': ContentAuditIssuesWorkspaceEditorElement;
	}
}
