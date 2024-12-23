import { z } from "zod";

const UserAccountFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default UserAccountFormSchema;

export type UserAccountFormSchemaType = z.infer<typeof UserAccountFormSchema>;
