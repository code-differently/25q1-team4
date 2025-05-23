import React from 'react';
import { DonationSubmit } from './DonationSubmit';

const DonationForm = () => {
  return (
    <div className="donation-form">
      {/* ...existing code... */}
      <div className="text-sm text-gray-500 mb-4">
        Your payment information is secure and encrypted
      </div>

      <DonationSubmit />
      {/* ...existing code... */}
    </div>
  );
};

export default DonationForm;
