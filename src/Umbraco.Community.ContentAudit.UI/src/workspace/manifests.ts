import { ManifestWorkspace, ManifestWorkspaceView } from '@umbraco-cms/backoffice/workspace';
import { CONTENT_AUDIT_ENTITY_TYPE, CONTENT_AUDIT_WORKSPACE_ALIAS } from './constants';

const workspace: ManifestWorkspace = {
    type: 'workspace',
    alias: CONTENT_AUDIT_WORKSPACE_ALIAS,
    name: 'Content Audit Workspace',
    element: () => import('./workspace.element'),
    meta: {
        entityType: CONTENT_AUDIT_ENTITY_TYPE
    }
};

const workspaceViews: ManifestWorkspaceView[] = [
    {
        type: 'workspaceView',
        alias: 'Umb.WorkspaceView.ContentAudit.Scan',
        name: 'Content Audit Scan Workspace View',
        element: () => import('./views/overview.element'),
        meta: {
            label: 'Overview',
            pathname: 'overview',
            icon: 'icon-scan'
        },
        conditions: [
            {
                alias: 'Umb.Condition.WorkspaceAlias',
                match: CONTENT_AUDIT_WORKSPACE_ALIAS
            }
        ]
    },
    {
        type: 'workspaceView',
        alias: 'Umb.WorkspaceView.ContentAudit.Settings',
        name: 'Content Audit Settings Workspace View',
        element: () => import('./views/settings.element'),
        meta: {
            label: 'Settings',
            pathname: 'settings',
            icon: 'icon-settings-alt'
        },
        conditions: [
            {
                alias: 'Umb.Condition.WorkspaceAlias',
                match: CONTENT_AUDIT_WORKSPACE_ALIAS
            }
        ]
    }
];

export const manifests = [
    workspace,
    ...workspaceViews
]