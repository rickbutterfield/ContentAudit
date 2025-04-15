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

The `BaseUrl` setting is particularly important for the content audit to work correctly. You have two options for providing the base URL:

1. **Configuration**: Set the `BaseUrl` in your `appsettings.json` as shown above. This is the recommended approach for most scenarios.

2. **Runtime**: Pass the base URL as a parameter when calling `StartCrawl`. This is useful when you need to override the configured URL or when running the audit programmatically.

If neither a configured base URL nor a parameter is provided, the service will throw an `ArgumentException`.

This configuration is especially important for headless setups where the request URL might not be available or might not match the actual site URL.