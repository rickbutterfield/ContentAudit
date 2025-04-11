import { html as u, customElement as a } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as l } from "@umbraco-cms/backoffice/lit-element";
var m = Object.getOwnPropertyDescriptor, p = (o, n, i, s) => {
  for (var t = s > 1 ? void 0 : s ? m(n, i) : n, e = o.length - 1, c; e >= 0; e--)
    (c = o[e]) && (t = c(t) || t);
  return t;
};
let r = class extends l {
  constructor() {
    super();
  }
  render() {
    return u`<content-audit-workspace-root></content-audit-workspace-root>`;
  }
};
r = p([
  a("audit-section-view")
], r);
const v = r;
export {
  r as AuditSectionViewElement,
  v as default
};
//# sourceMappingURL=section.element-CxVaSoKM.js.map
