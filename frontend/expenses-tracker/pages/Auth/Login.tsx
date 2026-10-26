import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../src/components/Layouts/AuthLayout.tsx";
import Input from "../../src/components/Input.tsx";
import api from "../../utils/axiosInstances.tsx";
import { API_PATHS } from "../../utils/apiPaths.ts";
import { useState } from "react";
import { useUser } from "../../hooks/useUser.tsx";
import { useTranslation } from "react-i18next";
import {
  createLoginSchema,
  type LoginFormData,
} from "../../utils/schemas/loginSchema.ts";
import { authErrorTranslations } from "../../src/i18n/locales/errors/errorTranslations.ts";
import { getApiTranslatedErrors } from "../../src/i18n/locales/errors/getTranslatedErrors.ts";

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const { t } = useTranslation();

  const loginSchema = createLoginSchema(t);

  const { updateUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    setServerError(null);

    try {
      const response = await api.post(API_PATHS.AUTH.LOGIN, {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      setServerError(getApiTranslatedErrors(error, t, authErrorTranslations));
    }
  };

  return (
    <AuthLayout>
      <section className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-gray-950 dark:text-slate-50">
          {t("auth.login.title")}
        </h3>
        <p className="mt-1.25 mb-6 text-xs text-slate-700 dark:text-gray-300">
          {t("auth.login.subtitle")}
        </p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            {...register("email")}
            label={t("auth.login.email")}
            placeholder={t("auth.login.emailPlaceholder")}
            type="email"
            error={errors.email?.message}
          />

          <Input
            {...register("password")}
            label={t("auth.login.password")}
            placeholder={t("auth.login.passwordPlaceholder")}
            type="password"
            error={errors.password?.message}
          />

          {serverError && (
            <p className="error" role={"alert"}>
              {serverError}
            </p>
          )}
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? t("common.loading") : t("auth.login.submit")}
          </button>

          <p className="mt-3 text-sm text-gray-800 dark:text-gray-200">
            {t("auth.login.noAccount")}{" "}
            <Link
              className="text-primary underline-animation transition-colors hover:text-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:text-violet-300 dark:hover:text-violet-200"
              to="/signup"
            >
              {t("auth.login.signUp")}
            </Link>
          </p>
        </form>
      </section>
    </AuthLayout>
  );
};

export default Login;
