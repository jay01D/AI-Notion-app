"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { deleteDocument } from "@/actions/actions"

const DeleteDocument = ({ roomId }: { roomId: string }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteDocument(roomId)
      router.replace("/")
    })
  }

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  )
}

export default DeleteDocument
