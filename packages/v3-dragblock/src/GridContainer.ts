import { useMouseInElement, useResizeObserver } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'

enum IMode {
  None = 'None',
  Drag = 'Drag',
  Rotate = 'Rotate',
  Resize = 'Resize',
}
type ModeTypes = keyof typeof IMode

type ScaleType = 'top' | 'bottom' | 'left' | 'right' | 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right' | null

export interface GridContainerProps {
  gridCells: GridCellsType[]
  activated: boolean
  draggable: boolean
  resizable: boolean
  adsorbable: boolean
  adsorbLineStyle: any
  adsorbDeviation: any
}
export interface GridCellsType {
  id: string
  index: number
  x: number
  y: number
  width: number
  height: number
  [key: string]: any
}

const transformMode: Ref< ModeTypes> = ref('None')
let currentScaleType: ScaleType = null
let DEVIATION = 5
let mouseFrom = { x: 0, y: 0 }
let mouseTo = { x: 0, y: 0 }
// 获取盒子 container 范围
let isMouseInContainerOutside: any
// const containerRefBounds = { x: 0, y: 0, width: 0, height: 0 }
// const domBounds = containerRef.value.getBoundingClientRect()
// Object.assign(containerRefBounds, domBounds)
const elementLimitSize = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}
export function initGridContainer(
  containerRef: Ref<HTMLElement>,
  gridCells: Ref<GridCellsType[]>,
  currentClickedElement: Ref<any>,
  adsorbedLine: Ref<{ l: any[]; mv: any[]; r: any[]; t: any[]; mh: any[]; b: any[] }>,
  propsOption: GridContainerProps,
  emit: any,
) {
  DEVIATION = propsOption.adsorbDeviation
  isMouseInContainerOutside = useMouseInElement(containerRef).isOutside

  watch(isMouseInContainerOutside, (v) => {
    // if (v)
    //   transformMode = 'None'
  })
  watch(currentClickedElement, (nVal, oVal) => {
    if (nVal) {
      // 1.拖拽最贴边 最大
      if (transformMode.value === 'Drag') {
        if (nVal.x < elementLimitSize.x)
          nVal.x = elementLimitSize.x
        if (nVal.y < elementLimitSize.y)
          nVal.y = elementLimitSize.y
        if ((nVal.x + nVal.width) > elementLimitSize.width)
          nVal.x = elementLimitSize.width - nVal.width
        if ((nVal.y + nVal.height) > elementLimitSize.height)
          nVal.y = elementLimitSize.height - nVal.height
      }
      if (transformMode.value === 'Resize') {
        // 2.缩放最贴边 最大
        // 最左，并且缩放的是左边
        // if (nVal.x < elementLimitSize.x && currentScaleType === 'left') {
        //   nVal.width += nVal.x
        //   nVal.x = 0
        // }
        // // 最上，缩放的是最上边
        // if (nVal.y <= elementLimitSize.y && currentScaleType === 'top') {
        //   nVal.height += nVal.y
        //   nVal.y = 0
        // }
        // // 最右，缩放的是最后边
        // if ((nVal.x + nVal.width) > elementLimitSize.width && currentScaleType === 'right') {
        //   nVal.width += (elementLimitSize.width - nVal.width - nVal.x)
        //   nVal.x = elementLimitSize.width - nVal.width
        // }
        // // 最下，缩放的是最下边
        // if ((nVal.y + nVal.height) > elementLimitSize.height && currentScaleType === 'bottom') {
        //   nVal.height += (elementLimitSize.height - nVal.height - nVal.y)
        //   nVal.y = elementLimitSize.height - nVal.height
        // }

        // if (currentScaleType === 'top_left') {
        //   if (nVal.x < elementLimitSize.x) {
        //     nVal.width += nVal.x
        //     nVal.x = 0
        //   }
        //   if (nVal.y <= elementLimitSize.y) {
        //     nVal.height += nVal.y
        //     nVal.y = 0
        //   }
        // }
        // if (currentScaleType === 'top_right') {
        //   if ((nVal.x + nVal.width) > elementLimitSize.width) {
        //     nVal.width += (elementLimitSize.width - nVal.width - nVal.x)
        //     nVal.x = elementLimitSize.width - nVal.width
        //   }
        //   if (nVal.y <= elementLimitSize.y) {
        //     nVal.height += nVal.y
        //     nVal.y = 0
        //   }
        // }
        // if (currentScaleType === 'bottom_left') {
        //   if ((nVal.y + nVal.height) > elementLimitSize.height) {
        //     nVal.height += (elementLimitSize.height - nVal.height - nVal.y)
        //     nVal.y = elementLimitSize.height - nVal.height
        //   }
        //   if (nVal.x < elementLimitSize.x) {
        //     nVal.width += nVal.x
        //     nVal.x = 0
        //   }
        // }
        // if (currentScaleType === 'bottom_right') {
        //   if ((nVal.y + nVal.height) > elementLimitSize.height) {
        //     nVal.height += (elementLimitSize.height - nVal.height - nVal.y)
        //     nVal.y = elementLimitSize.height - nVal.height
        //   }
        //   if ((nVal.x + nVal.width) > elementLimitSize.width) {
        //     nVal.width += (elementLimitSize.width - nVal.width - nVal.x)
        //     nVal.x = elementLimitSize.width - nVal.width
        //   }
        // }

        // 3.缩放最小
        // if (nVal.width <= 30 && currentScaleType === 'left') {
        //   nVal.x += nVal.width - 30
        //   nVal.width = 30
        // }
        // if (nVal.width <= 30 && currentScaleType === 'right')
        //   nVal.width = 30
        // if (nVal.height <= 30 && currentScaleType === 'top') {
        //   nVal.y += nVal.height - 30
        //   nVal.height = 30
        // }
        // if (nVal.height <= 30 && currentScaleType === 'bottom')
        //   nVal.height = 30
        // if (currentScaleType === 'top_left') {
        //   if (nVal.width <= 30) {
        //     nVal.x += nVal.width - 30
        //     nVal.width = 30
        //   }
        //   if (nVal.height <= 30) {
        //     nVal.y += nVal.height - 30
        //     nVal.height = 30
        //   }
        // }
        // if (currentScaleType === 'top_right') {
        //   if (nVal.height <= 30) {
        //     nVal.y += nVal.height - 30
        //     nVal.height = 30
        //   }
        //   if (nVal.width <= 30)
        //     nVal.width = 30
        // }
        // if (currentScaleType === 'bottom_left') {
        //   if (nVal.width <= 30) {
        //     nVal.x += nVal.width - 30
        //     nVal.width = 30
        //   }
        //   if (nVal.height <= 30)
        //     nVal.height = 30
        // }
        // if (currentScaleType === 'bottom_right') {
        //   if (nVal.width <= 30)
        //     nVal.width = 30
        //   if (nVal.height <= 30)
        //     nVal.height = 30
        // }
      }
    }
  },
  {
    deep: true,
  })

  watch(transformMode, (v, o) => {
    if (v === 'Drag') {
      emit('dragStart', currentClickedElement.value)
    }
    else if (v === 'None' && o === 'Drag') {
      emit('dragEnd', gridCells.value.map((item) => {
        return {
          id: item.id,
          index: item.index,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
        }
      }))
    }
    if (v === 'Resize') {
      emit('resizeStart', currentClickedElement.value)
    }
    else if (v === 'None' && o === 'Resize') {
      emit('resizeEnd', gridCells.value.map((item) => {
        return {
          id: item.id,
          index: item.index,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
        }
      }))
    }
  })

  useResizeObserver(containerRef, (entries) => {
    const entry = entries[0]
    const bounds = entry.contentRect
    elementLimitSize.x = bounds.x
    elementLimitSize.y = bounds.y
    elementLimitSize.width = bounds.width
    elementLimitSize.height = bounds.height
  })

  // 1.绑定鼠标事件
  watch(() => propsOption.activated, (v) => {
    if (v) {
      // 防止重复添加，先删除再添加
      removeMouseEvent()
      addMouseEvent()
    }
    else {
      removeMouseEvent()
    }
  }, {
    immediate: true,
  })
  // addMouseEvent()
  function removeMouseEvent() {
    window.removeEventListener('pointerdown', mousedown, false)
    window.removeEventListener('pointermove', mousemove, false)
    window.removeEventListener('pointerup', mouseup, false)
  }
  function addMouseEvent() {
    window.addEventListener('pointerdown', mousedown, false)
    window.addEventListener('pointermove', mousemove, false)
    window.addEventListener('pointerup', mouseup, false)
    // containerRef.value.addEventListener('mousedown', mousedown, false)
    // containerRef.value.addEventListener('mousemove', mousemove, false)
    // containerRef.value.addEventListener('mouseup', mouseup, false)
  }
  function mousedown(e: MouseEvent) {
    mouseFrom = { x: e.clientX, y: e.clientY }
    // 1. 设置模式 drag or scale
    const initElement = document.elementFromPoint(e.clientX, e.clientY)
    if (initElement && initElement?.id.startsWith('bounds_') && currentClickedElement.value) {
      // 进行尺寸改变的点
      if (initElement?.id.endsWith('_scale')) {
        transformMode.value = 'Resize'
        const tp = initElement?.id?.slice(7).match(/_(.*)_/)
        currentScaleType = tp && tp[1] as ScaleType
      }
      else if (initElement?.id.endsWith('_rotate')) {
        transformMode.value = 'Rotate'
      }
    }
    else {
      // 点击的是block
      currentClickedElement.value = getCellObjectInStoreFromPosition(mouseFrom)

      // 将点击的 block 置顶
      if (currentClickedElement.value) {
        transformMode.value = 'Drag'
        const index = gridCells.value.findIndex((ele: { id: any }) => ele.id === currentClickedElement.value.id)
        if (index !== -1) {
          const ele = gridCells.value.splice(index, 1)
          gridCells.value.push(ele[0])
        }
      }
    }
  }
  function mousemove(e: MouseEvent) {
    mouseTo = { x: e.clientX, y: e.clientY }
    const rect = containerRef.value?.getBoundingClientRect()

    if (!rect)
      return

    // 左边超过最左边边界 (mouseTo.x - rect.left) < 0
    // 上边超过最上边边界 (mouseTo.y - rect.top) < 0
    // 右边超过最右边边界 (rect.left + rect.width - mouseTo.x) < 0
    // 下边超过最下边边界 (rect.top + rect.height - mouseTo.y) < 0

    // 左边超过最右边（ 最小宽度 30 ） mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0
    // 上边超过最下边（ 最小高度 30 ） mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0
    // 右边超过最左边（ 最小宽度 30 ） mouseTo.x - 30 - rect.left - currentClickedElement.value?.x <= 0
    // 下边超过最上边（ 最小高度 30 ） mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0

    const disX = (mouseTo.x - mouseFrom.x)
    const disY = (mouseTo.y - mouseFrom.y)
    if (mouseFrom.x !== 0 && mouseFrom.y !== 0 && currentClickedElement.value) {
      if (transformMode.value === 'Drag' && propsOption.draggable && propsOption.adsorbable) {
        // currentClickedElement.value.x += disX
        // currentClickedElement.value.y += disY
        // mouseFrom = { x: e.clientX, y: e.clientY }

        // ///////////////////////////////////////////////////////////// //
        // 如果是先超过左边
        if (mouseTo.x - rect.left < 0) {
          currentClickedElement.value.x = 0
          if (mouseTo.y - rect.top < 0) {
            currentClickedElement.value.y = 0
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          if (rect.top + rect.height - mouseTo.y < 0) {
            currentClickedElement.value.y = rect.height - currentClickedElement.value.height
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.y += disY
          mouseFrom = { x: e.clientX, y: e.clientY }
          return
        }
        // 如果是先超过上边
        if (mouseTo.y - rect.top < 0) {
          currentClickedElement.value.y = 0

          if (mouseTo.x - rect.left < 0) {
            currentClickedElement.value.x = 0
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          if (rect.left + rect.width - mouseTo.x < 0) {
            currentClickedElement.value.x = rect.width - currentClickedElement.value.width
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.x += disX
          mouseFrom = { x: e.clientX, y: e.clientY }
          return
        }
        // 如果先超过右边
        if (rect.left + rect.width - mouseTo.x < 0) {
          currentClickedElement.value.x = rect.width - currentClickedElement.value.width

          if (mouseTo.y - rect.top < 0) {
            currentClickedElement.value.y = 0
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          if (rect.top + rect.height - mouseTo.y < 0) {
            currentClickedElement.value.y = rect.height - currentClickedElement.value.height
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.y += disY
          mouseFrom = { x: e.clientX, y: e.clientY }
          return
        }
        // 如果先超过下边
        if (rect.top + rect.height - mouseTo.y < 0) {
          currentClickedElement.value.y = rect.height - currentClickedElement.value.height

          if (mouseTo.x - rect.left < 0) {
            currentClickedElement.value.x = 0
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          if (rect.left + rect.width - mouseTo.x < 0) {
            currentClickedElement.value.x = rect.width - currentClickedElement.value.width
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.x += disX
          mouseFrom = { x: e.clientX, y: e.clientY }
          return
        }
        // ///////////////////////////////////////////////////////////// //

        if (adsorbedLine.value.l.length === 0 && adsorbedLine.value.r.length === 0) {
          currentClickedElement.value.x += disX
          adsorbedLine.value.l = []
          adsorbedLine.value.r = []
          mouseFrom = Object.assign(mouseFrom, { x: e.clientX })
          createAttachedLineForDrag('l')
          createAttachedLineForDrag('r')
        }
        else if (adsorbedLine.value.l.length > 0 && adsorbedLine.value.r.length === 0) {
          const left = adsorbedLine.value.l[0]
          if (
            ((Math.abs(left.x) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x) + DEVIATION))
            || ((Math.abs(left.x + left.width) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x + left.width) + DEVIATION))
          ) {
            // 在误差内。不能缩放了
          }
          else {
            // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
            currentClickedElement.value.x += disX
            adsorbedLine.value.l = []
            mouseFrom = Object.assign(mouseFrom, { x: e.clientX })
            createAttachedLineForDrag('l')
          }
        }
        else if (adsorbedLine.value.l.length === 0 && adsorbedLine.value.r.length > 0) {
          const right = adsorbedLine.value.r[0]
          if (
            ((Math.abs(right.x) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x) + DEVIATION))
            || ((Math.abs(right.x + right.width) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x + right.width) + DEVIATION))
          ) {
            // 在误差内。不能缩放了
          }
          else {
            currentClickedElement.value.x += disX
            adsorbedLine.value.r = []
            mouseFrom = Object.assign(mouseFrom, { x: e.clientX })
            createAttachedLineForDrag('r')
          }
        }
        else if (adsorbedLine.value.l.length > 0 && adsorbedLine.value.r.length > 0) {
          const left = adsorbedLine.value.l[0]
          if (
            ((Math.abs(left.x) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x) + DEVIATION))
            || ((Math.abs(left.x + left.width) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x + left.width) + DEVIATION))
          ) {
            // 在误差内。不能缩放了
          }
          else {
            // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
            currentClickedElement.value.x += disX
            adsorbedLine.value.l = []
            mouseFrom = Object.assign(mouseFrom, { x: e.clientX })
            createAttachedLineForDrag('l')
          }
        }

        if (adsorbedLine.value.t.length === 0 && adsorbedLine.value.b.length === 0) {
          currentClickedElement.value.y += disY
          adsorbedLine.value.t = []
          adsorbedLine.value.b = []
          mouseFrom = Object.assign(mouseFrom, { y: e.clientY })
          createAttachedLineForDrag('t')
          createAttachedLineForDrag('b')
        }
        else if (adsorbedLine.value.t.length > 0 && adsorbedLine.value.b.length === 0) {
          const top = adsorbedLine.value.t[0]
          if (
            ((Math.abs(top.y) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y) + DEVIATION))
            || ((Math.abs(top.y + top.height) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y + top.height) + DEVIATION))
          ) {
            // 在误差内。不能缩放了
          }
          else {
            // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
            currentClickedElement.value.y += disY
            adsorbedLine.value.t = []
            mouseFrom = Object.assign(mouseFrom, { y: e.clientY })
            createAttachedLineForDrag('t')
          }
        }
        else if (adsorbedLine.value.t.length === 0 && adsorbedLine.value.b.length > 0) {
          const bottom = adsorbedLine.value.b[0]
          if (
            ((Math.abs(bottom.y) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y) + DEVIATION))
            || ((Math.abs(bottom.y + bottom.height) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y + bottom.height) + DEVIATION))
          ) {
            // 在误差内。不能缩放了
          }
          else {
            currentClickedElement.value.y += disY
            adsorbedLine.value.b = []
            mouseFrom = { x: e.clientX, y: e.clientY }
            createAttachedLineForDrag('b')
          }
        }
        else if (adsorbedLine.value.t.length > 0 && adsorbedLine.value.b.length > 0) {
          const bottom = adsorbedLine.value.b[0]
          if (
            ((Math.abs(bottom.y) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y) + DEVIATION))
            || ((Math.abs(bottom.y + bottom.height) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y + bottom.height) + DEVIATION))
          ) {
            // 在误差内。不能缩放了
          }
          else {
            currentClickedElement.value.y += disY
            adsorbedLine.value.b = []
            mouseFrom = { x: e.clientX, y: e.clientY }
            createAttachedLineForDrag('b')
          }
        }

        emit('dragging', currentClickedElement.value)
      }
      if (transformMode.value === 'Drag' && propsOption.draggable && !propsOption.adsorbable) {
        // ///////////////////////////////////////////////////////////// //
        // 如果是先超过左边
        if (mouseTo.x - rect.left < 0) {
          currentClickedElement.value.x = 0
          if (mouseTo.y - rect.top < 0) {
            currentClickedElement.value.y = 0
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          if (rect.top + rect.height - mouseTo.y < 0) {
            currentClickedElement.value.y = rect.height - currentClickedElement.value.height
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.y += disY
          mouseFrom = { x: e.clientX, y: e.clientY }
          return
        }
        // 如果是先超过上边
        if (mouseTo.y - rect.top < 0) {
          currentClickedElement.value.y = 0

          if (mouseTo.x - rect.left < 0) {
            currentClickedElement.value.x = 0
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          if (rect.left + rect.width - mouseTo.x < 0) {
            currentClickedElement.value.x = rect.width - currentClickedElement.value.width
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.x += disX
          mouseFrom = { x: e.clientX, y: e.clientY }
          return
        }
        // 如果先超过右边
        if (rect.left + rect.width - mouseTo.x < 0) {
          currentClickedElement.value.x = rect.width - currentClickedElement.value.width

          if (mouseTo.y - rect.top < 0) {
            currentClickedElement.value.y = 0
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          if (rect.top + rect.height - mouseTo.y < 0) {
            currentClickedElement.value.y = rect.height - currentClickedElement.value.height
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.y += disY
          mouseFrom = { x: e.clientX, y: e.clientY }
          return
        }
        // 如果先超过下边
        if (rect.top + rect.height - mouseTo.y < 0) {
          currentClickedElement.value.y = rect.height - currentClickedElement.value.height

          if (mouseTo.x - rect.left < 0) {
            currentClickedElement.value.x = 0
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          if (rect.left + rect.width - mouseTo.x < 0) {
            currentClickedElement.value.x = rect.width - currentClickedElement.value.width
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.x += disX
          mouseFrom = { x: e.clientX, y: e.clientY }
          return
        }
        // ///////////////////////////////////////////////////////////// //
        currentClickedElement.value.x += disX
        currentClickedElement.value.y += disY
        mouseFrom = { x: e.clientX, y: e.clientY }
        emit('dragging', currentClickedElement.value)
      }
      else if (transformMode.value === 'Resize' && propsOption.resizable && propsOption.adsorbable) {
        // 😅 开始变形！~
        if (currentScaleType === 'left') {
          // 是为了判断 当前鼠标是否已经超过最右边
          if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
            currentClickedElement.value.x += currentClickedElement.value.width - 30
            currentClickedElement.value.width = 30
            createAttachedLineForScale()
          }
          else {
            // 这里 mouseTo.x - rect.left 是为了判断 当前鼠标是否已经超过最左边
            if (mouseTo.x - rect.left < 0) {
              currentClickedElement.value.width += currentClickedElement.value.x
              currentClickedElement.value.x = 0
            }
            else {
              if (adsorbedLine.value.l.length === 0) {
              // 说明没有左边线
                currentClickedElement.value.x += disX
                currentClickedElement.value.width -= disX

                adsorbedLine.value.l = []
                mouseFrom = { x: e.clientX, y: e.clientY }
                createAttachedLineForScale()
              }
              else {
              // 说明有左边线。因为左边线可能出现在其他元素的左边或者右边，所以有两个判断，加其他元素的宽度
                const left = adsorbedLine.value.l[0]
                if (
                  ((Math.abs(left.x) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x) + DEVIATION))
                  || ((Math.abs(left.x + left.width) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x + left.width) + DEVIATION))
                ) {
                // 在误差内。不能缩放了
                }
                else {
                // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
                  currentClickedElement.value.x += disX
                  currentClickedElement.value.width -= disX
                  adsorbedLine.value.l = []
                  mouseFrom = { x: e.clientX, y: e.clientY }
                  createAttachedLineForScale()
                }
              }
            }
          }
        }
        if (currentScaleType === 'right') {
          if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
            currentClickedElement.value.width = 30
            createAttachedLineForScale()
          }
          else {
            if (rect.left + rect.width - mouseTo.x < 0) {
              currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
              currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width
            }
            else {
              if (adsorbedLine.value.r.length === 0) {
                // 说明没有右边线
                currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
                adsorbedLine.value.r = []
                mouseFrom = { x: e.clientX, y: e.clientY }
                createAttachedLineForScale()
              }
              else {
                // 说明有右边线。因为左边线可能出现在其他元素的左边或者右边，所以有两个判断，加其他元素的宽度
                const right = adsorbedLine.value.r[0]
                if (
                  ((Math.abs(right.x) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x) + DEVIATION))
                  || ((Math.abs(right.x + right.width) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x + right.width) + DEVIATION))
                ) {
                  // 在误差内。不能缩放了
                }
                else {
                  currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
                  adsorbedLine.value.r = []
                  mouseFrom = { x: e.clientX, y: e.clientY }
                  createAttachedLineForScale()
                }
              }
            }
          }
        }
        if (currentScaleType === 'top') {
          if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
            currentClickedElement.value.y += currentClickedElement.value.height - 30
            currentClickedElement.value.height = 30
            createAttachedLineForScale()
          }
          else {
            if (mouseTo.y - rect.top < 0) {
              currentClickedElement.value.height += currentClickedElement.value.y
              currentClickedElement.value.y = 0
            }
            else {
              if (adsorbedLine.value.t.length === 0) {
                // 说明没有左边线
                currentClickedElement.value.y += disY
                currentClickedElement.value.height -= disY
                adsorbedLine.value.t = []
                mouseFrom = { x: e.clientX, y: e.clientY }
                createAttachedLineForScale()
              }
              else {
                // 说明有左边线。因为左边线可能出现在其他元素的左边或者右边，所以有两个判断，加其他元素的宽度
                const top = adsorbedLine.value.t[0]
                if (
                  ((Math.abs(top.y) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y) + DEVIATION))
                  || ((Math.abs(top.y + top.height) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y + top.height) + DEVIATION))
                ) {
                  // 在误差内。不能缩放了
                }
                else {
                  // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
                  currentClickedElement.value.y += disY
                  currentClickedElement.value.height -= disY
                  adsorbedLine.value.t = []
                  mouseFrom = { x: e.clientX, y: e.clientY }
                  createAttachedLineForScale()
                }
              }
            }
          }
        }
        if (currentScaleType === 'bottom') {
          if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
            currentClickedElement.value.height = 30
            createAttachedLineForScale()
          }
          else {
            if (rect.top + rect.height - mouseTo.y < 0) {
              currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
              currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height
            }
            else {
              if (adsorbedLine.value.b.length === 0) {
                // 说明没有右边线
                currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
                adsorbedLine.value.b = []
                mouseFrom = { x: e.clientX, y: e.clientY }
                createAttachedLineForScale()
              }
              else {
                // 说明有右边线。因为左边线可能出现在其他元素的左边或者右边，所以有两个判断，加其他元素的宽度
                const bottom = adsorbedLine.value.b[0]
                if (
                  ((Math.abs(bottom.y) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y) + DEVIATION))
                  || ((Math.abs(bottom.y + bottom.height) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y + bottom.height) + DEVIATION))
                ) {
                  // 在误差内。不能缩放了
                }
                else {
                  currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
                  adsorbedLine.value.b = []
                  mouseFrom = { x: e.clientX, y: e.clientY }
                  createAttachedLineForScale()
                }
              }
            }
          }
        }
        if (currentScaleType === 'top_left') {
          // 贴左边
          if (mouseTo.x - rect.left < 0) {
            currentClickedElement.value.width += currentClickedElement.value.x
            currentClickedElement.value.x = 0

            if (mouseTo.y - rect.top < 0) {
              currentClickedElement.value.height += currentClickedElement.value.y
              currentClickedElement.value.y = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
              currentClickedElement.value.y += currentClickedElement.value.height - 30
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          // 贴上边
          if (mouseTo.y - rect.top < 0) {
            currentClickedElement.value.height += currentClickedElement.value.y
            currentClickedElement.value.y = 0

            if (mouseTo.x - rect.left < 0) {
              currentClickedElement.value.width += currentClickedElement.value.x
              currentClickedElement.value.x = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
              currentClickedElement.value.x += currentClickedElement.value.width - 30
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          // 贴右边
          if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
            currentClickedElement.value.x += currentClickedElement.value.width - 30
            currentClickedElement.value.width = 30

            if (mouseTo.y - rect.top < 0) {
              currentClickedElement.value.height += currentClickedElement.value.y
              currentClickedElement.value.y = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
              currentClickedElement.value.y += currentClickedElement.value.height - 30
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          // 贴下边
          if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
            currentClickedElement.value.y += currentClickedElement.value.height - 30
            currentClickedElement.value.height = 30

            if (mouseTo.x - rect.left < 0) {
              currentClickedElement.value.width += currentClickedElement.value.x
              currentClickedElement.value.x = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
              currentClickedElement.value.x += currentClickedElement.value.width - 30
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          if (adsorbedLine.value.l.length === 0 && adsorbedLine.value.t.length === 0) {
            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            mouseFrom = { x: e.clientX, y: e.clientY }
            adsorbedLine.value.l = []
            adsorbedLine.value.t = []
            createAttachedLineForScale()
          }
          else if (adsorbedLine.value.l.length > 0 && adsorbedLine.value.t.length === 0) {
            // 碰到了左边线
            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY

            const left = adsorbedLine.value.l[0]
            if (
              ((Math.abs(left.x) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x) + DEVIATION))
              || ((Math.abs(left.x + left.width) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x + left.width) + DEVIATION))
            ) {
              // 在误差内。不能缩放了
              mouseFrom = Object.assign(mouseFrom, { y: e.clientY })
              createAttachedLineForScale()
            }
            else {
              // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
              currentClickedElement.value.x += disX
              currentClickedElement.value.width -= disX
              adsorbedLine.value.l = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
          else if (adsorbedLine.value.l.length === 0 && adsorbedLine.value.t.length > 0) {
            // 碰到了上边线
            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX

            const top = adsorbedLine.value.t[0]
            if (
              ((Math.abs(top.y) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y) + DEVIATION))
              || ((Math.abs(top.y + top.height) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y + top.height) + DEVIATION))
            ) {
              // 在误差内。不能缩放了
              mouseFrom = Object.assign(mouseFrom, { x: e.clientX })
              createAttachedLineForScale()
            }
            else {
              // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
              currentClickedElement.value.y += disY
              currentClickedElement.value.height -= disY
              adsorbedLine.value.t = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
          else if (adsorbedLine.value.l.length > 0 && adsorbedLine.value.t.length > 0) {
            // 碰到了两条线
            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX

            const left = adsorbedLine.value.l[0]
            if (
              ((Math.abs(left.x) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x) + DEVIATION))
              || ((Math.abs(left.x + left.width) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x + left.width) + DEVIATION))
            ) {
              // 在误差内。不能缩放了
              createAttachedLineForScale()
            }
            else {
              // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
              currentClickedElement.value.x += disX
              currentClickedElement.value.width -= disX
              adsorbedLine.value.l = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }

            const top = adsorbedLine.value.t[0]
            if (
              ((Math.abs(top.y) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y) + DEVIATION))
              || ((Math.abs(top.y + top.height) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y + top.height) + DEVIATION))
            ) {
              createAttachedLineForScale()
            }
            else {
              currentClickedElement.value.y += disY
              currentClickedElement.value.height -= disY
              adsorbedLine.value.t = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
        }
        if (currentScaleType === 'top_right') {
          // 贴右边
          if (rect.left + rect.width - mouseTo.x < 0) {
            currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
            currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width

            if (mouseTo.y - rect.top < 0) {
              currentClickedElement.value.height += currentClickedElement.value.y
              currentClickedElement.value.y = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
              currentClickedElement.value.y += currentClickedElement.value.height - 30
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴上边
          if (mouseTo.y - rect.top < 0) {
            currentClickedElement.value.height += currentClickedElement.value.y
            currentClickedElement.value.y = 0

            if (rect.left + rect.width - mouseTo.x < 0) {
              currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
              currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
              currentClickedElement.value.width = 30
              createAttachedLineForScale()
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          // 贴左边
          if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
            currentClickedElement.value.width = 30

            if (mouseTo.y - rect.top < 0) {
              currentClickedElement.value.height += currentClickedElement.value.y
              currentClickedElement.value.y = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
              currentClickedElement.value.y += currentClickedElement.value.height - 30
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          // 贴下边
          if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
            currentClickedElement.value.y += currentClickedElement.value.height - 30
            currentClickedElement.value.height = 30

            if (rect.left + rect.width - mouseTo.x < 0) {
              currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
              currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
              currentClickedElement.value.width = 30
              createAttachedLineForScale()
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          if (adsorbedLine.value.r.length === 0 && adsorbedLine.value.t.length === 0) {
            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
            adsorbedLine.value.r = []
            adsorbedLine.value.t = []
            mouseFrom = { x: e.clientX, y: e.clientY }
            createAttachedLineForScale()
          }
          else if (adsorbedLine.value.r.length > 0 && adsorbedLine.value.t.length === 0) {
            // 碰到了右边线
            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY

            const right = adsorbedLine.value.r[0]
            if (
              ((Math.abs(right.x) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x) + DEVIATION))
              || ((Math.abs(right.x + right.width) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x + right.width) + DEVIATION))
            ) {
              mouseFrom = Object.assign(mouseFrom, { y: e.clientY })
              createAttachedLineForScale()
            }
            else {
              currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
              adsorbedLine.value.r = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
          else if (adsorbedLine.value.r.length === 0 && adsorbedLine.value.t.length > 0) {
            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)

            const top = adsorbedLine.value.t[0]
            if (
              ((Math.abs(top.y) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y) + DEVIATION))
              || ((Math.abs(top.y + top.height) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y + top.height) + DEVIATION))
            ) {
              // 在误差内。不能缩放了
              mouseFrom = Object.assign(mouseFrom, { x: e.clientX })
              createAttachedLineForScale()
            }
            else {
              // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
              currentClickedElement.value.y += disY
              currentClickedElement.value.height -= disY
              adsorbedLine.value.t = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
          else if (adsorbedLine.value.r.length > 0 && adsorbedLine.value.t.length > 0) {
            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)

            const right = adsorbedLine.value.r[0]
            if (
              ((Math.abs(right.x) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x) + DEVIATION))
              || ((Math.abs(right.x + right.width) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x + right.width) + DEVIATION))
            ) {
              createAttachedLineForScale()
            }
            else {
              currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
              adsorbedLine.value.r = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }

            const top = adsorbedLine.value.t[0]
            if (
              ((Math.abs(top.y) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y) + DEVIATION))
              || ((Math.abs(top.y + top.height) - DEVIATION) < (currentClickedElement.value.y + disY) && (currentClickedElement.value.y + disY) < (Math.abs(top.y + top.height) + DEVIATION))
            ) {
              // 在误差内。不能缩放了
              createAttachedLineForScale()
            }
            else {
              // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
              currentClickedElement.value.y += disY
              currentClickedElement.value.height -= disY
              adsorbedLine.value.t = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
        }
        if (currentScaleType === 'bottom_left') {
          // 贴左边
          if (mouseTo.x - rect.left < 0) {
            currentClickedElement.value.width += currentClickedElement.value.x
            currentClickedElement.value.x = 0

            if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (rect.top + rect.height - mouseTo.y < 0) {
              currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
              currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴下边
          if (rect.top + rect.height - mouseTo.y < 0) {
            currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
            currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height

            if (mouseTo.x - rect.left < 0) {
              currentClickedElement.value.width += currentClickedElement.value.x
              currentClickedElement.value.x = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
              currentClickedElement.value.x += currentClickedElement.value.width - 30
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴右边
          if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
            currentClickedElement.value.x += currentClickedElement.value.width - 30
            currentClickedElement.value.width = 30
            if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (rect.top + rect.height - mouseTo.y < 0) {
              currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
              currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴上边
          if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
            currentClickedElement.value.height = 30
            if (mouseTo.x - rect.left < 0) {
              currentClickedElement.value.width += currentClickedElement.value.x
              currentClickedElement.value.x = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
              currentClickedElement.value.x += currentClickedElement.value.width - 30
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          if (adsorbedLine.value.l.length === 0 && adsorbedLine.value.b.length === 0) {
            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)

            adsorbedLine.value.l = []
            adsorbedLine.value.b = []
            mouseFrom = { x: e.clientX, y: e.clientY }
            createAttachedLineForScale()
          }
          else if (adsorbedLine.value.l.length > 0 && adsorbedLine.value.b.length === 0) {
            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)

            const left = adsorbedLine.value.l[0]
            if (
              ((Math.abs(left.x) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x) + DEVIATION))
              || ((Math.abs(left.x + left.width) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x + left.width) + DEVIATION))
            ) {
              mouseFrom = Object.assign(mouseFrom, { y: e.clientY })
              createAttachedLineForScale()
            }
            else {
              // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
              currentClickedElement.value.x += disX
              currentClickedElement.value.width -= disX
              adsorbedLine.value.l = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
          else if (adsorbedLine.value.l.length === 0 && adsorbedLine.value.b.length > 0) {
            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX

            const bottom = adsorbedLine.value.b[0]
            if (
              ((Math.abs(bottom.y) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y) + DEVIATION))
              || ((Math.abs(bottom.y + bottom.height) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y + bottom.height) + DEVIATION))
            ) {
              // 在误差内。不能缩放了
              mouseFrom = Object.assign(mouseFrom, { x: e.clientX })
              createAttachedLineForScale()
            }
            else {
              currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
              adsorbedLine.value.b = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
          else if (adsorbedLine.value.l.length > 0 && adsorbedLine.value.b.length > 0) {
            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX

            const left = adsorbedLine.value.l[0]
            if (
              ((Math.abs(left.x) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x) + DEVIATION))
              || ((Math.abs(left.x + left.width) - DEVIATION) < (currentClickedElement.value.x + disX) && (currentClickedElement.value.x + disX) < (Math.abs(left.x + left.width) + DEVIATION))
            ) {
              createAttachedLineForScale()
            }
            else {
              // disX是当前的减去上次的。偏移值和宽度一个增加一个必然就减小
              currentClickedElement.value.x += disX
              currentClickedElement.value.width -= disX
              adsorbedLine.value.l = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }

            const bottom = adsorbedLine.value.b[0]
            if (
              ((Math.abs(bottom.y) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y) + DEVIATION))
              || ((Math.abs(bottom.y + bottom.height) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y + bottom.height) + DEVIATION))
            ) {
              // 在误差内。不能缩放了
              createAttachedLineForScale()
            }
            else {
              currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
              adsorbedLine.value.b = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
        }
        if (currentScaleType === 'bottom_right') {
          // 贴右边
          if (rect.left + rect.width - mouseTo.x < 0) {
            currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
            currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width

            if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (rect.top + rect.height - mouseTo.y < 0) {
              currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
              currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴下边
          if (rect.top + rect.height - mouseTo.y < 0) {
            currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
            currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height

            if (rect.left + rect.width - mouseTo.x < 0) {
              currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
              currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
              currentClickedElement.value.width = 30
              createAttachedLineForScale()
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }
            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴左边
          if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
            currentClickedElement.value.width = 30

            if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (rect.top + rect.height - mouseTo.y < 0) {
              currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
              currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
              return
            }

            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴上边
          if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
            currentClickedElement.value.height = 30

            if (rect.left + rect.width - mouseTo.x < 0) {
              currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
              currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
              currentClickedElement.value.width = 30
              createAttachedLineForScale()
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }
            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          if (adsorbedLine.value.r.length === 0 && adsorbedLine.value.b.length === 0) {
            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            adsorbedLine.value.b = []
            adsorbedLine.value.r = []
            mouseFrom = { x: e.clientX, y: e.clientY }
            createAttachedLineForScale()
          }
          else if (adsorbedLine.value.r.length > 0 && adsorbedLine.value.b.length === 0) {
            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)

            const right = adsorbedLine.value.r[0]
            if (
              ((Math.abs(right.x) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x) + DEVIATION))
                || ((Math.abs(right.x + right.width) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x + right.width) + DEVIATION))
            ) {
              mouseFrom = Object.assign(mouseFrom, { y: e.clientY })
              createAttachedLineForScale()
            }
            else {
              currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
              adsorbedLine.value.r = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
          else if (adsorbedLine.value.r.length === 0 && adsorbedLine.value.b.length > 0) {
            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)

            const bottom = adsorbedLine.value.b[0]
            if (
              ((Math.abs(bottom.y) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y) + DEVIATION))
              || ((Math.abs(bottom.y + bottom.height) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y + bottom.height) + DEVIATION))
            ) {
              // 在误差内。不能缩放了
              mouseFrom = Object.assign(mouseFrom, { x: e.clientX })
              createAttachedLineForScale()
            }
            else {
              currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
              adsorbedLine.value.b = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
          else if (adsorbedLine.value.r.length > 0 && adsorbedLine.value.b.length > 0) {
            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)

            const right = adsorbedLine.value.r[0]
            const bottom = adsorbedLine.value.b[0]
            if (
              ((Math.abs(right.x) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x) + DEVIATION))
                || ((Math.abs(right.x + right.width) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width + disX) && (currentClickedElement.value.x + currentClickedElement.value.width + disX) < (Math.abs(right.x + right.width) + DEVIATION))
            ) {
              createAttachedLineForScale()
            }
            else {
              currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
              adsorbedLine.value.r = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }

            if (
              ((Math.abs(bottom.y) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y) + DEVIATION))
              || ((Math.abs(bottom.y + bottom.height) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height + disY) && (currentClickedElement.value.y + currentClickedElement.value.height + disY) < (Math.abs(bottom.y + bottom.height) + DEVIATION))
            ) {
              // 在误差内。不能缩放了
              createAttachedLineForScale()
            }
            else {
              currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
              adsorbedLine.value.b = []
              mouseFrom = { x: e.clientX, y: e.clientY }
              createAttachedLineForScale()
            }
          }
        }
        emit('resizing', currentClickedElement.value)
      }
      else if (transformMode.value === 'Resize' && propsOption.resizable && !propsOption.adsorbable) {
        if (currentScaleType === 'left') {
          // 这里是为了判断 当前鼠标已经超过左边线的最右值
          if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
            currentClickedElement.value.x += currentClickedElement.value.width - 30
            currentClickedElement.value.width = 30
          }
          else {
            // 这里 mouseTo.x - rect.left 是为了判断 当前鼠标是否已经超过最左边
            if (mouseTo.x - rect.left < 0) {
              currentClickedElement.value.width += currentClickedElement.value.x
              currentClickedElement.value.x = 0
            }
            else {
              currentClickedElement.value.x += disX
              currentClickedElement.value.width -= disX
            }
          }
          mouseFrom = { x: e.clientX, y: e.clientY }
        }
        if (currentScaleType === 'right') {
          if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
            currentClickedElement.value.width = 30
            createAttachedLineForScale()
          }
          else {
            if (rect.left + rect.width - mouseTo.x < 0) {
              currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
              currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width
            }
            else {
              currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
              mouseFrom = { x: e.clientX, y: e.clientY }
            }
          }
          mouseFrom = { x: e.clientX, y: e.clientY }
        }
        if (currentScaleType === 'top') {
          if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
            currentClickedElement.value.y += currentClickedElement.value.height - 30
            currentClickedElement.value.height = 30
            createAttachedLineForScale()
          }
          else {
            if (mouseTo.y - rect.top < 0) {
              currentClickedElement.value.height += currentClickedElement.value.y
              currentClickedElement.value.y = 0
            }
            else {
              currentClickedElement.value.y += disY
              currentClickedElement.value.height -= disY
            }
          }
          mouseFrom = { x: e.clientX, y: e.clientY }
        }
        if (currentScaleType === 'bottom') {
          if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
            currentClickedElement.value.height = 30
            createAttachedLineForScale()
          }
          else {
            if (rect.top + rect.height - mouseTo.y < 0) {
              currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
              currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height
            }
            else {
              currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            }
          }
          mouseFrom = { x: e.clientX, y: e.clientY }
        }

        if (currentScaleType === 'top_left') {
          // 贴左边
          if (mouseTo.x - rect.left < 0) {
            currentClickedElement.value.width += currentClickedElement.value.x
            currentClickedElement.value.x = 0

            if (mouseTo.y - rect.top < 0) {
              currentClickedElement.value.height += currentClickedElement.value.y
              currentClickedElement.value.y = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
              currentClickedElement.value.y += currentClickedElement.value.height - 30
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴上边
          if (mouseTo.y - rect.top < 0) {
            currentClickedElement.value.height += currentClickedElement.value.y
            currentClickedElement.value.y = 0

            if (mouseTo.x - rect.left < 0) {
              currentClickedElement.value.width += currentClickedElement.value.x
              currentClickedElement.value.x = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
              currentClickedElement.value.x += currentClickedElement.value.width - 30
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴右边
          if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
            currentClickedElement.value.x += currentClickedElement.value.width - 30
            currentClickedElement.value.width = 30

            if (mouseTo.y - rect.top < 0) {
              currentClickedElement.value.height += currentClickedElement.value.y
              currentClickedElement.value.y = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
              currentClickedElement.value.y += currentClickedElement.value.height - 30
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴下边
          if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
            currentClickedElement.value.y += currentClickedElement.value.height - 30
            currentClickedElement.value.height = 30

            if (mouseTo.x - rect.left < 0) {
              currentClickedElement.value.width += currentClickedElement.value.x
              currentClickedElement.value.x = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
              currentClickedElement.value.x += currentClickedElement.value.width - 30
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.x += disX
          currentClickedElement.value.width -= disX
          currentClickedElement.value.y += disY
          currentClickedElement.value.height -= disY
          mouseFrom = { x: e.clientX, y: e.clientY }
        }
        if (currentScaleType === 'top_right') {
          // 贴右边
          if (rect.left + rect.width - mouseTo.x < 0) {
            currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
            currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width

            if (mouseTo.y - rect.top < 0) {
              currentClickedElement.value.height += currentClickedElement.value.y
              currentClickedElement.value.y = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
              currentClickedElement.value.y += currentClickedElement.value.height - 30
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴上边
          if (mouseTo.y - rect.top < 0) {
            currentClickedElement.value.height += currentClickedElement.value.y
            currentClickedElement.value.y = 0

            if (rect.left + rect.width - mouseTo.x < 0) {
              currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
              currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴左边
          if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
            currentClickedElement.value.width = 30

            if (mouseTo.y - rect.top < 0) {
              currentClickedElement.value.height += currentClickedElement.value.y
              currentClickedElement.value.y = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
              currentClickedElement.value.y += currentClickedElement.value.height - 30
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴下边
          if (mouseTo.y + 30 - rect.top - (currentClickedElement.value?.y + currentClickedElement.value?.height) >= 0) {
            currentClickedElement.value.y += currentClickedElement.value.height - 30
            currentClickedElement.value.height = 30

            if (rect.left + rect.width - mouseTo.x < 0) {
              currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
              currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.y += disY
          currentClickedElement.value.height -= disY
          currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
          mouseFrom = { x: e.clientX, y: e.clientY }
        }
        if (currentScaleType === 'bottom_left') {
          // 贴左边
          if (mouseTo.x - rect.left < 0) {
            currentClickedElement.value.width += currentClickedElement.value.x
            currentClickedElement.value.x = 0

            if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (rect.top + rect.height - mouseTo.y < 0) {
              currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
              currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴下边
          if (rect.top + rect.height - mouseTo.y < 0) {
            currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
            currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height

            if (mouseTo.x - rect.left < 0) {
              currentClickedElement.value.width += currentClickedElement.value.x
              currentClickedElement.value.x = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
              currentClickedElement.value.x += currentClickedElement.value.width - 30
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴右边
          if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
            currentClickedElement.value.x += currentClickedElement.value.width - 30
            currentClickedElement.value.width = 30
            if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (rect.top + rect.height - mouseTo.y < 0) {
              currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
              currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴上边
          if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
            currentClickedElement.value.height = 30
            if (mouseTo.x - rect.left < 0) {
              currentClickedElement.value.width += currentClickedElement.value.x
              currentClickedElement.value.x = 0
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x + 30 - rect.left - (currentClickedElement.value?.x + currentClickedElement.value?.width) >= 0) {
              currentClickedElement.value.x += currentClickedElement.value.width - 30
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.x += disX
          currentClickedElement.value.width -= disX
          currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
          mouseFrom = { x: e.clientX, y: e.clientY }
        }
        if (currentScaleType === 'bottom_right') {
          // 贴右边
          if (rect.left + rect.width - mouseTo.x < 0) {
            currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
            currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width

            if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (rect.top + rect.height - mouseTo.y < 0) {
              currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
              currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴下边
          if (rect.top + rect.height - mouseTo.y < 0) {
            currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
            currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height

            if (rect.left + rect.width - mouseTo.x < 0) {
              currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
              currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }
            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴左边
          if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
            currentClickedElement.value.width = 30

            if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
              currentClickedElement.value.height = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (rect.top + rect.height - mouseTo.y < 0) {
              currentClickedElement.value.height += (elementLimitSize.height - currentClickedElement.value.height - currentClickedElement.value.y)
              currentClickedElement.value.y = elementLimitSize.height - currentClickedElement.value.height
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }
          // 贴上边
          if (mouseTo.y - 30 - rect.top - currentClickedElement.value?.y <= 0) {
            currentClickedElement.value.height = 30

            if (rect.left + rect.width - mouseTo.x < 0) {
              currentClickedElement.value.width += (elementLimitSize.width - currentClickedElement.value.width - currentClickedElement.value.x)
              currentClickedElement.value.x = elementLimitSize.width - currentClickedElement.value.width
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }

            if (mouseTo.x - 30 - rect.left - currentClickedElement.value?.x < 0) {
              currentClickedElement.value.width = 30
              mouseFrom = { x: e.clientX, y: e.clientY }
              return
            }
            currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
            mouseFrom = { x: e.clientX, y: e.clientY }
            return
          }

          currentClickedElement.value.width += (mouseTo.x - mouseFrom.x)
          currentClickedElement.value.height += (mouseTo.y - mouseFrom.y)
          mouseFrom = { x: e.clientX, y: e.clientY }
        }
        emit('resizing', currentClickedElement.value)
      }
    }
  }
  function mouseup(_e: MouseEvent) {
    transformMode.value = 'None'
    mouseFrom.x = 0
    mouseFrom.y = 0
    for (const key in adsorbedLine.value)
      adsorbedLine.value[key] = []
  }

  function getCellObjectInStoreFromPosition(position: { x: number; y: number }): Object | null {
    let result: any = null
    const point = { x: position.x, y: position.y }
    const initElement = document.elementFromPoint(point.x, point.y)
    if (initElement)
      result = gridCells.value.filter((ele: { id: string }) => ele.id === initElement.id)

    return result ? result[0] : null
  }

  function createAttachedLineForScale() {
    // 每个块有六条线

    gridCells.value.forEach((cell: { id: any; x: number; width: any; y: number; height: any }) => {
      if (cell?.id !== currentClickedElement.value?.id) {
        if (currentScaleType === 'left')
          generateLeftLine()
        else if (currentScaleType === 'right')
          generateRightLine()
        else if (currentScaleType === 'top')
          generateTopLine()
        else if (currentScaleType === 'bottom')
          generateBottomLine()
        else if (currentScaleType === 'top_left')
          generateTopLeftLine()
        else if (currentScaleType === 'top_right')
          generateTopRightLine()
        else if (currentScaleType === 'bottom_left')
          generateBottomLeftLine()
        else if (currentScaleType === 'bottom_right')
          generateBottomRightLine()

        function generateLeftLine() {
          if ((Math.abs(cell.x) - DEVIATION) < currentClickedElement.value?.x && currentClickedElement.value?.x < (Math.abs(cell.x) + DEVIATION)) {
            const disX = cell.x - currentClickedElement.value.x
            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            adsorbedLine.value.l.push({ ...cell, type: 0 })
          }
          // cell的右边
          if (
            (Math.abs(cell.x + cell.width) - DEVIATION) < currentClickedElement.value?.x
            && currentClickedElement.value?.x < (Math.abs(cell.x + cell.width) + DEVIATION)
          ) {
            const disX = cell.x + cell.width - currentClickedElement.value.x
            currentClickedElement.value.x += disX
            currentClickedElement.value.width -= disX
            adsorbedLine.value.l.push({ ...cell, type: 1 })
          }
        }

        function generateRightLine() {
          // cell的左边
          if ((Math.abs(cell.x) - DEVIATION) < (currentClickedElement.value?.x + currentClickedElement.value?.width) && (currentClickedElement.value?.x + currentClickedElement.value?.width) < (Math.abs(cell.x) + DEVIATION)) {
            const disX = cell.x - (currentClickedElement.value.x + currentClickedElement.value.width)
            currentClickedElement.value.width += disX
            adsorbedLine.value.r.push({ ...cell, type: 0 })
          }
          // cell的右边
          if (
            (Math.abs(cell.x + cell.width) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width)
            && (currentClickedElement.value.x + currentClickedElement.value.width) < (Math.abs(cell.x + cell.width) + DEVIATION)
          ) {
            const disX = (cell.x + cell.width) - (currentClickedElement.value.x + currentClickedElement.value.width)
            currentClickedElement.value.width += disX
            adsorbedLine.value.r.push({ ...cell, type: 1 })
          }
        }

        function generateTopLine() {
          // cell的上边
          if ((Math.abs(cell.y) - DEVIATION) < currentClickedElement.value?.y && currentClickedElement.value?.y < (Math.abs(cell.y) + DEVIATION)) {
            const disY = cell.y - currentClickedElement.value.y
            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            adsorbedLine.value.t.push({ ...cell, type: 0 })
          }
          // cell的下边
          if (
            (Math.abs(cell.y + cell.height) - DEVIATION) < currentClickedElement.value?.y
            && currentClickedElement.value?.y < (Math.abs(cell.y + cell.height) + DEVIATION)
          ) {
            const disY = cell.y + cell.height - currentClickedElement.value.y
            currentClickedElement.value.y += disY
            currentClickedElement.value.height -= disY
            adsorbedLine.value.t.push({ ...cell, type: 1 })
          }
        }

        function generateBottomLine() {
          // 2.当前元素的右吸附线
          // cell的左边
          if ((Math.abs(cell.y) - DEVIATION) < (currentClickedElement.value?.y + currentClickedElement.value?.height) && (currentClickedElement.value?.y + currentClickedElement.value?.height) < (Math.abs(cell.y) + DEVIATION)) {
            const disY = cell.y - (currentClickedElement.value.y + currentClickedElement.value.height)
            currentClickedElement.value.height += disY
            adsorbedLine.value.b.push({ ...cell, type: 0 })
          }
          // cell的右边
          if (
            (Math.abs(cell.y + cell.height) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height)
            && (currentClickedElement.value.y + currentClickedElement.value.height) < (Math.abs(cell.y + cell.height) + DEVIATION)
          ) {
            const disY = (cell.y + cell.height) - (currentClickedElement.value.y + currentClickedElement.value.height)
            currentClickedElement.value.height += disY
            adsorbedLine.value.b.push({ ...cell, type: 1 })
          }
        }

        function generateTopLeftLine() {
          generateLeftLine()
          generateTopLine()
        }
        function generateTopRightLine() {
          generateTopLine()
          generateRightLine()
        }
        function generateBottomLeftLine() {
          generateBottomLine()
          generateLeftLine()
        }
        function generateBottomRightLine() {
          generateBottomLine()
          generateRightLine()
        }
      }
    })
  }

  function createAttachedLineForDrag(type?: string) {
    gridCells.value.forEach((cell: { id: any; x: number; width: any; y: number; height: any }) => {
      if (cell?.id !== currentClickedElement.value?.id) {
        if (type === 'l')
          generateLeftLine()
        else if (type === 't')
          generateTopLine()
        else if (type === 'r')
          generateRightLine()
        else if (type === 'b')
          generateBottomLine()

        function generateLeftLine() {
          if ((Math.abs(cell.x) - DEVIATION) < currentClickedElement.value?.x && currentClickedElement.value?.x < (Math.abs(cell.x) + DEVIATION)) {
            const disX = cell.x - currentClickedElement.value.x
            currentClickedElement.value.x += disX
            adsorbedLine.value.l.push({ ...cell, type: 0 })
          }
          if (
            (Math.abs(cell.x + cell.width) - DEVIATION) < currentClickedElement.value?.x
            && currentClickedElement.value?.x < (Math.abs(cell.x + cell.width) + DEVIATION)
          ) {
            const disX = cell.x + cell.width - currentClickedElement.value.x
            currentClickedElement.value.x += disX
            adsorbedLine.value.l.push({ ...cell, type: 1 })
          }
        }
        function generateRightLine() {
          if ((Math.abs(cell.x) - DEVIATION) < (currentClickedElement.value?.x + currentClickedElement.value?.width) && (currentClickedElement.value?.x + currentClickedElement.value?.width) < (Math.abs(cell.x) + DEVIATION)) {
            const disX = cell.x - (currentClickedElement.value.x + currentClickedElement.value.width)
            currentClickedElement.value.x = currentClickedElement.value.x + disX
            adsorbedLine.value.r.push({ ...cell, type: 0 })
          }
          if (
            (Math.abs(cell.x + cell.width) - DEVIATION) < (currentClickedElement.value.x + currentClickedElement.value.width)
            && (currentClickedElement.value.x + currentClickedElement.value.width) < (Math.abs(cell.x + cell.width) + DEVIATION)
          ) {
            const disX = (cell.x + cell.width) - (currentClickedElement.value.x + currentClickedElement.value.width)
            currentClickedElement.value.x = currentClickedElement.value.x + disX
            adsorbedLine.value.r.push({ ...cell, type: 1 })
          }
        }
        function generateTopLine() {
          if ((Math.abs(cell.y) - DEVIATION) < currentClickedElement.value?.y && currentClickedElement.value?.y < (Math.abs(cell.y) + DEVIATION)) {
            const disY = cell.y - currentClickedElement.value.y
            currentClickedElement.value.y += disY
            adsorbedLine.value.t.push({ ...cell, type: 0 })
          }
          if (
            (Math.abs(cell.y + cell.height) - DEVIATION) < currentClickedElement.value?.y
            && currentClickedElement.value?.y < (Math.abs(cell.y + cell.height) + DEVIATION)
          ) {
            const disY = cell.y + cell.height - currentClickedElement.value.y
            currentClickedElement.value.y += disY
            adsorbedLine.value.t.push({ ...cell, type: 1 })
          }
        }
        function generateBottomLine() {
          if ((Math.abs(cell.y) - DEVIATION) < (currentClickedElement.value?.y + currentClickedElement.value?.height) && (currentClickedElement.value?.y + currentClickedElement.value?.height) < (Math.abs(cell.y) + DEVIATION)) {
            const disY = cell.y - (currentClickedElement.value.y + currentClickedElement.value.height)
            currentClickedElement.value.y += disY
            adsorbedLine.value.b.push({ ...cell, type: 0 })
          }
          if (
            (Math.abs(cell.y + cell.height) - DEVIATION) < (currentClickedElement.value.y + currentClickedElement.value.height)
            && (currentClickedElement.value.y + currentClickedElement.value.height) < (Math.abs(cell.y + cell.height) + DEVIATION)
          ) {
            const disY = (cell.y + cell.height) - (currentClickedElement.value.y + currentClickedElement.value.height)
            currentClickedElement.value.y += disY
            adsorbedLine.value.b.push({ ...cell, type: 1 })
          }
        }
      }
    })
  }
}
