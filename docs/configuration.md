# Configuration

The ContentAudit package can be configured through the `appsettings.json` file. This guide will walk you through the available configuration options.

## Basic Configuration

The basic configuration for the package looks like this:

```json
{
  "ContentAudit": {
    "BaseUrl": "https://your-site-url.com",
    "RespectRobotsTxt": true,
    "UseUmbracoContentIndex": false,
    "UseSitemapXml": true,
    "SitemapUrl": "/sitemap.xml",
    "MaxConcurrentCrawls": 4
  }
}
```

## Configuration Options
### Options
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `BaseUrl` | `string` | `''` | The base URL of your site. By default the package will use the URL you are running the audit on, however if your site is headless and you are running the audit from a different URL, you can set the base URL here. |
| `UseSitemapXml` | `bool` | `true` | If set to `true`, the package will use the sitemap.xml file to get a list of URLs. |
| `SitemapUrl` | `string` | `/sitemap.xml` | The URL of the sitemap.xml file. This is only used if `UseSitemapXml` is set to `true`. |
| `UseUmbracoContentIndex` | `bool` | `false` | If set to `true`, the package will use the Umbraco content index to get a list of URLs. |
| `RespectRobotsTxt` | `bool` | `true` | If set to `true`, the package will respect the robots.txt file when crawling the site. |
| `MaxConcurrentCrawls` | `int` | `4` | The maximum number of crawls to perform at the same time. |

## Base URL Configuration

The `BaseUrl` setting is particularly important for the content audit to work correctly. This configuration is especially important for headless setups where the request URL might not be available or might not match the actual site URL.
