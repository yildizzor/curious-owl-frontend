import { useState, useContext } from "react";
import axios from "axios";
import { API_URL, getSidebarMenuItem } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ButtonStatus from "../common/ButtonStatus";

function AddBook({ selectedType }) {
  const { getToken, user } = useContext(AuthContext);

  // state variables to handle form field changes
  const [name, setName] = useState("");
  const [writer, setWriter] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [review, setReview] = useState("");

  // state variables to handle success and error messages with form submissions and component errors
  const [errors, setErrors] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAxiosInProgress, setIsAxiosInProgress] = useState(false);
  const [validated, setValidated] = useState("");

  const navigate = useNavigate();

  const getClassName = (fieldName, defaultClassNames = "form-control") => {
    if (errors) {
      return `${defaultClassNames} ${
        errors[fieldName] ? "is-invalid" : "is-valid"
      }`;
    }
    return defaultClassNames;
  };

  const handleAddBook = (event) => {
    event.preventDefault();

    setErrors(undefined);

    setValidated("");
    const form = event.currentTarget;
    if (form.checkValidity() == false) {
      event.stopPropagation();
      setValidated("was-validated");
      return;
    }

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
        setValidated("validated");

        if (error.response) {
          setErrors(error.response.data);
        } else {
          setErrors({ message: "Unexpected error occurs during API call" });
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
      <form
        className={`row g-2 ${validated}`}
        noValidate
        onSubmit={handleAddBook}
      >
        <div className="col-12">
          <label className="form-label">Book Name: </label>
          <input
            type="text"
            name="name"
            className={getClassName("name")}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.name
              ? errors.name
              : "Book Name field is required!"}
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Writer: </label>
          <input
            type="text"
            name="writer"
            className={getClassName("writer")}
            required
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.writer
              ? errors.writer
              : "Writer field is required!"}
          </div>
        </div>
        <div className="col-12">
          <label>Genre: </label>
          <input
            type="text"
            name="genre"
            className={getClassName("genre")}
            required
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.genre ? errors.genre : "Genre field is required!"}
          </div>
        </div>

        <div className="col-12">
          <label>First Published Year: </label>
          <input
            type="text"
            name="publishedDate"
            className={getClassName("publishedDate")}
            required
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.publishedDate
              ? errors.publishedDate
              : "First Published Year field is required and should be typed as year!"}
          </div>
        </div>

        <div className="col-12">
          <label>Photo of Book:</label>
          <input
            type="file"
            className={getClassName("imageUrl", "form-control float-right")}
            name="imageUrl"
            onChange={(e) => setImageUrl(e.target.files[0])}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Comment:</label>
          <textarea
            name="review"
            className={getClassName("review")}
            rows={5}
            cols={100}
            maxLength={400}
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="invalid-feedback">
            {errors && errors.review
              ? errors.review
              : "Comment of event creator is required!"}
          </div>
        </div>
        <div className="col-12">
          <ButtonStatus
            inProgress={isAxiosInProgress}
            text="Add Book"
            inProgressText="Adding Book..."
          />
        </div>

        {errors && errors.message && (
          <div className="error-message">{errors.message}</div>
        )}

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </form>
    </div>
  );
}

export default AddBook;
