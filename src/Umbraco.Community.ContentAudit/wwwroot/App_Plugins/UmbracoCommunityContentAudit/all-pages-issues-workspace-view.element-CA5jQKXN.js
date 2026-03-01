import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { A, t as I } from "./index-stcFC0Hx.js";
import { r as p } from "./state-Dm9341Sy.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as w } from "./all-pages-workspace.context-C_4Z3Gw9.js";
import { html as n, css as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as P } from "@umbraco-cms/backoffice/style";
import { tryExecute as T } from "@umbraco-cms/backoffice/resources";
var x = Object.defineProperty, O = Object.getOwnPropertyDescriptor, y = (e) => {
  throw TypeError(e);
}, o = (e, t, i, r) => {
  for (var a = r > 1 ? void 0 : r ? O(t, i) : t, c = e.length - 1, _; c >= 0; c--)
    (_ = e[c]) && (a = (r ? _(t, i, a) : _(a)) || a);
  return r && a && x(t, i, a), a;
}, m = (e, t, i) => t.has(e) || y("Cannot " + i), d = (e, t, i) => (m(e, t, "read from private field"), t.get(e)), f = (e, t, i) => t.has(e) ? y("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), S = (e, t, i, r) => (m(e, t, "write to private field"), t.set(e, i), i), h = (e, t, i) => (m(e, t, "access private method"), i), l, u, v, b, g;
let s = class extends C {
  constructor() {
    super(), f(this, u), this._issues = [], this._loading = !0, f(this, l), this._tableConfig = {
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
    ], this._tableItems = [], this.consumeContext(w, (e) => {
      S(this, l, e), h(this, u, v).call(this);
    });
  }
  render() {
    return this._loading ? n`<uui-loader-bar></uui-loader-bar>` : this._issues.length == 0 ? n`<uui-box>No issues to report for this page</uui-box>` : n`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
		`;
  }
};
l = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakSet();
v = function() {
  d(this, l) && this.observe(d(this, l).unique, (e) => {
    e && h(this, u, b).call(this, e);
  }, "umbCollectionItemsObserver");
};
b = async function(e) {
  this._loading = !0;
  const { data: t } = await T(this, A.getPageIssues({ path: { id: e } }));
  t && (this._issues = t, h(this, u, g).call(this, t)), this._loading = !1;
};
g = function(e) {
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
        value: n`<content-audit-issue-type-label .type=${t.type}></content-audit-issue-type-label>`
      },
      {
        columnAlias: "priority",
        value: n`<content-audit-priority-type-label .type=${t.priority}></content-audit-priority-type-label>`
      }
    ]
  }));
};
s.styles = [
  P,
  E`
			:host {
				display: block;
				height: 100%;
				padding: var(--uui-size-layout-1);
			}
		`
];
o([
  p()
], s.prototype, "_issues", 2);
o([
  p()
], s.prototype, "_loading", 2);
o([
  p()
], s.prototype, "_tableConfig", 2);
o([
  p()
], s.prototype, "_tableColumns", 2);
o([
  p()
], s.prototype, "_tableItems", 2);
s = o([
  I("content-audit-all-pages-issues-workspace-view")
], s);
const U = s;
export {
  s as ContentAuditAllPagesIssuesWorkspaceViewElement,
  U as default
};
//# sourceMappingURL=all-pages-issues-workspace-view.element-CA5jQKXN.js.map
