import { queryCollection } from '@nuxt/content/server'


const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'writing').order('date', 'DESC').all()

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${SITE_URL}${post.path}</link>
      <guid>${SITE_URL}${post.path}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.description)}</description>
    </item>`,
    )
    .join('\n')

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Josh Angell</title>
    <link>${SITE_URL}</link>
    <description>Writing by Josh Angell</description>
    <language>en-gb</language>
${items}
  </channel>
</rss>
`
})
