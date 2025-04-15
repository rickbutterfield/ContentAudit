namespace Umbraco.Community.ContentAudit
{
    internal class Constants
    {
        internal const string Alias = "ContentAudit";
        internal const string Name = "Audit";
#if !NET9_0
        internal const string SectionAlias = "audit";
#else
        internal const string SectionAlias = "Umb.Section.ContentAudit";
#endif
        internal const string MetadataTreeAlias = "contentMetadata";

        internal class Trees
        {
            internal class Audit
            {
                internal const string Alias = "audit";
                internal const string Title = "Site Audit";
                internal const string Group = "audit";
            }

            internal class Content
            {
                internal const string Alias = "content";
                internal const string Title = "Content";
                internal const string Group = "content";
            }
        }

        internal class Cache
        {
            internal const string Key = "LatestAuditData";
        }

        internal class Emissions
        {
            // SUSTAINABLE WEB DESIGN CONSTANTS
            // this refers to the estimated total energy use for the internet around 2000 TWh,
            // divided by the total transfer it enables around 2500 exabytes
            internal const double KWH_PER_GB = 0.81;

            // these constants outline how the energy is attributed to
            // different parts of the system in the SWD model
            internal const double END_USER_DEVICE_ENERGY = 0.52;
            internal const double NETWORK_ENERGY = 0.14;
            internal const double DATACENTER_ENERGY = 0.15;
            internal const double PRODUCTION_ENERGY = 0.19;

            // These carbon intensity figures https://ember-climate.org/data/data-explorer
            // - Global carbon intensity for 2023
            internal const double GLOBAL_GRID_INTENSITY = 494; // This would come from averageIntensity.data["WORLD"] in the original JS
            internal const double RENEWABLES_GRID_INTENSITY = 50;

            // Taken from: https://gitlab.com/wholegrain/carbon-api-2-0/-/blob/master/includes/carbonapi.php
            internal const double FIRST_TIME_VIEWING_PERCENTAGE = 0.75;
            internal const double RETURNING_VISITOR_PERCENTAGE = 0.25;
            internal const double PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD = 0.02;

            public class SWDV4
            {
                internal const double OPERATIONAL_KWH_PER_GB_DATACENTER = 0.055;
                internal const double OPERATIONAL_KWH_PER_GB_NETWORK = 0.059;
                internal const double OPERATIONAL_KWH_PER_GB_DEVICE = 0.08;
                internal const double EMBODIED_KWH_PER_GB_DATACENTER = 0.012;
                internal const double EMBODIED_KWH_PER_GB_NETWORK = 0.013;
                internal const double EMBODIED_KWH_PER_GB_DEVICE = 0.081;
                internal const double GLOBAL_GRID_INTENSITY = 494;

                public class Ratings
                {
                    internal const double FIFTH_PERCENTILE = 0.095;
                    internal const double TENTH_PERCENTILE = 0.186;
                    internal const double TWENTIETH_PERCENTILE = 0.341;
                    internal const double THIRTIETH_PERCENTILE = 0.493;
                    internal const double FORTIETH_PERCENTILE = 0.656;
                    internal const double FIFTIETH_PERCENTILE = 0.846;
                }
            }
        }
    }
}
