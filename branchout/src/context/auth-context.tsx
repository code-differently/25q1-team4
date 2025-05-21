"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from "firebase/auth";
import { auth } from "../firebase/firebase";

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps your app and makes auth object available to any
// child component that calls useAuth().
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Listen for auth state changes when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // The value that will be supplied to any components that use this hook
  const value = {
    user,
    loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}