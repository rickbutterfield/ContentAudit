using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Services;

class Program
{
    public static async Task Main(string[] args)
    {
        string baseUrl = "https://bethanyhouse.org.uk/";
        ICrawlerService crawler = new CrawlerService();

        await crawler.StartCrawl(baseUrl);

        Console.WriteLine("Crawling completed. Visited URLs:");
        foreach (var url in crawler.GetVisitedUrls())
        {
            Console.WriteLine(url);
        }
    }
}