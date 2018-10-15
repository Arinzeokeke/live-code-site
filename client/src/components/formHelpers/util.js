export const composeValidators = validators => value => {
  return validators.reduce(
    (error, validator) => error || validator(value),
    undefined
  )
}

export const required = value => (value ? undefined : 'Required')
export const requiredArray = value => {
  return value && value.length > 0
    ? undefined
    : 'At least one should be selected'
}

export const mustBeNumber = value =>
  isNaN(value) ? 'Must be a number' : undefined
export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
export const maxValue = max => value =>
  isNaN(value) || value <= max ? undefined : `Should be less than ${max}`
export const confirmPassword = values =>
  values.password !== values.confirmPassword
    ? { confirmPassword: 'Must be same with password' }
    : {}
