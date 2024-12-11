import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";

export interface CrawlDataSource {
}

export class ContentCrawlDataSource implements CrawlDataSource {
    _host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this._host = host;
    }

}