import { UmbLitElement as mt } from "@umbraco-cms/backoffice/lit-element";
import { t as vt } from "./index-u7WOYzpE.js";
import { r as nt } from "./state-DMHfRO1s.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as _t } from "./all-pages-workspace.context-jIiMw91l.js";
import { html as o, css as $t } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as ft } from "@umbraco-cms/backoffice/style";
var Dt = Object.defineProperty, gt = Object.getOwnPropertyDescriptor, yt = (t) => {
  throw TypeError(t);
}, f = (t, a, e, r) => {
  for (var i = r > 1 ? void 0 : r ? gt(a, e) : a, l = t.length - 1, s; l >= 0; l--)
    (s = t[l]) && (i = (r ? s(a, e, i) : s(i)) || i);
  return r && i && Dt(a, e, i), i;
}, D = (t, a, e) => a.has(t) || yt("Cannot " + e), dt = (t, a, e) => (D(t, a, "read from private field"), a.get(t)), pt = (t, a, e) => a.has(t) ? yt("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), xt = (t, a, e, r) => (D(t, a, "write to private field"), a.set(t, e), e), $ = (t, a, e) => (D(t, a, "access private method"), e), _, v, bt, ct, ht;
let d = class extends mt {
  constructor() {
    super(), pt(this, v), this._documentUnique = "", pt(this, _), this.consumeContext(_t, (t) => {
      xt(this, _, t), $(this, v, bt).call(this);
    });
  }
  render() {
    return this._data ? o`
			${$(this, v, ct).call(this)}
			${$(this, v, ht).call(this)}
		` : o`<uui-box>No data available</uui-box>`;
  }
};
_ = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakSet();
bt = function() {
  dt(this, _) && this.observe(dt(this, _).data, (t) => {
    this._data = t;
  }, "umbCollectionItemsObserver");
};
ct = function() {
  var t, a, e, r, i, l, s, p, n, y, b, c, h, m, g, x, C, S, w, k, A, T, P, N, H, E, L, O, I, R, G, Y, M, U, W, B, V, q, z, F, Q, K, X, Z, j, J, tt, at, et, ot, it, rt, lt, st, ut;
  return o`
		<div>
			${(t = this._data) != null && t.seoData ? o`
				<uui-box headline="SEO">
					<umb-property-layout label="Title">
						<div slot="editor">${(a = this._data) == null ? void 0 : a.seoData.title}</div>
					</umb-property-layout>
					<umb-property-layout label="Meta Description">
						<div slot="editor">${(e = this._data) == null ? void 0 : e.seoData.metaDescription}</div>
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
							<ul>${(n = (p = this._data) == null ? void 0 : p.seoData.h3s) == null ? void 0 : n.map((u) => o`<li>${u}</li>`)}<ul>
						</div>
					</umb-property-layout>
					<umb-property-layout label="No Index">
						<div slot="editor">${(y = this._data) != null && y.seoData.hasNoIndex ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="No Follow">
						<div slot="editor">${(b = this._data) != null && b.seoData.hasNoFollow ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Title">
						<div slot="editor">${(c = this._data) == null ? void 0 : c.seoData.openGraphTitle}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Description">
						<div slot="editor">${(h = this._data) == null ? void 0 : h.seoData.openGraphDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Image">
						<div slot="editor"><a href=${(m = this._data) == null ? void 0 : m.seoData.openGraphImage} target="_blank">${(g = this._data) == null ? void 0 : g.seoData.openGraphImage}</a></div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(x = this._data) != null && x.contentAnalysis ? o`
				<uui-box headline="Content Analysis">
					<umb-property-layout label="Word Count">
						<div slot="editor">${(C = this._data) == null ? void 0 : C.contentAnalysis.wordCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Paragraph Count">
						<div slot="editor">${(S = this._data) == null ? void 0 : S.contentAnalysis.paragraphCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Images">
						<div slot="editor">${(w = this._data) == null ? void 0 : w.contentAnalysis.images}</div>
					</umb-property-layout>
					<umb-property-layout label="Resources">
						<div slot="editor">${(k = this._data) == null ? void 0 : k.contentAnalysis.resources}</div>
					</umb-property-layout>
					<umb-property-layout label="Links">
						<div slot="editor">${(A = this._data) == null ? void 0 : A.contentAnalysis.links}</div>
					</umb-property-layout>
					<umb-property-layout label="External Links">
						<div slot="editor">${(T = this._data) == null ? void 0 : T.contentAnalysis.externalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Internal Links">
						<div slot="editor">${(P = this._data) == null ? void 0 : P.contentAnalysis.internalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Readability Score" description="Flesch Reading Ease Score. Scores around 100 mean the document is extremely easy to read, while scores around 0 mean that it is highly complex and difficult to understand.">
						<div slot="editor">${Math.round((N = this._data) == null ? void 0 : N.contentAnalysis.readabilityScore)}</div>
					</umb-property-layout>
					<umb-property-layout label="Keyword Density">
						<div slot="editor">
						<uui-table>
							<uui-table-head>
								<uui-table-head-cell>Keyword</uui-table-head-cell>
								<uui-table-head-cell>Density</uui-table-head-cell>
							</uui-table-head>
							${Object.entries((H = this._data) == null ? void 0 : H.contentAnalysis.keywordDensity).map((u) => o`
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

			${(E = this._data) != null && E.performanceData ? o`
				<uui-box headline="Performance">
					<umb-property-layout label="Page Load Time">
						<div slot="editor">${(L = this._data) == null ? void 0 : L.performanceData.pageLoadTime}ms</div>
					</umb-property-layout>
					<umb-property-layout label="First Contentful Paint">
						<div slot="editor">${(I = (O = this._data) == null ? void 0 : O.performanceData.firstContentfulPaint) == null ? void 0 : I.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Largest Contentful Paint">
						<div slot="editor">${(G = (R = this._data) == null ? void 0 : R.performanceData.largestContentfulPaint) == null ? void 0 : G.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Time to Interactive">
						<div slot="editor">${(M = (Y = this._data) == null ? void 0 : Y.performanceData.timeToInteractive) == null ? void 0 : M.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Total Requests">
						<div slot="editor">${(U = this._data) == null ? void 0 : U.performanceData.totalRequests}</div>
					</umb-property-layout>
					<umb-property-layout label="Total Bytes">
						<div slot="editor">${(W = this._data) == null ? void 0 : W.performanceData.totalBytes}b</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(B = this._data) != null && B.accessibilityData ? o`
				<uui-box headline="Accessibility">
					<umb-property-layout label="ARIA Labels">
						<div slot="editor">${(V = this._data) == null ? void 0 : V.accessibilityData.ariaLabelCount}</div>
					</umb-property-layout>
					<umb-property-layout label="ARIA Described By">
						<div slot="editor">${(q = this._data) == null ? void 0 : q.accessibilityData.ariaDescribedByCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Skip to Content">
						<div slot="editor">${(z = this._data) != null && z.accessibilityData.hasSkipToContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Proper Heading Structure">
						<div slot="editor">${(F = this._data) != null && F.accessibilityData.hasProperHeadingStructure ? "Yes" : "No"}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(Q = this._data) != null && Q.technicalSeoData ? o`
				<uui-box headline="Technical SEO">
					<umb-property-layout label="Content Type">
						<div slot="editor">${(K = this._data) == null ? void 0 : K.technicalSeoData.contentType}</div>
					</umb-property-layout>
					<umb-property-layout label="Charset">
						<div slot="editor">${(X = this._data) == null ? void 0 : X.technicalSeoData.charset}</div>
					</umb-property-layout>
					<umb-property-layout label="Has GZip Compression">
						<div slot="editor">${(Z = this._data) != null && Z.technicalSeoData.hasGzipCompression ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Browser Caching">
						<div slot="editor">${(j = this._data) != null && j.technicalSeoData.hasBrowserCaching ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has HTTPS">
						<div slot="editor">${(J = this._data) != null && J.technicalSeoData.hasHttps ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Valid HTML">
						<div slot="editor">${(tt = this._data) != null && tt.technicalSeoData.hasValidHtml ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Schema Markup">
						<div slot="editor">${(at = this._data) != null && at.technicalSeoData.hasSchemaMarkup ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Schema Type">
						<div slot="editor">${(et = this._data) == null ? void 0 : et.technicalSeoData.schemaType}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(ot = this._data) != null && ot.contentQualityData ? o`
				<uui-box headline="Content Quality">
					<umb-property-layout label="Has Thin Content">
						<div slot="editor">${(it = this._data) != null && it.contentQualityData.hasThinContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Content Score">
						<div slot="editor">${(rt = this._data) == null ? void 0 : rt.contentQualityData.contentScore}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(lt = this._data) != null && lt.emissionsData ? o`
				<uui-box headline="Emissions">
					<umb-property-layout label="Emissions per Page View">
						<div slot="editor">${(st = this._data) == null ? void 0 : st.emissionsData.emissionsPerPageView}g CO<sub>2</sub></div>
					</umb-property-layout>
					<umb-property-layout label="Carbon Rating">
						<div slot="editor">
							<content-audit-carbon-intensity-label .value=${(ut = this._data) == null ? void 0 : ut.emissionsData.carbonRating}>
							</content-audit-carbon-intensity-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}
			</div>
		`;
};
ht = function() {
  var a, e, r, i, l, s, p, n, y, b, c, h, m;
  let t = "score--danger";
  return (a = this._data) != null && a.healthScore && (((e = this._data) == null ? void 0 : e.healthScore.healthScore) >= 90 ? t = "score--success" : ((r = this._data) == null ? void 0 : r.healthScore.healthScore) >= 50 && (t = "score--warning")), o`
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
						<p class="score__text">${(n = (p = this._data) == null ? void 0 : p.healthScore) == null ? void 0 : n.healthScore.toFixed(0)} / 100</p>
					</div>
				</uui-box>
			` : ""}
			${(y = this._data) != null && y.pageData ? o`
				<uui-box headline="Page">
					<umb-property-layout label="URL" orientation="vertical">
						<div slot="editor"><a href=${(b = this._data) == null ? void 0 : b.pageData.url} target="_blank">${(c = this._data) == null ? void 0 : c.pageData.url}</a></div>
					</umb-property-layout>
					<umb-property-layout label="Unique" orientation="vertical">
						<div slot="editor">${(h = this._data) == null ? void 0 : h.pageData.unique}</div>
					</umb-property-layout>
					<umb-property-layout label="Status Code" orientation="vertical">
						<div slot="editor">
							<content-audit-status-code-label .statusCode=${(m = this._data) == null ? void 0 : m.pageData.statusCode}></content-audit-status-code-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}
			</div>
		`;
};
d.styles = [
  ft,
  $t`
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
  nt()
], d.prototype, "_data", 2);
f([
  nt()
], d.prototype, "_documentUnique", 2);
d = f([
  vt("content-audit-all-pages-details-workspace-view")
], d);
const Pt = d;
export {
  d as ContentAuditAllPagesDetailsWorkspaceViewElement,
  Pt as default
};
//# sourceMappingURL=all-pages-details-workspace-view.element-DR6ucOw6.js.map
