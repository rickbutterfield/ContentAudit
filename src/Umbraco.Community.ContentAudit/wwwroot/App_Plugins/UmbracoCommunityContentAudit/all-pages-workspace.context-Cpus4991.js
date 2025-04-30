var h = (t) => {
  throw TypeError(t);
};
var _ = (t, e, s) => e.has(t) || h("Cannot " + s);
var i = (t, e, s) => (_(t, e, "read from private field"), s ? s.call(t) : e.get(t)), d = (t, e, s) => e.has(t) ? h("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), c = (t, e, s, r) => (_(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
import { UmbContextBase as f } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as C } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as E, UmbWorkspaceRouteManager as y } from "@umbraco-cms/backoffice/workspace";
import { html as P, css as g, state as O, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as U } from "@umbraco-cms/backoffice/lit-element";
import { ContentAuditAllPagesDetailRepository as S } from "./all-pages-detail.repository-giCRWHVG.js";
import { UmbObjectState as b } from "@umbraco-cms/backoffice/observable-api";
import { a as N } from "./index-BW3lOCKc.js";
import { UmbTextStyles as W } from "@umbraco-cms/backoffice/style";
var k = Object.defineProperty, q = Object.getOwnPropertyDescriptor, m = (t) => {
  throw TypeError(t);
}, A = (t, e, s, r) => {
  for (var a = r > 1 ? void 0 : r ? q(e, s) : e, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (a = (r ? l(e, s, a) : l(a)) || a);
  return r && a && k(e, s, a), a;
}, v = (t, e, s) => e.has(t) || m("Cannot " + s), D = (t, e, s) => (v(t, e, "read from private field"), s ? s.call(t) : e.get(t)), R = (t, e, s) => e.has(t) ? m("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), L = (t, e, s, r) => (v(t, e, "write to private field"), e.set(t, s), s), u;
let p = class extends U {
  constructor() {
    super(), R(this, u), this.consumeContext(T, (t) => {
      L(this, u, t), this.observe(D(this, u).data, (e) => {
        this._data = e;
      });
    });
  }
  render() {
    var t;
    if (this._data)
      return P`
				<umb-workspace-editor back-path="${x}" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">${(t = this._data.pageData) == null ? void 0 : t.url}</h3>
					</div>
					<slot></slot>
				</umb-workspace-editor>
			`;
  }
};
u = /* @__PURE__ */ new WeakMap();
p.styles = [
  W,
  g`
			:host {
				//padding: 
			}
		`
];
A([
  O()
], p.prototype, "_data", 2);
p = A([
  w("content-audit-all-pages-workspace-editor")
], p);
const x = E.generateAbsolute({
  sectionName: "audit",
  entityType: "all-pages-root"
});
var o;
class z extends f {
  constructor(s) {
    super(s, T);
    d(this, o);
    this.workspaceAlias = N, this.repository = new S(this), c(this, o, new b(void 0)), this.data = i(this, o).asObservable(), this.unique = i(this, o).asObservablePart((r) => r == null ? void 0 : r.unique), this.routes = new y(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: p,
        setup: (r, a) => {
          const n = a.match.params.unique;
          this.load(n);
        }
      }
    ]);
  }
  async load(s) {
    const { data: r } = await this.repository.requestByUnique(s);
    r && i(this, o).setValue(r);
  }
  getData() {
    return i(this, o).getValue();
  }
  getUnique() {
    var s;
    return (s = this.getData()) == null ? void 0 : s.unique;
  }
  getEntityType() {
    return "all-pages";
  }
  destroy() {
    i(this, o).destroy(), super.destroy();
  }
}
o = new WeakMap();
const T = new C(
  "UmbWorkspaceContext",
  void 0,
  (t) => {
    var e;
    return ((e = t.getEntityType) == null ? void 0 : e.call(t)) === "all-pages";
  }
);
export {
  T as CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT,
  z as ContentAuditAllPagesWorkspaceContext,
  z as api
};
//# sourceMappingURL=all-pages-workspace.context-Cpus4991.js.map
