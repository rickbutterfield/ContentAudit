import { UmbRepositoryBase as i } from "@umbraco-cms/backoffice/repository";
import { CONTENT_AUDIT_ISSUES_DETAIL_STORE_CONTEXT as o } from "./issues-detail.store-C6E-MPVJ.js";
import { I as a } from "./index-DCtP17IU.js";
import { tryExecute as n } from "@umbraco-cms/backoffice/resources";
class h {
  #t;
  constructor(t) {
    this.#t = t;
  }
  async read(t) {
    if (!t) throw new Error("Unique is missing");
    const { data: s, error: r } = await n(
      this.#t,
      a.getIssue({ path: { id: t } })
    );
    return r || !s ? { error: r } : { data: s };
  }
}
class p extends i {
  #t;
  #s;
  #r = new h(this);
  constructor(t) {
    super(t), this.#t = Promise.all([
      this.consumeContext(o, (s) => {
        this.#s = s;
      }).asPromise()
    ]);
  }
  async requestByUnique(t) {
    if (!t) throw new Error("Unique is missing");
    await this.#t;
    const { data: s, error: r } = await this.#r.read(t);
    return s && this.#s && this.#s.append(s), { data: s, error: r, asObservable: () => this.#s.byUnique(t) };
  }
  async byUnique(t) {
    if (!t) throw new Error("Unique is missing");
    return await this.#t, this.#s.byUnique(t);
  }
}
export {
  p as ContentAuditIssuesDetailRepository,
  p as default
};
//# sourceMappingURL=issues-detail.repository-AJBUMSMs.js.map
