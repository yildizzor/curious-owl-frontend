import { useState, useContext } from "react";
import axios from "axios";
import { API_URL, getSidebarMenuItem } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ButtonStatus from "../common/ButtonStatus";

function AddMuseum({ selectedType }) {
  const { getToken, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [typeOfSubject, setTypeOfSubject] = useState("");
  const [museumPlace, setMuseumPlace] = useState("");
  const [builtBy, setBuiltBy] = useState("");
  const [builtDate, setBuiltDate] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(false);

  const navigate = useNavigate();

  const handleAddMuseum = (event) => {
    event.preventDefault();

    setErrors(undefined);

    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("typeOfSubject", typeOfSubject);
    requestBody.append("museumPlace", museumPlace);
    requestBody.append("builtBy", builtBy);
    requestBody.append("builtDate", builtDate);
    requestBody.append("imageUrl", imageUrl);
    requestBody.append("review", review);
    requestBody.append("createdBy", user._id);

    axios
      .post(`${API_URL}/api/museums`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        setSuccessMessage("Museum is added successfully");
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
      <form className="row g-2" onSubmit={handleAddMuseum}>
        <div className="col-12">
          <label>Museum Name: </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label>Museum Type: </label>
          <input
            type="text"
            name="typeOfSubject"
            className="form-control"
            value={typeOfSubject}
            onChange={(e) => setTypeOfSubject(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Museum Place: </label>
          <input
            type="text"
            name="museumPlace"
            className="form-control"
            value={museumPlace}
            onChange={(e) => setMuseumPlace(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Built By: </label>
          <input
            type="text"
            name="builtBy"
            className="form-control"
            value={builtBy}
            onChange={(e) => setBuiltBy(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Built Date: </label>
          <input
            type="text"
            name="builtDate"
            className="form-control"
            value={builtDate}
            onChange={(e) => setBuiltDate(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label>Photo of Museum:</label>
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
            text="Add Museum"
            inProgressText="Adding Museum..."
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

export default AddMuseum;
