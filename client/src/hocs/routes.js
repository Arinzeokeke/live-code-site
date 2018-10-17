import React from 'react'
import { Subscribe } from 'unstated'
import AppContainer from '../containers/AppContainer'

const Switch = props => {
  const { Component, FallbackComponent, user, ...rest } = props
  if (!user || !Component) {
    return <FallbackComponent {...rest} />
  } else {
    return <Component {...rest} user={user} />
  }
}
const signedOutFallback = (Component, FallbackComponent) => {
  return props => (
    <Subscribe to={[AppContainer]}>
      {({ state: { user } }) => (
        <Switch
          user={user}
          FallbackComponent={FallbackComponent}
          Component={Component}
          {...props}
        />
      )}
    </Subscribe>
  )
}

export default signedOutFallback
