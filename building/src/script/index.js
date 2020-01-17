import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {fn2} from './util'
import '../style/index.less'

const a = require('./a')

class Demo extends Component {
  render () {
    fn2()
    console.log(a)
    return (
      <div className="box">{this.props.text}</div>
    )
  }
}

ReactDOM.render(
  <Demo text="This is a text"/>,
  document.querySelector('.container')
)