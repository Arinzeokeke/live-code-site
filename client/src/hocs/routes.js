import React, { Component } from 'react'
import { Subscribe } from 'unstated'
import { Redirect } from '@reach/router'

export default ChildComponent => {
  class RequireAuth extends Component {
    render() {
      switch (this.props.user) {
        case false:
          return <Redirect to="/login" />
        case null:
          return <div>Loading...</div>
        default:
          return <ChildComponent {...this.props} />
      }
    }
  }

  return props => {
    return (
      <Subscribe>
        {({ state: { user } }) => {
          return <RequireAuth {...props} />
        }}
      </Subscribe>
    )
  }
}
