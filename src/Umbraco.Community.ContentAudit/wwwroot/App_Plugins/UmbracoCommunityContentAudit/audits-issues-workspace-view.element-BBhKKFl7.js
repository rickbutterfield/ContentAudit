import { UmbLitElement as T } from "@umbraco-cms/backoffice/lit-element";
import { UmbModalRouteRegistrationController as I } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_MODAL as $ } from "@umbraco-cms/backoffice/workspace";
import { t as E } from "./index-BUsZH3tI.js";
import { r as c } from "./state-C-6jRtm-.js";
import { CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT as S } from "./audits-workspace.context-rjPlm-bh.js";
import { html as o, css as U, nothing as z } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as M } from "@umbraco-cms/backoffice/style";
var W = Object.defineProperty, k = Object.getOwnPropertyDescriptor, P = (t) => {
  throw TypeError(t);
}, l = (t, i, e, s) => {
  for (var u = s > 1 ? void 0 : s ? k(i, e) : i, y = t.length - 1, f; y >= 0; y--)
    (f = t[y]) && (u = (s ? f(i, e, u) : f(u)) || u);
  return s && u && W(i, e, u), u;
}, g = (t, i, e) => i.has(t) || P("Cannot " + e), p = (t, i, e) => (g(t, i, "read from private field"), i.get(t)), v = (t, i, e) => i.has(t) ? P("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), b = (t, i, e, s) => (g(t, i, "write to private field"), i.set(t, e), e), n = (t, i, e) => (g(t, i, "access private method"), e), m, d, a, C, h, w, x, A, O;
const _ = 50;
let r = class extends T {
  constructor() {
    super(), v(this, a), this._issues = [], this._currentPage = 1, v(this, m), v(this, d, ""), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Issue",
        alias: "name",
        elementName: "content-audit-issues-table-name-column-layout"
      },
      {
        name: "Type",
        alias: "type"
      },
      {
        name: "Priority",
        alias: "priority"
      },
      {
        name: "Number of URLs affected",
        alias: "numberOfUrls"
      },
      {
        name: "Percentage of all pages",
        alias: "percentOfTotal"
      }
    ], this._tableItems = [], new I(this, $).addAdditionalPath("issues").onSetup(() => ({ data: { entityType: "issues", preset: {} } })).observeRouteBuilder((t) => {
      b(this, d, t({})), n(this, a, h).call(this);
    }), this.consumeContext(S, (t) => {
      b(this, m, t), n(this, a, C).call(this);
    });
  }
  render() {
    return this._data ? o`
			<div class="issues-container">
				${n(this, a, A).call(this)}
				${n(this, a, O).call(this)}
			</div>
		` : o`
				<uui-box>
					<p>No audit data available</p>
				</uui-box>
			`;
  }
};
m = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
C = function() {
  p(this, m) && (this.observe(p(this, m).data, (t) => {
    t && (this._data = t);
  }, "dataObserver"), this.observe(p(this, m).issues, (t) => {
    t && (this._issues = t, this._currentPage = 1, n(this, a, h).call(this));
  }, "issuesObserver"));
};
h = function() {
  const t = (this._currentPage - 1) * _, i = this._issues.slice(t, t + _);
  this._tableItems = i.map((e) => ({
    id: e.unique,
    entityType: "issue-type",
    icon: "icon-alert",
    data: [
      {
        columnAlias: "name",
        value: {
          unique: e.unique,
          name: e.name,
          category: e.category,
          description: e.description,
          editPath: p(this, d)
        }
      },
      {
        columnAlias: "type",
        value: o`<content-audit-issue-type-label .type=${e.type}></content-audit-issue-type-label>`
      },
      {
        columnAlias: "priority",
        value: o`<content-audit-priority-type-label .type=${e.priority}></content-audit-priority-type-label>`
      },
      {
        columnAlias: "numberOfUrls",
        value: e.numberOfUrls
      },
      {
        columnAlias: "percentOfTotal",
        value: `${e.percentOfTotal?.toFixed(0)}%`
      }
    ]
  }));
};
w = function(t) {
  this._currentPage !== t.target.current && (this._currentPage = t.target.current, n(this, a, h).call(this));
};
x = function() {
  const t = Math.ceil(this._issues.length / _);
  return t <= 1 ? z : o`
			<div class="pagination">
				<uui-pagination .total=${t} .current=${this._currentPage} @change=${n(this, a, w)}></uui-pagination>
			</div>
		`;
};
A = function() {
  if (!this._data || !this._issues.length) return;
  const t = this._issues.filter((s) => s.priority === "High").length, i = this._issues.filter((s) => s.priority === "Medium").length, e = this._issues.filter((s) => s.priority === "Low").length;
  return o`
			<div class="summary-container">
				<div class="summary-grid">
					<div class="summary-item">
						<span class="summary-label">Total Issues:</span>
						<span class="summary-value">${this._issues.length}</span>
					</div>
					<div class="summary-item high">
						<span class="summary-label">High Priority:</span>
						<span class="summary-value">${t}</span>
					</div>
					<div class="summary-item medium">
						<span class="summary-label">Medium Priority:</span>
						<span class="summary-value">${i}</span>
					</div>
					<div class="summary-item low">
						<span class="summary-label">Low Priority:</span>
						<span class="summary-value">${e}</span>
					</div>
				</div>
			</div>
		`;
};
O = function() {
  return this._tableItems.length ? o`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
			${n(this, a, x).call(this)}
		` : o`
				<uui-box>
					<p>No issues found for this audit.</p>
				</uui-box>
			`;
};
r.styles = [
  M,
  U`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.issues-container {
				display: flex;
				flex-direction: column;
			}

			.summary-container {
				margin-bottom: var(--uui-size-space-5);
			}

			.summary-grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
				gap: var(--uui-size-space-4);
			}

			.summary-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: var(--uui-size-space-4);
				background: var(--uui-color-surface);
				border-radius: var(--uui-border-radius);
				border: 1px solid var(--uui-color-border);
			}

			.summary-item.high {
				border-left: 4px solid var(--uui-color-danger);
			}

			.summary-item.medium {
				border-left: 4px solid var(--uui-color-warning);
			}

			.summary-item.low {
				border-left: 4px solid var(--uui-color-default);
			}

			.summary-label {
				font-size: var(--uui-type-default-size);
				color: var(--uui-color-text-alt);
			}

			.summary-value {
				font-size: var(--uui-type-h4-size);
				font-weight: 700;
				color: var(--uui-color-text);
			}

			.pagination {
				display: flex;
				justify-content: center;
				margin-top: var(--uui-size-layout-1);
			}
		`
];
l([
  c()
], r.prototype, "_data", 2);
l([
  c()
], r.prototype, "_issues", 2);
l([
  c()
], r.prototype, "_currentPage", 2);
l([
  c()
], r.prototype, "_tableConfig", 2);
l([
  c()
], r.prototype, "_tableColumns", 2);
l([
  c()
], r.prototype, "_tableItems", 2);
r = l([
  E("content-audit-audits-issues-workspace-view")
], r);
const H = r;
export {
  r as ContentAuditAuditsIssuesWorkspaceViewElement,
  H as default
};
//# sourceMappingURL=audits-issues-workspace-view.element-BBhKKFl7.js.map
