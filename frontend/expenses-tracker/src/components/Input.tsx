import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = props.type === "password";

    const inputType =
      isPasswordType && showPassword
        ? showPassword
          ? "text"
          : "password"
        : props.type;

    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-950 mb-3">
            {label}
          </label>
        )}
        <div className="input-box">
          <input
            ref={ref}
            {...props}
            type={inputType}
            className="w-full bg-transparent outline-none"
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FaRegEye
                  size={22}
                  className="text-purple-600 cursor-pointer transform transition duration-300 hover:scale-110 "
                />
              ) : (
                <FaRegEyeSlash
                  size={22}
                  className="text-slate-300 cursor-pointer transform transition duration-300 hover:scale-110"
                />
              )}
            </button>
          )}
        </div>
        {error && <span className="error">{error}</span>}
      </div>
    );
  },
);

export default Input;
