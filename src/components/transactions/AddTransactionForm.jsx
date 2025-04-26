import React, { forwardRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/solid";
import styles from "./ModalAddTransaction.module.css";

// Custom input for DatePicker: icon toggles calendar, input supports manual entry
const CustomDateInput = forwardRef(({ value, onChange, onIconClick, onInputClick }, ref) => (
  <div className={styles.dateWrapper}>
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={onChange}
      onClick={onInputClick}    // prevent calendar open on input
      className={styles.input}
      placeholder="dd.MM.yyyy"
    />
    <CalendarIcon
      onClick={onIconClick}    // toggle calendar on icon click
      className={styles.dateIcon}
      style={{ cursor: "pointer" }}
    />
  </div>
));

export default function AddTransactionForm({ categories, onSubmit, onCancel }) {
  const schema = Yup.object().shape({
    type: Yup.mixed().oneOf(["income", "expense"]).required(),
    amount: Yup.number()
      .typeError("Enter a number")
      .positive("Must be > 0")
      .required("Required"),
    date: Yup.date().required("Required"),
    category: Yup.string().when("type", { is: "expense", then: Yup.string().required("Required") }),
    comment: Yup.string().required("Required"),
  });

  const { control, register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { type: "expense", amount: "", date: new Date(), category: "", comment: "" },
  });

  const [calendarOpen, setCalendarOpen] = useState(false);
  const txType = watch("type");

  const submitForm = async (data) => {
    try {
      await onSubmit(data);
    } catch (err) {
      alert(err.message || "Error sending");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles.form}>
      {/* Type switcher */}
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <div className={styles.switcher}>
            <span
              onClick={() => field.onChange("income")}
              className={
                field.value === "income"
                  ? `${styles.switchLabel} ${styles.switchLabelIncomeActive}`
                  : styles.switchLabel
              }
            >
              Income
            </span>
            <div className={styles.switchTrack}>
              <span
                className={`${styles.slider} ${
                  field.value === "expense"
                    ? styles.sliderExpense
                    : styles.sliderIncome
                }`}
                onClick={() =>
                  field.onChange(
                    field.value === "expense" ? "income" : "expense"
                  )
                }
              >
                {field.value === "expense" ? (
                  <MinusIcon className={styles.sliderIcon} />
                ) : (
                  <PlusIcon className={styles.sliderIcon} />
                )}
              </span>
            </div>
            <span
              onClick={() => field.onChange("expense")}
              className={
                field.value === "expense"
                  ? `${styles.switchLabel} ${styles.switchLabelExpenseActive}`
                  : styles.switchLabel
              }
            >
              Expense
            </span>
          </div>
        )}
      />

      {/* Category for expense */}
      {txType === "expense" && (
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div className={styles.field}>
              <Listbox
                value={field.value}
                onChange={field.onChange}
                as="div"
                className={styles.listboxContainer}
              >
                {({ open }) => (
                  <>
                    <ListboxButton className={styles.listboxButton}>
                      {field.value || "Select a category"}
                      {open ? (
                        <ChevronUpIcon className={styles.icon} />
                      ) : (
                        <ChevronDownIcon className={styles.icon} />
                      )}
                    </ListboxButton>
                    <Transition
                      as={React.Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions className={styles.listboxOptions}>
                        {categories.map((cat, idx) => (
                          <ListboxOption key={idx} value={cat}>
                            {({ active, selected }) => (
                              <li
                                className={
                                  active
                                    ? `${styles.option} ${styles.optionActive}`
                                    : styles.option
                                }
                              >
                                <span>{cat}</span>
                                {selected && (
                                  <CheckIcon className={styles.iconCheck} />
                                )}
                              </li>
                            )}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </>
                )}
              </Listbox>
              {errors.category && (
                <p className={styles.error}>{errors.category.message}</p>
              )}
            </div>
          )}
        />
      )}

      {/* Amount & Date */}
      <div className={styles.twoCols}>
        <div className={styles.field}>
          <input
            type="number"
            step="0.01"
            {...register("amount")}
            placeholder="0.00"
            className={styles.input}
          />
          {errors.amount && (
            <p className={styles.error}>{errors.amount.message}</p>
          )}
        </div>
        <div className={styles.field}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  setCalendarOpen(false);
                }}
                dateFormat="dd.MM.yyyy"
                open={calendarOpen}
                onClickOutside={() => setCalendarOpen(false)}
                preventOpenOnFocus
                customInput={
                  <CustomDateInput
                    onIconClick={() => {
                      setCalendarOpen((open) => !open);
                    }}
                    onInputClick={(e) => e.stopPropagation()}
                  />
                }
                popperPlacement="bottom-start"
                popperModifiers={[
                  { name: "offset", options: { offset: [0, 8] } },
                  { name: "preventOverflow", options: { altAxis: true } },
                  {
                    name: "flip",
                    options: {
                      fallbackPlacements: [
                        "bottom-start",
                        "bottom-end",
                        "top-start",
                        "top-end",
                      ],
                    },
                  },
                ]}
                popperContainer={({ children }) => (
                  <div className={styles.dateWrapper}>{children}</div>
                )}
              />
            )}
          />
          {errors.date && <p className={styles.error}>{errors.date.message}</p>}
        </div>
      </div>

      {/* Comment */}
      <div className={styles.field}>
        <input
          type="text"
          {...register("comment")}
          placeholder="Comment"
          className={styles.input}
        />
        {errors.comment && (
          <p className={styles.error}>{errors.comment.message}</p>
        )}
      </div>

      {/* Actions */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`${styles.btn} ${styles.addBtn}`}
      >
        Add
      </button>
      <button
        type="button"
        onClick={onCancel}
        className={`${styles.btn} ${styles.cancelBtn}`}
      >
        Cancel
      </button>
    </form>
  );
}
