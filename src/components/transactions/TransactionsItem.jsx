import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../redux/transactionsOp";
import { useState } from "react";
import css from "../transactions/TransactionsItem.module.css";
import { useIsMobile } from "../hooks/isMobile";
import { MdOutlineEdit } from "react-icons/md";

const TransactionsItem = ({ data }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useIsMobile();
  const cardClass = data.type === "+" ? ` ${css.positive}` : ` ${css.negative}`;
  const date = new Date(data.date);
  const formatted = date.toLocaleDateString("ru-RU");

  if (isMobile) {
    return (
      <div className={`${css.card} ${cardClass}`}>
        <div className={css.row}>
          <span>Date</span> {formatted}
        </div>
        <div className={css.row}>
          <span>Type</span> {data.type}
        </div>
        <div className={css.row}>
          <span>Category</span> {data.category}
        </div>
        <div className={css.row}>
          <span>Comment</span> {data.comment}
        </div>
        <div className={css.row}>
          <span>Sum</span>{" "}
          <strong className={`${css.sum}${cardClass}`}>{data.summ}</strong>
        </div>
        <div className={css.actions}>
          <button
            className={`${css.delete} ${css.btnCard}`}
            onClick={() => dispatch(deleteTransaction(data.id))}
          >
            Delete
          </button>
          <div>
            <MdOutlineEdit />

            <button>Edit</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className={css.transactionRow}>
          <div className={css.cell}>{formatted}</div>
          <div className={css.cell}>{data.type}</div>
          <div className={css.cell}>{data.category}</div>
          <div className={css.cell}>{data.comment}</div>
          <div className={`${css.cell} ${css.sumCell} ${css.sum} ${cardClass}`}>
            {data.summ}
          </div>
          <div className={`${css.cell} ${css.actions}`}>
            <button className={css.editBtn} onClick={() => setIsEditing(true)}>
              <MdOutlineEdit className={css.editIcon} />
            </button>
            <button
              className={css.deleteBtn}
              onClick={() => dispatch(deleteTransaction(data.id))}
            >
              Delete
            </button>
          </div>
        </div>

        {isEditing && (
          <p>Должен быть компонент модалки Эдит</p>
          //   <EditTransaction data={data} onClose={() => setIsEditing(false)} />
        )}
      </>
    );
  }
};

export default TransactionsItem;
