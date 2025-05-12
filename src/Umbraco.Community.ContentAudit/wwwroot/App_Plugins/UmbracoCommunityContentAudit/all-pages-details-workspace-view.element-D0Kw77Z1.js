import { UmbLitElement as bt } from "@umbraco-cms/backoffice/lit-element";
import { t as mt } from "./index-CkGezqvH.js";
import { r as ut } from "./state-BceSR_ry.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as ht } from "./all-pages-workspace.context-BjfuJVn6.js";
import { html as i, css as ct } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as vt } from "@umbraco-cms/backoffice/style";
var _t = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, pt = (t) => {
  throw TypeError(t);
}, y = (t, a, e, r) => {
  for (var o = r > 1 ? void 0 : r ? Dt(a, e) : a, l = t.length - 1, s; l >= 0; l--)
    (s = t[l]) && (o = (r ? s(a, e, o) : s(o)) || o);
  return r && o && _t(a, e, o), o;
}, b = (t, a, e) => a.has(t) || pt("Cannot " + e), lt = (t, a, e) => (b(t, a, "read from private field"), a.get(t)), st = (t, a, e) => a.has(t) ? pt("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), $t = (t, a, e, r) => (b(t, a, "write to private field"), a.set(t, e), e), n = (t, a, e) => (b(t, a, "access private method"), e), d, p, dt, nt, yt;
let u = class extends bt {
  constructor() {
    super(), st(this, p), this._documentUnique = "", st(this, d), this.consumeContext(ht, (t) => {
      $t(this, d, t), n(this, p, dt).call(this);
    });
  }
  render() {
    return this._data ? i`
			${n(this, p, nt).call(this)}
			${n(this, p, yt).call(this)}
		` : i`<uui-box>No data available</uui-box>`;
  }
};
d = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
dt = function() {
  lt(this, d) && this.observe(lt(this, d).data, (t) => {
    this._data = t;
  }, "umbCollectionItemsObserver");
};
nt = function() {
  var t, a, e, r, o, l, s, m, h, c, v, _, D, $, C, f, g, S, x, A, T, P, w, N, k, H, E, L, I, O, R, G, Y, U, W, M, V, q, B, z, F, Q, K, X, Z, J, j, tt, at, et, ot, it, rt;
  return i`
		<div>
			${(t = this._data) != null && t.seoData ? i`
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
						<div slot="editor">${(o = this._data) == null ? void 0 : o.seoData.h1}</div>
					</umb-property-layout>
					<umb-property-layout label="H2s">
						<div slot="editor">${(l = this._data) == null ? void 0 : l.seoData.h2s}</div>
					</umb-property-layout>
					<umb-property-layout label="H3s">
						<div slot="editor">${(s = this._data) == null ? void 0 : s.seoData.h3s}</div>
					</umb-property-layout>
					<umb-property-layout label="No Index">
						<div slot="editor">${(m = this._data) != null && m.seoData.hasNoIndex ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="No Follow">
						<div slot="editor">${(h = this._data) != null && h.seoData.hasNoFollow ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Title">
						<div slot="editor">${(c = this._data) == null ? void 0 : c.seoData.openGraphTitle}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Description">
						<div slot="editor">${(v = this._data) == null ? void 0 : v.seoData.openGraphDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Image">
						<div slot="editor"><a href=${(_ = this._data) == null ? void 0 : _.seoData.openGraphImage} target="_blank">${(D = this._data) == null ? void 0 : D.seoData.openGraphImage}</a></div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${($ = this._data) != null && $.contentAnalysis ? i`
				<uui-box headline="Content Analysis">
					<umb-property-layout label="Word Count">
						<div slot="editor">${(C = this._data) == null ? void 0 : C.contentAnalysis.wordCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Paragraph Count">
						<div slot="editor">${(f = this._data) == null ? void 0 : f.contentAnalysis.paragraphCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Images">
						<div slot="editor">${(g = this._data) == null ? void 0 : g.contentAnalysis.images}</div>
					</umb-property-layout>
					<umb-property-layout label="Resources">
						<div slot="editor">${(S = this._data) == null ? void 0 : S.contentAnalysis.resources}</div>
					</umb-property-layout>
					<umb-property-layout label="Links">
						<div slot="editor">${(x = this._data) == null ? void 0 : x.contentAnalysis.links}</div>
					</umb-property-layout>
					<umb-property-layout label="External Links">
						<div slot="editor">${(A = this._data) == null ? void 0 : A.contentAnalysis.externalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Internal Links">
						<div slot="editor">${(T = this._data) == null ? void 0 : T.contentAnalysis.internalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Readability Score" description="Flesch Reading Ease Score. Scores around 100 mean the document is extremely easy to read, while scores around 0 mean that it is highly complex and difficult to understand.">
						<div slot="editor">${Math.round((P = this._data) == null ? void 0 : P.contentAnalysis.readabilityScore)}</div>
					</umb-property-layout>
					<umb-property-layout label="Keyword Density">
						<div slot="editor">${(w = this._data) == null ? void 0 : w.contentAnalysis.keywordDensity}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(N = this._data) != null && N.performanceData ? i`
				<uui-box headline="Performance">
					<umb-property-layout label="Page Load Time">
						<div slot="editor">${(k = this._data) == null ? void 0 : k.performanceData.pageLoadTime}ms</div>
					</umb-property-layout>
					<umb-property-layout label="First Contentful Paint">
						<div slot="editor">${(E = (H = this._data) == null ? void 0 : H.performanceData.firstContentfulPaint) == null ? void 0 : E.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Largest Contentful Paint">
						<div slot="editor">${(I = (L = this._data) == null ? void 0 : L.performanceData.largestContentfulPaint) == null ? void 0 : I.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Time to Interactive">
						<div slot="editor">${(R = (O = this._data) == null ? void 0 : O.performanceData.timeToInteractive) == null ? void 0 : R.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Total Requests">
						<div slot="editor">${(G = this._data) == null ? void 0 : G.performanceData.totalRequests}</div>
					</umb-property-layout>
					<umb-property-layout label="Total Bytes">
						<div slot="editor">${(Y = this._data) == null ? void 0 : Y.performanceData.totalBytes}b</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(U = this._data) != null && U.accessibilityData ? i`
				<uui-box headline="Accessibility">
					<umb-property-layout label="ARIA Labels">
						<div slot="editor">${(W = this._data) == null ? void 0 : W.accessibilityData.ariaLabelCount}</div>
					</umb-property-layout>
					<umb-property-layout label="ARIA Described By">
						<div slot="editor">${(M = this._data) == null ? void 0 : M.accessibilityData.ariaDescribedByCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Skip to Content">
						<div slot="editor">${(V = this._data) != null && V.accessibilityData.hasSkipToContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Proper Heading Structure">
						<div slot="editor">${(q = this._data) != null && q.accessibilityData.hasProperHeadingStructure ? "Yes" : "No"}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(B = this._data) != null && B.technicalSeoData ? i`
				<uui-box headline="Technical SEO">
					<umb-property-layout label="Content Type">
						<div slot="editor">${(z = this._data) == null ? void 0 : z.technicalSeoData.contentType}</div>
					</umb-property-layout>
					<umb-property-layout label="Charset">
						<div slot="editor">${(F = this._data) == null ? void 0 : F.technicalSeoData.charset}</div>
					</umb-property-layout>
					<umb-property-layout label="Has GZip Compression">
						<div slot="editor">${(Q = this._data) != null && Q.technicalSeoData.hasGzipCompression ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Browser Caching">
						<div slot="editor">${(K = this._data) != null && K.technicalSeoData.hasBrowserCaching ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has HTTPS">
						<div slot="editor">${(X = this._data) != null && X.technicalSeoData.hasHttps ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Valid HTML">
						<div slot="editor">${(Z = this._data) != null && Z.technicalSeoData.hasValidHtml ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Schema Markup">
						<div slot="editor">${(J = this._data) != null && J.technicalSeoData.hasSchemaMarkup ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Schema Type">
						<div slot="editor">${(j = this._data) == null ? void 0 : j.technicalSeoData.schemaType}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(tt = this._data) != null && tt.contentQualityData ? i`
				<uui-box headline="Content Quality">
					<umb-property-layout label="Has Thin Content">
						<div slot="editor">${(at = this._data) != null && at.contentQualityData.hasThinContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Content Score">
						<div slot="editor">${(et = this._data) == null ? void 0 : et.contentQualityData.contentScore}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(ot = this._data) != null && ot.emissionsData ? i`
				<uui-box headline="Emissions">
					<umb-property-layout label="Emissions per Page View">
						<div slot="editor">${(it = this._data) == null ? void 0 : it.emissionsData.emissionsPerPageView}g CO<sub>2</sub></div>
					</umb-property-layout>
					<umb-property-layout label="Carbon Rating">
						<div slot="editor">
							<content-audit-carbon-intensity-label .value=${(rt = this._data) == null ? void 0 : rt.emissionsData.carbonRating}>
							</content-audit-carbon-intensity-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}
			</div>
		`;
};
yt = function() {
  var t, a, e, r, o;
  return i`
			<div>
			${(t = this._data) != null && t.pageData ? i`
				<uui-box headline="Page">
					<umb-property-layout label="URL" orientation="vertical">
						<div slot="editor"><a href=${(a = this._data) == null ? void 0 : a.pageData.url} target="_blank">${(e = this._data) == null ? void 0 : e.pageData.url}</a></div>
					</umb-property-layout>
					<umb-property-layout label="Unique" orientation="vertical">
						<div slot="editor">${(r = this._data) == null ? void 0 : r.pageData.unique}</div>
					</umb-property-layout>
					<umb-property-layout label="Status Code" orientation="vertical">
						<div slot="editor">
							<content-audit-status-code-label .statusCode=${(o = this._data) == null ? void 0 : o.pageData.statusCode}></content-audit-status-code-label>
						</div>
					</umb-property-layout>
				</uui-box>
			` : ""}
			</div>
		`;
};
u.styles = [
  vt,
  ct`
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
y([
  ut()
], u.prototype, "_data", 2);
y([
  ut()
], u.prototype, "_documentUnique", 2);
u = y([
  mt("content-audit-all-pages-details-workspace-view")
], u);
const Tt = u;
export {
  u as ContentAuditAllPagesDetailsWorkspaceViewElement,
  Tt as default
};
//# sourceMappingURL=all-pages-details-workspace-view.element-D0Kw77Z1.js.map
