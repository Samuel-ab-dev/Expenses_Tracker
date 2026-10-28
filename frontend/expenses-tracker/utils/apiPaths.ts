const port = 3000;

export const BASE_URL = `http://localhost:${port}`;

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
    UPDATE_LOCALE: "/api/v1/auth/locale",
  },

  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },

  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeID: string) => `/api/v1/income/${incomeID}`,
    DOWNLOAD_INCOME: "/api/v1/income/downloadExcel",
  },

  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseID: string) => `/api/v1/expense/${expenseID}`,
    DOWNLOAD_EXPENSE: "/api/v1/expense/downloadExcel",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-file",
  },
};
