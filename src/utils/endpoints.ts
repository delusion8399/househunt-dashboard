const endpoints = {
  homeData: {
    path: "/home",
    method: "GET",
  },
  trendingSearches: {
    path: "/home/trending-searches",
    method: "GET",
  },
  getListing: {
    path: "/listing/:slug",
    method: "GET",
  },
  searchListings: {
    path: "/listing",
    method: "GET",
  },
  listingFilters: {
    path: "/listing/filters",
    method: "GET",
  },
};

export default endpoints;
