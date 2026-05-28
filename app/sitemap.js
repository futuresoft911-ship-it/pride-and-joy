import { PrismaClient } from '@prisma/client';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pride-and-joy-shop.com';
  
  // Static routes
  const routes = [
    '',
    '/shop',
    '/about',
    '/faq',
    '/contact',
    '/careers',
    '/press',
    '/privacy',
    '/terms',
    '/returns',
    '/shipping',
    '/size-guide'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes (products)
  try {
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany({
      select: { id: true, updatedAt: true },
    });

    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: product.updatedAt ? product.updatedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error("Error generating sitemap for products:", error);
    return routes;
  }
}
