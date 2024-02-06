import { useState, useContext } from "react";
import axios from "axios";
import { API_URL, getSidebarMenuItem } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function AddConcert({ selectedType }) {
  const { getToken } = useContext(AuthContext);
  const [concertName, setConcertName] = useState("");
  const [soloistName, setSoloistName] = useState("");
  const [typeOfMusic, settypeOfMusic] = useState("");
  const [concertPlace, setConcertPlace] = useState("");
  const [date, setDate] = useState("");
  const [ageLimit, setAgeLimit] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleAddConcert = (event) => {
    event.preventDefault();

    setErrors(undefined);

    const requestBody = new FormData();
    requestBody.append("concertName", concertName);
    requestBody.append("soloistName", soloistName);
    requestBody.append("typeOfMusic", typeOfMusic);
    requestBody.append("concertPlace", concertPlace);
    requestBody.append("date", date);
    requestBody.append("ageLimit", ageLimit);
    requestBody.append("imageUrl", imageUrl);

    axios
      .post(`${API_URL}/api/concerts`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        setSuccessMessage("Concert is added successfully");
        setTimeout(() => {
          const selectedSidebarMenuItem = getSidebarMenuItem(selectedType);
          navigate(selectedSidebarMenuItem.link);
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      });
  };

  return (
    <div className=" add-concert col-12 col-sm-6 col-lg-4">
      <form className="row g-2" onSubmit={handleAddConcert}>
        <div className="col-12">
          <label>Concert Name: </label>
          <input
            type="text"
            name="concertName"
            className="form-control"
            value={concertName}
            onChange={(e) => setConcertName(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label>Soloist Name: </label>
          <input
            type="text"
            name="soloistName"
            className="form-control"
            value={soloistName}
            onChange={(e) => setSoloistName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Music Type: </label>
          <input
            type="text"
            name="typeOfMusic"
            className="form-control"
            value={typeOfMusic}
            onChange={(e) => settypeOfMusic(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Concert Place: </label>
          <input
            type="text"
            name="concertPlace"
            className="form-control"
            value={concertPlace}
            onChange={(e) => setConcertPlace(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Date: </label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Age Limit</label>
          <input
            type="number"
            name="ageLimit"
            className="form-control"
            value={ageLimit}
            onChange={(e) => setAgeLimit(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Photo of Concert:</label>
          <input
            type="file"
            className="form-control float-right"
            name="imageUrl"
            onChange={(e) => setImageUrl(e.target.files[0])}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Add Concert
          </button>
        </div>

        {errors &&
          Object.keys(errors)
            .filter((element) => {
              const value = errors[element];
              return value !== undefined && value !== null && value !== "";
            })
            .map((element) => {
              return (
                <div key={element} className="error-message">
                  {errors[element]}
                </div>
              );
            })}

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </form>
    </div>
  );
}

export default AddConcert;
