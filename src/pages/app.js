import React from 'react'
import { Router } from '@reach/router'
import Profile from '../components/profile'
import Login from '../components/login'
import PrivateRoute from '../components/privateRoute'

const App = () => (
  <Router>
    <PrivateRoute path='/app/profile' component={Profile} />
    <Login path='/app/login' />
  </Router>
)
export default App
