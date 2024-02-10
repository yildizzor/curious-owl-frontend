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

function OneTheater(props) {
  const { theaterId } = useParams();
  const [theater, setTheater] = useState(undefined);
  const [isAxiosLoading, setIsAxiosLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [errorsOfTheater, setErrorsOfTheater] = useState(undefined);

  const getOneTheater = () => {
    setIsAxiosLoading(true);
    axios
      .get(`${API_URL}/api/theaters/${theaterId}`)
      .then((response) => {
        const theaterData = response.data;

        setTheater(theaterData);
        setReviews(theaterData.eventReviews);
        setSuccessMessage("");
      })
      .catch((err) => {
        if (err.response) setErrorsOfTheater(err.response.data);
        else setErrorsOfTheater("An error occurs!");
      })
      .finally(() => setIsAxiosLoading(false));
  };

  useEffect(() => getOneTheater(), [successMessage]);

  return (
    <EventSidebar pageName="Theaters">
      <div className="container-fluid my-4">
        {isAxiosLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!isAxiosLoading && !theater && (
          <div className="error-message">
            Theater cannot be retrieved via API
          </div>
        )}
        {theater && (
          <div className="row g-2">
            <div className="col-lg-7 col-sm-9 col-sm-10 col-xs-12">
              <img
                className="col-11 rounded"
                src={theater.imageUrl || defaultEventPhoto}
                alt="theater photo"
              ></img>
            </div>

            <div className="col-lg-5 col-md-9 col-sm-10 col-xs-12">
              <div className="col-12">
                <label className="form-label">
                  <b>Theater Name:</b> {theater.name}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Cast:</b> {theater.actorsName}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Director(s) Name:</b> {theater.directorName}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Writer(s) Name:</b> {theater.writerName}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Theater Type:</b> {theater.typeOfTheater}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Theater Place:</b> {theater.theaterPlace}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Date:</b> {dateToString(theater.date)}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Age Limit:</b> {theater.ageLimit}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Comment by {theater.createdBy.name}:</b> {theater.review}
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      <EventReviews
        reviews={reviews}
        eventAuthorId={theater && theater.createdBy && theater.createdBy._id}
        eventId={theaterId}
        eventType={"theaters"}
        setSuccessMessage={setSuccessMessage}
      />
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </EventSidebar>
  );
}

export default OneTheater;
