import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import App from './App'
import Header from './components/Header'
import Login from './views/Login'
import Register from './views/Register'
import Channels from './views/Channels'
import ChannelPage from './views/Channels/ChannelPage'
import CreateChannel from './views/Channels/CreateChannel'
import signedOutFallback from './hocs/routes'

const LoginRedirect = component =>
  signedOutFallback(component, () => <Redirect to="/login" />)

const ChannelsRedirect = LoginRedirect(Channels)
const CreateChannelsRedirect = LoginRedirect(CreateChannel)
const ChannelPageRedirect = LoginRedirect(ChannelPage)

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <App>
            <Header />
            <div
              style={{
                backgroundColor: '#FAFAFA',
                minHeight: '100vh',
                paddingTop: '3rem'
              }}
            >
              <div className="container">
                <Switch>
                  <Route exact path="/" component={CreateChannelsRedirect} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route
                    exact
                    path="/:username/channels"
                    component={ChannelsRedirect}
                  />
                  <Route
                    path="/channels/create"
                    component={CreateChannelsRedirect}
                  />
                  <Route path="/channels/:id" component={ChannelPageRedirect} />
                </Switch>
              </div>
            </div>
          </App>
        </React.Fragment>
      </Router>
    )
  }
}
