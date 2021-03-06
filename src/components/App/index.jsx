import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Login from '../Login';
import Navbar from '../Navbar';
import Signup from '../Signup';
import Footer from '../Footer';
import Welcome from '../Welcome';
import CreateArticle from '../CreateArticle';
import SingleArticle from '../SingleArticle';
import { Auth } from '../Auth';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      authUser: null,
      articles: []
    };
  }

  componentWillMount() {
    const user = localStorage.getItem('user');

    if (user) {
      this.setState({
        authUser: JSON.parse(user),
      });
    }
  }

  setArticles = (articles) => {
    this.setState({
      articles
    })
  }

  setAuthUser = (authUser) => {
    this.setState({
      authUser,
    }, () => {
      localStorage.setItem('user', JSON.stringify(authUser));
      this.props.history.push('/');
    });
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        {
          location.pathname !== '/login' && location.pathname !== '/signup' &&
          <Navbar authUser={this.state.authUser} />
        }
        <Route
          exact
          path="/"
          render={
            props => (
              <Welcome
                {...props}
                getArticles={this.props.articlesService.getArticles}
                setArticles={this.setArticles}
              />
            )
          }
        />
        <Route
          path="/login"
          render={
            props => (<Login
              {...props}
              setAuthUser={this.setAuthUser}
              loginUser={this.props.authService.loginUser}
            />)
          }
        />
        <Route
          path="/signup"
          render={
            props => (<Signup
              {...props}
              registerUser={this.props.authService.registerUser}
              setAuthUser={this.setAuthUser}
            />)
            }
        />
        <Route 
          path="/article/:slug" 
          render={(props) => 
            <SingleArticle 
              {...props} 
              getArticle={this.props.articlesService.getArticle} 
              articles={this.state.articles}
            />
          } 
        />

        <Auth 
        
        path='/articles/create'
        component={CreateArticle}
        props={{
          getArticleCategories: this.props.articlesService.getArticleCategories,
          createArticle: this.props.articlesService.createArticle,
          token: this.state.authUser ? this.state.authUser : null
        }}
        isAuthenticated={this.state.authUser !== null}
        
        />
        {
          location.pathname !== '/login' && location.pathname !== '/signup' &&
          <Footer />
        }
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  authService: PropTypes.objectOf(PropTypes.func).isRequired,
  articlesService: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default App;
