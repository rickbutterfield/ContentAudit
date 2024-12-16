import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { ImageDto } from '../../../../../api';
import { UmbTableColumn, UmbTableItem, UmbTableConfig } from '../../../../../exports';

@customElement('content-audit-images-alt-text-table-collection-view')
export class ContentAuditImagesAltTextTableCollectionViewElement extends UmbLitElement {

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
            name: 'Found on page',
            alias: 'foundPage'
        },
        {
            name: 'Alt text',
            alias: 'altText'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext<ImageDto>;

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

    #createTableItems(images: ImageDto[]) {
        this._tableItems = images.map((image) => {
            return {
                id: image.unique,
                entityType: image.entityType,
                icon: 'icon-alert',
                data: [
                    {
                        columnAlias: 'url',
                        value: image.url
                    },
                    {
                        columnAlias: 'foundPage',
                        value: html`<a href="/umbraco/section/content/workspace/document/edit/${image.unique}">${image.foundPage}</a>`
                    },
                    {
                        columnAlias: 'altText',
                        value: image.altText
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

export default ContentAuditImagesAltTextTableCollectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-images-alt-text-table-collection-view': ContentAuditImagesAltTextTableCollectionViewElement;
    }
}
