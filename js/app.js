"use strict";

var React = require('react');
var $ = require('jquery');

var App = React.createClass({

  getInitialState: function() {
    return {
      language: 'javascript',
      results: []
    }
  },

  componentDidMount: function() {
    this._search(this.state.language);
  },

  render: function() {
    return <div>
      <h2>Github Search</h2>

      <Search initialLanguage={this.state.language} handleSearch={this._handleSearch}/>
      <ResultsTable results={this.state.results}/>
    </div>;
  },

  _onItemChange: function(e) {
    this.setState({
      item: e.target.value
    });
  },

  _handleSearch: function(language) {
    this.setState({
      language: language
    });
    this._search(language);
  },

  _search: function(language) {
    $.ajax({
        method: 'GET',
        url: '/github/search?language=' + language
      }).then(function (response) {
        this.setState({
          results: response.items
        });
      }.bind(this));
  }
});

var Search = React.createClass({

  getInitialState: function() {
    return {
      language: this.props.initialLanguage
    };
  },

  render: function() {
    return <form onSubmit={this._submitForm}>
      <div className="form-group">
        <label htmlFor="language">Language</label>
        <input type="text" className="form-control" id="language" value={this.state.language} onChange={this._onLanguageChange}/>
      </div>
      <button type="submit" className="btn btn-primary" disabled={this.state.language.length === 0}>Search</button>
    </form>;
  },

  _submitForm:function(e) {
    e.preventDefault();
    this.props.handleSearch(this.state.language);
  },

  _onLanguageChange: function(e) {
    this.setState({
      language: e.target.value
    });
  }
})

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

var ResultRow = React.createClass({
  
  render: function() {
    return <tr>
      <td>{this.props.result.name}</td>
      <td>{this.props.result.stargazers_count}</td>
    </tr>;
  },

});

React.render(<App />, document.getElementById('main'));
