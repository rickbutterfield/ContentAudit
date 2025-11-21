import { customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UmbCollectionDefaultElement } from '@umbraco-cms/backoffice/collection';

@customElement('content-audit-audits-collection')
export class ContentAuditAuditsCollectionElement extends UmbCollectionDefaultElement {
	protected override renderToolbar() {
		return html``;
	}
}

export default ContentAuditAuditsCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-audits-collection': ContentAuditAuditsCollectionElement;
	}
}
