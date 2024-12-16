import { CONTENT_AUDIT_IMAGES_ALT_TEXT_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_IMAGES_ALT_TEXT_COLLECTION_REPOSITORY_ALIAS,
		name: 'Images Alt Text Collection Repository',
		api: () => import('./images-alt-text-collection.repository.js'),
	},
];
