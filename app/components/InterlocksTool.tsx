import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "@mui/material/Button"
import { IoIosLink } from "react-icons/io"

import Toolbox from "./Toolbox"
import { isLittleSisId } from "../util/helpers"

export default function InterlocksTool() {
  const dispatch = useDispatch()
  const getInterlocks = useCallback(() => dispatch({ type: "INTERLOCKS_REQUESTED" }), [dispatch])
  const selectedNodes = useSelector(state => state.display.selection.node)
  const lsNodes = selectedNodes.filter(isLittleSisId)
  const twoLsNodes = selectedNodes.length === 2 && lsNodes.length === 2

  return (
    <Toolbox title="Interlocks">
      <div className="oligrapher-interlocks">
        <p>Select two nodes that were imported from LittleSis to fetch their interlocks.</p>
        <p>
          If a node was imported from LittleSis, you'll see a <IoIosLink /> icon at the top of the
          form when editing it.
        </p>
        <p>
          LittleSis Nodes Selected: <code>{lsNodes.length}</code>
        </p>
        <Button
          disabled={!twoLsNodes}
          onClick={getInterlocks}
          variant="contained"
          color="primary"
          disableElevation={true}
        >
          Get interlocks
        </Button>
      </div>
    </Toolbox>
  )
}
