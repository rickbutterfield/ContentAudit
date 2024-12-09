import { AUDIT_DUPLICATE_CONTENT_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.DuplicateContent';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        alias: workspaceAlias,
        name: 'Duplicate Content Root Workspace',
        js: () => import('./views/duplicate-content-workspace-view.element'),
        meta: {
            entityType: AUDIT_DUPLICATE_CONTENT_ROOT_ENTITY_TYPE
        }
    }
]