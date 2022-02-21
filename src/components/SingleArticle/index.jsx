import React, { Component } from 'react'
import Article from './Article'

export default class SingleArticle extends Component {
constructor(props) {
  super(props)

  this.state = {
    article: null
  }
}

async componentWillMount () {
  console.log(this.props);
  const article = await this.props.getArticle('slug-for-article')
}

  render() {
    return (
      <Article />
    )
  }
}
