import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TP2 Documentation",
  description: "Documentation du TP2 du cours App Web",
  base: '/appweb-trpr02/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Revue 1', link: '/revue-1' },
      { text: 'Revue 2', link: '/revue-2' },
      { text: 'Revue 3', link: '/revue-3' }
    ],

    sidebar: [
      {
        text: 'Revues',
        items: [
          { text: 'Revue 1', link: '/revue-1' },
          { text: 'Revue 2', link: '/revue-2' },
          { text: 'Revue 3', link: '/revue-3' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
