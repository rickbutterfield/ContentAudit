import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT, UmbWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import { CONTENT_AUDIT_ENTITY_TYPE, CONTENT_AUDIT_WORKSPACE_ALIAS } from "../workspace/constants";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { ContentAuditRepository } from "../repository/content-audit.repository";
import { UmbArrayState, UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { IssueDto, OverviewDto, ContentAuditSettings, HealthScoreDto, PageAnalysisDto, CrawlService } from "../api";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";

export class ContentAuditContext extends UmbControllerBase implements UmbWorkspaceContext {
	public readonly workspaceAlias: string = CONTENT_AUDIT_WORKSPACE_ALIAS;

	getEntityType(): string {
		return CONTENT_AUDIT_ENTITY_TYPE;
	}

	#repository: ContentAuditRepository;

	#latestAuditOverview = new UmbObjectState<OverviewDto | undefined>(undefined);
	public readonly latestAuditOverview = this.#latestAuditOverview.asObservable();

	#auditOverviews = new UmbArrayState<OverviewDto>([], (x) => x.key);
	public readonly auditOverviews = this.#auditOverviews.asObservable();

	#pagesWithMissingMetadata = new UmbArrayState<PageAnalysisDto>([], (x) => x.unique);
	public readonly pagesWithMissingMetadata = this.#pagesWithMissingMetadata.asObservable();

	#topIssues = new UmbArrayState<IssueDto>([], (x) => x.name);
	public readonly topIssues = this.#topIssues.asObservable();

	#healthScore = new UmbObjectState<HealthScoreDto | undefined>(undefined);
	public readonly healthScore = this.#healthScore.asObservable();

	#settings = new UmbObjectState<ContentAuditSettings | undefined>(undefined);
	public readonly settings = this.#settings.asObservable();

	constructor(host: UmbControllerHost) {
		super(host);
		this.provideContext(CONTENT_AUDIT_CONTEXT_TOKEN, this);
		this.provideContext(UMB_WORKSPACE_CONTEXT, this);

		this.#repository = new ContentAuditRepository(this);
	}

	async #notifyError(message: string) {
		const notificationContext = await this.getContext(UMB_NOTIFICATION_CONTEXT);
		notificationContext?.peek('danger', {
			data: { headline: 'Content Audit', message }
		});
	}

	async getLatestAuditOverview() {
		const { data, error } = await this.#repository.getLatestAuditOverview();

		if (data) {
			this.#latestAuditOverview.setValue(data);
		} else if (error) {
			this.#notifyError('Failed to load latest audit overview.');
		}
	}

	async getAuditOverviews() {
		const { data, error } = await this.#repository.getAuditOverviews();

		if (data && data.items) {
			const sortedAudits = data.items.sort((a, b) => {
				const dateA = a.runDate ? new Date(a.runDate).getTime() : 0;
				const dateB = b.runDate ? new Date(b.runDate).getTime() : 0;
				return dateB - dateA;
			});
			this.#auditOverviews.setValue(sortedAudits);
		} else if (error) {
			this.#notifyError('Failed to load audit history.');
		}
	}

	async getPagesWithMissingMetadata() {
		const { data, error } = await this.#repository.getPagesWithMissingMetadata();

		if (data) {
			this.#pagesWithMissingMetadata.setValue(data.items);
		} else if (error) {
			this.#notifyError('Failed to load pages with missing metadata.');
		}
	}

	async getTopIssues() {
		const { data, error } = await this.#repository.getTopIssues();

		if (data) {
			this.#topIssues.setValue(data.items);
		} else if (error) {
			this.#notifyError('Failed to load top issues.');
		}
	}

	async getHealthScore() {
		const { data, error } = await this.#repository.getHealthScore();

		if (data) {
			this.#healthScore.setValue(data);
		} else if (error) {
			this.#notifyError('Failed to load health score.');
		}
	}

	async startCrawl() {
		return CrawlService.startCrawl();
	}

	async getSettings() {
		const { data, error } = await this.#repository.getSettings();

		if (data) {
			this.#settings.setValue(data);
		} else if (error) {
			this.#notifyError('Failed to load settings.');
		}
	}
}

export default ContentAuditContext;

export const CONTENT_AUDIT_CONTEXT_TOKEN = new UmbContextToken<ContentAuditContext>(
	'ContentAuditContext',
);
