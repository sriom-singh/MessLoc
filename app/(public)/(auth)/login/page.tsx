"use client";

import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthService } from "@/services/auth_service";
import { useAuth } from "@/providers/authProvider";

// const features = [
//     "Search by location, budget & diet",
//     "Compare menus, timings & ratings",
//     "Subscribe digitally — no more haggling",
//     "Get notified about deals & changes",
//     "Zero commission on subscriptions",
// ];

// ---- Zod schema ----
const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Page = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const [rememberMe, setRememberMe] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setServerError(null);
        setIsSubmitting(true);
        try {
            const res = await login(data);
            console.log(res)

            router.push("/");
        } catch (error: unknown) {
            const loginError = error as {
                response?: {
                    data?: {
                        message?: string;
                    };
                };
            };

            if (
                loginError.response?.data?.message &&
                typeof loginError.response.data.message === "string"
            ) {
                setServerError(loginError.response.data.message);
            } else if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError("Login failed");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="md:px-24 px-6 flex justify-center   w-full h-full items-center mt-4  flex-col">

            <div className="flex flex-col border items-center mb-10 gap-10 pt-8 min-w-lg rounded-2xl justify-center pb-10 p-4 px-8 min-h-min">
                <div className="flex flex-col items-center text-center  w-full">
                    <Image src="/logosmall.svg" alt="Logo" width={90} height={90} className='mb-8' />
                    <h1 className={" text-3xl  w-full  font-semibold"}>Welcome Back👋</h1>
                    <p className="text-sm w-full text-stone-600 mt-2 dark:text-stone-400">
                        Please fill the details to Login in to your account
                    </p>
                </div>

                {serverError && (
                    <div className="w-full rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
                        {serverError}
                    </div>
                )}

                <form
                    className="flex flex-col gap-2 w-full "
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <FieldGroup>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="email-1">Email Address</FieldLabel>
                            <Input
                                className="py-5 px-3 text-md"
                                id="email-1"
                                type="email"
                                placeholder="peduarte@gmail.com"
                                {...register("email")}
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </Field>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="password-1">Password</FieldLabel>
                            <Input
                                className="py-5 px-3 text-md"
                                id="password-1"
                                type="password"
                                placeholder="********"
                                {...register("password")}
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </Field>
                    </FieldGroup>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-stone-600 dark:text-stone-400 gap-2">
                            <Checkbox
                                id="remember-me"
                                checked={rememberMe}
                                onCheckedChange={(checked) => {
                                    const value = checked === true;
                                    setRememberMe(value);
                                    setValue("rememberMe", value);
                                }}
                            />
                            Remember me for 30 days
                        </div>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-stone-600 dark:text-stone-400 text-right hover:text-primary"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Button type="submit" className="w-full py-5 mt-3" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login in to MessLoc"}
                    </Button>
                    <p className="text-sm text-center mt-1 text-stone-600 dark:text-stone-400 ">
                        Don&apos;t have an account?{" "}
                        <Link href={'signup'} className="text-primary cursor-pointer">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Page;