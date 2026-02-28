import { UmbContextBase as C } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as T } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as P, UmbWorkspaceRouteManager as O } from "@umbraco-cms/backoffice/workspace";
import { html as l, nothing as w, css as U, state as p, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as N } from "@umbraco-cms/backoffice/lit-element";
import { ContentAuditAllPagesDetailRepository as k } from "./all-pages-detail.repository-1uYsKLBz.js";
import { UmbObjectState as q } from "@umbraco-cms/backoffice/observable-api";
import { C as x, E as S, d as D } from "./index-DCD4XZJW.js";
import { UmbTextStyles as W } from "@umbraco-cms/backoffice/style";
import { UMB_NOTIFICATION_CONTEXT as R } from "@umbraco-cms/backoffice/notification";
var I = Object.defineProperty, L = Object.getOwnPropertyDescriptor, m = (t) => {
  throw TypeError(t);
}, u = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? L(e, i) : e, c = t.length - 1, h; c >= 0; c--)
    (h = t[c]) && (a = (r ? h(e, i, a) : h(a)) || a);
  return r && a && I(e, i, a), a;
}, d = (t, e, i) => e.has(t) || m("Cannot " + i), _ = (t, e, i) => (d(t, e, "read from private field"), i ? i.call(t) : e.get(t)), g = (t, e, i) => e.has(t) ? m("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), z = (t, e, i, r) => (d(t, e, "write to private field"), e.set(t, i), i), f = (t, e, i) => (d(t, e, "access private method"), i), n, o, E, v, y;
let s = class extends N {
  constructor() {
    super(), g(this, o), g(this, n), this._enriching = !1, this._pageEnrichingUrl = "", this.consumeContext(A, (t) => {
      z(this, n, t), this.observe(_(this, n)?.data, (e) => {
        this._data = e;
      });
    }), this.consumeContext(x, (t) => {
      t && this.observe(t.pageEnrichingUrl, (e) => {
        this._pageEnrichingUrl = e;
      });
    });
  }
  render() {
    if (this._data)
      return l`
				<umb-workspace-editor back-path="${B}" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">${this._data.pageData?.url}</h3>
					</div>
					${f(this, o, y).call(this)}
					<slot></slot>
				</umb-workspace-editor>
			`;
  }
};
n = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
E = async function() {
  if (!this._data?.pageData?.url || !this._data?.unique) return;
  this._enriching = !0;
  const t = await this.getContext(R);
  t?.peek("default", {
    data: { headline: "Content Audit", message: "Enriching page with Playwright performance data..." }
  });
  try {
    await S.enrichPage({
      query: {
        url: this._data.pageData.url,
        pageUnique: this._data.unique
      }
    }), t?.peek("positive", {
      data: { headline: "Content Audit", message: "Page enriched successfully." }
    }), await _(this, n)?.load(this._data.unique);
  } catch {
    t?.peek("danger", {
      data: { headline: "Content Audit", message: "Failed to enrich page. The page may not be accessible." }
    });
  } finally {
    this._enriching = !1;
  }
};
v = function() {
  return this._enriching || !!this._pageEnrichingUrl;
};
y = function() {
  return this._data?.pageData?.url ? _(this, o, v) ? l`
				<div slot="action-menu" class="enrich-status">
					<uui-loader-circle></uui-loader-circle>
					<span>${this._enriching ? "Enriching page..." : "Enrichment in progress..."}</span>
				</div>
			` : l`
			<uui-button
				slot="action-menu"
				look="secondary"
				label="Enrich Page"
				@click=${f(this, o, E)}>
				Enrich Page
			</uui-button>
		` : w;
};
s.styles = [
  W,
  U`
			uui-button[slot="action-menu"] {
				margin-right: var(--uui-size-space-4);
			}

			.enrich-status {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				margin-right: var(--uui-size-space-4);
				color: var(--uui-color-text-alt);
				font-size: var(--uui-type-small-size);
			}

			.enrich-status uui-loader-circle {
				font-size: 1em;
			}
		`
];
u([
  p()
], s.prototype, "_data", 2);
u([
  p()
], s.prototype, "_enriching", 2);
u([
  p()
], s.prototype, "_pageEnrichingUrl", 2);
s = u([
  b("content-audit-all-pages-workspace-editor")
], s);
const B = P.generateAbsolute({
  sectionName: "audit",
  entityType: "all-pages-root"
});
class Y extends C {
  constructor(e) {
    super(e, A), this.workspaceAlias = D, this.repository = new k(this), this.#t = new q(void 0), this.data = this.#t.asObservable(), this.unique = this.#t.asObservablePart((i) => i?.unique), this.routes = new O(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: s,
        setup: (i, r) => {
          const a = r.match.params.unique;
          this.load(a);
        }
      }
    ]);
  }
  #t;
  async load(e) {
    const { data: i } = await this.repository.requestByUnique(e);
    i && this.#t.setValue(i);
  }
  getData() {
    return this.#t.getValue();
  }
  getUnique() {
    return this.getData()?.unique;
  }
  getEntityType() {
    return "all-pages";
  }
  destroy() {
    this.#t.destroy(), super.destroy();
  }
}
const A = new T(
  "UmbWorkspaceContext",
  void 0,
  (t) => t.getEntityType?.() === "all-pages"
);
export {
  A as CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT,
  Y as ContentAuditAllPagesWorkspaceContext,
  Y as api
};
//# sourceMappingURL=all-pages-workspace.context-mxKV2W4w.js.map
