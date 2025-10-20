"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import SocialLogin from "./SocialLogin";
import { GoLock } from "react-icons/go";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PAGE_PATHS } from "@/lib/page-path";
import { Input } from "@/components/ui/input";
import { AiOutlineMail } from "react-icons/ai";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ErrorContext } from "better-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { registerSchema } from "../schema/register.schema";
import { BookOpen, ShoppingCart, Users } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const RegisterUI = () => {

  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    await authClient.signUp.email(
      {
        callbackURL: "/",
        name: data.email,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => router.push("/"),
        onError: (ctx: ErrorContext) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };


  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 border rounded-lg bg-card overflow-hidden shadow-lg">
        {/* Left Content */}
        <div className="hidden md:flex flex-col justify-center bg-muted/40 p-8 space-y-6">
          <h2 className="text-2xl font-bold">Why join us?</h2>
          <p className="text-sm text-muted-foreground">
            Unlock the full experience — buy, sell, and share books with our growing community.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Discover Books</h3>
                <p className="text-sm text-muted-foreground">
                  Explore a wide range of academic and non-academic books.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Buy & Sell Easily</h3>
                <p className="text-sm text-muted-foreground">
                  Hassle-free buying and selling of books in just a few clicks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Join the Community</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with like-minded readers and grow your network.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Register Form */}
        <div className="flex flex-col items-center justify-center p-6">
          <div className="max-w-sm w-full">
            <div className="mb-6 text-center">
              <h1 className="text-xl font-bold">Get Started</h1>
              <p className="text-sm text-muted-foreground">
                Create an account to get started
              </p>
            </div>

            <SocialLogin />

            <div className="my-4 w-full flex items-center justify-center overflow-hidden">
              <Separator />
              <span className="text-sm px-2">OR</span>
              <Separator />
            </div>

            <Form {...form}>
              <form
                className="w-full space-y-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          startIcon={<AiOutlineMail />}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          startIcon={<GoLock />}
                          placeholder="Enter Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          startIcon={<GoLock />}
                          placeholder="Enter Confirm Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-2 w-full">
                  Continue
                </Button>
              </form>
            </Form>

            <p className="mt-5 text-sm text-center">
              Already have an account?
              <Link href={PAGE_PATHS.auth.login} className="ml-1 underline text-muted-foreground">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUI;
