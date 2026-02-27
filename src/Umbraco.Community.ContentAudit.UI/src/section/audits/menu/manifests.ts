import { CONTENT_AUDIT_MENU_AUDIT_ALIAS } from '../../constants';
import { CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS } from '../workspace/constants';
import { UMB_WORKSPACE_CONDITION_ALIAS } from '@umbraco-cms/backoffice/workspace';

export const CONTENT_AUDIT_AUDITS_MENU_ITEM_ALIAS = 'ContentAudit.MenuItem.Audits';
const CONTENT_AUDIT_AUDITS_ROOT_WORKSPACE_ALIAS = 'ContentAudit.Workspace.AuditsRoot';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'menuItem',
		kind: 'tree',
		alias: CONTENT_AUDIT_AUDITS_MENU_ITEM_ALIAS,
		name: 'Audits Menu Item',
		weight: 12000,
		meta: {
			label: 'Audits',
			icon: 'icon-browser-window',
			treeAlias: 'ContentAudit.Tree.Audits',
			menus: [CONTENT_AUDIT_MENU_AUDIT_ALIAS],
		},
	},
	{
		type: 'workspaceContext',
		kind: 'menuStructure',
		alias: 'ContentAudit.Context.Audits.Menu.Structure',
		name: 'Content Audit Audits Menu Structure Workspace Context',
		api: () => import('./audits-menu-structure.context'),
		meta: {
			menuItemAlias: CONTENT_AUDIT_AUDITS_MENU_ITEM_ALIAS,
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS,
			},
		],
	},
	{
		type: 'workspaceFooterApp',
		kind: 'menuBreadcrumb',
		alias: 'ContentAudit.WorkspaceFooterApp.Audits.Breadcrumb',
		name: 'Content Audit Audits Breadcrumb Workspace Footer App',
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_AUDITS_WORKSPACE_ALIAS,
			},
		],
	},
	{
		type: 'workspaceContext',
		kind: 'menuStructure',
		alias: 'ContentAudit.Context.AuditsRoot.Menu.Structure',
		name: 'Content Audit Audits Root Menu Structure Workspace Context',
		api: () => import('./audits-menu-structure.context'),
		meta: {
			menuItemAlias: CONTENT_AUDIT_AUDITS_MENU_ITEM_ALIAS,
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_AUDITS_ROOT_WORKSPACE_ALIAS,
			},
		],
	},
	{
		type: 'workspaceFooterApp',
		kind: 'menuBreadcrumb',
		alias: 'ContentAudit.WorkspaceFooterApp.AuditsRoot.Breadcrumb',
		name: 'Content Audit Audits Root Breadcrumb Workspace Footer App',
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: CONTENT_AUDIT_AUDITS_ROOT_WORKSPACE_ALIAS,
			},
		],
	},
];
