import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/contact-submissions"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Contact Submissions</h2>
          <p className="text-gray-600">View and manage contact form submissions</p>
        </Link>

        <Link href="/admin/donations" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Donations</h2>
          <p className="text-gray-600">View and manage donation records</p>
        </Link>

        {/* Add more admin sections as needed */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-gray-600">Coming soon</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p className="text-gray-600">Coming soon</p>
        </div>
      </div>
    </div>
  )
}
