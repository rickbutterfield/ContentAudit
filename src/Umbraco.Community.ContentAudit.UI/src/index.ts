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
    extensionRegistry.registerMany([
        globalContext,
        ...sectionManifests,
        ...workspaceManifests,
        ...modalManifests,
        ...localizationManifests,
        ...documentManifests
    ]);

    host.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {
        if (!authContext) return;
        const config = authContext.getOpenApiConfiguration();

        client.setConfig({
            auth: config.token,
            baseUrl: config.base,
            credentials: config.credentials,
        });

        client.interceptors.request.use(async (request, _options) => {
            const token = await authContext.getLatestToken();
            request.headers.set('Authorization', `Bearer ${token}`);
            return request;
        });
    });
}