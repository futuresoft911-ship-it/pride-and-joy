'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast, hideToast } = useCart();
  const toastRef = useRef(null);

  /* Auto-dismiss is handled by context, but we also allow manual close */
  useEffect(() => {
    if (toast.visible && toastRef.current) {
      toastRef.current.focus();
    }
  }, [toast.visible]);

  if (!toast.visible) return null;

  const typeConfig = {
    success: {
      accent: '#008026',
      bg: 'rgba(0, 128, 38, 0.08)',
      borderColor: 'rgba(0, 128, 38, 0.25)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="9" stroke="#008026" strokeWidth="1.5" />
          <path d="M6 10.5l2.5 2.5L14 7" stroke="#008026" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    error: {
      accent: '#e63946',
      bg: 'rgba(230, 57, 70, 0.08)',
      borderColor: 'rgba(230, 57, 70, 0.25)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="9" stroke="#e63946" strokeWidth="1.5" />
          <path d="M7 7l6 6M13 7l-6 6" stroke="#e63946" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    info: {
      accent: '#f4258c',
      bg: 'rgba(244, 37, 140, 0.08)',
      borderColor: 'rgba(244, 37, 140, 0.25)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="9" stroke="#f4258c" strokeWidth="1.5" />
          <path d="M10 9v5" stroke="#f4258c" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="6.5" r="1" fill="#f4258c" />
        </svg>
      ),
    },
  };

  const config = typeConfig[toast.type] || typeConfig.info;

  return (
    <>
      <style>{toastStyles}</style>
      <div
        ref={toastRef}
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        tabIndex={-1}
        style={{
          '--toast-accent': config.accent,
          '--toast-bg': config.bg,
          '--toast-border': config.borderColor,
        }}
      >
        <div className="toast__icon">{config.icon}</div>
        <p className="toast__message">{toast.message}</p>
        <button
          className="toast__close"
          onClick={hideToast}
          aria-label="Dismiss notification"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M10.5 3.5l-7 7M3.5 3.5l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Progress bar for auto-dismiss */}
        <div className="toast__progress" />
      </div>
    </>
  );
}

const toastStyles = `
  .toast {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    min-width: 300px;
    max-width: min(440px, 90vw);
    border-radius: 14px;
    background: rgba(255, 245, 249, 0.88);
    backdrop-filter: blur(20px) saturate(1.5);
    -webkit-backdrop-filter: blur(20px) saturate(1.5);
    border: 1px solid var(--toast-border);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 0 0 1px var(--toast-border);
    animation: toastSlideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    overflow: hidden;
  }

  @media (prefers-color-scheme: dark) {
    .toast {
      background: rgba(28, 16, 24, 0.92);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 0 0 1px var(--toast-border);
    }
  }

  @keyframes toastSlideIn {
    from {
      opacity: 0;
      transform: translateX(40px) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0) translateY(0);
    }
  }

  .toast__icon {
    flex-shrink: 0;
    display: grid;
    place-items: center;
  }

  .toast__message {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 600;
    color: #1c0d14;
    line-height: 1.4;
  }

  @media (prefers-color-scheme: dark) {
    .toast__message { color: #f8f0f4; }
  }

  .toast__close {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #9c4973;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: all 0.2s ease;
  }
  .toast__close:hover {
    background: var(--toast-bg);
    color: var(--toast-accent);
  }

  /* Progress bar */
  .toast__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: var(--toast-accent);
    border-radius: 0 0 14px 14px;
    animation: toastProgress 3s linear forwards;
  }

  @keyframes toastProgress {
    from { width: 100%; }
    to   { width: 0%; }
  }

  /* Mobile */
  @media (max-width: 480px) {
    .toast {
      right: 12px;
      left: 12px;
      min-width: auto;
      top: 12px;
    }
  }
`;
