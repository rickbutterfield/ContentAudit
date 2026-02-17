import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { t as g } from "./index-Bkks3_By.js";
import { r as p } from "./state-B3HwBx2Z.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as A } from "./all-pages-workspace.context-BrtBjNPt.js";
import { html as o, css as I } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as w } from "@umbraco-cms/backoffice/style";
var x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, b = (t) => {
  throw TypeError(t);
}, u = (t, e, a, r) => {
  for (var s = r > 1 ? void 0 : r ? E(e, a) : e, c = t.length - 1, _; c >= 0; c--)
    (_ = t[c]) && (s = (r ? _(e, a, s) : _(s)) || s);
  return r && s && x(e, a, s), s;
}, m = (t, e, a) => e.has(t) || b("Cannot " + a), f = (t, e, a) => (m(t, e, "read from private field"), e.get(t)), y = (t, e, a) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), P = (t, e, a, r) => (m(t, e, "write to private field"), e.set(t, a), a), h = (t, e, a) => (m(t, e, "access private method"), a), l, n, v, d;
let i = class extends C {
  constructor() {
    super(), y(this, n), y(this, l), this._tableConfig = {
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
    ], this._tableItems = [], this.consumeContext(A, (t) => {
      P(this, l, t), h(this, n, v).call(this);
    });
  }
  updated(t) {
    t.has("data") && this._data && this._data?.issues.length !== 0 && h(this, n, d).call(this, this._data.issues);
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
l = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
v = function() {
  f(this, l) && this.observe(f(this, l).data, (t) => {
    t && (this._data = t, h(this, n, d).call(this, this._data.issues));
  }, "umbCollectionItemsObserver");
};
d = function(t) {
  this._tableItems = t.map((e) => ({
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
          description: e.description
        }
      },
      {
        columnAlias: "type",
        value: o`<content-audit-issue-type-label .type=${e.type}></content-audit-issue-type-label`
      },
      {
        columnAlias: "priority",
        value: o`<content-audit-priority-type-label .type=${e.priority}></content-audit-priority-type-label>`
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
u([
  p()
], i.prototype, "_data", 2);
u([
  p()
], i.prototype, "_tableConfig", 2);
u([
  p()
], i.prototype, "_tableColumns", 2);
u([
  p()
], i.prototype, "_tableItems", 2);
i = u([
  g("content-audit-all-pages-issues-workspace-view")
], i);
const $ = i;
export {
  i as ContentAuditAllPagesIssuesWorkspaceViewElement,
  $ as default
};
//# sourceMappingURL=all-pages-issues-workspace-view.element-znn-vHbI.js.map
