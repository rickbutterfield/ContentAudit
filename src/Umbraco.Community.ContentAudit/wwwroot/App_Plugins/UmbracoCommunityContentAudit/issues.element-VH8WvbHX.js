import { html as c, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbCollectionDefaultElement as i } from "@umbraco-cms/backoffice/collection";
var f = Object.defineProperty, p = Object.getOwnPropertyDescriptor, a = (u, t, l, o) => {
  for (var e = o > 1 ? void 0 : o ? p(t, l) : t, n = u.length - 1, r; n >= 0; n--)
    (r = u[n]) && (e = (o ? r(t, l, e) : r(e)) || e);
  return o && e && f(t, l, e), e;
};
let s = class extends i {
  renderToolbar() {
    return c``;
  }
};
s = a([
  m("content-audit-issues-collection")
], s);
const _ = s;
export {
  s as ContentAuditIssuesCollectionElement,
  _ as default
};
//# sourceMappingURL=issues.element-VH8WvbHX.js.map
