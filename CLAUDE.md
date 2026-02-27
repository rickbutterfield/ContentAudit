# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ContentAudit is an Umbraco CMS package providing first-class site crawling and SEO auditing capabilities. The package analyzes websites for SEO issues, accessibility problems, performance metrics, and carbon emissions using Microsoft Playwright for browser automation.

**Key Features:**
- Site crawling with sitemap.xml and robots.txt support
- SEO auditing (meta descriptions, H1/H2 tags, alt text, etc.)
- Performance monitoring (Core Web Vitals)
- Carbon emissions tracking using Sustainable Web Design methodology
- Extensible audit issue system
- Export capabilities (CSV)

**Target Platform:** Umbraco 17+ (.NET 10)

## Architecture

### Project Structure

The solution consists of four projects:

1. **Umbraco.Community.ContentAudit** (src/)
   - Main C# backend package
   - ASP.NET Core controllers, services, and repositories
   - Playwright-based crawling engine
   - Audit issue detection system
   - Management API endpoints

2. **Umbraco.Community.ContentAudit.UI** (src/)
   - TypeScript/Lit frontend for Umbraco backoffice
   - Uses Umbraco's Extension API system
   - Vite-based build system
   - OpenAPI client generation

3. **Umbraco.Community.ContentAudit.SchemaGenerator** (tools/)
   - Generates JSON schema for appsettings.json configuration

4. **Umbraco.Community.ContentAudit.UnitTests** (tests/)
   - xUnit test project with FluentAssertions and Moq

### Backend Architecture

**Key Services:**
- `ICrawlService` - Manages Playwright-based site crawling
- `IAuditService` - Orchestrates audit runs and issue detection
- `ISitemapService` - Parses and discovers sitemap.xml files
- `IRobotsService` - Handles robots.txt parsing and validation
- `IEmissionsService` - Calculates carbon emissions using SWD v4 methodology
- `IValidationService` - HTML validation and parsing
- `IDataService` - Data export functionality
- `IAuditRepository` - Database access using Umbraco's NPoco

**Audit Issue System:**
All audit issues implement `IAuditIssue` (or specialized interfaces `IAuditPageIssue`/`IAuditImageIssue`). Issues are automatically discovered via Umbraco's type scanning and registered through `AuditIssueCollectionBuilder`.

Built-in issues include: MissingAltText, MetaDescriptionMissing, MetaDescriptionTooLong, MissingH1, MissingH2, NoIndex, NoFollow, Orphaned, ServerError, InvalidHtml, CanonicalisedUrls, PageCarbonIntensity.

**API Structure:**
- Base path: `/umbraco/content-audit/management/api/v1`
- Controllers in `Api/` folder organized by feature: Audit (including Tree and Item sub-folders), Crawl, Issues, Settings
- Audit endpoints include: Overview, ByKey, ExternalLinks, InternalLinks, DuplicateContent, HealthScore, OrphanedPages, MissingMetadata, Images, Export
- Authorization via `AuthorizationPolicies.SectionAccessContentAudit`

### Frontend Architecture

**Technology Stack:**
- Lit web components
- TypeScript with strict mode
- Vite for bundling
- OpenAPI-generated API clients using `@hey-api/openapi-ts`

**Extension System:**
The UI registers multiple manifests for:
- Section (main navigation)
- Workspaces (detail views)
- Documents (audit reports)
- Modals (dialogs)
- Localization (i18n)
- Global context (shared state)

**Build Output:**
Frontend builds to `wwwroot/App_Plugins/UmbracoCommunityContentAudit/` and is packaged with the backend.

## Development Commands

### Building the Project

```bash
# Build entire solution
dotnet build

# Build specific project
dotnet build src/Umbraco.Community.ContentAudit/Umbraco.Community.ContentAudit.csproj --configuration Release

# Build frontend
cd src/Umbraco.Community.ContentAudit.UI
npm install
npm run build

# Watch mode for frontend development
npm run watch
```

### Running the Test Site

The test site (`examples/Umbraco.Community.ContentAudit.TestSite`) comes pre-configured with Clean starter kit and uSync.

```bash
cd examples/Umbraco.Community.ContentAudit.TestSite
dotnet run
```

**Default credentials:**
- Username: `admin@example.com`
- Password: `1234567890`

### Frontend Development

```bash
cd src/Umbraco.Community.ContentAudit.UI

# Development mode
npm run dev

# Build for production
npm run build

# Watch mode (auto-rebuild)
npm run watch

# Generate OpenAPI client (requires running backend)
npm run generate
```

