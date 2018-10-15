import React from 'react'
import { Link } from 'react-router-dom'
import { Users } from '../../agent'

const ChannelCard = props => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{`${props.title} (${
          props.online ? 'online' : 'offline'
        })`}</p>
      </header>
      <div className="card-content">
        <div className="content">
          Created by @{props.owner.username}
          <br />
          <time datetime="2016-1-1">{props.createdAt}</time>
        </div>
      </div>
      <footer className="card-footer">
        <Link to={`/channels/${props.id}`} className="card-footer-item">
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
      this.setState({ channels, loading: false })
    } catch (error) {
      this.setState({ loading: false, error })
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
      <div class="columns is-multiline is-centered">
        {channels.map(c => (
          <div className="column is-one-quarter" key={c.id}>
            <ChannelCard channel={c} />
          </div>
        ))}
      </div>
    )
  }
}

export default Channels
