import { css, customElement, html, LitElement, property, repeat } from "@umbraco-cms/backoffice/external/lit";
import { AuditIssueDto, IssuePriority, IssueType } from "../api";
import { IssuePriorityConfigMap, IssueTypeConfigMap } from "../helpers";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

@customElement('audit-issue-table')
export class IssuesTable extends UmbElementMixin(LitElement) {

    @property({ type: Array })
    data: Array<AuditIssueDto> = [];

    /**
     * Renders the IssueType label.
     * @param type - The type of the issue.
     */
    #renderIssueType(type: IssueType) {
        const config = IssueTypeConfigMap[parseInt(type) - 1];
        return html`
            <div class="issue-label ${config.class}">
                <uui-icon name="${config.icon}"></uui-icon>
                <span class="label">${config.label}</span>
            </div>
        `;
    }

    /**
     * Renders the IssuePriority label.
     * @param priority - The priority of the issue.
     */
    #renderIssuePriority(priority: IssuePriority) {
        const config = IssuePriorityConfigMap[parseInt(priority) - 1];
        return html`
            <div class="issue-label ${config.class}">
                <uui-icon name="${config.icon}"></uui-icon>
                <span class="label">${config.label}</span>
            </div>
        `;
    }

    override render() {
        if (this.data.length > 0) {
            return html`
            <uui-table>
                <uui-table-column></uui-table-column>
                <uui-table-column></uui-table-column>
                <uui-table-column></uui-table-column>
                <uui-table-column></uui-table-column>
                <uui-table-column></uui-table-column>

                <uui-table-head>
                    <uui-table-head-cell>Name</uui-table-head-cell>
                    <uui-table-head-cell>Type</uui-table-head-cell>
                    <uui-table-head-cell>Priority</uui-table-head-cell>
                    <uui-table-head-cell>URLs</uui-table-head-cell>
                    <uui-table-head-cell>%</uui-table-head-cell>
                </uui-table-head>
                ${repeat(
                this.data!,
                (issue) => issue.name,
                (issue) => html`
                        <uui-table-row>
                            <uui-table-cell>
                                <strong>${issue.category}: ${issue.name}</strong><br/>
                                ${issue.description}
                            </uui-table-cell>
                            <uui-table-cell>${this.#renderIssueType(issue.type)}</uui-table-cell>
                            <uui-table-cell>${this.#renderIssuePriority(issue.priority)}</uui-table-cell>
                            <uui-table-cell>${issue.numberOfUrls}</uui-table-cell>
                            <uui-table-cell>${issue.percentOfTotal?.toFixed(2)}%</uui-table-cell>
                        </uui-table-row>
                    `
            )}
            </uui-table>
            `
        }
    }

    static styles = [
        css`
            .issue-label {
                display: flex;
                align-items: center;

                uui-icon {
                    margin-right: 6px;
                }
            }
        `
    ]
}

export default IssuesTable;

declare global {
    interface HTMLElementTagNameMap {
        ["audit-issue-table"]: IssuesTable;
    }
}
