import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import UserManagement from "@/components/user-management";

export default async function Home() {

    return (
        <main className="min-h-screen flex flex-col items-center">
            <nav className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>Next.js Supabase Starter</Link>
                </div>
                <div className="flex gap-2">
                    <AuthButton />
                    <ThemeSwitcher />
                </div>
            </nav>
            <div>
                <UserManagement />
            </div>
        </main>
    );
}
