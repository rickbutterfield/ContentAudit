import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { html, LitElement, nothing, customElement, property, css } from '@umbraco-cms/backoffice/external/lit';

@customElement('content-audit-issues-table-name-column-layout')
export class ContentAuditIssuesTableNameColumnLayout extends LitElement {
	@property({ attribute: false })
	value!: { unique: string; name: string, category: string, description: string };

	override render() {
		if (!this.value) return nothing;
		return html`
			<span>
				<a href=${'section/audit/workspace/issues/edit/' + this.value.unique}>
					<strong>${this.value.category}: ${this.value.name}</strong>
				</a>
				<br/>${this.value.description}
			</span>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			span {
				display: block;
				padding: var(--uui-size-2) 0;
			}
		`
	];
}

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-issues-table-name-column-layout': ContentAuditIssuesTableNameColumnLayout;
	}
}
