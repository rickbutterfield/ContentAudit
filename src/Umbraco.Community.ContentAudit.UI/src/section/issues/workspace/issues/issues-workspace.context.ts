import { UmbContextBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbWorkspaceRouteManager } from "@umbraco-cms/backoffice/workspace";
import ContentAuditIssuesWorkspaceEditorElement from "./issues-workspace-editor.element";
import ContentAuditIssuesDetailRepository from "../../repository/detail/issues-detail.repository";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { IssueDto } from "../../../../api";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_ALIAS } from "../constants";

export class ContentAuditIssuesWorkspaceContext extends UmbContextBase {

	public readonly workspaceAlias = CONTENT_AUDIT_ISSUES_WORKSPACE_ALIAS;
	public readonly repository = new ContentAuditIssuesDetailRepository(this);

	#data = new UmbObjectState<IssueDto | undefined>(undefined);
	readonly data = this.#data.asObservable();

	readonly unique = this.#data.asObservablePart((data) => data?.unique);

	readonly routes = new UmbWorkspaceRouteManager(this);

	constructor(host: UmbControllerHost) {
		super(host, CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT);

		this.routes.setRoutes([
			{
				path: 'edit/:unique',
				component: ContentAuditIssuesWorkspaceEditorElement,
				setup: (_component, info) => {
					const unique = info.match.params.unique;
					this.load(unique);
				},
			},
		]);
	}

	async load(unique: string) {
		const { data } = await this.repository.requestByUnique(unique);

		if (data) {
			this.#data.setValue(data);
		}
	}

	getData() {
		return this.#data.getValue();
	}

	getUnique() {
		return this.getData()?.unique;
	}

	getEntityType() {
		return 'issues';
	}

	public override destroy(): void {
		this.#data.destroy();
		super.destroy();
	}
}

export { ContentAuditIssuesWorkspaceContext as api };

export const CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT = new UmbContextToken<any, ContentAuditIssuesWorkspaceContext>(
	'UmbWorkspaceContext',
	undefined,
	(context): context is ContentAuditIssuesWorkspaceContext => context.getEntityType?.() === 'issues',
);
