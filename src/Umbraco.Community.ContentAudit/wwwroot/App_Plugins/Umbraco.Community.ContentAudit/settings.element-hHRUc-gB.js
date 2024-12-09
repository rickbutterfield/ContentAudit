import { UmbElementMixin as l } from "@umbraco-cms/backoffice/element-api";
import { LitElement as m, html as p, css as c, customElement as a } from "@umbraco-cms/backoffice/external/lit";
var f = Object.defineProperty, v = Object.getOwnPropertyDescriptor, d = (u, t, r, s) => {
  for (var e = s > 1 ? void 0 : s ? v(t, r) : t, i = u.length - 1, o; i >= 0; i--)
    (o = u[i]) && (e = (s ? o(t, r, e) : o(e)) || e);
  return s && e && f(t, r, e), e;
};
let n = class extends l(m) {
  constructor() {
    super();
  }
  render() {
    return p`<uui-box>Settings</uui-box>`;
  }
};
n.styles = [
  c`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }
        `
];
n = d([
  a("content-audit-settings-view")
], n);
const g = n;
export {
  n as ContentAuditSettingsViewElement,
  g as default
};
//# sourceMappingURL=settings.element-hHRUc-gB.js.map
