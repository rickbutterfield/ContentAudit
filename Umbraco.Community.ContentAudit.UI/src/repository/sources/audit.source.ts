import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { AuditService, GetLatestAuditOverviewResponse } from "../../api";

export interface AuditDataSource {
    getLatestAuditOverview(): Promise<UmbDataSourceResponse<GetLatestAuditOverviewResponse>>
}

export class ContentAuditDataSource implements AuditDataSource {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async getLatestAuditOverview(): Promise<UmbDataSourceResponse<GetLatestAuditOverviewResponse>> {
        return await tryExecuteAndNotify(this.#host, AuditService.getLatestAuditOverview());
    }
}