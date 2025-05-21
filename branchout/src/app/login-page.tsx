"use client";

import React from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md p-8 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center text-center min-h-[80vh] bg-gray-50 p-4">
      <Card title="Welcome Back">
        <p className="text-gray-600 mb-6 text-center">
          Sign in to continue your green journey
        </p>
        <button
          className="w-full border-2 flex items-center justify-center gap-3 py-4 rounded hover:bg-green-50 hover:border-green-500 transition-colors"
          onClick={() => console.log("Google sign-in clicked")}
        >
          <FaGoogle className="h-6 w-6 text-green-600" />
          <span>Continue with Google</span>
        </button>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-green-600 hover:text-green-700">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}