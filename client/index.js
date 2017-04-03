import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'

function renderApp() {
  if (module.hot) {
    module.hot.accept('./App.js', () => {
      // eslint-disable-next-line global-require
      const NextApp = require('./App').default

      ReactDOM.render((
        <AppContainer>
          <NextApp />
        </AppContainer>
      ), document.getElementById('root'))
    })
  }
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  )
}

document.addEventListener('DOMContentLoaded', renderApp)

export default App
