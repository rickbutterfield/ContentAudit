import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbApi } from "@umbraco-cms/backoffice/extension-api";
import { UmbTreeRepositoryBase } from "@umbraco-cms/backoffice/tree";
import { AuditAuditsTreeServerDataSource } from "./audits-tree.server.data-source";
import { AuditAuditsTreeItemModel, AuditAuditsTreeRootModel } from "./types";

export class AuditAuditsTreeRepository
    extends UmbTreeRepositoryBase<AuditAuditsTreeItemModel, AuditAuditsTreeRootModel>
    implements UmbApi
{
    constructor(host: UmbControllerHost) {
        super(host, AuditAuditsTreeServerDataSource);
    }

    async requestTreeRoot() {
        const { data: treeRootData } = await this._treeSource.getRootItems({ skip: 0, take: 0 });
        const hasChildren = treeRootData ? treeRootData.total > 0 : false;

        const data: AuditAuditsTreeRootModel = {
            unique: null,
            entityType: 'audits-root',
            name: 'Audits',
            hasChildren,
            icon: 'icon-scan',
            isFolder: false
        }

        return { data };
    }
}

export { AuditAuditsTreeRepository as api };