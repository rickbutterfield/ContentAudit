import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT } from "../all-pages-workspace.context";
import { AuditService, IssueDto } from "../../../../../api";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import type { UmbTableConfig, UmbTableColumn, UmbTableItem } from "@umbraco-cms/backoffice/components";

@customElement('content-audit-all-pages-issues-workspace-view')
export class ContentAuditAllPagesIssuesWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
	@state()
	private _issues: IssueDto[] = [];

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
		this.observe(this.#workspaceContext.unique, (unique) => {
			if (unique) {
				this.#loadIssues(unique);
			}
		}, 'umbCollectionItemsObserver');
	}

	async #loadIssues(unique: string) {
		this._loading = true;
		const { data } = await tryExecute(this, AuditService.getPageIssues({ path: { id: unique } }));
		if (data) {
			this._issues = data;
			this.#createTableItems(data);
		}
		this._loading = false;
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
						value: html`<content-audit-issue-type-label .type=${issue.type}></content-audit-issue-type-label>`
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
		if (this._loading) return html`<uui-loader-bar></uui-loader-bar>`;
		if (this._issues.length == 0) return html`<uui-box>No issues to report for this page</uui-box>`;

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
