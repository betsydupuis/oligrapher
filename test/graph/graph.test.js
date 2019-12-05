import curry from 'lodash/curry'
import values from 'lodash/values'
import Graph, {
  getId,
  nodeSide,
  determineNodeNumber,
  updateEdgeCurveEnd
} from '../../app/graph/graph'
import Node from '../../app/graph/node'
import Edge from '../../app/graph/edge'
import { xy } from '../../app/util/helpers'

describe('Graph', function() {
  describe("Helpers", function() {
    specify('getId', function() {
      expect(getId('one')).to.eql('one')
      expect(getId(123)).to.eql('123')
      expect(() => getId({ foo: 'bar' })).to.throw()
      expect(() => getId(()=>{})).to.throw()
      expect(getId({id: 123})).to.eql('123')
    })

    specify("new()", function() {
      let g = Graph.new()
      expect(g.nodes).to.eql({})
      expect(g.edges).to.eql({})
      expect(Graph.new()).not.to.eq(Graph.new())
    })

    specify('determineNodeNumber', function() {
      let n1 = Node.new()
      let n2 = Node.new()
      let edge = Edge.newEdgeFromNodes(n1, n2)
      expect(determineNodeNumber({edge, node: n1})).to.eql(1)
      expect(determineNodeNumber({edge, node: n2})).to.eql(2)
      expect(() => determineNodeNumber({edge, node: Node.new()})).to.throw(/Edge is not connected/)
    })

    xspecify("nodeSide", function() {
      let n1 = Node.new()
      let n2 = Node.new()
      let edge = Edge.newEdgeFromNodes(n1, n2)

      expect(nodeSide({node: n1, edge})).to.eql('START')
      expect(nodeSide({node: n2, edge})).to.eql('END')
    })
  })

  describe("Getters", function() {
    let n1, n2, n3, n4, graph, e1, e2

    beforeEach(function() {
      n1 = Node.new({ x: -10, y: 30})
      n2 = Node.new({ x: 0, y: -30 })
      n3 = Node.new({ x: 10, y: 0 })
      n4 = Node.new({ x: 0, y: 0 })
      e1 = Edge.newEdgeFromNodes(n1, n2)
      e2 = Edge.newEdgeFromNodes(n2, n3)
      graph = Graph.new()
      Graph.addNodes(graph, [n1, n2, n3, n4])
      Graph.addEdges(graph, [e1, e2])
    })

    specify("edgesOf", function() {
      let edgesOf = curry(Graph.edgesOf)(graph)
      expect(edgesOf(n1.id)).to.have.lengthOf(1)
      expect(edgesOf(n2.id)).to.have.lengthOf(2)
      expect(edgesOf(n3.id)).to.have.lengthOf(1)
      expect(edgesOf(n4.id)).to.have.lengthOf(0)
    })

    specify("nodesOf", function() {
      let nodesOf = curry(Graph.nodesOf)(graph)
      expect(nodesOf(e1)).to.eql([n1, n2])
      expect(nodesOf(e2.id)).to.eql([n2, n3])
    })
  })

  describe("Stats", function() {
    let graph

    beforeEach(function() {
      let n1 = Node.new({ x: -10, y: 30 })
      let n2 = Node.new({ x: 0, y: -30 })
      let n3 = Node.new({ x: 10, y: 0 })
      let edge = Edge.newEdgeFromNodes(n1, n2)
      graph = Graph.new()
      Graph.addNodes(graph, [n1, n2, n3])
      Graph.addEdge(graph, edge)
    })

    specify("nodeCount", function() {
      expect(Graph.stats(graph).nodeCount).to.eql(3)
    })

    specify("edgeCount", function() {
      expect(Graph.stats(graph).edgeCount).to.eql(1)
    })

    specify("min and max node XY values", function() {
      let stats = Graph.stats(graph)
      expect(stats.minNodeX).to.eql(-10)
      expect(stats.minNodeY).to.eql(-30)
      expect(stats.maxNodeX).to.eql(10)
      expect(stats.maxNodeY).to.eql(30)
    })
  })

  describe("Nodes", function() {
    specify("addNode()", function() {
      let g = Graph.new()
      let n = Node.new({ display: { x: 1, y: 1 } })
      expect(g.nodes).to.eql({})
      Graph.addNode(g, n)
      expect(g.nodes).to.eql({ [n.id]: n })
    })

    specify("addNodes()", function() {
      let g = Graph.new()
      let n1 = Node.new()
      let n2 = Node.new()
      expect(values(g.nodes).length).to.eq(0)
      Graph.addNodes(g, [n1, n2])
      expect(values(g.nodes).length).to.eq(2)
    })

    specify("removeNode()", function() {
      let n = Node.new()
      let g = Graph.new()
      expect(g.nodes[n.id]).not.to.be.ok
      Graph.addNode(g, n)
      expect(g.nodes[n.id]).to.be.ok
      Graph.removeNode(g, n)
      expect(g.nodes[n.id]).not.to.be.ok
      Graph.addNode(g, n)
      expect(g.nodes[n.id]).to.be.ok
      Graph.removeNode(g, n.id)
      expect(g.nodes[n.id]).not.to.be.ok
    })

    specify("updateNode", function() {
      let n = Node.new()
      let g = Graph.new()
      Graph.addNode(g, n)
      expect(g.nodes[n.id].scale).to.eql(1)
      Graph.updateNode(g, n.id, { scale: 2 })
      expect(g.nodes[n.id].scale).to.eql(2)
    })

    specify("moveNode", function() {
      let n = Node.new({x: 1, y: 2})
      let g = Graph.new()
      Graph.addNode(g, n)
      expect(xy(g.nodes[n.id])).to.eql({x: 1, y: 2})
      Graph.moveNode(g, n.id, {x: 2, y: 4})
      expect(xy(g.nodes[n.id])).to.eql({x: 3, y: 6})
    })
  })

  describe("Edges", function() {
    let n1, n2, n3, g, edge

    beforeEach(function() {
      n1 = Node.new()
      n2 = Node.new()
      n3 = Node.new()
      g = Graph.new()
      Graph.addNodes(g, [n1, n2, n3])
      edge = Edge.new({ node1_id: n1.id, node2_id: n2.id })
    })

    specify("addEdge", function() {
      expect(g.edges).to.eql({})
      Graph.addEdge(g, edge)
      expect(g.edges).to.eql({ [edge.id]: edge })
    })

    specify("addEdges", function() {
      expect(g.edges).to.eql({})
      Graph.addEdge(g, edge)
      expect(g.edges).to.eql({ [edge.id]: edge })
    })

    specify("addEdges", function() {
      expect(g.edges).to.eql({})
      let edges = [Edge.new(), Edge.new()]
      Graph.addEdges(g, edges)
      expect(values(g.edges)).to.have.lengthOf(2)
    })

    specify("removeEdge", function() {
      Graph.addEdge(g, edge)
      expect(g.edges).to.eql({ [edge.id]: edge })
      Graph.removeEdge(g, edge)
      expect(g.edges).to.eql({})
    })

    specify("updateEdge", function() {
      Graph.addEdge(g, edge)
      expect(g.edges[edge.id].url).to.eql(null)
      expect(g.edges[edge.id].label).to.eql(null)
      Graph.updateEdge(g, edge.id, { url: 'http://example.com', label: 'example label'})
      expect(g.edges[edge.id].url).to.eql('http://example.com')
      expect(g.edges[edge.id].label).to.eql('example label')
    })
  })

  describe('dragging', function() {
    let node1, node2, node3, edge1, edge2, graph

    beforeEach(function() {
      node1 = Node.new({x: 5, y: 10})
      node2 = Node.new({x: 10, y: 20})
      node3 = Node.new({x: 20, y: 40})
      edge1 = Edge.newEdgeFromNodes(node1, node2)
      edge2 = Edge.newEdgeFromNodes(node2, node3)
      graph = Graph.new()
      Graph.addNodes(graph, [node1, node2, node3])
      Graph.addEdges(graph, [edge1, edge2])
    })


    specify('moveNode', function() {
      let node = Node.new({x: 10, y: 20 })
      let graph = Graph.new()
      Graph.addNode(graph, node)
      expect(xy(graph.nodes[node.id])).to.eql({x: 10, y: 20 })
      Graph.moveNode(graph, node.id, {x: -2,  y: -5 })
      expect(xy(graph.nodes[node.id])).to.eql({x: 8, y: 15 })
    })

    specify('updateEdgeOffset')

    describe('updateEdgeCurveEnd', function() {
      let newNodeCoords = {x: 100, y: 100}

      it('updates node 1 position', function() {
        let updatedEdge = updateEdgeCurveEnd(edge1, 1, newNodeCoords)
        expect({x: updatedEdge.x1, y: updatedEdge.y1}).to.eql({x: 100, y: 100})
        expect({x: updatedEdge.x2, y: updatedEdge.y2}).to.eql({x: 10, y: 20})
      })

      it('updates node 2 position', function() {
        let updatedEdge = updateEdgeCurveEnd(edge1, 2, newNodeCoords)
        expect({x: updatedEdge.x1, y: updatedEdge.y1}).to.eql({x: 5, y: 10})
        expect({x: updatedEdge.x2, y: updatedEdge.y2}).to.eql({x: 100, y: 100})
      })
    })

    specify('dragNodeEdge')
    xdescribe('dragNode', function() {})
    specify('dragEdge')
  })

  describe("ViewBox", function() {
    specify("calculateViewBox")
    specify("updateViewBox")
  })

  describe("Zoom", function() {
    specify("setZoom")
  })

  describe("Dragging", function() {
    specify("dragNode")
    specify("dragEdge")
  })
})