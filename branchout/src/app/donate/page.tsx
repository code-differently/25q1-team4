"use client"

import type React from "react"


import { submitDonation, type DonationFormState } from "../actions"
import { useActionState, useEffect, useRef, useState } from "react"
import { Calendar, CreditCard, Lock } from "lucide-react"
import Image from "next/image"



export default function DonatePage() {


  const [amount, setAmount] = useState<string>("")
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [state, formAction] = useActionState(submitDonation, 0 as DonationFormState)
  const formRef = useRef<HTMLFormElement>(null)

  // Format credit card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  // Handle donation amount selection
  const handleAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount)
  }

  // Handle continue to payment
  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid donation amount")
      return
    }

    setShowPaymentForm(true)

    // Scroll to the payment form
    setTimeout(() => {
      document.getElementById("payment-form")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true)
  }

  // Reset form on successful submission
  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset()
      setAmount("")
      setShowPaymentForm(false)
      setIsSubmitting(false)

      // Scroll to the success message
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (state.errors) {
      setIsSubmitting(false)
    }
  }, [state])

  return (
    <main className="flex-grow bg-[#f5fbf5]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Support BranchOut</h1>
          <p className="text-lg mb-8">Your contribution can help grow more than just trees — it helps grow impact.</p>

          {state.success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8" role="alert">
              <p className="font-bold">Thank you!</p>
              <p>{state.message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-6">
                <p className="mb-6">
                  BranchOut is more than a student project. It&apos;s a mission-driven platform designed to empower
                  volunteers and communities to track their reforestation efforts and see the long-term impact of their
                  work. Every line of code, every tree planted, and every contribution supports a greener future.
                </p>

                <h2 className="text-2xl font-bold mb-4">Why Donate?</h2>
                <p className="mb-4">Your donation helps us:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Expand features like GPS mapping, user dashboards, and interactive community forests.</li>
                  <li>Maintain and improve the platform with better infrastructure and performance.</li>
                  <li>Support future development by helping our team scale the app beyond the bootcamp.</li>
                </ul>
                <p className="mb-6">
                  Whether it&apos;s a one-time gift or recurring support, every bit helps us stay rooted and reach further.
                </p>

                <h2 className="text-2xl font-bold mb-4">Transparency & Accountability</h2>
                <p className="mb-6">
                  As developers committed to open-source values and social responsibility, we&apos;re dedicated to being
                  transparent about how donations are used.
                </p>
                <p>
                  Funds will go toward development tools, cloud services, and building out community features that help
                  amplify reforestation efforts.
                </p>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">Choose a Donation Amount</h2>

                <form onSubmit={handleContinueToPayment}>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {[5, 10, 25, 50, 100, 250].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`${
                          amount === value.toString()
                            ? "bg-primary text-white"
                            : "bg-[#e0f7e0] hover:bg-[#c8e6c9] text-black"
                        } font-bold py-4 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary`}
                        onClick={() => handleAmountSelect(value.toString())}
                      >
                        ${value}
                      </button>
                    ))}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="custom-amount" className="block text-sm font-medium mb-2">
                      Or enter a custom amount:
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input
                        type="number"
                        id="custom-amount"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter amount"
                        min="1"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!amount || Number(amount) <= 0}
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>

              {showPaymentForm && (
                <div id="payment-form" className="bg-white p-8 rounded-lg shadow-md mb-8">
                  <h2 className="text-2xl font-bold mb-4">Payment Information</h2>

                  {state.errors?._form && (
                    <div className="p-4 bg-red-50 text-red-800 rounded-md border border-red-200 mb-4">
                      {state.errors._form.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}

                  <form ref={formRef} action={formAction} onSubmit={handleSubmit}>
                    <input type="hidden" name="amount" value={amount} />

                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className={`w-full px-3 py-2 border ${
                            state.errors?.name ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                          placeholder="John Doe"
                        />
                        {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`w-full px-3 py-2 border ${
                            state.errors?.email ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                          placeholder="your@email.com"
                        />
                        {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>}
                      </div>

                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            className={`w-full pl-10 pr-4 py-2 border ${
                              state.errors?.cardNumber ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            onChange={(e) => {
                              e.target.value = formatCardNumber(e.target.value)
                            }}
                          />
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        </div>
                        {state.errors?.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">{state.errors.cardNumber[0]}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                            Expiry Date
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              className={`w-full pl-10 pr-4 py-2 border ${
                                state.errors?.expiryDate ? "border-red-500" : "border-gray-300"
                              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                              placeholder="MM/YY"
                              maxLength={5}
                              onChange={(e) => {
                                e.target.value = formatExpiryDate(e.target.value)
                              }}
                            />
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          </div>
                          {state.errors?.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">{state.errors.expiryDate[0]}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                            CVV
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              className={`w-full pl-10 pr-4 py-2 border ${
                                state.errors?.cvv ? "border-red-500" : "border-gray-300"
                              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                              placeholder="123"
                              maxLength={4}
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          </div>
                          {state.errors?.cvv && <p className="text-red-500 text-sm mt-1">{state.errors.cvv[0]}</p>}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-3">Billing Address</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className={`w-full px-3 py-2 border ${
                            state.errors?.address ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                          placeholder="123 Main St"
                        />
                        {state.errors?.address && (
                          <p className="text-red-500 text-sm mt-1">{state.errors.address[0]}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            className={`w-full px-3 py-2 border ${
                              state.errors?.city ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                            placeholder="New York"
                          />
                          {state.errors?.city && <p className="text-red-500 text-sm mt-1">{state.errors.city[0]}</p>}
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            className={`w-full px-3 py-2 border ${
                              state.errors?.state ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                            placeholder="NY"
                          />
                          {state.errors?.state && <p className="text-red-500 text-sm mt-1">{state.errors.state[0]}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          className={`w-full px-3 py-2 border ${
                            state.errors?.zipCode ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                          placeholder="10001"
                        />
                        {state.errors?.zipCode && (
                          <p className="text-red-500 text-sm mt-1">{state.errors.zipCode[0]}</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#f5fbf5] p-4 rounded-md mb-6">
                      <div className="flex justify-between mb-2">
                        <span>Donation Amount:</span>
                        <span className="font-semibold">${Number(amount).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${Number(amount).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mb-6">
                      <Lock className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-500">Your payment information is secure and encrypted</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-70"
                    >
                      {isSubmitting ? "Processing..." : `Donate $${Number(amount).toFixed(2)}`}
                    </button>
                  </form>
                </div>
              )}

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Your Impact</h2>
                <div className="mb-6 relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/michael-benz--IZ2sgQKIhM-unsplash.jpg-7xwnJv75fr8JfoTgjaemLuKNZA2I85.jpeg"
                    alt="Dense evergreen forest treeline"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
                <p className="text-center text-gray-700">
                  Every donation helps us track and plant more trees, creating a greener future for all.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <blockquote className="italic text-xl mb-4">
              &quot;It&apos;s the little things citizens do. That&apos;s what will make the difference. My little thing is planting
              trees.&quot;
            </blockquote>
            <p className="font-semibold">— Wangari Maathai</p>
          </div>
        </div>
      </div>
    </main>
  )
}
