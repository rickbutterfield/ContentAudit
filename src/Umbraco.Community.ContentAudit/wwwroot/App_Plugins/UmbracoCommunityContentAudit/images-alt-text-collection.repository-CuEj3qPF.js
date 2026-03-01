import { UmbRepositoryBase as a } from "@umbraco-cms/backoffice/repository";
import { A as n } from "./index-stcFC0Hx.js";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
class l {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: e, error: o } = await c(this.#t, n.getAllImages({ query: t }));
    if (o)
      return { error: o };
    if (!e)
      return { data: { items: [], total: 0 } };
    const { items: s, total: i } = e;
    return { data: { items: s, total: i } };
  }
}
class p extends a {
  #t;
  constructor(t) {
    super(t), this.#t = new l(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  p as ContentAuditImagesAltTextCollectionRepository,
  p as default
};
//# sourceMappingURL=images-alt-text-collection.repository-CuEj3qPF.js.map
