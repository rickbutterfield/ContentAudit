import { CONTENT_AUDIT_AUDITS_COLLECTION_ALIAS } from '../../collection';
import { AUDIT_AUDITS_ROOT_ENTITY_TYPE } from '../../entity';

const CONTENT_AUDIT_AUDITS_ROOT_WORKSPACE_ALIAS = 'Umb.Workspace.ContentAudit.AuditsRoot';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'workspace',
		kind: 'default',
		alias: CONTENT_AUDIT_AUDITS_ROOT_WORKSPACE_ALIAS,
		name: 'Audits Root Workspace',
		meta: {
			entityType: AUDIT_AUDITS_ROOT_ENTITY_TYPE,
			headline: 'Audits'
		},
	},
	{
		type: 'workspaceView',
		kind: 'collection',
		alias: 'Umb.Workspace.Audits.Collection',
		name: 'Content Audit Audits Collection Workspace View',
		meta: {
			label: 'Collection',
			icon: 'icon-layers',
			pathname: 'collection',
			collectionAlias: CONTENT_AUDIT_AUDITS_COLLECTION_ALIAS
		},
		conditions: [
			{
				alias: "Umb.Condition.WorkspaceAlias",
				match: CONTENT_AUDIT_AUDITS_ROOT_WORKSPACE_ALIAS
			}
		]
	}
];
