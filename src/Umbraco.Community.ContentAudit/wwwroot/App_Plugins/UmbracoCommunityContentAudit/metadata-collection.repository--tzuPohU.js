import { UmbRepositoryBase as s } from "@umbraco-cms/backoffice/repository";
import { A as n } from "./index-IUh43tSs.js";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
class l {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: e, error: o } = await c(this.#t, n.getPagesWithMissingMetadata({ query: t }));
    if (o)
      return { error: o };
    if (!e)
      return { data: { items: [], total: 0 } };
    const { items: a, total: i } = e;
    return { data: { items: a, total: i } };
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
  p as ContentAuditMetadataCollectionRepository,
  p as default
};
//# sourceMappingURL=metadata-collection.repository--tzuPohU.js.map
