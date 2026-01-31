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

export async function inviteUser(roomId: string, email: string) {
  const { sessionClaims } = await auth();
  if (!sessionClaims) throw new Error("Unauthorized");

  await adminDB
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(roomId)
    .set({
      userId: email,
      role: "editor",
      createdAt: new Date(),
      roomId,
    });
}

export async function removeUser(roomId: string, email: string) {
  const { sessionClaims } = await auth();
  if (!sessionClaims) throw new Error("Unauthorized");

  await adminDB
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(roomId)
    .delete();
}

export async function deleteDocument(roomId: string) {
  const { sessionClaims } = await auth();
  if (!sessionClaims) throw new Error("Unauthorized");

  // delete the document
  await adminDB.collection("documents").doc(roomId).delete();

  // find all users with access and remove their room references
  const roomDocs = await adminDB
    .collectionGroup("rooms")
    .where("roomId", "==", roomId)
    .get();

  const batch = adminDB.batch();
  roomDocs.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
}
