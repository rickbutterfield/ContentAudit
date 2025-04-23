import { UmbLitElement as R } from "@umbraco-cms/backoffice/lit-element";
import { UMB_WORKSPACE_MODAL as W } from "@umbraco-cms/backoffice/workspace";
import { t as M } from "./index-Ck9ugKjL.js";
import { r as _ } from "./state-DxkV9maw.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT as U } from "./issues-workspace.context-CdNKBUXC.js";
import { html as c, css as N } from "@umbraco-cms/backoffice/external/lit";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as k } from "@umbraco-cms/backoffice/document";
import { UmbTextStyles as B } from "@umbraco-cms/backoffice/style";
import { UmbModalRouteRegistrationController as q } from "@umbraco-cms/backoffice/router";
var L = Object.defineProperty, K = Object.getOwnPropertyDescriptor, E = (e) => {
  throw TypeError(e);
}, h = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? K(t, i) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (r = (o ? a(t, i, r) : a(r)) || r);
  return o && r && L(t, i, r), r;
}, g = (e, t, i) => t.has(e) || E("Cannot " + i), b = (e, t, i) => (g(e, t, "read from private field"), t.get(e)), v = (e, t, i) => t.has(e) ? E("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), w = (e, t, i, o) => (g(e, t, "write to private field"), t.set(e, i), i), m = (e, t, i) => (g(e, t, "access private method"), i), d, y, u, A, $, O, S, D;
let l = class extends R {
  constructor() {
    super(), v(this, u), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableItems = [], v(this, d), v(this, y), this.consumeContext(U, (e) => {
      w(this, d, e);
    }), m(this, u, A).call(this);
  }
  get _tableColumns() {
    var t, i, o, r, s, a, p;
    let e = [];
    return this._data != null && (e.push({
      name: ((t = this._data) == null ? void 0 : t.images) != null ? "URL" : "Page",
      alias: "url"
    }), ((i = this._data) == null ? void 0 : i.exposedProperties) != null && ((r = (o = this._data) == null ? void 0 : o.exposedProperties) == null ? void 0 : r.length) !== 0 && this._data.exposedProperties.forEach((n) => {
      e.push({ name: n.name, alias: n.alias, elementName: n.elementName, labelTemplate: n.labelTemplate });
    }), ((s = this._data) == null ? void 0 : s.images) != null && ((p = (a = this._data) == null ? void 0 : a.images) == null ? void 0 : p.length) !== 0 && e.push({
      name: "Found Page",
      alias: "foundPage"
    })), e;
  }
  render() {
    return c`
			${m(this, u, S).call(this)}
			${m(this, u, D).call(this)}
		`;
  }
};
d = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakSet();
A = function() {
  new q(this, W).addAdditionalPath(":entityType").onSetup((e) => ({ data: { entityType: e.entityType, preset: {} } })).observeRouteBuilder((e) => {
    w(this, y, e), m(this, u, $).call(this);
  });
};
$ = function() {
  b(this, d) && this.observe(b(this, d).data, (e) => {
    this._data = e, m(this, u, O).call(this, e);
  }, "umbCollectionItemsObserver");
};
O = function(e) {
  var o, r, s;
  let t = [];
  const i = b(this, y);
  if (!i) throw new Error("Route builder not ready");
  e != null && (((o = e.pages) == null ? void 0 : o.length) !== 0 && (t = (r = e == null ? void 0 : e.pages) == null ? void 0 : r.map((a) => {
    var C, P, T, I;
    const p = i({ entityType: "document" }) + k.generateLocal({ unique: a.unique });
    let n = {
      id: a.unique,
      data: [
        {
          columnAlias: "url",
          value: c`<a href="${p}">${(C = a.pageData) == null ? void 0 : C.url}</a>`
        }
      ]
    };
    return ((P = this._data) == null ? void 0 : P.exposedProperties) != null && ((I = (T = this._data) == null ? void 0 : T.exposedProperties) == null ? void 0 : I.length) !== 0 && this._data.exposedProperties.forEach((f) => {
      const x = f.alias;
      n.data.push({ columnAlias: f.alias, value: f.labelTemplate ?? a[x] });
    }), n;
  })), (e == null ? void 0 : e.images) != null && (e == null ? void 0 : e.images.length) !== 0 && (t = (s = e == null ? void 0 : e.images) == null ? void 0 : s.map((a) => ({
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
  })))), this._tableItems = t || [];
};
S = function() {
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
D = function() {
  var e, t, i, o, r;
  return c`
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
						<content-audit-issue-type-label .type=${(o = this._data) == null ? void 0 : o.type}></content-audit-issue-type-label>
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
  B,
  N`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}
		`
];
h([
  _()
], l.prototype, "_data", 2);
h([
  _()
], l.prototype, "_tableConfig", 2);
h([
  _()
], l.prototype, "_tableColumns", 1);
h([
  _()
], l.prototype, "_tableItems", 2);
l = h([
  M("content-audit-issues-details-workspace-view")
], l);
const Z = l;
export {
  l as ContentAuditIssuesDetailsWorkspaceViewElement,
  Z as default
};
//# sourceMappingURL=issues-details-workspace-view.element-Be3unrWO.js.map
