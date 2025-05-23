'use client';

import { useState } from 'react';

export function DonationSubmit() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    // Add your payment processing logic here
    setIsSubmitted(true);
  };

  return (
    <div className="mt-6">
      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          Submit Payment
        </button>
      ) : (
        <div className="text-center p-4 bg-green-50 rounded-md">
          <p className="text-green-700">
            Thank you for your donation. With your support, we will make a difference.
          </p>
        </div>
      )}
    </div>
  );
}