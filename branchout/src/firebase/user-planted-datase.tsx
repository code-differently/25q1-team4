// lib/getUserTrees.ts
import {
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where
  } from "firebase/firestore";
  import { db } from "./firebase";
  
  export async function getUserPlantedTrees(userId: string) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
  
    if (!userData?.plantedTrees) return [];
  
    const treesQuery = query(
      collection(db, "trees"),
      where("__name__", "in", userData.plantedTrees.slice(0, 10)) // Firestore limit
    );
    const treeDocs = await getDocs(treesQuery);
  
    return treeDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  