# Creating Custom Page Audit Issues

The ContentAudit package allows you to create your own custom page audit issues by implementing the `IAuditPageIssue` interface. This guide will walk you through the process of creating a custom page audit issue.

## The IAuditPageIssue Interface

The `IAuditPageIssue` interface inherits from `IAuditIssue` and adds one additional method:

```csharp
public interface IAuditPageIssue : IAuditIssue
{
    IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages);
}
```

## Required Properties

When implementing `IAuditPageIssue`, you need to provide the following properties:

- `Id` (Guid): A unique identifier for your issue
- `Name` (string): A short name for the issue
- `Description` (string): A description of what the issue checks for
- `Category` (string): The category this issue belongs to
- `Type` (IssueType): The type of issue (Opportunity, Warning, or Issue)
- `Priority` (IssuePriority): The priority level of the issue (Low, Medium, or High)
- `ExposedProperties` (IEnumerable<AuditIssueProperty>): Properties to expose in the UI

## Example Implementation

Here's an example of a custom page audit issue that checks for pages with missing meta descriptions.

```csharp
using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace MyProject.AuditIssues
{
    public class MissingMetaDescription : IAuditPageIssue
    {
        public Guid Id => new Guid("8f2a0c38-d8c3-4de9-91c2-c7005aadbfb9");

        public string Name => "Description missing";

        public string Description => "Pages where meta descriptions are missing";

        public string Category => "Metadata";

        public IssueType Type => IssueType.Warning;

        public IssuePriority Priority => IssuePriority.Medium;

        public IEnumerable<AuditIssueProperty> ExposedProperties => default;

        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && string.IsNullOrEmpty(x.SeoData?.MetaDescription));
        }
    }
}
```

## `CheckPages`

The `CheckPages` method is where you implement your custom logic to check for issues. It receives a collection of `PageAnalysisDto` objects and should return a filtered collection of pages that have the issue you're checking for.

The `PageAnalysisDto` contains various properties that you can use to check for issues:

- `Links`: Contains a collection of links found on the page, including internal and external links
- `Resources`: Contains a collection of resources found on the page, including background images, scripts, and stylesheets
- `Images`: Contains a collection of images found on the page, including their alt text
- `PageData`: Contains basic page information like URL, status code, etc.
- `SeoData`: Contains SEO-related information like meta description, title, etc.
- `ContentAnalysisData`: Contains content-related information like word count, headings, etc.
- `ContentQualityData`: Contains content quality-related information like duplicate content, readability, etc.
- `PerformanceData`: Contains performance-related information like page load time, largest contentful paint, etc.
- `AccessibilityData`: Contains accessibility-related information like ARIA labels, proper heading structure, etc.
- `TechincalSeoData`: Contains technical SEO-related information like content type, GZip compression, etc.
- `SocialMediaData`: Contains social media-related information
- `EmissionsData`: Contains carbon emissions data about emissions per page view and carbon rating (based on [Sustainable Web Design](https://sustainablewebdesign.org/digital-carbon-ratings/) digital carbon ratings)

## Registering Your Custom Issue
By extending the `IAuditPageIssue` interface, your custom issue will be automatically registered with the ContentAudit package. You don't need to do anything extra to register it.

## Testing Your Custom Issue

After implementing your custom issue, you can test it by:

1. Running a new audit
2. Checking the "All Issues" view to see if your issue appears
3. Verifying that the correct pages are being flagged
