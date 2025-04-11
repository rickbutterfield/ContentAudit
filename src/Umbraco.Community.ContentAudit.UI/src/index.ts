import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

export * from './exports.ts';

import { manifests as sectionManifests } from './section/manifests';
import { manifests as workspaceManifests } from './workspace/manifests';
import { manifests as modalManifests } from './modals/manifest';
import { manifests as localizationManifests } from './localization/manifests';
import { OpenAPI } from './api/index.ts';
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
        ...localizationManifests
    ]);

    host.consumeContext(UMB_AUTH_CONTEXT, async (auth) => {
        if (!auth) return;

        const umbOpenApi = auth.getOpenApiConfiguration();
        OpenAPI.BASE = umbOpenApi.base;
        OpenAPI.TOKEN = umbOpenApi.token;
        OpenAPI.WITH_CREDENTIALS = umbOpenApi.withCredentials;
        OpenAPI.CREDENTIALS = umbOpenApi.credentials;
    });
}