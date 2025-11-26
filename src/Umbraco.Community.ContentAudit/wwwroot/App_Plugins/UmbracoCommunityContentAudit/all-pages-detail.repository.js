var u = (i) => {
  throw TypeError(i);
};
var d = (i, r, t) => r.has(i) || u("Cannot " + t);
var s = (i, r, t) => (d(i, r, "read from private field"), t ? t.call(i) : r.get(i)), n = (i, r, t) => r.has(i) ? u("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(i) : r.set(i, t), c = (i, r, t, e) => (d(i, r, "write to private field"), e ? e.call(i, t) : r.set(i, t), t);
import { UmbRepositoryBase as y } from "@umbraco-cms/backoffice/repository";
import { CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_CONTEXT as p } from "./all-pages-detail.store.js";
import { A as w } from "./index.js";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
var h;
class A {
  constructor(r) {
    n(this, h);
    c(this, h, r);
  }
  async read(r) {
    if (!r) throw new Error("Unique is missing");
    const { data: t, error: e } = await f(
      s(this, h),
      w.getByKey({ path: { id: r } })
    );
    return e || !t ? { error: e } : { data: t };
  }
}
h = new WeakMap();
var a, o, m;
class g extends y {
  constructor(t) {
    super(t);
    n(this, a);
    n(this, o);
    n(this, m, new A(this));
    c(this, a, Promise.all([
      this.consumeContext(p, (e) => {
        c(this, o, e);
      }).asPromise()
    ]));
  }
  async requestByUnique(t) {
    if (!t) throw new Error("Unique is missing");
    await s(this, a);
    const { data: e, error: l } = await s(this, m).read(t);
    return e && s(this, o).append(e), { data: e, error: l, asObservable: () => s(this, o).byUnique(t) };
  }
  async byUnique(t) {
    if (!t) throw new Error("Unique is missing");
    return await s(this, a), s(this, o).byUnique(t);
  }
}
a = new WeakMap(), o = new WeakMap(), m = new WeakMap();
export {
  g as ContentAuditAllPagesDetailRepository,
  g as default
};
//# sourceMappingURL=all-pages-detail.repository.js.map
