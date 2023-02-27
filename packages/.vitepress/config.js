import { defineConfig } from 'vitepress'
import blog from './sidebar_conf/blog'
import project from './sidebar_conf/project'

export default defineConfig({
  base: '/blog/',
  appearance: true, // 是否启用黑暗模式
  title: 'Arvin Blog', // 所有文档的浏览器标签title
  description: '阿文的博客', // 会渲染成<meta>标签，SEO用
  head: [
    ['link', { rel: 'icon', href: '/man.svg', crossorigin: '' }],
  ],

  themeConfig: {
    siteTitle: '',
    logo: { light: '/man_light.svg', dark: '/man_dark.svg' },
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdated: 'Last Updated', // string | boolean
    smoothScroll: true, // 启动页面丝滑滚动

    nav: [
      { text: 'About', link: '/about/', activeMatch: '/about/' },
      { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
      { text: 'Project', link: '/project/', activeMatch: '/project/' },
      {
        text: '🍌',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' },
        ],
      },

    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pinky-pig' },
    ],

    sidebar: {
      '/blog/': blog,
      '/project/': project,
    },

    algolia: {
      appId: 'L9KMDUKCGI',
      apiKey: 'ab27f8eec3147ace8f540b92e68504c7',
      indexName: 'pinky-pig',
      // searchParameters: {
      //     facetFilters: ['tags:guide,api']
      // }
    },

  },
})
