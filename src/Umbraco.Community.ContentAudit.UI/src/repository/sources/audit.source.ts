import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { OverviewDto, AuditService, GetAllIssuesResponse, GetHealthScoreResponse, GetPagesWithMissingMetadataResponse, GetCollectionResponse, IssueService } from "../../api/index";

export interface AuditDataSource {
    getLatestAuditOverview(): Promise<UmbDataSourceResponse<OverviewDto>>
    getPagesWithMissingMetadata(): Promise<UmbDataSourceResponse<GetPagesWithMissingMetadataResponse>>
    getTopIssues(): Promise<UmbDataSourceResponse<GetAllIssuesResponse>>
    getHealthScore(): Promise<UmbDataSourceResponse<GetHealthScoreResponse>>
    getAuditOverviews(): Promise<UmbDataSourceResponse<GetCollectionResponse>>
}

export class ContentAuditDataSource implements AuditDataSource {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async getLatestAuditOverview(): Promise<UmbDataSourceResponse<OverviewDto>> {
        return await tryExecute(this.#host, AuditService.overview());
    }

    async getPagesWithMissingMetadata(): Promise<UmbDataSourceResponse<GetPagesWithMissingMetadataResponse>> {
        return await tryExecute(this.#host, AuditService.getPagesWithMissingMetadata());
    }

    async getTopIssues(): Promise<UmbDataSourceResponse<GetAllIssuesResponse>> {
        return await tryExecute(this.#host, IssueService.getAllIssues({
            query: { skip: 0, take: 5 }
        }));
    }

    async getHealthScore(): Promise<UmbDataSourceResponse<GetHealthScoreResponse>> {
        return await tryExecute(this.#host, AuditService.getHealthScore());
    }

    async getAuditOverviews(): Promise<UmbDataSourceResponse<GetCollectionResponse>> {
        return await tryExecute(this.#host, AuditService.getCollection({
            query: { skip: 0, take: 5 }
        }));
    }
}