"use client"

import { updateDoc, doc } from "firebase/firestore"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useEffect, useState, useTransition } from "react"
import { db } from "@/firebase"
import { useDocument } from "react-firebase-hooks/firestore"

const Documents = ({ id }: { id: string }) => {
    const [data, loading, error] = useDocument(doc(db, "documents", id))
    const [input, setInput] = useState("")
    const [isUpdating, startTransition] = useTransition()

    useEffect(() => {
        if (data?.data()?.title) {
            setInput(data.data()?.title)
        }
    }, [data])

    const updateTitle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                })
            })
        }
    }


    return (
        <div>
            <div className="flex max-w-6xl mx-auto justify-between pb-5">
                <form className="flex flex-1 space-x-2 " onSubmit={updateTitle}>
                    {/* title updates */}
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <Button disabled={isUpdating} type="submit" >{isUpdating ? "Updating..." : "Update"}</Button>
                </form>
            </div>

            <div>
                {/* Manage invites and edit users */}
            </div>

            {/* Collaborative Text Editor */}
        </div>
    )
}

export default Documents