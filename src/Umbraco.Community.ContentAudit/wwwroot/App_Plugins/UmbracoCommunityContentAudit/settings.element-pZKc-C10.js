import { UmbElementMixin as c } from "@umbraco-cms/backoffice/element-api";
import { LitElement as m, html as g, css as v, state as h, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { C as f } from "./index-B3GcBdtE.js";
import "@umbraco-cms/backoffice/repository";
import "@umbraco-cms/backoffice/resources";
var _ = Object.defineProperty, b = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, p = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? b(e, i) : e, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (s = (o ? l(e, i, s) : l(s)) || s);
  return o && s && _(e, i, s), s;
}, u = (t, e, i) => e.has(t) || d("Cannot " + i), x = (t, e, i) => (u(t, e, "read from private field"), i ? i.call(t) : e.get(t)), w = (t, e, i) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), C = (t, e, i, o) => (u(t, e, "write to private field"), e.set(t, i), i), a;
let r = class extends c(m) {
  constructor() {
    super(), w(this, a), this.settings = void 0, this.consumeContext(f, (t) => {
      C(this, a, t), this.observe(t.settings, (e) => {
        this.settings = e;
      }), x(this, a).getSettings();
    });
  }
  render() {
    if (this.settings !== void 0)
      return g`
                <uui-box headline="Settings">
                    <div slot="header">Discovered from appsettings.json</div>

                    <umb-property-layout label="Use Umbraco content index" description="If true, Content Audit will use content from the index instead of the crawler" style="padding-top: 0;">
                        <div slot="editor">
                            <uui-toggle .checked=${this.settings.useUmbracoContentIndex} readonly></uui-toggle>
                        </div>
                    </umb-property-layout>

                    <umb-property-layout label="Respect robots.txt" description="If any content is set to 'disallow', it will be ignored by the crawler">
                        <div slot="editor">
                            <uui-toggle .checked=${this.settings.respectRobotsTxt} readonly></uui-toggle>
                        </div>
                    </umb-property-layout>

                    <umb-property-layout label="Use sitemap.xml" description="If true, Content Audit will use pages listed in 'sitemap.xml' instead of the crawler">
                        <div slot="editor">
                            <uui-toggle .checked=${this.settings.useSitemapXml} readonly></uui-toggle>
                        </div>
                    </umb-property-layout>

                    <umb-property-layout label="Sitemap URL" description="Custom path to sitemap. Defaults to '/sitemap.xml'">
                        <div slot="editor">${this.settings.sitemapUrl}</div>
                    </umb-property-layout>
                </uui-box>
            `;
  }
};
a = /* @__PURE__ */ new WeakMap();
r.styles = [
  v`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }

            .audit-setting {
                display: flex;
                padding: var(--uui-size-space-2) 0;
                border-bottom: 1px solid var(--uui-color-divider);

                p {
                    margin: 0;
                }
            }

            .audit-setting__label {
                flex-grow: 1;
            }
        `
];
p([
  h()
], r.prototype, "settings", 2);
r = p([
  y("content-audit-settings-view")
], r);
const A = r;
export {
  r as ContentAuditSettingsViewElement,
  A as default
};
//# sourceMappingURL=settings.element-pZKc-C10.js.map
