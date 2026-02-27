import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { t as g } from "./index-IUh43tSs.js";
import { r as p } from "./state-DW4knq5t.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as A } from "./all-pages-workspace.context-CY7S7jbp.js";
import { html as o, css as I } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as w } from "@umbraco-cms/backoffice/style";
var x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, l = (e, t, a, r) => {
  for (var s = r > 1 ? void 0 : r ? E(t, a) : t, c = e.length - 1, m; c >= 0; c--)
    (m = e[c]) && (s = (r ? m(t, a, s) : m(s)) || s);
  return r && s && x(t, a, s), s;
}, _ = (e, t, a) => t.has(e) || f("Cannot " + a), h = (e, t, a) => (_(e, t, "read from private field"), t.get(e)), d = (e, t, a) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), P = (e, t, a, r) => (_(e, t, "write to private field"), t.set(e, a), a), y = (e, t, a) => (_(e, t, "access private method"), a), n, u, b, v;
let i = class extends C {
  constructor() {
    super(), d(this, u), d(this, n), this._tableConfig = {
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
      }
    ], this._tableItems = [], this.consumeContext(A, (e) => {
      P(this, n, e), y(this, u, b).call(this);
    });
  }
  render() {
    if (!this._data) return o`<uui-box>No data available</uui-box>`;
    if (!this._data.issues) return o`<uui-box>No issue data available</uui-box>`;
    if (this._data.issues.length == 0) return o`<uui-box>No issues to report for this page</uui-box>`;
    if (this._tableItems.length !== 0)
      return o`
				<umb-table
					.config=${this._tableConfig}
					.columns=${this._tableColumns}
					.items=${this._tableItems}
				></umb-table>
			`;
  }
};
n = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakSet();
b = function() {
  h(this, n) && this.observe(h(this, n).data, (e) => {
    e && (this._data = e, y(this, u, v).call(this, this._data.issues));
  }, "umbCollectionItemsObserver");
};
v = function(e) {
  this._tableItems = e.map((t) => ({
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
      }
    ]
  }));
};
i.styles = [
  w,
  I`
			:host {
				display: block;
				height: 100%;
				padding: var(--uui-size-layout-1);
			}
		`
];
l([
  p()
], i.prototype, "_data", 2);
l([
  p()
], i.prototype, "_tableConfig", 2);
l([
  p()
], i.prototype, "_tableColumns", 2);
l([
  p()
], i.prototype, "_tableItems", 2);
i = l([
  g("content-audit-all-pages-issues-workspace-view")
], i);
const $ = i;
export {
  i as ContentAuditAllPagesIssuesWorkspaceViewElement,
  $ as default
};
//# sourceMappingURL=all-pages-issues-workspace-view.element-BWytSVmX.js.map
