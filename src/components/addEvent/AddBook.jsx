import { useState, useContext } from "react";
import axios from "axios";
import { API_URL, getSidebarMenuItem } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ButtonStatus from "../common/ButtonStatus";

function AddBook({ selectedType }) {
  const { getToken, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [writer, setWriter] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(false);
  const navigate = useNavigate();

  const handleAddBook = (event) => {
    event.preventDefault();

    setErrors(undefined);

    const requestBody = new FormData();
    requestBody.append("name", name);
    requestBody.append("writer", writer);
    requestBody.append("genre", genre);
    requestBody.append("publishedDate", publishedDate);
    requestBody.append("imageUrl", imageUrl);
    requestBody.append("review", review);
    requestBody.append("createdBy", user._id);

    setIsAxiosInProgress(true);
    axios
      .post(`${API_URL}/api/books`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        setSuccessMessage("Book is added successfully");
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
      <form className="row g-2" onSubmit={handleAddBook}>
        <div className="col-12">
          <label>Book Name: </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label>Writer: </label>
          <input
            type="text"
            name="writer"
            className="form-control"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label>Genre: </label>
          <input
            type="text"
            name="genre"
            className="form-control"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label>Published Date: </label>
          <input
            type="publishedDate"
            name="publishedDate"
            className="form-control"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label>Photo of Book:</label>
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
            text="Add Book"
            inProgressText="Adding Book..."
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

export default AddBook;
