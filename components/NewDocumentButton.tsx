"use client"

import { Button } from "./ui/button"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { createNewDocument } from "@/actions/actions"


const NewDocumentButton = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const handleCreateDocument = () => {
        startTransition(async () => {
            // Create a new document
            const { docId } = await createNewDocument()
            // Navigate to document
            router.push(`/doc/${docId}`)
        })
    }
    return (
        <Button onClick={handleCreateDocument} disabled={isPending}>
            {isPending ? "Creating..." : "New Document"}
        </Button>
    )
}

export default NewDocumentButton