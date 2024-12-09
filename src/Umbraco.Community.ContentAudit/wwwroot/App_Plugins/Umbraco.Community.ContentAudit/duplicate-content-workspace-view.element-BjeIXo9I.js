import { html as a, css as c, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as i } from "@umbraco-cms/backoffice/lit-element";
var m = Object.defineProperty, b = Object.getOwnPropertyDescriptor, d = (n, t, u, r) => {
  for (var e = r > 1 ? void 0 : r ? b(t, u) : t, l = n.length - 1, s; l >= 0; l--)
    (s = n[l]) && (e = (r ? s(t, u, e) : s(e)) || e);
  return r && e && m(t, u, e), e;
};
let o = class extends i {
  constructor() {
    super();
  }
  render() {
    return a`
            <umb-body-layout headline="Duplicate Content">
            </umb-body-layout>
        `;
  }
};
o.styles = [
  c`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}
        `
];
o = d([
  p("duplicate-content-audit-workspace")
], o);
const h = o;
export {
  o as AuditDuplicateContentWorkspaceElement,
  h as default
};
//# sourceMappingURL=duplicate-content-workspace-view.element-BjeIXo9I.js.map
