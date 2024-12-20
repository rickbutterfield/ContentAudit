import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT } from "../issues-workspace.context";
import { IssueDto } from "../../../../../api";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { UmbTableConfig, UmbTableColumn, UmbTableItem } from "../../../../../interfaces";

@customElement('content-audit-issues-details-workspace-view')
export class ContentAuditIssuesDetailsWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
	@state()
	_data?: IssueDto;

	#workspaceContext?: typeof CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT.TYPE;

	constructor() {
		super();

		this.consumeContext(CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance;

			this.observe(this.#workspaceContext.data, (data) => {
				this._data = data;
			});
		});
	}

	private _tableConfig: UmbTableConfig = {
		allowSelection: false,
		hideIcon: true,
	};

	private get _tableColumns(): Array<UmbTableColumn> {
		let columns: UmbTableColumn[] = [{
			name: this._data?.images != null ? 'URL' : 'Page',
			alias: 'url'
		}];

		if (this._data?.images != null) {
			if (this._data?.images?.length !== 0) {
				columns.push({
					name: 'Found Page',
					alias: 'foundPage'
				});
			}
		}

		return columns;
	};

	private get _tableItems(): UmbTableItem[] {
		let tableItems: UmbTableItem[] | undefined;

		if (this._data?.pages?.length !== 0) {
			tableItems = this._data?.pages?.map((page) => {
				let tableItem: UmbTableItem = {
					id: page.unique,
					data: [
						{
							columnAlias: 'url',
							value: page.url
						}
					]
				}

				return tableItem;
			});
		}

		if (this._data?.images != null) {
			if (this._data?.images.length !== 0) {
				tableItems = this._data?.images?.map((page) => {
					let tableItem: UmbTableItem = {
						id: page.unique,
						data: [
							{
								columnAlias: 'url',
								value: page.url
							},
							{
								columnAlias: 'foundPage',
								value: page.foundPage
							}
						]
					}

					return tableItem;
				});
			}
		}

		return tableItems as UmbTableItem[];
	}

	#renderPages() {
		return html`
			<div>
				<umb-table
					.config=${this._tableConfig}
					.columns=${this._tableColumns}
					.items=${this._tableItems}>
				</umb-table>
			</div>
		`
	}

	#renderProperties() {
		return html`
			<uui-box>
				<umb-property-layout label="Name" orientation="vertical">
					<div slot="editor">${this._data?.name}</div>
				</umb-property-layout>
				<umb-property-layout label="Category" orientation="vertical">
					<div slot="editor">${this._data?.category}</div>
				</umb-property-layout>
				<umb-property-layout label="Description" orientation="vertical">
					<div slot="editor">${this._data?.description}</div>
				</umb-property-layout>

				<umb-property-layout label="Issue Type" orientation="vertical">
					<div slot="editor">
						<content-audit-issue-type-label .type=${this._data?.type}></content-audit-issue-type-label>
					</div>
				</umb-property-layout>
				<umb-property-layout label="Issue Priority" orientation="vertical">
					<div slot="editor">
						<content-audit-priority-type-label .type=${this._data?.priority}></content-audit-priority-type-label>
					</div>
				</umb-property-layout>
			</uui-box>
		`
	}

	override render() {
		return html`
			${this.#renderPages()}
			${this.#renderProperties()}
		`
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
		`
	]
}

export default ContentAuditIssuesDetailsWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-issues-details-workspace-view': ContentAuditIssuesDetailsWorkspaceViewElement;
	}
}
