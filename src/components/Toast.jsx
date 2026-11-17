import { useEffect } from 'react'
import Icon from './Icon'

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [message, onClose])

  if (!message) return null

  return (
    <div className="toast" role="status">
      <Icon name="check" size={20} />
      <span>{message}</span>
      <button aria-label="Dismiss" onClick={onClose}>
        <Icon name="close" size={16} />
      </button>
    </div>
  )
}

export default Toast
