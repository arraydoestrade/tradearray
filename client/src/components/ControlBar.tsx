import { useState } from 'react';
import { ControlButton } from './ControlButton';
import { Mic, MicOff, Video, VideoOff, Monitor, Settings } from 'lucide-react';

interface ControlBarProps {
  onCameraToggle?: (isOn: boolean) => void;
}

export function ControlBar({ onCameraToggle }: ControlBarProps) {
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [shareActive, setShareActive] = useState(false);

  const handleMicToggle = () => {
    setMicActive(!micActive);
    console.log('Mic toggled:', !micActive);
  };

  const handleCameraToggle = () => {
    const newState = !cameraActive;
    setCameraActive(newState);
    onCameraToggle?.(newState);
    console.log('Camera toggled:', newState);
  };

  const handleShareToggle = () => {
    setShareActive(!shareActive);
    console.log('Share toggled:', !shareActive);
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 animate-slide-up"
      data-testid="control-bar"
    >
      <div className="inline-flex items-center gap-4 px-6 py-4 rounded-full bg-black/30 backdrop-blur-xl border border-white/10">
        <ControlButton
          icon={micActive ? <Mic size={20} /> : <MicOff size={20} />}
          isActive={micActive}
          onClick={handleMicToggle}
          variant="mic"
          testId="button-mic"
        />
        <ControlButton
          icon={cameraActive ? <Video size={20} /> : <VideoOff size={20} />}
          isActive={cameraActive}
          onClick={handleCameraToggle}
          variant="camera"
          testId="button-camera"
        />
        <ControlButton
          icon={<Monitor size={20} />}
          isActive={shareActive}
          onClick={handleShareToggle}
          variant="share"
          testId="button-share"
        />
        <ControlButton
          icon={<Settings size={20} />}
          isActive={false}
          onClick={handleSettingsClick}
          variant="settings"
          testId="button-settings"
        />
      </div>
    </div>
  );
}
