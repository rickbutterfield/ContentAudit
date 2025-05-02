import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { css, customElement, html, LitElement, nothing, repeat, state } from "@umbraco-cms/backoffice/external/lit";
import { IssueDto, OverviewDto, HealthScoreDto, CrawlDto } from "../../api";
import ContentAuditContext, { CONTENT_AUDIT_CONTEXT_TOKEN } from "../../context/audit.context";
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import { CONTENT_AUDIT_RUN_WARNING_MODAL_TOKEN } from "../../modals";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";

@customElement('content-audit-scan-view')
export class ContentAuditScanViewElement extends UmbElementMixin(LitElement) {
    private crawlData: CrawlDto[] = [];

    #context?: ContentAuditContext;
    #modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;
    #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

    @state()
    scanRunning?: boolean = false;

    @state()
    _latestAuditOverview?: OverviewDto;

    @state()
    _topIssues: Array<IssueDto> = [];

    @state()
    _healthScore?: HealthScoreDto;

    @state()
    _pagesWithoutErrors?: number;

    constructor() {
        super();

        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (instance) => {
            this.#notificationContext = instance;
        });

        this.consumeContext(CONTENT_AUDIT_CONTEXT_TOKEN, (context) => {
            this.#context = context;

            this.observe(context.latestAuditOverview, (latestAuditOverview) => {
                this._latestAuditOverview = latestAuditOverview;
            });

            this.observe(context.topIssues, (topIssues) => {
                this._topIssues = topIssues.filter(x => x.numberOfUrls != 0)
            });

            this.observe(context.healthScore, (healthScore) => {
                this._healthScore = healthScore;
                if (this._healthScore != undefined) {
                    this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors;
                }
            });

            this.#init();
        });

        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this.#modalManagerContext = instance;
        });
    }

    #init() {
        this.#context?.getLatestAuditOverview();
        this.#context?.getTopIssues();
        this.#context?.getHealthScore();
    }

    private async _openModal() {
        const modal = this.#modalManagerContext?.open(this, CONTENT_AUDIT_RUN_WARNING_MODAL_TOKEN, {
            data: {
                headline: "Ready to run an audit?",
            }
        });

        const result = await modal?.onSubmit();
        if (result?.run) {
            this.startAudit();
        }
    }

    startAudit() {
        const eventSource = new EventSource('/umbraco/content-audit/api/v1/start-crawl');

        this.scanRunning = true;
        this.crawlData = [];
        this.#notificationContext?.peek("positive", {
            data: {
                headline: 'Crawl started',
                message: 'You will be notified when it is complete.'
            }
        });

        eventSource.onmessage = (event) => {
            const data: CrawlDto = JSON.parse(event.data);
            this.crawlData.push(data);
            this.requestUpdate();
        };

        eventSource.onerror = (error) => {
            if (eventSource.readyState === EventSource.CLOSED) {
                console.log('EventSource connection closed by the server.');
            } else {
                console.error('EventSource encountered an error:', error);
            }
            this.scanRunning = false;
            this.#init();

            this.#notificationContext?.peek("default", {
                data: {
                    headline: 'Crawl completed',
                    message: 'You can now view the results.',
                }
            });

            eventSource.close();
        };
    }

    #renderScanBox() {
        if (!this.scanRunning) {
            if (this._latestAuditOverview?.runDate == null) {
                return html`<p>No scan has been run yet</p>`;
            }
            else {
                return html`
                    <uui-table>
                        <uui-table-column></uui-table-column>
                        <uui-table-column></uui-table-column>

                        <uui-table-row>
                            <uui-table-cell>Total URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.total}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Internal URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalInternal}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>External URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalExternal}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Asset URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalAssets}</uui-table-cell>
                        </uui-table-row>
                        <uui-table-row>
                            <uui-table-cell>Blocked URLs:</uui-table-cell>
                            <uui-table-cell>${this._latestAuditOverview?.totalBlocked}</uui-table-cell>
                        </uui-table-row>
                    </uui-table>
                `
            }
        }
        else {
            const total = this.crawlData.length;
            const internal = this.crawlData.filter(x => x.crawled && !x.external && !x.asset).length;
            const external = this.crawlData.filter(x => x.crawled && x.external && !x.asset).length;
            const assets = this.crawlData.filter(x => x.crawled && x.asset).length;
            const blocked = this.crawlData.filter(x => x.blocked).length;

            return html`
                <uui-loader-bar></uui-loader-bar>

                <uui-table>
                    <uui-table-column></uui-table-column>
                    <uui-table-column></uui-table-column>

                    <uui-table-row>
                        <uui-table-cell>URLs crawled:</uui-table-cell>
                        <uui-table-cell>${total}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Internal URLs:</uui-table-cell>
                        <uui-table-cell>${internal}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>External URLs:</uui-table-cell>
                        <uui-table-cell>${external}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Asset URLs:</uui-table-cell>
                        <uui-table-cell>${assets}</uui-table-cell>
                    </uui-table-row>
                    <uui-table-row>
                        <uui-table-cell>Blocked URLs:</uui-table-cell>
                        <uui-table-cell>${blocked}</uui-table-cell>
                    </uui-table-row>
                </uui-table>
            `
        }
    }

    #renderLatestAudit() {
        if (this._latestAuditOverview !== undefined) {
            return html`
                <uui-box headline="Latest audit" class="span-2" style="${this._latestAuditOverview?.runDate != null || this.scanRunning ? '--uui-box-default-padding: 0;' : ''}">
                    <div slot="header">
                        ${this._latestAuditOverview?.runDate != null ? this.localize.date(this._latestAuditOverview?.runDate!, { dateStyle: 'long', timeStyle: 'short' }) : nothing}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this._openModal}
                            .state=${this.scanRunning ? "waiting" : ""}
                        >Run new scan</uui-button>
                    </div>

                    ${this.#renderScanBox()}
                </uui-box>
            `
        }
    }

    #renderHealthScore() {
        if (this._healthScore !== undefined) {
            let scoreClass = "score--danger";

            if (this._healthScore.healthScore >= 90) {
                scoreClass = "score--success";
            }

            else if (this._healthScore.healthScore >= 50) {
                scoreClass = "score--warning";
            }

            return html`
                <uui-box headline="Site health">
                    <div class="score">
                        <svg viewBox="0 0 36 36" class="score__inner ${scoreClass}">
                            <path class="score__bg"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path class="score__fill"
                                stroke-dasharray="${this._healthScore.healthScore}, 100"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <p class="score__text">${this._healthScore.healthScore.toFixed(0)} / 100</p>
                    </div>
                </uui-box>
            `;
        }
    }

    _renderScanData() {
        if (this.crawlData.length !== 0) {
            const total = this.crawlData.length;
            const internal = this.crawlData.filter(x => x.crawled && !x.external && !x.asset).length;
            const external = this.crawlData.filter(x => x.crawled && x.external && !x.asset).length;
            const assets = this.crawlData.filter(x => x.crawled && x.asset).length;
            const blocked = this.crawlData.filter(x => x.blocked).length;

            return html`
                <uui-box headline="Debug scan data" class="span-3">
                    <p>Total: ${total}</p>
                    <p>Internal: ${internal}</p>
                    <p>External: ${external}</p>
                    <p>Assets: ${assets}</p>
                    <p>Blocked: ${blocked}</p>

                    ${repeat(
                        this.crawlData,
                        (data) => data.url,
                        (data) => html`${JSON.stringify(data)}<br/>`
                    )}
                </uui-box>
            `
        }
    }

    #renderTopIssues() {
        if (this._topIssues.length !== 0) {
            return html`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues}></content-audit-issues-table-collection-view>
                </uui-box>
            `
        }
    }

    override render() {
        return html`
            <div id="main">
                ${this.#renderLatestAudit()}
                ${this.#renderHealthScore()}
                
                ${this.#renderTopIssues()}
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
                grid-template-columns: 1fr 1fr 350px;
            }

            .span-2 {
                grid-column: span 2;
            }

            .span-3 {
                grid-column: span 3;
            }

            .score {
                text-align: center;
                position: relative;
            }

            .score__inner {
                width: 200px;
                height: 200px;
            }

            .score__bg {
                fill: none;
                stroke: #eee;
                stroke-width: 1.75;
            }

            .score__fill {
                fill: none;
                stroke: none;
                stroke-width: 1.75;
                stroke-linecap: round;
                animation: progress 1000ms ease-out forwards;
                stroke: #000;
            }

            .score--danger .score__fill {
                stroke: var(--uui-color-danger, #d42054);
            }

            .score--warning .score__fill {
                stroke: var(--uui-color-warning, #fbd142);
            }

            .score--success .score__fill {
                stroke: var(--uui-color-positive);
            }

            .score__text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                z-index: 1;
                font-size: 24px;
                font-weight: 700;
            }

            @keyframes progress {
                0% {
                    stroke-dasharray: 0 100;
                }
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
