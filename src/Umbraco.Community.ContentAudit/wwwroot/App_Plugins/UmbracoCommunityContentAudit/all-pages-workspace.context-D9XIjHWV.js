var h = (t) => {
  throw TypeError(t);
};
var l = (t, e, r) => e.has(t) || h("Cannot " + r);
var i = (t, e, r) => (l(t, e, "read from private field"), r ? r.call(t) : e.get(t)), d = (t, e, r) => e.has(t) ? h("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), c = (t, e, r, a) => (l(t, e, "write to private field"), a ? a.call(t, r) : e.set(t, r), r);
import { UmbContextBase as T } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as f } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_PATH_PATTERN as E, UmbWorkspaceRouteManager as P } from "@umbraco-cms/backoffice/workspace";
import { html as y, state as O, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
import { ContentAuditAllPagesDetailRepository as U } from "./all-pages-detail.repository-Cfm1_mzl.js";
import { UmbObjectState as S } from "@umbraco-cms/backoffice/observable-api";
import { a as N } from "./index-B3GcBdtE.js";
var W = Object.defineProperty, b = Object.getOwnPropertyDescriptor, m = (t) => {
  throw TypeError(t);
}, A = (t, e, r, a) => {
  for (var s = a > 1 ? void 0 : a ? b(e, r) : e, n = t.length - 1, _; n >= 0; n--)
    (_ = t[n]) && (s = (a ? _(e, r, s) : _(s)) || s);
  return a && s && W(e, r, s), s;
}, v = (t, e, r) => e.has(t) || m("Cannot " + r), k = (t, e, r) => (v(t, e, "read from private field"), r ? r.call(t) : e.get(t)), q = (t, e, r) => e.has(t) ? m("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), D = (t, e, r, a) => (v(t, e, "write to private field"), e.set(t, r), r), p;
let u = class extends w {
  constructor() {
    super(), q(this, p), this.consumeContext(C, (t) => {
      D(this, p, t), this.observe(k(this, p).data, (e) => {
        this._data = e;
      });
    });
  }
  render() {
    var t;
    if (this._data)
      return y`
				<umb-workspace-editor back-path="${R}" .enforceNoFooter="${!0}">
					<div slot="header">
						<h3 id="headline">${(t = this._data.pageData) == null ? void 0 : t.url}</h3>
					</div>
				</umb-workspace-editor>
			`;
  }
};
p = /* @__PURE__ */ new WeakMap();
A([
  O()
], u.prototype, "_data", 2);
u = A([
  g("content-audit-all-pages-workspace-editor")
], u);
const R = E.generateAbsolute({
  sectionName: "audit",
  entityType: "all-pages-root"
});
var o;
class V extends T {
  constructor(r) {
    super(r, C);
    d(this, o);
    this.workspaceAlias = N, this.repository = new U(this), c(this, o, new S(void 0)), this.data = i(this, o).asObservable(), this.unique = i(this, o).asObservablePart((a) => a == null ? void 0 : a.unique), this.routes = new P(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: u,
        setup: (a, s) => {
          const n = s.match.params.unique;
          this.load(n);
        }
      }
    ]);
  }
  async load(r) {
    const { data: a } = await this.repository.requestByUnique(r);
    a && i(this, o).setValue(a);
  }
  getData() {
    return i(this, o).getValue();
  }
  getUnique() {
    var r;
    return (r = this.getData()) == null ? void 0 : r.unique;
  }
  getEntityType() {
    return "all-pages";
  }
  destroy() {
    i(this, o).destroy(), super.destroy();
  }
}
o = new WeakMap();
const C = new f(
  "UmbWorkspaceContext",
  void 0,
  (t) => {
    var e;
    return ((e = t.getEntityType) == null ? void 0 : e.call(t)) === "all-pages";
  }
);
export {
  C as CONTENT_AUDIT_ALL_PAGES_WORKSPACE_CONTEXT,
  V as ContentAuditAllPagesWorkspaceContext,
  V as api
};
//# sourceMappingURL=all-pages-workspace.context-D9XIjHWV.js.map
