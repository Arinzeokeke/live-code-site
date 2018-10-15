import React from 'react'
import { Form } from 'react-final-form'

import { centerParent } from '../../components/globals'
import FormField from '../../components/formHelpers/FormField'
import { required, confirmPassword } from '../../components/formHelpers/util'
import { Subscribe } from 'unstated'
import AppContainer from '../../containers/AppContainer'

class Register extends React.Component {
  handleSubmit(values) {
    console.log(values)
    this.props.register(values, this.props.history)
  }
  render() {
    return (
      <div className={centerParent} style={{ minWidth: '50%' }}>
        <div className="card">
          <div className="card-header">
            <p className=" card-header-title">Sign Up</p>
          </div>
          <div className="card-content">
            <Form
              onSubmit={this.handleSubmit.bind(this)}
              validate={confirmPassword}
              render={({ handleSubmit, submitting, valid }) => {
                return (
                  <form onSubmit={handleSubmit} className="col s12">
                    <React.Fragment>
                      <FormField
                        name="username"
                        label="Username"
                        validators={[required]}
                        type="text"
                      />

                      <FormField
                        name="email"
                        label="Email"
                        validators={[required]}
                        type="email"
                      />

                      <FormField
                        name="password"
                        label="Password"
                        validators={[required]}
                        type="password"
                      />

                      <FormField
                        name="confirmPassword"
                        label="Confirm Password"
                        validators={[required]}
                        type="password"
                      />
                      <div className="field">
                        <div className={`control ${centerParent}`}>
                          <button type="submit" className="button is-primary">
                            Register
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

const RegisterConnected = props => {
  return (
    <Subscribe to={[AppContainer]}>
      {({ state: { error }, register }) => {
        return <Register {...props} register={register} error={error} />
      }}
    </Subscribe>
  )
}

export default RegisterConnected
