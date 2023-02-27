import { defineConfig } from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['absolute-center', 'absolute left-[50%] translate-x-[50%] '],
    ['flex-center', 'flex flex-row justify-center items-center'],
    ['div-contrary', 'bg-[var(--bg-contrary)] rounded-md p-3px hover:bg-[var(--bg-contrary-light)]'],
    ['text-contrary', ' p-3px hover:text-[var(--text-contrary)]'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
