'use client'
import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "../../firebase/firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function AuthPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in error", error);
      alert("Failed to sign in. Try again.");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h1 style={styles.title}>Template for Login</h1>

        {user ? (
          <div style={styles.userInfo}>
            <img src={user.photoURL as string} alt="User" style={styles.avatar} />
            <p style={styles.name}>Welcome, <strong>{user.displayName}</strong></p>
            <button onClick={handleSignOut} style={styles.logoutBtn}>
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={handleSignIn} style={styles.loginBtn}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={styles.icon} />
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  background: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #74ebd5, #9face6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.15)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    width: "350px",
    textAlign: "center",
    color: "#fff",
    animation: "fadeIn 1s ease",
  },
  title: {
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "600",
  },
  loginBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    color: "#333",
    border: "none",
    borderRadius: "50px",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    gap: "10px",
  },
  logoutBtn: {
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "20px",
    transition: "all 0.3s ease",
  },
  icon: {
    height: "20px",
    width: "20px",
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    marginBottom: "12px",
  },
  name: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "18px",
    fontWeight: "500",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
} as const
