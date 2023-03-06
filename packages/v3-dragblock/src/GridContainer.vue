<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import type { GridCellsType, GridContainerProps } from './GridContainer'
import { initGridContainer } from './GridContainer'
import BoundsSVGContainer from './BoundsSVGContainer.vue'
const props: GridContainerProps = defineProps({
  activated: {
    default: true,
  },
  gridCells: {
    default: [
      { id: '0', index: 0, x: 0, y: 0, width: 100, height: 100, component: '' },
      { id: '1', index: 1, x: 300, y: 0, width: 100, height: 100, component: '' },
    ] as GridCellsType[],
  },
  // 可拖拽
  draggable: {
    default: true,
  },
  // 可缩放
  resizable: {
    default: true,
  },
  // 可吸附
  adsorbable: {
    default: true,
  },
  // 吸附线样式
  adsorbLineStyle: {
    default: {
      stroke: '#58815790',
      fill: '#58815790',
      strokeWidth: 2,
    },
  },
  // 可吸附的距离
  adsorbDeviation: {
    default: 5,
  },
})
const emit = defineEmits(['dragging', 'dragStart', 'dragEnd', 'resizing', 'resizeStart', 'resizeEnd'])

const gridCells = ref(props.gridCells)

const adsorbedLine: Ref<{ l: any[]; mv: any[];r: any[];t: any[];mh: any[];b: any[] } > = ref({ l: [], mv: [], r: [], t: [], mh: [], b: [] })
const currentClickedElement: Ref<any> = ref()
// 1.初始化盒子，给盒子添加鼠标点击事件
const gridContainerRef = ref()
onMounted(() => {
  initGridContainer(gridContainerRef, gridCells, currentClickedElement, adsorbedLine, props, emit)
})
</script>

<template>
  <div ref="gridContainerRef" style="touch-action:none">
    <component
      :is="item.component"
      v-for="item, index in gridCells"
      :id="`${item.id}`"
      :key="item.id"
      v-model="gridCells[index]"
      :style="{
        position: 'absolute',
        left: `${item.x}px`,
        top: `${item.y}px`,
        width: `${item.width}px`,
        height: `${item.height}px`,
      }"
    />
    <BoundsSVGContainer
      v-if="props.activated"
      v-model="currentClickedElement"
      :current-clicked-element="currentClickedElement"
      :adsorbed-line="adsorbedLine"
      :adsorb-line-style="adsorbLineStyle"
    />
  </div>
</template>
