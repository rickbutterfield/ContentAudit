import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { OverviewDto } from '../../../../../api';
import { UmbTableColumn, UmbTableItem, UmbTableConfig } from '../../../../../exports';

@customElement('content-audit-audits-table-collection-view')
export class ContentAuditAuditsTableCollectionViewElement extends UmbLitElement {

    @state()
    private _tableConfig: UmbTableConfig = {
        allowSelection: false,
        hideIcon: true
    };

    @state()
    private _tableColumns: Array<UmbTableColumn> = [
        {
            name: 'Run Date',
            alias: 'runDate',
        },
        {
            name: 'Total URLs',
            alias: 'total'
        },
        {
            name: 'Internal URLs',
            alias: 'totalInternal'
        },
        {
            name: 'External URLs',
            alias: 'totalExternal'
        },
        {
            name: 'Assets',
            alias: 'totalAssets'
        },
        {
            name: 'Blocked',
            alias: 'totalBlocked'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext<OverviewDto>;

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

    #createTableItems(audits: OverviewDto[]) {
        this._tableItems = audits.map((audit) => {
            return {
                id: audit.key,
                entityType: 'audits',
                icon: 'icon-calendar',
                data: [
                    {
                        columnAlias: 'runDate',
                        value: html`<a href=${'section/audit/workspace/audits/edit/' + audit.key}>${audit.runDate ? this.localize.date(audit.runDate, { dateStyle: 'medium', timeStyle: 'short' }) : 'Unknown'}</a>`
                    },
                    {
                        columnAlias: 'total',
                        value: audit.total ?? 0
                    },
                    {
                        columnAlias: 'totalInternal',
                        value: audit.totalInternal ?? 0
                    },
                    {
                        columnAlias: 'totalExternal',
                        value: audit.totalExternal ?? 0
                    },
                    {
                        columnAlias: 'totalAssets',
                        value: audit.totalAssets ?? 0
                    },
                    {
                        columnAlias: 'totalBlocked',
                        value: audit.totalBlocked ?? 0
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

export default ContentAuditAuditsTableCollectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-audits-table-collection-view': ContentAuditAuditsTableCollectionViewElement;
    }
}
