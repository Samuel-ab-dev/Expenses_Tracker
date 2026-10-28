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

const toExcelDate = (value: unknown): Date | null => {
  if (value == null || value === "") {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "string") {
    const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

    if (dateOnlyMatch) {
      const [, year, month, day] = dateOnlyMatch;

      return new Date(Number(year), Number(month) - 1, Number(day), 12);
    }
  }

  const date = new Date(value as string | number);

  return Number.isNaN(date.getTime()) ? null : date;
};

const isDateFormat = (numFmt?: string): boolean => {
  if (!numFmt) {
    return false;
  }

  return /yyyy/i.test(numFmt) && /mm/i.test(numFmt) && /dd/i.test(numFmt);
};

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

  worksheet.columns = columns.map(({ header, key, width, numFmt }) => ({
    header,
    key: String(key),
    width: width ?? 18,
    ...(numFmt ? { style: { numFmt } } : {}),
  }));

  const rows = data.map((item) => {
    const row: Record<string, unknown> = {};

    for (const column of columns) {
      const value = item[column.key];

      row[String(column.key)] = isDateFormat(column.numFmt)
        ? toExcelDate(value)
        : value;
    }

    return row;
  });

  worksheet.addRows(rows);

  worksheet.getRow(1).font = { bold: true };
  worksheet.views = [{ state: "frozen", ySplit: 1 }];

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
