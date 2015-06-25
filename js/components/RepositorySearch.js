var React = require('react'),
  Search = require('./Search'),
  ResultsTable = require('./ResultsTable'),
  GithubStore = require('../stores/GithubStore');

var RepositorySearch = React.createClass({

  getInitialState: function() {
    return {
      language: 'javascript',
      results: []
    }
  },

  componentWillMount: function() {
    GithubStore.addChangeListener(this._onStoreChange);

  },

  componentWillUnmount: function() {
    GithubStore.removeChangeListener(this._onStoreChange);
  },

  render: function() {
    return <div>
      <h2>Github Search</h2>

      <Search initialLanguage={this.state.language} />
      <ResultsTable results={this.state.results}/>
    </div>;
  },

  _onStoreChange: function() {
    this.setState({
      results: this._getResults()
    });
  },

  _getResults: function() {
    return GithubStore.getRepositories();
  }
});

module.exports = RepositorySearch;