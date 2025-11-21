import { UmbLitElement as _t } from "@umbraco-cms/backoffice/lit-element";
import { t as $t } from "./index.js";
import { r as bt } from "./state.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as Dt } from "./all-pages-workspace.context.js";
import { html as o, css as ft } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as gt } from "@umbraco-cms/backoffice/style";
var xt = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, ct = (t) => {
  throw TypeError(t);
}, f = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? Ct(e, a) : e, l = t.length - 1, s; l >= 0; l--)
    (s = t[l]) && (i = (r ? s(e, a, i) : s(i)) || i);
  return r && i && xt(e, a, i), i;
}, g = (t, e, a) => e.has(t) || ct("Cannot " + a), nt = (t, e, a) => (g(t, e, "read from private field"), e.get(t)), yt = (t, e, a) => e.has(t) ? ct("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), St = (t, e, a, r) => (g(t, e, "write to private field"), e.set(t, a), a), D = (t, e, a) => (g(t, e, "access private method"), a), $, _, ht, mt, vt;
let p = class extends _t {
  constructor() {
    super(), yt(this, _), this._documentUnique = "", yt(this, $), this.consumeContext(Dt, (t) => {
      St(this, $, t), D(this, _, ht).call(this);
    });
  }
  render() {
    return this._data ? o`
			${D(this, _, mt).call(this)}
			${D(this, _, vt).call(this)}
		` : o`<uui-box>No data available</uui-box>`;
  }
};
$ = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakSet();
ht = function() {
  nt(this, $) && this.observe(nt(this, $).data, (t) => {
    this._data = t;
  }, "umbCollectionItemsObserver");
};
mt = function() {
  var t, e, a, r, i, l, s, n, y, b, c, h, m, v, x, C, S, w, k, T, A, P, E, H, N, L, O, I, R, G, M, Y, U, V, W, B, q, z, F, Q, K, j, X, Z, J, tt, et, at, ot, it, rt, lt, st, ut, dt, pt;
  return o`
		<div>
			${(t = this._data) != null && t.seoData ? o`
				<uui-box headline="SEO">
					<umb-property-layout label="Title">
						<div slot="editor">${(e = this._data) == null ? void 0 : e.seoData.title}</div>
					</umb-property-layout>
					<umb-property-layout label="Meta Description">
						<div slot="editor">${(a = this._data) == null ? void 0 : a.seoData.metaDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Canonical URL">
						<div slot="editor">${(r = this._data) == null ? void 0 : r.seoData.canonicalUrl}</div>
					</umb-property-layout>
					<umb-property-layout label="H1">
						<div slot="editor">${(i = this._data) == null ? void 0 : i.seoData.h1}</div>
					</umb-property-layout>
					<umb-property-layout label="H2s">
						<div slot="editor">
							<ul>${(s = (l = this._data) == null ? void 0 : l.seoData.h2s) == null ? void 0 : s.map((u) => o`<li>${u}</li>`)}<ul>
						</div>
					</umb-property-layout>
					<umb-property-layout label="H3s">
						<div slot="editor">
							<ul>${(y = (n = this._data) == null ? void 0 : n.seoData.h3s) == null ? void 0 : y.map((u) => o`<li>${u}</li>`)}<ul>
						</div>
					</umb-property-layout>
					<umb-property-layout label="No Index">
						<div slot="editor">${(b = this._data) != null && b.seoData.hasNoIndex ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="No Follow">
						<div slot="editor">${(c = this._data) != null && c.seoData.hasNoFollow ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Title">
						<div slot="editor">${(h = this._data) == null ? void 0 : h.seoData.openGraphTitle}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Description">
						<div slot="editor">${(m = this._data) == null ? void 0 : m.seoData.openGraphDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Image">
						<div slot="editor"><a href=${(v = this._data) == null ? void 0 : v.seoData.openGraphImage} target="_blank">${(x = this._data) == null ? void 0 : x.seoData.openGraphImage}</a></div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(C = this._data) != null && C.contentAnalysis ? o`
				<uui-box headline="Content Analysis">
					<umb-property-layout label="Word Count">
						<div slot="editor">${(S = this._data) == null ? void 0 : S.contentAnalysis.wordCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Paragraph Count">
						<div slot="editor">${(w = this._data) == null ? void 0 : w.contentAnalysis.paragraphCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Images">
						<div slot="editor">${(k = this._data) == null ? void 0 : k.contentAnalysis.images}</div>
					</umb-property-layout>
					<umb-property-layout label="Resources">
						<div slot="editor">${(T = this._data) == null ? void 0 : T.contentAnalysis.resources}</div>
					</umb-property-layout>
					<umb-property-layout label="Links">
						<div slot="editor">${(A = this._data) == null ? void 0 : A.contentAnalysis.links}</div>
					</umb-property-layout>
					<umb-property-layout label="External Links">
						<div slot="editor">${(P = this._data) == null ? void 0 : P.contentAnalysis.externalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Internal Links">
						<div slot="editor">${(E = this._data) == null ? void 0 : E.contentAnalysis.internalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Readability Score" description="Flesch Reading Ease Score. Scores around 100 mean the document is extremely easy to read, while scores around 0 mean that it is highly complex and difficult to understand.">
						<div slot="editor">${Math.round((H = this._data) == null ? void 0 : H.contentAnalysis.readabilityScore)}</div>
					</umb-property-layout>
					<umb-property-layout label="Keyword Density">
						<div slot="editor">
						<uui-table>
							<uui-table-head>
								<uui-table-head-cell>Keyword</uui-table-head-cell>
								<uui-table-head-cell>Density</uui-table-head-cell>
							</uui-table-head>
							${Object.entries((N = this._data) == null ? void 0 : N.contentAnalysis.keywordDensity).map((u) => o`
									<uui-table-row>
										<uui-table-cell>${u[0]}</uui-table-cell>
										<uui-table-cell>${u[1]}%</uui-table-cell>
									</uui-table-row>	
								`)}
							</uui-table>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(L = this._data) != null && L.performanceData ? o`
				<uui-box headline="Performance">
					<umb-property-layout label="Page Load Time">
						<div slot="editor">${(O = this._data) == null ? void 0 : O.performanceData.pageLoadTime}ms</div>
					</umb-property-layout>
					<umb-property-layout label="First Contentful Paint">
						<div slot="editor">${(R = (I = this._data) == null ? void 0 : I.performanceData.firstContentfulPaint) == null ? void 0 : R.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Largest Contentful Paint">
						<div slot="editor">${(M = (G = this._data) == null ? void 0 : G.performanceData.largestContentfulPaint) == null ? void 0 : M.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Time to Interactive">
						<div slot="editor">${(U = (Y = this._data) == null ? void 0 : Y.performanceData.timeToInteractive) == null ? void 0 : U.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Total Requests">
						<div slot="editor">${(V = this._data) == null ? void 0 : V.performanceData.totalRequests}</div>
					</umb-property-layout>
					<umb-property-layout label="Total Bytes">
						<div slot="editor">${(W = this._data) == null ? void 0 : W.performanceData.totalBytes}b</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(B = this._data) != null && B.accessibilityData ? o`
				<uui-box headline="Accessibility">
					<umb-property-layout label="ARIA Labels">
						<div slot="editor">${(q = this._data) == null ? void 0 : q.accessibilityData.ariaLabelCount}</div>
					</umb-property-layout>
					<umb-property-layout label="ARIA Described By">
						<div slot="editor">${(z = this._data) == null ? void 0 : z.accessibilityData.ariaDescribedByCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Skip to Content">
						<div slot="editor">${(F = this._data) != null && F.accessibilityData.hasSkipToContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Proper Heading Structure">
						<div slot="editor">${(Q = this._data) != null && Q.accessibilityData.hasProperHeadingStructure ? "Yes" : "No"}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(K = this._data) != null && K.technicalSeoData ? o`
				<uui-box headline="Technical SEO">
					<umb-property-layout label="Content Type">
						<div slot="editor">${(j = this._data) == null ? void 0 : j.technicalSeoData.contentType}</div>
					</umb-property-layout>
					<umb-property-layout label="Charset">
						<div slot="editor">${(X = this._data) == null ? void 0 : X.technicalSeoData.charset}</div>
					</umb-property-layout>
					<umb-property-layout label="Has GZip Compression">
						<div slot="editor">${(Z = this._data) != null && Z.technicalSeoData.hasGzipCompression ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Browser Caching">
						<div slot="editor">${(J = this._data) != null && J.technicalSeoData.hasBrowserCaching ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has HTTPS">
						<div slot="editor">${(tt = this._data) != null && tt.technicalSeoData.hasHttps ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Valid HTML">
						<div slot="editor">${(et = this._data) != null && et.technicalSeoData.hasValidHtml ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="HTML Validation Errors">
						<div slot="editor">
							<uui-table>
								<uui-table-head>
									<uui-table-head-cell>Message</uui-table-head-cell>
									<uui-table-head-cell>Type</uui-table-head-cell>
								</uui-table-head>
								${Object.entries((at = this._data) == null ? void 0 : at.technicalSeoData.htmlValidationErrors).map((u) => {
    let d = u[1];
    return o`
										<uui-table-row>
											<uui-table-cell>${d == null ? void 0 : d.message}</uui-table-cell>
											<uui-table-cell>${d == null ? void 0 : d.type}</uui-table-cell>
										</uui-table-row>	
									`;
  })}
								</uui-table>
						</div>
					</umb-property-layout>
					<umb-property-layout label="Has Schema Markup">
						<div slot="editor">${(ot = this._data) != null && ot.technicalSeoData.hasSchemaMarkup ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Schema Type">
						<div slot="editor">${(it = this._data) == null ? void 0 : it.technicalSeoData.schemaType}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(rt = this._data) != null && rt.contentQualityData ? o`
				<uui-box headline="Content Quality">
					<umb-property-layout label="Has Thin Content">
						<div slot="editor">${(lt = this._data) != null && lt.contentQualityData.hasThinContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Content Score">
						<div slot="editor">${(st = this._data) == null ? void 0 : st.contentQualityData.contentScore}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(ut = this._data) != null && ut.emissionsData ? o`
				<uui-box headline="Emissions">
					<umb-property-layout label="Emissions per Page View">
						<div slot="editor">${(dt = this._data) == null ? void 0 : dt.emissionsData.emissionsPerPageView}g CO<sub>2</sub></div>
					</umb-property-layout>
					<umb-property-layout label="Carbon Rating">
						<div slot="editor">
							<content-audit-carbon-intensity-label .value=${(pt = this._data) == null ? void 0 : pt.emissionsData.carbonRating}>
							</content-audit-carbon-intensity-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}
			</div>
		`;
};
vt = function() {
  var e, a, r, i, l, s, n, y, b, c, h, m, v;
  let t = "score--danger";
  return (e = this._data) != null && e.healthScore && (((a = this._data) == null ? void 0 : a.healthScore.healthScore) >= 90 ? t = "score--success" : ((r = this._data) == null ? void 0 : r.healthScore.healthScore) >= 50 && (t = "score--warning")), o`
			<div>
			${(i = this._data) != null && i.healthScore ? o`
				<uui-box headline="Page health">
					<div class="score">
						<svg viewBox="0 0 36 36" class="score__inner ${t}">
							<path class="score__bg"
								d="M18 2.0845
								a 15.9155 15.9155 0 0 1 0 31.831
								a 15.9155 15.9155 0 0 1 0 -31.831"
							/>
							<path class="score__fill"
								stroke-dasharray="${(s = (l = this._data) == null ? void 0 : l.healthScore) == null ? void 0 : s.healthScore}, 100"
								d="M18 2.0845
								a 15.9155 15.9155 0 0 1 0 31.831
								a 15.9155 15.9155 0 0 1 0 -31.831"
							/>
						</svg>
						<p class="score__text">${(y = (n = this._data) == null ? void 0 : n.healthScore) == null ? void 0 : y.healthScore.toFixed(0)} / 100</p>
					</div>
				</uui-box>
			` : ""}
			${(b = this._data) != null && b.pageData ? o`
				<uui-box headline="Page">
					<umb-property-layout label="URL" orientation="vertical">
						<div slot="editor"><a href=${(c = this._data) == null ? void 0 : c.pageData.url} target="_blank">${(h = this._data) == null ? void 0 : h.pageData.url}</a></div>
					</umb-property-layout>
					<umb-property-layout label="Unique" orientation="vertical">
						<div slot="editor">${(m = this._data) == null ? void 0 : m.pageData.unique}</div>
					</umb-property-layout>
					<umb-property-layout label="Status Code" orientation="vertical">
						<div slot="editor">
							<content-audit-status-code-label .statusCode=${(v = this._data) == null ? void 0 : v.pageData.statusCode}></content-audit-status-code-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}
			</div>
		`;
};
p.styles = [
  gt,
  ft`
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
f([
  bt()
], p.prototype, "_data", 2);
f([
  bt()
], p.prototype, "_documentUnique", 2);
p = f([
  $t("content-audit-all-pages-details-workspace-view")
], p);
const Ht = p;
export {
  p as ContentAuditAllPagesDetailsWorkspaceViewElement,
  Ht as default
};
//# sourceMappingURL=all-pages-details-workspace-view.element.js.map
