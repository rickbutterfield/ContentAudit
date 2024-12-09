import { html as c, css as d, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as n } from "@umbraco-cms/backoffice/lit-element";
var p = Object.defineProperty, i = Object.getOwnPropertyDescriptor, b = (l, t, o, s) => {
  for (var e = s > 1 ? void 0 : s ? i(t, o) : t, u = l.length - 1, a; u >= 0; u--)
    (a = l[u]) && (e = (s ? a(t, o, e) : a(e)) || e);
  return s && e && p(t, o, e), e;
};
let r = class extends n {
  constructor() {
    super();
  }
  render() {
    return c`
            <umb-body-layout headline="Status Codes">
            </umb-body-layout>
        `;
  }
};
r.styles = [
  d`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}
        `
];
r = b([
  m("status-codes-audit-workspace")
], r);
const h = r;
export {
  r as AuditStatusCodesWorkspaceElement,
  h as default
};
//# sourceMappingURL=status-codes-workspace-view.element-C0CemEtO.js.map
