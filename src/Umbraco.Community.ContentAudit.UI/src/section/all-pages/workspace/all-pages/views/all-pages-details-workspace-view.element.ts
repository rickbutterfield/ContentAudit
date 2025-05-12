import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT } from "../all-pages-workspace.context";
import { PageAnalysisDto } from "../../../../../api";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";

@customElement('content-audit-all-pages-details-workspace-view')
export class ContentAuditAllPagesDetailsWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
    @state()
	_data?: PageAnalysisDto;

	@state()
	_documentUnique: string = '';

    #workspaceContext?: typeof CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT.TYPE;

	constructor() {
		super();

		this.consumeContext(CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance;
			this.#observeCollectionItems();
		});
	}

    #observeCollectionItems() {
        if (!this.#workspaceContext) return;
		this.observe(this.#workspaceContext.data, (data) => {
            this._data = data;
        }, 'umbCollectionItemsObserver');
    }

    #renderData() {
        return html`
		<div>
			${this._data?.seoData ? html`
				<uui-box headline="SEO">
					<umb-property-layout label="Title">
						<div slot="editor">${this._data?.seoData.title}</div>
					</umb-property-layout>
					<umb-property-layout label="Meta Description">
						<div slot="editor">${this._data?.seoData.metaDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Canonical URL">
						<div slot="editor">${this._data?.seoData.canonicalUrl}</div>
					</umb-property-layout>
					<umb-property-layout label="H1">
						<div slot="editor">${this._data?.seoData.h1}</div>
					</umb-property-layout>
					<umb-property-layout label="H2s">
						<div slot="editor">${this._data?.seoData.h2s}</div>
					</umb-property-layout>
					<umb-property-layout label="H3s">
						<div slot="editor">${this._data?.seoData.h3s}</div>
					</umb-property-layout>
					<umb-property-layout label="No Index">
						<div slot="editor">${this._data?.seoData.hasNoIndex ? 'Yes' : 'No'}</div>
					</umb-property-layout>
					<umb-property-layout label="No Follow">
						<div slot="editor">${this._data?.seoData.hasNoFollow ? 'Yes' : 'No'}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Title">
						<div slot="editor">${this._data?.seoData.openGraphTitle}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Description">
						<div slot="editor">${this._data?.seoData.openGraphDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Image">
						<div slot="editor"><a href=${this._data?.seoData.openGraphImage} target="_blank">${this._data?.seoData.openGraphImage}</a></div>
					</umb-property-layout>
				</uui-box>
			` : ''}

			${this._data?.contentAnalysis ? html`
				<uui-box headline="Content Analysis">
					<umb-property-layout label="Word Count">
						<div slot="editor">${this._data?.contentAnalysis.wordCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Paragraph Count">
						<div slot="editor">${this._data?.contentAnalysis.paragraphCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Images">
						<div slot="editor">${this._data?.contentAnalysis.images}</div>
					</umb-property-layout>
					<umb-property-layout label="Resources">
						<div slot="editor">${this._data?.contentAnalysis.resources}</div>
					</umb-property-layout>
					<umb-property-layout label="Links">
						<div slot="editor">${this._data?.contentAnalysis.links}</div>
					</umb-property-layout>
					<umb-property-layout label="External Links">
						<div slot="editor">${this._data?.contentAnalysis.externalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Internal Links">
						<div slot="editor">${this._data?.contentAnalysis.internalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Readability Score" description="Flesch Reading Ease Score. Scores around 100 mean the document is extremely easy to read, while scores around 0 mean that it is highly complex and difficult to understand.">
						<div slot="editor">${Math.round(this._data?.contentAnalysis.readabilityScore)}</div>
					</umb-property-layout>
					<umb-property-layout label="Keyword Density">
						<div slot="editor">${this._data?.contentAnalysis.keywordDensity}</div>
					</umb-property-layout>
				</uui-box>
			` : ''}

			${this._data?.performanceData ? html`
				<uui-box headline="Performance">
					<umb-property-layout label="Page Load Time">
						<div slot="editor">${this._data?.performanceData.pageLoadTime}ms</div>
					</umb-property-layout>
					<umb-property-layout label="First Contentful Paint">
						<div slot="editor">${this._data?.performanceData.firstContentfulPaint?.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Largest Contentful Paint">
						<div slot="editor">${this._data?.performanceData.largestContentfulPaint?.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Time to Interactive">
						<div slot="editor">${this._data?.performanceData.timeToInteractive?.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Total Requests">
						<div slot="editor">${this._data?.performanceData.totalRequests}</div>
					</umb-property-layout>
					<umb-property-layout label="Total Bytes">
						<div slot="editor">${this._data?.performanceData.totalBytes}b</div>
					</umb-property-layout>
				</uui-box>
			` : ''}

			${this._data?.accessibilityData ? html`
				<uui-box headline="Accessibility">
					<umb-property-layout label="ARIA Labels">
						<div slot="editor">${this._data?.accessibilityData.ariaLabelCount}</div>
					</umb-property-layout>
					<umb-property-layout label="ARIA Described By">
						<div slot="editor">${this._data?.accessibilityData.ariaDescribedByCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Skip to Content">
						<div slot="editor">${this._data?.accessibilityData.hasSkipToContent ? 'Yes' : 'No'}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Proper Heading Structure">
						<div slot="editor">${this._data?.accessibilityData.hasProperHeadingStructure ? 'Yes' : 'No'}</div>
					</umb-property-layout>
				</uui-box>
			` : ''}

			${this._data?.technicalSeoData ? html`
				<uui-box headline="Technical SEO">
					<umb-property-layout label="Content Type">
						<div slot="editor">${this._data?.technicalSeoData.contentType}</div>
					</umb-property-layout>
					<umb-property-layout label="Charset">
						<div slot="editor">${this._data?.technicalSeoData.charset}</div>
					</umb-property-layout>
					<umb-property-layout label="Has GZip Compression">
						<div slot="editor">${this._data?.technicalSeoData.hasGzipCompression ? 'Yes' : 'No'}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Browser Caching">
						<div slot="editor">${this._data?.technicalSeoData.hasBrowserCaching ? 'Yes' : 'No'}</div>
					</umb-property-layout>
					<umb-property-layout label="Has HTTPS">
						<div slot="editor">${this._data?.technicalSeoData.hasHttps ? 'Yes' : 'No'}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Valid HTML">
						<div slot="editor">${this._data?.technicalSeoData.hasValidHtml ? 'Yes' : 'No'}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Schema Markup">
						<div slot="editor">${this._data?.technicalSeoData.hasSchemaMarkup ? 'Yes' : 'No'}</div>
					</umb-property-layout>
					<umb-property-layout label="Schema Type">
						<div slot="editor">${this._data?.technicalSeoData.schemaType}</div>
					</umb-property-layout>
				</uui-box>
			` : ''}

			${this._data?.contentQualityData ? html`
				<uui-box headline="Content Quality">
					<umb-property-layout label="Has Thin Content">
						<div slot="editor">${this._data?.contentQualityData.hasThinContent ? 'Yes' : 'No'}</div>
					</umb-property-layout>
					<umb-property-layout label="Content Score">
						<div slot="editor">${this._data?.contentQualityData.contentScore}</div>
					</umb-property-layout>
				</uui-box>
			` : ''}

			${this._data?.emissionsData ? html`
				<uui-box headline="Emissions">
					<umb-property-layout label="Emissions per Page View">
						<div slot="editor">${this._data?.emissionsData.emissionsPerPageView}g CO<sub>2</sub></div>
					</umb-property-layout>
					<umb-property-layout label="Carbon Rating">
						<div slot="editor">
							<content-audit-carbon-intensity-label .value=${this._data?.emissionsData.carbonRating}>
							</content-audit-carbon-intensity-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ''}
			</div>
		`;
    }

    #renderSidebar() {
        return html`
			<div>
			${this._data?.pageData ? html`
				<uui-box headline="Page">
					<umb-property-layout label="URL" orientation="vertical">
						<div slot="editor"><a href=${this._data?.pageData.url} target="_blank">${this._data?.pageData.url}</a></div>
					</umb-property-layout>
					<umb-property-layout label="Unique" orientation="vertical">
						<div slot="editor">${this._data?.pageData.unique}</div>
					</umb-property-layout>
					<umb-property-layout label="Status Code" orientation="vertical">
						<div slot="editor">
							<content-audit-status-code-label .statusCode=${this._data?.pageData.statusCode}></content-audit-status-code-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ``}
			</div>
		`
    }

    override render() {
        if (!this._data) return html`<uui-box>No data available</uui-box>`;

        return html`
			${this.#renderData()}
			${this.#renderSidebar()}
		`;
    }

    static override styles = [
        UmbTextStyles,
        css`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}

			uui-box {
				margin-bottom: var(--uui-size-layout-1);
			}
		`
    ]
}

export default ContentAuditAllPagesDetailsWorkspaceViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-all-pages-details-workspace-view': ContentAuditAllPagesDetailsWorkspaceViewElement;
    }
}
