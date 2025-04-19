import { useSelector } from "react-redux";
import TransactionsItem from "./TransactionsItem";
import { selectTransaction } from "../../redux/transactionsSlice";
import css from "../transactions/TransactionsList.module.css";
import { useIsMobile } from "../hooks/isMobile";

const TransactionsList = () => {
  const transactions = useSelector(selectTransaction);
  const isMobile = useIsMobile();

  return (
    <div className={css.transactionList}>
      {isMobile ? (
        transactions.map((transact) => (
          <TransactionsItem key={transact.id} data={transact} />
        ))
      ) : (
        <div className={css.transactionContainer}>
          <div className={css.headerRow}>
            <div className={css.headerCell}>Date</div>
            <div className={css.headerCell}>Type</div>
            <div className={css.headerCell}>Category</div>
            <div className={css.headerCell}>Comment</div>
            <div className={css.headerCell}>Sum</div>
            <div className={css.headerCell}></div>
          </div>

          {transactions.map((transact) => (
            <TransactionsItem key={transact.id} data={transact} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
