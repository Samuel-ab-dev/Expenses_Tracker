import { useTranslation } from "react-i18next";

interface deleteAlertProps {
  content: string;
  onDelete: () => void;
}

const DeleteAlert = ({ content, onDelete }: deleteAlertProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-sm">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={onDelete}
        >
          {t("common.delete")}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
