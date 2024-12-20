import { CONTENT_AUDIT_ISSUES_WORKSPACE_ALIAS } from '../constants';
import { UMB_WORKSPACE_CONDITION_ALIAS } from '@umbraco-cms/backoffice/workspace';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'workspace',
		kind: 'routable',
		alias: CONTENT_AUDIT_ISSUES_WORKSPACE_ALIAS,
		name: 'Issues Workspace',
		api: () => import('./issues-workspace.context'),
		meta: {
			entityType: 'issues',
		},
	},
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.ContentAudit.Issues.Details',
		name: 'Issues Workspace Details View',
		js: () => import('./views/issues-details-workspace-view.element'),
		weight: 90,
		meta: {
			label: '#general_details',
			pathname: 'details',
			icon: 'edit',
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_ISSUES_WORKSPACE_ALIAS,
			},
		],
	}
];
