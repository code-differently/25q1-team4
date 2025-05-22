import { ContactForm } from "@/src/components/contact-form"

export default function AboutPage() {
  return (
    <main className="flex-grow bg-[#f5fbf5]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 text-lg mb-6">Meet BranchOut</p>

          <p className="mb-4">
            BranchOut is a digital platform built to help people track and celebrate their tree planting efforts.
            Developed as a capstone project by a team of software engineering students, this app empowers individuals
            and communities to document their environmental contributions — one tree at a time.
          </p>

          <p className="text-gray-700 mb-8">
            Our vision is to combine sustainability with technology in a way that's simple, impactful, and accessible to
            everyone. By recording tree species, planting dates, and eventually GPS locations, we aim to foster greater
            awareness and accountability in reforestation efforts.
          </p>

          <p className="text-gray-600 text-lg font-medium mb-4">Our Mission</p>

          <p className="mb-8">
            Our mission is to help individuals visualize their contribution to reforestation and inspire consistent
            environmental action. Technology, when used thoughtfully, can help us protect the planet — and we're
            starting here.
          </p>

          <div className="mb-8">
            {/* <ForestImage /> */}
          </div>

          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

          <p className="whitespace-pre-line mb-8">
            We're a group of four developers passionate about solving real-world problems with clean, purposeful code.
            This is our first major team project, and we're excited to share it with you.
            <span className="font-semibold block mt-4">branchout@gmail.com</span>
          </p>

          <ContactForm />
        </div>
      </div>
    </main>
  )
}
