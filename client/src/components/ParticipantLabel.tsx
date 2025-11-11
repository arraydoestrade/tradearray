import { Mic, MicOff } from 'lucide-react';

interface ParticipantLabelProps {
  name: string;
  isMuted?: boolean;
}

export function ParticipantLabel({ name, isMuted = false }: ParticipantLabelProps) {
  return (
    <div 
      className="flex items-center gap-3"
      data-testid="participant-label"
    >
      {isMuted && (
        <div 
          className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          data-testid="icon-mic-muted"
        >
          <MicOff size={14} className="text-white" />
        </div>
      )}
      <span 
        className="text-sm font-semibold text-white/80 drop-shadow-lg"
        data-testid="text-participant-name"
      >
        {name}
      </span>
    </div>
  );
}
