import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, dateToString } from "../../utils/constants";
import { useParams } from "react-router-dom";
import EventSidebar from "../../components/EventSidebar";

function OneTheater(props) {
  const { theaterId } = useParams();
  const [theater, setTheater] = useState({});
  const [errorsOfTheater, setErrorsOfTheater] = useState(undefined);

  const getOneTheater = () => {
    axios
      .get(`${API_URL}/api/theaters/${theaterId}`)
      .then((response) => setTheater(response.data))
      .catch((err) => {
        if (err.response) setErrorsOfTheater(err.response.data);
        else setErrorsOfTheater("An error occurs!");
      });
  };

  useEffect(() => getOneTheater(), []);

  return (
    <EventSidebar pageName="Theaters">
      <div className="col-md-9">
        <div className="theater">
          <div className="personal-form col-12 col-sm-6 col-lg-4">
            <div className="row g-2">
              <div className="col-4">
                <img src={theater.imageUrl} alt="theater photo"></img>
              </div>
              <div className="col-8">
                <div className="col-12">
                  <label className="form-label">
                    Theater Name: {theater.name}
                  </label>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Cast: {theater.actorsName}
                  </label>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Director(s) Name: {theater.directorName}
                  </label>
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">
                  Writer(s) Name: {theater.writerName}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  Theater Type: {theater.typeOfTheater}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  Place: {theater.theaterPlace}
                </label>
              </div>

              <div className="col-12">
                <label className="form-label">
                  Date: {dateToString(theater.date)}
                </label>
              </div>
              <div className="col-12">
                <label className="form-label">
                  Age Limit: {theater.ageLimit}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EventSidebar>
  );
}

export default OneTheater;
