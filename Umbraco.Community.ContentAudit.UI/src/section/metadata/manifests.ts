import { manifests as menuItems } from './menu/manifests';
import { manifests as workspaceManifests } from './workspace/manifests';

export const manifests: Array<UmbExtensionManifest> = [
    ...workspaceManifests,
    ...menuItems
]