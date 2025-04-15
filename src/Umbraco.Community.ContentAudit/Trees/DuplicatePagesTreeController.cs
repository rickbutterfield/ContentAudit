//#if !NET9_0
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Umbraco.Cms.Core.Events;
//using Umbraco.Cms.Core.Services;
//using Umbraco.Cms.Core;
//using Umbraco.Cms.Core.Trees;
//using Umbraco.Cms.Web.BackOffice.Trees;
//using Umbraco.Cms.Web.Common.Attributes;
//using Umbraco.Cms.Web.Common.ModelBinders;

//namespace Umbraco.Community.ContentAudit.Trees
//{
//    [Tree(Constants.SectionAlias, "duplicate-pages", TreeGroup = Constants.Trees.Content.Group, SortOrder = 0)]
//    [PluginController("UmbracoCommunityContentAudit")]
//    public class DuplicatePagesTreeController : TreeController
//    {
//        private readonly IMenuItemCollectionFactory _menuItemCollectionFactory;

//        public DuplicatePagesTreeController(ILocalizedTextService localizedTextService,
//            UmbracoApiControllerTypeCollection umbracoApiControllerTypeCollection,
//            IMenuItemCollectionFactory menuItemCollectionFactory,
//            IEventAggregator eventAggregator)
//         : base(localizedTextService, umbracoApiControllerTypeCollection, eventAggregator)
//        {
//            _menuItemCollectionFactory = menuItemCollectionFactory ?? throw new ArgumentNullException(nameof(menuItemCollectionFactory));
//        }
//        protected override ActionResult<MenuItemCollection> GetMenuForNode(string id, [ModelBinder(typeof(HttpQueryStringModelBinder))] FormCollection queryStrings) => _menuItemCollectionFactory.Create();

//        protected override ActionResult<TreeNodeCollection> GetTreeNodes(string id, FormCollection queryStrings) => new TreeNodeCollection();

//        protected override ActionResult<TreeNode?> CreateRootNode(FormCollection queryStrings)
//        {
//            ActionResult<TreeNode?> rootResult = base.CreateRootNode(queryStrings);
//            if (!(rootResult.Result is null))
//            {
//                return rootResult;
//            }

//            TreeNode? root = rootResult.Value;

//            if (root is not null)
//            {
//                root.RoutePath = $"{Constants.SectionAlias}/duplicate-pages/overview";
//                root.Name = "Duplicate Pages";
//                root.Icon = "icon-documents";
//                root.HasChildren = false;
//                root.MenuUrl = null;
//            }

//            return root;
//        }
//    }
//}
//#endif