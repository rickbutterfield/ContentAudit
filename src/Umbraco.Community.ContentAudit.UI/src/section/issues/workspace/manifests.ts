import { manifests as issuesManifests } from './issues/manifests';
import { manifests as issuesRootManifests } from './issues-root/manifests';

export const manifests: Array<UmbExtensionManifest> = [...issuesManifests, ...issuesRootManifests];
