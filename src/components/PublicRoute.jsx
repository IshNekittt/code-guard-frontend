import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

export default function PublicRoute({ children }) {
  const isAuthenticated = useSelector(selectIsLoggedIn);

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}
