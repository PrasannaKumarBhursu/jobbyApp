import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import JobsRoute from './components/JobsRoute'
import JobItemDetailsRoute from './components/JobItemDetailsRoute'
import HomeRoute from './components/HomeRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetailsRoute} />
    <Route path="/Not-Found" component={NotFound} />
    <Redirect to="Not-Found" />
  </Switch>
)

export default App
