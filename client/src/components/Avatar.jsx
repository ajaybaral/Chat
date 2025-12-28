import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ 
  src, 
  alt = "User", 
  size = "md", 
  className = "",
  showStatus = false,
  isOnline = false 
}) => {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
    xl: "size-32"
  };

  const iconSize = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 64
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!src || imageError) {
    // Fallback to icon when image fails or no src
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative ${className}`}>
        <User size={iconSize[size]} className="text-white" />
        {showStatus && (
          <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white dark:border-backgroundDark2 ${isOnline ? 'bg-accent' : 'bg-gray-400'}`}></div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={handleImageError}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-border_light dark:border-border_dark`}
        loading="lazy"
      />
      {showStatus && (
        <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white dark:border-backgroundDark2 ${isOnline ? 'bg-accent' : 'bg-gray-400'}`}></div>
      )}
    </div>
  );
};

export default Avatar;
