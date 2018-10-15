import React from 'react'
import PropTypes from 'prop-types'

import { Field } from 'react-final-form'

class SelectorField extends React.Component {
  render() {
    const { name, label, type, options } = this.props

    const selectors = options.map(op => {
      return (
        <Field name={name} key={op} type={type}>
          {({ input, meta }) => {
            const isError = meta.error && meta.touched
            const valid = meta.touched && !meta.error
            const inputClass = isError ? 'invalid' : valid ? 'valid' : null

            return (
              <label className="checkbox">
                <input
                  type="checkbox"
                  {...input}
                  id={op}
                  name={name}
                  value={op}
                  type={type}
                />
                {op}
              </label>
            )
          }}
        </Field>
      )
    })

    return <React.Fragment>{selectors}</React.Fragment>
  }
}

SelectorField.propTypes = {
  name: PropTypes.string,
  prefixIcon: PropTypes.string,
  label: PropTypes.string,
  validators: PropTypes.arrayOf(PropTypes.func),
  type: PropTypes.string,
  options: PropTypes.array
}
export default SelectorField
