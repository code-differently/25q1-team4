 /* eslint-disable */
"use client"

import type React from "react"

import { useActionState } from "react"
import { useEffect, useRef, useState } from "react"
import { submitContactForm } from "../app/contact"

const initialState: any = {}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form on successful submission
  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset()
    }
    setIsSubmitting(false)
  }, [state])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true)
  }

  return (
    <div className="bg-[#f5fbf5] p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>

      <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="space-y-4">
        {state.success && (
          <div className="p-4 bg-green-50 text-green-800 rounded-md border border-green-200">{state.message}</div>
        )}

        {state.errors?._form && (
          <div className="p-4 bg-red-50 text-red-800 rounded-md border border-red-200">
              {state.errors._form.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Jane"
              className={`w-full px-3 py-2 bg-white border ${
                state.errors?.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50`}
              aria-describedby={state.errors?.firstName ? "firstName-error" : undefined}
            />
            {state.errors?.firstName && (
              <p className="text-red-500 text-sm" id="firstName-error">
                {state.errors.firstName[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Smitherton"
              className={`w-full px-3 py-2 bg-white border ${
                state.errors?.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50`}
              aria-describedby={state.errors?.lastName ? "lastName-error" : undefined}
            />
            {state.errors?.lastName && (
              <p className="text-red-500 text-sm" id="lastName-error">
                {state.errors.lastName[0]}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            className={`w-full px-3 py-2 bg-white border ${
              state.errors?.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50`}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm" id="email-error">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Enter your question or message"
            className={`w-full px-3 py-2 bg-white border ${
              state.errors?.message ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50`}
            aria-describedby={state.errors?.message ? "message-error" : undefined}
          />
          {state.errors?.message && (
            <p className="text-red-500 text-sm" id="message-error">
              {state.errors.message[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
}
