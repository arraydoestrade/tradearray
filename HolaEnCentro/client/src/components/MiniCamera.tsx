interface MiniCameraProps {
  isVisible: boolean;
  videoSrc?: string;
}

export function MiniCamera({ isVisible, videoSrc }: MiniCameraProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-6 right-6 z-10 w-48 h-36 rounded-lg border-2 border-white/20 bg-black overflow-hidden drop-shadow-2xl transition-all duration-300 hover:scale-105"
      data-testid="mini-camera"
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          playsInline
          muted
          loop
          className="w-full h-full object-cover"
          data-testid="video-user"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">
          Sin cámara
        </div>
      )}
      <div 
        className="absolute left-4 bottom-3 z-20"
        data-testid="label-user"
      >
        <span className="text-sm font-semibold text-white drop-shadow-lg">
          Tú
        </span>
      </div>
    </div>
  );
}
