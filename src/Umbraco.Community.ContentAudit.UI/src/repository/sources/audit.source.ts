import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
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
        return await tryExecute(this.#host, AuditService.getLatestAuditOverview());
    }

    async getPagesWithMissingMetadata(): Promise<UmbDataSourceResponse<GetPagesWithMissingMetadataResponse>> {
        return await tryExecute(this.#host, AuditService.getPagesWithMissingMetadata());
    }

    async getTopIssues(): Promise<UmbDataSourceResponse<GetAllIssuesResponse>> {
        return await tryExecute(this.#host, AuditService.getAllIssues({
            query: { skip: 0, take: 5 }
        }));
    }

    async getHealthScore(): Promise<UmbDataSourceResponse<GetHealthScoreResponse>> {
        return await tryExecute(this.#host, AuditService.getHealthScore());
    }
}