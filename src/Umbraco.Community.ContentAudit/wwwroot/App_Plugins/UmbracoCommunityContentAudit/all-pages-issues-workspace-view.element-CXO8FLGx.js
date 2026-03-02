import { UmbLitElement as E } from "@umbraco-cms/backoffice/lit-element";
import { UmbModalRouteRegistrationController as S } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_MODAL as T } from "@umbraco-cms/backoffice/workspace";
import { A as O, t as x } from "./index-BUsZH3tI.js";
import { r as u } from "./state-C-6jRtm-.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as W } from "./all-pages-workspace.context-DEWmO3Vr.js";
import { html as l, nothing as $, css as M } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as k } from "@umbraco-cms/backoffice/style";
import { tryExecute as N } from "@umbraco-cms/backoffice/resources";
var R = Object.defineProperty, U = Object.getOwnPropertyDescriptor, P = (t) => {
  throw TypeError(t);
}, o = (t, e, i, p) => {
  for (var r = p > 1 ? void 0 : p ? U(e, i) : e, d = t.length - 1, m; d >= 0; d--)
    (m = t[d]) && (r = (p ? m(e, i, r) : m(r)) || r);
  return p && r && R(e, i, r), r;
}, v = (t, e, i) => e.has(t) || P("Cannot " + i), g = (t, e, i) => (v(t, e, "read from private field"), e.get(t)), f = (t, e, i) => e.has(t) ? P("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), b = (t, e, i, p) => (v(t, e, "write to private field"), e.set(t, i), i), n = (t, e, i) => (v(t, e, "access private method"), i), c, h, a, C, A, _, I, w;
const y = 50;
let s = class extends E {
  constructor() {
    super(), f(this, a), this._issues = [], this._loading = !0, this._currentPage = 1, f(this, c), f(this, h, ""), this._tableConfig = {
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
    ], this._tableItems = [], new S(this, T).addAdditionalPath("issues").onSetup(() => ({ data: { entityType: "issues", preset: {} } })).observeRouteBuilder((t) => {
      b(this, h, t({})), n(this, a, _).call(this);
    }), this.consumeContext(W, (t) => {
      b(this, c, t), n(this, a, C).call(this);
    });
  }
  render() {
    return this._loading ? l`<uui-loader-bar></uui-loader-bar>` : this._issues.length == 0 ? l`<uui-box>No issues to report for this page</uui-box>` : l`
			<umb-table
				.config=${this._tableConfig}
				.columns=${this._tableColumns}
				.items=${this._tableItems}
			></umb-table>
			${n(this, a, w).call(this)}
		`;
  }
};
c = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
C = function() {
  g(this, c) && this.observe(g(this, c).unique, (t) => {
    t && n(this, a, A).call(this, t);
  }, "umbCollectionItemsObserver");
};
A = async function(t) {
  this._loading = !0;
  const { data: e } = await N(this, O.getPageIssues({ path: { id: t } }));
  e && (this._issues = e, this._currentPage = 1, n(this, a, _).call(this)), this._loading = !1;
};
_ = function() {
  const t = (this._currentPage - 1) * y, e = this._issues.slice(t, t + y);
  this._tableItems = e.map((i) => ({
    id: i.unique,
    entityType: "issue-type",
    icon: "icon-alert",
    data: [
      {
        columnAlias: "name",
        value: {
          unique: i.unique,
          name: i.name,
          category: i.category,
          description: i.description,
          editPath: g(this, h)
        }
      },
      {
        columnAlias: "type",
        value: l`<content-audit-issue-type-label .type=${i.type}></content-audit-issue-type-label>`
      },
      {
        columnAlias: "priority",
        value: l`<content-audit-priority-type-label .type=${i.priority}></content-audit-priority-type-label>`
      }
    ]
  }));
};
I = function(t) {
  this._currentPage !== t.target.current && (this._currentPage = t.target.current, n(this, a, _).call(this));
};
w = function() {
  const t = Math.ceil(this._issues.length / y);
  return t <= 1 ? $ : l`
			<div class="pagination">
				<uui-pagination .total=${t} .current=${this._currentPage} @change=${n(this, a, I)}></uui-pagination>
			</div>
		`;
};
s.styles = [
  k,
  M`
			:host {
				display: block;
				height: 100%;
				padding: var(--uui-size-layout-1);
			}

			.pagination {
				display: flex;
				justify-content: center;
				margin-top: var(--uui-size-layout-1);
			}
		`
];
o([
  u()
], s.prototype, "_issues", 2);
o([
  u()
], s.prototype, "_loading", 2);
o([
  u()
], s.prototype, "_currentPage", 2);
o([
  u()
], s.prototype, "_tableConfig", 2);
o([
  u()
], s.prototype, "_tableColumns", 2);
o([
  u()
], s.prototype, "_tableItems", 2);
s = o([
  x("content-audit-all-pages-issues-workspace-view")
], s);
const Z = s;
export {
  s as ContentAuditAllPagesIssuesWorkspaceViewElement,
  Z as default
};
//# sourceMappingURL=all-pages-issues-workspace-view.element-CXO8FLGx.js.map
