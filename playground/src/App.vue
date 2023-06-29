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
    <a target="_blank" href="https://github.com/pinky-pig/what-is-v3-dragblock" class="item"> GitHub </a>
    <a target="_blank" href="https://mmeme.me/" class="item"> Demo </a>
  </footer>
</template>

<style scoped>
.V3Dragblock{
  width: 80vw;
  height: 80vh;
  outline: 10px solid #474747;
  background: #f7f4f0;
  border-radius: 10px;
  border-width: 1px;
  position: relative;
  overflow: hidden;
}
.footer{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
.item{
  margin: 0 10px;
  color: #474747;
  text-decoration: none;
  margin: 10px 10px;
  font-weight: 800;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
}
.item:hover{
  color: #f7f4f0;
  background: #474747;
  border-radius: 5px;
}
</style>
