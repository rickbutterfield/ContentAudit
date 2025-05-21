import { UmbContextBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbWorkspaceRouteManager } from "@umbraco-cms/backoffice/workspace";
import ContentAuditAllPagesWorkspaceEditorElement from "./all-pages-workspace-editor.element";
import ContentAuditAllPagesDetailRepository from "../../repository/detail/all-pages-detail.repository";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { HealthScoreDto, PageAnalysisDto } from "../../../../api";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_ALIAS } from "../constants";

export class ContentAuditAllPagesWorkspaceContext extends UmbContextBase {

	public readonly workspaceAlias = CONTENT_AUDIT_ALL_PAGES_WORKSPACE_ALIAS;
	public readonly repository = new ContentAuditAllPagesDetailRepository(this);

	#data = new UmbObjectState<PageAnalysisDto | undefined>(undefined);
	readonly data = this.#data.asObservable();

	readonly unique = this.#data.asObservablePart((data) => data?.unique);

	readonly routes = new UmbWorkspaceRouteManager(this);

	constructor(host: UmbControllerHost) {
		super(host, CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT);
		this.routes.setRoutes([
			{
				path: 'edit/:unique',
				component: ContentAuditAllPagesWorkspaceEditorElement,
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
		return 'all-pages';
	}

	public override destroy(): void {
		this.#data.destroy();
		super.destroy();
	}
}

export { ContentAuditAllPagesWorkspaceContext as api };

export const CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT = new UmbContextToken<any, ContentAuditAllPagesWorkspaceContext>(
	'UmbWorkspaceContext',
	undefined,
	(context): context is ContentAuditAllPagesWorkspaceContext => context.getEntityType?.() === 'all-pages',
);
