"use client"
import { db } from "@/firebase"
import { doc } from "firebase/firestore"
import Link from "next/link"
import { useDocument } from "react-firebase-hooks/firestore"
import { usePathname } from "next/navigation"


const SidebarOptions = ({ href, id }: { href: string, id: string }) => {
    const pathname = usePathname()
    const [data, loading, error] = useDocument(doc(db, "documents", id));
    const isActive = href.includes(pathname) && pathname !== "/";

    if (!data) return null;

    return (
        <Link href={href} className={`border p-2 rounded-md ${isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"}`}>
            <p className="truncate">{data.data()?.title}</p>
        </Link>
    )
}

export default SidebarOptions