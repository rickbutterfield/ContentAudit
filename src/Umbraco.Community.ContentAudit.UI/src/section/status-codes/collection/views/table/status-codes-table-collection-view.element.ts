import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { PageResponseDto } from '../../../../../api';
import { UmbTableColumn, UmbTableItem, UmbTableConfig } from '../../../../../exports';

@customElement('content-audit-status-codes-table-collection-view')
export class ContentAuditStatusCodesTableCollectionViewElement extends UmbLitElement {

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
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext<PageResponseDto>;

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

    _getColor(statusCode: number): string {
        console.log(statusCode >= 200);
        if (statusCode >= 200 && statusCode < 300) {
            return "positive";
        }

        if (statusCode >= 300 && statusCode < 400) {
            return "warning";
        }

        if (statusCode >= 400 && statusCode < 600) {
            return "danger";
        }

        return "default";
    }

    #createTableItems(urls: PageResponseDto[]) {
        this._tableItems = urls.map((url) => {
            return {
                id: url.unique,
                entityType: url.entityType,
                icon: 'icon-alert',
                data: [
                    {
                        columnAlias: 'url',
                        value: html`<a href=${url.url} target="_blank">${url.url}</a>`
                    },
                    {
                        columnAlias: 'statusCode',
                        value: html`<uui-tag color=${this._getColor(url.statusCode)}>${url.statusCode}</uui-tag>`
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

export default ContentAuditStatusCodesTableCollectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-status-codes-table-collection-view': ContentAuditStatusCodesTableCollectionViewElement;
    }
}
