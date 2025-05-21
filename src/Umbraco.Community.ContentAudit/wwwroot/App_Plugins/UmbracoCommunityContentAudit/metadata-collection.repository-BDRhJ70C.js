var l = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || l("Cannot " + t);
var s = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), n = (e, o, t) => o.has(e) ? l("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), c = (e, o, t, a) => (u(e, o, "write to private field"), a ? a.call(e, t) : o.set(e, t), t);
import { UmbRepositoryBase as f } from "@umbraco-cms/backoffice/repository";
import { A as p } from "./index-u7WOYzpE.js";
import { tryExecuteAndNotify as C } from "@umbraco-cms/backoffice/resources";
var r;
class y {
  constructor(o) {
    n(this, r);
    c(this, r, o);
  }
  async getCollection(o) {
    const { data: t, error: a } = await C(s(this, r), p.getPagesWithMissingMetadata(o));
    if (a)
      return { error: a };
    if (!t)
      return { data: { items: [], total: 0 } };
    const { items: d, total: m } = t;
    return { data: { items: d, total: m } };
  }
}
r = new WeakMap();
var i;
class x extends f {
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
//# sourceMappingURL=metadata-collection.repository-BDRhJ70C.js.map
