"use client"

import { BlockNoteView } from "@blocknote/ariakit"
import { useCreateBlockNote } from "@blocknote/react"
import { useLiveblocksExtension } from "@liveblocks/react-blocknote"
import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/ariakit/style.css"
import "@liveblocks/react-tiptap/styles.css"
import "@liveblocks/react-blocknote/styles.css"

const Editor = () => {
  const liveblocks = useLiveblocksExtension()
  const [summary, setSummary] = useState("")
  const [isPending, startTransition] = useTransition()

  const editor = useCreateBlockNote({
    _tiptapOptions: {
      extensions: [liveblocks],
    },
  })

  const handleSummarize = () => {
    const blocks = editor.document
    const text = blocks
      .map((block) => {
        const content = block.content
        if (!content || !Array.isArray(content)) return ""
        return content.map((c) => ("text" in c ? c.text : "")).join("")
      })
      .filter(Boolean)
      .join("\n")

    startTransition(async () => {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      })
      const data = await res.json()
      setSummary(data.summary)
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-end mb-3">
        <Button
          variant="outline"
          onClick={handleSummarize}
          disabled={isPending}
          size="sm"
        >
          {isPending ? "Summarizing..." : "Summarize with AI"}
        </Button>
      </div>

      {summary && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex justify-between items-start mb-1">
            <p className="text-sm font-medium text-yellow-800">AI Summary</p>
            <button
              onClick={() => setSummary("")}
              className="text-yellow-600 hover:text-yellow-800 text-xs"
            >
              Dismiss
            </button>
          </div>
          <p className="text-sm text-yellow-700 whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      <BlockNoteView editor={editor} theme="light" />
    </div>
  )
}

export default Editor
