import { UmbRepositoryBase as n } from "@umbraco-cms/backoffice/repository";
import { A as s } from "./index-IUh43tSs.js";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
class l {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: o, error: e } = await c(this.#t, s.getLatestAuditData({ query: t }));
    if (e)
      return { error: e };
    if (!o)
      return { data: { items: [], total: 0 } };
    const { items: a, total: i } = o;
    return { data: { items: a, total: i } };
  }
}
class C extends n {
  #t;
  constructor(t) {
    super(t), this.#t = new l(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  C as ContentAuditCarbonRatingCollectionRepository,
  C as default
};
//# sourceMappingURL=carbon-rating-collection.repository-CiJtQKJM.js.map
