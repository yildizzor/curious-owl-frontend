import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else return children;
}

export default IsAnon;
