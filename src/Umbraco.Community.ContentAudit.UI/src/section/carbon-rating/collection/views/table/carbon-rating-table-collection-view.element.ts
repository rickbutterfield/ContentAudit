import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbModalRouteRegistrationController } from '@umbraco-cms/backoffice/router';
import { UMB_WORKSPACE_MODAL } from '@umbraco-cms/backoffice/workspace';
import { CarbonRatingListItemDto } from '../../../../../api';
import type { UmbTableColumn, UmbTableItem, UmbTableConfig } from '@umbraco-cms/backoffice/components';

@customElement('content-audit-carbon-rating-table-collection-view')
export class ContentAuditCarbonRatingTableCollectionViewElement extends UmbLitElement {

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
            name: 'Content Type',
            alias: 'contentType'
        },
        {
            name: 'Page Size',
            alias: 'pageSize'
        },
        {
            name: 'Carbon Rating',
            alias: 'carbonRating',
            elementName: 'content-audit-carbon-intensity-label'
        },
        {
            name: 'Emissions Per Page View',
            alias: 'emissionsPerPageView'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext<CarbonRatingListItemDto>;
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

    #createTableItems(pages: CarbonRatingListItemDto[]) {
        this._tableItems = pages.map((page) => {
            return {
                id: page?.unique,
                entityType: page?.entityType,
                icon: 'icon-alert',
                data: [
                    {
                        columnAlias: 'url',
                        value: html`<a href=${this.#editPath + 'edit/' + page.unique}>${page.pageData?.url}</a>`
                    },
                    {
                        columnAlias: 'contentType',
                        value: page.contentType,
                    },
                    {
                        columnAlias: 'pageSize',
                        value: html`${Math.round(page.totalBytes! / 1024)}KB`
                    },
                    {
                        columnAlias: 'carbonRating',
                        value: page.emissionsData.carbonRating
                    },
                    {
                        columnAlias: 'emissionsPerPageView',
                        value: `${page.emissionsData.emissionsPerPageView}g`
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

export default ContentAuditCarbonRatingTableCollectionViewElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-carbon-rating-table-collection-view': ContentAuditCarbonRatingTableCollectionViewElement;
    }
}
