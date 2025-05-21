import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

export * from './exports.ts';

import { manifests as sectionManifests } from './section/manifests';
import { manifests as workspaceManifests } from './workspace/manifests';
import { manifests as modalManifests } from './modals/manifest';
import { manifests as localizationManifests } from './localization/manifests';
import { manifests as documentManifests } from './documents/manifests';
import { client } from './api/index.ts';
import { ManifestGlobalContext } from '@umbraco-cms/backoffice/extension-registry';
import { CONTENT_AUDIT_CONTEXT_ALIAS } from './exports.ts';

const globalContext: ManifestGlobalContext = {
    type: 'globalContext',
    alias: CONTENT_AUDIT_CONTEXT_ALIAS,
    name: 'Content Audit Workspace Context',
    js: () => import('./context/audit.context')
}

export const onInit: UmbEntryPointOnInit = async (host, extensionRegistry) => {

    host.consumeContext(UMB_AUTH_CONTEXT, async (auth) => {
        if (!auth) return;

        const config = auth.getOpenApiConfiguration();

        client.setConfig({
            auth: () => auth.getLatestToken(),
            baseUrl: config.base,
            credentials: config.credentials,
        });

        extensionRegistry.registerMany([
            globalContext,
            ...sectionManifests,
            ...workspaceManifests,
            ...modalManifests,
            ...localizationManifests,
            ...documentManifests
        ]);
    });
}