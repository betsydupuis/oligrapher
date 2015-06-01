var BaseComponent = require('./BaseComponent');
var Graph = require('./Graph');

class GraphContainer extends BaseComponent {
  constructor(){
    super();
    this.displayName = 'GraphContainer';
  }
  render(){
    return (
      <div className="graphContainer">
        <Graph />
      </div>
    );
  }
}

module.exports = GraphContainer;