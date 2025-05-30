var m = (i) => {
  throw TypeError(i);
};
var d = (i, r, t) => r.has(i) || m("Cannot " + t);
var s = (i, r, t) => (d(i, r, "read from private field"), t ? t.call(i) : r.get(i)), n = (i, r, t) => r.has(i) ? m("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(i) : r.set(i, t), h = (i, r, t, e) => (d(i, r, "write to private field"), e ? e.call(i, t) : r.set(i, t), t);
import { UmbRepositoryBase as A } from "@umbraco-cms/backoffice/repository";
import { CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_CONTEXT as f } from "./all-pages-detail.store-CNksov1D.js";
import { A as w } from "./index-Ca1vHQCw.js";
import { tryExecuteAndNotify as y } from "@umbraco-cms/backoffice/resources";
var c;
class p {
  constructor(r) {
    n(this, c);
    h(this, c, r);
  }
  async read(r) {
    if (!r) throw new Error("Unique is missing");
    const { data: t, error: e } = await y(
      s(this, c),
      w.getLatestPageAuditData({ unique: r })
    );
    return e || !t ? { error: e } : { data: t };
  }
}
c = new WeakMap();
var o, a, u;
class b extends A {
  constructor(t) {
    super(t);
    n(this, o);
    n(this, a);
    n(this, u, new p(this));
    h(this, o, Promise.all([
      this.consumeContext(f, (e) => {
        h(this, a, e);
      }).asPromise()
    ]));
  }
  async requestByUnique(t) {
    if (!t) throw new Error("Unique is missing");
    await s(this, o);
    const { data: e, error: l } = await s(this, u).read(t);
    return e && s(this, a).append(e), { data: e, error: l, asObservable: () => s(this, a).byUnique(t) };
  }
  async byUnique(t) {
    if (!t) throw new Error("Unique is missing");
    return await s(this, o), s(this, a).byUnique(t);
  }
}
o = new WeakMap(), a = new WeakMap(), u = new WeakMap();
export {
  b as ContentAuditAllPagesDetailRepository,
  b as default
};
//# sourceMappingURL=all-pages-detail.repository-Cj5JYFkI.js.map
