var React = require('react'),
  ActionCreator = require('../action-creators/ActionCreator');

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
    ActionCreator.userDidSearch(this.state.language);
  },

  _onLanguageChange: function(e) {
    this.setState({
      language: e.target.value
    });
  }
});

module.exports = Search;