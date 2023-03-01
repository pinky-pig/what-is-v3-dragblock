<div align="center">
	<h1 style="margin:10px">vitepress-demo-preview</h1>
	<h6 align="center">Demo of Vue SFC components in vitepress</h6>
</div>

## Requirements

>  后续会进行代码优化，并支持 Vue2 和 React 版本。

- Vue >= 2.7 or Vue >= 3.0

## 🏄‍♂️ Packages

| Package                                                 | Version (click for changelogs)                                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [@vitepress-demo-preview/component](packages/component) | [![component version](https://badgen.net/npm/v/@vitepress-demo-preview/component)](packages/component/CHANGELOG.md) |
| [@vitepress-demo-preview/plugin](packages/plugin)       | [![plugin version](https://badgen.net/npm/v/@vitepress-demo-preview/plugin)](packages/plugin/CHANGELOG.md)          |

## 🔥Installation

```sh
pnpm add @vitepress-demo-preview/component @vitepress-demo-preview/plugin
```

## ⚡Usage

configure in your vitepress/theme entry file

```ts
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('DemoPreview', AntDesignContainer)
  }
}
```

configure markdown to add plugin

```ts
import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  }v
})
```

### Preview of Component Form

```md
<preview path="./xxx/xx.vue" title="title" description="component description content"></preview>
```

### Preview by Container Form

```md
:::preview title || component description content

demo-preview=./xxx/xx.vue

:::
```

## 👊 TODO

- [ ] Integration demo component of other UI frameworks
  - [x] Ant Design Container
  - [ ] ElementPlus Container
  - [ ] Naive UI Container
