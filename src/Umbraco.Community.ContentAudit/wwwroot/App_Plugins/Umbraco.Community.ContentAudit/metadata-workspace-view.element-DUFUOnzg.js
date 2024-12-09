import { html as c, css as m, customElement as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as n } from "@umbraco-cms/backoffice/lit-element";
var p = Object.defineProperty, i = Object.getOwnPropertyDescriptor, b = (l, t, o, a) => {
  for (var e = a > 1 ? void 0 : a ? i(t, o) : t, s = l.length - 1, u; s >= 0; s--)
    (u = l[s]) && (e = (a ? u(t, o, e) : u(e)) || e);
  return a && e && p(t, o, e), e;
};
let r = class extends n {
  constructor() {
    super();
  }
  render() {
    return c`
            <umb-body-layout headline="Metadata">
            </umb-body-layout>
        `;
  }
};
r.styles = [
  m`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}
        `
];
r = b([
  d("metadata-audit-workspace")
], r);
const h = r;
export {
  r as AuditMetadataWorkspaceElement,
  h as default
};
//# sourceMappingURL=metadata-workspace-view.element-DUFUOnzg.js.map
