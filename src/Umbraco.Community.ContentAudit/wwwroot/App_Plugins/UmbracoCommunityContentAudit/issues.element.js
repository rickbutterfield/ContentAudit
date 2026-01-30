import { html as c, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as a } from "@umbraco-cms/backoffice/collection";
var i = Object.getOwnPropertyDescriptor, f = (o, n, u, r) => {
  for (var e = r > 1 ? void 0 : r ? i(n, u) : n, t = o.length - 1, s; t >= 0; t--)
    (s = o[t]) && (e = s(e) || e);
  return e;
};
let l = class extends a {
  renderToolbar() {
    return c``;
  }
};
l = f([
  m("content-audit-issues-collection")
], l);
const C = l;
export {
  l as ContentAuditIssuesCollectionElement,
  C as default
};
//# sourceMappingURL=issues.element.js.map
