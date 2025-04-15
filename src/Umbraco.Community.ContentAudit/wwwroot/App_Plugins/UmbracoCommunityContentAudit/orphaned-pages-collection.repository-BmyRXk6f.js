var l = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || l("Cannot " + t);
var n = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), i = (e, o, t) => o.has(e) ? l("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), c = (e, o, t, r) => (u(e, o, "write to private field"), r ? r.call(e, t) : o.set(e, t), t);
import { UmbRepositoryBase as m } from "@umbraco-cms/backoffice/repository";
import { A as f } from "./index-B3GcBdtE.js";
import { tryExecuteAndNotify as h } from "@umbraco-cms/backoffice/resources";
var s;
class C {
  constructor(o) {
    i(this, s);
    c(this, s, o);
  }
  async getCollection(o) {
    const { data: t, error: r } = await h(n(this, s), f.getOrphanedPages(o));
    if (r)
      return { error: r };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: d, total: p } = t;
    return { data: { items: d, total: p } };
  }
}
s = new WeakMap();
var a;
class O extends m {
  constructor(t) {
    super(t);
    i(this, a);
    c(this, a, new C(t));
  }
  async requestCollection(t) {
    return n(this, a).getCollection(t);
  }
}
a = new WeakMap();
export {
  O as ContentAuditOrphanedPagesCollectionRepository,
  O as default
};
//# sourceMappingURL=orphaned-pages-collection.repository-BmyRXk6f.js.map
