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
    :activated="true"
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
  <footer class="footer">
    <a target="_blank" href="https://github.com/pinky-pig/what-is-v3-dragblock" class="item">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="currentColor" fill-rule="evenodd" d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2Z" /></svg>
    </a>
  </footer>
</template>

<style scoped>
.V3Dragblock{
  width: 80vw;
  height: 80vh;
  outline: 10px solid #000;
  background: #f7f4f0;
  border-radius: 10px;
  border-width: 1px;
  position: relative;
  overflow: hidden;
  box-shadow: 5px 5px 41px 5px rgba(0,0,0,.45);
}
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.item{
  cursor: pointer;
  padding: 10px;
}
</style>
