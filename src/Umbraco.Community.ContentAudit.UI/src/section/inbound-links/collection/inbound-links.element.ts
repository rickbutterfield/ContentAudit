import { customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UmbCollectionDefaultElement } from '@umbraco-cms/backoffice/collection';

@customElement('content-audit-inbound-links-collection')
export class ContentAuditInboundLinksCollectionElement extends UmbCollectionDefaultElement {
	protected override renderToolbar() {
		return html`
			<umb-collection-toolbar slot="header">
				<umb-collection-filter-field></umb-collection-filter-field>
			</umb-collection-toolbar>
		`;
	}
}

export default ContentAuditInboundLinksCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-inbound-links-collection': ContentAuditInboundLinksCollectionElement;
	}
}