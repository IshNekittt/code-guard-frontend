import { useEffect, useState } from "react";
import axios from "axios";
import s from "./Balance.module.css";

const Balance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get("/sidebar/balance"); 
        setBalance(res.data.balance || 0);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(0);
      }
    };

    fetchBalance();
  }, []);

  return (
    <section className={s.balance}>
      <p className={s.label}>Your balance</p>
      <p className={s.amount}>
        <span className={s.amount_symbol}>₴</span>{" "}
        {Number(balance).toFixed(2)}
      </p>
    </section>
  );
};

export default Balance;
