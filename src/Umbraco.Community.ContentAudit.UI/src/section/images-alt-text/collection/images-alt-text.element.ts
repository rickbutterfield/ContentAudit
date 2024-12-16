import { customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UmbCollectionDefaultElement } from '@umbraco-cms/backoffice/collection';

@customElement('content-audit-images-alt-text-collection')
export class ContentAuditImagesAltTextCollectionElement extends UmbCollectionDefaultElement {
	protected override renderToolbar() {
		return html`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
	}
}

export default ContentAuditImagesAltTextCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-images-alt-text-collection': ContentAuditImagesAltTextCollectionElement;
	}
}