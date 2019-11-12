import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import Header from './Header'
import Footer from './Footer'
import './styles'

const App = () => (
  <Router>
    <div>
      <Header />
      <Routes />
      <Footer />
    </div>
  </Router>
)

export default hot(module)(App)
