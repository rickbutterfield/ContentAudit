/** @type {import('vite').UserConfig} */
import { defineConfig, PluginOption } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts', // your web component source file
            formats: ['es'],
        },
        outDir: '../Umbraco.Community.ContentAudit/wwwroot/App_Plugins/UmbracoCommunityContentAudit',
        publicDir: 'public',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/],
            onwarn: () => { }
        },
    }
});