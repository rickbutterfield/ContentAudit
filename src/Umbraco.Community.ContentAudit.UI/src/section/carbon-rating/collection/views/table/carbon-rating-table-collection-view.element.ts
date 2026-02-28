import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { PageAnalysisDto } from '../../../../../api';
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

    #collectionContext?: UmbDefaultCollectionContext<PageAnalysisDto>;

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

    #createTableItems(pages: PageAnalysisDto[]) {
        this._tableItems = pages.map((page) => {
            return {
                id: page?.unique,
                entityType: page?.entityType,
                icon: 'icon-alert',
                data: [
                    {
                        columnAlias: 'url',
                        value: html`<a href=${'section/audit/workspace/all-pages/edit/' + page.unique}>${page.pageData?.url}</a>`
                    },
                    {
                        columnAlias: 'contentType',
                        value: page.technicalSeoData?.contentType,
                    },
                    {
                        columnAlias: 'pageSize',
                        value: html`${Math.round(page.performanceData?.totalBytes! / 1024)}KB`
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
