import { UmbRepositoryBase as n } from "@umbraco-cms/backoffice/repository";
import { A as s } from "./index-B8flLQWi.js";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
class l {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: o, error: e } = await c(this.#t, s.getCarbonRatings({ query: { skip: t.skip, take: t.take, filter: t.filter } }));
    if (e)
      return { error: e };
    if (!o)
      return { data: { items: [], total: 0 } };
    const { items: i, total: a } = o;
    return { data: { items: i, total: a } };
  }
}
class p extends n {
  #t;
  constructor(t) {
    super(t), this.#t = new l(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  p as ContentAuditCarbonRatingCollectionRepository,
  p as default
};
//# sourceMappingURL=carbon-rating-collection.repository-C-sSj6C-.js.map
