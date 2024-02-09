import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, dateToString } from "../../utils/constants";
import { useParams } from "react-router-dom";
import EventSidebar from "../../components/EventSidebar";

function OneConcert(props) {
  const { concertId } = useParams();
  const [concert, setConcert] = useState({});
  const [errorsOfConcert, setErrorsOfConcert] = useState(undefined);

  const getOneConcert = () => {
    axios
      .get(`${API_URL}/api/concerts/${concertId}`)
      .then((response) => setConcert(response.data))
      .catch((err) => {
        if (err.response) setErrorsOfConcert(err.response.data);
        else setErrorsOfConcert("An error occurs!");
      });
  };

  useEffect(() => getOneConcert(), []);

  return (
    <EventSidebar pageName="Concerts">
      <div className="col-md-9">
        <div className="concert">
          <div className="personal-form col-12 col-sm-6 col-lg-4">
            <div className="row g-2">
              <div className="col-4">
                <img src={concert.imageUrl} alt="concert photo"></img>
              </div>

              <div className="col-8">
                <div className="col-12">
                  <label className="form-label">
                    Concert Name: {concert.name}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Soloist Name: {concert.soloistName}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Music Genre: {concert.typeOfMusic}
                  </label>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Place: {concert.concertPlace}
                  </label>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Date: {dateToString(concert.date)}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Age Limit: {concert.ageLimit}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Comment: {concert.review}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EventSidebar>
  );
}

export default OneConcert;
