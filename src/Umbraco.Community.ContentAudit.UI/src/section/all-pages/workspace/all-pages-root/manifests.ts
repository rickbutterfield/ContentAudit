import { CONTENT_AUDIT_ALL_PAGES_COLLECTION_ALIAS } from '../../collection';
import { AUDIT_ALL_PAGES_ROOT_ENTITY_TYPE } from '../../entity';
import { CONTENT_AUDIT_ALL_PAGES_ROOT_WORKSPACE_ALIAS } from '../constants';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: CONTENT_AUDIT_ALL_PAGES_ROOT_WORKSPACE_ALIAS,
        name: 'All Pages Root Workspace',
        meta: {
            entityType: AUDIT_ALL_PAGES_ROOT_ENTITY_TYPE,
            headline: 'All Pages',
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
                match: CONTENT_AUDIT_ALL_PAGES_ROOT_WORKSPACE_ALIAS
            }
        ]
    }
]