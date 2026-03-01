import { UmbContextBase as T } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as P } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as O, UmbWorkspaceRouteManager as w } from "@umbraco-cms/backoffice/workspace";
import { html as m, nothing as _, css as U, state as l, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as N } from "@umbraco-cms/backoffice/lit-element";
import { ContentAuditAllPagesDetailRepository as k } from "./all-pages-detail.repository-C68jaj1z.js";
import { UmbObjectState as q } from "@umbraco-cms/backoffice/observable-api";
import { C as x, E as S, d as D } from "./index-stcFC0Hx.js";
import { UmbTextStyles as W } from "@umbraco-cms/backoffice/style";
import { UMB_NOTIFICATION_CONTEXT as R } from "@umbraco-cms/backoffice/notification";
var I = Object.defineProperty, L = Object.getOwnPropertyDescriptor, f = (t) => {
  throw TypeError(t);
}, u = (t, e, a, r) => {
  for (var i = r > 1 ? void 0 : r ? L(e, a) : e, h = t.length - 1, c; h >= 0; h--)
    (c = t[h]) && (i = (r ? c(e, a, i) : c(i)) || i);
  return r && i && I(e, a, i), i;
}, p = (t, e, a) => e.has(t) || f("Cannot " + a), d = (t, e, a) => (p(t, e, "read from private field"), a ? a.call(t) : e.get(t)), g = (t, e, a) => e.has(t) ? f("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), z = (t, e, a, r) => (p(t, e, "write to private field"), e.set(t, a), a), E = (t, e, a) => (p(t, e, "access private method"), a), n, o, v, A, y;
let s = class extends N {
  constructor() {
    super(), g(this, o), g(this, n), this._enriching = !1, this._pageEnrichingUrl = "", this.consumeContext(C, (t) => {
      z(this, n, t), this.observe(d(this, n)?.data, (e) => {
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
      return m`
				<umb-workspace-editor back-path="${B}" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">${this._data.pageData?.url}</h3>
					</div>
					${E(this, o, y).call(this)}
					<slot></slot>
				</umb-workspace-editor>
			`;
  }
};
n = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
v = async function() {
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
    }), await d(this, n)?.load(this._data.unique);
  } catch {
    t?.peek("danger", {
      data: { headline: "Content Audit", message: "Failed to enrich page. The page may not be accessible." }
    });
  } finally {
    this._enriching = !1;
  }
};
A = function() {
  return this._enriching || !!this._pageEnrichingUrl;
};
y = function() {
  if (!this._data?.pageData?.url) return _;
  const t = d(this, o, A);
  return m`
			<uui-button
				slot="action-menu"
				look="secondary"
				label="Enrich Page"
				@click=${E(this, o, v)}
				.state=${t ? "waiting" : _}>
				Enrich Page
			</uui-button>
		`;
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
  l()
], s.prototype, "_data", 2);
u([
  l()
], s.prototype, "_enriching", 2);
u([
  l()
], s.prototype, "_pageEnrichingUrl", 2);
s = u([
  b("content-audit-all-pages-workspace-editor")
], s);
const B = O.generateAbsolute({
  sectionName: "audit",
  entityType: "all-pages-root"
});
class Y extends T {
  constructor(e) {
    super(e, C), this.workspaceAlias = D, this.repository = new k(this), this.#t = new q(void 0), this.data = this.#t.asObservable(), this.unique = this.#t.asObservablePart((a) => a?.unique), this.routes = new w(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: s,
        setup: (a, r) => {
          const i = r.match.params.unique;
          this.load(i);
        }
      }
    ]);
  }
  #t;
  async load(e) {
    const { data: a } = await this.repository.requestByUnique(e);
    a && this.#t.setValue(a);
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
const C = new P(
  "UmbWorkspaceContext",
  void 0,
  (t) => t.getEntityType?.() === "all-pages"
);
export {
  C as CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT,
  Y as ContentAuditAllPagesWorkspaceContext,
  Y as api
};
//# sourceMappingURL=all-pages-workspace.context-C_4Z3Gw9.js.map
