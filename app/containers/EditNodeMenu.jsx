import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { nodePropTypes } from '../graph/node'
import omit from 'lodash/omit'
import curry from 'lodash/curry'

import SizePicker from '../components/SizePicker'

import { MdPhotoSizeSelectSmall, MdFormatColorFill } from "react-icons/md"
import { FaShapes } from "react-icons/fa"

// whatever-func-useState()-returns, string ---> function(event)
function updateNodeFunc(setNode, attributeName) {
  return function(event) {
    const value = event.target.value
    setNode(oldState => ({...oldState, [attributeName]: value}))
  }
}

function StyleForm({setPage}) {
  return <div className="style-form">
           <div>Style</div>
           <div>
             <div>
               <span onClick={() => setPage('size')}>
                 <MdPhotoSizeSelectSmall/>
               </span>
             </div>
             <div>
               <span onClick={() => setPage('color')}>
                 <MdFormatColorFill/>
               </span>
             </div>
             <div>
               <span onClick={() => console.error('Shapes not yet implemented')}>
                 <FaShapes/>
               </span>
             </div>
           </div>
         </div>
}

StyleForm.propTypes = { setPage: PropTypes.func.isRequired }

export function MainPage({node, nodeUpdater, setPage}) {
  return <>
           <form className="oligrapher-edit-node-menu-form">
             <div>
               <label>Title</label>
                <input type="text"
                      placeholder="node title"
                      value={node.name || ''}
                      onChange={nodeUpdater('name')} />
             </div>

             <div>
               <label>Image Link</label>
               <input type="text"
                      placeholder="Image link"
                      value={node.image || ''}
                      onChange={nodeUpdater('image')} />
             </div>

             <div>
               <label>Clickthrough Link</label>
               <input type="text"
                      placeholder="Link"
                      value={node.url || ''}
                      onChange={nodeUpdater('url')} />
             </div>
           </form>
           <hr/>
           <StyleForm setPage={setPage} />
           <hr/>
           <a onClick={() => setPage('bio')}
              className="add-node-bio-link">Add Node Bio +</a>
         </>
}

MainPage.propTypes = {
  node: PropTypes.shape({ name: PropTypes.string,
                          image: PropTypes.string,
                          url: PropTypes.string }).isRequired,
  nodeUpdater: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
}

function colorPage() { return "COLOR PAGE" }
function bioPage() { return "BIO PAGE" }

/*
  Changes to the node are stored as local state on this component until submitted
*/
export function EditNodeMenuBody(props) {
  // possible pages: main, color, size, bio
  const [page, setPage] = useState('main')
  const [node, setNode] = useState(omit(props.node, ['x', 'y', 'id']))
  const nodeUpdater = curry(updateNodeFunc)(setNode)
  const handleSubmit = () => props.updateNode(props.id, node)
  const handleDelete = () => console.log(`deleting node ${props.id}`)

  const setScale = newScale => setNode(oldState => ({...oldState, scale: newScale }))

  return <>
           <main>
             { page === 'main' && <MainPage node={node} nodeUpdater={nodeUpdater} setPage={setPage} /> }
             { page === 'color' && colorPage() }
             { page === 'size' && <SizePicker scale={node.scale} setScale={setScale} /> }
             { page === 'bio' && bioPage() }
           </main>
           <footer>
             <div className="edit-node-menu-submit-buttons">
               { page === 'main' && <button name="delete" onClick={handleDelete}>Delete</button> }
               { page !== 'main' && <button name="back" onClick={() => setPage('main')}>Back</button> }
               <button name="update" onClick={handleSubmit}>Update</button>
             </div>
           </footer>
         </>
}

EditNodeMenuBody.propTypes = {
  id: PropTypes.string.isRequired,
  node: PropTypes.shape(nodePropTypes).isRequired,
  updateNode: PropTypes.func.isRequired
}

/*
  The menu for Editing a node. Rendered in <root>

  This component is a simple wrapper around EditNodeMenuBody.
  The "key" property on <EditNodeMenuBody> is important: it ensures that
  <EditNodeMenuBody /> is re-created when a different node is selected.
*/
export function EditNodeMenu(props) {
  if (!props.visible) { return null }

  return <div className="oligrapher-edit-node-menu">
           <div className="edit-node-menu-wrapper">
             <header>Edit & Customize Node</header>
             <EditNodeMenuBody {...props} key={props.id} />
           </div>
         </div>
}

EditNodeMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  id: PropTypes.string,
  node: PropTypes.shape(nodePropTypes),
  updateNode: PropTypes.func.isRequired
}


const mapStateToProps = state => {
  const visible = Boolean(state.display.editor.tool === 'node' && state.display.editor.editNode)

  if (!visible) {
    return { visible: false, id: null, node: null }
  }

  return {
    visible: true,
    id: state.display.editor.editNode,
    node: state.graph.nodes[state.display.editor.editNode]
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateNode: (id, attributes) => dispatch({type: "UPDATE_NODE", id, attributes })
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNodeMenu)