import { UmbLitElement as I } from "@umbraco-cms/backoffice/lit-element";
import { t as w } from "./index-B8flLQWi.js";
import { r as m } from "./state-BBJy3iDP.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT as E } from "./issues-workspace.context-CJ9aJjVA.js";
import { html as c, css as $ } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as x } from "@umbraco-cms/backoffice/style";
var T = Object.defineProperty, A = Object.getOwnPropertyDescriptor, y = (t) => {
  throw TypeError(t);
}, p = (t, e, a, s) => {
  for (var i = s > 1 ? void 0 : s ? A(e, a) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (i = (s ? r(e, a, i) : r(i)) || i);
  return s && i && T(e, a, i), i;
}, h = (t, e, a) => e.has(t) || y("Cannot " + a), f = (t, e, a) => (h(t, e, "read from private field"), e.get(t)), _ = (t, e, a) => e.has(t) ? y("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), S = (t, e, a, s) => (h(t, e, "write to private field"), e.set(t, a), a), d = (t, e, a) => (h(t, e, "access private method"), a), u, o, v, b, g, C;
let l = class extends I {
  constructor() {
    super(), _(this, o), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableItems = [], _(this, u), this.consumeContext(E, (t) => {
      S(this, u, t), d(this, o, v).call(this);
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
    return c`
			${d(this, o, g).call(this)}
			${d(this, o, C).call(this)}
		`;
  }
};
u = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
v = function() {
  f(this, u) && this.observe(f(this, u).data, (t) => {
    this._data = t, d(this, o, b).call(this, t);
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
          value: c`<a href=${"section/audit/workspace/all-pages/edit/" + a.unique}>${a.pageData?.url}</a>`
        }
      ]
    };
    return this._data?.exposedProperties != null && this._data?.exposedProperties?.length !== 0 && this._data.exposedProperties.forEach((i) => {
      const n = i.alias.split(".");
      let r = a;
      for (const P of n)
        if (r && typeof r == "object")
          r = r[P];
        else
          break;
      s.data.push({ columnAlias: i.alias, value: r });
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
  return c`
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
  return c`
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
l.styles = [
  x,
  $`
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
p([
  m()
], l.prototype, "_data", 2);
p([
  m()
], l.prototype, "_tableConfig", 2);
p([
  m()
], l.prototype, "_tableColumns", 1);
p([
  m()
], l.prototype, "_tableItems", 2);
l = p([
  w("content-audit-issues-details-workspace-view")
], l);
const q = l;
export {
  l as ContentAuditIssuesDetailsWorkspaceViewElement,
  q as default
};
//# sourceMappingURL=issues-details-workspace-view.element-BmIVMqYZ.js.map
