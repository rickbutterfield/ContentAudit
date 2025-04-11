import { html as c, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as i } from "@umbraco-cms/backoffice/collection";
var a = Object.getOwnPropertyDescriptor, f = (l, n, u, r) => {
  for (var e = r > 1 ? void 0 : r ? a(n, u) : n, t = l.length - 1, s; t >= 0; t--)
    (s = l[t]) && (e = s(e) || e);
  return e;
};
let o = class extends i {
  renderToolbar() {
    return c``;
  }
};
o = f([
  m("content-audit-issues-collection")
], o);
const d = o;
export {
  o as ContentAuditIssuesCollectionElement,
  d as default
};
//# sourceMappingURL=issues.element-Cl7lgtgI.js.map
