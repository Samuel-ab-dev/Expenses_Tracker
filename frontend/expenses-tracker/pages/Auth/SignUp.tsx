import React, { useState } from "react";
import { z } from "zod";
import AuthLayout from "../../src/components/Layouts/AuthLayout";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const signUpSchema = z.object({
    name: z
      .string()
      .min(2, { error: "Name must be at least 2 characters long" })
      .max(128, { error: "Name can't be longer than 128 characters" }),

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
      .regex(/[0-9]/, {
        error: "Password must contain at least one digit (0-9)",
      })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Password must contain at least one special character",
      }),
  });

  return (
    <div>
      <AuthLayout>
        <div className="">
          <h3>Create an Account!</h3>
          <p>Join us today by entering your details below.</p>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
