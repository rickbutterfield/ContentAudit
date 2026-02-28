import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT } from "../all-pages-workspace.context";
import { AuditService, LinkDto } from "../../../../../api";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import type { UmbTableConfig, UmbTableColumn, UmbTableItem } from "@umbraco-cms/backoffice/components";

@customElement('content-audit-all-pages-links-workspace-view')
export class ContentAuditAllPagesLinksWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
	@state()
	private _links: LinkDto[] = [];

	@state()
	private _loading = true;

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
			name: 'Type',
			alias: 'type'
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
				this.#loadLinks(unique);
			}
		}, 'umbCollectionItemsObserver');
	}

	async #loadLinks(unique: string) {
		this._loading = true;
		const { data } = await tryExecute(this, AuditService.getPageLinks({ path: { id: unique } }));
		if (data) {
			this._links = data;
			this.#createTableItems(data);
		}
		this._loading = false;
	}

	#createTableItems(links: LinkDto[]) {
		this._tableItems = links.map((link) => {
			return {
				id: link.unique,
				data: [
					{
						columnAlias: 'url',
						value: link.url
					},
					{
						columnAlias: 'type',
						value: html`${link.isExternal ? 'External' : 'Internal'}`
					}
				]
			}
		});
	}

	override render() {
		if (this._loading) return html`<uui-loader-bar></uui-loader-bar>`;
		if (this._links.length == 0) return html`<uui-box>No links to report for this page</uui-box>`;

		return html`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
		`;
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

export default ContentAuditAllPagesLinksWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-all-pages-links-workspace-view': ContentAuditAllPagesLinksWorkspaceViewElement;
	}
}
