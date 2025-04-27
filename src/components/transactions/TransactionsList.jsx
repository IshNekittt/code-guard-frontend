import { useSelector } from "react-redux";
import TransactionsItem from "./TransactionsItem";
import { selectTransaction } from "../../redux/transactionsSlice";
import css from "../transactions/TransactionsList.module.css";
import { useIsMobile } from "../hooks/isMobile";
import ButtonAddTransactions from "./ButtonAddTransactions";

const TransactionsList = () => {
  const transactions = useSelector(selectTransaction);
  const isMobile = useIsMobile();
  if (transactions.length === 0) {
    return (
      <div className={css.noTransactionWrap}>
        <h3 className={css.noTransactions}>No transactions</h3>
        <ButtonAddTransactions />
      </div>
    );
  }

  return (
    <div className={css.transactionList}>
      <ButtonAddTransactions />
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
