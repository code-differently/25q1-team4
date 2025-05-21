"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignupWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password || !confirmPassword || !username) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: username
      });
      
      toast({
        title: "Account created!",
        description: "Your BranchOut account has been created successfully"
      });
      
      // Redirect to profile page after successful signup
      router.push("/profile");
      
    } catch (error: any) {
      console.error("Error creating account:", error);
      toast({
        title: "Signup failed",
        description: error.message || "There was an error creating your account",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      
      toast({
        title: "Account created!",
        description: "Your BranchOut account has been created successfully"
      });
      
      router.push("/profile");
    } catch (error: any) {
      console.error("Google sign-in error", error);
      toast({
        title: "Google signup failed",
        description: error.message || "There was an error signing up with Google",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 shadow-lg bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Join BranchOut</h2>
        <p className="text-gray-600 mb-6 text-center">
          Create an account to start your tree planting journey
        </p>
        
        {/* Email signup form */}
        <form onSubmit={handleSignupWithEmail} className="space-y-4 mb-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Choose a username"
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Create a password"
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        {/* Google signup button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full border-2 flex items-center justify-center gap-3 py-3 rounded hover:bg-green-50 hover:border-green-500 transition-colors mb-6"
          disabled={loading}
        >
          <FaGoogle className="h-5 w-5 text-green-600" />
          <span>Sign up with Google</span>
        </button>
        
        <div className="text-center text-sm text-gray-500">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-green-600 hover:text-green-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}