# Creating Custom Image Audit Issues

The ContentAudit package allows you to create your own custom image audit issues by implementing the `IAuditImageIssue` interface. This guide will walk you through the process of creating a custom image audit issue.

## The IAuditImageIssue Interface

The `IAuditImageIssue` interface inherits from `IAuditIssue` and adds one additional method:

```csharp
public interface IAuditImageIssue : IAuditIssue
{
    IEnumerable<ImageDto> CheckImages(IEnumerable<ImageDto> images, IEnumerable<PageAnalysisDto> pages);
}
```

## Required Properties

When implementing `IAuditImageIssue`, you need to provide the following properties:

- `Id` (Guid): A unique identifier for your issue
- `Name` (string): A short name for the issue
- `Description` (string): A description of what the issue checks for
- `Category` (string): The category this issue belongs to
- `Type` (IssueType): The type of issue (Opportunity, Warning, or Issue)
- `Priority` (IssuePriority): The priority level of the issue (Low, Medium, or High)
- `ExposedProperties` (IEnumerable<AuditIssueProperty>): Properties to expose in the UI

## Example Implementation

Here's an example of a custom image audit issue that checks for images with missing alt text:

```csharp
using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace MyProject.AuditIssues
{
    public class MissingAltText : IAuditImageIssue
    {
        public Guid Id => new Guid("8368418c-b231-46b4-9fbb-642acf92436b");

        public string Name => "Missing alt text";

        public string Description => "Pages with images that are missing alt text";

        public string Category => "Content";

        public IssueType Type => IssueType.Issue;

        public IssuePriority Priority => IssuePriority.High;

        public IEnumerable<AuditIssueProperty> ExposedProperties => default;

        public IEnumerable<ImageDto> CheckImages(IEnumerable<ImageDto> images, IEnumerable<PageAnalysisDto> pages)
        {
            return images.Where(x => !x.IsBackground && string.IsNullOrEmpty(x.AltText));
        }
    }
}
```

## `CheckImages`

The `CheckImages` method is where you implement your custom logic to check for issues. It receives two parameters:
1. `images`: A collection of `ImageDto` objects representing all images found in the audit
2. `pages`: A collection of `PageAnalysisDto` objects representing all page data in the audit

The method should return a filtered collection of images that have the issue you're checking for.

The `ImageDto` contains various properties that you can use to check for issues:

- `Url`: The URL of the image
- `IsExternal`: Whether the image is an external URL
- `Size`: The file size of the image
- `StatusCode`: The HTTP status code of the image URL
- `ContentType`: The content type of the image (e.g., image/jpeg, image/png)
- `AltText`: The alt text of the image if not a background image
- `FoundPage`: The URL of the page where the image was found
- `IsBackground`: Whether the image is used as a background image

## Registering Your Custom Issue
By extending the `IAuditImageIssue` interface, your custom issue will be automatically registered with the ContentAudit package. You don't need to do anything extra to register it.

## Testing Your Custom Issue

After implementing your custom issue, you can test it by:

1. Running a new audit
2. Checking the "All Issues" view to see if your issue appears
3. Verifying that the correct images are being flagged
