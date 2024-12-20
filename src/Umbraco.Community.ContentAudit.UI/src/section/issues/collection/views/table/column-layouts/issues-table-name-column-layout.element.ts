import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { html, LitElement, nothing, customElement, property } from '@umbraco-cms/backoffice/external/lit';

@customElement('content-audit-issues-table-name-column-layout')
export class ContentAuditIssuesTableNameColumnLayout extends LitElement {
	@property({ attribute: false })
	value!: { unique: string; name: string, category: string, description: string };

	override render() {
		if (!this.value) return nothing;
		return html`
			<a href=${'section/audit/workspace/issues/edit/' + this.value.unique}>
				<strong>${this.value.category}: ${this.value.name}</strong>
			</a>
			<br/>${this.value.description}
		`;
	}

	static override styles = [UmbTextStyles];
}

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-issues-table-name-column-layout': ContentAuditIssuesTableNameColumnLayout;
	}
}
