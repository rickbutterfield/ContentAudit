﻿import { CONTENT_AUDIT_CARBON_RATING_COLLECTION_ALIAS } from './constants';
import { CONTENT_AUDIT_CARBON_RATING_COLLECTION_REPOSITORY_ALIAS } from './repository/constants';

import { manifests as collectionRepositoryManifests } from './repository/manifests';
import { manifests as collectionViewManifests } from './views/manifests';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'collection',
		kind: 'default',
		alias: CONTENT_AUDIT_CARBON_RATING_COLLECTION_ALIAS,
		name: 'Carbon Rating Collection',
		element: () => import('./carbon-rating.element'),
		meta: {
			repositoryAlias: CONTENT_AUDIT_CARBON_RATING_COLLECTION_REPOSITORY_ALIAS
		}
	},
	...collectionRepositoryManifests,
	...collectionViewManifests
];