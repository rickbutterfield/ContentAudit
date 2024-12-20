import { CONTENT_AUDIT_ISSUES_DETAIL_REPOSITORY_ALIAS, CONTENT_AUDIT_ISSUES_DETAIL_STORE_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_ISSUES_DETAIL_REPOSITORY_ALIAS,
		name: 'Issues Detail Repository',
		api: () => import('./issues-detail.repository'),
	},
	{
		type: 'store',
		alias: CONTENT_AUDIT_ISSUES_DETAIL_STORE_ALIAS,
		name: 'Issues Detail Store',
		api: () => import('./issues-detail.store'),
	},
];
