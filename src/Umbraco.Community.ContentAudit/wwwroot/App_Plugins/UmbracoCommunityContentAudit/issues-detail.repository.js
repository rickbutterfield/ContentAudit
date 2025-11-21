var m = (r) => {
  throw TypeError(r);
};
var d = (r, s, t) => s.has(r) || m("Cannot " + t);
var i = (r, s, t) => (d(r, s, "read from private field"), t ? t.call(r) : s.get(r)), n = (r, s, t) => s.has(r) ? m("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(r) : s.set(r, t), h = (r, s, t, e) => (d(r, s, "write to private field"), e ? e.call(r, t) : s.set(r, t), t);
import { UmbRepositoryBase as w } from "@umbraco-cms/backoffice/repository";
import { CONTENT_AUDIT_ISSUES_DETAIL_STORE_CONTEXT as f } from "./issues-detail.store.js";
import { I as y } from "./index.js";
import { tryExecute as U } from "@umbraco-cms/backoffice/resources";
var u;
class l {
  constructor(s) {
    n(this, u);
    h(this, u, s);
  }
  async read(s) {
    if (!s) throw new Error("Unique is missing");
    const { data: t, error: e } = await U(
      i(this, u),
      y.getIssue({ path: { id: s } })
    );
    return e || !t ? { error: e } : { data: t };
  }
}
u = new WeakMap();
var a, o, c;
class C extends w {
  constructor(t) {
    super(t);
    n(this, a);
    n(this, o);
    n(this, c, new l(this));
    h(this, a, Promise.all([
      this.consumeContext(f, (e) => {
        h(this, o, e);
      }).asPromise()
    ]));
  }
  async requestByUnique(t) {
    if (!t) throw new Error("Unique is missing");
    await i(this, a);
    const { data: e, error: p } = await i(this, c).read(t);
    return e && i(this, o).append(e), { data: e, error: p, asObservable: () => i(this, o).byUnique(t) };
  }
  async byUnique(t) {
    if (!t) throw new Error("Unique is missing");
    return await i(this, a), i(this, o).byUnique(t);
  }
}
a = new WeakMap(), o = new WeakMap(), c = new WeakMap();
export {
  C as ContentAuditIssuesDetailRepository,
  C as default
};
//# sourceMappingURL=issues-detail.repository.js.map
