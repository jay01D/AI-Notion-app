"use client"
import Documents from "@/components/Documents"

const DocumentPage = ({ params }: { params: { id: string } }) => {
    return (
        <div className="flex flex-col flex-1 min-h-screen">
            <Documents id={params.id} />
        </div>
    )
}

export default DocumentPage