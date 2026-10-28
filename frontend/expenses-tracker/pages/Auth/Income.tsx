import { useState } from "react";
import { useIncome, type IncomeData } from "../../hooks/queries/useIncome.tsx";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstances.tsx";
import { API_PATHS } from "../../utils/apiPaths.ts";
import Modal from "../../src/components/Modal.tsx";
import IncomeOverview from "../../src/components/income/IncomeOverview.tsx";
import AddIncomeForm from "../../src/components/income/AddIncomeForm.tsx";
import { type AddIncomeFormData } from "../../src/components/income/AddIncomeForm.tsx";
import IncomeList from "../../src/components/income/IncomeList.tsx";
import DeleteAlert from "../../src/assets/DeleteAlert.tsx";
import exportToExcel from "../../utils/excel/exportToExcel.ts";
import { getIncomeExcelConfig } from "../../utils/excel/excelConfigs.ts";

const Income = () => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();

  const [incomeDelete, setIncomeDelete] = useState<{
    show: boolean;
    data: IncomeData | null;
  }>({ show: false, data: null });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const handleAddIncome = (income: AddIncomeFormData) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error(t("income.errors.sourceAmountReq"));
      return;
    }

    const numericAmount = Number(amount);

    if (
      !amount.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      toast.error(t("income.errors.amountGtZero"));
      return;
    }

    if (!date) {
      toast.error(t("income.errors.dateReq"));
      return;
    }

    addIncomeMutation.mutate({
      source: source.trim(),
      amount: String(numericAmount),
      date,
      icon,
    });
  };

  const addIncomeMutation = useMutation({
    mutationFn: async (income: AddIncomeFormData) => {
      const payload = { ...income, amount: Number(income.amount) };

      const res = await api.post(API_PATHS.INCOME.ADD_INCOME, payload);

      return res.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["income"],
      });

      setOpenAddIncomeModal(false);
      toast.success(t("income.common.successIncomeAdd"));
    },

    onError: () => {
      toast.error(t("income.errors.incomeNotAdd"));
    },
  });

  const deleteIncomeMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      return res.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["income"],
      });

      setIncomeDelete({
        show: false,
        data: null,
      });

      toast.success("Income deleted successfully!");
    },

    onError: () => {
      toast.error(t("income.errors.incomeDeleteError"));
    },
  });

  const handleConfirmDelete = () => {
    if (deleteIncomeMutation.isPending) return;

    const id = incomeDelete.data?.id;

    if (!id) {
      toast.error(t("income.errors.incomeDeleteSelection"));
      return;
    }

    deleteIncomeMutation.mutate(id);
  };

  const handleDownloadIncomeData = async () => {
    try {
      const locale = i18n.resolvedLanguage ?? i18n.language;

      await exportToExcel({
        data: incomeData,
        ...getIncomeExcelConfig(locale),
      });

      toast.success(t("income.common.successIncomeDownload"));
    } catch (err: unknown) {
      console.error("Failed to export data:", err);
      toast.error(t("income.errors.incomeDownloadError"));
    }
  };

  const { data: incomeData = [], isLoading, isError } = useIncome();
  if (isLoading) {
    return <div className="my-5 m-auto">{t("common.loading")}</div>;
  }

  if (isError) {
    return <div className="my-5 m-auto">{t("auth.errors.failBalance")}</div>;
  }

  return (
    <div className="my-5 m-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
        </div>

        <IncomeList
          transactions={incomeData}
          onDelete={(id) => {
            const selectedIncome = incomeData.find(
              (income) => income.id === id,
            );

            if (!selectedIncome) {
              toast.error(t("income.erros.incomeNotFound"));
              return;
            }

            setIncomeDelete({
              show: true,
              data: selectedIncome,
            });
          }}
          onDownload={handleDownloadIncomeData}
        />
      </div>

      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title={t("income.common.addIncome")}
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      <Modal
        isOpen={incomeDelete.show}
        onClose={() => setIncomeDelete({ show: false, data: null })}
        title={t("income.common.deleteIncome")}
      >
        <DeleteAlert
          content={t("income.common.deleteMessage")}
          onDelete={handleConfirmDelete}
        />
      </Modal>
    </div>
  );
};

export default Income;
