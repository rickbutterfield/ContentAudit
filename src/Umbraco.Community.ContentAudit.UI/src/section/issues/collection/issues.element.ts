import { customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UmbCollectionDefaultElement } from '@umbraco-cms/backoffice/collection';

@customElement('content-audit-issues-collection')
export class ContentAuditIssuesCollectionElement extends UmbCollectionDefaultElement {
	protected override renderToolbar() {
		return html``;
	}
}

export default ContentAuditIssuesCollectionElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-issues-collection': ContentAuditIssuesCollectionElement;
	}
}