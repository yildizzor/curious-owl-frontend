import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { backgroundImg, avatar } from "../../utils/constants";
import "./ProfileForm.css";

function ShowProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="personal-form-container m-4 col-lg-9 col-12 static-text">
      <img
        className="personal-form-bg"
        src={backgroundImg}
        alt="background-img"
      />
      <div className="personal-form col-10 col-sm-9 col-md-8 col-xl-5">
        <div className="row g-2">
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
              src={user.imageUrl || avatar}
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
