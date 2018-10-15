import React from 'react'
import { Form } from 'react-final-form'

import { centerParent } from '../../components/globals'
import FormField from '../../components/formHelpers/FormField'
import SelectorField from '../../components/formHelpers/SelectorField'
import { required } from '../../components/formHelpers/util'

import { languages } from '../../config'
import { Channels } from '../../agent'

class CreateChannel extends React.Component {
  state = {
    error: null
  }
  async handleSubmit(values) {
    console.log(values)
    try {
      const { channel } = await Channels.create(values)
      this.setState({ error: null })
      this.props.history.push(`/${channel.owner.username}/channels`)
    } catch (error) {
      this.setState({
        error
      })
    }
  }
  render() {
    return (
      <div className={centerParent} style={{ minWidth: '50%' }}>
        <div className="card">
          <div className="card-header">
            <p className=" card-header-title">Create Channel</p>
          </div>
          <div className="card-content">
            <Form
              onSubmit={this.handleSubmit.bind(this)}
              render={({ handleSubmit, submitting, valid }) => {
                return (
                  <form onSubmit={handleSubmit} className="col s12">
                    <React.Fragment>
                      <FormField
                        name="title"
                        label="Title"
                        validators={[required]}
                        type="text"
                      />

                      <SelectorField
                        name="online"
                        type="checkbox"
                        options={['Channel Online']}
                      />
                      <br />

                      <FormField
                        name="extension"
                        label="Language"
                        validators={[required]}
                        type="text"
                        selectElems={languages.map(l => ({ id: l, name: l }))}
                      />

                      <div className="field">
                        <div className={`control ${centerParent}`}>
                          <button type="submit" className="button is-primary">
                            Create Channel
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

export default CreateChannel
