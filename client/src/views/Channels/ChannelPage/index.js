import React from 'react'
import AceEditor from 'react-ace'
import debounce from 'lodash.debounce'
import 'brace/mode/jsx'
import { Channels } from '../../../agent'
import { languages } from '../../../config'
/*eslint-disable no-alert, no-console */
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
    modeChanging: false,
    value: '',
    readOnly: false,
    theme: 'tomorrow',
    mode: 'javascript',
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    fontSize: 14,
    showGutter: true,
    showPrintMargin: true,
    highlightActiveLine: true,
    enableSnippets: false,
    showLineNumbers: true
  }

  componentDidMount() {
    this.fetchChannel()
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

  debouncedSendChanges = debounce(this.sendChanges, 1000)

  async sendChanges() {
    const { value } = this.state
    console.log('jj')
    try {
      const { post } = await Channels.editPost(this.state.channel.id, {
        content: value
      })
      this.setState({ post, value: post.content })
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
    this.setState({
      modeChanging: true,
      mode: e.target.value
    })
    try {
      const { post } = await Channels.editPost(this.state.channel.id, {
        extension: e.target.value
      })
      this.setState({
        modeChanging: false,
        post
      })
    } catch (err) {
      this.setState({
        modeChanging: false,
        mode: oldMode
      })
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
        <div className="column">
          <div
            className={`select is-rounded ${
              this.state.modeChanging ? 'is-loading' : ''
            }`}
          >
            <select
              name="mode"
              onChange={this.setMode.bind(this)}
              value={this.state.mode}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )
  }

  renderChannel() {
    console.log(this.state)
    return (
      <div className="examples column">
        <h2>Editor</h2>
        <AceEditor
          mode={this.state.mode}
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
          readOnly={this.state.readOnly}
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

  async fetchChannel() {
    this.setState({ loading: true })
    const { id } = this.props.match.params
    try {
      const { channel } = await Channels.show(id)
      console.log(channel)
      this.setState({
        channel,
        post: channel.post,
        loading: false,
        mode: channel.post.extension,
        value: channel.post.content
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
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
      </React.Fragment>
    )
  }
}

export default ChannelPage
