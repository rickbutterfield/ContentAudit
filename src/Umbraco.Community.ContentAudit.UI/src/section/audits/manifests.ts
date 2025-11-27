import { manifests as collectionManifests } from './collection/manifests';
import { manifests as entityActionManifests } from './entity-actions/manifests';
import { manifests as menuManifests } from './menu/manifests';
import { manifests as treeManifests } from './tree/manifests';
import { manifests as workspaceManifests } from './workspace/manifests';

export const manifests: Array<UmbExtensionManifest> = [
    ...collectionManifests,
    ...entityActionManifests,
    ...menuManifests,
    ...treeManifests,
    ...workspaceManifests
];