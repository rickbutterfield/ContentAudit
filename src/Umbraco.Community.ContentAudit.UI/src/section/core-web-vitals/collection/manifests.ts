import { CONTENT_AUDIT_CORE_WEB_VITALS_COLLECTION_ALIAS } from './constants';
import { CONTENT_AUDIT_CORE_WEB_VITALS_COLLECTION_REPOSITORY_ALIAS } from './repository/constants';

import { manifests as collectionRepositoryManifests } from './repository/manifests';
import { manifests as collectionViewManifests } from './views/manifests';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'collection',
		kind: 'default',
		alias: CONTENT_AUDIT_CORE_WEB_VITALS_COLLECTION_ALIAS,
		name: 'Core Web Vitals Collection',
		element: () => import('./core-web-vitals.element'),
		meta: {
			repositoryAlias: CONTENT_AUDIT_CORE_WEB_VITALS_COLLECTION_REPOSITORY_ALIAS
		}
	},
	...collectionRepositoryManifests,
	...collectionViewManifests
];