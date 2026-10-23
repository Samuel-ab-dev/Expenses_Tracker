import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../src/components/Layouts/AuthLayout";
import { useForm } from "react-hook-form";
import Input from "../../src/components/Input";
import ProfilePictureSelector from "../../src/components/ProfilePictureSelector";
import api from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPaths";
import { useUser } from "../../hooks/useUser";
import uploadImg from "../../utils/uploadImage.tsx";
import { useTranslation } from "react-i18next";
import {
  createSignUpSchema,
  type SignUpFormData,
} from "../../utils/schemas/signUpSchema.ts";
import { authErrorTranslations } from "../../src/i18n/locales/errors/errorTranslations.ts";
import { getApiTranslatedErrors } from "../../src/i18n/locales/errors/getTranslatedErrors.ts";

const SignUp = () => {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const { t } = useTranslation();

  const { updateUser } = useUser();

  const signUpSchema = createSignUpSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = async (data: SignUpFormData) => {
    setServerError("");

    try {
      const response = await api.post(API_PATHS.AUTH.REGISTER, {
        fullName: data.fullname,
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid registration response");
      }

      localStorage.setItem("token", token);

      updateUser(user);

      if (profilePic) {
        const imgUploadRes = await uploadImg(profilePic);
        if (imgUploadRes.user) {
          updateUser(imgUploadRes.user);
        }
      }

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setServerError(getApiTranslatedErrors(error, t, authErrorTranslations));
    }
  };

  return (
    <AuthLayout>
      <section className="lg:w-full h-auto md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-gray-950 ">
          {t("auth.signUp.title")}
        </h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          {t("auth.signUp.subtitle")}
        </p>

        <form onSubmit={handleSubmit(handleSignUp)}>
          <ProfilePictureSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register("fullname")}
              label={t("auth.signUp.fullName")}
              placeholder={t("auth.signUp.fullNamePlaceholder")}
              type="text"
              error={errors.fullname?.message}
            />
            <Input
              {...register("email")}
              label={t("auth.signUp.email")}
              placeholder={t("auth.signUp.emailPlaceholder")}
              type="email"
              error={errors.email?.message}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register("password")}
              label={t("auth.signUp.password")}
              placeholder={t("auth.signUp.passwordPlaceholder")}
              type="password"
              error={errors.password?.message}
            />
            <Input
              {...register("confirmPassword")}
              label={t("auth.signUp.confirmPassword")}
              placeholder={t("auth.signUp.confirmPasswordPlaceholder")}
              type="password"
              showPasswordToggle={false}
              error={errors.confirmPassword?.message}
            />
          </div>

          {serverError && (
            <p className="error" role={"alert"}>
              {serverError}
            </p>
          )}

          <div className="col-span-2">
            <button
              className="btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("common.signingUp") : t("auth.signUp.signUp")}
            </button>
            <p className="text-sm text-gray-950 mt-3.5 md:mt-3">
              {t("auth.signUp.haveAccount")}{" "}
              <Link
                className="text-primary hover:text-purple-600 underline-animation"
                to="/login"
              >
                {t("auth.signUp.login")}{" "}
              </Link>
            </p>
          </div>
        </form>
      </section>
    </AuthLayout>
  );
};

export default SignUp;
