import { UmbLitElement as O } from "@umbraco-cms/backoffice/lit-element";
import { UMB_WORKSPACE_MODAL as S } from "@umbraco-cms/backoffice/workspace";
import { t as $ } from "./index-DCtP17IU.js";
import { r as h } from "./state-BBZxen1F.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT as x } from "./issues-workspace.context-CWLZQVcI.js";
import { html as c, css as D } from "@umbraco-cms/backoffice/external/lit";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as R } from "@umbraco-cms/backoffice/document";
import { UmbTextStyles as W } from "@umbraco-cms/backoffice/style";
import { UmbModalRouteRegistrationController as M } from "@umbraco-cms/backoffice/router";
var U = Object.defineProperty, N = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, m = (t, e, a, i) => {
  for (var r = i > 1 ? void 0 : i ? N(e, a) : e, l = t.length - 1, n; l >= 0; l--)
    (n = t[l]) && (r = (i ? n(e, a, r) : n(r)) || r);
  return i && r && U(e, a, r), r;
}, b = (t, e, a) => e.has(t) || v("Cannot " + a), y = (t, e, a) => (b(t, e, "read from private field"), e.get(t)), f = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), g = (t, e, a, i) => (b(t, e, "write to private field"), e.set(t, a), a), p = (t, e, a) => (b(t, e, "access private method"), a), d, _, s, P, C, I, T, E;
let o = class extends O {
  constructor() {
    super(), f(this, s), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableItems = [], f(this, d), f(this, _), this.consumeContext(x, (t) => {
      g(this, d, t);
    }), p(this, s, P).call(this);
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
			${p(this, s, T).call(this)}
			${p(this, s, E).call(this)}
		`;
  }
};
d = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
P = function() {
  new M(this, S).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    g(this, _, t), p(this, s, C).call(this);
  });
};
C = function() {
  y(this, d) && this.observe(y(this, d).data, (t) => {
    this._data = t, p(this, s, I).call(this, t);
  }, "umbCollectionItemsObserver");
};
I = function(t) {
  let e = [];
  const a = y(this, _);
  if (!a) throw new Error("Route builder not ready");
  t != null && (t.pages?.length !== 0 && (e = t?.pages?.map((i) => {
    const r = a({ entityType: "document" }) + R.generateLocal({ unique: i.unique });
    let l = {
      id: i.unique,
      data: [
        {
          columnAlias: "url",
          value: c`<a href="${r}">${i.pageData?.url}</a>`
        }
      ]
    };
    return this._data?.exposedProperties != null && this._data?.exposedProperties?.length !== 0 && this._data.exposedProperties.forEach((n) => {
      const w = n.alias.split(".");
      let u = i;
      for (const A of w)
        if (u && typeof u == "object")
          u = u[A];
        else
          break;
      l.data.push({ columnAlias: n.alias, value: u });
    }), l;
  })), t?.images != null && t?.images.length !== 0 && (e = t?.images?.map((i) => ({
    id: i.unique,
    data: [
      {
        columnAlias: "url",
        value: i.url
      },
      {
        columnAlias: "foundPage",
        value: i.foundPage
      }
    ]
  })))), this._tableItems = e || [];
};
T = function() {
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
E = function() {
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
o.styles = [
  W,
  D`
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
m([
  h()
], o.prototype, "_data", 2);
m([
  h()
], o.prototype, "_tableConfig", 2);
m([
  h()
], o.prototype, "_tableColumns", 1);
m([
  h()
], o.prototype, "_tableItems", 2);
o = m([
  $("content-audit-issues-details-workspace-view")
], o);
const H = o;
export {
  o as ContentAuditIssuesDetailsWorkspaceViewElement,
  H as default
};
//# sourceMappingURL=issues-details-workspace-view.element-C15UrrE_.js.map
