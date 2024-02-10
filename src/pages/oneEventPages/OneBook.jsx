import { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  dateToString,
  defaultEventPhoto,
} from "../../utils/constants";
import { useParams } from "react-router-dom";
import EventSidebar from "../../components/EventSidebar";
import EventReviews from "../../components/review/EventReviews";
import { Spinner } from "react-bootstrap";

function OneBook(props) {
  const { bookId } = useParams();
  const [book, setBook] = useState(undefined);
  const [isAxiosLoading, setIsAxiosLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [errorsOfBook, setErrorsOfBook] = useState(undefined);

  const getOneBook = () => {
    setIsAxiosLoading(true);
    axios
      .get(`${API_URL}/api/books/${bookId}`)
      .then((response) => {
        const bookData = response.data;

        setBook(bookData);
        setReviews(bookData.eventReviews);
        setSuccessMessage("");
      })
      .catch((err) => {
        if (err.response) setErrorsOfBook(err.response.data);
        else setErrorsOfBook("An error occurs!");
      })
      .finally(() => setIsAxiosLoading(false));
  };

  useEffect(() => getOneBook(), [successMessage]);

  return (
    <EventSidebar pageName="Books">
      <div className="container-fluid my-4">
        {isAxiosLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!isAxiosLoading && !book && (
          <div className="error-message">Book cannot be retrieved via API</div>
        )}
        {book && (
          <div className="row g-2">
            <div className="col-lg-7 col-sm-9 col-sm-10 col-xs-12">
              <img
                className="col-11 rounded"
                src={book.imageUrl || defaultEventPhoto}
                alt="book photo"
              ></img>
            </div>

            <div className="col-lg-5 col-md-9 col-sm-10 col-xs-12">
              <div className="col-12">
                <label className="form-label">
                  <b>Name:</b> {book.name}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Writer(s):</b> {book.writer}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Genre:</b> {book.genre}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  <b>Published Date:</b>{" "}
                  {dateToString(book.publishedDate, true)}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  <b>Comment by {book.createdBy.name}:</b> {book.review}
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      <EventReviews
        reviews={reviews}
        eventAuthorId={book && book.createdBy && book.createdBy._id}
        eventId={bookId}
        eventType={"books"}
        setSuccessMessage={setSuccessMessage}
      />
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </EventSidebar>
  );
}

export default OneBook;
