'use client'
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod"
import gsap from "gsap";
import { Github, Youtube } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import z from 'zod'
const formSchema=z.object({
  name:z.string().min(2,
    {message:"Name should be at least 2 character"}
  ).max(50,
    {message:"Name should be at most 50 characters"}
  ),
  email:z.string().email({
    message:"please enter valid email address"
  }),
  message:z.string().min(20,{
    message:"Message should be at least 20 characters"
  }).max(1000,
    {message:"Message should be at most 1000 characters"}
  ),
})
const ContactPage = () => {
  const {toast}=useToast()
    const form =useForm<z.infer<typeof formSchema>>({
      resolver:zodResolver(formSchema),
      defaultValues:{
        name:"",
        email:"",
        message:""
      }
    })
    function onSubmit(data:z.infer<typeof formSchema>){
      console.log(data)
    }
    useEffect(() => {
      const formMessageElements = document.querySelectorAll('.form-message');
      formMessageElements.forEach((el) => {
        gsap.from(el, { y:-50,opacity:0,duration: 0.5, ease: "power2.out"});
      });
    }, [form.formState.errors]);

  return (
    <main className="bg-orange-100/70  px-2 pt-10">
      <MaxWidthWrapper className="py-10 ">
        {/* contact page main information to say to viewers */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="mt-5 text-center max-w-[500px]">
            Got a coding conundrum or a project puzzle? Don't run for Stack Overflow just yet! I'm your freelance code crusader, ready to tackle any tech trouble. Fire away – the only bugs you'll find here are the ladybugs in my garden.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center">Get in Touch</h2>
          <p className="text-center max-w-[600px] mx-auto mt-4">
            I am currently available for freelance projects and collaborations. Feel free to reach out to me using the form below or via email at <Link target="blank" href="mailto:your-email@example.com" className="text-blue-500">codecomfortyt@gmail.com</Link>. You can also find me on <Link target="blank" href="https://www.linkedin.com/in/yasovardhanmasani" className="text-blue-500">LinkedIn</Link>.
          </p>
        </div>
       
          <div className='flex items-center mt-10 justify-center '>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 shadow-md p-6 mt-10 rounded-lg min-w-full  md:min-w-[500px] relative bg-orange-200  ">
        <FormField
          control={form.control}
          name="name"
          render={({ field,}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" className="bg-orange-100/70 border-[3px] border-dashed border-gray-500 " {...field} />
              </FormControl>
            <FormMessage className='form-message bg-red-400 text-center text-white transition-all duration-200 absolute px-3 py-2 -top-12 w-full  left-0 rounded-lg z-30'/>
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field,fieldState}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" className="bg-orange-100/70 border-[3px] border-dashed border-gray-500 " {...field} />
              </FormControl>
              <FormMessage className='form-message bg-red-400 text-center text-white transition-all duration-200 absolute px-3 py-2 -top-12 w-full  left-0 rounded-lg  z-20'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Message" className="bg-orange-100/70 border-[3px] border-dashed border-gray-500 resize-none " {...field} />
              </FormControl>
              <FormMessage className='form-message bg-red-400 text-center text-white transition-all duration-200 absolute px-3 py-2 -top-12 w-full   left-0 rounded-lg  z-10 '/>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
          </div>
          <div className="flex w-full p-2 mt-10 justify-center ">
        <Card className="border  w-full max-w-[500px] border-gray-600">
                <CardContent>
                  <CardTitle className="text-3xl py-1 mt-2  font-bold  text-foreground">
                    Links
                  </CardTitle>
                  <CardDescription className="py-4">
                    <Link
                      href="https://github.com/yashovardhannagasiva"
                      target="blank"
                      className="text-primary font-semibold mb-2 w-full"
                    >
                      GitHub
                      <span className="text-foreground font-normal block">
                        @yashovardhannagasiva
                      </span>
                    </Link>
                  </CardDescription>
                  <Separator className=" bg-gray-600" />
                  <CardDescription className="py-4">
                    <Link
                      href="https://youtube.com/@codecomfort"
                      target="blank"
                      className="text-primary font-semibold mb-2 w-full"
                    >
                      Youtube
                      <span className="text-foreground font-normal block">
                        @codecomfort
                      </span>
                    </Link>
                  </CardDescription>
                  <Separator className=" bg-gray-600" />
                  <CardDescription className="py-4">
                    <Link
                      href="https://discord.gg/TsNQ8u6gYx"
                      target="blank"
                      className="text-primary font-semibold mb-2 w-full"
                    >
                      Discord
                      <span className="text-foreground font-normal block">
                        @codecomfort
                      </span>
                    </Link>
                  </CardDescription>
                  <Separator className=" bg-gray-600" />
                  <CardDescription className="py-4">
                    <Link
                      href="https://x.com/@codecomfortyt"
                      target="blank"
                      className="text-primary font-semibold mb-2 w-full"
                    >
                      Twitter (X)
                      <span className="text-foreground font-normal block">
                        @codecomfortyt
                      </span>
                    </Link>
                  </CardDescription>
                </CardContent>
              </Card>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default ContactPage;
