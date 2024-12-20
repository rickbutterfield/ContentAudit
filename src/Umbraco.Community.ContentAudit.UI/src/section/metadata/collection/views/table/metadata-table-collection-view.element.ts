import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { InternalPageDto } from '../../../../../api';
import { UmbTableColumn, UmbTableItem, UmbTableConfig } from '../../../../../exports';

@customElement('content-audit-metadata-table-collection-view')
export class ContentAuditMetdataTableCollectionViewElement extends UmbLitElement {

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
            name: 'Meta Title',
            alias: 'metaTitle'
        },
        {
            name: 'Meta Description',
            alias: 'metaDescription'
        },
        {
            name: 'Meta Keywords',
            alias: 'metaKeywords'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext<InternalPageDto>;

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

    #createTableItems(pages: InternalPageDto[]) {
        this._tableItems = pages.map((page) => {
            return {
                id: page.unique,
                entityType: page.entityType,
                icon: 'icon-alert',
                data: [
                    {
                        columnAlias: 'url',
                        value: html`<a href="section/content/workspace/document/edit/${page.unique}">${page.url}</a>`
                    },
                    {
                        columnAlias: 'metaTitle',
                        value: page.metaTitle
                    },
                    {
                        columnAlias: 'metaDescription',
                        value: page.metaDescription
                    },
                    {
                        columnAlias: 'metaKeywords',
                        value: page.metaKeywords
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

export default ContentAuditMetdataTableCollectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-metadata-table-collection-view': ContentAuditMetdataTableCollectionViewElement;
    }
}
