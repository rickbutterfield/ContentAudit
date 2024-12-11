import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { css, customElement, html, LitElement, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { AuditIssueDto, AuditOverviewDto, HealthScoreDto, PageResponseDto } from "../../api";
import ContentAuditContext, { CONTENT_AUDIT_CONTEXT_TOKEN } from "../../context/audit.context";

@customElement('content-audit-scan-view')
export class ContentAuditScanViewElement extends UmbElementMixin(LitElement) {
    private auditData: PageResponseDto[] = [];

    #context?: ContentAuditContext;

    @state()
    scanRunning?: boolean = false;

    @state()
    _latestAuditOverview?: AuditOverviewDto;

    @state()
    _topIssues: Array<AuditIssueDto> = [];

    @state()
    _healthScore?: HealthScoreDto;

    @state()
    _pagesWithoutErrors?: number;

    constructor() {
        super();

        this.consumeContext(CONTENT_AUDIT_CONTEXT_TOKEN, (context) => {
            this.#context = context;

            this.observe(context.latestAuditOverview, (latestAuditOverview) => {
                this._latestAuditOverview = latestAuditOverview;
            });

            this.observe(context.allIssues, (allIssues) => {
                this._topIssues = allIssues;

                if (this._topIssues.length > 5) {
                    this._topIssues = this._topIssues.slice(0, 5);
                }
            });

            this.observe(context.healthScore, (healthScore) => {
                this._healthScore = healthScore;
                if (this._healthScore != undefined) {
                    this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors;
                }
            });

            this.#context?.getLatestAuditOverview();
            this.#context?.getAllIssues();
            this.#context?.getHealthScore();
        });
    }

    startAudit() {
        const eventSource = new EventSource('/umbraco/content-audit/api/v1/start-crawl');
        this.scanRunning = true;

        eventSource.onmessage = (event) => {
            const data: PageResponseDto = JSON.parse(event.data);
            this.auditData.push(data);
            this.requestUpdate();
        };

        eventSource.onerror = (error) => {
            if (eventSource.readyState === EventSource.CLOSED) {
                console.log('EventSource connection closed by the server.');
            } else {
                console.error('EventSource encountered an error:', error);
            }
            this.scanRunning = false;
            eventSource.close();
        };
    }

    override render() {
        return html`
            <div id="main">
                <uui-box headline="Latest audit">
                    <div slot="header">${this._latestAuditOverview?.runDate != null ? this.localize.date(this._latestAuditOverview?.runDate!, { dateStyle: 'long', timeStyle: 'short' }) : nothing}</div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this.startAudit}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${this._latestAuditOverview?.runDate == null ?
                html`
                        <p>No scan has been run yet</p>`
                : html`
                        <p><strong>URLs found: </strong> ${this._latestAuditOverview?.totalPages}</p>
                        <p><strong>Pages crawled: </strong> ${this._latestAuditOverview?.totalPagesCrawled}</p>
                        <p><strong>Blocked URLs: </strong> ${this._latestAuditOverview?.totalPagesBlocked}</p>
                    `}
                </uui-box>

                <uui-box headline="Site health">
                    ${this._healthScore !== undefined ?
                        html`
                            <umb-donut-chart id="chart" description="Colors of fruits">
		                        <umb-donut-slice color="green" name="Pages without errors" amount=${this._pagesWithoutErrors}></umb-donut-slice>
		                        <umb-donut-slice color="red" name="Pages with errors" amount=${this._healthScore?.pagesWithErrors}></umb-donut-slice>
	                        </umb-donut-chart>
                        ` : nothing}
                    <p>${this._healthScore?.healthScore} / 100</p>
                </uui-box>

                <uui-box headline="Top issues" class="grow" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <audit-issue-table .data=${this._topIssues} />
                </uui-box>
            </div>
        `
    }

    static override styles = [
        css`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }

            #main {
                display: grid;
                gap: var(--uui-size-space-5); 
                grid-template-columns: repeat(2, 1fr);
            }

            .grow {
                grid-column: span 2;
            }

            #chart {
				width: 150px;
				aspect-ratio: 1;
				background: radial-gradient(white 40%, transparent 41%),
					conic-gradient(
						var(--umb-log-viewer-debug-color) 0% 20%,
						var(--umb-log-viewer-information-color) 20% 40%,
						var(--umb-log-viewer-warning-color) 40% 60%,
						var(--umb-log-viewer-error-color) 60% 80%,
						var(--umb-log-viewer-fatal-color) 80% 100%
					);
				margin: 10px;
				display: inline-block;
				border-radius: 50%;
			}
        `
    ]
}

export default ContentAuditScanViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-scan-view': ContentAuditScanViewElement;
    }
}
