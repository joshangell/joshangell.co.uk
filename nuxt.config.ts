export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],

  content: {
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: {
        highlight: { theme: 'github-dark-dimmed', langs: ['js', 'ts', 'vue', 'css', 'html', 'bash', 'json', 'sql'] },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en-GB' },
      titleTemplate: (title) => (title && title !== 'Josh Angell' ? `${title} · Josh Angell` : 'Josh Angell'),
      meta: [
        { name: 'description', content: 'Writing by Josh Angell — web developer in North Wales.' },
        { name: 'theme-color', content: '#14120e' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'Josh Angell', href: '/feed.xml' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400&family=VT323&display=swap',
        },
      ],
      // Set the theme before first paint so a saved choice never flashes
      script: [
        {
          innerHTML:
            "try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}",
        },
      ],
    },
  },

  nitro: {
    prerender: {
      // writing/<slug>.html rather than writing/<slug>/index.html, so the
      // asset server answers /writing/<slug> directly with no slash redirect
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ['/', '/feed.xml', '/404.html'],
    },
  },
})
