"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

interface Donation {
  id: number
  amount: number
  name: string
  email: string
  address: string
  city: string
  state: string
  zip_code: string
  payment_method: string
  status: string
  created_at: string
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDonations() {
      try {
        // Initialize Supabase client (client-side)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
        const supabase = createClient(supabaseUrl, supabaseAnonKey)

        // Fetch donations
        const { data, error } = await supabase.from("donations").select("*").order("created_at", { ascending: false })

        if (error) throw error

        setDonations(data || [])
        setLoading(false)
      } catch (err) {
        console.error("Error fetching donations:", err)
        setError("Failed to load donations. Please try again later.")
        setLoading(false)
      }
    }

    fetchDonations()
  }, [])

  if (loading) {
    return <p className="text-lg">Loading donations...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  // Calculate total donations
  const totalDonations = donations.reduce((sum, donation) => sum + Number(donation.amount), 0)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Donations</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">Total Donations</p>
            <p className="text-2xl font-bold text-green-700">${totalDonations.toFixed(2)}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">Number of Donors</p>
            <p className="text-2xl font-bold text-blue-700">{donations.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">Average Donation</p>
            <p className="text-2xl font-bold text-purple-700">
              ${donations.length > 0 ? (totalDonations / donations.length).toFixed(2) : "0.00"}
            </p>
          </div>
        </div>
      </div>

      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-500">{new Date(donation.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-medium">{donation.name}</td>
                  <td className="py-3 px-4">{donation.email}</td>
                  <td className="py-3 px-4 text-right font-medium">${Number(donation.amount).toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        donation.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {donation.city}, {donation.state}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
