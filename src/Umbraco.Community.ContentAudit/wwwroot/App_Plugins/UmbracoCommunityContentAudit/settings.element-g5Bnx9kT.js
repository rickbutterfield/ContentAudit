import { UmbElementMixin as m } from "@umbraco-cms/backoffice/element-api";
import { LitElement as v, html as s, css as h, state as g, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { C as f } from "./index-CKBR_9pg.js";
import "@umbraco-cms/backoffice/repository";
import "@umbraco-cms/backoffice/resources";
var _ = Object.defineProperty, b = Object.getOwnPropertyDescriptor, p = (t) => {
  throw TypeError(t);
}, c = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? b(e, i) : e, u = t.length - 1, l; u >= 0; u--)
    (l = t[u]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && _(e, i, o), o;
}, d = (t, e, i) => e.has(t) || p("Cannot " + i), w = (t, e, i) => (d(t, e, "read from private field"), i ? i.call(t) : e.get(t)), x = (t, e, i) => e.has(t) ? p("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), C = (t, e, i, n) => (d(t, e, "write to private field"), e.set(t, i), i), a;
let r = class extends m(v) {
  constructor() {
    super(), x(this, a), this.settings = void 0, this.consumeContext(f, (t) => {
      C(this, a, t), this.observe(t.settings, (e) => {
        this.settings = e;
      }), w(this, a).getSettings();
    });
  }
  render() {
    if (this.settings !== void 0)
      return s`
                <uui-box headline="Settings">
                    <umb-property-layout label="Use Umbraco content index" description="If true, Content Audit will use content from the index instead of the crawler" style="padding-top: 0;">
                        <div slot="editor">${this.settings.useUmbracoContentIndex ? s`<uui-icon name="icon-check"></uui-icon>` : s`<uui-icon name="icon-wrong"></uui-icon>`}</div>
                    </umb-property-layout>

                    <umb-property-layout label="Respect robots.txt" description="If any content is set to 'disallow', it will be ignored by the crawler">
                        <div slot="editor">${this.settings.respectRobotsTxt ? s`<uui-icon name="icon-check"></uui-icon>` : s`<uui-icon name="icon-wrong"></uui-icon>`}</div>
                    </umb-property-layout>

                    <umb-property-layout label="Use sitemap.xml" description="If true, Content Audit will use pages listed in 'sitemap.xml' instead of the crawler">
                        <div slot="editor">${this.settings.useSitemapXml ? s`<uui-icon name="icon-check"></uui-icon>` : s`<uui-icon name="icon-wrong"></uui-icon>`}</div>
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
  h`
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
c([
  g()
], r.prototype, "settings", 2);
r = c([
  y("content-audit-settings-view")
], r);
const A = r;
export {
  r as ContentAuditSettingsViewElement,
  A as default
};
//# sourceMappingURL=settings.element-g5Bnx9kT.js.map
