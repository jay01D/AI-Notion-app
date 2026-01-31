# AI Notion Clone

A real-time collaborative document editor inspired by Notion, built with Next.js and Liveblocks.

## Tech Stack

- **Next.js 14** (App Router) - React framework with server-side rendering and API routes
- **Clerk** - Authentication and user management
- **Firebase Firestore** - NoSQL database for document metadata, user roles, and sharing
- **Liveblocks** - Real-time collaboration infrastructure (presence, Y.js sync)
- **BlockNote** - Block-based rich text editor with collaborative editing support
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN/UI** - Pre-built accessible UI components
- **OpenAI (GPT-4o-mini)** - AI-powered document summarization
- **TypeScript** - Type-safe JavaScript

## Features

- Google/GitHub OAuth sign-in via Clerk
- Create, rename, and delete documents
- Real-time collaborative editing with live cursors
- Invite users by email to collaborate on documents
- Manage document access - view and remove invited users
- Owner/editor role-based permissions
- Responsive sidebar with mobile sheet menu
- AI-powered document summarization using GPT-4o-mini
- Separate views for owned and shared documents

## Project Structure

```
app/
  page.tsx                    # Landing page
  layout.tsx                  # Root layout (Clerk, Header, Sidebar)
  doc/
    layout.tsx                # LiveBlocks provider wrapper
    [id]/
      page.tsx                # Document page
      layout.tsx              # Room provider with live collaboration
  api/
    liveblocks-auth/route.ts  # Liveblocks session auth endpoint
    summarize/route.ts        # AI summarization endpoint (OpenAI)

components/
  Header.tsx                  # Top nav with user info and breadcrumbs
  Sidebar.tsx                 # Document list sidebar (responsive)
  SidebarOptions.tsx          # Individual document link
  NewDocumentButton.tsx       # Create new document
  Documents.tsx               # Document view (title + editor + sharing)
  Editor.tsx                  # BlockNote editor with Liveblocks sync
  InviteUser.tsx              # Invite modal (email-based)
  ManageUsers.tsx             # View/remove users with access
  DeleteDocument.tsx          # Delete document button
  LiveBlocksProvider.tsx      # Liveblocks auth provider
  Breadcrumbs.tsx             # Dynamic breadcrumb navigation

actions/
  actions.ts                  # Server actions (create, invite, remove, delete)

lib/hooks/
  useOwner.ts                 # Hook to check document ownership
```

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project with Firestore enabled
- Clerk account
- Liveblocks account

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY=your_liveblocks_public_key
LIVEBLOCK_SECRET_KEY=your_liveblocks_secret_key

OPENAI_API_KEY=your_openai_api_key
```

You also need a `service_key.json` file in the project root with your Firebase service account credentials.

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Firestore Setup

Create a composite index for the `rooms` collection group:

- Collection group: `rooms`
- Fields: `userId` (Ascending), `roomId` (Ascending)

This is required for querying documents shared with a user.

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Import the repo in Vercel
3. Add all environment variables from `.env.local`
4. Add the `service_key.json` contents as a build-time secret or use environment variables for Firebase admin credentials
5. Deploy

## How It Works

1. Users sign in via Clerk (Google/GitHub OAuth)
2. Creating a document writes to Firestore and assigns the creator as owner
3. Opening a document connects to a Liveblocks room for real-time sync
4. The BlockNote editor syncs content via Liveblocks Y.js provider
5. Inviting a user creates an editor role entry in Firestore - the document appears in their "Shared Documents" sidebar
6. Removing a user deletes their Firestore room entry, revoking access
