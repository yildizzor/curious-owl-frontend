import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import EventSidebar from "../components/EventSidebar";

function Books(props) {
  const [books, setBooks] = useState([]);

  const getAllBooks = () => {
    axios
      .get(`${API_URL}/api/books`)
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => getAllBooks(), []);

  return (
    <EventSidebar pageName="Books">
      <div className="events">
        {books.map((book) => {
          return (
            <div className="event" key={book._id}>
              <Link to={`/books/${book._id}`}>
                <h3>{books.booksName}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </EventSidebar>
  );
}

export default Books;
