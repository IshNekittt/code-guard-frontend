import { IoAddOutline } from "react-icons/io5";
import css from "./ButtonAddTransactions.module.css";

const ButtonAddTransactions = () => {
  return (
    <div className={css.btnAddWrapp}>
      <button className={css.iconWrapp}>
        <IoAddOutline className={css.iconAdd} />
      </button>
    </div>
  );
};

export default ButtonAddTransactions;
