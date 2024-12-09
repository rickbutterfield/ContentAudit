import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT, UmbWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import { CONTENT_AUDIT_ENTITY_TYPE, CONTENT_AUDIT_WORKSPACE_ALIAS } from "./constants";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { ContentAuditRepository } from "../repository/content-audit.repository";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { AuditOverviewDto } from "../api";

export class ContentAuditWorkspaceContext extends UmbControllerBase implements UmbWorkspaceContext {
	public readonly workspaceAlias: string = CONTENT_AUDIT_WORKSPACE_ALIAS;

	getEntityType(): string {
		return CONTENT_AUDIT_ENTITY_TYPE;
	}

	#repository: ContentAuditRepository;

	#latestAuditOverview = new UmbObjectState<AuditOverviewDto | undefined>(undefined);
	public readonly latestAuditOverview = this.#latestAuditOverview.asObservable();
	
	constructor(host: UmbControllerHost) {
		super(host);
		this.provideContext(UMB_WORKSPACE_CONTEXT, this);
		this.provideContext(CONTENT_AUDIT_CONTEXT_TOKEN, this);

		this.#repository = new ContentAuditRepository(this);
	}

	async getLatestAuditOverview() {
		const { data } = await this.#repository.getLatestAuditOverview();

		if (data) {
			this.#latestAuditOverview.setValue(data);
		}
	}
}

export default ContentAuditWorkspaceContext;

export const CONTENT_AUDIT_CONTEXT_TOKEN = new UmbContextToken<ContentAuditWorkspaceContext>(
	'ContentAuditWorkspaceContext',
);
