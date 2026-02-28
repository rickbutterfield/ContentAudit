import { UmbLitElement as k } from "@umbraco-cms/backoffice/lit-element";
import { t as y } from "./index-CTGZ8jTt.js";
import { r as $ } from "./state-BHWkriQ1.js";
import { CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT as A } from "./audits-workspace.context-5GbVvzHw.js";
import { html as n, css as z } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as E } from "@umbraco-cms/backoffice/style";
var U = Object.defineProperty, C = Object.getOwnPropertyDescriptor, _ = (t) => {
  throw TypeError(t);
}, g = (t, a, e, r) => {
  for (var l = r > 1 ? void 0 : r ? C(a, e) : a, u = t.length - 1, v; u >= 0; u--)
    (v = t[u]) && (l = (r ? v(a, e, l) : v(l)) || l);
  return r && l && U(a, e, l), l;
}, p = (t, a, e) => a.has(t) || _("Cannot " + e), h = (t, a, e) => (p(t, a, "read from private field"), a.get(t)), f = (t, a, e) => a.has(t) ? _("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), R = (t, a, e, r) => (p(t, a, "write to private field"), a.set(t, e), e), s = (t, a, e) => (p(t, a, "access private method"), e), d, i, b, o, m, x, w;
let c = class extends k {
  constructor() {
    super(), f(this, i), f(this, d), this.consumeContext(A, (t) => {
      R(this, d, t), s(this, i, b).call(this);
    });
  }
  render() {
    return n`${s(this, i, m).call(this)}`;
  }
};
d = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
b = function() {
  h(this, d) && this.observe(h(this, d).data, (t) => {
    t && (this._data = t);
  }, "dataObserver");
};
o = function(t, a) {
  return n`
			<div class="stat-card">
				<div class="stat-label">${t}</div>
				<div class="stat-value">${a ?? 0}</div>
			</div>
		`;
};
m = function() {
  return !this._data || !this._data.runDate ? n`
				<uui-box headline="No Audit Data">
					<p>No audit has been run yet. Please run an audit to see results.</p>
				</uui-box>
			` : n`
			<div class="overview-container">
				<uui-box headline="Audit Run Information">
					<div class="info-grid">
						<div class="info-item">
							<strong>Run Date:</strong>
							<span>${this.localize.date(this._data.runDate, { dateStyle: "long", timeStyle: "short" })}</span>
						</div>
						<div class="info-item">
							<strong>Audit Key:</strong>
							<span>${this._data.key}</span>
						</div>
					</div>
				</uui-box>

				<uui-box headline="URL Statistics">
					<div class="stats-grid">
						${s(this, i, o).call(this, "Total URLs", this._data.total)}
						${s(this, i, o).call(this, "Internal URLs", this._data.totalInternal)}
						${s(this, i, o).call(this, "External URLs", this._data.totalExternal)}
						${s(this, i, o).call(this, "Asset URLs", this._data.totalAssets)}
						${s(this, i, o).call(this, "Blocked URLs", this._data.totalBlocked)}
					</div>
				</uui-box>

				<uui-box headline="Breakdown">
					<div class="breakdown-container">
						${s(this, i, x).call(this)}
						${s(this, i, w).call(this)}
					</div>
				</uui-box>
			</div>
		`;
};
x = function() {
  if (!this._data || !this._data.total || this._data.total === 0)
    return n`<p>No data available</p>`;
  const t = (this._data.totalInternal ?? 0) / this._data.total * 100, a = (this._data.totalExternal ?? 0) / this._data.total * 100, e = (this._data.totalAssets ?? 0) / this._data.total * 100, r = (this._data.totalBlocked ?? 0) / this._data.total * 100;
  return n`
			<div class="breakdown-bar">
				<div class="bar-segment bar-internal" style="width: ${t}%" title="Internal URLs: ${this._data.totalInternal}"></div>
				<div class="bar-segment bar-external" style="width: ${a}%" title="External URLs: ${this._data.totalExternal}"></div>
				<div class="bar-segment bar-assets" style="width: ${e}%" title="Assets: ${this._data.totalAssets}"></div>
				<div class="bar-segment bar-blocked" style="width: ${r}%" title="Blocked: ${this._data.totalBlocked}"></div>
			</div>
		`;
};
w = function() {
  return n`
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
};
c.styles = [
  E,
  z`
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
				font-size: var(--uui-type-default-size);
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
				font-size: var(--uui-type-default-size);
				color: var(--uui-color-text-alt);
				margin-bottom: var(--uui-size-space-2);
				text-align: center;
			}

			.stat-value {
				font-size: var(--uui-type-h3-size);
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
];
g([
  $()
], c.prototype, "_data", 2);
c = g([
  y("content-audit-audits-overview-workspace-view")
], c);
const S = c;
export {
  c as ContentAuditAuditsOverviewWorkspaceViewElement,
  S as default
};
//# sourceMappingURL=audits-overview-workspace-view.element-Dkepl_xd.js.map
