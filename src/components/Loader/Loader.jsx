import { GridLoader } from "react-spinners";
import s from "./Loader.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsLoading } from "../../redux/transactionsSlice";
import { selectIsRefreshing } from "../../redux/auth/selectors";

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  console.log(isLoading, isRefreshing);

  let showLoader = false;

  if (isLoading || isRefreshing) showLoader = true;

  useEffect(() => {
    if (showLoader) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showLoader]);

  if (!showLoader) return null;

  return (
    <div className={s.wrapper}>
      <GridLoader
        color="#734AEF"
        loading={showLoader}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
