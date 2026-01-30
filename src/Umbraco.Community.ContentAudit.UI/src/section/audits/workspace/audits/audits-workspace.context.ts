import { UmbContextBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbWorkspaceRouteManager } from "@umbraco-cms/backoffice/workspace";
import { UmbArrayState, UmbBooleanState, UmbObjectState, UmbStringState } from "@umbraco-cms/backoffice/observable-api";
import { CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS } from "../constants";
import ContentAuditAuditsWorkspaceEditorElement from "./audits-workspace-editor.element";
import { OverviewDto, AuditService, IssueDto, IssueService } from "../../../../api";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import type { UmbEntityModel } from "@umbraco-cms/backoffice/entity";
import { AUDIT_AUDITS_ENTITY_TYPE } from "../../entity";

export class ContentAuditAuditsWorkspaceContext extends UmbContextBase {

	public readonly workspaceAlias = CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS;

	#data = new UmbObjectState<OverviewDto | undefined>(undefined);
	readonly data = this.#data.asObservable();

	#issues = new UmbArrayState<IssueDto>([], (x) => x.unique);
	readonly issues = this.#issues.asObservable();

	readonly unique = this.#data.asObservablePart((data) => data?.key);

	// Required for UMB_SUBMITTABLE_TREE_ENTITY_WORKSPACE_CONTEXT
	#entityType = new UmbStringState(AUDIT_AUDITS_ENTITY_TYPE);
	readonly entityType = this.#entityType.asObservable();

	#isNew = new UmbBooleanState(false);
	readonly isNew = this.#isNew.asObservable();

	#createUnderParent = new UmbObjectState<UmbEntityModel | undefined>(undefined);
	readonly _internal_createUnderParent = this.#createUnderParent.asObservable();
	readonly _internal_createUnderParentEntityType = this.#createUnderParent.asObservablePart((p) => p?.entityType);
	readonly _internal_createUnderParentEntityUnique = this.#createUnderParent.asObservablePart((p) => p?.unique);

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

	// Required for UMB_SUBMITTABLE_TREE_ENTITY_WORKSPACE_CONTEXT (read-only, so no-op)
	async requestSubmit(): Promise<void> {
		// Read-only workspace, nothing to submit
	}

	getIsNew(): boolean {
		return this.#isNew.getValue();
	}

	_internal_getCreateUnderParent(): UmbEntityModel | undefined {
		return this.#createUnderParent.getValue();
	}

	_internal_setCreateUnderParent(parent: UmbEntityModel | undefined): void {
		this.#createUnderParent.setValue(parent);
	}

	async load(unique: string) {
		// Load audit overview data by unique identifier (key)
		const { data } = await tryExecute(this, AuditService.overviewByKey({ path: { id: unique } }));
		
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
			const sortedIssues = data.items.sort((a, b) => b.priorityScore! - a.priorityScore!);
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
