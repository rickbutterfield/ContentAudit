var l = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || l("Cannot " + t);
var a = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), n = (e, o, t) => o.has(e) ? l("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), c = (e, o, t, r) => (u(e, o, "write to private field"), r ? r.call(e, t) : o.set(e, t), t);
import { UmbRepositoryBase as A } from "@umbraco-cms/backoffice/repository";
import { A as f } from "./index-BtsMjuJm.js";
import { tryExecuteAndNotify as p } from "@umbraco-cms/backoffice/resources";
var s;
class C {
  constructor(o) {
    n(this, s);
    c(this, s, o);
  }
  async getCollection(o) {
    const { data: t, error: r } = await p(a(this, s), f.getAllImages(o));
    if (r)
      return { error: r };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: m, total: d } = t;
    return { data: { items: m, total: d } };
  }
}
s = new WeakMap();
var i;
class I extends A {
  constructor(t) {
    super(t);
    n(this, i);
    c(this, i, new C(t));
  }
  async requestCollection(t) {
    return a(this, i).getCollection(t);
  }
}
i = new WeakMap();
export {
  I as ContentAuditImagesAltTextCollectionRepository,
  I as default
};
//# sourceMappingURL=images-alt-text-collection.repository-tRauFq3G.js.map
