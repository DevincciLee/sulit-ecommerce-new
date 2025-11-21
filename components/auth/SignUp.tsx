"use client";

import { client } from "@/api/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAuth from "@/hook/useAuth";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

type Emails = {
  email: string;
};

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [emails, setEmails] = useState<Emails[]>([]);
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const { data: emailsFetchData, error: emailsFetchError } = await client.rpc(
      "get_all_user_emails"
    );

    if (emailsFetchError) {
      console.error("Error fetching emails:", emailsFetchError.message);
      toast.error("Unable to check existing users.");
      return;
    }

    // Map RPC result into array of { email }
    const mapEmails = emailsFetchData.map((em: { email: string }) => ({
      email: em.email,
    }));
    setEmails(mapEmails);

    // Check if entered email already exists
    const emailExists = mapEmails.some(
      (em: { email: string }) => em.email === email
    );

    if (emailExists) {
      toast.error("This email is already registered. Please log in instead.");
      return;
    }

    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast.error(error.message || "Unable to sign up, please try again.");
      return;
    }

    toast.success("Success! Please check your email for verification!");
    setTimeout(() => {
      redirect("/");
    }, 3000);

    /* if (error) {
      if (error.message.includes("already registered")) {
        toast.error("This email is already registered. Please log in instead.");
      } else {
        toast.error(error.message || "Unable to sign up, please try again.");
      }
      return;
    }*/

    /* if (!data) {
      toast.error("Unable to sign up, please try again.");
    } else {
      toast.success("Success! Please check your email for verification!");
      setTimeout(() => {
        redirect("/");
      }, 3000);
    }*/
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              <Input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="John Doe..."
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" name="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                name="confirmPassword"
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
