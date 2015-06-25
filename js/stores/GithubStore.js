var EventEmitter = require('events').EventEmitter,
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ActionTypes = require('../constants/Constants').ActionTypes,
  assign = require('object-assign'), 
  $ = require('jquery');

var repositories = {};
var currentLanguage = null;
var GithubStore = assign({}, EventEmitter.prototype, {
  events: { 
    CHANGE: 'CHANGE'
  },

  addChangeListener: function (listener) {
    this.on(this.events.CHANGE, listener);
  },

  removeChangeListener: function (listener) {
    this.off(this.events.CHANGE, listener);
  },

  getRepositories: function() {
    return repositories[currentLanguage];
  },

  _doSearch: function (language) {
    currentLanguage = language;
    if (repositories[language]) {
      this.emit(this.events.CHANGE);

    }
    else {
      $.ajax({
        method: 'GET',
        url: '/github/search?language=' + language
      }).then(function (response) {
        repositories[language] = response.items
        this.emit(this.events.CHANGE);
      }.bind(this));
    }
  }

});

AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.SEARCH:
      GithubStore._doSearch(action.payload);
      break;
    default: 
      // nothing to do
  }
});

module.exports = GithubStore;