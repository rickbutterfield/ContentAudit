import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export type RunWarningModalData = {
    headline: string;
}

export type RunWarningModalValue = {
    run: boolean;
}

export const CONTENT_AUDIT_RUN_WARNING_MODAL_TOKEN = new UmbModalToken<RunWarningModalData, RunWarningModalValue>('Umb.ContentAudit.Modal.RunWarning', {
    modal: {
        type: 'dialog',
        size: 'small'
    }
});