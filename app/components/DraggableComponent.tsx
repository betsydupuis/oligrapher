import React, { useState } from 'react'
import Draggable, { DraggableEventHandler, DraggableProps } from 'react-draggable'
import { useSelector } from 'react-redux'
import { State } from '../util/defaultState'

interface DraggableComponentProps extends DraggableProps {
  onClick?: DraggableEventHandler
}

// Wrapper around Draggable from react-draggable which
//   - adds another callback, onClick, for click events
//   - set the scale = state.display.svgZoom
export function DraggableComponent(props: DraggableComponentProps) {
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0})
  const scale = useSelector<State, number>(state=> state.display.svgZoom)

  const onStart: DraggableEventHandler = (evt, data) => {
    setDragStartPos({ x: evt.screenX, y: evt.screenY })
    props.onStart && props.onStart(evt, data)
  }

  const onDrag: DraggableEventHandler = (evt, data) => {
    props.onDrag && props.onDrag(evt, data)
  }

  // see https://github.com/react-grid-layout/react-draggable/issues/531
  const onStop: DraggableEventHandler = (evt, data) => {
    props.onStop && props.onStop(evt, data)
    if (props.onClick) {
      const mouseHasBarelyMoved = Math.abs(dragStartPos.x - evt.screenX) < 5 || Math.abs(dragStartPos.y - evt.screenY) < 5
      if (mouseHasBarelyMoved) {
        props.onClick(evt, data)
      }
    }
  }

  const draggableProps = Object.assign({ position: { x: 0, y: 0 } }, props, { onDrag, onStop, onStart, scale })

  return <Draggable {...draggableProps}>
           {props.children}
         </Draggable>

}

export default DraggableComponent
