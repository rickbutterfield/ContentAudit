import { ManifestLocalization } from '@umbraco-cms/backoffice/localization';

export const manifests: Array<ManifestLocalization> = [
	{
		type: 'localization',
		alias: 'ContentAudit.Localization.En-GB',
		weight: -100,
		name: 'English (UK)',
		meta: {
			culture: 'en',
		},
        js: () => import('../lang/en'),
	},
]