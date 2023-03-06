<script setup lang="ts">
import { markRaw, ref } from 'vue'
import V3Dragblock from '../../packages/v3-dragblock/src'

import GridCellOne from './components/GridCellOne.vue'
import GridCellTwo from './components/GridCellTwo.vue'
import GridCellThree from './components/GridCellThree.vue'
import GridCellFour from './components/GridCellFour.vue'

const gridCells = ref([
  { id: '0', index: 0, x: 20, y: 35, width: 190, height: 110, component: markRaw(GridCellOne) }, // 辫子
  { id: '1', index: 0, x: 465, y: 25, width: 170, height: 160, component: markRaw(GridCellTwo) }, // 摆手
  { id: '2', index: 0, x: 385, y: 265, width: 200, height: 50, component: markRaw(GridCellThree) }, // text
  { id: '3', index: 0, x: 150, y: 195, width: 130, height: 130, component: markRaw(GridCellFour) }, // 白边
])

const adsorbLineStyle = {
  stroke: 'black',
  fill: 'black',
  strokeWidth: 2,
}

const print = (val: string, e: any) => {
  // console.log(val, e)
}
</script>

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
    @drag-end="print('drag-end', $event)"
    @resizing="print('resizing', $event)"
    @resize-start="print('resize-start', $event)"
    @resize-end="print('resize-end', $event)"
  />
</template>

<style scoped>
.V3Dragblock{
  width: 80vw;
  height: 40vh;
  outline: 10px solid #474747;
  background: #f7f4f0;
  border-radius: 10px;
  border-width: 1px;
  position: relative;
  overflow: hidden;
}
</style>
