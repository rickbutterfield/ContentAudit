import { html as u, customElement as l } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as m } from "@umbraco-cms/backoffice/lit-element";
var p = Object.defineProperty, a = Object.getOwnPropertyDescriptor, f = (i, t, o, r) => {
  for (var e = r > 1 ? void 0 : r ? a(t, o) : t, n = i.length - 1, s; n >= 0; n--)
    (s = i[n]) && (e = (r ? s(t, o, e) : s(e)) || e);
  return r && e && p(t, o, e), e;
};
let c = class extends m {
  constructor() {
    super();
  }
  render() {
    return u`<content-audit-workspace-root></content-audit-workspace-root>`;
  }
};
c = f([
  l("audit-section-view")
], c);
const d = c;
export {
  c as AuditSectionViewElement,
  d as default
};
//# sourceMappingURL=section.element-4EHKqOry.js.map
