import { useCart } from '../context/CartContext'
import './ToastContainer.css'

export default function ToastContainer() {
  const { toasts, removeToast } = useCart()

  if (!toasts.length) return null

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-item--${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' && '✨'}
            {toast.type === 'info' && '🍨'}
            {toast.type === 'error' && '⚠️'}
          </span>
          <p className="toast-message">{toast.message}</p>
          <button
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
