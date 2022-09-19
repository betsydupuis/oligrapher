import produce from 'immer'

import FloatingEditor, { toggleEditor } from '../util/floatingEditor'
import { swapSelection, clearSelection, selectionCount } from '../util/selection'
import { isLittleSisId } from '../util/helpers'
import { DisplayState } from '../util/defaultState'

const ZOOM_INTERVAL = 1.2

export default produce((display: DisplayState, action: any): void => {
  switch(action.type) {
    case 'SET_SVG_TOP':
      display.svgTop = action.svgTop
      return
    case 'SET_SVG_BOTTOM':
      display.svgBottom = action.svgBottom
      return
    case 'SET_SVG_WIDTH':
      display.svgSize.width = action.width
      return
    case 'SET_SVG_HEIGHT':
      display.svgSize.height = action.height
      return
    case 'SET_ACTUAL_ZOOM':
      display.actualZoom = action.actualZoom
      return
    case 'SET_SVG_ZOOM':
      display.svgZoom = action.svgZoom
      return
    case 'SET_OFFSET':
      display.offset = action.offset
      return
    case 'SET_SVG_OFFSET':
      display.svgOffset = action.svgOffset
      return
    case 'SET_VIEWBOX':
      display.viewBox = action.viewBox
      return
    case 'RESET_VIEW':
      display.offset = { x: 0, y: 0}
      display.zoom = 1
      return
    case 'COLLAPSE_HEADER':
      display.headerIsCollapsed = true
      return
    case 'EXPAND_HEADER':
      display.headerIsCollapsed = false
      return
    case 'ADD_NODE':
      if (!isLittleSisId(action.node.id)) {
        toggleEditor(display, 'node', action.node.id)
      }
      return
    case 'REMOVE_NODE':
      FloatingEditor.clear(display)
      swapSelection(display, 'node', action.id)
      return
    case 'REMOVE_NODES':
      clearSelection(display)
      return
    case 'CLICK_NODE':
      // if shift key is held, action is a selection
      if (action.shiftKey) {
        let indexOfNode = display.selection.node.indexOf(action.id)
        if (indexOfNode === -1) {
          display.selection.node.push(action.id)
        } else {
          display.selection.node.splice(indexOfNode)
        }
      } else {
        display.selection.node = [action.id]
        toggleEditor(display, 'node', action.id)
        // select node if editing it
        // if (FloatingEditor.getId(display, 'node') === action.id) {
        //   swapSelection(display, 'node', action.id)
        // }
      }
      return
    case 'DRAG_NODE_START':
      clearSelection(display)
      display.selection.node = [action.id]
      FloatingEditor.clear(display)
      display.draggedNode = action.node
      return
    case 'DRAG_NODE_STOP':
      clearSelection(display)
      return
    case 'MOUSE_ENTERED_NODE':
      if (display.draggedNode && display.draggedNode.name !== action.name) {
        display.userMessage = `Drop node to create new edge between ${display.draggedNode.name} and ${action.name}`
      }
      return
    case 'MOUSE_LEFT_NODE':
      display.userMessage = null
      return
    case 'RELEASE_NODE':
      display.userMessage = null
      display.draggedNode = null
      return
    case 'ADD_EDGE':
      if (!isLittleSisId(action.edge.id)) {
        toggleEditor(display, 'edge', action.edge.id)
      }
      return
    case 'REMOVE_EDGE':
      FloatingEditor.clear(display)
      return
    case 'CLICK_EDGE':
      clearSelection(display)
      toggleEditor(display, 'edge', action.id)
      return
    case 'ADD_CAPTION':
      toggleEditor(display, 'caption', action.id)
      return
    case 'REMOVE_CAPTION':
      FloatingEditor.clear(display)
      return
    case 'CLICK_CAPTION':
      clearSelection(display)
      toggleEditor(display, 'caption', action.id)
      return
    case 'ZOOM_IN':
      display.zoom = display.zoom * (action.interval || ZOOM_INTERVAL)
      return
    case 'ZOOM_OUT':
      display.zoom = display.zoom / (action.interval || ZOOM_INTERVAL)
      return
    case 'SET_ZOOM':
      display.zoom = action.zoom
      return
    case 'SET_EDITOR_MODE':
      clearSelection(display)
      display.tool = null
      FloatingEditor.clear(display)
      display.modes.editor = action.enabled
      return
    case 'TOGGLE_ANNOTATIONS':
      display.modes.story = !display.modes.story
      return
    case 'HIDE_ANNOTATIONS':
      display.modes.story = false
      return
    case 'SHOW_ANNOTATIONS':
      display.modes.story = true
      return
    case 'HIDE_HEADER':
      display.showHeader = false
      return
    case 'SHOW_HEADER':
      display.showHeader = true
      return
    case 'HIDE_ZOOM_CONTROL':
      display.showZoomControl = false
      return
    case 'SHOW_ZOOM_CONTROL':
      display.showZoomControl = true
      return
    case 'TOGGLE_TOOL':
      const prevTool = display.tool
      display.tool = (display.tool === action.tool) ? null : action.tool

      // if new tool has been opened
      if (display.tool && display.tool !== prevTool) {
        // close floating editor
        FloatingEditor.clear(display)

        // clear single selection
        if (selectionCount(display) === 1) {
          clearSelection(display)
        }
      }

      return
    case 'CLOSE_TOOL':
      display.tool = null
      return
    case 'OPEN_ADD_CONNECTIONS':
      if (isLittleSisId(action.id)) {
        FloatingEditor.set(display, 'connections', action.id)
      } else {
        console.error(`Cannot find connections unless the entity is a LittlesSis Entity. id == ${action.id}`)
      }
      return
    case 'CLOSE_EDITOR':
      FloatingEditor.clear(display)
      return
    case 'OPEN_EDTIOR':
      FloatingEditor.set(display, action.editorType, action.id)
      return
      // Save map actions
    case 'SAVE_REQUESTED':
      display.saveMapStatus = 'REQUESTED'
      display.userMessage = 'Saving map...'
      return
    case 'SAVE_SUCCESS':
      display.saveMapStatus = 'SUCCESS'
      display.userMessage = 'Saved map :)'
      return
    case 'SAVE_FAILED':
      display.saveMapStatus = 'FAILED'
      display.userMessage = 'Failed to save map :('
      return
    case 'SAVE_RESET':
      display.saveMapStatus = null
      display.userMessage = null
      return
      // Clone map actions
    case 'CLONE_REQUESTED':
      display.cloneMapStatus = 'REQUESTED'
      display.userMessage = 'Cloning map...'
      return
    case 'CLONE_SUCCESS':
      display.cloneMapStatus = 'SUCCESS'
      display.userMessage = 'Cloned map :)'
      return
    case 'CLONE_FAILED':
      display.cloneMapStatus = 'FAILED'
      display.userMessage = 'Failed to clone map :('
      return
    case 'CLONE_RESET':
      display.cloneMapStatus = null
      display.userMessage = null
      return
      // Clone map actions
    case 'DELETE_REQUESTED':
      display.deleteMapStatus = 'REQUESTED'
      display.userMessage = 'Deleting map...'
      return
    case 'DELETE_SUCCESS':
      display.deleteMapStatus = 'SUCCESS'
      display.userMessage = 'Deleted map :)'
      return
    case 'DELETE_FAILED':
      display.deleteMapStatus = 'FAILED'
      display.userMessage = 'Failed to delete map :('
      return
    case 'DELETE_RESET':
      display.cloneMapStatus = null
      display.userMessage = null
      return
    case 'FORCE_LAYOUT_REQUESTED':
      display.userMessage = 'Generating force-directed layout...'
      return
    case 'APPLY_FORCE_LAYOUT':
      display.userMessage = null
      return
    case 'ADD_EDITOR_REQUESTED':
      display.userMessage = 'Adding editor...'
      return
    case 'ADD_EDITOR_SUCCESS':
      display.userMessage = 'Added editor :)'
      return
    case 'ADD_EDITOR_FAILED':
      display.userMessage = 'Failed to add editor :('
      return
    case 'ADD_EDITOR_RESET':
      display.userMessage = null
      return
    case 'REMOVE_EDITOR_REQUESTED':
      display.userMessage = 'Removing editor...'
      return
    case 'REMOVE_EDITOR_SUCCESS':
      display.userMessage = 'Removed editor :)'
      return
    case 'REMOVE_EDITOR_FAILED':
      display.userMessage = 'Failed to remove editor :('
      return
    case 'REMOVE_EDITOR_RESET':
      display.userMessage = null
      return
    case 'INTERLOCKS_REQUESTED':
      display.userMessage = 'Fetching interlocks...'
      return
    case 'INTERLOCKS_SUCCESS':
      display.userMessage = action.nodes.length > 0 ? 'Fetched interlocks :)' : 'No interlocks found'
      return
    case 'INTERLOCKS_FAILED':
      display.userMessage = 'Failed to fetch interlocks :('
      return
    case 'INTERLOCKS_RESET':
      display.userMessage = null
      return
    case 'LOCK_TAKEOVER_REQUESTED':
      display.userMessage = 'Taking over map lock...'
      return
    case 'LOCK_TAKEOVER_SUCCESS':
      display.userMessage = 'Took over map lock :)'
      return
    case 'LOCK_TAKEOVER_FAILED':
      display.userMessage = 'Failed to take over map lock :('
      return
    case 'LOCK_TAKEOVER_RESET':
      display.userMessage = null
      return
    case 'LOCK_RELEASE_REQUESTED':
      display.userMessage = 'Releasing map lock...'
      return
    case 'LOCK_RELEASE_SUCCESS':
      display.userMessage = 'Released map lock :)'
      return
    case 'LOCK_RELEASE_FAILED':
      display.userMessage = 'Failed to release map lock :('
      return
    case 'LOCK_RELEASE_RESET':
      display.userMessage = null
      return
    case 'EXPORT_IMAGE_REQUESTED':
      display.userMessage = 'Exporting...'
      return
    case 'EXPORT_IMAGE_SUCCESS':
      display.userMessage = 'Exported map to JPG :)'
      return
    case 'EXPORT_IMAGE_FAILED':
      display.userMessage = 'Failed to export :('
      return
    case 'EXPORT_IMAGE_RESET':
      display.userMessage = null
      return
    case 'SET_SELECTING':
      display.selection.isSelecting = action.isSelecting
      return
    case 'SWAP_NODE_SELECTION':
      swapSelection(
        display,
        'node',
        action.id,
        Boolean(action.singleSelect)
      )
      FloatingEditor.clear(display)
      return
    case 'CLEAR_SELECTION':
      clearSelection(display)
      return
    default:
      return
  }
}, null)
