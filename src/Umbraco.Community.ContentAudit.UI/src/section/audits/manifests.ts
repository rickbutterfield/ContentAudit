import { manifests as menuManifests } from './menu/manifests';
import { manifests as treeManifests } from './tree/manifests';

export const manifests: Array<UmbExtensionManifest> = [
    ...menuManifests,
    ...treeManifests
];