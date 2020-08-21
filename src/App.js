import React, {Component} from 'react';
import './sass/main.scss';
import './App.scss';

import { app } from './firebase';
import firebase from "firebase";

import { connect } from 'react-redux';

import Footer from './components/Footer/Footer.component';  
import Header from './components/Header/Header.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.component';
import AboutPage from './pages/AboutPage/AboutPage.component';
import ResourcesPage from './pages/ResourcesPage/ResourcesPage.component';
import ProgramPage from './pages/ProgramPage/ProgramPage.component';
import VolunteerPage from './pages/VolunteerPage/VolunteerPage.component';
import SignIn from './pages/SignIn/SignIn.component';
import SignUp from './pages/SignUp/SignUp.component';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.component';
import { setCurrentUser } from './redux/user/user.actions';
import UserPage from './pages/UserPage/UserPage.component';

class App extends Component{
  state = {
    user : {},
  }
  //unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser,  } = this.props;

    // this.unsubscribeFromAuth = app.auth().onAuthStateChanged((user) => {
    app.auth().onAuthStateChanged((user) => {
      console.log("user state changed", user);
      if(user){
        firebase.database().ref(`benefactors/${user.uid}`).on('value' , (data)=>{
          if(data.toJSON()){
            console.log("user info fetched", data.toJSON());
            setCurrentUser(data.toJSON());
          }else{
            firebase.database().ref(`volunteers/${user.uid}`).on('value' , (data)=>{
              if(data.toJSON()){
                console.log("user info fetched", data.toJSON());
                setCurrentUser(data.toJSON());
              }
            })
          }
        })
      }else{
        setCurrentUser(null);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log("Here is the user", this.state.user)
    const user = this.props.currentUser.currentUser;
    return (
      <div className="">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/sign-in'
            render={() => user ? <Redirect to='/' /> : <SignIn />}
          />
          <Route exact path='/sign-up'
            render={() => user ? <Redirect to='/' /> : <SignUp />}
          />
          <Route exact path='/forgot-password'
            render={() => user ? <Redirect to='/' /> : <ForgotPassword />}
          />
          <Route exact path='/dashboard'
            render={() => !user ? <Redirect to='/' /> : <UserPage />}
          />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/resources' component={ResourcesPage} />
          <Route exact path='/program' component={ProgramPage} />
          <Route exact path='/volunteer' component={VolunteerPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({user : currentUser}) => ({
  currentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
