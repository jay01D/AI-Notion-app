"use client"

import { updateDoc, doc } from "firebase/firestore"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useEffect, useState, useTransition } from "react"
import { db } from "@/firebase"
import { useDocument } from "react-firebase-hooks/firestore"
import InviteUser from "./InviteUser"
import ManageUsers from "./ManageUsers"
import DeleteDocument from "./DeleteDocument"
import useOwner from "@/lib/hooks/useOwner"
import Editor from "./Editor"

const Documents = ({ id }: { id: string }) => {
  const [data, loading, error] = useDocument(doc(db, "documents", id))
  const [input, setInput] = useState("")
  const [isUpdating, startTransition] = useTransition()
  const isOwner = useOwner(id)

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
    <div className="flex-1">
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto gap-2 pb-5">
        <InviteUser roomId={id} />
        <ManageUsers roomId={id} />
        {isOwner && <DeleteDocument roomId={id} />}
      </div>

      <Editor />
    </div>
  )
}

export default Documents
