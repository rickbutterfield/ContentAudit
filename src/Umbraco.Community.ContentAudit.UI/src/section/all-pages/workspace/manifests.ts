import { CONTENT_AUDIT_ALL_PAGES_COLLECTION_ALIAS } from '../collection';
import { AUDIT_ALL_PAGES_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.AllPages';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'All Pages Root Workspace',
        meta: {
            entityType: AUDIT_ALL_PAGES_ROOT_ENTITY_TYPE,
            headline: 'All Pages'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.AllPages.Collection',
        name: 'Content Audit All Pages Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_ALL_PAGES_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]