import { useState, type ChangeEvent, type SubmitEvent } from "react";
import EmojiPickerPopup from "../../assets/EmojiPickerPopup";
import Input from "../Input";
import { useTranslation } from "react-i18next";

export interface AddExpenseFormData {
  category: string;
  amount: string;
  date: string;
  icon: string;
}

interface AddExpenseFormProps {
  onAddExpense: (expense: AddExpenseFormData) => void;
}

const AddExpenseForm = ({ onAddExpense }: AddExpenseFormProps) => {
  const { t } = useTranslation();

  const [expense, setExpense] = useState<AddExpenseFormData>({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleSelectIcon = (icon: string) => {
    setExpense((prevExpense) => ({
      ...prevExpense,
      icon: icon,
    }));
  };

  const handleChange = (change: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = change.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAddExpense(expense);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <EmojiPickerPopup icon={expense.icon} onSelect={handleSelectIcon} />

      <Input
        name="category"
        value={expense.category}
        onChange={handleChange}
        label={t("expense.expenseProps.expenseCategory")}
        placeholder={t("expense.expenseProps.expenseExamples")}
        type="text"
      />
      <Input
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        label={t("common.amount")}
        placeholder=""
        type="number"
      />
      <Input
        name="date"
        value={expense.date}
        onChange={handleChange}
        label={t("common.date")}
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          {t("expense.common.addExpense")}
        </button>
      </div>
    </form>
  );
};
export default AddExpenseForm;
