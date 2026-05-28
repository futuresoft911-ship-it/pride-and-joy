import { useState } from 'react';

export default function PayPalButtonPlaceholder({ amount, onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);

  // TODO: PayPal API Integration
  // When ready to connect a real PayPal account, you can install the official SDK:
  // npm install @paypal/react-paypal-js
  // 
  // Then wrap your application in <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
  // and replace this entire placeholder with the <PayPalButtons /> component.

  const simulatePayPalPayment = () => {
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate successful response object that PayPal would return
      const mockDetails = {
        id: `PAYPAL-MOCK-${Math.floor(Math.random() * 1000000)}`,
        status: "COMPLETED",
        payer: {
          email_address: "buyer@example.com",
        }
      };
      
      if (onSuccess) {
        onSuccess(mockDetails);
      }
    }, 1500);
  };

  return (
    <div className="paypal-placeholder-container mt-4 mb-4">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Pay with PayPal</h3>
        <p className="text-sm text-gray-500 mb-6">
          Amount to pay: <strong>${amount.toFixed(2)}</strong>
        </p>
        
        <button
          type="button"
          onClick={simulatePayPalPayment}
          disabled={isProcessing}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#0070ba] hover:bg-[#003087]'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing PayPal...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.8 6.5C18.4 4.3 16.7 3 13.9 3H7.5C7.1 3 6.7 3.3 6.6 3.7L3.4 20.3C3.3 20.6 3.6 21 4 21H7.8C8.2 21 8.5 20.7 8.6 20.3L9.6 14.2H12.9C16.9 14.2 19.6 12.3 20.1 8.2C20.1 7.6 20.1 7.3 18.8 6.5Z" fill="white"/>
              </svg>
              Pay with PayPal (Test Mode)
            </span>
          )}
        </button>
        
        <p className="mt-4 text-xs text-gray-400">
          * This is a sandbox integration. No real funds will be processed.
        </p>
      </div>
    </div>
  );
}
