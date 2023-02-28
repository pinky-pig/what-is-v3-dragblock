# Configurations

这里展示一些组件的配置，包括设置 拖拽、缩放、吸附功能是否开启，以及一些事件方法。

```vue
<template>
  <V3Dragblock
    class="V3Dragblock"
    :grid-cells="gridCells"
    :draggable="true"
    :resizable="true"
    :adsorbable="true"
    :adsorb-line-style="adsorbLineStyle"
    @dragging="print('dragging', $event)"
    @drag-start="print('drag-start', $event)"
    @drag-end="save('drag-end', $event)"
    @resizing="print('resizing', $event)"
    @resize-start="print('resize-start', $event)"
    @resize-end="save('resize-end', $event)"
  />
</template>
```

## `class="V3Dragblock"`

盒子的类名，用于比如设置拖拽盒子的尺寸或是一些其他 style 样式。子元素位置是在这个盒子内部的，不能超过这个尺寸。

## `:grid-cells="gridCells"`

> 需要用 `ref` 包着，具有响应性。

传入要拖拽的组件数组，要具有以下格式：

```js
import V3Dragblock from 'v3-dragblock'
import GridCellOne from '../components/GridCellOne.vue'
import GridCellTwo from '../components/GridCellTwo.vue'
import GridCellThree from '../components/GridCellThree.vue'
import GridCellFour from '../components/GridCellFour.vue'

const gridCells = ref([
  { id: '0', index: 0, x: 80, y: 310, width: 180, height: 230, component: markRaw(GridCellOne) },
  { id: '1', index: 0, x: 550, y: 95, width: 240, height: 240, component: markRaw(GridCellTwo) },
  { id: '2', index: 0, x: 377, y: 457, width: 305, height: 70, component: markRaw(GridCellThree) },
  { id: '3', index: 0, x: 180, y: 30, width: 130, height: 145, component: markRaw(GridCellFour) },
])
```

- 🍔 id : 唯一标识
- 🍕 index : 层级，两个元素重叠的层级
- 🍟 x : 离盒子的左边距离
- 🌭 y : 离盒子的上边距离
- 🍿 width : 元素的宽度
- 🧂 height : 元素的高度
- 🍜 component : 自定义的组件


## `:draggable="true" | :resizable="true" | :adsorbable="true"`

分别是拖拽、缩放、吸附功能

- true 开启
- false 禁用

## `:adsorb-line-style="adsorbLineStyle"`

开启吸附功能的时候，吸附线的样式

```js
const adsorbLineStyle = {
  stroke: 'black',
  fill: 'black',
  strokeWidth: 2,
}
```

## `@dragging="print('dragging', $event)" | @resizing="print('resizing', $event)"`
  
正在拖拽中的事件， 其实就是监听的 move 事件，返回的是当前拖拽的组件 。

```
{ id: '0', index: 0, x: 80, y: 310, width: 180, height: 230, component: markRaw(GridCellOne) }
```

## `@drag-start="print('drag-start', $event)" | @resize-start="print('resize-start', $event)"`

开始拖拽时事件， 其实就是监听的 down 事件，返回的是当前拖拽的组件。

```
{ id: '0', index: 0, x: 80, y: 310, width: 180, height: 230, component: markRaw(GridCellOne) }
```

## `@drag-end="save('drag-end', $event)" | @resize-end="save('resize-end', $event)"`

拖拽结束时事件， 其实就是监听的 up 事件，返回的是当前盒子内所有组件的拖拽位置信息。

```
[
  { id: '0', index: 0, x: 80, y: 310, width: 180, height: 230},
  { id: '1', index: 0, x: 550, y: 95, width: 240, height: 240 },
  { id: '2', index: 0, x: 377, y: 457, width: 305, height: 70 },
  { id: '3', index: 0, x: 180, y: 30, width: 130, height: 145 },
]
```
