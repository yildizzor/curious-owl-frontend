import React from "react";
import { useState } from "react";
import axios from "axios";
import { API_URL, typeOfEvent } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import EventSidebar from "../components/EventSidebar";
import AddConcert from "../components/AddConcert";

function AddEvent() {
  const [selectedType, setSelectedType] = useState("");

  return (
    <EventSidebar pageName="Add Event">
      <div className="container-fluid">
        <select
          className="form-select"
          aria-label="Default select example"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value={"None"}>{"Select Type of Event"}</option>
          {typeOfEvent.map((element) => {
            return (
              <option key={element.type} value={element.type}>
                {element.type}
              </option>
            );
          })}
        </select>

        {selectedType === typeOfEvent[0].type && (
          // selectedType = One type of sidebar. This is a value.  selecetedItem= you can choose the type of event. This is a function
          <AddConcert selectedType={selectedType} />
        )}
      </div>
    </EventSidebar>
  );
}

export default AddEvent;
