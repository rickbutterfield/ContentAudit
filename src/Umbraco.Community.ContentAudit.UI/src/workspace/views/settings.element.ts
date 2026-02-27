import { css, customElement, html, nothing, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { CONTENT_AUDIT_CONTEXT_TOKEN, ContentAuditContext } from "../../exports";
import { ContentAuditSettings } from "../../api";

@customElement('content-audit-settings-view')
export class ContentAuditSettingsViewElement extends UmbLitElement {
    #context?: ContentAuditContext;

    @state()
    settings?: ContentAuditSettings = undefined;

    constructor() {
        super();

        this.consumeContext(CONTENT_AUDIT_CONTEXT_TOKEN, (context) => {
            this.#context = context;

            this.observe(context?.settings, (settings) => {
                this.settings = settings;
            });

            this.#context?.getSettings();
        });
    }

    #renderPatterns(patterns: Array<string>) {
        if (!patterns.length) return html`<em>None</em>`;
        return html`${patterns.map((p) => html`<uui-tag look="secondary" style="margin: 0 var(--uui-size-space-1) var(--uui-size-space-1) 0;">${p}</uui-tag>`)}`;
    }

    override render() {
        if (this.settings === undefined) return nothing;

        return html`
            <uui-box headline="General">
                <div slot="header">Discovered from appsettings.json</div>

                <umb-property-layout label="Base URL" description="The base URL for the site under audit. Useful for headless setups." style="padding-top: 0;">
                    <div slot="editor">${this.settings.baseUrl ?? html`<em>Auto-detected</em>`}</div>
                </umb-property-layout>

                <umb-property-layout label="Use Umbraco content index" description="If true, ContentAudit will use content from the index instead of the crawler">
                    <div slot="editor">
                        <uui-toggle .checked=${this.settings.useUmbracoContentIndex} readonly></uui-toggle>
                    </div>
                </umb-property-layout>

                <umb-property-layout label="Use incremental crawl" description="Only re-crawl pages that have changed since the last audit">
                    <div slot="editor">
                        <uui-toggle .checked=${this.settings.useIncrementalCrawl} readonly></uui-toggle>
                    </div>
                </umb-property-layout>
            </uui-box>

            <uui-box headline="Discovery">
                <umb-property-layout label="Use sitemap.xml" description="If true, ContentAudit will use pages listed in 'sitemap.xml' for discovery" style="padding-top: 0;">
                    <div slot="editor">
                        <uui-toggle .checked=${this.settings.useSitemapXml} readonly></uui-toggle>
                    </div>
                </umb-property-layout>

                <umb-property-layout label="Sitemap URL" description="Custom path to sitemap. Defaults to '/sitemap.xml'">
                    <div slot="editor">${this.settings.sitemapUrl ?? html`<em>Default</em>`}</div>
                </umb-property-layout>

                <umb-property-layout label="Respect robots.txt" description="If any content is set to 'disallow', it will be ignored by the crawler">
                    <div slot="editor">
                        <uui-toggle .checked=${this.settings.respectRobotsTxt} readonly></uui-toggle>
                    </div>
                </umb-property-layout>
            </uui-box>

            <uui-box headline="Crawl Limits">
                <umb-property-layout label="Max concurrent crawls" description="Number of pages crawled in parallel (1–20)" style="padding-top: 0;">
                    <div slot="editor">${this.settings.maxConcurrentCrawls}</div>
                </umb-property-layout>

                <umb-property-layout label="Max crawl duration" description="Maximum time in minutes for a crawl operation. 0 means no limit.">
                    <div slot="editor">${this.settings.maxCrawlDurationMinutes === 0 ? html`<em>No limit</em>` : `${this.settings.maxCrawlDurationMinutes} minutes`}</div>
                </umb-property-layout>

                <umb-property-layout label="Max crawl depth" description="Maximum depth from the starting URL. 0 means unlimited.">
                    <div slot="editor">${this.settings.maxCrawlDepth === 0 ? html`<em>Unlimited</em>` : this.settings.maxCrawlDepth}</div>
                </umb-property-layout>

                <umb-property-layout label="Crawl delay" description="Delay in milliseconds between requests. Can be overridden by robots.txt Crawl-delay.">
                    <div slot="editor">${this.settings.crawlDelayMs === 0 ? html`<em>No delay</em>` : `${this.settings.crawlDelayMs} ms`}</div>
                </umb-property-layout>

                <umb-property-layout label="External request delay" description="Minimum delay in milliseconds between consecutive requests to the same external domain.">
                    <div slot="editor">${this.settings.externalRequestDelayMs === 0 ? html`<em>No delay</em>` : `${this.settings.externalRequestDelayMs} ms`}</div>
                </umb-property-layout>
            </uui-box>

            <uui-box headline="URL Patterns">
                <umb-property-layout label="Exclude patterns" description="URL patterns excluded from crawling. Supports wildcards (* and **)." style="padding-top: 0;">
                    <div slot="editor">${this.#renderPatterns(this.settings.excludePatterns)}</div>
                </umb-property-layout>

                <umb-property-layout label="Include patterns" description="If specified, only matching URLs will be crawled. Supports wildcards (* and **).">
                    <div slot="editor">${this.#renderPatterns(this.settings.includePatterns)}</div>
                </umb-property-layout>
            </uui-box>
        `;
    }

    static override styles = [
        css`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }

            uui-box {
                margin-bottom: var(--uui-size-space-5);
            }
        `
    ]
}

export default ContentAuditSettingsViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-settings-view': ContentAuditSettingsViewElement;
    }
}
