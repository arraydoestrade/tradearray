import { MiniCamera } from '../MiniCamera';
import { useState } from 'react';

export default function MiniCameraExample() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-purple-900 to-blue-900">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="absolute top-4 left-4 px-4 py-2 bg-white/20 text-white rounded-md backdrop-blur-sm"
      >
        {isVisible ? 'Ocultar cámara' : 'Mostrar cámara'}
      </button>
      <MiniCamera
        isVisible={isVisible}
        videoSrc="https://www.dropbox.com/s/se8r4svvnt2qpfu/example-video-2.mp4?raw=1"
      />
    </div>
  );
}
