export default function EmptyState({ emoji = '📷', title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="text-6xl mb-4 select-none">{emoji}</div>
      <h3 className="text-xl font-bold text-gray-700 font-display mb-2">{title}</h3>
      {description && <p className="text-gray-400 text-sm max-w-xs mb-6">{description}</p>}
      {action}
    </div>
  )
}
