import { css, customElement, html, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { IssueDto, OverviewDto, HealthScoreDto, CrawlDto } from "../../api";
import ContentAuditContext, { CONTENT_AUDIT_CONTEXT_TOKEN } from "../../context/audit.context";
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import { CONTENT_AUDIT_RUN_WARNING_MODAL_TOKEN } from "../../modals";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { UmbRequestReloadChildrenOfEntityEvent } from "@umbraco-cms/backoffice/entity-action";
import { UMB_ACTION_EVENT_CONTEXT } from '@umbraco-cms/backoffice/action';
import '../../elements/health-score.element';

@customElement('content-audit-scan-view')
export class ContentAuditScanViewElement extends UmbLitElement {
    @state()
    private _crawlData: CrawlDto[] = [];

    #context?: ContentAuditContext;
    #modalManagerContext?: typeof UMB_MODAL_MANAGER_CONTEXT.TYPE;
    #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

    @state()
    scanRunning?: boolean = false;

    @state()
    _latestAuditOverview?: OverviewDto;

    @state()
    _auditOverviews: Array<OverviewDto> = [];

    @state()
    _topIssues: Array<IssueDto> = [];

    @state()
    _healthScore?: HealthScoreDto;

    #previousIsRunning = false;

    constructor() {
        super();

        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (instance) => {
            this.#notificationContext = instance;
        });

        this.consumeContext(CONTENT_AUDIT_CONTEXT_TOKEN, (context) => {
            this.#context = context;

            this.observe(context?.latestAuditOverview, (latestAuditOverview) => {
                this._latestAuditOverview = latestAuditOverview;
            });

            this.observe(context?.auditOverviews, (auditOverviews) => {
                this._auditOverviews = auditOverviews || [];
            });

            this.observe(context?.topIssues, (topIssues) => {
                if (topIssues) {
                    this._topIssues = topIssues.filter(x => x.numberOfUrls != 0);
                }
            });

            this.observe(context?.healthScore, (healthScore) => {
                this._healthScore = healthScore;
            });

            this.observe(context?.crawlData, (crawlData) => {
                this._crawlData = crawlData || [];
            });

            this.observe(context?.isRunning, (isRunning) => {
                const wasRunning = this.#previousIsRunning;
                this.scanRunning = isRunning;
                this.#previousIsRunning = isRunning ?? false;

                if (wasRunning && !isRunning && this.isConnected) {
                    this.#onCrawlFinished();
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
        this.#context?.getAuditOverviews();
        this.#context?.getTopIssues();
        this.#context?.getHealthScore();
    }

    async #onCrawlFinished() {
        this.#notificationContext?.peek("default", {
            data: { headline: 'Crawl completed', message: 'You can now view the results.' }
        });

        this.#init();

        const eventContext = await this.getContext(UMB_ACTION_EVENT_CONTEXT);
        if (eventContext) {
            const event = new UmbRequestReloadChildrenOfEntityEvent({
                entityType: 'audits-root',
                unique: null,
            });
            eventContext.dispatchEvent(event);
        }
    }

    private async _openModal() {
        const modal = this.#modalManagerContext?.open(this, CONTENT_AUDIT_RUN_WARNING_MODAL_TOKEN, {
            data: {
                headline: "Ready to run an audit?",
            }
        });

        const result = await modal?.onSubmit();
        if (result?.run) {
            this.#startAudit();
        }
    }

    async #startAudit() {
        try {
            await this.#context!.startCrawl();
            this.#notificationContext?.peek("positive", {
                data: {
                    headline: 'Crawl started',
                    message: 'You will be notified when it is complete.'
                }
            });
        } catch (err) {
            this.#notificationContext?.peek("danger", {
                data: { headline: 'Crawl failed to start', message: (err as Error).message ?? 'Unknown error' }
            });
        }
    }

    async #cancelCrawl() {
        try {
            await this.#context!.cancelCrawl();
            this.#notificationContext?.peek("warning", {
                data: { headline: 'Crawl cancelled', message: 'The crawl has been cancelled.' }
            });
        } catch (err) {
            this.#notificationContext?.peek("danger", {
                data: { headline: 'Cancel failed', message: (err as Error).message ?? 'Unknown error' }
            });
        }
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
            const total = this._crawlData.length;
            const internal = this._crawlData.filter(x => x.crawled && !x.external && !x.asset).length;
            const external = this._crawlData.filter(x => x.crawled && x.external && !x.asset).length;
            const assets = this._crawlData.filter(x => x.crawled && x.asset).length;
            const blocked = this._crawlData.filter(x => x.blocked).length;

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
                        ${this._latestAuditOverview?.runDate != null ? this.localize.date(this._latestAuditOverview.runDate, { dateStyle: 'long', timeStyle: 'short' }) : nothing}
                    </div>
                    <div slot="header-actions">
                        ${this.scanRunning
                            ? html`<uui-button look="secondary" color="danger" @click=${this.#cancelCrawl}>Cancel</uui-button>`
                            : html`<uui-button look="primary" @click=${this._openModal}>Run new scan</uui-button>`
                        }
                    </div>

                    ${this.#renderScanBox()}
                </uui-box>
            `
        }
    }

    #renderHealthScore() {
        if (this._latestAuditOverview?.runDate != null && this._healthScore !== undefined) {
            return html`
                <content-audit-health-score
                    .score=${this._healthScore.healthScore}
                    headline="Site health"
                ></content-audit-health-score>
            `;
        }
    }

    #renderAuditHistory() {
        if (this._auditOverviews.length <= 1) return nothing;

        // Get the most recent 10 audits
        const recentAudits = this._auditOverviews.slice(0, 10).reverse();

        const chartHeight = 150;
        const chartWidth = 100; // percentage

        // Calculate points for the line (health score is 0-100)
        const points = recentAudits.map((audit, index) => {
            const x = (index / (recentAudits.length - 1)) * chartWidth;
            const y = chartHeight - ((audit.healthScore || 0) / 100) * chartHeight;
            return `${x},${y}`;
        }).join(' ');

        // Get color based on latest health score
        const latestScore = recentAudits[recentAudits.length - 1]?.healthScore || 0;
        const lineColor = latestScore >= 90
            ? 'var(--uui-color-positive)'
            : latestScore >= 50
                ? 'var(--uui-color-warning)'
                : 'var(--uui-color-danger)';

        return html`
            <uui-box headline="Health Score Trend" class="span-3">
                <div class="chart-container">
                    <svg class="chart" viewBox="0 0 100 ${chartHeight}" preserveAspectRatio="none">
                        <!-- Grid lines with labels -->
                        ${[100, 90, 75, 50, 25, 0].map(value => {
                            const y = chartHeight - (value / 100) * chartHeight;
                            const isThreshold = value === 90 || value === 50;
                            return html`
                                <line
                                    x1="0"
                                    y1="${y}"
                                    x2="100"
                                    y2="${y}"
                                    class="chart-grid-line ${isThreshold ? 'chart-grid-line--threshold' : ''}"
                                />
                                <text x="1" y="${y - 0.5}" class="chart-grid-label">${value}</text>
                            `;
                        })}

                        <!-- Gradient fill under the line -->
                        <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:${lineColor};stop-opacity:0.2" />
                                <stop offset="100%" style="stop-color:${lineColor};stop-opacity:0" />
                            </linearGradient>
                        </defs>

                        <!-- Area fill -->
                        <path
                            d="M ${points.split(' ')[0]} L ${points} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z"
                            fill="url(#chartGradient)"
                        />

                        <!-- Line chart -->
                        <polyline
                            points="${points}"
                            class="chart-line"
                            fill="none"
                            stroke="${lineColor}"
                            stroke-width="0.5"
                        />

                        <!-- Data points -->
                        ${recentAudits.map((audit, index) => {
                            const x = (index / (recentAudits.length - 1)) * chartWidth;
                            const y = chartHeight - ((audit.healthScore || 0) / 100) * chartHeight;
                            const score = audit.healthScore || 0;
                            const pointColor = score >= 90
                                ? 'var(--uui-color-positive)'
                                : score >= 50
                                    ? 'var(--uui-color-warning)'
                                    : 'var(--uui-color-danger)';
                            return html`
                                <circle
                                    cx="${x}"
                                    cy="${y}"
                                    r="1"
                                    class="chart-point"
                                    fill="${pointColor}"
                                />
                            `;
                        })}
                    </svg>

                    <!-- Labels -->
                    <div class="chart-labels">
                        ${recentAudits.map(audit => {
                            const score = audit.healthScore || 0;
                            const scoreClass = score >= 90
                                ? 'chart-label-score--success'
                                : score >= 50
                                    ? 'chart-label-score--warning'
                                    : 'chart-label-score--danger';
                            return html`
                                <div class="chart-label">
                                    <div class="chart-label-date">
                                        ${audit.runDate ? this.localize.date(audit.runDate, { dateStyle: 'short' }) : 'N/A'}
                                    </div>
                                    <div class="chart-label-score ${scoreClass}">${score.toFixed(0)}</div>
                                </div>
                            `;
                        })}
                    </div>
                </div>
            </uui-box>
        `;
    }

    #renderTopIssues() {
        if (this._topIssues.length !== 0) {
            return html`
                <uui-box headline="Top issues" class="span-3" style="--uui-box-default-padding: 0;">
                    <div slot="header-actions">
                        <uui-button look="secondary" href="/umbraco/section/audit/workspace/issues-root">See all issues</uui-button>
                    </div>
                    <content-audit-issues-table-collection-view .data=${this._topIssues} hide-summary></content-audit-issues-table-collection-view>
                </uui-box>
            `
        }
    }

    override render() {
        return html`
            <div id="main">
                ${this.#renderLatestAudit()}
                ${this.#renderHealthScore()}
                ${this.#renderAuditHistory()}
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

            /* Chart styles */
            .chart-container {
                display: flex;
                flex-direction: column;
                gap: var(--uui-size-space-4);
            }

            .chart {
                width: 100%;
                height: 150px;
                border: 1px solid var(--uui-color-border);
                border-radius: var(--uui-border-radius);
                padding: var(--uui-size-space-3);
                background: var(--uui-color-surface);
            }

            .chart-grid-line {
                stroke: var(--uui-color-border);
                stroke-width: 0.1;
                stroke-dasharray: 1, 1;
            }

            .chart-grid-line--threshold {
                stroke: var(--uui-color-border-emphasis);
                stroke-width: 0.15;
                stroke-dasharray: 2, 2;
            }

            .chart-grid-label {
                font-size: 3px;
                fill: var(--uui-color-text-alt);
                dominant-baseline: text-after-edge;
            }

            .chart-line {
                stroke-width: 0.5;
            }

            .chart-point {
                cursor: pointer;
                transition: r 0.2s ease;
            }

            .chart-point:hover {
                r: 1.5;
            }

            .chart-labels {
                display: flex;
                justify-content: space-between;
                gap: var(--uui-size-space-2);
            }

            .chart-label {
                flex: 1;
                text-align: center;
                font-size: var(--uui-type-small-size);
            }

            .chart-label-date {
                font-weight: 600;
                color: var(--uui-color-text);
                margin-bottom: var(--uui-size-space-1);
            }

            .chart-label-score {
                font-weight: 700;
                font-size: var(--uui-type-default-size);
            }

            .chart-label-score--success {
                color: var(--uui-color-positive);
            }

            .chart-label-score--warning {
                color: var(--uui-color-warning);
            }

            .chart-label-score--danger {
                color: var(--uui-color-danger);
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
