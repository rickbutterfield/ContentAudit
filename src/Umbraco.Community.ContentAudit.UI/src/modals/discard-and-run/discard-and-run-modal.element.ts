import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { customElement } from "lit/decorators.js";
import { DiscardAndRunModalData, DiscardAndRunModalValue } from "./discard-and-run-modal.token";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";

@customElement('content-audit-modal-discard-and-run')
export class ContentAuditDiscardAndRunModalElement extends UmbModalBaseElement<DiscardAndRunModalData, DiscardAndRunModalValue> {

    #close() {
        this.modalContext?.reject();
    }

    #submit() {
        this.value = { confirmed: true };
        this.modalContext?.submit();
    }

    override render() {
        const pagesCrawled = this.modalContext?.data.pagesCrawled ?? 0;

        return html`
            <uui-dialog-layout headline="${this.modalContext?.data.headline ?? 'Discard incomplete crawl?'}">
                <p>
                    The previous incomplete crawl with <strong>${pagesCrawled} URLs</strong> already processed will be permanently discarded. This cannot be undone.
                </p>
                <p>
                    Running an audit scan can be an intensive process, depending on the number of pages on your website. It is not recommended to run a scan at peak times on a live website, as it may cause performance issues.
                </p>
                <div slot="actions">
                    <uui-button label=${this.localize.term('general_close')} @click=${this.#close}></uui-button>
                    <uui-button
                        label="Discard & Start New"
                        look="primary"
                        color="danger"
                        @click=${this.#submit}></uui-button>
                </div>
            </uui-dialog-layout>
        `;
    }

    static override styles = [
        UmbTextStyles,
        css`
            :host {
                display: block;
                min-width: 460px;
                max-width: 30vw;
            }
        `,
    ];
}

export default ContentAuditDiscardAndRunModalElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-modal-discard-and-run': ContentAuditDiscardAndRunModalElement;
    }
}
