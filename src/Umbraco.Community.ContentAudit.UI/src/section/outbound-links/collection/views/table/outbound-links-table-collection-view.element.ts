import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { ExternalPageGroupDto } from '../../../../../api';
import { UmbTableColumn, UmbTableItem, UmbTableConfig } from '../../../../../exports';

@customElement('content-audit-outbound-links-table-collection-view')
export class ContentAuditddOutboundLinksTableCollectionViewElement extends UmbLitElement {

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
            name: 'Status Code',
            alias: 'statusCode'
        },
        {
            name: 'Content Type',
            alias: 'contentType'
            },
            {
                name: 'Outlinks',
                alias: 'outlinks'
            }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext<ExternalPageGroupDto>;

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

    #createTableItems(externalPageGrouping: ExternalPageGroupDto[]) {
        this._tableItems = externalPageGrouping.map((externalPageGroup) => {
            return {
                id: externalPageGroup.unique,
                data: [
                    {
                        columnAlias: 'url',
                        value: externalPageGroup.url
                    },
                    {
                        columnAlias: 'statusCode',
                        value: html`<content-audit-status-code-label .statusCode=${externalPageGroup.statusCode}></content-audit-status-code-label>`
                    },
                    {
                        columnAlias: 'contentType',
                        value: externalPageGroup.contentType
                    },
                    {
                        columnAlias: 'outlinks',
                        value: externalPageGroup.externalPages?.length
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

export default ContentAuditddOutboundLinksTableCollectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-outbound-links-table-collection-view': ContentAuditddOutboundLinksTableCollectionViewElement;
    }
}
