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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const features = [
    "Search by location, budget & diet",
    "Compare menus, timings & ratings",
    "Subscribe digitally — no more haggling",
    "Get notified about deals & changes",
    "Zero commission on subscriptions",
];

const page = () => {
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

                <form className="flex flex-col gap-2 w-full ">
                    <FieldGroup>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="email-1">Email Address</FieldLabel>
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
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-stone-600 dark:text-stone-400 gap-2">
                            <Checkbox id="remember-me"  />Remember me for 30 days
                        </div>
                            <p className="text-sm text-stone-600 dark:text-stone-400 text-right">
                                Forgot your password?
                            </p>
                    </div>
                    <Button type="submit" className="w-full py-5 mt-3">
                        Login in to MessLoc
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

export default page;
