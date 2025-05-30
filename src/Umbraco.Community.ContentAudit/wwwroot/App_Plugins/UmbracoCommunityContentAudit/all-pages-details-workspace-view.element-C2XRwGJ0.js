import { UmbLitElement as _t } from "@umbraco-cms/backoffice/lit-element";
import { t as $t } from "./index-Ca1vHQCw.js";
import { r as bt } from "./state--Dtq6aqK.js";
import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT as Dt } from "./all-pages-workspace.context-BljJo633.js";
import { html as o, css as Ct } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as ft } from "@umbraco-cms/backoffice/style";
var gt = Object.defineProperty, St = Object.getOwnPropertyDescriptor, mt = (t) => {
  throw TypeError(t);
}, m = (t, a, e, l) => {
  for (var i = l > 1 ? void 0 : l ? St(a, e) : a, u = t.length - 1, s; u >= 0; u--)
    (s = t[u]) && (i = (l ? s(a, e, i) : s(i)) || i);
  return l && i && gt(a, e, i), i;
}, h = (t, a, e) => a.has(t) || mt("Cannot " + e), nt = (t, a, e) => (h(t, a, "read from private field"), a.get(t)), yt = (t, a, e) => a.has(t) ? mt("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), xt = (t, a, e, l) => (h(t, a, "write to private field"), a.set(t, e), e), b = (t, a, e) => (h(t, a, "access private method"), e), y, n, ht, ct, vt;
let p = class extends _t {
  constructor() {
    super(), yt(this, n), this._documentUnique = "", yt(this, y), this.consumeContext(Dt, (t) => {
      xt(this, y, t), b(this, n, ht).call(this);
    });
  }
  render() {
    return this._data ? o`
			${b(this, n, ct).call(this)}
			${b(this, n, vt).call(this)}
		` : o`<uui-box>No data available</uui-box>`;
  }
};
y = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
ht = function() {
  nt(this, y) && this.observe(nt(this, y).data, (t) => {
    this._data = t;
  }, "umbCollectionItemsObserver");
};
ct = function() {
  var t, a, e, l, i, u, s, c, v, _, $, D, C, f, g, S, x, T, w, A, P, E, H, N, k, L, O, I, R, G, Y, M, U, V, W, q, B, z, F, Q, K, X, Z, j, J, tt, at, et, ot, it, lt, rt, ut, st, dt, pt;
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
						<div slot="editor">${(l = this._data) == null ? void 0 : l.seoData.canonicalUrl}</div>
					</umb-property-layout>
					<umb-property-layout label="H1">
						<div slot="editor">${(i = this._data) == null ? void 0 : i.seoData.h1}</div>
					</umb-property-layout>
					<umb-property-layout label="H2s">
						<div slot="editor">
							<ul>${(s = (u = this._data) == null ? void 0 : u.seoData.h2s) == null ? void 0 : s.map((r) => o`<li>${r}</li>`)}<ul>
						</div>
					</umb-property-layout>
					<umb-property-layout label="H3s">
						<div slot="editor">
							<ul>${(v = (c = this._data) == null ? void 0 : c.seoData.h3s) == null ? void 0 : v.map((r) => o`<li>${r}</li>`)}<ul>
						</div>
					</umb-property-layout>
					<umb-property-layout label="No Index">
						<div slot="editor">${(_ = this._data) != null && _.seoData.hasNoIndex ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="No Follow">
						<div slot="editor">${($ = this._data) != null && $.seoData.hasNoFollow ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Title">
						<div slot="editor">${(D = this._data) == null ? void 0 : D.seoData.openGraphTitle}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Description">
						<div slot="editor">${(C = this._data) == null ? void 0 : C.seoData.openGraphDescription}</div>
					</umb-property-layout>
					<umb-property-layout label="Open Graph Image">
						<div slot="editor"><a href=${(f = this._data) == null ? void 0 : f.seoData.openGraphImage} target="_blank">${(g = this._data) == null ? void 0 : g.seoData.openGraphImage}</a></div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(S = this._data) != null && S.contentAnalysis ? o`
				<uui-box headline="Content Analysis">
					<umb-property-layout label="Word Count">
						<div slot="editor">${(x = this._data) == null ? void 0 : x.contentAnalysis.wordCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Paragraph Count">
						<div slot="editor">${(T = this._data) == null ? void 0 : T.contentAnalysis.paragraphCount}</div>
					</umb-property-layout>
					<umb-property-layout label="Images">
						<div slot="editor">${(w = this._data) == null ? void 0 : w.contentAnalysis.images}</div>
					</umb-property-layout>
					<umb-property-layout label="Resources">
						<div slot="editor">${(A = this._data) == null ? void 0 : A.contentAnalysis.resources}</div>
					</umb-property-layout>
					<umb-property-layout label="Links">
						<div slot="editor">${(P = this._data) == null ? void 0 : P.contentAnalysis.links}</div>
					</umb-property-layout>
					<umb-property-layout label="External Links">
						<div slot="editor">${(E = this._data) == null ? void 0 : E.contentAnalysis.externalLinks}</div>
					</umb-property-layout>
					<umb-property-layout label="Internal Links">
						<div slot="editor">${(H = this._data) == null ? void 0 : H.contentAnalysis.internalLinks}</div>
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
							${Object.entries((k = this._data) == null ? void 0 : k.contentAnalysis.keywordDensity).map((r) => o`
									<uui-table-row>
										<uui-table-cell>${r[0]}</uui-table-cell>
										<uui-table-cell>${r[1]}%</uui-table-cell>
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
						<div slot="editor">${(Y = (G = this._data) == null ? void 0 : G.performanceData.largestContentfulPaint) == null ? void 0 : Y.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Time to Interactive">
						<div slot="editor">${(U = (M = this._data) == null ? void 0 : M.performanceData.timeToInteractive) == null ? void 0 : U.value}ms</div>
					</umb-property-layout>
					<umb-property-layout label="Total Requests">
						<div slot="editor">${(V = this._data) == null ? void 0 : V.performanceData.totalRequests}</div>
					</umb-property-layout>
					<umb-property-layout label="Total Bytes">
						<div slot="editor">${(W = this._data) == null ? void 0 : W.performanceData.totalBytes}b</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(q = this._data) != null && q.accessibilityData ? o`
				<uui-box headline="Accessibility">
					<umb-property-layout label="ARIA Labels">
						<div slot="editor">${(B = this._data) == null ? void 0 : B.accessibilityData.ariaLabelCount}</div>
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
						<div slot="editor">${(X = this._data) == null ? void 0 : X.technicalSeoData.contentType}</div>
					</umb-property-layout>
					<umb-property-layout label="Charset">
						<div slot="editor">${(Z = this._data) == null ? void 0 : Z.technicalSeoData.charset}</div>
					</umb-property-layout>
					<umb-property-layout label="Has GZip Compression">
						<div slot="editor">${(j = this._data) != null && j.technicalSeoData.hasGzipCompression ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Browser Caching">
						<div slot="editor">${(J = this._data) != null && J.technicalSeoData.hasBrowserCaching ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has HTTPS">
						<div slot="editor">${(tt = this._data) != null && tt.technicalSeoData.hasHttps ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Has Valid HTML">
						<div slot="editor">${(at = this._data) != null && at.technicalSeoData.hasValidHtml ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="HTML Validation Errors">
						<div slot="editor">
							<uui-table>
								<uui-table-head>
									<uui-table-head-cell>Message</uui-table-head-cell>
									<uui-table-head-cell>Type</uui-table-head-cell>
								</uui-table-head>
								${Object.entries((et = this._data) == null ? void 0 : et.technicalSeoData.htmlValidationErrors).map((r) => {
    let d = r[1];
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

			${(lt = this._data) != null && lt.contentQualityData ? o`
				<uui-box headline="Content Quality">
					<umb-property-layout label="Has Thin Content">
						<div slot="editor">${(rt = this._data) != null && rt.contentQualityData.hasThinContent ? "Yes" : "No"}</div>
					</umb-property-layout>
					<umb-property-layout label="Content Score">
						<div slot="editor">${(ut = this._data) == null ? void 0 : ut.contentQualityData.contentScore}</div>
					</umb-property-layout>
				</uui-box>
			` : ""}

			${(st = this._data) != null && st.emissionsData ? o`
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
  var t, a, e, l, i;
  return o`
			<div>
			${(t = this._data) != null && t.pageData ? o`
				<uui-box headline="Page">
					<umb-property-layout label="URL" orientation="vertical">
						<div slot="editor"><a href=${(a = this._data) == null ? void 0 : a.pageData.url} target="_blank">${(e = this._data) == null ? void 0 : e.pageData.url}</a></div>
					</umb-property-layout>
					<umb-property-layout label="Unique" orientation="vertical">
						<div slot="editor">${(l = this._data) == null ? void 0 : l.pageData.unique}</div>
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
p.styles = [
  ft,
  Ct`
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
m([
  bt()
], p.prototype, "_data", 2);
m([
  bt()
], p.prototype, "_documentUnique", 2);
p = m([
  $t("content-audit-all-pages-details-workspace-view")
], p);
const Nt = p;
export {
  p as ContentAuditAllPagesDetailsWorkspaceViewElement,
  Nt as default
};
//# sourceMappingURL=all-pages-details-workspace-view.element-C2XRwGJ0.js.map
