export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pride-and-joy-shop.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
