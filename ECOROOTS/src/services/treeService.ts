
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Tree } from '../types/Tree';

const TREE_COLLECTION = 'trees';

export const saveTree = async (tree: Tree): Promise<void> => {
  await addDoc(collection(db, TREE_COLLECTION), tree);
};

export const getTrees = async (): Promise<Tree[]> => {
  const snapshot = await getDocs(collection(db, TREE_COLLECTION));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Tree));
};
