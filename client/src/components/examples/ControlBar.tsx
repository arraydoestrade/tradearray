import { ControlBar } from '../ControlBar';

export default function ControlBarExample() {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-900 to-purple-900">
      <ControlBar onCameraToggle={(isOn) => console.log('Camera is now:', isOn)} />
    </div>
  );
}
