var m = (e) => {
  throw TypeError(e);
};
var l = (e, r, t) => r.has(e) || m("Cannot " + t);
var s = (e, r, t) => (l(e, r, "read from private field"), t ? t.call(e) : r.get(e)), n = (e, r, t) => r.has(e) ? m("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, t), h = (e, r, t, i) => (l(e, r, "write to private field"), i ? i.call(e, t) : r.set(e, t), t);
import { UmbRepositoryBase as d } from "@umbraco-cms/backoffice/repository";
import { CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_CONTEXT as w } from "./all-pages-detail.store.js";
import { A as f } from "./index.js";
import { tryExecute as p } from "@umbraco-cms/backoffice/resources";
var c;
class A {
  constructor(r) {
    n(this, c);
    h(this, c, r);
  }
  async read(r) {
    if (!r) throw new Error("Unique is missing");
    const { data: t, error: i } = await p(
      s(this, c),
      f.getByKey({ query: { unique: r } })
    );
    return i || !t ? { error: i } : { data: t };
  }
}
c = new WeakMap();
var a, o, u;
class g extends d {
  constructor(t) {
    super(t);
    n(this, a);
    n(this, o);
    n(this, u, new A(this));
    h(this, a, Promise.all([
      this.consumeContext(w, (i) => {
        h(this, o, i);
      }).asPromise()
    ]));
  }
  async requestByUnique(t) {
    if (!t) throw new Error("Unique is missing");
    await s(this, a);
    const { data: i, error: y } = await s(this, u).read(t);
    return i && s(this, o).append(i), { data: i, error: y, asObservable: () => s(this, o).byUnique(t) };
  }
  async byUnique(t) {
    if (!t) throw new Error("Unique is missing");
    return await s(this, a), s(this, o).byUnique(t);
  }
}
a = new WeakMap(), o = new WeakMap(), u = new WeakMap();
export {
  g as ContentAuditAllPagesDetailRepository,
  g as default
};
//# sourceMappingURL=all-pages-detail.repository.js.map
