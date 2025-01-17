import { defineSitemapEventHandler } from '#imports';

const backend = useRuntimeConfig().public.backendUrl;

// server/api/__sitemap__/urls.js
export default defineSitemapEventHandler(async () => {
  try {
    // Fetch products from the backend
    const products = await $fetch(`${backend}/products`, {method: "GET"});

    // Map products to sitemap URLs
    const sitemapUrls = products.map((product) => ({
      loc: `/products/${product._id}`,
    }));

    return sitemapUrls;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
});