import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT } from "../all-pages-workspace.context";
import { AuditService, ImageDto } from "../../../../../api";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import type { UmbTableConfig, UmbTableColumn, UmbTableItem } from "@umbraco-cms/backoffice/components";

@customElement('content-audit-all-pages-images-workspace-view')
export class ContentAuditAllPagesImagesWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
	@state()
	private _images: ImageDto[] = [];

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
				this.#loadImages(unique);
			}
		}, 'umbCollectionItemsObserver');
	}

	async #loadImages(unique: string) {
		this._loading = true;
		const { data } = await tryExecute(this, AuditService.getPageImages({ path: { id: unique } }));
		if (data) {
			this._images = data;
			this.#createTableItems(data);
		}
		this._loading = false;
	}

	#createTableItems(images: ImageDto[]) {
		this._tableItems = images.map((image) => {
			return {
				id: image.unique,
				data: [
					{
						columnAlias: 'url',
						value: image.url
					},
					{
						columnAlias: 'contentType',
						value: image.contentType
					}
				]
			}
		});
	}

	override render() {
		if (this._loading) return html`<uui-loader-bar></uui-loader-bar>`;
		if (this._images.length == 0) return html`<uui-box>No images to report for this page</uui-box>`;

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

export default ContentAuditAllPagesImagesWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-all-pages-images-workspace-view': ContentAuditAllPagesImagesWorkspaceViewElement;
	}
}
