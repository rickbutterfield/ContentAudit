import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    client: 'legacy/fetch',
    debug: true,
    input: 'http://localhost:26293/umbraco/swagger/content-audit/swagger.json',
    output: {
        path: 'src/api',
        format: 'prettier',
        lint: 'eslint',
    },
    plugins: [
        {
            name: '@hey-api/typescript',
            enums: 'typescript'
        },
        {
            name: '@hey-api/sdk',
            asClass: true
        }
    ]
});