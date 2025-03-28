import { writeFileSync } from 'fs'
import { globby } from 'globby'
import prettier from 'prettier'

// https://leerob.io/blog/nextjs-sitemap-robots

async function generate () {
  const prettierConfig = await prettier.resolveConfig('./.prettier.config.js')
  const pages = await globby([
    'pages/*.js',
    'pages/*.ts',
    'pages/*.tsx',
    'data/**/*.mdx',
    '!data/*.mdx',
    '!pages/_*.js',
    '!pages/_*.ts',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/404.js',
    '!pages/404.ts',
    '!pages/404.tsx'
  ])

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
        .map((page) => {
            const path = page
                .replace('pages', '')
                .replace('data', '')
                .replace('.js', '')
                .replace('.ts', '')
                .replace('.tsx', '')
                .replace('.mdx', '')
            const route = path === '/index' ? '' : path

            return `
              <url>
                  <loc>${`https://leerob.io${route}`}</loc>
              </url>
            `
        })
        .join('')}
    </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  })

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted)
}

generate()
