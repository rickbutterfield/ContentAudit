import { html as _, css as d, state as c, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as f } from "@umbraco-cms/backoffice/lit-element";
import { CONTENT_AUDIT_CONTEXT_TOKEN as m } from "./assets.js";
var y = Object.defineProperty, w = Object.getOwnPropertyDescriptor, p = (t) => {
  throw TypeError(t);
}, n = (t, e, s, a) => {
  for (var r = a > 1 ? void 0 : a ? w(e, s) : e, u = t.length - 1, l; u >= 0; u--)
    (l = t[u]) && (r = (a ? l(e, s, r) : l(r)) || r);
  return a && r && y(e, s, r), r;
}, v = (t, e, s) => e.has(t) || p("Cannot " + s), E = (t, e, s) => (v(t, e, "read from private field"), e.get(t)), O = (t, e, s) => e.has(t) ? p("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), I = (t, e, s, a) => (v(t, e, "write to private field"), e.set(t, s), s), i;
let o = class extends f {
  constructor() {
    super(), O(this, i), this._allIssues = [], this.consumeContext(m, (t) => {
      var e;
      I(this, i, t), this.observe(t.allIssues, (s) => {
        this._allIssues = s;
      }), (e = E(this, i)) == null || e.getAllIssues();
    });
  }
  render() {
    return _`
            <umb-body-layout headline="Issues">
                <uui-box style="--uui-box-default-padding: 0;">
                    <audit-issue-table .data=${this._allIssues} />
                </uui-box>
            </umb-body-layout>
        `;
  }
};
i = /* @__PURE__ */ new WeakMap();
o.styles = [
  d`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}
        `
];
n([
  c()
], o.prototype, "_allIssues", 2);
o = n([
  h("overview-audit-workspace")
], o);
const g = o;
export {
  o as AuditOverviewWorkspaceElement,
  g as default
};
//# sourceMappingURL=issues-workspace-view.element-CZgPgKMS.js.map
