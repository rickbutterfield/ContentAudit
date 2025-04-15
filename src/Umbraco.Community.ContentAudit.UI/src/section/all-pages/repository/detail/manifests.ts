import { CONTENT_AUDIT_ALL_PAGES_DETAIL_REPOSITORY_ALIAS, CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_ALL_PAGES_DETAIL_REPOSITORY_ALIAS,
		name: 'All Pages Detail Repository',
		api: () => import('./all-pages-detail.repository'),
	},
	{
		type: 'store',
		alias: CONTENT_AUDIT_ALL_PAGES_DETAIL_STORE_ALIAS,
		name: 'All Pages Detail Store',
		api: () => import('./all-pages-detail.store'),
	},
];
