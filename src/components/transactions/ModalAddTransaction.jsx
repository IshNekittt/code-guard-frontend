import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import AddTransactionForm from "./AddTransactionForm";
import styles from "./ModalAddTransaction.module.css";

const modalRoot = document.getElementById("modal-root");

function useEscapeClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);
}

export default function ModalAddTransaction({
  isOpen,
  onClose,
  categories,
  onCreate,
}) {
  useEscapeClose(isOpen, onClose);
  if (!isOpen || !modalRoot) return null;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.modalBackdrop} onClick={handleBackdrop}>
      <div className={styles.modalContainer}>
        <header className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add transaction</h2>
          <button className={styles.modalClose} onClick={onClose}>
            ×
          </button>
        </header>
        <AddTransactionForm
          categories={categories}
          onSubmit={onCreate}
          onCancel={onClose}
        />
      </div>
    </div>,
    modalRoot
  );
}
