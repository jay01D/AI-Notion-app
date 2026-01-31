"use client"

import { LiveblocksProvider } from "@liveblocks/react/suspense"


const LiveBlocksProvider = ({ children }: { children: React.ReactNode }) => {
    if (!process.env.NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY) {
        throw new Error("Missing Liveblocks public key")
    }
    return (
        <LiveblocksProvider throttle={16} authEndpoint={"/api/liveblocks-auth"}>
            {children}
        </LiveblocksProvider>
    )
}

export default LiveBlocksProvider