import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/sectionLabel";

const features = [
    "Search by location, budget & diet",
    "Compare menus, timings & ratings",
    "Subscribe digitally — no more haggling",
    "Get notified about deals & changes",
    "Zero commission on subscriptions",
];

const page = () => {
    return (
        <div className="md:px-24 px-6 flex justify-center   w-full h-full items-center mt-4  flex-col md:flex-row">
            {/* <div className="hidden md:flex flex-col flex-1 shadow w-full h-[80dvh] px-8 p-4 max-w-2xl justify-center rounded-l-2xl bg-primary/10" >

                <div className="flex w-full flex-col items-center">
                    <Image
                        src="/logosmall.svg"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="mb-2"
                    />
                    <h1
                        className={
                            " text-2xl leading-5.5 flex font-semibold flex-col gap-0"
                        }
                    >
                        MessLoc
                    </h1>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div>
                        <h3 className="text-2xl font-bold">500+</h3>
                        <p className="text-sm">Messes</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">10K+</h3>
                        <p className="text-sm">Students</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">50+</h3>
                        <p className="text-sm">Cities</p>
                    </div>
                </div>
                <span className="mt-4">
                    <SectionLabel>Features</SectionLabel>
                </span>
                <div className="flex flex-col gap-2 ">
                    {features.map((item) => (
                        <div key={item} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-orange-500/15 flex items-center justify-center shrink-0">
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#F97316"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <p className=" ">{item}</p>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="hidden md:flex flex-col flex-1  w-full h-[80dvh]  max-w-2xl justify-center rounded-l-2xl" >
                <Image
                    src="/login-side.jpg"
                    alt="Login Image"
                    width={800}
                    height={800}
                    className="rounded-l-2xl object-cover w-full h-full"
                />
            </div>
            <div className="flex flex-col bg-gradient-to-br from-orange-50 via-orange-100 to-white
dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 items-center gap-10 pt-8 min-w-lg md:rounded-r-2xl justify-center py-16 p-4 px-8 min-h-min h-[80dvh]">
                <div className="flex flex-col items-center text-center  w-full">
                    {/* <Image src="/logosmall.svg" alt="Logo" width={90} height={90} className='mb-4' /> */}
                    <h1 className={" text-3xl  w-full  font-semibold"}>Welcome Back👋</h1>
                    <p className="text-sm w-full text-stone-600 mt-2 dark:text-stone-400">
                        Please fill the details to Login in to your account
                    </p>
                </div>

                <form className="flex flex-col gap-4 w-full ">
                    <FieldGroup>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="email-1">Email</FieldLabel>
                            <Input
                                className="py-5 px-3 text-md"
                                id="email-1"
                                name="email"
                                placeholder="peduarte@gmail.com"
                            />
                        </Field>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="password-1">Password</FieldLabel>
                            <Input
                                className="py-5 px-3 text-md"
                                id="password-1"
                                name="password"
                                placeholder="********"
                            />
                        </Field>
                    </FieldGroup>
                    <p className="text-sm text-stone-600 dark:text-stone-400 text-right">
                        Forgot your password?
                    </p>
                    <Button type="submit" className="w-full py-5 mt-4">
                        Login
                    </Button>
                    <p className="text-sm text-stone-600 dark:text-stone-400 text-center">
                        Don&apos;t have an account?{" "}
                        <span className="text-primary cursor-pointer">Sign up</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default page;
