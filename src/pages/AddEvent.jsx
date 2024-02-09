import { useState } from "react";
import { typeOfEvent } from "../utils/constants";
import EventSidebar from "../components/EventSidebar";
import AddConcert from "../components/addEvent/AddConcert";
import AddTheater from "../components/addEvent/AddTheater";
import AddMuseum from "../components/addEvent/AddMuseum";
import AddBook from "../components/addEvent/AddBook";
import AddRestaurant from "../components/addEvent/AddRestaurant";

function AddEvent() {
  const [selectedType, setSelectedType] = useState("");

  return (
    <EventSidebar pageName="Add Event">
      <div className="container-fluid my-3">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 mb-3">
          <select
            style={{ backgroundColor: "#0d6efd", color: "white" }}
            className="form-select"
            aria-label="Default select example"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value={"None"}>{"Select an Event to Add"}</option>
            {typeOfEvent.map((element) => {
              return (
                <option key={element.type} value={element.type}>
                  {element.type}
                </option>
              );
            })}
          </select>
        </div>

        {selectedType === typeOfEvent[0].type && (
          // selectedType = One type of sidebar. This is a value.  selecetedItem= you can choose the type of event. This is a function
          <AddConcert selectedType={selectedType} />
        )}
        {selectedType === typeOfEvent[1].type && (
          // selectedType = One type of sidebar. This is a value.  selecetedItem= you can choose the type of event. This is a function
          <AddTheater selectedType={selectedType} />
        )}
        {selectedType === typeOfEvent[2].type && (
          // selectedType = One type of sidebar. This is a value.  selecetedItem= you can choose the type of event. This is a function
          <AddMuseum selectedType={selectedType} />
        )}
        {selectedType === typeOfEvent[3].type && (
          // selectedType = One type of sidebar. This is a value.  selecetedItem= you can choose the type of event. This is a function
          <AddBook selectedType={selectedType} />
        )}
        {selectedType === typeOfEvent[4].type && (
          // selectedType = One type of sidebar. This is a value.  selecetedItem= you can choose the type of event. This is a function
          <AddRestaurant selectedType={selectedType} />
        )}
      </div>
    </EventSidebar>
  );
}

export default AddEvent;
