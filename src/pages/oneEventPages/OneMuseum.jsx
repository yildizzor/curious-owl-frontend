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

function OneMuseum(props) {
  const { museumId } = useParams();
  const [museum, setMuseum] = useState(undefined);
  const [isAxiosLoading, setIsAxiosLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [errorsOfMuseum, setErrorsOfMuseum] = useState(undefined);

  const getOneMuseum = () => {
    setIsAxiosLoading(true);
    axios
      .get(`${API_URL}/api/museums/${museumId}`)
      .then((response) => {
        const museumData = response.data;

        setMuseum(museumData);
        setReviews(museumData.eventReviews);
        setSuccessMessage("");
      })
      .catch((err) => {
        if (err.response) setErrorsOfMuseum(err.response.data);
        else setErrorsOfMuseum("An error occurs!");
      })
      .finally(() => setIsAxiosLoading(false));
  };

  useEffect(() => getOneMuseum(), [successMessage]);

  return (
    <EventSidebar pageName="Museums">
      <div className="container-fluid my-4">
        {isAxiosLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!isAxiosLoading && !museum && (
          <div className="error-message">
            Museum cannot be retrieved via API
          </div>
        )}
        {museum && (
          <div className="row g-2">
            <div className="col-lg-7 col-sm-9 col-sm-10 col-xs-12">
              <img
                className="col-11 rounded"
                src={museum.imageUrl || defaultEventPhoto}
                alt="museum photo"
              ></img>
            </div>

            <div className="col-lg-5 col-md-9 col-sm-10 col-xs-12">
              <div className="col-12">
                <label className="form-label">
                  <b>Museum Name:</b> {museum.name}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Museum Type:</b> {museum.typeOfSubject}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Museum Place:</b> {museum.museumPlace}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Museum Build By:</b> {museum.builtBy}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  <b>Established Date:</b>{" "}
                  {dateToString(museum.builtDate, true)}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  <b>Comment by {museum.createdBy.name}:</b> {museum.review}
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      <EventReviews
        reviews={reviews}
        eventAuthorId={museum && museum.createdBy && museum.createdBy._id}
        eventId={museumId}
        eventType={"museums"}
        setSuccessMessage={setSuccessMessage}
      />
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </EventSidebar>
  );
}

export default OneMuseum;
