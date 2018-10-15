import { Container } from 'unstated'
import { Users } from '../agent'

export default class AppContainer extends Container {
  state = { user: null, loaded: false, error: null }

  appLoad = async () => {
    if (window.localStorage.getItem('csc_333_jwt') === null) {
      await this.setState(state => {
        return {
          user: null,
          loaded: true,
          error: null
        }
      })
    } else {
      try {
        const { user } = await Users.current()
        await this.setState(state => {
          return {
            user,
            loaded: true,
            error: null
          }
        })
        window.localStorage.setItem('csc_333_jwt', user.token)
      } catch (err) {
        await this.setState(state => ({
          error: err,
          loaded: true,
          user: null
        }))
        // Show Error Message
      }
      console.log('App Loading')
    }
  }

  login = async ({ username, password }, history) => {
    console.log('called login')
    try {
      const { user } = await Users.login({ username, password })

      await this.setState(state => {
        return {
          user,
          loaded: true,
          error: null
        }
      })
      window.localStorage.setItem('csc_333_jwt', user.token)
      history.push('/')
    } catch (err) {
      await this.setState(state => ({
        error: err,
        loaded: true,
        user: null
      }))
      // Show Error Message
      console.log('didnt log in', err)
    }
  }

  logout = async () => {
    window.localStorage.removeItem('csc_333_jwt')
    await this.setState(state => ({
      user: null,
      loaded: true,
      error: null
    }))
  }

  register = async (body, history) => {
    try {
      const { user } = await Users.create(body)
      await this.setState(state => {
        return {
          user,
          loaded: true,
          error: null
        }
      })
      window.localStorage.setItem('csc_333_jwt', user.token)
      history.push('/')
    } catch (err) {
      await this.setState(state => ({
        error: err,
        loaded: true,
        user: null
      }))
      // Show Error Message
    }
  }
}
