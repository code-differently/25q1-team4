'use client'
import React, { useState } from "react";
import { getFirestore, collection, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "../../firebase/firebase"; // your firebase initialization

const db = getFirestore(app);

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [otherInputValue, setOtherInputValue] = useState("");

  // Query items collection ordered by createdAt timestamp descending
  const itemsRef = collection(db, "trees");
  const q = query(itemsRef, orderBy("createdAt", "desc"));

  // Listen to realtime updates on the items collection
  const [snapshot, loading, error] = useCollection(q);

  const handleAddItem = async () => {
    if (!inputValue.trim()) return;

    try {
      await addDoc(itemsRef, {
        Geolocation: {
          longitude: Number(inputValue),
          latitude: Number(otherInputValue)
        },
        createdAt: serverTimestamp(),
      });
      setInputValue("");
      setOtherInputValue("");
    } catch (err) {
      console.error("Error adding document:", err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Add Stuff to Firestore</h2>

      <input
        type="text"
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <input
        type="text"
        placeholder="Type something..."
        value={otherInputValue}
        onChange={(e) => setOtherInputValue(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />


      <button onClick={handleAddItem} style={{ padding: "8px 16px" }}>
        Add
      </button>

      {loading && <p>Loading items...</p>}
      {error && <p>Error: {error.message}</p>}

      <ul style={{ marginTop: 20 }}>
        {snapshot?.docs.length === 0 && <li>No items yet</li>}

        {snapshot?.docs.map((doc) => (
          <li key={doc.id}>{`longitude ${doc.data().Geolocation.longitude}  latitude ${doc.data().Geolocation.latitude}`}</li>
        ))}
      </ul>
    </div>
  );
}
