import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

{
  /* <table className={css.transactionTable}>
  <thead className={css.transactionThead}>
    <tr className={css.transactionTr}>
      <th className={css.transactionTh}>Date</th>
      <th className={css.transactionTh}>Type</th>
      <th className={css.transactionTh}>Category</th>
      <th className={css.transactionTh}>Comment</th>
      <th className={css.transactionTh}>Sum</th>
      <th className={css.transactionTh}></th>
    </tr>
  </thead>
  <tbody className={css.transactionTb}>
    {transactions.map((transact) => (
      <TransactionsItem key={transact.id} data={transact} />
    ))}
  </tbody>
</table>;

<tr className={css.transactionTr}>
  <td className={css.colDate}>{data.date}</td>
  <td className={css.colType}>{data.type}</td>
  <td className={css.colCategory}>{data.category}</td>
  <td className={css.colComment}>{data.comment}</td>
  <td className={`${css.colSum} ${cardClass}`}>{data.sum}</td>
  <td className={css.actionCell}>
    <button onClick={() => setIsEditing(true)} className={css.editBtn}>
      <MdOutlineEdit className={css.test} />
    </button>
    <button
      onClick={() => dispatch(deleteTransaction(data.id))}
      className={css.deleteBtn}
    >
      Delete
    </button>
  </td>
</tr>; */
}

// {
//   isEditing && (
//     <p>Должен быть компонент модалки Эдит</p>
//     //   <EditTransaction data={data} onClose={() => setIsEditing(false)} />
//   );
// }
