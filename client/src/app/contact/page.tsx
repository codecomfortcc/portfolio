"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import gsap from "gsap";
import { Loader2 } from "lucide-react";

import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCreateContactMutation } from "@/services/mutations";
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should be at least 2 characters" })
    .max(50, { message: "Name should be at most 50 characters" }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  message: z
    .string()
    .min(20, {
      message: "Message should be at least 20 characters",
    })
    .max(1000, { message: "Message should be at most 1000 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const { toast } = useToast();

  // 1. Initialize Mutation
  const contactMutation = useCreateContactMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // GSAP Animation for Error Messages
  useEffect(() => {
    const formMessageElements = document.querySelectorAll(".form-message");
    if (formMessageElements.length > 0) {
      gsap.fromTo(
        formMessageElements,
        { y: -10, opacity: 0 },
        { y: -48, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.1 }
      );
    }
  }, [form.formState.errors]);

  // 2. Handle Submit
  function onSubmit(data: FormValues) {
    contactMutation.mutate(
      { contact: data },
      {
        onSuccess: () => {
          // Success Logic
          toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
            variant: "default",
          });
          form.reset(); // Clear form
        },
        onError: (error: any) => {
          // Error Logic
          console.error("Contact Error:", error);

          // Handle Validation Errors from Backend (if applicable)
          const serverErrors = error?.response?.data?.errors;
          if (serverErrors) {
            Object.keys(serverErrors).forEach((key) => {
              // @ts-ignore
              form.setError(key, {
                type: "server",
                message: serverErrors[key],
              });
            });
            toast({
              title: "Check fields",
              description: "Please correct the highlighted errors.",
              variant: "destructive",
            });
          } else {
            // Generic Error
            toast({
              title: "Error sending message",
              description:
                error?.response?.data?.message ||
                "Something went wrong. Please try again.",
              variant: "destructive",
            });
          }
        },
      }
    );
  }

  const isLoading = contactMutation.isPending;

  return (
    <main className="bg-orange-100/70 px-2 pt-10 min-h-screen">
      <MaxWidthWrapper className="py-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-gray-900">Contact</h1>
          <p className="mt-5 text-center max-w-[500px] text-gray-700 leading-relaxed">
            Got a coding conundrum or a project puzzle? Don't run for Stack
            Overflow just yet! I'm your freelance code crusader, ready to tackle
            any tech trouble. Fire away – the only bugs you'll find here are the
            ladybugs in my garden.
          </p>
        </div>

        {/* Info Text */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Get in Touch
          </h2>
          <p className="text-center max-w-[600px] mx-auto mt-4 text-gray-600">
            I am currently available for freelance projects and collaborations.
            Feel free to reach out to me using the form below or via email at{" "}
            <Link
              target="_blank"
              href="mailto:codecomfortyt@gmail.com"
              className="text-orange-600 font-medium hover:underline"
            >
              codecomfortyt@gmail.com
            </Link>
            . You can also find me on{" "}
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/yasovardhanmasani"
              className="text-orange-600 font-medium hover:underline"
            >
              LinkedIn
            </Link>
            .
          </p>
        </div>

        {/* Main Section */}
        <div className="flex justify-between mt-10 lg:flex-row mb-10 flex-col gap-10">
          {/* Left: Form */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 shadow-xl p-8 mt-4 rounded-2xl w-full max-w-[550px] relative bg-white border-2 border-orange-100/50"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-indigo-500 rounded-t-2xl" />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="text-gray-700 font-semibold">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          disabled={isLoading}
                          className="bg-orange-50/50 border-2 border-gray-200 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-md absolute left-0 -top-10 z-10 pointer-events-none before:content-[''] before:absolute before:bottom-[-6px] before:left-4 before:w-3 before:h-3 before:bg-red-500 before:rotate-45" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="text-gray-700 font-semibold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          disabled={isLoading}
                          className="bg-orange-50/50 border-2 border-gray-200 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-md absolute left-0 -top-10 z-10 pointer-events-none before:content-[''] before:absolute before:bottom-[-6px] before:left-4 before:w-3 before:h-3 before:bg-red-500 before:rotate-45" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="text-gray-700 font-semibold">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can I help you?"
                          disabled={isLoading}
                          className="bg-orange-50/50 border-2 border-gray-200 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-md absolute left-0 -top-10 z-10 pointer-events-none before:content-[''] before:absolute before:bottom-[-6px] before:left-4 before:w-3 before:h-3 before:bg-red-500 before:rotate-45" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-gray-900 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Right: Social Links */}
          <div className="flex-1 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <Card className="w-full max-w-[450px] border-2 border-gray-200 shadow-xl bg-white/80 backdrop-blur-sm h-fit">
              <CardContent className="p-8">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-orange-200 pb-4 inline-block">
                  Social Links
                </CardTitle>

                <div className="space-y-4">
                  {[
                    {
                      name: "GitHub",
                      handle: "@codecomfortcc",
                      url: "https://github.com/codecomfortcc",
                    },
                    {
                      name: "YouTube",
                      handle: "@codecomfort",
                      url: "https://youtube.com/@codecomfort",
                    },
                    {
                      name: "Discord",
                      handle: "@codecomfort",
                      url: "https://discord.gg/TsNQ8u6gYx",
                    },
                    {
                      name: "Twitter (X)",
                      handle: "@codecomfortyt",
                      url: "https://x.com/@codecomfortyt",
                    },
                  ].map((social, index) => (
                    <div key={index} className="group">
                      <Link
                        href={social.url}
                        target="_blank"
                        className="flex flex-col hover:bg-gray-50 p-3 -mx-3 rounded-lg transition-colors"
                      >
                        <span className="text-orange-600 font-bold text-lg group-hover:text-orange-700">
                          {social.name}
                        </span>
                        <span className="text-gray-500 font-medium group-hover:text-gray-700">
                          {social.handle}
                        </span>
                      </Link>
                      {index < 3 && <Separator className="mt-2 bg-gray-200" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default ContactPage;
