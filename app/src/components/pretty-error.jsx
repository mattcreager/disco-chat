import React from 'react'

class PrettyError extends React.Component {
  render() {
    return (
      <div>
        <h2>Error: application could not load</h2>
        <pre>
            <strong>{this.props.e.toString()}</strong>
            {!!this.props.e.stack && (<div><br />{this.props.e.stack}</div>)}
        </pre>
      </div>
    )
  }
}

export default PrettyError