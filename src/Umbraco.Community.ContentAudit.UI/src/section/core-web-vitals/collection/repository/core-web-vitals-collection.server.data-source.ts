import { UmbCollectionDataSource } from "@umbraco-cms/backoffice/collection";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { AuditService, PageAnalysisDto } from "../../../../api";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import { ContentAuditCoreWebVitalsCollectionFilterModel } from "../types";

export class ContentAuditCoreWebVitalsCollectionDataSource implements UmbCollectionDataSource<PageAnalysisDto> {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
		this.#host = host;
    }

	async getCollection(filter: ContentAuditCoreWebVitalsCollectionFilterModel) {
		const { data, error } = await tryExecute(this.#host, AuditService.getLatestAuditData({ query: filter }));

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