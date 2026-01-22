export default function sitemap() {
  const baseUrl = 'https://midas-forexexchange.vercel.app';
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
