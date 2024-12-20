import { CONTENT_AUDIT_METADATA_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_METADATA_COLLECTION_REPOSITORY_ALIAS,
		name: 'Metadata Collection Repository',
		api: () => import('./metadata-collection.repository.js'),
	},
];
