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

function OneMuseum(props) {
  const { museumId } = useParams();
  const [museum, setMuseum] = useState(undefined);
  const [isAxiosLoading, setIsAxiosLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [errorsOfMuseum, setErrorsOfMuseum] = useState(undefined);

  const navigate = useNavigate();
  const { user, isLoggedIn, getToken } = useContext(AuthContext);

  const deleteEvent = async () => {
    try {
      await axios.delete(`${API_URL}/api/museums/${museumId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      console.log("Event is successfully deleted");
      navigate(`/events`);
    } catch (err) {
      if (err.response) setErrorsOfMuseum(err.response.data);
      else setErrorsOfMuseum("An error occurs while event deletion");
    }
  };

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
              {isLoggedIn && user._id === museum.createdBy._id && (
                <div className="col-12">
                  <ShowWithTooltip
                    tooltipText={"Delete Museum"}
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
