import { useDispatch, useSelector } from "react-redux";
import TransactionsItem from "./TransactionsItem";
import { selectTransaction } from "../../redux/transactionsSlice";
import css from "../transactions/TransactionsList.module.css";
import { useIsMobile } from "../hooks/isMobile";
import ButtonAddTransactions from "./ButtonAddTransactions";
import { useEffect, useState } from "react";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction";
import { getTransactions } from "../../redux/transactionsOp";
// import EditTransactionForm from "../EditModal/EditTransactionForm";

const TransactionsList = () => {
  const transactions = useSelector(selectTransaction);
  const dispatch = useDispatch();

  const isMobile = useIsMobile();
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const openEditModal = (id) => setEditingTransactionId(id);
  const closeEditModal = () => setEditingTransactionId(null);

  const openModal = () => {
    if (!isModalAdd) {
      setIsModalAdd(true);
    }
  };
  const closeModal = () => setIsModalAdd(false);
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  if (transactions.length === 0) {
    return (
      <div className={css.noTransactionWrap}>
        <h3 className={css.noTransactions}>No transactions</h3>
        <ButtonAddTransactions openModal={openModal} />
        {isModalAdd && (
          <ModalAddTransaction openModal={isModalAdd} closeModal={closeModal} />
        )}
      </div>
    );
  }

  return (
    <div className={css.transactionList}>
      <ButtonAddTransactions openModal={openModal} />
      {isModalAdd && (
        <ModalAddTransaction openModal={isModalAdd} closeModal={closeModal} />
      )}
      {isMobile ? (
        transactions.map((transact, ind) => (
          <TransactionsItem
            key={ind}
            data={transact}
            openEditModal={(id) => openEditModal(transact._id)}
            closeEditModal={closeEditModal}
            editingTransactionId={editingTransactionId}
          />
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

          {transactions.map((transact, ind) => (
            <TransactionsItem
              key={ind}
              data={transact}
              openEditModal={(id) => openEditModal(transact._id)}
              closeEditModal={closeEditModal}
              editingTransactionId={editingTransactionId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
