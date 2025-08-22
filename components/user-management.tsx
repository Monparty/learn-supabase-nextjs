"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function UserManagement() {
    const supabase = createClient();
    const [users, setUsers] = useState<any>([]);
    const [searchUser, setSearchUser] = useState("");
    const [page, setPage] = useState(1);
    const itemPerPages = 4;
    const [maxPage, setMaxPage] = useState(1);

    const userSupabaseQuery = () => {
        let query = supabase.from("users").select("*", { count: "exact" });

        if (searchUser) {
            query = query.like("fullname", `%${searchUser}%`);
        }

        query = query.range((page - 1) * itemPerPages, page * itemPerPages - 1);
        return query;
    };

    const fetchUsers = async () => {
        let { data: users, error, count } = await userSupabaseQuery();

        if (!users || error) {
            console.log("error", error);
        }

        setUsers(users);
        count = count || 1;
        const calcMaxPage = Math.ceil(count / itemPerPages);
        setMaxPage(calcMaxPage);
    };

    const handleSearch = (event: any) => {
        setSearchUser(event.target.value);
    };

    const search = async () => {
        let { data: userSearch, error, count } = await userSupabaseQuery();

        if (error) {
            alert("Fail to search");
            return false;
        }

        setPage(1);
        count = count || 1;
        const calcMaxPage = Math.ceil(count / itemPerPages);
        setMaxPage(calcMaxPage);
        setUsers(userSearch);
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    return (
        <div>
            <div className="flex gap-2 mb-8">
                <Input
                    type="text"
                    placeholder="Search"
                    onChange={handleSearch}
                />
                <Button
                    type="submit"
                    onClick={search}
                    className="w-fit bg-blue-600 hover:bg-blue-500"
                >
                    Search
                </Button>
            </div>
            <div className="mb-8">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                                Full name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                                Tel
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                                Attachment
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr
                                key={user.id}
                                className="odd:bg-white even:bg-gray-100"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {user.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {user.fullname}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {user.id}email
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {user.tel}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {user.attachment && (
                                        <Image
                                            src={user.attachment}
                                            className="w-16 h-16 object-cover"
                                            width={20}
                                            height={20}
                                            alt={user.fullname}
                                            unoptimized
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center gap-2 mb-8">
                <div>
                    Page: {page} / {maxPage}
                </div>
                {page > 1 && (
                    <Button
                        type="submit"
                        onClick={() => setPage(page - 1)}
                        className="w-28 bg-gray-600 hover:bg-gray-500"
                    >
                        Previous
                    </Button>
                )}
                {page < maxPage && (
                    <Button
                        type="submit"
                        onClick={() => setPage(page + 1)}
                        className="w-28 bg-gray-600 hover:bg-gray-500"
                    >
                        Next
                    </Button>
                )}
            </div>
        </div>
    );
}
