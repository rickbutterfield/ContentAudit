import { UmbCollectionDataSource, UmbCollectionFilterModel } from "@umbraco-cms/backoffice/collection";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { IssueDto, AuditService } from "../../../../api";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";

export class ContentAuditIssuesCollectionDataSource implements UmbCollectionDataSource<IssueDto> {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
		this.#host = host;
	}

	async getCollection(filter: UmbCollectionFilterModel) {
		const { data, error } = await tryExecuteAndNotify(this.#host, AuditService.getAllIssues(filter));

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