**Note:** OpenAPI client generation expects the backend to be running at `http://localhost:26291` with Swagger endpoint at `/umbraco/swagger/content-audit/swagger.json`.

### Schema Generation

The JSON schema for configuration is auto-generated on build if missing:

```bash
cd tools/Umbraco.Community.ContentAudit.SchemaGenerator
dotnet run -- --outputFile "../../src/Umbraco.Community.ContentAudit/appsettings-schema.ContentAudit.json"
```

## Key Technical Details

### Version Management

- Uses Nerdbank.GitVersioning for semantic versioning
- Version configured in `version.json`
- Umbraco versioning extensions via `Umbraco.GitVersioning.Extensions`

### Playwright Integration

Playwright is auto-installed on first run via the Composer:
- Chromium browser installed to `%LocalAppData%/ms-playwright`
- Browser instance registered as singleton
- Used for page rendering, screenshot capture, and metrics collection

### Configuration

Configuration via `appsettings.json` under `ContentAudit` section:
- `BaseUrl` - Site base URL (especially important for headless setups)
- `UseSitemapXml` - Enable sitemap discovery (default: true)
- `SitemapUrl` - Sitemap location (auto-discovered from robots.txt if not set)
- `UseUmbracoContentIndex` - Use Umbraco's content index for URL discovery (default: false)
- `RespectRobotsTxt` - Honor robots.txt disallow rules (default: true)
- `MaxConcurrentCrawls` - Parallel crawl limit (default: 4, range: 1-20)
- `MaxCrawlDurationMinutes` - Maximum crawl duration in minutes, 0 for no limit (default: 30)
- `UseIncrementalCrawl` - Only re-crawl changed pages (default: true)
- `ExcludePatterns` - URL patterns to exclude from crawling, supports wildcards (`*`, `**`)
- `IncludePatterns` - URL patterns to include; if set, only matching URLs are crawled
- `CrawlDelayMs` - Delay in ms between requests, can be overridden by robots.txt Crawl-delay (default: 0)
- `MaxCrawlDepth` - Maximum crawl depth from starting URL, 0 for unlimited (default: 0)
- `PageTimeoutMs` - Per-page navigation timeout in ms (default: 30000)
- `ExternalRequestDelayMs` - Minimum delay in ms between requests to the same external domain (default: 200)

### Carbon Emissions Calculations

Implements Sustainable Web Design v4 methodology with constants in `Constants.Emissions.SWDV4`:
- Operational energy per GB for datacenter, network, device
- Embodied energy per GB
- Global grid intensity (494 gCO2e/kWh)
- Percentile ratings for A-F grading

## Creating Custom Audit Issues

### Page Issues

Implement `IAuditPageIssue`:

```csharp
public class CustomPageIssue : IAuditPageIssue
{
    public Guid Id => new Guid("your-guid-here");
    public string Name => "Custom Issue Name";
    public string Description => "Detailed description";
    public string Category => "SEO"; // or "Accessibility", "Performance", etc.
    public IssueType Type => IssueType.Warning;
    public IssuePriority Priority => IssuePriority.Medium;
    public IEnumerable<AuditIssueProperty> ExposedProperties => [];

    public bool Check(AuditPage page)
    {
        // Return true if issue exists
    }
}
```

### Image Issues

Implement `IAuditImageIssue` with similar structure but operates on `AuditImage` objects.

Issues are automatically discovered and registered - no manual registration required.

## Important Constraints

### Sustainability Focus

This project follows sustainability best practices per `AGENTS.md`:
- Minimize HTTP requests and data transfer
- Optimize images and assets
- Consider page weight budgets
- Lazy load resources where appropriate
- Monitor Core Web Vitals
- Restrict third-party dependencies

### Code Style

- No explanatory comments (only "why" comments when necessary)
- Keep responses concise
- .NET 10 / C# latest features
- TypeScript strict mode enabled
- Async/await patterns throughout

### Central Package Management

This project uses Central Package Management (CPM):
- Package versions defined in `Directory.Packages.props`
- `ManagePackageVersionsCentrally` enabled
- All Umbraco packages use version range: `[17.0.0, 18)`
- DO NOT specify versions in individual `.csproj` files

## Release Process

Releases are automated via GitHub Actions:
- Push tag matching `release-*` pattern
- Action builds Release configuration
- NuGet package auto-generated and pushed to nuget.org
- Package includes frontend assets in `wwwroot/App_Plugins/`
