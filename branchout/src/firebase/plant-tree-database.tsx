// lib/plantTree.ts

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";

// All allowed tree types
const ALLOWED_TREE_TYPES = [
  "Oak", "Pine", "Cedar", "Maple", "Birch",
  "Spruce", "Redwood", "Willow", "Ash", "Elm"
];

//allowed city locations
const ALLOWED_CITIES = [
  "Riverfront", "Brandywine Park", "City Center", "Mountain View",
   "Lakeside", "Forest Edge"
  ];

interface TreeInput {
  userId: string;
  treeType: string;
  allowedCities: string;
}

export async function plantTree({ userId, treeType, }: TreeInput) {
  if (!ALLOWED_TREE_TYPES.includes(treeType)) {
    throw new Error("Invalid tree type");
  }

  // 1. Add tree to `/trees` collection
  const treeDoc = await addDoc(collection(db, "trees"), {
    plantedDate: Timestamp.now(),
    treeType,
    location,
    plantedBy: userId
  });

  // 2. Add treeID to user's plantedTrees array
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    plantedTrees: arrayUnion(treeDoc.id)
  });

  return treeDoc.id;
}
