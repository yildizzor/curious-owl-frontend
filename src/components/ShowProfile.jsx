import { useContext } from "react";
import backgroundImg from "../assets/owl1.jpeg";
import { AuthContext } from "../context/auth.context";
import "./ProfileForm.css";

function ShowProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="personal-form-container m-4 static-text">
      <img
        className="personal-form-bg"
        src={backgroundImg}
        alt="background-img"
      />

      <div className="personal-form col-12 col-sm-6 col-lg-4">
        <div className="row g-2" >
          <div className="col-8">
            <div className="col-12">
              <label className="form-label">Name: {user.name}</label>
            </div>
            <div className="col-12">
              <label className="form-label">Email: {user.email}</label>
            </div>
          </div>
          <div className="col-4">
            <img
              src={user.imageUrl}
              className="float-right avatar-image rounded-circle"
              alt="profile photo"
            ></img>
          </div>
          <div className="col-12">
            <label className="form-label">Country: {user.country}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProfile;