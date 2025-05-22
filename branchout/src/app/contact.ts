 /* eslint-disable */
"use server"
import { z } from "zod"
import { getFirestore, Timestamp, collection, addDoc } from "firebase/firestore"
import { initializeApp, getApps } from "firebase/app"

const ContactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

// Firebase config (move to environment variables in production)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

// Initialize Firebase only once
if (!getApps().length) {
  initializeApp(firebaseConfig)
}

const db = getFirestore()

export async function submitContactForm(prevState: any, formData: FormData): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const validatedFields = ContactFormSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
        message: "Please fix the errors in the form.",
      }
    }

    const { firstName, lastName, email, message } = validatedFields.data

    try {
      await addDoc(collection(db, "contact_submissions"), {
        first_name: firstName,
        last_name: lastName,
        email,
        message,
        created_at: Timestamp.now(),
      })

      console.log("Contact form submission saved to Firestore")
    } catch (dbError) {
      console.error("Firestore error:", dbError)
      return {
        errors: {
          _form: ["Failed to save your message. Database error occurred."],
        },
        success: false,
        message: "An error occurred while saving your message.",
      }
    }

    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      errors: {
        _form: ["Failed to submit the form. Please try again later."],
      },
      success: false,
      message: "An error occurred while submitting the form.",
    }
  }
}
