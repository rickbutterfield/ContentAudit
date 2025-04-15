# Usage

This guide will walk you through how to use the ContentAudit package in your Umbraco project.

## Installation

1. Install the package from NuGet:
```bash
dotnet add package Umbraco.Community.ContentAudit
```

2. Start up your Umbraco project and navigate to the backoffice. A new **Audit** section will be available in the top navigation.

## Running an Audit

1. Log in to your Umbraco backoffice
2. Navigate to the "Content Audit" section in the left-hand menu
3. Click the "Run Audit" button
4. Wait for the audit to complete
5. View the results in the dashboard

## Understanding the Dashboard

The dashboard provides several views of your audit results:

### Overview
- Total number of pages audited
- Number of issues found
- Health score
- Distribution of issues by type and priority

### All Issues
- List of all issues found during the audit
- Number of pages affected by each issue
- Percentage of total pages affected
- Priority score for each issue

### All Pages
- List of all pages audited
- Status code for each page
- Number of issues found on each page
- Links to view detailed information about each page

### TBD
