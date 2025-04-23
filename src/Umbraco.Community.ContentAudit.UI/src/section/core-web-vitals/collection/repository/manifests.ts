import { CONTENT_AUDIT_CORE_WEB_VITALS_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_CORE_WEB_VITALS_COLLECTION_REPOSITORY_ALIAS,
		name: 'Core Web Vitals Collection Repository',
		api: () => import('./core-web-vitals-collection.repository.js'),
	},
];
