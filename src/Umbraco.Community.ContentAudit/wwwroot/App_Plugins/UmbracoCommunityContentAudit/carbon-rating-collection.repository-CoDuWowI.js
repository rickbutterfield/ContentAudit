var l = (o) => {
  throw TypeError(o);
};
var u = (o, e, t) => e.has(o) || l("Cannot " + t);
var n = (o, e, t) => (u(o, e, "read from private field"), t ? t.call(o) : e.get(o)), s = (o, e, t) => e.has(o) ? l("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), c = (o, e, t, r) => (u(o, e, "write to private field"), r ? r.call(o, t) : e.set(o, t), t);
import { UmbRepositoryBase as C } from "@umbraco-cms/backoffice/repository";
import { A as f } from "./index-D3Uy3Ios.js";
import { tryExecuteAndNotify as p } from "@umbraco-cms/backoffice/resources";
var i;
class y {
  constructor(e) {
    s(this, i);
    c(this, i, e);
  }
  async getCollection(e) {
    const { data: t, error: r } = await p(n(this, i), f.getLatestAuditData(e));
    if (r)
      return { error: r };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: d, total: m } = t;
    return { data: { items: d, total: m } };
  }
}
i = new WeakMap();
var a;
class b extends C {
  constructor(t) {
    super(t);
    s(this, a);
    c(this, a, new y(t));
  }
  async requestCollection(t) {
    return n(this, a).getCollection(t);
  }
}
a = new WeakMap();
export {
  b as ContentAuditCarbonRatingCollectionRepository,
  b as default
};
//# sourceMappingURL=carbon-rating-collection.repository-CoDuWowI.js.map
