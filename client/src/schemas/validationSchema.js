// src/schemas/validationSchema.js
import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});


export const todoSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 character long." }),
  description: z.string().min(3, { message: "Description must be at least 3 character long." }).max(500, { message: 'Lenght acceeded.' }),
  status: z.enum(['Pending', 'Completed'])
})