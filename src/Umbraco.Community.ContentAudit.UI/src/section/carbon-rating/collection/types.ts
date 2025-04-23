import { UmbCollectionFilterModel } from "@umbraco-cms/backoffice/collection";

export interface ContentAuditCarbonRatingCollectionFilterModel extends UmbCollectionFilterModel {
    statusCode?: number;
}