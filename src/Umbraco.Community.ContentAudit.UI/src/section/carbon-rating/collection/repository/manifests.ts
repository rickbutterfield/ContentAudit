import { CONTENT_AUDIT_CARBON_RATING_COLLECTION_REPOSITORY_ALIAS } from './constants.js';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'repository',
		alias: CONTENT_AUDIT_CARBON_RATING_COLLECTION_REPOSITORY_ALIAS,
		name: 'Carbon Rating Collection Repository',
		api: () => import('./carbon-rating-collection.repository.js'),
	},
];
