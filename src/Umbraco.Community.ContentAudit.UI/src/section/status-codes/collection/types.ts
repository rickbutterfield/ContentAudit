import { UmbCollectionFilterModel } from "@umbraco-cms/backoffice/collection";

export interface ContentAuditStatusCodesCollectionFilterModel extends UmbCollectionFilterModel {
    statusCode?: number;
}