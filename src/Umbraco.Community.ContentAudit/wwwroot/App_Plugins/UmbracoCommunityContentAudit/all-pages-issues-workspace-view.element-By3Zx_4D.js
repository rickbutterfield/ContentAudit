import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { t as g } from "./index-CkGezqvH.js";
import { r as p } from "./state-BceSR_ry.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as A } from "./all-pages-workspace.context-BjfuJVn6.js";
import { html as o, css as I } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as w } from "@umbraco-cms/backoffice/style";
var x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, b = (e) => {
  throw TypeError(e);
}, u = (e, t, a, r) => {
  for (var s = r > 1 ? void 0 : r ? E(t, a) : t, c = e.length - 1, h; c >= 0; c--)
    (h = e[c]) && (s = (r ? h(t, a, s) : h(s)) || s);
  return r && s && x(t, a, s), s;
}, m = (e, t, a) => t.has(e) || b("Cannot " + a), f = (e, t, a) => (m(e, t, "read from private field"), t.get(e)), y = (e, t, a) => t.has(e) ? b("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), P = (e, t, a, r) => (m(e, t, "write to private field"), t.set(e, a), a), _ = (e, t, a) => (m(e, t, "access private method"), a), l, n, v, d;
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
    ], this._tableItems = [], this.consumeContext(A, (e) => {
      P(this, l, e), _(this, n, v).call(this);
    });
  }
  updated(e) {
    var t;
    e.has("data") && this._data && ((t = this._data) == null ? void 0 : t.issues.length) !== 0 && _(this, n, d).call(this, this._data.issues);
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
  f(this, l) && this.observe(f(this, l).data, (e) => {
    e && (this._data = e, _(this, n, d).call(this, this._data.issues));
  }, "umbCollectionItemsObserver");
};
d = function(e) {
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
        value: o`<content-audit-issue-type-label .type=${t.type}></content-audit-issue-type-label`
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
const k = i;
export {
  i as ContentAuditAllPagesIssuesWorkspaceViewElement,
  k as default
};
//# sourceMappingURL=all-pages-issues-workspace-view.element-By3Zx_4D.js.map
