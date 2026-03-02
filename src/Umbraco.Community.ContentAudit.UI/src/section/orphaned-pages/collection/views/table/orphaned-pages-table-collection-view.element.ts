import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbModalRouteRegistrationController } from '@umbraco-cms/backoffice/router';
import { UMB_WORKSPACE_MODAL } from '@umbraco-cms/backoffice/workspace';
import { PageDto } from '../../../../../api';
import type { UmbTableColumn, UmbTableItem, UmbTableConfig } from '@umbraco-cms/backoffice/components';

@customElement('content-audit-orphaned-pages-table-collection-view')
export class ContentAuditOrphanedPagesTableCollectionViewElement extends UmbLitElement {

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
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext<PageDto>;
    #editPath = '';

    constructor() {
        super();

        new UmbModalRouteRegistrationController(this, UMB_WORKSPACE_MODAL)
            .addAdditionalPath('all-pages')
            .onSetup(() => {
                return { data: { entityType: 'all-pages', preset: {} } };
            })
            .observeRouteBuilder((routeBuilder) => {
                this.#editPath = routeBuilder({});
                this.#observeCollectionItems();
            });

        this.consumeContext(UMB_COLLECTION_CONTEXT, (instance) => {
            this.#collectionContext = instance;
            this.#observeCollectionItems();
        });
    }

    #observeCollectionItems() {
        if (!this.#collectionContext) return;
        this.observe(this.#collectionContext.items, (items) => this.#createTableItems(items), 'umbCollectionItemsObserver');
    }

    #createTableItems(urls: PageDto[]) {
        this._tableItems = urls.map((page) => {
            return {
                id: page.unique,
                entityType: page.entityType,
                icon: 'icon-alert',
                data: [
                    {
                        columnAlias: 'url',
                        value: html`<a href=${this.#editPath + 'edit/' + page.unique}>${page.url}</a>`
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

export default ContentAuditOrphanedPagesTableCollectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-orphaned-pages-table-collection-view': ContentAuditOrphanedPagesTableCollectionViewElement;
    }
}
