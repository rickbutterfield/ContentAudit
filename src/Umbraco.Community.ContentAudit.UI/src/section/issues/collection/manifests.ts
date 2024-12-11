import { CONTENT_AUDIT_ISSUES_COLLECTION_ALIAS } from './constants';
import { CONTENT_AUDIT_ISSUES_COLLECTION_REPOSITORY_ALIAS } from './repository/constants';

import { manifests as collectionRepositoryManifests } from './repository/manifests';
import { manifests as collectionViewManifests } from './views/manifests';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'collection',
		kind: 'default',
		alias: CONTENT_AUDIT_ISSUES_COLLECTION_ALIAS,
		name: 'Issues Collection',
		element: () => import('./issues.element'),
		meta: {
			repositoryAlias: CONTENT_AUDIT_ISSUES_COLLECTION_REPOSITORY_ALIAS
		}
	},
	...collectionRepositoryManifests,
	...collectionViewManifests
];