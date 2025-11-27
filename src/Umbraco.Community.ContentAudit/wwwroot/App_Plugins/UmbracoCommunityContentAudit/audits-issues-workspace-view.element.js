import { UmbLitElement as x } from "@umbraco-cms/backoffice/lit-element";
import { t as C } from "./index.js";
import { r as m } from "./state.js";
import { CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT as T } from "./audits-workspace.context.js";
import { html as o, css as A } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as O } from "@umbraco-cms/backoffice/style";
var I = Object.defineProperty, P = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, u = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? P(t, s) : t, c = e.length - 1, d; c >= 0; c--)
    (d = e[c]) && (r = (a ? d(t, s, r) : d(r)) || r);
  return a && r && I(t, s, r), r;
}, f = (e, t, s) => t.has(e) || v("Cannot " + s), y = (e, t, s) => (f(e, t, "read from private field"), t.get(e)), h = (e, t, s) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), $ = (e, t, s, a) => (f(e, t, "write to private field"), t.set(e, s), s), p = (e, t, s) => (f(e, t, "access private method"), s), l, n, _, b, g, w;
let i = class extends x {
  constructor() {
    super(), h(this, n), this._issues = [], h(this, l), this._tableConfig = {
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
    ], this._tableItems = [], this.consumeContext(T, (e) => {
      $(this, l, e), p(this, n, _).call(this);
    });
  }
  render() {
    return this._data ? o`
			<div class="issues-container">
				${p(this, n, g).call(this)}
				${p(this, n, w).call(this)}
			</div>
		` : o`
				<uui-box>
					<p>No audit data available</p>
				</uui-box>
			`;
  }
};
l = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
_ = function() {
  y(this, l) && (this.observe(y(this, l).data, (e) => {
    e && (this._data = e);
  }, "dataObserver"), this.observe(y(this, l).issues, (e) => {
    e && (this._issues = e, p(this, n, b).call(this, e));
  }, "issuesObserver"));
};
b = function(e) {
  this._tableItems = e.map((t) => {
    var s;
    return {
      id: t.unique,
      entityType: "issue-type",
      icon: "icon-alert",
      data: [
        {
          columnAlias: "name",
          value: {
            unique: t.unique,
            name: t.name,
            category: t.category,
            description: t.description
          }
        },
        {
          columnAlias: "type",
          value: o`<content-audit-issue-type-label .type=${t.type}></content-audit-issue-type-label>`
        },
        {
          columnAlias: "priority",
          value: o`<content-audit-priority-type-label .type=${t.priority}></content-audit-priority-type-label>`
        },
        {
          columnAlias: "numberOfUrls",
          value: t.numberOfUrls
        },
        {
          columnAlias: "percentOfTotal",
          value: `${(s = t.percentOfTotal) == null ? void 0 : s.toFixed(0)}%`
        }
      ]
    };
  });
};
g = function() {
  if (!this._data || !this._issues.length) return;
  const e = this._issues.filter((a) => a.priority === "High").length, t = this._issues.filter((a) => a.priority === "Medium").length, s = this._issues.filter((a) => a.priority === "Low").length;
  return o`
			<div class="summary-container">
				<div class="summary-grid">
					<div class="summary-item">
						<span class="summary-label">Total Issues:</span>
						<span class="summary-value">${this._issues.length}</span>
					</div>
					<div class="summary-item high">
						<span class="summary-label">High Priority:</span>
						<span class="summary-value">${e}</span>
					</div>
					<div class="summary-item medium">
						<span class="summary-label">Medium Priority:</span>
						<span class="summary-value">${t}</span>
					</div>
					<div class="summary-item low">
						<span class="summary-label">Low Priority:</span>
						<span class="summary-value">${s}</span>
					</div>
				</div>
			</div>
		`;
};
w = function() {
  return this._tableItems.length ? o`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
		` : o`
				<uui-box>
					<p>No issues found for this audit.</p>
				</uui-box>
			`;
};
i.styles = [
  O,
  A`
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
				font-size: 0.875rem;
				color: var(--uui-color-text-alt);
			}

			.summary-value {
				font-size: 1.5rem;
				font-weight: 700;
				color: var(--uui-color-text);
			}
		`
];
u([
  m()
], i.prototype, "_data", 2);
u([
  m()
], i.prototype, "_issues", 2);
u([
  m()
], i.prototype, "_tableConfig", 2);
u([
  m()
], i.prototype, "_tableColumns", 2);
u([
  m()
], i.prototype, "_tableItems", 2);
i = u([
  C("content-audit-audits-issues-workspace-view")
], i);
const z = i;
export {
  i as ContentAuditAuditsIssuesWorkspaceViewElement,
  z as default
};
//# sourceMappingURL=audits-issues-workspace-view.element.js.map
