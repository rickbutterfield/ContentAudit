import { nothing as v, html as s, css as b, state as w, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as f } from "@umbraco-cms/backoffice/lit-element";
import { C } from "./index-DCtP17IU.js";
import "@umbraco-cms/backoffice/repository";
import "@umbraco-cms/backoffice/resources";
var _ = Object.defineProperty, U = Object.getOwnPropertyDescriptor, h = (t) => {
  throw TypeError(t);
}, g = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? U(e, i) : e, u = t.length - 1, d; u >= 0; u--)
    (d = t[u]) && (r = (o ? d(e, i, r) : d(r)) || r);
  return o && r && _(e, i, r), r;
}, m = (t, e, i) => e.has(t) || h("Cannot " + i), $ = (t, e, i) => (m(t, e, "read from private field"), e.get(t)), c = (t, e, i) => e.has(t) ? h("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), D = (t, e, i, o) => (m(t, e, "write to private field"), e.set(t, i), i), y = (t, e, i) => (m(t, e, "access private method"), i), l, n, p;
let a = class extends f {
  constructor() {
    super(), c(this, n), c(this, l), this.settings = void 0, this.consumeContext(C, (t) => {
      D(this, l, t), this.observe(t?.settings, (e) => {
        this.settings = e;
      }), $(this, l)?.getSettings();
    });
  }
  render() {
    return this.settings === void 0 ? v : s`
            <uui-box headline="General">
                <div slot="header">Discovered from appsettings.json</div>

                <umb-property-layout label="Base URL" description="The base URL for the site under audit. Useful for headless setups." style="padding-top: 0;">
                    <div slot="editor">${this.settings.baseUrl ?? s`<em>Auto-detected</em>`}</div>
                </umb-property-layout>

                <umb-property-layout label="Use Umbraco content index" description="If true, ContentAudit will use content from the index instead of the crawler">
                    <div slot="editor">
                        <uui-toggle .checked=${this.settings.useUmbracoContentIndex} readonly></uui-toggle>
                    </div>
                </umb-property-layout>

                <umb-property-layout label="Use incremental crawl" description="Only re-crawl pages that have changed since the last audit">
                    <div slot="editor">
                        <uui-toggle .checked=${this.settings.useIncrementalCrawl} readonly></uui-toggle>
                    </div>
                </umb-property-layout>
            </uui-box>

            <uui-box headline="Discovery">
                <umb-property-layout label="Use sitemap.xml" description="If true, ContentAudit will use pages listed in 'sitemap.xml' for discovery" style="padding-top: 0;">
                    <div slot="editor">
                        <uui-toggle .checked=${this.settings.useSitemapXml} readonly></uui-toggle>
                    </div>
                </umb-property-layout>

                <umb-property-layout label="Sitemap URL" description="Custom path to sitemap. Defaults to '/sitemap.xml'">
                    <div slot="editor">${this.settings.sitemapUrl ?? s`<em>Default</em>`}</div>
                </umb-property-layout>

                <umb-property-layout label="Respect robots.txt" description="If any content is set to 'disallow', it will be ignored by the crawler">
                    <div slot="editor">
                        <uui-toggle .checked=${this.settings.respectRobotsTxt} readonly></uui-toggle>
                    </div>
                </umb-property-layout>
            </uui-box>

            <uui-box headline="Crawl Limits">
                <umb-property-layout label="Max concurrent crawls" description="Number of pages crawled in parallel (1–20)" style="padding-top: 0;">
                    <div slot="editor">${this.settings.maxConcurrentCrawls}</div>
                </umb-property-layout>

                <umb-property-layout label="Max crawl duration" description="Maximum time in minutes for a crawl operation. 0 means no limit.">
                    <div slot="editor">${this.settings.maxCrawlDurationMinutes === 0 ? s`<em>No limit</em>` : `${this.settings.maxCrawlDurationMinutes} minutes`}</div>
                </umb-property-layout>

                <umb-property-layout label="Max crawl depth" description="Maximum depth from the starting URL. 0 means unlimited.">
                    <div slot="editor">${this.settings.maxCrawlDepth === 0 ? s`<em>Unlimited</em>` : this.settings.maxCrawlDepth}</div>
                </umb-property-layout>

                <umb-property-layout label="Crawl delay" description="Delay in milliseconds between requests. Can be overridden by robots.txt Crawl-delay.">
                    <div slot="editor">${this.settings.crawlDelayMs === 0 ? s`<em>No delay</em>` : `${this.settings.crawlDelayMs} ms`}</div>
                </umb-property-layout>

                <umb-property-layout label="External request delay" description="Minimum delay in milliseconds between consecutive requests to the same external domain.">
                    <div slot="editor">${this.settings.externalRequestDelayMs === 0 ? s`<em>No delay</em>` : `${this.settings.externalRequestDelayMs} ms`}</div>
                </umb-property-layout>
            </uui-box>

            <uui-box headline="URL Patterns">
                <umb-property-layout label="Exclude patterns" description="URL patterns excluded from crawling. Supports wildcards (* and **)." style="padding-top: 0;">
                    <div slot="editor">${y(this, n, p).call(this, this.settings.excludePatterns)}</div>
                </umb-property-layout>

                <umb-property-layout label="Include patterns" description="If specified, only matching URLs will be crawled. Supports wildcards (* and **).">
                    <div slot="editor">${y(this, n, p).call(this, this.settings.includePatterns)}</div>
                </umb-property-layout>
            </uui-box>
        `;
  }
};
l = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
p = function(t) {
  return t.length ? s`${t.map((e) => s`<uui-tag look="secondary" style="margin: 0 var(--uui-size-space-1) var(--uui-size-space-1) 0;">${e}</uui-tag>`)}` : s`<em>None</em>`;
};
a.styles = [
  b`
            :host {
                display: block;
                padding: var(--uui-size-space-5);
            }

            uui-box {
                margin-bottom: var(--uui-size-space-5);
            }
        `
];
g([
  w()
], a.prototype, "settings", 2);
a = g([
  x("content-audit-settings-view")
], a);
const N = a;
export {
  a as ContentAuditSettingsViewElement,
  N as default
};
//# sourceMappingURL=settings.element-DxdQD27W.js.map
