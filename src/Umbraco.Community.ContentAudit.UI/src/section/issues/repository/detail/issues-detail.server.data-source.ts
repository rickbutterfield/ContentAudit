import { UmbReadDetailDataSource } from "@umbraco-cms/backoffice/repository";
import { AuditService, IssueDto } from "../../../../api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";

export class ContentAuditIssuesServerDataSource implements UmbReadDetailDataSource<IssueDto> {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

	async read(unique: string) {
		if (!unique) throw new Error('Unique is missing');

		const { data, error } = await tryExecuteAndNotify(
			this.#host,
			AuditService.getIssue({ issueGuid: unique })
		);

		if (error || !data) {
			return { error };
		}

		return { data: data };
	}
}