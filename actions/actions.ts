"use server";

import { adminDB } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    throw new Error("Unauthorized");
  }

  const docCollectionRef = adminDB.collection("documents");

  const docRef = await docCollectionRef.add({
    title: "New Document",
  });

  await adminDB
    .collection("users")
    .doc(sessionClaims?.email! as string)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email! as string,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}
