import Modal from './Modal'

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title ?? 'Are you sure?'} size="sm">
      <div className="px-6 py-4">
        <p className="text-gray-600 mb-6">{message ?? 'This action cannot be undone.'}</p>
        <div className="flex gap-3 justify-end">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-danger" onClick={() => { onConfirm(); onClose() }}>Delete</button>
        </div>
      </div>
    </Modal>
  )
}
