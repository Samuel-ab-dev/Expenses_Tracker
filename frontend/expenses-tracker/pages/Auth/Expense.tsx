import { useState } from "react";
import useExpense, { type ExpenseData } from "../../hooks/queries/useExpense";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPaths";
import type { AddExpenseFormData } from "../../src/components/expense/AddExpenseForm";
import { useTranslation } from "react-i18next";
import ExpenseOverview from "../../src/components/expense/ExpenseOverview";
import Modal from "../../src/components/Modal";
import AddExpenseForm from "../../src/components/expense/AddExpenseForm";
import ExpenseList from "../../src/components/expense/ExpenseList";
import exportToExcel from "../../utils/excel/exportToExcel.ts";
import { getExpenseExcelConfig } from "../../utils/excel/excelConfigs.ts";
import DeleteAlert from "../../src/assets/DeleteAlert.tsx";

const Expense = () => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();

  const [expenseDelete, setExpenseDelete] = useState<{
    show: boolean;
    data: ExpenseData | null;
  }>({ show: false, data: null });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const handleAddExpense = (expense: AddExpenseFormData) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error(t("expense.errors.categoryAmountReq"));
      return;
    }

    const numericAmount = Number(amount);

    if (
      !amount.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      toast.error(t("expense.errors.amountGtZero"));
      return;
    }

    if (!date) {
      toast.error(t("expense.errors.dateReq"));
      return;
    }

    addExpenseMutation.mutate({
      category: category.trim(),
      amount: String(numericAmount),
      date,
      icon,
    });
  };

  const addExpenseMutation = useMutation({
    mutationFn: async (expense: AddExpenseFormData) => {
      const payload = { ...expense, amount: Number(expense.amount) };

      const res = await api.post(API_PATHS.EXPENSE.ADD_EXPENSE, payload);

      return res.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["expense"],
      });

      setOpenAddExpenseModal(false);
      toast.success(t("expense.common.addExpense"));
    },

    onError: () => {
      toast.error(t("expense.error.expenseNotAdd"));
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      return res.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["expense"],
      });

      setExpenseDelete({
        show: false,
        data: null,
      });

      toast.success(t("expense.common.expenseDelete"));
    },

    onError: () => {
      toast.error(t("expense.error.expenseDeleteError"));
    },
  });

  const handleConfirmDelete = () => {
    if (deleteExpenseMutation.isPending) return;

    const id = expenseDelete.data?.id;

    if (!id) {
      toast.error(t("expense.error.expenseDeleteSelection"));
      return;
    }

    deleteExpenseMutation.mutate(id);
  };

  const handleDownloadExpenseData = async () => {
    try {
      const locale = i18n.resolvedLanguage ?? i18n.language;
      await exportToExcel({
        data: expenseData,
        ...getExpenseExcelConfig(locale),
      });
      toast.success(t("expense.common.successExpenseDownload"));
    } catch (err: unknown) {
      console.error("Failed to export data: " + err);
      toast("Failed to export data");
    }
  };

  const { data: expenseData = [], isLoading, isError } = useExpense();
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
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />
        </div>

        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => {
            const selectedExpense = expenseData.find(
              (expense) => expense.id === id,
            );

            if (!selectedExpense) {
              toast.error(t("expense.error.expenseNotFound"));
              return;
            }

            setExpenseDelete({
              show: true,
              data: selectedExpense,
            });
          }}
          onDownload={handleDownloadExpenseData}
        />
      </div>

      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title={t("expense.common.addExpense")}
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>

      <Modal
        isOpen={expenseDelete.show}
        onClose={() => setExpenseDelete({ show: false, data: null })}
        title={t("expense.common.deleteExpense")}
      >
        <DeleteAlert
          content={t("expense.common.deleteMessage")}
          onDelete={handleConfirmDelete}
        />
      </Modal>
    </div>
  );
};

export default Expense;
