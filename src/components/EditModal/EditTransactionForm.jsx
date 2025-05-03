import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import css from "./EditTransactionForm.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoCloseOutline } from "react-icons/io5";
import { addTransaction, patchTransaction } from "../../redux/transactionsOp";
import Select from "react-select";
import customSelectStyles from "../ModalAddTransaction/customSelectStyles.js";
import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
import axios from "../../api/axios.js";

const EditTransactionForm = ({
  openModal,
  closeModal,
  data: { category, comment, date, summ, type, _id },
  setBalance,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState("income");
  const token = useSelector((state) => state.auth.token);

  const expenseOptions = [
    { value: "Main expenses", label: "Main expenses" },
    { value: "Products", label: "Products" },
    { value: "Car", label: "Car" },
    { value: "Self care", label: "Self care" },
    { value: "Child care", label: "Child care" },
    { value: "Household products", label: "Household products" },
    { value: "Education", label: "Education" },
    { value: "Leisure", label: "Leisure" },
    { value: "Other expenses", label: "Other expenses" },
    { value: "Entertainment", label: "Entertainment" },
  ];
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    money: yup
      .number()
      .typeError("Money must be a number")
      .positive("Money must be positive")
      .required("Money is required"),
    comment: yup
      .string()
      .min(3, "Comment must be at least 3 characters")
      .max(50, "Comment must be at most 50 characters")
      .required("Comment is required"),
    category: yup.string().when("$transactionType", {
      is: "expense",
      then: (schema) => schema.required("Category is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (transactionType === "expense" && !data.category) {
      iziToast.error({
        title: "Error",
        message: "Please select a category",
        position: "topRight",
        timeout: 5000,
        close: true,
        progressBar: true,
        backgroundColor: "#ff4d4f",
        messageColor: "#fff",
        titleColor: "#fff",
      });
      return;
    }
    const payload = {
      type: transactionType === "income" ? "+" : "-",
      category: transactionType === "income" ? "Income" : data.category,
      date: startDate.toISOString(),
      summ: Number(data.money),
      comment: data.comment,
    };

    try {
      await dispatch(patchTransaction({ id: _id, payload })).unwrap();
      const res = await axios.get("/sidebar/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalance(res.data.balance || 0);
      reset();
      closeModal();
    } catch (err) {
      iziToast.error({
        title: "Error",
        message:
          err?.response?.data?.message ||
          "Something went wrong. Please try again!",
        position: "topRight",
        timeout: 5000,
        close: true,
        progressBar: true,
        backgroundColor: "#ff4d4f",
        messageColor: "#fff",
        titleColor: "#fff",
      });
    }
  };
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
      reset({
        money: summ,
        comment,
        category,
      });
      setStartDate(new Date(date));
      setTransactionType(type === "+" ? "income" : "expense");
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal, type, summ, comment, category, date, reset]);

  if (!openModal) {
    return null;
  }

  return (
    <div className={css.backdrop} onClick={closeModal}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.addModalWrapp}>
          <p className={css.addTransaction}>Edit transaction</p>
          <div className={css.typeTransaction}>
            {transactionType === "income" ? (
              <p
                // onClick={() => setTransactionType("income")}
                className={clsx(
                  css.income,
                  transactionType === "income" && css.active
                )}
              >
                Income
              </p>
            ) : (
              <p
                // onClick={() => setTransactionType("expense")}
                className={clsx(
                  css.expense,
                  transactionType === "expense" && css.activeExpense
                )}
              >
                Expense
              </p>
            )}
            <button className={css.closeIconBtn} onClick={closeModal}>
              <IoCloseOutline className={css.closeIcon} />
            </button>

            {/* {transactionType === "expense" && (
              <p
                // onClick={() => setTransactionType("expense")}
                className={clsx(
                  css.expense,
                  transactionType === "expense" && css.active
                )}
              >
                Expense
              </p>
            )} */}
          </div>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            {transactionType === "expense" && (
              <div className={css.selectWrapp}>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={expenseOptions}
                      placeholder="Select a category"
                      classNamePrefix="customSelect"
                      styles={customSelectStyles}
                      onChange={(option) => field.onChange(option.value)}
                      value={expenseOptions.find(
                        (option) => option.value === field.value
                      )}
                    />
                  )}
                />
                {errors.category && (
                  <p className={css.errMoney}>{errors.category.message}</p>
                )}
              </div>
            )}
            <div className={css.tabletWrap}>
              <div className={css.moneyWrapp}>
                <input
                  type="text"
                  {...register("money", { required: "This is required" })}
                  className={css.money}
                  placeholder="0.00"
                />
                {errors.money?.message && (
                  <p className={css.errMoney}>{errors.money?.message}</p>
                )}
              </div>
              <div className={css.dateWrapp}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className={css.date}
                />
                <FaRegCalendarAlt className={css.calendarIcon} />
              </div>
            </div>
            <div className={css.moneyWrapp}>
              <textarea
                {...register("comment", { required: "This is required" })}
                className={css.comment}
                placeholder="Comment"
              />
              {errors.comment?.message && (
                <p className={css.errMoney}>{errors.comment?.message}</p>
              )}
            </div>
            <div className={css.btnWrapp}>
              <button type="submit" className={css.btnAdd}>
                SAVE
              </button>
              <button
                type="button"
                className={css.btnCancel}
                onClick={closeModal}
              >
                CANCEl
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionForm;
