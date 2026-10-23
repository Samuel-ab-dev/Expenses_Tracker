import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Input from "../Input";
import EmojiPickerPopup from "../../assets/EmojiPickerPopup";
import { useTranslation } from "react-i18next";

export interface AddIncomeFormData {
  source: string;
  amount: string;
  date: string;
  icon: string;
}

interface AddIncomeFormProps {
  onAddIncome: (income: AddIncomeFormData) => void;
}

const AddIncomeForm = ({ onAddIncome }: AddIncomeFormProps) => {
  const { t } = useTranslation();

  const [income, setIncome] = useState<AddIncomeFormData>({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleSelectIcon = (icon: string) => {
    setIncome((prevIncome) => ({
      ...prevIncome,
      icon: icon,
    }));
  };

  const handleChange = (change: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = change.target;
    setIncome((prevIncome) => ({
      ...prevIncome,
      [name]: value,
    }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAddIncome(income);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <EmojiPickerPopup icon={income.icon} onSelect={handleSelectIcon} />

      <Input
        name="source"
        value={income.source}
        onChange={handleChange}
        label={t("income.incomeProps.incomeSource")}
        placeholder={t("income.incomeProps.incomeExamples")}
        type="text"
      />
      <Input
        name="amount"
        value={income.amount}
        onChange={handleChange}
        label={t("common.amount")}
        placeholder=""
        type="number"
      />
      <Input
        name="date"
        value={income.date}
        onChange={handleChange}
        label={t("common.date")}
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddIncome(income)}
        >
          {t("income.common.addIncome")}
        </button>
      </div>
    </form>
  );
};

export default AddIncomeForm;
