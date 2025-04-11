import { CONTENT_AUDIT_INBOUND_LINKS_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_INBOUND_LINKS_COLLECTION_REPOSITORY_ALIAS,
		name: 'Inbound Links Collection Repository',
		api: () => import('./inbound-links-collection.repository.js'),
	},
];
