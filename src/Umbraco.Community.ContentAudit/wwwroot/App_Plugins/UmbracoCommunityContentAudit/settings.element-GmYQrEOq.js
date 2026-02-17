import { html as c, css as g, state as m, customElement as v } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as h } from "@umbraco-cms/backoffice/lit-element";
import { C as y } from "./index-CQIca5UD.js";
import "@umbraco-cms/backoffice/repository";
import "@umbraco-cms/backoffice/resources";
var f = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, p = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? _(e, i) : e, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (s = (o ? l(e, i, s) : l(s)) || s);
  return o && s && f(e, i, s), s;
}, u = (t, e, i) => e.has(t) || d("Cannot " + i), b = (t, e, i) => (u(t, e, "read from private field"), e.get(t)), w = (t, e, i) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), x = (t, e, i, o) => (u(t, e, "write to private field"), e.set(t, i), i), a;
let r = class extends h {
  constructor() {
    super(), w(this, a), this.settings = void 0, this.consumeContext(y, (t) => {
      x(this, a, t), this.observe(t?.settings, (e) => {
        this.settings = e;
      }), b(this, a)?.getSettings();
    });
  }
  render() {
    if (this.settings !== void 0)
      return c`
                <uui-box headline="Settings">
                    <div slot="header">Discovered from appsettings.json</div>

                    <umb-property-layout label="Use Umbraco content index" description="If true, ContentAudit will use content from the index instead of the crawler" style="padding-top: 0;">
                        <div slot="editor">
                            <uui-toggle .checked=${this.settings.useUmbracoContentIndex} readonly></uui-toggle>
                        </div>
                    </umb-property-layout>

                    <umb-property-layout label="Respect robots.txt" description="If any content is set to 'disallow', it will be ignored by the crawler">
                        <div slot="editor">
                            <uui-toggle .checked=${this.settings.respectRobotsTxt} readonly></uui-toggle>
                        </div>
                    </umb-property-layout>

                    <umb-property-layout label="Use sitemap.xml" description="If true, ContentAudit will use pages listed in 'sitemap.xml' instead of the crawler">
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
  g`
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
  m()
], r.prototype, "settings", 2);
r = p([
  v("content-audit-settings-view")
], r);
const O = r;
export {
  r as ContentAuditSettingsViewElement,
  O as default
};
//# sourceMappingURL=settings.element-GmYQrEOq.js.map
