"use server"

import { z } from "zod"
import { getFirestore, Timestamp, collection, addDoc } from "firebase/firestore"
import { initializeApp, getApps } from "firebase/app"

// Define the donation schema
const DonationSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "ZIP code must be in valid format"),
})

export type DonationFormState = {
  errors?: {
    amount?: string[]
    name?: string[]
    email?: string[]
    cardNumber?: string[]
    expiryDate?: string[]
    cvv?: string[]
    address?: string[]
    city?: string[]
    state?: string[]
    zipCode?: string[]
    _form?: string[]
  }
  success?: boolean
  message?: string
}

// Firebase config (move to environment variables in production)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase only once
if (!getApps().length) {
  initializeApp(firebaseConfig)
}

const db = getFirestore()

export async function submitDonation(prevState: DonationFormState, formData: FormData): Promise<DonationFormState> {
  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // Validate form data
    const validatedFields = DonationSchema.safeParse({
      amount: formData.get("amount"),
      name: formData.get("name"),
      email: formData.get("email"),
      cardNumber: formData.get("cardNumber")?.toString().replace(/\s/g, ""),
      expiryDate: formData.get("expiryDate"),
      cvv: formData.get("cvv"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
    })

    // Return errors if validation fails
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
        message: "Please fix the errors in the form.",
      }
    }

    const { amount, name, email, address, city, state, zipCode } = validatedFields.data

    // Save to Firebase Firestore
    try {
      await addDoc(collection(db, "donations"), {
        amount: Number(amount),
        name,
        email,
        address,
        city,
        state,
        zip_code: zipCode,
        payment_method: "credit_card",
        status: "completed",
        created_at: Timestamp.now(),
      })

      console.log("Donation saved to Firestore")
    } catch (dbError) {
      console.error("Database error:", dbError)
      return {
        errors: {
          _form: ["Failed to process your donation. Database error occurred."],
        },
        success: false,
        message: "An error occurred while processing your donation.",
      }
    }

    // Return success state
    return {
      success: true,
      message: `Thank you for your donation of $${amount}! Your contribution will help plant trees and make the world greener.`,
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      errors: {
        _form: ["Failed to process the donation. Please try again later."],
      },
      success: false,
      message: "An error occurred while processing your donation.",
    }
  }
}