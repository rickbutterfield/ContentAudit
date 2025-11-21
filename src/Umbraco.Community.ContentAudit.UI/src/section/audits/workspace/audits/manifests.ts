import { CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS } from '../constants';
import { UMB_WORKSPACE_CONDITION_ALIAS } from '@umbraco-cms/backoffice/workspace';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'workspace',
		kind: 'routable',
		alias: CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS,
		name: 'Audits Workspace',
		api: () => import('./audits-workspace.context'),
		meta: {
			entityType: 'audits',
		},
	},
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.ContentAudit.Audits.Overview',
		name: 'Audits Workspace Overview View',
		js: () => import('./views/audits-overview-workspace-view.element'),
		weight: 100,
		meta: {
			label: 'Overview',
			pathname: 'overview',
			icon: 'icon-dashboard',
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS,
			},
		],
	},
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.ContentAudit.Audits.Details',
		name: 'Audits Workspace Details View',
		js: () => import('./views/audits-details-workspace-view.element'),
		weight: 90,
		meta: {
			label: 'Details',
			pathname: 'details',
			icon: 'icon-info',
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS,
			},
		],
	},
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.ContentAudit.Audits.Issues',
		name: 'Audits Workspace Issues View',
		js: () => import('./views/audits-issues-workspace-view.element'),
		weight: 80,
		meta: {
			label: 'Issues',
			pathname: 'issues',
			icon: 'icon-alert',
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS,
			},
		],
	},
];
