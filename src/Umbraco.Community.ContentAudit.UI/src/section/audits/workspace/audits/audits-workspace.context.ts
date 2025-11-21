import { UmbContextBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbWorkspaceRouteManager } from "@umbraco-cms/backoffice/workspace";
import { UmbArrayState, UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS } from "../constants";
import ContentAuditAuditsWorkspaceEditorElement from "./audits-workspace-editor.element";
import { OverviewDto, AuditService, IssueDto, IssueService } from "../../../../api";
import { tryExecute } from "@umbraco-cms/backoffice/resources";

export class ContentAuditAuditsWorkspaceContext extends UmbContextBase {

	public readonly workspaceAlias = CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS;

	#data = new UmbObjectState<OverviewDto | undefined>(undefined);
	readonly data = this.#data.asObservable();

	#issues = new UmbArrayState<IssueDto>([], (x) => x.unique);
	readonly issues = this.#issues.asObservable();

	readonly unique = this.#data.asObservablePart((data) => data?.key);

	readonly routes = new UmbWorkspaceRouteManager(this);

	constructor(host: UmbControllerHost) {
		super(host, CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT);

		this.routes.setRoutes([
			{
				path: 'edit/:unique',
				component: ContentAuditAuditsWorkspaceEditorElement,
				setup: (_component, info) => {
					const unique = info.match.params.unique;
					this.load(unique);
				},
			},
		]);
	}

	async load(unique: string) {
		// Load audit overview data by unique identifier (key)
		// For now, we'll load the latest audit overview as a placeholder
		const { data } = await tryExecute(this, AuditService.getLatestAuditOverview());
		
		if (data && data.key === unique) {
			this.#data.setValue(data);
			// Load issues for this audit
			await this.loadIssues();
		}
	}

	async loadIssues() {
		const { data } = await tryExecute(this, IssueService.getAllIssues({ query: { skip: 0, take: 100 } }));
		
		if (data && data.items) {
			// Sort by priority score descending
			const sortedIssues = data.items.sort((a, b) => b.priorityScore - a.priorityScore);
			this.#issues.setValue(sortedIssues);
		}
	}

	getData() {
		return this.#data.getValue();
	}

	getIssues() {
		return this.#issues.getValue();
	}

	getUnique() {
		return this.getData()?.key;
	}

	getEntityType() {
		return 'audits';
	}

	public override destroy(): void {
		this.#data.destroy();
		this.#issues.destroy();
		super.destroy();
	}
}

export { ContentAuditAuditsWorkspaceContext as api };

export const CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT = new UmbContextToken<any, ContentAuditAuditsWorkspaceContext>(
	'UmbWorkspaceContext',
	undefined,
	(context): context is ContentAuditAuditsWorkspaceContext => context.getEntityType?.() === 'audits',
);
