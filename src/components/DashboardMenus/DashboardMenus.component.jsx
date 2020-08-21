import React from 'react';
import "./DashboardMenus.styles.scss";
import DashboardMenuitem from '../DashboardMenuitem/DashboardMenuitem.component';
import { app } from '../../firebase';
import { withRouter } from 'react-router-dom';

const DashboardMenus = ({history}) => {
  const handleLogout = () => {
    app.auth().signOut().then(()=>{
      console.log("Sign Out successful");
      history.push("/");
    })
  }

  return (
    <div className="dashboardMenusContainer">
      <div>
        <div className="imageContainer">
          <img src="./img/pregnant-woman.jpeg"/>
        </div>
        <DashboardMenuitem name="Profile" icon="far fa-address-card" />
        <DashboardMenuitem name="My Task" icon="fas fa-tasks" />
        <DashboardMenuitem name="Forum" icon="far fa-comment-alt" />
        <DashboardMenuitem name="Events" icon="far fa-calendar-alt" />
        <DashboardMenuitem name="Settings" icon="fas fa-user-cog" />
        <DashboardMenuitem name="Manage Events" icon="far fa-calendar-plus"/>
      </div>
      <DashboardMenuitem name="Sign Out" icon="fas fa-door-open" onClick={handleLogout} style={{ borderBottom: "0px solid transparent" }} signOut={true}/>
    </div>
  );
}



export default withRouter(DashboardMenus);
