import type { AuditAuditsEntityType, AuditAuditsRootEntityType } from '../entity.js';
import type { UmbTreeItemModel, UmbTreeRootModel } from '@umbraco-cms/backoffice/tree';

export interface AuditAuditsTreeItemModel extends UmbTreeItemModel {
	entityType: AuditAuditsEntityType;
}

export interface AuditAuditsTreeRootModel extends UmbTreeRootModel {
	entityType: AuditAuditsRootEntityType;
}
