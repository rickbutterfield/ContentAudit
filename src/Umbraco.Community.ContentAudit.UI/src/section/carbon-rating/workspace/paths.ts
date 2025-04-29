import { UMB_WORKSPACE_PATH_PATTERN } from "@umbraco-cms/backoffice/workspace";
import { AUDIT_CARBON_RATING_ROOT_ENTITY_TYPE } from "../entity";

export const AUDIT_CARBON_RATING_ROOT_WORKSPACE_PATH = UMB_WORKSPACE_PATH_PATTERN.generateAbsolute({
	sectionName: 'audit',
	entityType: AUDIT_CARBON_RATING_ROOT_ENTITY_TYPE,
});
