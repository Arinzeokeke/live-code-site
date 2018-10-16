import React from 'react'
import { Subscribe } from 'unstated'
import { Link } from 'react-router-dom'
import AppContainer from '../containers/AppContainer'

class Header extends React.Component {
  state = { active: false }

  toggleActive = () => this.setState(s => ({ active: !s.active }))

  render() {
    const isActiveClass = this.state.active ? 'is-active' : ''
    return (
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <p
            style={{
              fontFamily: ['Pacifico', 'cursive'],
              fontSize: '3rem',
              padding: '0.3rem'
            }}
          >
            Collaborate.
          </p>

          <a
            className={`navbar-burger burger ${isActiveClass}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={this.toggleActive}
            role={'button'}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${isActiveClass}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {this.props.user ? (
                  <React.Fragment>
                    <Link
                      to={`/${this.props.user.username}/channels`}
                      className="button is-primary"
                    >
                      <strong>Your Channels</strong>
                    </Link>
                    <Link to={`/channels/create`} className="button is-primary">
                      <strong>Create A Channel</strong>
                    </Link>
                    <button
                      className="button is-danger"
                      onClick={this.props.logout}
                    >
                      Log Out
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link to="/register" className="button is-primary">
                      <strong>Sign up</strong>
                    </Link>
                    <Link className="button is-light" to="/login">
                      Log in
                    </Link>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const HeaderConnected = props => {
  return (
    <Subscribe to={[AppContainer]}>
      {({ state: { user }, logout }) => {
        return <Header {...props} user={user} logout={logout} />
      }}
    </Subscribe>
  )
}

export default HeaderConnected
