import { AUDIT_ORPHANED_PAGES_ROOT_ENTITY_TYPE } from '../entity';

const workspaceAlias = 'Umb.Workspace.ContentAudit.OrphanedPages';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'workspace',
        alias: workspaceAlias,
        name: 'Orphaned Pages Root Workspace',
        js: () => import('./views/orphaned-pages-workspace-view.element'),
        meta: {
            entityType: AUDIT_ORPHANED_PAGES_ROOT_ENTITY_TYPE
        }
    }
]