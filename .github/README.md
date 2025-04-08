# Umbraco.Community.ContentAudit

[![Platform](https://img.shields.io/badge/Umbraco-15+-%233544B1?style=flat&logo=umbraco)](https://umbraco.com/products/umbraco-cms/)
[![NuGet](https://img.shields.io/nuget/v/Umbraco.Community.ContentAudit.svg)](https://www.nuget.org/packages/Umbraco.Community.ContentAudit/)
[![GitHub](https://img.shields.io/github/license/rickbutterfield/Umbraco.Community.ContentAudit)](https://github.com/rickbutterfield/Umbraco.Community.ContentAudit/blob/develop/LICENSE)

**ContentAudit** is a tool designed for auditing content and SEO within Umbraco CMS.

<img src="https://raw.githubusercontent.com/rickbutterfield/Umbraco.Community.ContentAudit/main/.github/assets/icon.svg" alt="Umbraco.Community.ContentAudit icon" width="150" height="150" align="right">

## Installation
The Umbraco v15 version of this package is available via NuGet.

To install the package, you can use either .NET CLI:
```
dotnet add package Umbraco.Community.ContentAudit --version 1.0.0-alpha
```

or the NuGet Package Manager:
```
Install-Package Umbraco.Community.ContentAudit -Version 1.0.0-alpha
```
## Usage
The following options can be configured in `appsettings.json`:

```json
"ContentAudit": {
  "UseSitemapXml": false,
  "SitemapUrl": "https://example.com/sitemap.xml",
  "UseUmbracoContentIndex": false,
  "RespectRobotsTxt": true
}
```

### Options
| Property | Type | Description |
| -------- | ---- | ----------- |
| `UseSitemapXml` | `bool` | If set to `true`, the package will use the sitemap.xml file to get a list of URLs. |
| `SitemapUrl` | `string` | The URL of the sitemap.xml file. This is only used if `UseSitemapXml` is set to `true`. |
| `UseUmbracoContentIndex` | `bool` | If set to `true`, the package will use the Umbraco content index to get a list of URLs. |
| `RespectRobotsTxt` | `bool` | If set to `true`, the package will respect the robots.txt file when crawling the site. |
## Contributing
To raise a new bug, create an issue on the GitHub repository. To fix a bug or add new features, fork the repository and send a pull request with your changes. Feel free to add ideas to the repository's issues list if you would to discuss anything related to the library.

### Using the test sites
The repo comes with a test site for Umbraco 14.2+. The site is configured with uSync out of the box to get you up and running with a test site quickly. Use the following credentials to log into the back office:

```
Username: admin@example.com
Password: 1234567890
```
### Who do I talk to?
This project is maintained by [Rick Butterfield](https://rickbutterfield.dev) and contributors. If you have any questions about the project please get in touch on [Bluesky](https://bsky.app/profile/rickbutterfield.dev), or by raising an issue on GitHub.

## License
Copyright &copy; 2025 [Rick Butterfield](https://rickbutterfield.dev), and other contributors.

Licensed under the [MIT License](https://github.com/rickbutterfield/Umbraco.Community.ContentAudit/blob/main/LICENSE.md).