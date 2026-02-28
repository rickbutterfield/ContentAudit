import { UmbCollectionDataSource } from "@umbraco-cms/backoffice/collection";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { AuditService, CarbonRatingListItemDto } from "../../../../api";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import { ContentAuditCarbonRatingCollectionFilterModel } from "../types";

export class ContentAuditCarbonRatingCollectionDataSource implements UmbCollectionDataSource<CarbonRatingListItemDto> {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
		this.#host = host;
    }

	async getCollection(filter: ContentAuditCarbonRatingCollectionFilterModel) {
		const { data, error } = await tryExecute(this.#host, AuditService.getCarbonRatings({ query: { skip: filter.skip, take: filter.take, filter: filter.filter } }));

		if (error) {
			return { error };
		}

		if (!data) {
			return { data: { items: [], total: 0 } };
		}

		const { items, total } = data;

		return { data: { items: items, total } };
	}
}
