import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { customElement } from "lit/decorators.js";
import { RunWarningModalData, RunWarningModalValue } from "./run-warning-modal.token";
import { css, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from "@umbraco-cms/backoffice/style";

@customElement('content-audit-modal-run-warning')
export class UmbBlockCatalogueModalElement extends UmbModalBaseElement<RunWarningModalData, RunWarningModalValue> {

    constructor() {
        super();
    }

    #close() {
        this.modalContext?.reject();
    }

    #submit() {
        this.value = { run: true };
        this.modalContext?.submit();
    }

    override render() {
        return html`
            <uui-dialog-layout headline="${this.modalContext?.data.headline ?? 'Default headline'}">
                <p id="subtitle">
                    Running an audit scan can be an intensive process, depending on the number of pages on your website. It is not recommended to run a scan at peak times on a live website, as it may cause performance issues. It is recommended to run the scan on a staging or development environment first, or at a quieter time on the live website.
                </p>
                <div slot="actions">
				    <uui-button label=${this.localize.term('general_close')} @click=${this.#close}></uui-button>
				    <uui-button
					    label="${this.localize.term('buttons_understand')}"
					    look="primary"
					    color="positive"
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

export default UmbBlockCatalogueModalElement;

declare global {
    interface HTMLElementTagNameMap {
        'content-audit-modal-run-warning': UmbBlockCatalogueModalElement;
    }
}
