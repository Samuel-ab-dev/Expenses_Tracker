import { type ReactNode } from "react";

interface ModalData {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal = ({ children, isOpen, onClose, title }: ModalData) => {
  if (!isOpen) return null;

  return (
    <dialog className="fixed top-0 right-0 left-0 z-99 flex justify-center items-center w-full h-[calc(100%-0rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* modal content */}
        <div className="relative bg-slate-50 rounded-lg shadow-sm">
          {/*modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t ">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>

            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transform transition 100s cursor-pointer"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
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

          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
