import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { API_URL } from "../utils/constants";
import "./ProfileForm.css";
import backgroundImg from "../assets/owl1.jpeg";
import avatar from "../assets/avatar.png";

function ProfileForm() {
  const { user, getToken, storeToken, authenticateUser } =
    useContext(AuthContext);

  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState(user.country);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [errors, setErrors] = useState(undefined);
  const [previewUrl, setPreviewUrl] = useState(user.imageUrl);

  useEffect(() => {
    console.log(imageUrl);
    if (typeof imageUrl === "string") {
      return;
    }

    const objectUrl = URL.createObjectURL(imageUrl);

    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageUrl]);

  const handlePassword = (event) => setPassword(event.target.value);
  const handleCountry = (event) => setCountry(event.target.value);
  const handleFileUpload = (event) => setImageUrl(event.target.files[0]);

  const validateForm = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
  };

  const submitProfileUpdate = (event) => {
    event.preventDefault();
    validateForm(event);

    const requestBody = new FormData();

    requestBody.append("email", user.email);
    requestBody.append("password", password);
    requestBody.append("country", country);
    requestBody.append("imageUrl", imageUrl);

    console.log(requestBody, country);
    axios
      .put(`${API_URL}/api/user`, requestBody, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      });
  };

  return (
    <Form noValidate validated={validated} onSubmit={submitProfileUpdate}>
      <Row className="mb-3" md="6">
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default ProfileForm;
