"use client";

import { useAuth } from "@/providers/auth-provider";
import { Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
  otp: z.string().length(6, {
    message: "OTP must be exactly 6 digits",
  }),
});

export default function VerifyPage() {
  const { verifyOtp, isVerifyPending } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    verifyOtp(data.otp);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-100/70">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-orange-200 p-10 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Check your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We sent a 6-digit code. Enter it below.
          </p>
        </div>

        <Form {...form}>
          <form
            className="mt-8 space-y-6 flex flex-col items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="sr-only">OTP Code</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      suppressHydrationWarning
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="h-12 w-12 border-gray-400 bg-orange-100/50 text-lg shadow-sm"
                        />
                        <InputOTPSlot
                          index={1}
                          className="h-12 w-12 border-gray-400 bg-orange-100/50 text-lg shadow-sm"
                        />
                        <InputOTPSlot
                          index={2}
                          className="h-12 w-12 border-gray-400 bg-orange-100/50 text-lg shadow-sm"
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={3}
                          className="h-12 w-12 border-gray-400 bg-orange-100/50 text-lg shadow-sm"
                        />
                        <InputOTPSlot
                          index={4}
                          className="h-12 w-12 border-gray-400 bg-orange-100/50 text-lg shadow-sm"
                        />
                        <InputOTPSlot
                          index={5}
                          className="h-12 w-12 border-gray-400 bg-orange-100/50 text-lg shadow-sm"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-red-500 font-medium pt-2" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isVerifyPending}
              className="w-full mt-4"
            >
              {isVerifyPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Verify Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
