import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    debug: true,
    input: 'http://localhost:26293/umbraco/swagger/content-audit/swagger.json',
    output: {
        path: 'src/api',
        format: 'prettier',
        lint: 'eslint',
    },
    plugins: [
        {
            name: '@hey-api/client-fetch',
            //bundle: false,
            exportFromIndex: true,
            throwOnError: true,
        },
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