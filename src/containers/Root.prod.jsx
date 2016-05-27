import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import App from './App'

export default class Root extends Component {
  displayName = 'prod root component';

  static propTypes = {
      store: PropTypes.object
  };

  render() {
      const { store } = this.props
      return (
        <Provider store={store}>
          <App />
        </Provider>
      )
  }
}