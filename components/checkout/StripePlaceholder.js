import { useState } from 'react';

export default function StripePlaceholder({ amount, onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateStripePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const mockDetails = {
        id: `pi_MOCK_${Math.floor(Math.random() * 1000000)}`,
        status: "succeeded",
        amount: amount * 100,
      };
      if (onSuccess) onSuccess(mockDetails);
    }, 2000);
  };

  const containerStyle = {
    margin: '1.5rem 0 2rem 0',
  };

  const cardStyle = {
    position: 'relative',
    overflow: 'hidden',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'box-shadow 0.3s ease',
  };

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '350px',
    margin: '0 auto',
    padding: '1rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#ffffff',
    background: '#635BFF',
    cursor: isProcessing ? 'not-allowed' : 'pointer',
    opacity: isProcessing ? 0.8 : 1,
    boxShadow: '0 4px 6px -1px rgba(99, 91, 255, 0.4), 0 2px 4px -1px rgba(99, 91, 255, 0.2)',
    transition: 'all 0.3s ease',
    transform: isProcessing ? 'scale(0.98)' : 'scale(1)',
  };

  const inputStyle = {
    background: '#f8f9fa',
    border: '1px solid #e6e6e6',
    borderRadius: '6px',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'monospace',
    color: '#9ca3af',
    fontSize: '0.875rem',
    width: '100%',
    maxWidth: '350px',
    margin: '0 auto 2rem auto',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ marginBottom: '1rem' }}>
            <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" style={{ height: '2rem', width: 'auto' }}>
              <path fill="#635BFF" d="M59.64 14.28h-8.06c.19 1.93 1.6 3.17 3.67 3.17 1.34 0 2.44-.54 3.09-1.34l3.14 2.1c-1.55 1.98-4.04 2.92-6.52 2.92-4.5 0-7.79-3.26-7.79-7.85 0-4.66 3.19-8.05 7.42-8.05 4.54 0 7.21 3.2 7.21 7.6v1.45zm-11.83-2.61h4.43c-.22-1.63-1.42-2.5-2.28-2.5-1.04 0-1.95.83-2.15 2.5zM42.23 20.8V5.59h3.63v1.89c1.07-1.4 2.72-2.19 4.67-2.19 4.02 0 6.94 3.03 6.94 7.67 0 4.62-2.9 7.74-6.86 7.74-2.15 0-3.85-.92-4.75-2.33v2.42h-3.63zm4.01-7.84c0 2.45 1.54 4.3 3.61 4.3 2.15 0 3.73-1.85 3.73-4.3 0-2.48-1.58-4.32-3.73-4.32-2.07 0-3.61 1.84-3.61 4.32zM28.09 20.8V5.59h3.63v15.21h-3.63zM30.43 3.99c-1.27 0-2.17-.9-2.17-2.16 0-1.26.9-2.18 2.17-2.18s2.17.92 2.17 2.18c0 1.25-.9 2.16-2.17 2.16zM15.4 20.8V9.16h-2.58V5.59h2.58V4.31c0-2.83 1.63-4.59 4.79-4.59 1.13 0 2.05.13 2.62.29v3.31c-.44-.11-.92-.16-1.52-.16-1.38 0-2.26.68-2.26 2.08v1.35h3.65v3.57h-3.65v11.64H15.4zM4.78 6.74c-.58-.3-1.45-.55-2.28-.55-.83 0-1.27.3-1.27.75 0 1.25 5.56 1.05 5.56 5.3 0 2.5-1.95 4.37-5.06 4.37-1.63 0-3.23-.42-4.43-1.12l1.1-3.29c.98.58 2.17.93 3.23.93.99 0 1.48-.34 1.48-.83 0-1.45-5.56-1.13-5.56-5.32 0-2.48 1.95-4.27 4.9-4.27 1.43 0 2.76.32 3.84.86l-1.51 3.17z"/>
            </svg>
          </div>
          
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', margin: '0 0 1.5rem 0' }}>Credit or Debit Card</h3>
          
          <div style={inputStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', color: '#d1d5db' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              <span>Card number</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span>MM / YY</span>
              <span>CVC</span>
            </div>
          </div>

          <button
            type="button"
            onClick={simulateStripePayment}
            disabled={isProcessing}
            style={buttonStyle}
            onMouseEnter={(e) => { if (!isProcessing) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99, 91, 255, 0.5)'; e.currentTarget.style.background = '#4B45D6'; } }}
            onMouseLeave={(e) => { if (!isProcessing) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(99, 91, 255, 0.4)'; e.currentTarget.style.background = '#635BFF'; } }}
          >
            {isProcessing ? (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <svg style={{ animation: 'spin 1s linear infinite', marginRight: '0.75rem', height: '1.25rem', width: '1.25rem', color: 'white' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Pay ${amount.toFixed(2)} Securely
              </span>
            )}
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
