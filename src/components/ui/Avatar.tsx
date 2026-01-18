interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ src, alt, name, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  return (
    <div
      className={`
        ${sizes[size]} 
        rounded-full 
        bg-primary-500 
        flex items-center justify-center
        text-secondary-900
        font-semibold
        text-label-small
        overflow-hidden
        ${className}
      `}
    >
      {src ? (
        <img src={src} alt={alt || name} className="w-full h-full object-cover" />
      ) : (
        <span>{name ? getInitials(name) : '?'}</span>
      )}
    </div>
  )
}
