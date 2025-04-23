import { CONTENT_AUDIT_CORE_WEB_VITALS_COLLECTION_ALIAS } from '../collection';
import { AUDIT_CORE_WEB_VITALS_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.CoreWebVitals';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'Core Web Vitals Root Workspace',
        meta: {
            entityType: AUDIT_CORE_WEB_VITALS_ROOT_ENTITY_TYPE,
            headline: 'Core Web Vitals'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.CoreWebVitals.Collection',
        name: 'Content Audit Core Web Vitals Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_CORE_WEB_VITALS_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]