import reducer from '../../app/reducers/displayReducer'
import Node from '../../app/graph/node'
import defaultState from '../../app/util/defaultState'

describe('displayReducer', function() {
  describe('SET_EDITOR_MODE', function() {
    it('changes editor to true', function() {
      const state = {
        modes: { editor: false },
        floatingEditor: { type: null, id: null }
      }
      const action = { type: 'SET_EDITOR_MODE', enabled: true }

      expect(reducer(state, action).modes).toEqual({ editor: true })
    })

    it('clears floating editor', function() {
      const state = {
        modes: { editor: false },
        floatingEditor: { type: 'node', id: 'abc' }
      }
      const action = { type: 'SET_EDITOR_MODE', enabled: true }

      expect(reducer(state, action).floatingEditor)
        .toEqual({ type: null, id: null })
    })
  })

  describe('TOGGLE_TOOL', function() {
    it('changes tool', function() {
      const state = {
        tool: 'node',
        floatingEditor: { type: 'node', id: 'abc' },
        selection: { node: [] }
      }
      const action = { type: 'TOGGLE_TOOL', tool: 'text'}
      expect(reducer(state, action).tool).toEqual('text')
    })

    it('closes tool', function() {
      const state = {
        tool: 'node',
        floatingEditor: { type: 'node', id: 'abc' },
        selection: { node: [] }
      }
      const action = { type: 'TOGGLE_TOOL', tool: 'node'}
      expect(reducer(state, action).tool).toBeNull()
    })
  })

  describe('CLICK_NODE', function() {
    it('opens node editor', function() {
      const state = { actualZoom: 2, zoom: 1, offset: { x: 50, y: 50 }, floatingEditor: { type: null, id: null } }
      const action = { type: 'CLICK_NODE', id: 'xyz' }
      expect(reducer(state, action).floatingEditor)
        .toEqual({ type: 'node', id: 'xyz' })
    })

    it('closes node editor', function() {
      const state = { floatingEditor: { type: 'node', id: 'xyz' } }
      const action = { type: 'CLICK_NODE', id: 'xyz' }
      expect(reducer(state, action).floatingEditor)
        .toEqual({ type: null, id: null })
    })

    it('closes add connections', function() {
      const state = { floatingEditor: { type: 'connections', id: 'xyz' } }
      const action = { type: 'CLICK_NODE', id: 'xyz' }
      expect(reducer(state, action).floatingEditor)
        .toEqual({ type: null, id: null })
    })
  })

  describe('CLOSE_EDITOR', function() {
    it('clears floatingEditor', function() {
      const state = { editor: { tool: 'node' }, floatingEditor: { type: 'node', id: 'abc' } }
      const action = { type: 'CLOSE_EDITOR' }
      expect(reducer(state, action).floatingEditor)
        .toEqual({ type: null, id: null })
    })
  })

  describe('ADD_NODE', function() {
    let node, state, action, nextState

    it('opens and positions node editor if node is not from LittleSis', function() {
      node = { id: "abc", name: "bob", x: 100, y: 100 }
      state = defaultState.display
      action = { type: 'ADD_NODE', node }
      nextState = reducer(state, action)
      expect(nextState.floatingEditor.type).toEqual('node')
      expect(nextState.floatingEditor.id).toBeTruthy()
    })

    it('does not open node editor if node is from LittleSis', function() {
      node = Node.new({ id: "1000" })
      state = defaultState.display
      action = { type: 'ADD_NODE', node }
      nextState = reducer(state, action)
      expect(nextState.floatingEditor.type).toBeNull()
      expect(nextState.floatingEditor.id).toBeNull()
    })
  })

  describe('REMOVE_NODE', function() {
    let state, action, nextState

    beforeEach(function() {
      state = { floatingEditor: { type: 'node', id: "r2d2" }, selection: { node: [] } }
      action = { type: 'REMOVE_NODE', id: "r2d2" }
      nextState = reducer(state, action)
    })

    it('closes floating menu', function() {
      expect(nextState.floatingEditor.type).toBeNull()
      expect(nextState.floatingEditor.id).toBeNull()
    })
  })

  describe('DRAG_NODE', function() {
    let state, action, nextState, node

    beforeEach(function() {
      node = Node.new({ name: "cleo" })
      state = Object.assign({}, defaultState).display
    })

    it('sets dragged node', function() {
      action = { type: 'DRAG_NODE', id: node.id, node: node, deltas: { x: 0, y: 100 } }
      nextState = reducer(state, action)
      expect(nextState.draggedNode).toEqual(node)
    })
  })

  describe('REMOVE_EDGE', function() {
    let state, action, nextState

    beforeEach(function() {
      state = { floatingEditor: { type: 'edge', id: "x1" } }
      action = { type: 'REMOVE_EDGE', id: "x1" }
      nextState = reducer(state, action)
    })

    it('closes floating menu', function() {
      expect(nextState.floatingEditor.type).toBeNull()
      expect(nextState.floatingEditor.id).toBeNull()
    })
  })

  describe('CLICK_EDGE', function() {
    it('opens edge editor', function() {
      const state = { floatingEditor: { type: null, id: null } }
      const action = { type: 'CLICK_EDGE', id: 'xyz' }
      expect(reducer(state, action).floatingEditor)
        .toEqual({ type: 'edge', id: 'xyz' })
    })

    it('closes edge editor', function() {
      const state = { floatingEditor: { type: 'edge', id: 'xyz' } }
      const action = { type: 'CLICK_EDGE', id: 'xyz' }
      expect(reducer(state, action).floatingEditor)
        .toEqual({ type: null, id: null })
    })
  })
})
