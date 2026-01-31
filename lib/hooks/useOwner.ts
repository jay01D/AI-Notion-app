"use client";

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useDocument } from "react-firebase-hooks/firestore";

const useOwner = (roomId: string) => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.toString();
  const [data] = useDocument(
    email ? doc(db, "users", email, "rooms", roomId) : undefined
  );
  return data?.data()?.role === "owner";
};

export default useOwner;
