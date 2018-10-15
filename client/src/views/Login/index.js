import React from 'react'
import { Form } from 'react-final-form'

import { centerParent } from '../../components/globals'
import FormField from '../../components/formHelpers/FormField'
import { required } from '../../components/formHelpers/util'
import { Subscribe } from 'unstated'
import AppContainer from '../../containers/AppContainer'

class Login extends React.Component {
  async handleSubmit(values) {
    console.log(this.props)
    this.props.login(values, this.props.history)
  }
  render() {
    return (
      <div className={centerParent} style={{ minWidth: '50%' }}>
        <div className="card">
          <div className="card-header">
            <p className=" card-header-title">Login</p>
          </div>
          <div className="card-content">
            <Form
              onSubmit={this.handleSubmit.bind(this)}
              render={({ handleSubmit, submitting, valid }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <React.Fragment>
                      <FormField
                        name="username"
                        label="Username"
                        validators={[required]}
                        type="text"
                      />

                      <FormField
                        name="password"
                        label="Password"
                        validators={[required]}
                        type="password"
                      />
                      <div className="field">
                        <div className={`control ${centerParent}`}>
                          <button type="submit" className="button is-primary">
                            Login
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  </form>
                )
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

const LoginConnected = props => {
  return (
    <Subscribe to={[AppContainer]}>
      {({ state: { error }, login }) => {
        return <Login {...props} login={login} error={error} />
      }}
    </Subscribe>
  )
}

export default LoginConnected
