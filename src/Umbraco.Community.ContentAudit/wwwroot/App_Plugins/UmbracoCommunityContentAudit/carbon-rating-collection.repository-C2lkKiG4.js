var l = (o) => {
  throw TypeError(o);
};
var u = (o, e, t) => e.has(o) || l("Cannot " + t);
var n = (o, e, t) => (u(o, e, "read from private field"), t ? t.call(o) : e.get(o)), s = (o, e, t) => e.has(o) ? l("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), c = (o, e, t, r) => (u(o, e, "write to private field"), r ? r.call(o, t) : e.set(o, t), t);
import { UmbRepositoryBase as C } from "@umbraco-cms/backoffice/repository";
import { A as p } from "./index-BPPQFFw-.js";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
var a;
class y {
  constructor(e) {
    s(this, a);
    c(this, a, e);
  }
  async getCollection(e) {
    const { data: t, error: r } = await f(n(this, a), p.getLatestAuditData({ query: e }));
    if (r)
      return { error: r };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: d, total: m } = t;
    return { data: { items: d, total: m } };
  }
}
a = new WeakMap();
var i;
class b extends C {
  constructor(t) {
    super(t);
    s(this, i);
    c(this, i, new y(t));
  }
  async requestCollection(t) {
    return n(this, i).getCollection(t);
  }
}
i = new WeakMap();
export {
  b as ContentAuditCarbonRatingCollectionRepository,
  b as default
};
//# sourceMappingURL=carbon-rating-collection.repository-C2lkKiG4.js.map
