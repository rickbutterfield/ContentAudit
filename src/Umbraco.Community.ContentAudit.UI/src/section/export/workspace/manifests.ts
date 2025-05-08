import { AUDIT_EXPORT_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.Export';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        kind: 'default',
        alias: workspaceAlias,
        name: 'Export Root Workspace',
        element: () => import('./views/export.element'),
        meta: {
            entityType: AUDIT_EXPORT_ROOT_ENTITY_TYPE,
            headline: 'Export'
        }
    }
]