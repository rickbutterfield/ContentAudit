import { UmbLitElement as f } from "@umbraco-cms/backoffice/lit-element";
import { t as g } from "./index-B8flLQWi.js";
import { r as c } from "./state-BBJy3iDP.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as C } from "./all-pages-workspace.context-BrAZe60s.js";
import { html as e, css as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as x } from "@umbraco-cms/backoffice/style";
import "./health-score.element-BNJ0JPcB.js";
var A = Object.defineProperty, T = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, y = (t, a, o, l) => {
  for (var i = l > 1 ? void 0 : l ? T(a, o) : a, d = t.length - 1, p; d >= 0; d--)
    (p = t[d]) && (i = (l ? p(a, o, i) : p(i)) || i);
  return l && i && A(a, o, i), i;
}, b = (t, a, o) => a.has(t) || v("Cannot " + o), h = (t, a, o) => (b(t, a, "read from private field"), a.get(t)), m = (t, a, o) => a.has(t) ? v("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, o), w = (t, a, o, l) => (b(t, a, "write to private field"), a.set(t, o), o), n = (t, a, o) => (b(t, a, "access private method"), o), u, s, _, $, D;
let r = class extends f {
  constructor() {
    super(), m(this, s), this._documentUnique = "", m(this, u), this.consumeContext(C, (t) => {
      w(this, u, t), n(this, s, _).call(this);
    });
  }
  render() {
    return this._data ? e`
			${n(this, s, $).call(this)}
			${n(this, s, D).call(this)}
		` : e`<uui-box>No data available</uui-box>`;
  }
};
u = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
_ = function() {
  h(this, u) && this.observe(h(this, u).data, (t) => {
    this._data = t;
  }, "umbCollectionItemsObserver");
};
$ = function() {
  return e`
		<div>
			${this._data?.seoData ? e`
				<uui-box headline="SEO">
					<umb-property-layout label="Title">
						<div slot="editor">${this._data?.seoData.title}</div>
					</umb-property-layout>
					<umb-property-layout label="Meta Description">
						<div slot="editor">${this._data?.seoData.metaDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Canonical URL">
						<div slot="editor">${this._data?.seoData.canonicalUrl}</div>
					</umb-property-layout>
					<umb-property-layout label="H1">
						<div slot="editor">${this._data?.seoData.h1}</div>
					</umb-property-layout>
					<umb-property-layout label="H2s">
						<div slot="editor">
							<ul>${this._data?.seoData.h2s?.map((t) => e`<li>${t}</li>`)}</ul>
						</div>
					</umb-property-layout>
					<umb-property-layout label="H3s">
						<div slot="editor">
							<ul>${this._data?.seoData.h3s?.map((t) => e`<li>${t}</li>`)}</ul>
						</div>
					</umb-property-layout>
					<umb-property-layout label="No Index">
						<div slot="editor">${this._data?.seoData.hasNoIndex ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="No Follow">
						<div slot="editor">${this._data?.seoData.hasNoFollow ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Title">
						<div slot="editor">${this._data?.seoData.openGraphTitle}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Description">
						<div slot="editor">${this._data?.seoData.openGraphDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Image">
						<div slot="editor"><a href=${this._data?.seoData.openGraphImage} target="_blank">${this._data?.seoData.openGraphImage}</a></div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${this._data?.contentAnalysis ? e`
				<uui-box headline="Content Analysis">
					<umb-property-layout label="Word Count">
						<div slot="editor">${this._data?.contentAnalysis.wordCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Paragraph Count">
						<div slot="editor">${this._data?.contentAnalysis.paragraphCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Images">
						<div slot="editor">${this._data?.contentAnalysis.images}</div>
					</umb-property-layout>
					<umb-property-layout label="Resources">
						<div slot="editor">${this._data?.contentAnalysis.resources}</div>
					</umb-property-layout>
					<umb-property-layout label="Links">
						<div slot="editor">${this._data?.contentAnalysis.links}</div>
					</umb-property-layout>
					<umb-property-layout label="External Links">
						<div slot="editor">${this._data?.contentAnalysis.externalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Internal Links">
						<div slot="editor">${this._data?.contentAnalysis.internalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Readability Score" description="Flesch Reading Ease Score. Scores around 100 mean the document is extremely easy to read, while scores around 0 mean that it is highly complex and difficult to understand.">
						<div slot="editor">${Math.round(this._data?.contentAnalysis.readabilityScore)}</div>
					</umb-property-layout>
					<umb-property-layout label="Keyword Density">
						<div slot="editor">
						<uui-table>
							<uui-table-head>
								<uui-table-head-cell>Keyword</uui-table-head-cell>
								<uui-table-head-cell>Density</uui-table-head-cell>
							</uui-table-head>
							${Object.entries(this._data?.contentAnalysis.keywordDensity ?? {}).map((t) => e`
									<uui-table-row>
										<uui-table-cell>${t[0]}</uui-table-cell>
										<uui-table-cell>${t[1]}%</uui-table-cell>
									</uui-table-row>	
								`)}
							</uui-table>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${this._data?.performanceData ? e`
				<uui-box headline="Performance">
					<umb-property-layout label="Page Load Time">
						<div slot="editor">${this._data?.performanceData.pageLoadTime}ms</div>
					</umb-property-layout>
					<umb-property-layout label="First Contentful Paint">
						<div slot="editor">${this._data?.performanceData.firstContentfulPaint?.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Largest Contentful Paint">
						<div slot="editor">${this._data?.performanceData.largestContentfulPaint?.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Time to Interactive">
						<div slot="editor">${this._data?.performanceData.timeToInteractive?.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Total Requests">
						<div slot="editor">${this._data?.performanceData.totalRequests}</div>
					</umb-property-layout>
					<umb-property-layout label="Total Bytes">
						<div slot="editor">${this._data?.performanceData.totalBytes}b</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${this._data?.accessibilityData ? e`
				<uui-box headline="Accessibility">
					<umb-property-layout label="ARIA Labels">
						<div slot="editor">${this._data?.accessibilityData.ariaLabelCount}</div>
					</umb-property-layout>
					<umb-property-layout label="ARIA Described By">
						<div slot="editor">${this._data?.accessibilityData.ariaDescribedByCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Skip to Content">
						<div slot="editor">${this._data?.accessibilityData.hasSkipToContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Proper Heading Structure">
						<div slot="editor">${this._data?.accessibilityData.hasProperHeadingStructure ? "Yes" : "No"}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${this._data?.technicalSeoData ? e`
				<uui-box headline="Technical SEO">
					<umb-property-layout label="Content Type">
						<div slot="editor">${this._data?.technicalSeoData.contentType}</div>
					</umb-property-layout>
					<umb-property-layout label="Charset">
						<div slot="editor">${this._data?.technicalSeoData.charset}</div>
					</umb-property-layout>
					<umb-property-layout label="Has GZip Compression">
						<div slot="editor">${this._data?.technicalSeoData.hasGzipCompression ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Browser Caching">
						<div slot="editor">${this._data?.technicalSeoData.hasBrowserCaching ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has HTTPS">
						<div slot="editor">${this._data?.technicalSeoData.hasHttps ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Schema Markup">
						<div slot="editor">${this._data?.technicalSeoData.hasSchemaMarkup ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Schema Type">
						<div slot="editor">${this._data?.technicalSeoData.schemaType}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${this._data?.contentQualityData ? e`
				<uui-box headline="Content Quality">
					<umb-property-layout label="Has Thin Content">
						<div slot="editor">${this._data?.contentQualityData.hasThinContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Content Score">
						<div slot="editor">${this._data?.contentQualityData.contentScore}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${this._data?.emissionsData ? e`
				<uui-box headline="Emissions">
					<umb-property-layout label="Emissions per Page View">
						<div slot="editor">${this._data?.emissionsData.emissionsPerPageView}g CO<sub>2</sub></div>
					</umb-property-layout>
					<umb-property-layout label="Carbon Rating">
						<div slot="editor">
							<content-audit-carbon-intensity-label .value=${this._data?.emissionsData.carbonRating}>
							</content-audit-carbon-intensity-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}
			</div>
		`;
};
D = function() {
  return e`
			<div>
			${this._data?.healthScore ? e`
				<content-audit-health-score
					.score=${this._data.healthScore.healthScore}
					headline="Page health"
				></content-audit-health-score>
			` : ""}
			${this._data?.pageData ? e`
				<uui-box headline="Page">
					<umb-property-layout label="URL" orientation="vertical">
						<div slot="editor"><a href=${this._data?.pageData.url} target="_blank">${this._data?.pageData.url}</a></div>
					</umb-property-layout>
					<umb-property-layout label="Unique" orientation="vertical">
						<div slot="editor">${this._data?.pageData.unique}</div>
					</umb-property-layout>
					<umb-property-layout label="Status Code" orientation="vertical">
						<div slot="editor">
							<content-audit-status-code-label .statusCode=${this._data?.pageData.statusCode}></content-audit-status-code-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}
			</div>
		`;
};
r.styles = [
  x,
  S`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}

			uui-box,
			content-audit-health-score {
				display: block;
				margin-bottom: var(--uui-size-layout-1);
			}

			umb-property-layout {
				padding: var(--uui-size-space-4) 0;

				&:first-of-type {
					padding-top: 0;
				}

				&:last-of-type {
					padding-bottom: 0;
				}
			}
		`
];
y([
  c()
], r.prototype, "_data", 2);
y([
  c()
], r.prototype, "_documentUnique", 2);
r = y([
  g("content-audit-all-pages-details-workspace-view")
], r);
const I = r;
export {
  r as ContentAuditAllPagesDetailsWorkspaceViewElement,
  I as default
};
//# sourceMappingURL=all-pages-details-workspace-view.element-Dbs1KRw_.js.map
