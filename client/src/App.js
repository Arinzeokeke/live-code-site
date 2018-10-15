import React, { Component } from 'react'
import { Subscribe } from 'unstated'
import AppContainer from './containers/AppContainer'

class App extends Component {
  componentDidMount() {
    console.log(this.props)
    this.props.appLoad()
  }

  render() {
    const { loaded } = this.props

    if (!loaded) {
      return (
        <div>
          <p> Loading...</p>
        </div>
      )
    }

    return this.props.children
  }
}

const AppConnected = props => {
  return (
    <Subscribe to={[AppContainer]}>
      {({ state: { user, loaded }, appLoad }) => {
        return <App {...props} user={user} loaded={loaded} appLoad={appLoad} />
      }}
    </Subscribe>
  )
}
export default AppConnected
