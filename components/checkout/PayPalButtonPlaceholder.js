import { useState } from 'react';

export default function PayPalButtonPlaceholder({ amount, onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const simulatePayPalPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const mockDetails = {
        id: `PAYPAL-MOCK-${Math.floor(Math.random() * 1000000)}`,
        status: "COMPLETED",
        payer: { email_address: "buyer@example.com" }
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
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
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
    borderRadius: '9999px',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#003087',
    background: '#FFC439',
    cursor: isProcessing ? 'not-allowed' : 'pointer',
    opacity: isProcessing ? 0.8 : 1,
    boxShadow: '0 4px 6px -1px rgba(255, 196, 57, 0.4), 0 2px 4px -1px rgba(255, 196, 57, 0.2)',
    transition: 'all 0.3s ease',
    transform: isProcessing ? 'scale(0.98)' : 'scale(1)',
  };

  const svgStyle = {
    width: '1.25rem',
    height: '1.25rem',
    marginLeft: '0.5rem',
    transition: 'transform 0.2s ease',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle} className="paypal-card-hover">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          
          <div style={{ marginBottom: '1rem', background: 'white', padding: '0.75rem', borderRadius: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
            <svg viewBox="0 0 124 33" xmlns="http://www.w3.org/2000/svg" style={{ height: '2rem', width: 'auto' }}>
              <path fill="#003087" d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-1.149-1.348-3.202-1.746-5.003-1.746zm.053 7.828c-.417 2.656-2.613 2.656-4.664 2.656h-1.503l1.109-7.03h1.839c1.691 0 2.92.368 3.328 1.488.221.603.221 1.465-.109 2.886z" />
              <path fill="#003087" d="M113.435 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.012-3.375-.873-4.415-1.148-1.348-3.201-1.746-5.003-1.746zm.054 7.828c-.418 2.656-2.614 2.656-4.665 2.656h-1.502l1.108-7.03h1.839c1.691 0 2.921.368 3.328 1.488.222.603.222 1.465-.108 2.886z" />
              <path fill="#009CDE" d="M63.473 13.91l-1.026-1.393c-.22-.299-.606-.412-.962-.284l-4.526 1.621a.95.95 0 0 0-.585 1.196l1.378 4.09-3.921-5.187a.95.95 0 0 0-1.517-.008L47.013 20.3a.57.57 0 0 0 .452.918h3.284a.95.95 0 0 0 .805-.44l3.125-4.88 1.95 5.8a.95.95 0 0 0 .899.648h3.401a.57.57 0 0 0 .459-.908l-3.32-4.527 2.128-1.86a.95.95 0 0 0 .285-1.127l-1.139-3.313 1.69-.58c.27-.092.427-.37.362-.647L64.33 14.3a.57.57 0 0 0-.857-.39z" />
              <path fill="#009CDE" d="M123.633 6.749h-3.344a.95.95 0 0 0-.938.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.344a.95.95 0 0 0 .939-.803l2.765-17.537a.57.57 0 0 0-.564-.657z" />
              <path fill="#003087" d="M86.81 7.202l-5.694 13.127-1.163-7.518a1.235 1.235 0 0 0-1.144-.984l-4.32-.239a.238.238 0 0 0-.251.261l.019.123 3.324 4.542-3.834 8.841a.57.57 0 0 0 .522.796h3.467a.95.95 0 0 0 .871-.573l8.473-19.537a.57.57 0 0 0-.522-.796h-3.418a.95.95 0 0 0-.87.574z" />
              <path fill="#009CDE" d="M14.072 2.943h-8.03c-.456 0-.838.337-.917.788L.15 15.688c-.12.559.314 1.071.884 1.071h4.48c.456 0 .839-.337.917-.788l1.648-10.463c.066-.421.423-.733.85-.733h3.585c2.977 0 4.88 1.107 4.093 4.298a8.21 8.21 0 0 1-.504 1.488 4.594 4.594 0 0 1-1.028 1.34c-1.396 1.233-3.666 1.34-5.656 1.34h-.995a.495.495 0 0 0-.488.42l-.524 3.315a.377.377 0 0 0 .373.435h1.996c3.488 0 6.002-1.429 6.845-5.592.519-2.585-.296-4.63-2.227-5.918C16.994 3.639 15.679 2.943 14.072 2.943z" />
              <path fill="#003087" d="M23.111 2.943h-7.61c-.456 0-.839.337-.918.788l-1.36 8.64a.376.376 0 0 0 .372.435h1.611c.427 0 .783-.312.85-.733l.93-5.91c.08-.507.513-.883 1.026-.883h3.585c2.977 0 4.88 1.107 4.093 4.298.544-3.053-.559-4.831-2.457-5.836-1.503-.794-3.14-.799-4.654-.799h.448c3.489 0 6.002-1.429 6.845-5.592.203-1.01.077-1.921-.301-2.69-.979-2.148-3.415-2.784-6.386-2.784z" />
              <path fill="#012169" d="M12.981 16.035h1.996c3.488 0 6.002-1.429 6.845-5.592.203-1.01.077-1.921-.301-2.69a6.626 6.626 0 0 0-.693-1.037c-.787 3.192-3.301 4.62-6.789 4.62h-1.611a.377.377 0 0 1-.373-.435l1.36-8.64c.08-.507.513-.883 1.026-.883h-3.48c-.456 0-.838.337-.917.788L8.397 12.63c-.12.559.314 1.071.883 1.071h.996c1.99 0 4.26-.107 5.656-1.34a4.594 4.594 0 0 0 1.028-1.34 8.21 8.21 0 0 0 .504-1.488c.787-3.192-1.116-4.298-4.093-4.298H9.786c-.427 0-.784.312-.85.733L7.288 16.435c-.12.559.314 1.071.884 1.071h4.48c.456 0 .839-.337.917-.788l.524-3.315a.495.495 0 0 1 .488-.42h-1.523v.01l-.077.493z" />
            </svg>
          </div>
          
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#003087', margin: '0 0 0.25rem 0' }}>Pay Securely</h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 2rem 0', maxWidth: '20rem' }}>
            You'll be redirected to PayPal to complete your purchase of <strong style={{ color: '#111827' }}>${amount.toFixed(2)}</strong>.
          </p>

          <button
            type="button"
            onClick={simulatePayPalPayment}
            disabled={isProcessing}
            style={buttonStyle}
            onMouseEnter={(e) => { if (!isProcessing) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(255, 196, 57, 0.5)'; } }}
            onMouseLeave={(e) => { if (!isProcessing) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(255, 196, 57, 0.4)'; } }}
          >
            {isProcessing ? (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <svg style={{ animation: 'spin 1s linear infinite', marginRight: '0.75rem', height: '1.25rem', width: '1.25rem', color: '#003087' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                Checkout with <span style={{ fontWeight: 800, fontStyle: 'italic', marginLeft: '0.25rem', color: '#003087' }}>PayPal</span>
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
