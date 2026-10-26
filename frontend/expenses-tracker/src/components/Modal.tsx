import type { ReactNode } from "react";

interface ModalData {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal = ({ children, isOpen, onClose, title }: ModalData) => {
  if (!isOpen) return null;

  return (
    <dialog
      open
      className="fixed top-0 right-0 left-0 z-99 flex justify-center items-center w-full h-[calc(100%-0rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative rounded-lg bg-slate-50 shadow-sm dark:bg-gray-900">
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-50">
              {title}
            </h3>

            <button
              type="button"
              aria-label="Fechar modal"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg
              text-gray-400 transition-colors duration-200
              hover:bg-gray-200 hover:text-gray-900
              dark:hover:bg-gray-700 dark:hover:text-slate-50"
              onClick={onClose}
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4 p-4 md:p-5">{children}</div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
