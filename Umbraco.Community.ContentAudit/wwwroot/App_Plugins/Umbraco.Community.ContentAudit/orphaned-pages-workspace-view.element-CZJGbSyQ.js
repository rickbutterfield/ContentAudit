import { html as p, css as n, customElement as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as d } from "@umbraco-cms/backoffice/lit-element";
var m = Object.defineProperty, i = Object.getOwnPropertyDescriptor, b = (l, r, a, t) => {
  for (var e = t > 1 ? void 0 : t ? i(r, a) : r, o = l.length - 1, u; o >= 0; o--)
    (u = l[o]) && (e = (t ? u(r, a, e) : u(e)) || e);
  return t && e && m(r, a, e), e;
};
let s = class extends d {
  constructor() {
    super();
  }
  render() {
    return p`
            <umb-body-layout headline="Orphaned Pages">
            </umb-body-layout>
        `;
  }
};
s.styles = [
  n`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}
        `
];
s = b([
  c("orphaned-pages-audit-workspace")
], s);
const v = s;
export {
  s as AuditOrphanedPagesWorkspaceElement,
  v as default
};
//# sourceMappingURL=orphaned-pages-workspace-view.element-CZJGbSyQ.js.map
