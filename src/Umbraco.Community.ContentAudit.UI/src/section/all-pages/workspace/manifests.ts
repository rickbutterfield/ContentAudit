import { manifests as allPagesManifests } from './all-pages/manifests';
import { manifests as allPagesRootManifests } from './all-pages-root/manifests';

export const manifests: Array<UmbExtensionManifest> = [...allPagesManifests, ...allPagesRootManifests];
