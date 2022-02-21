import React from 'react';
import PropTypes from 'prop-types';

import Articles from './Articles';

class Welcome extends React.Component {
  constructor() {
    super();

    this.state = {
      articles: {},
    };
  }

  async componentWillMount() {
    const articles = await this.props.getArticles();

    this.setState({ articles });
  }

  handlePagination = async (url) => {
    const articles = await this.props.getArticles(url);

    this.setState({ articles });
  }

  render() {
    // const list = this.state.articles
    //   if(list[0]) { list.map((item, i) => {
    //     console.log(item.albumId);
    //   })
    // }
    return (
      <Articles
        articles={this.state.articles}
        nextUrl={this.state.articles.albumId}
        prevUrl={this.state.articles.albumId}
        handlePagination={this.handlePagination}
      />
    );
  }
}

Welcome.propTypes = {
  getArticles: PropTypes.func.isRequired,
};

export default Welcome;
