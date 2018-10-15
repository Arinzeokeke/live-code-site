import React from 'react'
import { Field } from 'react-final-form'
import { composeValidators } from './util'
import { centerParent } from '../globals'

export default class FormField extends React.Component {
  render() {
    const {
      name,
      validators,
      label,
      type,
      selectElems,
      isTextArea
    } = this.props
    return (
      <Field name={name} validate={composeValidators(validators)}>
        {({ input, meta }) => {
          const isError = meta.error && meta.touched
          const valid = meta.touched && !meta.error
          const inputClass = isError ? 'invalid' : valid ? 'valid' : null

          const renderInput = () => (
            <React.Fragment>
              <input
                {...input}
                id={name}
                type={type}
                placeholder={label}
                className={`input ${inputClass}`}
              />
            </React.Fragment>
          )

          const renderSelect = () => {
            return (
              <div
                className={`select is-info ${inputClass}  is-rounded`}
                style={{ width: '100%' }}
              >
                <select {...input} style={{ width: '100%' }}>
                  {selectElems.map(({ id, name }) => {
                    return (
                      <option value={id} key={`${id}-${name}`}>
                        {name}
                      </option>
                    )
                  })}
                </select>
              </div>
            )
          }

          const renderTextArea = () => {
            return (
              <React.Fragment>
                <textarea
                  {...input}
                  id={name}
                  type={type}
                  className={`${inputClass} materialize-textarea`}
                />
              </React.Fragment>
            )
          }

          return (
            <div className="field">
              <div className="control ">
                {isTextArea
                  ? renderTextArea()
                  : selectElems
                    ? renderSelect()
                    : renderInput()}
              </div>
            </div>
          )
        }}
      </Field>
    )
  }
}
