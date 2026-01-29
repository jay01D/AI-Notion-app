"use client"

import { MenuIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useUser } from "@clerk/nextjs"
import { useCollection } from "react-firebase-hooks/firestore"
import { collectionGroup, query, where } from "firebase/firestore"
import { db } from "@/firebase"
import { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore"
import SidebarOptions from "./SidebarOptions"

interface RoomDocument extends DocumentData {
    createdAt: Date;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
}

const Sidebar = () => {
    const { user } = useUser()
    const [groupedData, setGroupedData] = useState<{ owner: RoomDocument[], editor: RoomDocument[] }>({
        owner: [],
        editor: []
    })
    const [data, loading, error] = useCollection(
        user && (
            query(collectionGroup(db, "rooms"),
                where("userId", "==", user.emailAddresses[0].toString()))
        )
    );

    useEffect(() => {
        if (!data) return
        const grouped = data.docs.reduce<{ owner: RoomDocument[], editor: RoomDocument[] }>((acc, doc) => {
            const roomData = doc.data() as RoomDocument
            if (roomData.role === "owner") {
                acc.owner.push({ id: doc.id, ...roomData })
            } else {
                acc.editor.push({ id: doc.id, ...roomData })
            }
            return acc
        }, { owner: [], editor: [] })

        setGroupedData(grouped)

    }, [data])

    const menuOptions = (
        <>
            <NewDocumentButton />
            <div className="flex py-4 flex-col space-y-4 md:max-w-36">
                {/* All Documents */}
                {groupedData.owner.length === 0 ? (
                    <h2 className="text-gray-500 font-semibold text-sm">No Documents</h2>
                ) : (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
                        {groupedData.owner.map((doc) => (
                            <SidebarOptions key={doc.roomId} href={`/doc/${doc.roomId}`} id={doc.roomId} />
                        ))}
                    </>
                )}
            </div>

            {/* Shared Documents */}
            {groupedData.editor.length > 0 && (
                <>
                    <h2 className="text-gray-500 font-semibold text-sm">Shared Documents</h2>
                    {groupedData.editor.map((doc) => (
                        <SidebarOptions key={doc.roomId} href={`/doc/${doc.roomId}`} id={doc.roomId} />
                    ))}
                </>
            )}
        </>
    )

    return (
        <div className="p-2 md:p-5 bg-gray-200 relative">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <div>{menuOptions}</div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden md:inline">
                {menuOptions}
            </div>
        </div>
    )
}

export default Sidebar