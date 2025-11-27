import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT } from "../audits-workspace.context";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { IssueDto, OverviewDto } from "../../../../../api";
import { UmbTableConfig, UmbTableColumn, UmbTableItem } from "../../../../../interfaces";

@customElement('content-audit-audits-issues-workspace-view')
export class ContentAuditAuditsIssuesWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
	@state()
	_data?: OverviewDto;

	@state()
	_issues: IssueDto[] = [];

	#workspaceContext?: typeof CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT.TYPE;

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
		},
		{
			name: 'Number of URLs affected',
			alias: 'numberOfUrls'
		},
		{
			name: 'Percentage of all pages',
			alias: 'percentOfTotal'
		},
	];

	@state()
	private _tableItems: Array<UmbTableItem> = [];

	constructor() {
		super();

		this.consumeContext(CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance;
			this.#observeData();
		});
	}

	#observeData() {
		if (!this.#workspaceContext) return;
		
		this.observe(this.#workspaceContext.data, (data) => {
			if (data) {
				this._data = data;
			}
		}, 'dataObserver');

		this.observe(this.#workspaceContext.issues, (issues) => {
			if (issues) {
				this._issues = issues;
				this.#createTableItems(issues);
			}
		}, 'issuesObserver');
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
					},
					{
						columnAlias: 'numberOfUrls',
						value: issue.numberOfUrls
					},
					{
						columnAlias: 'percentOfTotal',
						value: `${issue.percentOfTotal?.toFixed(0)}%`
					}
				]
			}
		});
	}

	#renderSummary() {
		if (!this._data || !this._issues.length) return;

		const highPriorityCount = this._issues.filter(i => i.priority === 'High').length;
		const mediumPriorityCount = this._issues.filter(i => i.priority === 'Medium').length;
		const lowPriorityCount = this._issues.filter(i => i.priority === 'Low').length;

		return html`
			<div class="summary-container">
				<div class="summary-grid">
					<div class="summary-item">
						<span class="summary-label">Total Issues:</span>
						<span class="summary-value">${this._issues.length}</span>
					</div>
					<div class="summary-item high">
						<span class="summary-label">High Priority:</span>
						<span class="summary-value">${highPriorityCount}</span>
					</div>
					<div class="summary-item medium">
						<span class="summary-label">Medium Priority:</span>
						<span class="summary-value">${mediumPriorityCount}</span>
					</div>
					<div class="summary-item low">
						<span class="summary-label">Low Priority:</span>
						<span class="summary-value">${lowPriorityCount}</span>
					</div>
				</div>
			</div>
		`;
	}

	#renderTable() {
		if (!this._tableItems.length) {
			return html`
				<uui-box>
					<p>No issues found for this audit.</p>
				</uui-box>
			`;
		}

		return html`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
		`;
	}

	override render() {
		if (!this._data) {
			return html`
				<uui-box>
					<p>No audit data available</p>
				</uui-box>
			`;
		}

		return html`
			<div class="issues-container">
				${this.#renderSummary()}
				${this.#renderTable()}
			</div>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.issues-container {
				display: flex;
				flex-direction: column;
			}

			.summary-container {
				margin-bottom: var(--uui-size-space-5);
			}

			.summary-grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
				gap: var(--uui-size-space-4);
			}

			.summary-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: var(--uui-size-space-4);
				background: var(--uui-color-surface);
				border-radius: var(--uui-border-radius);
				border: 1px solid var(--uui-color-border);
			}

			.summary-item.high {
				border-left: 4px solid var(--uui-color-danger);
			}

			.summary-item.medium {
				border-left: 4px solid var(--uui-color-warning);
			}

			.summary-item.low {
				border-left: 4px solid var(--uui-color-default);
			}

			.summary-label {
				font-size: 0.875rem;
				color: var(--uui-color-text-alt);
			}

			.summary-value {
				font-size: 1.5rem;
				font-weight: 700;
				color: var(--uui-color-text);
			}
		`
	]
}

export default ContentAuditAuditsIssuesWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-audits-issues-workspace-view': ContentAuditAuditsIssuesWorkspaceViewElement;
	}
}
