import { ReactNode } from 'react';

interface ControlButtonProps {
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
  variant?: 'mic' | 'camera' | 'share' | 'settings';
  testId?: string;
}

export function ControlButton({ 
  icon, 
  isActive, 
  onClick, 
  variant = 'settings',
  testId
}: ControlButtonProps) {
  const getBackgroundClass = () => {
    if (!isActive && (variant === 'mic' || variant === 'camera')) {
      return 'bg-[#f8175a]';
    }
    if (isActive && variant === 'share') {
      return 'bg-[#034ff4]';
    }
    if (isActive) {
      return 'bg-white/20';
    }
    return 'bg-white/10';
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center
        ${getBackgroundClass()}
        transition-all duration-150 hover:brightness-110
        text-white
      `}
      data-testid={testId}
    >
      {icon}
    </button>
  );
}
