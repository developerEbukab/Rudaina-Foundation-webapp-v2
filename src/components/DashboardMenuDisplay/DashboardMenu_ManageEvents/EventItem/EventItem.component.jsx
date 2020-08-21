import React from 'react';
import "./EventItem.styles.scss";

const EventItem = ({title, startDate, endDate, description, eventId, numberOfAttendees, category, deleteEvent, showJoinButton, showDeleteButton, styles, showCloseButton, closeModal, handleEventJoining}) => {
  return (
    <div style={styles} className="event">
      {showCloseButton && <div className="closeButton" onClick={closeModal}>
        <i className="far fa-times-circle"></i>
      </div>}
      <p className="title">{title}</p>
      <p className="subText">{`${startDate} - ${endDate}`}</p>
      <p className="description">{description}</p>
      <div className="eventFooter">
        <p className="subText">{`${numberOfAttendees} people are attending.`}</p>
        <div className="attendees">
          <div className="attendeesDetails">
            <div className="attendeesThumbnails">
              <div className="img"> <img src="./img/trimester1.jpeg" alt="" /></div>
              <div className="img img2"> <img src="./img/trimester2.jpeg" alt="" /></div>
              <div className="img img3"> <img src="./img/trimester3.jpeg" alt="" /></div>
            </div>
            <p className="showButton">SHOW</p>
          </div>
          <div className="eventActions">
            {showDeleteButton && <div className="action" onClick={deleteEvent}>
              <i class="fas fa-trash-alt"></i>
              <p>Delete</p>
            </div>}
            { showJoinButton && <div className="action" onClick={handleEventJoining}>
              <i class="fas fa-file-signature"></i>
              <p>Join</p>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
