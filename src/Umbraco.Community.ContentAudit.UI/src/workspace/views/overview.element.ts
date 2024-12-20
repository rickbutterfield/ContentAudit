import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { css, customElement, html, LitElement, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { IssueDto, OverviewDto, HealthScoreDto, CrawlDto } from "../../api";
import ContentAuditContext, { CONTENT_AUDIT_CONTEXT_TOKEN } from "../../context/audit.context";

@customElement('content-audit-scan-view')
export class ContentAuditScanViewElement extends UmbElementMixin(LitElement) {
    private crawlData: CrawlDto[] = [];

    #context?: ContentAuditContext;

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

        this.consumeContext(CONTENT_AUDIT_CONTEXT_TOKEN, (context) => {
            this.#context = context;

            this.observe(context.latestAuditOverview, (latestAuditOverview) => {
                this._latestAuditOverview = latestAuditOverview;
            });

            this.observe(context.topIssues, (topIssues) => {
                this._topIssues = topIssues;
            });

            this.observe(context.healthScore, (healthScore) => {
                this._healthScore = healthScore;
                if (this._healthScore != undefined) {
                    this._pagesWithoutErrors = this._healthScore.totalPages - this._healthScore.pagesWithErrors;
                }
            });

            this.#init();
        });
    }

    #init() {
        this.#context?.getLatestAuditOverview();
        this.#context?.getTopIssues();
        this.#context?.getHealthScore();
    }

    startAudit() {
        const eventSource = new EventSource('/umbraco/content-audit/api/v1/start-crawl');

        this.scanRunning = true;
        this.crawlData = [];

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
                    <p><strong>URLs found: </strong> ${this._latestAuditOverview?.total}</p>
                    <p><strong>Internal URLs: </strong> ${this._latestAuditOverview?.totalInternal}</p>
                    <p><strong>External URLs: </strong> ${this._latestAuditOverview?.totalExternal}</p>
                    <p><strong>Asset URLs: </strong> ${this._latestAuditOverview?.totalAssets}</p>
                    <p><strong>Blocked URLs: </strong> ${this._latestAuditOverview?.totalBlocked}</p>
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
                <p><strong>URLs found: </strong> ${total}</p>
                <p><strong>Internal URLs: </strong> ${internal}</p>
                <p><strong>External URLs: </strong> ${external}</p>
                <p><strong>Asset URLs: </strong> ${assets}</p>
                <p><strong>Blocked URLs: </strong> ${blocked}</p>
            `
        }
    }

    #renderLatestAudit() {
        if (this._latestAuditOverview !== undefined) {
            return html`
                <uui-box headline="Latest audit" class="span-2">
                    <div slot="header">
                        ${this._latestAuditOverview?.runDate != null ? this.localize.date(this._latestAuditOverview?.runDate!, { dateStyle: 'long', timeStyle: 'short' }) : nothing}
                    </div>
                    <div slot="header-actions">
                        <uui-button
                            look="primary"
                            @click=${this.startAudit}
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

            if (this._healthScore.healthScore >= 50) {
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
                grid-template-columns: repeat(3, 1fr);
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
