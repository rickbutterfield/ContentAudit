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

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('data')) {
            if (this.data.length !== 0) {
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
        this.observe(this.#collectionContext.items, (items) => this.#createTableItems(items), 'umbCollectionItemsObserver');
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

    override render() {
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
        css`
			:host {
				display: flex;
				flex-direction: column;
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
