import ExcelJS from "exceljs";

export interface ExcelColumn<T> {
  header: string;
  key: keyof T;
  width?: number;
  numFmt?: string;
}

export interface ExportToExcelOptions<T> {
  data: T[];
  sheetName: string;
  fileName: string;
  columns: ExcelColumn<T>[];
}

const exportToExcel = async <T extends object>({
  data,
  sheetName,
  fileName,
  columns,
}: ExportToExcelOptions<T>): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  workbook.creator = "Expense Tracker";
  workbook.created = new Date();

  worksheet.columns = columns.map(({ header, key, width }) => ({
    header,
    key: String(key),
    width: width ?? 18,
  }));

  worksheet.addRows(
    data.map((i) => {
      const row: Record<string, unknown> = {};

      for (const column of columns) {
        const value = i[column.key];

        row[String(column.key)] =
          column.numFmt === "dd/mm/yyyy"
            ? value == null || value == ""
              ? null
              : new Date(value as string | number | Date)
            : value;
      }

      return row;
    }),
  );

  columns.forEach(({ key, numFmt }) => {
    if (numFmt) {
      worksheet.getColumn(String(key)).numFmt = numFmt;
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName.endsWith(".xlsx") ? fileName : `${fileName}.xlsx`;
  link.click();

  setTimeout(() => URL.revokeObjectURL(url), 0);
};

export default exportToExcel;
