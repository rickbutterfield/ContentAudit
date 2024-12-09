import { html as c, css as n, customElement as i } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as v } from "@umbraco-cms/backoffice/lit-element";
var m = Object.defineProperty, p = Object.getOwnPropertyDescriptor, b = (a, r, s, t) => {
  for (var e = t > 1 ? void 0 : t ? p(r, s) : r, u = a.length - 1, l; u >= 0; u--)
    (l = a[u]) && (e = (t ? l(r, s, e) : l(e)) || e);
  return t && e && m(r, s, e), e;
};
let o = class extends v {
  constructor() {
    super();
  }
  render() {
    return c`
            <umb-body-layout headline="URL Inventory">
            </umb-body-layout>
        `;
  }
};
o.styles = [
  n`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}
        `
];
o = b([
  i("overview-audit-workspace")
], o);
const y = o;
export {
  o as AuditOverviewWorkspaceElement,
  y as default
};
//# sourceMappingURL=overview-workspace-view.element-CtOiyywm.js.map
