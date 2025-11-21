import { manifests as auditsManifests } from './audits/manifests';
import { manifests as auditsRootManifests } from './audits-root/manifests';

export const manifests: Array<UmbExtensionManifest> = [
	...auditsManifests,
	...auditsRootManifests,
];
