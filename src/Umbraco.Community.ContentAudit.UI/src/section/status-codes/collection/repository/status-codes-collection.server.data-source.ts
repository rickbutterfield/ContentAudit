import { UmbCollectionDataSource } from "@umbraco-cms/backoffice/collection";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { AuditService, PageDto } from "../../../../api";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { ContentAuditStatusCodesCollectionFilterModel } from "../types";

export class ContentAuditStatusCodesCollectionDataSource implements UmbCollectionDataSource<PageDto> {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
		this.#host = host;
    }

	async getCollection(filter: ContentAuditStatusCodesCollectionFilterModel) {
		const { data, error } = await tryExecuteAndNotify(this.#host, AuditService.getLatestAuditData(filter));

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