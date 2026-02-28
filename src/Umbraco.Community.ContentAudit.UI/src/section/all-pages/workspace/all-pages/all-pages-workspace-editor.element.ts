import { css, customElement, html, state, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT } from "./all-pages-workspace.context";
import { UMB_WORKSPACE_PATH_PATTERN } from "@umbraco-cms/backoffice/workspace";
import { EnrichService, PageAnalysisDto } from "../../../../api";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { CONTENT_AUDIT_CONTEXT_TOKEN } from "../../../../context/audit.context";

@customElement('content-audit-all-pages-workspace-editor')
export class ContentAuditAllPagesWorkspaceEditorElement extends UmbLitElement {
	#workspaceContext?: typeof CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT.TYPE;

	@state()
	_data?: PageAnalysisDto;

	@state()
	_enriching = false;

	@state()
	_pageEnrichingUrl = '';

	constructor() {
		super();

		this.consumeContext(CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance;

			this.observe(this.#workspaceContext?.data, (data) => {
				this._data = data;
			});
		});

		this.consumeContext(CONTENT_AUDIT_CONTEXT_TOKEN, (context) => {
			if (!context) return;
			this.observe(context.pageEnrichingUrl, (url) => {
				this._pageEnrichingUrl = url;
			});
		});
	}

	async #onEnrichPage() {
		if (!this._data?.pageData?.url || !this._data?.unique) return;

		this._enriching = true;
		const notificationContext = await this.getContext(UMB_NOTIFICATION_CONTEXT);

		notificationContext?.peek('default', {
			data: { headline: 'Content Audit', message: 'Enriching page with Playwright performance data...' }
		});

		try {
			await EnrichService.enrichPage({
				query: {
					url: this._data.pageData.url,
					pageUnique: this._data.unique,
				}
			});

			notificationContext?.peek('positive', {
				data: { headline: 'Content Audit', message: 'Page enriched successfully.' }
			});

			await this.#workspaceContext?.load(this._data.unique);
		} catch {
			notificationContext?.peek('danger', {
				data: { headline: 'Content Audit', message: 'Failed to enrich page. The page may not be accessible.' }
			});
		} finally {
			this._enriching = false;
		}
	}

	get #isEnrichBusy(): boolean {
		return this._enriching || !!this._pageEnrichingUrl;
	}

	override render() {
		if (this._data) {
			return html`
				<umb-workspace-editor back-path="${CONTENT_AUDIT_ALL_PAGES_ROOT_WORKSPACE_PATH}" .enforceNoFooter="${true}">
					<div slot="header">
						<h3 id="headline">${this._data.pageData?.url}</h3>
					</div>
					${this.#renderEnrichButton()}
					<slot></slot>
				</umb-workspace-editor>
			`;
		}
	}

	#renderEnrichButton() {
		if (!this._data?.pageData?.url) return nothing;

		const busy = this.#isEnrichBusy;

		if (busy) {
			return html`
				<div slot="action-menu" class="enrich-status">
					<uui-loader-circle></uui-loader-circle>
					<span>${this._enriching ? 'Enriching page...' : 'Enrichment in progress...'}</span>
				</div>
			`;
		}

		return html`
			<uui-button
				slot="action-menu"
				look="secondary"
				label="Enrich Page"
				@click=${this.#onEnrichPage}>
				Enrich Page
			</uui-button>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			uui-button[slot="action-menu"] {
				margin-right: var(--uui-size-space-4);
			}

			.enrich-status {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				margin-right: var(--uui-size-space-4);
				color: var(--uui-color-text-alt);
				font-size: var(--uui-type-small-size);
			}

			.enrich-status uui-loader-circle {
				font-size: 1em;
			}
		`
	]
}

export default ContentAuditAllPagesWorkspaceEditorElement;

export const CONTENT_AUDIT_ALL_PAGES_ROOT_WORKSPACE_PATH = UMB_WORKSPACE_PATH_PATTERN.generateAbsolute({
	sectionName: 'audit',
	entityType: 'all-pages-root',
});


declare global {
	interface HTMLElementTagNameMap {
		'content-audit-all-pages-workspace-editor': ContentAuditAllPagesWorkspaceEditorElement;
	}
}
