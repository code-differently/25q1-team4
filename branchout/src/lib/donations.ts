// Firestore database schema definition in TypeScript for the payment form


export interface DonationPaymentInfo {
    nameOnCard: string;
    email: string;
    cardNumber: string; // Usually tokenized in production, NEVER store raw card numbers
    expiryDate: string; // Format: MM/YY
    cvv: string;         // NEVER store CVV in production
  
    billingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  
    donationAmount: number; // In USD
    total: number;          // Final charged amount, might include fees later
  
    createdAt: string;      // ISO date string
  }
  
  // Example Firestore write logic (you'd use this in a server or callable function)
  import { collection, addDoc,  } from "firebase/firestore";
import { db } from "../firebase/firebase";
  
  export async function saveDonationToFirestore(data: Omit<DonationPaymentInfo, 'createdAt'>) {
    try {
      const docRef = await addDoc(collection(db, "donation_payments"), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error saving donation info:", error);
      return { success: false, error };
    }
  }
  