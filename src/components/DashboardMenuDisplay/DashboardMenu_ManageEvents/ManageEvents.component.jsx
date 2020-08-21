import React, {useState, useEffect} from 'react';
import "./ManageEvents.styles.scss"
import FormInput from '../../FormInput/FormInput.components';
import TextAreaInput from '../../TextAreaInput/TextAreaInput.component';
import AuthButton from '../../AuthButton/AuthButton.component';
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import SelectInput from '../../SelectInput/SelectInput.component';
import firebase from "firebase";
import EventItem from './EventItem/EventItem.component';


var uniqid = require('uniqid');

const ManageEvents = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    category: 'benefactor',
  });

  const [events, setEvents] = useState({ benefactorEvents: [], volunteerEvents: [] });
  const [benefactorEvents, setBenefactorEvents] = useState([]);
  const [volunteerEvents, setVolunteerEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState("benefactor")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingEvents, setLoadingEvents] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    firebase.database().ref('events/benefactor').on('value' , (data)=>{
      if(data.toJSON()){
        console.log("benefactor events", Object.values(data.toJSON()))
        setBenefactorEvents(Object.values(data.toJSON()))
      }
      else{
        setBenefactorEvents([])
      }
    })

    firebase.database().ref('events/volunteer').on('value' , (data)=>{
      if(data.toJSON()){
        console.log("volunteer events", Object.values(data.toJSON()))
        setVolunteerEvents(Object.values(data.toJSON()))
      }
      else{
        setVolunteerEvents([])
      }
    })
  }

  const handleChange = event => {
    const { value, name } = event.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const addEvent = event => {
    event.preventDefault();
    setLoadingEvents(true);
    //const { title, description, startDate, endDate, category, } = eventDetails;
    const eventId = uniqid();

    firebase.database().ref(`events/${eventDetails.category}/${eventId}`).set({
      ...eventDetails,
      eventId : eventId,
      numberOfAttendees : 0,
    }).then(()=>{
      setLoadingEvents(false);
      fetchEvents();
      setEventDetails({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        category: '',
      });
      // firebase.database().ref('events/benefactors').on('value' , (data)=>{
      //   if(data.toJSON()){
      //       console.log("well looks like it worked")
      //       this.setState({
      //           benefactorsEvents : Object.values(data.toJSON())
      //       })
      //   }
      //   else{
      //       benefactorsEvents : []
      //   }
      // })
    }).catch((error)=>{
      console.log(error)
      setLoadingEvents(false);
    })
  };

  const deleteEvent = (category, eventId) => {
    firebase.database().ref(`events/${category}`).child(eventId + '').remove();
  }

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
  color : #FF0243;
  `;

  return (
    <div className="manageEvents">
      <div className="addEvent">
        <p className="title">Create a new event</p>
        <form className="addEventForm" onSubmit={addEvent}>
          <FormInput
            type="text" 
            name="title" 
            value={eventDetails.title}
            onChange={handleChange}
            label="Title"
            required={true}
          />
          <TextAreaInput 
            type = "text" 
            name="description" 
            value={eventDetails.description} 
            onChange={handleChange} 
            required = {true}
            label="About this event"
          />
          <FormInput
            type="date" 
            name="startDate" 
            value={eventDetails.startDate}
            onChange={handleChange}
            label="Start date"
            required={true}
          />
          <FormInput
            type="date" 
            name="endDate" 
            value={eventDetails.endDate}
            onChange={handleChange}
            label="End date"
            required={true}
          />
          <div style={{marginTop: "3rem"}}>
            <SelectInput
              name="category"
              value={eventDetails.category}
              onChange={handleChange}
              required={true}
            >
              <option value="benefactor">Benefactor</option>
              <option value="volunteer">Volunteer</option>
            </SelectInput>
          </div>
          <div className="buttonContainer">
            <AuthButton isLoading={isLoading} buttonText="Add" />
          </div>
        </form>
      </div>
      <div className="viewEvents">
        <div className="eventsOptions">
          <p 
            className={`option ${(selectedEvent === "benefactor") && "activeOption"}`} 
            onClick={() => setSelectedEvent("benefactor")}
          >Benefactor Events</p>
          <p 
            className={`option ${(selectedEvent === "volunteer") && "activeOption"}`} 
            onClick={() => setSelectedEvent("volunteer")}
          >Volunteer Events</p>
        </div>
        <div className="eventsContainer">
          {loadingEvents ?
            <div className="loadingEvents">
              <HashLoader
                css={override}
                size={30}
                color={"#FF0243"}
                loading={loadingEvents}
              />
            </div> :
            <div className="events">
              {selectedEvent === "benefactor" &&
                benefactorEvents.map(
                  ({ title, startDate, endDate, description, eventId, numberOfAttendees, category }) =>
                    <EventItem 
                      title={title} 
                      startDate={startDate} 
                      endDate={endDate} 
                      description={description} 
                      eventId={eventId} 
                      numberOfAttendees={numberOfAttendees} 
                      category={category} 
                      deleteEvent={()=>deleteEvent(category, eventId)}
                      showJoinButton = {false}
                      showDeleteButton = {true}
                    />
                )
              }
              {selectedEvent === "volunteer" &&
                volunteerEvents.map(
                  ({ title, startDate, endDate, description, eventId, numberOfAttendees, category }) =>
                    <EventItem 
                      title={title} 
                      startDate={startDate} 
                      endDate={endDate} 
                      description={description} 
                      eventId={eventId} 
                      numberOfAttendees={numberOfAttendees} 
                      category={category} 
                      deleteEvent={()=>deleteEvent(category, eventId)}
                      showJoinButton = {false}
                      showDeleteButton = {true}
                    />
                )
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ManageEvents;
