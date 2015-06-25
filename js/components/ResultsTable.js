var React = require('react'),
  ResultRow = require('./ResultRow');

var ResultsTable = React.createClass({
  getDefaultProps: function() {
    return {
      results: []
    }
  },

  render: function() {
    var rows = this.props.results.map(function(result, index) {
      return <ResultRow key={index} result={result} />
    }.bind(this));

    return <div>
      <h4>Results count: {this.props.results.length}</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>;
  }, 
});

module.exports = ResultsTable;