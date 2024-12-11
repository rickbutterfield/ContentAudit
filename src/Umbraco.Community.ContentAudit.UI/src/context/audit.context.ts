import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT, UmbWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import { CONTENT_AUDIT_ENTITY_TYPE, CONTENT_AUDIT_WORKSPACE_ALIAS } from "../workspace/constants";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { ContentAuditRepository } from "../repository/content-audit.repository";
import { UmbArrayState, UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { AuditIssueDto, AuditOverviewDto, HealthScoreDto, PageResponseDto } from "../api";

export class ContentAuditContext extends UmbControllerBase implements UmbWorkspaceContext {
	public readonly workspaceAlias: string = CONTENT_AUDIT_WORKSPACE_ALIAS;

	getEntityType(): string {
		return CONTENT_AUDIT_ENTITY_TYPE;
	}

	#repository: ContentAuditRepository;

	#latestAuditOverview = new UmbObjectState<AuditOverviewDto | undefined>(undefined);
	public readonly latestAuditOverview = this.#latestAuditOverview.asObservable();

	#pagesWithMissingMetadata = new UmbArrayState<PageResponseDto>([], (x) => x.id);
	public readonly pagesWithMissingMetadata = this.#pagesWithMissingMetadata.asObservable();

	#allIssues = new UmbArrayState<AuditIssueDto>([], (x) => x.name);
	public readonly allIssues = this.#allIssues.asObservable();

	#healthScore = new UmbObjectState<HealthScoreDto | undefined>(undefined);
	public readonly healthScore = this.#healthScore.asObservable();
	
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

	async getPagesWithMissingMetadata() {
		const { data } = await this.#repository.getPagesWithMissingMetadata();

		if (data) {
			this.#pagesWithMissingMetadata.setValue(data);
		}
	}

	async getAllIssues() {
		const { data } = await this.#repository.getAllIssues();

		if (data) {
			this.#allIssues.setValue(data);
		}
	}

	async getHealthScore() {
		const { data } = await this.#repository.getHealthScore();

		if (data) {
			this.#healthScore.setValue(data);
		}
	}
}

export default ContentAuditContext;

export const CONTENT_AUDIT_CONTEXT_TOKEN = new UmbContextToken<ContentAuditContext>(
	'ContentAuditContext',
);
