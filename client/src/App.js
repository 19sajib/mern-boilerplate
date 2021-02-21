import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'

import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'

const App = () => (
  <BrowserRouter>
      <Container maxidth="lg">
          <Navbar />
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/auth" exact component={Auth}/>
              <Route path="/profile" exact component={Profile}/>
          </Switch>
      </Container>
  </BrowserRouter>
  )

export default App;

