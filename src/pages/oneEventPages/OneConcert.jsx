import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  API_URL,
  dateToString,
  defaultEventPhoto,
} from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import EventSidebar from "../../components/EventSidebar";
import EventReviews from "../../components/review/EventReviews";
import { Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import ShowWithTooltip from "../../components/common/ShowWithTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function OneConcert(props) {
  const { concertId } = useParams();
  const [concert, setConcert] = useState(undefined);
  const [isAxiosLoading, setIsAxiosLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [errorsOfConcert, setErrorsOfConcert] = useState(undefined);

  const navigate = useNavigate();
  const { user, isLoggedIn, getToken } = useContext(AuthContext);

  const deleteEvent = async () => {
    try {
      await axios.delete(`${API_URL}/api/concerts/${concertId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      console.log("Event is successfully deleted");
      navigate(`/events`);
    } catch (err) {
      if (err.response) setErrorsOfConcert(err.response.data);
      else setErrorsOfConcert("An error occurs while event deletion");
    }
  };

  const getOneConcert = () => {
    setIsAxiosLoading(true);
    axios
      .get(`${API_URL}/api/concerts/${concertId}`)
      .then((response) => {
        const concertData = response.data;

        setConcert(concertData);
        setReviews(concertData.eventReviews);
        setSuccessMessage("");
      })
      .catch((err) => {
        if (err.response) setErrorsOfConcert(err.response.data);
        else setErrorsOfConcert("An error occurs!");
      })
      .finally(() => setIsAxiosLoading(false));
  };

  useEffect(() => getOneConcert(), [successMessage]);

  return (
    <EventSidebar pageName="Concerts">
      <div className="container-fluid my-4">
        {isAxiosLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!isAxiosLoading && !concert && (
          <div className="error-message">
            Concert cannot be retrieved via API
          </div>
        )}
        {concert && (
          <div className="row g-2">
            <div className="col-lg-7 col-sm-9 col-sm-10 col-xs-12">
              <img
                className="col-11 rounded"
                src={concert.imageUrl || defaultEventPhoto}
                alt="concert photo"
              ></img>
            </div>
            <div className="col-lg-5 col-md-9 col-sm-10 col-xs-12">
              <div className="col-12">
                <label className="form-label">
                  <b>Concert Name:</b> {concert.name}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Soloist Name:</b> {concert.soloistName}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Music Genre:</b> {concert.typeOfMusic}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  <b>Concert Place:</b> {concert.concertPlace}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  <b>Date:</b> {dateToString(concert.date)}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  <b>Age Limit:</b> {concert.ageLimit}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  <b>Comment by {concert.createdBy.name}:</b> {concert.review}
                </label>
              </div>
              {isLoggedIn && user._id === concert.createdBy._id && (
                <div className="col-12">
                  <ShowWithTooltip
                    tooltipText={"Delete Concert"}
                    placement="bottom"
                  >
                    <Button
                      variant="link"
                      onClick={deleteEvent}
                      style={{ marginLeft: "30px" }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                    </Button>
                  </ShowWithTooltip>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <EventReviews
        reviews={reviews}
        eventAuthorId={concert && concert.createdBy && concert.createdBy._id}
        eventId={concertId}
        eventType={"concerts"}
        setSuccessMessage={setSuccessMessage}
      />
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </EventSidebar>
  );
}

export default OneConcert;
