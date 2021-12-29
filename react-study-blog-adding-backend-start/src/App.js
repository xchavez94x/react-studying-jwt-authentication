import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Layout from './containers/Layout/Layout';
import Nav from './components/Nav/Nav';
import Main from './components/contentComponents/Main/Main';
import Posts from './components/contentComponents/Posts/Posts';
import Contact from './components/contentComponents/Contact/Contact';
import About from './components/contentComponents/About/About';
import Sidedrawer from './components/Nav/SideDrawer/Sidedrawer';
import RegForm from './components/contentComponents/RegistrationForm/RegistrationForm';
import Footer from './components/Footer/Footer';
import Backdrop from './components/UIElemets/Backdrop/Backdrop';
import Post from './components/contentComponents/Posts/Post/Post';
import Login from './components/contentComponents/Login/Login';


class App extends Component {
  state={
    isBurgerMenuShown: false,
    navItems: [
      { key:1 , link: "/main", label: "Main" },
      { key:2 , link: "/posts", label: "Posts" },
      { key:3 , link: "/register", label: "Register" },
      { key:5, link: "/login", label: "Login" },
    ]
  }

  

  showMenuHandler = () => {
    const isShown = this.state.isBurgerMenuShown
    this.setState({
      isBurgerMenuShown: !isShown
    })
  }

  hideMenuHandler = () => {
    this.setState({ isBurgerMenuShown: false })
  }
  render() {
    return (
      
      <Router>
        <Layout>
          <Backdrop show={this.state.isBurgerMenuShown} hideBackdrop={this.hideMenuHandler} />
          <Nav
            key={this.state.navItems.key}
            navItems={this.state.navItems}
            clicked={this.showMenuHandler}
          />

          <Sidedrawer 
            shown={this.state.isBurgerMenuShown} 
            menuItems={this.state.navItems}
          />

          <Switch>
            <Route path="/posts" component={Posts} />
            <Route path="/posts/:postId" component={Post} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route path="/register" component={RegForm} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/login" component={Login} />
            <Redirect from="/" to="/main" />
          </Switch>
          <Footer />
        </Layout>
      </Router>
      
    );
  }
}

export default App;
