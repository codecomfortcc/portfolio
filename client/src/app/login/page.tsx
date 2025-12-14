"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
const formSchema = z.object({
  email: z.string().email({
    message: "please enter valid email address",
  }),
});
export default function LoginPage() {
  const { login, isLoginPending } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
   
    login(data.email,{
      onSuccess: () => {
        router.push(`/verify?email=${encodeURIComponent(data.email)}`);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || "Something went wrong";
        form.setError("email", {
          type: "manual",
          message: message,
        });
      },
    });
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-100/70">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-orange-200 p-10 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive an OTP
          </p>
        </div>
        <Form {...form}>
          <form
            className="mt-8 space-y-6"
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
                      required
                      className="bg-orange-100/70 border-[3px] border-dashed border-gray-500 "
                      placeholder="Email address"
                    />
                  </FormControl>
                  <FormMessage className="form-message bg-red-400 text-center text-white transition-all duration-200 absolute px-3 py-2 -top-12 w-full  left-0 rounded-lg z-30" />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoginPending} className="w-full">
              {isLoginPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
