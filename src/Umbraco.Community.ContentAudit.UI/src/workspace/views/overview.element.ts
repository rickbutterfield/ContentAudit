import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { css, customElement, html, LitElement, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { AuditOverviewDto, PageResponseDto } from "../../api";
import ContentAuditWorkspaceContext, { CONTENT_AUDIT_CONTEXT_TOKEN } from "../workspace.context";

@customElement('content-audit-scan-view')
export class ContentAuditScanViewElement extends UmbElementMixin(LitElement) {
    private auditData: PageResponseDto[] = [];

    #context?: ContentAuditWorkspaceContext;

    @state()
    scanRunning?: boolean = false;

    @state()
    _latestAuditOverview?: AuditOverviewDto;

    constructor() {
        super();

        this.consumeContext(CONTENT_AUDIT_CONTEXT_TOKEN, (context) => {
            this.#context = context;

            this.observe(context.latestAuditOverview, (latestAuditOverview) => {
                this._latestAuditOverview = latestAuditOverview;
            });

            this.#context.getLatestAuditOverview();
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
                    <div slot="header">${this.localize.date(this._latestAuditOverview?.runDate!, { dateStyle: 'long', timeStyle: 'short' })}</div>
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
                    <em>Chart showing overall health of site. Based on ahrefs health score? (internal URLs crawled without errors)</em>
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
        `
    ]
}

export default ContentAuditScanViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-scan-view': ContentAuditScanViewElement;
    }
}
