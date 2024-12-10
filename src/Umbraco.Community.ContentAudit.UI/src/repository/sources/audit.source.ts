import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { AuditService, GetAllIssuesResponse, GetLatestAuditOverviewResponse, GetPagesWithMissingMetadataResponse } from "../../api";

export interface AuditDataSource {
    getLatestAuditOverview(): Promise<UmbDataSourceResponse<GetLatestAuditOverviewResponse>>
    getPagesWithMissingMetadata(): Promise<UmbDataSourceResponse<GetPagesWithMissingMetadataResponse>>
    getAllIssues(): Promise<UmbDataSourceResponse<GetAllIssuesResponse>>
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

    async getAllIssues(): Promise<UmbDataSourceResponse<GetAllIssuesResponse>> {
        return await tryExecuteAndNotify(this.#host, AuditService.getAllIssues());
    }
}