import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../src/components/Layouts/AuthLayout";
import { useForm } from "react-hook-form";
import Input from "../../src/components/Input";
import ProfilePictureSelector from "../../src/components/ProfilePictureSelector";

const passwordSchema = z
  .string()
  .trim()
  .min(8, { error: "Password must be at least 8 characters long" })
  .max(128, { error: "Password can't be longer than 128 characters" })
  .regex(/[a-z]/, {
    error: "Password must contain at least one lowercase character",
  })
  .regex(/[A-Z]/, {
    error: "Password must contain at least one uppercase character",
  })
  .regex(/[0-9]/, {
    error: "Password must contain at least one digit (0-9)",
  })
  .regex(/[^a-zA-Z0-9]/, {
    error: "Password must contain at least one special character",
  });

const signUpSchema = z
  .object({
    fullname: z
      .string()
      .min(2, { error: "Name must be at least 2 characters long" })
      .max(128, { error: "Name can't be longer than 128 characters" }),

    email: z
      .string()
      .trim()
      .min(1, { error: "Email is required" })
      .pipe(z.email({ error: "Invalid email address" })),

    password: passwordSchema,
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <section className="lg:w-full h-auto md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-gray-950">
          Create an Account!
        </h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSubmit(handleSignUp)}>
          <ProfilePictureSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register("fullname")}
              label="Full Name"
              placeholder="John Doe"
              type="text"
              error={errors.fullname?.message}
            />
            <Input
              {...register("email")}
              label="Email adress"
              placeholder="email@email.com"
              type="email"
              error={errors.email?.message}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register("password")}
              label="Password"
              placeholder="Create your password"
              type="password"
              error={errors.password?.message}
            />
            <Input
              {...register("confirmPassword")}
              label="Confirm Password"
              placeholder="Please confirm your password"
              type="password"
              showPasswordToggle={false}
              error={errors.confirmPassword?.message}
            />
          </div>

          <div className="col-span-2">
            <button
              className="btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up!"}
            </button>
            <p className="text-sm text-gray-950 mt-3.5 md:mt-3">
              Already have an account?{" "}
              <Link
                className="text-primary hover:text-purple-600 underline-animation"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </section>
    </AuthLayout>
  );
};

export default SignUp;
