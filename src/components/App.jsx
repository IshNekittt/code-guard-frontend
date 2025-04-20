
import { useEffect } from "react";
import { getTransactions } from "../redux/transactionsOp";
import TransactionsList from "./transactions/TransactionsList";
import { useDispatch } from "react-redux";
import ButtonAddTransactions from "./transactions/ButtonAddTransactions";
import Sidebar from './Sidebar/Sidebar';


export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  return (
    <>
     <Sidebar/>
      <TransactionsList />
      <ButtonAddTransactions />
    </>
  );
}
