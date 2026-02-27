import { UmbRepositoryBase as s } from "@umbraco-cms/backoffice/repository";
import { A as a } from "./index-QfE00jYe.js";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
class u {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async getCollection(t) {
    const { data: o, error: e } = await c(this.#t, a.getExternalLinks({ query: t }));
    if (e)
      return { error: e };
    if (!o)
      return { data: { items: [], total: 0 } };
    const { items: n, total: i } = o;
    return { data: { items: n, total: i } };
  }
}
class p extends s {
  #t;
  constructor(t) {
    super(t), this.#t = new u(t);
  }
  async requestCollection(t) {
    return this.#t.getCollection(t);
  }
}
export {
  p as ContentAuditOutboundLinksCollectionRepository,
  p as default
};
//# sourceMappingURL=outbound-links-collection.repository-CxZs66bL.js.map
