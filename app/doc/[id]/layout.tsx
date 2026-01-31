"use client"

import { RoomProvider } from "@liveblocks/react/suspense"
import { ClientSideSuspense } from "@liveblocks/react/suspense"

const DocLayout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) => {
  return (
    <RoomProvider id={params.id} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<p className="text-center p-10">Loading...</p>}>
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default DocLayout
