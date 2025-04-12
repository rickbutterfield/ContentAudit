import { UmbLitElement as U } from "@umbraco-cms/backoffice/lit-element";
import { UMB_WORKSPACE_MODAL as x } from "@umbraco-cms/backoffice/workspace";
import { f as R, u as W, t as N } from "./index-C-ZH_M9n.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT as k } from "./issues-workspace.context-Bd4OdUdb.js";
import { html as h, css as q } from "@umbraco-cms/backoffice/external/lit";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as B } from "@umbraco-cms/backoffice/document";
import { UmbTextStyles as L } from "@umbraco-cms/backoffice/style";
import { UmbModalRouteRegistrationController as K } from "@umbraco-cms/backoffice/router";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: R }, z = (t = V, e, i) => {
  const { kind: o, metadata: a } = i;
  let s = globalThis.litPropertyMetadata.get(a);
  if (s === void 0 && globalThis.litPropertyMetadata.set(a, s = /* @__PURE__ */ new Map()), s.set(i.name, t), o === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const n = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(r, n, t);
    }, init(l) {
      return l !== void 0 && this.P(r, void 0, t), l;
    } };
  }
  if (o === "setter") {
    const { name: r } = i;
    return function(l) {
      const n = this[r];
      e.call(this, l), this.requestUpdate(r, n, t);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function F(t) {
  return (e, i) => typeof i == "object" ? z(t, e, i) : ((o, a, s) => {
    const r = a.hasOwnProperty(s);
    return a.constructor.createProperty(s, r ? { ...o, wrapped: !0 } : o), r ? Object.getOwnPropertyDescriptor(a, s) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function f(t) {
  return F({ ...t, state: !0, attribute: !1 });
}
var G = Object.defineProperty, H = Object.getOwnPropertyDescriptor, E = (t) => {
  throw TypeError(t);
}, m = (t, e, i, o) => {
  for (var a = o > 1 ? void 0 : o ? H(e, i) : e, s = t.length - 1, r; s >= 0; s--)
    (r = t[s]) && (a = (o ? r(e, i, a) : r(a)) || a);
  return o && a && G(e, i, a), a;
}, g = (t, e, i) => e.has(t) || E("Cannot " + i), v = (t, e, i) => (g(t, e, "read from private field"), e.get(t)), b = (t, e, i) => e.has(t) ? E("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), I = (t, e, i, o) => (g(t, e, "write to private field"), e.set(t, i), i), d = (t, e, i) => (g(t, e, "access private method"), i), c, y, p, A, O, $, S, D;
let u = class extends U {
  constructor() {
    super(), b(this, p), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableItems = [], b(this, c), b(this, y), this.consumeContext(k, (t) => {
      I(this, c, t);
    }), d(this, p, A).call(this);
  }
  get _tableColumns() {
    var e, i, o, a, s, r, l;
    let t = [];
    return this._data != null && (t.push({
      name: ((e = this._data) == null ? void 0 : e.images) != null ? "URL" : "Page",
      alias: "url"
    }), ((i = this._data) == null ? void 0 : i.exposedProperties) != null && ((a = (o = this._data) == null ? void 0 : o.exposedProperties) == null ? void 0 : a.length) !== 0 && this._data.exposedProperties.forEach((n) => {
      t.push({ name: n.name, alias: n.alias, elementName: n.elementName, labelTemplate: n.labelTemplate });
    }), ((s = this._data) == null ? void 0 : s.images) != null && ((l = (r = this._data) == null ? void 0 : r.images) == null ? void 0 : l.length) !== 0 && t.push({
      name: "Found Page",
      alias: "foundPage"
    })), t;
  }
  render() {
    return h`
			${d(this, p, S).call(this)}
			${d(this, p, D).call(this)}
		`;
  }
};
c = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
A = function() {
  new K(this, x).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    I(this, y, t), d(this, p, O).call(this);
  });
};
O = function() {
  v(this, c) && this.observe(v(this, c).data, (t) => {
    this._data = t, d(this, p, $).call(this, t);
  }, "umbCollectionItemsObserver");
};
$ = function(t) {
  var o, a, s;
  let e = [];
  const i = v(this, y);
  if (!i) throw new Error("Route builder not ready");
  t != null && (((o = t.pages) == null ? void 0 : o.length) !== 0 && (e = (a = t == null ? void 0 : t.pages) == null ? void 0 : a.map((r) => {
    var P, C, T, w;
    const l = i({ entityType: "document" }) + B.generateLocal({ unique: r.unique });
    let n = {
      id: r.unique,
      data: [
        {
          columnAlias: "url",
          value: h`<a href="${l}">${(P = r.pageData) == null ? void 0 : P.url}</a>`
        }
      ]
    };
    return ((C = this._data) == null ? void 0 : C.exposedProperties) != null && ((w = (T = this._data) == null ? void 0 : T.exposedProperties) == null ? void 0 : w.length) !== 0 && this._data.exposedProperties.forEach((_) => {
      const M = _.alias;
      n.data.push({ columnAlias: _.alias, value: _.labelTemplate ?? r[M] });
    }), n;
  })), (t == null ? void 0 : t.images) != null && (t == null ? void 0 : t.images.length) !== 0 && (e = (s = t == null ? void 0 : t.images) == null ? void 0 : s.map((r) => ({
    id: r.unique,
    data: [
      {
        columnAlias: "url",
        value: r.url
      },
      {
        columnAlias: "foundPage",
        value: r.foundPage
      }
    ]
  })))), this._tableItems = e || [];
};
S = function() {
  return h`
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
  var t, e, i, o, a;
  return h`
			<uui-box style="align-self: flex-start;">
				<umb-property-layout label="Name" orientation="vertical" style="padding-top: 0;">
					<div slot="editor">${(t = this._data) == null ? void 0 : t.name}</div>
				</umb-property-layout>
				<umb-property-layout label="Category" orientation="vertical">
					<div slot="editor">${(e = this._data) == null ? void 0 : e.category}</div>
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
						<content-audit-priority-type-label .type=${(a = this._data) == null ? void 0 : a.priority}></content-audit-priority-type-label>
					</div>
				</umb-property-layout>
			</uui-box>
		`;
};
u.styles = [
  L,
  q`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}
		`
];
m([
  f()
], u.prototype, "_data", 2);
m([
  f()
], u.prototype, "_tableConfig", 2);
m([
  f()
], u.prototype, "_tableColumns", 1);
m([
  f()
], u.prototype, "_tableItems", 2);
u = m([
  N("content-audit-issues-details-workspace-view")
], u);
const it = u;
export {
  u as ContentAuditIssuesDetailsWorkspaceViewElement,
  it as default
};
//# sourceMappingURL=issues-details-workspace-view.element-x7CJiXm1.js.map
