import { useEffect, useState } from "react";
import { getTransactions, addTransaction } from "../redux/transactionsOp";
import TransactionsList from "./transactions/TransactionsList";
import { useDispatch } from "react-redux";
import ButtonAddTransactions from "./transactions/ButtonAddTransactions";
import ModalAddTransaction from "./transactions/ModalAddTransaction";
import { CATEGORIES } from "../constants/categories";

export default function App() {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    dispatch(getTransactions());
    setCategories(CATEGORIES);
    /*fetch(`${API_URL}/categories`)
      .then((r) => r.json())
      .then(setCategories);*/
  }, [dispatch]);
  const handleCreate = async (data) => {
    try {
      dispatch(addTransaction({ ...data, date: data.date.toISOString() }));
      setModalOpen(false);
    } catch (err) {}
  };

  return (
    <>
      <TransactionsList />

      <ButtonAddTransactions onClick={() => setModalOpen(true)} />

      <ModalAddTransaction
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        categories={categories}
        onCreate={handleCreate}
      />
    </>
  );
}
