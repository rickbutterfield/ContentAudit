# Configuration

The ContentAudit package can be configured through the `appsettings.json` file. This guide will walk you through the available configuration options.

## Basic Configuration

The basic configuration for the package looks like this:

```json
{
  "ContentAudit": {
    "RespectRobotsTxt": true,
    "UseUmbracoContentIndex": false,
    "UseSitemapXml": true,
    "SitemapUrl": "/sitemap.xml"
  }
}
```

## Configuration Options
### Options
| Property | Type | Description |
| -------- | ---- | ----------- |
| `UseSitemapXml` | `bool` | If set to `true`, the package will use the sitemap.xml file to get a list of URLs. |
| `SitemapUrl` | `string` | The URL of the sitemap.xml file. This is only used if `UseSitemapXml` is set to `true`. |
| `UseUmbracoContentIndex` | `bool` | If set to `true`, the package will use the Umbraco content index to get a list of URLs. |
| `RespectRobotsTxt` | `bool` | If set to `true`, the package will respect the robots.txt file when crawling the site. |