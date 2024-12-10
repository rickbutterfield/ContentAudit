import { AUDIT_ISSUES_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.Issues';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        alias: workspaceAlias,
        name: 'Issues Root Workspace',
        js: () => import('./views/issues-workspace-view.element'),
        meta: {
            entityType: AUDIT_ISSUES_ROOT_ENTITY_TYPE
        }
    }
]