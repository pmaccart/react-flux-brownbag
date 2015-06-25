var React = require('react');

var ResultRow = React.createClass({
  
  render: function() {
    return <tr>
      <td>{this.props.result.name}</td>
      <td>{this.props.result.stargazers_count}</td>
    </tr>;
  },

});

module.exports = ResultRow;