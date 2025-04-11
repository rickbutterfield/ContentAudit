import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { InternalPageGroupDto } from '../../../../../api';
import { UmbTableColumn, UmbTableItem, UmbTableConfig } from '../../../../../exports';

@customElement('content-audit-inbound-links-table-collection-view')
export class ContentAuditInboundLinksTableCollectionViewElement extends UmbLitElement {

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
            name: 'Inlinks',
            alias: 'inlinks'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext<InternalPageGroupDto>;

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

    #createTableItems(internalPageGrouping: InternalPageGroupDto[]) {
        this._tableItems = internalPageGrouping.map((internalPageGroup) => {
            return {
                id: internalPageGroup.unique,
                data: [
                    {
                        columnAlias: 'url',
                        value: html`<a href="${internalPageGroup.url}" target="_blank">${internalPageGroup.url}</a>`
                    },
                    {
                        columnAlias: 'statusCode',
                        value: html`<content-audit-status-code-label .statusCode=${internalPageGroup.statusCode}></content-audit-status-code-label>`
                    },
                    {
                        columnAlias: 'contentType',
                        value: internalPageGroup.contentType
                    },
                    {
                        columnAlias: 'inlinks',
                        value: internalPageGroup.internalPages?.length
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

export default ContentAuditInboundLinksTableCollectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-inbound-links-table-collection-view': ContentAuditInboundLinksTableCollectionViewElement;
    }
}
