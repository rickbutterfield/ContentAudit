import { ManifestWorkspaceView } from '@umbraco-cms/backoffice/workspace';

const workspaceView: ManifestWorkspaceView = {
    type: 'workspaceView',
    alias: 'Umbraco.Community.ContentAudit.Workspace',
    name: 'ContentAudit Workspace',
    js: () => import('./views/contentaudit-workspace-view.js'),
    weight: 150,
    meta: {
        label: 'Audit',
        pathname: 'audit',
        icon: 'icon-scan'
    },
    conditions: [
        {
            alias: 'Umb.Condition.WorkspaceAlias',
            match: 'Umb.Workspace.Document'
        },
    ]
}

export const manifests = [workspaceView];