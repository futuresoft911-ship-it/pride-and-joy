import { useState } from 'react';

export default function StripePlaceholder({ amount, onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);

  // TODO: Stripe API Integration
  // When ready to connect Stripe, you can install the official SDK:
  // npm install @stripe/stripe-js @stripe/react-stripe-js
  // 
  // Then load Stripe and wrap your application in <Elements stripe={stripePromise}>
  // This component would be replaced with <PaymentElement /> and useStripe() hooks.

  const simulateStripePayment = () => {
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate successful response object that Stripe would return
      const mockDetails = {
        id: `pi_MOCK_${Math.floor(Math.random() * 1000000)}`,
        status: "succeeded",
        amount: amount * 100, // Stripe uses cents
      };
      
      if (onSuccess) {
        onSuccess(mockDetails);
      }
    }, 1500);
  };

  return (
    <div className="stripe-placeholder-container mt-4 mb-4">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Credit or Debit Card</h3>
        
        {/* Mock Stripe Elements UI */}
        <div className="space-y-4 mb-6">
          <div className="bg-white border border-gray-300 rounded p-3 text-gray-400 font-mono text-sm">
            Card number      MM / YY      CVC
          </div>
        </div>

        <button
          type="button"
          onClick={simulateStripePayment}
          disabled={isProcessing}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isProcessing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-[#635BFF] hover:bg-[#4B45D6]'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span>Pay ${amount.toFixed(2)} with Stripe</span>
          )}
        </button>
        
        <p className="mt-4 text-xs text-center text-gray-400">
          * This is a placeholder for Stripe Elements.
        </p>
      </div>
    </div>
  );
}
