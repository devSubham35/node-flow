"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { GoLock } from "react-icons/go";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PAGE_PATHS } from "@/lib/page-path";
import { Input } from "@/components/ui/input";
import { AiOutlineMail } from "react-icons/ai";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ErrorContext } from "better-auth/react";
import { loginSchema } from "../schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="w-[90%] max-w-sm shadow-md rounded-xl border border-border">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Please login to continue</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <SocialLogin />

        <div className="flex items-center justify-center overflow-hidden">
          <Separator className="w-full" />
          <span className="px-2 text-sm text-muted-foreground">OR</span>
          <Separator className="w-full" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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

            <Button type="submit" className="w-full mt-2">
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don’t have an account?
          <Link
            href={PAGE_PATHS.auth.register}
            className="ml-1 underline hover:text-foreground"
          >
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginUI;
