import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

export default function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(selectIsLoggedIn);

  return isAuthenticated ? children : <Navigate to="/login" />;
}
