﻿import { UMB_WORKSPACE_PATH_PATTERN } from "@umbraco-cms/backoffice/workspace";
import { AUDIT_INBOUND_LINKS_ROOT_ENTITY_TYPE } from "../entity";

export const AUDIT_INBOUND_LINKS_ROOT_WORKSPACE_PATH = UMB_WORKSPACE_PATH_PATTERN.generateAbsolute({
	sectionName: 'audit',
	entityType: AUDIT_INBOUND_LINKS_ROOT_ENTITY_TYPE,
});
