

const StatisticsList = ({ transactions }) => {
  return (
    <ul>
      {transactions.map((transaction) => {
        return <li key={transaction.id}>{transaction.name}</li>;
      })}
    </ul>
  );
};

const App = () => {
  return (
    <>
	  <h1>Books of the week</h1>
      <BookList transactions={transactions} />
    </>
  );
};
