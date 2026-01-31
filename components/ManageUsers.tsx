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
import { removeUser } from "@/actions/actions"
import { useUser } from "@clerk/nextjs"
import { useCollection } from "react-firebase-hooks/firestore"
import { collectionGroup, query, where } from "firebase/firestore"
import { db } from "@/firebase"
import useOwner from "@/lib/hooks/useOwner"

const ManageUsers = ({ roomId }: { roomId: string }) => {
  const { user } = useUser()
  const isOwner = useOwner(roomId)
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const [usersInRoom] = useCollection(
    query(collectionGroup(db, "rooms"), where("roomId", "==", roomId))
  )

  const handleRemove = (email: string) => {
    startTransition(async () => {
      await removeUser(roomId, email)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Users ({usersInRoom?.docs.length || 0})</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with access</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {usersInRoom?.docs.map((doc) => {
            const data = doc.data()
            return (
              <div
                key={data.userId}
                className="flex items-center justify-between p-2 rounded-md border"
              >
                <div>
                  <p className="text-sm font-medium">{data.userId}</p>
                  <p className="text-xs text-gray-500">{data.role}</p>
                </div>
                {isOwner &&
                  data.userId !== user?.emailAddresses[0].toString() && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(data.userId)}
                      disabled={isPending}
                    >
                      {isPending ? "Removing..." : "Remove"}
                    </Button>
                  )}
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ManageUsers
