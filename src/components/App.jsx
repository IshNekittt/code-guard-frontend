import { useEffect } from "react";
import { getTransactions } from "../redux/transactionsOp";
import TransactionsList from "./transactions/TransactionsList";
import { useDispatch } from "react-redux";
import ButtonAddTransactions from "./transactions/ButtonAddTransactions";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  return (
    <>
      <TransactionsList />
      <ButtonAddTransactions />
    </>
  );
}
