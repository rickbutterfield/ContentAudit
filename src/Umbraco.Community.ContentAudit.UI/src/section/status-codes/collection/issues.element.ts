import { customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UmbCollectionDefaultElement } from '@umbraco-cms/backoffice/collection';

@customElement('content-audit-status-codes-collection')
export class ContentAuditStatusCodesCollectionElement extends UmbCollectionDefaultElement {
	protected override renderToolbar() {
		return html``;
	}
}

export default ContentAuditStatusCodesCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-status-codes-collection': ContentAuditStatusCodesCollectionElement;
	}
}