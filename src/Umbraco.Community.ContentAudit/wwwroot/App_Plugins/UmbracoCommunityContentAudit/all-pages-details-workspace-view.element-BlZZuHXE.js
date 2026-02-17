import { UmbLitElement as f } from "@umbraco-cms/backoffice/lit-element";
import { t as D } from "./index-Bkks3_By.js";
import { r as m } from "./state-B3HwBx2Z.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as x } from "./all-pages-workspace.context-BrtBjNPt.js";
import { html as a, css as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as S } from "@umbraco-cms/backoffice/style";
var w = Object.defineProperty, k = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, y = (t, e, o, l) => {
  for (var i = l > 1 ? void 0 : l ? k(e, o) : e, d = t.length - 1, p; d >= 0; d--)
    (p = t[d]) && (i = (l ? p(e, o, i) : p(i)) || i);
  return l && i && w(e, o, i), i;
}, b = (t, e, o) => e.has(t) || v("Cannot " + o), c = (t, e, o) => (b(t, e, "read from private field"), e.get(t)), h = (t, e, o) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, o), T = (t, e, o, l) => (b(t, e, "write to private field"), e.set(t, o), o), n = (t, e, o) => (b(t, e, "access private method"), o), u, s, _, $, g;
let r = class extends f {
  constructor() {
    super(), h(this, s), this._documentUnique = "", h(this, u), this.consumeContext(x, (t) => {
      T(this, u, t), n(this, s, _).call(this);
    });
  }
  render() {
    return this._data ? a`
			${n(this, s, $).call(this)}
			${n(this, s, g).call(this)}
		` : a`<uui-box>No data available</uui-box>`;
  }
};
u = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
_ = function() {
  c(this, u) && this.observe(c(this, u).data, (t) => {
    this._data = t;
  }, "umbCollectionItemsObserver");
};
$ = function() {
  return a`
		<div>
			${this._data?.seoData ? a`
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
							<ul>${this._data?.seoData.h2s?.map((t) => a`<li>${t}</li>`)}<ul>
						</div>
					</umb-property-layout>
					<umb-property-layout label="H3s">
						<div slot="editor">
							<ul>${this._data?.seoData.h3s?.map((t) => a`<li>${t}</li>`)}<ul>
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

			${this._data?.contentAnalysis ? a`
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
							${Object.entries(this._data?.contentAnalysis.keywordDensity).map((t) => a`
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

			${this._data?.performanceData ? a`
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

			${this._data?.accessibilityData ? a`
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

			${this._data?.technicalSeoData ? a`
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
					<umb-property-layout label="Has Valid HTML">
						<div slot="editor">${this._data?.technicalSeoData.hasValidHtml ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="HTML Validation Errors">
						<div slot="editor">
							<uui-table>
								<uui-table-head>
									<uui-table-head-cell>Message</uui-table-head-cell>
									<uui-table-head-cell>Type</uui-table-head-cell>
								</uui-table-head>
								${Object.entries(this._data?.technicalSeoData.htmlValidationErrors).map((t) => {
    let e = t[1];
    return a`
										<uui-table-row>
											<uui-table-cell>${e?.message}</uui-table-cell>
											<uui-table-cell>${e?.type}</uui-table-cell>
										</uui-table-row>	
									`;
  })}
								</uui-table>
						</div>
					</umb-property-layout>
					<umb-property-layout label="Has Schema Markup">
						<div slot="editor">${this._data?.technicalSeoData.hasSchemaMarkup ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Schema Type">
						<div slot="editor">${this._data?.technicalSeoData.schemaType}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${this._data?.contentQualityData ? a`
				<uui-box headline="Content Quality">
					<umb-property-layout label="Has Thin Content">
						<div slot="editor">${this._data?.contentQualityData.hasThinContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Content Score">
						<div slot="editor">${this._data?.contentQualityData.contentScore}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${this._data?.emissionsData ? a`
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
g = function() {
  let t = "score--danger";
  return this._data?.healthScore && (this._data?.healthScore.healthScore >= 90 ? t = "score--success" : this._data?.healthScore.healthScore >= 50 && (t = "score--warning")), a`
			<div>
			${this._data?.healthScore ? a`
				<uui-box headline="Page health">
					<div class="score">
						<svg viewBox="0 0 36 36" class="score__inner ${t}">
							<path class="score__bg"
								d="M18 2.0845
								a 15.9155 15.9155 0 0 1 0 31.831
								a 15.9155 15.9155 0 0 1 0 -31.831"
							/>
							<path class="score__fill"
								stroke-dasharray="${this._data?.healthScore?.healthScore}, 100"
								d="M18 2.0845
								a 15.9155 15.9155 0 0 1 0 31.831
								a 15.9155 15.9155 0 0 1 0 -31.831"
							/>
						</svg>
						<p class="score__text">${this._data?.healthScore?.healthScore.toFixed(0)} / 100</p>
					</div>
				</uui-box>
			` : ""}
			${this._data?.pageData ? a`
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
  S,
  C`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}

			uui-box {
				margin-bottom: var(--uui-size-layout-1);
			}

			.score {
    text-align: center;
    position: relative;
}

.score__inner {
    width: 200px;
    height: 200px;
}

.score__bg {
    fill: none;
    stroke: #eee;
    stroke-width: 1.75;
}

.score__fill {
    fill: none;
    stroke: none;
    stroke-width: 1.75;
    stroke-linecap: round;
    animation: progress 1000ms ease-out forwards;
    stroke: #000;
}

.score--danger .score__fill {
    stroke: var(--uui-color-danger, #d42054);
}

.score--warning .score__fill {
    stroke: var(--uui-color-warning, #fbd142);
}

.score--success .score__fill {
    stroke: var(--uui-color-positive);
}

.score__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1;
    font-size: 24px;
    font-weight: 700;
}

@keyframes progress {
    0% {
        stroke-dasharray: 0 100;
    }
}
		`
];
y([
  m()
], r.prototype, "_data", 2);
y([
  m()
], r.prototype, "_documentUnique", 2);
r = y([
  D("content-audit-all-pages-details-workspace-view")
], r);
const O = r;
export {
  r as ContentAuditAllPagesDetailsWorkspaceViewElement,
  O as default
};
//# sourceMappingURL=all-pages-details-workspace-view.element-BlZZuHXE.js.map
