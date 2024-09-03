import { defineConfig } from 'vitepress'
import { mdPlugin } from './plugins/mdPlugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Schema Driven Development',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples??',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'Why??',
        items: [{ text: 'whyme', link: '/whyme' }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    lineNumbers: true,
    config: (md) => mdPlugin(md),
  },
})
