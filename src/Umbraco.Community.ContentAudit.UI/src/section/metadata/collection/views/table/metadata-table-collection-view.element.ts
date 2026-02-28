import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { MetadataListItemDto } from '../../../../../api';
import type { UmbTableColumn, UmbTableItem, UmbTableConfig } from '@umbraco-cms/backoffice/components';

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
            name: 'Title',
            alias: 'metaTitle'
        },
        {
            name: 'Description',
            alias: 'metaDescription'
        },
        {
            name: 'noindex',
            alias: 'noindex'
        },
        {
            name: 'nofollow',
            alias: 'nofollow'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext<MetadataListItemDto>;

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

    #createTableItems(pages: MetadataListItemDto[]) {
        this._tableItems = pages.map((page) => {
            return {
                id: page.unique,
                data: [
                    {
                        columnAlias: 'url',
                        value: html`<a href=${'section/audit/workspace/all-pages/edit/' + page.unique}>${page.pageData.url}</a>`
                    },
                    {
                        columnAlias: 'metaTitle',
                        value: page.seoData.title
                    },
                    {
                        columnAlias: 'metaDescription',
                        value: page.seoData.metaDescription
                    },
                    {
                        columnAlias: 'noindex',
                        value: page.seoData.hasNoIndex ? 'Yes' : 'No'
                    },
                    {
                        columnAlias: 'nofollow',
                        value: page.seoData.hasNoFollow ? 'Yes' : 'No'
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
