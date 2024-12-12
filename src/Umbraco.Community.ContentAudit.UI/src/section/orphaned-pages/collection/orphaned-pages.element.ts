import { customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UmbCollectionDefaultElement } from '@umbraco-cms/backoffice/collection';

@customElement('content-audit-orphaned-pages-collection')
export class ContentAuditOrphanedPagesCollectionElement extends UmbCollectionDefaultElement {
	protected override renderToolbar() {
		return html`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
	}
}

export default ContentAuditOrphanedPagesCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-orphaned-pages-collection': ContentAuditOrphanedPagesCollectionElement;
	}
}