import { AUDIT_AUDITS_ENTITY_TYPE, AUDIT_AUDITS_ROOT_ENTITY_TYPE } from '../entity';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'repository',
        alias: 'Umb.Repository.ContentAudit.Audits',
        name: 'Content Audit Audits Repository',
        api: () => import('./audits-tree.repository.js'),
    },
    {
        type: 'tree',
        kind: 'default',
        alias: 'Umb.Tree.ContentAudit.Audits',
        name: 'Content Audit Audits Tree',
        meta: {
            repositoryAlias: 'Umb.Repository.ContentAudit.Audits',
        }
    },
    {
        type: 'treeItem',
        kind: 'default',
        alias: 'Umb.TreeItem.ContentAudit.Audits',
        name: 'Content Audit Audits Tree Item',
        forEntityTypes: [AUDIT_AUDITS_ENTITY_TYPE, AUDIT_AUDITS_ROOT_ENTITY_TYPE]
    }
];