import React from 'react'
import { IconContext } from "react-icons/lib"

import { MENU_ITEMS } from '../editorMenu'
import EditorMenuItem from './EditorMenuItem'
import UndoRedo from './UndoRedo'

const iconContextValue = {
  size: "35px",
  className: "editor-menu-icon",
  color: 'gray'
}

export default function EditorMenu() {
  return (
    <div className="editor-menu">
      <IconContext.Provider value={iconContextValue} >
        { MENU_ITEMS.map(item => <EditorMenuItem key={item} item={item} />) }
      </IconContext.Provider>
      <UndoRedo />
    </div>
  )
}