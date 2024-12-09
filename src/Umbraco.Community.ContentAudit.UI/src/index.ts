import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

export * from './exports.ts';

import { manifests as sectionManifests } from './section/manifests';
import { manifests as workspaceManifests } from './workspace/manifests';
import { OpenAPI } from './api/index.ts';

export const onInit: UmbEntryPointOnInit = async (host, extensionRegistry) => {

    extensionRegistry.registerMany([
        ...sectionManifests,
        ...workspaceManifests
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