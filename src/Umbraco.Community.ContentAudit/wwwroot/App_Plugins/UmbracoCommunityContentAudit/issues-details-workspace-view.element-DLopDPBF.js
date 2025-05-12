import { UmbLitElement as M } from "@umbraco-cms/backoffice/lit-element";
import { UMB_WORKSPACE_MODAL as U } from "@umbraco-cms/backoffice/workspace";
import { t as N } from "./index-CkGezqvH.js";
import { r as _ } from "./state-BceSR_ry.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT as k } from "./issues-workspace.context-Cl3PUZpG.js";
import { html as f, css as B } from "@umbraco-cms/backoffice/external/lit";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as q } from "@umbraco-cms/backoffice/document";
import { UmbTextStyles as L } from "@umbraco-cms/backoffice/style";
import { UmbModalRouteRegistrationController as K } from "@umbraco-cms/backoffice/router";
var V = Object.defineProperty, z = Object.getOwnPropertyDescriptor, w = (e) => {
  throw TypeError(e);
}, c = (e, t, i, a) => {
  for (var r = a > 1 ? void 0 : a ? z(t, i) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (r = (a ? o(t, i, r) : o(r)) || r);
  return a && r && V(t, i, r), r;
}, g = (e, t, i) => t.has(e) || w("Cannot " + i), v = (e, t, i) => (g(e, t, "read from private field"), t.get(e)), b = (e, t, i) => t.has(e) ? w("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), A = (e, t, i, a) => (g(e, t, "write to private field"), t.set(e, i), i), d = (e, t, i) => (g(e, t, "access private method"), i), h, y, u, $, O, S, x, D;
let l = class extends M {
  constructor() {
    super(), b(this, u), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableItems = [], b(this, h), b(this, y), this.consumeContext(k, (e) => {
      A(this, h, e);
    }), d(this, u, $).call(this);
  }
  get _tableColumns() {
    var t, i, a, r, s, o, p;
    let e = [];
    return this._data != null && (e.push({
      name: ((t = this._data) == null ? void 0 : t.images) != null ? "URL" : "Page",
      alias: "url"
    }), ((i = this._data) == null ? void 0 : i.exposedProperties) != null && ((r = (a = this._data) == null ? void 0 : a.exposedProperties) == null ? void 0 : r.length) !== 0 && this._data.exposedProperties.forEach((n) => {
      e.push({ name: n.name, alias: n.alias, elementName: n.elementName, labelTemplate: n.labelTemplate });
    }), ((s = this._data) == null ? void 0 : s.images) != null && ((p = (o = this._data) == null ? void 0 : o.images) == null ? void 0 : p.length) !== 0 && e.push({
      name: "Found Page",
      alias: "foundPage"
    })), e;
  }
  render() {
    return f`
			${d(this, u, x).call(this)}
			${d(this, u, D).call(this)}
		`;
  }
};
h = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakSet();
$ = function() {
  new K(this, U).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    A(this, y, e), d(this, u, O).call(this);
  });
};
O = function() {
  v(this, h) && this.observe(v(this, h).data, (e) => {
    this._data = e, d(this, u, S).call(this, e);
  }, "umbCollectionItemsObserver");
};
S = function(e) {
  var a, r, s;
  let t = [];
  const i = v(this, y);
  if (!i) throw new Error("Route builder not ready");
  e != null && (((a = e.pages) == null ? void 0 : a.length) !== 0 && (t = (r = e == null ? void 0 : e.pages) == null ? void 0 : r.map((o) => {
    var P, C, I, T;
    const p = i({ entityType: "document" }) + q.generateLocal({ unique: o.unique });
    let n = {
      id: o.unique,
      data: [
        {
          columnAlias: "url",
          value: f`<a href="${p}">${(P = o.pageData) == null ? void 0 : P.url}</a>`
        }
      ]
    };
    return ((C = this._data) == null ? void 0 : C.exposedProperties) != null && ((T = (I = this._data) == null ? void 0 : I.exposedProperties) == null ? void 0 : T.length) !== 0 && this._data.exposedProperties.forEach((E) => {
      const R = E.alias.split(".");
      let m = o;
      for (const W of R)
        if (m && typeof m == "object")
          m = m[W];
        else
          break;
      n.data.push({ columnAlias: E.alias, value: m });
    }), n;
  })), (e == null ? void 0 : e.images) != null && (e == null ? void 0 : e.images.length) !== 0 && (t = (s = e == null ? void 0 : e.images) == null ? void 0 : s.map((o) => ({
    id: o.unique,
    data: [
      {
        columnAlias: "url",
        value: o.url
      },
      {
        columnAlias: "foundPage",
        value: o.foundPage
      }
    ]
  })))), this._tableItems = t || [];
};
x = function() {
  return f`
			<div>
				<umb-table
					.config=${this._tableConfig}
					.columns=${this._tableColumns}
					.items=${this._tableItems}>
				</umb-table>
			</div>
		`;
};
D = function() {
  var e, t, i, a, r;
  return f`
			<uui-box style="align-self: flex-start;">
				<umb-property-layout label="Name" orientation="vertical" style="padding-top: 0;">
					<div slot="editor">${(e = this._data) == null ? void 0 : e.name}</div>
				</umb-property-layout>
				<umb-property-layout label="Category" orientation="vertical">
					<div slot="editor">${(t = this._data) == null ? void 0 : t.category}</div>
				</umb-property-layout>
				<umb-property-layout label="Description" orientation="vertical">
					<div slot="editor">${(i = this._data) == null ? void 0 : i.description}</div>
				</umb-property-layout>

				<umb-property-layout label="Issue Type" orientation="vertical">
					<div slot="editor">
						<content-audit-issue-type-label .type=${(a = this._data) == null ? void 0 : a.type}></content-audit-issue-type-label>
					</div>
				</umb-property-layout>
				<umb-property-layout label="Issue Priority" orientation="vertical" style="padding-bottom: 0;">
					<div slot="editor">
						<content-audit-priority-type-label .type=${(r = this._data) == null ? void 0 : r.priority}></content-audit-priority-type-label>
					</div>
				</umb-property-layout>
			</uui-box>
		`;
};
l.styles = [
  L,
  B`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}
		`
];
c([
  _()
], l.prototype, "_data", 2);
c([
  _()
], l.prototype, "_tableConfig", 2);
c([
  _()
], l.prototype, "_tableColumns", 1);
c([
  _()
], l.prototype, "_tableItems", 2);
l = c([
  N("content-audit-issues-details-workspace-view")
], l);
const ee = l;
export {
  l as ContentAuditIssuesDetailsWorkspaceViewElement,
  ee as default
};
//# sourceMappingURL=issues-details-workspace-view.element-DLopDPBF.js.map
