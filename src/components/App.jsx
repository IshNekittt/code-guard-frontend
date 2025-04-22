import "./App.css";
import { Routes } from "react-router";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { lazy, Suspense, useEffect } from "react";
import Layout from "./Layout";
import RestrictedRoute from "./RestrictedRoute";

const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <h2>Refreshing the user...</h2>
  ) : (
    <Suspense fallback={null}>
      <Layout>
        <Routes>
          <Route
            path="/login"
            element={<RestrictedRoute route={<LoginPage />} />}
          />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;
