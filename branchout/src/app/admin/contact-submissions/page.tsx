"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/src/firebase/firebase"

interface ContactSubmission {
  id: string
  first_name: string
  last_name: string
  email: string
  message: string
  created_at: string
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        if (!db) {
          throw new Error("Firestore is not initialized. Check your environment variables.")
        }

        const q = query(collection(db, "contact_submissions"), orderBy("created_at", "desc"))
        const querySnapshot = await getDocs(q)

        const submissionsData: ContactSubmission[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          submissionsData.push({
            id: doc.id,
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            message: data.message || "",
            created_at: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
          })
        })

        setSubmissions(submissionsData)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching submissions:", err)
        setError("Failed to load contact submissions. Please try again later.")
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  if (loading) {
    return <p className="text-lg">Loading submissions...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact Submissions</h1>

      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="grid gap-6">
          {submissions.map((submission) => (
            <div key={submission.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {submission.first_name} {submission.last_name}
                </h2>
                <span className="text-gray-500 text-sm">{new Date(submission.created_at).toLocaleString()}</span>
              </div>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Email:</span> {submission.email}
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="whitespace-pre-wrap">{submission.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}