var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

module.exports = {
  userDidSearch: function(search) {
    AppDispatcher.dispatch({
      type: ActionTypes.SEARCH,
      payload: search
    });
  }
};