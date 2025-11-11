import { ControlButton } from '../ControlButton';
import { Mic, MicOff, Video, VideoOff, Monitor, Settings } from 'lucide-react';
import { useState } from 'react';

export default function ControlButtonExample() {
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [shareActive, setShareActive] = useState(false);

  return (
    <div className="flex gap-4 items-center justify-center p-8 bg-gradient-to-br from-purple-900 to-blue-900">
      <ControlButton
        icon={micActive ? <Mic size={20} /> : <MicOff size={20} />}
        isActive={micActive}
        onClick={() => setMicActive(!micActive)}
        variant="mic"
        testId="button-mic"
      />
      <ControlButton
        icon={cameraActive ? <Video size={20} /> : <VideoOff size={20} />}
        isActive={cameraActive}
        onClick={() => setCameraActive(!cameraActive)}
        variant="camera"
        testId="button-camera"
      />
      <ControlButton
        icon={<Monitor size={20} />}
        isActive={shareActive}
        onClick={() => setShareActive(!shareActive)}
        variant="share"
        testId="button-share"
      />
      <ControlButton
        icon={<Settings size={20} />}
        isActive={false}
        onClick={() => console.log('Settings clicked')}
        variant="settings"
        testId="button-settings"
      />
    </div>
  );
}
