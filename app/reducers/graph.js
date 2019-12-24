import Graph from '../graph/graph'
import produce from 'immer'

const ZOOM_INTERVAL = 0.2
/*

  action.type      |  fields
-------------------|-------------
  SET_ACTUAL_ZOOM  | actualZoom
  ZOOM             | direction
  ADD_NODE         | attributes
  ADD_NODES        | nodes
  UPDATE_NODE      | id, attributes
  MOVE_NODE        | id, deltas
  DRAG_NODE        | id, deltas
*/

export default produce( (draft, action) => {
  switch(action.type) {
  case 'SET_ACTUAL_ZOOM':
    console.log('ACTUAL ZOOM value is', action.actualZoom)
    draft.actualZoom = action.actualZoom
    return
  case 'ADD_NODE':
    Graph.addNode(draft, action.attributes)
    return
  case 'ADD_NODES':
    Graph.addNodes(draft, action.nodes)
    return
  case 'UPDATE_NODE':
    Graph.updateNode(draft, action.id, action.attributes)
    return
  case 'MOVE_NODE':
    Graph.dragNode(draft, action.id, action.deltas)
    Graph.moveNode(draft, action.id, action.deltas)
    return
  case 'DRAG_NODE':
    Graph.dragNode(draft, action.id, action.deltas)
    return
  case 'ZOOM':
    switch(action.direction) {
    case 'IN':
      draft.zoom = draft.zoom + ZOOM_INTERVAL
      break
    case 'OUT':
      draft.zoom = draft.zoom - ZOOM_INTERVAL
      break
    }

    return
  }
}, null)
