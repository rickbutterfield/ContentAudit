import { UMB_WORKSPACE_PATH_PATTERN } from "@umbraco-cms/backoffice/workspace";
import { AUDIT_IMAGES_ALT_TEXT_ROOT_ENTITY_TYPE } from "../entity";

export const AUDIT_OVERVIEW_ROOT_WORKSPACE_PATH = UMB_WORKSPACE_PATH_PATTERN.generateAbsolute({
	sectionName: 'audit',
	entityType: AUDIT_IMAGES_ALT_TEXT_ROOT_ENTITY_TYPE,
});
