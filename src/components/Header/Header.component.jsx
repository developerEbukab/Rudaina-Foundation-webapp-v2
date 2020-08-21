import React from 'react';
import { Link , NavLink} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';  
import "./Header.styles.scss";

import {connect} from "react-redux"

const Header = ({ currentUser }) => {
  console.log("header user" , currentUser);
  return (
    <div className="header-container">
      <div className="header layout-padded">
        <Link to="/" className="logo-container">
          <Logo className="logo"/>
        </Link>
        <div className="links">
          <NavLink to="/about" className="link" activeClassName="active">about</NavLink>
          <NavLink to="/resources" className="link" activeClassName="active">resources</NavLink>
          <NavLink to="/program" className="link" activeClassName="active">program</NavLink>
          <NavLink to="/volunteer" className="link" activeClassName="active">volunteer</NavLink>
          {currentUser ?
            <NavLink to="/dashboard" className="linkDropdown" activeClassName="linkDropdownActive">GB</NavLink> :
            <NavLink to="/sign-in" className="link sign-in" activeClassName="active">sign in</NavLink>
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({user : currentUser}) => ({
  currentUser: currentUser.currentUser,
})

export default connect(mapStateToProps)(Header);
