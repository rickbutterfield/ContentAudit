import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { ContentAuditDataSource } from "./sources/audit.source";
import { ContentAuditSettingsDataSource } from "./sources/settings.source";

export class ContentAuditRepository extends UmbControllerBase {
    #auditDataSource: ContentAuditDataSource;
    #settingsDataSource: ContentAuditSettingsDataSource;

    constructor(host: UmbControllerHost) {
        super(host);

        this.#auditDataSource = new ContentAuditDataSource(this);
        this.#settingsDataSource = new ContentAuditSettingsDataSource(this);
    }

    async getLatestAuditOverview() {
        return this.#auditDataSource.getLatestAuditOverview();
    }

    async getPagesWithMissingMetadata() {
        return this.#auditDataSource.getPagesWithMissingMetadata();
    }

    async getTopIssues() {
        return this.#auditDataSource.getTopIssues();
    }

    async getHealthScore() {
        return this.#auditDataSource.getHealthScore();
    }

    async getSettings() {
        return this.#settingsDataSource.getSettings();
    }
}