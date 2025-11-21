import { UmbLitElement as m } from "@umbraco-cms/backoffice/lit-element";
import { t as w } from "./index.js";
import { r as A } from "./state.js";
import { CONTENT_AUDIT_AUDITS_WORKSPACE_CONTEXT as C } from "./audits-workspace.context.js";
import { html as l, css as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as D } from "@umbraco-cms/backoffice/style";
var y = Object.defineProperty, E = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, h = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? E(e, a) : e, n = t.length - 1, d; n >= 0; n--)
    (d = t[n]) && (i = (r ? d(e, a, i) : d(i)) || i);
  return r && i && y(e, a, i), i;
}, u = (t, e, a) => e.has(t) || v("Cannot " + a), c = (t, e, a) => (u(t, e, "read from private field"), e.get(t)), _ = (t, e, a) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), O = (t, e, a, r) => (u(t, e, "write to private field"), e.set(t, a), a), T = (t, e, a) => (u(t, e, "access private method"), a), s, p, f;
let o = class extends m {
  constructor() {
    super(), _(this, p), _(this, s), this.consumeContext(C, (t) => {
      O(this, s, t), T(this, p, f).call(this);
    });
  }
  render() {
    return this._data ? l`
			<uui-box headline="Audit Details">
				<div class="audit-details">
					<p><strong>Unique ID:</strong> ${this._data.unique || "N/A"}</p>
					<p>Additional audit details will be displayed here when the data structure is finalized.</p>
				</div>
			</uui-box>
		` : l`<uui-box>No audit data available</uui-box>`;
  }
};
s = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
f = function() {
  c(this, s) && this.observe(c(this, s).data, (t) => {
    t && (this._data = t);
  }, "dataObserver");
};
o.styles = [
  D,
  x`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.audit-details {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3);
			}
		`
];
h([
  A()
], o.prototype, "_data", 2);
o = h([
  w("content-audit-audits-details-workspace-view")
], o);
const P = o;
export {
  o as ContentAuditAuditsDetailsWorkspaceViewElement,
  P as default
};
//# sourceMappingURL=audits-details-workspace-view.element.js.map
