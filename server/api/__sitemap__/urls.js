import { defineSitemapEventHandler } from '#imports';

const backend = useRuntimeConfig().public.backendUrl;

// server/api/__sitemap__/urls.js
export default defineSitemapEventHandler(async () => {
  try {
    const products = await $fetch(`${backend}/products`, {method: "GET"});

    const sitemapUrls = products.map((product) => ({
      loc: `/shop/${product._id}`,
      lastmod: product.updatedAt || product.createdAt || new Date().toISOString(),
    }));

    return sitemapUrls;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
});
