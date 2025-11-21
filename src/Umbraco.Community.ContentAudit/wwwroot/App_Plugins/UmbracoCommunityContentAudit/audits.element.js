import { html as u, customElement as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as m } from "@umbraco-cms/backoffice/collection";
var a = Object.getOwnPropertyDescriptor, d = (l, n, i, r) => {
  for (var t = r > 1 ? void 0 : r ? a(n, i) : n, e = l.length - 1, s; e >= 0; e--)
    (s = l[e]) && (t = s(t) || t);
  return t;
};
let o = class extends m {
  renderToolbar() {
    return u``;
  }
};
o = d([
  c("content-audit-audits-collection")
], o);
const C = o;
export {
  o as ContentAuditAuditsCollectionElement,
  C as default
};
//# sourceMappingURL=audits.element.js.map
