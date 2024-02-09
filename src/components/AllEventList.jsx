import { eventTypesList } from "../utils/constants";
import EventList from "./EventList";

function AllEventList({ events, isLoading }) {
  return eventTypesList.map((element) => {
    return (
      events[element] && (
        <EventList
          key={element}
          events={events[element]}
          eventType={element}
          isLoading={isLoading}
        />
      )
    );
  });
}

export default AllEventList;
