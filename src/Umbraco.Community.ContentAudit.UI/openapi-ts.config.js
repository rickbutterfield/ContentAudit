import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    client: 'fetch',
    debug: true,
    input: 'http://localhost:26293/umbraco/swagger/content-audit/swagger.json',
    output: {
        path: 'src/api',
        format: 'prettier',
        lint: 'eslint',
    },
    schemas: false,
    services: {
        asClass: true,
    },
    types: {
        enums: 'typescript',
    }
});