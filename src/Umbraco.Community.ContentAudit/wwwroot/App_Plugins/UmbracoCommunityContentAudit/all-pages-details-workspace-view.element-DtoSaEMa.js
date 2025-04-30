import { UmbLitElement as vt } from "@umbraco-cms/backoffice/lit-element";
import { t as _t } from "./index-BW3lOCKc.js";
import { r as yt } from "./state-CaNapIRc.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as Dt } from "./all-pages-workspace.context-Cpus4991.js";
import { html as i, css as $t } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as Ct } from "@umbraco-cms/backoffice/style";
var gt = Object.defineProperty, ft = Object.getOwnPropertyDescriptor, bt = (t) => {
  throw TypeError(t);
}, y = (t, a, e, r) => {
  for (var o = r > 1 ? void 0 : r ? ft(a, e) : a, l = t.length - 1, s; l >= 0; l--)
    (s = t[l]) && (o = (r ? s(a, e, o) : s(o)) || o);
  return r && o && gt(a, e, o), o;
}, b = (t, a, e) => a.has(t) || bt("Cannot " + e), dt = (t, a, e) => (b(t, a, "read from private field"), a.get(t)), nt = (t, a, e) => a.has(t) ? bt("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), St = (t, a, e, r) => (b(t, a, "write to private field"), a.set(t, e), e), n = (t, a, e) => (b(t, a, "access private method"), e), d, p, mt, ct, ht;
let u = class extends vt {
  constructor() {
    super(), nt(this, p), this._documentUnique = "", nt(this, d), this.consumeContext(Dt, (t) => {
      St(this, d, t), n(this, p, mt).call(this);
    });
  }
  render() {
    return this._data ? i`
			${n(this, p, ct).call(this)}
			${n(this, p, ht).call(this)}
		` : i`<uui-box>No data available</uui-box>`;
  }
};
d = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
mt = function() {
  dt(this, d) && this.observe(dt(this, d).data, (t) => {
    this._data = t;
  }, "umbCollectionItemsObserver");
};
ct = function() {
  var t, a, e, r, o, l, s, m, c, h, v, _, D, $, C, g, f, S, A, T, x, P, w, H, I, N, L, E, k, O, G, R, U, Y, M, V, Q, W, q, B, z, F, K, X, Z, J, j, tt, at, et, ot, it, rt, lt, st, ut, pt;
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
						<div slot="editor">${(c = this._data) != null && c.seoData.hasNoFollow ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Title">
						<div slot="editor">${(h = this._data) == null ? void 0 : h.seoData.openGraphTitle}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Description">
						<div slot="editor">${(v = this._data) == null ? void 0 : v.seoData.openGraphDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Image">
						<div slot="editor">${(_ = this._data) == null ? void 0 : _.seoData.openGraphImage}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(D = this._data) != null && D.contentAnalysis ? i`
				<uui-box headline="Content Analysis">
					<umb-property-layout label="Word Count">
						<div slot="editor">${($ = this._data) == null ? void 0 : $.contentAnalysis.wordCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Paragraph Count">
						<div slot="editor">${(C = this._data) == null ? void 0 : C.contentAnalysis.paragraphCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Images">
						<div slot="editor">${(g = this._data) == null ? void 0 : g.contentAnalysis.images}</div>
					</umb-property-layout>
					<umb-property-layout label="Resources">
						<div slot="editor">${(f = this._data) == null ? void 0 : f.contentAnalysis.resources}</div>
					</umb-property-layout>
					<umb-property-layout label="Links">
						<div slot="editor">${(S = this._data) == null ? void 0 : S.contentAnalysis.links}</div>
					</umb-property-layout>
					<umb-property-layout label="External Links">
						<div slot="editor">${(A = this._data) == null ? void 0 : A.contentAnalysis.externalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Internal Links">
						<div slot="editor">${(T = this._data) == null ? void 0 : T.contentAnalysis.internalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Readability Score">
						<div slot="editor">${(x = this._data) == null ? void 0 : x.contentAnalysis.readabilityScore}</div>
					</umb-property-layout>
					<umb-property-layout label="Keyword Density">
						<div slot="editor">${(P = this._data) == null ? void 0 : P.contentAnalysis.keywordDensity}</div>
					</umb-property-layout>
					<umb-property-layout label="Missing Alt Text Images">
						<div slot="editor">${(w = this._data) == null ? void 0 : w.contentAnalysis.missingAltTextImages}</div>
					</umb-property-layout>
					<umb-property-layout label="Missing Title Images">
						<div slot="editor">${(H = this._data) == null ? void 0 : H.contentAnalysis.missingTitleImages}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(I = this._data) != null && I.performanceData ? i`
				<uui-box headline="Performance">
					<umb-property-layout label="Page Load Time">
						<div slot="editor">${(N = this._data) == null ? void 0 : N.performanceData.pageLoadTime}ms</div>
					</umb-property-layout>
					<umb-property-layout label="First Contentful Paint">
						<div slot="editor">${(L = this._data) == null ? void 0 : L.performanceData.firstContentfulPaint}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Largest Contentful Paint">
						<div slot="editor">${(E = this._data) == null ? void 0 : E.performanceData.largestContentfulPaint}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Time to Interactive">
						<div slot="editor">${(k = this._data) == null ? void 0 : k.performanceData.timeToInteractive}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Total Requests">
						<div slot="editor">${(O = this._data) == null ? void 0 : O.performanceData.totalRequests}</div>
					</umb-property-layout>
					<umb-property-layout label="Total Bytes">
						<div slot="editor">${(G = this._data) == null ? void 0 : G.performanceData.totalBytes}b</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(R = this._data) != null && R.accessibilityData ? i`
				<uui-box headline="Accessibility">
					<umb-property-layout label="Accessibility Issues">
						<div slot="editor">${(U = this._data) == null ? void 0 : U.accessibilityData.accessibilityIssues}</div>
					</umb-property-layout>
					<umb-property-layout label="ARIA Labels">
						<div slot="editor">${(Y = this._data) == null ? void 0 : Y.accessibilityData.ariaLabelCount}</div>
					</umb-property-layout>
					<umb-property-layout label="ARIA Described By">
						<div slot="editor">${(M = this._data) == null ? void 0 : M.accessibilityData.ariaDescribedByCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Skip to Content">
						<div slot="editor">${(V = this._data) != null && V.accessibilityData.hasSkipToContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Proper Heading Structure">
						<div slot="editor">${(Q = this._data) != null && Q.accessibilityData.hasProperHeadingStructure ? "Yes" : "No"}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(W = this._data) != null && W.technicalSeoData ? i`
				<uui-box headline="Technical SEO">
					<umb-property-layout label="Content Type">
						<div slot="editor">${(q = this._data) == null ? void 0 : q.technicalSeoData.contentType}</div>
					</umb-property-layout>
					<umb-property-layout label="Charset">
						<div slot="editor">${(B = this._data) == null ? void 0 : B.technicalSeoData.charset}</div>
					</umb-property-layout>
					<umb-property-layout label="Has GZip Compression">
						<div slot="editor">${(z = this._data) != null && z.technicalSeoData.hasGzipCompression ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Browser Caching">
						<div slot="editor">${(F = this._data) != null && F.technicalSeoData.hasBrowserCaching ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has HTTPS">
						<div slot="editor">${(K = this._data) != null && K.technicalSeoData.hasHttps ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Valid HTML">
						<div slot="editor">${(X = this._data) != null && X.technicalSeoData.hasValidHtml ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="HTML Validation Errors">
						<div slot="editor">${(Z = this._data) == null ? void 0 : Z.technicalSeoData.htmlValidationErrors}</div>
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
					<umb-property-layout label="Has Duplicate Content">
						<div slot="editor">${(at = this._data) != null && at.contentQualityData.hasDuplicateContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Duplicate Content URLs">
						<div slot="editor">${(et = this._data) == null ? void 0 : et.contentQualityData.duplicateContentUrls}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Thin Content">
						<div slot="editor">${(ot = this._data) != null && ot.contentQualityData.hasThinContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Content Score">
						<div slot="editor">${(it = this._data) == null ? void 0 : it.contentQualityData.contentScore}</div>
					</umb-property-layout>
					<umb-property-layout label="Content Gaps">
						<div slot="editor">${(rt = this._data) == null ? void 0 : rt.contentQualityData.contentGaps}</div>
					</umb-property-layout>
					<umb-property-layout label="Content Strengths">
						<div slot="editor">${(lt = this._data) == null ? void 0 : lt.contentQualityData.contentStrengths}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(st = this._data) != null && st.emissionsData ? i`
				<uui-box headline="Emissions">
					<umb-property-layout label="Emissions per Page View">
						<div slot="editor">${(ut = this._data) == null ? void 0 : ut.emissionsData.emissionsPerPageView}g CO<sub>2</sub></div>
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
ht = function() {
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
  Ct,
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
y([
  yt()
], u.prototype, "_data", 2);
y([
  yt()
], u.prototype, "_documentUnique", 2);
u = y([
  _t("content-audit-all-pages-details-workspace-view")
], u);
const It = u;
export {
  u as ContentAuditAllPagesDetailsWorkspaceViewElement,
  It as default
};
//# sourceMappingURL=all-pages-details-workspace-view.element-DtoSaEMa.js.map
