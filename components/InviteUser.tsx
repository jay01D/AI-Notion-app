"use client"

import { useState, useTransition } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { inviteUser } from "@/actions/actions"

const InviteUser = ({ roomId }: { roomId: string }) => {
  const [email, setEmail] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    startTransition(async () => {
      await inviteUser(roomId, email)
      setEmail("")
      setIsOpen(false)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Invite</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a user to collaborate</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleInvite} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InviteUser
