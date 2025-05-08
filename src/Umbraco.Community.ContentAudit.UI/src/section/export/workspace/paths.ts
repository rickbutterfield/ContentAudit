import { UMB_WORKSPACE_PATH_PATTERN } from "@umbraco-cms/backoffice/workspace";
import { AUDIT_EXPORT_ROOT_ENTITY_TYPE } from "../entity";

export const AUDIT_EXPORT_ROOT_WORKSPACE_PATH = UMB_WORKSPACE_PATH_PATTERN.generateAbsolute({
	sectionName: 'audit',
	entityType: AUDIT_EXPORT_ROOT_ENTITY_TYPE,
});
