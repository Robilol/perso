import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler (req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    <url>
      <loc>http://www.example.com/foo.html</loc>
      <lastmod>2021-01-01</lastmod>
    </url>
    </urlset>`;

  res.end(xml);
}
