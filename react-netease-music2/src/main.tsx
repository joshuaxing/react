import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './styles/global.module.css'

ReactDom.render(<App/>, document.getElementById('app'))
