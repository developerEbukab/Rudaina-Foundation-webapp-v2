import React from 'react';
import "./DashboardMenuDisplay.styles.scss"
import { connect } from 'react-redux';
import DashboardMenuForum from './DashboardMenuForum/DashboardMenuForum.component';
import ManageEvents from './DashboardMenu_ManageEvents/ManageEvents.component';
import EventCalendar from './DashboardMenu_EventCalendar/EventCalendar.component';

const DashboardMenuDisplay = ({option}) => {
  return (
    <div className="dashboardMenuDisplay">
      {option === "Forum" && <DashboardMenuForum />}
      {option === "Manage Events" && <ManageEvents />}
      {option === "Events" && <EventCalendar/>}
    </div>
  );
}

const mapStateToProps = ({dashboard : option}) => ({
  option: option.option,
})

export default connect(
  mapStateToProps,
  null
)(DashboardMenuDisplay);

