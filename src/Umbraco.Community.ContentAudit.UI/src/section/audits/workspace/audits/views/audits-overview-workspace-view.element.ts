import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbWorkspaceViewElement } from "@umbraco-cms/backoffice/workspace";
import { customElement, state } from "lit/decorators.js";
import { CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT } from "../audits-workspace.context";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";
import { OverviewDto } from "../../../../../api";

@customElement('content-audit-audits-overview-workspace-view')
export class ContentAuditAuditsOverviewWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceViewElement {
	@state()
	_data?: OverviewDto;

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

	#renderStatCard(label: string, value: number | null | undefined) {
		return html`
			<div class="stat-card">
				<div class="stat-label">${label}</div>
				<div class="stat-value">${value ?? 0}</div>
			</div>
		`;
	}

	#renderAuditDetails() {
		if (!this._data || !this._data.runDate) {
			return html`
				<uui-box headline="No Audit Data">
					<p>No audit has been run yet. Please run an audit to see results.</p>
				</uui-box>
			`;
		}

		return html`
			<div class="overview-container">
				<uui-box headline="Audit Run Information">
					<div class="info-grid">
						<div class="info-item">
							<strong>Run Date:</strong>
							<span>${this.localize.date(this._data.runDate, { dateStyle: 'long', timeStyle: 'short' })}</span>
						</div>
						<div class="info-item">
							<strong>Audit Key:</strong>
							<span>${this._data.key}</span>
						</div>
					</div>
				</uui-box>

				<uui-box headline="URL Statistics">
					<div class="stats-grid">
						${this.#renderStatCard('Total URLs', this._data.total)}
						${this.#renderStatCard('Internal URLs', this._data.totalInternal)}
						${this.#renderStatCard('External URLs', this._data.totalExternal)}
						${this.#renderStatCard('Asset URLs', this._data.totalAssets)}
						${this.#renderStatCard('Blocked URLs', this._data.totalBlocked)}
					</div>
				</uui-box>

				<uui-box headline="Breakdown">
					<div class="breakdown-container">
						${this.#renderBreakdownBar()}
						${this.#renderBreakdownLegend()}
					</div>
				</uui-box>
			</div>
		`;
	}

	#renderBreakdownBar() {
		if (!this._data || !this._data.total || this._data.total === 0) {
			return html`<p>No data available</p>`;
		}

		const internalPercent = ((this._data.totalInternal ?? 0) / this._data.total) * 100;
		const externalPercent = ((this._data.totalExternal ?? 0) / this._data.total) * 100;
		const assetsPercent = ((this._data.totalAssets ?? 0) / this._data.total) * 100;
		const blockedPercent = ((this._data.totalBlocked ?? 0) / this._data.total) * 100;

		return html`
			<div class="breakdown-bar">
				<div class="bar-segment bar-internal" style="width: ${internalPercent}%" title="Internal URLs: ${this._data.totalInternal}"></div>
				<div class="bar-segment bar-external" style="width: ${externalPercent}%" title="External URLs: ${this._data.totalExternal}"></div>
				<div class="bar-segment bar-assets" style="width: ${assetsPercent}%" title="Assets: ${this._data.totalAssets}"></div>
				<div class="bar-segment bar-blocked" style="width: ${blockedPercent}%" title="Blocked: ${this._data.totalBlocked}"></div>
			</div>
		`;
	}

	#renderBreakdownLegend() {
		return html`
			<div class="breakdown-legend">
				<div class="legend-item">
					<span class="legend-color bar-internal"></span>
					<span>Internal URLs (${this._data?.totalInternal ?? 0})</span>
				</div>
				<div class="legend-item">
					<span class="legend-color bar-external"></span>
					<span>External URLs (${this._data?.totalExternal ?? 0})</span>
				</div>
				<div class="legend-item">
					<span class="legend-color bar-assets"></span>
					<span>Assets (${this._data?.totalAssets ?? 0})</span>
				</div>
				<div class="legend-item">
					<span class="legend-color bar-blocked"></span>
					<span>Blocked (${this._data?.totalBlocked ?? 0})</span>
				</div>
			</div>
		`;
	}

	override render() {
		return html`${this.#renderAuditDetails()}`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.overview-container {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-5);
			}

			.info-grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
				gap: var(--uui-size-space-4);
			}

			.info-item {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
			}

			.info-item strong {
				color: var(--uui-color-text-alt);
				font-size: 0.875rem;
			}

			.stats-grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
				gap: var(--uui-size-space-4);
			}

			.stat-card {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: var(--uui-size-space-4);
				background: var(--uui-color-surface);
				border-radius: var(--uui-border-radius);
				border: 1px solid var(--uui-color-border);
			}

			.stat-label {
				font-size: 0.875rem;
				color: var(--uui-color-text-alt);
				margin-bottom: var(--uui-size-space-2);
				text-align: center;
			}

			.stat-value {
				font-size: 2rem;
				font-weight: 700;
				color: var(--uui-color-text);
			}

			.breakdown-container {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-4);
			}

			.breakdown-bar {
				display: flex;
				height: 40px;
				border-radius: var(--uui-border-radius);
				overflow: hidden;
				background: var(--uui-color-surface);
			}

			.bar-segment {
				height: 100%;
				transition: opacity 0.2s;
			}

			.bar-segment:hover {
				opacity: 0.8;
			}

			.bar-internal {
				background-color: var(--uui-color-positive);
			}

			.bar-external {
				background-color: var(--uui-color-default);
			}

			.bar-assets {
				background-color: var(--uui-color-selected);
			}

			.bar-blocked {
				background-color: var(--uui-color-danger);
			}

			.breakdown-legend {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-4);
			}

			.legend-item {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.legend-color {
				width: 20px;
				height: 20px;
				border-radius: var(--uui-border-radius);
			}
		`
	]
}

export default ContentAuditAuditsOverviewWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'content-audit-audits-overview-workspace-view': ContentAuditAuditsOverviewWorkspaceViewElement;
	}
}
