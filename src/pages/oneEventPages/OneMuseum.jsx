import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { useParams } from "react-router-dom";
import EventSidebar from "../../components/EventSidebar";

function OneMuseum(props) {
  const { museumId } = useParams();
  const [museum, setMuseum] = useState({});
  const [errorsOfMuseum, setErrorsOfMuseum] = useState(undefined);

  const getOneMuseum = () => {
    axios
      .get(`${API_URL}/api/museums/${museumId}`)
      .then((response) => setMuseum(response.data))
      .catch((err) => {
        if (err.response) setErrorsOfMuseum(err.response.data);
        else setErrorsOfMuseum("An error occurs!");
      });
  };

  useEffect(() => getOneMuseum(), []);

  return (
    <EventSidebar pageName="Museums">
      <div className="col-md-9">
        <div className="museum">
          <div className="personal-form col-12 col-sm-6 col-lg-4">
            <div className="row g-2">
              <div className="col-4">
                <img src={museum.imageUrl} alt="museum photo"></img>
              </div>

              <div className="col-8">
                <div className="col-12">
                  <label className="form-label">
                    Museum Name: {museum.name}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Museum Type: {museum.typeOfSubject}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Place: {museum.museumPlace}
                  </label>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Built By: {museum.builtBy}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Date of Built: {museum.builtDate}
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

export default OneMuseum;
