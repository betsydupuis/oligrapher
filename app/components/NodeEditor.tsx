import React, { useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import EditorHeader from "./EditorHeader"
import SizePicker from "./SizePicker"
import EditNodeColorPage from "./EditNodeColorPage"
import NodeStyleForm from "./NodeStyleForm"
import EditorSubmitButtons from "./EditorSubmitButtons"
import EditorHotKeys from "./EditorHotKeys"
import { callWithTargetValue, isLittleSisId } from "../util/helpers"
import { IoIosLink } from "@react-icons/all-files/io/IoIosLink"
import { NodeAttributes } from "../graph/node"
import NodeEditorMain from "./NodeEditorMain"

import Input from "@mui/material/Input"
import NodeEditorColor from "./NodeEditorColor"

export default function NodeEditor({ id }) {
  // possible pages: main, color, size
  const [page, setPage] = useState("main")
  const node = useSelector(state => state.graph.nodes[id])
  const colors = useSelector(state => Object.values(state.graph.nodes).map(node => node.color))

  const dispatch = useDispatch()
  const removeNode = useCallback(() => dispatch({ type: "REMOVE_NODE", id }), [dispatch, id])
  const updateNode = useCallback(
    attributes => dispatch({ type: "UPDATE_NODE", id, attributes }),
    [dispatch, id]
  )
  const handleColorChange = useCallback(color => updateNode({ color }), [updateNode])
  const handleScaleChange = useCallback(scale => updateNode({ scale }), [updateNode])
  const openAddConnections = () => dispatch({ type: "OPEN_ADD_CONNECTIONS", id })
  const isLsNode = isLittleSisId(id)

  return (
    <EditorHotKeys remove={removeNode}>
      <div className="oligrapher-node-editor">
        <EditorHeader title="Customize Node" />
        <main>
          {page === "main" && (
            <NodeEditorMain
              node={node}
              setPage={setPage}
              updateNode={updateNode}
              openAddConnections={openAddConnections}
            />
          )}
          {page === "color" && (
            <NodeEditorColor color={node.color} onChange={handleColorChange} colors={colors} />
          )}
          {page === "size" && <SizePicker scale={node.scale} onChange={handleScaleChange} />}
        </main>

        <footer>
          {isLsNode && (
            <div title={`LittleSis Entity ID: ${id}`} className="node-littlesis-link">
              <IoIosLink />
            </div>
          )}

          <EditorSubmitButtons
            hideSubmitButton={true}
            handleDelete={removeNode}
            page={page}
            setPage={setPage}
          />
        </footer>
      </div>
    </EditorHotKeys>
  )
}
