var l = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || l("Cannot " + t);
var s = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), n = (e, o, t) => o.has(e) ? l("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), c = (e, o, t, r) => (u(e, o, "write to private field"), r ? r.call(e, t) : o.set(e, t), t);
import { UmbRepositoryBase as p } from "@umbraco-cms/backoffice/repository";
import { A as C } from "./index-BPPQFFw-.js";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
var a;
class y {
  constructor(o) {
    n(this, a);
    c(this, a, o);
  }
  async getCollection(o) {
    const { data: t, error: r } = await f(s(this, a), C.getPagesWithMissingMetadata({ query: o }));
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
class x extends p {
  constructor(t) {
    super(t);
    n(this, i);
    c(this, i, new y(t));
  }
  async requestCollection(t) {
    return s(this, i).getCollection(t);
  }
}
i = new WeakMap();
export {
  x as ContentAuditMetadataCollectionRepository,
  x as default
};
//# sourceMappingURL=metadata-collection.repository-DHU6U4C8.js.map
