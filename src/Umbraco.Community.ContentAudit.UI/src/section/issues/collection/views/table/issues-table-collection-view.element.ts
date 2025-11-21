import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, property, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { IssueDto } from '../../../../../api';
import { UmbTableColumn, UmbTableItem, UmbTableConfig } from '../../../../../exports';

import './column-layouts/issues-table-name-column-layout.element';

@customElement('content-audit-issues-table-collection-view')
export class ContentAuditIssuesTableCollectionViewElement extends UmbLitElement {

    @property({ type: Array, attribute: false })
    data: Array<IssueDto> = [];

    @property({ type: Boolean, attribute: 'hide-summary' })
    hideSummary: boolean = false;

    @state()
    private _issues: Array<IssueDto> = [];

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('data')) {
            if (this.data.length !== 0) {
                this._issues = this.data;
                this.#createTableItems(this.data);
            }
        }
    }

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

    #collectionContext?: UmbDefaultCollectionContext<IssueDto>;

    constructor() {
        super();

        this.consumeContext(UMB_COLLECTION_CONTEXT, (instance) => {
            this.#collectionContext = instance;
            this.#observeCollectionItems();
        });
    }

    #observeCollectionItems() {
        if (!this.#collectionContext) return;
        this.observe(this.#collectionContext.items, (items) => {
            this._issues = items;
            this.#createTableItems(items);
        }, 'umbCollectionItemsObserver');
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
                    },
                    {
                        columnAlias: 'numberOfUrls',
                        value: issue.numberOfUrls
                    },
                    {
                        columnAlias: 'percentOfTotal',
                        value: `${issue.percentOfTotal.toFixed(0)}%`
                    }
                ]
            }
        });
    }

    #renderSummary() {
        if (!this._issues.length || this.hideSummary) return;

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

    override render() {
        if (this._tableItems.length !== 0) {
            return html`
                ${this.#renderSummary()}
			    <umb-table
                    .config=${this._tableConfig}
                    .columns=${this._tableColumns}
                    .items=${this._tableItems}
                ></umb-table>
		    `;
        }
    }

    static override styles = [
        css`
			:host {
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
		`,
    ];
}

export default ContentAuditIssuesTableCollectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-issues-table-collection-view': ContentAuditIssuesTableCollectionViewElement;
    }
}
