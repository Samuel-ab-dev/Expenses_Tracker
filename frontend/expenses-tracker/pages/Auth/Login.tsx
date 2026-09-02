import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../src/components/Layouts/AuthLayout";
import Input from "../../src/components/Input";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { error: "Email is required" })
    .pipe(z.email({ error: "Invalid email address" })),

  password: z
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
    .regex(/[0-9]/, { error: "Password must contain at least one digit (0-9)" })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Password must contain at least one special character",
    }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      console.log(data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-gray-950">Welcome back!</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          Enter details to log in
        </p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            {...register("email")}
            label="Email adress"
            placeholder="email@email.com"
            type="email"
            error={errors.email?.message}
          />
          <Input
            {...register("password")}
            label="Password"
            placeholder="Enter your password"
            type="password"
            error={errors.password?.message}
          />

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Loading" : "Log in"}
          </button>

          <p className="text-sm text-gray-950 mt-3">
            Don't have an account?{" "}
            <Link
              className="text-primary hover:text-purple-600 underline-animation"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
