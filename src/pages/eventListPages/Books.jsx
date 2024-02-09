import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import EventSidebar from "../../components/EventSidebar";
import EventList from "../../components/EventList";

function Books(props) {
  const [books, setBooks] = useState([]);
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(true);

  const getAllConcerts = () => {
    setIsAxiosInProgress(true);
    axios
      .get(`${API_URL}/api/books`)
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error))
      .finally(() => setIsAxiosInProgress(false));
  };

  useEffect(() => getAllConcerts(), []);

  return (
    <EventSidebar pageName="Books">
      <EventList
        events={books}
        eventType="books"
        isLoading={isAxiosInProgress}
      />
    </EventSidebar>
  );
}

export default Books;
