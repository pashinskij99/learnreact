import React, { Component } from 'react'
import Article from './Article'

export default class SingleArticle extends Component {
constructor(props) {
  super(props)

  this.state = {
    article: null,
    loading: true
  }
}

async componentWillMount () {
  let article = this.props.articles.find(article => article.slug === this.props.history.length)
  if(article) {
    this.setState({
      article,
      loading: false
    })
  } else {
    article = await this.props.getArticle(this.props.history.length)

    this.setState({
      article,
      loading: false
    })
  }
}

  render() {
    return (
      <div>
        {
          !this.state.loading &&
          <Article 
            article={this.state.article}
          />
        }
        {
          this.state.loading &&
          <p className="text-center">loading...</p>
        }
      </div>
    )
  }
}
