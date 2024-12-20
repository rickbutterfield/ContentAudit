import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
import { u as C, f as I, t as $ } from "./index-BpAvlXJv.js";
import { CONTENT_AUDIT_ISSUES_WORKSPACE_CONTEXT as E } from "./issues-workspace.context-Cf-MVnc9.js";
import { html as m, css as O } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as S } from "@umbraco-cms/backoffice/style";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = { attribute: !0, type: String, converter: C, reflect: !1, hasChanged: I }, A = (t = T, e, a) => {
  const { kind: r, metadata: i } = a;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), o.set(a.name, t), r === "accessor") {
    const { name: s } = a;
    return { set(n) {
      const l = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(s, l, t);
    }, init(n) {
      return n !== void 0 && this.P(s, void 0, t), n;
    } };
  }
  if (r === "setter") {
    const { name: s } = a;
    return function(n) {
      const l = this[s];
      e.call(this, n), this.requestUpdate(s, l, t);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function x(t) {
  return (e, a) => typeof a == "object" ? A(t, e, a) : ((r, i, o) => {
    const s = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s ? { ...r, wrapped: !0 } : r), s ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(t, e, a);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function D(t) {
  return x({ ...t, state: !0, attribute: !1 });
}
var U = Object.defineProperty, W = Object.getOwnPropertyDescriptor, _ = (t) => {
  throw TypeError(t);
}, f = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? W(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (r ? s(e, a, i) : s(i)) || i);
  return r && i && U(e, a, i), i;
}, h = (t, e, a) => e.has(t) || _("Cannot " + a), k = (t, e, a) => (h(t, e, "read from private field"), a ? a.call(t) : e.get(t)), v = (t, e, a) => e.has(t) ? _("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), M = (t, e, a, r) => (h(t, e, "write to private field"), e.set(t, a), a), y = (t, e, a) => (h(t, e, "access private method"), a), d, c, b, g;
let p = class extends w {
  constructor() {
    super(), v(this, c), v(this, d), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this.consumeContext(E, (t) => {
      M(this, d, t), this.observe(k(this, d).data, (e) => {
        this._data = e;
      });
    });
  }
  get _tableColumns() {
    var e, a, r, i;
    let t = [{
      name: ((e = this._data) == null ? void 0 : e.images) != null ? "URL" : "Page",
      alias: "url"
    }];
    return ((a = this._data) == null ? void 0 : a.images) != null && ((i = (r = this._data) == null ? void 0 : r.images) == null ? void 0 : i.length) !== 0 && t.push({
      name: "Found Page",
      alias: "foundPage"
    }), t;
  }
  get _tableItems() {
    var e, a, r, i, o, s, n, l;
    let t;
    return ((a = (e = this._data) == null ? void 0 : e.pages) == null ? void 0 : a.length) !== 0 && (t = (i = (r = this._data) == null ? void 0 : r.pages) == null ? void 0 : i.map((u) => ({
      id: u.unique,
      data: [
        {
          columnAlias: "url",
          value: u.url
        }
      ]
    }))), ((o = this._data) == null ? void 0 : o.images) != null && ((s = this._data) == null ? void 0 : s.images.length) !== 0 && (t = (l = (n = this._data) == null ? void 0 : n.images) == null ? void 0 : l.map((u) => ({
      id: u.unique,
      data: [
        {
          columnAlias: "url",
          value: u.url
        },
        {
          columnAlias: "foundPage",
          value: u.foundPage
        }
      ]
    }))), t;
  }
  render() {
    return m`
			${y(this, c, b).call(this)}
			${y(this, c, g).call(this)}
		`;
  }
};
d = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
b = function() {
  return m`
			<div>
				<umb-table
					.config=${this._tableConfig}
					.columns=${this._tableColumns}
					.items=${this._tableItems}>
				</umb-table>
			</div>
		`;
};
g = function() {
  var t, e, a, r, i;
  return m`
			<uui-box>
				<umb-property-layout label="Name" orientation="vertical">
					<div slot="editor">${(t = this._data) == null ? void 0 : t.name}</div>
				</umb-property-layout>
				<umb-property-layout label="Category" orientation="vertical">
					<div slot="editor">${(e = this._data) == null ? void 0 : e.category}</div>
				</umb-property-layout>
				<umb-property-layout label="Description" orientation="vertical">
					<div slot="editor">${(a = this._data) == null ? void 0 : a.description}</div>
				</umb-property-layout>

				<umb-property-layout label="Issue Type" orientation="vertical">
					<div slot="editor">
						<content-audit-issue-type-label .type=${(r = this._data) == null ? void 0 : r.type}></content-audit-issue-type-label>
					</div>
				</umb-property-layout>
				<umb-property-layout label="Issue Priority" orientation="vertical">
					<div slot="editor">
						<content-audit-priority-type-label .type=${(i = this._data) == null ? void 0 : i.priority}></content-audit-priority-type-label>
					</div>
				</umb-property-layout>
			</uui-box>
		`;
};
p.styles = [
  S,
  O`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}
		`
];
f([
  D()
], p.prototype, "_data", 2);
p = f([
  $("content-audit-issues-details-workspace-view")
], p);
const R = p;
export {
  p as ContentAuditIssuesDetailsWorkspaceViewElement,
  R as default
};
//# sourceMappingURL=issues-details-workspace-view.element-Dd8KD8vx.js.map
