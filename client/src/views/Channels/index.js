import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Users } from '../../agent'

const ChannelCard = ({ channel }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{`${channel.title}`}</p>
      </header>
      <div className="card-content">
        <div className="content">
          Created by @{channel.owner.username}
          <br />
          <em>{moment(channel.createdAt).fromNow()}</em>
        </div>
      </div>
      <footer className="card-footer">
        <Link to={`/channels/${channel.id}`} className="card-footer-item">
          View Channel
        </Link>
      </footer>
    </div>
  )
}
class Channels extends React.Component {
  state = {
    channels: [],
    loading: true,
    error: null
  }

  componentDidMount() {
    this.loadChannels()
  }

  async loadChannels() {
    this.setState({ loading: false })
    const { username } = this.props.match.params
    try {
      const { channels } = await Users.channels(username)
      console.log(channels)
      this.setState({ channels, loading: false, username })
    } catch (error) {
      this.setState({ loading: false, error, username })
    }
  }
  render() {
    const { channels, error, loading } = this.state

    if (loading) {
      return <p>Loading...</p>
    }

    if (error) {
      return <p>Error loading channels</p>
    }

    if (channels.length < 1) {
      return <p>No Channels Created Yet</p>
    }

    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>
          {this.state.username}
          's Channels
        </h1>
        <hr />
        <div className="columns is-multiline is-centered">
          {channels.map(c => (
            <div className="column is-one-quarter" key={c.id}>
              <ChannelCard channel={c} />
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default Channels
