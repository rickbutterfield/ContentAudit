import { CONTENT_AUDIT_ALL_PAGES_WORKSPACE_ALIAS } from '../constants';
import { UMB_WORKSPACE_CONDITION_ALIAS } from '@umbraco-cms/backoffice/workspace';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'workspace',
		kind: 'routable',
		alias: CONTENT_AUDIT_ALL_PAGES_WORKSPACE_ALIAS,
		name: 'All Pages Workspace',
		api: () => import('./all-pages-workspace.context'),
		meta: {
			entityType: 'all-pages',
		},
	},
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.ContentAudit.AllPages.Details',
		name: 'All Pages Workspace Details View',
		js: () => import('./views/all-pages-details-workspace-view.element'),
		weight: 100,
		meta: {
			label: '#general_details',
			pathname: 'details',
			icon: 'info',
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_ALL_PAGES_WORKSPACE_ALIAS,
			},
		],
	},
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.ContentAudit.AllPages.Links',
		name: 'All Pages Workspace Links View',
		js: () => import('./views/all-pages-links-workspace-view.element'),
		weight: 90,
		meta: {
			label: 'Links',
			pathname: 'links',
			icon: 'link'
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_ALL_PAGES_WORKSPACE_ALIAS,
			},
		],
	},
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.ContentAudit.AllPages.Images',
		name: 'All Pages Workspace Images View',
		js: () => import('./views/all-pages-images-workspace-view.element'),
		weight: 80,
		meta: {
			label: 'Images',
			pathname: 'images',
			icon: 'picture',
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_ALL_PAGES_WORKSPACE_ALIAS,
			},
		],
	},
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.ContentAudit.AllPages.Resources',
		name: 'All Pages Workspace Resources View',
		js: () => import('./views/all-pages-resources-workspace-view.element'),
		weight: 70,
		meta: {
			label: 'Resources',
			pathname: 'resources',
			icon: 'icon-script',
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_ALL_PAGES_WORKSPACE_ALIAS,
			},
		],
	},
	{
		type: 'workspaceView',
		alias: 'Umb.WorkspaceView.ContentAudit.AllPages.Issues',
		name: 'All Pages Workspace Issues View',
		js: () => import('./views/all-pages-issues-workspace-view.element'),
		weight: 60,
		meta: {
			label: 'Issues',
			pathname: 'issues',
			icon: 'alert',
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_ALL_PAGES_WORKSPACE_ALIAS,
			},
		],
	},
];
