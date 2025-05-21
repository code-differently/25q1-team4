"use client";

import { useAuth } from "@/src/context/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

// This is a simple component to protect routes that require authentication
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
      
      // Save the current path to redirect back after login
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirectAfterLogin", pathname);
      }
      
      router.push("/login");
    }
  }, [user, loading, router, pathname]);

  // Show loading state or render children if authenticated
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
}