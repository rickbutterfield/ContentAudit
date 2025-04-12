import { UmbLitElement as U } from "@umbraco-cms/backoffice/lit-element";
import { UMB_WORKSPACE_MODAL as D } from "@umbraco-cms/backoffice/workspace";
import { f as x, u as R, t as W } from "./index-D_Li1N95.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT as N } from "./issues-workspace.context-Du1ckcBQ.js";
import { html as h, css as k } from "@umbraco-cms/backoffice/external/lit";
import { UMB_EDIT_DOCUMENT_WORKSPACE_PATH_PATTERN as q } from "@umbraco-cms/backoffice/document";
import { UmbTextStyles as B } from "@umbraco-cms/backoffice/style";
import { UmbModalRouteRegistrationController as K } from "@umbraco-cms/backoffice/router";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = { attribute: !0, type: String, converter: R, reflect: !1, hasChanged: x }, V = (t = L, e, i) => {
  const { kind: s, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), a.set(i.name, t), s === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const n = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(r, n, t);
    }, init(l) {
      return l !== void 0 && this.P(r, void 0, t), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(l) {
      const n = this[r];
      e.call(this, l), this.requestUpdate(r, n, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function z(t) {
  return (e, i) => typeof i == "object" ? V(t, e, i) : ((s, o, a) => {
    const r = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, r ? { ...s, wrapped: !0 } : s), r ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(t) {
  return z({ ...t, state: !0, attribute: !1 });
}
var F = Object.defineProperty, G = Object.getOwnPropertyDescriptor, w = (t) => {
  throw TypeError(t);
}, m = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? G(e, i) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (s ? r(e, i, o) : r(o)) || o);
  return s && o && F(e, i, o), o;
}, g = (t, e, i) => e.has(t) || w("Cannot " + i), v = (t, e, i) => (g(t, e, "read from private field"), e.get(t)), b = (t, e, i) => e.has(t) ? w("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), E = (t, e, i, s) => (g(t, e, "write to private field"), e.set(t, i), i), d = (t, e, i) => (g(t, e, "access private method"), i), c, f, p, I, A, O, $, S;
let u = class extends U {
  constructor() {
    super(), b(this, p), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableItems = [], b(this, c), b(this, f), this.consumeContext(N, (t) => {
      E(this, c, t);
    }), d(this, p, I).call(this);
  }
  get _tableColumns() {
    var e, i, s, o, a, r, l;
    let t = [];
    return this._data != null && (t.push({
      name: ((e = this._data) == null ? void 0 : e.images) != null ? "URL" : "Page",
      alias: "url"
    }), ((i = this._data) == null ? void 0 : i.exposedProperties) != null && ((o = (s = this._data) == null ? void 0 : s.exposedProperties) == null ? void 0 : o.length) !== 0 && this._data.exposedProperties.forEach((n) => {
      t.push({ name: n.name, alias: n.alias, elementName: n.elementName, labelTemplate: n.labelTemplate });
    }), ((a = this._data) == null ? void 0 : a.images) != null && ((l = (r = this._data) == null ? void 0 : r.images) == null ? void 0 : l.length) !== 0 && t.push({
      name: "Found Page",
      alias: "foundPage"
    })), t;
  }
  render() {
    return h`
			${d(this, p, $).call(this)}
			${d(this, p, S).call(this)}
		`;
  }
};
c = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
I = function() {
  new K(this, D).addAdditionalPath(":entityType").onSetup((t) => ({ data: { entityType: t.entityType, preset: {} } })).observeRouteBuilder((t) => {
    E(this, f, t), d(this, p, A).call(this);
  });
};
A = function() {
  v(this, c) && this.observe(v(this, c).data, (t) => {
    this._data = t, d(this, p, O).call(this, t);
  }, "umbCollectionItemsObserver");
};
O = function(t) {
  var s, o, a;
  let e = [];
  const i = v(this, f);
  if (!i) throw new Error("Route builder not ready");
  t != null && (((s = t.pages) == null ? void 0 : s.length) !== 0 && (e = (o = t == null ? void 0 : t.pages) == null ? void 0 : o.map((r) => {
    var P, C, T;
    const l = i({ entityType: "document" }) + q.generateLocal({ unique: r.nodeKey });
    let n = {
      id: r.unique,
      data: [
        {
          columnAlias: "url",
          value: h`<a href="${l}">${r.url}</a>`
        }
      ]
    };
    return ((P = this._data) == null ? void 0 : P.exposedProperties) != null && ((T = (C = this._data) == null ? void 0 : C.exposedProperties) == null ? void 0 : T.length) !== 0 && this._data.exposedProperties.forEach((_) => {
      const M = _.alias;
      n.data.push({ columnAlias: _.alias, value: _.labelTemplate ?? r[M] });
    }), n;
  })), (t == null ? void 0 : t.images) != null && (t == null ? void 0 : t.images.length) !== 0 && (e = (a = t == null ? void 0 : t.images) == null ? void 0 : a.map((r) => ({
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
$ = function() {
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
S = function() {
  var t, e, i, s, o;
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
						<content-audit-issue-type-label .type=${(s = this._data) == null ? void 0 : s.type}></content-audit-issue-type-label>
					</div>
				</umb-property-layout>
				<umb-property-layout label="Issue Priority" orientation="vertical" style="padding-bottom: 0;">
					<div slot="editor">
						<content-audit-priority-type-label .type=${(o = this._data) == null ? void 0 : o.priority}></content-audit-priority-type-label>
					</div>
				</umb-property-layout>
			</uui-box>
		`;
};
u.styles = [
  B,
  k`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}
		`
];
m([
  y()
], u.prototype, "_data", 2);
m([
  y()
], u.prototype, "_tableConfig", 2);
m([
  y()
], u.prototype, "_tableColumns", 1);
m([
  y()
], u.prototype, "_tableItems", 2);
u = m([
  W("content-audit-issues-details-workspace-view")
], u);
const et = u;
export {
  u as ContentAuditIssuesDetailsWorkspaceViewElement,
  et as default
};
//# sourceMappingURL=issues-details-workspace-view.element-2vMLEGQk.js.map
