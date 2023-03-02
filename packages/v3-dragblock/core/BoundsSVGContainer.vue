<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface GridCellType {
  id: string
  x: number
  y: number
  width: number
  height: number
  isLocked: boolean // 是否锁定
  showMode: number
  transform: string
  children?: any
}

const props = defineProps(['currentClickedElement', 'adsorbedLine', 'adsorbLineStyle'])
// const emits = defineEmits(['update:modelValue'])
const borderWidth = 10

// 1.四条边 scale 四个角落点 scale 四个旋转角落点 rotate
const rectLineData = ref([
  {
    name: 'line_top_scale',
    bounds: {
      x: computed(() => (props.currentClickedElement?.x) || 0),
      y: computed(() => (props.currentClickedElement?.y - borderWidth / 2) || 0),
      width: computed(() => props.currentClickedElement?.width || 0),
      height: 10,
    },
    style: {
      cursor: 'ns-resize',
      transform: computed(() => (props.currentClickedElement?.transform)),
    },
  },
  {
    name: 'line_bottom_scale',
    bounds: {
      x: computed(() => props.currentClickedElement?.x || 0),
      y: computed(() => (props.currentClickedElement?.y + props.currentClickedElement?.height - borderWidth / 2) || 0),
      width: computed(() => props.currentClickedElement?.width || 0),
      height: 10,
    },
    style: {
      cursor: 'ns-resize',
      transform: computed(() => (props.currentClickedElement?.transform)),
    },
  },
  {
    name: 'line_left_scale',
    bounds: {
      x: computed(() => (props.currentClickedElement?.x - borderWidth / 2) || 0),
      y: computed(() => props.currentClickedElement?.y || 0),
      width: 10,
      height: computed(() => props.currentClickedElement?.height || 0),
    },
    style: {
      cursor: 'ew-resize',
      transform: computed(() => (props.currentClickedElement?.transform)),
    },
  },
  {
    name: 'line_right_scale',
    bounds: {
      x: computed(() => (props.currentClickedElement?.x + props.currentClickedElement?.width - borderWidth / 2) || 0),
      y: computed(() => props.currentClickedElement?.y || 0),
      width: 10,
      height: computed(() => props.currentClickedElement?.height || 0),
    },
    style: {
      cursor: 'ew-resize',
      transform: computed(() => (props.currentClickedElement?.transform)),
    },
  },
])

// 2.缩放四角
const rectCornerScaleData = ref([
  {
    name: 'corner_top_left_scale',
    bounds: {
      x: computed(() => (props.currentClickedElement?.x - borderWidth / 2) || 0),
      y: computed(() => (props.currentClickedElement?.y - borderWidth / 2) || 0),
      width: 10,
      height: 10,
    },
    style: {
      cursor: 'nwse-resize',
      transform: computed(() => (props.currentClickedElement?.transform)),
    },
  },
  {
    name: 'corner_top_right_scale',
    bounds: {
      x: computed(() => (props.currentClickedElement?.x + props.currentClickedElement?.width - borderWidth / 2) || 0),
      y: computed(() => (props.currentClickedElement?.y - borderWidth / 2) || 0),
      width: 10,
      height: 10,
    },
    style: {
      cursor: 'nesw-resize',
      transform: computed(() => (props.currentClickedElement?.transform)),
    },
  },
  {
    name: 'corner_bottom_left_scale',
    bounds: {
      x: computed(() => (props.currentClickedElement?.x - borderWidth / 2) || 0),
      y: computed(() => (props.currentClickedElement?.y + props.currentClickedElement?.height - borderWidth / 2) || 0),
      width: 10,
      height: 10,
    },
    style: {
      cursor: 'nesw-resize',
      transform: computed(() => (props.currentClickedElement?.transform)),
    },
  },
  {
    name: 'corner_bottom_right_scale',
    bounds: {
      x: computed(() => (props.currentClickedElement?.x + props.currentClickedElement?.width - borderWidth / 2) || 0),
      y: computed(() => (props.currentClickedElement?.y + props.currentClickedElement?.height - borderWidth / 2) || 0),
      width: 10,
      height: 10,
    },
    style: {
      cursor: 'nwse-resize',
      transform: computed(() => (props.currentClickedElement?.transform)),
    },
  },
])

