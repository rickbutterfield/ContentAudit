import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { AuditService, GetAllIssuesResponse, GetHealthScoreResponse, GetLatestAuditOverviewResponse, GetPagesWithMissingMetadataResponse } from "../../api";

export interface AuditDataSource {
    getLatestAuditOverview(): Promise<UmbDataSourceResponse<GetLatestAuditOverviewResponse>>
    getPagesWithMissingMetadata(): Promise<UmbDataSourceResponse<GetPagesWithMissingMetadataResponse>>
    getTopIssues(): Promise<UmbDataSourceResponse<GetAllIssuesResponse>>
    getHealthScore(): Promise<UmbDataSourceResponse<GetHealthScoreResponse>>
}

export class ContentAuditDataSource implements AuditDataSource {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async getLatestAuditOverview(): Promise<UmbDataSourceResponse<GetLatestAuditOverviewResponse>> {
        return await tryExecuteAndNotify(this.#host, AuditService.getLatestAuditOverview());
    }

    async getPagesWithMissingMetadata(): Promise<UmbDataSourceResponse<GetPagesWithMissingMetadataResponse>> {
        return await tryExecuteAndNotify(this.#host, AuditService.getPagesWithMissingMetadata());
    }

    async getTopIssues(): Promise<UmbDataSourceResponse<GetAllIssuesResponse>> {
        return await tryExecuteAndNotify(this.#host, AuditService.getAllIssues({ skip: 0, take: 5 }));
    }

    async getHealthScore(): Promise<UmbDataSourceResponse<GetHealthScoreResponse>> {
        return await tryExecuteAndNotify(this.#host, AuditService.getHealthScore());
    }
}