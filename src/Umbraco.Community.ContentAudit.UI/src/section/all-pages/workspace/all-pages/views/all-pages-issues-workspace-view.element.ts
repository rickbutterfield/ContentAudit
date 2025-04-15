import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT } from "../all-pages-workspace.context";
import { IssueDto, PageAnalysisDto } from "../../../../../api";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { UmbTableConfig, UmbTableColumn, UmbTableItem } from "../../../../../interfaces";

@customElement('content-audit-all-pages-issues-workspace-view')
export class ContentAuditAllPagesIssuesWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
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
			name: 'Issue',
			alias: 'name',
			elementName: 'content-audit-issues-table-name-column-layout'
		},
		{
			name: 'Type',
			alias: 'type'
		},
		{
			name: 'Priority',
			alias: 'priority'
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
				this.#createTableItems(this._data.issues);
			}
		}, 'umbCollectionItemsObserver');
	}

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has('data')) {
			if (this._data) {
				if (this._data?.issues.length !== 0) {
					this.#createTableItems(this._data.issues);
				}
			}
		}
	}

	#createTableItems(issues: IssueDto[]) {
		this._tableItems = issues.map((issue) => {
			return {
				id: issue.unique,
				entityType: 'issue-type',
				icon: 'icon-alert',
				data: [
					{
						columnAlias: 'name',
						value: {
							unique: issue.unique,
							name: issue.name,
							category: issue.category,
							description: issue.description
						}
					},
					{
						columnAlias: 'type',
						value: html`<content-audit-issue-type-label .type=${issue.type}></content-audit-issue-type-label`
					},
					{
						columnAlias: 'priority',
						value: html`<content-audit-priority-type-label .type=${issue.priority}></content-audit-priority-type-label>`
					}
				]
			}
		});
	}

	override render() {
		if (!this._data) return html`<uui-box>No data available</uui-box>`;
		if (!this._data.issues) return html`<uui-box>No issue data available</uui-box>`;
		if (this._data.issues.length == 0) return html`<uui-box>No issues to report for this page</uui-box>`;

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
				height: 100%;
				padding: var(--uui-size-layout-1);
			}
		`
	]
}

export default ContentAuditAllPagesIssuesWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-all-pages-issues-workspace-view': ContentAuditAllPagesIssuesWorkspaceViewElement;
	}
}
