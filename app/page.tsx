"use client"
import { useFormState } from "react-dom";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { register } from "./action";

const initialState = {
    success: false,
    message: null
}

export default function Home() {
    const [state, formAction] = useFormState(register, initialState);

    return (
        <main className="min-h-screen flex flex-col items-center">
            <nav className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>Next.js Supabase Starter</Link>
                </div>
                <div className="flex gap-2">
                    {/* {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />} */}
                    <ThemeSwitcher />
                </div>
            </nav>
            <div className="border p-4 rounded-lg w-2/5">
                <h1 className="mb-2 text-xl">Register Form</h1>
                <form action={formAction} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="fullname">fullname</Label>
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="fullname"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="Email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="fullname">Tel</Label>
                        <Input
                            type="number"
                            name="tel"
                            placeholder="Tel"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="fullname">File</Label>
                        <Input
                            type="file"
                            name="attachment"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-500"
                    >
                        Register
                    </Button>
                    {state.message && (
                        <div className="bg-red-600 p-3 text-white rounded-lg">Error: {state.message}</div>
                    )}
                    {state.success && (
                        <div className="bg-green-600 p-3 text-white rounded-lg">Register Success</div>
                    )}
                </form>
            </div>
        </main>
    );
}
