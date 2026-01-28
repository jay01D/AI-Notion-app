"use client"

import { useUser, Show, SignInButton, UserButton } from "@clerk/nextjs"

const Header = () => {
    const { user } = useUser()

    return (
        <div className="flex items-center justify-between p-5">
            {user && (
                <h1 className="text-2xl">{user?.firstName}{`'s`} Space</h1>
            )}

            {/* Breadcrumb */}

            <div>
                <Show when="signed-out">
                    <SignInButton />
                </Show>

                <Show when="signed-in">
                    <UserButton />
                </Show>
            </div>



        </div>
    )
}

export default Header