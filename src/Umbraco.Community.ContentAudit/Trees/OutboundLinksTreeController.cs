#if NET8_0
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Trees;
using Umbraco.Cms.Web.BackOffice.Trees;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Cms.Web.Common.ModelBinders;

namespace Umbraco.Community.ContentAudit.Trees
{
    [Tree("audit", "audit", TreeGroup = "Audit", TreeTitle = "Audit")]
    [PluginController("UmbracoCommunityContentAudit")]
    public class OutboundLinksTreeController : TreeController
    {
        private readonly IMenuItemCollectionFactory _menuItemCollectionFactory;

        public OutboundLinksTreeController(ILocalizedTextService localizedTextService,
            UmbracoApiControllerTypeCollection umbracoApiControllerTypeCollection,
            IMenuItemCollectionFactory menuItemCollectionFactory,
            IEventAggregator eventAggregator)
         : base(localizedTextService, umbracoApiControllerTypeCollection, eventAggregator)
        {
            _menuItemCollectionFactory = menuItemCollectionFactory ?? throw new ArgumentNullException(nameof(menuItemCollectionFactory));
        }
        protected override ActionResult<MenuItemCollection> GetMenuForNode(string id, [ModelBinder(typeof(HttpQueryStringModelBinder))] FormCollection queryStrings) => _menuItemCollectionFactory.Create();

        protected override ActionResult<TreeNodeCollection> GetTreeNodes(string id, FormCollection queryStrings) => new TreeNodeCollection();

        protected override ActionResult<TreeNode?> CreateRootNode(FormCollection queryStrings)
        {
            ActionResult<TreeNode?> rootResult = base.CreateRootNode(queryStrings);
            if (!(rootResult.Result is null))
            {
                return rootResult;
            }

            TreeNode? root = rootResult.Value;

            if (root is not null)
            {
                root.RoutePath = $"{Constants.SectionAlias}/audit/outbound-links";
                root.Name = "Outbound Links";
                root.Icon = "icon-fullscreen";
                root.HasChildren = false;
                root.MenuUrl = null;
            }

            return root;
        }
    }
}
#endif