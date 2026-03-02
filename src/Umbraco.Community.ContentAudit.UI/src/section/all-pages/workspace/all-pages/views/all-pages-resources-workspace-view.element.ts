import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT } from "../all-pages-workspace.context";
import { AuditService, ResourceDto } from "../../../../../api";
import { css, html, nothing } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import type { UmbTableConfig, UmbTableColumn, UmbTableItem } from "@umbraco-cms/backoffice/components";
import type { UUIPaginationEvent } from "@umbraco-cms/backoffice/external/uui";

const PAGE_SIZE = 50;

@customElement('content-audit-all-pages-resources-workspace-view')
export class ContentAuditAllPagesResourcesWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
	@state()
	private _resources: ResourceDto[] = [];

	@state()
	private _loading = true;

	@state()
	private _currentPage = 1;

	#workspaceContext?: typeof CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT.TYPE;

	@state()
	private _tableConfig: UmbTableConfig = {
		allowSelection: false,
		hideIcon: true
	};

	@state()
	private _tableColumns: Array<UmbTableColumn> = [
		{
			name: 'URL',
			alias: 'url',
		},
		{
			name: 'Content Type',
			alias: 'contentType'
		}
	];

	@state()
	private _tableItems: Array<UmbTableItem> = [];

	constructor() {
		super();

		this.consumeContext(CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance;
			this.#observeCollectionItems();
		});
	}

	#observeCollectionItems() {
		if (!this.#workspaceContext) return;
		this.observe(this.#workspaceContext.unique, (unique) => {
			if (unique) {
				this.#loadResources(unique);
			}
		}, 'umbCollectionItemsObserver');
	}

	async #loadResources(unique: string) {
		this._loading = true;
		const { data } = await tryExecute(this, AuditService.getPageResources({ path: { id: unique } }));
		if (data) {
			this._resources = data;
			this._currentPage = 1;
			this.#updateTableItems();
		}
		this._loading = false;
	}

	#updateTableItems() {
		const start = (this._currentPage - 1) * PAGE_SIZE;
		const pageItems = this._resources.slice(start, start + PAGE_SIZE);

		this._tableItems = pageItems.map((resource) => ({
			id: resource.unique,
			data: [
				{ columnAlias: 'url', value: resource.url },
				{ columnAlias: 'contentType', value: resource.contentType }
			]
		}));
	}

	#onPageChange(event: UUIPaginationEvent) {
		if (this._currentPage === event.target.current) return;
		this._currentPage = event.target.current;
		this.#updateTableItems();
	}

	#renderPagination() {
		const totalPages = Math.ceil(this._resources.length / PAGE_SIZE);
		if (totalPages <= 1) return nothing;

		return html`
			<div class="pagination">
				<uui-pagination .total=${totalPages} .current=${this._currentPage} @change=${this.#onPageChange}></uui-pagination>
			</div>
		`;
	}

	override render() {
		if (this._loading) return html`<uui-loader-bar></uui-loader-bar>`;
		if (this._resources.length == 0) return html`<uui-box>No resources to report for this page</uui-box>`;

		return html`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
			${this.#renderPagination()}
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.pagination {
				display: flex;
				justify-content: center;
				margin-top: var(--uui-size-layout-1);
			}
		`
	]
}

export default ContentAuditAllPagesResourcesWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-all-pages-resources-workspace-view': ContentAuditAllPagesResourcesWorkspaceViewElement;
	}
}
