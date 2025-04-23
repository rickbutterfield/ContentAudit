import { css, customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UMB_COLLECTION_CONTEXT, UmbCollectionDefaultElement, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { UUITextStyles } from '@umbraco-cms/backoffice/external/uui';
import { ContentAuditCoreWebVitalsCollectionFilterModel } from './types';
import { PageAnalysisDto } from '../../../api';

@customElement('content-audit-core-web-vitals-collection')
export class ContentAuditCoreWebVitalsCollectionElement extends UmbCollectionDefaultElement {
    _collectionContext?: UmbDefaultCollectionContext<PageAnalysisDto, ContentAuditCoreWebVitalsCollectionFilterModel>;

    constructor() {
        super();

        this.consumeContext(UMB_COLLECTION_CONTEXT, (collectionContext) => {
            this._collectionContext = collectionContext;
        });
    }

    protected override renderToolbar() {
        return html`
		    <umb-collection-toolbar slot="header">
			    <umb-collection-filter-field></umb-collection-filter-field>
		    </umb-collection-toolbar>
	    `;
    }

    static override styles = [
        UUITextStyles,
        css`
			:host {
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				gap: var(--uui-size-space-5);
				height: 100%;
			}

            #empty-state {
	            height: 80%;
	            align-content: center;
	            text-align: center;
            }
		`,
    ];
}

export default ContentAuditCoreWebVitalsCollectionElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-core-web-vitals-collection': ContentAuditCoreWebVitalsCollectionElement;
    }
}