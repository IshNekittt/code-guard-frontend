import { useSelector } from "react-redux";
import s from "./Balance.module.css";

const Balance = () => {
  // Отримуємо масив транзакцій зі стору
  const transactions = useSelector((state) => state.transactions.items);

  // Обчислюємо баланс: додаємо доходи, віднімаємо витрати
  const totalBalance = Array.isArray(transactions)
    ? transactions.reduce((acc, transaction) => {
        if (!transaction) return acc;
        return transaction.type === "income"
          ? acc + transaction.amount
          : acc - transaction.amount;
      }, 0)
    : 0;

  return (
    <section className={s.balance}>
      <p className={s.label}>Your balance</p>
      <p className={s.amount}>
        <span className={s.amount_symbol}>₴</span> {totalBalance.toFixed(2)}
      </p>
    </section>
  );
};

export default Balance;
