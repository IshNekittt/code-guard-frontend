import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../redux/transactionsOp";
import css from "../transactions/TransactionsItem.module.css";
import { useIsMobile } from "../hooks/isMobile";
import { MdOutlineEdit } from "react-icons/md";
import EditTransactionForm from "../EditModal/EditTransactionForm";

const TransactionsItem = ({
  data,
  openEditModal,
  closeEditModal,
  editingTransactionId,
}) => {
  const dispatch = useDispatch();

  const isEditing = editingTransactionId === data._id;

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
            onClick={() => dispatch(deleteTransaction(data._id))}
          >
            Delete
          </button>
          <div>
            <MdOutlineEdit />

            <button onClick={() => openEditModal(data._id)}>Edit</button>
            {isEditing && (
              <EditTransactionForm
                openModal={true}
                closeModal={closeEditModal}
                data={data}
              />
            )}
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
            <button
              className={css.editBtn}
              onClick={() => openEditModal(data._id)}
            >
              <MdOutlineEdit className={css.editIcon} />
            </button>
            <button
              className={css.deleteBtn}
              onClick={() => dispatch(deleteTransaction(data._id))}
            >
              Delete
            </button>
          </div>
          {isEditing && (
            <EditTransactionForm
              openModal={true}
              closeModal={closeEditModal}
              data={data}
            />
          )}
        </div>
      </>
    );
  }
};

export default TransactionsItem;
