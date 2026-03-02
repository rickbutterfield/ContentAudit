import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export type DiscardAndRunModalData = {
    headline: string;
    pagesCrawled: number;
}

export type DiscardAndRunModalValue = {
    confirmed: boolean;
}

export const CONTENT_AUDIT_DISCARD_AND_RUN_MODAL_TOKEN = new UmbModalToken<DiscardAndRunModalData, DiscardAndRunModalValue>('ContentAudit.Modal.DiscardAndRun', {
    modal: {
        type: 'dialog',
        size: 'small'
    }
});
