import { CONTENT_AUDIT_ISSUES_COLLECTION_ALIAS } from '../../collection';
import { AUDIT_ISSUES_ROOT_ENTITY_TYPE } from '../../entity';
import { CONTENT_AUDIT_ISSUES_ROOT_WORKSPACE_ALIAS } from '../constants';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: CONTENT_AUDIT_ISSUES_ROOT_WORKSPACE_ALIAS,
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
                match: CONTENT_AUDIT_ISSUES_ROOT_WORKSPACE_ALIAS
            }
        ]
    }
]