"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged in successfully",
        description: "Welcome back to BranchOut!"
      });
      router.push("/profile");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Logged in successfully",
        description: "Welcome back to BranchOut!"
      });
      router.push("/profile");
    } catch (error: any) {
      console.error("Google login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Failed to sign in with Google",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 shadow-lg bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Welcome Back</h2>
        <p className="text-gray-600 mb-6 text-center">
          Sign in to continue your green journey
        </p>
        
        {/* Email login form */}
        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
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
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <Link href="#" className="font-medium text-green-600 hover:text-green-700">
                Forgot password?
              </Link>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
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
        
        {/* Google login button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border-2 flex items-center justify-center gap-3 py-3 rounded hover:bg-green-50 hover:border-green-500 transition-colors mb-6"
          disabled={loading}
        >
          <FaGoogle className="h-5 w-5 text-green-600" />
          <span>Sign in with Google</span>
        </button>
        
        <div className="text-center text-sm text-gray-500">
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-green-600 hover:text-green-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}