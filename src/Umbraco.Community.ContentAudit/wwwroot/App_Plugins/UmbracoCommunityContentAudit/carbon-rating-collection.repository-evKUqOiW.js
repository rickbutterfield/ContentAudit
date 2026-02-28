import { UmbRepositoryBase as s } from "@umbraco-cms/backoffice/repository";
import { A as n } from "./index-CTGZ8jTt.js";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
class l {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: e, error: o } = await c(this.#t, n.getPagesWithMissingMetadata({ query: { skip: t.skip, take: t.take, filter: t.filter } }));
    if (o)
      return { error: o };
    if (!e)
      return { data: { items: [], total: 0 } };
    const { items: i, total: a } = e;
    return { data: { items: i, total: a } };
  }
}
class p extends s {
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
//# sourceMappingURL=carbon-rating-collection.repository-evKUqOiW.js.map
