import { manifests as menuItems } from './menu/manifests';
import { manifests as workspaceManifests } from './workspace/manifests';
import { manifests as collectionManifests } from './collection/manifests';
import { manifests as repositoryManifests } from './repository/manifests';

export const manifests: Array<UmbExtensionManifest> = [
    ...workspaceManifests,
    ...menuItems,
    ...collectionManifests,
    ...repositoryManifests
]