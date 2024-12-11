import { ManifestWorkspaceView } from '@umbraco-cms/backoffice/workspace';
import { CONTENT_AUDIT_ISSUES_COLLECTION_ALIAS } from '../collection';
import { AUDIT_ISSUES_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.Issues';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'Issues Root Workspace',
        meta: {
            entityType: AUDIT_ISSUES_ROOT_ENTITY_TYPE,
            headline: 'Issues'
        }
    },
    {
        type: 'workspaceView',
        kind: 'collection',
        alias: 'Umb.Workspace.Issues.Collection',
        name: 'Content Audit Issues Collection Workspace View',
        meta: {
            label: 'Collection',
            icon: 'icon-layers',
            pathname: 'collection',
            collectionAlias: CONTENT_AUDIT_ISSUES_COLLECTION_ALIAS
        },
        conditions: [
            {
                alias: "Umb.Condition.WorkspaceAlias",
                match: workspaceAlias
            }
        ]
    }
]