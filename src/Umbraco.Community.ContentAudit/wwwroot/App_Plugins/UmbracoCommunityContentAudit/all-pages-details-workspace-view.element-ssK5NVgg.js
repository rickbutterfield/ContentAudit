import { UmbLitElement as ct } from "@umbraco-cms/backoffice/lit-element";
import { t as vt } from "./index-Bn_0n6ex.js";
import { r as nt } from "./state-rjnk12_K.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as _t } from "./all-pages-workspace.context-CA6pF-AW.js";
import { html as o, css as $t } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as Dt } from "@umbraco-cms/backoffice/style";
var Ct = Object.defineProperty, ft = Object.getOwnPropertyDescriptor, yt = (t) => {
  throw TypeError(t);
}, b = (t, a, e, r) => {
  for (var i = r > 1 ? void 0 : r ? ft(a, e) : a, l = t.length - 1, s; l >= 0; l--)
    (s = t[l]) && (i = (r ? s(a, e, i) : s(i)) || i);
  return r && i && Ct(a, e, i), i;
}, m = (t, a, e) => a.has(t) || yt("Cannot " + e), dt = (t, a, e) => (m(t, a, "read from private field"), a.get(t)), pt = (t, a, e) => a.has(t) ? yt("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), gt = (t, a, e, r) => (m(t, a, "write to private field"), a.set(t, e), e), y = (t, a, e) => (m(t, a, "access private method"), e), n, p, bt, mt, ht;
let d = class extends ct {
  constructor() {
    super(), pt(this, p), this._documentUnique = "", pt(this, n), this.consumeContext(_t, (t) => {
      gt(this, n, t), y(this, p, bt).call(this);
    });
  }
  render() {
    return this._data ? o`
			${y(this, p, mt).call(this)}
			${y(this, p, ht).call(this)}
		` : o`<uui-box>No data available</uui-box>`;
  }
};
n = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
bt = function() {
  dt(this, n) && this.observe(dt(this, n).data, (t) => {
    this._data = t;
  }, "umbCollectionItemsObserver");
};
mt = function() {
  var t, a, e, r, i, l, s, h, c, v, _, $, D, C, f, g, S, x, A, T, w, P, N, k, H, E, L, O, I, R, G, Y, U, W, M, V, q, B, z, F, Q, K, X, Z, J, j, tt, at, et, ot, it, rt, lt, st, ut;
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
							<ul>${(c = (h = this._data) == null ? void 0 : h.seoData.h3s) == null ? void 0 : c.map((u) => o`<li>${u}</li>`)}<ul>
						</div>
					</umb-property-layout>
					<umb-property-layout label="No Index">
						<div slot="editor">${(v = this._data) != null && v.seoData.hasNoIndex ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="No Follow">
						<div slot="editor">${(_ = this._data) != null && _.seoData.hasNoFollow ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Title">
						<div slot="editor">${($ = this._data) == null ? void 0 : $.seoData.openGraphTitle}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Description">
						<div slot="editor">${(D = this._data) == null ? void 0 : D.seoData.openGraphDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Image">
						<div slot="editor"><a href=${(C = this._data) == null ? void 0 : C.seoData.openGraphImage} target="_blank">${(f = this._data) == null ? void 0 : f.seoData.openGraphImage}</a></div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(g = this._data) != null && g.contentAnalysis ? o`
				<uui-box headline="Content Analysis">
					<umb-property-layout label="Word Count">
						<div slot="editor">${(S = this._data) == null ? void 0 : S.contentAnalysis.wordCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Paragraph Count">
						<div slot="editor">${(x = this._data) == null ? void 0 : x.contentAnalysis.paragraphCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Images">
						<div slot="editor">${(A = this._data) == null ? void 0 : A.contentAnalysis.images}</div>
					</umb-property-layout>
					<umb-property-layout label="Resources">
						<div slot="editor">${(T = this._data) == null ? void 0 : T.contentAnalysis.resources}</div>
					</umb-property-layout>
					<umb-property-layout label="Links">
						<div slot="editor">${(w = this._data) == null ? void 0 : w.contentAnalysis.links}</div>
					</umb-property-layout>
					<umb-property-layout label="External Links">
						<div slot="editor">${(P = this._data) == null ? void 0 : P.contentAnalysis.externalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Internal Links">
						<div slot="editor">${(N = this._data) == null ? void 0 : N.contentAnalysis.internalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Readability Score" description="Flesch Reading Ease Score. Scores around 100 mean the document is extremely easy to read, while scores around 0 mean that it is highly complex and difficult to understand.">
						<div slot="editor">${Math.round((k = this._data) == null ? void 0 : k.contentAnalysis.readabilityScore)}</div>
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
						<div slot="editor">${(U = (Y = this._data) == null ? void 0 : Y.performanceData.timeToInteractive) == null ? void 0 : U.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Total Requests">
						<div slot="editor">${(W = this._data) == null ? void 0 : W.performanceData.totalRequests}</div>
					</umb-property-layout>
					<umb-property-layout label="Total Bytes">
						<div slot="editor">${(M = this._data) == null ? void 0 : M.performanceData.totalBytes}b</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(V = this._data) != null && V.accessibilityData ? o`
				<uui-box headline="Accessibility">
					<umb-property-layout label="ARIA Labels">
						<div slot="editor">${(q = this._data) == null ? void 0 : q.accessibilityData.ariaLabelCount}</div>
					</umb-property-layout>
					<umb-property-layout label="ARIA Described By">
						<div slot="editor">${(B = this._data) == null ? void 0 : B.accessibilityData.ariaDescribedByCount}</div>
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
						<div slot="editor">${(J = this._data) != null && J.technicalSeoData.hasBrowserCaching ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has HTTPS">
						<div slot="editor">${(j = this._data) != null && j.technicalSeoData.hasHttps ? "Yes" : "No"}</div>
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
  var t, a, e, r, i;
  return o`
			<div>
			${(t = this._data) != null && t.pageData ? o`
				<uui-box headline="Page">
					<umb-property-layout label="URL" orientation="vertical">
						<div slot="editor"><a href=${(a = this._data) == null ? void 0 : a.pageData.url} target="_blank">${(e = this._data) == null ? void 0 : e.pageData.url}</a></div>
					</umb-property-layout>
					<umb-property-layout label="Unique" orientation="vertical">
						<div slot="editor">${(r = this._data) == null ? void 0 : r.pageData.unique}</div>
					</umb-property-layout>
					<umb-property-layout label="Status Code" orientation="vertical">
						<div slot="editor">
							<content-audit-status-code-label .statusCode=${(i = this._data) == null ? void 0 : i.pageData.statusCode}></content-audit-status-code-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}
			</div>
		`;
};
d.styles = [
  Dt,
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
		`
];
b([
  nt()
], d.prototype, "_data", 2);
b([
  nt()
], d.prototype, "_documentUnique", 2);
d = b([
  vt("content-audit-all-pages-details-workspace-view")
], d);
const Nt = d;
export {
  d as ContentAuditAllPagesDetailsWorkspaceViewElement,
  Nt as default
};
//# sourceMappingURL=all-pages-details-workspace-view.element-ssK5NVgg.js.map
