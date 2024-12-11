import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { GetSettingsResponse, SettingsService } from "../../api";

export interface SettingsDataSource {
    getSettings(): Promise<UmbDataSourceResponse<GetSettingsResponse>>
}

export class ContentAuditSettingsDataSource implements SettingsDataSource {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async getSettings(): Promise<UmbDataSourceResponse<GetSettingsResponse>> {
        return await tryExecuteAndNotify(this.#host, SettingsService.getSettings());
    }
}