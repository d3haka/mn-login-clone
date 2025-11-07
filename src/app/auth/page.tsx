"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toEnglishNumber, toPersianNumber } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, { error: "شماره همراه را وارد نمایید" })
    .refine(val => /^[۰-۹]{10}$/.test(val), { error: "شماره همراه صحیح نمی‌باشد" })
    .transform(val => toEnglishNumber(val)),
});
type PhoneSchema = z.infer<typeof phoneSchema>;

const emailSchema = z.object({
  email: z
    .string()
    .min(1, { error: "ایمیل را وارد نمایید" })
    .email({ error: "ایمیل صحیح نمی‌باشد" }),
  pass: z.string().min(6, { error: "رمزعبور باید حداقل ۶ کاراکتر باشد" }),
});

type EmailSchema = z.infer<typeof emailSchema>;

export default function AuthPage() {
  const [tabValue, setTabValue] = useState<"phone" | "email">("phone");
  const [code, setCode] = useState("98");

  const emailForm = useForm({
    defaultValues: {
      email: "",
      pass: "",
    } satisfies EmailSchema as EmailSchema,
    validators: {
      onSubmit: emailSchema,
    },
    onSubmit: async ({ value }) => {
      const valParsed = emailSchema.safeParse(value);
      if (valParsed.success) {
        phoneForm.reset();
        toast.success("Email & pass was sent successfully.", {
          description: (
            <span className="text-foreground">
              {JSON.stringify(
                {
                  email: valParsed.data.email,
                  password: valParsed.data.pass,
                },
                null,
                2,
              )}
            </span>
          ),
          className: "whitespace-pre-wrap font-mono text-black",
        });
      } else {
        toast.error("Failed to send email & pass.", {
          className: "whitespace-pre-wrap font-mono text-destructive",
        });
      }
      //
    },
  });

  const phoneForm = useForm({
    defaultValues: {
      phone: "",
    } satisfies PhoneSchema as PhoneSchema,
    validators: {
      onSubmit: phoneSchema,
    },
    onSubmit: async ({ value }) => {
      const valParsed = phoneSchema.safeParse(value);
      if (valParsed.success) {
        const phoneNumberWithCode = `${code}-${valParsed.data.phone}`;
        phoneForm.reset();
        toast.success("Phone number was sent successfully.", {
          description: <span className="text-foreground">{phoneNumberWithCode}</span>,
          className: "whitespace-pre-wrap font-mono text-black",
        });
      } else {
        toast.error("Failed to send phone number.", {
          className: "whitespace-pre-wrap font-mono text-destructive",
        });
      }
      //
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleKeyDown(event: any) {
    const key = event.key;
    const keyCode = event.keyCode;

    // Allow: backspace, delete, tab, escape, enter, and arrows
    if (
      [8, 9, 13, 27, 37, 38, 39, 40].includes(keyCode) ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (keyCode === 65 && event.ctrlKey) ||
      (keyCode === 67 && event.ctrlKey) ||
      (keyCode === 86 && event.ctrlKey) ||
      (keyCode === 88 && event.ctrlKey)
    ) {
      return;
    }

    // Allow: 0-9 (keyboard)
    if (keyCode >= 48 && keyCode <= 57) {
      return;
    }

    // Allow: ۰-۹ (Persian digits)
    if (["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"].includes(key)) {
      return;
    }

    // Prevent all other keys
    event.preventDefault();
  }

  return (
    <div className="min-h-[200px] w-full max-w-[600px] space-y-6 px-4">
      <div className="text-center text-[24px] font-bold">ورود / ثبت نام</div>

      <Tabs
        defaultValue={tabValue}
        onValueChange={e => setTabValue(e as "phone" | "email")}
      >
        <TabsList className="relative">
          <TabsTrigger isActive={tabValue === "phone"} value="phone">
            شماره همراه
          </TabsTrigger>
          <TabsTrigger isActive={tabValue === "email"} value="email">
            ایمیل
          </TabsTrigger>
        </TabsList>
        <TabsContent value="phone">
          <form
            onSubmit={e => {
              e.preventDefault();
              phoneForm.handleSubmit();
            }}
          >
            <FieldGroup>
              <phoneForm.Field name="phone">
                {field => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel dir="rtl" htmlFor={field.name}>
                        شماره تماس:
                      </FieldLabel>

                      <div className="flex">
                        <Select onValueChange={e => setCode(e)} value={code}>
                          <SelectTrigger className="-mr-px w-[100px] rounded-none">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* <SelectLabel>Fruits</SelectLabel> */}
                              <SelectItem value="98" data-selected={code === "98"}>
                                <span className="flex w-[60px] items-center justify-between">
                                  +۹۸
                                  <Image src="/ir.png" alt="icon" width={24} height={24} />
                                </span>
                              </SelectItem>
                              <SelectItem value="93" data-selected={code === "93"}>
                                <span className="flex w-[60px] items-center justify-between">
                                  +۹۳
                                  <Image src="/af.png" alt="icon" width={24} height={24} />
                                </span>
                              </SelectItem>
                              <SelectItem value="90" data-selected={code === "90"}>
                                <span className="flex w-[60px] items-center justify-between">
                                  +۹۰
                                  <Image src="/tr.png" alt="icon" width={24} height={24} />
                                </span>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={e =>
                            field.handleChange(toPersianNumber(e.target.value))
                          }
                          onBlur={field.handleBlur}
                          onKeyDown={handleKeyDown}
                          aria-invalid={isInvalid}
                          placeholder="شماره تماس"
                          className="placeholder:text-sm"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError
                          className="text-right text-xs"
                          errors={[field.state.meta.errors[0]]}
                        />
                      )}
                    </Field>
                  );
                }}
              </phoneForm.Field>
            </FieldGroup>
          </form>
        </TabsContent>

        <TabsContent value="email">
          <form
            onSubmit={e => {
              e.preventDefault();
              emailForm.handleSubmit();
            }}
          >
            <FieldGroup className="gap-1">
              <emailForm.Field name="email">
                {field => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel dir="rtl" htmlFor={field.name}>
                        ایمیل:
                      </FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        placeholder="ایمیل"
                        className="placeholder:text-right placeholder:text-sm"
                      />
                      {isInvalid && (
                        <FieldError
                          className="text-right text-xs"
                          errors={[field.state.meta.errors[0]]}
                        />
                      )}
                    </Field>
                  );
                }}
              </emailForm.Field>

              <emailForm.Field name="pass">
                {field => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel dir="rtl" htmlFor={field.name}>
                        رمزعبور:
                      </FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        placeholder="رمزعبور"
                        className="placeholder:text-right placeholder:text-sm"
                        type="password"
                      />
                      {isInvalid && (
                        <FieldError
                          className="text-right text-xs"
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              </emailForm.Field>
            </FieldGroup>
          </form>
        </TabsContent>
      </Tabs>

      <Button
        className="bg-primary h-10 w-full cursor-pointer pb-3"
        onClick={() => {
          if (tabValue === "phone") phoneForm.handleSubmit();
          else emailForm.handleSubmit();
        }}
      >
        ورود
      </Button>
    </div>
  );
}
