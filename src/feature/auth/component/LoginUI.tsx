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
import { loginSchema } from "../schema/login.schema";
import { Lock, BookOpen, Users } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const LoginUI = () => {

  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await authClient.signIn.email(
      {
        callbackURL: "/",
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
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="text-sm text-muted-foreground">
            Log in to continue buying, selling, and sharing books with our community.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Secure Login</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is safe with encrypted login and secure sessions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Access Your Library</h3>
                <p className="text-sm text-muted-foreground">
                  Continue exploring books you saved or purchased earlier.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Stay Connected</h3>
                <p className="text-sm text-muted-foreground">
                  Engage with readers and sellers from across the community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="flex flex-col items-center justify-center p-6">
          <div className="max-w-sm w-full">
            <div className="my-4 mb-6 text-center">
              <h1 className="text-xl font-bold">Welcome Back</h1>
              <p className="text-sm text-muted-foreground">
                Please login to continue
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
                          placeholder="Password"
                          startIcon={<GoLock />}
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
              Don’t have an account?
              <Link href={PAGE_PATHS.auth.register} className="ml-1 underline text-muted-foreground">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;
