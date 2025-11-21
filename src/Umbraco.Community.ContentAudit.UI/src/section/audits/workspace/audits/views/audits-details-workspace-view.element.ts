import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT } from "../audits-workspace.context";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";

@customElement('content-audit-audits-details-workspace-view')
export class ContentAuditAuditsDetailsWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
	@state()
	_data?: any;

	#workspaceContext?: typeof CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT.TYPE;

	constructor() {
		super();

		this.consumeContext(CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance;
			this.#observeData();
		});
	}

	#observeData() {
		if (!this.#workspaceContext) return;
		this.observe(this.#workspaceContext.data, (data) => {
			if (data) {
				this._data = data;
			}
		}, 'dataObserver');
	}

	override render() {
		if (!this._data) return html`<uui-box>No audit data available</uui-box>`;

		return html`
			<uui-box headline="Audit Details">
				<div class="audit-details">
					<p><strong>Unique ID:</strong> ${this._data.unique || 'N/A'}</p>
					<p>Additional audit details will be displayed here when the data structure is finalized.</p>
				</div>
			</uui-box>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.audit-details {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3);
			}
		`
	]
}

export default ContentAuditAuditsDetailsWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-audits-details-workspace-view': ContentAuditAuditsDetailsWorkspaceViewElement;
	}
}
