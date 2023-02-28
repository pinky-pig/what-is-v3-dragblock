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
