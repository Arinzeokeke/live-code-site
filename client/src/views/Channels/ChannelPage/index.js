import React from 'react'
import AceEditor from 'react-ace'
import debounce from 'lodash.debounce'
import io from 'socket.io-client'
import 'brace/mode/jsx'
import ChannelParticipants from './ChannelParticipants'
import { Channels } from '../../../agent'
import { languages } from '../../../config'
import 'brace/ext/language_tools'
import 'brace/ext/searchbox'

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal'
]

languages.forEach(lang => {
  require(`brace/mode/${lang}`)
  require(`brace/snippets/${lang}`)
})

themes.forEach(theme => {
  require(`brace/theme/${theme}`)
})

class ChannelPage extends React.Component {
  state = {
    channel: null,
    loading: true,
    error: null,
    isOwner: false,
    isWriter: false,
    modeChanging: false,
    value: '',
    readOnly: false,
    theme: 'tomorrow',
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    fontSize: 14,
    showGutter: true,
    showPrintMargin: true,
    highlightActiveLine: true,
    enableSnippets: false,
    showLineNumbers: true,
    socketEndpoint: 'http://localhost:8001',
    socket: null
  }

  componentDidMount() {
    this.fetchChannel()
  }

  componentWillUnmount() {
    this.state.socket.emit('leave:channel', {
      channelId: this.state.channel.id
    })
  }

  socketSetup(channel) {
    // SOCKET IO SHIT YO

    const socket = io(this.state.socketEndpoint, {
      query: {
        username: this.props.user.username
      }
    })

    const updateChannel = ({ data: { channel } }) => {
      console.log('channel updated', channel)
      this.setState(s => ({ channel }), () => this.resolvePermissions())
    }
    const updateParticipants = ({ data: { participants } }) => {
      console.log('participants updated', participants)
      this.setState(s => ({
        channel: { ...s.channel, participants }
      }))
    }

    const updatePost = ({ data: { post } }) => {
      console.log('post updated', post)
      this.setState(s => ({
        channel: { ...s.channel, post },
        value: post.content
      }))
    }

    socket.on('reconnect_attempt', () => {
      socket.io.opts.query = { username: this.props.user.username }
    })
    socket.on('connect', function() {
      // Join Channel
      socket.emit('join:channel', { channelId: channel.id })
    })

    // New Participant Joined
    socket.on('joined:channel', updateParticipants.bind(this))

    // Participant Leaves
    socket.on('left:channel', updateParticipants.bind(this))

    // New Writer/s added
    socket.on('writer:add', updateChannel.bind(this))

    // Channel Edited
    socket.on('channel:edit', updateChannel.bind(this))

    // Writers removed
    socket.on('writer:remove', updateChannel.bind(this))

    //Post Edited
    socket.on('edit:post', updatePost.bind(this))

    this.setState({ socket })
  }

  async fetchChannel() {
    this.setState({ loading: true })
    const { id } = this.props.match.params
    try {
      const { channel } = await Channels.show(id)
      this.setState(
        {
          channel,
          loading: false,
          mode: channel.post.extension,
          value: channel.post.content
        },
        () => this.resolvePermissions()
      )
      this.socketSetup(channel)
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  resolvePermissions() {
    const { channel } = this.state
    console.log(channel, this.props)
    const isOwner = this.props.user.username === channel.owner.username
    const isWriter = channel.writers.some(
      wr => wr.username === this.props.user.username
    )
    this.setState({ isOwner, isWriter })
  }

  async giveWriteAccess(username) {
    try {
      const { channel } = await Channels.giveWriteAccess(
        this.state.channel.id,
        [username]
      )
      this.setState(s => ({ channel }), () => this.resolvePermissions())
    } catch {}
  }

  async revokeWriteAccess(username) {
    try {
      const { channel } = await Channels.revokeWriteAccess(
        this.state.channel.id,
        [username]
      )
      this.setState(s => ({ channel }), () => this.resolvePermissions())
    } catch {}
  }

  onLoad() {
    console.log("i've loaded")
  }
  onChange(newValue) {
    console.log('change', newValue)
    this.setState({
      value: newValue
    })
    this.debouncedSendChanges()
  }

  debouncedSendChanges = debounce(this.sendChanges, 500)

  async sendChanges() {
    const { value } = this.state
    console.log('jj')
    try {
      const { post } = await Channels.editPost(this.state.channel.id, {
        content: value
      })
      this.setState(s => ({
        channel: { ...s.channel, post },
        value: post.content
      }))
    } catch (err) {
      console.log(err)
    }
  }

  onSelectionChange(newValue, event) {
    console.log('select-change', newValue)
    console.log('select-change-event', event)
  }

  onCursorChange(newValue, event) {
    console.log('cursor-change', newValue)
    console.log('cursor-change-event', event)
  }

  onValidate(annotations) {
    console.log('onValidate', annotations)
  }

  setTheme(e) {
    this.setState({
      theme: e.target.value
    })
  }
  async setMode(e) {
    const oldMode = this.state.channel.post.extension
    const newMode = e.target.value
    console.log(newMode)
    this.setState(s => ({
      modeChanging: true,
      channel: {
        ...s.channel,
        post: { ...s.channel.post, extension: newMode }
      }
    }))
    try {
      const { post } = await Channels.editPost(this.state.channel.id, {
        extension: newMode
      })
      this.setState(s => ({
        modeChanging: false,
        channel: { ...s.channel, post }
      }))
    } catch (err) {
      this.setState(s => ({
        modeChanging: false,
        channel: {
          ...s.channel,
          post: { ...s.channel.post, extension: oldMode }
        }
      }))
    }
  }
  setBoolean(name, value) {
    this.setState({
      [name]: value
    })
  }
  setFontSize(e) {
    this.setState({
      fontSize: parseInt(e.target.value, 10)
    })
  }

  renderHeader() {
    const { channel } = this.state
    return (
      <div className="columns">
        <div className="column is-four-fifths">
          <p style={{ fontSize: '2rem' }}>{channel.title}</p>
        </div>
        <div className="column">
          <div className={'select is-rounded '}>
            <select
              name="Theme"
              onChange={this.setTheme.bind(this)}
              value={this.state.theme}
            >
              {themes.map(lang => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
        {this.state.isOwner || this.state.isWriter ? (
          <div className="column">
            <div
              className={`select is-rounded ${
                this.state.modeChanging ? 'is-loading' : ''
              }`}
            >
              <select
                name="mode"
                onChange={this.setMode.bind(this)}
                value={this.state.channel.post.extension}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  renderChannel() {
    console.log(this.state)
    return (
      <div className="examples column">
        <h2>Editor</h2>
        <AceEditor
          mode={this.state.channel.post.extension}
          theme={this.state.theme}
          name={this.state.channel.title}
          onLoad={this.onLoad.bind(this)}
          onChange={this.onChange.bind(this)}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.value}
          width="100%"
          readOnly={!(this.state.isOwner || this.state.isWriter)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
      </div>
    )
  }

  render() {
    const { channel, error, loading } = this.state

    if (loading) {
      return <p>Loading...</p>
    }

    if (error) {
      return <p>Error loading Channel</p>
    }

    return (
      <React.Fragment>
        {this.renderHeader()}
        {this.renderChannel()}
        <ChannelParticipants
          channel={channel}
          isOwner={this.state.isOwner}
          giveWriteAccess={this.giveWriteAccess.bind(this)}
          revokeWriteAccess={this.revokeWriteAccess.bind(this)}
          user={this.props.user}
        />
      </React.Fragment>
    )
  }
}

export default ChannelPage
