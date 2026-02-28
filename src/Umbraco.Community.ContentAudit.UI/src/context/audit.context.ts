import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT, UmbWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import { CONTENT_AUDIT_ENTITY_TYPE, CONTENT_AUDIT_WORKSPACE_ALIAS } from "../workspace/constants";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { ContentAuditRepository } from "../repository/content-audit.repository";
import { UmbArrayState, UmbBooleanState, UmbObjectState, UmbStringState } from "@umbraco-cms/backoffice/observable-api";
import { IssueDto, OverviewDto, ContentAuditSettings, HealthScoreDto, MetadataListItemDto, CrawlDto, CrawlService } from "../api";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { UMB_SERVER_CONTEXT } from "@umbraco-cms/backoffice/server";
import { HubConnectionBuilder, type HubConnection } from "@umbraco-cms/backoffice/external/signalr";

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

	#pagesWithMissingMetadata = new UmbArrayState<MetadataListItemDto>([], (x) => x.unique);
	public readonly pagesWithMissingMetadata = this.#pagesWithMissingMetadata.asObservable();

	#topIssues = new UmbArrayState<IssueDto>([], (x) => x.name);
	public readonly topIssues = this.#topIssues.asObservable();

	#healthScore = new UmbObjectState<HealthScoreDto | undefined>(undefined);
	public readonly healthScore = this.#healthScore.asObservable();

	#settings = new UmbObjectState<ContentAuditSettings | undefined>(undefined);
	public readonly settings = this.#settings.asObservable();

	#crawlData = new UmbArrayState<CrawlDto>([], (x) => x.unique);
	public readonly crawlData = this.#crawlData.asObservable();

	#isRunning = new UmbBooleanState(false);
	public readonly isRunning = this.#isRunning.asObservable();

	#crawlPhase = new UmbStringState('');
	public readonly crawlPhase = this.#crawlPhase.asObservable();

	#pageEnrichingUrl = new UmbStringState('');
	public readonly pageEnrichingUrl = this.#pageEnrichingUrl.asObservable();

	#connection?: HubConnection;
	#authContext?: typeof UMB_AUTH_CONTEXT.TYPE;
	#serverContext?: typeof UMB_SERVER_CONTEXT.TYPE;

	constructor(host: UmbControllerHost) {
		super(host);
		this.provideContext(CONTENT_AUDIT_CONTEXT_TOKEN, this);
		this.provideContext(UMB_WORKSPACE_CONTEXT, this);

		this.#repository = new ContentAuditRepository(this);

		this.consumeContext(UMB_AUTH_CONTEXT, (context) => {
			this.#authContext = context;
			this.#observeIsAuthorized();
		});

		this.consumeContext(UMB_SERVER_CONTEXT, (context) => {
			this.#serverContext = context;
		});
	}

	#observeIsAuthorized() {
		this.observe(this.#authContext?.isAuthorized, async (isAuthorized) => {
			if (isAuthorized === undefined) return;

			if (isAuthorized) {
				const token = await this.#authContext?.getLatestToken();
				if (token) {
					this.#initHubConnection(token);
				}
			} else {
				this.#connection?.stop();
				this.#connection = undefined;
			}
		});
	}

	#initHubConnection(token: string) {
		const serverURL = this.#serverContext?.getServerUrl() ?? '';
		const hubUrl = `${serverURL}/umbraco/content-audit/hub`;

		this.#connection = new HubConnectionBuilder()
			.withUrl(hubUrl, {
				accessTokenFactory: () => token,
			})
			.withAutomaticReconnect()
			.build();

		this.#connection.on('crawlStarted', () => {
			this.#isRunning.setValue(true);
			this.#crawlData.setValue([]);
			this.#crawlPhase.setValue('');
		});

		this.#connection.on('crawlProgress', (result: CrawlDto) => {
			this.#crawlData.appendOne(result);
		});

		this.#connection.on('crawlPhaseChanged', (phase: string) => {
			this.#crawlPhase.setValue(phase);
		});

		this.#connection.on('crawlCompleted', () => {
			this.#isRunning.setValue(false);
			this.#crawlPhase.setValue('');
		});

		this.#connection.on('crawlFailed', (_error: string) => {
			this.#isRunning.setValue(false);
			this.#crawlPhase.setValue('');
		});

		this.#connection.on('crawlCancelled', () => {
			this.#isRunning.setValue(false);
			this.#crawlPhase.setValue('');
		});

		this.#connection.on('pageEnrichStarted', (url: string) => {
			this.#pageEnrichingUrl.setValue(url);
		});

		this.#connection.on('pageEnrichCompleted', (_url: string) => {
			this.#pageEnrichingUrl.setValue('');
		});

		this.#connection.on('pageEnrichFailed', (_url: string) => {
			this.#pageEnrichingUrl.setValue('');
		});

		this.#connection
			.start()
			.then(async () => {
				// Hydrate current state on connect
				try {
					const { data } = await CrawlService.getCrawlStatus();
					if (data) {
						this.#isRunning.setValue(data.isRunning);
						this.#crawlPhase.setValue(data.phase ?? '');
						if (data.results?.length) {
							this.#crawlData.setValue(data.results);
						}
					}
				} catch {
					// Status endpoint may fail if not yet available
				}
			})
			.catch((err) => console.error('Content Audit SignalR connection failed', err));

		this.#connection.onreconnected(async () => {
			try {
				const { data } = await CrawlService.getCrawlStatus();
				if (data) {
					this.#isRunning.setValue(data.isRunning);
					this.#crawlPhase.setValue(data.phase ?? '');
					if (data.results?.length) {
						this.#crawlData.setValue(data.results);
					}
				}
			} catch {
				// Ignore
			}
		});
	}

	override hostDisconnected(): void {
		super.hostDisconnected();
		this.#connection?.stop();
		this.#connection = undefined;
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

	async cancelCrawl() {
		return CrawlService.cancelCrawl();
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
