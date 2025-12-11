import { z } from "zod"

// Regex patterns
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const PHONE_MAROC_REGEX = /^(?:(?:\+|00)212|0)[5-7]\d{8}$/
export const CIN_REGEX = /^[A-Z]{1,2}[0-9]{6}$/
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// Zod schemas
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email").regex(EMAIL_REGEX, "Invalid email format"),
    phone: z.string().regex(PHONE_MAROC_REGEX, "Please provide a valid Moroccan phone number"),
    password: z
      .string()
      .min(8)
      .regex(PASSWORD_REGEX, "Password must contain uppercase, lowercase, number, and special character"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().regex(EMAIL_REGEX),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(2000),
  type: z.enum(["general", "partnership", "volunteer", "donation"]),
})

export const loginSchema = z.object({
  email: z.string().email().regex(EMAIL_REGEX),
  password: z.string().min(1, "Password is required"),
})
