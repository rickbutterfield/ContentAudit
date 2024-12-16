import { UmbElementMixin as c } from "@umbraco-cms/backoffice/element-api";
import { LitElement as h, html as _, css as u, state as m, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { C as g } from "./index-DaGunpdO.js";
import "@umbraco-cms/backoffice/repository";
import "@umbraco-cms/backoffice/resources";
var C = Object.defineProperty, E = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, p = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? E(e, s) : e, o = t.length - 1, v; o >= 0; o--)
    (v = t[o]) && (i = (r ? v(e, s, i) : v(i)) || i);
  return r && i && C(e, s, i), i;
}, l = (t, e, s) => e.has(t) || d("Cannot " + s), x = (t, e, s) => (l(t, e, "read from private field"), s ? s.call(t) : e.get(t)), w = (t, e, s) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), T = (t, e, s, r) => (l(t, e, "write to private field"), e.set(t, s), s), a;
let n = class extends c(h) {
  constructor() {
    super(), w(this, a), this.settings = void 0, this.consumeContext(g, (t) => {
      T(this, a, t), this.observe(t.settings, (e) => {
        this.settings = e;
      }), x(this, a).getSettings();
    });
  }
  render() {
    if (this.settings !== void 0)
      return _`
                <uui-box headline="Settings">
                    <div>
                        <div>Respect robots.txt</div>
                        <div>${this.settings.respectRobotsTxt ? "Yes" : "No"}</div>
                    </div>

                    <div>
                        <div>Use sitemap.xml</div>
                        <div>${this.settings.useSitemapXml ? "Yes" : "No"}</div>
                    </div>
                </uui-box>
            `;
  }
};
a = /* @__PURE__ */ new WeakMap();
n.styles = [
  u`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }
        `
];
p([
  m()
], n.prototype, "settings", 2);
n = p([
  f("content-audit-settings-view")
], n);
const P = n;
export {
  n as ContentAuditSettingsViewElement,
  P as default
};
//# sourceMappingURL=settings.element-BZGTSJPS.js.map
