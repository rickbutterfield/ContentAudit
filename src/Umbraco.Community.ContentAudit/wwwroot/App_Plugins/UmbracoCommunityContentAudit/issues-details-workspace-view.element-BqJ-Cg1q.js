import { UmbLitElement as I } from "@umbraco-cms/backoffice/lit-element";
import { t as P } from "./index-DCD4XZJW.js";
import { r as p } from "./state-BYauKICB.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT as w } from "./issues-workspace.context-CIeZOLhk.js";
import { html as d, css as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as E } from "@umbraco-cms/backoffice/style";
var $ = Object.defineProperty, T = Object.getOwnPropertyDescriptor, y = (t) => {
  throw TypeError(t);
}, n = (t, e, a, s) => {
  for (var i = s > 1 ? void 0 : s ? T(e, a) : e, m = t.length - 1, h; m >= 0; m--)
    (h = t[m]) && (i = (s ? h(e, a, i) : h(i)) || i);
  return s && i && $(e, a, i), i;
}, c = (t, e, a) => e.has(t) || y("Cannot " + a), _ = (t, e, a) => (c(t, e, "read from private field"), e.get(t)), f = (t, e, a) => e.has(t) ? y("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), A = (t, e, a, s) => (c(t, e, "write to private field"), e.set(t, a), a), u = (t, e, a) => (c(t, e, "access private method"), a), o, l, v, b, g, C;
let r = class extends I {
  constructor() {
    super(), f(this, l), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableItems = [], f(this, o), this.consumeContext(w, (t) => {
      A(this, o, t), u(this, l, v).call(this);
    });
  }
  get _tableColumns() {
    let t = [];
    return this._data != null && (t.push({
      name: this._data?.images != null ? "URL" : "Page",
      alias: "url"
    }), this._data?.exposedProperties != null && this._data?.exposedProperties?.length !== 0 && this._data.exposedProperties.forEach((e) => {
      t.push({ name: e.name, alias: e.alias, elementName: e.elementName, labelTemplate: e.labelTemplate });
    }), this._data?.images != null && this._data?.images?.length !== 0 && t.push({
      name: "Found Page",
      alias: "foundPage"
    })), t;
  }
  render() {
    return d`
			${u(this, l, g).call(this)}
			${u(this, l, C).call(this)}
		`;
  }
};
o = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
v = function() {
  _(this, o) && this.observe(_(this, o).data, (t) => {
    this._data = t, u(this, l, b).call(this, t);
  }, "umbCollectionItemsObserver");
};
b = function(t) {
  let e = [];
  t != null && (t.pages?.length !== 0 && (e = t?.pages?.map((a) => {
    let s = {
      id: a.unique,
      data: [
        {
          columnAlias: "url",
          value: d`<a href=${"section/audit/workspace/all-pages/edit/" + a.unique}>${a.url}</a>`
        }
      ]
    };
    return this._data?.exposedProperties != null && this._data?.exposedProperties?.length !== 0 && this._data.exposedProperties.forEach((i) => {
      s.data.push({ columnAlias: i.alias, value: a.exposedValues?.[i.alias] });
    }), s;
  })), t?.images != null && t?.images.length !== 0 && (e = t?.images?.map((a) => ({
    id: a.unique,
    data: [
      {
        columnAlias: "url",
        value: a.url
      },
      {
        columnAlias: "foundPage",
        value: a.foundPage
      }
    ]
  })))), this._tableItems = e || [];
};
g = function() {
  return d`
			<div>
				<umb-table
					.config=${this._tableConfig}
					.columns=${this._tableColumns}
					.items=${this._tableItems}>
				</umb-table>
			</div>
		`;
};
C = function() {
  return d`
			<uui-box style="align-self: flex-start;">
				<umb-property-layout label="Name" orientation="vertical">
					<div slot="editor">${this._data?.name}</div>
				</umb-property-layout>
				<umb-property-layout label="Category" orientation="vertical">
					<div slot="editor">${this._data?.category}</div>
				</umb-property-layout>
				<umb-property-layout label="Description" orientation="vertical">
					<div slot="editor">${this._data?.description}</div>
				</umb-property-layout>

				<umb-property-layout label="Issue Type" orientation="vertical">
					<div slot="editor">
						<content-audit-issue-type-label .type=${this._data?.type}></content-audit-issue-type-label>
					</div>
				</umb-property-layout>
				<umb-property-layout label="Issue Priority" orientation="vertical">
					<div slot="editor">
						<content-audit-priority-type-label .type=${this._data?.priority}></content-audit-priority-type-label>
					</div>
				</umb-property-layout>
			</uui-box>
		`;
};
r.styles = [
  E,
  x`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}

            umb-property-layout {
                padding: var(--uui-size-space-4) 0;

                &:first-of-type {
                    padding-top: 0;
                }

                &:last-of-type {
                    padding-bottom: 0;
                }
            }
		`
];
n([
  p()
], r.prototype, "_data", 2);
n([
  p()
], r.prototype, "_tableConfig", 2);
n([
  p()
], r.prototype, "_tableColumns", 1);
n([
  p()
], r.prototype, "_tableItems", 2);
r = n([
  P("content-audit-issues-details-workspace-view")
], r);
const U = r;
export {
  r as ContentAuditIssuesDetailsWorkspaceViewElement,
  U as default
};
//# sourceMappingURL=issues-details-workspace-view.element-BqJ-Cg1q.js.map
