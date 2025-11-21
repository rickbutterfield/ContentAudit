var l = (o) => {
  throw TypeError(o);
};
var u = (o, e, t) => e.has(o) || l("Cannot " + t);
var a = (o, e, t) => (u(o, e, "read from private field"), t ? t.call(o) : e.get(o)), n = (o, e, t) => e.has(o) ? l("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), c = (o, e, t, r) => (u(o, e, "write to private field"), r ? r.call(o, t) : e.set(o, t), t);
import { UmbRepositoryBase as d } from "@umbraco-cms/backoffice/repository";
import { A as m } from "./index.js";
import { tryExecute as p } from "@umbraco-cms/backoffice/resources";
var i;
class C {
  constructor(e) {
    n(this, i);
    c(this, i, e);
  }
  async getCollection(e) {
    const { data: t, error: r } = await p(
      a(this, i),
      m.getCollection({
        query: {
          skip: e.skip,
          take: e.take
        }
      })
    );
    return r ? { error: r } : t ? {
      data: {
        items: t.items,
        total: t.total
      }
    } : { data: { items: [], total: 0 } };
  }
}
i = new WeakMap();
var s;
class k extends d {
  constructor(t) {
    super(t);
    n(this, s);
    c(this, s, new C(t));
  }
  async requestCollection(t) {
    return a(this, s).getCollection(t);
  }
}
s = new WeakMap();
export {
  k as ContentAuditAuditsCollectionRepository,
  k as default
};
//# sourceMappingURL=audits-collection.repository.js.map
