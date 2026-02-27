import { UmbTreeServerDataSourceBase as a, UmbTreeRepositoryBase as n } from "@umbraco-cms/backoffice/tree";
import { a as o, b as i, A as r } from "./index-DCtP17IU.js";
class u extends a {
  constructor(t) {
    super(t, {
      getRootItems: s,
      getChildrenOf: d,
      getAncestorsOf: c,
      mapper: l
    });
  }
}
const s = () => r.root({}), d = (e) => e.parent.unique === null ? s() : r.children({
  path: { parentId: e.parent.unique }
}), c = () => Promise.resolve({ data: [] }), l = (e) => ({
  unique: e.id,
  parent: {
    unique: e.parent?.id || null,
    entityType: i
  },
  name: e.name,
  icon: "icon-dashboard",
  entityType: o,
  isFolder: e.isFolder,
  hasChildren: e.hasChildren
});
class m extends n {
  constructor(t) {
    super(t, u);
  }
  async requestTreeRoot() {
    const { data: t } = await this._treeSource.getRootItems({ skip: 0, take: 0 });
    return { data: {
      unique: null,
      entityType: "audits-root",
      name: "Audits",
      hasChildren: t ? t.total > 0 : !1,
      icon: "icon-scan",
      isFolder: !1
    } };
  }
}
export {
  m as AuditAuditsTreeRepository,
  m as api
};
//# sourceMappingURL=audits-tree.repository-2Oqb-8eu.js.map
