import React from "react";

const StoreContext = React.createContext();

const setCurrentRow = function(key, value) {
  const state = this.state;
  state[key] = value;
  this.setState(state);
};

const getCurrentRow = function(key) {
  return this.state[key];
};

const remove = function(key) {
  const state = this.state;
  delete state[key];
  this.setState(state);
};

const createStore = function(WrappedComponent) {
  return class extends React.Component {
    state = {
      get: getCurrentRow.bind(this),
      set: setCurrentRow.bind(this),
      remove: remove.bind(this)
    };
    render() {
      return (
        <StoreContext.Provider value={this.state}>
          <WrappedComponent {...this.props} />
        </StoreContext.Provider>
      );
    }
  };
};

const withStore = function(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <StoreContext.Consumer>
          {context => <WrappedComponent store={context} {...this.props} />}
        </StoreContext.Consumer>
      );
    }
  };
};
export { createStore, withStore };
