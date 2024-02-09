import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  if (isLoading)
    return (
      <div className="container-fluid d-flex h-100 w-100 justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else return children;
}

export default IsPrivate;
