import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT } from "../all-pages-workspace.context";
import { LinkDto, PageAnalysisDto } from "../../../../../api";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { UmbTableConfig, UmbTableColumn, UmbTableItem } from "../../../../../interfaces";

@customElement('content-audit-all-pages-resources-workspace-view')
export class ContentAuditAllPagesResourcesWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
	@state()
	_data?: PageAnalysisDto;

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
		this.observe(this.#workspaceContext.data, (data) => {
			if (data) {
				this._data = data;
				this.#createTableItems(this._data.resources);
			}
		}, 'umbCollectionItemsObserver');
	}

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has('data')) {
			if (this._data) {
				if (this._data?.resources.length !== 0) {
					this.#createTableItems(this._data.resources);
				}
			}
		}
	}

	#createTableItems(resources: LinkDto[]) {
		this._tableItems = resources.map((resource) => {
			return {
				id: resource.unique,
				data: [
					{
						columnAlias: 'url',
						value: resource.url
					},
					{
						columnAlias: 'contentType',
						value: resource.contentType
					}
				]
			}
		});
	}

	override render() {
		if (!this._data) return html`<uui-box>No data available</uui-box>`;
		if (!this._data.resources) return html`<uui-box>No link data available</uui-box>`;
		if (this._data.resources.length == 0) return html`<uui-box>No resources to report for this page</uui-box>`;

		if (this._tableItems.length !== 0) {
			return html`
				<umb-table
					.config=${this._tableConfig}
					.columns=${this._tableColumns}
					.items=${this._tableItems}
				></umb-table>
			`;
		}
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
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
