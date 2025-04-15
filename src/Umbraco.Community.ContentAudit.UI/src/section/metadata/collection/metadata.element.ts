import { css, customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UMB_COLLECTION_CONTEXT, UmbCollectionDefaultElement, UmbCollectionFilterModel, UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import { PageDto } from '../../../api';
import { UUITextStyles } from '@umbraco-cms/backoffice/external/uui';

@customElement('content-audit-metadata-collection')
export class ContentAuditMetadataCollectionElement extends UmbCollectionDefaultElement {
	_collectionContext?: UmbDefaultCollectionContext<PageDto, UmbCollectionFilterModel>;

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

export default ContentAuditMetadataCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-metadata-collection': ContentAuditMetadataCollectionElement;
	}
}