<script setup lang="ts">
import V3Dragblock from 'v3-dragblock'
import { markRaw, ref } from 'vue'
import GridCellOne from './src/components/GridCellOne.vue'
import GridCellTwo from './src/components/GridCellTwo.vue'
import GridCellThree from './src/components/GridCellThree.vue'
import GridCellFour from './src/components/GridCellFour.vue'
// import GridContainer from '~/package/GridContainer.vue'
// shallowRef(defineAsyncComponent(() => import('./GridCellOne.vue')))

const CELLS = [
  { id: '0', index: 0, x: 80, y: 310, width: 180, height: 230, component: markRaw(GridCellOne) },
  { id: '1', index: 0, x: 550, y: 95, width: 240, height: 240, component: markRaw(GridCellTwo) },
  { id: '2', index: 0, x: 377, y: 457, width: 305, height: 70, component: markRaw(GridCellThree) },
  { id: '3', index: 0, x: 180, y: 30, width: 130, height: 145, component: markRaw(GridCellFour) },
]

const gridCells = ref(CELLS)

const adsorbLineStyle = {
  stroke: 'black',
  fill: 'black',
  strokeWidth: 2,
}

const print = (val: string, e: any) => {
  // eslint-disable-next-line no-console
  console.log(val, e)
}
// initLastLayout()
// /**
//  * 从JSON中获取Layout
//  */
// function initLastLayout() {
//   const lastLayoutJSON = localStorage.getItem('layoutJSON')
//   if (lastLayoutJSON) {
//     const lastLayout = JSON.parse(lastLayoutJSON)
//     for (let i = 0; i < lastLayout.length; i++) {
//       for (let j = 0; j < gridCells.value.length; j++) {
//         if (lastLayout[i].id === gridCells.value[j].id)
//           Object.assign(gridCells.value[j], lastLayout[i])
//       }
//     }
//   }
// }
/**
 * 存储到JSON
 */
const save = (val: string, e: any) => {
  if (val === 'drag-end' || val === 'resize-end') {
    // localStorage.setItem('layoutJSON', JSON.stringify(e))
  }
}
</script>

<template>
  <div class="drag-container">
    <div class="drag-canvas">
      <div class="drag-canvas-bottom">
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
      </div>
    </div>

    <div class="foot">
      <button>
        <a href="https://www.npmjs.com/package/v3-dragblock" title="NPM" target="_blank">
          <svg class="foot-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M4 28V4h24v24H4zM8.5 8.5v15H16v-12h4.5v12h3v-15h-15z" /></svg>
        </a>
      </button>
      <button>
        <a href="https://github.com/pinky-pig/what-is-v3-dragblock" title="Github" target="_blank">
          <svg class="foot-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" fill-rule="evenodd" d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2Z" /></svg>
        </a>
      </button>
      <button>
        <a href="https://what-is-v3-dragblock.vercel.app/" title="Document" target="_blank">
          <svg class="foot-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m25.7 9.3l-7-7c-.2-.2-.4-.3-.7-.3H8c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-.3-.1-.5-.3-.7zM18 4.4l5.6 5.6H18V4.4zM24 28H8V4h8v6c0 1.1.9 2 2 2h6v16z" /><path fill="currentColor" d="M10 22h12v2H10zm0-6h12v2H10z" /></svg>
        </a>
      </button>
    </div>
  </div>
</template>

<style scoped>
.foot-svg{
  color: inherit;
  height: 1.7em;
  width: 1.7em;
  color: #A2A7B3;
}
button{
  cursor: pointer;
  color: black;
  background: transparent;
  border: 0px solid black;
}
.drag-container{
  background: #f7f4f0;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.drag-canvas {
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 0.75em;
  display: inline-flex;
}
.drag-canvas-bottom {
  border-radius: 0.75em;
  padding: 10px;
  background: black;
}

.V3Dragblock{
  background: #f7f4f0;
  width: 75vw;
  height: 75vh;
  border-radius: 10px;
  border-width: 1px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}

.foot{
  user-select: none;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: rgba(156, 163, 175, 1);
  margin: 1.25rem;
  display: flex;
  justify-content: center;
  grid-gap: 5px;
  gap: 5px;
}
</style>
