var u = (o) => {
  throw TypeError(o);
};
var l = (o, e, t) => e.has(o) || u("Cannot " + t);
var s = (o, e, t) => (l(o, e, "read from private field"), t ? t.call(o) : e.get(o)), a = (o, e, t) => e.has(o) ? u("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), c = (o, e, t, r) => (l(o, e, "write to private field"), r ? r.call(o, t) : e.set(o, t), t);
import { UmbRepositoryBase as f } from "@umbraco-cms/backoffice/repository";
import { A as p } from "./index-BCc-rpq4.js";
import { tryExecuteAndNotify as C } from "@umbraco-cms/backoffice/resources";
var n;
class y {
  constructor(e) {
    a(this, n);
    c(this, n, e);
  }
  async getCollection(e) {
    const { data: t, error: r } = await C(s(this, n), p.getExternalLinks(e));
    if (r)
      return { error: r };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: d, total: m } = t;
    return { data: { items: d, total: m } };
  }
}
n = new WeakMap();
var i;
class g extends f {
  constructor(t) {
    super(t);
    a(this, i);
    c(this, i, new y(t));
  }
  async requestCollection(t) {
    return s(this, i).getCollection(t);
  }
}
i = new WeakMap();
export {
  g as ContentAuditOutboundLinksCollectionRepository,
  g as default
};
//# sourceMappingURL=outbound-links-collection.repository-BjE0_nhC.js.map
