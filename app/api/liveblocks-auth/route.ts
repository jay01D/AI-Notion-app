import { Liveblocks } from "@liveblocks/node";
import { auth } from "@clerk/nextjs/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCK_SECRET_KEY!,
});

export async function POST(req: Request) {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await req.json();

  const session = liveblocks.prepareSession(sessionClaims.email!, {
    userInfo: {
      name: sessionClaims.fullName!,
      email: sessionClaims.email!,
      avatar: sessionClaims.image!,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
