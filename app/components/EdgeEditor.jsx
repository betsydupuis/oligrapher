import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { useSelector } from '../util/helpers'
import EditorHotKeys from './EditorHotKeys'
import EditorHeader from './EditorHeader'
import EditEdgeStyle from './EditEdgeStyle'
import EditorSubmitButtons from './EditorSubmitButtons'
import Graph from '../graph/graph'
import { callWithTargetValue } from '../util/helpers'

export function MainPage({ nodes, edge, updateEdge }) {
  return (
    <div data-testid="edge-editor-mainpage">
      <form>
        <div>
          <label>Label</label>
          <input
            type="text"
            placeholder="label"
            value={edge.label || ''}
            onChange={callWithTargetValue(label => updateEdge({ label }))} />
        </div>
      </form>

      <hr />

      <div>
        <label>Line Style</label>
      </div>

      <EditEdgeStyle edge={edge} nodes={nodes} updateEdge={updateEdge} />

      <div className="edit-edge-scale">
        <form>
          <label>Scale</label>
          <input
            type="range"
            placeholder="pixels"
            value={edge.scale}
            min="1"
            max="2.5"
            step="0.5"
            onChange={callWithTargetValue(scale => updateEdge({ scale }))} />
          &nbsp; <input type="text" value={edge.scale} size="2" disabled></input>
        </form>
      </div>

      <hr />

      <form>
        <div>
          <label>Clickthrough link</label>
          <input
            type="url"
            placeholder="Clickthrough link"
            value={edge.url || ''}
            onChange={callWithTargetValue(url => updateEdge({ url }))} />
        </div>
      </form>
    </div>
  )
}

MainPage.propTypes = {
  nodes: PropTypes.array.isRequired,
  edge: PropTypes.object.isRequired,
  updateEdge: PropTypes.func.isRequired
}

export default function EdgeEditor({ id }) {
  const dispatch = useDispatch()
  const [page, setPage] = useState('main')
  const edge = useSelector(state => state.graph.edges[id])
  const nodes = useSelector(state => Graph.nodesOf(state.graph, id))

  const removeEdge = useCallback(
    () => dispatch({ type: "REMOVE_EDGE", id }),
    [dispatch, id]
  )

  const updateEdge = useCallback(
    (attributes) => dispatch({ type: 'UPDATE_EDGE', id, attributes }),
    [dispatch, id]
  )

  return (
    <EditorHotKeys remove={removeEdge}>
      <div className="oligrapher-edge-editor">
        <EditorHeader title="Customize Edge" />
        <div>
          { page === 'main' &&
            <MainPage
              edge={edge}
              updateEdge={updateEdge}
              setPage={setPage}
              nodes={nodes} />
          }
        </div>
        <div>
          <EditorSubmitButtons
            hideSubmitButton={true}
            handleDelete={removeEdge}
            page={page}
            setPage={setPage} />
        </div>
      </div>
    </EditorHotKeys>
  )
}

EdgeEditor.propTypes = {
  id: PropTypes.string.isRequired
}
