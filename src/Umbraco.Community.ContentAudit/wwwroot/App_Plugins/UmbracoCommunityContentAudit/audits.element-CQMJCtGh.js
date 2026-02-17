import { html as i, customElement as a } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as c } from "@umbraco-cms/backoffice/collection";
var m = Object.getOwnPropertyDescriptor, d = (o, n, u, r) => {
  for (var t = r > 1 ? void 0 : r ? m(n, u) : n, e = o.length - 1, s; e >= 0; e--)
    (s = o[e]) && (t = s(t) || t);
  return t;
};
let l = class extends c {
  renderToolbar() {
    return i``;
  }
};
l = d([
  a("content-audit-audits-collection")
], l);
const C = l;
export {
  l as ContentAuditAuditsCollectionElement,
  C as default
};
//# sourceMappingURL=audits.element-CQMJCtGh.js.map
