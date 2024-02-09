import { useState, useContext } from "react";
import axios from "axios";
import { API_URL, getSidebarMenuItem } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ButtonStatus from "../common/ButtonStatus";

function AddTheater({ selectedType }) {
  const { getToken, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [actorsName, setActorsName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [writerName, setWriterName] = useState("");
  const [typeOfTheater, setTypeOfTheater] = useState("");
  const [theaterPlace, setTheaterPlace] = useState("");
  const [date, setDate] = useState("");
  const [ageLimit, setAgeLimit] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(false);

  const navigate = useNavigate();

  const handleAddTheater = (event) => {
    event.preventDefault();

    setErrors(undefined);

    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("directorName", directorName);
    requestBody.append("writerName", writerName);
    requestBody.append("actorsName", actorsName);
    requestBody.append("typeOfTheater", typeOfTheater);
    requestBody.append("theaterPlace", theaterPlace);
    requestBody.append("date", date);
    requestBody.append("ageLimit", ageLimit);
    requestBody.append("imageUrl", imageUrl);
    requestBody.append("review", review);
    requestBody.append("createdBy", user._id);
    setIsAxiosInProgress(true);

    axios
      .post(`${API_URL}/api/theaters`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        setSuccessMessage("Theaters is added successfully");
        setTimeout(() => {
          const selectedSidebarMenuItem = getSidebarMenuItem(selectedType);
          navigate(selectedSidebarMenuItem.link);
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsAxiosInProgress(false);
        }, 1000);
      });
  };

  return (
    <div className="add-event col-12 col-sm-10 col-md-8 col-lg-6">
      <form className="row g-2" onSubmit={handleAddTheater}>
        <div className="col-12">
          <label>Theater Name: </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label>Cast: </label>
          <input
            type="text"
            name="actorsName"
            className="form-control"
            value={actorsName}
            onChange={(e) => setActorsName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Director(s) Name: </label>
          <input
            type="text"
            name="directorName"
            className="form-control"
            value={directorName}
            onChange={(e) => setDirectorName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Writer(s) Name: </label>
          <input
            type="text"
            name="writerName"
            className="form-control"
            value={writerName}
            onChange={(e) => setWriterName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Theater Type: </label>
          <input
            type="text"
            name="typeOfTheater"
            className="form-control"
            value={typeOfTheater}
            onChange={(e) => setTypeOfTheater(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Theater Place: </label>
          <input
            type="text"
            name="theaterPlace"
            className="form-control"
            value={theaterPlace}
            onChange={(e) => setTheaterPlace(e.target.value)}
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
          <label>Photo of Theater:</label>
          <input
            type="file"
            className="form-control float-right"
            name="imageUrl"
            onChange={(e) => setImageUrl(e.target.files[0])}
          />
        </div>
        <div className="col-12">
          <label>Comment:</label>
          <textarea
            className="form-control float-right"
            rows={5}
            cols={100}
            maxLength={400}
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="col-12">
          <ButtonStatus
            inProgress={isAxiosInProgress}
            text="Add Theater"
            inProgressText="Adding Theater..."
          />
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

export default AddTheater;
