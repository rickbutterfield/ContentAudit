import { AUDIT_STATUS_CODES_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.StatusCodes';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        alias: workspaceAlias,
        name: 'Status Codes Root Workspace',
        js: () => import('./views/status-codes-workspace-view.element'),
        meta: {
            entityType: AUDIT_STATUS_CODES_ROOT_ENTITY_TYPE
        }
    }
]