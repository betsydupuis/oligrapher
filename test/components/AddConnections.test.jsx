import React from 'react'
import { act } from "react-dom/test-utils"
import sinon from 'sinon'

import AddConnections from '../../app/components/tools/AddConnections'
import EntitySearchResults, { SearchResult } from '../../app/components/tools/EntitySearchResults'
import Graph from '../../app/graph/graph'
import Node from '../../app/graph/node'
import Edge from '../../app/graph/edge'
import * as littlesis3 from '../../app/datasources/littlesis3'
import { createMockStore, mountWithStore, stubDispatch } from '../testHelpers'

describe('<AddConnections>', function() {
  let wrapper, mockDispatch, mockFindConnections, store, response, state, graph, node1, node2, node3, edge

  beforeEach(function() {
    mockDispatch = stubDispatch()
    mockFindConnections = sinon.spy(() => response)
    sinon.stub(littlesis3, "findConnections").callsFake(mockFindConnections)
    graph = Graph.new()
    node1 = Node.new()
    node2 = Node.new()
    node3 = Node.new()
    Graph.addNodes(graph, [node1, node2, node3])
    edge = Edge.newEdgeFromNodes(node1, node2)
    Graph.addEdge(graph, edge)
    state = { graph }
    store = createMockStore(state)
  })

  afterEach(function() {
    mockDispatch.restore()
    littlesis3.findConnections.restore()
  })

  it('shows loading', function() {
    response = Promise.resolve()
    wrapper = mountWithStore(store, <AddConnections id={node1.id} />)
    expect(wrapper.text().toLowerCase()).to.contain("loading")
  })

  it('calls findConnections', async function() {
    response = Promise.resolve()

    await act(async () => {
      wrapper = mountWithStore(store, <AddConnections id={node1.id} />)
    })

    expect(mockFindConnections.calledOnce).to.be.true
  })

  it('shows no results', async function() {
    response = Promise.resolve()

    await act(async () => {
      wrapper = mountWithStore(store, <AddConnections id={node1.id} />)
    })

    expect(wrapper.html().toLowerCase()).to.contain("no results")
  })

  it('shows results', async function() {
    let data = [{ id: 1, name: "Bob", description: "a person", image: null, url: null }]
    response = Promise.resolve(data)

    await act(async () => {
      wrapper = mountWithStore(store, <AddConnections id={node1.id} />)
    })
    
    wrapper.update()

    let results = wrapper.find(EntitySearchResults)
    expect(results).to.have.lengthOf(1)
    expect(results.prop('results')).to.eql(data)
  })

  it('filters already connected nodes from results', async function() {
    let data = [{ id: node2.id, name: "Bob", description: "a person", image: null, url: null }]
    response = Promise.resolve(data)

    await act(async () => {
      wrapper = mountWithStore(store, <AddConnections id={node1.id} />)
    })
    
    expect(wrapper.html().toLowerCase()).to.contain("no results")
  })

  it('adds connection and filters added node from results', async function() {
    let data = [
      { id: 1, name: "Bob", description: "a person", image: null, url: null },
      { id: 2, name: "Babs", description: "another person", image: null, url: null }
    ]
    response = Promise.resolve(data)

    await act(async () => {
      wrapper = mountWithStore(store, <AddConnections id={node1.id} />)
    })

    wrapper.update()

    expect(wrapper.find(SearchResult)).to.have.length(2)
    let link = wrapper.find('.entity-search-result a').first()
    link.simulate('click')
    let action = mockDispatch.getCall(0).args[0]
    expect(action.type).to.equal('ADD_CONNECTION')
    expect(action.existingNodeId).to.equal(node1.id)
    expect(wrapper.find(SearchResult)).to.have.length(1)
    expect(wrapper.find('.entity-search-result a').text()).to.equal("Babs")
  })
})