// 3.旋转四角

// 4.六条吸附线，左中右上中下
const defaultAttachedLine = { x1: 0, y1: 0, x2: 0, y2: 0 }
const adsorbedLineData = ref({
  l: { name: 'left', ...defaultAttachedLine },
  mv: { name: 'middleVertical', ...defaultAttachedLine },
  r: { name: 'right', ...defaultAttachedLine },
  t: { name: 'top', ...defaultAttachedLine },
  mh: { name: 'middleHorizontal', ...defaultAttachedLine },
  b: { name: 'bottom', ...defaultAttachedLine },
})
watch(props.adsorbedLine, (v) => {
  handleAttachedLineLeft(v.l)
  handleAttachedLineRight(v.r)
  handleAttachedLineMiddleVertical(v.mv)
  handleAttachedLineTop(v.t)
  handleAttachedLineBottom(v.b)
  handleAttachedLineMiddleHorizontal(v.mh)
})

// 从单个cell获取其坐标位置大小
function getXYFromTransform(cellCfg: GridCellType) {
  if (!cellCfg)
    return { x: 0, y: 0, width: 0, height: 0 }

  const result = { x: cellCfg.x, y: cellCfg.y, width: cellCfg.width, height: cellCfg.height }
  return result
}
// 监听左吸附线的位置
function handleAttachedLineLeft(leftArr: any[]) {
  // 如果数组不为空，说明有左吸附线
  if (leftArr.length > 0) {
    // 1.计算x值
    const clickedElementRect = getXYFromTransform(props.currentClickedElement)
    // const xPosition = clickedElementRect.x
    const firstDataRect = getXYFromTransform(leftArr[0])
    const xPosition = leftArr[0].type === 0 ? firstDataRect.x : firstDataRect.x + firstDataRect.width

    // 2.计算y值
    let minY = clickedElementRect.y
    let maxY = clickedElementRect.y + clickedElementRect.height
    const lLineArr = [...leftArr, props.currentClickedElement]
    if (lLineArr.length > 0) {
      // 获取每个对象的matrix值
      for (let i = 0; i < lLineArr.length; i++) {
        const rect = getXYFromTransform(lLineArr[i])
        minY = Math.min(minY, rect.y)
        maxY = Math.max(maxY, rect.y + rect.height)
      }
    }
    adsorbedLineData.value.l.x1 = xPosition
    adsorbedLineData.value.l.y1 = minY
    adsorbedLineData.value.l.x2 = xPosition
    adsorbedLineData.value.l.y2 = maxY
  }
  else {
    // 将线条位置置为0
    for (const key in adsorbedLineData.value.l)
      adsorbedLineData.value.l[key] = 0
  }
}
// 监听右吸附线的位置
function handleAttachedLineRight(rightArr: any[]) {
  // 如果数组不为空，说明有左吸附线
  if (rightArr.length > 0) {
    // 1.计算x值
    const clickedElementRect = getXYFromTransform(props.currentClickedElement)
    // const xPosition = clickedElementRect.x + clickedElementRect.width

    const firstDataRect = getXYFromTransform(rightArr[0])
    const xPosition = rightArr[0].type === 0 ? (firstDataRect.x - clickedElementRect.width) : (firstDataRect.x + firstDataRect.width - clickedElementRect.width)

    // 2.计算y值
    let minY = clickedElementRect.y
    let maxY = clickedElementRect.y + clickedElementRect.height
    const lLineArr = [...rightArr, props.currentClickedElement]
    if (lLineArr.length > 0) {
      // 获取每个对象的matrix值
      for (let i = 0; i < lLineArr.length; i++) {
        const rect = getXYFromTransform(lLineArr[i])
        minY = Math.min(minY, rect.y)
        maxY = Math.max(maxY, rect.y + rect.height)
      }
    }
    adsorbedLineData.value.r.x1 = xPosition + clickedElementRect.width
    adsorbedLineData.value.r.y1 = minY
    adsorbedLineData.value.r.x2 = xPosition + clickedElementRect.width
    adsorbedLineData.value.r.y2 = maxY
  }
  else {
    // 将线条位置置为0
    for (const key in adsorbedLineData.value.l)
      adsorbedLineData.value.r[key] = 0
  }
}
// 监听中间吸附线的位置
function handleAttachedLineMiddleVertical(middleVerticalArr: any[]) {
  // 如果数组不为空，说明有左吸附线
  if (middleVerticalArr.length > 0) {
    // 1.计算x值
    const clickedElementRect = getXYFromTransform(props.currentClickedElement)
    // const xPosition = clickedElementRect.x + clickedElementRect.width / 2
    const firstDataRect = getXYFromTransform(middleVerticalArr[0])
    const xPosition = firstDataRect.x + firstDataRect.width / 2

    // 2.计算y值
    let minY = clickedElementRect.y
    let maxY = clickedElementRect.y + clickedElementRect.height
    const lLineArr = [...middleVerticalArr, props.currentClickedElement]
    if (lLineArr.length > 0) {
      // 获取每个对象的matrix值
      for (let i = 0; i < lLineArr.length; i++) {
        const rect = getXYFromTransform(lLineArr[i])
        minY = Math.min(minY, rect.y)
        maxY = Math.max(maxY, rect.y + rect.height)
      }
    }
    adsorbedLineData.value.mv.x1 = xPosition
    adsorbedLineData.value.mv.y1 = minY
    adsorbedLineData.value.mv.x2 = xPosition
    adsorbedLineData.value.mv.y2 = maxY
  }
  else {
    // 将线条位置置为0
    for (const key in adsorbedLineData.value.l)
      adsorbedLineData.value.mv[key] = 0
  }
}
// 监听上吸附线的位置
function handleAttachedLineTop(topArr: any[]) {
  // 如果数组不为空，说明有左吸附线
  if (topArr.length > 0) {
    // 1.计算y值
    const clickedElementRect = getXYFromTransform(props.currentClickedElement)
    // const yPosition = clickedElementRect.y

    const firstDataRect = getXYFromTransform(topArr[0])
    const yPosition = topArr[0].type === 0 ? firstDataRect.y : firstDataRect.y + firstDataRect.height

    // 2.计算x值
    let minX = clickedElementRect.x
    let maxX = clickedElementRect.x + clickedElementRect.width
    const lLineArr = [...topArr, props.currentClickedElement]
    if (lLineArr.length > 0) {
      // 获取每个对象的matrix值
      for (let i = 0; i < lLineArr.length; i++) {
        const rect = getXYFromTransform(lLineArr[i])
        minX = Math.min(minX, rect.x)
        maxX = Math.max(maxX, rect.x + rect.width)
      }
    }
    adsorbedLineData.value.t.x1 = minX
    adsorbedLineData.value.t.y1 = yPosition
    adsorbedLineData.value.t.x2 = maxX
    adsorbedLineData.value.t.y2 = yPosition
  }
  else {
    // 将线条位置置为0
    for (const key in adsorbedLineData.value.l)
      adsorbedLineData.value.t[key] = 0
  }
}
// 监听下吸附线的位置
function handleAttachedLineBottom(bottomArr: any[]) {
  // 如果数组不为空，说明有左吸附线
  if (bottomArr.length > 0) {
    // 1.计算y值
    const clickedElementRect = getXYFromTransform(props.currentClickedElement)
    // const yPosition = clickedElementRect.y + clickedElementRect.height

    const firstDataRect = getXYFromTransform(bottomArr[0])
    const yPosition = bottomArr[0].type === 0 ? (firstDataRect.y - clickedElementRect.height) : (firstDataRect.y + firstDataRect.height - clickedElementRect.height)

    // 2.计算x值
    let minX = clickedElementRect.x
    let maxX = clickedElementRect.x + clickedElementRect.width
    const lLineArr = [...bottomArr, props.currentClickedElement]
    if (lLineArr.length > 0) {
      // 获取每个对象的matrix值
      for (let i = 0; i < lLineArr.length; i++) {
        const rect = getXYFromTransform(lLineArr[i])
        minX = Math.min(minX, rect.x)
        maxX = Math.max(maxX, rect.x + rect.width)
      }
    }
    adsorbedLineData.value.b.x1 = minX
    adsorbedLineData.value.b.y1 = yPosition + clickedElementRect.height
    adsorbedLineData.value.b.x2 = maxX
    adsorbedLineData.value.b.y2 = yPosition + clickedElementRect.height
  }
  else {
    // 将线条位置置为0
    for (const key in adsorbedLineData.value.l)
      adsorbedLineData.value.b[key] = 0
  }
}
function handleAttachedLineMiddleHorizontal(middleHorizontalArr: any[]) {
  // 如果数组不为空，说明有左吸附线
  if (middleHorizontalArr.length > 0) {
    // 1.计算y值
    const clickedElementRect = getXYFromTransform(props.currentClickedElement)
    // const yPosition = clickedElementRect.y + clickedElementRect.height / 2
    const firstDataRect = getXYFromTransform(middleHorizontalArr[0])
    const yPosition = firstDataRect.y + firstDataRect.height / 2

    // 2.计算x值
    let minX = clickedElementRect.x
    let maxX = clickedElementRect.x + clickedElementRect.width
    const lLineArr = [...middleHorizontalArr, props.currentClickedElement]
    if (lLineArr.length > 0) {
      // 获取每个对象的matrix值
      for (let i = 0; i < lLineArr.length; i++) {
        const rect = getXYFromTransform(lLineArr[i])
        minX = Math.min(minX, rect.x)
        maxX = Math.max(maxX, rect.x + rect.width)
      }
    }
    adsorbedLineData.value.mh.x1 = minX
    adsorbedLineData.value.mh.y1 = yPosition
    adsorbedLineData.value.mh.x2 = maxX
    adsorbedLineData.value.mh.y2 = yPosition
  }
  else {
    // 将线条位置置为0
    for (const key in adsorbedLineData.value.l)
      adsorbedLineData.value.mh[key] = 0
  }
}
</script>

<template>
  <svg
    v-show="props.currentClickedElement"
    id="boundsSVGContainer"
    style="pointer-events: none;width: 100%;height: 100%;top: 0;left: 0;position: absolute;"
  >
    <!-- bounds -->
    <g>
      <rect
        :style="{ opacity: 1 }"
        :x="props.currentClickedElement?.x"
        :y="props.currentClickedElement?.y"
        :width="props.currentClickedElement?.width > 0 ? props.currentClickedElement?.width : 0"
        :height="props.currentClickedElement?.height > 0 ? props.currentClickedElement?.height : 0"
        fill="#2f80ed40"
        stroke="#2f80ed"
        stroke-width="3px"
      />
    </g>
    <!-- 缩放四边 line -->
    <g style="pointer-events: auto;">
      <rect
        v-for="(item) in rectLineData"
        :id="`bounds_${item.name}`"
        :key="item.name"
        :style="{ opacity: 1, cursor: item.style.cursor }"
        :x="item.bounds.x"
        :y="item.bounds.y"
        :width="item.bounds.width > 0 ? item.bounds.width : 0"
        :height="item.bounds.height > 0 ? item.bounds.height : 0"
        fill="transparent"
        stroke="transparent"
        stroke-width="2px"
      />
    </g>

    <!-- 缩放四角 -->
    <g style="pointer-events: auto;">
      <rect
        v-for="(item) in rectCornerScaleData"
        :id="`bounds_${item.name}`"
        :key="item.name"
        :style="{ opacity: 1, cursor: item.style.cursor }"
        :rx="3"
        :ry="3"
        :x="item.bounds.x"
        :y="item.bounds.y"
        :width="item.bounds.width"
        :height="item.bounds.height"
        fill="white"
        stroke="#2f80ed"
        stroke-width="2"
      />
    </g>
    <!-- 旋转四角 -->

    <!-- 吸附线 -->
    <g style="pointer-events: auto;">
      <line
        v-for="(item, index) in Object.values(adsorbedLineData)"
        :key="item.name + index"
        :x1="item?.x1 || 0"
        :y1="item?.y1 || 0"
        :x2="item?.x2 || 0"
        :y2="item?.y2 || 0"
        :stroke="props.adsorbLineStyle.stroke"
        :fill="props.adsorbLineStyle.fill"
        :stroke-width="props.adsorbLineStyle.strokeWidth"
      />
    </g>

  </svg>
</template>
